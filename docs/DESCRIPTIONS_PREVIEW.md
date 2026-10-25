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

## Native Steam GAME INFO support

The original Reddit request is specifically the description displayed **inside Steam's GAME INFO tab**, not a separate card below Play. Description Preview 5 introduces a **Game Info** placement option.

- On a matching Steam game page, open **GAME INFO**. When Steam mounts its native Game Info panel, TitleDeck inserts the custom text in the native description area and temporarily hides that original description.
- TitleDeck preserves the original native DOM text untouched. Selecting a different location, pausing TitleDeck, changing games or unloading TitleDeck restores the original display and removes only the TitleDeck element.
- The custom replacement is local to TitleDeck, not uploaded to Steam or edited in the Steam store.
- It may not appear when Steam provides no GAME INFO tab. This is not yet physically validated on the current Steam Deck OS build.

## Optional placement: Artwork Footer vs Below Play

TitleDeck now has a **Game description placement** setting in its full-manager Settings page with **three independent choices: Game Info, Artwork Footer and Below Play.**

- **Below Play** (default for existing settings): keeps the original full-sized panel between the Play bar and Steam's content tabs. Entire descriptions remain visible.
- **Artwork Footer**: puts a compact, 2-line read-only preview into the strip immediately **below the hero artwork and above the Play bar**. This is intended to match the unused dark area shown with Metagawa's Art Hero 3.2.03. The panel follows the measured Play bar on theme layout changes, and hides when the header is scrolled away instead of floating over Steam controls.
- Setting changes are persistent, reversible and do not require editing a description again. Older settings and existing descriptions default to Below Play for compatibility.
- If TitleDeck cannot safely find a suitable Play bar, it falls back to Below Play rather than positioning into an unverified UI area.
- TitleDeck never changes Art Hero or CSS Loader files, artwork, game metadata, or Valve's Play controls.

**Unverified on hardware:** positioning with the user's exact theme settings and any combinations of Art Hero height sliders or other CSS Loader themes. The mock/CI geometry test is not a substitute for user acceptance.

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


## Preview 7 diagnostic capture (for Game Info tab mismatch)

If Game Info still shows the original text, open that game's **GAME INFO tab first**, then open the Decky Quick Access menu and select **TitleDeck → Capture current Game Info page**. This captures the currently visible game ID and native panel/description selector counts, along with a few CSS class clues. **It does not capture game description text.** The result is also retained under Full Library Manager → Settings → Steam display diagnostics.

**Why:** Opening the full manager can hide or unmount the Steam game-detail page. Previous diagnostics showed `No visible Steam details container` while the manager was open, which did not identify the Game Info failure. Preview 7 records a game-page observation before navigation, keeps it across a manager visit, and ensures an empty secondary Steam UI document doesn't overwrite the meaningful status from a detected game page.

This is an instrumentation / detection-quality update; physical Game Info replacement still needs acceptance on Steam Deck. Original below-Play description and keyboard flows remain available.
