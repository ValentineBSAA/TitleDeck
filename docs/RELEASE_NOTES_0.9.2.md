# TitleDeck 0.9.2 | Stable release

**Your library. Your names. Your descriptions.**

TitleDeck 0.9.2 promotes the previously tested Beta 1 feature set to a stable release for Valve Steam Deck running SteamOS Gaming Mode and Decky Loader.

> [!WARNING]
> **October 27, 2026 | Known regression in 0.9.2 Stable and the preceding 0.9.2 Beta 1:** Custom descriptions in Steam's **Game Info** tab are **not working reliably for Steam and non-Steam games/apps**. Earlier preview confirmations were premature as a statement of ongoing reliability. Treat this feature as **experimental** until a fix is verified. I apologize that the beta description integration was promoted to stable before its remaining issues were resolved. I am working on a fix and additional features, and will spend a few days on development/testing before another update. **October 27 update:** A newer **private 1.1.8 candidate** has now passed physical Steam Deck tests for Steam and non-Steam description display and post-restart persistence. **The published 0.9.2 ZIP is unchanged and still affected.** 1.1.8 is not yet publicly available; its Game Info right-stick scrolling remains an open issue ([#8](https://github.com/ValentineBSAA/TitleDeck/issues/8)). [Track the issue](https://github.com/ValentineBSAA/TitleDeck/issues/6).

## Features

- Rename displayed Steam game titles locally without modifying installed files or Steam's original metadata.
- Edit local game descriptions displayed inside Steam's Game Info tab.
- Browse games and manage changes through a controller-friendly Full Library Manager.
- Preview cleanup suggestions and explicitly save, undo, or restore original names.
- Restore custom descriptions independently, or restore both title and description together.
- Back up and recover stored customizations.
- Preserve local aliases and descriptions between sessions within tested conditions.
- Show a non-blocking warning at around 1,247 characters; no hard description limit is imposed.

## Improvements since 0.9.0 RC1

Custom native Game Info descriptions, faster Community ↔ Game Info switching following the Preview 23 renderer improvement, artwork fallback and caching, usability adjustments, and additional restoration safeguards.

## Community thanks

Thanks to **u/TacoOfGod** for inspiring the original title-renaming idea and **u/All-Stars64** for requesting editable Game Info descriptions.

## Install

Download **`TitleDeck-0.9.2.zip`** from the [stable release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2). Install it using Decky Loader's **Install Plugin from ZIP** feature. Do not extract the archive. GitHub tag, ZIP name and plugin version are aligned for Direct Updater recognition.

## Testing and limitations

The maintainer accepted renaming, restoration, cleanup and persistence in previous physical Steam Deck tests, plus native Game Info rendering and rapid tab switching during beta testing. **Update (October 27): New Steam Deck reports contradict the earlier description/Game Info acceptance for Steam and non-Steam games; the description behavior is no longer considered verified working.** The stable package is promoted from those accepted features, but an independent stable-ZIP hardware acceptance test is not yet documented.

The earlier beta development run reported 107 JavaScript and 17 Python test passes. Current repository CI should be reported separately. Known limitations include occasional Steam keyboard dismissal positioning, and incomplete acceptance for GTM coexistence, many CSS Loader themes, very large bulk restoration sessions and non-Valve hardware.

[Hardware verification](VERIFIED_ON_DECK.md) · [Compatibility](COMPATIBILITY.md) · [Support](../SUPPORT.md).
