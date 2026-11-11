# Install or update TitleDeck 1.4.0
[← Home](../README.md) · [Release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/1.4.0) · [Troubleshooting](../SUPPORT.md)

## New to Decky Loader?
TitleDeck runs **inside Decky Loader**. It is not a standalone Steam game or desktop app. If the **Decky Loader** entry does not appear in your Steam Deck's **••• Quick Access menu**, set up Decky Loader first:

1. On your Steam Deck, switch to **Desktop Mode** and follow the current [official Decky Loader installation instructions](https://github.com/SteamDeckHomebrew/decky-loader). Use the official project rather than an unrelated download site.
2. Return to **Gaming Mode**. Press **•••** to open Quick Access and confirm that Decky Loader is available.
3. Once Decky Loader is working, follow the TitleDeck ZIP steps below.

Decky Loader is third-party software. Its installation process and menus can change with SteamOS updates; use the upstream instructions if your screen differs.

## Before you begin
Use a Steam Deck running **Gaming Mode** with Decky Loader installed. Before updating TitleDeck, back up your existing local customizations if you have any. For a first install, no TitleDeck backup is needed.

1. Download **[TitleDeck-1.4.0.zip](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.4.0/TitleDeck-1.4.0.zip)** from the official release.
2. **Keep the ZIP intact.** Do not extract it.
3. **Make sure the ZIP is accessible on the Steam Deck.** If you downloaded it on another device, transfer it to your Deck first. The Downloads folder is an easy place to find it.
4. In **Gaming Mode**, open **••• Quick Access → Decky Loader → Settings (gear) → Developer → Install Plugin from ZIP**. This is Decky's settings menu, **not** Steam's general settings. Labels may vary by Decky version.
5. Select **`TitleDeck-1.4.0.zip`** and let Decky install it. Open the Decky plugin list, select **TitleDeck**, and check for version **1.4.0**.
6. Choose **Open Full Library Manager** to browse your games. [Follow the beginner guide](BEGINNER_GUIDE.md) for your first rename.

> [!CAUTION]
> Do **not** try to install `TitleDeck-1.4.0-Organized-Screenshots.zip` or GitHub's automatically generated source archives. Those are not Decky installer packages.

## Upgrading from 1.2.2
The editing and restoration functionality is preserved, with improved manager and typography UI. Your saved local settings should remain, but a backup is recommended. [What changed](UPDATE_FROM_1.2.2.md).

## Art Hero users
If CSS Loader's **Art Hero** is active, placement is managed there. TitleDeck's Above/Below controls become read-only; this is expected. Use **CSS Loader → Art Hero → Carousel Font Height** to adjust layout. Turn Art Hero off if you want TitleDeck to manage its own placement.

## If something doesn't look right
- **No Decky Loader menu?** Return to the [official Decky installation steps](https://github.com/SteamDeckHomebrew/decky-loader) and confirm it loads in Gaming Mode.
- **Can't find the ZIP?** Confirm that it is on the Steam Deck itself and hasn't been extracted. Make sure you selected the installer, not a screenshot or source archive.
- **Installed but can't see TitleDeck?** Reopen the Decky plugin menu. If it still doesn't appear, check [troubleshooting](../SUPPORT.md) and include your SteamOS and Decky versions when reporting the problem.

## Where to go next
[Illustrated gallery](SCREENSHOTS.md) · [Beginner guide](BEGINNER_GUIDE.md) · [Share your setup](FEEDBACK.md) · [Known limitations](COMPATIBILITY.md)
