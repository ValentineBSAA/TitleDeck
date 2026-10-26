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
    def test_current_beta_version_and_runtime_sha(self):
        plugin = json.loads((ROOT / "plugin.json").read_text(encoding="utf-8"))
        package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
        self.assertEqual(plugin["version"], "0.9.2-beta.1")
        self.assertEqual(package["version"], plugin["version"])
        src = (ROOT / "src/index.js").read_bytes()
        self.assertEqual(src, (ROOT / "dist/index.js").read_bytes())
        self.assertEqual(hashlib.sha256(src).hexdigest(),
                         "2a735efe47df5e35c72d26420bf485f718cc1ab7bd0a7f4063e171686025bf7c")

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

    def test_beta_docs_and_gallery(self):
        for path in ["README.md", "SOURCE.md", "CONTRIBUTING.md",
                     "docs/ROADMAP.md", "docs/RELEASE_NOTES_0.9.2_BETA1.md"]:
            txt = (ROOT / path).read_text(encoding="utf-8")
            self.assertNotIn("still reflect the 0.9.0 RC1 baseline", txt)
            self.assertNotIn("still matches the historical RC1 baseline", txt)
        gallery = (ROOT / "docs/SCREENSHOTS.md").read_text(encoding="utf-8")
        for name in ["01-quick-access-beta-version.jpeg", "02-native-game-info-description.jpeg",
                     "03-long-description-end.jpeg"]:
            self.assertIn(name, gallery)
            self.assertTrue((ROOT / "docs/screenshots/v0.9.2-beta1" / name).is_file())


if __name__ == "__main__":
    unittest.main()
