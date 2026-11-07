import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The package manifest is the single version authority; all installed
// runtime files must identify the same version.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const write = (rel, data) => fs.writeFileSync(path.join(root, rel), data);
const pkg = JSON.parse(read('package.json'));
const version = pkg.version;
const check = process.argv.includes('--check');
if (!/^\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?$/.test(version)) {
  throw new Error('Invalid TitleDeck version: '+version);
}
const plugin = JSON.parse(read('plugin.json'));
if (plugin.name !== 'TitleDeck' || plugin.api_version !== 1) {
  throw new Error('Plugin metadata does not describe TitleDeck');
}
let changed = [];
const sync = (rel, expected) => {
  if (read(rel) === expected) return;
  if (check) throw new Error(rel+' is not synchronized with '+version);
  write(rel, expected);
  changed.push(rel);
};
const newPlugin = {...plugin, version};
sync('plugin.json', JSON.stringify(newPlugin,null,2)+'\n');
const source = read('src/index.js');
const matcher = /(const PLUGIN = 'TitleDeck', PLUGIN_VERSION = ')[^']+(', ROUTE = '\/titledeck\/manager';)/;
if (!matcher.test(source)) throw new Error('Missing version declaration in source');
const updated = source.replace(matcher, (_all,a,b)=>a+version+b);
sync('src/index.js',updated);
sync('dist/index.js',updated);
if (!read('README.md').includes('1.4.0') && check && version==='1.4.0') {
  throw new Error('Public README must identify stable 1.4.0');
}
if (!read('CHANGELOG.md').includes('## '+version)) throw new Error('Changelog missing '+version);
console.log('TitleDeck version '+version+' '+(check?'verified':'synchronized')+(changed.length?' ['+changed.join(', ')+']':''));
