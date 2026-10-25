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


## Preview 8: Live Steam Game Info CSS classes

The physical Deck's Preview 7 capture for Catherine Classic (app 893180) confirmed one valid game container but 0 hard-coded Game Info panels and 0 native description nodes. This rules out an App ID storage problem, but does not tell us whether Steam has a native Game Info description in its current UI state. Preview 8 follows the public Decky Metadata plugin's pattern: locate the GameInfoContainer and GameDescription CSS tokens through the live Decky SteamUI module finder instead of assuming CSS names contain human-readable prefixes. Cache successful lookups and retry missing modules at a bounded interval.

The custom text still only replaces a uniquely matched, verified native description on the correct game page; it will not overwrite arbitrary Steam content or infer a Game Info description from an unrelated element. Quick Access Capture now reports **Live CSS modules resolved/unavailable**, alongside actual native element counts, with fallback to the old selectors. Both the original Below Play mode and Artwork Footer remain unchanged. Native Game Info replacement awaits physical testing.


## Preview 9: MetaDeck-informed native description data interception

Research: MetaDeck (`EmuDeck/MetaDeck`, GPL-3.0) uses the Steam `appDetailsStore.GetDescriptions` API and the `strFullDescription`/`strSnippet` fields to drive native Game Info descriptions, rather than depending only on a DOM element. TitleDeck's Preview 9 introduces an independently written, reversible per-instance read-time wrapper around this getter.

- Returns TitleDeck text only when the plugin is enabled, Game Info is selected, the requested app ID has a saved description, and live Steam navigation identifies exactly the same app; conflicting app routes are refused.
- Returns Steam's original result unchanged for other games, inactive pages, non-Game-Info placement, or disabled TitleDeck.
- Does **not** write to Steam's persistent app-details cache, change installed files, or change the user's original Steam descriptions.
- Restores the original property descriptor or inherited getter on unload; does not undo unrelated third-party patches installed after TitleDeck.
- Exposes native hook counts, total `GetDescriptions` reads, and successful overrides in Steam display diagnostics and in Quick Access Capture.
- The existing DOM description panel remains as a guarded fallback, and Below Play and Artwork Footer remain available.

**Physical acceptance still required:** Steam may cache descriptions and fail to re-read them until the game page is reopened. Select Game Info, exit to the library, open the game again, then capture the native hook/call/override counters. If Game Info stays unchanged, record those counters; don't presume the data patch succeeded merely because unit tests passed.

This research uses public techniques, not copied MetaDeck code. A future implementation should review interoperability with Decky Metadata and other Game Info plugins on hardware.


## Preview 10: Native-looking Game Info display

Hardware acceptance of Preview 9: Catherine Classic (Steam app 893180) showed the saved custom description inside the real **GAME INFO** tab, but as a blue TitleDeck card labeled **YOUR CUSTOM GAME DESCRIPTION**, which did not resemble Steam's own description presentation. This was the DOM fallback adding a separately styled section; it was not the desired visual result.

Preview 10 removes the TitleDeck-branded card **in Game Info mode only**. Where Steam renders a native description element, TitleDeck creates a shallow copy of that element's shell, retaining its CSS classes and native theme styling, then puts the custom plain text inside. The original Steam element is temporarily hidden unchanged and restored on disabling TitleDeck, switching placement, deleting the custom description, or unloading the plugin. The copy omits Steam's child nodes and ID to avoid duplicates or React-state sharing. If no native description element exists, a minimal text element inherits its surrounding theme instead of imposing a blue card. Long and multiline user text remains safely escaped, and no persistent Steam metadata is overwritten.

**Hardware acceptance for preview 10:** open Catherine Classic → GAME INFO; custom text should look like normal Steam description text without a separate tinted box or YOUR CUSTOM GAME DESCRIPTION heading. Test editing, deleting and restoring; then test both the user’s Art Hero/CSS Loader layout and ordinary Steam theme if possible. The Below Play and Artwork Footer placements intentionally retain their separate-card styling. No claim of pixel-perfect styling until a real Steam Deck screenshot confirms it.
