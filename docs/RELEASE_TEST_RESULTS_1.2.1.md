# TitleDeck 1.2.1 — hardware and local release test record

**October 28, 2026.** This is the testing record for the **published** [TitleDeck 1.2.1 Stable](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.2.1) installer. The user independently published it following hardware acceptance.

## Maintainer-confirmed physical Steam Deck tests

| Test | Evidence status |
| --- | --- |
| Steam game title alias in physical STEAM-button menu: Catherine Classic → Catherine | ✅ User confirmed |
| Original title returns when HOME-menu alias setting turned OFF | ✅ User confirmed |
| Custom title returns when setting turned ON | ✅ User confirmed |
| Catherine alias survives a Steam Deck restart | ✅ User confirmed |
| Non-Steam STEAM-button alias: Most Wanted Black Edition → Need for Speed Most Wanted! | ✅ User confirmed |
| Native game Options context menu: **Edit with TitleDeck** on Steam and non-Steam games | ✅ User confirmed |
| Native context item opens *the selected game's editor*, not another game | ✅ User confirmed |
| Direct editor startup avoids full library artwork-grid flash | ✅ User confirmed |
| Context-menu placement: **After Developer** and **Before Properties**, including non-Steam fallback | ✅ User reported all verified |
| B / PlayStation Circle short press remains normal Back | ✅ Previously user confirmed |
| Context-only long-hold B / Circle, 650 ms, exits to Steam responsively | ✅ User explicitly confirmed final test |

These are user-reported device tests, not remote automated hardware instrumentation. They do not establish compatibility with every SteamOS version, third-party theme, or controller.

## Local checks run against prepared Stable ZIP

- ZIP: `TitleDeck-1.2.1-Stable.zip` (8 files, top-level `TitleDeck/`).
- `plugin.json`, `package.json`, and frontend display identify **1.2.1**.
- `src/index.js` and `dist/index.js` are identical.
- `node --check TitleDeck/src/index.js`: **PASS**.
- `python -m py_compile TitleDeck/main.py`: **PASS**.
- Simulated context-menu anchors (Steam and non-Steam), Manage → Properties fallback, deduplication, short/held B, cleanup, disabled mode: **PASS**.
- First React render opens selected editor without showing initial library grid: **PASS**.
- Regression suite: **25 passing assertions** covering shortcut positions, game identity, direct editor, settings, controller and adapter lifecycle.
- Additional 649/650 ms threshold simulation was passed in prior beta testing.
- **Local SHA-256:** `95a6b3533c1d6588c5a3c936a7eca22a8c69f49cd2ed3e6f30126d47e1d0c6fb`.

## Post-publication source and verification tasks

- [ ] Synchronize GitHub repo `main.py`, `src/index.js`, `dist/index.js`, `plugin.json`, `package.json` and appropriate regression tests with **these exact stable ZIP bytes**. **Currently main still has 1.1.9 runtime source.**
- [ ] Run GitHub Actions CI against that synchronized commit; **no green GitHub CI run for 1.2.1 is claimed here**.
- [x] Publish stable GitHub release **1.2.1** with ZIP asset. Asset size matches the locally built ZIP.
- [x] Download the published ZIP via GitHub Actions and confirm exact SHA-256 `95a6b3533c1d6588c5a3c936a7eca22a8c69f49cd2ed3e6f30126d47e1d0c6fb` ([workflow run](https://github.com/ValentineBSAA/TitleDeck/actions/runs/40787369311)).
- [x] Update README stable-download badge and installation links to the published 1.2.1 release.

**Known issue:** The Steam Deck built-in right stick does not scroll Game Info custom descriptions for Steam/non-Steam titles, while an external controller's right stick does. See [issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8).

[Published 1.2.1 release notes](RELEASE_NOTES_1.2.1.md) · [Verified hardware matrix](VERIFIED_ON_DECK.md) · [Release checklist](RELEASE_CHECKLIST.md).
