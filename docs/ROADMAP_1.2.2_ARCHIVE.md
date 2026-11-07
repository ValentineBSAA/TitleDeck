# TitleDeck roadmap

**Current released version: 1.2.2 Stable**. The project is now focused on reliability, Steam compatibility and hardware feedback rather than more speculative feature additions.

### 1.2.2 Stable milestone (published November 5, 2026)

- [x] Add my personal **ValentineBSAA GitHub logo** to TitleDeck's Quick Access menu without adding interface clutter.
- [x] Make the button controller-focusable and link directly to my GitHub profile.
- [x] Confirm on my physical Steam Deck that the button opens the correct profile.
- [x] Preserve existing Steam/non-Steam editing, descriptions, restores and game controls.
- [x] Publish 1.2.2 as the latest Stable release, with the named ZIP and matching source.
- [x] Thank the community for the ideas, downloads, testing and feedback that helped me build TitleDeck.

I'm focusing on reliability and Steam compatibility now rather than adding features just for the sake of it. Thank you to everyone who has given the plugin a chance.

[1.2.2 stable release notes](RELEASE_NOTES_1.2.2.md).

### 1.2.1 Stable milestone (published October 28, 2026)

- [x] Steam and non-Steam **STEAM-button menu alias** support, including Catherine reboot persistence and ON/OFF restoration.
- [x] Native **Options → Edit with TitleDeck** for Steam and non-Steam games, direct selected-game editor without an artwork-grid flash.
- [x] **After Developer** and **Before Properties** context-item placement, including nested non-Steam Manage → Properties fallback.
- [x] Long-hold B/Circle to return to Steam when editing via context menu (previous 850 ms behavior physically tested).
- [x] Reduce hold threshold to **650 ms** and pass local tests.
- [x] Confirm **650 ms** on a physical Deck and package a distinct **1.2.1 Stable** installer.
- [x] The maintainer published 1.2.1 Stable with the installer ZIP.
- [x] Checked-in runtime and regression tests synchronized from the published 1.2.1 ZIP; [GitHub Actions](https://github.com/ValentineBSAA/TitleDeck/actions/runs/40787998502) passed **212/212 frontend and 29/29 Python** tests.

[Historical 1.2.1 stable release notes](RELEASE_NOTES_1.2.1.md). The current stable is **1.2.2**.

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

[Beginner guide](BEGINNER_GUIDE.md) · [Current release notes](RELEASE_NOTES_1.2.2.md)
