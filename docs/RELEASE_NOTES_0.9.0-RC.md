# TitleDeck 0.9.0 Release Candidate

**Status:** Release candidate / public beta. **Version:** `0.9.0-rc.1`. This documentation describes the prepared RC build; **the maintainer uploads the installer ZIP to GitHub Releases separately**. The older 0.8.1 prerelease remains available.

> **Compatibility warning:** TitleDeck is developed and device-tested on a **physical Valve Steam Deck running SteamOS Gaming Mode with Decky Loader**. **ROG Ally, other handheld PCs, third-party SteamOS installations or derivatives, Windows, Android/DroidDeck, and Desktop Mode are not verified or officially supported.** The interface, Decky integration, controller focus, and Steam keyboard may behave differently or fail on those systems.

## What's included

- Persistent, local, per-App-ID **display title aliases** without modifying installed games or Steam canonical title/sorting metadata.
- Controller-first full library manager, art, search and editable game detail views.
- Steam's **native keyboard** and support for editing at the text cursor; no longer requires TitleDeck's former on-screen alphabet grid.
- Same-page Change Name flow and keyboard-aware title field, with the editor controls still present.
- Smarter capitalization/trademark cleanup that preserves Σ, Unicode text, and Roman numerals.
- **Non-destructive Suggest Cleanup:** review original/current draft and proposed text; choose **Keep my title** or **Apply suggestion**, optionally **Undo cleanup**; save explicitly to persist.
- Restore Original (including unsaved drafts), confirmed Restore All with paginated review, recovery snapshots, and manual backup controls.
- Animated short notifications, visible version badge, improved editor four-direction focus navigation.
- Fast reapplication of aliases in response to Steam interface updates, covered by simulated tests.

## Confirmed in earlier real Steam Deck versions

The maintainer verified Catherine Classic → Catherine and restored it, custom-name persistence after restarting the Steam Deck, Sims 4 trademark cleanup with a preview/apply/save sequence, native keyboard opening, four-button editor navigation, and animated notifications. **These results are not a direct physical test of the new 0.9.0 RC package yet.**

## Known issue

**Intermittent Steam keyboard dismissal:** Pressing B to close the native keyboard may occasionally leave the editing field in its raised/keyboard-open layout. It has also been observed to return correctly. The editor stays mounted so the saved alias is not silently changed. This is a UI issue under investigation, not a claim that B reliably triggers a slide-down animation.

## Not yet verified

- Consistent alias rendering through **all** Steam background metadata refreshes or on **every** UI surface.
- Large-library (200+) review on physical hardware, broad CSS Loader/theme combinations, and all controller edge cases.
- Physical keyboard input/copy/paste across different configurations.
- **ROG Ally, other SteamOS devices, Windows, Android or DroidDeck**. None are the supported target.

## Installing and upgrading

**After the maintainer publishes the ZIP:** open [GitHub Releases](https://github.com/ValentineBSAA/TitleDeck/releases) and download `TitleDeck-0.9.0-RC.zip`. Use Decky's **Install Plugin from ZIP**; avoid deleting the existing Decky settings folder. Make a manual alias backup first.

## Screenshots

The current [seven screenshot gallery](SCREENSHOTS.md) contains real Steam Deck images from the **0.8.1** release. They are valid historical hardware images and are temporarily reused for 0.9.0 RC; they should not be presented as fresh 0.9.0 screenshots.

[Verification](VERIFIED_ON_DECK.md) · [Compatibility](COMPATIBILITY.md) · [Installation](INSTALL.md) · [Support](../SUPPORT.md)
