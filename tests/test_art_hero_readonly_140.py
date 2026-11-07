"""TitleDeck 1.4.0 Art Hero read-only integration tests."""
import asyncio
import sys
import unittest
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import main
class ArtHeroReadOnlyTests(unittest.TestCase):
    def test_write_is_rejected_before_any_backend_call(self):
        with patch.object(main,'_css_loader_local_request') as rpc:
            out=asyncio.run(main._titledeck_css_loader_rpc('set_patch_of_theme',{'themeName':'Art Hero','patchName':'Carousel Font Height','value':'-4'}))
        self.assertFalse(out['ok']);self.assertIn('view-only',out['reason']);rpc.assert_not_called()
    def test_other_operations_rejected_before_backend_call(self):
        with patch.object(main,'_css_loader_local_request') as rpc:
            out=asyncio.run(main._titledeck_css_loader_rpc('delete_theme',{}))
        self.assertFalse(out['ok']);rpc.assert_not_called()
    def test_read_returns_only_art_hero(self):
        themes=[{'name':'Another Theme'},{'name':'Art Hero','enabled':True,'patches':[{'name':'Carousel Font Height','value':'11'}]}]
        with patch.object(main,'_css_loader_local_request',return_value=themes) as rpc:
            out=asyncio.run(main._titledeck_css_loader_rpc('get_themes'))
        self.assertTrue(out['ok']);self.assertEqual(len(out['result']),1)
        self.assertEqual(out['result'][0]['patches'][0]['value'],'11')
        rpc.assert_called_once_with('get_themes',{})
    def test_absent_art_hero_returns_empty(self):
        with patch.object(main,'_css_loader_local_request',return_value=[{'name':'Some Theme'}]):
            out=asyncio.run(main._titledeck_css_loader_rpc('get_themes'))
        self.assertTrue(out['ok']);self.assertEqual(out['result'],[])
    def test_network_exception_is_not_success(self):
        with patch.object(main,'_css_loader_local_request',side_effect=ConnectionError('offline')):
            out=asyncio.run(main._titledeck_css_loader_rpc('get_themes'))
        self.assertFalse(out['ok']);self.assertIn('offline',out['reason'])
if __name__=='__main__':
    unittest.main()
