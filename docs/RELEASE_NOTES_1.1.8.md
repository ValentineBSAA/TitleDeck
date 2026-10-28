# TitleDeck 1.1.8: release notes (publication pending)

**Status:** Hardware-tested **release candidate**, not yet published to GitHub Releases. The next installer is expected to be `TitleDeck-1.1.8.zip` after final acceptance and source synchronization. The currently public release remains 0.9.2, with its historical description issue.

## The short version

TitleDeck grew from a Steam Deck game-name editor into a customizable library manager with **Steam and non-Steam Game Info descriptions**, reversible title and description changes, artwork fallbacks, usable controller navigation, and a redesigned interface.

### What changed since the original 0.9.x release?

1. **Descriptions are usable on actual hardware.** The 1.1.8 candidate has been tested with both Steam and non-Steam descriptions saved, displayed in Game Info, and retained after a full Deck restart.
2. **Native-looking Game Info.** Non-Steam artwork and text sit side by side; the unwanted empty “ghost” poster slot is gone, and Steam's Proton information remains. Restore Original returns the native content and layout.
3. **Controller reliability.** Full Library Manager LB/RB paging now works with the Deck's built-in shoulder buttons **and** a PS4 Bluetooth controller. On-screen paging remains.
4. **Library makeover.** A tile-based Full Library Manager with search, All / Installed / Renamed filters, green Installed badges, and improved focus/navigation.
5. **Artwork upgrades.** More Steam/locally cached art sources, demo fallbacks, Jurassic World Evolution 3 art, and attractive filled backgrounds behind uncropped covers.
6. **Reversible clutter cleanup.** Hide an unwanted tile (for example, a duplicate ES-DE shortcut) without deleting it from Steam.
7. **Appearance and settings.** Wine Red accents, presets, an interactive custom color picker, description placement choices, and controller-friendly Settings.
8. **Public UI polish.** Developer diagnostics are hidden by default; older yellow description-length warnings were removed.

## What is verified and what is not?

**Hardware-confirmed on a physical Steam Deck:** native Deck LB/RB, PS4 LB/RB, on-screen paging, controller navigation, changed and restored titles, saved Steam/non-Steam descriptions after reboot, restored original Game Info presentation, ghost-artwork removal, hide tile, and the 1.1.8 five-item acceptance check (manager right-stick, JWE3 artwork, filled-art appearance, LB/RB, diagnostics hidden).

**Still open before publication:** the maintainer subsequently reported that **right-stick scrolling does not work inside Steam and non-Steam description boxes**. That specific control must not be listed as hardware-verified until it is repaired and retested. The scrolling report does not negate the proven display and persistence of descriptions.

**Not broadly tested:** ROG Ally, Windows, Android/DroidDeck, other PC handhelds, all CSS Loader themes, all Decky plugin combinations, or 200+ alias bulk recovery.

## Notes for existing users

- Back up your saved customizations first.
- When 1.1.8 is published, choose the actual installer ZIP, not a screenshots ZIP. Do not unzip it before using Decky's ZIP installer.
- Use **Full Library Manager → ⚙ Settings** to choose **Game Info**, **Artwork Footer**, or **Below Play** placement and to adjust appearance.
- The **Hide tile** action only affects what TitleDeck shows; it does not remove Steam shortcuts.
- Historical 0.9.2 known-issue notices remain relevant to **0.9.2**, but do not describe the tested 1.1.8 candidate accurately.

## Community thanks

Thanks to **u/TacoOfGod** for helping inspire the original title-renaming idea and **u/All-Stars64** for requesting editable Game Info descriptions. Thanks to everyone who tested early builds and reported problems. Credits recognize feature inspiration and community feedback.

[Installation](INSTALL.md) · [Beginner's guide](BEGINNERS_GUIDE.md) · [Verified on Deck](VERIFIED_ON_DECK.md) · [Screenshots](SCREENSHOTS.md) · [Release checklist](RELEASE_CHECKLIST.md)
