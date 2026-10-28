# TitleDeck 1.1.8: release and verification record

## Completed

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

[Hardware verification](VERIFIED_ON_DECK.md) · [Release notes](RELEASE_NOTES_1.1.8.md) · [Source](../SOURCE.md)
