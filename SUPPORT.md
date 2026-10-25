# TitleDeck support

**Supported test target:** physical Steam Deck, SteamOS Gaming Mode. **ROG Ally, other PC handhelds with SteamOS-like distributions, Desktop Mode, Windows and Android/DroidDeck are untested and may not function correctly.** See [Compatibility](docs/COMPATIBILITY.md).

[GitHub Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions) for questions and ideas · [GitHub Issues](https://github.com/ValentineBSAA/TitleDeck/issues) for reproducible bugs.

## Known 0.9.0 RC1 issue

**Pressing B closed the Steam keyboard, but the title field stayed raised.** This intermittent mismatch was reported during physical Steam Deck testing. Use **Done editing** to lower the panel. This issue is open; RC1 does not claim an automatic close fix.

## Frequently asked questions

**Why is the old title still on the cover image?** TitleDeck changes Steam's visible text, not lettering baked into art.

**Does renaming change sorting or game files?** No; aliases are stored separately from Steam's canonical metadata and installation files.

**Does Suggest Cleanup save immediately?** No. It presents a current/suggested comparison. Choose Apply or Keep; only **Save Custom Title** makes it permanent. Undo Cleanup is available for an applied suggestion.

**What about reverting 200 names?** Restore All presents every saved name in review pages, requires confirmation and creates a recovery backup. Automated long-list testing exists; a physical 200+ name device test remains open.

**Does it survive metadata refresh?** A saved alias survived a Steam Deck restart; this does **not** independently verify every Steam background metadata refresh. The adapter includes a locally tested fast reapplication mechanism.

**Should it work on ROG Ally or DroidDeck?** No compatibility promise. These platforms have not been verified; keyboard, Decky and controller behavior can differ.

Please include hardware name, operating system, Steam client channel, Decky version, CSS Loader theme, TitleDeck version, steps and screenshots with an Issue. Never post account secrets.
