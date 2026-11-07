# TitleDeck verification record
[← Home](../README.md) · [Release notes](RELEASE_NOTES_1.4.0.md) · [Known limitations](COMPATIBILITY.md)

## Version 1.4.0 (November 7, 2026)
| Check | Result |
| --- | --- |
| Extensive maintainer testing on a physical Steam Deck | **Reported passed** for the accessible features |
| Art Hero placement viewing when enabled | **Intentional read-only limitation accepted** |
| TitleDeck's own placement when Art Hero is absent/disabled | Retained; included in maintainer's verification report |
| Automated JavaScript tests | **79 passed** |
| Automated Python tests | **5 passed** |
| `src/index.js` / `dist/index.js` parity in verified handoff source | Passed |
| Installer to source packaged file parity | **13 of 13 identical** |
| Published installer SHA-256 matches accepted file | Passed |
| Published screenshots ZIP SHA-256 matches organized upload | Passed |

**Provenance:** Hardware verification is reported by the maintainer, not independently performed by this documentation process. Automated validations were run on the supplied handoff source. Art Hero write controls, built-in stick Game Info scrolling and the older focus quirk are **not claimed functional/fixed**.

## Prior release history
The historical testing notes for 1.2.2 and earlier releases remain in the [archived hardware record](VERIFIED_ON_DECK_1.2.2_ARCHIVE.md).
