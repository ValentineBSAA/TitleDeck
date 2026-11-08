# Contributing to TitleDeck

Thank you for using TitleDeck, suggesting features, reporting problems, or helping test builds. The community's ideas and everyday feedback helped turn a title editor into a much more capable customization plugin.

## Getting started
Use [TitleDeck 1.4.0](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.4.0) and read the [beginner guide](docs/BEGINNER_GUIDE.md), [current features](docs/FEATURES.md), and [compatibility details](docs/COMPATIBILITY.md). Post usage questions in [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions) and reproducible bugs in [Issues](https://github.com/ValentineBSAA/TitleDeck/issues).

## Source and tests
The public `main` branch now contains the **exact installed 1.4.0 backend/frontend and theme assets**, synchronized from the SHA-256 verified official installer. Run:

```bash
npm run version:check
npm test
python3 -m unittest discover -s tests -p 'test_*.py'
```

For complete packaging and provenance instructions see [Build and verification](docs/BUILD_AND_VERIFICATION.md) and [SOURCE.md](SOURCE.md). The historical 1.2.2 tests are preserved under `tests/archive/legacy-1.2.2/`; they are not intended to run against newer code. The developer's original 1.4.0 handoff passed 79 JavaScript and five Python tests; repository CI checks are independently displayed in GitHub Actions.

## Contribution principles
- Preserve original Steam game metadata and installed files, and keep local edits reversible.
- Keep controller navigation and couch readability central.
- Treat Art Hero as the layout owner when active; the 1.4.0 integration is intentionally read-only.
- Include versions and reproducible input steps for SteamOS, Decky and CSS Loader issues.
- Do not describe automated tests as proof of physical Steam Deck verification.
- Keep prior release history and historical screenshots accurately labeled.

Large changes are welcome as proposals first, with implementation and testing once the behavior is agreed upon.

**your titles you're deck!**
