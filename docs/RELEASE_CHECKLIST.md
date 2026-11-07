# TitleDeck 1.4.0 publication and verification
[← Home](../README.md) · [Release]( https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.4.0 ) · [Source notes](../SOURCE.md)

## Verified installer and screenshots
- [x] Published [TitleDeck 1.4.0](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.4.0) with `TitleDeck-1.4.0.zip`.
- [x] Verified the published installer SHA-256: `bf1b6108d0861246337915011fd1348ec51475dd042ae1d62c3226777266b588`.
- [x] Published organized screenshot archive with **22** actual 1920×1080 images and no duplicate captures.
- [x] Screenshot archive SHA-256: `4024f292b7f91092de9a43f1900a79062efb2be55edd28cc92c41ba3509a3c69`.
- [x] Provided 1.4.0 installer matches every one of the **13** corresponding source files.
- [x] Provided source passed **79 JavaScript / five Python** tests, syntax and version checks.
- [x] Maintainer reports physical Deck acceptance of all accessible features with Art Hero read-only limitation.
- [x] Known controller and Art Hero limitations documented.

## Provenance caveat
The 1.4.0 release assets are verified against the original handoff. The GitHub **default branch was still 1.2.2 at the time this documentation update was prepared**. Do not claim that a GitHub source checkout matches the 1.4.0 payload until it has actually been synchronized and verified. The installable ZIP itself contains 1.4.0.

## What remains to verify in future changes
- [ ] Reconcile the complete public default-branch runtime source and test suite with the accepted 1.4.0 source tree.
- [ ] Continue tracking right-stick Game Info scrolling issue #8 and controller-focus reports separately.
- [ ] Recheck compatibility after major SteamOS, CSS Loader or Decky Loader changes.

[Historical 1.2.2 release checklist](HISTORICAL_RELEASE_CHECKLIST_1.2.2.md).
