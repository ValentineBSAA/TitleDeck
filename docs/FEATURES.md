# TitleDeck 1.1.8: complete feature reference

[Home](../README.md) · [Step-by-step beginner guide](BEGINNER_GUIDE.md) · [Gallery](SCREENSHOTS.md) · [Latest stable release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8)

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
- **Known 1.1.8 limitation:** right-stick scrolling **inside Steam Game Info description areas** does not work reliably for either game type. The corresponding toggle may be present in Settings; do not treat it as proof of hardware operation. [Issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8).

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
- Steam's **Game Info** description scrolling uses a separate input handler. A new hardware report found the right stick did not scroll those description areas. This remains open.
- Steam keyboard supplies game-title and custom-description text entry.

## Appearance and Settings
- Pause/enable title replacements.
- Create and restore manual title backups.
- Recover names from Restore All when the recovery safeguards permit.
- Show hidden manager tiles.
- Three custom-description placement choices.
- Color theme cycling, preset swatches, HEX editor, visual hue/saturation picker and RGB adjustment.
- Right-stick Game Info toggle (feature still reported broken on hardware).
- Review Restore All with confirmation and recovery.
- Developer diagnostic panels hidden from normal users.

## Privacy and release limitations
TitleDeck does not edit Steam's canonical data or delete games. The primary hardware-tested environment is a **physical Steam Deck running SteamOS Gaming Mode with Decky Loader**. Theme combinations, future Steam client revisions, some missing artwork, other handhelds, Windows and Android/DroidDeck are not guaranteed.

[Beginner guide](BEGINNER_GUIDE.md) · [Verification matrix](VERIFIED_ON_DECK.md) · [Troubleshooting](../SUPPORT.md)
