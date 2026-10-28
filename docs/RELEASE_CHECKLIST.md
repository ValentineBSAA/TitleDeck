# TitleDeck 1.1.8 publication checklist

**Current public release:** 0.9.2. **Planned next release:** 1.1.8, candidate only. **Do not publish** until the remaining description-box scrolling issue is addressed or explicitly documented as an accepted limitation.

## Physical tests

- [x] Built-in Deck LB/RB pages Full Library Manager.
- [x] PS4 Bluetooth controller LB/RB works.
- [x] Steam custom description displays and persists after restart.
- [x] Non-Steam custom description displays and persists after restart.
- [x] Ghost poster removed, correct side-by-side custom layout, Restore Original returns native layout.
- [x] Hide tile removes only the manager card, not the underlying Steam shortcut.
- [x] 1.1.8 five-point hardware check: manager right-stick, JWE3 cover, tile presentation, LB/RB, diagnostics hidden.
- [ ] **Investigate newly reported right-stick scrolling failure inside Steam/non-Steam description boxes.**
- [ ] Repeat an exact-final-installer smoke test after any fix or release-stage changes.
- [ ] Verify fresh install and existing-settings migration on the final public ZIP.

## Repository preparation

- [x] Update README, beginner guide, features, hardware matrix, compatibility, support and release notes for the planned 1.1.8 release.
- [x] Preserve historical 0.9.2 release information and screenshots; do not falsely say the candidate is already public.
- [x] Stage a new screenshot directory **without** bundling the screenshot ZIP.
- [x] Deactivate unsafe legacy automation that could overwrite newer source with 0.9.2.
- [ ] Receive final selected screenshots, extract and commit individual images, link gallery and README.
- [ ] Receive/confirm final installer ZIP and its SHA-256.
- [ ] Synchronize `plugin.json`, `package.json`, `main.py`, `src/index.js`, `dist/index.js` and matching tests **from that exact final installer**.
- [ ] Update source-pinning tests and release parity workflow to target the final 1.1.8 ZIP **after it is published**.
- [ ] Run GitHub CI against the synchronized source, plus ZIP extract-and-test checks.
- [ ] Publish the GitHub Release with **plugin ZIP only**, no screenshots ZIP. Verify asset filename and displayed version.
- [ ] Update README download links and version badges once the public release exists.
- [ ] Update/close historical issue #6 once the corrected Game Info implementation is publicly available; link the release.
- [ ] Keep SteamOS/CSS Loader compatibility and unrelated plugin integration under continued observation.

[Beginner's guide](BEGINNERS_GUIDE.md) · [Release notes](RELEASE_NOTES_1.1.8.md) · [Source](../SOURCE.md)
