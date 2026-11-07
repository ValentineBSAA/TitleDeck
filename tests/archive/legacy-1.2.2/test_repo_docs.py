"""Release and documentation checks (not Steam Deck hardware acceptance tests)."""
import hashlib
import json
import re
import unittest
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent.parent
LINK = re.compile(r'!?\[[^\]]*\]\(([^)]+)\)')


class DocsAndReleaseTests(unittest.TestCase):
    def test_current_stable_version_and_runtime_sha(self):
        plugin = json.loads((ROOT / "plugin.json").read_text(encoding="utf-8"))
        package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
        self.assertEqual(plugin["version"], "1.2.2")
        self.assertEqual(package["version"], plugin["version"])
        src = (ROOT / "src/index.js").read_bytes()
        self.assertEqual(src, (ROOT / "dist/index.js").read_bytes())
        self.assertEqual(hashlib.sha256(src).hexdigest(),
                         "7664cc3795a77725003e6381805d594f03eb8c8cb87c37f61e92de14ebf17535")

    def test_internal_markdown_links(self):
        broken = []
        for doc in ROOT.rglob("*.md"):
            for found in LINK.finditer(doc.read_text(encoding="utf-8")):
                uri = found.group(1).strip().split(" ", 1)[0].strip("<>")
                if not uri or uri.startswith(("#", "http:", "https:", "mailto:")):
                    continue
                target = (doc.parent / unquote(uri.split("#", 1)[0].split("?", 1)[0])).resolve()
                if not target.is_relative_to(ROOT) or not target.exists():
                    broken.append(str(doc.relative_to(ROOT)) + ": " + uri)
        self.assertEqual(broken, [])

    def test_stable_docs_and_historical_gallery(self):
        for path in ["README.md", "SOURCE.md", "CONTRIBUTING.md",
                     "docs/ROADMAP.md", "docs/RELEASE_NOTES_0.9.2.md"]:
            txt = (ROOT / path).read_text(encoding="utf-8")
            self.assertNotIn("still reflect the 0.9.0 RC1 baseline", txt)
            self.assertNotIn("still matches the historical RC1 baseline", txt)
        gallery = (ROOT / "docs/SCREENSHOTS.md").read_text(encoding="utf-8")
        self.assertIn("22 real", gallery)
        for name in ["01-steam-home-custom-text-glow.jpeg", "02-full-library-manager.jpeg",
                     "11-art-hero-read-only-controls.jpeg", "22-art-hero-placement-explanation.jpeg"]:
            self.assertIn(name, gallery)
            self.assertTrue((ROOT / "docs/screenshots/v1.4.0" / name).is_file())
        historical = (ROOT / "docs/SCREENSHOTS_1.1.8_ARCHIVE.md").read_text(encoding="utf-8")
        for name in ["01-quick-access-beta-version.jpeg", "02-native-game-info-description.jpeg",
                     "03-long-description-end.jpeg"]:
            self.assertIn(name, historical)
            self.assertTrue((ROOT / "docs/screenshots/v0.9.2-beta1" / name).is_file())


if __name__ == "__main__":
    unittest.main()
