# Physical Steam Deck testing: 1.1.8 candidate

**Last maintainer report:** October 27, 2026. This file distinguishes tests on the actual Deck from automated tests and unresolved behavior. It does not certify every SteamOS installation.

| Feature | Evidence and current status |
| --- | --- |
| Rename a Steam title; save and restore | **Hardware verified** during the original RC testing |
| Title alias persists after reboot | **Hardware verified** during previous releases |
| Suggest Cleanup, Apply, explicit Save | **Hardware verified** with game-name cleanup |
| Steam **Game Info** custom description | **Hardware verified** in the 1.1.8 candidate after a Deck restart: displays and persists |
| Non-Steam **Game Info** custom description | **Hardware verified** in the 1.1.8 candidate after a Deck restart: displays and persists |
| Non-Steam side-by-side cover and description | **Hardware verified** in 1.1.1 screenshots |
| Ghost original artwork removal and Proton information | **Hardware verified** in 1.1.1 Game Info screenshots |
| Restore Original Game and original non-Steam layout | **Hardware verified** in 1.1.1 screenshots |
| Physical built-in Deck LB/RB | **Hardware verified** in 1.1.6 and passed 1.1.8 acceptance check |
| PS4 Bluetooth controller LB/RB | **Hardware verified** in 1.1.6 |
| Full Library Manager on-screen paging | **Hardware verified** |
| Right-stick scrolling in **Full Library Manager editor** | **Maintainer marked 1.1.8 five-item test passed**; retest separately from Game Info text scrolling |
| Right-stick scrolling in Steam/non-Steam **description boxes** | **NEWLY REPORTED BROKEN** after 1.1.8 candidate acceptance; don't advertise as working |
| Manager artwork fallbacks, filled cover presentation | **1.1.8 five-item hardware check passed**; some uncommon assets remain best-effort |
| Jurassic World Evolution 3 cover | **1.1.8 five-item hardware check passed** |
| Hide tile and manager reload | **Hardware verified** on 1.1.7 |
| Developer options absent from normal public UI | **1.1.8 five-item hardware check passed** |
| D-pad Settings / custom color picker | **Previously hardware verified** |
| TitleDeck settings survive every Steam update/theme | **Not comprehensively verified** |
| 200+ game bulk restore / GTM combination / other handhelds | **Not exhaustively tested** |

## Historical version warnings

The published **0.9.2** release has a documented Steam/non-Steam description reliability bug. That issue does not automatically describe the private 1.1.8 candidate, where display and persistence were retested on hardware. Issue #6 remains open until a corrected release is publicly available.

## Testing rules for contributors

- Don't present automated tests as proof of physical Steam Deck functionality.
- Don't convert a passed **manager right-stick** test into a claim about **Game Info description-box right-stick** behavior.
- Preserve known-good built-in Deck and PS4 LB/RB paths, original restoration, and Steam/non-Steam description persistence.
- Record exact version, game/App ID, UI screen, controller type, SteamOS channel and repeat steps for failures.

[Candidate release notes](RELEASE_NOTES_1.1.8.md) · [Compatibility](COMPATIBILITY.md) · [Support](../SUPPORT.md)
