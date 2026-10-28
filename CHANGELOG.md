# TitleDeck changelog

## 1.2.1 — Published stable release (October 28, 2026)

- All 1.2.1 Beta functionality accepted on physical Steam Deck. The context-menu shortcut and the new **650 ms B/Circle hold** passed the maintainer's final tests.
- The **1.2.1** stable installer was published by the maintainer on GitHub with its verified hardware acceptance. The repository's runtime/source synchronization and CI verification remain follow-up release-engineering tasks.
- [Published 1.2.1 stable notes](docs/RELEASE_NOTES_1.2.1.md).

## 1.2.1-beta.1 — Hardware-accepted private beta (October 28, 2026)

- Native game **Options (☰) → Edit with TitleDeck** shortcut works on Steam and non-Steam games; opens the exact selected game's editor without first rendering the artwork library grid.
- Configurable context-menu position: **After Developer** (default) or **Before Properties**, with a safe last-action fallback where non-Steam Properties is inside Manage.
- Context-launch-only **B / Circle hold-to-Steam** shortcut, shortened from **850 ms to 650 ms**; quick tap retains normal Back. Both the previous hold behavior and the new **650 ms** setting were physically verified; the exact 649/650 ms timing boundary was tested locally.
- Carries forward privately verified 1.2.0 STEAM-button menu title aliases (Steam/non-Steam), reboot persistence for Catherine, and ON/OFF restoration.
- **Publication:** 1.2.1 Stable was subsequently published with its own ZIP. The 1.2.1 beta remains a development milestone, not the latest public release.
- [Detailed beta notes](docs/RELEASE_NOTES_1.2.1_BETA.md) · [Hardware record](docs/VERIFIED_ON_DECK.md).


## 1.1.8 — Published stable release (October 27, 2026)

**Public installer:** [TitleDeck-1.1.8.zip](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8). Includes Steam/non-Steam custom description persistence after reboot, built-in Steam Deck and PS4 LB/RB paging, Full Library Manager artwork/hide tile improvements, updated Settings and a full 23-image screenshot gallery. **Known issue:** the Deck's **built-in right stick** does not scroll Steam/non-Steam Game Info descriptions; an **external controller's right stick does**. See [#8](https://github.com/ValentineBSAA/TitleDeck/issues/8).

- Repaired Steam and non-Steam custom Game Info description rendering and restart persistence; custom non-Steam cover-and-text layout and original restore tested on real Deck.
- Removed the ghost original-artwork placeholder while preserving the Steam Play / Proton information line.
- Removed obsolete yellow description-length warnings and retained unrestricted description saving.
- Repaired Full Library Manager physical **LB/RB** paging for both the Steam Deck controls and PS4 Bluetooth controller.
- Expanded Full Library Manager artwork sources, including Steam/local/cache fallbacks and improved poster tile sizing.
- Added reversible **Hide tile** for duplicate-looking entries without deleting Steam shortcuts.
- Added right-stick scrolling within **TitleDeck's own editor / Settings** and kept developer diagnostics hidden for public use.
- Updated accent colors, custom color picker, navigation, installed indicators and library presentation.
- **Hardware:** Maintainer completed all five final 1.1.8 feature checks and verified both Steam and non-Steam custom descriptions after reboot.
- **Open issue:** Steam's **Game Info** description-box scrolling works with an **external controller's right stick** for both game types, but **not with the Steam Deck's built-in right stick**. This is distinct from working manager-editor right-stick scrolling.
- **Release status:** installer ZIP, source parity, screenshots and GitHub release publication are pending.

## 1.1.6–1.1.7 — Private hardware-tested milestones

- **1.1.6:** Steam Deck's built-in LB/RB and PS4 controller LB/RB confirmed working in Full Library Manager after native focus-navigation input repair.
- **1.1.7:** Additional Steam/local artwork fallbacks and reversible Hide tile, confirmed with ES-DE (Program) on Deck.

## 1.1.0–1.1.5 — Private Game Info and controller milestones

- **1.1.1:** Hardware-proven custom artwork left / custom description right, ghost-slot cleanup, visible Proton text and original restoration.
- **1.1.2–1.1.3:** Removed obsolete editor warnings and protected working Game Info layout.
- **1.1.4–1.1.5:** Investigated controller input discrepancies, added native input bridge and diagnostics; PS4 controller navigation passed before built-in input was repaired in 1.1.6.

---

## 1.1.8: hardware-tested release candidate (NOT PUBLISHED)

- Hardware tests confirmed the candidate's Steam and non-Steam custom descriptions still display and persist after restarting the Deck.
- Validated manager paging with physical Deck LB/RB and PS4 Bluetooth controllers.
- Full Library Manager received artwork discovery improvements, a full-bleed blurred backdrop behind uncropped covers, Jurassic World Evolution 3 fallback, Hide tile, and public UI cleanup.
- Right-stick scrolling in manager workspaces, Settings and game editors was part of the five-item 1.1.8 acceptance check.
- **Open issue clarified afterward:** external-controller right-stick scrolling works in both Steam/non-Steam **Game Info description boxes**, but the **built-in Steam Deck right stick** does not. Do not claim built-in-input support until hardware verified.
- **Publication pending** final acceptance, selected screenshots, and source parity with the final installer.

### Earlier development history

## 0.9.2 — Stable (2026-10-26)

- Promoted the established Beta 1 behavior to stable 0.9.2 without intending new runtime features.
- Updated the displayed version, repository manifests, release download instructions and Direct Updater naming.
- Continued to document existing Steam Deck hardware acceptance separately from automated tests.
- Retained the beta-era screenshots as historical captures instead of changing their version badges.
- Further hardware acceptance for the exact stable ZIP, GTM coexistence and large bulk restores remains open.

## 0.9.2-beta.1 — Published Steam Deck beta (2026-10-25)

- Introduced locally editable game descriptions appearing in the actual Steam **Game Info tab** next to Community, with native-looking text.
- Confirmed rapid Game Info/Community switching on physical Deck after the Preview 23 rendering fix; eliminated the previously observed 1–7-second delay.
- Restore Original Game now resets **both** custom title and description; description-only restore also supported.
- Removed the hard description limit; a yellow non-blocking warning appears at **1,247 characters** about possible extra scrolling and layout irregularities.
- Improved Full Library Manager artwork fallback/persistent source caching; filtered Proton, Steam Linux Runtime, anti-cheat runtimes and other utility entries.
- Hid the developer timing capture from normal Quick Access; retained cleanup, native Steam keyboard, controller support and backup/recovery.
- Added clearly versioned public-beta screenshots of the 0.9.2 Quick Access menu and Catherine's custom Game Info description.
- **Community:** Thanks to u/All-Stars64 for the Game Info description request and u/TacoOfGod for the original name-customization inspiration.
- **Verification:** Preview 23/24 core Game Info behavior accepted on physical Deck; 107 frontend and 17 backend tests reported passing for beta build. GTM 3.6.9 co-installation, large bulk restores and all CSS Loader themes remain unverified. Steam keyboard B dismissal may intermittently leave editor raised; Done editing remains a workaround.
- **Source integrity:** The beta runtime, manifests, and editable frontend source have been synchronized from the SHA-256-verified published installer. The source tree also carries regression tests; see [SOURCE.md](SOURCE.md).

---

## Earlier releases (historical record)

### 0.9.0 RC1 — Steam Deck release candidate (2026-10-24)

**Target:** physical Steam Deck in Gaming Mode with Decky Loader. This is a **release candidate, not a stable general-purpose release**. ROG Ally, other handheld PCs, unofficial/non-Steam Deck SteamOS distributions, Windows, Android/DroidDeck and Desktop Mode have not been verified and may not work properly. Future Steam UI / CSS Loader changes may break display replacement.

**Creator-confirmed on actual Steam Deck:** custom display alias `Catherine Classic` → `Catherine`; restoration of original title; alias surviving a Deck restart; shared editor D-pad fix; native Steam keyboard opening in the game editor; visible input during typing; reversible Suggest Cleanup preview including The Sims 4 trademark symbol; explicit Save requirement; animated notifications and contrast improvements.

**Known issue (not fixed):** Steam's native keyboard sometimes closes with B while the editor remains temporarily in its raised keyboard-safe position. A `Done editing` fallback is provided. This intermittent keyboard dismissal is **not** verified fixed in RC1.

**Other unverified areas:** background Steam metadata refresh persistence, broad alternative device/platform compatibility, every Steam UI location and theme, physical-device 200+ alias confirmation review, and all-library edge navigation on different layouts. Local automated tests do not establish hardware compatibility.

**Release changes since public 0.8.1:** quicker Steam text reapplication on UI changes (simulation-tested), native Steam/physical keyboard and paste support, same-screen edit with keyboard-aware layout, Unicode-aware title cleanup, reversible before/after suggestions, Undo Cleanup, Restore Original focus repair. Removed experimental Steam cover badges.

**Data protection:** aliases are separate from Steam game files/metadata; no edit becomes a saved alias until Save Custom Title. Bulk Restore All provides confirmation, a complete paginated review, and an automatic recovery copy.

---

## 0.9.0-rc.1 (release candidate; awaiting maintainer's GitHub ZIP upload)

- Consolidate the accepted 0.8.12 behavior into the 0.9.0 release candidate. No new experimental UI or title engine changes in this packaging pass.
- Preserve the physical Steam Deck-tested Catherine title change, restart persistence, restoration, and Sims 4 non-destructive cleanup preview/apply/save path.
- Keep the native Steam keyboard, same-screen editor, explicit Save, reversible cleanup, recovery-backed Restore All, and D-pad navigation.
- Document **known intermittent** native keyboard dismissal animation after pressing B. Do not claim it is fixed.
- Explicitly distinguish Steam Deck hardware testing, automated checks, unverified Steam metadata refreshes, and unsupported ROG Ally/non-Valve SteamOS/Windows/Android environments.
- Update plugin manifest, package version, Quick Access/version chips, regression assertion, and release documentation together.

## 0.8.12 (device-test candidate)

- Prevent Suggest cleanup from silently rewriting the editable draft.
- Present a controller-focusable before/after preview with Keep and Apply options.
- Offer a one-click Undo cleanup until the next manual edit, save or game change.
- Keep Restore original available even without a saved alias, clearing local unsaved edits in that case.
- Preserve four-direction navigation with explicit focus targets and focus retry.
- Retain the unchanged 0.8.11 native keyboard and Steam title replacement logic.

## 0.8.11 (device-test candidate)

- Improve optional title-case suggestions for mixed-case Ninja Gaiden and Final Fantasy game names.
- Preserve original Σ, other Unicode letters, Roman numerals, common acronyms, and punctuation.
- Base cleanup on current unsaved draft so a suggestion does not erase manual edits.
- Clarify inline editor instructions for Steam's cursor buttons and paste.
- Preserve the 0.8.10 single-screen keyboard and all alias/restore logic.

# TitleDeck 0.8.10 (device-test)

- Preserve 0.8.9's single-screen game editor while animating the real embedded name field into a keyboard-safe upper area when Steam's native OSK opens.
- Restore original four-button editor layout automatically when an available Steam or controller dismissal signal fires.
- Add passive Gamepad API B-edge polling, DOM keyboard/focus detection, Steam status callbacks and a clearly labeled Done editing fallback for CEF windows that expose no close event.
- Changing games or leaving the editor always resets temporary lift state.
- Keep alias persistence, backups, copy/paste, fast title refresh, and controller focus behavior unchanged.

# 0.8.9 device test

- Removed the transient second screen from **Change name**. The native input now lives in the standard game editor.
- Steam B can close the separate native keyboard without requiring TitleDeck to receive the suppressed B/close events or navigate another route.
- The native field remains near the top of the editor; Save/Restore controls remain in place below it.
- Draft updates, paste fallback, physical keyboard, and explicit Save semantics preserved.
- Search and App ID entry continue using their existing native text-entry screens.

# TitleDeck 0.8.8 — Native keyboard B cancel (device-test build)

- Investigated why Steam Deck B dismisses the separate Steam on-screen keyboard without passing a keyboard-close event to TitleDeck.
- Added a **read-only Steam controller state listener while title editing**; it detects a fresh physical B button press (Steam controller bit 21) and drives the same downward transition and return used by other dismiss callbacks. No global keybinds or files are changed.
- B / keyboard dismissal now **cancels the unsaved title edit** and returns to the selected game's editor. It does not silently accept a partially entered name.
- RT/Enter remains **accept draft**; the game editor's Save button remains the only action that permanently stores an alias.
- Retains the working automatic Steam keyboard opening, inline editor, backups, notifications, and title refresh.
- Controller state delivery while the Steam keyboard owns focus has not yet been verified on physical hardware. Test specifically whether B closes and returns with one press.

# TitleDeck 0.8.7 — Keyboard dismiss → animated return and single-B editor exit

- Listen for Steam keyboard open/close state via `RegisterForStatus` when present, alongside Steam Input's dismissal messages and accessible keyboard DOM checks.
- Add return-focus fallback for an OSK hosted in a separate Steam window.
- On closing the native title keyboard, lower the layout and automatically return to the selected game's normal editor after the 300 ms transition.
- Preserve the unsaved draft; explicit **Save custom title** is still required.
- Handle a B cancel event forwarded to the manager while the native keyboard is raised without requiring a second B.
- Preserve the automatic Steam keyboard open, Enter acceptance, native text input, copy/paste, controller navigation, backups, and fast title refresh.
- Added regression tests for Steam keyboard status and single-B exit.
- Steam Deck OSK close notifications and event delivery require hardware acceptance before release promotion.

# TitleDeck 0.8.6 — Open Steam keyboard on Change Name; move editor only while open

- Changed the shared inline editing flow to **focus and click the Steam text field automatically** when entering Change Name. No extra A press on the field should be necessary when Steam honors the request.
- Removed the 0.8.5 always-collapsed layout: normal editor chrome stays visible with no on-screen keyboard. When the keyboard is detected the input card transitions into the upper keyboard-safe position.
- Added Steam Input `RegisterForUserDismissKeyboardMessages` handling so the editor can return after the keyboard closes in a separate CEF window, plus optional keyboard-open notifications and visible-overlay polling.
- Added a conservative short launch-delay fallback when Steam's keyboard cannot be observed in the plugin's document. Focus alone does **not** raise the card.
- Preserved native input and paste synchronization, explicit Save, Cancel, fast Steam title refresh, safe reset/recovery, and controller navigation.
- Local checks include automatic input activation, keyboard-visible transition, Steam dismissal callback, and inaccessible-window fallback; Steam Deck hardware acceptance is still required.

# TitleDeck 0.8.5 — Direct inline title editing and keyboard-safe input

- Fixed the actual on-device regression: Change Name no longer opens an unnecessarily separate full-screen text-entry page; it displays native text input within the selected game's editor.
- The native input is in the top, keyboard-safe zone from the first render, **even if Steam's keyboard is rendered in an inaccessible window and isn't detected**.
- Added a parent-controlled lift transition on keyboard focus, preserving the animated upward/downward motion where Steam's close notifications can be detected.
- Preserved explicit Save, cancellation of uncommitted edits, physical keyboard typing and paste, the fast text-refresh adapter, and existing backup/restore behavior.
- Verified simulated keyboard-open layout at 1280×800 and 960×544 plus frontend/backend regression tests.
- **Requires actual Gaming Mode verification:** OSK auto-opening, close signal, and focus management on the physical Deck.

# TitleDeck 0.8.4 — Keyboard-aware text-entry panel

- When Steam's native virtual keyboard opens, the full manager's text-entry panel transitions upward into the visible part of the screen; the header, toolbar and footer collapse temporarily to make room.
- When the native overlay closes, the panel animates back down; exiting the text editor also clears the keyboard layout state.
- Added checks for Steam virtual keyboard DOM visibility across known Steam/Decky documents, with focus/blur fallbacks when the keyboard is rendered separately.
- The same adjustment applies to renaming, library searching, and Steam App ID entry. Steam's native keyboard, physical keyboards, copy/paste, and explicit Save remain available.
- Validated the field's visible position with 1280×800 and 960×544 responsive browser simulations and new native-keyboard regression tests.
- **Device-test limitation:** Real Steam keyboard overlay signals and close behavior need verification on physical Steam Deck hardware. No unverified claim of complete keyboard compatibility.

# TitleDeck 0.8.3 — Steam native text input device test

- Removed TitleDeck's custom controller key grid from game-title editing, library search, and App ID entry.
- Replaced it with a native Decky/Steam text field inside the **full-screen** manager, not Quick Access. The native Steam keyboard should appear when the field is selected (Steam + X is available as a fallback).
- Added physical keyboard, typing, selection, and copy/paste support. A DOM input watcher catches Steam virtual keyboard paste actions even when they bypass React's `onChange`.
- Kept explicit confirmation in the editor: changing a draft does not silently save the title. Game rename, fast title repair, backups, notifications, and restore behavior remain unchanged.
- This is a Steam Deck Gaming Mode test build. Steam keyboard overlay placement **requires physical hardware verification**. Desktop Mode and Android/DroidDeck are not target platforms.

# TitleDeck 0.8.2 — Steam title persistence / fast-scroll correction

- Replaced the 700 ms UI-change delay with **immediate, bounded MutationObserver repairs**. Newly rendered Steam library entries are checked during the DOM mutation microtask, before a normal next paint.
- Fixed a same-text-node regression: when Steam rewrites an already-renamed text node with the original title, TitleDeck now recognizes and reapplies the saved alias instead of skipping the tracked node.
- Added fast, scoped scanning of inserted game tiles and options-menu headings. Editable fields, other Decky interfaces, and notifications stay excluded.
- Preserved and extended **reversible restores**, including when Steam replaces or removes a UI node, a user updates an alias, or a user disables the plugin.
- Added duplicate-title collision protection to avoid accidentally applying another game's alias to games that share the same original name.
- Kept the existing periodic scan as a fallback, not as the default update mechanism. Scans remain bounded to limit Steam UI overhead.
- Left the verified 0.8.1 game-editor controller navigation, Gaming Mode keyboard, appearance, backup/recovery, title-save behavior, and notifications unchanged.
- Added five frontend regression cases for virtualized tiles, same-node rewrites, options dialogs, restoration and collision protection.

**Hardware verification needed:** The initial reports of brief reversion came from a Reddit tester's Steam environment, including Windows and Android/DroidDeck. This patch is tested against simulated DOM transitions, **not** accepted yet on those platforms or physical Steam Deck Gaming Mode. TitleDeck remains focused on Steam Deck Gaming Mode. No promise is made about copy/paste from Steam's native keyboard or Desktop Mode editing.

# TitleDeck 0.8.1 — every-game editor navigation

- Every game editor now uses native Decky two-row gamepad focus groups and explicit Up, Down, Left, Right handlers. Both the editor actions and editor return control participate in the navigation graph.
- The controller skips disabled Save and Restore Original actions, avoiding jumps to random buttons.
- Main library row-navigation updates, all-title paginated review, badge removal and existing alias persistence from 0.8.0 are preserved unchanged.
- The verified Catherine Classic ⇄ Catherine renaming engine, Settings safety, animated notifications and Quick Access version badge remain unchanged.

Physical Decky/SteamOS acceptance remains necessary; local tests cannot guarantee CSS Loader integration.

# TitleDeck 0.8.0 — device test

- Removed unsupported Steam cover-name badge injection and its settings controls entirely. No changes to actual Steam artwork.
- Rebuilt the grid as native nested Decky gamepad Focusable rows (right per row, down between rows) instead of relying on a flat collection.
- Responsive rows are sized from the manager viewport. Four-column Deck setups use four-column controller rows.
- Improved native navigation node resolution and preserved explicit per-direction targeting.
- Restore All review now paginates **all aliases**, 8 per page, including non-installed games, with Previous / Next controls and fixed confirmation controls. Supports up to backend 2,000 alias limit without truncating the review.
- Removed abandoned badge diagnostics. Existing aliases/recovery backups preserved.
- Kept tested renaming, animated notifications, reversible restore, and quick-menu version label.

Device verification required for directional focus navigation under SteamOS / CSS Loader.
# TitleDeck 0.7.0 (device-test)

- Four-direction D-pad navigation now targets actual rendered game-card positions rather than assuming a fixed column count.
- Optional Steam library name badge detection now inspects CSS background portraits, image assets, Steam IDs in attributes/links, and read-only React overview props.
- Badge diagnostics report candidates and matches. Badges remain disabled by default and are fully removable.
- Preserved the accepted animated notifications, rename engine, reset/recovery safety, manager, and theme focus colors.

Device verification needed: real Steam library badge injection and controller movement under CSS Loader theme.

# TitleDeck 0.6.0 – Gaming Mode quality of life

- Fixed Settings navigation: D-pad Up from the first row now moves to the All Games control; re-entering Settings resets its scroll to the top.
- Eliminated persistent orange button paints from inline focus callbacks. Scoped inactive, selected, and focused styles work with CSS Loader themes.
- Added compact animated, timed in-manager notifications (4.2 s successes / 6.2 s errors), with animated countdown progress and graceful exit, replaced by newer notices safely.
- Added a `v0.6.0` version chip to the Decky quick menu and full manager, generated from one build constant that matches the plugin manifest.
- Expanded experimental native badge identification using portrait artwork App IDs as well as Steam DOM and React data. Badges remain off by default and only appear for games with saved aliases.
- Preserved the working rename/restore engine, controller library, persisted settings, recovery safeguards and approved TD icon.

**Steam Deck acceptance still required:** Settings/scroll behavior under CSS Loader, actual on-screen native badges, and notifications in Gaming Mode. Badge success is not guaranteed on every Steam UI release.


