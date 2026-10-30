const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
async function load(){return import('file://'+path.join(root,'dist/index.js')+'?rightStick='+Date.now()+Math.random());}

test('draft bridge matches the submitted Decky runtime, stable metadata stays 1.2.1',()=>{
  assert.equal(fs.readFileSync(path.join(root,'src/index.js'),'utf8'),fs.readFileSync(path.join(root,'dist/index.js'),'utf8'));
  assert.equal(JSON.parse(fs.readFileSync(path.join(root,'plugin.json'))).version,'1.2.1');
});

test('scroll only succeeds when a Steam Game Info ancestor actually moves',async()=>{
  const m=await load();
  const doc={defaultView:{getComputedStyle:()=>({overflowY:'auto'})}};
  const scroller={scrollTop:0,scrollHeight:1100,clientHeight:250,parentElement:null};
  const panel={ownerDocument:doc,parentElement:scroller};
  assert.equal(m.scrollGameInfoElementByStick(panel,1),true);
  assert.equal(scroller.scrollTop,25);
  assert.equal(m.scrollGameInfoElementByStick(panel,-1),true);
  assert.equal(scroller.scrollTop,0);
  assert.equal(m.scrollGameInfoElementByStick(panel,-1),false,'no false positive at upper scroll limit');
  const blocked={scrollHeight:1100,clientHeight:250,parentElement:null,get scrollTop(){return 0},set scrollTop(_v){}};
  assert.equal(m.scrollGameInfoElementByStick({ownerDocument:doc,parentElement:blocked},1),false,'a clipped Steam element cannot claim scroll success');
});

test('when the first Game Info scroller is at its end, try its outer native Steam scroller',async()=>{
  const m=await load(),doc={defaultView:{getComputedStyle:()=>({overflowY:'auto'})}};
  const outer={scrollTop:0,scrollHeight:1800,clientHeight:500,parentElement:null};
  const inner={scrollTop:400,scrollHeight:500,clientHeight:100,parentElement:outer};
  const panel={ownerDocument:doc,parentElement:inner};
  assert.equal(m.scrollGameInfoElementByStick(panel,1),true);
  assert.equal(inner.scrollTop,400);
  assert.equal(outer.scrollTop,25);
});

test('native Steam Deck input is registered after a delayed SteamClient mount and stops cleanly',async()=>{
  const m=await load();
  let tick,callback,unregistered=0,cleared=0;const scrolled=[];
  const env={SteamClient:{},navigator:{getGamepads:()=>[]},
    setInterval(fn){tick=fn;return 9},clearInterval(){cleared++}};
  const bridge=m.createControllerScrollBridge(()=>({scrollByStick(amount){scrolled.push(amount);return true}}),env);
  bridge.start();
  assert.equal(bridge.diagnostics.registration,'unavailable');
  env.SteamClient.Input={RegisterForControllerStateChanges(fn){callback=fn;return {unregister(){unregistered++}}}};
  tick();
  assert.equal(bridge.diagnostics.registration,'registered');
  callback([{unControllerIndex:0,sRightStickY:-32767}]);
  tick();
  assert(scrolled.some(n=>n>0.99),'native Steam signed-Y should scroll downward');
  assert.equal(bridge.diagnostics.lastSource,'steam');
  callback([{unControllerIndex:0,sRightStickY:0}]);
  const prior=scrolled.length;
  tick();assert.equal(scrolled.length,prior,'centered right stick must not scroll');
  bridge.stop();assert.equal(unregistered,1);assert.equal(cleared,1);
});

test('browser controller fallback survives native Steam subscription absence',async()=>{
  const m=await load();let tick,axis=0;
  const values=[];
  const env={navigator:{getGamepads:()=>[{connected:true,axes:[0,0,0,axis]}]},setInterval(fn){tick=fn;return 4},clearInterval(){}};
  const bridge=m.createControllerScrollBridge(()=>({scrollByStick(n){values.push(n);return true}}),env);
  bridge.start();axis=0.8;tick();
  assert(values.length>0&&values[0]>0);
  assert.equal(bridge.diagnostics.lastSource,'browser');
  bridge.stop();
});
