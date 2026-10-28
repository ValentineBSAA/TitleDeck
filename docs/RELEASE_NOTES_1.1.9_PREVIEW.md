# TitleDeck 1.1.9 Preview 1: RENAMED badge overlay fix

**Testing release only.** The latest verified public stable release remains **1.1.8** until a real Steam Deck confirms this visual repair.

## What changed

- Fix the **RENAMED** marker on Full Library Manager artwork tiles so the marker paints *above* the foreground cover instead of disappearing behind it.
- Preserve the 1.1.8 full-bleed soft blurred tile background and uncropped sharp cover.
- Limit the fix to TitleDeck's library tile markup. Do not change Steam's native artwork, Game Info, library navigation, or saved title/description behavior.
- Update the visible Quick Access and Full Library Manager version chip and both package manifests to **1.1.9**.
- Add a targeted regression test verifying blurred background at z-index 1, sharp art at z-index 2, and renamed badge at z-index 3.

## What to test on your Steam Deck

1. Install the preview ZIP from this release using Decky Loader's **Install Plugin from ZIP** option; do not extract the ZIP.
2. Open **TitleDeck → Full Library Manager**, navigate to the **Renamed** filter, and select a renamed game such as **Catherine Classic → Catherine**.
3. Confirm the **RENAMED** label is completely visible on top of the cover, including with focused and unfocused tiles.
4. Confirm the blurred background still fills the tile and the sharp cover remains uncropped.
5. Confirm original names, descriptions, LB/RB paging, and Save/Restore still work.

## Known limitation carried forward

In Steam's actual **Game Info** tab, custom descriptions **scroll with an external controller's right stick** for Steam and non-Steam games, but **do not scroll with the Steam Deck's built-in right stick**. **Issue #8** tracks the built-in-input problem; this badge-only preview does not attempt to fix it.

[Stable 1.1.8](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8) · [Known issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8)
