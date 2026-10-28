# TitleDeck: support and troubleshooting

**Latest public release: 0.9.2.** **Upcoming hardware-tested release candidate: 1.1.8** (installer and screenshots pending).

[GitHub Issues](https://github.com/ValentineBSAA/TitleDeck/issues) · [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions) · [Beginner guide](docs/BEGINNER_GUIDE.md) · [Compatibility](docs/COMPATIBILITY.md)

## Frequently asked questions

**Where do I find TitleDeck?** In Steam Deck **Gaming Mode**, press **••• → Decky → TitleDeck → Open Full Library Manager**.

**Where is TitleDeck Settings?** Inside **Full Library Manager**, press the **Settings** button by Refresh. Decky Loader Settings is different; it controls plugin installation.

**Can I rename a game without changing Steam's game files?** Yes. TitleDeck saves a local displayed-name override. **Suggest Cleanup** prepares a draft; use **Save Custom Title** to commit.

**How do I set a description?** Select a Steam or non-Steam title in Full Library Manager, open its custom-description editor, save text, then open **Game Info** on the game's library page. The release candidate's descriptions survived reboot tests for both types.

**The right stick doesn't scroll my Steam Game Info description.** This is a **known issue in the 1.1.8 candidate**, for Steam and non-Steam Game Info text. Right-stick scrolling in TitleDeck's **own editor/settings screen** is a different feature and passed its 1.1.8 test. Please include SteamOS, Steam client channel, and reproduction steps if you report it.

**Why are there two ES-DE shortcuts?** Steam may have two separate shortcuts such as **ES-DE** and **ES-DE (Program)**. TitleDeck's **Hide tile** hides one only in Full Library Manager. It does not merge or delete Steam shortcuts. Unhide via **Settings → Hidden Full Library Manager entries → Show all hidden tiles**.

**Why is the cover showing initials?** Steam or the shortcut may not have artwork that TitleDeck can locate. Newer versions add Steam image variants, local cached art and fallback handling, but some entries may still need manually supplied artwork.

**How do I reverse my edits?** **Restore Steam Description** clears just your description. **Restore Original Game** clears both this title and description. Back up data before using bulk restore operations.

**Is there a character limit?** The 1.1.8 editor removed old warning thresholds and does not impose a hard limit. Earlier 0.9.2 screenshots and notes refer to a historical 1,247-character advisory.

**Are my settings saved after restart?** Name and description persistence has been physically tested, most recently with both Steam and non-Steam descriptions after reboot on 1.1.8. No software can guarantee future compatibility with every Steam UI update.

**Does it work with every CSS Loader theme or on Windows/Android/ROG Ally?** No such claim is made. Steam Deck Gaming Mode is the tested target.

**Why does GitHub still offer 0.9.2?** Because the 1.1.8 installer, screenshots and corresponding source upload are still being finalized. A documented release candidate is **not** a published installer.

## How to submit a useful bug report

Include the TitleDeck version, Steam Deck model, SteamOS/Steam client version or update channel, Decky Loader version, connected controller(s), CSS theme, Steam/non-Steam game name and App ID if known, exact buttons/actions and what happened, and a screenshot when appropriate. Do **not** upload passwords, Steam Guard codes or private account credentials.

[Physical verification](docs/VERIFIED_ON_DECK.md) · [Feature reference](docs/FEATURES.md).
