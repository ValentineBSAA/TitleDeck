# Contributing to TitleDeck

TitleDeck is an MIT-licensed Decky Loader plugin built primarily for **Steam Deck Gaming Mode**. Thank you for helping improve it!

## Before you file or send a change

- Check [Support](SUPPORT.md), [the beginner guide](docs/BEGINNERS_GUIDE.md), and [known issues](https://github.com/ValentineBSAA/TitleDeck/issues).
- Distinguish **actual Steam Deck testing** from automated simulations or other hardware. A test passing on a PS4 controller does not prove built-in Deck shoulder buttons work.
- For descriptions, distinguish **display/persistence** from **right-stick scrolling**. The 1.1.8 candidate has a newly reported description-box right-stick problem.
- Include exact Steam/non-Steam game type, App ID, SteamOS channel, Decky version, theme and reproduction steps.

## Protect what already works

- Do not regress built-in Deck or PS4 **LB/RB paging** in Full Library Manager.
- Preserve locally saved Steam/non-Steam descriptions and their **restore/persistence** paths.
- Preserve non-Steam side-by-side cover, ghost-poster cleanup, and Steam Proton information.
- Preserve TitleDeck's Game Info custom text, D-pad Settings/color picker, Hide tile recovery, and backup/recovery safeguards.
- Never change installed game files, canonical Steam metadata or user Steam shortcuts to make the manager look cleaner.
- Keep developer-only diagnostics opt-in, not visible to ordinary users.

## Build/source and releases

The **published** source currently remains at 0.9.2 while documentation stages the upcoming 1.1.8 release. Do **not** commit a new-version badge with stale runtime, or claim 1.1.8 is publicly available before the final ZIP and source are synchronized.

When preparing release source, keep `src/index.js` and `dist/index.js` byte-identical and update backend, manifests and tests from the exact final installer. Run:

```sh
node --test tests/*.test.cjs
python3 -m unittest discover -s tests -p 'test_*.py'
```

Add tests for input-button event sources, pressed-edge handling, duplicate controller events, artwork fallback, restore behavior, and description-box scrolling.

## Screenshot contributions

Provide clear captures of the correct version. Individual images should live under `docs/screenshots/<version>/`. Do not commit screenshot ZIP archives or upload them as plugin release assets. Historical captures retain their version labels.

[Roadmap](docs/ROADMAP.md) · [Source](SOURCE.md) · [Hardware matrix](docs/VERIFIED_ON_DECK.md)
