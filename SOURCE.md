# TitleDeck source and release provenance

## Current releases

- **0.9.2 Beta 1 (public pre-release):** [release page](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2-beta.1). Install asset `TitleDeck-0.9.2-Beta1-Decky.zip`, SHA-256 `f1b9e4d915c8b1b13ac34c3b620cdd19770b01f9790636f0108b8c691f0a1812`.
- **0.9.0 RC1 (earlier release):** [release page](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.0). Install asset `TitleDeck-0.9.0-RC1-SteamDeck.zip`, SHA-256 `6bf8467b3637334ee21b3e50302be5d9ea15880ab80dbc27f190438bbc415c73`.

## Important source synchronization notice

**The files under this repository's `src/`, `dist/`, `main.py`, `plugin.json`, `package.json` and `tests/` were previously synchronized to the 0.9.0 RC1 runtime. They have NOT yet been synchronized to 0.9.2 Beta 1.**

The public beta's **GitHub release ZIP** is the authoritative tested beta runtime. The older repository source must **not** be represented as the source for the new beta until a subsequent verified synchronization. This matters if you clone `main`, run local tests or attempt to build a package yourself.

The beta ZIP is a **lean runtime installer** with one root `TitleDeck/` folder. It includes `plugin.json`, `package.json`, `main.py`, `dist/index.js`, artwork, license and user/release notes. It does **not** include the complete editable beta source or test suite. The 0.9.2 runtime and source-parity task remains open; see [Roadmap](docs/ROADMAP.md).

The 0.9.0 RC1 repository baseline was previously imported from a checksummed release artifact using GitHub Actions and included its matching `src/` and `dist/` scripts and tests. Those historical claims apply to **RC1 only**.

## Screenshot provenance

The revised beta screenshot ZIP is also attached to the [beta release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2-beta.1), SHA-256 `d10bc897f1c932537fc95e64689dbb6a516b1d73c466fe5bd7cd4a2afb1bedef`. A dedicated GitHub workflow imports the three allowed JPEGs, verifies this exact digest and preserves image bytes unchanged. No content is executed from the screenshot archive.

## Hardware vs automated tests

The creator accepted native Game Info description rendering, fast tab switching and restoration on an actual Steam Deck. The 0.9.2 beta build was reported as passing **107 frontend and 17 backend tests**. That does not prove support for other handhelds, CSS Loader themes, future Steam updates or every third-party plugin.

[Physical acceptance](docs/VERIFIED_ON_DECK.md) · [Compatibility](docs/COMPATIBILITY.md) · [Support](SUPPORT.md).
