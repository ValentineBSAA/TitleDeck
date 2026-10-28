# TitleDeck source, build, and release provenance

## Publication status

- **Public stable release today:** [0.9.2](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2). Its ZIP and published source have a historically documented Game Info description problem.
- **Hardware-tested next candidate:** **1.1.8**, currently in private testing. The maintainer has verified Steam/non-Steam description display after restart and the five 1.1.8 hardware checks, but separately reported failed right-stick scrolling **in description boxes**.
- **Important:** This documentation preparation commit does **not** publish a 1.1.8 installer or claim that the repository's current runtime source has been updated. Until final synchronization, `main.py`, `plugin.json`, `package.json`, `src/index.js`, `dist/index.js` and source-pinning tests still correspond to **published 0.9.2**.

## Historical releases

- [0.9.2 stable](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2)
- [0.9.2 Beta 1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2-beta.1)
- [0.9.0 RC1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.0)

Historic source and screenshot paths remain accessible. An unreleased 1.1.8 candidate ZIP is **not** a substitute for the current published downloadable installer.

## Final-release integrity plan

1. Accept the exact final ZIP after the remaining issue is resolved or explicitly accepted.
2. Verify ZIP structure, files and cryptographic checksum.
3. Copy the **exact version-matched files** into the repository: `plugin.json`, `package.json`, `main.py`, `src/index.js`, `dist/index.js`, and appropriate tests.
4. Require `src/index.js` and `dist/index.js` to match byte for byte.
5. Run frontend/backend and document tests.
6. Publish the final ZIP only after hardware acceptance, then verify public download and source/asset parity.
7. Include individual screenshots in the gallery, **not** a screenshots ZIP release asset.

**Safety:** An older workflow previously attempted to synchronize `main` back to the published 0.9.2 runtime. It has been retired to avoid accidentally overwriting newer work.

[Hardware evidence](docs/VERIFIED_ON_DECK.md) · [Release checklist](docs/RELEASE_CHECKLIST.md)
