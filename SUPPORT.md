# TitleDeck 1.2.1: troubleshooting and support

**Current public version:** [TitleDeck 1.2.1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.2.1). Primary verified platform: Valve Steam Deck, SteamOS Gaming Mode with Decky Loader.

[Report a bug](https://github.com/ValentineBSAA/TitleDeck/issues) · [Community discussion](https://github.com/ValentineBSAA/TitleDeck/discussions) · [Illustrated beginner guide](docs/BEGINNER_GUIDE.md)

## TitleDeck 1.2.1 stable features

**How do I edit the game I am highlighting?** Select it in Steam's library, press the controller's **Options (☰)** button, and choose **Edit with TitleDeck**. The exact game's editor opens directly. This feature is included in the published **1.2.1 Stable** release.

**Can I move the TitleDeck Options entry?** Yes. **Full Library Manager → Settings → Game Options menu placement → After Developer** (default) or **Before Properties**. Some non-Steam games show Properties only inside Manage, so TitleDeck moves to the end of the main action list instead. TitleDeck does not rearrange GTM, SteamGridDB or other plugins.

**How do I exit without going Back twice?** Only when you launched from **Options → Edit with TitleDeck**, **hold B / PlayStation Circle for 650 milliseconds** to return to Steam. A normal tap performs one Back step. The 650 ms hold has passed the maintainer's physical Steam Deck test.

**Does the renamed title appear in the physical STEAM-button menu?** With **STEAM-button menu titles** turned ON in Full Library Manager Settings, yes on the tested Steam Catherine Classic and non-Steam Most Wanted games. Turning it OFF restores the original text. The logo on the menu's right side is artwork and stays unchanged.

**Does this mean everything is compatible?** No. Steam internals can change between updates. See the [beta hardware matrix](docs/VERIFIED_ON_DECK.md) and [1.2.1 release preparation](docs/RELEASE_NOTES_1.2.1.md).

## Frequently asked questions

**Where is Settings?** Open **Quick Access (•••) → Decky → TitleDeck → Open Full Library Manager → ⚙ Settings**. It is within TitleDeck, not SteamOS system Settings.

**How do I add a Steam description?** Select your Steam game in the manager, open its description editor, save your text, then open the regular Steam **Game Info** tab. [Catherine Classic example](docs/screenshots/v1.1.8/10-steam-catherine-custom-game-info.jpeg).

**What about non-Steam games?** The same editor works for local/non-Steam shortcuts. [Most Wanted 2005 example](docs/screenshots/v1.1.8/13-nonsteam-most-wanted-custom-game-info.jpeg). Saved descriptions were verified to persist after reboot.

**The Steam Deck's built-in right stick won't scroll custom Game Info text.** This is a **known 1.1.8 input-specific issue** on both Steam and non-Steam games. **An external controller's right stick works** for both types. The Settings toggle does not resolve built-in-input handling. [Issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8). Use touch scrolling where available.

**Why are there several different scrolling features?** The Steam **Game Info page**, TitleDeck's **game editor**, and TitleDeck's **Full Library Manager** have distinct scrolling handlers. Please tell us which one misbehaves.

**How do I flip through library pages?** Press **LB/RB** on the built-in Steam Deck or tested PS4 Bluetooth controller, or use the on-screen buttons.

**Why are some cover images missing or oddly proportioned?** Steam, custom grid images and the local cache provide possible art sources. TitleDeck falls back to placeholders where none are found. Some artworks use a blurred, filled tile backdrop behind a sharp uncropped cover.

**What is ES-DE (Program), and why is there a duplicate?** They can be separate Steam shortcuts, not a duplicated tile. Use **Hide tile** on the unwanted entry if you want to hide it **within TitleDeck**; it will not delete anything from Steam. Open **Settings → Hidden Full Library Manager entries → Show all hidden tiles** to restore.

**What is the difference between Restore Original Game and Restore All?** **Restore Original Game** affects only one selected game's title/description. **Restore All** is a bulk, confirmation-protected reset of display-title overrides and creates recovery information. Create a manual backup before large changes.

**Does Suggest Cleanup save by itself?** No, review the suggestion, apply if you want, then choose **Save custom title**.

**Can I customize colors?** Yes, Settings has a theme cycling control, preset swatches, HEX field and a visual hue/saturation/RGB picker.

**Are my games or Steam metadata changed?** No, TitleDeck stores local display overrides and does not alter game files or Valve's canonical metadata.

**ROG Ally/Windows/Android?** Not verified by the maintainer. Steam Deck Gaming Mode is the tested target.

## Bug reports

Include the TitleDeck version, game/App ID, Steam versus non-Steam, whether the problem occurs in the editor or Steam's Game Info, SteamOS channel, Decky version, controller(s), theme, steps, and cropped screenshots. Never share Steam Guard codes, passwords, private paths or personal text in diagnostic reports.

[Hardware verification](docs/VERIFIED_ON_DECK.md) · [Compatibility](docs/COMPATIBILITY.md)
