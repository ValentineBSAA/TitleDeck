# Compatibility and support

**Current public version:** [TitleDeck 0.9.2 Beta 1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2-beta.1). This is a **public pre-release**, primarily tested on a physical Steam Deck in SteamOS Gaming Mode.

| Platform / setup | Current evidence |
| --- | --- |
| **Valve Steam Deck, SteamOS Gaming Mode, Decky Loader** | Primary tested environment; title aliases, native Game Info description and restoration tested on device |
| Steam Deck with other Steam client releases or CSS Loader themes | **Partially tested / unverified**; CSS and UI changes may affect integrations |
| Game Theme Music 3.6.9 on Deck, especially the Plugin Store | **Not fully verified**; previous intermittent playback reports require a separate check |
| ROG Ally, Legion Go, Bazzite, non-Steam Deck SteamOS-like systems | **Untested and not guaranteed** |
| Steam Desktop Mode, Windows, desktop Linux | **Untested and not a release target** |
| Android / DroidDeck | **Untested and not supported by a hardware compatibility claim** |

## Known behavior

- Descriptions beyond **1,247 characters** are allowed, but a yellow warning appears. Very long content can scroll or lay out unusually.
- After a Steam restart, Full Library Manager artwork may take a few seconds to populate. Missing art receives a fallback.
- Dismissing Steam's native keyboard with B can occasionally leave the name editor raised. Use **Done editing** where applicable.
- Future Steam UI updates can change internal views and require TitleDeck updates.
- The Steam-native looking Game Info integration is a local replacement, not a permanent rewrite of Valve's official data.
- Bulk restoration of hundreds of overrides, unusual app types, third-party plugin combinations and all CSS Loader themes remain incompletely verified.

**Data safety:** TitleDeck modifies local display overrides, not underlying game installation files, canonical metadata, sorting IDs or artwork lettering.

[Physical-device tests](VERIFIED_ON_DECK.md) · [Report issues](../SUPPORT.md).
