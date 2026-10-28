# TitleDeck feature reference

The features below describe the **upcoming 1.1.8 candidate**. **0.9.2 remains the latest published installer** until the new installer and final screenshots are provided. Status labels distinguish hardware-confirmed behavior from remaining limitations.

## Game title customization
- Set a local per-game displayed name for Steam games and non-Steam shortcuts without rewriting game files or Steam's metadata.
- Use the native Steam keyboard in Gaming Mode.
- **Suggest Cleanup** gives a reversible, reviewable suggestion; explicitly save a new name.
- Restore a title individually, or restore the entire game.
- Names and local overrides have been tested for persistence across Deck restarts.

## Game Info descriptions
- Replace displayed **Game Info** text on real Steam game pages, next to Community.
- Replace the corresponding displayed description for non-Steam games and shortcuts.
- Preserve custom non-Steam artwork beside the description and retain the Steam Play / Proton text.
- Preserve originals via **Restore Steam Description** and **Restore Original Game**.
- No enforced description character cap; previous yellow threshold warnings removed.
- **Hardware verified:** both Steam and non-Steam descriptions displayed after restart in 1.1.8; 1.1.1 screenshots demonstrated side-by-side artwork, removal of a ghost artwork slot, Proton line, and original restoration.
- **Unresolved in 1.1.8:** the maintainer now reports physical **right-stick scrolling does not scroll either Game Info description box**. It is not acceptable to advertise that interaction as working until retested.

## Full Library Manager
- All games, Installed and Renamed filters; Search Library; App ID lookup; Refresh.
- Controller-navigable artwork tile grid and installed-state indicator.
- Real LB/RB page navigation on Steam Deck built-in controls and external PS4 controller, confirmed on 1.1.6 and again in 1.1.8.
- On-screen LB/RB controls, D-pad browsing, A select and B close/back.
- Right-stick scrolling in TitleDeck's **own editor/Settings workspaces**, tested on 1.1.8.
- New artwork fallbacks across Steam capsule/header images, local artwork and cached artwork, including specific demo and app fallbacks. A blurred fill and full uncropped image improve mixed cover proportions.
- **Hide tile** removes an unwanted shortcut from the manager only; **Show all hidden tiles** reverses it. It does not delete anything from Steam.

## Settings and appearance
- TitleDeck Settings is reached from the **Full Library Manager → Settings** button (not Decky Loader's install settings).
- Wine/red-themed interface, adaptive accent-color options, preset colors, custom RGB/hue-saturation picker, color-enabled toggles and readable library panels.
- Description placement options include Game Info, Artwork Footer and Below Play; **Game Info** is the main hardware-tested presentation.
- Backup/recovery and individual or bulk restore safeguards.
- Developer diagnostics are **hidden by default** in 1.1.8, not permanently removed. They are available only after explicit developer opt-in.

## Safety and scope
- No modification of installed game executables, folders or canonical Steam identifiers.
- Back up your settings before upgrading or performing large restores.
- Physical testing is specific to Steam Deck Gaming Mode. Other hardware, all CSS Loader themes, all SteamOS versions and massive batch restores are not fully verified.

[Beginner guide](BEGINNER_GUIDE.md) · [Current release status](../README.md) · [Hardware acceptance](VERIFIED_ON_DECK.md)
