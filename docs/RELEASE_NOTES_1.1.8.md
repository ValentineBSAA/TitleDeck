# TitleDeck 1.1.8: release-candidate notes

**Status: documentation prepared; installer and screenshot gallery pending final upload.** The most recent **public** release is [0.9.2](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2). These notes do not represent a published 1.1.8 GitHub release.

## What changed since the public 0.9.2 release?

### Steam and non-Steam Game Info descriptions
- Rebuilt and tested description integration for Steam and non-Steam library entries.
- A non-Steam game's cover can sit beside its custom description; removed the unwanted original-artwork placeholder while retaining Steam Play / Proton information.
- Supported restoring the game to its original Steam-provided explanation and artwork layout.
- Confirmed **both Steam and non-Steam custom descriptions survive a full Deck restart** on the 1.1.8 candidate.
- Removed outdated yellow description-length warnings; no hard enforced character cap.
- **Current known issue ([#8](https://github.com/ValentineBSAA/TitleDeck/issues/8)):** physical right-stick scrolling **does not work in the Steam Game Info description box** for either Steam or non-Steam entries in the latest maintainer test. Do not promote that particular control as working.

### Full Library Manager and controller navigation
- Tile-based All / Installed / Renamed browsing, search, paging, artwork, installed indicators, and controller-friendly navigation.
- Repaired physical **LB/RB** for the Deck's built-in buttons using Steam's focus-navigation events. **PS4 Bluetooth controller LB/RB** also verified.
- Preserved on-screen LB/RB paging and D-pad/A/B input.
- Added right-stick scrolling for longer **TitleDeck editor/settings panels**; this is separate from the Game Info issue above.
- Added **Hide tile**, a reversible manager-only hide option for duplicate-looking shortcuts. It **does not delete** Steam shortcuts; recover via **Settings → Hidden Full Library Manager entries → Show all hidden tiles**.

### Artwork and appearance
- More complete Steam capsules, headers, local custom images and image-cache fallback paths.
- Artwork improvements for demos and uncommon apps; specific Jurassic World Evolution 3 lookup and artwork-fit testing.
- Tiles can display a background fill with a crisp uncropped image, helping wide and portrait covers coexist.
- More polished wine/red UI, adjustable accents, custom RGB/hue-saturation picker and installed-state badges.

### Privacy, recovery and developer controls
- Individual title/description restoration, backup and bulk restore safeguards retained.
- Developer diagnostics hidden by default, with opt-in preserved.
- No changes to game installation files or canonical Steam metadata.

## Validation and release boundaries

The maintainer reported all **five final 1.1.8 checklist items** passing on a real Steam Deck, then restarted and verified both types of custom Game Info description again. A subsequent test **did reveal the Game Info right-stick scrolling issue**, so that action remains unresolved.

Automated checks for the private 1.1.8 build were reported as **211 frontend** and **26 backend** tests passing. Those results are not a substitute for real-device checks and do not prove the unresolved scrolling behavior.

**Not yet published:** new 1.1.8 installer ZIP, current screenshot gallery, and matching repository source commit. The repository's runtime still corresponds to the published 0.9.2 version until the exact final installer is provided and source/test parity is established.

## Credits

Thanks to **u/TacoOfGod** for the original title-renaming inspiration and **u/All-Stars64** for requesting editable Game Info descriptions. Thank you to additional Steam Deck testers and community contributors for reporting regressions.

[Beginner guide](BEGINNER_GUIDE.md) · [Full features](FEATURES.md) · [Physical-device record](VERIFIED_ON_DECK.md) · [Release checklist](RELEASE_CHECKLIST.md)
