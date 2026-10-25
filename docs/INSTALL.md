# Installing TitleDeck 0.9.0 RC1

**Target platform:** physical Valve Steam Deck running **SteamOS Gaming Mode** and Decky Loader. **ROG Ally, Legion Go, other non-Steam Deck SteamOS-like systems, Desktop Mode, Windows, Android and DroidDeck are untested and may not work correctly.** See [Compatibility](COMPATIBILITY.md).

## Download

The RC1 installer is **`TitleDeck-0.9.0-RC1-SteamDeck.zip`** under GitHub release tag **`0.9.0`** (internal version **`0.9.0-rc.1`**). See [Releases](https://github.com/ValentineBSAA/TitleDeck/releases). **The RC1 prerelease is published with its matching ZIP.** The previous 0.8.1 installer remains available.

## Install with Decky Loader

1. Install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader).
2. Download the TitleDeck 0.9.0 RC1 plugin ZIP from GitHub Releases.
3. In Decky's developer options, use **Install Plugin from ZIP** and choose that file.
4. In Gaming Mode open **Quick Access → Decky → TitleDeck → Open full library manager**.
5. Select a game. **Change Name** opens Steam's keyboard; only **Save Custom Title** saves a permanent alias.
6. **Suggest Cleanup** shows a before/after preview. Choose Apply or Keep, optionally Undo Cleanup, then select Save Custom Title to save.

Make a TitleDeck Settings backup before major upgrades. The installer is designed to preserve existing aliases and backup files. Do not clear Decky's plugin settings when upgrading.

## Undo names and recover

**Restore Original** removes a saved alias for one game (or resets an unsaved draft). **Settings → Restore All** requires a paginated review and deliberate confirmation and writes a recovery snapshot first. Recovery is guarded against newer changes.

## Native keyboard known issue

On a physical Steam Deck, pressing **B** sometimes closes Steam's keyboard but leaves the editing panel raised. If that happens, select **Done editing**. This is a **known intermittent RC1 issue**, not a confirmed fix.

Only displayed Steam text is modified. Steam sort identifiers and installed game files are never rewritten, and lettering inside cover artwork never changes.

[Device verification](VERIFIED_ON_DECK.md) · [Release notes](RELEASE_NOTES_0.9.0_RC1.md) · [Support](../SUPPORT.md)
