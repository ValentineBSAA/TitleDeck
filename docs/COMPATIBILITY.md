# Device and platform compatibility

## Tested target: Valve Steam Deck

**Compatibility warning:** TitleDeck is developed and device-tested on a **physical Valve Steam Deck running SteamOS Gaming Mode with Decky Loader**. **ROG Ally, other handheld PCs, third-party SteamOS installations or derivatives, Windows, Android/DroidDeck, and Desktop Mode are not verified or officially supported.** The interface, Decky integration, controller focus, and Steam keyboard may behave differently or fail on those systems.

Steam's Gaming Mode web interface, controller focus, keyboard overlay, and Decky integration are platform-dependent. Even two Valve Steam Decks can behave differently after SteamOS/Decky updates or with different CSS Loader themes. A device-tested feature is **not** a universal compatibility guarantee.

| Environment | Status |
| --- | --- |
| **Valve Steam Deck, SteamOS Gaming Mode** | **Maintainer-tested** for specified features (see [verification](VERIFIED_ON_DECK.md)); 0.9.0 RC build still requires first-install acceptance |
| Valve Steam Deck, Desktop Mode | Not in supported/tested scope |
| **ASUS ROG Ally**, other Windows handhelds | **Not tested and not officially supported**; keyboard, display hooks or Decky may fail |
| Non-Valve devices using SteamOS / forks / SteamOS-like distributions | **Not verified or supported**; behavior may differ |
| Windows Steam client / Windows desktop | Not tested as a supported target |
| Android or Windows through DroidDeck or similar wrappers | **Not a physical Steam Deck test**; user reports welcome but no compatibility claim |
| Custom CSS Loader themes | Some testing with a customized theme; broad theme compatibility not verified |

## Tested vs not tested

Maintainer-observed on a physical Steam Deck: in-game text aliases, Catherine rename/restore, restart persistence, four-button editor navigation, native keyboard opening, Sims 4 cleanup preview/apply/save, toast notifications.

Not established: survival of **every** Steam background metadata refresh, identical title replacement on **every** Steam UI location, all controller paths at every viewport, or dependable keyboard B-dismiss slide-down animation.

## What TitleDeck actually changes

TitleDeck stores local display aliases by Steam App ID and attempts to replace supported on-screen Steam text. It does **not** rename installed game files, Steam's canonical database/title, sorting order, or letters embedded in artwork.

## Reporting a compatibility issue

Please open a [bug report](https://github.com/ValentineBSAA/TitleDeck/issues/new/choose), including device model, OS/version, Decky version, Steam client branch, CSS Loader theme, TitleDeck version, and exact reproduction steps. Avoid sharing credentials or personal information.
