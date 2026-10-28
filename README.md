<p align="center"><img src="assets/titledeck-icon.png" width="128" alt="TitleDeck icon"></p>
<h1 align="center">TitleDeck</h1>
<p align="center"><strong>Your library. Your names. Your descriptions.</strong></p>
<p align="center">
  <img alt="Next version" src="https://img.shields.io/badge/next-1.1.8%20candidate-7c294c">
  <img alt="Published release" src="https://img.shields.io/badge/published-0.9.2-blue">
  <img alt="Platform" src="https://img.shields.io/badge/tested-Steam%20Deck-brightgreen">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-lightgrey"></a>
</p>

**TitleDeck** customizes the **names and Game Info descriptions** you see in SteamOS Gaming Mode. It works with Steam games and non-Steam shortcuts, keeps changes local, and lets you restore the original display. It does **not** rename your installation files or rewrite Steam's canonical metadata.

> [!IMPORTANT]
> **Release status (October 27, 2026):** **1.1.8 is being prepared for public release, not yet published.** The maintainer has tested the candidate on a physical Steam Deck, including restart persistence for Steam and non-Steam descriptions, built-in Deck and PS4 LB/RB library paging, artwork and hide-tile behavior. **One newly reported issue remains:** right-stick scrolling does not respond in Steam/non-Steam **description boxes**. We are tracking this separately from the successfully tested description display and persistence. The source on `main` and the latest downloadable GitHub release remain **0.9.2** until the final installer is published and its source synchronized.

**Start here:** [Beginner's guide](docs/BEGINNERS_GUIDE.md) · [Full feature guide](docs/FEATURES.md) · [Install and update](docs/INSTALL.md) · [Screenshots](docs/SCREENSHOTS.md) · [Troubleshooting](SUPPORT.md)

**Download currently published version:** [GitHub Releases](https://github.com/ValentineBSAA/TitleDeck/releases). The **0.9.2 release has a known Game Info description reliability issue**; see [issue #6](https://github.com/ValentineBSAA/TitleDeck/issues/6). Do not mistake its historical installer for the pending 1.1.8 update.

## What can TitleDeck do?

| Feature | What it means |
| --- | --- |
| **Rename a game** | Change its displayed name locally without altering game files. Preview **Suggest Cleanup** and choose **Save Custom Title** explicitly. |
| **Custom Game Info descriptions** | Write personalized descriptions for Steam games **and** non-Steam shortcuts. Show them inside Steam's Game Info tab or choose another supported placement in Settings. |
| **Restore originals** | Restore a game's original title and description, or restore only its description. |
| **Full Library Manager** | Search, browse, filter All / Installed / Renamed, and navigate artwork tiles with the D-pad, touchscreen, or controllers. |
| **Controller paging** | Page with **LB/RB** using the Deck's built-in controls or a PS4 Bluetooth controller (hardware-tested in candidate builds). |
| **More complete cover art** | Use official Steam artwork, read-only local artwork caches, and custom grid images where available. Fill a tile with a soft background without cropping the foreground cover. |
| **Hide an unwanted tile** | Hide entries such as **ES-DE (Program)** from TitleDeck's manager **without deleting anything from Steam**. Restore hidden entries in Settings. |
| **Appearance** | Change the accent color, use preset colors or the custom RGB picker, and keep a controller-friendly layout. |
| **Backup / recovery** | Use the built-in backup and recovery controls before large changes. |

### A simple example

Open **Quick Access (•••) → Decky Loader → TitleDeck → Full Library Manager**, select a game, then use **Change Name** or the custom description editor. Saving a name and saving a description are separate actions. To see a saved Game Info description, open the game's Steam page and select **Game Info** next to Community.

For detailed pictures and every step, see the [beginner's guide](docs/BEGINNERS_GUIDE.md).

## Controls at a glance

- **D-pad:** move between controls and games.
- **A:** select or activate. **B:** back/close.
- **LB/RB:** previous/next page in Full Library Manager, including Deck and PS4 controller hardware-tested paths.
- **Right stick:** intended to scroll longer **Full Library Manager editor/settings** areas. **Known issue:** right-stick scrolling in Steam/non-Steam **description boxes** is currently reported not working. Use the scrollbar/touchscreen where available until retested.
- **Touchscreen:** select tiles, buttons, and scrollable content.

[Detailed controls and Settings walkthrough](docs/BEGINNERS_GUIDE.md#controller-controls).

## Screenshots

**New 1.1.8 screenshots are being prepared.** This README deliberately does not present older screenshots as current. The updated [gallery](docs/SCREENSHOTS.md) has a 1.1.8 section ready for individually extracted images. **The screenshots ZIP is an upload source, not an installer or a public release asset.**

Historical screenshots remain available:

| 0.9.2 Beta 1: Game Info | 0.9.0 RC1: Library manager |
|:---:|:---:|
| [![Historical Catherine Game Info screenshot](docs/screenshots/v0.9.2-beta1/02-native-game-info-description.jpeg)](docs/screenshots/v0.9.2-beta1/02-native-game-info-description.jpeg) | [![Historical library manager](docs/screenshots/v0.9.0-rc1/02-full-library-manager.jpeg)](docs/screenshots/v0.9.0-rc1/02-full-library-manager.jpeg) |

*The images above show historical versions and do not represent the current 1.1.8 appearance.*

## Compatibility and honesty about testing

**Primary tested setup:** a real Valve Steam Deck in **SteamOS Gaming Mode**, with Decky Loader. A PS4 Bluetooth controller has also been physically tested for Full Library Manager paging. Hardware verification is documented in [Verified on Deck](docs/VERIFIED_ON_DECK.md). Automated tests are not a substitute for physical verification.

ROG Ally, Legion Go, Windows, Android/DroidDeck, Steam Desktop Mode and other devices are **not maintainer-verified**. CSS Loader themes, future Steam updates, and combinations of Decky plugins can change behavior. [Compatibility details](docs/COMPATIBILITY.md).

## Where we came from

TitleDeck started with the community's request for a way to **rename Steam library games**. Thanks to **u/TacoOfGod** for helping inspire the original idea and **u/All-Stars64** for suggesting custom descriptions **inside Game Info**. Those are feature-idea acknowledgments, not claims of code authorship.

The road from 0.9.x to 1.1.8 included Steam/non-Steam description restoration, side-by-side artwork and ghost-artwork fixes, controller-native LB/RB paging, a Full Library Manager refresh, reusable artwork sources, reversible hidden tiles, expanded visual settings, and an upgraded screenshot-ready interface. Read the [release notes](docs/RELEASE_NOTES_1.1.8.md) or [changelog](CHANGELOG.md) for the details.

## Developer resources

[Contributing](CONTRIBUTING.md) · [Source and release provenance](SOURCE.md) · [Release checklist](docs/RELEASE_CHECKLIST.md) · [Roadmap](docs/ROADMAP.md) · [Issues](https://github.com/ValentineBSAA/TitleDeck/issues) · [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions).

MIT licensed. An independent community project, not affiliated with Valve, Steam, Decky Loader, or game publishers.
