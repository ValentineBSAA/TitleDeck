# TitleDeck 1.4.0: help and troubleshooting
[← Home](README.md) · [Install](docs/INSTALL.md) · [Gallery](docs/SCREENSHOTS.md) · [Known limitations](docs/COMPATIBILITY.md)

## Install the correct archive
Use the **[1.4.0 installer ZIP](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.4.0/TitleDeck-1.4.0.zip)**. The screenshot ZIP and GitHub's generated source-code archives are not Decky installer packages. From Decky Loader's Settings, use **Developer → Install Plugin from ZIP**.

## My titles won't move when Art Hero is on
This is expected. TitleDeck reads Art Hero's Carousel Font Height but cannot edit it. Use **CSS Loader → Art Hero → Carousel Font Height**; the TitleDeck controls are intentionally disabled when Art Hero is active. Turn Art Hero off to use TitleDeck's own Above/Below settings. [More detail](docs/ART_HERO_COMPATIBILITY.md).

## I want to undo a custom name or description
Use TitleDeck's original-name restoration or backup/recovery controls. They operate on locally customized display information; your installed game files are not renamed.

## Game Info does not scroll properly with the built-in Deck stick
This is an existing unresolved report in [issue #8](https://github.com/ValentineBSAA/TitleDeck/issues/8). Please include your SteamOS version, whether you're using the built-in stick or an external controller, and exact reproduction steps.

## Controller focus skips or jumps unexpectedly
An earlier Quick Access focus quirk is not claimed resolved by 1.4.0. Share the screen, selected setting, controller type and repeatable sequence in a new [bug report](https://github.com/ValentineBSAA/TitleDeck/issues/new/choose).

## Does TitleDeck support custom fonts?
1.4.0 includes **10 built-in font-style treatments** based on available fonts. Importing arbitrary external ZIP/TTF font files is not included.

## Reporting something new
Please include TitleDeck and Decky versions, SteamOS version, installed CSS themes (especially Art Hero), controller type, expected behavior, actual behavior, and relevant screenshots. [Issues](https://github.com/ValentineBSAA/TitleDeck/issues) · [Discussions](https://github.com/ValentineBSAA/TitleDeck/discussions).

Thank you for trying TitleDeck and for helping improve it. Even a small, reproducible report can make an enormous difference.
