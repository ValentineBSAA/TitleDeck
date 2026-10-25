# Custom descriptions: native Steam game-page milestone

**Status: development preview, NOT included in the public 0.9.0 RC1 release ZIP.**

This branch extends TitleDeck's per-game **description editor** with a reversible custom-description panel in the **native Steam library game-detail page**. Its content comes from TitleDeck's local settings and is shown only if the currently visible Steam React app overview ID agrees with the library route App ID.

**Important distinction:** This introduces a **TitleDeck-owned panel** on the game page. It does **not overwrite** the original Valve About/Game Info text, alter official Steam metadata, or edit game files. Native Game Info text replacement is not claimed. Real-device display and multiline keyboard validation remain open.

## Intended user flow

1. In TitleDeck → Open full library manager, select a game.
2. Choose Add description or Edit description.
3. Enter up to 4,000 plain-text characters and explicitly Save description.
4. Navigate to that game's normal Steam library detail page.
5. When the Steam page ID is confirmed, a YOUR GAME DESCRIPTION panel appears above the details content; it is removed upon game change, delete, disabling TitleDeck, or uninstalling.
6. Restore default in the editor removes only the custom description, not the saved game name.

## Implemented safety design

- Store descriptions by App ID independently of custom game names.
- Accept old TitleDeck settings without descriptions; include descriptions in manual backup, import, export, recovery.
- Display via `textContent`, never injected HTML.
- Read matching App IDs from Steam's visible React `overview` fiber and the `/library/app/:appid` route; fail closed when they differ.
- Add a single, marked sibling panel. Do not modify Steam's React render output, native About content, game metadata, files, artwork, other Decky plugins, or their DOM elements.
- Observer plus periodic resync handles route and content changes. On disable or unmount, remove TitleDeck's panel.
- Diagnostic view reports visible panel count and game identity matching status.
- Regression tests cover identity mismatches, route changes, duplicate prevention, text-as-text, delete and disable, and existing rename behavior.

## Remaining release acceptance

- [ ] Verify the panel renders and stays in the correct position on a **physical Steam Deck**, especially with SteamOS updates and CSS Loader.
- [ ] Verify controller navigation and the native Steam keyboard with **multiline** text on actual hardware.
- [ ] Verify opening and closing a game detail page repeatedly, game switching and rebuilding the UI.
- [ ] Verify co-installation with EnhancedGV / Decky Metadata.
- [ ] Verify aliases, backups and descriptions survive restart and upgrade with a previously populated TitleDeck install.
- [ ] Decide whether a true *replacement* of the original Steam About section is necessary. Do not promise replacing Valve's text without a stable, tested integration.
- [ ] Cut a separately versioned test ZIP, only after the above checks, without changing the published 0.9.0 RC1 installer.

## Compatibility

Community reports indicate TitleDeck titles may work on Windows and Android/DroidDeck. That is **not verification of custom descriptions** or of the native Steam panel on those platforms. This milestone targets **Steam Deck Gaming Mode** first.

The released 0.9.0 RC1 remains unchanged, and this functionality stays in the development pull request pending acceptance.
