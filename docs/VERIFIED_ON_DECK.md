# TitleDeck 1.1.8: physical Steam Deck verification

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
| **Right stick inside Steam/non-Steam Game Info description area** | **Newly reported broken** in final 1.1.8 hardware testing. [Issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8) |
| Every Steam client revision, every CSS Loader theme, all other handhelds | **Not fully tested** |
| Bulk 200+ name recovery or every possible non-Steam artwork format | **Not exhaustively tested** |

**Don't confuse three different scrolling surfaces:** (1) Steam's Game Info custom text, (2) TitleDeck's own description editor, (3) Full Library Manager's workspaces. A passed test for one does not prove another.

**Screenshots:** [Catherine Classic (Steam)](screenshots/v1.1.8/10-steam-catherine-custom-game-info.jpeg) and [Most Wanted 2005 (non-Steam)](screenshots/v1.1.8/13-nonsteam-most-wanted-custom-game-info.jpeg).

**Automated build tests**, such as the reported 211 frontend and 26 backend passes, are not substitutes for real-device testing.

[Release notes](RELEASE_NOTES_1.1.8.md) · [Compatibility](COMPATIBILITY.md) · [Known issue](https://github.com/ValentineBSAA/TitleDeck/issues/8)
