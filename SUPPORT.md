# Support & known issues

Questions and suggestions: [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions). Reproducible defects: [GitHub Issues](https://github.com/ValentineBSAA/TitleDeck/issues/new/choose).

> **Compatibility warning:** TitleDeck is developed and device-tested on a **physical Valve Steam Deck running SteamOS Gaming Mode with Decky Loader**. **ROG Ally, other handheld PCs, third-party SteamOS installations or derivatives, Windows, Android/DroidDeck, and Desktop Mode are not verified or officially supported.** The interface, Decky integration, controller focus, and Steam keyboard may behave differently or fail on those systems.

## Known 0.9.0 RC issue

**Keyboard-close animation may stick.** After opening the native Steam keyboard with Change Name, dismissing it with B **sometimes** leaves the input card in its raised position. This is a known intermittent behavior observed on a real Steam Deck. It is not considered fully resolved in the RC. Saving a title still requires the explicit Save Custom Title action.

## Frequently asked questions

**Why doesn't the logo on a game cover change?** TitleDeck modifies supported Steam UI text, not lettering embedded in the artwork.

**Does it change sorting or Steam's canonical name?** No. It maintains local display aliases without modifying game files or underlying sorting metadata.

**How do I undo?** Use Restore Original on one game, or Settings → Restore All with preview, confirmation and automatic recovery backup. Applying a cleanup suggestion alone does not save the name.

**Does it survive a restart?** The maintainer verified a Catherine alias survived an actual Steam Deck restart. This does *not* independently establish compatibility with every Steam metadata refresh.

**Will it work on my ROG Ally, Linux handheld, Windows, Android, or DroidDeck?** **No compatibility guarantee.** Those systems have not been verified or officially supported. TitleDeck is developed and tested for Valve Steam Deck / SteamOS Gaming Mode.

**Why release candidate?** The core workflow has physical device evidence, but the intermittent keyboard animation and wider Steam UI/theme compatibility remain open.

## Good bug reports

Include TitleDeck version, device model (Valve Steam Deck vs other), OS/SteamOS version, Decky version, Steam client branch, theme/CSS Loader info, exact controller sequence, and expected/actual results. Never publish credentials, Steam Guard codes or personal details.

[Installation](docs/INSTALL.md) · [Verification](docs/VERIFIED_ON_DECK.md) · [Compatibility](docs/COMPATIBILITY.md).
