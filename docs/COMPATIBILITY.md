# Compatibility and limitations

**Public version:** TitleDeck **0.9.2**. **Upcoming tested candidate:** **1.1.8**, installer not yet published.

| Environment | What has actually been verified |
| --- | --- |
| Valve Steam Deck in SteamOS Gaming Mode with Decky Loader | Primary hardware-testing target for title editing, Game Info customization, artwork, restoration, navigation |
| Steam Deck built-in LB/RB in Full Library Manager | Verified working in 1.1.6 and checked again in 1.1.8 |
| PS4 Bluetooth controller LB/RB | Verified paging in 1.1.6 and 1.1.8 |
| Steam and non-Steam description persistence after reboot | Confirmed by maintainer in 1.1.8 private candidate |
| Right stick inside TitleDeck's own Full Library Manager editor | Working in 1.1.8 hardware checklist |
| Right stick inside Steam's Game Info description box | **Known current failure in 1.1.8 for both game types** |
| Third-party CSS Loader themes or newer Steam client builds | May affect UI; not exhaustively tested |
| GTM and other Decky plugins concurrently | Not broadly certified |
| ROG Ally, Legion Go, Bazzite and other handhelds | Not confirmed; no compatibility guarantee |
| Windows, Steam Desktop Mode, Android / DroidDeck | Not validated as TitleDeck targets |

## Notes

- TitleDeck's overrides affect **local visible presentation** and do not permanently rewrite original Steam game records, sorting identity or installed files.
- The 0.9.2 published ZIP has a **separate, historical Game Info description reliability issue**. Improvements proven on private 1.1.8 must not be attributed to that older ZIP.
- Some games, demos and non-Steam shortcuts may lack usable artwork, even with the expanded 1.1.8 fallback system.
- Steam keyboard behavior may vary with client versions. If dismissing a keyboard leaves an editor in an unusual position, report the exact SteamOS/client version and steps.
- Bulk restore across hundreds of customizations and exhaustive CSS theme interoperability are not completely accepted on hardware.
- Steam updates can alter the internal Game Info DOM and require future compatibility patches.

[Verification log](VERIFIED_ON_DECK.md) · [Report bugs](../SUPPORT.md) · [Beginner guide](BEGINNER_GUIDE.md).
