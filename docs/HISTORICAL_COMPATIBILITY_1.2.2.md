# Compatibility: what has actually been tested

**Latest published stable version: [1.2.2](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.2.2).**

### Verified in TitleDeck 1.2.2 Stable

- **My GitHub avatar button:** I installed 1.2.2 on my physical Steam Deck and confirmed the new Quick Access developer link opens my GitHub profile. The link is an optional controller-focusable button.
- I haven't claimed new compatibility testing for other handhelds, alternative SteamOS builds, or every controller/theme combination. This update preserves the 1.2.1 library features.
- [Read my 1.2.2 release notes](RELEASE_NOTES_1.2.2.md).

### Previously verified in TitleDeck 1.2.1 Stable (October 28, 2026)

- **Physical Steam Deck Gaming Mode:** Steam (Catherine) and non-Steam (Need for Speed Most Wanted 2005) aliases confirmed in STEAM-button game menu. Toggle OFF restored the original title; Catherine custom title survived a Deck restart.
- Native game **Options → Edit with TitleDeck** tested with Steam and non-Steam games, opening the correct editor directly and avoiding the original artwork-grid flash.
- Context-menu placement and **hold B / Circle quick-exit at the original 850 ms duration** were verified by the maintainer.
- **New 650 ms hold duration is now maintainer-verified on a physical Steam Deck.**
- Other handhelds, SteamOS builds, every CSS Loader theme and every combination with other menu-injection plugins remain **unverified**.
- [Read the 1.2.1 feature history](RELEASE_NOTES_1.2.1.md) and [physical acceptance matrix](VERIFIED_ON_DECK.md).

| Setup | Result |
| --- | --- |
| Valve **Steam Deck**, SteamOS **Gaming Mode**, Decky Loader | Primary **physically tested** environment |
| TitleDeck **1.2.2 Quick Access GitHub button** | Physically confirmed that it opens the correct profile on Steam Deck |
| Built-in Deck **LB/RB** Full Library Manager paging | Hardware passed in 1.1.6 and 1.1.8 |
| **PS4 Bluetooth controller** LB/RB paging | Hardware passed |
| Steam games: customized Game Info display and restart persistence | Hardware passed |
| Non-Steam shortcuts: custom Game Info and restart persistence | Hardware passed |
| **External controller right stick**, Steam/non-Steam Game Info description scrolling | **Working** for both game types, per maintainer hardware report |
| **Built-in Steam Deck right stick**, Steam/non-Steam Game Info description scrolling | **Does not scroll** either game type; tracked in [#8](https://github.com/ValentineBSAA/TitleDeck/issues/8) |
| TitleDeck manager/editor scrolling, artwork, Hidden tile | 1.1.8 five-item hardware acceptance passed |
| Themes / CSS Loader / alternate Steam client channels | Partially tested; Steam updates can break internal UI hooks |
| ROG Ally, Legion Go, Bazzite, other handhelds | Not maintainer verified |
| Steam Desktop Mode, Windows, desktop Linux | Not maintainer verified |
| Android / DroidDeck | Not maintainer verified |

TitleDeck's game naming and description edits are **local display overrides**. Some shortcuts will lack a viable cover, and some Steam UI revisions may behave differently.

[Physical Deck acceptance](VERIFIED_ON_DECK.md) · [Report an issue](../SUPPORT.md)
