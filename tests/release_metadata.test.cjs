const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const json=n=>JSON.parse(fs.readFileSync(path.join(root,n),'utf8'));
test('0.9.0 RC metadata, source and distributable are consistent',()=>{
 const plugin=json('plugin.json'),pkg=json('package.json');
 assert.equal(plugin.name,'TitleDeck');assert.equal(plugin.version,'0.9.0-rc.1');
 assert.equal(pkg.version,plugin.version);assert.equal(plugin.api_version,1);
 const a=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
 const b=fs.readFileSync(path.join(root,'dist/index.js'),'utf8');
 assert.equal(a,b);assert(a.includes("PLUGIN_VERSION = '0.9.0-rc.1'"));
});
test('RC readme discloses physical Deck baseline, unsupported hardware and intermittent B bug',()=>{
 const readme=fs.readFileSync(path.join(root,'README.md'),'utf8');
 const ch=fs.readFileSync(path.join(root,'CHANGELOG.md'),'utf8');
 for(const phrase of ['physical Steam Deck','ROG Ally','Android/DroidDeck','Done editing','metadata','Sims 4']){
  assert(readme.includes(phrase),phrase);assert(ch.includes(phrase),phrase);
 }
 assert(readme.includes('unverified'));
});
