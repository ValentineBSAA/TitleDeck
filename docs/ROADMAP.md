# TitleDeck roadmap

## 1.1.8 candidate: finishing the public launch

- [x] Reversible local title and Game Info description overrides, including Steam and non-Steam entries.
- [x] Hardware-tested custom description persistence after reboot and original-game restoration.
- [x] Artwork-left / description-right presentation, ghost-artwork cleanup and Proton info retained.
- [x] Full Library Manager D-pad, on-screen and physical LB/RB paging, with built-in Steam Deck and PS4 Bluetooth controller validation.
- [x] Artwork fallbacks, newer Steam formats/cache, full-bleed background, hide-tile cleanup.
- [x] RGB/preset visual settings, manager right-stick workspaces, public diagnostics hidden.
- [x] Rewrite beginner, feature, compatibility and release documentation; stage individual-image gallery.
- [ ] **Fix or formally disposition right-stick scrolling in Steam/non-Steam description boxes** (new user-reported issue).
- [ ] Insert new 1.1.8 hardware screenshots (not the screenshot ZIP).
- [ ] Synchronize and publish the exact final tested 1.1.8 installer/source.
- [ ] Close historical 0.9.2 description known-issue report after fixed release becomes public.

## Longer-term maintenance

- [ ] Recheck behavior after SteamOS/Steam client updates.
- [ ] Test additional CSS Loader themes and Decky plugin coexistence.
- [ ] Exercise very large 200+ title restoration and backup recovery cases.
- [ ] Investigate intermittent native Steam keyboard dismissal if still reproducible.
- [ ] Expand platform coverage **only after actual testing**; do not imply support for Windows, other handhelds or Android without evidence.

The next priority is reliability, not more features. Avoid changes to the proven title, artwork, restoration and controller paths while resolving the remaining input regression.

[1.1.8 notes](RELEASE_NOTES_1.1.8.md) · [Verified on Deck](VERIFIED_ON_DECK.md)
