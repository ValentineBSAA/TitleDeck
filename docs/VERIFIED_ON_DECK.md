# TitleDeck 0.8.1: verified behavior

This table distinguishes on-device observations from automated checks.

| Feature | Status | Evidence |
| --- | --- | --- |
| Custom game name | Verified on Deck | Catherine Classic visibly renamed to Catherine |
| Individual / all-title restoration | Verified on Deck | Catherine Classic visibly restored after Restore All |
| Name survives Steam Deck restart | Verified on Deck | Creator tested restart successfully |
| Shared editor Up/Down/Left/Right | Verified on Deck | Creator confirmed the 0.8.1 change works for game editors |
| Timed notices and highlight styling | Verified on Deck | Creator accepted both after 0.6.0 |
| Full-library card navigation at every edge | Still validating | Past issues and local simulation; more device acceptance needed |
| Background metadata-refresh persistence | Not independently verified | A restart is not the same as Steam refreshing metadata |
| 200+ title Restore All review | Automated tests only | Device acceptance with large libraries still pending |
| Replacing text embedded in cover art | Not supported | Existing image files stay unchanged |
| Experimental native Steam cover-name badges | Removed | Not an advertised feature |

## Device test checklist
1. Record SteamOS, Decky, TitleDeck and CSS Loader/theme versions.
2. Save an alias and inspect its visible text in Steam.
3. Restart Steam Deck, reopen the library and verify persistence.
4. Test a **background metadata refresh** separately if available.
5. Restore an individual name; review/cancel/confirm a Restore All operation.
6. Navigate game cards and editor actions with all four D-pad directions.
7. Verify backup and recovery, including conflict protection.
8. For 200+ aliases, inspect the beginning, middle and end of the review.

### Automated suite
The release archive carries `tests/frontend.test.cjs` and `tests/test_backend.py`. The 0.8.1 suite passed **14 frontend and 11 backend checks** locally. This is not a substitute for testing in SteamOS.

Last reviewed 2026-10-24.
