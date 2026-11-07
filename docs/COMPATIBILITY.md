# TitleDeck 1.4.0 compatibility
[← Home](../README.md) · [Support](../SUPPORT.md) · [Art Hero guide](ART_HERO_COMPATIBILITY.md)

**Primary platform:** Steam Deck, SteamOS Gaming Mode, Decky Loader. CSS Loader compatibility depends on the installed theme.

## What is actually tested
The maintainer reports extensive physical Steam Deck testing of the accessible 1.4.0 features. The provided 1.4.0 release/source packaging passed **79 JavaScript and five Python tests**, version/syntax checks, and exact installer/source parity. Checksums for the published installer and screenshot archive match the verified supplied files. This is a specific acceptance report, **not** a claim that every SteamOS, controller or third-party CSS theme has been tested.

## Art Hero
**Expected behavior:** detected placement appears as a read-only guide and its buttons cannot be pressed while Art Hero is enabled. CSS Loader is the appropriate place to adjust Carousel Font Height. With Art Hero disabled, TitleDeck's own placement is available.

## Open or deferred
- Built-in Steam Deck right-stick scrolling in Game Info descriptions: [#8](https://github.com/ValentineBSAA/TitleDeck/issues/8).
- Earlier Quick Access focus quirk: not claimed fully fixed.
- Custom font ZIP/TTF import: not available in 1.4.0.
- SteamOS, CSS Loader and Decky updates can affect positioning or input.

[Older 1.2.2 compatibility record](HISTORICAL_COMPATIBILITY_1.2.2.md) is preserved separately.
