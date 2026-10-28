# TitleDeck features and how they work

**Scope:** 1.1.8 release candidate. This page describes implemented features. Refer to [physical-device verification](VERIFIED_ON_DECK.md) for the distinction between tested behavior and open issues.

## Names and title cleanup

- **Change Name:** local displayed-title override, not a game-file rename.
- **Suggest Cleanup:** preview and optionally apply safer formatting without saving automatically.
- **Save Custom Title:** explicit save; persisted after restart in prior hardware tests.
- **Restore Original Game:** restore the selected game's original name and description.
- **Description-only restoration:** remove the customized description without having to abandon a custom title.

## Descriptions: Steam and non-Steam

- Write a description in TitleDeck's game editor and save it locally.
- Steam titles: replace the displayed Steam **Game Info** description when Game Info placement is selected.
- Non-Steam shortcuts: show the custom text alongside their cover while preserving Proton details.
- Description placement choices: **Game Info**, **Artwork Footer**, and **Below Play**.
- Supports long descriptions without the older yellow warning thresholds or a hard character cap.
- Restart persistence, restore behavior, and the non-Steam ghost-poster removal were tested on the maintainer's Deck.
- **Known 1.1.8 input limitation:** right-stick scrolling in **description boxes** does not respond in recent hardware testing. Text rendering and saving still work. This is not the same as right-stick scrolling in the library manager or LB/RB page controls.

## Full Library Manager

- Card grid with **All games / Installed / Renamed** tabs, Search, App ID lookup, Refresh, Settings, and paging.
- **LB/RB** library paging for built-in Deck controls and PS4 Bluetooth controllers, hardware-confirmed in 1.1.6 and retested in the 1.1.8 candidate.
- D-pad navigation, A select, B back, on-screen paging buttons, and touchscreen.
- **Hide tile** suppresses a selected manager card. A hidden Steam shortcut still exists and launches as before. **Show all hidden tiles** reverses the setting.
- Installation indicators, current version badge, redesigned color/accent controls.

## Artwork handling

- Prefer user-custom artwork from the Steam Deck's grid images when available.
- Try Steam's official artwork formats and local read-only Steam artwork cache as fallbacks.
- Use a blurred image background to fill spare tile space, with a fully visible sharp cover in front (no damaging crop).
- Includes fallback support for some demo/parent art and a verified URL for Jurassic World Evolution 3.
- When artwork is genuinely unavailable, show an initials placeholder rather than a broken image.
- These changes affect **TitleDeck's manager cards**, not the original Steam artwork files or Game Info renderer.

## Color and navigation

- Wine Red / preset accents and user-adjustable hue, saturation and RGB options.
- Settings and the RGB editor are controller-navigable.
- Developer diagnostics are hidden from the ordinary public UI; diagnostics remain a developer-only opt-in.

## Privacy, files and reversibility

- Overrides are stored locally through TitleDeck.
- TitleDeck does not change installed games, Steam's canonical metadata, or artwork baked into image files.
- Backup/restore controls provide additional recovery; test carefully before very large bulk restores.

[Beginner's guide](BEGINNERS_GUIDE.md) · [1.1.8 release notes](RELEASE_NOTES_1.1.8.md) · [Support](../SUPPORT.md)
