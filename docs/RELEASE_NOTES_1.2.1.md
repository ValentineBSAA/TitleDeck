# TitleDeck 1.2.1 Stable — Prepared release notes (October 28, 2026)

**Status: Accepted on a physical Steam Deck; installer built and locally validated. NOT YET PUBLISHED to GitHub.** Current public stable release remains 1.1.8 until the maintainer publishes this version.

**Prepared Decky installer:** `TitleDeck-1.2.1-Stable.zip`. Internal version is **1.2.1** in the frontend, package.json, and plugin.json. The ZIP has the required TitleDeck/ root, eight files, and identical source/dist JavaScript.

**Local ZIP SHA-256:** `95a6b3533c1d6588c5a3c936a7eca22a8c69f49cd2ed3e6f30126d47e1d0c6fb`. This checksum is for the prepared file, not an already-published GitHub asset.

## What's new
- STEAM-button running-game menu shows saved custom names for **Steam and non-Steam games**, and an ON/OFF setting restores original names when disabled. Hardware-tested with Catherine Classic → Catherine and non-Steam Need for Speed Most Wanted Black Edition → Need for Speed Most Wanted!. Catherine override persisted through a Steam Deck restart.
- Native game **Options (☰) → Edit with TitleDeck** jumps directly to the highlighted game's editor, avoiding the old full-library artwork-grid flash. Both Steam and non-Steam shortcuts verified.
- **Game Options menu placement** under Full Library Manager → Settings. Preferred default **After Developer**, with **Before Properties** or an appropriate bottom-of-menu fallback when a non-Steam game's Properties is nested under Manage.
- Context-menu-launched editor: normal tap **B / Circle** goes Back; **hold for 650 ms** returns directly to Steam. The maintainer has hardware-verified the new hold responsiveness and context-menu behavior.
- Existing title/description editing, original restore, artwork handling, backups, library manager, controller paging, and HOME-menu toggle remain intact.

## Verification and limitations
The user verified the new shortcut, placement, and 650 ms hold on a physical Steam Deck. Local syntax, simulated first-render, game-identity/menu-insertion, and 649/650 ms boundary tests passed. This is *not exhaustive testing* of every Steam client version or third-party theme. The Steam Deck's built-in right stick still does not scroll Game Info custom description text while an external controller's right stick does (known [issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8)); right-stick input inside TitleDeck's own editor is separate. The STEAM menu's logo artwork is not replaced by text renaming.

## Publication still required
1. Synchronize the GitHub repository runtime files and regression tests with the accepted exact stable installer, then run CI.
2. Create the **1.2.1 Stable** GitHub release and attach the verified `TitleDeck-1.2.1-Stable.zip`.
3. Compare the GitHub release asset's SHA-256 against the local checksum above.
4. **After actual publication**, update README badges, stable download links, and installation references to 1.2.1. Until then, leave the existing 1.1.8 public download links intact.

[Hardware verification](VERIFIED_ON_DECK.md) · [Local and device test evidence](RELEASE_TEST_RESULTS_1.2.1.md) · [Release checklist](RELEASE_CHECKLIST.md) · [Install](INSTALL.md)
