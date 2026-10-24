# Source, tests and packaging

TitleDeck 0.8.1 is a Decky Loader plugin with a self-contained frontend and Python backend.

- `src/index.js`: author-maintained frontend source
- `dist/index.js`: matching installed frontend
- `main.py`: alias persistence and read-only installed game discovery
- `plugin.json`, `package.json`: package metadata
- `assets/`: approved icon and Quick Access artwork
- `tests/`: frontend and backend regression checks
- `docs/screenshots/v0.8.1/`: release gallery

The [v0.8.1 release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.8.1) is the source of the installable ZIP. The original 0.8.1 release source and seven screenshots were imported after SHA-256 verification on 2026-10-24; the one-time importer was retired after the files were committed. Future code changes are checked by `.github/workflows/validate.yml`.

## Tests

```sh
node --test tests/frontend.test.cjs
python3 -m unittest discover -s tests -p 'test_backend.py'
```

The frontend release files are deliberately identical: `src/index.js` and `dist/index.js`. Keep version strings synchronized on future releases. Hardware testing is essential for changes to Steam UI integration or controller focus.

## Release process
1. Preserve backwards compatibility for local aliases, backup and recovery.
2. Verify controller interactions in Gaming Mode.
3. Run tests and review any changed Steam UI assumptions.
4. Publish a prerelease until stable acceptance criteria are met.
5. Link real screenshots and document hardware findings distinctly from local tests.
