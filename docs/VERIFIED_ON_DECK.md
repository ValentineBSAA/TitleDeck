# TitleDeck: physical Steam Deck verification (1.2.1 published stable; 1.1.8 historical tests)

## Later private hardware acceptance: 1.2.0 and 1.2.1 Preview 3

| Later feature / behavior | Maintainer's physical Steam Deck result |
| --- | --- |
| STEAM-button menu: Catherine Classic → Catherine | ✅ Passed |
| STEAM-button menu: non-Steam Most Wanted Black Edition → Need for Speed Most Wanted! | ✅ Passed |
| Steam title override after full Deck restart | ✅ Passed for Catherine |
| Switch HOME-menu custom name OFF → Catherine Classic; ON → Catherine | ✅ Passed |
| Native Steam game context menu → Edit with TitleDeck | ✅ Passed |
| Native non-Steam game context menu → Edit with TitleDeck | ✅ Passed |
| Directly opens correct game editor without artwork/library flash | ✅ Passed |
| Context-menu placement controls: After Developer and Before Properties / non-Steam fallback | ✅ Maintainer reports all passed |
| Context-launched hold B / Circle exits directly, older **850 ms** hold | ✅ Passed |
| Quick tap B/Circle retains familiar Back behavior | ✅ Passed |
| **1.2.1: hold B / Circle for 650 ms** | ✅ **Maintainer physically verified responsive long-hold quick exit** |

The game aliases, direct-editor shortcut, ON/OFF restoration, and menu placement have been reported working on actual hardware. The final **650 ms** interaction has now passed hardware acceptance, but this does **not** establish compatibility with every game, Steam version, or controller. The maintainer has now published 1.2.1 Stable. [Published 1.2.1 release notes](RELEASE_NOTES_1.2.1.md).

## Original 1.1.8 acceptance

**Last acceptance:** October 27, 2026, on a physical Valve Steam Deck (SteamOS Gaming Mode / Decky Loader), with a PS4 Bluetooth controller used for separate input tests.

| Feature | Physical verification |
| --- | --- |
| Steam and non-Steam title renaming, explicit Save and Restore Original | Previously passed; preserved |
| Steam **Catherine Classic** custom Game Info description | Passed; displayed and **persisted after reboot** |
| Non-Steam **Most Wanted 2005** custom description | Passed; displayed with cover and **persisted after reboot** |
| Side-by-side non-Steam cover; no empty ghost poster; retained Proton line | Passed on 1.1.1 and subsequent builds |
| Restore Original non-Steam Game Info | Passed with original Steam explanation and artwork presentation |
| LB/RB physical **Steam Deck** | Passed in 1.1.6 and 1.1.8 |
| LB/RB **PS4 Bluetooth** | Passed in 1.1.6 |
| On-screen paging / D-pad navigation | Passed |
| Full Library Manager right-stick editor scrolling | Passed among final 1.1.8 five-item acceptance checks |
| Jurassic World Evolution 3 cover / tile fill | Passed in 1.1.8 five-item acceptance |
| Hide tile and library refresh | Passed |
| Developer options hidden from public UI | Passed in 1.1.8 five-item acceptance |
| Settings color picker, accent presets and description location | Previously hardware tested |
| **External controller right stick, Steam and non-Steam Game Info** | **Works** for both custom-description types, per maintainer's clarification. Specific external-controller model for this check not established. |
| **Built-in Steam Deck right stick, Steam and non-Steam Game Info** | **Does not scroll** either custom-description type. [Issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8) |
| Every Steam client revision, every CSS Loader theme, all other handhelds | **Not fully tested** |
| Bulk 200+ name recovery or every possible non-Steam artwork format | **Not exhaustively tested** |

**Don't confuse input devices or scrolling surfaces:** (1) Steam's Game Info custom text accepts an external controller's right-stick scrolling but not the Deck's built-in right stick; (2) TitleDeck's own description editor and (3) Full Library Manager's workspaces have separate scrolling handlers. Passing one device/surface does not prove another.

**Screenshots:** [Catherine Classic (Steam)](screenshots/v1.1.8/10-steam-catherine-custom-game-info.jpeg) and [Most Wanted 2005 (non-Steam)](screenshots/v1.1.8/13-nonsteam-most-wanted-custom-game-info.jpeg).

**Automated build tests**, such as the reported 211 frontend and 26 backend passes, are not substitutes for real-device testing.

[1.2.1 release notes](RELEASE_NOTES_1.2.1.md) · [Compatibility](COMPATIBILITY.md) · [Known issue](https://github.com/ValentineBSAA/TitleDeck/issues/8)
