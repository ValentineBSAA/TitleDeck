# Contributing to TitleDeck
Thank you for using TitleDeck, sharing an idea, testing a release, or reporting a problem. Those contributions have shaped the project.

## Help without writing code
Try the current [1.4.0 release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.4.0), share reproducible bugs in [Issues](https://github.com/ValentineBSAA/TitleDeck/issues), or post suggestions and experiences in [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions). Please include SteamOS/Decky/CSS Loader versions and controller details when behavior depends on themes or input.

## Code contributions
TitleDeck is MIT licensed. Please open an issue or discussion for larger redesigns before investing extensive work. Keep changes focused, preserve existing local data and backward compatibility, and avoid claims of on-device validation based only on automated tests.

The **1.4.0 installer is published** but the default branch was still at 1.2.2 when the current docs were prepared; check [SOURCE.md](SOURCE.md) for synchronization status before basing a patch on `main`.

For verified current source, expected checks include JavaScript tests, Python unittest discovery, version synchronization, syntax checks and installer/source comparison. The submitted 1.4.0 handoff passed **79 JavaScript / five Python** tests. Any code change affecting runtime should be checked on a real Steam Deck before a stable release.

## Project principles
- Keep local customization **reversible**; never rewrite installed game files or official Steam metadata.
- Favor Deck controller navigation and legible interfaces over decorative complexity.
- Respect theme ownership: TitleDeck must not pretend to control Art Hero's placement.
- Report known limitations plainly and preserve historical release documentation.
- Keep feedback welcoming and focused on what works or can be reproduced.

**your titles you're deck!**
