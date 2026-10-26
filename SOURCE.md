# TitleDeck release source and provenance

## Current release

- **Stable:** [0.9.2](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2), installer `TitleDeck-0.9.2.zip`.
- **Historical beta:** [0.9.2-beta.1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2-beta.1), original installer checksum `f1b9e4d915c8b1b13ac34c3b620cdd19770b01f9790636f0108b8c691f0a1812`.
- **Historical RC:** [0.9.0](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.0).

The 0.9.2 stable release promotes the accepted beta-era features without intentional changes to title editing, descriptions, or restoration. The repository's plugin manifests and frontend version now identify **0.9.2**, and the editable `src/index.js` and bundled `dist/index.js` must remain identical.

**Testing claims have boundaries.** Physical Steam Deck reports establish title editing, persistence and Game Info interactions for earlier builds. Automated checks test repository code, not every SteamOS configuration. The published 0.9.2 stable ZIP's SHA-256 and byte-for-byte parity of plugin.json, package.json, main.py and dist/index.js with the repository have been verified by GitHub Actions. An independent physical Steam Deck stable-install acceptance test is still needed. For evidence see [hardware testing](docs/VERIFIED_ON_DECK.md) and [compatibility](docs/COMPATIBILITY.md).

## Screenshot provenance

The [gallery](docs/SCREENSHOTS.md) contains original 0.9.2 Beta 1 hardware screenshots. Their displayed beta version badge is historical and **is not a screenshot of stable 0.9.2**. Earlier RC1 and 0.8.1 images remain as development history.

[Install](docs/INSTALL.md) · [Release notes](docs/RELEASE_NOTES_0.9.2.md) · [Support](SUPPORT.md).
