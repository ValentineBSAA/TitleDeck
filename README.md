<p align="center"><img src="assets/titledeck-icon.png" width="128" alt="TitleDeck logo"></p>
<h1 align="center">TitleDeck</h1>
<p align="center"><strong>Your library. Your names. Your descriptions.</strong></p>
<p align="center">
  <a href="https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2"><img alt="Stable version" src="https://img.shields.io/badge/version-0.9.2-blue"></a>
  <img alt="Release status" src="https://img.shields.io/badge/status-stable-brightgreen">
  <img alt="Tested platform" src="https://img.shields.io/badge/tested-Steam%20Deck-blue">
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-lightgrey"></a>
</p>

**TitleDeck** is a Decky Loader plugin for customizing the **displayed names and descriptions** of Steam games and applications in SteamOS Gaming Mode. Overrides are local, reversible and separate from the original Steam metadata and installed game files.

**[Download TitleDeck v0.9.2 stable](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2)** · [Install instructions](docs/INSTALL.md) · [Release notes](docs/RELEASE_NOTES_0.9.2.md)

> **Compatibility:** Developed and tested on a **physical Steam Deck** in **SteamOS Gaming Mode**. ROG Ally, other non-Valve handhelds, Desktop Mode, Windows, Android/DroidDeck and many CSS Loader themes are **unverified** and may not work correctly. Steam updates can change the UI. [Compatibility details](docs/COMPATIBILITY.md).

## Feature screenshots (captured during 0.9.2 Beta 1)

These screenshots were captured on a physical Steam Deck with a customized Steam visual theme.

| Quick Access captured during Beta 1 | Custom description in Steam Game Info |
|:---:|:---:|
| [![TitleDeck 0.9.2 Beta 1 Quick Access](docs/screenshots/v0.9.2-beta1/01-quick-access-beta-version.jpeg)](docs/screenshots/v0.9.2-beta1/01-quick-access-beta-version.jpeg) | [![Catherine custom description in the real Game Info tab](docs/screenshots/v0.9.2-beta1/02-native-game-info-description.jpeg)](docs/screenshots/v0.9.2-beta1/02-native-game-info-description.jpeg) |
| Long description, lower section | Full Library Manager (earlier RC1 UI capture) |
| [![End of long Catherine game description](docs/screenshots/v0.9.2-beta1/03-long-description-end.jpeg)](docs/screenshots/v0.9.2-beta1/03-long-description-end.jpeg) | [![Full Library Manager from RC1](docs/screenshots/v0.9.0-rc1/02-full-library-manager.jpeg)](docs/screenshots/v0.9.0-rc1/02-full-library-manager.jpeg) |

[**View all seven selected feature screenshots and earlier release history**](docs/SCREENSHOTS.md).

## Features

- **Custom Game Info descriptions:** edit a game's locally displayed description using Steam's keyboard. The replacement appears in the actual **Game Info** tab beside Community, not just in a TitleDeck pop-up.
- **Smooth tab switching:** the maintainer confirmed rapid Community ↔ Game Info switching with the custom description remaining visible in the tested Steam Deck preview.
- **Full-game Restore Original:** clear a game's custom name and description together, or restore only its description while keeping a custom name.
- **No hard description limit:** a **yellow, non-blocking advisory at 1,247 characters** warns of possible extra scrolling and layout oddities. Longer descriptions are allowed at the user's discretion.
- **Reversible title renaming:** customize displayed game names without rewriting original Steam game files, sorting identifiers or artwork.
- **Suggest Cleanup:** reviewed before/after title cleanup, explicit Save, and Undo, including the previously tested Sims 4 cleanup path.
- **Full Library Manager:** game/app browsing, artwork fallbacks with remembered cover sources, controller navigation, and filtering of Proton, Steam Linux Runtime and anti-cheat runtimes.
- **Backups and recovery:** individual restores plus review/confirmation safeguards for bulk operations.
- **Clean Quick Access:** developer timing capture and diagnostic counters are hidden during normal use.

**Community credit:** The original name-customization idea grew from a Steam Deck community request, including u/TacoOfGod. Special thanks to **u/All-Stars64** for specifically asking for descriptions **inside the Game Info tab next to Community**. The *Catherine Classic* screenshots demonstrate that requested feature. These acknowledgments credit feature ideas, not source-code authorship.

## Device-verification summary

| Tested behavior | Evidence |
| --- | --- |
| Catherine Classic rename, title restore, restart persistence | Confirmed on physical Steam Deck during prior release testing |
| Custom description in the actual Game Info tab | Confirmed with Catherine Classic |
| Rapid Community / Game Info switching without the earlier 1–7 second delay | Confirmed in Preview 23; preserved in Preview 24 / beta runtime |
| Restore Original returns title and description to defaults | Confirmed in recent on-device testing |
| Long description beyond 1,247 characters and yellow warning | Confirmed on device; long-text presentation is not guaranteed to stay tidy |
| Game/app filtering and Full Manager cover fallback | Reported working on Deck; artwork can still take a few seconds after cold start |
| Beta 1 version badge in Quick Access | Captured on physical Steam Deck |
| GTM 3.6.9 compatibility, exhaustive CSS Loader themes, 200+ restores | **Not fully verified** |

The Steam keyboard can intermittently dismiss with B while the title editor remains raised. Use **Done editing** where applicable. [Full acceptance table](docs/VERIFIED_ON_DECK.md).

## Install / update

1. Back up existing TitleDeck settings.
2. Download **TitleDeck-0.9.2.zip** from the [0.9.2 Beta 1 release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2).
3. On the Deck, open **Decky Loader → Settings → Developer → Install Plugin from ZIP**. Select the complete installer ZIP; **do not extract it**.
4. Open **Quick Access → Decky → TitleDeck → Open full library manager**.

New installations default to Game Info description placement; saved placement preferences are preserved on upgrades. The earlier [0.9.0 RC1 release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.0) remains available.

## Source, security and support

**Source and release history:** The repository's current `main.py`, `plugin.json`, `package.json` and `src/index.js` / `dist/index.js` are updated for the **0.9.2 stable source**; the published stable ZIP should be verified independently. The installer remains the official download; the repository additionally contains development tests. [Release checksum and provenance](SOURCE.md).

[Changelog](CHANGELOG.md) · [Screenshots](docs/SCREENSHOTS.md) · [GitHub Issues](https://github.com/ValentineBSAA/TitleDeck/issues) · [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions) · [Support](SUPPORT.md). MIT licensed. Independent of Valve, Steam, Decky Loader and game publishers.
