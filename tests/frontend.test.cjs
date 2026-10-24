const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
const dist=path.join(root,'dist/index.js');
let moduleCounter=0;
async function moduleForTest(){return import('file://'+dist+'?test='+ ++moduleCounter)}
function walk(n){if(n===undefined||n===null||typeof n!=='object')return[];return[n,...(n.children||[]).flatMap(walk)]}
function resolveButton(n){return typeof n?.type==='function'?n.type({...n.props,children:n.children}):n}
function setupMock({games=[],aliases={},view='library',selected='',draft=''}={}){
  const state={schema:1,enabled:true,aliases,games,manual_backup:{available:false,count:0},recovery:{available:false,count:0}};
  let route, hooks=[],cursor=0;
  const api={routerHook:{addRoute(_name,fn){route=fn},removeRoute(){},addGlobalComponent(){},removeGlobalComponent(){}},call:async name=>name==='snapshot'?state:null};
  const R={
    createElement:(type,props,...children)=>({type,props:props||{},children:children.flat(Infinity).filter(x=>x!==undefined&&x!==false)}),
    Fragment:'fragment',useEffect(){},useRef:v=>({current:v}),useCallback:f=>f,
    useState(initial){const i=cursor++;if(!hooks[i])hooks[i]={value:initial};
      if(i===1 && Array.isArray(initial) && !hooks[i].initialized){hooks[i].value=games;hooks[i].initialized=true}
      if(i===4&&!hooks[i].initialized){hooks[i].value=view;hooks[i].initialized=true}
      if(i===5&&!hooks[i].initialized){hooks[i].value=selected;hooks[i].initialized=true}
      if(i===6&&!hooks[i].initialized){hooks[i].value=draft;hooks[i].initialized=true}
      if(i===5&&!hooks[i].initialized){hooks[i].value=selected;hooks[i].initialized=true}
      if(i===6&&!hooks[i].initialized){hooks[i].value=draft;hooks[i].initialized=true}
      return[hooks[i].value,next=>{hooks[i].value=typeof next==='function'?next(hooks[i].value):next}];
    }
  };
  globalThis.SP_REACT=R;
  globalThis.DFL={DialogButton:'button',Focusable:'focusable',PanelSection:'panel',PanelSectionRow:'row',ButtonItem:'buttonitem',Navigation:{}};
  globalThis.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit={connect:()=>api};
  return{
    state,render(){cursor=0;return route()},
    async init(){const mod=await moduleForTest(),plugin=mod.default();await new Promise(resolve=>setImmediate(resolve));return{mod,plugin}},
    cleanup(){delete globalThis.SP_REACT;delete globalThis.DFL;delete globalThis.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit}
  };
}
test('source and packaged frontend match; approved logo/version consistent',()=>{
 assert.equal(source,fs.readFileSync(dist,'utf8'));
 const p=JSON.parse(fs.readFileSync(path.join(root,'plugin.json'))),pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json')));
 assert.equal(p.version,'0.8.1');assert.equal(pkg.version,'0.8.1');assert(fs.statSync(path.join(root,p.publish.image)).size>10000);
 assert(source.includes('QAM_VERSION_STYLE')&&source.includes('td-version-chip'));
});
test('retired Steam-card badges have no injected adapter and no settings control',async()=>{
 const mod=await moduleForTest();assert.equal(mod.createNativeBadgeAdapter,undefined);
 assert(!source.includes('data-titledeck-native-badge'));
 assert(!source.includes('set_show_card_badges'));
 assert(!source.includes('Show custom-name badges'));
 assert(!source.includes('badgeAdapter'));
});
test('Steam display rename and revert retain working behavior',async()=>{
 const mod=await moduleForTest();
 const node={nodeValue:'Catherine Classic',isConnected:true,parentElement:{isConnected:true,closest:()=>null,className:''}};
 const d={documentElement:{},body:{},createTreeWalker(){let done=false;return {nextNode(){if(done)return null;done=true;return node}}}};
 const state={enabled:true,aliases:{'893180':'Catherine'},games:[{appid:'893180',name:'Catherine Classic'}]};
 const adapter=mod.createTitleAdapter(d,()=>state,()=>null,()=>[]);
 assert.equal(adapter.runNow(),1);assert.equal(node.nodeValue,'Catherine');
 state.aliases={};assert.equal(adapter.runNow(),0);assert.equal(node.nodeValue,'Catherine Classic');
 adapter.stop();
});
test('cleanup never suggests an unchanged game name',async()=>{
 const m=await moduleForTest();assert.equal(m.cleanTitle('Catherine Classic'),'');assert.equal(m.cleanTitle('Command & Conquer™ Remastered Collection'),'Command & Conquer Remastered Collection');
});
test('library columns and row chunks have stable 4-way directional geometry',async()=>{
 const m=await moduleForTest();
 assert.deepEqual([m.columnsForWidth(410),m.columnsForWidth(650),m.columnsForWidth(960),m.columnsForWidth(1280)],[2,3,4,5]);
 const chunks=m.rowChunks(Array.from({length:13},(_,i)=>i),4);
 assert.deepEqual(chunks.map(c=>c.length),[4,4,4,1]);
 assert.equal(m.gridDestination(5,9,40,4),1);
 assert.equal(m.gridDestination(5,10,40,4),9);
 assert.equal(m.gridDestination(5,11,40,4),4);
 assert.equal(m.gridDestination(5,12,40,4),6);
 assert.equal(m.gridDestination(3,12,40,4),null);
});
test('actual manager contains nested horizontal controller rows, not one flat focus list',async()=>{
 const games=Array.from({length:156},(_,i)=>({appid:String(12000+i),name:'Game '+String(i).padStart(3,'0')}));
 const mock=setupMock({games});const {plugin}=await mock.init();try{
  const tree=mock.render(),nodes=walk(tree);
  const grid=nodes.find(n=>n.props.className==='td-grid');assert(grid);assert.equal(grid.type,'focusable');assert.equal(grid.props['flow-children'],'down');
  assert.equal(grid.props['data-td-columns'],4);
  assert.equal(grid.children.length,39);
  grid.children.forEach((row,i)=>{assert.equal(row.type,'focusable');assert.equal(row.props['flow-children'],'right');assert.equal(row.children.length,4);
    row.children.forEach((tile,col)=>assert.equal(tile.props['data-td-focus'],`tile-${i*4+col}`));});
  for(const group of ['filter-row','tool-row']){const row=nodes.find(n=>n.props['data-td-layout']===group);assert(row);assert.equal(row.props['flow-children'],'right')}
 }finally{plugin.onDismount();mock.cleanup()}
});
test('simulated Steam gamepad focus transfers Up/Down/Left/Right to real targets',async()=>{
 const games=Array.from({length:12},(_,i)=>({appid:String(16000+i),name:'Game '+i}));
 const mock=setupMock({games});const {plugin}=await mock.init();try{
  const tree=mock.render(),nodes=walk(tree);
  const root=nodes.find(n=>n.props.className==='td-root');const grid=nodes.find(n=>n.props.className==='td-grid');
  const elements=new Map(), navNodes=[],tileNodes=walk(grid).filter(n=>n.props['data-td-focus']?.startsWith('tile-'));
  let took=null;
  tileNodes.forEach((tile,i)=>{
   const col=i%4,row=Math.floor(i/4),el={ownerDocument:{activeElement:null},
      getBoundingClientRect(){return {left:col*140,top:row*240,right:col*140+135,bottom:row*240+220,width:135,height:220}},
      scrollIntoView(){},focus(){this.ownerDocument.activeElement=this}};
   elements.set(`tile-${i}`,el);
   navNodes.push({m_element:el,BTakeFocus(){took=i;return true}});
  });
  grid.querySelectorAll=()=>[...elements.values()].map((el,i)=>({...el,getAttribute:()=>`tile-${i}`}));
  const container={querySelector(q){if(q==='[data-td-grid="true"]')return grid;const name=/\[data-td-focus="([^"]+)"\]/.exec(q)?.[1];return elements.get(name)||null}};
  root.props.ref.current=container;
  globalThis.DFL.getGamepadNavigationTrees=()=>[{m_Children:navNodes}];
  const from=tileNodes[5].type({...tileNodes[5].props,children:tileNodes[5].children});
  const navigate=d=>{took=null;let stopped=false;const ok=from.props.onGamepadDirection({detail:{button:d},preventDefault(){stopped=true},stopPropagation(){}});assert.equal(ok,true);assert(stopped);return took};
  assert.equal(navigate(9),1);assert.equal(navigate(10),9);assert.equal(navigate(11),4);assert.equal(navigate(12),6);
 }finally{plugin.onDismount();mock.cleanup()}
});
test('Restore All preview has all 201 names and safe deterministic pages',async()=>{
 const m=await moduleForTest(),aliases={};for(let i=0;i<201;i++)aliases[String(20000+i)]=`Alias ${String(i).padStart(3,'0')}`;
 const rows=m.resetReviewRows(aliases,[{appid:'20000',name:'First game original'}]);
 assert.equal(rows.length,201);assert.equal(rows.find(x=>x.appid==='20000').original,'First game original');
 const visited=new Set();for(let page=0;page<40;page++){const p=m.reviewPage(rows,page,6);p.items.forEach(x=>visited.add(x.appid));if(page>=p.pages-1){assert.equal(p.pages,34);break}}
 assert.equal(visited.size,201);assert.equal(m.reviewPage(rows,999,6).items.length,3);
});
test('confirmation UI pages 201 names with visible next/previous and a separate safe Keep action',async()=>{
 const aliases={};for(let i=0;i<201;i++)aliases[String(20000+i)]=`New title ${String(i).padStart(3,'0')}`;
 const mock=setupMock({view:'resetConfirm',aliases});const {plugin}=await mock.init();try{
  const all=[];
  for(let page=0;page<34;page++){
   const tree=mock.render(),nodes=walk(tree),rows=nodes.filter(n=>n.props.className==='td-confirm-example td-review-row');
   assert(rows.length>=1&&rows.length<=6);
   rows.forEach(n=>all.push(n.props.key));
   const prev=nodes.find(n=>n.props['data-td-focus']==='review-prev');
   const next=nodes.find(n=>n.props['data-td-focus']==='review-next');
   const keep=nodes.find(n=>n.props['data-td-focus']==='reset-cancel');
   const confirm=nodes.find(n=>n.props['data-td-focus']==='reset-yes');
   assert(prev&&next&&keep&&confirm);
   assert.equal(prev.props.disabled,page===0);assert.equal(next.props.disabled,page===33);
   assert(!keep.props.disabled);
   if(page<33)next.props.onClick();
  }
  assert.equal(new Set(all).size,201);
 }finally{plugin.onDismount();mock.cleanup()}
});
test('legacy badge preference remains gone while backup/reset API contracts are intact',()=>{
 assert(source.includes("call('restore_all_titles',{...aliases})"));
 assert(source.includes("safeCall('undo_restore_all'"));
 assert(source.includes("h(Toast,{notice})"));
 assert(source.includes('tdToastCountdown'));
 assert(source.includes('td-review-pager'));
 assert(source.includes('No changes happen until confirmation'));
});

test('all game editors use true two-row focus groups and explicit action handlers',async()=>{
  for (const [id,name,alias] of [['893180','Catherine Classic','Catherine'],['270880','American Truck Simulator',null]]){
    const games=[{appid:id,name,installed:true}];
    const mock=setupMock({games,aliases:alias?{[id]:alias}:{}});
    const {plugin}=await mock.init();
    try {
      const library=mock.render(),tile=walk(library).find(n=>n.props['data-td-focus']==='tile-0');
      assert(tile,'game must be present');
      tile.props.onClick();
      const tree=mock.render(),nodes=walk(tree);
      const rows=nodes.find(n=>['editor-rows','editor-grid'].includes(n.props['data-td-layout']));
      assert(rows,`missing editor rows for ${name}`);
      assert.equal(rows.props['flow-children'],'down');
      assert.deepEqual(rows.children.map(r=>r.props['flow-children']),['right','right']);
      assert.deepEqual(rows.children.map(r=>r.children.map(b=>b.props['data-td-focus'])),[
        ['edit-name','edit-clean'],['edit-save','edit-restore']
      ]);
      for (const key of ['edit-back','edit-name','edit-clean','edit-save','edit-restore']){
        const button=nodes.find(n=>n.props['data-td-focus']===key);
        assert.equal(typeof resolveButton(button)?.props?.onGamepadDirection,'function',`${name} ${key} has no D-pad handler`);
      }
      assert.equal(nodes.find(n=>n.props['data-td-focus']==='edit-restore').props.disabled,!alias);
    }finally{plugin.onDismount();mock.cleanup()}
  }
});
test('editor arrow map behaves as a real 2x2 grid and skips disabled actions',async()=>{
  const m=await moduleForTest(),g=m.editorDestination;
  const available={canSave:true,canRestore:true};
  assert.deepEqual([g('edit-name',9,available),g('edit-name',10,available),g('edit-name',11,available),g('edit-name',12,available)],['edit-back','edit-save',null,'edit-clean']);
  assert.deepEqual([g('edit-clean',9,available),g('edit-clean',10,available),g('edit-clean',11,available),g('edit-clean',12,available)],['edit-back','edit-restore','edit-name',null]);
  assert.deepEqual([g('edit-save',9,available),g('edit-save',12,available),g('edit-restore',9,available),g('edit-restore',11,available)],['edit-name','edit-restore','edit-clean','edit-save']);
  assert.equal(g('edit-name',10,{canSave:false,canRestore:true}),'edit-restore');
  assert.equal(g('edit-clean',10,{canSave:true,canRestore:false}),'edit-save');
  assert.equal(g('edit-save',12,{canSave:true,canRestore:false}),null);
  assert.equal(g('edit-clean',10,{canSave:false,canRestore:false}),null);
  assert.equal(g('edit-back',10,available),'edit-name');
  assert.equal(g('close',10,available),'edit-back');
});

test('every game editor has true 2-by-2 native focus groups and an explicit D-pad map',async()=>{
 for(const game of [
   {appid:'893180',name:'Catherine Classic',alias:'Catherine'},
   {appid:'34590',name:'Command & Conquer™ Remastered Collection',alias:'Command & Conquer Remastered Collection'}
 ]){
   const mock=setupMock({games:[{appid:game.appid,name:game.name}],aliases:{[game.appid]:game.alias},view:'editor',selected:game.appid,draft:game.alias});
   const {plugin}=await mock.init();try{
     const tree=mock.render(),nodes=walk(tree);
     const group=nodes.find(n=>['editor-rows','editor-grid'].includes(n.props['data-td-layout']));
     assert(group,'missing editor focus group: '+nodes.map(n=>String(n.props?.['data-td-layout']||n.props?.className||n.props?.['data-td-focus']||'')).filter(Boolean).join('|'));
     assert.equal(group.type,'focusable');assert.equal(group.props['flow-children'],'down');
     const rows=group.children;
     assert.equal(rows.length,2);rows.forEach(row=>{assert.equal(row.type,'focusable');assert.equal(row.props['flow-children'],'right');assert.equal(row.children.length,2)});
     assert.deepEqual(rows.flatMap(row=>row.children.map(button=>button.props['data-td-focus'])),['edit-name','edit-clean','edit-save','edit-restore']);
     const elements=new Map(),navNodes=[];
     for(const button of rows.flatMap(r=>r.children)){
       const key=button.props['data-td-focus'];
       const el={disabled:Boolean(button.props.disabled),ownerDocument:{activeElement:null},getAttribute:()=>null,scrollIntoView(){},focus(){this.ownerDocument.activeElement=this}};
       elements.set(key,el);navNodes.push({m_element:el,BTakeFocus(){this.focused=true;return true}});
     }
     const root=nodes.find(n=>n.props.className==='td-root');
     root.props.ref.current={querySelector(q){const key=/\[data-td-focus="([^"]+)"\]/.exec(q)?.[1];return elements.get(key)||null}};
     globalThis.DFL.getGamepadNavigationTrees=()=>[{m_Children:navNodes}];
     const buttons=new Map(rows.flatMap(r=>r.children.map(x=>[x.props['data-td-focus'],x])));
     function move(key,d){navNodes.forEach(x=>x.focused=false);let consumed=false;
       assert.equal(resolveButton(buttons.get(key)).props.onGamepadDirection({detail:{button:d},preventDefault(){consumed=true},stopPropagation(){}}),true);
       assert(consumed,`${key} ${d} did not consume gamepad input`);
       return [...elements.keys()].filter((k,i)=>navNodes[i].focused);
     }
     assert.deepEqual(move('edit-name',12),['edit-clean']);
     assert.deepEqual(move('edit-clean',11),['edit-name']);
     assert.deepEqual(move('edit-name',10),['edit-save']);
     assert.deepEqual(move('edit-clean',10),['edit-restore']);
     assert.deepEqual(move('edit-save',9),['edit-name']);
     assert.deepEqual(move('edit-restore',9),['edit-clean']);
     assert.deepEqual(move('edit-save',12),['edit-restore']);
     assert.deepEqual(move('edit-restore',11),['edit-save']);
   }finally{plugin.onDismount();mock.cleanup()}
 }
});
test('editor directional focus skips disabled Restore original for a new alias',async()=>{
 const mock=setupMock({games:[{appid:'620',name:'Portal 2'}],aliases:{},view:'editor',selected:'620',draft:'Portal Two'});
 const {plugin}=await mock.init();try{
   const tree=mock.render(),nodes=walk(tree);
   const buttons=nodes.filter(n=>['edit-name','edit-clean','edit-save','edit-restore'].includes(n.props['data-td-focus']));
   const restore=buttons.find(n=>n.props['data-td-focus']==='edit-restore');assert.equal(restore.props.disabled,true);
   const elements=new Map(),navNodes=[];
   for(const button of buttons){const key=button.props['data-td-focus'];const el={disabled:!!button.props.disabled,ownerDocument:{activeElement:null},getAttribute:()=>null,scrollIntoView(){},focus(){this.ownerDocument.activeElement=this}};elements.set(key,el);navNodes.push({m_element:el,BTakeFocus(){this.focused=true;return true}})}
   const root=nodes.find(n=>n.props.className==='td-root');root.props.ref.current={querySelector(q){const key=/\[data-td-focus="([^"]+)"\]/.exec(q)?.[1];return elements.get(key)||null}};
   globalThis.DFL.getGamepadNavigationTrees=()=>[{m_Children:navNodes}];
   const clean=buttons.find(n=>n.props['data-td-focus']==='edit-clean');let stopped=false;
   assert.equal(resolveButton(clean).props.onGamepadDirection({detail:{button:10},preventDefault(){stopped=true},stopPropagation(){}}),true);
   assert(stopped);assert.equal(navNodes.find(n=>n.focused)?.m_element,elements.get('edit-save'));
 }finally{plugin.onDismount();mock.cleanup()}
});
