# Contributing to TitleDeck

Thanks for helping improve TitleDeck! The project targets **physical Steam Deck / SteamOS Gaming Mode** with Decky Loader.

## Start here
- Read [Beginner guide](docs/BEGINNER_GUIDE.md) for feature behavior and Settings terminology.
- Read [Feature reference](docs/FEATURES.md), [Compatibility](docs/COMPATIBILITY.md), and [Verified on Deck](docs/VERIFIED_ON_DECK.md).
- Use [Issues](https://github.com/ValentineBSAA/TitleDeck/issues) for reproducible bugs and [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions) for ideas.

## Development workflow
- The checked-in source is currently **published 0.9.2**, whereas **1.1.8 is an upcoming privately tested build**. Do not mistake the documentation for a 1.1.8 runtime commit.
- Frontend checks: `node --test tests/*.test.cjs`.
- Backend / documentation checks: `python3 -m unittest discover -s tests -p 'test_*.py'`.
- Preserve `src/index.js` / `dist/index.js` byte parity within any release version; align backend and manifests with the exact intended ZIP.
- Keep hardware observations separate from simulated checks. The maintainer has confirmed 1.1.8 custom descriptions after reboot and built-in/PS4 LB/RB paging, but **Game Info description right-stick scrolling is not currently working**.
- Avoid broad Steam DOM or controller rewrites when fixing an isolated issue. Protect working restoration, custom artwork, Steam-native navigation and explicit saves.
- TitleDeck must not modify installed executables, original Steam metadata, game sort identities, or delete hidden Steam shortcuts.
- Keep developer diagnostics opt-in, not displayed in the public UI.
- Provide screenshots with real version labels and clear source/device context.

## Before proposing a release
- Verify game rename / Save, Steam and non-Steam descriptions, original restoration, LB/RB on actual Deck, TitleDeck manager right-stick, artwork and Settings.
- Record any outstanding failure rather than overstating compatibility.
- Follow [1.1.8 release checklist](docs/RELEASE_CHECKLIST.md) and [source integrity](SOURCE.md).

MIT licensed. Thank you to u/TacoOfGod and u/All-Stars64 for the original feature ideas.
