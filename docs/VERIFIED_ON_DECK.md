# TitleDeck 0.9.0 RC1: Device verification

**Baseline: a real Steam Deck running SteamOS Gaming Mode.** This is a candid acceptance record; successful automated tests do not prove real-device functionality.

| Function | Status | Grounded observation |
| --- | --- | --- |
| Display alias and restore | **Verified on Deck** | Catherine Classic → Catherine; restoring returned Catherine Classic |
| Alias persistence after restart | **Verified on Deck** | Creator restarted Steam Deck and checked |
| Trademark/title cleanup | **Verified on Deck** | Need for Speed Most Wanted 2012 and later Sims 4 trademark example |
| Preview, Apply, then explicit Save | **Verified on Deck** | Sims 4 cleanup displayed original and suggested title, then needed separate Save |
| Shared game editor D-pad actions | **Verified on Deck** | Creator accepted editor four-direction controls |
| Native Steam keyboard opens | **Verified on Deck** | Opened directly through Change Name |
| Text visible above keyboard | **Verified on Deck** | Physical screenshots show visible input while keyboard opened |
| Animated notifications and improved highlights | **Verified on Deck** | Creator accepted during testing |
| Full library browser | **Observed on Deck** | Actual game grid used; not every focus edge/theme validated |
| Undo Cleanup and unaliased Restore Original | **Implemented, locally tested** | No separate physical Undo acceptance reported |
| Complete 200+ item Restore All review | **Automated only** | Simulated tests, not 200 physical aliases |
| Rapid title reapplication / metadata refresh persistence | **Automated/limited** | Steam background metadata refresh not independently verified |
| B keyboard close always animates back down | **Known intermittent failure** | Field sometimes stays raised; use Done editing |
| Recovery backup edge cases | **Automated only / partially observed** | Restore All worked on Deck; exhaustive recovery behavior not confirmed |
| Native Steam cover-title badges | **Removed** | Unreliable experiment |
| ROG Ally / non-Deck SteamOS-like handhelds / Windows / Android | **Not tested** | No compatibility claim |

**Safety:** TitleDeck saves aliases separately, never edits game installation or Steam metadata files, and requires explicit Save. Restore All uses confirmation and an automatic recovery snapshot.

This RC remains a prerelease until keyboard dismissal reliability, client-refresh behavior and broader physical-device testing improve.

[Platform compatibility](COMPATIBILITY.md) · [RC1 notes](RELEASE_NOTES_0.9.0_RC1.md)
