# Installing TitleDeck on Steam Deck

**Download:** [TitleDeck v0.8.1 prerelease](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.8.1).

1. Install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader).
2. Download `TitleDeck-0.8.1-Editor-DPad-Fix.zip` from **Assets** on the GitHub prerelease.
3. Open the Decky developer installer and choose **Install Plugin from ZIP**.
4. In Gaming Mode, open **Quick Access → Decky → TitleDeck → Open full library manager**.
5. Select a game, edit the title and save. Verify the visible name in Steam.

**Do not install** `TitleDeck.Screenshots.zip`: it is only source material for the screenshot gallery.

## Backup and reverting
Custom names are stored separately from installed games. Before major updates, use TitleDeck Settings to make a manual backup. An update should preserve aliases; never clear Decky plugin settings as an upgrade step.

To undo one name, choose **Restore original** in its editor. To undo all, go to **Settings → Restore All**, review the list, and explicitly confirm. TitleDeck makes a recovery snapshot before clearing aliases. Recovery is allowed only when no conflicting newer aliases would be overwritten.

## Limitations
- Steam UI text replacement is display-only, not a metadata or game-file edit.
- Lettering baked into hero images and covers does not change.
- Some Steam locations and themes may not expose replaceable title labels.
- Restart persistence has been confirmed on-device. Steam background metadata refresh still requires a separate acceptance test.

[Support](../SUPPORT.md) · [Verified behavior](VERIFIED_ON_DECK.md).
