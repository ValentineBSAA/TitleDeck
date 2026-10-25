# Platform compatibility and support

> **Important:** TitleDeck **0.9.0 RC1 was built for and tested on a physical Valve Steam Deck running SteamOS Gaming Mode with Decky Loader.** It is not certified for other hardware.

| Platform | Status |
| --- | --- |
| **Valve Steam Deck, SteamOS Gaming Mode** | Primary tested target. Several core behaviors confirmed on actual hardware. |
| Other Steam Deck client versions / CSS Loader themes | Partially tested; future UI changes may affect behavior. |
| **ROG Ally, Legion Go, Bazzite or other non-Steam Deck SteamOS-like systems** | **Untested. May not function correctly.** |
| Steam Desktop Mode, Windows, Linux desktop | **Untested / not an RC1 target.** |
| Android or DroidDeck | **Untested. Emulator or remote testing is not Steam Deck hardware verification.** |

TitleDeck changes visible Steam interface text, not installed game files or Steam metadata. Sorting identities and artwork lettering are unchanged. Controller, keyboard overlay, and Decky callbacks can differ between Steam environments.

**Known issue:** Pressing B sometimes dismisses Steam's native keyboard but leaves the TitleDeck editor temporarily raised. The **Done editing** fallback restores the layout. This is **not fixed** in RC1.

**Not independently verified:** full metadata-refresh persistence, every game screen and Steam client revision, every CSS Loader theme, 200+ saved-title confirmation on hardware, or non-Steam Deck platforms.

[What has been verified on a physical Deck](VERIFIED_ON_DECK.md) · [Report a problem](../SUPPORT.md)
