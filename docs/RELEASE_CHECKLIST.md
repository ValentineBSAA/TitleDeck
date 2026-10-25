# Publish TitleDeck 0.9.0 RC1 to GitHub

The README, compatibility warning, verified feature matrix, screenshots and other public docs are already prepared. **Do not call RC1 stable or claim non-Steam Deck hardware support.**

1. Open [GitHub Releases](https://github.com/ValentineBSAA/TitleDeck/releases) and create a **new draft release**.
2. Create tag **`0.9.0-rc.1`** (target `main`), with title **`TitleDeck 0.9.0 RC1 — Steam Deck Release Candidate`**.
3. Upload **`TitleDeck-0.9.0-RC1-SteamDeck.zip`** while the release is still a **draft**.
4. Copy the description from [0.9.0 RC1 release notes](RELEASE_NOTES_0.9.0_RC1.md). Clearly retain the native keyboard B-close known issue and Steam Deck-only tested platform.
5. Mark **Set as a pre-release** and **publish only after the ZIP finishes uploading**. Keep 0.8.1 published as historical reference.
6. Check [GitHub Actions](https://github.com/ValentineBSAA/TitleDeck/actions). **Import TitleDeck 0.9.0 RC1** should validate the exact uploaded ZIP, run tests, and then synchronize new source and version metadata to GitHub main.
7. If the asset was uploaded *after* release publication, use **Actions → Import TitleDeck 0.9.0 RC1 → Run workflow**. Source stays at the previous public version until import succeeds.
8. Check **TitleDeck checks** is green. The screenshot gallery already contains seven real Steam Deck photos from 0.8.1; no screenshots ZIP is required.

**Expected SHA-256** of the RC installer:
```
6bf8467b3637334ee21b3e50302be5d9ea15880ab80dbc27f190438bbc415c73  TitleDeck-0.9.0-RC1-SteamDeck.zip
```

Repacked or modified ZIPs will not pass the guarded import until a deliberate new release workflow is made.

**Platform notice:** Physical Valve Steam Deck Gaming Mode is the tested baseline. ROG Ally, other non-Steam Deck SteamOS-like handhelds, Windows, Android/DroidDeck and Desktop Mode are not verified.
