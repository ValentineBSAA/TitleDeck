# Install and update TitleDeck

> **Compatibility warning:** TitleDeck is developed and device-tested on a **physical Valve Steam Deck running SteamOS Gaming Mode with Decky Loader**. **ROG Ally, other handheld PCs, third-party SteamOS installations or derivatives, Windows, Android/DroidDeck, and Desktop Mode are not verified or officially supported.** The interface, Decky integration, controller focus, and Steam keyboard may behave differently or fail on those systems.

## Release status

**0.9.0 RC source is prepared.** The installer **`TitleDeck-0.9.0-RC.zip`** will be available at [Releases](https://github.com/ValentineBSAA/TitleDeck/releases) **after the maintainer uploads it**. Until then, [0.8.1](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.8.1) remains the older available download.

## Valve Steam Deck / Gaming Mode

1. Install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader).
2. Download the release ZIP matching the version you intend to install.
3. In Decky's developer settings, choose **Install Plugin from ZIP**; select the TitleDeck plugin ZIP (not the screenshot gallery).
4. Open **Quick Access → Decky → TitleDeck → Open full library manager**.
5. Select a game, press Change Name to use Steam's native keyboard, or choose Suggest Cleanup to review a safe suggestion. Then press **Save Custom Title** to persist your intended name.

**Do not remove Decky's existing TitleDeck settings when updating.** Current aliases should remain compatible, but take a manual backup before major updates.

## Edit and undo

- **Change Name** edits the draft on the regular game editor. Steam's native keyboard opens; a connected keyboard may also work, but cross-device typing has not been broadly tested.
- **Suggest Cleanup** previews the proposed name. Apply does **not** write a permanent alias. You must separately press Save.
- **Undo cleanup** is available for the suggestion until further editing.
- **Restore Original** restores a saved alias or clears an unsaved draft.
- **Restore All** requires a full review and deliberate confirmation. TitleDeck creates a recovery backup before removing aliases.

## Troubleshooting

- If the editor remains raised after dismissing Steam's keyboard with B, this is a **known intermittent RC issue**. The draft is not saved until Save Custom Title.
- Lettering baked into game artwork never changes.
- Some Steam pages, refresh patterns, and CSS Loader themes may not display aliases consistently.
- Non-Steam Deck environments may fail completely; see [compatibility](COMPATIBILITY.md).

[Verification](VERIFIED_ON_DECK.md) · [Support](../SUPPORT.md).
