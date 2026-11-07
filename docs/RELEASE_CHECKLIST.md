# TitleDeck 1.4.0: publication and acceptance record

[← Home](../README.md) · [Release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.4.0) · [Source](../SOURCE.md)

## Publication and integrity
- [x] Exact hardware-accepted installer `TitleDeck-1.4.0.zip` published; SHA-256: `bf1b6108d0861246337915011fd1348ec51475dd042ae1d62c3226777266b588`.
- [x] User-organized screenshot ZIP published; SHA-256: `4024f292b7f91092de9a43f1900a79062efb2be55edd28cc92c41ba3509a3c69`.
- [x] All 22 screenshots imported individually, 12 featured and ten supporting, without duplicates.
- [x] Installer checks compared 13 files to the original handoff source; exact parity passed.
- [x] Source ZIP regression suite passed 79 JavaScript and five Python tests locally.
- [x] Maintainer reports extensive physical Steam Deck testing, accepting Art Hero read-only limitations.
- [x] Repository synchronized with official installer: both manifests, backend, frontend, direct dist module, and font/icon assets.
- [x] Older 1.2.2 tests preserved separately in a historical archive.
- [x] Fresh 1.4.0 CI, source hashes and package scripts included.
- [x] Art Hero, built-in Game Info right-stick issue #8 and older Quick Access focus caveats documented.

## Testing policy
The original 79/5 tests were run against the developer's full source handoff, not the legacy main branch. GitHub CI covers the checked-in 1.4.0 source and release checks. All device-specific behavior must still be validated on physical hardware after future changes. The original installer should not be replaced by a newly rebuilt ZIP without retesting.

[Build guide](BUILD_AND_VERIFICATION.md) · [Art Hero](ART_HERO_COMPATIBILITY.md) · [Screenshots](SCREENSHOTS.md) · [Historical checklist](HISTORICAL_RELEASE_CHECKLIST_1.2.2.md).
