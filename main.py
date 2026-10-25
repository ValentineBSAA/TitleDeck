"""TitleDeck backend: non-invasive alias storage and installed Steam title inventory.

No Steam file is ever written by this module. No root access or network required.
"""
from __future__ import annotations

import asyncio
import json
import os
import re
import tempfile
import time
from pathlib import Path
from typing import Any

try:
    import decky
except ImportError:  # local unit tests only
    decky = None

SCHEMA = 1
MAX_ALIAS = 180
MAX_DESCRIPTION = 4000
MAX_ALIAS_ENTRIES = 2000
APPID = re.compile(r"^[1-9][0-9]{0,11}$")
QUOTED_FIELD = re.compile(r'"(?P<key>[^"\\]+)"\s+"(?P<value>(?:\\.|[^"\\])*)"')
MANIFEST_NAME = re.compile(r'^appmanifest_([0-9]+)\.acf$')


def settings_path() -> Path:
    if decky is not None:
        p = getattr(decky, "DECKY_PLUGIN_SETTINGS_DIR", None) or getattr(decky, "DECKY_SETTINGS_DIR", None)
        if p:
            return Path(p) / "titledeck.json"
    return Path(os.environ.get("TITLEDECK_TEST_DATA", str(Path.home() / ".config" / "titledeck"))) / "titledeck.json"


def normalize_id(value: Any) -> str:
    value = str(value).strip()
    if not APPID.fullmatch(value):
        raise ValueError("A positive numeric Steam App ID is required")
    return str(int(value))


def validate_title(value: Any) -> str:
    if not isinstance(value, str):
        raise ValueError("Title must be text")
    value = value.strip()
    if not value or len(value) > MAX_ALIAS or any(ord(c) < 32 or ord(c) == 127 for c in value):
        raise ValueError("Title must be 1–180 characters and contain no control characters")
    return value


def validate_description(value: Any) -> str:
    """A locally saved, plain-text game summary. Never interpreted as markup."""
    if not isinstance(value, str):
        raise ValueError("Description must be text")
    value = value.replace("\r\n", "\n").replace("\r", "\n").strip()
    if not value or len(value) > MAX_DESCRIPTION or any(
        (ord(ch) < 32 and ch not in "\n\t") or ord(ch) == 127 for ch in value
    ):
        raise ValueError("Description must be 1–4000 characters of plain text")
    return value


def blank_state() -> dict[str, Any]:
    return {"schema": SCHEMA, "enabled": True, "aliases": {}, "descriptions": {}, "description_position": "below_play"}


def load_state(path: Path | None = None) -> dict[str, Any]:
    path = path or settings_path()
    if not path.is_file():
        return blank_state()
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict) or raw.get("schema") != SCHEMA:
        raise ValueError("Unsupported TitleDeck settings format")
    aliases: dict[str, str] = {}
    record = raw.get("aliases", {})
    if not isinstance(record, dict) or len(record) > MAX_ALIAS_ENTRIES:
        raise ValueError("Invalid alias collection")
    for appid, title in record.items():
        aliases[normalize_id(appid)] = validate_title(title)
    descriptions: dict[str, str] = {}
    saved_descriptions = raw.get("descriptions", {})
    if not isinstance(saved_descriptions, dict) or len(saved_descriptions) > MAX_ALIAS_ENTRIES:
        raise ValueError("Invalid description collection")
    for appid, description in saved_descriptions.items():
        descriptions[normalize_id(appid)] = validate_description(description)
    position = raw.get("description_position", "below_play")
    if position not in ("below_play", "hero_footer") or not isinstance(position, str):
        raise ValueError("Invalid description placement")
    return {"schema": SCHEMA, "enabled": raw.get("enabled") is not False,
            "aliases": aliases, "descriptions": descriptions, "description_position": position}


def store_state(state: dict[str, Any], path: Path | None = None) -> None:
    path = path or settings_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(state, ensure_ascii=False, indent=2, sort_keys=True)
    fd, name = tempfile.mkstemp(prefix=".titledeck-", suffix=".tmp", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            stream.write(serialized)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(name, path)
    finally:
        if os.path.exists(name):
            os.unlink(name)


def _kv_fields(data: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for hit in QUOTED_FIELD.finditer(data):
        # Decode KeyValues escape sequences used in library paths and names.
        value = re.sub(r'\\(["\\])', r'\1', hit.group("value"))
        out[hit.group("key").lower()] = value
    return out


def steam_roots(home: Path) -> list[Path]:
    seeds = [home / ".steam" / "steam", home / ".steam" / "root", home / ".local" / "share" / "Steam"]
    paths = []
    visited = set()
    for seed in seeds:
        if not seed.is_dir():
            continue
        p = seed.resolve()
        if str(p) not in visited:
            paths.append(p)
            visited.add(str(p))
        folder_file = p / "steamapps" / "libraryfolders.vdf"
        try:
            content = folder_file.read_text(encoding="utf-8-sig", errors="replace")[:2_000_000]
        except OSError:
            continue
        for match in QUOTED_FIELD.finditer(content):
            if match.group("key").lower() != "path":
                continue
            try:
                root = Path(re.sub(r'\\(["\\])', r'\1', match.group("value"))).expanduser().resolve()
                if root.is_dir() and str(root) not in visited:
                    visited.add(str(root))
                    paths.append(root)
            except (OSError, RuntimeError, ValueError):
                continue
    return paths


def find_installed_games(home: Path | None = None) -> list[dict[str, str]]:
    home = home or Path.home()
    games: dict[str, dict[str, str]] = {}
    for root in steam_roots(home):
        appdir = root / "steamapps"
        if not appdir.is_dir():
            continue
        for file in appdir.glob("appmanifest_*.acf"):
            m = MANIFEST_NAME.fullmatch(file.name)
            if not m:
                continue
            try:
                # cap size; never parse/download contents from the network
                if file.stat().st_size > 200_000:
                    continue
                fields = _kv_fields(file.read_text(encoding="utf-8-sig", errors="replace"))
                gameid = normalize_id(fields.get("appid", m.group(1)))
                title = fields.get("name", "").strip()[:MAX_ALIAS]
                if not title or any(ord(ch) < 32 for ch in title):
                    continue
                games[gameid] = {"appid": gameid, "name": title}
            except (OSError, ValueError):
                continue
    return sorted(games.values(), key=lambda g: (g["name"].casefold(), int(g["appid"])))[:5000]


class Plugin:
    def __init__(self) -> None:
        self._lock = asyncio.Lock()

    async def _main(self) -> None:
        if decky is not None:
            decky.logger.info("TitleDeck prototype backend started (read-only Steam access)")

    async def snapshot(self) -> dict[str, Any]:
        state = load_state()
        games = find_installed_games()
        return {**state, "games": games, "status": "Steam files are never modified",
                "recovery": self._backup_status("titledeck.before_restore_all.json"),
                "manual_backup": self._backup_status("titledeck.backup.json")}

    @staticmethod
    def _backup_status(filename: str) -> dict[str, Any]:
        path = settings_path().with_name(filename)
        if not path.is_file():
            return {"available": False, "count": 0}
        try:
            backup = load_state(path)
            return {"available": True, "count": len(backup["aliases"])}
        except (OSError, ValueError, json.JSONDecodeError) as error:
            return {"available": False, "count": 0, "error": str(error)}

    async def save_alias(self, appid: str, title: str) -> dict[str, Any]:
        appid = normalize_id(appid)
        title = validate_title(title)
        async with self._lock:
            state = load_state()
            if appid not in state["aliases"] and len(state["aliases"]) >= MAX_ALIAS_ENTRIES:
                raise ValueError("Maximum number of aliases reached")
            state["aliases"][appid] = title
            store_state(state)
            return state

    async def save_description(self, appid: str, description: str) -> dict[str, Any]:
        appid = normalize_id(appid)
        description = validate_description(description)
        async with self._lock:
            state = load_state()
            if (appid not in state["descriptions"]
                    and len(state["descriptions"]) >= MAX_ALIAS_ENTRIES):
                raise ValueError("Maximum number of descriptions reached")
            state["descriptions"][appid] = description
            store_state(state)
            return state

    async def delete_description(self, appid: str) -> dict[str, Any]:
        appid = normalize_id(appid)
        async with self._lock:
            state = load_state()
            state["descriptions"].pop(appid, None)
            store_state(state)
            return state

    async def delete_alias(self, appid: str) -> dict[str, Any]:
        appid = normalize_id(appid)
        async with self._lock:
            state = load_state()
            state["aliases"].pop(appid, None)
            store_state(state)
            return state

    async def restore_all_titles(self, expected_aliases: dict[str, str]) -> dict[str, Any]:
        """Confirmed bulk reset. Protect against stale UI, back up first, then atomically clear."""
        if not isinstance(expected_aliases, dict) or len(expected_aliases) > MAX_ALIAS_ENTRIES:
            raise ValueError("Invalid confirmation data")
        expected = {normalize_id(k): validate_title(v) for k, v in expected_aliases.items()}
        async with self._lock:
            state = load_state()
            if state["aliases"] != expected:
                raise ValueError("Saved titles changed since confirmation. Reopen Restore All and try again")
            removed = len(state["aliases"])
            if not removed:
                return {**state, "restored_count": 0}
            # Do not overwrite the backup created manually by the user.
            safety_path = settings_path().with_name("titledeck.before_restore_all.json")
            store_state(state, safety_path)
            state["aliases"] = {}
            store_state(state)
            return {**state, "restored_count": removed}

    async def undo_restore_all(self) -> dict[str, Any]:
        """Reapply the saved batch without touching any Steam or installation files."""
        async with self._lock:
            safety_path = settings_path().with_name("titledeck.before_restore_all.json")
            if not safety_path.is_file():
                raise ValueError("No Restore All backup exists")
            current = load_state()
            if current["aliases"]:
                raise ValueError("New custom titles exist. Back them up or clear them before recovering the previous batch")
            previous = load_state(safety_path)
            if not previous["aliases"]:
                raise ValueError("The Restore All backup contains no custom titles")
            current["aliases"] = previous["aliases"]
            store_state(current)
            return {**current, "recovered_count": len(previous["aliases"])}

    async def set_description_position(self, position: str) -> dict[str, Any]:
        """Choose a reversible TitleDeck-only placement, without writing Steam or CSS Loader files."""
        if not isinstance(position, str) or position not in ("below_play", "hero_footer"):
            raise ValueError("Unsupported description position")
        async with self._lock:
            state = load_state()
            state["description_position"] = position
            store_state(state)
            return state

    async def set_enabled(self, enabled: bool) -> dict[str, Any]:
        if not isinstance(enabled, bool):
            raise ValueError("Enabled must be true or false")
        async with self._lock:
            state = load_state()
            state["enabled"] = enabled
            store_state(state)
            return state

    async def create_backup(self) -> str:
        """Keep a full settings backup outside Steam's files."""
        async with self._lock:
            target = settings_path().with_name('titledeck.backup.json')
            store_state(load_state(), target)
            return str(target)

    async def restore_backup(self) -> dict[str, Any]:
        """Restore the local backup explicitly, with atomic replacement."""
        async with self._lock:
            target = settings_path().with_name('titledeck.backup.json')
            if not target.is_file():
                raise ValueError('No saved TitleDeck backup was found')
            backed_up = load_state(target)
            store_state(backed_up)
            return backed_up

    async def export_aliases(self) -> str:
        return json.dumps(load_state(), ensure_ascii=False, indent=2, sort_keys=True)

    async def import_aliases(self, data: str) -> dict[str, Any]:
        if not isinstance(data, str) or len(data.encode("utf-8")) > 256_000:
            raise ValueError("Import is too large")
        obj = json.loads(data)
        if not isinstance(obj, dict) or obj.get("schema") != SCHEMA:
            raise ValueError("Invalid TitleDeck export")
        incoming = obj.get("aliases")
        if not isinstance(incoming, dict) or len(incoming) > MAX_ALIAS_ENTRIES:
            raise ValueError("Invalid alias list")
        additions = {normalize_id(k): validate_title(v) for k, v in incoming.items()}
        incoming_descriptions = obj.get("descriptions", {})
        if not isinstance(incoming_descriptions, dict) or len(incoming_descriptions) > MAX_ALIAS_ENTRIES:
            raise ValueError("Invalid imported descriptions")
        added_descriptions = {
            normalize_id(k): validate_description(v) for k, v in incoming_descriptions.items()
        }
        position = obj.get("description_position")
        if position is not None and (not isinstance(position, str) or position not in ("below_play", "hero_footer")):
            raise ValueError("Unsupported imported description placement")
        async with self._lock:
            state = load_state()
            state["aliases"].update(additions)
            state["descriptions"].update(added_descriptions)
            if position is not None:
                state["description_position"] = position
            if (len(state["aliases"]) > MAX_ALIAS_ENTRIES
                    or len(state["descriptions"]) > MAX_ALIAS_ENTRIES):
                raise ValueError("Maximum number of saved customizations reached")
            store_state(state)
            return state
