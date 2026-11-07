# TitleDeck 1.4.0 security policy

TitleDeck is a community-made Decky Loader plugin for Steam Deck Gaming Mode, licensed under MIT. There is no formal bug bounty or response-time guarantee.

**Never post** Steam Guard codes, passwords, cookies, account/session tokens, private filesystem exports, or sensitive device information in public issues. For security-sensitive reports, use GitHub private vulnerability reporting if available or contact the maintainer privately.

TitleDeck customization is local. It should not request your Steam credentials, change game executables or overwrite Valve's canonical metadata. The optional developer avatar links to a public GitHub page; it is not an authentication prompt.

In 1.4.0 the Art Hero integration is **read-only**. Its CSS Loader adapter rejects write operations to the Art Hero theme while keeping TitleDeck's own placement controls available when Art Hero is off.

Steam Deck Gaming Mode is the primary verified platform. Other handhelds, desktop setups, and third-party CSS Loader theme combinations have not received universal hardware acceptance.

[Compatibility](docs/COMPATIBILITY.md) · [Ordinary bug reports](https://github.com/ValentineBSAA/TitleDeck/issues) · [Source and verification](SOURCE.md).
