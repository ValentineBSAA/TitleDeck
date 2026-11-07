const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');

test('historical 1.2.2 runtime and manifests still agree until source synchronization',()=>{
  const plugin=JSON.parse(read('plugin.json'));
  const pkg=JSON.parse(read('package.json'));
  assert.equal(plugin.version,'1.2.2');
  assert.equal(pkg.version,'1.2.2');
  assert.equal(plugin.name,'TitleDeck');
  assert.equal(plugin.api_version,1);
  assert.equal(read('src/index.js'),read('dist/index.js'));
  assert(read('src/index.js').includes("PLUGIN_VERSION = '1.2.2'"));
});

test('public documentation describes the published 1.4.0 release and its real limits',()=>{
  const readme=read('README.md');
  const release=read('docs/RELEASE_NOTES_1.4.0.md');
  const gallery=read('docs/SCREENSHOTS.md');
  for (const word of ['1.4.0','physical Steam Deck','right-stick','Art Hero','read-only',"your titles you're deck!"]){
    assert(readme.includes(word),word);
  }
  assert(release.includes('79'));
  assert(release.includes('five Python'));
  assert(gallery.includes('22 real'));
  assert(gallery.includes('screenshots/v1.4.0/'));
  assert(fs.existsSync(path.join(root,'docs/screenshots/v1.4.0/01-steam-home-custom-text-glow.jpeg')));
  assert(fs.existsSync(path.join(root,'docs/screenshots/v1.4.0/22-art-hero-placement-explanation.jpeg')));
  assert(read('SOURCE.md').includes('still based on 1.2.2'));
});
