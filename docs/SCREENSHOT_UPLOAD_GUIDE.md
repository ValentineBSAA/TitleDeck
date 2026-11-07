# TitleDeck screenshots and versioned galleries
The current **1.4.0 gallery** is [SCREENSHOTS.md](SCREENSHOTS.md). It uses **22** genuine 1920×1080 images from the maintainer's `TitleDeck-1.4.0-Organized-Screenshots.zip`, which includes 12 featured captures, 10 additional reference captures and manifests/captions.

Original archive: [download](https://github.com/ValentineBSAA/TitleDeck/releases/download/1.4.0/TitleDeck-1.4.0-Organized-Screenshots.zip). Expected SHA-256: `4024f292b7f91092de9a43f1900a79062efb2be55edd28cc92c41ba3509a3c69`.

The gallery uses version-scoped image paths under `docs/screenshots/v1.4.0/`. Do not replace older screenshots with newer images; maintain historic galleries by version. Do not check `__MACOSX` metadata or duplicates into the repo. Images should be authentic and not mislabel historical UI as 1.4.0.

The automated import workflow `.github/workflows/import-titledeck-140-gallery.yml` validates the official release archive digest and imports **only** the 22 actual JPEG images into the versioned directory.
