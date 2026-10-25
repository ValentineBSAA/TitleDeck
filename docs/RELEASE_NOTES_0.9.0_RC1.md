# TitleDeck 0.9.0 RC1 — Steam Deck Release Candidate

**GitHub tag:** `0.9.0-rc.1`  
**Release installer ZIP:** `TitleDeck-0.9.0-RC1-SteamDeck.zip`  
**Status:** Public testing **release candidate**, not fully stable.

> **Warning:** Tested on **physical Steam Deck in SteamOS Gaming Mode**, not on ROG Ally, Legion Go, non-Steam Deck SteamOS-like systems, Desktop Mode, Windows, or Android/DroidDeck. Those environments are **untested and may not work correctly**. [Compatibility details](COMPATIBILITY.md).

## Improvements since public 0.8.1

- Fast text reapplication during Steam UI changes, **locally simulated**, not proven for every Steam metadata refresh.
- Native Steam keyboard, physical-keyboard and paste handling in a same-screen game editor.
- Keyboard-aware input movement; **Done editing** escape hatch when Steam fails to report B-dismissal.
- Safer smart cleanup for Unicode Σ, mixed case, trademark marks and Roman numerals.
- **Reversible Suggest Cleanup:** before/after preview, Keep, Apply, Undo; user must explicitly choose Save Custom Title.
- Controller focus and Restore Original fixes, with existing aliases, backups, long Restore All review and timed animated notifications preserved.
- Removed failed experimental native library-card badges.

## Verified on actual Steam Deck

Catherine Classic → Catherine and back; persistence through a Deck restart; shared editor directional controls; opening Steam's keyboard with readable input; The Sims 4 title cleanup preview, Apply and separate Save; accepted animated notices/highlight colors. [Complete evidence table](VERIFIED_ON_DECK.md).

## Known issue and unverified areas

**Known intermittent keyboard issue:** B sometimes closes Steam's keyboard without returning the raised title field to normal. Use **Done editing**. This is **not** marked resolved in RC1.

Metadata-refresh persistence, every Steam UI surface / CSS Loader theme, 200+ alias review on physical hardware, and all non-Steam Deck devices remain **unverified**. Local tests are not proof of device acceptance.

## Release availability

The **0.9.0 RC1** ZIP is distributed from [Releases](https://github.com/ValentineBSAA/TitleDeck/releases). If tag `0.9.0-rc.1` is not visible yet, the RC download has **not** been published. Existing 0.8.1 remains as an older release.

Install using Decky Loader's developer **Install Plugin from ZIP** feature. [Installation guide](INSTALL.md) · [Seven historical Steam Deck screenshots](SCREENSHOTS.md) · [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions).
