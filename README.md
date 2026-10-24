# TitleDeck

**Your library. Your names.**

A controller-first Decky Loader plugin for customizing **displayed Steam game titles** without changing installed game files, Steam manifests, or canonical metadata.

**Version:** 0.8.1 (Steam Deck device-test prerelease) · **License:** MIT · **Platform:** Steam Deck / SteamOS Gaming Mode.

![TitleDeck icon](assets/titledeck-icon.png)

## Features

- Rename displayed game titles per Steam App ID. Example: **Catherine Classic → Catherine**.
- Browse the full game library with artwork, search, filters, and controller navigation.
- Edit with a built-in controller-friendly keyboard.
- Save, undo an individual alias, or Restore All with confirmation, a paginated review of every renamed game, and an automatic recovery backup.
- Animated, automatically dismissing notifications and a visible version label.

## Screenshots

[Browse the organized Steam Deck screenshots](docs/SCREENSHOTS.md).

## Install

1. Install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader).
2. Download **TitleDeck-0.8.1-Editor-DPad-Fix.zip** from the [0.8.1 prerelease](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.8.1).
3. Use Decky's developer **Install Plugin from ZIP** control.
4. Open Quick Access → Decky → TitleDeck → **Open full library manager**.
5. Choose a game and save its custom display name.

The screenshot ZIP attached to the release is not the plugin installer. Existing aliases should be preserved when updating. [Detailed installation instructions](docs/INSTALL.md).

## Verified on a Steam Deck

| Feature | Status |
| --- | --- |
| Catherine Classic visibly renamed Catherine | **Confirmed** |
| Original Catherine Classic title restored | **Confirmed** |
| Custom name survived a Steam Deck restart | **Confirmed** |
| Editor four-direction D-pad fix for game editors | **Confirmed by creator** |
| Animated notifications and improved highlight colors | **Confirmed by creator** |
| Survives every Steam background metadata refresh | **Not separately verified** |
| Changes all Steam UI locations or artwork lettering | **Not claimed** |
| Native Steam cover-name badges | **Removed from plugin** |
| 200+ names in Restore All review | **Simulated tests; hardware verification pending** |

**Important:** TitleDeck changes text where its display adapter can apply it. It does not repaint text baked into cover art, and Steam UI/theme changes may affect coverage. The release is a prerelease, not an official Decky Store listing.

[Full verification record](docs/VERIFIED_ON_DECK.md) · [0.8.1 release notes](docs/RELEASE_NOTES_0.8.1.md)

## Code and development

This repository mirrors the released plugin's `main.py` backend, `src/index.js` frontend, `dist/index.js` compiled bundle, tests, and MIT license. Automated tests can be run with:

```sh
node --test tests/frontend.test.cjs
python3 -m unittest discover -s tests -p 'test_backend.py'
```

[Source and maintenance](SOURCE.md) · [Roadmap](docs/ROADMAP.md) · [Contributing](CONTRIBUTING.md).

## Support and discussion

Report reproducible bugs via [Issues](https://github.com/ValentineBSAA/TitleDeck/issues), including SteamOS, Decky, theme, and TitleDeck version. [Support and troubleshooting](SUPPORT.md) · [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions).

Share feedback, questions, and screenshots in [GitHub Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions).

Created by Valentine. Independent from Valve, Steam, Decky Loader, and game publishers. MIT license, see [LICENSE](LICENSE).
