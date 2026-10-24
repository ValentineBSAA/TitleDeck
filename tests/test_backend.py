import asyncio
import json
import os
import tempfile
import unittest
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
