# TitleDeck 0.4.0 design validation

A 1280×800 Chromium **static CSS preview** was measured locally. This is a mock layout with placeholder artwork and not a Steam Deck screenshot.

| Element | Measured top | Measured height |
|---|---:|---:|
| Compact app bar | 8 px | 46 px |
| Filter rail | 61 px | 40 px |
| Search/tools row | 108 px | 42 px |
| Scrollable game workspace | 157 px | 594 px |
| First game tile | 165 px | 252 px |
| Persistent footer | 758 px | 34 px |

The simulated library contains 160 rows of title data (5 columns, 32 rows), scrolls inside the workspace (8431 px of content; 594 px viewport), and keeps filters/tools fixed. Source and runtime tests used 156 game entries, the count observed in the user's device test.

*On-hardware controller focus, Decky's native theme wrappers, and actual Steam game artwork are not modeled by the static preview. Device validation is still necessary.*
