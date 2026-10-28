<p align="center"><img src="assets/titledeck-icon.png" width="128" alt="TitleDeck icon"></p>
<h1 align="center">TitleDeck</h1>
<p align="center"><strong>Your library. Your names. Your descriptions.</strong></p>
<p align="center">
<img alt="Hardware tested" src="https://img.shields.io/badge/tested-physical%20Steam%20Deck-1b82ba">
<img alt="Published release" src="https://img.shields.io/badge/published-0.9.2-blue">
<img alt="Next release" src="https://img.shields.io/badge/1.1.8-hardware%20tested%20candidate-orange">
<a href="LICENSE"><img alt="License MIT" src="https://img.shields.io/badge/license-MIT-lightgrey"></a>
</p>

**TitleDeck** is a [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) plugin for customizing **game titles and Game Info descriptions** in Steam Deck **Gaming Mode**. Customizations are local, reversible and do not rewrite installed game files or Valve's canonical game records.

> [!IMPORTANT]
> **Release status, October 27, 2026:** **0.9.2 is still the latest downloadable public release.** Its Game Info description feature has a [known reliability issue](https://github.com/ValentineBSAA/TitleDeck/issues/6). **1.1.8 is the upcoming, physically tested release candidate**, not a public download yet. The maintainer has verified Steam **and** non-Steam descriptions after reboot, library paging on the Deck and PS4 controller, artwork presentation, hiding library entries, and several other features. One new issue is still being investigated: **right-stick scrolling inside Steam's Game Info description area does not currently respond on the maintainer's Deck**. The 1.1.8 installer and current screenshots will be added only after final verification. [Verification notes](docs/VERIFIED_ON_DECK.md).

**Start here:** [Beginner guide](docs/BEGINNER_GUIDE.md) · [Installation](docs/INSTALL.md) · [All features](docs/FEATURES.md) · [Screenshots](docs/SCREENSHOTS.md) · [Help](SUPPORT.md) · [Changelog](CHANGELOG.md)

## What can TitleDeck do?

| Feature | What it means for you |
| --- | --- |
| **Rename games locally** | Change the visible title of a Steam or non-Steam library entry; restore the original when you want. |
| **Write your own descriptions** | Replace the text shown in the real **Game Info** tab, beside Community, for Steam games and non-Steam shortcuts. |
| **Use your Steam keyboard** | Edit names and descriptions in Gaming Mode without an external keyboard. |
| **Browse the entire library** | Search, filter All / Installed / Renamed, use tile artwork, see installed indicators and page with LB/RB. |
| **Clean up names safely** | Preview **Suggest Cleanup**, apply the suggestion, and explicitly save or undo. |
| **Keep or restore originals** | Restore a description alone, restore an entire game, or use backup / recovery tools. |
| **Personalize the interface** | Adjustable visual accent colors and controller-friendly Settings. |
| **Hide unwanted manager tiles** | Hide a duplicate-looking Steam shortcut **only from TitleDeck**; recover it in Settings. |

These are features of the **upcoming 1.1.8 build**. Some were not available or reliable in the older, presently published 0.9.2 package. [Full version-by-version explanation](docs/RELEASE_NOTES_1.1.8.md).

## Getting started in Gaming Mode

1. Ensure **Decky Loader** is installed on a **Valve Steam Deck**.
2. Download the actual **TitleDeck installer ZIP** from [GitHub Releases](https://github.com/ValentineBSAA/TitleDeck/releases) when the desired version is published; **do not extract it**. At present, the available stable version is 0.9.2 and carries the warning above.
3. Open **Quick Access (•••) → Decky Loader → Settings → Developer → Install Plugin from ZIP** and select the ZIP.
4. Open **Quick Access (•••) → Decky → TitleDeck** and choose **Open Full Library Manager**.
5. Select a game, use **Change Name** or the custom-description editor, and **Save**.
6. To see your description, open the game's normal Steam page and select **Game Info**, located beside **Community**.

For screenshots of each step, a guide to Settings, descriptions, backups, and controller buttons, see the **[beginner's guide](docs/BEGINNER_GUIDE.md)**.

## Steam games and non-Steam apps

TitleDeck keeps separate per-entry local overrides for both types. Steam games display the custom description in Game Info; non-Steam shortcuts can also show custom artwork beside the description. **Restore Original Game** returns the selected entry's original text/layout. A non-Steam title's **Steam Play / Proton** line is Steam-provided information and remains visible. No original Steam text is permanently rewritten.

Long descriptions have **no enforced character limit** in 1.1.8, and old yellow character-length warnings have been removed. **Important:** the maintainer has recently reported that the **right stick is not scrolling the Game Info description areas** on either Steam or non-Steam games in 1.1.8; that input behavior should not be advertised as solved. Scrolling inside TitleDeck's own Full Library Manager editor is a separate feature and passed the recent hardware check.

## Controllers and accessibility

| Control | Full Library Manager |
| --- | --- |
| D-pad | Move through games and available controls |
| A | Select or activate |
| B | Back / close |
| **LB / RB** | Previous / next library page, including built-in Deck and PS4 controller (verified in 1.1.6 and 1.1.8) |
| **Right stick** | Scroll longer TitleDeck editor/settings panels (1.1.8 hardware check passed) |
| Touchscreen | Tap any on-screen control, including LB/RB |

Controls inside Steam's **Game Info** page are handled separately; see the scrolling limitation above.

## Screenshots and what's coming

The fresh **1.1.8 screenshot gallery is being prepared**. [See the gallery](docs/SCREENSHOTS.md) for reserved image slots and clearly labeled older captures. Historic screenshots are retained so the original 0.8.x/0.9.x development story is preserved. **Screenshots are gallery media, not a second installer ZIP.**

## Made with community feedback

TitleDeck began with a community request for game-name customization, including **u/TacoOfGod**. **u/All-Stars64** suggested editing descriptions **inside Game Info, beside Community**. Thank you to both, and to everyone testing, reporting regressions, and sharing feedback. These credits acknowledge feature ideas, not code authorship.

## Compatibility, support and source

**Tested target:** physical Valve Steam Deck running SteamOS Gaming Mode with Decky Loader. PS4 Bluetooth controller library paging was also verified. ROG Ally, other handhelds, Android/DroidDeck, Windows, and Steam Desktop Mode are **not verified**. Steam client or CSS Loader updates can change the UI. [Compatibility](docs/COMPATIBILITY.md).

**Published installer and repository source:** The checked-in runtime currently corresponds to **published 0.9.2** until the final 1.1.8 installer/source synchronization. **Do not build 1.1.8 from the repository's current source yet.** [Source and release integrity](SOURCE.md).

[Issues](https://github.com/ValentineBSAA/TitleDeck/issues) · [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions) · [Contributing](CONTRIBUTING.md) · [Release checklist](docs/RELEASE_CHECKLIST.md). MIT licensed; independent of Valve, Steam, Decky Loader, and game publishers.
