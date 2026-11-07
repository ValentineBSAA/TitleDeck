import json
import pathlib
import unittest
import hashlib
import re
ROOT = pathlib.Path(__file__).resolve().parent.parent
class TitleDeckStable140(unittest.TestCase):
    def test_manifest_version(self):
        self.assertEqual(json.loads((ROOT/'package.json').read_text())['version'],'1.4.0')
        self.assertEqual(json.loads((ROOT/'plugin.json').read_text())['version'],'1.4.0')
    def test_frontend_parity(self):
        self.assertEqual((ROOT/'src/index.js').read_bytes(),(ROOT/'dist/index.js').read_bytes())
    def test_backend_version(self):
        self.assertIn('1.4.0',(ROOT/'main.py').read_text())
    def test_sha256_manifest(self):
        content=(ROOT/'docs/RELEASE_SOURCE_SHA256_1.4.0.md').read_text()
        pairs=re.findall(r'\| `([^`]+)` \| `([0-9a-f]{64})` \|',content)
        self.assertEqual(len(pairs),11)
        for name,digest in pairs:
            self.assertEqual(hashlib.sha256((ROOT/name).read_bytes()).hexdigest(),digest,name)
if __name__=='__main__':
    unittest.main()
