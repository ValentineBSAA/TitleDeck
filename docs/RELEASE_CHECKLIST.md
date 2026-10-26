# TitleDeck 0.9.2 stable release checklist

**Public stable release:** [0.9.2](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2)  
**Tag and manifest version:** `0.9.2`  
**Installer:** `TitleDeck-0.9.2.zip`

## Completed

- [x] Publish stable GitHub release as a separate version from Beta 1.
- [x] Align repository manifests, frontend version, README and installation links.
- [x] Retain the beta and RC1 as historical prereleases.
- [x] Retain original hardware screenshots with accurate historical beta badges.
- [x] Document the physical-device tests and unverified configurations separately.

## Outstanding checks

- [ ] Physically install and verify the exact published stable ZIP on Steam Deck Gaming Mode, including saved settings migration.
- [x] Verify stable release ZIP SHA-256 (`28fdbfc6f2d15f991bf98c7dc471d19be3142cd84269a9bba60d1147b420efdb`) and synchronize plugin metadata, backend and frontend files with the published installer using GitHub Actions.
- [x] Re-run repository frontend, backend and manifest tests after synchronization.
- [ ] Test GTM 3.6.9 coexistence and a wider range of CSS Loader themes.
- [ ] Finish physical tests of keyboard dismissal, cold-start artwork and 200+ game bulk restoration.
- [ ] Continue regression testing after SteamOS updates.

**Important:** Historic Beta 1 development test results (107 JavaScript and 17 Python) are not proof that every workflow in the stable ZIP passed a new physical-device test.

[Stable notes](RELEASE_NOTES_0.9.2.md) · [Hardware evidence](VERIFIED_ON_DECK.md).
