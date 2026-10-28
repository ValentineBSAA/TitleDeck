# TitleDeck 1.2.1 Beta 1: release notes (October 28, 2026)

**Status:** Privately built for physical Steam Deck verification. **Not a published GitHub release and not yet 1.2.1 Stable.** The latest public stable GitHub release at the time of this update is [1.1.8](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8); the maintainer has also verified later private builds.

The beta installer is named `TitleDeck-1.2.1-Beta.zip`, with in-app/package version **`1.2.1-beta.1`**. It is provided to the maintainer for final testing, **not linked as an existing GitHub download**.

## New in 1.2.1

- **Edit with TitleDeck** in the Steam library game's native **Options (☰) context menu**. Works with both Steam games and non-Steam shortcuts.
- Choose the command to open **that selected game's editor directly**, without first displaying the Full Library Manager artwork grid.
- **Game Options menu placement** in Full Library Manager → Settings: **After Developer** (preferred default) or **Before Properties**. When a non-Steam game's Properties is nested under Manage, the latter setting places TitleDeck at the end of the top-level action list, before Cancel if present. Other plugins' items are not reordered.
- **Context-only quick exit:** tap **B / Circle** for normal Back; **hold B / Circle for 650 milliseconds** to return directly to Steam from the editor opened through Options. The ordinary manager retains existing Back behavior.
- Maintains the 1.2.0 STEAM-button running-game title override (Steam and non-Steam, reversible), local title/description saving, artwork and controller controls.

## Maintainer-verified on physical Steam Deck

| Test | Result |
| --- | --- |
| Steam title: Catherine Classic → Catherine in STEAM-button menu | ✅ Passed |
| Non-Steam title: Need for Speed Most Wanted Black Edition → Need for Speed Most Wanted! | ✅ Passed |
| Catherine alias after Steam Deck restart | ✅ Passed |
| HOME-menu title toggle ON custom / OFF original | ✅ Passed |
| Steam/non-Steam native Options → Edit with TitleDeck | ✅ Passed |
| Correct direct editor without intermediate library/artwork flash | ✅ Passed |
| Context-menu placement, including non-Steam Properties fallback | ✅ Reported passed |
| Context-only B/Circle hold at **850 ms**, and ordinary Back | ✅ Passed in Preview 3 |
| NEW **650 ms** hold on a physical Deck | ✅ Passed final maintainer test |

The beta's new 650 ms hold has **now passed physical Steam Deck testing**. The exact 649/650 ms threshold boundary was also checked in local simulation.

## Known limitations and scope

- The **built-in Steam Deck right stick does not scroll custom Game Info descriptions** on Steam or non-Steam games; an external controller's right stick does. [Issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8). This is different from right-stick scrolling within TitleDeck itself.
- STEAM-button game artwork/logos remain unchanged by name overrides. Changes are local and reversible; game files and canonical Steam metadata are untouched.
- Some Steam updates and other plugins' menu injections can affect internal Steam UI integration. Unsupported layouts should fail without adding the shortcut.
- Other handhelds, Desktop Mode, Android and every CSS Loader theme are not maintainer verified.

## Beta acceptance completed; preparation remaining before public stable 1.2.1

1. Install beta through Decky Loader → Settings → Developer → Install Plugin from ZIP; do not extract it.
2. ✅ The maintainer confirmed the context-menu behavior and 650 ms long-hold responsiveness on physical Deck.
3. Verify the menu placement and ordinary Full Library Manager Back behavior once more.
4. ✅ A separate local stable 1.2.1 ZIP has been built with matching manifest and frontend versions, source/dist parity and a computed local checksum. **The GitHub publication and its asset checksum are still pending.**
5. Only then publish the stable release and revise public release links/badges.

[Feature reference](FEATURES.md) · [Beginner guide](BEGINNER_GUIDE.md) · [Verified on Deck](VERIFIED_ON_DECK.md) · [Release checklist](RELEASE_CHECKLIST.md)
