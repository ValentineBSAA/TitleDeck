# Physical Steam Deck acceptance log

**Date:** October 27, 2026. **Target:** actual Valve Steam Deck running SteamOS Gaming Mode and Decky Loader, with user-reported tests and camera photos. This is not a universal hardware certification.

> [!IMPORTANT]
> **1.1.8 is a physically tested release candidate, not yet a published GitHub download.** The newest public release is still 0.9.2. Current 1.1.8 hardware findings supersede earlier 0.9.2 claims **for the candidate only**. Do not silently apply newer findings to the older ZIP.

| Feature / scenario | 1.1.8 evidence | Remaining limit |
| --- | --- | --- |
| Steam Game Info custom description displays | **PASS, hardware confirmed after full Deck reboot** | Game Info right-stick scrolling now reported not functioning |
| Non-Steam Game Info custom description displays | **PASS, hardware confirmed after full Deck reboot** | Same Game Info right-stick scrolling issue |
| Non-Steam cover to the left of custom text | **PASS, hardware screenshot on 1.1.1**; working renderer retained | Different themes / games may lay out differently |
| Ghost artwork removed, Proton line preserved | **PASS, user screenshot on 1.1.1** | Steam UI updates may change internals |
| Restore Original Game returns original non-Steam text and layout | **PASS, user screenshot on 1.1.1** | Reconfirm after future Steam updates |
| Title alias, cleanup review, restoration | **PASS, earlier hardware checks** | Not every special-character title tested |
| Steam Deck built-in LB / RB pages Full Library Manager | **PASS on 1.1.6; 1.1.8 final checklist completed** | Physical result, not a guarantee for every Steam channel |
| PS4 Bluetooth LB / RB pages Full Library Manager | **PASS on 1.1.6; 1.1.8 checklist completed** | Other external controllers unverified |
| On-screen LB / RB paging | **PASS** | No known issue from current check |
| Right stick scrolls TitleDeck Full Library Manager editor/settings content | **PASS in 1.1.8 checklist** | **Not** proof of Steam Game Info description scrolling |
| Missing library art / sizing / new sources | **PASS for maintainer's five-item 1.1.8 checklist** | Some apps or non-Steam shortcuts may still lack art |
| Jurassic World Evolution 3 art | **PASS as part of maintainer's 1.1.8 checklist** | Different artwork caches may vary |
| Hide unwanted library tile | **PASS: ES-DE (Program) hidden and library reloaded** | Not a deletion or deduplication of Steam entries |
| Developer diagnostics hidden from public UI | **PASS in 1.1.8 checklist** | Diagnostic opt-in remains for developer use |
| Settings D-pad, custom RGB picker, installed badges | **PASS on earlier physically tested builds** | Theme combinations not exhaustively tested |
| Steam client / non-Steam description restart persistence | **PASS on 1.1.8** | Ongoing Steam UI compatibility to monitor |
| Very large Restore All with 200+ items | **Not exhaustively hardware accepted** | Safeguards exist but large-scale test incomplete |
| Every CSS Loader theme / GTM interaction / alternative device | **Not accepted as universally compatible** | Report specific combinations |
| Right-stick scroll in Steam/non-Steam **Game Info** text | **KNOWN ISSUE, currently fails on user test** | Open for follow-up; do not claim fixed |

### Hardware-history highlights
- **0.9.0 RC1:** title rename, native keyboard, cleanup review, save and restore.
- **0.9.2:** descriptions introduced, but later reported unreliable in the published release.
- **0.9.14:** Steam and non-Steam Game Info description persistence confirmed in earlier private tests.
- **1.1.1:** side-by-side custom art/text, ghost artwork cleanup, Proton information, and original restoration shown in hardware screenshots.
- **1.1.6:** built-in Steam Deck LB/RB finally confirmed, alongside PS4 controller LB/RB.
- **1.1.7:** image-source fallback and reversible Hide tile added.
- **1.1.8:** expanded artwork presentation, manager right-stick scrolling, hidden diagnostics, 5/5 requested feature checks, and successful post-reboot description checks. **New Game Info right-stick scroll issue reported after those checks.**

Automated regression results are useful but are not substitutes for the hardware outcomes above. [Release notes](RELEASE_NOTES_1.1.8.md) · [Compatibility](COMPATIBILITY.md).
