const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root,f),'utf8');
const source = read('src/index.js');
test('all public version declarations are 1.4.0', () => {
  const p = JSON.parse(read('package.json'));
  const m = JSON.parse(read('plugin.json'));
  assert.equal(p.version,'1.4.0');
  assert.equal(m.version,'1.4.0');
  assert.equal(m.name,'TitleDeck');
  assert.equal(m.api_version,1);
  assert.match(source,/PLUGIN_VERSION\s*=\s*'1\.4\.0'/);
});
test('published direct frontend module is identical to source', () =>
  assert.equal(read('src/index.js'),read('dist/index.js')));
test('Art Hero customization is described as read-only', () => {
  const doc=read('docs/ART_HERO_COMPATIBILITY.md');
  assert.match(doc,/read.only/i);
  assert.match(doc,/CSS Loader/);
  assert.match(read('README.md'),/Art Hero/);
});
test('the published 1.4.0 gallery has 22 distinct images', () => {
  const d=path.join(root,'docs/screenshots/v1.4.0');
  const all=fs.readdirSync(d).filter(x=>x.endsWith('.jpeg'));
  assert.equal(all.length,22);
  assert.equal(new Set(all).size,22);
  assert.match(read('docs/SCREENSHOTS.md'),/22 real/);
});
test('documentation preserves the requested closing line and known issue',()=>{
  assert(read('README.md').includes("your titles you're deck!"));
  assert(read('README.md').includes('issues/8'));
  assert(read('SOURCE.md').includes('1.4.0'));
});
