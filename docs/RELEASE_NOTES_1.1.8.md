# TitleDeck 1.1.8: public stable release

**Published:** October 27, 2026 (Arizona local time). **Installer:** [TitleDeck-1.1.8.zip](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.1.8/TitleDeck-1.1.8.zip). **Test target:** Steam Deck Gaming Mode.

## Your library. Your names. Your descriptions.

Version 1.1.8 is the first public release in the 1.1 series. It follows extensive private Deck hardware testing and improvements since the original name-only utility and 0.9.2 description beta.

### Steam and non-Steam descriptions
- Custom descriptions can appear in the real **Game Info** tab for both Steam and non-Steam library entries.
- A non-Steam game such as Most Wanted 2005 shows custom art beside its custom text, without the extra empty ghost-artwork rectangle.
- Steam's separate Proton/Steam Play line remains intact.
- Saving and Restore Original Game have been tested; both Steam and non-Steam saved descriptions survived a full device restart.
- Three placement settings: Game Info, Artwork Footer and Below Play.
- Old yellow character-length warnings were removed; long content may still depend on Steam's current UI layout.

### Full Library Manager
- All games / Installed / Renamed filters, search by title or App ID, artwork grid, installed indicator, and on-screen page controls.
- **LB/RB paging** repaired for the Deck's built-in controllers as well as PS4 Bluetooth controller, hardware-tested.
- Right-stick support for longer TitleDeck manager/editor/settings workspaces.
- Better artwork discovery, Steam and local sources, full-bleed soft backgrounds and uncut front covers, demo/game fallbacks, and improved Jurassic World Evolution 3 artwork.
- **Hide tile** removes a duplicate-looking card from TitleDeck only. It does not delete a Steam shortcut; hidden cards can be restored from Settings.

### Appearance, recovery and privacy
- Wine Red and alternate accents, swatches, custom HEX/RGB and interactive visual color picker.
- Title replacements can be paused. Title backups, backup restores and recovery after a Restore All are available with safeguards.
- Public interface hides developer-only diagnostic controls.
- Changes are local; original Steam metadata and installed game files are not rewritten.

### Known limitation
**The Steam Deck's built-in right stick does not scroll custom descriptions in Steam's Game Info tab for either Steam or non-Steam titles in 1.1.8. An external controller's right stick does scroll both types.** This input-device-specific issue is separate from successful description rendering, saved-state persistence, and Full Library Manager paging. [Tracking issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8). Additional CSS Loader themes, Steam client versions and non-Steam hardware are not universally supported.

## Real-device screenshots and guides
The [23-image 1.1.8 gallery](SCREENSHOTS.md) includes **Catherine Classic (Steam)** and **Need for Speed: Most Wanted 2005 (non-Steam)** Game Info examples, along with the manager, keyboard, title/description editors, and all nine Settings captures.

[Start with the beginner guide](BEGINNER_GUIDE.md) · [Features](FEATURES.md) · [Installation](INSTALL.md) · [Hardware verification](VERIFIED_ON_DECK.md)

**Thank you** to the Decky community, including u/TacoOfGod for original title-renaming inspiration and u/All-Stars64 for the suggestion to place editable descriptions inside Game Info. Credits acknowledge ideas and feedback, not source-code authorship.
