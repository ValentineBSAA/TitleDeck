# TitleDeck source and release provenance

**Latest publicly published stable:** [TitleDeck 1.2.1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.2.1).

**Published installer:** [TitleDeck-1.2.1-Stable.zip](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.2.1/TitleDeck-1.2.1-Stable.zip). GitHub lists the asset at **1,957,477 bytes**, matching the locally created installer. The independently verified **local** ZIP SHA-256 is:

```text
95a6b3533c1d6588c5a3c936a7eca22a8c69f49cd2ed3e6f30126d47e1d0c6fb
```

The uploaded GitHub asset's independently downloaded SHA-256 is still pending; the matching byte count alone does **not** establish byte-for-byte identity. The published stable build passed maintainer hands-on hardware checks for Steam and non-Steam title aliases, native Options context-menu shortcut, direct editor, menu placement, and 650 ms B/Circle exit.

**Source sync note:** The repository's runtime files were still at 1.1.9 when 1.2.1 was published. The authoritative source for a sync is the exact published 1.2.1 ZIP. Do **not** replace the published ZIP with a generated approximation, alter historical releases, or claim CI was green until checked.

**Historical 1.1.8 release:** [TitleDeck 1.1.8](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8) remains archived with its original screenshot gallery, documentation and checksum `2bae38490fbbb7da783d98b33e8acd4dd6213f03ba1a7256807e60cb736f061c`. The screenshot source archive had SHA-256 `44fe0ed371c71ff241c0a30178320c9045e8c77eed10bda0f6a4bae92454eced`, and its 23 genuine captures are retained under `docs/screenshots/v1.1.8/`.

**Previous 1.2.1 Beta:** The 650 ms exit threshold was hardware accepted before release. Beta notes remain available at [1.2.1 Beta history](docs/RELEASE_NOTES_1.2.1_BETA.md); they are not current installation instructions.

[1.2.1 release notes](docs/RELEASE_NOTES_1.2.1.md) · [Hardware and local test record](docs/RELEASE_TEST_RESULTS_1.2.1.md) · [Post-release checklist](docs/RELEASE_CHECKLIST.md).

## For developers

To verify a local checkout:

```sh
node --test tests/*.test.cjs
python3 -m unittest discover -s tests -p 'test_*.py'
```

Code changes should maintain source/dist parity, preserve the hardware-tested native Deck LB/RB path and Steam/non-Steam Game Info restoration, and distinguish hardware acceptance from simulated test results. See [Contributing](CONTRIBUTING.md), [Hardware test matrix](docs/VERIFIED_ON_DECK.md), and [Release checklist](docs/RELEASE_CHECKLIST.md).

**Open issue:** Steam/non-Steam **Game Info descriptions scroll with an external controller's right stick**, but **not with the Steam Deck's built-in right stick** through tested 1.2.1; see [#8](https://github.com/ValentineBSAA/TitleDeck/issues/8).
