## Next milestone: Native Steam game-page descriptions (development branch)

**In progress. Not released in 0.9.0 RC1.** Per-game description editing, local persistence and a route-plus-visible-App-ID-gated panel in the actual Steam library details view are implemented on [draft PR #3](https://github.com/ValentineBSAA/TitleDeck/pull/3).

- [x] Local per-game description editor, explicit save/restore, backup and migration
- [x] Native Steam game-page **custom panel** with app identity guards and cleanup
- [x] Automated tests for route mismatches, deletion, disabled state and malicious-looking text
- [ ] Physical Steam Deck native game-page rendering and keyboard acceptance
- [ ] Test against other Decky metadata plugins and Steam UI updates
- [ ] Determine if the user wants full Valve About text replacement in addition to the TitleDeck panel
- [ ] Publish a separately versioned beta after acceptance tests

[Development and scope details](DESCRIPTIONS_PREVIEW.md)

# TitleDeck roadmap

**Current milestone: 0.9.0 RC1, Steam Deck Gaming Mode.** Release scope is reliability of displayed-title aliases, not cross-platform expansion.

- [x] Rename Catherine Classic → Catherine and restore original on a real Steam Deck
- [x] Retain custom title through a real Steam Deck restart
- [x] Review The Sims 4 trademark cleanup before applying, then save separately
- [x] Native Steam keyboard opens and the title remains visible while typing
- [x] Verified editor four-direction D-pad navigation and improved focus highlights
- [x] Confirmed timed animated notices
- [x] Safe Restore All design, long paginated preview, recovery backup implementation
- [x] Remove unreliable Steam cover name badges
- [ ] **Fix intermittent B keyboard dismissal leaving editing panel raised**
- [ ] Verify survival after Steam background metadata refresh, separately from restart
- [ ] Perform 200+ alias confirmation review on real Steam Deck hardware
- [ ] Test additional Steam client/SteamOS versions, CSS Loader themes and library edge navigation
- [ ] Collect user-reported compatibility and decide when 1.0 stable is justified

**Out of scope for RC1:** ROG Ally, non-Steam Deck SteamOS-like handhelds, Desktop Mode, Windows, Android/DroidDeck. These are **untested and may not work correctly**. A separate platform effort and testing would be required.

[Verification](VERIFIED_ON_DECK.md) · [Compatibility](COMPATIBILITY.md)
