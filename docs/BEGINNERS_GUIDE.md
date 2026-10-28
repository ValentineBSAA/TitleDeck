# TitleDeck: beginner's guide

New to Decky Loader or Steam Deck plugins? This guide starts from the beginning. You do not need to edit game files.

> **Release status:** 1.1.8 is a tested candidate awaiting its public installer and new gallery screenshots. The published 0.9.2 installer has a known Game Info description issue. Read the [README](../README.md) before installing an older version.

## 1. Before you start

You need a **Steam Deck running SteamOS Gaming Mode** and **Decky Loader installed**. TitleDeck is a Decky plugin, not a game. Start in Gaming Mode, not Desktop Mode.

The **Quick Access Menu** opens with the Deck's **•••** button on the right side. Select the **plug icon** (Decky Loader), then select **TitleDeck**. The interface also supports a touchscreen.

## 2. Install or update

1. Open the [GitHub Releases page](https://github.com/ValentineBSAA/TitleDeck/releases) from your Deck.
2. Choose the intended **plugin installer** named `TitleDeck-<version>.zip`. The screenshots ZIP is *not* an installer.
3. Download the ZIP and **leave it zipped**.
4. Open **Quick Access → Decky Loader → its Settings (gear) → Developer**.
5. Choose **Install Plugin from ZIP**, select your downloaded installer, and follow the prompts. The exact Decky wording may vary with version.
6. Return to **Quick Access → Decky Loader → TitleDeck** and check its version badge.

If you don't see the ZIP installation option, check your Decky Loader version and its developer settings. If TitleDeck already holds saved customizations, create a backup first.

## 3. Open Full Library Manager

1. Press **•••** and select the **Decky** plug icon.
2. Select **TitleDeck**, then **Open Full Library Manager**.
3. Browse game cards. Use **All games**, **Installed**, and **Renamed** across the top. Search narrows the library. Your card artwork may load after the library opens.
4. Select a game with **A** or tap it.

**LB/RB** changes library pages. This behavior has been tested on the Deck's built-in shoulder buttons and a PS4 Bluetooth controller. The **on-screen ◀ LB / RB ▶** buttons are an alternative.

## 4. Change a game's displayed name

1. Select the game card and choose **Change Name**.
2. Type the name using the Steam keyboard.
3. Optionally choose **Suggest Cleanup** to preview tidier capitalization or symbols. Review the suggestion before applying it.
4. Choose **Save Custom Title**. Opening the keyboard or applying a suggestion alone does **not** save the change.
5. Return to Steam's library and check the updated displayed name.

Example: make a long game title shorter without modifying the game's files. The text printed into cover artwork will not change.

## 5. Add a custom description (Steam games)

1. Open Full Library Manager and select a **Steam game**, for example Catherine Classic.
2. Open the **custom description** editor and enter your text with Steam's keyboard.
3. Choose **Save description**. TitleDeck does not impose the old yellow character-count warnings; a count may still appear.
4. Open the same game's **Steam library page** and select **Game Info** (beside Community).
5. Check that your custom description appears. The selected placement in Settings determines where TitleDeck shows it.

**Important distinction:** descriptions **displaying and surviving a reboot** have been physically verified in the 1.1.8 candidate. A newly reported issue means **right-stick scrolling inside description boxes is not currently reliable**. Use the touchscreen/scrollbar when available. Don't confuse this with LB/RB library paging, which works.

## 6. Add a description to a non-Steam game

1. In the manager, select your non-Steam shortcut, such as an imported PC game.
2. Edit and **Save description**, just as you would for a Steam game.
3. Open the shortcut's **Game Info** page.
4. The tested side-by-side layout places its artwork on the left and your description on the right.
5. Steam's own Proton/Steam Play information remains below.

TitleDeck customizes the local presentation; it does not rewrite the executable or modify Proton.

## 7. Find Settings and choose where descriptions appear

You can reach TitleDeck settings in **two places**, depending on the screen:

- **Quick Access → Decky Loader → TitleDeck → Settings** (where shown).
- Inside **Full Library Manager**, select **⚙ Settings** in the controls near Search, App ID, and Refresh.

Within TitleDeck Settings, look for **Description placement** and choose:

- **Game Info:** put your custom description in Steam's actual Game Info tab. This is the usual choice.
- **Artwork Footer:** show it near the artwork/Play section when the necessary Steam layout anchor is available.
- **Below Play:** show the description in a wider panel beneath Play.

Your selection is a TitleDeck presentation preference, not a Steam metadata edit. Some locations may depend on Steam's current page structure.

## 8. Change the appearance

1. Open **Full Library Manager → ⚙ Settings**.
2. Locate **appearance / accent color** settings.
3. Select a preset or open the **custom color picker**.
4. Adjust the hue and shade (touchscreen or D-pad), and fine-tune RGB where available.
5. Apply the new color. The Wine Red theme and green Installed markers are part of the redesigned manager.

The D-pad works inside the color picker; use **B** or its visible controls to exit.

## 9. Hide an unwanted library card, without deleting a game

If Steam has both **ES-DE** and **ES-DE (Program)** and you only want to see one card in TitleDeck:

1. Open the unwanted card in Full Library Manager.
2. Select **Hide tile**.
3. The manager refreshes without that card.

**No Steam shortcut is deleted.** To undo it, open **Settings → Hidden Full Library Manager entries → Show all hidden tiles**. Hidden tiles are a TitleDeck-only visibility setting.

## 10. Restore a title or description

- **Restore Original Game:** return the selected game to its original displayed title **and** description.
- **Restore Steam Description:** remove only the custom description while keeping a renamed title, where available.
- **Backup and recovery:** use Settings before large-scale changes. Review confirmation screens before any bulk restore.

On non-Steam games, restoring the original description can bring back Steam's usual explanatory text and original artwork layout. This has been physically tested.

## Controller controls

| Input | Action |
| --- | --- |
| D-pad | Browse controls/cards |
| A | Select or activate |
| B | Back/close |
| LB / RB | Previous/next page in Full Library Manager |
| On-screen ◀ LB / RB ▶ | Alternative to shoulder buttons |
| Right stick | Designed for longer manager/editor content; **description-box scrolling is currently reported broken** |
| Touchscreen | Select cards, buttons, and scrollable text where supported |

### What if something doesn't work?

Try the on-screen buttons, verify the correct game and description placement, and read [Troubleshooting and Support](../SUPPORT.md). If the bug persists, report the exact **TitleDeck version**, game/App ID, whether it is Steam or non-Steam, SteamOS/Decky version, and steps to reproduce. Do not post account credentials, private paths, or unredacted diagnostics.

[Back to README](../README.md) · [Feature details](FEATURES.md) · [Compatibility](COMPATIBILITY.md)
