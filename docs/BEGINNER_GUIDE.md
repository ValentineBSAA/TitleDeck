# TitleDeck: beginner's guide

This walkthrough is written for people who have never installed a Decky plugin or customized a Steam game page before.

> **Version note:** Most steps here describe the **upcoming 1.1.8 release candidate**. The latest public downloadable version is still **0.9.2**, whose Game Info description integration has a known bug. Wait for the actual 1.1.8 installer release to use all the features below. [Release status](../README.md).

## 1. Where is TitleDeck?

1. Enter **Gaming Mode** on your Steam Deck.
2. Press the **••• (Quick Access)** button on the right side of the Deck.
3. Select the **Decky Loader (plug)** tab.
4. Select **TitleDeck**.
5. Choose **Open Full Library Manager**.

You'll see **All games**, **Installed**, and **Renamed** filters; search, App ID, Refresh, Settings, LB and RB; and an artwork grid of your games and shortcuts.

**Nothing in TitleDeck requires modifying game installation folders.**

## 2. Install or update

If you haven't installed Decky Loader yet, use its official installation instructions first. Then download the TitleDeck installer ZIP from [GitHub Releases](https://github.com/ValentineBSAA/TitleDeck/releases). Do **not** extract the ZIP.

To install: **Quick Access (•••) → Decky Loader → Settings → Developer → Install Plugin from ZIP**, select `TitleDeck-VERSION.zip`, and follow Decky's prompts. **Developer** here is the *Decky install menu*, not TitleDeck's internal diagnostics. Back up existing TitleDeck settings before upgrading. See [INSTALL.md](INSTALL.md).

## 3. Rename a game

1. In **Full Library Manager**, find the game using the tile grid or **Search Library**.
2. Select the game to open its editor.
3. Select **Change Name**. The Steam keyboard should appear.
4. Enter the name you want, then dismiss the keyboard.
5. Select **Save Custom Title** to actually save it.

Optional: select **Suggest Cleanup** to inspect a cleaner title. Review the suggested change, apply it only if you like it, then **Save Custom Title**. A suggestion by itself does not save anything.

Your custom title is a local display override. It does not rename the game folder or rewrite Steam's game identifier.

## 4. Add your own description

1. Select a Steam game **or** non-Steam game/shortcut in Full Library Manager.
2. Find the **custom-description editor**. Use the D-pad or right stick to navigate the longer editor panel if needed.
3. Open the text field with **A**, enter text using the native Steam keyboard, and select the description's **Save** action.
4. Return to the game's main Steam library page.
5. Open **Game Info**, the tab next to **Community**. Your local description appears here instead of the usual displayed description.

**Steam games:** The custom text lives in Game Info and can be restored to Steam's original description.

**Non-Steam games:** TitleDeck can place artwork alongside your text. Steam's **Runs on this computer via Steam Play / Proton** line remains separate Steam information.

**Long descriptions:** 1.1.8 has no hard character cap and no obsolete yellow length-warning lines. **Known limitation:** The maintainer's latest on-device test reports that the **right stick does not scroll the Game Info description box** for Steam or non-Steam games. This is distinct from right-stick scrolling inside TitleDeck's editor, which passed the 1.1.8 test.

## 5. Finding Settings

There are two different Settings areas:

- **Decky Loader Settings** (inside the Quick Access Decky tab) is used for **installing a plugin ZIP** and Decky itself.
- **TitleDeck Settings** is the **Settings button within Full Library Manager**, next to Refresh.

Open **TitleDeck Settings** to find the plugin's appearance, description-placement, backup/recovery, and hidden-entry controls.

Depending on your saved preferences, description placement can include **Game Info**, **Artwork Footer**, or **Below Play**. The feature tested most extensively on real Steam Deck hardware is the **Game Info** placement beside Community.

### Change the colors

Open **Full Library Manager → Settings**. Use the available accent-color presets or **custom RGB color picker**. The picker supports visual hue/saturation adjustments as well as fine adjustment; use D-pad / A / B to navigate or leave it. Saved selections remain local to TitleDeck. Different CSS Loader themes may change the appearance.

### Hide a duplicate-looking shortcut

If your library contains two separate shortcuts, such as **ES-DE** and **ES-DE (Program)**, select the unwanted tile and choose **Hide tile**. This removes the entry **only from TitleDeck's Full Library Manager**. It does **not** uninstall, delete, merge, or alter either Steam shortcut.

To undo: **Full Library Manager → Settings → Hidden Full Library Manager entries → Show all hidden tiles**.

### Backup and restore

Back up customizations before a major upgrade or bulk reset. Use TitleDeck's backup/recovery controls in Settings. If you only want to undo one game's changes, use the options below rather than a bulk restore.

## 6. Restore one game safely

- **Restore Steam Description / Restore Original Description:** clears the selected game's custom description while keeping a custom title, where offered.
- **Restore Original Game:** resets **both** that game's custom name and description.
- **Show all hidden tiles:** only restores visibility inside Full Library Manager. It does not change titles, descriptions, or files.

For non-Steam games, restoring the original Game Info presentation should also return Steam's generic explanation and its original artwork layout.

## 7. Controller cheat sheet

| Input | What to do |
| --- | --- |
| D-pad | Move focus between tiles, buttons and settings |
| A | Open/confirm |
| B | Return/close |
| LB / RB | Move Full Library Manager backward/forward a page |
| Right stick | Scroll TitleDeck's own long editor and Settings areas |
| Touchscreen | Tap search, page and action buttons |
| Steam keyboard | Type the game name or description |

**LB/RB paging** was physically verified on the Deck itself and with a paired PS4 controller. On-screen paging buttons are another option.

## 8. Common questions

**Why is a game using initials instead of a cover?** TitleDeck searches Steam artwork, local cached artwork, and other fallbacks, but some games, demos and non-Steam shortcuts may still lack a usable image.

**Why do some covers look different?** The 1.1.8 library tiles can use a full-tile blurred backdrop and an uncropped foreground image, accommodating both tall and wide artwork.

**Will my descriptions survive a reboot?** The maintainer specifically verified custom Game Info descriptions for both Steam and non-Steam games after a full Steam Deck restart on the 1.1.8 candidate.

**Will TitleDeck work on other handhelds?** Only the actual Steam Deck Gaming Mode workflow has been verified here.

**The right stick doesn't scroll Game Info. Is that expected?** It is a **currently known issue in the 1.1.8 candidate** and is being tracked for resolution. The Full Library Manager's own editor scrolling is separate.

[Feature reference](FEATURES.md) · [Troubleshooting](../SUPPORT.md) · [Physical verification](VERIFIED_ON_DECK.md) · [Screenshots](SCREENSHOTS.md)
