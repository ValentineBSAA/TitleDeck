# Custom game descriptions: development preview

**Status:** Work in progress, not included in the published 0.9.0 RC1 ZIP.

This branch adds an **optional, per-game plain-text description** editor in TitleDeck's Full Library Manager. This does **not yet override Steam's official About/Game Info description** on Steam's game-detail screen. Do not advertise it as completed metadata replacement.

## What works at the code level

- Open a game in TitleDeck and choose **Add description** / **Edit description**.
- Type or paste up to 4,000 plain-text characters; save explicitly.
- The text is stored by Steam App ID in TitleDeck's settings, independently of a display-name alias.
- Return to the editor to review the saved description. Restore default removes only the local description, not the title override.
- Existing legacy `titledeck.json` settings (with only `aliases`) remain readable.
- Backup, export, import and backup restoration include custom descriptions.
- **Restore All Original Titles** removes only custom names. It intentionally preserves custom descriptions.
- Descriptions are treated as plain text, not HTML or executable markup.
- No Steam manifests, game files, or Steam store records are modified.

## Not yet working or verified

- Replacing the game's visible **About this game / Game Info** description inside Steam's native game page, as requested on Reddit.
- Native Steam keyboard behavior for multiline text input on real Deck hardware.
- Reliably following Steam/SteamOS UI refreshes for description content.
- Compatibility on Windows, Android/DroidDeck, ROG Ally or non-Steam Deck environments. Community reports are useful, but do not replace validation.

## Acceptance steps before release

1. Confirm original renamed-title workflows still work, including Catherine Classic → Catherine, D-pad navigation, restart persistence and Restore Original.
2. Test description editor with Steam keyboard, physical keyboard, paste, multiline text, Unicode characters, save, load and delete.
3. Test backup/import/export/recovery and legacy settings upgrades on a device with existing aliases.
4. Implement a **scoped, game-ID-specific Steam detail-page presentation** without blindly changing other games' metadata or text, and test across navigations and refreshes.
5. Verify display reverts immediately when the override is cleared or TitleDeck is disabled, and test coexistence with Decky Metadata / EnhancedGV.
6. Repeat tests on real Steam Deck, then collect separate Windows/Android reports before expanding the compatibility statement.

The next stage is Steam detail-page integration. This branch deliberately keeps the prerelease version number and published ZIP unchanged.
