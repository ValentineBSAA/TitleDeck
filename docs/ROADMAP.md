# TitleDeck roadmap

**Current released version: 1.2.1**. The project is now focused on reliability, Steam compatibility and hardware feedback rather than more speculative feature additions.

### 1.2.1 Stable milestone (published October 28, 2026)

- [x] Steam and non-Steam **STEAM-button menu alias** support, including Catherine reboot persistence and ON/OFF restoration.
- [x] Native **Options → Edit with TitleDeck** for Steam and non-Steam games, direct selected-game editor without an artwork-grid flash.
- [x] **After Developer** and **Before Properties** context-item placement, including nested non-Steam Manage → Properties fallback.
- [x] Long-hold B/Circle to return to Steam when editing via context menu (previous 850 ms behavior physically tested).
- [x] Reduce hold threshold to **650 ms** and pass local tests.
- [x] Confirm **650 ms** on a physical Deck and package a distinct **1.2.1 Stable** installer.
- [x] The maintainer published 1.2.1 Stable with the installer ZIP.
- [ ] Synchronize checked-in runtime and tests with the published 1.2.1 ZIP and verify GitHub Actions CI.

[1.2.1 stable release notes](RELEASE_NOTES_1.2.1.md). **Current public stable release is 1.2.1.**

### Shipped and hardware-tested
- [x] Local, reversible Steam/non-Steam displayed-title editing.
- [x] Steam/non-Steam Game Info descriptions, persistence after restart and original restoration.
- [x] Non-Steam cover-and-description layout, ghost-artwork cleanup and retained Proton information.
- [x] Full Library Manager, filters/search, native Deck/PS4 LB/RB paging, hide tile.
- [x] Cover-art discovery and presentation improvements.
- [x] Settings, backups, recovery, description placements and custom color themes.
- [x] Public 1.1.8 release, full documentation and 23 actual hardware screenshots.

### Still worth addressing
- [ ] Fix **built-in Steam Deck right-stick** input for Steam and non-Steam Game Info descriptions; **external-controller right-stick scrolling already works** ([#8](https://github.com/ValentineBSAA/TitleDeck/issues/8)).
- [ ] Further SteamOS/CSS Loader version compatibility tests.
- [ ] 200+ game bulk restoration and unusual library-artwork edge cases.
- [ ] Continued native Steam keyboard and controller-focus stability tests.
- [ ] Other handhelds only after actual physical verification.

[Beginner guide](BEGINNER_GUIDE.md) · [Release notes](RELEASE_NOTES_1.2.1.md)
