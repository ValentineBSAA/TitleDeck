# Install or update TitleDeck

> **As of October 27, 2026:** Public stable download: **0.9.2**. **1.1.8 is an upcoming tested candidate**, not yet a GitHub release. The 0.9.2 build has a known Game Info description regression. If you need the newly verified Steam and non-Steam description behavior, wait for the 1.1.8 installer to be published.

**Supported hardware evidence:** Valve Steam Deck running SteamOS Gaming Mode with Decky Loader. [Compatibility details](COMPATIBILITY.md).

## New installation

1. Install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) using its official instructions, if needed.
2. From [TitleDeck GitHub Releases](https://github.com/ValentineBSAA/TitleDeck/releases), download the desired version's **`TitleDeck-<version>.zip` plugin installer**.
3. Do **not** unpack or repackage that ZIP.
4. On the Steam Deck, enter **Gaming Mode**, press **••• (Quick Access)** and open the **Decky Loader** tab.
5. Open **Decky Loader Settings → Developer → Install Plugin from ZIP** and choose the downloaded installer.
6. Return to **Quick Access → Decky → TitleDeck → Open Full Library Manager**.
7. Use **Full Library Manager → Settings** for TitleDeck's own preferences.

**The Developer menu in step 5 belongs to Decky Loader** and is for installing a ZIP. TitleDeck's diagnostic controls are a different, normally hidden feature.

## Upgrade from an older version

1. Save a backup of your existing TitleDeck customizations, where supported.
2. Install the newer ZIP through Decky Loader as above.
3. Check that the version badge identifies your installed version.
4. Open Full Library Manager and test physical LB/RB, a saved game name, a Steam and non-Steam Game Info description, and Restore Original.
5. Let Steam populate the artwork cache after a cold restart; not every application has public cover art.

**1.1.8 final release files are pending.** Do not mistake screenshot archives or old 0.9.x installers for the newer plugin.

## First-time customization

1. Open TitleDeck's **Full Library Manager**.
2. Select a game. **Change Name → Steam keyboard → Save Custom Title** changes its local displayed name.
3. Open the description editor and save custom text.
4. Visit the game page in Steam and choose **Game Info** (beside Community).
5. If you wish, use **Restore Steam Description** or **Restore Original Game**.

**Known pending issue:** right-stick scrolling of the Steam **Game Info description box** is reported not working in 1.1.8 for both Steam and non-Steam entries. Right-stick scrolling inside TitleDeck's own Full Library Manager editor is a different, hardware-tested feature.

**Detailed illustrated walkthrough:** [Beginner guide](BEGINNER_GUIDE.md) · [Features](FEATURES.md) · [Help](../SUPPORT.md).
