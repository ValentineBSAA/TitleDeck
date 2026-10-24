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
