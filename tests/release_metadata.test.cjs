const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const json = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));

test('0.9.2 stable release metadata matches the packaged runtime', () => {
  const plugin = json('plugin.json');
  const pkg = json('package.json');
  assert.equal(plugin.name, 'TitleDeck');
  assert.equal(plugin.version, '0.9.2');
  assert.equal(pkg.version, plugin.version);
  assert.equal(plugin.api_version, 1);
  const src = fs.readFileSync(path.join(root, 'src/index.js'), 'utf8');
  const dist = fs.readFileSync(path.join(root, 'dist/index.js'), 'utf8');
  assert.equal(src, dist);
  assert(src.includes('0.9.2'));
});

test('stable release docs disclose hardware limits and long description advisory', () => {
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8');
  for (const item of ['physical Steam Deck', 'ROG Ally', 'Android/DroidDeck', 'Game Info', '1,247']) {
    assert(readme.includes(item), item);
    assert(changelog.includes(item), item);
  }
});
