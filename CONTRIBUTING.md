# Contributing to TitleDeck

TitleDeck targets **Steam Deck Gaming Mode** and reversible, local **title and Game Info description** customization.

- Open [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions) for ideas and [Issues](https://github.com/ValentineBSAA/TitleDeck/issues) for reproducible bugs.
- Separate **physical Steam Deck acceptance** from simulated/automated test results. ROG Ally, other SteamOS-like handhelds, Desktop Mode, Windows and Android/DroidDeck are unverified.
- Preserve Restore Original Game for **both** title and description, and the separate Restore Steam Description operation.
- Keep description edits explicit and reversible. The yellow 1,247-character warning is non-blocking, not a hard limit.
- Preserve the fast Game Info/Community tab rendering behavior proven in Preview 23, and avoid introducing broad expensive UI scans that could affect GTM.
- Preserve safe title cleanup behavior for Unicode Greek Σ, Roman numerals, mixed-case words and trademarks.
- Test controller Left/Right/Up/Down focus, Steam keyboard behavior, title/description saves, backup and recovery.
- Do not alter installed games, original Steam metadata, sorting identities or artwork text.
- Note that editable `main` source/tests still reflect the **0.9.0 RC1 baseline**, not 0.9.2 Beta 1; avoid presenting results from RC1 source as proof of beta source parity. [Details](SOURCE.md).
- Report GTM coexistence results and the intermittent B-dismissal behavior candidly rather than declaring them solved.

[Release notes](docs/RELEASE_NOTES_0.9.2_BETA1.md) · [Physical verification](docs/VERIFIED_ON_DECK.md) · [Compatibility](docs/COMPATIBILITY.md).
