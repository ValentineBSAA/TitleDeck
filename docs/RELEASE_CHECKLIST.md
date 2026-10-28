# TitleDeck 1.2.1: release and verification record

## 1.2.1 stable release acceptance and repository synchronization

- [x] Package `TitleDeck-1.2.1-Beta.zip` with matching `v1.2.1-beta.1` frontend, `plugin.json`, and `package.json`.
- [x] Reduce **context-launched hold B / Circle** from 850 to **650 ms**; preserve a quick tap's normal Back.
- [x] Run JavaScript syntax, Python syntax, selected-game first render, Steam/non-Steam native menu, duplicate insertion, restoration and controller timing tests.
- [x] Verify exact test boundary **649 ms: no exit; 650 ms: one exit** in a local deterministic simulation.
- [x] Capture the maintainer's physical results for Steam and non-Steam context-menu shortcuts, position choices, direct editor, 850 ms hold, and STEAM-button menu title overrides.
- [x] Update README, changelog, install/guide, features, compatibility, verified list and beta notes, without falsely labeling the beta as a public stable release.
- [x] **Physically test new 650 ms hold** and native context-menu flow. The maintainer reported both passed; previous tap/Back behavior was already verified.
- [x] Verify prepared stable installer metadata/version **1.2.1** (distinct from beta **1.2.1-beta.1**), source/dist equality, ZIP structure and SHA-256.
- [x] Synchronize the repo's runtime and regression tests byte-for-byte with the published stable ZIP; [GitHub Actions](https://github.com/ValentineBSAA/TitleDeck/actions/runs/40787998502) passed **212 frontend and 29 Python tests**.
- [x] Publish **1.2.1 Stable** on GitHub with `TitleDeck-1.2.1-Stable.zip` (the published asset is present). README badge and public links updated. **Published ZIP SHA-256 verification passed in [GitHub Actions](https://github.com/ValentineBSAA/TitleDeck/actions/runs/40787369311).**
- [ ] Add new screenshot gallery images only after checking actual 1.2.1 hardware screenshots into the repository; do not relabel older 1.1.8 images as 1.2.1.

The 1.2.1 beta installer prepared for testing has SHA-256:
`d3cf000a66aadda5b742a4bea272587a9adb3b638a492eff3909252f0aa409df`.
**This is the beta checksum, not an already-published stable ZIP checksum.**

**Accepted and packaged local 1.2.1 stable ZIP:** `TitleDeck-1.2.1-Stable.zip`, SHA-256:
`95a6b3533c1d6588c5a3c936a7eca22a8c69f49cd2ed3e6f30126d47e1d0c6fb`
The corresponding asset has been published: [TitleDeck 1.2.1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.2.1). Its published ZIP has been downloaded and checksum-verified in GitHub Actions (SHA-256 matches locally accepted installer). [Stable release preparation](RELEASE_NOTES_1.2.1.md).
[Full beta notes](RELEASE_NOTES_1.2.1_BETA.md) · [Hardware matrix](VERIFIED_ON_DECK.md) · [1.2.1 verified test record](RELEASE_TEST_RESULTS_1.2.1.md).

- [x] Repair published **1.2.1 source tag** to point to checksum-matched runtime, avoiding an outdated GitHub auto-generated Source Code archive. [GitHub verification](https://github.com/ValentineBSAA/TitleDeck/actions/runs/40788241341) passed; tag commit `409e9469c2c649c9cfbad7f591a9e6e1055683c9`.

## Historical 1.1.8 acceptance (preserved)

- [x] Published **1.1.8** GitHub stable release and **TitleDeck-1.1.8.zip** plugin asset.
- [x] Verified published ZIP SHA-256: `2bae38490fbbb7da783d98b33e8acd4dd6213f03ba1a7256807e60cb736f061c`.
- [x] Confirmed physical Steam Deck LB/RB and PS4 Bluetooth controller paging, title edit, artwork, hide-tile and restart persistence of Steam/non-Steam descriptions.
- [x] Added 23 original 1.1.8 screenshots, including Catherine Classic (Steam) and Need for Speed Most Wanted (non-Steam).
- [x] Rewrote README, complete beginner guide, feature reference, support, installation, compatibility and release documentation.
- [x] Synchronized repository source/runtime and tests against the exact public ZIP and ran CI.
- [x] Kept historical 0.9.x screenshots and releases as version-labeled archives.

## Known limitations and future maintenance

- [ ] **Fix the built-in Steam Deck right-stick input** for Steam and non-Steam Game Info descriptions; scrolling already works with an external controller's right stick ([issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8)).
- [ ] Test additional SteamOS releases, CSS Loader themes, very large title-restore batches and unusual non-Steam shortcuts.
- [ ] Continue preserving built-in Deck and PS4 LB/RB, ghost poster removal, title/description saving and restoration.

**Note:** Don't use an image ZIP as a plugin installer. The gallery contains extracted JPEGs and the release has the official plugin ZIP.

[Hardware verification](VERIFIED_ON_DECK.md) · [1.2.1 release notes](RELEASE_NOTES_1.2.1.md) · [Source](../SOURCE.md)
