# TitleDeck source and release provenance

**Latest public release:** [1.1.8](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8).

The official **TitleDeck-1.1.8.zip** was published by the maintainer. Its verified SHA-256 is:

```
2bae38490fbbb7da783d98b33e8acd4dd6213f03ba1a7256807e60cb736f061c
```

The repository's bundled runtime source (`main.py`, `plugin.json`, `package.json`, `src/index.js`, and `dist/index.js`) is synchronized from **the exact published installer** as part of the 1.1.8 repository release refresh. In particular, `src/index.js` and `dist/index.js` must be byte-identical.

The verified screenshot-source ZIP SHA-256 was:

```
44fe0ed371c71ff241c0a30178320c9045e8c77eed10bda0f6a4bae92454eced
```

Its 23 JPEGs are extracted into [the per-image gallery](docs/SCREENSHOTS.md), excluding Mac archive metadata. The public repository's gallery uses **individual image files** rather than shipping another screenshot ZIP.

**Historic releases:** [0.9.2 stable](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2), [0.9.2 Beta 1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2-beta.1), [0.9.0 RC1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.0). The historic 0.9.2 description warning applies to that **older installer**, not to the subsequently hardware-tested 1.1.8 Game Info display and persistence paths.

## 1.2.1 Beta artifact versus public repository source

**The maintainer's new `TitleDeck-1.2.1-Beta.zip` is a locally prepared beta test installer, not a published GitHub release.** Its checked ZIP checksum is:

```
d3cf000a66aadda5b742a4bea272587a9adb3b638a492eff3909252f0aa409df
```

The beta has `1.2.1-beta.1` in **both metadata manifests and the frontend badge**, and the packaged `src/index.js` and `dist/index.js` are byte-identical. The only functional difference from the maintainer's verified 1.2.1 Preview 3 is a context-menu-scoped **B / Circle hold change from 850 to 650 ms**.

**Prepared and hardware-accepted stable installer:** `TitleDeck-1.2.1-Stable.zip` uses `1.2.1` in the frontend and both manifests, has byte-identical `src/index.js` and `dist/index.js`, retains backend and assets, and has SHA-256 `95a6b3533c1d6588c5a3c936a7eca22a8c69f49cd2ed3e6f30126d47e1d0c6fb`. The 650 ms quick exit passed the maintainer's physical test. **The public repository runtime has not yet been synchronized to these exact stable bytes**; synchronize runtime and tests, run CI, then publish. Do not change public stable links from 1.1.8 until the new GitHub release exists.

[Beta acceptance plan](docs/RELEASE_CHECKLIST.md) · [Release notes](docs/RELEASE_NOTES_1.2.1_BETA.md).

## For developers

To verify a local checkout:

```sh
node --test tests/*.test.cjs
python3 -m unittest discover -s tests -p 'test_*.py'
```

Code changes should maintain source/dist parity, preserve the hardware-tested native Deck LB/RB path and Steam/non-Steam Game Info restoration, and distinguish hardware acceptance from simulated test results. See [Contributing](CONTRIBUTING.md), [Hardware test matrix](docs/VERIFIED_ON_DECK.md), and [Release checklist](docs/RELEASE_CHECKLIST.md).

**Open issue:** Steam/non-Steam **Game Info descriptions scroll with an external controller's right stick**, but **not with the Steam Deck's built-in right stick** in 1.1.8; see [#8](https://github.com/ValentineBSAA/TitleDeck/issues/8).
