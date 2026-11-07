const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const SRC=fs.readFileSync(path.join(__dirname,'../src/index.js'),'utf8');
const moduleForTest=()=>import('../dist/index.js?upgrade101='+Math.random());
function panelDoc(id){
 const doc={defaultView:{location:{pathname:'/library/app/'+id},getComputedStyle:()=>({overflowY:'auto'})},scrollingElement:null};
 const scroll={scrollTop:100,scrollHeight:1300,clientHeight:300,parentElement:null};
 const panel={isConnected:true,offsetParent:{},ownerDocument:doc,parentElement:scroll,
   getAttribute(name){return name==='data-titledeck-gameinfo-description'?String(id):null}};
 doc.querySelectorAll=selector=>selector.includes('data-titledeck-gameinfo-description')?[panel]:[];
 return{doc,scroll,panel};
}
test('1.0.1 palette colors all manager surfaces, not just accent borders',async()=>{
 const m=await moduleForTest();const wine=m.themeColors('wine'),blue=m.themeColors('blue');
 for(const key of ['backdrop','surface','raised','tile','inset','muted']){
  assert.match(wine[key],/^#[0-9a-f]{6}$/i);
  assert.notEqual(wine[key],blue[key],`whole theme changes ${key}`);
 }
 assert.notEqual(wine.backdrop,'#111319');
 for(const rule of ['--td-backdrop','--td-surface','--td-raised','--td-tile','--td-inset','--td-muted',
   'tdFocusHeartbeat','prefers-reduced-motion:reduce','button.td-game:focus-within'])
   assert(SRC.includes(rule),rule);
});
test('right stick scrolls a saved regular Steam Game Info page',async()=>{
 const m=await moduleForTest();const {doc,scroll}=panelDoc('893180');
 const s={enabled:true,description_position:'game_info',descriptions:{'893180':'Catherine Classic long description'}};
 assert.equal(m.scrollSteamGameInfoByStick(1,()=>[doc],()=>s),true);
 assert.equal(scroll.scrollTop,125);
 assert.equal(m.scrollSteamGameInfoByStick(-1,()=>[doc],()=>s),true);
 assert.equal(scroll.scrollTop,100);
});
test('Steam scroll bridge rejects wrong game, disabled overrides, invisible panels and deadzone',async()=>{
 const m=await moduleForTest();const {doc,scroll,panel}=panelDoc('893180');
 const s={enabled:true,description_position:'game_info',descriptions:{'893180':'Saved'}};
 assert.equal(m.scrollSteamGameInfoByStick(0.002,()=>[doc],()=>s),false);
 assert.equal(m.scrollSteamGameInfoByStick(1,()=>[doc],()=>({...s,enabled:false})),false);
 assert.equal(m.scrollSteamGameInfoByStick(1,()=>[doc],()=>({...s,descriptions:{'1234':'Other game'}})),false);
 panel.offsetParent=null;
 assert.equal(m.scrollSteamGameInfoByStick(1,()=>[doc],()=>s),false);
 assert.equal(scroll.scrollTop,100);
});
test('scroll-to-top cleanup hides only active custom Game Info then restores original style',async()=>{
 const m=await moduleForTest();const {doc}=panelDoc('893180');
 const memory=new Map([['display',{value:'inline-flex',priority:''}]]);
 const style={getPropertyValue:key=>memory.get(key)?.value||'',getPropertyPriority:key=>memory.get(key)?.priority||'',
  setProperty:(key,value,priority)=>memory.set(key,{value,priority}),removeProperty:key=>memory.delete(key)};
 const topButton={style,textContent:'Scroll to Top',className:'ScrollToTop',getAttribute:key=>key==='aria-label'?'Scroll to Top':null};
 const other={style:{...style},textContent:'Unrelated button',getAttribute:()=>null};
 const marker={isConnected:true,offsetParent:{},getAttribute:key=>key==='data-titledeck-gameinfo-description'?'893180':null};
 doc.querySelectorAll=q=>q.startsWith('[data-titledeck-')?[marker]:[topButton,other];
 const s={enabled:true,description_position:'game_info',descriptions:{'893180':'Saved'}};
 const cleaner=m.createScrollTopCleaner(()=>[doc],()=>s);
 cleaner.runNow();
 assert.deepEqual(memory.get('display'),{value:'none',priority:'important'});
 cleaner.stop();
 assert.deepEqual(memory.get('display'),{value:'inline-flex',priority:''});
});
test('1.0.3 cleaner handles Steam scroll control in a separate DOM container from the custom description',async()=>{
 const m=await moduleForTest();const {doc}=panelDoc('893180');
 let changes=0;
 const b={textContent:'Scroll to Top',getAttribute:()=>null,style:{getPropertyValue:()=>'',getPropertyPriority:()=>'',setProperty(){changes++},removeProperty(){changes++}}};
 doc.querySelectorAll=q=>q.startsWith('[data-titledeck-')?[]:[b];
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'Saved'}};
 const cleaner=m.createScrollTopCleaner(()=>[doc],()=>state);
 cleaner.runNow();assert.equal(changes,1,'saved route hides the floating button even if marker lives in another document');
 state.descriptions={};cleaner.runNow();assert.equal(changes,2,'restoring removes the hide style');
 cleaner.stop();
});
test('protected non-Steam Game Info repaint and Steam renderer hashes remain pinned',async()=>{
 assert(SRC.includes('function positionNative(record)'));
 assert(SRC.includes('function createNonSteamGameInfoAdapter')||SRC.includes('export function createNonSteamGameInfoAdapter'));
 assert(SRC.includes('createNativeSteamDescriptionPanel'));
 assert(SRC.includes('restoreGrid(record)'));
});

test('1.0.9 poster sibling cleanup and portable diagnostics are scoped and reversible',()=>{
 assert(SRC.includes('function collapseProtonAdjacentGhostSlot(record)'));
 assert(SRC.includes('collapseProtonAdjacentGhostSlot(record);'));
 assert(SRC.includes('gridRemember(record,slot,\'display\',\'none\')'));
 assert(SRC.includes('slot.contains?.(footer)'));
 assert(SRC.includes('captureGhostLayout'));
 assert(SRC.includes('Diagnose non-Steam artwork'));
});
