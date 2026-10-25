# TitleDeck source and packaging

**Prepared RC version:** 0.9.0-rc.1. **Status:** awaiting maintainer's GitHub prerelease ZIP upload. The source files currently committed on `main` remain from **0.8.1** until the release is published. The repository includes a checksum-verified [release-source sync workflow](.github/workflows/sync-rc-source.yml) that imports the exact RC source and tests **after** upload and publication. This avoids having mismatched installer/source content.

> **Compatibility warning:** TitleDeck is developed and device-tested on a **physical Valve Steam Deck running SteamOS Gaming Mode with Decky Loader**. **ROG Ally, other handheld PCs, third-party SteamOS installations or derivatives, Windows, Android/DroidDeck, and Desktop Mode are not verified or officially supported.** The interface, Decky integration, controller focus, and Steam keyboard may behave differently or fail on those systems.

## Layout

- `src/index.js` and `dist/index.js`: identical runtime frontend / bundled Decky UI logic.
- `main.py`: local alias storage, backup and restore, read-only installed-game discovery.
- `plugin.json`, `package.json`: same RC version.
- `assets/titledeck-icon.png`, `assets/titledeck-qam.webp`: existing branded artwork.
- `tests/`: regression checks. Automated tests do not imply physical compatibility.
- `docs/screenshots/v0.8.1/`: 7 original Steam Deck screenshots, still reused while RC artwork is gathered.

## Local tests

```sh
node --test tests/frontend.test.cjs
python3 -m unittest discover -s tests -p test_backend.py
```

The RC ZIP has a single top-level `TitleDeck/` directory. Its `src/index.js` and `dist/index.js` must be byte-for-byte identical to one another **and** to the GitHub RC source snapshot. Each release should document test totals and known device limitations.

## Publishing

The import workflow expects the **exact tag `0.9.0-rc.1`** and the file **`TitleDeck-0.9.0-RC.zip`**. It checks SHA-256, imports only approved source files, runs the tests, and commits the source to `main`. If the ZIP is uploaded *after* publishing the release, run **Actions → Sync TitleDeck RC source after release upload → Run workflow** to trigger it manually.

1. Make a backup of aliases, then run all tests and check the ZIP integrity/version.
2. Mark the GitHub release as **Pre-release** and tag it `0.9.0-rc.1`; attach `TitleDeck-0.9.0-RC.zip`.
3. Paste the contents of [0.9.0 RC release notes](docs/RELEASE_NOTES_0.9.0-RC.md); do not call it fully stable or fully device accepted.
4. Confirm the source sync workflow succeeds; preserve the historical 0.8.1 release and its v0.8.1 screenshot gallery.
5. Verify the first 0.9.0 RC install on a physical Deck before promoting further.

[Verified features](docs/VERIFIED_ON_DECK.md) · [Roadmap](docs/ROADMAP.md).
