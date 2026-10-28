# TitleDeck source, public release and integrity

## Current state, October 27, 2026

| Item | Version / status |
| --- | --- |
| **Published GitHub installer** | [TitleDeck 0.9.2](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2) |
| **Upcoming candidate tested on real Deck** | 1.1.8, **not yet published** |
| **Checked-in runtime and source** | Still 0.9.2 until the maintainer supplies and approves the final 1.1.8 ZIP |
| **Current screenshots** | Historical 0.8.x / 0.9.x captures; 1.1.8 gallery pending |

**Do not claim the `main` branch currently contains the tested 1.1.8 runtime.** It doesn't. This documentation refresh intentionally does not modify `main.py`, `plugin.json`, `package.json`, `src/index.js`, or `dist/index.js` until a final validated installer can be synchronized.

## Safe public release procedure

1. Start from the exact **final, physically tested installer ZIP**.
2. Validate `TitleDeck/plugin.json`, `package.json`, `main.py`, and `dist/index.js`, and its final version.
3. Set `src/index.js` to the same bundled frontend bytes as `dist/index.js` unless the developer provides the original source separately.
4. Update/add appropriate automated regression tests, manifest and source integrity checks, and version-specific release verification.
5. Check archive integrity and record SHA-256.
6. Add final screenshots as individual files; **never include screenshot archive as a runtime file or separate new release asset**.
7. Publish the 1.1.8 GitHub release/tag and plugin ZIP only **after** the hardware bug and final acceptance decision.
8. Verify that the public ZIP matches what was tested; avoid pinning future repository sync to older versions.

## Historical assets

The previously published 0.9.2 stable release, 0.9.2 Beta 1 and 0.9.0 RC1 remain available for history. Their original ZIPs and images are not being changed by this documentation refresh. The old stable ZIP was historically verified against its own matching source; that fact does not establish 1.1.8 source parity.

[Release checklist](docs/RELEASE_CHECKLIST.md) · [Contributor guide](CONTRIBUTING.md) · [Hardware verification](docs/VERIFIED_ON_DECK.md).
