# TitleDeck 0.9.2: Physical device verification (beta-era evidence)

> [!WARNING]
> **October 27, 2026 testing correction:** Custom descriptions inside Steam's Game Info tab are **not currently verified working** for either **Steam games** or **non-Steam games/apps**, including on **0.9.2 Stable and 0.9.2 Beta 1**. The accepted Preview 23/24 description and switching checks documented below were valid historical observations but have been **superseded by later reports of failures**. No corrected release has been verified. [Known bug #6](https://github.com/ValentineBSAA/TitleDeck/issues/6).

**Reference platform:** real Valve Steam Deck, SteamOS Gaming Mode, Decky Loader. Evidence is separated between **accepted hardware tests**, **screenshots**, and **automated-only** results.

| Feature | Status | Evidence / limitation |
| --- | --- | --- |
| Catherine Classic title alias and Restore Original | **Hardware accepted** | Renamed Catherine Classic → Catherine, then returned to original in earlier testing |
| Title alias survives restart | **Hardware accepted** | Steam Deck restart test from earlier release |
| The Sims 4 / Sims 4 cleanup review, Apply, explicit Save | **Hardware accepted** | Earlier RC1 device testing |
| Steam keyboard and controller D-pad editor | **Hardware accepted (basic)** | Opened keyboard, used editor and controller directions |
| Game Info custom description | **REGRESSED / NOT CURRENTLY ACCEPTED** | Historical Catherine screenshots and tests; newer Steam and non-Steam Game Info failures reported |
| Rapid Community ↔ Game Info switching | **REGRESSION REPORTED** | Earlier Preview 23 acceptance is historical; latest description/Game Info display behavior needs renewed hardware verification |
| Restore Original Game clears title and description | **Hardware accepted** | Explicit confirmation after Preview 19 onward |
| Over-1,247-character description warning | **Hardware accepted** | Yellow warning visible at 1,409 characters, non-blocking |
| Long custom text displayed in native Game Info | **Hardware observed** | 0.9.2 gallery includes upper and lower long-description segments |
| 0.9.2 beta version visible in Quick Access (historical capture) | **Hardware screenshot** | New screenshot shows v0.9.2-beta.1 with three aliases and two descriptions |
| Game/app filtering, hiding Steam runtimes | **Hardware reported working** | Proton and anti-cheat components no longer shown |
| Full Manager artwork fallbacks | **Hardware reported mostly working** | Some missing art falls back; after restart artwork can load a few seconds later |
| Bulk Restore All for 200+ aliases | **Not fully hardware tested** | Long paginated review and recovery have test coverage, not exhaustive hardware acceptance |
| GTM 3.6.9 playback and Plugin Store coexistence | **Unresolved / not fully verified** | Earlier intermittent music interruptions; plugin-isolation improvements are not proof |
| B-dismissal returns raised keyboard field | **Known intermittent problem** | Steam can close keyboard while editor stays raised; use Done editing |
| All themes / Steam versions / other handhelds | **Unverified** | No broad compatibility promise |

**Build/test distinction:** The 0.9.2 beta installer was reported as passing 107 JS and 17 Python automated tests. The screenshot shows its version badge on a physical Deck. The new stable ZIP has not been independently hardware-accepted in these records. Those facts do **not** constitute an exhaustive fresh-install, every-game, every-plugin or long-running stability test.

The user-reported accepted **Game Info rendering behavior** applies to the shared working renderer carried from Preview 23 into Preview 24 and the beta installer; do not generalize beyond the actual tests.

TitleDeck stores overrides separately; it does not alter installed game files or canonical Steam metadata. Its long-description warning is advisory rather than enforced.

[Beta release notes](RELEASE_NOTES_0.9.2.md) · [Compatibility](COMPATIBILITY.md) · [Issues](https://github.com/ValentineBSAA/TitleDeck/issues).
