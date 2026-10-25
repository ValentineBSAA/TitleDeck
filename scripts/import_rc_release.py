#!/usr/bin/env python3
"""Import an exact, checksum-verified RC ZIP into the repository source tree.

This deliberately leaves README.md and docs/ untouched, so branded GitHub
documentation and historical Steam Deck screenshots remain stable.
"""
import hashlib
import json
import sys
import zipfile
from pathlib import Path, PurePosixPath

EXPECTED_SHA256 = "ac69843260d1e88e9ca2bdcc32ef7df74a638e0580a72776d59d25ade7456fa3"
VERSION = "0.9.0-rc.1"
ALLOWED = {
    "CHANGELOG.md", "main.py", "package.json", "plugin.json",
    "src/index.js", "dist/index.js",
    "tests/frontend.test.cjs", "tests/rc_release.test.cjs",
    "tests/test_backend.py",
}

def main(archive: Path) -> None:
    data = archive.read_bytes()
    checksum = hashlib.sha256(data).hexdigest()
    if checksum != EXPECTED_SHA256:
        raise SystemExit(f"Refusing release file: SHA256 {checksum} doesn't match approved RC")
    with zipfile.ZipFile(archive) as z:
        if z.testzip():
            raise SystemExit("Release ZIP failed CRC validation")
        names = set(z.namelist())
        expected_names = {"TitleDeck/" + p for p in ALLOWED}
        if not expected_names.issubset(names):
            raise SystemExit(f"Missing approved files: {sorted(expected_names-names)}")
        for member in z.namelist():
            path = PurePosixPath(member)
            if path.is_absolute() or ".." in path.parts or not path.parts or path.parts[0] != "TitleDeck":
                raise SystemExit(f"Unsafe file path: {member}")
        for relative in sorted(ALLOWED):
            info = z.getinfo("TitleDeck/" + relative)
            if info.file_size > 300_000:
                raise SystemExit("Unexpected source size")
            dest = Path(relative)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(z.read(info))
    pkg = json.loads(Path("package.json").read_text(encoding="utf-8"))
    plugin = json.loads(Path("plugin.json").read_text(encoding="utf-8"))
    assert pkg["version"] == plugin["version"] == VERSION
    assert plugin["name"] == "TitleDeck" and plugin["api_version"] == 1
    assert Path("src/index.js").read_bytes() == Path("dist/index.js").read_bytes()
    print("Imported",len(ALLOWED),"RC source and test files, SHA256",checksum)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/import_rc_release.py TitleDeck-0.9.0-RC.zip")
    main(Path(sys.argv[1]))
