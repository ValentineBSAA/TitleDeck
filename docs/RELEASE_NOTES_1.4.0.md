# TitleDeck 1.4.0 Stable 🌸
**Released November 7, 2026.** [Download the tested installer](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.4.0/TitleDeck-1.4.0.zip) · [Release page](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.4.0) · [Screenshots](SCREENSHOTS.md)

### From a useful title editor to a polished library workshop
1.4.0 builds on 1.2.2 with a more refined **Full Library Manager**, improved game-art loading and focus behavior, a substantial **Typography Studio**, and clearer Steam Home compatibility controls. The basic idea remains simple: make your Steam Deck's library feel like *yours* without touching the actual game files.

### What changed since public 1.2.2
- **Full Library Manager:** artwork placeholders and transitions, Settings refinements, focus/scroll improvements and controller-oriented navigation.
- **Typography Studio:** 10 built-in font-style treatments, expanded presets and HEX/RGB color choices, hue and shade controls, optional text outlines, shadows, glow and high-contrast appearance.
- **Readability help:** light/dark illustrative previews and warnings that respect the exact color you select.
- **Steam Home:** more understandable Above Cards/Below Cards controls and saved offsets when TitleDeck controls layout.
- **Art Hero:** reads Carousel Font Height, shows a guide and makes Art Hero placement **intentionally read-only** when the theme is on.
- **Quick Access:** improved visual organization and developer branding, retaining the profile link added in 1.2.2.
- **Local data safety:** Steam/non-Steam title aliases, custom descriptions, backups, restoration and native editing shortcuts all remain.

[Before-and-after explanation](UPDATE_FROM_1.2.2.md) · [Full feature reference](FEATURES.md)

### A deliberate Art Hero limitation
Earlier 1.3.x builds experimented with updating CSS Loader's Art Hero settings. Reading could work, but cross-plugin writes did not reliably change the on-device position. Version 1.4.0 keeps Art Hero position **visible but not editable** in TitleDeck. For adjustments open CSS Loader → Art Hero → Carousel Font Height. When Art Hero is off, use TitleDeck's own placement controls.

### Verification
The maintainer reports personally testing the available 1.4.0 features on a physical Steam Deck, with this Art Hero limitation accepted. Independently run on the matching supplied source: **79 passing JavaScript and five Python tests**, version checks, syntax checks, package-integrity and 13-file installer/source parity. The published installer SHA-256 is:

`bf1b6108d0861246337915011fd1348ec51475dd042ae1d62c3226777266b588`

The GitHub-hosted screenshot ZIP was also checked against the uploaded organized archive. [Full verification record](RELEASE_CHECKLIST.md)

### Known limitations
- Art Hero settings must be changed in CSS Loader, not TitleDeck.
- [Issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8): built-in Deck right-stick scrolling in Game Info descriptions remains open.
- The previously observed Quick Access focus quirk is not marked fixed.
- Importing arbitrary custom ZIP/TTF fonts is not supported.
- Theme, SteamOS and controller combinations vary.

### Thank you ❤️
Thanks to the Steam Deck community for the ideas, real-world testing, bug reports, thoughtful suggestions, downloads and encouragement. From people who inspired the first title/description editing features to those who have tried the 1.4.0 builds, your feedback helped shape this project. Thank you as well to everyone simply enjoying the plugin.

TitleDeck is community-made, free, MIT licensed, and not affiliated with Valve.

**Your Titles. Your Deck!**
