# TitleDeck 0.8.1 prerelease

Released as [TitleDeck 0.8.1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.8.1).

This is a **community device-test prerelease**, not an assertion of universal SteamOS or Decky compatibility.

## Changes
- Shared game editor uses explicit two-row controller focus so Left/Right switches columns and Up/Down switches rows, across any selected game.
- Disabled actions do not trap controller focus.
- Carries forward the full-library cover manager, paginated Restore All review, backup/recovery, timed notices and title replacement.
- Removed the experimental Steam-library-card name badges as unreliable.

## Confirmed on actual Steam Deck
- Catherine Classic → Catherine visible display alias.
- Original display name restored successfully.
- Alias survived Steam Deck restart.
- Shared editor D-pad fix accepted after 0.8.1.

## Still to test
- Steam background metadata-refresh behavior independently of restart.
- Full library and Settings focus on different themes, edge cards and resolutions.
- Review of 200+ aliases on hardware.
- All Steam library locations after future UI updates.

[Verified behavior](https://github.com/ValentineBSAA/TitleDeck/blob/main/docs/VERIFIED_ON_DECK.md) · [Installation](https://github.com/ValentineBSAA/TitleDeck/blob/main/docs/INSTALL.md) · [Screenshot gallery](https://github.com/ValentineBSAA/TitleDeck/blob/main/docs/SCREENSHOTS.md).
