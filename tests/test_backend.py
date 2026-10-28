import asyncio
import json
import os
import tempfile
import unittest
from unittest.mock import patch
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import main


class TitleDeckBackendTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.old = os.environ.get('TITLEDECK_TEST_DATA')
        os.environ['TITLEDECK_TEST_DATA'] = str(self.root / 'titledeck')
        self.addCleanup(self.reset_env)

    def reset_env(self):
        if self.old is None:
            os.environ.pop('TITLEDECK_TEST_DATA', None)
        else:
            os.environ['TITLEDECK_TEST_DATA'] = self.old

    def test_store_roundtrip_and_atomic(self):
        p = main.settings_path()
        main.store_state({'schema': 1, 'enabled': True, 'aliases': {'123': 'Nice Title'}}, p)
        self.assertEqual(main.load_state(p)['aliases']['123'], 'Nice Title')
        self.assertEqual(list(p.parent.glob('*.tmp')), [])

    def test_reject_invalid(self):
        for ident in ['0', '-123', '1.2', '../1', 'a' * 32]:
            with self.subTest(ident=ident), self.assertRaises(ValueError):
                main.normalize_id(ident)
        for title in ['', 'x' * 181, 'hi\nthere', 'abc\x00def']:
            with self.subTest(title=title), self.assertRaises(ValueError):
                main.validate_title(title)

    def test_game_descriptions_are_local_reversible_and_legacy_compatible(self):
        legacy = {'schema': 1, 'enabled': True, 'aliases': {'620': 'Portal II'}}
        main.store_state(legacy)
        self.assertEqual(main.load_state()['descriptions'], {})
        self.assertEqual(main.validate_description('First line\r\nSecond line'), 'First line\nSecond line')
        for bad in ['', ' ' * 4, 'bad\x00text']:
            with self.subTest(description=repr(bad)), self.assertRaises(ValueError):
                main.validate_description(bad)

        async def scenario():
            plugin = main.Plugin()
            text = 'My own Portal summary\nWith two lines and Σ'
            await plugin.save_description('620', text)
            self.assertEqual(main.load_state()['aliases']['620'], 'Portal II')
            self.assertEqual(main.load_state()['descriptions']['620'], text)
            backup = await plugin.create_backup()
            export = await plugin.export_aliases()
            self.assertEqual(json.loads(export)['descriptions']['620'], text)
            await plugin.restore_all_titles({'620': 'Portal II'})
            self.assertEqual(main.load_state()['aliases'], {})
            self.assertEqual(main.load_state()['descriptions']['620'], text)
            await plugin.delete_description('620')
            self.assertEqual(main.load_state()['descriptions'], {})
            await plugin.import_aliases(export)
            self.assertEqual(main.load_state()['descriptions']['620'], text)
            await plugin.delete_description('620')
            await plugin.restore_backup()
            self.assertEqual(main.load_state()['descriptions']['620'], text)
            await plugin.delete_description('620')
            self.assertEqual(main.load_state()['descriptions'], {})
        asyncio.run(scenario())

    def test_snapshot_after_restart_preserves_custom_description_and_game_info_placement(self):
        async def scenario():
            first = main.Plugin()
            await first.set_description_position('game_info')
            await first.save_description('893180', 'Catherine restart verification')
            # A fresh Plugin instance models the backend after Decky/Steam reboot.
            second = main.Plugin()
            snapshot = await second.snapshot()
            self.assertEqual(snapshot['description_position'], 'game_info')
            self.assertEqual(snapshot['descriptions']['893180'], 'Catherine restart verification')
            await second.delete_description('893180')
            restored = await main.Plugin().snapshot()
            self.assertNotIn('893180', restored['descriptions'])
        asyncio.run(scenario())

    def test_restore_original_game_clears_all_per_game_overrides_atomically(self):
        async def scenario():
            plugin = main.Plugin()
            await plugin.save_alias('893180', 'Catherine')
            await plugin.save_description('893180', 'C' * 1409)
            await plugin.save_alias('620', 'Portal II')
            await plugin.save_description('620', 'Portal info')
            await plugin.create_backup()
            result = await plugin.restore_original_game('893180')
            self.assertTrue(result['restored_title'])
            self.assertTrue(result['restored_description'])
            current = main.load_state()
            self.assertNotIn('893180', current['aliases'])
            self.assertNotIn('893180', current['descriptions'])
            self.assertEqual(current['aliases']['620'], 'Portal II')
            self.assertEqual(current['descriptions']['620'], 'Portal info')
            self.assertTrue(result['schema'] == 1)
            self.assertTrue((main.settings_path().with_name('titledeck.backup.json')).exists())
            empty = await plugin.restore_original_game('893180')
            self.assertFalse(empty['restored_title'])
            self.assertFalse(empty['restored_description'])
        asyncio.run(scenario())

    def test_long_descriptions_save_without_cap_and_preserve_existing_backups(self):
        self.assertEqual(main.DESCRIPTION_WARNING_THRESHOLD, 1247)
        for count in (1005, 1020, 1247, 1248, 4000, 6000, 12000):
            with self.subTest(count=count):
                self.assertEqual(len(main.validate_description("A" * count)), count)
        with self.assertRaisesRegex(ValueError, "plain text"):
            main.validate_description("invalid\x01character")

        legacy = main.blank_state()
        legacy["descriptions"] = {"893180": "L" * 4000}
        main.store_state(legacy)
        self.assertEqual(len(main.load_state()["descriptions"]["893180"]), 4000)
        async def scenario():
            plugin = main.Plugin()
            exported = await plugin.export_aliases()
            await plugin.create_backup()
            await plugin.save_alias("620", "Portal II")
            await plugin.save_description("620", "N" * 6000)
            self.assertEqual(len(main.load_state()["descriptions"]["620"]), 6000)
            await plugin.save_description("893180", "N" * 12000)
            self.assertEqual(len(main.load_state()["descriptions"]["893180"]), 12000)
            await plugin.import_aliases(exported)
            self.assertEqual(len(main.load_state()["descriptions"]["893180"]), 4000)
            await plugin.restore_backup()
            self.assertEqual(len(main.load_state()["descriptions"]["893180"]), 4000)
            await plugin.save_description("893180", "A new long synopsis " * 400)
            self.assertGreater(len(main.load_state()["descriptions"]["893180"]), 4000)
        asyncio.run(scenario())

    def test_description_placement_persists_and_roundtrips_backups(self):
        self.assertEqual(main.load_state()["description_position"], "below_play")

        async def scenario():
            plugin = main.Plugin()
            await plugin.save_description("893180", "My Catherine description")
            for bad in ("", "hero", "<script>", 1, None, [], {}):
                with self.subTest(value=bad), self.assertRaises(ValueError):
                    await plugin.set_description_position(bad)
            await plugin.set_description_position("game_info")
            self.assertEqual(main.load_state()["description_position"], "game_info")
            await plugin.set_description_position("hero_footer")
            self.assertEqual(main.load_state()["description_position"], "hero_footer")
            await plugin.create_backup()
            exported = await plugin.export_aliases()
            self.assertEqual(json.loads(exported)["description_position"], "hero_footer")
            await plugin.set_description_position("below_play")
            await plugin.import_aliases(exported)
            self.assertEqual(main.load_state()["description_position"], "hero_footer")
            await plugin.set_description_position("below_play")
            await plugin.restore_backup()
            self.assertEqual(main.load_state()["description_position"], "hero_footer")
            self.assertEqual(main.load_state()["descriptions"]["893180"], "My Catherine description")
            with self.assertRaises(ValueError):
                await plugin.import_aliases(json.dumps({
                    "schema": 1, "aliases": {}, "description_position": "dangerous"
                }))
            self.assertEqual(main.load_state()["description_position"], "hero_footer")
        asyncio.run(scenario())

    def test_installed_multiple_libraries(self):
        home = self.root / 'home'
        mainlib = home / '.local' / 'share' / 'Steam' / 'steamapps'
        extra = self.root / 'sdcard'
        (extra / 'steamapps').mkdir(parents=True)
        mainlib.mkdir(parents=True)
        (mainlib / 'libraryfolders.vdf').write_text('"libraryfolders"\n{\n"1" { "path" "' + str(extra) + '" }\n}', encoding='utf-8')
        (mainlib / 'appmanifest_123.acf').write_text('"AppState"\n{\n"appid" "123"\n"name" "A Game™"\n}', encoding='utf-8')
        (extra / 'steamapps' / 'appmanifest_456.acf').write_text('"AppState"\n{\n"appid" "456"\n"name" "Another Game"\n}', encoding='utf-8')
        games = main.find_installed_games(home)
        self.assertEqual([g['name'] for g in games], ['A Game™', 'Another Game'])

    def test_save_delete_export_import_toggle(self):
        plugin = main.Plugin()
        async def scenario():
            saved = await plugin.save_alias('620', 'Portal 2 Custom')
            self.assertEqual(saved['aliases']['620'], 'Portal 2 Custom')
            await plugin.set_enabled(False)
            self.assertFalse(main.load_state()['enabled'])
            exported = await plugin.export_aliases()
            obj = json.loads(exported)
            self.assertEqual(obj['aliases']['620'], 'Portal 2 Custom')
            await plugin.delete_alias('620')
            self.assertFalse(main.load_state()['aliases'])
            await plugin.import_aliases(exported)
            self.assertEqual(main.load_state()['aliases']['620'], 'Portal 2 Custom')
            self.assertFalse(main.load_state()['enabled'])
            with self.assertRaises(ValueError):
                await plugin.import_aliases('{"schema":1,"aliases":{"NaN":"Bad"}}')
            self.assertEqual(main.load_state()['aliases']['620'], 'Portal 2 Custom')
        asyncio.run(scenario())

    def test_restore_all_requires_matching_confirmation_and_keeps_separate_recovery_backup(self):
        plugin=main.Plugin()
        async def scenario():
            await plugin.save_alias('893180', 'Catherine')
            await plugin.save_alias('270880', 'American Truck')
            manual_backup=await plugin.create_backup()
            old_manual=Path(manual_backup).read_text(encoding='utf-8')
            # A stale confirmation must not delete recently saved aliases.
            with self.assertRaisesRegex(ValueError, 'changed since confirmation'):
                await plugin.restore_all_titles({'893180':'Catherine'})
            self.assertEqual(len(main.load_state()['aliases']), 2)
            aliases=dict(main.load_state()['aliases'])
            result=await plugin.restore_all_titles(aliases)
            self.assertEqual(result['restored_count'],2)
            self.assertEqual(main.load_state()['aliases'],{})
            recovery=main.settings_path().with_name('titledeck.before_restore_all.json')
            self.assertEqual(main.load_state(recovery)['aliases'],aliases)
            self.assertEqual(Path(manual_backup).read_text(encoding='utf-8'),old_manual)
            # Repeated reset cannot erase the original recovery backup.
            result=await plugin.restore_all_titles({})
            self.assertEqual(result['restored_count'],0)
            self.assertEqual(main.load_state(recovery)['aliases'],aliases)
            restored=await plugin.undo_restore_all()
            self.assertEqual(restored['aliases'],aliases)
            self.assertTrue(restored['enabled'])
            self.assertEqual(main.load_state()['aliases'],aliases)
        asyncio.run(scenario())

    def test_undo_does_not_replace_newly_created_titles(self):
        plugin=main.Plugin()
        async def scenario():
            await plugin.save_alias('893180','Catherine')
            await plugin.restore_all_titles({'893180':'Catherine'})
            await plugin.save_alias('620', 'Portal II')
            with self.assertRaisesRegex(ValueError,'New custom titles exist'):
                await plugin.undo_restore_all()
            self.assertEqual(main.load_state()['aliases'],{'620':'Portal II'})
        asyncio.run(scenario())

    def test_restore_all_refuses_invalid_confirmation(self):
        plugin=main.Plugin()
        async def scenario():
            await plugin.save_alias('893180','Catherine')
            for value in [None,{}, {'893180':'Catherine 2'}, {'bad':'Catherine'}]:
                with self.subTest(value=value), self.assertRaises(ValueError):
                    await plugin.restore_all_titles(value)
            self.assertEqual(main.load_state()['aliases'],{'893180':'Catherine'})
        asyncio.run(scenario())


if __name__ == '__main__':
    unittest.main()


class TitleDeck050RecoveryTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        self.orig=os.environ.get('TITLEDECK_TEST_DATA');os.environ['TITLEDECK_TEST_DATA']=self.tmp.name
        self.addCleanup(self.restore_env)
    def restore_env(self):
        if self.orig is None:os.environ.pop('TITLEDECK_TEST_DATA',None)
        else:os.environ['TITLEDECK_TEST_DATA']=self.orig
    def test_recovery_available_only_after_restore_all_and_old_names_survive(self):
        plugin=main.Plugin()
        async def scenario():
            snap=await plugin.snapshot()
            self.assertFalse(snap['recovery']['available'])
            self.assertEqual(snap['recovery']['count'],0)
            await plugin.save_alias('893180','Catherine')
            await plugin.restore_all_titles({'893180':'Catherine'})
            after=await plugin.snapshot()
            self.assertEqual(after['aliases'],{})
            self.assertEqual(after['recovery'],{'available':True,'count':1})
            undo=await plugin.undo_restore_all()
            self.assertEqual(undo['recovered_count'],1)
            self.assertEqual((await plugin.snapshot())['aliases'],{'893180':'Catherine'})
        asyncio.run(scenario())
    def test_manual_backup_status_and_legacy_badge_setting_removed(self):
        plugin=main.Plugin()
        async def scenario():
            self.assertFalse((await plugin.snapshot())['manual_backup']['available'])
            await plugin.save_alias('123','Name')
            await plugin.create_backup()
            self.assertEqual((await plugin.snapshot())['manual_backup'],{'available':True,'count':1})
            await plugin.delete_alias('123')
            await plugin.restore_backup()
            self.assertEqual((await plugin.snapshot())['aliases'],{'123':'Name'})
        asyncio.run(scenario())

class TitleDeck080MigrationAndLargeReset(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        self.old=os.environ.get('TITLEDECK_TEST_DATA');os.environ['TITLEDECK_TEST_DATA']=self.tmp.name
        self.addCleanup(lambda:os.environ.pop('TITLEDECK_TEST_DATA',None) if self.old is None else os.environ.__setitem__('TITLEDECK_TEST_DATA',self.old))
    def test_legacy_badge_setting_is_dropped_but_custom_titles_survive(self):
        path=main.settings_path();path.parent.mkdir(parents=True,exist_ok=True)
        path.write_text(json.dumps({'schema':1,'enabled':True,'show_card_badges':True,'aliases':{'893180':'Catherine'}}))
        old=main.load_state();self.assertEqual(old['aliases'],{'893180':'Catherine'})
        self.assertNotIn('show_card_badges',old)
        main.store_state(old)
        saved=json.loads(path.read_text());self.assertNotIn('show_card_badges',saved)
    def test_large_reset_201_titles_and_exact_recovery(self):
        async def task():
            plugin=main.Plugin()
            names={str(i+10001):f'Preferred title {i:03d}' for i in range(201)}
            for key,title in names.items():await plugin.save_alias(key,title)
            snap=await plugin.snapshot();self.assertEqual(len(snap['aliases']),201)
            removed=await plugin.restore_all_titles(names);self.assertEqual(removed['restored_count'],201)
            self.assertEqual((await plugin.snapshot())['recovery']['count'],201)
            restored=await plugin.undo_restore_all();self.assertEqual(restored['aliases'],names)
        asyncio.run(task())


class ArtworkCacheTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.old = os.environ.get('TITLEDECK_TEST_DATA')
        os.environ['TITLEDECK_TEST_DATA'] = self.temp.name
        self.addCleanup(self.reset_env)

    def reset_env(self):
        if self.old is None:
            os.environ.pop('TITLEDECK_TEST_DATA', None)
        else:
            os.environ['TITLEDECK_TEST_DATA'] = self.old

    def test_artwork_cache_survives_new_backend_instance_and_refresh_can_clear(self):
        async def scenario():
            first = main.Plugin()
            await first.save_cover_cache({'620': 3, '2312439508': 0})
            disk = main.cover_cache_path()
            self.assertTrue(disk.is_file())
            self.assertNotEqual(disk, main.settings_path())
            second = main.Plugin()
            state = await second.snapshot()
            self.assertEqual(state['cover_cache'], {'620': 3, '2312439508': 0})
            self.assertEqual(main.load_state()['aliases'], {})
            await second.save_cover_cache({})
            self.assertEqual(main.load_cover_cache(), {})
        asyncio.run(scenario())

    def test_artwork_cache_rejects_untrusted_indices_and_identifiers(self):
        for bad in ({'../test': 0}, {'620': 18}, {'620': -1}, {'620': True}, {'620': '3'}):
            with self.subTest(cache=bad), self.assertRaises(ValueError):
                main.validate_cover_cache(bad)
        self.assertEqual(main.validate_cover_cache({'620': 6}), {'620': 6})

class LayoutDiagnosticTests(unittest.TestCase):
    def setUp(self):
        self.assertEqual(main.layout_diagnostic_path(),
                         Path('/home/deck/Desktop/TitleDeck/titledeck-game-info-layout.json'))
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.diagnostic_path = Path(self.temp.name) / 'Desktop' / 'TitleDeck' / 'titledeck-game-info-layout.json'
        export_patch = patch.object(main, 'layout_diagnostic_path', return_value=self.diagnostic_path)
        export_patch.start()
        self.addCleanup(export_patch.stop)
        self.old = os.environ.get('TITLEDECK_TEST_DATA')
        os.environ['TITLEDECK_TEST_DATA'] = str(Path(self.temp.name) / 'titledeck')
        self.addCleanup(lambda: os.environ.pop('TITLEDECK_TEST_DATA', None) if self.old is None else os.environ.__setitem__('TITLEDECK_TEST_DATA', self.old))

    def test_ghost_layout_capture_is_bounded_metadata_only_and_does_not_change_settings(self):
        async def go():
            plugin = main.Plugin()
            await plugin.save_description('3500000123', 'My private game description')
            report = {'format':'titledeck-layout-v1', 'records':[{'kind':'nonsteam-game-info', 'nodes':[
                {'label':'poster-sibling','tag':'DIV','cls':'GameInfo_PosterSlot',
                 'rect':{'x':30,'y':300,'w':175,'h':250}, 'css':{'display':'block'},'contents':'empty',
                 'ghost':False,'extra_private_field':'do-not-save'}]}]}
            result = await plugin.save_layout_diagnostic(json.dumps(report))
            self.assertEqual(Path(result['path']), self.diagnostic_path)
            self.assertTrue(self.diagnostic_path.is_file())
            self.assertTrue(self.diagnostic_path.parent.is_dir())
            self.assertEqual(self.diagnostic_path.stat().st_mode & 0o777, 0o644)
            saved = json.loads(Path(result['path']).read_text())
            self.assertEqual(saved['records'][0]['nodes'][0]['cls'], 'GameInfo_PosterSlot')
            self.assertNotIn('extra_private_field', Path(result['path']).read_text())
            self.assertEqual(main.load_state()['descriptions']['3500000123'], 'My private game description')
            self.assertFalse(main.settings_path().with_name('titledeck-game-info-layout.json').exists())
            second = await plugin.save_layout_diagnostic(json.dumps(report))
            self.assertEqual(second['path'], result['path'], 'subsequent captures replace the same Desktop JSON')
            with self.assertRaises(ValueError):
                await plugin.save_layout_diagnostic(json.dumps({'format':'unknown','records':[]}))
        asyncio.run(go())


class TitleDeck115ControllerExportTests(unittest.TestCase):
    def test_controller_diagnostic_uses_desktop_location_and_strips_untrusted_fields(self):
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'titledeck-controller-input.json'
            with patch.object(main, 'controller_diagnostic_path', return_value=path):
                data = {'format':'titledeck-controller-v1', 'registration':'registered',
                        'callbacks':1,'steamSamples':2,'browserSamples':0,'pages':1,
                        'events':[{'kind':'steam-change','controller':0,'buttons':0x040000,
                                   'upper':0,'right':True,'game_name':'SECRET'},
                                  {'kind':'page','delta':1}]}
                result = asyncio.run(main.Plugin().save_controller_diagnostic(json.dumps(data)))
                self.assertEqual(result['path'],str(path))
                report=json.loads(path.read_text())
                self.assertEqual(report['events'][0]['buttons'],0x040000)
                self.assertNotIn('game_name',json.dumps(report))
    def test_native_focus_button_event_is_exported_without_identifying_fields(self):
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / 'titledeck-controller-input.json'
            with patch.object(main, 'controller_diagnostic_path', return_value=path):
                report = {'format':'titledeck-controller-v1', 'registration':'unavailable',
                          'events':[{'kind':'focus-button','delta':1,'source':'steam-focus',
                                     'controller_name':'do not collect'},
                                    {'kind':'page','delta':1,'source':'steam-focus'}]}
                asyncio.run(main.Plugin().save_controller_diagnostic(json.dumps(report)))
                saved = json.loads(path.read_text())
                self.assertEqual(saved['version'],'1.1.6')
                self.assertEqual(saved['events'][0],{'kind':'focus-button','delta':1,'source':'steam-focus'})
                self.assertNotIn('controller_name',json.dumps(saved))
    def test_controller_diagnostic_rejects_malformed_or_excessive_data(self):
        plugin=main.Plugin()
        for data in ('{}','{"format":"wrong","events":[]}',
                     json.dumps({'format':'titledeck-controller-v1','events':[{'kind':'wrong'}]}),
                     json.dumps({'format':'titledeck-controller-v1','events':[{}]*65})):
            with self.assertRaises(ValueError):
                asyncio.run(plugin.save_controller_diagnostic(data))


class LocalArtworkFallbackTests(unittest.TestCase):
    def test_existing_user_grid_art_is_loaded_read_only(self):
        import base64
        with tempfile.TemporaryDirectory() as temp:
            steam = Path(temp) / 'Steam'
            grid = steam / 'userdata' / '123' / 'config' / 'grid'
            grid.mkdir(parents=True)
            content = b'\x89PNG\r\n\x1a\n' + b'test-artwork'
            artwork = grid / '388080p.png'
            artwork.write_bytes(content)
            with patch.object(main, 'steam_roots', return_value=[steam]):
                report = asyncio.run(main.Plugin().get_local_cover('388080'))
            self.assertTrue(report['data_uri'].startswith('data:image/png;base64,'))
            self.assertEqual(base64.b64decode(report['data_uri'].split(',', 1)[1]), content)
            self.assertEqual(artwork.read_bytes(), content, 'read-only access must not alter Steam art')

    def test_grid_fallback_ignores_bad_ids_invalid_images_and_links(self):
        with tempfile.TemporaryDirectory() as temp:
            steam = Path(temp) / 'Steam'
            grid = steam / 'userdata' / '123' / 'config' / 'grid'
            grid.mkdir(parents=True)
            (grid / '620p.png').write_bytes(b'this is not an image')
            with patch.object(main, 'steam_roots', return_value=[steam]):
                self.assertEqual(asyncio.run(main.Plugin().get_local_cover('620')), {'data_uri': ''})
                with self.assertRaises(ValueError):
                    asyncio.run(main.Plugin().get_local_cover('../620'))
            target = Path(temp) / 'outside.jpg'
            target.write_bytes(b'\xff\xd8\xff' + b'image')
            (grid / '620p.jpg').symlink_to(target)
            with patch.object(main, 'steam_roots', return_value=[steam]):
                self.assertEqual(asyncio.run(main.Plugin().get_local_cover('620')), {'data_uri': ''})


class TitleDeck118ArtworkCacheTests(unittest.TestCase):
    def test_existing_steam_librarycache_portrait_is_used_read_only(self):
        with tempfile.TemporaryDirectory() as temp:
            steam = Path(temp)
            cache = steam / 'appcache' / 'librarycache'
            cache.mkdir(parents=True)
            poster = cache / '2958130_library_600x900.jpg'
            original = b'\xff\xd8\xff\xe0JPEG-DATA'
            poster.write_bytes(original)
            with patch.object(main, 'steam_roots', return_value=[steam]):
                result = asyncio.run(main.Plugin().get_local_cover('2958130'))
                self.assertTrue(result['data_uri'].startswith('data:image/jpeg;base64,'))
                self.assertEqual(poster.read_bytes(), original, 'no modification of Steam artwork')
            poster.write_bytes(b'not a real image')
            with patch.object(main, 'steam_roots', return_value=[steam]):
                self.assertEqual(asyncio.run(main.Plugin().get_local_cover('2958130'))['data_uri'], '')

    def test_user_grid_custom_art_is_preferred_over_librarycache(self):
        with tempfile.TemporaryDirectory() as temp:
            steam=Path(temp)
            cache=steam / 'appcache' / 'librarycache'
            cache.mkdir(parents=True)
            (cache / '2958130_library_600x900.jpg').write_bytes(b'\xff\xd8\xff-library')
            grid=steam / 'userdata' / '12345' / 'config' / 'grid'
            grid.mkdir(parents=True)
            (grid / '2958130p.png').write_bytes(b'\x89PNG\r\n\x1a\n-grid')
            with patch.object(main, 'steam_roots', return_value=[steam]):
                result=asyncio.run(main.Plugin().get_local_cover('2958130'))
                self.assertTrue(result['data_uri'].startswith('data:image/png;base64,'))
