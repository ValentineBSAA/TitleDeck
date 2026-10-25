# TitleDeck source and release packaging

**0.9.0 RC1** is intended for a physical Steam Deck in SteamOS Gaming Mode. **ROG Ally, other SteamOS-like PC handhelds, Desktop Mode, Windows and Android/DroidDeck are not verified.**

The install ZIP `TitleDeck-0.9.0-RC1-SteamDeck.zip` includes a single root `TitleDeck/` folder with:

```text
TitleDeck/
  main.py
  plugin.json
  package.json
  src/index.js
  dist/index.js
  assets/titledeck-icon.png
  assets/titledeck-qam.webp
  tests/frontend.test.cjs
  tests/release_metadata.test.cjs
  tests/test_backend.py
  README.md
  CHANGELOG.md
  LICENSE
```

Its plugin, package and frontend versions all equal **`0.9.0-rc.1`**. The source and installed frontend files are byte-identical. The RC ZIP passed **48 frontend and 11 backend tests**, but these tests do not prove universal hardware compatibility.

## Published release and exact source

The official [TitleDeck 0.9.0 RC1 prerelease](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.0) uses **GitHub tag `0.9.0`** while its **internal plugin version is `0.9.0-rc.1`**. This is intentional and does not require changing or rebuilding the published ZIP.

The already-uploaded `TitleDeck-0.9.0-RC1-SteamDeck.zip` has SHA-256:

```
6bf8467b3637334ee21b3e50302be5d9ea15880ab80dbc27f190438bbc415c73
```

The GitHub Actions importer verified that exact ZIP checksum, extracted its release source, ran the frontend and backend tests, and committed the synchronized code and tests to `main`. The assets were already identical. The original public README and the older Steam Deck screenshot gallery were intentionally preserved.

The importer is `.github/workflows/import-090-rc.yml`. The duplicate obsolete importer was removed. The historical 0.8.1 release remains available.

## Tests

```sh
node --test tests/*.test.cjs
python3 -m unittest discover -s tests -p 'test_backend.py'
```

Report hardware test results separately. The known intermittent native keyboard dismissal remains unresolved; see [Release notes](docs/RELEASE_NOTES_0.9.0_RC1.md).
