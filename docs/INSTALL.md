# Install TitleDeck 0.9.2 stable

**Release:** [0.9.2](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2) · **File:** `TitleDeck-0.9.2.zip` · **Status:** Public stable release.

**Supported test target:** Valve Steam Deck running SteamOS Gaming Mode with Decky Loader. ROG Ally, Legion Go, other non-Valve SteamOS-like systems, Steam Desktop Mode, Windows, Android/DroidDeck are **unverified**. [Full compatibility statement](COMPATIBILITY.md).

## Installation

1. In TitleDeck Settings, make a backup of existing customizations before upgrading.
2. Download the **plugin installer ZIP**, not the separately offered screenshot ZIP, from the current stable release.
3. In SteamOS Gaming Mode open **Decky Loader → Settings → Developer → Install Plugin from ZIP**.
4. Select the downloaded installer ZIP and install it directly. **Do not extract or re-zip it.**
5. Open **Quick Access → Decky → TitleDeck → Open full library manager**.

New users get Game Info as the default description placement. Existing users keep their chosen placement. Existing name and description overrides should be retained on upgrade.

## Customize a title or description

- Select a game or app in Full Library Manager.
- **Change Name** opens the Steam keyboard. Review **Suggest Cleanup** if desired, then explicitly select **Save Custom Title**.
- Use the custom-description editor to type text with Steam's keyboard, then explicitly **Save description**.
- On the selected game's Steam page, open **Game Info** (beside Community) to see the custom text. On the tested physical Steam Deck, rapid switching between those tabs works without the old several-second delay.
- **Restore Original Game** resets that game's custom title **and** custom description. **Restore Steam Description** resets only its description.
- Bulk Restore All has confirmation and recovery safeguards; a full 200+ game hardware acceptance test remains open.

## Description-length advisory

There is **no hard description character limit**. At **1,247 characters**, TitleDeck shows a yellow warning that additional text can cause excessive scrolling, wrapping, or unusual Steam layout behavior. Saving remains possible beyond that point. This is a **warning threshold, not an endorsed maximum or compatibility guarantee**.

## Known issues and limitations

- Cover artwork may need a brief load following Steam restart; missing art uses fallbacks.
- Pressing B to close Steam's keyboard may intermittently leave the title editor raised; use **Done editing** if available.
- Full compatibility with Game Theme Music 3.6.9 in the Decky Plugin Store has **not** been definitively hardware-accepted.
- Third-party CSS Loader themes and future Steam UI changes may disrupt title/description presentation.
- Steam metadata, installed game files, sort identities and baked-in cover art text remain untouched.

[Latest release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2) · [Release notes](RELEASE_NOTES_0.9.2.md) · [Device verification](VERIFIED_ON_DECK.md) · [Support](../SUPPORT.md).
