# TitleDeck roadmap

**Current public milestone: 0.9.2 Beta 1**, available as a GitHub pre-release. The immediate goal is compatibility and reliability, not adding more experimental features.

## Accepted milestones

- [x] Editable Steam game display names with Restore Original and restart persistence.
- [x] Reviewed title cleanup with explicit Save, controller editing and native Steam keyboard.
- [x] Custom descriptions appear in Steam's real **Game Info** tab.
- [x] Rapid Community / Game Info switching on physical Deck without the previous 1–7-second description delay.
- [x] Full-game Restore Original clears title and description.
- [x] Non-blocking 1,247-character long-description warning, without a hard limit.
- [x] Cleaner game/app list excluding compatibility runtimes and improved cover handling.
- [x] Remove timing diagnostics from normal Quick Access.
- [x] Release v0.9.2 Beta 1 as a GitHub pre-release with updated beta screenshots.

## Still to verify / improve

- [ ] Verify GTM 3.6.9 playback and Decky Plugin Store coexistence with this exact beta.
- [ ] Fix intermittent native Steam keyboard B-dismissal leaving editor raised.
- [ ] Repeat cold-start artwork load tests and optimize visible loading if needed.
- [ ] Run bulk Restore All / backup recovery on 200+ real aliases.
- [ ] Test additional SteamOS versions, CSS Loader themes and uncommon games/non-Steam apps.
- [ ] Independently validate Steam background metadata refresh behavior, not just restarts.
- [ ] Align the repository's editable source/tests with the published beta runtime and document verified source parity. Until then, the beta ZIP is authoritative. See [Source status](../SOURCE.md).
- [ ] Collect community testing before deciding whether a 1.0 stable release is justified.

**Out of scope without new testing:** ROG Ally, Windows, Android/DroidDeck, Desktop Mode and unsupported SteamOS-like handheld configurations.

[Verification](VERIFIED_ON_DECK.md) · [Release notes](RELEASE_NOTES_0.9.2_BETA1.md).
