const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('public 1.1.8 runtime and manifests agree',()=>{
  const plugin=JSON.parse(read('plugin.json'));
  const pkg=JSON.parse(read('package.json'));
  assert.equal(plugin.version,'1.1.8');
  assert.equal(pkg.version,'1.1.8');
  assert.equal(plugin.name,'TitleDeck');
  assert.equal(plugin.api_version,1);
  assert.equal(read('src/index.js'),read('dist/index.js'));
  assert(read('src/index.js').includes("PLUGIN_VERSION = '1.1.8'"));
});
test('public README accurately discloses hardware boundaries and known scrolling bug',()=>{
  const readme=read('README.md');
  for(const word of ['1.1.8','Catherine Classic','Most Wanted','physical Steam Deck','ROG Ally','right-stick']){
    assert(readme.includes(word),word);
  }
  assert(read('docs/SCREENSHOTS.md').includes('23 real Steam Deck'));
});
