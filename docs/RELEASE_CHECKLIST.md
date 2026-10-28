# TitleDeck 1.1.8 publication checklist

**Status:** Documentation staged; public **0.9.2** release unchanged. **1.1.8 is not yet released.**

## Hardware acceptance

- [x] Physical Steam Deck 1.1.8: final five-item feature checklist reported successful.
- [x] Built-in Steam Deck LB/RB and PS4 controller library paging.
- [x] Full Library Manager editor's right-stick scrolling, refined artwork, developer options hidden.
- [x] Steam and non-Steam Game Info descriptions persist after a full reboot.
- [x] Historical 1.1.1 screenshots established side-by-side layout, ghost removal and original restoration.
- [ ] **Game Info description-box right-stick scrolling:** new issue on both Steam and non-Steam games; investigate and retest.

## Repository and release preparation

- [x] Beginner guide, features, compatibility, troubleshooting, hardware verification and release notes prepared.
- [x] Upcoming screenshot gallery slots prepared; earlier screenshots retained as clearly historical.
- [x] Remove dangerous 0.9.2 source-sync automation behavior so future code can't be overwritten silently.
- [ ] Receive final tested **TitleDeck-1.1.8.zip** for public release.
- [ ] Verify ZIP structure, manifest versions, SHA-256, frontend/backend tests and source/runtime byte parity.
- [ ] Upload final screenshot **images** into `docs/screenshots/v1.1.8/` and connect actual files to README/gallery.
- [ ] Do not attach or retain an uploaded **screenshots.zip** as a separate public release download.
- [ ] Align `plugin.json`, `package.json`, `src/index.js`, `dist/index.js`, `main.py` and CI release checks with the approved installer.
- [ ] Create tag/release 1.1.8 and attach **one plugin installer ZIP**.
- [ ] Verify public release link works and Direct Updater sees the intended installer.
- [ ] Recheck installation on physical Steam Deck, then update/close old 0.9.2 issue #6 as appropriate.

**No title/description or controller changes should be introduced merely as part of documentation or screenshot staging.**

[Source integrity](../SOURCE.md) · [Release notes](RELEASE_NOTES_1.1.8.md) · [Screenshot instructions](SCREENSHOT_UPLOAD_GUIDE.md).
