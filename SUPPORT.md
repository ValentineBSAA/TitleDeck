# TitleDeck support and troubleshooting

**Current public version:** 0.9.2. **Next planned release:** 1.1.8 (candidate). Primary supported testing setup is a real Steam Deck in SteamOS Gaming Mode with Decky Loader.

[Report a bug](https://github.com/ValentineBSAA/TitleDeck/issues) · [Ask a question](https://github.com/ValentineBSAA/TitleDeck/discussions) · [Beginner's guide](docs/BEGINNERS_GUIDE.md)

## Common questions

**Where are TitleDeck's settings?** Open **Quick Access (•••) → Decky Loader → TitleDeck**, then **Open Full Library Manager → ⚙ Settings**. Depending on installed version, a Settings entry may also be available in Quick Access.

**How do I make a custom description appear?** Save it in the game editor, then open the game's Steam page and choose **Game Info**. In TitleDeck Settings, choose **Game Info** as the description placement.

**Does it work for non-Steam shortcuts?** The 1.1.8 candidate's custom text and side-by-side artwork were verified on the maintainer's Deck, including after reboot. That does not mean the older public 0.9.2 ZIP is fixed.

**Why won't the right stick scroll my description?** This is a **newly reported issue** in the 1.1.8 candidate affecting Steam and non-Steam description boxes. It is separate from successful description saving/display. Use touchscreen/scrollbar where supported and report whether the problem happens in the **TitleDeck editor** or on the game's **Steam Game Info** page.

**Why do LB/RB buttons work in the library but not elsewhere?** LB/RB are intended for **Full Library Manager paging**. Both built-in Deck LB/RB and a PS4 Bluetooth controller were tested. On-screen LB/RB paging is also available.

**A game's artwork is missing, or portrait artwork has blank margins.** TitleDeck uses Steam art, user custom grid art and local cache where possible. A blurred background may fill extra tile space behind the fully visible cover. Some games or demos have no accessible suitable art; a letter placeholder is not a crash.

**Why do I see ES-DE and ES-DE (Program)?** They can be separate Steam shortcuts. To remove only an unwanted **TitleDeck manager card**, open it and select **Hide tile**. **Settings → Hidden Full Library Manager entries → Show all hidden tiles** reverses the change. No Steam shortcut is deleted.

**How do I undo my changes?** Use **Restore Original Game** for the selected title and description, or the description-only restore option when appropriate. Make a backup before large bulk changes.

**Can I save descriptions longer than 1,247 characters?** The recent candidate no longer displays the old nonblocking yellow warnings and does not enforce that historical advisory threshold. Long text can still depend on Steam's current layout.

**Is this verified on Windows / ROG Ally / Android?** No. The maintainer-tested environment is Steam Deck Gaming Mode. Other platforms are unverified.

**Does it work with every CSS Loader theme or every Steam update?** Not guaranteed. Steam may change UI internals and require updates.

## Reporting a useful bug

Please include: TitleDeck version; Steam Deck model; SteamOS and Decky versions; whether Steam or non-Steam; game name / App ID; connected controller (if any); visual theme; steps to reproduce; and an appropriately cropped screenshot.

For scrolling problems, specify **which surface**: (1) Steam's Game Info description, (2) TitleDeck's description editor box, or (3) Full Library Manager workspace. They are different scroll handlers. Avoid sharing account secrets, private paths or personal text in diagnostic JSON.

[Verified on Deck](docs/VERIFIED_ON_DECK.md) · [Compatibility](docs/COMPATIBILITY.md)
