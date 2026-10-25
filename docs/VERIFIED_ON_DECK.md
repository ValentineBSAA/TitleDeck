# TitleDeck 0.9.0 RC: verification record

**Evidence labels:** **Device-tested** = the maintainer personally observed behavior on a physical Steam Deck. **Automated** = code tests/simulations, not a guarantee in SteamOS. **Unverified** = not sufficiently tested. **Known issue** = observed problem.

> **Compatibility warning:** TitleDeck is developed and device-tested on a **physical Valve Steam Deck running SteamOS Gaming Mode with Decky Loader**. **ROG Ally, other handheld PCs, third-party SteamOS installations or derivatives, Windows, Android/DroidDeck, and Desktop Mode are not verified or officially supported.** The interface, Decky integration, controller focus, and Steam keyboard may behave differently or fail on those systems.

| Feature | Evidence level | Details |
| --- | --- | --- |
| Custom display name | **Device-tested** | `Catherine Classic` visibly becomes `Catherine` |
| Rename survives Deck restart | **Device-tested** | Creator rebooted the physical Steam Deck; alias persisted |
| Restore original displayed name | **Device-tested** | Catherine returned to Catherine Classic after confirmed restore |
| Save requires explicit action | **Device-tested** | Sims 4 cleanup suggestion applied to draft, then saved using **Save Custom Title** |
| Trademark cleanup preview | **Device-tested** | The Sims 4 trademark suggestion showed current and suggested titles (suggestion highlighted green), and Apply worked |
| Shared editor D-pad movement | **Device-tested** | Previously broken four-button navigation reported working in 0.8.1; 0.8.12 Restore path accepted |
| Native Steam keyboard opens | **Device-tested** | Title editor opens the Steam keyboard directly in Gaming Mode |
| Keyboard dismissal + slide-back | **Known intermittent issue** | Pressing B sometimes leaves the editor raised after keyboard closes; sometimes returns correctly |
| Timed animated toasts/focus color | **Device-tested** | Maintainer accepted the toast and styling behavior |
| Full library browsing | **Partially device-tested** | Screenshots and navigation tested; exhaustive controller edge cases and different themes not proven |
| Restore All confirmation and list | **Partially device-tested** | Confirmations observed, some restores verified; 200+ aliases **automated only** |
| Backup/recovery and 201-title data path | **Automated** | Backend tests validate backups/reset/recovery, not all physical-Deck edge cases |
| Special characters Σ and Roman numerals | **Automated** | Cleanup tests preserve special characters; no comprehensive physical-input symbol test |
| Fast replacement while Steam re-renders | **Automated** | Mutation handling tested; no complete confirmation of every Steam UI change/refresh |
| Background Steam metadata refresh | **Unverified** | Restart is not equivalent to a background metadata refresh |
| All Steam views & CSS Loader themes | **Unverified** | Artwork lettering is not replaceable |
| ROG Ally / non-Deck SteamOS / Windows / Android | **Untested / unsupported** | No universal compatibility claim |
| 0.9.0 RC package on physical Deck | **Pending** | Version prepared from the accepted 0.8.12 baseline; not itself accepted yet |

## Real-device acceptance notes

- Device screenshots currently depict the earlier 0.8.1 interface, not the new RC.
- The 0.8.12 behavior was accepted by the maintainer after the real Sims 4 cleanup workflow.
- Do **not** turn these observations into a claim that all Steam refreshes or other handhelds are tested.

## Suggested RC test procedure

1. Install the RC on a Valve Steam Deck, note SteamOS/Decky versions and installed CSS Loader theme.
2. Check alias persistence, including a restart, and separately evaluate any Steam metadata refresh.
3. Review a Sims 4 cleanup suggestion and cancel it; then Apply and Save.
4. Test Restore Original and Restore All review without accepting a reset prematurely.
5. Open native keyboard from Change Name, then dismiss with B repeatedly and record whether the panel lowers.
6. Check controller Up/Down/Left/Right on top/middle/bottom game rows, editor, and Settings.
7. Test backups and recovery before public stable release.

[Compatibility details](COMPATIBILITY.md) · [0.9.0 RC notes](RELEASE_NOTES_0.9.0-RC.md)
