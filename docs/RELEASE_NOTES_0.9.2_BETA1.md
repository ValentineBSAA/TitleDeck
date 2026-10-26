# TitleDeck v0.9.2 Beta 1: Release notes

**Published pre-release:** [0.9.2-beta.1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2-beta.1)  
**Install ZIP:** `TitleDeck-0.9.2-Beta1-Decky.zip`  
**Intended device:** Valve Steam Deck, SteamOS Gaming Mode, Decky Loader  
**Not a final stable release.**

## What changed

### Custom Steam Game Info descriptions

You can edit and save a locally displayed description for each game or application. In the default placement, the custom text appears **inside Steam's Game Info tab next to Community**, with native-looking typography rather than an extra TitleDeck card. Other placement options remain available.

On the maintainer's physical Steam Deck, Preview 23/24's updated renderer eliminated the observed 1–7-second delay during rapid tab switching. A screenshot of the beta version badge also confirms the published version is being shown in Quick Access.

**Restore Original Game** resets a game's displayed title and description together. **Restore Steam Description** resets only the description, preserving a chosen title alias. Both operations restore presentation without rewriting Steam's original game metadata.

There is **no hard custom-description character limit**. A yellow **non-blocking** warning starts at 1,247 characters because long text may scroll, wrap or behave strangely in Steam Game Info.

### Library manager and polish

- Filter Proton versions, Steam Linux Runtime, anti-cheat support runtimes and redistributables out of the games/apps browser.
- Remember successfully loaded artwork sources across restarts; show fallback artwork where necessary.
- Preserve native Steam keyboard editing, reviewed title-cleanup suggestions, explicit saving, backups and recovery.
- Hide the development-only Game Info timing button from Quick Access during normal use.
- Reduce unnecessary full-interface checks when showing custom descriptions.

## Credits

Thank you to **u/TacoOfGod** for the original display-name customization inspiration, and to **u/All-Stars64** for specifically requesting description edits in the actual **Game Info** tab alongside Community. The maintainer's *Catherine Classic* stress-test screenshots acknowledge this request. These are acknowledgments of feature suggestions, not assertions of code contributions.

## Verified on physical Steam Deck

- Game title renaming/restoring and restart persistence from earlier accepted TitleDeck releases.
- Custom description displayed in Catherine's Steam Game Info.
- Rapid Game Info / Community switching after Preview 23, without the prior extended blank loading state.
- Restore Original Game returning the game to its original title and description.
- Long custom description input beyond 1,247 characters showing the yellow warning while remaining savable.
- Full Manager filtering and largely correct artwork with fallback; a cold-start delay can still occur.
- 0.9.2 Beta 1 version label visible in the latest Quick Access screenshot.

The developer reported **124 automated tests passed** on the final beta build (107 JavaScript and 17 Python). Automated tests are not a substitute for testing every device, Steam client revision or plugin combination.

## Known limitations and still-open acceptance

- GTM 3.6.9 co-installation and playback, particularly in the Decky Plugin Store, need final hardware verification; do not claim full compatibility.
- Steam keyboard B-dismissal sometimes leaves the editor raised; **Done editing** is the workaround.
- Long text may create excessive scrolling. 1,247 is an advisory, **not** a strict character cap.
- Artwork can briefly load after a cold restart, and some games/apps have only fallback imagery.
- Full bulk restore at hundreds of entries and every recovery edge case are not fully device-accepted.
- ROG Ally, other handhelds, Windows, Android/DroidDeck, Desktop Mode and most CSS Loader themes are **unverified**.

## Installation

Download the **plugin ZIP** from the pre-release assets, back up TitleDeck settings, then use **Decky Loader → Settings → Developer → Install Plugin from ZIP** without unzipping. The screenshots ZIP is a gallery, **not** an installer.

[Installation guide](INSTALL.md) · [Beta acceptance details](VERIFIED_ON_DECK.md) · [Screenshots](SCREENSHOTS.md) · [Issues](https://github.com/ValentineBSAA/TitleDeck/issues).

**Source provenance:** The currently checked-in editable source tree still matches the historical RC1 baseline; the beta release ZIP is the authoritative distributable runtime. [Read source status](../SOURCE.md).
