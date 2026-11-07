# TitleDeck 1.4.0: Steam Deck acceptance checklist

**Maintainer report:** All accessible features in the exact 1.4.0 installer were extensively tested on physical Steam Deck hardware. Art Hero editing is a known, accepted limitation rather than a verified function. The steps below record what a regression tester should repeat, not a fabricated second testing session.

## Art Hero ON: read-only policy
1. Enable Art Hero in CSS Loader and set Carousel Font Height to a known positive value, such as +11.
2. Open Full Library Manager → Settings → Steam Home → Text Placement.
3. Confirm Art Hero is shown as the layout owner and its native value is displayed.
4. Check both Art Hero placement buttons are visible and **disabled**; selecting them should not write to CSS Loader.
5. Change the value inside CSS Loader, including a negative value, and confirm TitleDeck's read-only display updates.

## Art Hero OFF: TitleDeck placement
1. Disable Art Hero in CSS Loader.
2. In TitleDeck choose Above Cards and Below Cards; verify both are selectable.
3. Check the actual title position on Steam Home and whether saved offsets persist.
4. Re-enable Art Hero and confirm TitleDeck relinquishes positional ownership.

## Core regressions
- Enter Full Library Manager repeatedly; verify artwork placeholders, image loading, keyboard, refresh and transitions.
- Traverse General, Steam Home, Typography and Advanced Settings in both directions using the D-pad. Look for unexpected page jumps.
- Check LB/RB paging, B-hold cancellation where supported, and Quick Access return.
- Test font presets, RGB/HEX, saturation, hue, shadow, outline, glow and light/dark readability previews.
- Edit and restore Steam and non-Steam titles and Game Info descriptions.
- Back up, restore, hide and recover library entries.

**Not fixed by this release:** previously reported Quick Access controller focus quirk and [Game Info built-in right-stick issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8).

Record hardware, SteamOS/Decky/CSS Loader versions, tested theme, outcomes and reproduction steps when submitting a report.
