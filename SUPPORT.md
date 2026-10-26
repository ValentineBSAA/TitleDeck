# TitleDeck support: 0.9.2 stable

**Primary tested device:** Valve Steam Deck, SteamOS Gaming Mode, Decky Loader. ROG Ally, alternate SteamOS-like handhelds, Steam Desktop Mode, Windows and Android/DroidDeck are unverified.

[Report a bug](https://github.com/ValentineBSAA/TitleDeck/issues) · [Ask questions in Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions) · [Stable release](https://github.com/ValentineBSAA/TitleDeck/releases/tag/0.9.2)

## Frequently asked questions

**What is new in 0.9.2?** You can write a custom game description that appears directly in Steam's Game Info tab, alongside the earlier display-name editing.

**Does Restore Original remove my description too?** Yes. **Restore Original Game** resets both this game's custom title and description. Use **Restore Steam Description** to remove only the description and retain a custom title.

**Does 1,247 characters prevent saving?** No. It triggers a yellow warning about scrolling and layout. There is no hard description length cap.

**Why is the old title still on cover artwork?** TitleDeck changes Steam's displayed text, not lettering baked into the cover.

**Does cleanup save automatically?** No. Suggest Cleanup lets you preview and apply a draft, then explicitly Save Custom Title. The Sims 4 cleanup scenario was tested on hardware in earlier releases.

**Why are a few covers missing immediately after restart?** Steam and TitleDeck may need time to load artwork. Fall back to a placeholder when no matching cover is available.

**Does it work with Game Theme Music (GTM)?** Compatibility work reduced broad background scanning, but **GTM 3.6.9 in the Plugin Store has not yet passed a final hardware coexistence test**. Report precise steps if music stops or playback changes.

**Does pressing B always dismiss the keyboard cleanly?** No. The native Steam keyboard can close while TitleDeck's editor stays raised. **Done editing** remains the workaround.

**Can I restore 200+ aliases?** Bulk Restore All has confirmation and backup/recovery safeguards. An exhaustive physical 200+ case is not yet accepted.

**Will it work on ROG Ally or DroidDeck?** Those platforms are not verified or guaranteed.

When reporting an issue, include Steam Deck model, SteamOS/Steam client channel, Decky Loader version, TitleDeck version, CSS Loader theme, affected game App ID (if helpful), reproduction steps and safe screenshots. Do not share passwords or Steam Guard codes.
