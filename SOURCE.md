# TitleDeck source, license and release provenance
[← Home](README.md) · [1.4.0 release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.4.0) · [Installation](docs/INSTALL.md)

TitleDeck is licensed under [MIT](LICENSE). Its gameplay-free editing logic is local: it customizes displayed Steam Deck titles and descriptions without rewriting game installations or Valve's canonical metadata. In `package.json`, `"private": true` means **do not publish to npm**; it does not override MIT licensing.

## Stable release assets
- **Installer:** [TitleDeck-1.4.0.zip](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.4.0/TitleDeck-1.4.0.zip) (SHA-256 `bf1b6108d0861246337915011fd1348ec51475dd042ae1d62c3226777266b588`).
- **Screenshot archive:** [TitleDeck-1.4.0-Organized-Screenshots.zip](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.4.0/TitleDeck-1.4.0-Organized-Screenshots.zip) (SHA-256 `4024f292b7f91092de9a43f1900a79062efb2be55edd28cc92c41ba3509a3c69`).
- **Historical installer:** [1.2.2 Stable](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.2.2).

The release installer contains the 1.4.0 `main.py`, compiled front end, manifests and runtime assets. The maintainer supplied a separate 1.4.0 source archive that was audited against it: **13/13** installed files match the corresponding source, and **79 JS / five Python** tests passed.

> [!IMPORTANT]
> **Repository synchronization note:** The publicly checked-out `main` branch was still based on 1.2.2 when 1.4.0 release assets were published. Until the full 1.4.0 source and tests have been synchronized to the branch and verified in CI, do not use `git clone main` as proof of exact 1.4.0 source parity. This is a documentation/source-tracking issue, **not** a failure of the verified installer ZIP. The release asset is the installation source of truth.

## Contributing and reproducibility
Follow [CONTRIBUTING.md](CONTRIBUTING.md). For features and known limitations consult [1.4.0 release notes](docs/RELEASE_NOTES_1.4.0.md) and [hardware record](docs/VERIFIED_ON_DECK.md). Historical 1.2.2 source documentation is preserved at [docs/SOURCE_1.2.2_ARCHIVE.md](docs/SOURCE_1.2.2_ARCHIVE.md).
