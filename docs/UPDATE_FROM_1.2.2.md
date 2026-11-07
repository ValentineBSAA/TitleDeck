# From TitleDeck 1.2.2 to 1.4.0

[← Home](../README.md) · [Release notes](RELEASE_NOTES_1.4.0.md) · [Gallery](SCREENSHOTS.md) · [Earlier 1.2.2 notes](RELEASE_NOTES_1.2.2.md)

The jump from **1.2.2 to 1.4.0** is not just a version-number change. It represents many internal builds, real-device experiments, usability adjustments, and a clearer division of responsibility between TitleDeck and CSS Loader.

## Before and after

| Area | Public 1.2.2 | Stable 1.4.0 |
| --- | --- | --- |
| Local game titles | Steam/non-Steam aliases, originals restorable | **Preserved**, with a more polished management experience |
| Descriptions | Custom Game Info text | **Preserved**, with clearer access through manager / Quick Access |
| Full Library Manager | Search, editing, artwork and keyboard/controller support | **Refined** focus, navigation, Settings layout and artwork placeholders/transitions |
| Quick Access | Manager entry and developer GitHub profile button | More cohesive presentation, iconography and access |
| Home text colors | Presets and custom color settings already present | More comprehensive color editing, contrast previews and Typography Studio workflow |
| Fonts & effects | Simpler title appearance controls | **10 system-font-based style presets**, optional outline, shadow, glow and high-contrast effects |
| Title placement | Earlier title-layout experiments | Clearer Above/Below controls when TitleDeck owns the layout |
| Art Hero | No dependable shared-placement workflow | Detects Art Hero's placement and shows a **read-only guide** rather than fake write controls |
| Verification | 1.2.2 device test for developer link; historical functionality | Extensive maintainer-reported 1.4.0 hardware verification plus **79 JS / 5 Python** tests |
| Screenshots | Earlier historical gallery | **22 new 1920×1080 captures** grouped by feature; old gallery preserved |

## What actually took the work?
**The little things accumulated.** Loading artwork without an ugly transition, keeping controller focus predictable, making pages readable without excessive vertical scrolling, and ensuring TitleDeck respects Steam Deck themes all require iterations. The final release contains improvements from the 1.2.x and 1.3.x development cycle, not just the last patch.

**Typography grew beyond a color picker.** Font treatments, swatches, custom HEX/RGB values, visual effects and legibility feedback now work as a coherent set of options. The preview illustrates styles; it is not a pixel-perfect live Steam Home simulation.

**Art Hero required a deliberate boundary.** In 1.3.7–1.3.9, experimental changes could read Art Hero settings but could not reliably write them on the physical Deck. Rather than advertise a broken integration, 1.4.0 makes Art Hero placement **visible but disabled**. The correct setting remains in CSS Loader. TitleDeck's own independent placement returns when Art Hero is off.

## What did not change?
Your original Steam metadata and installed game files are untouched. Steam and non-Steam title edits, descriptions, saved preferences, and recovery tools remain local. The MIT license remains unchanged.

## What is not marked as fixed?
Steam Deck built-in right-stick behavior in Game Info descriptions is still tracked in [issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8). An earlier Quick Access controller-focus quirk is not represented as solved. Custom font file importing is not a feature of 1.4.0. Theme combinations can differ.

## Thank you
Community feedback did more than suggest features: it kept the project grounded in what actually helps someone using a Steam Deck. Thank you to everyone who proposed ideas, tested a build, reported a glitch, encouraged the work, or simply uses TitleDeck.

**your titles you're deck!**
