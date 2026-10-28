# TitleDeck roadmap and status

## Release status (October 27, 2026)

- **Published stable:** 0.9.2; Game Info description reliability is a known issue in that released build.
- **Upcoming:** 1.1.8 candidate, tested on an actual Steam Deck. Final installer ZIP and current gallery have not been uploaded to GitHub.
- **Current blocker / follow-up:** right-stick scrolling in the Steam **Game Info** description area has just been reported not working for both Steam and non-Steam games. Do not call that feature verified.

## Recently completed on Deck

- [x] Title alias, native keyboard editing, cleanup preview, undo and restoration.
- [x] Steam and non-Steam custom Game Info descriptions survive Deck reboot in 1.1.8.
- [x] Side-by-side non-Steam cover/description and ghost-artwork removal on 1.1.1.
- [x] Physical LB/RB library paging for built-in Steam Deck and PS4 controller in 1.1.6 / 1.1.8.
- [x] Full Library Manager right-stick scrolling in 1.1.8 editor/settings.
- [x] Artwork fallbacks and tile-fitting refinements in 1.1.7 / 1.1.8 hardware checklist.
- [x] Reversible Hide tile for unwanted duplicate-looking Steam shortcuts.
- [x] Developer diagnostics hidden from normal public UI.
- [x] Documentation redesign and beginner guide staged for 1.1.8.

## Before a public 1.1.8 release

- [ ] Investigate and hardware-retest **Game Info right-stick description scrolling** (both entry types).
- [ ] Receive final 1.1.8 installer ZIP and verify it against the tested build.
- [ ] Synchronize repository runtime/source/manifests with that exact final installer.
- [ ] Receive screenshot images, integrate them into the gallery **without publishing a screenshots ZIP asset**.
- [ ] Validate tests, hashes and release metadata, then create the public GitHub 1.1.8 release.
- [ ] Recheck the public release asset installation on physical Deck.

## Longer term compatibility
- [ ] Test future SteamOS / Steam client changes; keep original restoration safe.
- [ ] Extend real-world artwork coverage for unusual Steam and non-Steam entries.
- [ ] Exercise massive bulk restores and backups in real libraries.
- [ ] Test more CSS Loader themes and Decky plugin combinations.

[Release notes](RELEASE_NOTES_1.1.8.md) · [Release checklist](RELEASE_CHECKLIST.md) · [Verified on Deck](VERIFIED_ON_DECK.md).
