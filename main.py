"""TitleDeck backend: non-invasive alias storage and installed Steam title inventory.

No Steam file is ever written by this module. No root access or external network required.
"""
from __future__ import annotations

import asyncio
import json
import logging
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
DESCRIPTION_WARNING_THRESHOLD = 1247
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


def validate_description(value: Any, *, allow_legacy: bool = False) -> str:
    """Validate plain text without an arbitrary character cap.

    Steam UI may be less stable with long synopses; the frontend gives a
    yellow warning starting at 1,247 characters but users can still save.
    """
    if not isinstance(value, str):
        raise ValueError("Description must be text")
    value = value.replace("\r\n", "\n").replace("\r", "\n").strip()
    if not value or any(
        (ord(ch) < 32 and ch not in "\n\t") or ord(ch) == 127 for ch in value
    ):
        raise ValueError("Description must contain non-empty plain text without control characters")
    return value


def blank_state() -> dict[str, Any]:
    return {"schema": SCHEMA, "enabled": True, "home_menu_titles": True, "aliases": {}, "descriptions": {}, "description_position": "below_play"}


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
        descriptions[normalize_id(appid)] = validate_description(description, allow_legacy=True)
    position = raw.get("description_position", "below_play")
    if position not in ("below_play", "hero_footer", "game_info") or not isinstance(position, str):
        raise ValueError("Invalid description placement")
    return {"schema": SCHEMA, "enabled": raw.get("enabled") is not False,
            "home_menu_titles": raw.get("home_menu_titles", raw.get("home_menu_preview", True)) is True,
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


# TitleDeck-owned artwork resolution hints. This file contains numeric App IDs
# and source indices only, not downloaded images or Steam metadata.
COVER_CACHE_SIZE = 1200


def cover_cache_path() -> Path:
    return settings_path().with_name("titledeck.artwork-cache-125.json")


def layout_diagnostic_path() -> Path:
    """An easily accessible export on the Steam Deck Desktop, never Steam files.

    Do not use Path.home(): Decky may run its backend under a service user.
    """
    return Path("/home/deck/Desktop/TitleDeck/titledeck-game-info-layout.json")


def controller_diagnostic_path() -> Path:
    """Local, read-only user-facing controller-state report on Deck Desktop."""
    return Path("/home/deck/Desktop/TitleDeck/titledeck-controller-input.json")


def validate_cover_cache(value: Any) -> dict[str, int]:
    if not isinstance(value, dict) or len(value) > COVER_CACHE_SIZE:
        raise ValueError("Invalid artwork cache")
    result: dict[str, int] = {}
    for appid, index in value.items():
        ident = normalize_id(appid)
        if isinstance(index, bool) or not isinstance(index, int) or not 0 <= index <= 63:
            raise ValueError("Invalid artwork source index")
        result[ident] = index
    return result


def load_cover_cache() -> dict[str, int]:
    try:
        path = cover_cache_path()
        migrating = not path.is_file()
        if migrating:
            path = settings_path().with_name("titledeck.artwork-cache-124.json")
            if not path.is_file():
                path = settings_path().with_name("titledeck.artwork-cache-123.json")
        if not path.is_file() or path.stat().st_size > 50_000:
            return {}
        entries = validate_cover_cache(json.loads(path.read_text(encoding="utf-8")))
        # Preserve every existing working cover except IDs whose source
        # ordering changed in 1.2.5. No 1.2.4 cache is overwritten here.
        if migrating:
            for ident in ("410", "4333400", "18000", "18020", "219"):
                entries.pop(ident, None)
        return entries
    except (OSError, ValueError, json.JSONDecodeError):
        return {}



# TitleDeck 1.2.7: imported independent CSS translation resolution from the
# user's HomeCarouselFix 1.6.0. This is READ ONLY and requires no HCF install.
_HOME_CAROUSEL_CANONICAL = {
    'wrapper': 'basicgamecarousel_CarouselGameLabelWrapper_ZkD6W',
    'label': 'basicgamecarousel_CarouselGameLabel_3CKji',
    'item': 'basicgamecarousel_BasicGameCarouselItem_3YYQ9',
    'media': 'basicgamecarousel_BasicGameCarouselItemMediaContainer_1HIFN',
    'show_hovered': 'basicgamecarousel_ShowAsHovered_3tdVJ',
}


def _titledeck_home_mapping():
    import hashlib
    bases = []
    if os.getenv('DECKY_HOME'):
        bases.append(Path(os.environ['DECKY_HOME']) / 'themes')
    if os.getenv('HOME'):
        bases.append(Path(os.environ['HOME']) / 'homebrew' / 'themes')
    bases.append(Path('/home/deck/homebrew/themes'))
    candidates = [p / 'css_translations.json' for p in bases]
    for base in [Path('/home/deck/homebrew')]:
        try:
            if base.exists():
                candidates += list(base.glob('**/css_translations.json'))
        except Exception:
            pass
    visited = set()
    for candidate in candidates:
        if str(candidate) in visited: continue
        visited.add(str(candidate))
        try:
            if not candidate.is_file(): continue
            raw = candidate.read_bytes()
            data = json.loads(raw)
            if not isinstance(data, dict): continue
            mapping = {}
            for versions in data.values():
                if isinstance(versions, list) and versions:
                    latest = str(versions[-1])
                    for old in versions[:-1]: mapping[str(old)] = latest
            resolved = {key: mapping.get(value, value) for key, value in _HOME_CAROUSEL_CANONICAL.items()}
            if all(re.fullmatch(r'[a-zA-Z_][\w-]{1,140}', x) for x in resolved.values()):
                return {'ok':True, 'resolved':resolved,
                        'mapping_sha':hashlib.sha256(raw).hexdigest()[:12],
                        'read_only':True}
        except Exception as exc:
            logging.getLogger(__name__).warning('TitleDeck CSS class map unavailable at %s: %s', candidate, exc)
    # Canonical names are still valid for the original 1.5/1.6 Steam layout;
    # never block rendering just because CSS Loader is not installed.
    return {'ok':True, 'resolved':dict(_HOME_CAROUSEL_CANONICAL),
            'mapping_sha':'canonical', 'read_only':True, 'fallback':True}

# 1.2.24: CSS Loader Art Hero inspection (read only). CSS Loader writes the
# active patch values to config_USER.json in the theme directory. Never infer
# that a theme is enabled merely because its folder exists.
def _titledeck_art_hero_diagnostic() -> dict[str, Any]:
    roots = []
    for base in [os.getenv('DECKY_HOME'), str(Path.home() / 'homebrew'), '/home/deck/homebrew']:
        if base:
            folder = Path(base) / 'themes'
            if folder not in roots:
                roots.append(folder)
    for base in roots:
        try:
            if not base.is_dir():
                continue
            folders = [p for p in base.iterdir() if p.is_dir() and not p.name.endswith('.profile')]
        except OSError:
            continue
        for folder in folders[:500]:
            manifest = folder / 'theme.json'
            try:
                if not manifest.is_file() or manifest.stat().st_size > 512_000:
                    continue
                meta = json.loads(manifest.read_text(encoding='utf-8'))
                if not isinstance(meta, dict):
                    continue
                name = str(meta.get('name') or meta.get('display_name') or folder.name)
                if 'art hero' not in name.lower() and 'art hero' not in folder.name.lower():
                    continue
                config = None
                configname = None
                # CSS Loader uses _USER for normal Deck sessions and _ROOT
                # only for root. Prefer the active account's file when present.
                for c in ((folder/'config_ROOT.json',folder/'config_USER.json') if os.getenv('USER') == 'root' else (folder/'config_USER.json',folder/'config_ROOT.json')):
                    if c.is_file() and c.stat().st_size < 512_000:
                        val=json.loads(c.read_text(encoding='utf-8'))
                        if isinstance(val,dict):
                            config=val; configname=c.name; break
                options = meta.get('patches') or {}
                if not isinstance(options,dict): options={}
                settings=[]
                for k,v in list(options.items())[:80]:
                    if not isinstance(k,str):continue
                    fallback=(v.get('default') if isinstance(v,dict) else None)
                    if fallback is None and isinstance(v,dict):
                        choices=v.get('values') if isinstance(v.get('values'),dict) else v
                        fallback=next((x for x in choices if x not in ('default','type','components')),None)
                    raw=config.get(k,fallback) if config is not None else fallback
                    if isinstance(raw,dict):
                        value=raw.get('value',fallback)
                        components=raw.get('components',{})
                    else:
                        value=raw;components={}
                    allowed=v.get('values',{}) if isinstance(v,dict) else {}
                    settings.append({'name':k[:80], 'value':str(value)[:120] if value is not None else 'Unknown',
                       'source':'saved' if isinstance(config,dict) and k in config else 'theme default',
                       'options':[str(k) for k in allowed.keys()][:250] if isinstance(allowed,dict) else [],
                       'components':{str(a)[:50]:str(b)[:100] for a,b in list(components.items())[:16]} if isinstance(components,dict) else {}})
                return {'detected':True,'name':name[:100],'version':str(meta.get('version','unknown'))[:40],
                        'active':config.get('active') if isinstance(config,dict) else None,
                        'config_state':'saved' if config is not None else 'defaults only / configuration not found',
                        'settings':settings,'read_only':True,'config_type':configname or 'none'}
            except (OSError, ValueError, UnicodeError, TypeError) as ex:
                logging.getLogger(__name__).warning('TitleDeck Art Hero scan failed at a candidate: %s', ex)
                continue
    return {'detected':False,'active':None,'settings':[], 'config_state':'Art Hero not found', 'read_only':True}




# 1.3.8: Optional CSS Loader Standalone Backend adapter. The native plugin
# bridge is attempted first in JavaScript. If CSS Loader is registered through
# Decky's legacy backend API, its opt-in local server supplies a safe fallback.
# TitleDeck 1.4.0 reads Art Hero settings only. Placement writes are disabled.
def _css_loader_local_request(method: str, args: dict) -> Any:
    import urllib.request
    import urllib.error
    import socket
    payload=json.dumps({'method':method,'args':args},separators=(',',':')).encode('utf-8')
    request=urllib.request.Request('http://127.0.0.1:35821/req',data=payload,
                                   headers={'Content-Type':'application/json'},method='POST')
    try:
        with urllib.request.urlopen(request, timeout=2.5) as response:
            raw=response.read(1_500_000)
    except (urllib.error.URLError, TimeoutError, socket.timeout) as exc:
        raise ConnectionError('CSS Loader Standalone Backend is unavailable. In CSS Loader → Settings enable Standalone Backend, then try again.') from exc
    packet=json.loads(raw)
    if not isinstance(packet,dict) or packet.get('success') is not True:
        raise RuntimeError('CSS Loader rejected the request: '+str(packet.get('res','invalid response'))[:200])
    return packet.get('res')

async def _titledeck_css_loader_rpc(method: str, args: Any=None) -> dict[str,Any]:
    """Read-only CSS Loader Art Hero diagnostics. No configuration writes."""
    if method != 'get_themes':
        return {'ok':False,'reason':'Art Hero placement is view-only in TitleDeck 1.4.0. Change settings in CSS Loader.'}
    try:
        themes=await asyncio.to_thread(_css_loader_local_request,'get_themes',{})
        if not isinstance(themes,list):
            return {'ok':False,'reason':'CSS Loader returned an invalid theme list'}
        art=next((item for item in themes if isinstance(item,dict) and
                  str(item.get('name','')).strip().lower()=='art hero'),None)
        return {'ok':True,'result':[art] if art else []}
    except Exception as exc:
        logging.getLogger(__name__).warning('Art Hero read-only check failed: %s',exc)
        return {'ok':False,'reason':str(exc)[:350]}


# 1.2.30: Direct, local-only CEF renderer bridge. Decky panels and the visible
# Big Picture carousel are different CEF targets. Never edit Art Hero, Steam
# artwork, Steam settings or CSS Loader files. Only localhost CDP is used.
async def _titledeck_cef_home(probe_code: str, apply_code: str = '') -> dict[str, Any]:
    if (not isinstance(probe_code, str) or len(probe_code) > 20_000 or
        'titledeck-cef-home-probe-v130' not in probe_code):
        return {'ok': False, 'error': 'Invalid TitleDeck Home probe'}
    if apply_code and (not isinstance(apply_code, str) or len(apply_code) > 60_000 or
                       'td-home-current-1215' not in apply_code or
                       '__titledeckHomeVisible1215' not in apply_code):
        return {'ok': False, 'error': 'Invalid TitleDeck Home positioning script'}
    try:
        import aiohttp
        from urllib.parse import urlsplit, urlunsplit
    except ImportError:
        return {'ok': False, 'error': 'Decky Python aiohttp not available'}
    targets: list[dict[str, Any]] = []
    endpoint = None
    timeout = aiohttp.ClientTimeout(total=3.2, connect=0.85, sock_read=1.3)
    try:
        async with aiohttp.ClientSession(timeout=timeout, trust_env=False) as client:
            for port in (8080, 8081):
                try:
                    async with client.get(f'http://127.0.0.1:{port}/json/list') as resp:
                        if resp.status != 200:
                            continue
                        pages = await resp.json(content_type=None)
                        if isinstance(pages, list):
                            endpoint = port
                            break
                except (aiohttp.ClientError, asyncio.TimeoutError, ValueError):
                    continue
            if endpoint is None:
                return {'ok': False, 'error': 'Local Steam CEF debugger not reachable on 8080/8081', 'targets': []}
            # Screen windows only. SharedJSContext contains Decky/webpack, not
            # the on-screen carousel; QuickAccess/MainMenu are separate panes.
            candidates = []
            for page in pages:
                if not isinstance(page, dict) or page.get('type') != 'page':
                    continue
                title = str(page.get('title') or '')[:100]
                url = str(page.get('url') or '')[:180]
                lowered = title.lower()
                if any(x in lowered for x in ('sharedjscontext', 'quickaccess', 'mainmenu',
                      'notificationtoast', 'devtools', 'pluginloader', 'decky')):
                    continue
                ws = str(page.get('webSocketDebuggerUrl') or '')
                parts = urlsplit(ws)
                if (parts.scheme != 'ws' or parts.port not in (8080, 8081) or
                    parts.hostname not in ('127.0.0.1', 'localhost', '::1') or
                    not parts.path.startswith('/devtools/page/')):
                    # Some Steam builds advertise a host-LAN address: always
                    # replace with loopback but never connect to that address.
                    if parts.scheme != 'ws' or parts.port not in (8080, 8081) or not parts.path.startswith('/devtools/page/'):
                        continue
                safe_ws = urlunsplit(('ws', f'127.0.0.1:{parts.port}', parts.path, '', ''))
                # Prefer the actual Big Picture page. An SP-named tab can be
                # a background context and is never proof of a visible Home.
                rank = 10 if ('big picture' in lowered or 'bigpicture' in lowered) else (5 if lowered=='sp' else 1)
                candidates.append((rank, title, url, safe_ws))
            candidates.sort(key=lambda x: -x[0])
            if not candidates:
                return {'ok': False, 'error': 'CEF connected but no Steam Gamepad UI page found', 'port': endpoint, 'targets': []}

            async def evaluate(ws_url: str, script: str):
                async with client.ws_connect(ws_url, timeout=1.2, heartbeat=None, max_msg_size=256_000) as socket:
                    await socket.send_json({'id': 301, 'method': 'Runtime.evaluate',
                        'params': {'expression': script, 'returnByValue': True,
                                   'awaitPromise': False, 'userGesture': False}})
                    for _ in range(24):
                        message = await asyncio.wait_for(socket.receive(), timeout=1.7)
                        if message.type != aiohttp.WSMsgType.TEXT:
                            raise RuntimeError('Steam CEF closed the renderer connection')
                        data = message.json()
                        if data.get('id') != 301:
                            continue
                        payload = data.get('result') or {}
                        if payload.get('exceptionDetails'):
                            detail = payload['exceptionDetails']
                            return {'ok': False, 'error': str(detail.get('text', 'Steam JavaScript exception'))[:240]}
                        value = (payload.get('result') or {}).get('value')
                        return value if isinstance(value, dict) else {'ok': False, 'error': 'Steam renderer returned no value'}
                    raise RuntimeError('Steam CEF did not return a matching response')
            for rank, title, url, ws_url in candidates[:6]:
                target = {'target': f'CEF: {title or "untitled"}', 'url_kind':
                          'steamloopback' if 'steamloopback.host' in url else 'other',
                          'ok': False, 'error': None}
                try:
                    result = await evaluate(ws_url, probe_code)
                    target['result'] = result
                    target['ok'] = result.get('ok') is True
                    if not target['ok']:
                        target['error'] = result.get('error', 'Probe failed')
                except (aiohttp.ClientError, asyncio.TimeoutError, RuntimeError, ValueError) as exc:
                    target['error'] = str(exc)[:180]
                targets.append(target)
            successes = [(i, x) for i, x in enumerate(targets) if x['ok']]
            matches = [(i,x) for i,x in successes if (x['result'].get('counts') or {}).get('items',0)>0]
            # A correct Big Picture target with no carousel still receives
            # the observer so navigating to Home can mount it automatically.
            preferred = matches[0] if matches else next((s for s in successes if 'big picture' in s[1]['target'].lower()), None)
            # Do not inject into unrelated Steam browser pages merely because
            # they respond to CDP. A visible carousel OR the named Big Picture
            # window is required before installing any label observer.
            applied = None
            if apply_code and preferred is not None:
                rank, title, url, ws_url = candidates[preferred[0]]
                try:
                    applied = await evaluate(ws_url, apply_code)
                    target = targets[preferred[0]]
                    target['engine'] = applied
                    target['engine_ok'] = applied.get('ok') is True
                    if not target['engine_ok']:
                        target['error'] = applied.get('error','Steam engine failed')
                except (aiohttp.ClientError, asyncio.TimeoutError, RuntimeError, ValueError) as exc:
                    applied = {'ok': False, 'error': str(exc)[:180]}
            return {'ok': True, 'port': endpoint, 'targets': targets,
                    'best': preferred[1]['target'] if preferred else None,
                    'source': 'localhost-steam-cef', 'applied': applied,
                    'error': None if preferred else 'No responding Steam renderer'}
    except Exception as exc:
        return {'ok': False, 'targets': targets, 'error': 'CEF bridge: '+str(exc)[:180]}


_HOME_PREVIEW_CACHE: dict[str, Any] = {}  # memory only; expires after 10 minutes

async def _titledeck_home_snapshot() -> dict[str, Any]:
    """Read-only, ephemeral CEF screenshot for an explicitly expanded preview.

    Never writes captured pixels to disk or reads unrelated browser targets.
    A Home card and TitleDeck's actual Home positioning engine must be present.
    """
    try:
        import aiohttp
        from urllib.parse import urlsplit, urlunsplit
    except ImportError:
        return {'ok': False, 'error': 'Steam CEF screenshot support unavailable'}
    try:
        timeout = aiohttp.ClientTimeout(total=4.0, connect=0.85, sock_read=1.5)
        async with aiohttp.ClientSession(timeout=timeout, trust_env=False) as client:
            pages = None
            for port in (8080, 8081):
                try:
                    async with client.get(f'http://127.0.0.1:{port}/json/list') as response:
                        if response.status == 200:
                            value = await response.json(content_type=None)
                            if isinstance(value, list):
                                pages = value
                                break
                except (aiohttp.ClientError, asyncio.TimeoutError, ValueError):
                    pass
            if pages is None:
                return {'ok': False, 'error': 'Steam CEF debugger unavailable'}
            targets = []
            for page in pages:
                if not isinstance(page, dict) or page.get('type') != 'page':
                    continue
                title = str(page.get('title') or '')[:100]
                if not any(word in title.lower() for word in ('steam big picture', 'bigpicture')):
                    continue
                raw = urlsplit(str(page.get('webSocketDebuggerUrl') or ''))
                if raw.scheme != 'ws' or raw.port not in (8080, 8081) or not raw.path.startswith('/devtools/page/'):
                    continue
                targets.append((title, urlunsplit(('ws',f'127.0.0.1:{raw.port}',raw.path,'',''))))
            if not targets:
                return {'ok': False, 'error': 'Steam Home renderer not found'}
            for title, url in targets[:2]:
                try:
                    async with client.ws_connect(url, timeout=1.2, heartbeat=None, max_msg_size=1_800_000) as socket:
                        async def request(mid, method, params):
                            await socket.send_json({'id': mid, 'method': method, 'params': params})
                            for _ in range(30):
                                msg = await asyncio.wait_for(socket.receive(), timeout=1.7)
                                if msg.type != aiohttp.WSMsgType.TEXT:
                                    raise RuntimeError('Steam renderer disconnected')
                                obj = msg.json()
                                if obj.get('id') == mid:
                                    if 'error' in obj:
                                        raise RuntimeError(str(obj['error'].get('message', 'CEF method unavailable'))[:120])
                                    return obj.get('result') or {}
                            raise RuntimeError('Steam renderer did not answer screenshot request')
                        # Verify a real Home document before collecting any pixels.
                        check = await request(501, 'Runtime.evaluate', {
                            'expression': """(()=>{
                              const e=window.__titledeckHomeVisible1215;
                              const cards=Number(e?.result?.count||0);
                              const home=cards>0 && !!document.querySelector('.td-home-current-1215');
                              const manager=!!document.querySelector('[data-td-scroll="settings"]');
                              const last=window.__titledeckLastMeasuredHome125;
                              const measured=e?.result?.geometry||(Date.now()-Number(last?.at||0)<5000?last?.geometry:null);
                              const geometry=measured&&Number(measured.viewportWidth)>100&&
                                  Number(measured.viewportHeight)>100&&Number.isFinite(Number(measured.labelTop))?
                                  {mode:measured.mode,offset:measured.offset,
                                   viewportWidth:measured.viewportWidth,viewportHeight:measured.viewportHeight,
                                   cardBottom:measured.cardBottom,cardTop:measured.cardTop,
                                   coverLeft:measured.coverLeft,coverWidth:measured.coverWidth,
                                   labelTop:measured.labelTop,labelBottom:measured.labelBottom,
                                   labelLeft:measured.labelLeft,labelWidth:measured.labelWidth,
                                   labelHeight:measured.labelHeight,carouselLiftPx:measured.carouselLiftPx,
                                   footerBandTop:measured.footerBandTop,
                                   measuredTitle:String(measured.measuredTitle||'').slice(0,96)}:null;
                              return {home,manager,cards,geometry};
                            })()""", 'returnByValue': True})
                        state = (check.get('result') or {}).get('value') or {}
                        if not isinstance(state, dict) or not state.get('home') or state.get('manager'):
                            continue
                        frame = await request(502, 'Page.captureScreenshot', {
                            'format': 'jpeg', 'quality': 45, 'fromSurface': True,
                            'captureBeyondViewport': False})
                        raw = frame.get('data')
                        if (not isinstance(raw, str) or len(raw) < 100 or len(raw) > 850_000):
                            return {'ok': False, 'error': 'Steam screenshot was empty or exceeded size limit'}
                        import base64
                        try:
                            binary = base64.b64decode(raw, validate=True)
                        except (ValueError, base64.binascii.Error):
                            return {'ok': False, 'error': 'Steam returned an invalid JPEG frame'}
                        if not binary.startswith(b'\xff\xd8\xff'):
                            return {'ok': False, 'error': 'Steam screenshot was not JPEG'}
                        frame_uri = 'data:image/jpeg;base64,' + raw
                        at = int(time.time()*1000)
                        _HOME_PREVIEW_CACHE.clear()
                        _HOME_PREVIEW_CACHE.update({'data_uri': frame_uri,
                            'target': title, 'time': time.time(), 'captured_at': at,
                            'geometry': state.get('geometry')})
                        return {'ok': True, 'target': title, 'data_uri': frame_uri,
                                'captured_at': at, 'cached': False,
                                'geometry': state.get('geometry')}
                except (aiohttp.ClientError, asyncio.TimeoutError, RuntimeError, ValueError):
                    continue
            if (_HOME_PREVIEW_CACHE.get('data_uri') and
                time.time() - float(_HOME_PREVIEW_CACHE.get('time', 0)) < 600):
                return {'ok': True, 'data_uri': _HOME_PREVIEW_CACHE['data_uri'],
                        'target': _HOME_PREVIEW_CACHE.get('target', 'Steam Home'),
                        'captured_at': _HOME_PREVIEW_CACHE.get('captured_at'),
                        'geometry': _HOME_PREVIEW_CACHE.get('geometry'),
                        'cached': True}
            return {'ok': False, 'error': 'Steam Home is not visible for capture. Close Settings, focus a Home game, then reopen the preview. Recorded layout is still available.'}
    except Exception as exc:
        if (_HOME_PREVIEW_CACHE.get('data_uri') and
            time.time()-float(_HOME_PREVIEW_CACHE.get('time',0)) < 600):
            return {'ok': True, 'data_uri': _HOME_PREVIEW_CACHE['data_uri'],
                    'target': _HOME_PREVIEW_CACHE.get('target','Steam Home'),
                    'captured_at': _HOME_PREVIEW_CACHE.get('captured_at'),
                    'geometry': _HOME_PREVIEW_CACHE.get('geometry'), 'cached': True}
        return {'ok': False, 'error': 'Steam screenshot unavailable: '+str(exc)[:120]}

class Plugin:
    def __init__(self) -> None:
        self._lock = asyncio.Lock()

    async def _main(self) -> None:
        if decky is not None:
            decky.logger.info("TitleDeck backend started (read-only Steam access)")

    async def snapshot(self) -> dict[str, Any]:
        state = load_state()
        games = find_installed_games()
        return {**state, "games": games, "cover_cache": load_cover_cache(), "cover_cache_version": 125, "status": "Steam files are never modified",
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

    async def save_layout_diagnostic(self, report: str) -> dict[str, Any]:
        """Write a bounded, metadata-only layout snapshot. Never include user
        descriptions, game paths, URLs, Steam files, or game metadata."""
        if not isinstance(report, str) or len(report) > 45000:
            raise ValueError("Layout report is too large")
        data = json.loads(report)
        if not isinstance(data, dict) or data.get("format") != "titledeck-layout-v1":
            raise ValueError("Unsupported layout report")
        records = data.get("records")
        if not isinstance(records, list) or len(records) > 4:
            raise ValueError("Invalid layout records")
        sanitized = []
        for record in records:
            if not isinstance(record, dict):
                raise ValueError("Invalid layout record")
            nodes = record.get("nodes")
            if not isinstance(nodes, list) or len(nodes) > 85:
                raise ValueError("Invalid layout nodes")
            clean = []
            for node in nodes:
                if not isinstance(node, dict):
                    raise ValueError("Invalid layout node")
                clean.append({
                    "label": str(node.get("label", ""))[:70],
                    "tag": str(node.get("tag", ""))[:20],
                    "cls": str(node.get("cls", ""))[:150],
                    "rect": node.get("rect") if isinstance(node.get("rect"), dict) else None,
                    "css": node.get("css") if isinstance(node.get("css"), dict) else None,
                    "contents": str(node.get("contents", ""))[:22],
                    "ghost": bool(node.get("ghost")),
                })
            sanitized.append({"kind": "nonsteam-game-info", "nodes": clean})
        path = layout_diagnostic_path()
        async with self._lock:
            store_state({"format": "titledeck-layout-v1", "records": sanitized}, path)
            # Decky can run under a privileged service account. Keep Desktop
            # exports readable and, when possible, owned by the Deck user.
            try:
                path.chmod(0o644)
                if hasattr(os, "geteuid") and os.geteuid() == 0:
                    import pwd
                    account = pwd.getpwnam("deck")
                    os.chown(path.parent, account.pw_uid, account.pw_gid)
                    os.chown(path, account.pw_uid, account.pw_gid)
            except (OSError, KeyError):
                # Export has already succeeded; Desktop ownership adjustment
                # should not prevent the diagnostic button from returning its path.
                pass
        return {"path": str(path), "elements": sum(len(r["nodes"]) for r in sanitized)}

    async def save_controller_diagnostic(self, report: str) -> dict[str, Any]:
        """Export only bounded controller button numbers, never identifying data."""
        if not isinstance(report, str) or len(report) > 30000:
            raise ValueError("Controller diagnostic too large")
        raw = json.loads(report)
        if not isinstance(raw, dict) or raw.get("format") != "titledeck-controller-v1":
            raise ValueError("Unsupported controller diagnostic")
        events = raw.get("events")
        if not isinstance(events, list) or len(events) > 64:
            raise ValueError("Invalid controller diagnostic events")
        clean = []
        for event in events:
            if not isinstance(event, dict):
                raise ValueError("Invalid controller diagnostic event")
            kind = event.get("kind", "")
            if kind not in ("manager-open", "manager-close", "steam-registration",
                            "steam-change", "browser-change", "focus-button", "page"):
                raise ValueError("Invalid controller diagnostic event type")
            item = {"kind": kind}
            for key in ("left", "right"):
                if type(event.get(key)) is bool:
                    item[key] = event[key]
            for key in ("buttons", "upper", "controller", "delta"):
                if type(event.get(key)) is int and -1 <= event[key] <= 0xFFFFFFFF:
                    item[key] = event[key]
            if event.get("source") in ("steam", "gamepad", "shoulder", "steam-focus", "registered", "unavailable", "error"):
                item["source"] = event["source"]
            clean.append(item)
        cleaned = {"format": "titledeck-controller-v1", "version": "1.1.6",
                   "registration": raw.get("registration") if raw.get("registration") in ("not attempted", "registered", "unavailable", "error") else "unknown",
                   "events": clean}
        for key in ("callbacks", "steamSamples", "browserSamples", "pages"):
            count = raw.get(key)
            cleaned[key] = count if type(count) is int and 0 <= count <= 10000000 else 0
        path = controller_diagnostic_path()
        async with self._lock:
            store_state(cleaned, path)
            try:
                path.chmod(0o644)
                if hasattr(os, "geteuid") and os.geteuid() == 0:
                    import pwd
                    account = pwd.getpwnam("deck")
                    os.chown(path.parent, account.pw_uid, account.pw_gid)
                    os.chown(path, account.pw_uid, account.pw_gid)
            except (OSError, KeyError):
                pass
        return {"path": str(path), "events": len(clean)}

    async def get_custom_cover(self, appid: str) -> dict[str, str]:
        """Read the CURRENT SteamGridDB/Steam custom portrait for one game.

        Do not cache the bytes: SteamGridDB can atomically replace an image at
        an unchanged pathname immediately before opening TitleDeck. Reading
        this explicitly on editor entry avoids Chromium's stale image cache.
        Never write to Steam userdata or fetch external artwork.
        """
        import base64
        appid = normalize_id(appid)
        home = Path('/home/deck') if Path('/home/deck').is_dir() else Path.home()
        for steam in steam_roots(home):
            accounts = steam / 'userdata'
            if not accounts.is_dir():
                continue
            try:
                users = [x for x in accounts.iterdir() if x.is_dir() and x.name.isdecimal() and not x.is_symlink()][:12]
            except OSError:
                continue
            for user in users:
                grid = user / 'config' / 'grid'
                for label in (appid + 'p', appid):
                    for extension in ('.png', '.jpg', '.jpeg', '.webp'):
                        image = grid / (label + extension)
                        try:
                            if image.is_symlink() or not image.is_file():
                                continue
                            if not 64 <= image.stat().st_size <= 4_000_000:
                                continue
                            data = image.read_bytes()
                        except (OSError, ValueError):
                            continue
                        if data.startswith(b'\x89PNG\r\n\x1a\n'):
                            mime = 'image/png'
                        elif data.startswith(b'\xff\xd8\xff'):
                            mime = 'image/jpeg'
                        elif data[:4] == b'RIFF' and data[8:12] == b'WEBP':
                            mime = 'image/webp'
                        else:
                            continue
                        return {'data_uri': f'data:{mime};base64,' + base64.b64encode(data).decode('ascii'),
                                'source_type': 'custom'}
        return {'data_uri': '', 'source_type': 'missing'}

    async def get_local_cover(self, appid: str) -> dict[str, str]:
        """Read-only, bounded local Steam artwork recovery.

        Prefer a user's explicit grid portrait, then official cached portraits,
        then known parent-app portraits for two demos. Horizontal banners are
        returned only as a final *adapted* fallback with an honest UI label.
        No network, installs, artwork writes, user-account enumeration beyond
        the first 12 Steam userdata folders, or symlink following.
        """
        import base64

        appid = normalize_id(appid)
        home = Path('/home/deck') if Path('/home/deck').is_dir() else Path.home()
        roots = steam_roots(home)
        parent = {'4226020': '3920610', '3815860': '1984270',
                  '4324810': '4235230', '3745500': '3730100', '219': '220', '410': '400'}.get(appid)

        def image_dimensions(data: bytes):
            try:
                if data.startswith(b'\x89PNG\r\n\x1a\n') and len(data) >= 24:
                    return int.from_bytes(data[16:20], 'big'), int.from_bytes(data[20:24], 'big')
                if data.startswith(b'\xff\xd8\xff'):
                    pos = 2
                    # SOF markers carry dimensions; stop at SOS or 64 KB.
                    while pos + 9 < min(len(data), 65536):
                        if data[pos] != 0xff:
                            pos += 1; continue
                        while pos < len(data) and data[pos] == 0xff:
                            pos += 1
                        if pos >= len(data): break
                        marker = data[pos]; pos += 1
                        if marker in (0xd8, 0xd9) or 0xd0 <= marker <= 0xd7: continue
                        if marker == 0xda: break
                        if pos + 2 > len(data): break
                        length = int.from_bytes(data[pos:pos+2], 'big')
                        if length < 2 or pos + length > len(data): break
                        if marker in (0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf):
                            return int.from_bytes(data[pos+5:pos+7],'big'), int.from_bytes(data[pos+3:pos+5],'big')
                        pos += length
                if data[:4] == b'RIFF' and data[8:12] == b'WEBP' and len(data) >= 30:
                    if data[12:16] == b'VP8X':
                        return 1+int.from_bytes(data[24:27],'little'),1+int.from_bytes(data[27:30],'little')
                    if data[12:16] == b'VP8 ' and data[23:26] == b'\x9d\x01\x2a':
                        return int.from_bytes(data[26:28],'little')&0x3fff,int.from_bytes(data[28:30],'little')&0x3fff
                    if data[12:16] == b'VP8L' and len(data)>=25 and data[20]==0x2f:
                        bits=int.from_bytes(data[21:25],'little')
                        return (bits&0x3fff)+1,((bits>>14)&0x3fff)+1
            except (ValueError, OverflowError, IndexError):
                pass
            return None

        def verified_image(file: Path, source: str):
            try:
                if file.is_symlink() or not file.is_file():
                    return None
                size = file.stat().st_size
                if not 64 <= size <= 4_000_000:
                    return None
                data = file.read_bytes()
            except (OSError, ValueError):
                return None
            if data.startswith(b'\x89PNG\r\n\x1a\n'):
                mime = 'image/png'
            elif data.startswith(b'\xff\xd8\xff'):
                mime = 'image/jpeg'
            elif data[:4] == b'RIFF' and data[8:12] == b'WEBP':
                mime = 'image/webp'
            else:
                return None
            dims = image_dimensions(data)
            if source in ('cache', 'parent') and (not dims or not 0.40 <= dims[0]/max(1,dims[1]) <= 0.92):
                # A cached horizontal library_capsule is not a usable portrait.
                return None
            if source == 'adapted' and dims and dims[0] / max(1,dims[1]) < 0.93:
                # Rare portrait stored under a header path: show it as a
                # Steam-cache image, not a forced landscape adaptation.
                source = 'cache'
            return {'data_uri': f'data:{mime};base64,' + base64.b64encode(data).decode('ascii'),
                    'source_type': source}

        # Preserve user art first. A grid override is an explicit user choice.
        for steam in roots:
            accounts = steam / 'userdata'
            if not accounts.is_dir():
                continue
            try:
                users = [x for x in accounts.iterdir() if x.is_dir() and x.name.isdecimal()][:12]
            except OSError:
                continue
            for user in users:
                grid = user / 'config' / 'grid'
                for label in (appid+'p', appid):
                    for ext in ('.png', '.jpg', '.jpeg', '.webp'):
                        result = verified_image(grid / (label + ext), 'custom')
                        if result:
                            return result

        # Portraits must precede horizontal banners. Accommodate the two
        # common Steam librarycache layouts and content-hashed nested assets.
        def candidates(ident: str, *, portrait: bool):
            stems = ('library_600x900', 'library_600x900_2x', 'library_capsule', 'library_capsule_2x', 'portrait') if portrait else ('header',)
            for steam in roots:
                cache = steam / 'appcache' / 'librarycache'
                for stem in stems:
                    for ext in ('.jpg', '.png', '.webp'):
                        yield cache / f'{ident}_{stem}{ext}'
                        yield cache / ident / f'{stem}{ext}'
                # Bounded Steam asset hash dirs, never a broad recursive scan.
                sub = cache / ident
                if sub.is_dir():
                    try:
                        subdirs = [d for d in sub.iterdir() if d.is_dir() and not d.is_symlink()][:18]
                    except OSError:
                        subdirs = []
                    for folder in subdirs:
                        for stem in stems:
                            for ext in ('.jpg', '.png', '.webp'):
                                yield folder / f'{stem}{ext}'

        # For particularly letterboxed legacy demos, use clean parent portrait
        # after any explicit user custom override. Never write Steam grid files.
        preferred = ((parent, 'parent'), (appid, 'cache')) if appid in ('219', '410') else ((appid, 'cache'), (parent, 'parent'))
        for ident, source_type in preferred:
            if not ident:
                continue
            for file in candidates(ident, portrait=True):
                result = verified_image(file, source_type)
                if result:
                    return result
        for file in candidates(appid, portrait=False):
            result = verified_image(file, 'adapted')
            if result:
                return result
        return {'data_uri': '', 'source_type': 'missing'}

    async def save_cover_cache(self, sources: dict[str, int]) -> dict[str, Any]:
        entries = validate_cover_cache(sources)
        async with self._lock:
            store_state(entries, cover_cache_path())
        return {"saved": len(entries)}

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

    async def restore_original_game(self, appid: str) -> dict[str, Any]:
        """Reset *all* TitleDeck overrides for this game in one atomic write.

        This deliberately does not modify Valve metadata, installed game files,
        another game's customizations, or the user's manual backup.
        """
        appid = normalize_id(appid)
        async with self._lock:
            state = load_state()
            had_title = state["aliases"].pop(appid, None) is not None
            had_description = state["descriptions"].pop(appid, None) is not None
            if had_title or had_description:
                store_state(state)
            return {**state, "restored_title": had_title,
                    "restored_description": had_description}

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
        if not isinstance(position, str) or position not in ("below_play", "hero_footer", "game_info"):
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

    async def set_home_menu_titles(self, enabled: bool) -> dict[str, Any]:
        """Toggle the reversible STEAM-button menu alias display without editing Steam metadata."""
        if not isinstance(enabled, bool):
            raise ValueError("HOME-menu title setting must be true or false")
        async with self._lock:
            state = load_state()
            state["home_menu_titles"] = enabled
            store_state(state)
            return state

    async def set_home_menu_preview(self, enabled: bool) -> dict[str, Any]:
        """Compatibility for older Preview clients; new settings use set_home_menu_titles."""
        return await self.set_home_menu_titles(enabled)

    async def get_art_hero_diagnostic(self) -> dict[str, Any]:
        """Report CSS Loader's saved Art Hero settings, without modifying files."""
        return _titledeck_art_hero_diagnostic()

    async def art_hero_cssloader_rpc(self, method: str, args: Any=None) -> dict[str,Any]:
        """Perform a strictly allowlisted Art Hero operation on CSS Loader's local API."""
        return await _titledeck_css_loader_rpc(method,args)

    async def home_renderer_snapshot(self) -> dict[str, Any]:
        """An opt-in, memory-only screenshot for the expanded real Home preview."""
        return await _titledeck_home_snapshot()

    async def home_renderer_cef(self, probe_code: str, apply_code: str = '') -> dict[str, Any]:
        """Discover the visible local Steam CEF tab and probe/apply TitleDeck Home.

        Uses localhost only; returns honest error and renderer evidence. The
        plugin UI never needs to enable externally accessible remote debugging.
        """
        return await _titledeck_cef_home(probe_code, apply_code)

    async def get_home_carousel_mapping(self) -> dict[str, Any]:
        """Return Steam's current read-only carousel class mappings.

        Ported from HomeCarouselFix 1.6.0, without requiring that plugin.
        Does not change CSS Loader themes or any Steam file.
        """
        return _titledeck_home_mapping()

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
            # Accept existing backups from earlier preview builds without
            # truncating the user's locally saved text. New saves still cap
            # descriptions without a per-description length cap.
            normalize_id(k): validate_description(v, allow_legacy=True) for k, v in incoming_descriptions.items()
        }
        position = obj.get("description_position")
        if position is not None and (not isinstance(position, str) or position not in ("below_play", "hero_footer", "game_info")):
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
