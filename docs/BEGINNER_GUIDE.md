# TitleDeck: the complete beginner's guide (public stable 1.1.8; 1.2.1 beta workflows)

New to Steam Deck customization? Start here. This guide includes **every main feature and Settings section**, with links to real Steam Deck screenshots. TitleDeck is a Decky Loader plugin for Gaming Mode, not a replacement for Steam or a game mod.

[← Home](../README.md) · [Image gallery](SCREENSHOTS.md) · [Feature reference](FEATURES.md) · [Latest release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8)

## New in 1.2.1 Beta: edit the highlighted game without opening the catalog

1. Highlight the game you want to edit in Steam's library.
2. Press the **Options (☰)** controller button to open the game's native context menu.
3. Select **Edit with TitleDeck**. TitleDeck should open **that game's editor directly**, without an intermediate all-games artwork grid.
4. Edit and save the game's custom name or description using the normal TitleDeck controls.
5. **Tap B / Circle** to go Back. **Hold B / Circle for 650 ms** to leave the context-launched editor and return directly to Steam. The 650 ms duration is a **new beta adjustment requiring final physical Deck verification**. This shortcut does *not* change Back behavior when TitleDeck is opened normally.

### Choosing where the context-menu shortcut appears

In **Full Library Manager → ⚙ Settings → Game Options menu placement**, select **After Developer** (default) or **Before Properties**. On some non-Steam games, Properties is nested under Manage rather than displayed as a top-level action; TitleDeck then appears at the end of the main actions (before Cancel, when present) rather than incorrectly before Launch Options. The setting does not reorder GTM, SteamGridDB or other plugins.

### STEAM-button menu aliases (1.2.0 feature preserved in 1.2.1)

In Full Library Manager → Settings, turn **STEAM-button menu titles** ON to show a saved custom name for the *running* game in the physical STEAM-button menu. Turn it OFF to restore the original displayed game name there. The maintainer verified Catherine Classic → Catherine (including reboot persistence) and a non-Steam Most Wanted custom alias. The right-side **artwork/logo remains original**, because the name setting only changes text.

These additions are documented for **1.2.1 Beta**, not a published stable GitHub installer. [Beta release notes](RELEASE_NOTES_1.2.1_BETA.md).

## 1. What you need

- A **Valve Steam Deck**, in **SteamOS Gaming Mode**, with **Decky Loader** installed.
- The **1.1.8 plugin ZIP** from [GitHub Releases](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8).
- A game, app, demo or non-Steam shortcut already added to your Steam library.

No coding, terminal, game-file editing, or external keyboard is necessary.

## 2. Install or update TitleDeck

1. In Gaming Mode, open the [TitleDeck 1.1.8 release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.1.8).
2. Download **`TitleDeck-1.1.8.zip`**. **Do not unzip it.** An image archive, if available, is *not* a plugin installer.
3. Press the **•••** button to open **Quick Access**. Select the **Decky Loader plug icon**.
4. Open **Decky Loader Settings (gear) → Developer → Install Plugin from ZIP** and choose the downloaded ZIP. If this option isn't present, consult your installed Decky Loader version's instructions.
5. Open **Quick Access → Decky Loader → TitleDeck** and check the version badge.
6. Select **Open Full Library Manager**.

![TitleDeck Quick Access panel](screenshots/v1.1.8/01-quick-access.jpeg)

**Updating an older TitleDeck?** Create a backup first from **Full Library Manager → ⚙ Settings → Save a backup**, then install the newer ZIP.

## 3. Explore Full Library Manager

![Library overview](screenshots/v1.1.8/02-full-library-manager.jpeg)

Across the top, choose **All games**, **Installed** or **Renamed**. The next row offers **Search library**, **App ID**, **↻ Refresh**, **⚙ Settings**, and **◀ LB / RB ▶** page buttons.

Games appear as artwork cards with installed indicators when applicable. Some apps may show a letter placeholder if no suitable art is available. If an artwork cache is slow to load, use **Refresh**. Don't confuse a missing cover with a missing game.

**Controller:** use the **D-pad** to select, **A** to open, **B** to go back, and **LB/RB** to switch pages. The Steam Deck built-in shoulder buttons and a PS4 Bluetooth controller were physically tested with 1.1.8. The on-screen buttons are an alternative.

## 4. Rename a game safely

![Rename game editor](screenshots/v1.1.8/05-rename-game-actions.jpeg)

1. Open the selected game in Full Library Manager.
2. Choose **Change name** and edit with the **Steam on-screen keyboard**.
3. Optionally select **Suggest cleanup** to preview a title-formatting suggestion.
4. Review or apply the suggestion before saving.
5. Select **Save custom title** to commit the change.

A suggestion is not saved until you choose Save. Steam's original identifiers and game files stay unchanged, and lettering baked into the game's cover doesn't change.

![Keyboard example](screenshots/v1.1.8/07-native-steam-keyboard.jpeg)

## 5. Add a custom description to a Steam game

**Example: Catherine Classic is a Steam game.**

1. Select **Catherine Classic** (or another Steam title) in Full Library Manager.
2. Open **Edit description** from its game editor.
3. Type your custom description with Steam's keyboard and **Save description**.
4. On Steam's regular page for that game, select **Game Info** beside Community.
5. You should now see your local description rather than the usual Steam-provided description, if **Game Info** placement is selected in Settings.

![Catherine Classic Steam Game Info custom text](screenshots/v1.1.8/10-steam-catherine-custom-game-info.jpeg)

These are user-defined local descriptions; they do not replace Valve's canonical store copy. Saved description display and persistence **after restarting the Steam Deck** were verified for 1.1.8.

## 6. Add a custom description to a non-Steam shortcut

**Example: Need for Speed: Most Wanted (2005) is a non-Steam game in these screenshots.**

1. Add the game or shortcut to Steam if it is not already in your library.
2. Open its TitleDeck game editor and choose **Edit description**.
3. Enter your text and choose **Save description**.
4. Open the non-Steam shortcut's normal Steam **Game Info** page.
5. With Game Info placement, custom artwork appears to the **left** and the description to the **right**. Steam's separate **Steam Play / Proton** details remain underneath.

![NFS Most Wanted non-Steam Game Info custom text](screenshots/v1.1.8/13-nonsteam-most-wanted-custom-game-info.jpeg)

Restore Original Game can return the standard Steam non-Steam explanation and original artwork layout.

### Description length and scrolling

There is **no old yellow advisory character threshold** or enforced advisory cap. Long content still depends on Steam's current layout. **Known 1.1.8 issue:** the Steam Deck's **built-in right stick does not scroll** text in Steam or non-Steam Game Info description areas; an **external controller's right stick works** for both. Use touch/scrollbar where available. Saved descriptions and restart persistence are separate, working features. [Tracked issue](https://github.com/ValentineBSAA/TitleDeck/issues/8).

## 7. Where to find TitleDeck Settings

Inside Full Library Manager, go to the top row and choose **⚙ Settings** (near Refresh). Settings are **inside TitleDeck's manager**, not the SteamOS system Settings menu.

![Settings layout](screenshots/v1.1.8/15-settings-title-replacements.jpeg)

Below is a walkthrough of **every Settings section** from the 1.1.8 version.

### 7.1 Display title replacement

**Pause replacements** temporarily suspends custom displayed titles without deleting saved names; **Enable replacements** turns them on again. This is useful to compare the Steam default display with your saved aliases.

### 7.2 Save a backup

Use **Create backup** to save a separate local copy of your current custom titles. Do this before a large rename session or an upgrade.

### 7.3 Restore a saved backup

If a manual backup exists, **Restore saved backup** loads that saved set of titles. It **replaces current aliases**, so read the confirmation rather than using it as a casual Undo button.

![Backup settings](screenshots/v1.1.8/16-settings-backup-restore.jpeg)

### 7.4 Recover after Restore All

If you have used **Restore All**, TitleDeck creates a recovery backup before clearing aliases. **Recover names** can restore that set under the conditions displayed in the panel, including the safeguard against later changes.

### 7.5 Hidden Full Library Manager entries

Selecting **Hide tile** in a game's editor hides that card **from TitleDeck's manager only**. It does **not** remove or disable the game/shortcut in Steam. To undo, open **Settings → Hidden Full Library Manager entries → Show all hidden tiles**.

![Recovery and hidden entries](screenshots/v1.1.8/17-settings-recovery-hidden-tiles.jpeg)

### 7.6 Custom game description location

Choose one of the three placements:

- **Show inside GAME INFO:** replace the visible description in the actual Game Info tab. Best if you want Steam/non-Steam custom text next to Community.
- **Show in Artwork Footer:** use a compact display in the artwork/footer area when Steam offers the layout anchor.
- **Show Below Play:** display custom text in a wider panel below Play.

Changing placement is a display choice. It does not delete your saved description.

![Description location Settings](screenshots/v1.1.8/18-settings-description-placement.jpeg)

### 7.7 Full manager color theme

**Accent: [name] • Change** cycles through available color themes for TitleDeck's manager. The default design is Wine Red. These colors are for **TitleDeck**, not the Steam store or your game artwork.

### 7.8 Right-stick Game Info scrolling toggle

The Settings panel shows **Right stick scrolling ON/OFF**. This is a control for intended Steam/non-Steam Game Info scrolling. **This option does not guarantee every input device works:** an external controller's right stick scrolls Steam and non-Steam Game Info descriptions, but the Steam Deck's **integrated right stick does not** in 1.1.8. This input-specific issue remains open.

![Right-stick option](screenshots/v1.1.8/20-settings-right-stick-toggle.jpeg)

### 7.9 Choose a color (presets)

Select from the color swatches and press **A** to apply. Use the D-pad to move between colors and B to return.

![Color presets](screenshots/v1.1.8/21-settings-color-presets.jpeg)

### 7.10 Custom accent: HEX and visual picker

Enter a six-digit HEX color such as **#8B1E3F**, or choose **Open visual color picker**. The picker offers hue, saturation/shade and fine RGB adjustment. Choose **Apply custom accent** when satisfied.

![HEX editor](screenshots/v1.1.8/22-settings-custom-hex.jpeg)

### 7.11 Restore every original Steam title

**Review Restore All…** is a deliberate bulk operation that removes saved **display-title overrides** after a separate confirmation step. TitleDeck creates a recovery backup first. Do not confuse this with restoring a *single game's description* or *hiding a tile*. Review the count before confirming.

![Restore All Settings](screenshots/v1.1.8/23-settings-restore-all.jpeg)

### Developer options

Diagnostics and development controls are **hidden by default** in the normal 1.1.8 public interface.

## 8. Restore only one game

In that game's editor, choose:

- **Restore original game** to clear the game's custom title and description and return its default presentation.
- **Restore Steam description** to clear the description only while retaining the custom display title, if one is saved.
- **Hide tile** to remove only the **manager card**, not the shortcut or saved game files.

Read the button labels carefully: **Restore All** under Settings is a different, bulk operation.

## 9. Search for a title or App ID

![Search TitleDeck](screenshots/v1.1.8/08-search-title-or-id.jpeg)

Open **Search library** and type a name, or choose **App ID** to locate an entry by its Steam identifier. Steam games and non-Steam shortcuts may use different styles of identifiers.

## 10. Common questions

**Will this change game files?** No. TitleDeck manages local display overrides.

**Can I remove a duplicate-looking ES-DE shortcut safely?** **Hide tile** keeps Steam shortcuts intact. It doesn't merge or delete entries; use Settings to show hidden cards again.

**What if the artwork is cropped or missing?** 1.1.8 uses improved local and Steam fallback sources with a soft filled background. Some games genuinely have no available cover and use a placeholder.

**What does the green badge mean?** The title is shown as installed by Steam/TitleDeck.

**Can I control the manager from the couch?** Yes, including built-in Deck LB/RB and tested PS4 Bluetooth controller paging.

**Does it work on ROG Ally, Android or Windows?** Not maintainer-verified. The tested environment is a physical Steam Deck in Gaming Mode.

**I found a bug.** See [SUPPORT.md](../SUPPORT.md) and [report an issue](https://github.com/ValentineBSAA/TitleDeck/issues). Include the affected game and whether the issue is in TitleDeck's editor, the manager, or Steam's Game Info tab.

[Full features](FEATURES.md) · [All 23 screenshots](SCREENSHOTS.md) · [Compatibility](COMPATIBILITY.md) · [Release notes](RELEASE_NOTES_1.1.8.md)
