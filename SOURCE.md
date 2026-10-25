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

## Release source synchronization

The prior **0.8.1** code remains in the public repository until the maintainer publishes tag `0.9.0-rc.1` with the verified ZIP. After publication, the GitHub Actions workflow `.github/workflows/import-090-rc.yml` checks the exact ZIP checksum and imports updated source, tests and manifests, without overwriting the polished repository README or the seven historical 0.8.1 screenshots.

**Until that import workflow succeeds, GitHub main may still show the older 0.8.1 code.** The RC installer contains the full matching source. If the asset is added after the release is published, the maintainer can manually dispatch the import workflow.

## Tests

```sh
node --test tests/*.test.cjs
python3 -m unittest discover -s tests -p 'test_backend.py'
```

Report hardware test results separately. The known intermittent native keyboard dismissal remains unresolved; see [Release notes](docs/RELEASE_NOTES_0.9.0_RC1.md).
