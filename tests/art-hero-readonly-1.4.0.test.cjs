const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
const src=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
const mod=()=>import(pathToFileURL(path.join(root,'src/index.js')));
globalThis.SP_REACT={createElement:()=>null};globalThis.DFL={};
test('1.4.0 shows Art Hero current Carousel Font Height without changing it',async()=>{
  const m=await mod();
  let rpcCalls=0;
  assert.equal(m.artHeroFontHeightGuide({settings:[{name:'Carousel Font Height',value:'11'}]}).direction,'Below cards');
  const result=await m.writeArtHeroNativePlacement('top',()=>({call:async()=>{rpcCalls++;return []}}));
  assert.equal(result.ok,false);assert.equal(result.readonly,true);assert.equal(rpcCalls,0);
  assert.match(result.reason,/view-only/i);
});
test('Art Hero mode disables both placement buttons and keeps diagram and owner visible',()=>{
  const block=src.slice(src.indexOf("h('div',{className:'td-arthero-bridge'"),src.indexOf("artHeroManaged?h(UI.Focusable",src.indexOf("h('div',{className:'td-arthero-bridge'")));
  assert.match(block,/Art Hero controls placement · Read-only mirror/);
  assert.match(block,/View only/);
  assert.match(block,/focus:'setting-home-place-above',disabled:artHeroManaged/);
  assert.match(block,/focus:'setting-home-place-footer',disabled:artHeroManaged/);
  assert.match(block,/td-arthero-schematic/);
  assert.doesNotMatch(block,/selectArtHeroSide\(/);
  assert.doesNotMatch(block,/set_patch_of_theme/);
});
test('TitleDeck placement settings stay available when Art Hero is off',async()=>{
  const m=await mod();
  assert.equal(m.artHeroOwnsHomeAlignment({detected:true,active:true}),true);
  assert.equal(m.artHeroOwnsHomeAlignment({detected:true,active:false}),false);
  assert.equal(m.artHeroOwnsHomeAlignment({detected:false,active:false}),false);
  assert.match(src,/if\(!artHeroManaged\)selectTitleDeckPlacement\('top'\)/);
  assert.match(src,/if\(!artHeroManaged\)selectTitleDeckPlacement\('bottom'\)/);
});
test('Art Hero legacy adapters only dispatch read-only get_themes',()=>{
  const bridge=src.slice(src.indexOf('function cssLoaderLegacy()'),src.indexOf('function setArtHeroPolicy('));
  assert.doesNotMatch(bridge,/'set_patch_of_theme'/);
  assert.match(bridge,/only reads CSS Loader themes/);
  assert.doesNotMatch(src,/selectArtHeroSide/);
});
test('release manifests match and Settings focus preservation exists',()=>{
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  const plugin=JSON.parse(fs.readFileSync(path.join(root,'plugin.json'),'utf8'));
  assert.equal(pkg.version,'1.4.0');assert.equal(plugin.version,'1.4.0');
  assert.equal(pkg.license,'MIT');assert.equal(src,fs.readFileSync(path.join(root,'dist/index.js'),'utf8'));
  assert.match(src,/focused===button&&scroller\.contains\(button\)/);
  assert.match(src,/if\(destination&&focusNode\(destination\)\)/);
});
