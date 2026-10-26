# TitleDeck source and release provenance

## Current published builds

- **Current public beta:** [TitleDeck v0.9.2 Beta 1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2-beta.1), installer `TitleDeck-0.9.2-Beta1-Decky.zip` (SHA-256 `f1b9e4d915c8b1b13ac34c3b620cdd19770b01f9790636f0108b8c691f0a1812`).
- **Earlier RC:** [0.9.0 RC1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.0), `TitleDeck-0.9.0-RC1-SteamDeck.zip` (SHA-256 `6bf8467b3637334ee21b3e50302be5d9ea15880ab80dbc27f190438bbc415c73`).

## Verified runtime-source synchronization

The checked-in `main.py`, `plugin.json`, `package.json` and `dist/index.js` were synchronized from the **checksum-verified, published 0.9.2 beta installer**. The repository's `src/index.js` is byte-identical to `dist/index.js`. GitHub Actions completed the source synchronization and the release-tag alignment successfully. These files are **not** the obsolete 0.9.0 RC1 runtime.

- The installed frontend from the official beta ZIP has SHA-256 `2a735efe47df5e35c72d26420bf485f718cc1ab7bd0a7f4063e171686025bf7c`. The repository's `src/index.js` and `dist/index.js` match that runtime.
- The ZIP is intentionally a **lean Decky installer**, not a complete source-and-tests archive. The GitHub repository is the place to inspect the editable source and development tests.
- The development beta was reported as passing **107 JavaScript and 17 Python tests**. This count belongs to the development acceptance run, not a promise that every file in the lean release ZIP contains the original test suite. The repository's current regression tests run separately through GitHub Actions.
- Game Info acceptance was verified on the maintainer's own Steam Deck. No unit-test count should be interpreted as universal hardware compatibility.

The published release tag is a fixed historical snapshot. Future documentation-only commits on `main` do not require rewriting the signed-off beta installer or retroactively moving its tag.

## Screenshots and image provenance

Three physically captured beta screenshots are included in [the gallery](docs/SCREENSHOTS.md). Their source was the maintainer's revised screenshot archive, with SHA-256 `d10bc897f1c932537fc95e64689dbb6a516b1d73c466fe5bd7cd4a2afb1bedef`. The individual JPEG bytes were imported into the repository unchanged.

The beta release also offers a **curated three-image screenshot archive** generated from those exact repository JPEGs. It is a separate ZIP from the original maintainer archive; therefore its ZIP checksum is different. Neither screenshot ZIP is a Decky installer.

Historical 0.8.1 screenshots and four useful 0.9.0 RC1 examples remain clearly labeled, but the beta Quick Access and Game Info images represent the current feature.

[Hardware verification](docs/VERIFIED_ON_DECK.md) · [Install](docs/INSTALL.md) · [Beta notes](docs/RELEASE_NOTES_0.9.2_BETA1.md).
