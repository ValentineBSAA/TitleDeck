# TitleDeck 1.4.0: source and verified release

[← Home](README.md) · [1.4.0 release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.4.0) · [Build and verification](docs/BUILD_AND_VERIFICATION.md)

The **main branch now contains the exact 1.4.0 runtime and assets** from the accepted installer: `plugin.json`, `package.json`, `main.py`, `src/index.js` and `dist/index.js`, plus all supported font and icon assets. Binary source/runtime file hashes are recorded in [the manifest](docs/RELEASE_SOURCE_SHA256_1.4.0.md). The 1.2.2 test suite is preserved under `tests/archive/legacy-1.2.2/`, not run against the new runtime.

The original **[TitleDeck-1.4.0.zip](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.4.0/TitleDeck-1.4.0.zip)** is the device-tested installation package (SHA-256 `bf1b6108d0861246337915011fd1348ec51475dd042ae1d62c3226777266b588`). The [22-image gallery archive](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.4.0/TitleDeck-1.4.0-Organized-Screenshots.zip) has SHA-256 `4024f292b7f91092de9a43f1900a79062efb2be55edd28cc92c41ba3509a3c69`.

The developer's original handoff-source archive passed **79 JavaScript and five Python tests** locally before publication. The repository includes new 1.4.0 CI checks and selected read-only Art Hero regression tests, plus an archive of 1.2.2 tests. The count from the handoff should not be represented as the number of repository CI tests.

A checkout of `main` therefore includes the same *runtime* as the tested 1.4.0 installer; repository Markdown, build scripts and test layout can differ from the handoff's older documentation snapshot. Rebuilding an installer from a repository checkout may generate a different ZIP checksum because the README and changelog were enhanced after device acceptance. **Do not substitute a rebuilt ZIP for the original verified download without retesting.**

TitleDeck is licensed under [MIT](LICENSE). The npm `"private": true` field prevents accidental npm publication; it is not a proprietary-license restriction.

[Reproduction instructions](docs/BUILD_AND_VERIFICATION.md) · [Hardware acceptance](docs/VERIFIED_ON_DECK.md) · [Historical 1.2.2 provenance](docs/SOURCE_1.2.2_ARCHIVE.md).

**your titles you're deck!**
