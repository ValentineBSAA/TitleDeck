# TitleDeck: complete feature reference (including 1.2.1 beta additions)

[Home](../README.md) · [Step-by-step beginner guide](BEGINNER_GUIDE.md) · [Gallery](SCREENSHOTS.md) · [Latest stable release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8)

## New workflow in privately tested 1.2.1 Beta

- On a game in Steam's library, press **Options (☰)**, then choose **Edit with TitleDeck**. The selected Steam or non-Steam game's own editor opens immediately; you do not have to search the manager or wait for its full artwork grid.
- In **Full Library Manager → Settings → Game Options menu placement**, choose **After Developer** (the default) or **Before Properties**. When a non-Steam shortcut has Properties only within its Manage submenu, the second placement falls back to the end of top-level actions, above Cancel where shown.
- Opened from **Edit with TitleDeck** only: **tap B / Circle** for ordinary Back or **hold B / Circle for 650 ms** to close the TitleDeck editor and return directly to Steam. The 650 ms quick exit has now passed physical Steam Deck acceptance.
- The **STEAM-button menu titles** setting controls whether the running game's left-hand menu shows your saved alias or its original name. This was physically verified for **Catherine Classic → Catherine** and non-Steam **Most Wanted Black Edition → Need for Speed Most Wanted!**. Catherine also survived a full reboot.
- The original game logos/artwork inside Steam's menu are **not renamed**. Your original game files and Steam metadata stay unchanged.
- If the menu is rebuilt by Steam or a theme, the shortcut depends on Steam's internal UI and may not be available.

[1.2.1 stable release preparation](RELEASE_NOTES_1.2.1.md) · [Physical testing record](VERIFIED_ON_DECK.md). The **stable installer is prepared but not yet published** as a GitHub release.

## Custom game names
- Edit a displayed title with Steam's keyboard; save explicitly.
- Preview **Suggest Cleanup** before applying.
- Restore a single original name or use confirmation-protected Restore All.
- Overrides are local; game files, IDs and lettering in artwork remain unchanged.

## Game Info descriptions
- Save custom text for **Steam games** and **non-Steam shortcuts**.
- Place text in **Game Info**, **Artwork Footer**, or **Below Play**.
- In non-Steam Game Info, show custom cover alongside custom text while preserving Steam Play/Proton information.
- Restore a single original description without necessarily deleting the custom name; full original-game restoration available.
- No enforced historical yellow-warning threshold.
- Physically verified saved descriptions persist through a Steam Deck reboot.
- **Known 1.1.8 limitation:** the **built-in Steam Deck right stick** does not scroll Steam or non-Steam **Game Info descriptions**, although an **external controller's right stick works** for both. The Settings toggle does not establish built-in-input support. [Issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8).

## Full Library Manager
- Artwork cards, green Installed badges, and **All games / Installed / Renamed** filters.
- Search by name and App ID; Refresh game list/artwork.
- Safe **Hide tile** (manager-only) with **Show all hidden tiles** recovery.
- Improved official Steam and local grid artwork, local caches and fallback image handling, including some demo/parent artwork and Jurassic World Evolution 3.
- Soft filled tile background and sharp uncropped foreground cover.
- Controller D-pad, A, B, built-in Steam Deck LB/RB and PS4 Bluetooth LB/RB paging, plus on-screen paging and touch.

## Controller controls and scrolling
- **LB/RB** means previous/next **library page**, not scrolling within a description.
- The right stick can scroll larger **TitleDeck manager/editor/settings workspace** regions (tested during the 1.1.8 five-item acceptance).
- Steam's **Game Info** description scrolling uses a separate input handler. **External-controller right-stick scrolling works** for both Steam and non-Steam descriptions; **the Steam Deck's built-in right stick does not**. [Issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8) remains open.
- Steam keyboard supplies game-title and custom-description text entry.

## Appearance and Settings
- Pause/enable title replacements.
- Create and restore manual title backups.
- Recover names from Restore All when the recovery safeguards permit.
- Show hidden manager tiles.
- Three custom-description placement choices.
- Color theme cycling, preset swatches, HEX editor, visual hue/saturation picker and RGB adjustment.
- Right-stick Game Info toggle (external-controller scrolling works; built-in Steam Deck right stick does not).
- Review Restore All with confirmation and recovery.
- Developer diagnostic panels hidden from normal users.

## Privacy and release limitations
TitleDeck does not edit Steam's canonical data or delete games. The primary hardware-tested environment is a **physical Steam Deck running SteamOS Gaming Mode with Decky Loader**. Theme combinations, future Steam client revisions, some missing artwork, other handhelds, Windows and Android/DroidDeck are not guaranteed.

[Beginner guide](BEGINNER_GUIDE.md) · [Verification matrix](VERIFIED_ON_DECK.md) · [Troubleshooting](../SUPPORT.md)
