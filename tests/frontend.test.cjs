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
function setupMock({games=[],aliases={},descriptions={},description_position='below_play',view='library',selected='',draft=''}={}){
  const state={schema:1,enabled:true,aliases,descriptions,description_position,games,manual_backup:{available:false,count:0},recovery:{available:false,count:0}};
  let route, hooks=[],cursor=0,refs=[],refCursor=0;
  const api={routerHook:{addRoute(_name,fn){route=fn},removeRoute(){},addGlobalComponent(){},removeGlobalComponent(){}},call:async (name,...args)=>{
    if(name==='snapshot')return state;
    if(name==='save_description'){state.descriptions[String(args[0])]=args[1];return state;}
    if(name==='delete_description'){delete state.descriptions[String(args[0])];return state;}
    if(name==='restore_original_game'){
      const id=String(args[0]);
      const restored_title=Object.hasOwn(state.aliases,id),restored_description=Object.hasOwn(state.descriptions,id);
      delete state.aliases[id];delete state.descriptions[id];
      return {...state,restored_title,restored_description};
    }
    if(name==='set_description_position'){state.description_position=args[0];return state;}
    return null;
  }};
  const R={
    createElement:(type,props,...children)=>({type,props:props||{},children:children.flat(Infinity).filter(x=>x!==undefined&&x!==false)}),
    Fragment:'fragment',useEffect(){},useRef(v){const i=refCursor++;if(!refs[i])refs[i]={current:v};return refs[i]},useCallback:f=>f,
    useState(initial){const i=cursor++;if(!hooks[i])hooks[i]={value:typeof initial==='function'?initial():initial};
      if(i===2 && Array.isArray(hooks[i].value) && !hooks[i].initialized){hooks[i].value=games;hooks[i].initialized=true}
      if(i===5&&!hooks[i].initialized){hooks[i].value=view;hooks[i].initialized=true}
      if(i===6&&!hooks[i].initialized){hooks[i].value=selected;hooks[i].initialized=true}
      if(i===7&&!hooks[i].initialized){hooks[i].value=draft;hooks[i].initialized=true}
      if(i===6&&!hooks[i].initialized){hooks[i].value=selected;hooks[i].initialized=true}
      if(i===7&&!hooks[i].initialized){hooks[i].value=draft;hooks[i].initialized=true}
      return[hooks[i].value,next=>{hooks[i].value=typeof next==='function'?next(hooks[i].value):next}];
    }
  };
  globalThis.SP_REACT=R;
  globalThis.DFL={DialogButton:'button',Focusable:'focusable',PanelSection:'panel',PanelSectionRow:'row',ButtonItem:'buttonitem',Navigation:{}};
  globalThis.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit={connect:()=>api};
  return{
    state,render(){cursor=0;refCursor=0;if(!Array.isArray(hooks[2]?.value)){hooks=[];refs=[];}return route()},
    async init(){const mod=await moduleForTest(),plugin=mod.default();await new Promise(resolve=>setImmediate(resolve));return{mod,plugin}},
    cleanup(){delete globalThis.SP_REACT;delete globalThis.DFL;delete globalThis.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit}
  };
}
test('source and packaged frontend match; approved logo/version consistent',()=>{
 assert.equal(source,fs.readFileSync(dist,'utf8'));
 const p=JSON.parse(fs.readFileSync(path.join(root,'plugin.json'))),pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json')));
 assert.equal(p.version,'1.2.1');assert.equal(pkg.version,'1.2.1');assert(fs.statSync(path.join(root,p.publish.image)).size>10000);
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
test('TitleDeck skips game-title replacement inside Decky Plugin Store and GTM surfaces',async()=>{
 const m=await moduleForTest();
 const ordinary={nodeValue:'Catherine Classic',isConnected:true,
   parentElement:{isConnected:true,closest:()=>null,className:'steam-library-title'}};
 const plugin={nodeValue:'Catherine Classic',isConnected:true,
   parentElement:{isConnected:true,className:'decky-PluginStore-title',
     closest(sel){return sel.includes('[class*="decky"')?this:null}}};
 const d={documentElement:{},body:{},createTreeWalker(){
   const nodes=[ordinary,plugin];let i=0;return{nextNode(){return nodes[i++]||null}};
 }};
 const state={enabled:true,aliases:{'893180':'Catherine'},games:[{appid:'893180',name:'Catherine Classic'}]};
 const overlay=m.createTitleAdapter(d,()=>state,()=>null,()=>[]);
 try{
  assert.equal(overlay.runNow(),1);
  assert.equal(ordinary.nodeValue,'Catherine');
  assert.equal(plugin.nodeValue,'Catherine Classic','never rewrite plugin storefront UI text');
  state.aliases={};
  assert.equal(overlay.runNow(),0);
  assert.equal(ordinary.nodeValue,'Catherine Classic');
 }finally{overlay.stop()}
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
      assert.equal(nodes.find(n=>n.props['data-td-focus']==='edit-restore').props.disabled,false,'Restore original remains available for saved aliases and unsaved drafts');
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
test('editor directional focus reaches Restore original even for an unsaved draft',async()=>{
 const mock=setupMock({games:[{appid:'620',name:'Portal 2'}],aliases:{},view:'editor',selected:'620',draft:'Portal Two'});
 const {plugin}=await mock.init();try{
   const tree=mock.render(),nodes=walk(tree);
   const buttons=nodes.filter(n=>['edit-name','edit-clean','edit-save','edit-restore'].includes(n.props['data-td-focus']));
   const restore=buttons.find(n=>n.props['data-td-focus']==='edit-restore');assert.equal(restore.props.disabled,false);
   const elements=new Map(),navNodes=[];
   for(const button of buttons){const key=button.props['data-td-focus'];const el={disabled:!!button.props.disabled,ownerDocument:{activeElement:null},getAttribute:()=>null,scrollIntoView(){},focus(){this.ownerDocument.activeElement=this}};elements.set(key,el);navNodes.push({m_element:el,BTakeFocus(){this.focused=true;return true}})}
   const root=nodes.find(n=>n.props.className==='td-root');root.props.ref.current={querySelector(q){const key=/\[data-td-focus="([^"]+)"\]/.exec(q)?.[1];return elements.get(key)||null}};
   globalThis.DFL.getGamepadNavigationTrees=()=>[{m_Children:navNodes}];
   const clean=buttons.find(n=>n.props['data-td-focus']==='edit-clean');let stopped=false;
   assert.equal(resolveButton(clean).props.onGamepadDirection({detail:{button:10},preventDefault(){stopped=true},stopPropagation(){}}),true);
   assert(stopped);assert.equal(navNodes.find(n=>n.focused)?.m_element,elements.get('edit-restore'));
 }finally{plugin.onDismount();mock.cleanup()}
});


function makeSteamDOM(names=['Catherine Classic']){
  const watchers=[];
  const doc={};
  class TestMutationObserver{
    constructor(callback){this.callback=callback;this.disconnected=false;watchers.push(this)}
    observe(target,options){this.target=target;this.options=options}
    disconnect(){this.disconnected=true}
    trigger(records){if(!this.disconnected)this.callback(records)}
  }
  const parent=(className='',role='')=>({
    isConnected:true,className,ownerDocument:doc,
    closest(selector){
      if(selector.includes('[role="dialog"]')&&role==='dialog')return this;
      if(selector.includes('[data-titledeck-ui]')&&this.titledeck)return this;
      return null;
    }
  });
  const text=(label,element=parent())=>({nodeType:3,nodeValue:label,isConnected:true,parentElement:element});
  const nodes=names.map(label=>text(label));
  doc.documentElement={nodeType:1,childNodes:nodes};
  doc.body={nodeType:1,childNodes:nodes};
  doc.defaultView={MutationObserver:TestMutationObserver,NodeFilter:{SHOW_TEXT:4},getComputedStyle:()=>({display:'block'})};
  doc.createTreeWalker=(root)=>{
    const candidates=[];
    const visit=(node)=>{
      if(!node)return;
      if(node.nodeType===3)candidates.push(node);
      for(const kid of node.childNodes||[])visit(kid);
    };
    visit(root);
    let i=0;return{nextNode:()=>candidates[i++]||null};
  };
  return{doc,nodes,watchers,parent,text};
}

test('Steam replacing the same title text node is corrected during mutation delivery',async()=>{
  const m=await moduleForTest(),fake=makeSteamDOM(),state={enabled:true,aliases:{'893180':'Catherine'},games:[{appid:'893180',name:'Catherine Classic'}]};
  const overlay=m.createTitleAdapter(fake.doc,()=>state,()=>null,()=>[]);
  try{
    overlay.start();assert.equal(fake.nodes[0].nodeValue,'Catherine');
    assert.equal(fake.watchers.length,1);
    assert.equal(fake.watchers[0].options.characterData,true);
    fake.nodes[0].nodeValue='Catherine Classic';
    fake.watchers[0].trigger([{type:'characterData',target:fake.nodes[0]}]);
    assert.equal(fake.nodes[0].nodeValue,'Catherine');
    assert.equal(overlay.applied,1);
    assert.equal(overlay.scans,1,'fast correction must not wait for full DOM rescan');
    assert(overlay.fastPasses>=1);
    // Self-generated mutation must be idempotent, not an observer feedback loop.
    fake.watchers[0].trigger([{type:'characterData',target:fake.nodes[0]}]);
    assert.equal(fake.nodes[0].nodeValue,'Catherine');
    assert.equal(overlay.scans,1);
  }finally{overlay.stop()}
  assert.equal(fake.nodes[0].nodeValue,'Catherine Classic');
  assert(fake.watchers[0].disconnected);
});

test('Steam virtualized tiles are renamed as soon as a new subtree is inserted',async()=>{
  const m=await moduleForTest(),fake=makeSteamDOM(),state={enabled:true,aliases:{'893180':'Catherine'},games:[{appid:'893180',name:'Catherine Classic'}]};
  const overlay=m.createTitleAdapter(fake.doc,()=>state,()=>null,()=>[]);
  try{
    overlay.start();
    const newText=fake.text('Catherine Classic');
    const newTile={nodeType:1,childNodes:[newText]};
    fake.doc.body.childNodes.push(newTile);
    fake.watchers[0].trigger([{type:'childList',target:fake.doc.body,addedNodes:[newTile]}]);
    assert.equal(newText.nodeValue,'Catherine');
    assert.equal(overlay.applied,2);
    assert.equal(overlay.scans,1);
    // Detached virtualized card no longer needs preservation or rewriting.
    newText.isConnected=false;
    fake.watchers[0].trigger([{type:'childList',target:fake.doc.body,addedNodes:[]}]);
  }finally{overlay.stop()}
});

test('Steam options-menu headings may be renamed, while editable and Decky fields are excluded',async()=>{
  const m=await moduleForTest(),fake=makeSteamDOM([]);
  const dialogText=fake.text('Catherine Classic',fake.parent('','dialog'));
  const decky=fake.parent();decky.titledeck=true;
  const ownText=fake.text('Catherine Classic',decky);
  const editable=fake.parent();editable.closest=sel=>sel.includes('[contenteditable]')?editable:null;
  const inputText=fake.text('Catherine Classic',editable);
  fake.doc.body.childNodes.push(dialogText,ownText,inputText);
  const state={enabled:true,aliases:{'893180':'Catherine'},games:[{appid:'893180',name:'Catherine Classic'}]};
  const overlay=m.createTitleAdapter(fake.doc,()=>state,()=>null,()=>[]);
  try{
    overlay.start();assert.equal(dialogText.nodeValue,'Catherine');
    assert.equal(ownText.nodeValue,'Catherine Classic');
    assert.equal(inputText.nodeValue,'Catherine Classic');
  }finally{overlay.stop()}
});

test('changed and disabled aliases restore safely without touching unrelated Steam titles',async()=>{
  const m=await moduleForTest(),fake=makeSteamDOM(['Catherine Classic','Other Game']);
  const state={enabled:true,aliases:{'893180':'Catherine'},games:[{appid:'893180',name:'Catherine Classic'}]};
  const overlay=m.createTitleAdapter(fake.doc,()=>state,()=>null,()=>[]);
  try{
    overlay.start();assert.equal(fake.nodes[0].nodeValue,'Catherine');
    assert.equal(fake.nodes[1].nodeValue,'Other Game');
    state.aliases={'893180':'Katherine'};overlay.runNow();
    assert.equal(fake.nodes[0].nodeValue,'Katherine');
    fake.nodes[0].nodeValue='Catherine Classic';
    fake.watchers[0].trigger([{type:'characterData',target:fake.nodes[0]}]);
    assert.equal(fake.nodes[0].nodeValue,'Katherine');
    state.enabled=false;overlay.runNow();
    assert.equal(fake.nodes[0].nodeValue,'Catherine Classic');
    fake.watchers[0].trigger([{type:'characterData',target:fake.nodes[0]}]);
    assert.equal(fake.nodes[0].nodeValue,'Catherine Classic');
  }finally{overlay.stop()}
});

test('conflicting game identities with the same original title are not blindly rewritten',async()=>{
  const m=await moduleForTest(),fake=makeSteamDOM(['Duplicate Title']);
  const state={enabled:true,aliases:{'11':'A','12':'B'},games:[{appid:'11',name:'Duplicate Title'},{appid:'12',name:'Duplicate Title'}]};
  const overlay=m.createTitleAdapter(fake.doc,()=>state,()=>null,()=>[]);
  try{overlay.start();assert.equal(fake.nodes[0].nodeValue,'Duplicate Title');assert.equal(overlay.applied,0)}finally{overlay.stop()}
});

test('fast scrolling through multiple Steam tiles uses mutation updates, not a delayed full scan',async()=>{
  const m=await moduleForTest(),fake=makeSteamDOM([]);
  const state={enabled:true,aliases:{'893180':'Catherine','620':'Portal'},games:[{appid:'893180',name:'Catherine Classic'},{appid:'620',name:'Portal™'}]};
  const overlay=m.createTitleAdapter(fake.doc,()=>state,()=>null,()=>[]);
  try{
    overlay.start();
    const watched=fake.watchers[0];
    for(let i=0;i<100;i++){
      const original=i%2===0?'Catherine Classic':'Portal™';
      const node=fake.text(original),tile={nodeType:1,childNodes:[node]};
      watched.trigger([{type:'childList',addedNodes:[tile]}]);
      assert.equal(node.nodeValue,original==='Catherine Classic'?'Catherine':'Portal');
      node.isConnected=false;
    }
    assert.equal(overlay.scans,1,'quick scroll must not schedule full document scans for each tile');
    assert.equal(overlay.fastPasses,100);
  }finally{overlay.stop()}
});


test('0.8.3 uses Steam native text entry instead of TitleDeck alphabet grid for all three tasks',async()=>{
 assert(!source.includes('function Keypad('));
 assert(!source.includes('CONTROLLER KEYBOARD'));
 assert(!source.includes('td-keygrid'));
 assert(!source.includes("enterView('keyboard','key-0')"));
 const views=['keyboard','search','appid'];
 for(const view of views){
   const mock=setupMock({view,games:[{appid:'893180',name:'Catherine Classic'}],selected:'893180',draft:'Catherine'});
   const {mod,plugin}=await mock.init();
   try{
     const nodes=walk(mock.render());
     const component=nodes.find(n=>n.type===mod.NativeTextEntry);
     assert(component,`${view} should render native entry component`);
     assert.equal(component.props.kind,view==='keyboard'?'title':view==='search'?'search':'id');
     globalThis.DFL.TextField='steam-text-field';
     const rendered=mod.NativeTextEntry(component.props),children=walk(rendered);
     assert(children.some(n=>n.type==='steam-text-field'),`${view} should use Decky native TextField`);
     assert(children.some(n=>n.props['data-td-focus']==='native-done'));
     assert(children.some(n=>n.props['data-td-focus']==='native-cancel'));
     assert(!children.some(n=>String(n.props['data-td-focus']||'').startsWith('key-')));
   }finally{plugin.onDismount();mock.cleanup()}
 }
});

test('native Steam text fields accept typing, physical keyboard input, and Enter confirmation',async()=>{
 const mock=setupMock({view:'keyboard',games:[{appid:'893180',name:'Catherine Classic'}],selected:'893180',draft:'Catherine Classic'});
 const {mod,plugin}=await mock.init();
 try{
   globalThis.DFL.TextField='steam-text-field';
   const component=walk(mock.render()).find(n=>n.type===mod.NativeTextEntry);
   const rendered=mod.NativeTextEntry(component.props);
   const nodes=walk(rendered);
   const field=nodes.find(n=>n.type==='steam-text-field');
   assert(field&&typeof field.props.onChange==='function');
   field.props.onChange({target:{value:'Catherine'}});
   assert.equal(mock.render().type,'focusable');
   const done=nodes.find(n=>n.props['data-td-focus']==='native-done');
   done.props.onClick();
   const editor=walk(mock.render());
   assert(editor.some(n=>n.props['data-td-focus']==='edit-save'));
   assert(editor.some(n=>n.type===mod.InlineGameNameField&&n.props.value==='Catherine'));
 }finally{plugin.onDismount();mock.cleanup()}
});

test('native input reads Steam keyboard paste that bypasses React change events',async()=>{
 let effect,updates=[],submitted=null,interval,cleanup;
 const input={value:'Old name',focus(){}};
 const listeners={};
 const win={setInterval(fn){interval=fn;return 8},clearInterval(){},setTimeout(){return 9},clearTimeout(){}};
 const wrap={querySelector(){return input},ownerDocument:{defaultView:win},
   addEventListener(k,fn){listeners[k]=fn},removeEventListener(k){delete listeners[k]}};
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children:children.flat()}),
   useRef:val=>({current:val}),useEffect:fn=>{effect=fn}};
 globalThis.DFL={TextField:'steam-text-field',Focusable:'focusable',DialogButton:'button'};
 const module=await moduleForTest();
 try{
   const n=module.NativeTextEntry({value:'Old name',setValue:v=>updates.push(v),done:v=>{submitted=v},cancel:()=>{},kind:'title'});
   n.props.ref.current=wrap;
   cleanup=effect();
   const field=walk(n).find(x=>x.type==='steam-text-field');
   assert(field);assert.equal(field.props.value,'Old name');
   input.value='Pasted™ name';
   interval(); // Steam's overlay paste did not emit an onChange
   assert.deepEqual(updates,['Pasted™ name']);
   const done=walk(n).find(x=>x.props['data-td-focus']==='native-done');
   done.props.onClick();
   assert.equal(submitted,'Pasted™ name');
   assert.equal(module.textFromNativeEvent({target:{value:'Normal typing'}}),'Normal typing');
 }finally{cleanup?.();delete globalThis.DFL;delete globalThis.SP_REACT}
});


test('0.8.4 Steam keyboard detector accepts visible full overlay only',async()=>{
 const m=await moduleForTest();
 const fake=(rect,style={display:'block',visibility:'visible',opacity:'1'})=>({
   querySelectorAll:()=>[{getBoundingClientRect:()=>rect}],
   defaultView:{innerWidth:1280,innerHeight:800,getComputedStyle:()=>style},
   documentElement:{clientWidth:1280,clientHeight:800}
 });
 assert.equal(m.steamKeyboardVisible([fake({left:0,right:1280,width:1280,top:395,bottom:800,height:405})]),true);
 assert.equal(m.steamKeyboardVisible([fake({width:50,top:750,bottom:800,height:50})]),false);
 assert.equal(m.steamKeyboardVisible([fake({width:1250,top:0,bottom:10,height:10})]),false);
 assert.equal(m.steamKeyboardVisible([fake({width:1280,top:400,bottom:800,height:400},{display:'none'})]),false);
 assert.equal(m.steamKeyboardVisible([]),false);
});
test('0.8.10 single-surface editor keeps save controls and tracks keyboard visibility',async()=>{
 assert(source.includes('td-game-editor-card'));
 assert(source.includes('data-td-inline-game-name'));
 assert(source.includes('h(InlineGameNameField,{value:draft'));
 assert(source.includes('Start observing *before* Steam takes the input into its OSK process.'));
 assert(!source.includes("onKeyboardState:setNativeLifted,onKeyboardDismiss:cancelTitleEdit"));
 assert(!source.includes("data-td-layout':'inline-title-entry"));
 assert(!source.includes('td-custom-keyboard'));
});

test('Change Name activates a field on the ORIGINAL game editor, not another route',async()=>{
 const mock=setupMock({games:[{appid:'893180',name:'Catherine Classic'}],aliases:{'893180':'Catherine'},selected:'893180',draft:'Catherine',view:'editor'});
 const {mod,plugin}=await mock.init();
 try{
   let clicked=0,focused=0;
   const field={focus(){focused++},click(){clicked++}};const wrapper={querySelector(){return field}};
   const nodes=walk(mock.render()),root=nodes.find(n=>n.props.className==='td-root');
   root.props.ref.current={querySelector(q){return q.includes('data-td-inline-game-name')?wrapper:null}};
   const change=nodes.find(n=>n.props['data-td-focus']==='edit-name');change.props.onClick();
   assert.equal(clicked,1,'OSK input clicked automatically');assert.equal(focused,1);
   const after=walk(mock.render());
   assert(after.some(n=>n.type===mod.InlineGameNameField&&n.props.value==='Catherine'));
   for(const key of ['edit-name','edit-clean','edit-save','edit-restore'])assert(after.some(n=>n.props['data-td-focus']===key),`${key} must remain on the SAME page`);
   assert(!after.some(n=>n.props['data-td-layout']==='inline-title-entry'),'no secondary title page');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('typing through inline native field changes only draft until explicit Save',async()=>{
 const mock=setupMock({view:'editor',selected:'893180',draft:'Catherine',games:[{appid:'893180',name:'Catherine Classic'}],aliases:{'893180':'Catherine'}});
 const {mod,plugin}=await mock.init();
 try{
  globalThis.DFL.TextField='steam-field';
  let component=walk(mock.render()).find(n=>n.type===mod.InlineGameNameField);assert(component);
  let field=walk(mod.InlineGameNameField(component.props)).find(n=>n.type==='steam-field');
  field.props.onChange({target:{value:'Catherine Extended'}});
  const after=walk(mock.render());
  assert(after.some(n=>n.type===mod.InlineGameNameField&&n.props.value==='Catherine Extended'));
  assert(after.some(n=>n.props['data-td-focus']==='edit-save'));
  assert.equal(mock.state.aliases['893180'],'Catherine','typing must not persist an alias');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('Steam native keyboard opens automatically after Change Name mount, not upon mere focus; dismiss notification lowers',async()=>{
  const originalR=globalThis.SP_REACT,originalUI=globalThis.DFL,originalSteam=globalThis.SteamClient;
  let effect,cleanup,keyboardDismiss=()=>{},unregistered=0;
  const intervals=[],timers=[],handlers={};
  globalThis.SP_REACT={
    createElement:(type,props,...children)=>({type,props:props||{},children}),
    useRef:value=>({current:value}),useEffect:fn=>{effect=fn}
  };
  globalThis.DFL={Focusable:'focusable',TextField:'textfield'};
  globalThis.SteamClient={Input:{RegisterForUserDismissKeyboardMessages(cb){keyboardDismiss=cb;return{unregister(){unregistered++}}}}};
  try{
    const mod=await moduleForTest(),classes=new Set();
    const root={classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),toggle:(x,b)=>b?classes.add(x):classes.delete(x)}};
    let keyboardVisible=false,activated=0,focused=0;
    const keyboard={getBoundingClientRect:()=>({width:800,height:270,bottom:700,top:420})};
    const doc={defaultView:{innerWidth:1000,innerHeight:700,setTimeout(fn,delay){const v={fn,delay};timers.push(v);return timers.length},clearTimeout(){},setInterval(fn){intervals.push(fn);return 1},clearInterval(){},getComputedStyle(){return{display:'block',visibility:'visible',opacity:'1'}}},documentElement:{clientWidth:1000,clientHeight:700},querySelectorAll(){return keyboardVisible?[keyboard]:[]}};
    const field={value:'Catherine',focus(){focused++;handlers.focusin?.()},click(){activated++;handlers.click?.({target:{matches:x=>x==='input,textarea'}})}};
    const node={ownerDocument:doc,closest(){return root},querySelector(q){return q==='input,textarea'?field:null},addEventListener(k,fn){handlers[k]=fn},removeEventListener(k){delete handlers[k]}};
    const transitions=[];
    const tree=mod.NativeTextEntry({value:'Catherine',setValue:()=>{},done:()=>{},cancel:()=>{},onKeyboardState:x=>transitions.push(x)});
    tree.props.ref.current=node;
    cleanup=effect();
    assert.equal(classes.has('td-native-keyboard-open'),false,'the editor stays down before the keyboard');
    handlers.focusin?.();
    assert.equal(classes.has('td-native-keyboard-open'),false,'mere focus must not lift the editor');
    const launch=timers.find(t=>t.delay===90);assert(launch,'mount should request keyboard');launch.fn();
    assert.equal(activated,1,'native input click requested automatically');
    assert(focused>=1);
    assert.equal(classes.has('td-native-keyboard-open'),false,'click request alone does not lift immediately');
    keyboardVisible=true;intervals[0]();
    assert.equal(classes.has('td-native-keyboard-open'),true,'observed overlay moves input above keyboard');
    keyboardVisible=false;keyboardDismiss();
    assert.equal(classes.has('td-native-keyboard-open'),false,'Steam dismiss event returns editor');
    assert.deepEqual(transitions,[true,false]);
    cleanup();cleanup=null;
    assert.equal(unregistered,1,'Steam callback unsubscribed');
  }finally{cleanup?.();globalThis.SP_REACT=originalR;globalThis.DFL=originalUI;globalThis.SteamClient=originalSteam;}
});

test('separate Steam CEF keyboard may lift after launch and returns on Steam dismiss notification',async()=>{
 const originalR=globalThis.SP_REACT,originalUI=globalThis.DFL,originalSteam=globalThis.SteamClient;
 let effect,cleanup,dismiss;
 const timers=[];
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children}),useRef:value=>({current:value}),useEffect:fn=>{effect=fn}};
 globalThis.DFL={Focusable:'focusable',TextField:'textfield'};
 globalThis.SteamClient={Input:{RegisterForUserDismissKeyboardMessages:fn=>{dismiss=fn;return{unregister(){}}}}};
 try{
   const mod=await moduleForTest(),classes=new Set(),handlers={};
   const root={classList:{toggle:(k,on)=>on?classes.add(k):classes.delete(k),remove:k=>classes.delete(k)}};
   const doc={defaultView:{setTimeout(fn,delay){const t={fn,delay};timers.push(t);return timers.length},clearTimeout(){},setInterval(){return 1},clearInterval(){}},querySelectorAll(){return[]}};
   const field={value:'Catherine',focus(){handlers.focusin?.()},click(){}};
   const node={ownerDocument:doc,closest(){return root},querySelector(){return field},addEventListener(k,fn){handlers[k]=fn},removeEventListener(k){delete handlers[k]}};
   const tree=mod.NativeTextEntry({value:'Catherine',setValue:()=>{},done:()=>{},cancel:()=>{}});
   tree.props.ref.current=node;
   cleanup=effect();
   timers.find(t=>t.delay===90).fn();
   assert(!classes.has('td-native-keyboard-open'));
   timers.find(t=>t.delay===360).fn();
   assert(classes.has('td-native-keyboard-open'),'inaccessible CEF overlay is inferred after launch settles');
   dismiss();
   assert(!classes.has('td-native-keyboard-open'),'native dismiss signal lowers independent of input focus');
 }finally{cleanup?.();globalThis.SP_REACT=originalR;globalThis.DFL=originalUI;globalThis.SteamClient=originalSteam;}
});

test('Steam Keyboard.RegisterForStatus closes the OSK and exits title editing after slide-down',async()=>{
 const initialR=globalThis.SP_REACT,initialDFL=globalThis.DFL,initialSteam=globalThis.SteamClient;
 let effect,cleanup,statusCallback=null,unregistered=0,fieldValue='Catherine';
 const timers=[],transitions=[],dismissed=[];
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children}),useRef:v=>({current:v}),useEffect:fn=>{effect=fn}};
 globalThis.DFL={TextField:'textfield',Focusable:'focusable'};
 const keyboard={RegisterForStatus(fn){assert.equal(this,keyboard,'status method needs correct Steam receiver');statusCallback=fn;return{unregister(){unregistered++}}}};
 globalThis.SteamClient={Keyboard:keyboard,Input:{}};
 try{
  const mod=await moduleForTest(),classes=new Set();
  const root={classList:{toggle:(k,v)=>v?classes.add(k):classes.delete(k),remove:k=>classes.delete(k)}};
  const doc={defaultView:{setTimeout(fn,ms){timers.push({fn,ms});return timers.length},clearTimeout(){},setInterval(){return 12},clearInterval(){}},querySelectorAll:()=>[]};
  const field={get value(){return fieldValue},focus(){},click(){}};
  const node={ownerDocument:doc,closest:()=>root,querySelector:()=>field,addEventListener(){},removeEventListener(){}};
  const tree=mod.NativeTextEntry({value:'Catherine',setValue:()=>{},done:()=>{},cancel:()=>{},kind:'title',onKeyboardState:v=>transitions.push(v),onKeyboardDismiss:reason=>dismissed.push(reason)});
  tree.props.ref.current=node;
  cleanup=effect();
  assert.equal(typeof statusCallback,'function');
  statusCallback(false); // initial status is closed, but editing should remain active
  assert.deepEqual(dismissed,[]);
  timers.find(t=>t.ms===90).fn();
  statusCallback(true);assert(classes.has('td-native-keyboard-open'));
  fieldValue='Catherine Renamed';
  statusCallback(false);assert(!classes.has('td-native-keyboard-open'),'slide-down starts on keyboard close');
  assert.deepEqual(dismissed,[],'retain inline editor during animation');
  const exit=timers.find(t=>t.ms===300);assert(exit,'exit should follow CSS transition');exit.fn();
  assert.deepEqual(dismissed,['status']);
  assert.deepEqual(transitions,[true,false]);
  statusCallback(false);assert.equal(dismissed.length,1,'a second close notification must not exit twice');
  cleanup();cleanup=null;
  assert.equal(unregistered,1);
 }finally{cleanup?.();globalThis.SP_REACT=initialR;globalThis.DFL=initialDFL;globalThis.SteamClient=initialSteam}
});

test('Steam can swallow B and dismiss OSK without another TitleDeck route or callback',async()=>{
 const mock=setupMock({view:'editor',selected:'893180',draft:'Catherine',games:[{appid:'893180',name:'Catherine Classic'}],aliases:{'893180':'Catherine'}});
 const {mod,plugin}=await mock.init();
 try{
  const before=walk(mock.render());
  // Steam owns the keyboard window and consumes the B event, so NO onCancel
  // is invoked on the Decky route. The game editor must already be behind it.
  assert(before.some(n=>n.type===mod.InlineGameNameField));
  assert(before.some(n=>n.props['data-td-focus']==='edit-save'));
  assert(before.some(n=>n.props['data-td-focus']==='edit-name'));
  const after=walk(mock.render()); // OSK has disappeared; TitleDeck got no event.
  assert(after.some(n=>n.type===mod.InlineGameNameField));
  assert(after.some(n=>n.props['data-td-focus']==='edit-restore'));
  assert.equal(mock.state.aliases['893180'],'Catherine','OSK dismissal never auto-saves');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('keyboard status parser only accepts actual visibility booleans',async()=>{
 const {keyboardStatusOpen}=await moduleForTest();
 assert.equal(keyboardStatusOpen(true),true);
 assert.equal(keyboardStatusOpen(false),false);
 assert.equal(keyboardStatusOpen({m_bIsKeyboardOpen:false}),false);
 assert.equal(keyboardStatusOpen({isOpen:true}),true);
 assert.equal(keyboardStatusOpen({m_bOpen:true}),null,'game key event is not the standalone OSK status');
 assert.equal(keyboardStatusOpen(undefined),null);
});


test('controller state B bit triggers keyboard close and cancels edit when Steam CEF consumes B',async()=>{
 const oldR=globalThis.SP_REACT,oldUI=globalThis.DFL,oldSteam=globalThis.SteamClient;
 let effect,cleanup,stateChange,unregistered=0,hides=0;
 const timers=[],states=[],dismisses=[];
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children}),useRef:v=>({current:v}),useEffect:fn=>{effect=fn}};
 globalThis.DFL={TextField:'textfield',Focusable:'focusable'};
 const inputApi={RegisterForControllerStateChanges(cb){assert.equal(this,inputApi);stateChange=cb;return{unregister(){unregistered++}}}};
 globalThis.SteamClient={Keyboard:{Hide(){hides++}},Input:inputApi};
 try{
  const mod=await moduleForTest(),classes=new Set(),handlers={};
  const root={classList:{toggle:(k,on)=>on?classes.add(k):classes.delete(k),remove:k=>classes.delete(k)}};
  const win={setTimeout(fn,ms){timers.push({fn,ms});return timers.length},clearTimeout(){},setInterval(){return 5},clearInterval(){}};
  const doc={defaultView:win,querySelectorAll(){return[]}};
  let typed='Catherine Renamed';
  const field={get value(){return typed},focus(){},click(){}};
  const node={ownerDocument:doc,closest(){return root},querySelector:()=>field,addEventListener(k,fn){handlers[k]=fn},removeEventListener(k){delete handlers[k]}};
  const tree=mod.NativeTextEntry({value:'Catherine',setValue(){},done(){throw Error('B must not accept')},cancel(){},kind:'title',onKeyboardState:v=>states.push(v),onKeyboardDismiss:reason=>dismisses.push(reason)});
  tree.props.ref.current=node;
  cleanup=effect();
  assert.equal(typeof stateChange,'function');
  stateChange([{unControllerIndex:0,ulButtons:0}]);
  assert(!classes.has('td-native-keyboard-open'));
  timers.find(t=>t.ms===90).fn();
  timers.find(t=>t.ms===360).fn();
  assert(classes.has('td-native-keyboard-open'));
  stateChange([{unControllerIndex:0,ulButtons:1<<23}]); // A must not close
  assert.equal(hides,0);
  stateChange([{unControllerIndex:0,ulButtons:0}]);
  stateChange([{unControllerIndex:0,ulButtons:0x200000}]); // B
  assert(!classes.has('td-native-keyboard-open'),'B lowers panel');
  assert.equal(hides,1,'B requests native keyboard dismissal');
  stateChange([{unControllerIndex:0,ulButtons:0x200000}]); // held B shouldn't repeat
  const exit=timers.find(t=>t.ms===300);assert(exit);exit.fn();
  assert.deepEqual(dismisses,['controller-B']);
  assert.deepEqual(states,[true,false]);
  cleanup();cleanup=null;
  assert.equal(unregistered,1,'controller observation unsubscribed');
 }finally{cleanup?.();globalThis.SP_REACT=oldR;globalThis.DFL=oldUI;globalThis.SteamClient=oldSteam}
});

test('controller B utility distinguishes B from face A and uses explicit boolean if available',async()=>{
 const {controllerBDown}=await moduleForTest();
 assert.equal(controllerBDown({ulButtons:0}),false);
 assert.equal(controllerBDown({ulButtons:0x200000}),true);
 assert.equal(controllerBDown({ulButtons:0x800000}),false);
 assert.equal(controllerBDown({bB:true}),true);
 assert.equal(controllerBDown({bB:false,ulButtons:0x200000}),false);
 assert.equal(controllerBDown({buttonB:true}),true);
 assert.equal(controllerBDown({}),false);
});

test('separate keyboard dismissal requires no callback to expose Save/Restore again',async()=>{
 const mock=setupMock({view:'editor',selected:'893180',draft:'Catherine',games:[{appid:'893180',name:'Catherine Classic'}],aliases:{'893180':'Catherine'}});
 const {mod,plugin}=await mock.init();
 try{
  const component=walk(mock.render()).find(n=>n.type===mod.InlineGameNameField);
  component.props.setValue('Unsaved new title');
  // No Steam visibility or dismiss callback at all. The UI must remain in editor.
  const screen=walk(mock.render());
  assert(screen.some(n=>n.props['data-td-focus']==='edit-save'));
  assert(screen.some(n=>n.props['data-td-focus']==='edit-restore'));
  assert(screen.some(n=>n.type===mod.InlineGameNameField&&n.props.value==='Unsaved new title'));
  assert.equal(mock.state.aliases['893180'],'Catherine','draft is never autosaved');
 }finally{plugin.onDismount();mock.cleanup()}
});


test('single-screen game name field syncs Steam paste without a React onChange',async()=>{
 const originalR=globalThis.SP_REACT,originalDFL=globalThis.DFL;
 let effect,cleanup,syncTick;let typed='Catherine';const updates=[];
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children:children.flat()}),useRef:v=>({current:v}),useState:v=>[v,()=>{}],useEffect:fn=>{effect=fn}};
 globalThis.DFL={TextField:'steam-field'};
 const {InlineGameNameField}=await moduleForTest();
 try{
  const input={get value(){return typed}},listeners={},win={setInterval(fn){syncTick=fn;return 1},clearInterval(){},setTimeout(){}};
  const wrap={ownerDocument:{defaultView:win},querySelector(){return input},addEventListener(k,fn){listeners[k]=fn},removeEventListener(k){delete listeners[k]}};
  const tree=InlineGameNameField({value:'Catherine',setValue:v=>updates.push(v)});
  tree.props.ref.current=wrap;cleanup=effect();
  typed='Catherine™';syncTick();assert.deepEqual(updates,['Catherine™']);
  assert(walk(tree).some(n=>n.type==='steam-field'));
 }finally{cleanup?.();globalThis.SP_REACT=originalR;globalThis.DFL=originalDFL}
});

test('0.8.10 inline motion remains down until keyboard requested and is reversible', async()=>{
 const {createInlineKeyboardMotion}=await moduleForTest();
 const classes=new Set(),phases=[];
 const root={classList:{toggle(n,value){value?classes.add(n):classes.delete(n)}},setAttribute(n,v){if(n==='data-td-keyboard-phase')phases.push(v)}};
 const motion=createInlineKeyboardMotion(root);
 assert.equal(motion.raised,false);
 motion.begin();assert.equal(motion.requested,true);assert.equal(motion.raised,false,'click alone is not OSK visibility');
 motion.show();assert.equal(classes.has('td-inline-keyboard-open'),true);
 motion.hide();assert.equal(motion.requested,false);assert.equal(classes.has('td-inline-keyboard-open'),false);
 motion.show();assert.equal(motion.raised,false,'late OSK event must not raise a closed session');
 assert.deepEqual(phases,['opening','open','closed']);
});

test('physical gamepad B only triggers on a new press, not held state',async()=>{
 const {gamepadBEdge}=await moduleForTest();
 const pads=pressed=>[{connected:true,buttons:[{pressed:false},{pressed}]}];
 let r=gamepadBEdge(pads(false));assert.equal(r.fresh,false);
 r=gamepadBEdge(pads(true),r.next);assert.equal(r.fresh,true);
 r=gamepadBEdge(pads(true),r.next);assert.equal(r.fresh,false);
 r=gamepadBEdge(pads(false),r.next);assert.equal(r.fresh,false);
 r=gamepadBEdge(pads(true),r.next);assert.equal(r.fresh,true);
});

test('single-screen title field rises on OSK appearance and falls on Steam status close',async()=>{
 const originalR=globalThis.SP_REACT,originalUI=globalThis.DFL,originalSteam=globalThis.SteamClient;
 let effect,cleanup,statusCallback,interval,visible=false;const timers=[],listeners={},classes=new Set();
 const root={classList:{toggle(n,value){value?classes.add(n):classes.delete(n)}},setAttribute(){},contains(){return false}};
 const field={value:'Catherine',blur(){},addEventListener(){}};
 const win={innerWidth:960,innerHeight:544,navigator:{getGamepads(){return []}},
  setTimeout(fn,delay){const id=timers.length+1;timers.push({fn,delay,id});return id},clearTimeout(){},
  setInterval(fn){interval=fn;return 10},clearInterval(){},addEventListener(){},removeEventListener(){},
  getComputedStyle(){return{display:'block',visibility:'visible',opacity:'1'}}};
 const overlay={getBoundingClientRect(){return{width:900,height:300,top:240,bottom:540}}};
 const doc={defaultView:win,documentElement:{clientWidth:960,clientHeight:544},querySelectorAll(){return visible?[overlay]:[]},activeElement:field,body:{}};
 const wrap={ownerDocument:doc,closest(){return root},querySelector(){return field},contains(el){return el===field},
  addEventListener(n,fn){listeners[n]=fn},removeEventListener(n){delete listeners[n]}};
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children}),useRef:v=>({current:v}),useState:v=>[v,()=>{}],useEffect:fn=>{effect=fn}};
 globalThis.DFL={TextField:'steam-field',DialogButton:'button',Focusable:'focusable'};
 globalThis.SteamClient={Keyboard:{RegisterForStatus(fn){statusCallback=fn;return{unregister(){}}}}};
 try{
  const mod=await moduleForTest();const tree=mod.InlineGameNameField({value:'Catherine',setValue(){}});
  tree.props.ref.current=wrap;cleanup=effect();
  assert(!classes.has('td-inline-keyboard-open'));
  listeners['titledeck-inline-keyboard-request']();
  assert(!classes.has('td-inline-keyboard-open'),'must not jump up as soon as Change Name is clicked');
  visible=true;interval();assert(classes.has('td-inline-keyboard-open'),'OSK appearance raises the field');
  visible=false;statusCallback(false);assert(!classes.has('td-inline-keyboard-open'),'status close restores normal editor');
  listeners['titledeck-inline-keyboard-request']();
  assert(!classes.has('td-inline-keyboard-open'));
  const fallback=timers.filter(t=>t.delay===260).at(-1);fallback.fn();
  assert(classes.has('td-inline-keyboard-open'),'inaccessible CEF keyboard gets delayed fallback');
  // With no Steam close event, a fresh browser gamepad B is a secondary signal.
  let b=false;win.navigator.getGamepads=()=>[{connected:true,buttons:[{pressed:false},{pressed:b}]}];
  interval();b=true;interval();
  assert(!classes.has('td-inline-keyboard-open'),'physical B closes raised editor even without Steam status');
  // A stale fallback callback must not raise the editor again.
  fallback.fn();assert(!classes.has('td-inline-keyboard-open'));
 }finally{cleanup?.();globalThis.SP_REACT=originalR;globalThis.DFL=originalUI;globalThis.SteamClient=originalSteam}
});


test('0.8.11 smart cleanup preserves Ninja Gaiden Greek Sigma and mixed-case words',async()=>{
 const {cleanTitle}=await moduleForTest();
 assert.equal(cleanTitle('NINJA GAIDEN Σ'), 'Ninja Gaiden Σ');
 assert.equal(cleanTitle('NINJA GAIDEN Σ2'), 'Ninja Gaiden Σ2');
 assert.equal(cleanTitle('NINJA GAIDEN Σ2: The DARK SWORD'), 'Ninja Gaiden Σ2: The Dark Sword');
 assert.equal(cleanTitle('FINAL FANTASY XII: THE ZODIAC AGE'),'Final Fantasy XII: The Zodiac Age');
 assert.equal(cleanTitle('FINAL FANTASY VII REMAKE'), 'Final Fantasy VII Remake');
 assert.equal(cleanTitle('FFXII: THE ZODIAC AGE'), 'FFXII: The Zodiac Age');
 assert.equal(cleanTitle('THE NINJA GAIDEN Σ2'), 'The Ninja Gaiden Σ2');
 assert.equal(cleanTitle('SPIDER-MAN: MILES MORALES'),'Spider-Man: Miles Morales');
 assert.equal(cleanTitle('THE LEGEND OF ZELDA'),'The Legend of Zelda');
 assert.equal(cleanTitle('IT TAKES TWO'),'It Takes Two');
 assert.equal(cleanTitle('Ninja Gaiden Σ2'), '');
});

test('0.8.11 cleanup stays non-destructive for special and branded content',async()=>{
 const {cleanTitle}=await moduleForTest();
 assert.equal(cleanTitle('Catherine Classic'),'');
 assert.equal(cleanTitle('DOOM Eternal'),'');
 assert.equal(cleanTitle('Final Fantasy XII'),'');
 assert.equal(cleanTitle('NINJA GAIDEN Σ2 HD'),'Ninja Gaiden Σ2 HD');
 assert.equal(cleanTitle('NINJA GAIDEN Σ2™'),'Ninja Gaiden Σ2');
 assert.equal(cleanTitle('Need for Speed™ Most Wanted'),'Need for Speed Most Wanted');
 assert.equal(cleanTitle('Pokémon™ Mystery Dungeon'),'Pokémon Mystery Dungeon');
 assert.equal(cleanTitle('The Witcher 3: Wild Hunt'),'');
});

test('0.8.12 Suggest cleanup previews the editable draft without applying it',async()=>{
 // The editor must not silently overwrite a partially edited draft with its original name.
 const {cleanTitle}=await moduleForTest();
 assert.equal(cleanTitle('My NINJA GAIDEN Σ'), 'My Ninja Gaiden Σ');
 assert(source.includes('cleanTitle(draft||original)'));
 assert(!source.includes('const suggested=cleanTitle(original)'));
 assert(source.includes('cleanupPreview.before') && source.includes('cleanupPreview.after'));
});

test('cleanup preview requires Apply, Keep never edits text, Undo restores the previous draft',async()=>{
 const original='My NINJA GAIDEN Σ2',suggested='My Ninja Gaiden Σ2';
 const mock=setupMock({games:[{appid:'893180',name:'NINJA GAIDEN Σ2'}],aliases:{'893180':original},view:'editor',selected:'893180',draft:original});
 const {plugin}=await mock.init();
 try{
   const getNodes=()=>walk(mock.render());
   const field=nodes=>nodes.find(n=>n.type?.name==='InlineGameNameField');
   const byFocus=(nodes,key)=>nodes.find(n=>n.props?.['data-td-focus']===key);
   resolveButton(byFocus(getNodes(),'edit-clean')).props.onClick();
   let nodes=getNodes();
   assert.equal(field(nodes).props.value,original,'preview MUST NOT silently change the draft');
   assert(nodes.some(n=>n.props?.['data-td-cleanup-preview']==='true'));
   assert(nodes.some(n=>n.children?.includes(original)));
   assert(nodes.some(n=>n.children?.includes(suggested)));
   assert(byFocus(nodes,'cleanup-keep'));assert(byFocus(nodes,'cleanup-apply'));
   resolveButton(byFocus(nodes,'cleanup-keep')).props.onClick();
   nodes=getNodes();
   assert.equal(field(nodes).props.value,original);
   assert(!byFocus(nodes,'cleanup-apply'),'Keep removes the preview');
   resolveButton(byFocus(nodes,'edit-clean')).props.onClick();
   resolveButton(byFocus(getNodes(),'cleanup-apply')).props.onClick();
   nodes=getNodes();
   assert.equal(field(nodes).props.value,suggested);
   assert.equal(byFocus(nodes,'edit-clean').children[0],'↶ Undo cleanup');
   assert.equal(mock.state.aliases['893180'],original,'preview and apply are local until Save');
   assert.equal(byFocus(nodes,'edit-restore').props.disabled,false,'Restore is reachable after cleanup');
   resolveButton(byFocus(nodes,'edit-clean')).props.onClick();
   nodes=getNodes();
   assert.equal(field(nodes).props.value,original,'Undo must restore the exact pre-cleanup text');
   assert.equal(byFocus(nodes,'edit-clean').children[0],'Suggest cleanup');
   assert.equal(mock.state.aliases['893180'],original);
 }finally{plugin.onDismount();mock.cleanup()}
});

test('manual input invalidates cleanup undo and Restore original clears an unsaved title',async()=>{
 const mock=setupMock({games:[{appid:'620',name:'Portal 2'}],aliases:{},view:'editor',selected:'620',draft:'MY PORTAL 2'});
 const {plugin}=await mock.init();try{
   const all=()=>walk(mock.render());
   const find=(nodes,id)=>nodes.find(n=>n.props?.['data-td-focus']===id);
   resolveButton(find(all(),'edit-clean')).props.onClick();
   resolveButton(find(all(),'cleanup-apply')).props.onClick();
   let nodes=all();assert.equal(find(nodes,'edit-clean').children[0],'↶ Undo cleanup');
   nodes.find(n=>n.type?.name==='InlineGameNameField').props.setValue('My precise name Σ');
   nodes=all();assert.equal(find(nodes,'edit-clean').children[0],'Suggest cleanup');
   assert.equal(find(nodes,'edit-restore').props.disabled,false);
   resolveButton(find(nodes,'edit-restore')).props.onClick();
   await new Promise(resolve=>setImmediate(resolve));
   nodes=all();assert.equal(nodes.find(n=>n.type?.name==='InlineGameNameField').props.value,'Portal 2');
   assert.equal(Object.keys(mock.state.aliases).length,0,'local restore must not create a backend alias');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('cleanup preview B returns safely to editor and D-pad moves between Keep / Apply',async()=>{
 const m=await moduleForTest();
 assert.equal(m.cleanupPreviewDestination('cleanup-keep',12),'cleanup-apply');
 assert.equal(m.cleanupPreviewDestination('cleanup-apply',11),'cleanup-keep');
 assert.equal(m.cleanupPreviewDestination('cleanup-apply',10),'edit-clean');
 const mock=setupMock({games:[{appid:'620',name:'NINJA GAIDEN Σ2'}],aliases:{},view:'editor',selected:'620',draft:'NINJA GAIDEN Σ2'});
 const {plugin}=await mock.init();try{
   const all=()=>walk(mock.render());
   const clean=all().find(n=>n.props?.['data-td-focus']==='edit-clean');
   resolveButton(clean).props.onClick();
   let nodes=all();assert(nodes.some(n=>n.props?.['data-td-cleanup-preview']==='true'));
   const rootNode=nodes.find(n=>n.props?.className==='td-root');
   let stopped=false;rootNode.props.onCancel({preventDefault(){stopped=true},stopPropagation(){}});
   assert(stopped);nodes=all();
   assert(!nodes.some(n=>n.props?.['data-td-cleanup-preview']==='true'));
   assert(nodes.some(n=>n.props?.['data-td-focus']==='edit-restore'));
   assert(nodes.some(n=>n.props?.['data-td-focus']==='edit-back'),'B did not return to library');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('native single-screen text field accepts an insertion in the middle of text without losing Σ',async()=>{
 const oldR=globalThis.SP_REACT,oldDFL=globalThis.DFL;
 let eff,dispose,winTick,current='Ninja Gaiden Σ2';const changes=[];
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children}),useRef:v=>({current:v}),useState:v=>[v,()=>{}],useEffect:fn=>{eff=fn}};
 globalThis.DFL={TextField:'native-steam-text-field',Focusable:'focusable',DialogButton:'button'};
 const {InlineGameNameField}=await moduleForTest();
 try{
  const input={get value(){return current},selectionStart:6,selectionEnd:6,blur(){}},win={setInterval(fn){winTick=fn;return 1},clearInterval(){},setTimeout(){}},listeners={};
  const wrap={ownerDocument:{defaultView:win},querySelector(){return input},addEventListener(event,fn){listeners[event]=fn},removeEventListener(){}};
  const component=InlineGameNameField({value:current,setValue:v=>changes.push(v)});
  component.props.ref.current=wrap;dispose=eff();
  current='Ninja MASTER Gaiden Σ2'; input.selectionStart=12;input.selectionEnd=12;
  winTick();
  assert.deepEqual(changes,['Ninja MASTER Gaiden Σ2']);
  assert.equal(input.selectionStart,12,'typing into the middle should not force cursor position to the end');
 }finally{dispose?.();globalThis.SP_REACT=oldR;globalThis.DFL=oldDFL}
});

test('custom game descriptions use a reversible, locally saved editor without changing the title grid',async()=>{
 const game={appid:'620',name:'Portal 2'};
 const mock=setupMock({games:[game],selected:'620',view:'description',descriptions:{'620':'An old summary'}});
 const {plugin,mod}=await mock.init();
 try{
   let tree=walk(mock.render());
   const field=tree.find(n=>n.type===mod.InlineGameNameField&&n.props.fieldKind==='description');
   assert(field,'Steam-native description TextField component missing');
   assert.equal(field.props.maxLength,undefined);
   assert.equal(field.props.label,'Custom game description');
   assert(tree.some(n=>n.props['data-td-focus']==='description-open'));
   assert(tree.some(n=>n.props['data-td-focus']==='description-save'));
   assert(tree.some(n=>n.props['data-td-focus']==='description-restore'));
   field.props.setValue('A revised game description Σ');
   tree=walk(mock.render());
   const save=tree.find(n=>n.props['data-td-focus']==='description-save');
   assert(!save.props.disabled);
   save.props.onClick();
   await new Promise(resolve=>setImmediate(resolve));
   assert.equal(mock.state.descriptions['620'],'A revised game description Σ');
   const restore=walk(mock.render()).find(n=>n.props['data-td-focus']==='description-restore');
   restore.props.onClick();
   await new Promise(resolve=>setImmediate(resolve));
   assert.equal(mock.state.descriptions['620'],undefined);
 }finally{plugin.onDismount();mock.cleanup();}
});


function nativeGamePageForDescription(appid='620'){
 const doc={documentElement:{},defaultView:{location:{pathname:'/library/app/'+appid},getComputedStyle:()=>({display:'block',visibility:'visible'})}};
 function node(tag,attrs={}){
  const el={tag,attrs:{...attrs},children:[],style:{},ownerDocument:doc,offsetParent:{},className:'',
   contains(child){for(let p=child;p;p=p.parentElement)if(p===this)return true;return false},
   get isConnected(){return Boolean(this._root||this.parentElement?.isConnected)},
   get nextSibling(){const a=this.parentElement?.children||[];return a[a.indexOf(this)+1]||null},
   get lastChild(){return this.children[this.children.length-1]||null},
   setAttribute(k,v){this.attrs[k]=String(v)},removeAttribute(k){delete this.attrs[k]},getAttribute(k){return this.attrs[k]??null},
   appendChild(child){
    if(child.parentElement){
      const old=child.parentElement.children,index=old.indexOf(child);
      if(index>=0)old.splice(index,1);
    }
    child.parentElement=this;this.children.push(child);return child
   },
   insertBefore(child,before){
    if(child.parentElement){const old=child.parentElement.children;const at=old.indexOf(child);if(at>=0)old.splice(at,1)}
    const i=this.children.indexOf(before);if(i<0)throw Error('missing child');
    child.parentElement=this;this.children.splice(i,0,child);return child;
   },
   remove(){if(this.parentElement){const a=this.parentElement.children,i=a.indexOf(this);if(i>=0)a.splice(i,1);this.parentElement=null}},
   querySelector(q){if(q==='[data-titledeck-description-text]')return this.children.find(x=>x.getAttribute('data-titledeck-description-text')==='true')||null;return null}
  };return el;
 }
 const root=node('div');root._root=true;
 const visible=node('div');visible.className='AppDetailsContainer_test';
 visible['__reactFiber$test']={memoizedProps:{overview:{appid:Number(appid)}},return:null};
 root.appendChild(visible);
 const unrelated=node('div');root.appendChild(unrelated);
 const traverse=(n,out=[])=>{out.push(n);for(const child of n.children||[])traverse(child,out);return out};
 doc.createElement=tag=>node(tag);
 doc.getElementsByClassName=()=>[visible];
 doc.querySelectorAll=sel=>sel.includes('[class*="AppDetailsContainer"]')?[visible]:sel==='[data-titledeck-description]'?
    traverse(root).filter(n=>n.getAttribute?.('data-titledeck-description')):[];
 return{doc,root,visible,unrelated,node};
}
test('game-description native panel is tied to current route AND visible Steam React game ID',async()=>{
 const m=await moduleForTest(),page=nativeGamePageForDescription();
 const state={enabled:true,descriptions:{'620':'Portal 2, from my collection','999':'Another custom description'}};
 const adapter=m.createDescriptionAdapter(page.doc,()=>state,()=>[] ,()=> 'AppDetailsContainer_test');
 try{
  assert.equal(m.appidFromVisibleGame(page.visible),'620');
  assert.equal(adapter.runNow(),1);
  assert.equal(page.root.children.length,3,'one panel inserted with Steam siblings untouched');
  let pane=page.root.children[0];
  assert.equal(pane.getAttribute('data-titledeck-description'),'620');
  assert.equal(pane.lastChild.textContent,'Portal 2, from my collection');
  assert.equal(adapter.runNow(),1);assert.equal(page.root.children.length,3,'no duplicate panels');
  page.doc.defaultView.location.pathname='/library/app/999';
  assert.equal(adapter.runNow(),0,'old game fiber must not match new URL');
  assert.equal(page.root.children.length,2,'stale panel removed immediately');
  page.visible['__reactFiber$test'].memoizedProps.overview.appid=999;
  assert.equal(adapter.runNow(),1);
  pane=page.root.children[0];assert.equal(pane.getAttribute('data-titledeck-description'),'999');
  assert.equal(pane.lastChild.textContent,'Another custom description');
  assert.equal(page.root.children[1],page.visible);
  assert.equal(page.root.children[2],page.unrelated);
  state.enabled=false;assert.equal(adapter.runNow(),0);
  assert.equal(page.root.children.length,2,'pausing removes custom panel');
 }finally{adapter.stop()}
});
test('native description panel handles unsafe-looking text literally, reverts on delete and fails closed without identity',async()=>{
 const m=await moduleForTest(),page=nativeGamePageForDescription('620');
 const text='<img src=x onerror="evil()">\nSome Σ text';
 const state={enabled:true,descriptions:{'620':text}};
 const adapter=m.createDescriptionAdapter(page.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  const pane=page.root.children[0];
  assert.equal(pane.lastChild.textContent,text,'textContent used, no markup parsing');
  assert.equal(pane.children.length,2,'no additional HTML nodes injected');
  state.descriptions['620']='A new description';
  assert.equal(adapter.runNow(),1);
  assert.equal(page.root.children[0],pane,'update in place, no DOM rebuilding');
  assert.equal(pane.lastChild.textContent,'A new description');
  delete state.descriptions['620'];assert.equal(adapter.runNow(),0);
  assert.equal(page.root.children.length,2);
  state.descriptions['620']='Restored';
  page.visible['__reactFiber$test'].memoizedProps.overview.appid=777;
  assert.equal(adapter.runNow(),0,'never infer identity from route alone');
  assert.equal(page.root.children.length,2);
 }finally{adapter.stop()}
});

test('description keyboard uses the SAME Decky TextField and click path as Change Name',async()=>{
 const mock=setupMock({games:[{appid:'620',name:'Portal 2'}],selected:'620',view:'description'});
 const {mod,plugin}=await mock.init();
 try{
   const nodes=walk(mock.render());
   const action=nodes.find(n=>n.props['data-td-focus']==='description-open');
   const root=nodes.find(n=>n.props.className==='td-root');
   const fieldComp=nodes.find(n=>n.type===mod.InlineGameNameField&&n.props.fieldKind==='description');
   assert(action&&fieldComp);
   assert.equal(fieldComp.props.maxLength,undefined);
   let clicks=0,focuses=0;
   const input={focus(){focuses++},click(){clicks++}};
   const wrapped={querySelector(sel){return sel==='input, textarea'?input:null}};
   root.props.ref.current={querySelector(q){
     if(q==='[data-td-inline-description]')return wrapped;
     return null;
   }};
   action.props.onClick();
   assert.equal(focuses,1,'description action must focus native Steam input');
   assert.equal(clicks,1,'description action must click native Steam TextField');
   globalThis.DFL.TextField='decky-steam-textfield';
   const rendered=mod.InlineGameNameField(fieldComp.props);
   const inp=walk(rendered).find(n=>n.type==='decky-steam-textfield');
   assert(inp,'must use same native Steam TextField as Change Name');
   assert.equal(inp.props.maxLength,undefined);
   assert.equal(inp.props['aria-label'],'Custom game description');
   assert.equal(inp.props.bShowClearAction,false,'no X clear icon for long descriptions');
   const count=walk(rendered).find(n=>n.props['data-td-description-count']==='true');
   assert(count,'live character counter must be rendered with the editor');
   assert(count.children.includes('0 characters'));
   inp.props.onChange({target:{value:'Long custom text Σ'}});
   assert.equal(walk(mock.render()).find(n=>n.type===mod.InlineGameNameField&&n.props.fieldKind==='description').props.value,'Long custom text Σ');
 }finally{plugin.onDismount();mock.cleanup();}
});
test('name editor still uses its original 180-char Steam TextField',async()=>{
 const mock=setupMock({games:[{appid:'620',name:'Portal 2'}],selected:'620',view:'editor'});
 const {mod,plugin}=await mock.init();
 try{
   const comp=walk(mock.render()).find(n=>n.type===mod.InlineGameNameField);
   assert(comp,'original name editor remains present');
   globalThis.DFL.TextField='decky-steam-textfield';
   const rendered=mod.InlineGameNameField(comp.props);
   const input=walk(rendered).find(n=>n.type==='decky-steam-textfield');
   assert.equal(input.props.maxLength,180);
   assert.equal(input.props.label,'Custom display title');
   assert.equal(input.props.bShowClearAction,true,'retain native clear action for short titles');
 }finally{plugin.onDismount();mock.cleanup();}
});


test('Steam hash-based routes show the right native description instead of silently discarding it',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 p.doc.defaultView.location.pathname='/';
 p.doc.defaultView.location.hash='#/library/app/893180';
 const state={enabled:true,descriptions:{'893180':'Catherine Classic custom description','620':'Portal description'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
  assert.equal(m.steamLibraryRouteId(p.doc.defaultView.location),'893180');
  assert.equal(adapter.runNow(),1);
  assert.equal(p.root.children[0].getAttribute('data-titledeck-description'),'893180');
  assert.equal(p.root.children[0].lastChild.textContent,'Catherine Classic custom description');
  p.doc.defaultView.location.hash='#/library/app/620';
  assert.equal(adapter.runNow(),0,'when Steam URL changes but old game remains visible do not leak old description');
  assert.equal(p.root.children.length,2,'old panel removed on route transition');
 }finally{adapter.stop()}
});
test('when Steam hides its route, only ONE confirmed visible game identity may show a description',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 p.doc.defaultView.location.pathname='/';
 p.doc.defaultView.location.hash='';
 const state={enabled:true,descriptions:{'893180':'Catherine custom description'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
  assert.equal(m.steamLibraryRouteId(p.doc.defaultView.location),'');
  assert.equal(adapter.runNow(),1,'visible Steam React overview is enough on matching app details container');
  p.visible['__reactFiber$test'].memoizedProps.overview.appid=620;
  assert.equal(adapter.runNow(),0,'never display Catherine description on another game');
  assert.equal(p.root.children.length,2,'clear stale custom description');
 }finally{adapter.stop()}
});
test('descriptions remain accessible at short Deck heights with fixed toolbar and scroll to bottom',async()=>{
 const mock=setupMock({games:[{appid:'893180',name:'Catherine Classic'}],view:'description',selected:'893180',
  descriptions:{'893180':'A custom Catherine description'}});
 const {plugin}=await mock.init();
 try{
  const tree=walk(mock.render());
  const ids=tree.map(n=>n.props?.['data-td-focus']).filter(Boolean);
  for(const id of ['description-back','description-open','description-save','description-restore','description-bottom']){
    assert.equal(ids.filter(x=>x===id).length,1,'missing or repeated action '+id);
  }
  const top=tree.find(n=>n.props?.className==='td-actions td-description-toolbar');
  assert(top,'fixed description toolbar missing');
  assert(walk(top).some(n=>n.props?.['data-td-focus']==='description-save'));
  assert(walk(top).some(n=>n.props?.['data-td-focus']==='description-restore'));
  const workspace=tree.find(n=>n.props?.['data-td-description-workspace']==='true');
  assert(workspace,'scrolling workspace absent');
  const scroller={scrollTop:0,scrollHeight:950};
  const root=tree.find(n=>n.props?.className==='td-root');
  root.props.ref.current={querySelector(q){return q==='[data-td-description-workspace]'?scroller:null}};
  const bottom=tree.find(n=>n.props?.['data-td-focus']==='description-bottom');
  bottom.props.onClick();
  assert.equal(scroller.scrollTop,950);
  assert.equal(bottom.props.disabled,undefined);
 }finally{plugin.onDismount();mock.cleanup()}
});


test('Artwork Footer follows the Play bar and keeps legacy Below Play selectable',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 p.doc.defaultView.innerWidth=1280;p.doc.defaultView.innerHeight=800;
 p.doc.body=p.node('body');p.doc.body._root=true;
 const play=p.node('div');play._root=true;play.getBoundingClientRect=()=>({left:25,top:680,width:1190,height:64,bottom:744});
 Object.defineProperty(p.visible,'previousElementSibling',{get:()=>play});
 const state={enabled:true,description_position:'hero_footer',descriptions:{'893180':'Catherine test description'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   assert.deepEqual(m.heroFooterGeometry(play.getBoundingClientRect(),1280,800),{left:41,top:592,width:1158,height:76});
   assert.equal(m.findDescriptionPlayBar(p.doc,p.visible),play);
   assert.equal(adapter.runNow(),1);
   let pane=p.doc.body.children[0];
   assert(pane,'description should be reparented to overlay layer');
   assert.equal(pane.getAttribute('data-titledeck-description'),'893180');
   assert.equal(pane.getAttribute('data-titledeck-position'),'hero_footer');
   assert(pane.style.cssText.includes('top:592px'));
   assert.equal(p.root.children.length,2,"Steam's normal content stays untouched in hero mode");
   assert.equal(adapter.runNow(),1);
   assert.equal(p.doc.body.children.length,1,'no duplicate overlay');
   state.description_position='below_play';
   assert.equal(adapter.runNow(),1);
   assert.equal(p.doc.body.children.length,0);
   assert.equal(p.root.children[0],pane,'same panel moves into old below-Play position');
   assert.equal(pane.getAttribute('data-titledeck-position'),'below_play');
   state.description_position='hero_footer';
   assert.equal(adapter.runNow(),1);
   assert.equal(p.doc.body.children[0],pane,'return to hero uses same panel');
   play.getBoundingClientRect=()=>({left:25,top:100,width:1190,height:64,bottom:164});
   assert.equal(adapter.runNow(),0,'header scrolling away must hide hero overlay');
   assert.equal(p.doc.body.children.length,0,'no floating overlay over tabs/Steam toolbar');
   state.description_position='below_play';
   assert.equal(adapter.runNow(),1,'full panel still works in scrolled view');
   assert.equal(p.root.children[0].getAttribute('data-titledeck-position'),'below_play');
 }finally{adapter.stop();}
});
test('Art Hero footer geometry rejects missing or implausible Play areas',async()=>{
 const m=await moduleForTest();
 assert.equal(m.heroFooterGeometry(null,1280,800),null);
 assert.equal(m.heroFooterGeometry({left:0,top:75,width:1200},1280,800),null);
 assert.equal(m.heroFooterGeometry({left:0,top:900,width:1200},1280,800),null);
 assert.equal(m.heroFooterGeometry({left:0,top:650,width:80},1280,800),null);
 assert.equal(m.heroFooterGeometry({left:0,top:650,width:1190},1280,800).height,76);
});
test('Settings exposes Game Info, Artwork Footer and Below Play independently',async()=>{
 const mock=setupMock({view:'settings',description_position:'below_play'});
 const {plugin}=await mock.init();
 try{
   let nodes=walk(mock.render()),panel=nodes.find(n=>n.props?.['data-td-setting']==='description-placement');
   assert(panel);
   const buttons=walk(panel);
   const info=buttons.find(n=>n.props?.['data-td-focus']==='setting-placement-info');
   const hero=buttons.find(n=>n.props?.['data-td-focus']==='setting-placement-hero');
   const below=buttons.find(n=>n.props?.['data-td-focus']==='setting-placement-below');
   assert(info&&hero&&below);
   assert(JSON.stringify(info.children).includes('GAME INFO'));
   assert(JSON.stringify(hero.children).includes('Artwork Footer'));
   assert(JSON.stringify(below.children).includes('Below Play'));
   info.props.onClick();
   await new Promise(resolve=>setImmediate(resolve));
   assert.equal(mock.state.description_position,'game_info');
   const second=setupMock({view:'settings',description_position:mock.state.description_position});
   const result=await second.init();
   try{
     nodes=walk(second.render());
     panel=nodes.find(n=>n.props?.['data-td-setting']==='description-placement');
     assert(JSON.stringify(walk(panel).find(n=>n.props?.['data-td-focus']==='setting-placement-info').children).includes('selected'));
   }finally{result.plugin.onDismount();second.cleanup();}
 }finally{plugin.onDismount();mock.cleanup()}
});


test('native Game Info mode replaces visible description but preserves Steam text',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const nativeContainer=p.node('div'),original=p.node('p');
 nativeContainer.className='appdetailsgameinfopanel_Container_2jPMy';
 original.className='appdetailsgameinfopanel_GameDescription_3GkV1';
 original.textContent='Original Steam description for Catherine Classic';
 nativeContainer.appendChild(original);p.visible.appendChild(nativeContainer);
 nativeContainer.querySelectorAll=sel=>sel.includes('GameDescription')?[original]:[];
 const query=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel.includes('appdetailsgameinfopanel_Container')?[nativeContainer]:sel.includes('appdetailsgameinfopanel_GameDescription')?[original]:query(sel);
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'New Catherine custom synopsis'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   assert.equal(m.findSteamGameInfoDescription(p.doc,p.visible).nativeDescription,original);
   assert.equal(adapter.runNow(),1);
   assert.equal(original.textContent,'Original Steam description for Catherine Classic','original text unchanged');
   assert.equal(original.style.display,'none');
   const custom=nativeContainer.children[0];
   assert.equal(custom.getAttribute('data-titledeck-gameinfo-description'),'893180');
   assert.equal(custom.lastChild.textContent,'New Catherine custom synopsis');
   assert.equal(adapter.runNow(),1);
   assert.equal(nativeContainer.children.length,2,'no duplicate Game Info descriptions');
   state.descriptions['893180']='Edited synopsis';
   assert.equal(adapter.runNow(),1);
   assert.equal(custom.lastChild.textContent,'Edited synopsis');
   state.description_position='below_play';
   assert.equal(adapter.runNow(),1);
   assert.equal(nativeContainer.children.length,1,'custom removed when mode switched');
   assert.equal(original.style.display,'');
   assert.equal(original.textContent,'Original Steam description for Catherine Classic');
   state.description_position='game_info';
   assert.equal(adapter.runNow(),1);
   state.enabled=false;assert.equal(adapter.runNow(),0);
   assert.equal(original.style.display,'');
   assert.equal(nativeContainer.children.length,1);
 }finally{adapter.stop()}
});
test('Game Info mode waits for that tab and never shows its text below Play',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('620');
 const state={enabled:true,description_position:'game_info',descriptions:{'620':'Portal custom text'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   assert.equal(adapter.runNow(),0);
   assert.equal(p.root.children.length,2);
   assert(adapter.status.includes('Game Info not located'));
 }finally{adapter.stop()}
});


test('Game Info can live in a sibling portal outside the nearest AppDetails container',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const shell=p.node('div');shell._root=true;
 const nativeContainer=p.node('div');nativeContainer.className='appdetailsgameinfopanel_Container_newhash';
 const desc=p.node('p');desc.className='appdetailsgameinfopanel_GameDescription_newhash';
 desc.textContent='Original Catherine text';
 nativeContainer.appendChild(desc);shell.appendChild(nativeContainer);
 const query=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>
   sel.includes('appdetailsgameinfopanel_Container')?[nativeContainer]:
   sel.includes('appdetailsgameinfopanel_GameDescription')?[desc]:query(sel);
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'My new Catherine story'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[] ,()=> 'AppDetailsContainer_test');
 try{
   const found=m.findSteamGameInfoDescription(p.doc,p.visible);
   assert.equal(found.nativeDescription,desc,'find native text even when Game Info mounts in portal');
   assert.equal(adapter.runNow(),1);
   assert.equal(desc.style.display,'none');
   assert.equal(nativeContainer.children[0].lastChild.textContent,'My new Catherine story');
   state.description_position='below_play';
   assert.equal(adapter.runNow(),1);
   assert.equal(desc.style.display,'');
   assert.equal(nativeContainer.children.length,1);
 }finally{adapter.stop()}
});
test('nested native Game Info wrappers resolve to a single description, not an ambiguous tab',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const outer=p.node('div');outer.className='appdetailsgameinfocontainer_AppGameInfoContainer_x';
 const inner=p.node('div');inner.className='appdetailsgameinfopanel_Container_x';
 const desc=p.node('p');desc.className='appdetailsgameinfopanel_GameDescription_x';
 inner.appendChild(desc);outer.appendChild(inner);p.visible.appendChild(outer);
 const query=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>
   sel.includes('appdetailsgameinfocontainer_AppGameInfoContainer')?[outer]:
   sel.includes('appdetailsgameinfopanel_Container')?[inner]:
   sel.includes('appdetailsgameinfopanel_GameDescription')?[desc]:query(sel);
 const found=m.findSteamGameInfoDescription(p.doc,p.visible);
 assert(found,'nested panel should be discoverable');
 assert.equal(found.nativeDescription,desc);
 assert.equal(found.container,inner);
});
test('Game Info native CSS-important display overrides are restored exactly',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const box=p.node('div');box.className='appdetailsgameinfopanel_Container_x';
 const desc=p.node('div');desc.className='appdetailsgameinfopanel_GameDescription_x';
 const props={display:'block',priority:'important'};
 desc.style={
   get display(){return props.display},set display(v){props.display=v},
   getPropertyValue:k=>k==='display'?props.display:'',
   getPropertyPriority:k=>k==='display'?props.priority:'',
   setProperty(k,value,priority){if(k==='display'){props.display=value;props.priority=priority}},
   removeProperty(k){if(k==='display'){props.display='';props.priority=''}}
 };
 box.appendChild(desc);p.visible.appendChild(box);
 const query=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>
  sel.includes('appdetailsgameinfopanel_Container')?[box]:
  sel.includes('appdetailsgameinfopanel_GameDescription')?[desc]:query(sel);
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'Replacement'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(props.display,'none');
  assert.equal(props.priority,'important');
  state.enabled=false;assert.equal(adapter.runNow(),0);
  assert.equal(props.display,'block','native display restored');
  assert.equal(props.priority,'important','original CSS priority restored');
 }finally{adapter.stop()}
});


test('new Steam Game Info wrapper class works when only description selector is stable',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const wrapper=p.node('div');wrapper.className='appdetailsgameinfo_newAppInfoSection';
 const native=p.node('p');native.className='appdetailsgameinfopanel_GameDescription_renamed';
 native.textContent='Original description';
 wrapper.appendChild(native);p.visible.appendChild(wrapper);
 const priorQuery=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>
   sel.includes('appdetailsgameinfopanel_GameDescription')?[native]:
   sel.includes('appdetailsgameinfocontainer_GameDescription')?[]:
   priorQuery(sel);
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'User supplied text'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   const found=m.findSteamGameInfoDescription(p.doc,p.visible);
   assert.equal(found.nativeDescription,native);
   assert.equal(adapter.runNow(),1);
   assert.equal(native.style.display,'none');
   assert.equal(wrapper.children[0].lastChild.textContent,'User supplied text');
   state.enabled=false;
   assert.equal(adapter.runNow(),0);
   assert.equal(native.style.display,'');
 }finally{adapter.stop()}
});
test('missing Game Info tab reports precise diagnostic without altering Steam page',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'Custom text'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   assert.equal(adapter.runNow(),0);
   assert(adapter.status.includes('0 panels, 0 native descriptions'));
   assert.equal(p.root.children.length,2);
 }finally{adapter.stop()}
});


test('Game Info scan retains last real game-page finding after opening a manager without the Steam page',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const second={documentElement:{},querySelectorAll:()=>[],createElement:()=>({}),defaultView:{location:{pathname:'/titledeck/manager'}}};
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'My test description'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[second],()=> 'AppDetailsContainer_test');
 try{
   assert.equal(adapter.runNow(),0,'Game Info tab is not available in the test fixture');
   const last=m.getLastDescriptionGameProbe();
   assert.equal(last.appid,'893180');
   assert.equal(last.detailContainers,1);
   assert.equal(last.documentCount,2);
   assert(last.phase.includes('Game Info'),'probe must describe the real tab failure');
   assert(adapter.status.includes('Game Info not located'),'a later blank document cannot erase actual failure');
   p.doc.defaultView.location.pathname='/titledeck/manager';
   p.visible.remove();
   adapter.runNow();
   assert(adapter.status.includes('Game page not visible'),'manager does not contain game page');
   assert.equal(m.getLastDescriptionGameProbe().appid,'893180','last observed game remains in diagnostics');
   assert(m.formatDescriptionGameProbe().includes('App 893180'));
 }finally{adapter.stop()}
});
test('1.1.8 public Quick Access hides diagnostics unless developer opt-in is enabled',async()=>{
 const mock=setupMock({view:'library'});
 const {plugin}=await mock.init();
 try{
   const quick=resolveButton(plugin.content);
   assert.equal(quick.type,'panel');
   const all=walk(quick);
   assert(all.some(n=>n.children?.includes('Open full library manager')));
   assert(!all.some(n=>String(n.children||'').includes('Capture Game Info timing')));
   assert(!all.some(n=>String(n.children||'').includes('Developer timing capture')));
   assert(!all.some(n=>String(n.children||'').includes('Switch Community / Game Info')));
   assert.equal(all.filter(n=>n.type==='buttonitem').length,1,'only the full library manager is public');
   assert(!all.some(n=>n.children?.includes('Save LB/RB input diagnostic')));
   assert(!all.some(n=>n.children?.includes('Diagnose non-Steam artwork')));
   const settingsNodes=walk(mock.render());
   assert(!settingsNodes.some(n=>n.props?.['data-td-setting']==='diagnostics'));
   assert(!settingsNodes.some(n=>n.props?.['data-td-focus']==='setting-scan'),'no dead controller focus target');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('developer timing capture is available only with explicit local opt-in',async()=>{
 globalThis.__TITLEDECK_DEV_DIAGNOSTICS__=true;
 const mock=setupMock({view:'settings'});
 try{
   const {mod,plugin}=await mock.init();
   assert.equal(mod.developerDiagnosticsEnabled(),true);
   const quick=resolveButton(plugin.content);
   assert(walk(quick).some(n=>n.children?.includes('Capture Game Info timing')));
   assert(walk(quick).some(n=>n.children?.includes('Save LB/RB input diagnostic')));
   assert(walk(mock.render()).some(n=>n.props?.['data-td-setting']==='diagnostics'));
   plugin.onDismount();
 }finally{
   delete globalThis.__TITLEDECK_DEV_DIAGNOSTICS__;
   mock.cleanup();
 }
});


test('Steam Game Info uses live Decky CSS module exports when hashed classes have no stable names',async()=>{
 const ownerClass='_abcGameInfoOwner',descClass='_xyzGameDesc';
 let finderCalls=0;
 const ui={findModuleChild(predicate){
   finderCalls++;
   const modules=[
     {GameInfoContainer:ownerClass,GameInfoQuickLinks:'_link'},
     {GameDescription:descClass,Description:'_desc',DescriptionStatsCtn:'_stats'}
   ];
   for(const mod of modules){const match=predicate(mod);if(match)return match}
   return null;
 }};
 globalThis.DFL=ui;
 const m=await moduleForTest();
 const p=nativeGamePageForDescription('893180');
 const container=p.node('div');container.className=ownerClass;
 const original=p.node('p');original.className=descClass;original.textContent='Original Catherine metadata';
 container.appendChild(original);p.visible.appendChild(container);
 const oldClass=p.doc.getElementsByClassName;
 p.doc.getElementsByClassName=name=>name===ownerClass?[container]:name===descClass?[original]:oldClass(name);
 const resolved=m.resolveLiveSteamGameInfoClasses(ui);
 assert.deepEqual(resolved,{owner:ownerClass,description:descClass});
 assert.deepEqual(m.resolveLiveSteamGameInfoClasses(ui),resolved);
 assert.equal(finderCalls,2,'do not rescan entire Steam webpack tree on every UI refresh');
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'Replacement inside actual Game Info'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   const found=m.findSteamGameInfoDescription(p.doc,p.visible);
   assert(found,'Game Info with hashed CSS classes must be discoverable');
   assert.equal(found.nativeDescription,original);
   assert.equal(adapter.runNow(),1);
   assert.equal(original.style.display,'none');
   assert.equal(container.children[0].lastChild.textContent,'Replacement inside actual Game Info');
   const probe=m.getLastDescriptionGameProbe();
   assert.equal(probe.moduleStatus,'resolved');
   assert.equal(probe.infoPanels,1);
   assert.equal(probe.nativeDescriptions,1);
   assert(m.formatDescriptionGameProbe().includes('Live CSS modules resolved'));
   state.enabled=false;assert.equal(adapter.runNow(),0);
   assert.equal(original.style.display,'');
   assert.equal(container.children.length,1);
   assert.equal(original.textContent,'Original Catherine metadata');
 }finally{adapter.stop();delete globalThis.DFL}
});
test('Live Steam Game Info CSS module lookup fails safely if module finder is absent',async()=>{
 const m=await moduleForTest();
 assert.equal(m.resolveLiveSteamGameInfoClasses({}),null);
 assert.equal(m.resolveLiveSteamGameInfoClasses(null),null);
 const junk={findModuleChild(predicate){return predicate({GameInfoContainer:'bad',GameInfoQuickLinks:'x'})}};
 assert.equal(m.resolveLiveSteamGameInfoClasses(junk),null,'must have BOTH description and owner exports');
});


test('native Steam description reader never intercepts the shared GetDescriptions API',async()=>{
 const m=await moduleForTest();
 const fn=function(id){return{strFullDescription:'Valve original '+id,strSnippet:'Valve snippet'}};
 const store={GetDescriptions:fn};
 const prior=Object.getOwnPropertyDescriptor(store,'GetDescriptions');
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'Custom Catherine'}};
 const adapter=m.createGameInfoDataAdapter(()=>state,()=>[{appDetailsStore:store}]);
 adapter.start();
 try{
  assert.equal(adapter.hookedStores,0);
  assert.equal(adapter.overrides,0);
  assert.equal(store.GetDescriptions,fn);
  assert.equal(store.GetDescriptions(893180).strFullDescription,'Valve original 893180');
  assert.equal(adapter.getOriginalDescription('893180'),'Valve original 893180');
  assert.deepEqual(Object.getOwnPropertyDescriptor(store,'GetDescriptions'),prior);
 }finally{adapter.stop()}
 assert.deepEqual(Object.getOwnPropertyDescriptor(store,'GetDescriptions'),prior);
});
test('native Steam description read is on demand and fails safely without Steam getter',async()=>{
 const m=await moduleForTest();
 const store={GetDescriptions(id){return{strFullDescription:'Original '+id}}};
 const adapter=m.createGameInfoDataAdapter(()=>({}),()=>[{appDetailsStore:{}},{appDetailsStore:store}]);
 adapter.start();
 assert.equal(adapter.calls,0,'reading Steam data must not run in a heartbeat');
 assert.equal(adapter.getOriginalDescription('620'),'Original 620');
 assert.equal(adapter.calls,1);
 assert.equal(adapter.hookedStores,0);
 assert.equal(store.GetDescriptions(620).strFullDescription,'Original 620');
 adapter.stop();
 assert.equal(adapter.getOriginalDescription('620'),'');
});
test('GetDescriptions route parser accepts game tabs and refuses a different app or unrelated pages',async()=>{
 const m=await moduleForTest();
 const base={Router:{WindowStore:{GamepadUIMainWindowInstance:{m_history:{location:{pathname:'/routes/library/details/893180/tab/gameinfo'}}}}}};
 assert.equal(m.currentSteamGameAppId(base),'893180');
 base.Router.WindowStore.GamepadUIMainWindowInstance.m_history.location.pathname='/library/app/620';
 assert.equal(m.currentSteamGameAppId(base),'620');
 base.Router.WindowStore.GamepadUIMainWindowInstance.m_history.location.pathname='/library/home';
 assert.equal(m.currentSteamGameAppId(base),'');
});


test('Steam description remains native across game routes, even with different plugin contexts',async()=>{
 const m=await moduleForTest();
 const store={GetDescriptions(id){return{strFullDescription:'Steam '+id,strSnippet:'Original'}}};
 const reader=m.createGameInfoDataAdapter(()=>({descriptions:{'893180':'Edited Catherine'}}),()=>[
   {appDetailsStore:store},
   {location:{pathname:'/library/app/893180'}}
 ]);
 reader.start();
 try{
  assert.equal(reader.getOriginalDescription('893180'),'Steam 893180');
  assert.equal(store.GetDescriptions(893180).strFullDescription,'Steam 893180');
  assert.equal(reader.hookedStores,0);
 }finally{reader.stop()}
});
test('Game Info custom text uses native Steam description shell, never a blue TitleDeck card',async()=>{
 const m=await moduleForTest(),page=nativeGamePageForDescription('893180');
 const native=page.node('p');
 native.className='_steamGameDescription123';
 native.style.cssText='font-size:15px;line-height:1.4;color:inherit;margin:0;';
 native.setAttribute('id','steam-description-original');
 native.textContent='This original Steam description must not be mutated';
 let cloneCount=0;
 native.cloneNode=deep=>{
   assert.equal(deep,false,'clone only CSS wrapper, not original children');
   cloneCount++;
   const el=page.node('p');
   el.className=native.className;
   el.style.cssText=native.style.cssText;
   el.setAttribute('id','steam-description-original');
   el.removeAttribute=k=>{delete el.attrs[k]};
   return el;
 };
 const panel=m.createNativeSteamDescriptionPanel(page.doc,native,'893180');
 assert.equal(cloneCount,1);
 assert.equal(panel.className,native.className);
 assert.equal(panel.style.cssText,native.style.cssText,'Steam native font and color are retained');
 assert.equal(panel.getAttribute('id'),null,'do not duplicate native Steam id');
 assert.equal(panel.getAttribute('data-titledeck-gameinfo-description'),'893180');
 assert.equal(panel.children.length,1,'one native-looking body, no custom heading');
 assert.equal(panel.lastChild.tag,'span');
 assert.equal(panel.lastChild.getAttribute('data-titledeck-gameinfo-text'),'true');
 assert(!panel.children.some(child=>child.textContent==='YOUR CUSTOM GAME DESCRIPTION'));
 assert(!panel.style.cssText.includes('background:#203045'));
 assert.equal(native.textContent,'This original Steam description must not be mutated');
});
test('Game Info native shell supports plain text, multiline and exact restoration',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const wrap=p.node('div'),native=p.node('p');
 wrap.className='appdetailsgameinfopanel_Container_x';
 native.className='appdetailsgameinfopanel_GameDescription_x';
 native.textContent='Original Steam description';
 wrap.appendChild(native);p.visible.appendChild(wrap);
 const query=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel.includes('appdetailsgameinfopanel_Container')?[wrap]
  :sel.includes('appdetailsgameinfopanel_GameDescription')?[native]:query(sel);
 const unsafe='<b>TitleDeck</b>\nA second line & symbols';
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':unsafe}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
  assert.equal(adapter.runNow(),1);
  const custom=wrap.children[0];
  assert.equal(custom.className,native.className,'adopt the native Steam Game Info class');
  assert.equal(custom.children.length,1);
  assert.equal(custom.lastChild.textContent,unsafe,'escape user text, retain newline');
  assert.equal(custom.lastChild.children.length,0,'markup-like text creates no HTML nodes');
  assert(!String(custom.style.cssText||'').includes('background'));
  assert.equal(native.style.display,'none');
  state.descriptions['893180']='Updated without blue box';
  assert.equal(adapter.runNow(),1);
  assert.equal(wrap.children[0],custom,'in-place update retains native shell');
  assert.equal(custom.lastChild.textContent,'Updated without blue box');
  state.enabled=false;
  assert.equal(adapter.runNow(),0);
  assert.equal(wrap.children.length,1);
  assert.equal(wrap.children[0],native);
  assert.equal(native.style.display,'');
  assert.equal(native.textContent,'Original Steam description');
 }finally{adapter.stop()}
});
test('Game Info with no native description inherits surrounding Steam styling',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('620');
 const panel=m.createNativeSteamDescriptionPanel(p.doc,null,'620');
 assert.equal(panel.children.length,1);
 assert.equal(panel.tag,'div');
 assert(panel.style.cssText.includes('color:inherit'));
 assert(panel.style.cssText.includes('background:transparent'));
 assert(!panel.style.cssText.includes('border-radius'));
});


test('Steam description editor keeps a neutral count, no warnings and no save cap even above 1247',async()=>{
 const mock=setupMock({games:[{appid:'893180',name:'Catherine Classic'}],selected:'893180',view:'description'});
 const {mod,plugin}=await mock.init();
 try{
  globalThis.DFL.TextField='decky-steam-textfield';
  const component=walk(mock.render()).find(n=>n.type===mod.InlineGameNameField&&n.props.fieldKind==='description');
  assert(component);
  const input=walk(mod.InlineGameNameField({...component.props,value:'A'.repeat(1246)})).find(n=>n.type==='decky-steam-textfield');
  assert.equal(input.props.maxLength,undefined);
  const long='X'.repeat(6000);
  input.props.onChange({target:{value:long}});
  assert.equal(walk(mock.render()).find(n=>n.type===mod.InlineGameNameField&&n.props.fieldKind==='description').props.value.length,6000);
  for(const size of [0,1246,1247,1248,6000]){
   const rendered=mod.InlineGameNameField({...component.props,value:'Y'.repeat(size)});
   const count=walk(rendered).find(n=>n.props['data-td-description-count']==='true');
   assert.deepEqual(count.children,[`${size} characters`]);
   assert(!count.props.className.includes('td-description-warning'));
   assert.equal(count.props.role,undefined);
  }
  const source=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
  assert(!source.includes('.td-description-character-count.td-description-warning'));
 }finally{plugin.onDismount();mock.cleanup()}
});
test('description layout moves on keyboard request even when no keyboard status is received yet',async()=>{
 // This Deck OSK intermittency is hardware-specific. Test the regression
 // contract: description click must request the explicit keyboard-raised
 // layout, while Change Name keeps its existing successful behavior.
 const s=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
 assert(s.includes('activeInlineKeyboard?.show?.();'));
 assert(s.includes("bShowClearAction:fieldKind!=='description'"));
 assert(s.includes("fieldKind==='description'?h('div',{className:'td-description-character-count'"));
});


test('long Game Info descriptions stay on the SAME native DOM shell across 150 scans',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const box=p.node('div'),native=p.node('p');
 box.className='appdetailsgameinfopanel_Container_long';
 native.className='appdetailsgameinfopanel_GameDescription_long';
 native.textContent='Valve original Catherine description';
 box.appendChild(native);p.visible.appendChild(box);
 const query=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel==='[data-titledeck-gameinfo-description]'?
  box.children.filter(n=>n.getAttribute?.('data-titledeck-gameinfo-description')):
  sel.includes('appdetailsgameinfopanel_Container')?[box]:
  sel.includes('appdetailsgameinfopanel_GameDescription')?box.children.filter(n=>n.className===native.className):
  query(sel);
 const text='A'.repeat(2100)+'\n'+'B'.repeat(700);
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':text,'620':'Another description'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
  assert.equal(adapter.runNow(),1);
  const pane=box.children[0];
  assert.equal(pane.lastChild.textContent,text);
  assert.equal(native.style.display,'none');
  for(let i=0;i<150;i++){
    assert.equal(adapter.runNow(),1,'native description must remain present in scan '+i);
    assert.equal(box.children[0],pane,'never recreate native replacement on scroll or observer pass '+i);
    assert.equal(box.children.length,2,'no duplicate descriptions at scan '+i);
  }
  delete state.descriptions['893180'];
  assert.equal(adapter.runNow(),0,'Restore Default removes this app but retains other descriptions');
  assert.equal(native.style.display,'','original native description must reappear immediately');
  assert.equal(box.children.length,1,'only Steam original is left');
  assert.equal(box.children[0],native);
  assert.equal(native.textContent,'Valve original Catherine description');
 }finally{adapter.stop()}
});
test('restoring a description cleans up orphan panels left by previous TitleDeck previews',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const box=p.node('div'),orphan=p.node('p'),native=p.node('p');
 box.className='appdetailsgameinfopanel_Container_x';
 orphan.className='appdetailsgameinfopanel_GameDescription_x';
 native.className=orphan.className;
 orphan.setAttribute('data-titledeck-gameinfo-description','893180');
 orphan.textContent='A long obsolete TitleDeck clone';
 native.textContent='Real Steam description';
 native.style.display='none';
 box.appendChild(orphan);box.appendChild(native);p.visible.appendChild(box);
 const q=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel==='[data-titledeck-gameinfo-description]'?[orphan].filter(x=>x.isConnected):
   q(sel);
 const state={enabled:true,description_position:'game_info',descriptions:{}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   assert.equal(adapter.runNow(),0);
   assert.equal(box.children.length,1,'old TitleDeck clone removed');
   assert.equal(box.children[0],native);
   assert.equal(native.style.display,'','Steam original visible after orphan recovery');
   assert.equal(native.textContent,'Real Steam description');
 }finally{adapter.stop()}
});
test('Restore Default completes removal even if Steam original style restoration throws',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const box=p.node('div'),native=p.node('p');
 box.className='appdetailsgameinfopanel_Container_x';
 native.className='appdetailsgameinfopanel_GameDescription_x';
 const values={display:'',blocked:false};
 native.style={
  get display(){return values.display},set display(v){values.display=v},
  getPropertyValue:k=>k==='display'?values.display:'',
  getPropertyPriority:()=>'',setProperty(k,v){values.display=v},
  removeProperty(){if(values.blocked)throw Error('Steam style locked');values.display=''}
 };
 box.appendChild(native);p.visible.appendChild(box);
 const q=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel==='[data-titledeck-gameinfo-description]'?
   box.children.filter(x=>x.getAttribute?.('data-titledeck-gameinfo-description')):
   sel.includes('appdetailsgameinfopanel_Container')?[box]:
   sel.includes('appdetailsgameinfopanel_GameDescription')?[native]:q(sel);
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'Test text'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(values.display,'none');
  values.blocked=true;
  delete state.descriptions['893180'];
  assert.equal(adapter.runNow(),0);
  assert.equal(box.children.length,1,'cleanup must remove clone despite the style failure');
  assert.equal(box.children[0],native);
  assert.equal(values.display,'','fallback should recover original visibility');
 }finally{adapter.stop()}
});


test('Restore Default exposes immediate explicit teardown of mounted Game Info pane',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const box=p.node('div'),original=p.node('p');
 box.className='appdetailsgameinfopanel_Container_x';
 original.className='appdetailsgameinfopanel_GameDescription_x';
 original.textContent='Steam original Catherine synopsis';
 box.appendChild(original);p.visible.appendChild(box);
 const q=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel==='[data-titledeck-gameinfo-description]'?
   box.children.filter(x=>x.getAttribute?.('data-titledeck-gameinfo-description')):
   sel.includes('appdetailsgameinfopanel_Container')?[box]:
   sel.includes('appdetailsgameinfopanel_GameDescription')?box.children.filter(x=>x.className===original.className):
   q(sel);
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'A'.repeat(1750),'620':'Portal text'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(original.style.display,'none');
  assert.equal(box.children.length,2);
  // Simulate backend deletion succeeding before the next auto-scan.
  delete state.descriptions['893180'];
  adapter.restoreGameInfo('893180');
  assert.equal(original.style.display,'','restore before waiting for background UI scan');
  assert.equal(box.children.length,1,'all TitleDeck native-looking clones removed');
  assert.equal(box.children[0],original);
  assert.equal(original.textContent,'Steam original Catherine synopsis');
  assert.equal(adapter.runNow(),0,'later scanner must not re-add removed description');
 }finally{adapter.stop()}
});


test('manager prefers existing Steam custom portrait artwork before remote store cover',async()=>{
 const m=await moduleForTest();
 const nonSteam=m.coverSources('2312439508');
 assert.deepEqual(nonSteam.slice(0,3),[
   '/customimages/2312439508p.png',
   '/customimages/2312439508p.jpg',
   '/customimages/2312439508p.webp'
 ]);
 assert(nonSteam.indexOf('/assets/2312439508/library_600x900.jpg')>=3);
 assert(nonSteam.at(-1).includes('steamstatic.com'));
 const ordinary=m.coverSources('620');
 assert(ordinary.includes('/assets/620/library_600x900.jpg'));
 assert(ordinary.some(src=>src.includes('/steam/apps/620/library_600x900.jpg')));
 assert(!ordinary.some(src=>src.includes('2312439508')));
 assert.deepEqual(m.coverSources('../etc'),[],'never interpolate unsafe IDs into art URLs');
 assert.deepEqual(m.coverSources('https://evil.example'),[]);
});
test('saved description in general editor is compact at 1005 and 4000 characters',async()=>{
 const m=await moduleForTest();
 for(const size of [505,765,1005,2800,4000]){
   const full='X'.repeat(size);
   const preview=m.savedDescriptionPreview(full);
   assert.equal(preview.length,size);
   assert(preview.excerpt.length<=211,'do not render an enormous description in manager');
   assert.equal(preview.truncated,true);
   const mock=setupMock({games:[{appid:'893180',name:'Catherine Classic'}],descriptions:{'893180':full},
     selected:'893180',view:'editor'});
   const {plugin}=await mock.init();
   try{
     const tree=walk(mock.render());
     const panel=tree.find(n=>n.props?.['data-td-saved-description-preview']==='true');
     assert(panel,'compact saved text panel missing');
     const content=walk(panel).flatMap(n=>n.children||[]).filter(x=>typeof x==='string').join(' ');
     assert(content.includes(size+' characters'));
     assert(content.includes('Full text is preserved'));
     assert(!content.includes(full),'a long saved description should not flood the editor');
     assert(tree.some(n=>n.props?.['data-td-focus']==='edit-description'),'full editor stays available');
   }finally{plugin.onDismount();mock.cleanup();}
 }
});
test('saved description preview flattens paragraph breaks while preserving original saved content',async()=>{
 const m=await moduleForTest();
 const text='First paragraph.\n\nSecond paragraph with   spaces.\nThird one.';
 const preview=m.savedDescriptionPreview(text,100);
 assert.equal(preview.excerpt,'First paragraph. Second paragraph with spaces. Third one.');
 assert.equal(preview.length,text.length);
 assert.equal(preview.truncated,false);
 assert.equal(m.savedDescriptionPreview('',210).excerpt,'');
});


test('description keyboard clear replaces Done editing and restores 1005 characters with Undo before Save',async()=>{
 const originalReact=globalThis.SP_REACT,originalUI=globalThis.DFL;
 const refs=[],states=[];let ri=0,si=0;
 globalThis.SP_REACT={
   createElement:(type,props,...children)=>({type,props:props||{},children:children.flat(Infinity)}),
   useRef(initial){const i=ri++;return refs[i]||(refs[i]={current:initial})},
   useState(initial){const i=si++;if(!states[i])states[i]={value:initial};
     return[states[i].value,next=>{states[i].value=typeof next==='function'?next(states[i].value):next}]},
   useEffect(){}
 };
 globalThis.DFL={TextField:'steam-description-field',Focusable:'focusable'};
 const m=await moduleForTest();
 let draft='Catherine '.repeat(100)+'more',fieldValue=draft;
 const saved='Previously saved original Catherine description';
 const update=value=>{draft=value};
 const render=kind=>{
   ri=0;si=0;
   const tree=m.InlineGameNameField({value:draft,setValue:update,maxLength:1020,
     fieldKind:kind,label:'Custom game description'});
   tree.props.ref.current={querySelector:()=>input};
   return tree;
 };
 const input={get value(){return fieldValue},set value(v){fieldValue=v}};
 try{
   assert(draft.length>1000);
   let tree=render('description'),nodes=walk(tree);
   let button=nodes.find(n=>n.props?.['data-td-description-clear']==='true');
   assert(button);
   assert.equal(button.children[0],'Clear text field');
   assert.equal(nodes.some(n=>n.children?.includes('Done editing')),false);
   assert.equal(button.props.disabled,false);
   resolveButton(button).props.onClick();
   assert.equal(draft,'','clear changes draft immediately');
   assert.equal(fieldValue,'','native text field is cleared immediately');
   assert.equal(saved,'Previously saved original Catherine description','no automatic backend deletion');
   tree=render('description');nodes=walk(tree);
   button=nodes.find(n=>n.props?.['data-td-description-clear']==='true');
   assert(button.children[0].includes('Undo clear'),'one-step undo remains available');
   resolveButton(button).props.onClick();
   assert(draft.length>1000,'Undo restores full draft without losing characters');
   assert.equal(fieldValue,draft);
   assert.equal(saved,'Previously saved original Catherine description');
   tree=render('description');
   button=walk(tree).find(n=>n.props?.['data-td-description-clear']==='true');
   assert.equal(button.children[0],'Clear text field');
 }finally{globalThis.SP_REACT=originalReact;globalThis.DFL=originalUI}
});
test('description clear undo expires when user types new text and name field retains Done editing',async()=>{
 const originalReact=globalThis.SP_REACT,originalUI=globalThis.DFL;
 const refs=[],states=[];let ri=0,si=0;
 globalThis.SP_REACT={
   createElement:(type,props,...children)=>({type,props:props||{},children:children.flat(Infinity)}),
   useRef(initial){const i=ri++;return refs[i]||(refs[i]={current:initial})},
   useState(initial){const i=si++;if(!states[i])states[i]={value:initial};
     return[states[i].value,next=>{states[i].value=typeof next==='function'?next(states[i].value):next}]},
   useEffect(){}
 };
 globalThis.DFL={TextField:'steam-field',Focusable:'focusable'};
 const m=await moduleForTest();
 let value='one thousand words of text',inputValue=value;
 const setValue=v=>{value=v};
 const input={get value(){return inputValue},set value(v){inputValue=v}};
 const render=kind=>{
   ri=0;si=0;const tree=m.InlineGameNameField({value,setValue,fieldKind:kind,maxLength:1020});
   tree.props.ref.current={querySelector:()=>input};
   return tree;
 };
 try{
   let tree=render('description');
   let button=walk(tree).find(n=>n.props?.['data-td-description-clear']==='true');
   resolveButton(button).props.onClick();
   tree=render('description');
   const field=walk(tree).find(n=>n.type==='steam-field');
   field.props.onChange({target:{value:'New text'}});
   inputValue='New text';
   tree=render('description');
   button=walk(tree).find(n=>n.props?.['data-td-description-clear']==='true');
   assert.equal(button.children[0],'Clear text field','typing invalidates Undo');
   assert.equal(value,'New text');
   assert.equal(walk(render('name')).some(n=>n.children?.includes('Done editing')),true);
   assert.equal(walk(render('name')).some(n=>n.props?.['data-td-description-clear']==='true'),false);
 }finally{globalThis.SP_REACT=originalReact;globalThis.DFL=originalUI}
});


test('Full Library Manager excludes Steam runtimes from manifests, AppOverviews and extras without hiding apps',async()=>{
 const m=await moduleForTest();
 const local=[
  {appid:'2805730',name:'Proton 9.0',installed:true},
  {appid:'1826330',name:'Proton EasyAntiCheat Runtime',installed:true},
  {appid:'228980',name:'Steamworks Common Redistributables',installed:true},
  {appid:'620',name:'Portal 2',installed:true},
  {appid:'2312439508',name:'Apple TV',installed:true},
  {appid:'1234567',name:'Proton Bus Simulator',installed:true}
 ];
 const extras=[
  {appid:'1493710',name:'Proton Experimental',app_type:1},
  {appid:'3099999',name:'Steam Linux Runtime (sniper)',app_type:1},
  {appid:'101010',name:'Real Music App',app_type:2},
  {appid:'888888',name:'Some Tool',app_type:4},
  {appid:'223344',name:'Normal Steam Game',app_type:1}
 ];
 const store={allApps:extras};
 const games=m.collectSteamGames(store,local,extras);
 assert.deepEqual(games.map(g=>g.name).sort(), ['Apple TV','Normal Steam Game','Portal 2','Proton Bus Simulator','Real Music App'].sort());
 assert.equal(m.isSteamUtility('1234567','Proton Bus Simulator',1),false);
 assert.equal(m.isSteamUtility('1826330','Renamed runtime',1),true,'known utility IDs still hidden');
 assert.equal(m.isSteamUtility('101010','Real Music App',2),false);
});

test('resolved cover source and negative results are cached across manager remounts until Refresh',async()=>{
 const m=await moduleForTest(),id='893180';
 m.resetCoverResolutionCache();
 assert.equal(m.cachedCoverStartIndex(id),0);
 m.rememberCoverResolution(id,0,false);
 assert.equal(m.cachedCoverStartIndex(id),1,'skip a previously failed image on next mount');
 m.rememberCoverResolution(id,1,false);
 m.rememberCoverResolution(id,2,false);
 m.rememberCoverResolution(id,3,true);
 assert.equal(m.cachedCoverStartIndex(id),3,'return directly to the working source');
 m.rememberCoverResolution(id,1,false);
 assert.equal(m.cachedCoverStartIndex(id),3,'out-of-order failure cannot replace a successful resolution');
 m.resetCoverResolutionCache();
 assert.equal(m.cachedCoverStartIndex(id),0,'explicit refresh checks art sources again');
});


test('Restore Default removes native-styled clone and repairs legacy cached text once',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const custom='C'.repeat(1409),originalText='Actual Valve Catherine description';
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':custom}};
 const store={GetDescriptions(id){return{strFullDescription:originalText,strSnippet:'Valve snippet',source:'steam'}}};
 const context={appDetailsStore:store,location:{pathname:'/library/app/893180',hash:'',search:''}};
 const data=m.createGameInfoDataAdapter(()=>state,()=>[context]);
 data.start();
 assert.equal(store.GetDescriptions(893180).strFullDescription,originalText,'Steam data untouched even while override visible');
 assert.equal(data.getOriginalDescription('893180'),originalText);
 const container=p.node('div'),native=p.node('p');
 container.className='appdetailsgameinfopanel_Container_x';
 native.className='appdetailsgameinfopanel_GameDescription_x';
 native.textContent=custom; // A leftover display from Preview 16's interception.
 container.appendChild(native);p.visible.appendChild(container);
 const query=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel==='[data-titledeck-gameinfo-description]'?
  container.children.filter(x=>x.getAttribute?.('data-titledeck-gameinfo-description')):
  sel.includes('appdetailsgameinfopanel_Container')?[container]:
  sel.includes('appdetailsgameinfopanel_GameDescription')?container.children.filter(x=>x.className===native.className):query(sel);
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test',id=>data.getOriginalDescription(id));
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(container.children.length,2);
  delete state.descriptions['893180'];
  adapter.restoreGameInfo('893180',custom);
  assert.equal(container.children.length,1,'remove TitleDeck clone');
  assert.equal(native.style.display,'','show Steam element');
  assert.equal(native.textContent,originalText,'one-time legacy stale repair');
  native.textContent=custom; // React may briefly repaint; do NOT fight React forever.
  assert.equal(adapter.runNow(),0);
  assert.equal(native.textContent,custom,'avoid repeated competing DOM writes');
  assert.equal(store.GetDescriptions(893180).strFullDescription,originalText);
 }finally{adapter.stop();data.stop()}
});
test('artwork cache hydrates successful source index from a previous Steam restart',async()=>{
 const m=await moduleForTest();
 m.resetCoverResolutionCache();
 m.hydrateCoverResolutionCache({'620':5,'2312439508':3,'not-an-id':0,'893180':22});
 assert.equal(m.cachedCoverStartIndex('620'),5);
 assert.equal(m.cachedCoverStartIndex('2312439508'),3);
 assert.equal(m.cachedCoverStartIndex('893180'),0,'invalid stored image indices ignored');
 m.rememberCoverResolution('620',5,false);
 assert.equal(m.cachedCoverStartIndex('620'),6,'stale saved image can fail over');
 m.rememberCoverResolution('620',6,true);
 assert.equal(m.cachedCoverStartIndex('620'),6);
 m.resetCoverResolutionCache();
 assert.equal(m.cachedCoverStartIndex('620'),0);
});

test('cover loading has legible fallback while image loads, rather than flashing blank',async()=>{
 const data=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
 assert(data.includes("className:'td-art-fallback td-art-pending'"));
 assert(data.includes("style:ready?null:{opacity:0}"));
 assert(data.includes("getOriginalDescription(id)"));
 assert(data.includes("call('save_cover_cache',successfulCoverIndices())"));
});

test('main Restore original game clears title AND description while granular description restore stays available',async()=>{
 const mock=setupMock({games:[{appid:'893180',name:'Catherine Classic'},{appid:'620',name:'Portal 2'}],
   aliases:{'893180':'Catherine','620':'Portal II'},selected:'893180',view:'editor',draft:'Catherine',
   descriptions:{'893180':'My 1409-character Catherine synopsis','620':'Portal description'}});
 const {plugin}=await mock.init();
 try{
   let nodes=walk(mock.render());
   const restore=nodes.find(n=>n.props?.['data-td-focus']==='edit-restore');
   const descOnly=nodes.find(n=>n.props?.['data-td-focus']==='edit-description-restore');
   assert(restore&&descOnly);
   assert(JSON.stringify(restore.children).includes('Restore original game'));
   restore.props.onClick();
   await new Promise(resolve=>setImmediate(resolve));
   assert.equal(mock.state.aliases['893180'],undefined);
   assert.equal(mock.state.descriptions['893180'],undefined);
   assert.equal(mock.state.aliases['620'],'Portal II','unrelated title untouched');
   assert.equal(mock.state.descriptions['620'],'Portal description','unrelated description untouched');
   nodes=walk(mock.render());
   assert.equal(nodes.find(n=>n.props?.['data-td-focus']==='edit-description-restore'),undefined);
   assert.equal(nodes.find(n=>n.type?.name==='InlineGameNameField')?.props.value,'Catherine Classic');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('granular description restore still leaves custom title unchanged',async()=>{
 const mock=setupMock({games:[{appid:'893180',name:'Catherine Classic'}],
   aliases:{'893180':'Catherine'},descriptions:{'893180':'Custom info'},
   selected:'893180',view:'editor',draft:'Catherine'});
 const {plugin}=await mock.init();try{
  const nodes=walk(mock.render());
  nodes.find(n=>n.props?.['data-td-focus']==='edit-description-restore').props.onClick();
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(mock.state.aliases['893180'],'Catherine');
  assert.equal(mock.state.descriptions['893180'],undefined);
 }finally{plugin.onDismount();mock.cleanup()}
});

test('Game Info mutation filter recognizes native tab remount but skips TitleDeck, GTM and Decky Store',async()=>{
 const m=await moduleForTest();
 const regular={nodeType:1,className:'appdetailsgameinfopanel_GameDescription_abc',parentElement:null,getAttribute:()=>null,closest:()=>null};
 const own={nodeType:1,className:'appdetailsgameinfopanel_GameDescription_abc',parentElement:null,
   getAttribute:key=>key==='data-titledeck-gameinfo-description'?'893180':null,
   closest:sel=>sel.includes('data-titledeck-gameinfo-description')?true:null};
 const plugin={nodeType:1,className:'decky-PluginStore-card',parentElement:null,getAttribute:()=>null,closest:()=>null};
 assert.equal(m.isSteamGameInfoMutation([{type:'childList',target:plugin,addedNodes:[plugin]}]),false);
 assert.equal(m.isSteamGameInfoMutation([{type:'childList',target:regular,addedNodes:[own]}]),false,
   'own DOM insertions must not trigger expensive redraws');
 assert.equal(m.isSteamGameInfoMutation([{type:'childList',target:plugin,addedNodes:[regular]}]),true,
   'insertion of native description must be serviced before paint');
 assert.equal(m.isSteamGameInfoMutation([{type:'characterData',target:regular,addedNodes:[]}]),true,
   'Steam can change native description text without remounting its element');
 assert.equal(m.isSteamGameInfoMutation([{type:'attributes',attributeName:'class',target:regular}]),true,
   'reveal of an existing Game Info tab is handled immediately');
 assert.equal(m.isSteamGameInfoMutation([{type:'attributes',attributeName:'style',target:own}]),false,
   'the style updates of our own clone do not cause repeated repaint loops');
 assert.equal(m.isSteamGameInfoMutation([{type:'attributes',attributeName:'style',target:plugin}]),false);
});

test('Game Info mutation detects anonymous Steam portal wrappers, not GTM content',async()=>{
 const m=await moduleForTest();
 const native={nodeType:1,className:'appdetailsgameinfopanel_GameDescription_hash',getAttribute:()=>null,closest:()=>null};
 const anonymous={nodeType:1,className:'',getAttribute:()=>null,closest:()=>null,
   querySelector:sel=>sel.includes('GameDescription')?native:null};
 const host={nodeType:1,className:'SteamPortalHost',getAttribute:()=>null,closest:()=>null};
 assert.equal(m.isSteamGameInfoMutation([{type:'childList',target:host,addedNodes:[anonymous]}]),true);
 const gtm={nodeType:1,className:'decky-PluginStore',getAttribute:()=>null,
   closest:sel=>sel.includes('decky')?true:null,querySelector:()=>null};
 assert.equal(m.isSteamGameInfoMutation([{type:'childList',target:gtm,addedNodes:[gtm]}]),false);
});

test('new Game Info tab mounts receive their custom text synchronously in observer callback',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const saved='Catherine custom description after changing tabs';
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':saved}};
 let observer;
 p.doc.defaultView.MutationObserver=class{
   constructor(cb){this.cb=cb;observer=this}
   observe(){}disconnect(){}
 };
 p.doc.addEventListener=()=>{};p.doc.removeEventListener=()=>{};
 p.doc.defaultView.addEventListener=()=>{};p.doc.defaultView.removeEventListener=()=>{};
 const wrap=p.node('div'),native=p.node('p');
 wrap.className='appdetailsgameinfopanel_Container_test';
 native.className='appdetailsgameinfopanel_GameDescription_test';
 native.textContent='Original Steam text';wrap.appendChild(native);
 const q=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel==='[data-titledeck-gameinfo-description]'?
   wrap.children.filter(n=>n.getAttribute?.('data-titledeck-gameinfo-description')):
   sel.includes('appdetailsgameinfopanel_Container')?[wrap].filter(n=>n.isConnected):
   sel.includes('appdetailsgameinfopanel_GameDescription')?[native].filter(n=>n.isConnected):q(sel);
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   adapter.start();
   assert(observer,'Steam DOM observer must be installed');
   assert.equal(adapter.shown,0,'Game Info not mounted yet');
   p.visible.appendChild(wrap);
   observer.cb([{type:'childList',target:p.visible,addedNodes:[wrap]}]);
   assert.equal(adapter.shown,1,'must apply immediately, without timer or extra scan');
   assert.equal(native.style.display,'none','Steam text hidden before browser paints');
   assert.equal(wrap.children[0].lastChild.textContent,saved);
   // The mutation generated by our own replacement is not a native repaint.
   assert.equal(m.isSteamGameInfoMutation([{type:'childList',target:wrap,addedNodes:[wrap.children[0]]}]),false);
 }finally{adapter.stop()}
});


test('controller can move right from Edit description to Restore Steam description only when saved',async()=>{
 const m=await moduleForTest();
 assert.equal(m.editorDestination('edit-description',12,{canRestoreDescription:true}),'edit-description-restore');
 assert.equal(m.editorDestination('edit-description',12,{canRestoreDescription:false}),'edit-hide');
 assert.equal(m.editorDestination('edit-description-restore',11,{canRestoreDescription:true}),'edit-description');
 assert.equal(m.editorDestination('edit-description-restore',10,{canRestoreDescription:true}),'edit-restore');
});

test('Game Info never pre-hides native text while the replacement is absent',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const head=p.node('head'),body=p.root;p.doc.head=head;p.doc.body=body;head._root=true;
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'Instant custom text'}};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   adapter.runNow();
   assert.equal(body.getAttribute('data-titledeck-gameinfo-active'),null,
     'missing Game Info must not expose a blank paragraph');
   assert.equal(head.children.length,0,'no blanket original-text concealment CSS');
   delete state.descriptions['893180'];adapter.restoreGameInfo('893180');
   assert.equal(head.children.length,0);
 }finally{adapter.stop()}
});

test('native description is warm-reused across Game Info remounts without full scans or transient blanks',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const text='A'.repeat(1409)+'\nSafe custom description';
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':text}};
 let observer;p.doc.defaultView.MutationObserver=class{constructor(cb){this.cb=cb;observer=this}observe(){}disconnect(){}};
 p.doc.addEventListener=()=>{};p.doc.removeEventListener=()=>{};
 p.doc.defaultView.addEventListener=()=>{};p.doc.defaultView.removeEventListener=()=>{};
 const makeTab=()=>{
   const wrap=p.node('section'),native=p.node('p');
   wrap.className='appdetailsgameinfopanel_Container_test';
   native.className='appdetailsgameinfopanel_GameDescription_test';
   native.textContent='Original Steam description';wrap.appendChild(native);
   return {wrap,native};
 };
 const originalQuery=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>{
   const tabs=p.visible.children.filter(n=>n.className.includes('gameinfopanel_Container')&&n.isConnected);
   if(sel==='[data-titledeck-gameinfo-description]')return tabs.flatMap(n=>n.children.filter(c=>c.getAttribute?.('data-titledeck-gameinfo-description')));
   if(sel.includes('appdetailsgameinfopanel_Container'))return tabs;
   if(sel.includes('appdetailsgameinfopanel_GameDescription'))return tabs.flatMap(n=>n.children.filter(c=>c.className.includes('GameDescription')&&!c.getAttribute?.('data-titledeck-gameinfo-description')));
   return originalQuery(sel);
 };
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   adapter.start();const fullScans=adapter.checks;
   const first=makeTab();p.visible.appendChild(first.wrap);
   observer.cb([{type:'childList',target:p.visible,addedNodes:[first.wrap]}]);
   assert.equal(adapter.shown,1);
   assert.equal(adapter.checks,fullScans,'first tab paints through targeted observer, not document-wide scan');
   assert.equal(first.native.style.display,'none');
   const panel=first.wrap.children[0],body=panel.lastChild;
   assert.equal(body.textContent,text);
   first.wrap.remove();
   const second=makeTab();p.visible.appendChild(second.wrap);
   observer.cb([{type:'childList',target:p.visible,addedNodes:[second.wrap]}]);
   assert.equal(adapter.checks,fullScans,'second tab must also avoid full DOM scans');
   assert.equal(second.wrap.children[0],panel,'cached filled element is reused');
   assert.equal(second.wrap.children[0].lastChild,body,'same already populated text body');
   assert.equal(body.textContent,text);
   assert.equal(second.native.style.display,'none');
   assert.equal(first.native.style.display,'','previous native element reset');
   assert.equal(second.wrap.children.length,2,'no duplicate clone');
   delete state.descriptions['893180'];
   adapter.restoreGameInfo('893180',text);
   assert.equal(second.native.style.display,'','Restore Original reveals Steam text');
   assert.equal(second.wrap.children.length,1);
 }finally{adapter.stop()}
});

test('route changes clear the old Game Info immediately instead of leaking custom text',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'Only for Catherine'}};
 let observer;p.doc.defaultView.MutationObserver=class{constructor(cb){observer=cb}observe(){}disconnect(){}};
 p.doc.addEventListener=()=>{};p.doc.removeEventListener=()=>{};
 p.doc.defaultView.addEventListener=()=>{};p.doc.defaultView.removeEventListener=()=>{};
 const wrap=p.node('div'),native=p.node('p');
 wrap.className='appdetailsgameinfopanel_Container_test';
 native.className='appdetailsgameinfopanel_GameDescription_test';native.textContent='Original';
 wrap.appendChild(native);p.visible.appendChild(wrap);
 const q=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel==='[data-titledeck-gameinfo-description]'?
   wrap.children.filter(n=>n.getAttribute?.('data-titledeck-gameinfo-description')):
   sel.includes('appdetailsgameinfopanel_Container')?[wrap].filter(n=>n.isConnected):
   sel.includes('appdetailsgameinfopanel_GameDescription')?[native].filter(n=>n.isConnected):q(sel);
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   adapter.start();assert.equal(adapter.shown,1);
   p.doc.defaultView.location.pathname='/library/app/999';
   observer([{type:'attributes',attributeName:'class',target:wrap}]);
   assert.equal(adapter.shown,0);
   assert.equal(native.style.display,'');
   assert.equal(wrap.children.length,1);
 }finally{adapter.stop()}
});

test('Preview 21: a newly mounted entire AppDetails root receives description without 4-second fallback',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const text='Game Info must be ready on the very first tab paint';
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':text}};
 let observer;
 p.doc.defaultView.MutationObserver=class{constructor(cb){observer=cb}observe(){}disconnect(){}};
 p.doc.addEventListener=()=>{};p.doc.removeEventListener=()=>{};
 p.doc.defaultView.addEventListener=()=>{};p.doc.defaultView.removeEventListener=()=>{};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   adapter.start();
   const initialScans=adapter.checks;
   // Steam may entirely replace AppDetails when reopening the Game Info tab,
   // invalidating the overview root captured by a previous full scan.
   p.visible.remove();
   const next=p.node('div');next.nodeType=1;next.className='AppDetailsContainer_new';
   next['__reactFiber$deck']={memoizedProps:{overview:{appid:893180}},return:null};
   const wrap=p.node('section');wrap.nodeType=1;
   wrap.className='appdetailsgameinfopanel_Container_next';
   const native=p.node('p');native.nodeType=1;
   native.className='appdetailsgameinfopanel_GameDescription_next';
   native.textContent='Original Steam text';wrap.appendChild(native);
   next.appendChild(wrap);p.root.appendChild(next);
   // Mock does not implement the native descendant querySelector; the short
   // mutation subtree walk needs to recover this regardless.
   observer([{type:'childList',target:p.root,addedNodes:[next]}]);
   assert.equal(adapter.shown,1,'the immediate observer, not the 4-second ticker, applies the text');
   assert.equal(adapter.checks,initialScans,'must not issue a document-wide scan');
   assert.equal(native.style.display,'none');
   assert.equal(wrap.children[0].lastChild.textContent,text);
   assert.equal(wrap.children.length,2);
   delete state.descriptions['893180'];adapter.restoreGameInfo('893180',text);
   assert.equal(native.style.display,'','restore still reveals Valve original');
   assert.equal(wrap.children.length,1,'restore removes only TitleDeck node');
 }finally{adapter.stop()}
});


test('Preview 23: generic active-game UI change triggers immediate Game Info render when class observer misses',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const saved='Game Info reacts to generic wrapper changes without 4 second polling';
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':saved}};
 let observer;
 p.doc.defaultView.MutationObserver=class{constructor(cb){observer=cb}observe(){}disconnect(){}};
 p.doc.addEventListener=()=>{};p.doc.removeEventListener=()=>{};
 p.doc.defaultView.addEventListener=()=>{};p.doc.defaultView.removeEventListener=()=>{};
 const q=p.doc.querySelectorAll;
 const wrap=p.node('section'),native=p.node('p'),generic=p.node('div');
 wrap.className='appdetailsgameinfopanel_Container_test';
 native.className='appdetailsgameinfopanel_GameDescription_test';native.textContent='Original Steam text';
 wrap.appendChild(native);
 p.doc.querySelectorAll=sel=>sel==='[data-titledeck-gameinfo-description]'?
   wrap.children.filter(n=>n.getAttribute?.('data-titledeck-gameinfo-description')):
   sel.includes('appdetailsgameinfopanel_Container')?[wrap].filter(n=>n.isConnected):
   sel.includes('appdetailsgameinfopanel_GameDescription')?[native].filter(n=>n.isConnected):q(sel);
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   adapter.start();const initialChecks=adapter.checks;
   p.visible.appendChild(wrap);p.visible.appendChild(generic);
   const records=[{type:'attributes',attributeName:'style',target:generic}];
   assert.equal(m.isSteamGameInfoMutation(records),false,'opaque generic wrapper should miss legacy class heuristics');
   observer(records);
   assert.equal(adapter.shown,1,'verified active page must paint without a four-second fallback');
   assert.equal(adapter.checks,initialChecks,'no full-document scans for generic active-game mutation');
   assert.equal(native.style.display,'none');
   assert.equal(wrap.children[0].lastChild.textContent,saved);
 }finally{adapter.stop()}
});

test('Preview 23: unrelated Decky and GTM changes never wake verified-game fallback',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'description'}};
 let observer;p.doc.defaultView.MutationObserver=class{constructor(cb){observer=cb}observe(){}disconnect(){}};
 p.doc.addEventListener=()=>{};p.doc.removeEventListener=()=>{};
 p.doc.defaultView.addEventListener=()=>{};p.doc.defaultView.removeEventListener=()=>{};
 const adapter=m.createDescriptionAdapter(p.doc,()=>state,()=>[],()=> 'AppDetailsContainer_test');
 try{
   adapter.start();const checks=adapter.checks;
   const gtm=p.node('div');gtm.className='decky-PluginStore';
   gtm.closest=sel=>sel.includes('decky')?gtm:null;
   const unrelated=[{type:'childList',target:gtm,addedNodes:[gtm]}];
   observer(unrelated);
   assert.equal(adapter.checks,checks);
   assert.equal(adapter.shown,0);
 }finally{adapter.stop()}
});

test('cold restart: persisted Steam Game Info description reappears after detail subtree mounts late',async()=>{
 const m=await moduleForTest(),p=nativeGamePageForDescription('893180');
 const saved={enabled:true,description_position:'game_info',descriptions:{'893180':'Persisted Catherine text after restart'}};
 const box=p.node('div'),original=p.node('p');
 box.className='appdetailsgameinfopanel_Container_cold';
 original.className='appdetailsgameinfopanel_GameDescription_cold';
 original.textContent='Original Steam Catherine description';
 box.appendChild(original);
 let mounted=false;
 const q=p.doc.querySelectorAll;
 p.doc.querySelectorAll=sel=>sel==='[data-titledeck-gameinfo-description]'?
   box.children.filter(n=>n.getAttribute?.('data-titledeck-gameinfo-description')):
   sel.includes('appdetailsgameinfopanel_Container')?(mounted?[box]:[]):
   sel.includes('appdetailsgameinfopanel_GameDescription')?(mounted?[original]:[]):q(sel);
 const adapter=m.createDescriptionAdapter(p.doc,()=>saved,()=>[],()=> 'AppDetailsContainer_test');
 try{
   assert.equal(adapter.runNow(),0,'Steam page may still be mounting on boot');
   p.visible.appendChild(box);mounted=true;
   assert.equal(adapter.runNow(),1,'hydrated persisted text should reappear when Steam finishes mounting');
   assert.equal(box.children[0].lastChild.textContent,saved.descriptions['893180']);
   assert.equal(original.style.display,'none');
   adapter.stop();
   // Simulate another completely fresh Steam UI process loading the same saved data.
   assert.equal(box.children.length,1,'stop restores native Game Info DOM');original.style.display='';
   const second=m.createDescriptionAdapter(p.doc,()=>saved,()=>[],()=> 'AppDetailsContainer_test');
   try{assert.equal(second.runNow(),1);assert.equal(box.children[0].lastChild.textContent,saved.descriptions['893180']);}
   finally{second.stop()}
 }finally{adapter.stop()}
});

test('native Preview 24 Steam renderer remains unchanged except boot scheduling and version',()=>{
 const src=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
 const reference=fs.readFileSync(path.join(root,'docs','PREVIEW24_SHA256.txt'),'utf8');
 assert.match(reference,/^[0-9a-f]{64}/);
 assert(src.includes('if(!owner||!description)return null;'),'keep Preview24 strict owner AND description contract');
 assert(src.includes('if(!found?.nativeDescription)return false;'),'do not use non-Steam fallback for native Steam description rendering');
 assert(src.includes('!prior.nativeNode?.isConnected||!prior.panel?.isConnected'),'preserve Preview24 native node lifecycle');
});

function nonSteamPage095(appid='3500000123'){
 const p=nativeGamePageForDescription(appid);
 // Browser documents have a connected <head> where TitleDeck's scoped CSS
 // paint guard can live; the old fake omitted it entirely.
 p.doc.head=p.node('head');p.doc.head._root=true;
 const base=p.doc.querySelectorAll;
 const root=p.visible;
 const message=p.node('p'),art=p.node('img'),steamPlay=p.node('p');
 art.setAttribute('src','https://cdn.example.test/mw2005-cover.jpg');
 message.textContent='Some detailed information on Need for Speed Most Wanted Black Edition is unavailable because it is a non-Steam game or mod. Steam will still manage launching the game for you and in most cases the in-game overlay will be available.';
 steamPlay.textContent='Runs on this computer via Steam Play. Proton 11 selected.';
 root.appendChild(message);root.appendChild(art);root.appendChild(steamPlay);
 const createStyle=()=>{
   const properties=new Map();return {
    setProperty(k,v,prio=''){properties.set(k,{v,prio})},
    getPropertyValue(k){return properties.get(k)?.v||''},
    getPropertyPriority(k){return properties.get(k)?.prio||''},
    removeProperty(k){properties.delete(k)},
   };
 };
 root.style=createStyle();message.style=createStyle();art.style=createStyle();steamPlay.style=createStyle();
 // Mock native CSSStyleDeclaration on freshly-created TitleDeck panels.
 const createPanel=p.doc.createElement;
 p.doc.createElement=tag=>{const el=createPanel(tag);el.style=createStyle();return el};
 const rects=new Map([[root,{left:30,top:210,right:1050,bottom:680,width:1020,height:470}],
   [message,{left:58,top:230,right:900,bottom:335,width:842,height:105}],
   [art,{left:65,top:355,right:245,bottom:620,width:180,height:265}]]);
 for(const [el,rect] of rects)el.getBoundingClientRect=()=>rect;
 root.querySelectorAll=sel=>{
   if(sel==='img')return [art];
   if(sel==='p, div, span, section, article')return [message,steamPlay];
   if(sel.includes('img, button'))return [art];
   return [];
 };
 message.querySelectorAll=()=>[];steamPlay.querySelectorAll=()=>[];
 p.doc.querySelectorAll=sel=>sel.includes('AppDetailsContainer')||sel.includes('AppDetailsRoot')?[root]:base(sel);
 p.doc.defaultView.getComputedStyle=()=>({display:'block',visibility:'visible',position:'static'});
 return {...p,message,art,steamPlay};
}

test('0.9.5 separates non-Steam shortcut descriptions from EXACT 0.9.4 Steam state',async()=>{
 const m=await moduleForTest();
 const steam={enabled:true,description_position:'game_info',descriptions:{'893180':'Catherine lives after restart'}};
 assert.equal(m.steamOnlyDescriptionState(steam),steam,'no copies or changes to Steam-only settings');
 assert.equal(m.isNativeSteamShortcutApp('893180'),false);
 assert.equal(m.isNativeSteamShortcutApp('3500000123'),true);
 assert.equal(m.isNativeSteamShortcutApp('3500000123',{GetAppOverviewByAppID:()=>({BIsModOrShortcut:()=>false})}),false,
  'known Steam app type outranks numerical shortcut guess');
 const mixed={...steam,descriptions:{...steam.descriptions,'3500000123':'Need for Speed MW'}};
 assert.deepEqual(m.steamOnlyDescriptionState(mixed).descriptions,steam.descriptions);
 assert.equal(mixed.descriptions['3500000123'],'Need for Speed MW','backend saved state must stay unmodified');
});

test('0.9.14 displays cover left and custom text right within native fallback element',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),original=p.message.textContent;
 const text='Need for Speed Most Wanted 2005 Black Edition, with custom tunes.';
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':text}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,text,'native Steam fallback is still replaced immediately');
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1');
  assert.match(p.message.style.getPropertyValue('--td-nonsteam-poster'),/mw2005-cover\.jpg/);
  assert.equal(p.art.style.getPropertyValue('display'),'none','only original poster is visually suppressed');
  assert.equal(p.visible.style.getPropertyValue('display'),'','native Steam Game Info root untouched');
  assert.equal(p.visible.children.length,3,'no React-owned children moved');
  assert.equal(p.steamPlay.style?.getPropertyValue?.('display'),'','Proton details untouched');
  assert.equal(p.message.style.getPropertyValue('left'),'');
  assert.equal(p.message.style.getPropertyValue('top'),'');
  const src=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
  assert.match(src,/grid-template-columns:minmax\(105px,180px\) minmax\(0,1fr\)/);
  assert.match(src,/grid-column:1 !important;[\s\S]*?background-image:var\(--td-nonsteam-poster\)/);
  assert.match(src,/grid-column:2 !important;[\s\S]*?max-height:none !important/);
  for(let i=0;i<25;i++)assert.equal(adapter.runNow(),1);
  assert.equal(p.visible.style.getPropertyValue('display'),'','rapid repaint cannot restyle Steam wrappers');
  state.descriptions['3500000123']='Updated non-Steam description';
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),'Updated non-Steam description');
  delete state.descriptions['3500000123'];
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.textContent,original);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),null);
  assert.equal(p.art.style.getPropertyValue('display'),'');
  assert.equal(p.message.style.getPropertyValue('--td-nonsteam-poster'),'');
 }finally{adapter.stop()}
});

test('0.9.7 non-Steam description reapplies after a simulated restart and original stays restored',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const original=p.message.textContent;
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Persistent after Steam Deck restart'}};
 let adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 assert.equal(adapter.runNow(),1);
 adapter.stop();
 assert.equal(p.message.textContent,original,'unmount safely restores original');
 adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,state.descriptions['3500000123']);
  state.descriptions={};
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.textContent,original);
  adapter.stop();
  adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.textContent,original);
 }finally{adapter.stop()}
});

test('0.9.7 does not replace arbitrary fallback text or another game identity',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const original=p.message.textContent;
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Private NFS text'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  p.message.textContent='Other Steam text mentioning non-Steam';
  assert.equal(adapter.runNow(),0);
  p.message.textContent=original;
  p.visible['__reactFiber$test'].memoizedProps.overview.appid=3500000999;
  assert.equal(adapter.runNow(),0);
  p.visible['__reactFiber$test'].memoizedProps.overview.appid=3500000123;
  assert.equal(adapter.runNow(),1);
  p.doc.defaultView.location.pathname='/library/app/3500000999';
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.textContent,original,'route change restores original');
 }finally{adapter.stop()}
});

test('0.9.14 non-Steam layout never uses shifting pixel offsets or Steam root grid',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Short native synopsis'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1');
  for(const k of ['position','left','top'])assert.equal(p.message.style.getPropertyValue(k),'');
  assert.equal(p.visible.style.getPropertyValue('display'),'');
  assert.equal(p.steamPlay.style?.getPropertyValue?.('grid-column'),'');
 }finally{adapter.stop()}
});

test('0.9.12 keeps saved non-Steam text in native flow if artwork is unavailable',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),original=p.message.textContent;
 p.art.remove();
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'No layout jump while loading'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,'No layout jump while loading');
  assert.equal(p.message.style.getPropertyValue('position'),'');
  assert.equal(p.visible.style.getPropertyValue('display'),'');
  assert.equal(p.visible.children.length,2);
 }finally{adapter.stop();assert.equal(p.message.textContent,original)}
});

test('0.9.7 uses the same Steam-native paragraph with original colors and font',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Readable NFS description'}};
 const orig=p.message.textContent;
 p.doc.defaultView.getComputedStyle=el=>({
  display:'block',visibility:'visible',opacity:'1',position:'static',
  color:el===p.message?'rgb(74, 79, 88)':'rgb(255, 255, 255)'
 });
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,'Readable NFS description');
  assert.equal(p.message.style.getPropertyValue('color'),'','native text inherits original paragraph color');
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1');
  assert.equal(p.visible.children.length,3);
 }finally{adapter.stop();assert.equal(p.message.textContent,orig)}
});

test('0.9.7 reasserts description if Steam React overwrites its native text during rapid tab switching',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const original=p.message.textContent,custom='Test Need for Speed Most Wanted 2005';
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':custom}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,custom);
  p.message.textContent=original; // React overwrites the SAME mounted text leaf.
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,custom,'repaints on original Steam-owned element');
  assert.equal(p.visible.children.length,3);
  delete state.descriptions['3500000123'];
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.textContent,original);
 }finally{adapter.stop()}
});

test('0.9.9 keeps non-Steam visual guard while Community hides Game Info',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const original=p.message.textContent;
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Non-Steam test'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  p.visible.offsetParent=null;
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),'Non-Steam test',
   'hidden Game Info retains visual guard until next reveal');
  p.visible.offsetParent={};
  assert.equal(adapter.runNow(),1,'visible panel is recognized again');
  assert.equal(p.message.textContent,'Non-Steam test');
 }finally{adapter.stop()}
});

test('0.9.7 refuses native fallback with React child elements to prevent element deletion',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),original=p.message.textContent;
 p.message.childElementCount=1;
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Unsafe to overwrite'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.textContent,original);
 }finally{adapter.stop()}
});

// 0.9.8: This catches the real Deck regression where the generic Valve message
// was painted for one frame before a 16 ms timeout replaced it. An observer
// callback MUST patch the mounted native leaf before returning.
test('0.9.8 replaces a React-overwritten non-Steam paragraph in its mutation callback, without timers',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const native=p.message.textContent,custom='Most Wanted native description: no generic flash';
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':custom}};
 let watcher;
 p.doc.defaultView.MutationObserver=class{
   constructor(cb){watcher=this;this.cb=cb}
   observe(){} disconnect(){}
 };
 p.doc.addEventListener=()=>{};p.doc.removeEventListener=()=>{};
 p.doc.defaultView.addEventListener=()=>{};p.doc.defaultView.removeEventListener=()=>{};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  adapter.start();assert(watcher,'mutation watcher attached');
  assert.equal(p.message.textContent,custom);
  p.message.textContent=native; // Steam commits the default text again.
  watcher.cb([{type:'characterData',target:{nodeValue:native,parentElement:p.message}}]);
  assert.equal(p.message.textContent,custom,'must be replaced synchronously BEFORE next paint');
  assert.equal(p.visible.children.length,3,'does not add a floating panel');
 }finally{adapter.stop()}
 assert.equal(p.message.textContent,native,'stop restores Steam paragraph');
});

test('0.9.8 patches a newly mounted non-Steam Game Info page on the same mutation turn',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const native=p.message.textContent,custom='Description on first visible Game Info frame';
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':custom}};
 let watcher;
 p.doc.defaultView.MutationObserver=class{
   constructor(cb){watcher=this;this.cb=cb}
   observe(){} disconnect(){}
 };
 p.doc.addEventListener=()=>{};p.doc.removeEventListener=()=>{};
 p.doc.defaultView.addEventListener=()=>{};p.doc.defaultView.removeEventListener=()=>{};
 // Community is visible, Game Info is not yet mounted.
 p.visible.offsetParent=null;
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  adapter.start();assert.equal(p.message.textContent,custom,'pre-hydrate the hidden Game Info page instead of waiting for tab reveal');
  p.visible.offsetParent={};
  watcher.cb([{type:'childList',target:p.root,addedNodes:[p.visible]}]);
  assert.equal(p.message.textContent,custom,'native fallback replaced before next paint');
  // React hides Game Info, then remounts/reveals it on the next tab switch.
  p.visible.offsetParent=null;
  watcher.cb([{type:'attributes',target:p.visible,attributeName:'class'}]);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),custom,'hidden tab retains guard for first visible frame');
  p.visible.offsetParent={};
  watcher.cb([{type:'attributes',target:p.visible,attributeName:'class'}]);
  assert.equal(p.message.textContent,custom,'next tab reveal also patched before paint');
  delete state.descriptions['3500000123'];
  watcher.cb([{type:'attributes',target:p.visible,attributeName:'class'}]);
  assert.equal(p.message.textContent,native,'Restore Original stays correct');
 }finally{adapter.stop()}
});


// 0.9.9: 0.9.8 still flashed Valve text: React could write to the
// native node AFTER our MutationObserver returned. A data-attribute-backed
// pseudo-element must remain the visible truth even when textContent changes.
test('0.9.9 visual guard prevents native non-Steam message flashing after arbitrary React text writes',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),native=p.message.textContent;
 const custom='Test need for speed most wanted 2005';
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':custom}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),custom);
  assert.equal(p.doc.head.children.length,1,'one stylesheet installed per Steam document');
  const css=p.doc.head.children[0].textContent;
  assert.match(css,/\[data-titledeck-nonsteam-live\]::before/);
  assert.match(css,/content:attr\(data-titledeck-nonsteam-live\)/);
  assert.match(css,/font-size:0 !important/,'untrusted React text is visually suppressed');
  p.message.textContent=native; // React resets it AFTER our last repaint.
  assert.equal(p.message.textContent,native);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),custom,
   'CSS-drawn text is stable even BEFORE a later observer callback');
  p.visible.offsetParent=null; // Steam hides rather than unmounts this tab.
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),custom,
   'no generic flash when same node is shown again');
  p.visible.offsetParent={};
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,custom);
  state.descriptions['3500000123']='A changed description with a second line\nAfter restart';
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),state.descriptions['3500000123'].trim());
  state.descriptions={};
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),null,
   'restoring deletes CSS-backed custom content');
  assert.equal(p.message.textContent,native);
 }finally{adapter.stop()}
 assert.equal(p.doc.head.children.length,0,'unmount removes only TitleDeck stylesheet');
});

test('0.9.9 visual guard never runs on a regular Steam game or the wrong shortcut',async()=>{
 const m=await moduleForTest();
 for(const id of ['893180','3500000999']){
  const p=nonSteamPage095(id),original=p.message.textContent;
  const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'NFS-only override'}};
  const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
  try{
   assert.equal(adapter.runNow(),0);
   assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),null);
   assert.equal(p.message.textContent,original);
   assert.equal(p.doc.head.children.length,0);
  }finally{adapter.stop()}
 }
});

test('0.9.9 clears paint guard on navigation without leaking shortcut description',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),native=p.message.textContent;
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Custom NFS'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  p.doc.defaultView.location.pathname='/library/app/3500000999';
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),null);
  assert.equal(p.message.textContent,native);
  assert.equal(p.message.style.getPropertyValue('font-size'),'','no inline font masking left behind');
 }finally{adapter.stop()}
});

// 0.9.10: Hardware reported 1-4 seconds of generic non-Steam description
// when quickly switching Community / Game Info. The prior adapter waited
// until the artwork was visible/measurable before applying ANY text. We must
// apply the saved description on the very first fallback paragraph mount.
test('0.9.10 paints non-Steam paragraph BEFORE delayed artwork appears',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const original=p.message.textContent;
 const custom='Test need for speed most wanted 2005';
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':custom}};
 // Steam mounts native text and only loads artwork after async React work.
 p.art.offsetParent=null;
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1,'no waiting for cover dimensions');
  assert.equal(p.message.textContent,custom,'generic fallback never survives first run');
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),custom);
  assert.equal(p.message.style.getPropertyValue('position'),'','cover loading must not induce absolute position or shift');
  assert.equal(p.message.style.getPropertyValue('left'),'');
  // When Steam mounts the artwork, paragraph is simply repositioned, not replaced.
  p.art.offsetParent={};
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,custom);
  assert.equal(p.message.style.getPropertyValue('position'),'');
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-live'),custom);
  delete state.descriptions['3500000123'];
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.textContent,original,'restore remains exact after late cover');
  assert.equal(p.message.style.getPropertyValue('position'),'');
 }finally{adapter.stop()}
});

test('0.9.10 rapidly switching tabs does not repeatedly move artwork or paragraph',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const original=p.message.textContent,custom='Keep original artwork stable';
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':custom}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  let positionWrites=0,topWrites=0;
  const oldSet=p.message.style.setProperty;
  p.message.style.setProperty=(name,...args)=>{
    if(name==='position')positionWrites++;
    if(name==='top'||name==='left')topWrites++;
    return oldSet(name,...args);
  };
  for(let i=0;i<35;i++){
    p.visible.offsetParent=null;
    assert.equal(adapter.runNow(),1,'override stays armed while Community hides page');
    p.visible.offsetParent={};
    assert.equal(adapter.runNow(),1);
    p.message.textContent=original; // React may rewrite the DOM text after our pass.
    assert.equal(adapter.runNow(),1);
    assert.equal(p.message.textContent,custom);
  }
  assert.equal(positionWrites,0,'no continuous artwork/description reflow');
  assert.equal(topWrites,0,'no moving description on every tab switch');
  assert.equal(p.art.parentElement,p.visible,'artwork DOM remains untouched');
 }finally{adapter.stop()}
});

test('0.9.10 non-Steam first-mount observer applies text even with no visible artwork',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const original=p.message.textContent,custom='Fast cover-independent fallback';
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':custom}};
 let watch;
 p.doc.defaultView.MutationObserver=class{
  constructor(cb){watch=this;this.cb=cb}
  observe(){} disconnect(){}
 };
 p.doc.addEventListener=()=>{};p.doc.removeEventListener=()=>{};
 p.doc.defaultView.addEventListener=()=>{};p.doc.defaultView.removeEventListener=()=>{};
 p.art.offsetParent=null;
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  adapter.start();
  assert.equal(p.message.textContent,custom,'before artwork: text already custom');
  p.message.textContent=original;
  watch.cb([{type:'characterData',target:{nodeValue:original,parentElement:p.message}}]);
  assert.equal(p.message.textContent,custom,'fast path repairs paragraph before next paint');
  p.art.offsetParent={};
  watch.cb([{type:'attributes',target:p.art,attributeName:'class'}]);
  assert.equal(p.message.textContent,custom,'art mounting must not cause generic flash');
 }finally{adapter.stop()}
});

// 0.9.11: Hardware photo showed long text clipped beside artwork, and cover
// briefly BELOW the text when Steam delayed mounting the portrait.
test('non-Steam description editor has no obsolete warning and never truncates saved text',async()=>{
 const mock=setupMock({games:[{appid:'3500000123',name:'MW2005'}],selected:'3500000123',view:'description'});
 const {mod,plugin}=await mock.init();
 try{
  const component=walk(mock.render()).find(n=>n.type===mod.InlineGameNameField&&n.props.fieldKind==='description');
  assert(component);assert.equal(component.props.nonSteamDescription,true);
  for(const length of [0,449,450,800,3000]){
   const rendered=mod.InlineGameNameField({...component.props,value:'A'.repeat(length)});
   const count=walk(rendered).find(n=>n.props['data-td-description-count']==='true');
   assert.deepEqual(count.children,[`${length} characters`]);
   assert(!count.props.className.includes('td-description-warning'));
   const field=walk(rendered).find(n=>n.props?.['aria-label']==='Custom game description');
   assert.equal(field.props.maxLength,undefined);
  }
  const view=walk(mock.render());
  assert(!view.some(n=>typeof n?.children==='string'&&n.children.includes('Yellow warning')));
 }finally{plugin.onDismount();mock.cleanup()}
});
test('0.9.14 cover mirror never rewrites outer Steam layout during rapid repaint',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'MW text'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1');
  assert.equal(p.art.style.getPropertyValue('display'),'none');
  const oldLayout=p.message.style.getPropertyValue('--td-nonsteam-poster');
  let writes=0;const originalSet=p.visible.style.setProperty;
  p.visible.style.setProperty=(name,...args)=>{writes++;return originalSet(name,...args)};
  for(let n=0;n<25;n++){
    p.art.getBoundingClientRect=()=>({left:40+n*5,top:50+n*7,right:180+n*5,bottom:250+n*7,width:140,height:200});
    assert.equal(adapter.runNow(),1);
  }
  assert.equal(writes,0,'Steam common ancestor is never styled, despite changing geometry');
  assert.equal(p.message.style.getPropertyValue('--td-nonsteam-poster'),oldLayout);
 }finally{adapter.stop()}
 assert.equal(p.art.style.getPropertyValue('display'),'','original artwork becomes visible on stop');
 assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),null);
});

test('0.9.12 missing artwork never hides custom description or switches to guessed offsets',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Longer non Steam text'}};
 p.art.remove();
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,'Longer non Steam text');
  assert.equal(p.message.style.getPropertyValue('top'),'');
  assert.equal(p.message.style.getPropertyValue('left'),'');
  assert.equal(p.visible.style.getPropertyValue('display'),'');
  p.visible.appendChild(p.art);
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1');
  assert.equal(p.message.style.getPropertyValue('position'),'');
 }finally{adapter.stop()}
});

test('0.9.13 refuses to grid navigation-heavy Steam UI, keeping description readable',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),before=p.message.textContent;
 const nav=p.node('nav'); nav.tagName='NAV';p.visible.appendChild(nav);p.visible.appendChild(p.node('div'));
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Do not move other Steam UI elements'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1,'save remains visible with unknown layout');
  assert.equal(p.message.textContent,'Do not move other Steam UI elements');
  assert.equal(p.visible.style.getPropertyValue('display'),'','no grid on a potentially complex root');
  assert.equal(p.message.style.getPropertyValue('position'),'','no absolute positioning fallback');
  assert.equal(p.art.parentElement,p.visible);
 }finally{adapter.stop();assert.equal(p.message.textContent,before)}
});

test('0.9.14 rebinds mirror when Steam remounts the artwork',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Persistent MW description'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.art.style.getPropertyValue('display'),'none');
  p.art.remove();
  const newArt=p.node('img');
  newArt.setAttribute('src','https://cdn.example.test/new-poster.jpg');
  newArt.style={...p.art.style};
  newArt.style.setProperty=p.art.style.setProperty.bind(p.art.style);
  newArt.style.getPropertyValue=()=>'';
  newArt.style.getPropertyPriority=()=>'';
  newArt.style.removeProperty=()=>{};
  newArt.getBoundingClientRect=()=>({left:65,top:355,right:245,bottom:620,width:180,height:265});
  p.visible.appendChild(newArt);
  const oldFind=p.visible.querySelectorAll;
  p.visible.querySelectorAll=sel=>sel==='img'?[newArt]:oldFind(sel);
  assert.equal(adapter.runNow(),1);
  assert.match(p.message.style.getPropertyValue('--td-nonsteam-poster'),/new-poster\.jpg/);
  assert.equal(p.message.textContent,'Persistent MW description');
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1');
 }finally{adapter.stop()}
});

// 0.9.14 must succeed in the actual problematic shape: fallback description
// is at the top of a separate wrapper and artwork is down in a different
// branch, surrounded by Steam-generated sections and nav buttons.
test('0.9.14 layout works across unrelated Steam wrappers containing navigation',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),native=p.message.textContent;
 const textWrapper=p.node('section'),coverWrapper=p.node('section'),nav=p.node('nav');
 const makeStyle=()=>{const a=new Map();return {setProperty:(k,v,p='')=>a.set(k,{v,p}),getPropertyValue:k=>a.get(k)?.v||'',getPropertyPriority:k=>a.get(k)?.p||'',removeProperty:k=>a.delete(k)}};
 for(const el of [textWrapper,coverWrapper,nav])el.style=makeStyle();
 textWrapper.appendChild(p.message);coverWrapper.appendChild(p.art);
 p.visible.appendChild(textWrapper);p.visible.appendChild(coverWrapper);p.visible.appendChild(nav);
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Rockport '.repeat(160)}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1',
    'description itself owns the side-by-side layout even when ancestors contain nav controls');
  assert.match(p.message.style.getPropertyValue('--td-nonsteam-poster'),/mw2005-cover/);
  assert.equal(p.visible.style.getPropertyValue('display'),'','root DOM structure is never restyled');
  assert.equal(p.art.parentElement,coverWrapper);
  assert.equal(p.message.parentElement,textWrapper);
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'');
  assert.equal(nav.style.getPropertyValue('display'),'');
  for(let i=0;i<30;i++)assert.equal(adapter.runNow(),1);
  delete state.descriptions['3500000123'];
  assert.equal(adapter.runNow(),0);
  assert.equal(p.message.textContent,native);
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),null);
  assert.equal(p.art.style.getPropertyValue('display'),'');
 }finally{adapter.stop()}
});

test('0.9.14 fails open if no usable poster source is available',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 p.art.removeAttribute('src');
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Still readable'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.message.textContent,'Still readable');
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),null);
  assert.equal(p.art.style.getPropertyValue('display'),'');
 }finally{adapter.stop()}
});

test('1.0.0 color choices are strictly validated and wine red remains the default',async()=>{
 const m=await moduleForTest();
 assert.equal(m.validAccent(''), 'wine');
 assert.equal(m.validAccent('purple'), 'purple');
 assert.equal(m.validAccent('#8B1E3F'),'#8b1e3f');
 assert.equal(m.validAccent('url(steal:library)'), 'wine');
 assert.equal(m.validAccent('#aabbcc;background:red'), 'wine');
 assert.equal(m.TITLEDECK_ACCENTS.wine.name,'Wine Red');
});
test('1.0.0 right stick deadzone and signed Steam stick values',async()=>{
 const m=await moduleForTest();
 assert.equal(m.normalizedRightStickY({axes:[0,0,0,0.1]}),0);
 assert(m.normalizedRightStickY({axes:[0,0,0,0.9]})>0.8);
 assert(m.normalizedRightStickY({rStickY:-32767})<-0.99);
 assert(m.normalizedRightStickY({sRightStickY:-32767})>0.99,'Steam Y down scrolls downward');
 assert.equal(m.normalizedRightStickY({rStickY:NaN}),0);
 assert.equal(m.normalizedRightStickY(null),0);
});
test('1.0.0 scrolls a real overflow ancestor rather than a CSS generated-text layer',async()=>{
 const m=await moduleForTest();
 const doc={defaultView:{getComputedStyle:el=>({overflowY:el.scrollHeight>el.clientHeight?'auto':'visible'})}};
 const scroller={scrollHeight:1200,clientHeight:300,ownerDocument:doc,parentElement:null};
 const message={ownerDocument:doc,parentElement:scroller};
 assert.equal(m.findScrollableGameInfo(message),scroller);
 assert.equal(m.findScrollableGameInfo({ownerDocument:doc,parentElement:{scrollHeight:150,clientHeight:150,parentElement:null}}),null);
});
test('1.0.0 collapses only artwork-only native wrappers; never Proton siblings',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const wrapper=p.doc.createElement('div');p.visible.appendChild(wrapper);wrapper.appendChild(p.art);
 wrapper.querySelectorAll=sel=>sel==='img'?[p.art]:sel==='*'?[p.art]:[];
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'NFS custom text'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(wrapper.style.getPropertyValue('display'),'none','isolated ghost wrapper must disappear');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'','Proton text stays intact');
  delete state.descriptions['3500000123'];adapter.runNow();
  assert.equal(wrapper.style.getPropertyValue('display'),'','restore original artwork wrapper');
 }finally{adapter.stop()}
});
test('1.0.0 manager supplies visible paging and wine red styling without Steam CSS changes',async()=>{
 const games=Array.from({length:32},(_,i)=>({appid:String(124000+i),name:'Game '+i}));
 const mock=setupMock({games});const {plugin}=await mock.init();
 try{
  const tree=mock.render(),nodes=walk(tree);
  assert(nodes.some(n=>n.props['data-td-focus']==='tool-page-prev'));
  assert(nodes.some(n=>n.props['data-td-focus']==='tool-page-next'));
  assert(nodes.find(n=>n.props['data-titledeck-ui']==='true')?.props.style?.['--td-accent']);
  assert(!source.includes('.appdetailsgameinfo{background:var(--td-accent)'));
 }finally{plugin.onDismount();mock.cleanup()}
});

test('1.0.1 full manager theme covers panels, tiles, controls and text, not accent alone', async()=>{
 const m=await moduleForTest();
 const p=m.themeColors('wine');
 for(const key of ['main','backdrop','surface','raised','tile','inset','muted'])
   assert.match(p[key],/^#[0-9a-f]{6}$/i,key);
 assert.notEqual(p.backdrop,p.tile);
 assert.notEqual(m.themeColors('green').backdrop,p.backdrop);
 assert.match(source,/\.td-root \.td-workspace\{background:linear-gradient/);
 assert.match(source,/\.td-root \.td-header,\.td-root \.td-rail/);
 assert.match(source,/@keyframes tdFocusHeartbeat/);
 const mock=setupMock({games:[{appid:'893180',name:'Catherine Classic'}]});
 const {plugin}=await mock.init();
 try{
  const root=walk(mock.render()).find(n=>n.props['data-titledeck-ui']==='true');
  assert.equal(root.props.style['--td-backdrop'],p.backdrop);
  assert.equal(root.props.style['--td-tile'],p.tile);
 }finally{plugin.onDismount();mock.cleanup()}
});

test('1.0.1 Steam Game Info right stick scrolls a saved description panel, never other pages',async()=>{
 const m=await moduleForTest(),id='893180';
 const scroller={scrollHeight:1250,clientHeight:300,scrollTop:0,parentElement:null};
 const doc={defaultView:{location:{pathname:'/library/app/'+id},getComputedStyle:()=>({overflowY:'auto'})}};
 const panel={ownerDocument:doc,isConnected:true,offsetParent:{},parentElement:scroller,
   getAttribute:key=>key==='data-titledeck-gameinfo-description'?id:null};
 doc.querySelectorAll=sel=>sel.includes('data-titledeck-gameinfo-description')?[panel]:[];
 const state={enabled:true,description_position:'game_info',descriptions:{[id]:'Catherine full story'}};
 assert.equal(m.scrollSteamGameInfoByStick(1,()=>[doc],()=>state),true);
 assert.equal(scroller.scrollTop,25);
 delete state.descriptions[id];
 assert.equal(m.scrollSteamGameInfoByStick(1,()=>[doc],()=>state),false);
 assert.equal(scroller.scrollTop,25);
});

test('1.0.1 Scroll to Top button is reversible and scoped to active Game Info overrides',async()=>{
 const m=await moduleForTest(),id='893180';
 const props=new Map();
 const style={getPropertyValue:k=>props.get(k)?.value||'',getPropertyPriority:k=>props.get(k)?.priority||'',
   setProperty:(k,value,priority='')=>props.set(k,{value,priority}),removeProperty:k=>props.delete(k)};
 const button={style,textContent:'SCROLL TO TOP',className:'',getAttribute:()=>null};
 const marker={isConnected:true,offsetParent:{},getAttribute:k=>k==='data-titledeck-gameinfo-description'?id:null};
 const doc={defaultView:{location:{pathname:'/library/app/'+id}},querySelectorAll:sel=>
   sel.includes('ScrollToTop')?[button]:sel.includes('data-titledeck-gameinfo-description')?[marker]:[]};
 const state={enabled:true,description_position:'game_info',descriptions:{[id]:'Custom Description'}};
 const cleaner=m.createScrollTopCleaner(()=>[doc],()=>state);
 cleaner.runNow();assert.equal(style.getPropertyValue('display'),'none');
 state.descriptions={};cleaner.runNow();assert.equal(style.getPropertyValue('display'),'');
 state.descriptions={[id]:'Custom Description'};cleaner.runNow();
 cleaner.stop();assert.equal(style.getPropertyValue('display'),'');
});

test('1.0.1 collapses artwork-only wrappers containing empty decorative siblings',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const wrapper=p.doc.createElement('div');
 const decoration=p.doc.createElement('div');
 p.visible.appendChild(wrapper);wrapper.appendChild(p.art);wrapper.appendChild(decoration);
 wrapper.querySelectorAll=sel=>sel==='img'?[p.art]:sel==='*'?[p.art,decoration]:[];
 decoration.querySelectorAll=()=>[];
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'NFS story'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(wrapper.style.getPropertyValue('display'),'none');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'');
  delete state.descriptions['3500000123'];adapter.runNow();
  assert.equal(wrapper.style.getPropertyValue('display'),'');
 }finally{adapter.stop()}
});

test('1.0.2 Steam div-based Scroll to Top action hides and restores without matching unrelated text',async()=>{
 const m=await moduleForTest(),id='893180';
 const props=new Map(),style={getPropertyValue:k=>props.get(k)?.value||'',getPropertyPriority:k=>props.get(k)?.priority||'',
  setProperty:(k,value,priority='')=>props.set(k,{value,priority}),removeProperty:k=>props.delete(k)};
 const button={style,isConnected:true,tagName:'DIV',className:'appdetails_ScrollToTop_abc',textContent:'SCROLL TO TOP',
   parentElement:null,getAttribute:()=>null};
 const unrelated={style,tagName:'DIV',className:'GameDescription',textContent:'Scroll to top to read the story',parentElement:null,getAttribute:()=>null};
 const marker={isConnected:true,offsetParent:null,getAttribute:k=>k==='data-titledeck-gameinfo-description'?id:null};
 const doc={defaultView:{location:{pathname:'/library/app/'+id}},querySelectorAll:sel=>
   sel.includes('data-titledeck-gameinfo-description')?[marker]:[button,unrelated]};
 const state={enabled:true,description_position:'game_info',descriptions:{[id]:'Custom'}};
 assert.deepEqual(m.findSteamScrollTopControls(doc),[button]);
 const cleaner=m.createScrollTopCleaner(()=>[doc],()=>state);
 cleaner.runNow();assert.equal(style.getPropertyValue('display'),'none');
 cleaner.stop();assert.equal(style.getPropertyValue('display'),'');
});

test('1.0.2 manager returns both library and Steam route scroll to top safely',async()=>{
 const m=await moduleForTest();
 const work={scrollTop:700};
 const outer={scrollTop:155,parentElement:null};
 const scroll={scrollTop:110};
 const root={parentElement:outer,ownerDocument:{scrollingElement:scroll},querySelector:()=>work};
 assert.equal(m.scrollManagerToTop(root),true);
 assert.equal(work.scrollTop,0);assert.equal(outer.scrollTop,0);assert.equal(scroll.scrollTop,0);
 assert.equal(m.scrollManagerToTop(null),false);
});

test('1.0.2 installed indicator is green independent of the renamed badge and tiles are glass',async()=>{
 assert.match(source,/td-installed-dot/);
 assert.match(source,/color:#39ee94!important/);
 assert.match(source,/backdrop-filter:blur\(14px\)/);
 assert.doesNotMatch(source,/data-td-focus':'tool-home'/);
 const mock=setupMock({games:[{appid:'1234',name:'A Test Game',installed:true}]});
 const {plugin}=await mock.init();
 try{
  const nodes=walk(mock.render());
  assert(nodes.some(n=>n.props?.['data-td-focus']==='tool-page-prev'));assert(nodes.some(n=>n.props?.['data-td-focus']==='tool-page-next'));
 }finally{plugin.onDismount();mock.cleanup()}
});

test('1.0.2 repeated non-Steam artwork wrappers preserve the real image reference',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const wrapper=p.doc.createElement('div');
 const decoration=p.doc.createElement('div');
 p.visible.appendChild(wrapper);wrapper.appendChild(p.art);wrapper.appendChild(decoration);
 wrapper.querySelectorAll=sel=>sel==='img'?[p.art]:sel==='*'?[p.art,decoration]:[];
 decoration.querySelectorAll=()=>[];
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'NFS story'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(wrapper.style.getPropertyValue('display'),'none');
  assert.equal(adapter.runNow(),1,'repeat render must not mistake wrapper for source IMG');
  assert.equal(wrapper.style.getPropertyValue('display'),'none','blank wrapper remains collapsed');
  assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'');
  delete state.descriptions['3500000123'];adapter.runNow();
  assert.equal(wrapper.style.getPropertyValue('display'),'','original wrapper restored');
 }finally{adapter.stop()}
});

test('1.0.3 Proton compatibility line stays in native scroll flow and never gets translated out of view',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const baseQuery=p.visible.querySelectorAll;
 p.visible.querySelectorAll=selector=>selector==='div,p,span'?[p.message,p.steamPlay]:baseQuery(selector);
 p.visible.clientHeight=400;p.visible.scrollHeight=900;p.visible.scrollTop=100;
 p.visible.getBoundingClientRect=()=>({left:30,top:150,right:970,bottom:690,width:940,height:540});
 p.steamPlay.getBoundingClientRect=()=>({left:50,top:470,right:800,bottom:490,width:750,height:20});
 p.doc.defaultView.getComputedStyle=()=>({display:'block',visibility:'visible',overflowY:'auto'});
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'A long story'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  adapter.alignFooter();
  p.visible.scrollTop=500;
  adapter.alignFooter();
  assert.equal(p.steamPlay.style.getPropertyValue('translate'),'','Proton never leaves the actual scrollable bounds');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'');
  state.descriptions={};adapter.runNow();
  assert.equal(p.steamPlay.style.getPropertyValue('translate'),'','restoration keeps native position');
 }finally{adapter.stop()}
});


test('1.0.3 LB/RB buttons are labeled as controller paging and installed badges remain green',async()=>{
 const mock=setupMock({games:[{appid:'1234',name:'Installed game',installed:true}]});
 const {plugin}=await mock.init();
 try{
  const all=walk(mock.render());
  assert(all.some(n=>n.props?.['data-td-focus']==='tool-page-prev'&&n.children?.includes('◀ LB')));
  assert(all.some(n=>n.props?.['data-td-focus']==='tool-page-next'&&n.children?.includes('RB ▶')));
  assert.match(source,/\.td-installed-dot\{color:#39ee94/);
 }finally{plugin.onDismount();mock.cleanup()}
});

test('1.0.3 tile scrolling is confined to the manager grid and cannot scroll the outer Steam route',async()=>{
 const m=await moduleForTest();
 const work={scrollTop:150,getBoundingClientRect:()=>({top:190,bottom:590})};
 const el={closest:q=>q.includes('data-td-scroll')?work:null,getBoundingClientRect:()=>({top:620,bottom:710})};
 assert.equal(m.scrollLibraryTileIntoView(el),true);
 assert.equal(work.scrollTop,273);
 work.scrollTop=100;el.getBoundingClientRect=()=>({top:120,bottom:180});
 assert.equal(m.scrollLibraryTileIntoView(el),true);
 assert.equal(work.scrollTop,27);
 assert.equal(m.scrollLibraryTileIntoView({closest:()=>null}),false);
});

test('1.0.3 manager adds only missing space under SteamOS fixed top header',async()=>{
 const m=await moduleForTest();let stored='';
 const root={style:{getPropertyValue:key=>key==='--td-top-safe'?stored:'',setProperty:(key,val)=>{if(key==='--td-top-safe')stored=val}},
  getBoundingClientRect:()=>({top:22+(parseFloat(stored)||0)})};
 assert.equal(m.fitManagerBelowSteamHeader(root,{innerHeight:720}),42);
 assert.equal(stored,'42px');
 assert.equal(m.fitManagerBelowSteamHeader(root,{innerHeight:720}),42,'layout remains stable on second check');
 assert.match(source,/margin-top:var\(--td-top-safe,0px\)/);
});

test('1.0.3 artwork-only wrappers with decorative SVG are collapsed but Proton is untouched',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const inner=p.doc.createElement('div'),outer=p.doc.createElement('div'),svg=p.doc.createElement('svg');
 p.visible.appendChild(outer);outer.appendChild(inner);inner.appendChild(p.art);inner.appendChild(svg);
 outer.querySelectorAll=sel=>sel==='img'?[p.art]:sel==='*'?[inner,p.art,svg]:[];
 inner.querySelectorAll=sel=>sel==='img'?[p.art]:sel==='*'?[p.art,svg]:[];
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'NFS story'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(outer.style.getPropertyValue('display'),'none','art-only wrapper collapsed, not just IMG');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'','Proton text never hidden');
  state.descriptions={};adapter.runNow();
  assert.equal(outer.style.getPropertyValue('display'),'','original artwork restored');
 }finally{adapter.stop()}
});


test('1.0.3 blue Scroll to Top nested caption hides its whole small control wrapper',async()=>{
 const m=await moduleForTest();
 const props=new Map();
 const style={getPropertyValue:k=>props.get(k)?.value||'',getPropertyPriority:k=>props.get(k)?.priority||'',setProperty:(k,v,p)=>props.set(k,{value:v,priority:p}),removeProperty:k=>props.delete(k)};
 const text={style:{},tagName:'SPAN',className:'',textContent:'SCROLL TO TOP',getAttribute:()=>null};
 const inner={style:{},tagName:'DIV',className:'buttonContent',textContent:'SCROLL TO TOP',getAttribute:()=>null,parentElement:null,getBoundingClientRect:()=>({width:140,height:20})};
 const wrapper={style,tagName:'DIV',className:'appdetails_scroll_top',textContent:'SCROLL TO TOP',getAttribute:()=>null,parentElement:null,getBoundingClientRect:()=>({width:270,height:36})};
 text.parentElement=inner;inner.parentElement=wrapper;
 const doc={querySelectorAll:()=>[text,inner,wrapper]};
 assert.deepEqual(m.findSteamScrollTopControls(doc),[wrapper]);
});

test('1.0.4 settings controller directions follow vertical rows, with a real swatch grid',async()=>{
 const m=await moduleForTest();
 assert.equal(m.settingsFocusDestination('setting-backup',10),'setting-backup-restore');
 assert.equal(m.settingsFocusDestination('setting-placement-info',10),'setting-placement-hero');
 assert.equal(m.settingsFocusDestination('setting-theme',10),'setting-stick');
 assert.equal(m.settingsFocusDestination('setting-stick',10),'setting-swatch-0');
 assert.equal(m.settingsFocusDestination('setting-swatch-0',12),'setting-swatch-1');
 assert.equal(m.settingsFocusDestination('setting-swatch-1',10),'setting-swatch-5');
 assert.equal(m.settingsFocusDestination('setting-swatch-10',10),'setting-custom-edit');
 assert.equal(m.settingsFocusDestination('setting-custom-edit',10),'setting-custom');
 assert.equal(m.settingsFocusDestination('setting-custom-edit',9),'setting-swatch-8');
 assert.equal(m.settingsFocusDestination('setting-custom',9),'setting-custom-edit');
 assert.equal(m.settingsFocusDestination('setting-custom',10),'setting-restore-all');
 assert.equal(m.settingsFocusDestination('setting-theme',12),null);
 assert.equal(m.TITLEDECK_COLOR_SWATCHES.length,12);
 assert.match(source,/td-color-picker/);
});

test('1.0.4 LB RB paging scrolls only the intended grid to a destination row',async()=>{
 const m=await moduleForTest();
 const rootBox={top:120},work={scrollTop:0,getBoundingClientRect:()=>rootBox};
 const row={getBoundingClientRect:()=>({top:950})};
 const root={querySelector:sel=>sel==='[data-td-scroll="library"]'?work:sel==='[data-td-row="3"]'?row:null};
 assert.equal(m.scrollLibraryPageToIndex(root,12,4),true);
 assert.equal(work.scrollTop,827);
 assert.equal(m.scrollLibraryPageToIndex(root,0,4),false);
});

test('1.0.4 settings focus scrolls its own workspace and not Steam header',async()=>{
 const m=await moduleForTest();
 const work={scrollTop:125,getBoundingClientRect:()=>({top:80,bottom:500})};
 const el={closest:()=>work,getBoundingClientRect:()=>({top:670,bottom:710})};
 assert.equal(m.scrollManagerNodeIntoView(el),true);
 assert.equal(work.scrollTop,340);
});

test('1.0.4 no inert Top button, palette remains selectable and title metadata updated',()=>{
 assert.doesNotMatch(source,/'data-td-focus':'tool-home'/);
 assert.match(source,/pageLibraryRef\.current=pageLibrary/);
 assert.match(source,/focusNode\(tile\)/);
 assert.match(source,/grid-template-columns:minmax\(0,1fr\)!important/);
 assert.match(source,/TITLEDECK_COLOR_SWATCHES/);
 assert.match(source,/PLUGIN_VERSION = '1.2.1'/);
});

test('1.0.4 Steam scroll-to-top cleanup can reach an outer UI document with no library route',async()=>{
 const m=await moduleForTest(),properties=new Map();
 const style={getPropertyValue:key=>properties.get(key)||'',getPropertyPriority:()=>'',setProperty:(key,value)=>properties.set(key,value),removeProperty:key=>properties.delete(key)};
 const control={style,isConnected:true,tagName:'DIV',className:'appdetails_ScrollToTop_hash',textContent:'SCROLL TO TOP',parentElement:null,getAttribute:()=>null};
 const gameDoc={defaultView:{location:{pathname:'/library/app/893180'}},querySelectorAll:()=>[]};
 const outerDoc={defaultView:{location:{pathname:'/'}},querySelectorAll:()=>[control]};
 const state={enabled:true,description_position:'game_info',descriptions:{'893180':'Custom text'}};
 const cleaner=m.createScrollTopCleaner(()=>[gameDoc,outerDoc],()=>state);
 try{cleaner.runNow();assert.equal(style.getPropertyValue('display'),'none');state.descriptions={};cleaner.runNow();assert.equal(style.getPropertyValue('display'),'')}
 finally{cleaner.stop()}
});

test('1.0.4 accent picker has reachable swatches and keyboard edit button in Settings',async()=>{
 const m=await moduleForTest();
 assert.equal(m.settingsFocusDestination('setting-custom-edit',9),'setting-swatch-8');
 assert.equal(m.settingsFocusDestination('setting-custom-edit',10),'setting-custom');
 const mock=setupMock({games:[{appid:'1234',name:'A Test Game',installed:true}]});
 const {plugin}=await mock.init();
 try{
  const view=walk(mock.render());
  // Settings are mounted lazily by user navigation. The source guarantees that
  // the named, keyboard-focusable action is actually emitted with a focus ID.
  assert.match(source,/focus:'setting-custom-edit'/);
  assert.match(source,/h\(UI\?\.TextField\|\|'input'/);
 }finally{plugin.onDismount();mock.cleanup()}
});

test('1.0.5 non-Steam description position is one Steam-native vertical focus group',async()=>{
 const mock=setupMock({view:'settings'}),{plugin}=await mock.init();
 try{
  const nodes=walk(mock.render());
  const positionGroup=nodes.find(n=>n.props?.className?.includes?.('td-description-position-options'));
  assert(positionGroup,'description position choices are grouped');
  assert.equal(positionGroup.type,'focusable');
  assert.equal(positionGroup.props['flow-children'],'down');
  assert.deepEqual(positionGroup.children.map(n=>n.props?.['data-td-focus']),[
   'setting-placement-info','setting-placement-hero','setting-placement-below']);
  const root=nodes.find(n=>n.props.className?.includes?.('td-root'));
  const elements=new Map(),tree=[];
  for(const child of positionGroup.children){
   const name=child.props['data-td-focus'];
   const el={ownerDocument:{activeElement:null},focus(){this.ownerDocument.activeElement=this},scrollIntoView(){}};
   elements.set(name,el);
   tree.push({m_element:el,BTakeFocus(){this.focused=true;return true}});
  }
  root.props.ref.current={querySelector(q){const key=/\[data-td-focus="([^"]+)"\]/.exec(q)?.[1];return elements.get(key)||null}};
  globalThis.DFL.getGamepadNavigationTrees=()=>[{m_Children:tree}];
  const first=resolveButton(positionGroup.children[0]);
  let consumed=false;
  assert.equal(first.props.onGamepadDirection({detail:{button:10},preventDefault(){consumed=true},stopPropagation(){}}),true);
  assert.equal(consumed,true,'Down must be consumed before Steam defaults to Right');
  assert.equal(tree[1].focused,true,'Game Info Down focuses Artwork Footer, not a horizontal candidate');
  const second=resolveButton(positionGroup.children[1]);
  tree.forEach(node=>node.focused=false);
  assert.equal(second.props.onGamepadDirection({detail:{button:10},preventDefault(){},stopPropagation(){}}),true);
  assert.equal(tree[2].focused,true,'second Down focuses Below Play');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('1.0.5 LB/RB buttons use Steam focus navigation instead of raw .focus with preventScroll',async()=>{
 const games=Array.from({length:48},(_,i)=>({appid:String(20000+i),name:'Game '+i}));
 const mock=setupMock({games}),{plugin}=await mock.init();
 try{
  const nodes=walk(mock.render()),root=nodes.find(n=>n.props.className?.includes?.('td-root'));
  const next=nodes.find(n=>n.props['data-td-focus']==='tool-page-next');
  let focused=0;
  const tile={ownerDocument:{activeElement:null},getAttribute:()=>null,closest:()=>null,
   scrollIntoView(){},focus(){this.ownerDocument.activeElement=this}};
  const grid={scrollTop:0,getBoundingClientRect:()=>({top:100,bottom:500})};
  tile.closest=selector=>selector.includes('data-td-scroll')?grid:null;
  const tileBox={top:800,bottom:990};tile.getBoundingClientRect=()=>tileBox;
  root.props.ref.current={querySelector(q){
    if(q==='[data-td-scroll="library"]')return grid;
    if(q==='[data-td-focus="tile-12"]')return tile;
    return null;
  }};
  globalThis.DFL.getGamepadNavigationTrees=()=>[{m_Children:[{m_element:tile,BTakeFocus(){focused++;return true}}]}];
  assert.equal(typeof next.props.onClick,'function');
  next.props.onClick();
  await new Promise(resolve=>setTimeout(resolve,60));
  assert.equal(focused,1,'should focus through Steam navigation tree');
  assert(grid.scrollTop>0,'grid scrolls to the newly focused page without moving outer Steam route');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('1.0.5 native ghost cleanup keeps a persistent reversibly removable poster-only marker',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),wrap=p.doc.createElement('div');
 p.visible.appendChild(wrap);wrap.appendChild(p.art);
 wrap.querySelectorAll=sel=>sel==='img'?[p.art]:sel==='*'?[p.art]:[];
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Most Wanted custom'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(wrap.getAttribute('data-titledeck-native-ghost-art'),'1');
  assert.equal(wrap.style.getPropertyValue('display'),'none');
  for(let i=0;i<8;i++)assert.equal(adapter.runNow(),1);
  assert.equal(wrap.getAttribute('data-titledeck-native-ghost-art'),'1');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'');
  delete state.descriptions['3500000123'];adapter.runNow();
  assert.equal(wrap.getAttribute('data-titledeck-native-ghost-art'),null);
  assert.equal(wrap.style.getPropertyValue('display'),'');
 }finally{adapter.stop()}
});

test('1.0.5 Proton line stays visible inside a shared native poster slot and shared sizing restores',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const group=p.doc.createElement('div');p.visible.appendChild(group);group.appendChild(p.art);group.appendChild(p.steamPlay);group.textContent=p.steamPlay.textContent;
 group.querySelectorAll=sel=>sel==='img'?[p.art]:sel.includes('button')?[]:[p.art,p.steamPlay];
 const originalQuery=p.visible.querySelectorAll;
 p.visible.querySelectorAll=sel=>sel==='p, div, span'?[p.message,p.steamPlay]:originalQuery(sel);
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Custom story'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'');
  assert.equal(group.style.getPropertyValue('min-height'),'0px');
  assert.equal(group.style.getPropertyValue('aspect-ratio'),'auto');
  delete state.descriptions['3500000123'];adapter.runNow();
  assert.equal(group.style.getPropertyValue('min-height'),'');
  assert.equal(group.style.getPropertyValue('aspect-ratio'),'');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'');
 }finally{adapter.stop()}
});

// 1.0.6 hardware-driven regressions. The old .td-card-buttonrow CSS rule
// applied a two-column !important grid, so Steam's DOWN selected the next
// item to the RIGHT despite the JSX's visual flow-children=down declaration.
test('1.0.6 placement buttons override the legacy two-column important CSS',async()=>{
 const m=await moduleForTest();
 const legacy=source.indexOf('.td-root .td-setting-panel .td-card-buttonrow{display:grid!important;grid-template-columns:1fr 1fr!important');
 const fix=source.indexOf('.td-root .td-settings-grid .td-description-position-options{');
 assert(legacy>0&&fix>legacy,'specific selector must come after the legacy 2-column rule');
 const css=source.slice(fix,source.indexOf('}',fix));
 assert.match(css,/display:grid!important/);
 assert.match(css,/grid-template-columns:minmax\(0,1fr\)!important/);
 assert.match(css,/grid-auto-flow:row!important/);
 assert.equal(m.settingsFocusDestination('setting-placement-info',10),'setting-placement-hero');
 assert.equal(m.settingsFocusDestination('setting-placement-hero',10),'setting-placement-below');
 assert.equal(m.settingsFocusDestination('setting-placement-below',9),'setting-placement-hero');
 assert.equal(m.settingsFocusDestination('setting-placement-info',12),null);
});
test('1.0.6 secondary color picker can mix custom colors and D-pad navigate all axes',async()=>{
 const m=await moduleForTest();
 assert.equal(m.hsvPickerHex(0,1,1),'#FF0000');
 assert.equal(m.hsvPickerHex(120,1,1),'#00FF00');
 assert.equal(m.hsvPickerHex(240,1,1),'#0000FF');
 assert.equal(m.hsvPickerHex(0,0,1),'#FFFFFF');
 assert(/^#[0-9A-F]{6}$/.test(m.pickerGridColor(195,27)));
 assert.equal(m.pickerMove('picker-hue-1',10),'picker-cell-0');
 assert.equal(m.pickerMove('picker-cell-3',12),'picker-cell-4');
 assert.equal(m.pickerMove('picker-cell-3',10),'picker-cell-11');
 assert.equal(m.pickerMove('picker-cell-47',10),'picker-apply');
 assert.equal(m.pickerMove('picker-apply',11),'picker-cancel');
 const mock=setupMock({view:'settings'}),{plugin}=await mock.init();
 try{
   let nodes=walk(mock.render()),trigger=nodes.find(n=>n.props?.['data-td-focus']==='setting-custom-edit');
   assert(trigger);assert.match(JSON.stringify(trigger.children),/visual color picker/);
   trigger.props.onClick();
   nodes=walk(mock.render());
   assert(nodes.some(n=>n.props?.className==='td-picker-panel'),'secondary visual picker must be mounted');
   assert.equal(nodes.filter(n=>n.props?.className==='td-picker-tile').length,60,'12 hues + 48 custom shades');
   assert(nodes.some(n=>n.props?.['data-td-focus']==='picker-apply'));
   const shade=nodes.find(n=>n.props?.['data-td-focus']==='picker-cell-13');shade.props.onClick();
   nodes=walk(mock.render());
   assert.match(JSON.stringify(nodes.find(n=>n.props?.className==='td-picker-selected').children),/Selected:/);
   nodes.find(n=>n.props?.['data-td-focus']==='picker-apply').props.onClick();
   nodes=walk(mock.render());
   assert(!nodes.some(n=>n.props?.className==='td-picker-panel'));
 }finally{plugin.onDismount();mock.cleanup()}
});
test('1.0.6 existing 1.0.5 Steam-aware LB/RB paging and accepted Game Info paths remain protected',()=>{
 assert.match(source,/focusNode\(tile\)/,'retain Steam-native focus transfer in existing paging');
 assert.match(source,/pageLibraryRef\.current=pageLibrary/);
 assert.match(source,/createControllerScrollBridge/);
 assert.match(source,/createNonSteamGameInfoAdapter/);
});

test('1.0.6 non-Steam scan collapses a second empty portrait slot but preserves Proton, and Restore Original reverses it',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),ghost=p.node('div');
 ghost.className='steamui_ExtraNativePosterPlaceholder';ghost.style=p.doc.createElement('div').style;p.visible.appendChild(ghost);
 ghost.getBoundingClientRect=()=>({left:59,top:388,width:175,height:255,right:234,bottom:643});
 p.steamPlay.getBoundingClientRect=()=>({left:59,top:652,width:785,height:32,right:844,bottom:684});
 const oldQuery=p.visible.querySelectorAll;
 p.visible.querySelectorAll=selector=>{
   if(selector==='div,figure,section,article,img')return [ghost,p.art];
   if(selector==='p,span,div')return [p.message,p.steamPlay,ghost];
   return oldQuery(selector);
 };
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Long Most Wanted text'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
   assert.equal(adapter.runNow(),1);
   assert.equal(ghost.getAttribute('data-titledeck-native-ghost-art'),'1','empty poster box should be hidden');
   assert.equal(ghost.style.getPropertyValue('display'),'none');
   assert.equal(p.steamPlay.style.getPropertyValue('display'),'','Proton information cannot be hidden');
   for(let i=0;i<3;i++)assert.equal(adapter.runNow(),1);
   assert.equal(ghost.style.getPropertyValue('display'),'none','repeated Steam UI refresh does not reintroduce ghost');
   delete state.descriptions['3500000123'];adapter.runNow();
   assert.equal(ghost.style.getPropertyValue('display'),'','Steam original ghost layout restored when override removed');
 }finally{adapter.stop()}
});

test('1.0.6 geometry cleanup skips empty areas without verified Proton details',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),box=p.node('div');
 p.visible.appendChild(box);box.getBoundingClientRect=()=>({left:58,top:388,width:170,height:250,right:228,bottom:638});
 const old=p.visible.querySelectorAll;
 p.visible.querySelectorAll=selector=>selector==='div,figure,section,article,img'?[box]:selector==='p,span,div'?[p.message]:old(selector);
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Saved description'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{assert.equal(adapter.runNow(),1);assert.notEqual(box.style?.getPropertyValue?.('display'),'none')}
 finally{adapter.stop()}
});

test('1.0.7 left-column ghost matching reflects real Deck geometry, not a paragraph-aligned mock',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095(),ghost=p.node('div');
 ghost.className='steamui_NonSteamEmptyPosterSlot';ghost.style=p.doc.createElement('div').style;
 p.visible.appendChild(ghost);
 // Live screenshot: text starts at x~290, leftover poster is at x~35.
 p.message.getBoundingClientRect=()=>({left:290,right:920,top:190,bottom:540,width:630,height:350});
 ghost.getBoundingClientRect=()=>({left:37,top:550,right:222,bottom:805,width:185,height:255});
 p.steamPlay.getBoundingClientRect=()=>({left:40,top:812,right:870,bottom:840,width:830,height:28});
 const query=p.visible.querySelectorAll;
 p.visible.querySelectorAll=selector=>selector==='div,figure,section,article,img'?[ghost,p.art]:
   selector==='p,span,div'?[p.message,p.steamPlay,ghost]:query(selector);
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'A description in the RIGHT column'}},adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
   assert.equal(adapter.runNow(),1);
   assert.equal(ghost.style.getPropertyValue('display'),'none','left-side ghost must be suppressed');
   assert.equal(p.steamPlay.style.getPropertyValue('display'),'','Proton stays in natural flow');
   delete state.descriptions['3500000123'];adapter.runNow();
   assert.equal(ghost.style.getPropertyValue('display'),'','original display is fully restored');
 }finally{adapter.stop()}
});

test('1.0.7 visual free picker reaches exact arbitrary RGB colors with pointer and controller controls',async()=>{
 const m=await moduleForTest();
 assert.equal(m.hexOfRgb([17,103,251]),'#1167FB');
 assert.deepEqual(m.rgbOfHex('#1167FB'),[17,103,251]);
 assert.equal(m.nudgeHexChannel('#1167FB',0,1),'#1267FB');
 assert.equal(m.nudgeHexChannel('#1167FB',2,-1),'#1167FA');
 assert.equal(m.pointToHsv(120,1,0),'#00FF00');
 assert.equal(m.pointToHsv(0,0,0),'#FFFFFF');
 assert.equal(m.pointToHsv(120,1,1),'#000000');
 const mock=setupMock({view:'settings'}),{plugin}=await mock.init();
 try{
   let nodes=walk(mock.render());nodes.find(n=>n.props?.['data-td-focus']==='setting-custom-edit').props.onClick();
   nodes=walk(mock.render());
   const square=nodes.find(n=>n.props?.['data-td-focus']==='picker-sv-field');
   const strip=nodes.find(n=>n.props?.['data-td-focus']==='picker-hue-strip');
   assert(square&&strip,'free picker must expose two adjustable visual planes');
   for(let n=0;n<3;n++){
     const decrease=nodes.find(x=>x.props?.['data-td-focus']===`picker-rgb-${n}-minus`);
     const increase=nodes.find(x=>x.props?.['data-td-focus']===`picker-rgb-${n}-plus`);
     assert(decrease&&increase,'each RGB channel must have one-step controls');
   }
   // React mock produces a new render after state updates.
   nodes.find(x=>x.props?.['data-td-focus']==='picker-rgb-0-plus').props.onClick();
   nodes=walk(mock.render());
   const output=JSON.stringify(nodes.find(n=>n.props?.className==='td-picker-selected').children);
   assert.match(output,/#(?:[A-F0-9]{6})/,'custom color is computed from the current RGB value');
 }finally{plugin.onDismount();mock.cleanup()}
});

test('1.0.8 picker hue and shade controls release D-pad focus, with optional explicit edit mode',async()=>{
 const m=await moduleForTest();
 assert.equal(m.pickerMixerRoute('hue',10),'picker-sv-field','Down from hue must reach shade');
 assert.equal(m.pickerMixerRoute('hue',9),'picker-cancel','Up from hue must escape');
 assert.equal(m.pickerMixerRoute('square',9,false),'picker-hue-strip');
 assert.equal(m.pickerMixerRoute('square',10,false),'picker-rgb-0-minus','Down from shade must reach RGB controls');
 assert.equal(m.pickerMixerRoute('square',10,true),null,'Down in EXPLICIT adjust mode changes brightness');
 assert.equal(m.pickerRgbRoute('picker-rgb-0-minus',10),'picker-rgb-1-minus');
 assert.equal(m.pickerRgbRoute('picker-rgb-2-plus',10),'picker-hue-0');
 assert.equal(m.pickerMove('picker-hue-3',9),'picker-rgb-2-plus');
 const mock=setupMock({view:'settings'}),{plugin}=await mock.init();
 try{
  let tree=mock.render(),nodes=walk(tree);
  nodes.find(n=>n.props?.['data-td-focus']==='setting-custom-edit').props.onClick();
  tree=mock.render();nodes=walk(tree);
  const rootNode=nodes.find(n=>n.props?.className?.startsWith?.('td-root'));
  const focused={value:''},fields=new Map();
  for(const n of nodes){const key=n.props?.['data-td-focus'];if(!key)continue;
   fields.set(key,{ownerDocument:{},closest(){return null},scrollIntoView(){},focus(){focused.value=key;this.ownerDocument.activeElement=this}});
  }
  rootNode.props.ref.current={querySelector(selector){return fields.get(/data-td-focus="([^"]+)/.exec(selector)?.[1])||null}};
  const press=(key,d)=>{
   const node=nodes.find(n=>n.props?.['data-td-focus']===key);
   const b=resolveButton(node);assert.equal(typeof b.props.onGamepadDirection,'function',key);
   let halted=false;b.props.onGamepadDirection({detail:{button:d},preventDefault(){halted=true},stopPropagation(){}});
   assert.equal(halted,true,key+' must consume relevant navigation');
  };
  press('picker-hue-strip',10);assert.equal(focused.value,'picker-sv-field','controller exits hue bar');
  press('picker-sv-field',10);assert.equal(focused.value,'picker-rgb-0-minus','controller exits shade square');
  press('picker-rgb-0-minus',10);assert.equal(focused.value,'picker-rgb-1-minus','RGB Down navigates');
  press('picker-rgb-2-plus',10);assert.equal(focused.value,'picker-hue-0','RGB exits to quick swatches');
  nodes.find(n=>n.props?.['data-td-focus']==='picker-sv-field').props.onClick();
  nodes=walk(mock.render());
  const mode=nodes.find(n=>n.props?.['data-td-picker-mode']);assert.equal(mode.props['data-td-picker-mode'],'adjust');
  nodes.find(n=>n.props?.['data-td-focus']==='picker-sv-field').props.onClick();
  nodes=walk(mock.render());
  assert.equal(nodes.find(n=>n.props?.['data-td-picker-mode'])?.props['data-td-picker-mode'],'navigate');
  // Cancel remains available without requiring a touch or a keyboard.
  nodes.find(n=>n.props?.['data-td-focus']==='picker-cancel').props.onClick();
  assert(!walk(mock.render()).some(n=>n.props?.className==='td-picker-panel'));
 }finally{plugin.onDismount();mock.cleanup()}
});

test('1.0.8 structural ghost cleanup removes nested poster branch but never the Proton row and restores both',async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const group=p.doc.createElement('div'),poster=p.doc.createElement('div');
 poster.className='steamui_OriginalNonSteamArtworkSlot';
 group.className='steamui_NonSteamGameInfoPosterAndProton';
 group.textContent=p.steamPlay.textContent; // mock DOM textContent does not aggregate descendant text
 poster.appendChild(p.art);group.appendChild(poster);group.appendChild(p.steamPlay);p.visible.appendChild(group);
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Most Wanted custom description'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(poster.style.getPropertyValue('display'),'none','poster branch must collapse independent of geometry');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'','shared group Proton row untouched');
  assert.equal(group.style.getPropertyValue('display'),'','do not hide shared group');
  for(let i=0;i<4;i++)assert.equal(adapter.runNow(),1);
  assert.equal(poster.style.getPropertyValue('display'),'none','no reappearance during refresh');
  delete state.descriptions['3500000123'];adapter.runNow();
  assert.equal(poster.style.getPropertyValue('display'),'','restoration must reveal native poster');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'','restoration leaves Proton untouched');
 }finally{adapter.stop()}
});

test('1.0.9 collapses empty Proton-adjacent poster branch without an img; restoration is exact', async()=>{
 const m=await moduleForTest(),p=nonSteamPage095();
 const group=p.doc.createElement('div'),ghost=p.doc.createElement('div');
 ghost.className='steamui_PosterSlot';group.className='steamui_ShortcutImageAndProton';
 group.appendChild(ghost);group.appendChild(p.steamPlay);p.visible.appendChild(group);
 const query=p.visible.querySelectorAll;
 p.visible.querySelectorAll=q=>q==='div,p,span'?[p.message,group,ghost,p.steamPlay]:query(q);
 const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Saved need for speed description'}};
 const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
 try{
  assert.equal(adapter.runNow(),1);
  assert.equal(ghost.style.getPropertyValue('display'),'none','text-free poster sibling should collapse');
  assert.equal(p.steamPlay.style.getPropertyValue('display'),'','never hide Proton copy');
  assert.equal(group.style.getPropertyValue('display'),'','keep shared group');
  const captured=adapter.captureGhostLayout();
  assert.equal(captured.format,'titledeck-layout-v1');
  assert(captured.records.length===1);
  assert(!JSON.stringify(captured).includes('Saved need for speed description'), 'diagnostic must not capture custom text');
  for(let i=0;i<3;i++)adapter.runNow();
  assert.equal(ghost.style.getPropertyValue('display'),'none','idempotent on Game Info refresh');
  delete state.descriptions['3500000123'];adapter.runNow();
  assert.equal(ghost.style.getPropertyValue('display'),'','restores original art slot');
 }finally{adapter.stop()}
});

test('1.1.1 real Deck diagnostic and reflow: hidden INPUT and decorative sibling do not strand an empty 828x198 native artwork row',async()=>{
  // Taken from actual TitleDeck desktop JSON: image 0x0 display:none;
  // poster ancestors 131x196 / 133x198; outer empty GRID 828x198;
  // Proton appears immediately below the empty row. The hidden input caused
  // isolatedPosterElement() to stop at the IMG in earlier released builds.
  const m=await moduleForTest(),p=nonSteamPage095();
  const content=p.doc.createElement('div'),grid=p.doc.createElement('div');
  const outer=p.doc.createElement('div'),inner=p.doc.createElement('div');
  const hiddenInput=p.doc.createElement('input'),hiddenDecoration=p.doc.createElement('div');
  hiddenInput.setAttribute('type','hidden');
  const rects=new Map([
    [p.art,{left:25,top:198,right:156,bottom:394,width:131,height:196}],
    [inner,{left:25,top:198,right:156,bottom:394,width:131,height:196}],
    [outer,{left:25,top:197,right:158,bottom:395,width:133,height:198}],
    [grid,{left:25,top:197,right:853,bottom:395,width:828,height:198}],
    [p.message,{left:25,top:-234,right:853,bottom:197,width:828,height:431}],
    [p.steamPlay,{left:25,top:403,right:853,bottom:422,width:828,height:19}],
    [content,{left:25,top:-234,right:853,bottom:421,width:828,height:655}]
  ]);
  for(const [el,rect] of rects)el.getBoundingClientRect=()=>rect;
  p.doc.defaultView.getComputedStyle=el=>({
    display:el===hiddenInput||el===hiddenDecoration?'none':el===grid?'grid':'block',
    visibility:'visible',position:'static',color:'#263040',fontSize:'14px',lineHeight:'normal',aspectRatio:'auto'
  });
  const all=node=>node.children.flatMap(ch=>[ch,...all(ch)]);
  const select=(node,q)=>{
    const children=all(node);
    if(q==='*')return children;
    return children.filter(ch=>q.split(',').some(part=>{
      const token=part.trim().toUpperCase();
      const tag=String(ch.tag||ch.tagName||'').toUpperCase();
      return token===tag||token==='[ROLE="BUTTON"]'&&ch.getAttribute('role')==='button'||
       token==='[DATA-TITLEDECK-NONSTEAM-LIVE]'&&ch.getAttribute('data-titledeck-nonsteam-live');
    }));
  };
  for(const el of [content,grid,outer,inner,hiddenInput,hiddenDecoration])el.querySelectorAll=q=>select(el,q);
  inner.appendChild(p.art);inner.appendChild(hiddenInput);
  outer.appendChild(inner);outer.appendChild(hiddenDecoration);
  grid.appendChild(outer);
  content.appendChild(p.message);content.appendChild(grid);content.appendChild(p.steamPlay);
  p.visible.appendChild(content);
  p.visible.querySelectorAll=q=>select(p.visible,q);
  const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Most Wanted saved paragraph'}};
  const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
  try{
    assert.equal(adapter.runNow(),1);
    assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1');
    assert.equal(grid.getAttribute('data-titledeck-native-ghost-art'),'1','the real 828x198 EMPTY grid must be suppressed');
    assert.equal(grid.style.getPropertyValue('display'),'none');
    assert.equal(p.steamPlay.style.getPropertyValue('display'),'','Proton must remain in its native flow');
    assert.equal(content.style.getPropertyValue('display'),'','parent owning description/Proton stays visible');
    // Hardware regression: after CSS hides the poster branch, Steam's live
    // getBoundingClientRect() no longer returns the pre-hide dimensions.
    // The first 1.1.0 fix could reselect another artwork ancestor and remove
    // the side-by-side attribute, exposing the old cover underneath the text.
    const zero={left:0,top:0,right:0,bottom:0,width:0,height:0};
    for(const el of [p.art,inner,outer,grid]){
      const before=el.getBoundingClientRect;
      el.getBoundingClientRect=()=>grid.style.getPropertyValue('display')==='none'?zero:before();
    }
    for(let i=0;i<3;i++){
      assert.equal(adapter.runNow(),1,'repeated Community/Game Info refresh');
      assert.equal(p.message.getAttribute('data-titledeck-nonsteam-side-by-side'),'1',
        'the artwork and text must remain side by side after CSS reflow');
      assert.equal(p.message.style.getPropertyValue('--td-nonsteam-poster').includes('mw2005-cover.jpg'),true,
        'the custom left-column cover source stays armed');
    }
    assert.equal(grid.style.getPropertyValue('display'),'none');
    delete state.descriptions['3500000123'];adapter.runNow();
    for(const el of [grid,outer,inner,p.art])assert.equal(el.style.getPropertyValue('display'),'','restore original game restores entire poster branch');
    assert.equal(p.steamPlay.style.getPropertyValue('display'),'');
  }finally{adapter.stop()}
});

test('1.1.0 artwork cleanup refuses a visible interactive input in the poster branch',async()=>{
  const m=await moduleForTest(),p=nonSteamPage095();
  const wrap=p.doc.createElement('div'),input=p.doc.createElement('input');
  wrap.appendChild(p.art);wrap.appendChild(input);p.visible.appendChild(wrap);
  p.doc.defaultView.getComputedStyle=()=>({display:'block',visibility:'visible',color:'#293241',fontSize:'14px',lineHeight:'normal'});
  wrap.querySelectorAll=q=>q==='img'?[p.art]:q==='*'?[p.art,input]:q.includes('input')?[input]:[];
  const state={enabled:true,description_position:'game_info',descriptions:{'3500000123':'Preserved text'}};
  const adapter=m.createNonSteamGameInfoAdapter(p.doc,()=>state);
  try{
    assert.equal(adapter.runNow(),1);
    assert.equal(wrap.style.getPropertyValue('display'),'','visible input is not safe to suppress');
    assert.equal(p.steamPlay.style.getPropertyValue('display'),'','Proton remains visible');
  }finally{adapter.stop()}
});


test('1.1.5 Steam shoulder bitmasks and browser Gamepad indices are distinct',async()=>{
 const m=await moduleForTest();
 assert.deepEqual(m.titleDeckShoulderState({ulButtons:0}),{left:false,right:false});
 assert.deepEqual(m.titleDeckShoulderState({ulButtons:0x080000}),{left:true,right:false});
 assert.deepEqual(m.titleDeckShoulderState({ulButtons:0x040000}),{left:false,right:true});
 assert.deepEqual(m.titleDeckShoulderState({ulButtons:0x0c0000}),{left:true,right:true});
 assert.deepEqual(m.titleDeckShoulderState({ulButtons:0,sPressureBumperLeft:800}),{left:true,right:false});
 assert.deepEqual(m.titleDeckShoulderState({ulButtons:0,sPressureBumperRight:800}),{left:false,right:true});
 const buttons=Array.from({length:16},()=>({pressed:false}));buttons[5].pressed=true;
 assert.deepEqual(m.titleDeckShoulderState({buttons}),{left:false,right:true});
});

test('1.1.5 physical Steam LB/RB changes pages exactly once per press and unregisters',async()=>{
 const m=await moduleForTest();
 const pages=[];let callback,intervalFn,unregistered=0,cleared=0,now=0;
 const host={SteamClient:{Input:{RegisterForControllerStateChanges(cb){callback=cb;return {unregister(){unregistered++}}}}},
   navigator:{getGamepads:()=>[]},setInterval(fn){intervalFn=fn;return 1},clearInterval(){cleared++}};
 const bridge=m.createLibraryShoulderBridge(delta=>pages.push(delta),{window:host,now:()=>now});
 bridge.start();
 callback([{ulButtons:0x040000,unControllerIndex:0}]);
 callback([{ulButtons:0x040000,unControllerIndex:0}]);now=80;intervalFn();
 assert.deepEqual(pages,[1], 'holding RB should not repeat');
 now=160;callback([{ulButtons:0,unControllerIndex:0}]);
 now=250;callback([{ulButtons:0x080000,unControllerIndex:0}]);
 assert.deepEqual(pages,[1,-1]);
 bridge.stop();assert.equal(unregistered,1);assert.equal(cleared,1);
 callback([{ulButtons:0x040000,unControllerIndex:0}]);assert.deepEqual(pages,[1,-1]);
});

test('1.1.5 browser gamepad fallback, Steam/browser de-dup, and no stuck input',async()=>{
 const m=await moduleForTest();let callback,tick,now=0;
 const pages=[];let left=false,right=false;
 const host={SteamClient:{Input:{RegisterForControllerStateChanges(cb){callback=cb;return ()=>{}}}},
  navigator:{getGamepads:()=>[{connected:true,buttons:Array.from({length:16},(_,i)=>({pressed:i===4?left:i===5?right:false}))}]},
  setInterval(fn){tick=fn;return 12},clearInterval(){}};
 const bridge=m.createLibraryShoulderBridge(delta=>pages.push(delta),{window:host,now:()=>now});bridge.start();
 right=true;tick();callback([{ulButtons:0x040000,unControllerIndex:1}]);tick();
 assert.deepEqual(pages,[1],'same press from browser + Steam must count once');
 right=false;now=200;callback([{ulButtons:0,unControllerIndex:1}]);tick();
 left=true;now=401;tick();assert.deepEqual(pages,[1,-1]);
 left=false;now=600;tick();left=true;now=801;tick();assert.deepEqual(pages,[1,-1,-1]);
 bridge.stop();
});

test('1.1.5 Manager still has on-screen paging and uses scoped Steam shoulder bridge',()=>{
 assert(source.includes('createLibraryShoulderBridge(delta=>pageFromShoulder(delta)'));
 assert(source.includes("onClick:()=>pageLibrary(-1)"));
 assert(source.includes("onClick:()=>pageLibrary(1)"));
 assert(source.includes("return()=>bridge.stop()"));
});


test('1.1.5 Deck native bumper masks and unrelated low bits cannot page',async()=>{
 const m=await moduleForTest();
 for(const bit of [0x04,0x08,0x20,0x200000,0x100000,0x800000]){
   assert.deepEqual(m.titleDeckShoulderState({ulButtons:bit}),{left:false,right:false},'not a Deck LB/RB: '+bit);
 }
 assert.deepEqual(m.titleDeckShoulderState({ulButtons:0,ulUpperButtons:0x0c0000}),{left:false,right:false},
  'unknown upper-button word must not alias lower-word shoulders');
 assert.deepEqual(m.titleDeckShoulderState({ulButtons:0x080000,ulUpperButtons:0x04}),{left:true,right:false});
 assert.deepEqual(m.titleDeckShoulderState({bLeftBumper:true}),{left:true,right:false});
 assert.deepEqual(m.titleDeckShoulderState({bR1:true}),{left:false,right:true});
});

test('1.1.5 controller diagnostic snapshots only bounded input-state fields',async()=>{
 const m=await moduleForTest();
 const report=m.titleDeckControllerDiagnostic();
 assert.equal(report.format,'titledeck-controller-v1');
 assert.equal(report.version,'1.2.1');
 assert(Array.isArray(report.events));
 assert(report.events.length<=64);
 assert(!JSON.stringify(report).includes('titledeck.json'));
 assert(source.includes('Save LB/RB input diagnostic'));
 assert(source.includes("call('save_controller_diagnostic',JSON.stringify(report))"));
});

test('1.1.5 Steam Deck built-in button uses high native flags, PS4 browser remains fallback',async()=>{
 const m=await moduleForTest();let cb,tick,now=0,browserLB=false;
 const pages=[];
 const host={SteamClient:{Input:{RegisterForControllerStateChanges(fn){cb=fn;return ()=>{}}}},
 navigator:{getGamepads:()=>[{connected:true,buttons:Array.from({length:16},(_,i)=>({pressed:i===4&&browserLB}))}]},
 setInterval(fn){tick=fn;return 42},clearInterval(){}};
 const bridge=m.createLibraryShoulderBridge(delta=>pages.push(delta),{window:host,now:()=>now});bridge.start();
 cb([{unControllerIndex:0,ulButtons:0x040000,ulUpperButtons:0}]);
 now=160;cb([{unControllerIndex:0,ulButtons:0,ulUpperButtons:0}]);
 now=320;cb([{unControllerIndex:0,ulButtons:0x080000,ulUpperButtons:0}]);
 now=480;cb([{unControllerIndex:0,ulButtons:0,ulUpperButtons:0}]);
 now=640;browserLB=true;tick();browserLB=false;now=700;tick();
 assert.deepEqual(pages,[1,-1,-1]);
 bridge.stop();
});


test('1.1.6 Decky focus-tree native bumper values are distinct from browser indices',async()=>{
 const m=await moduleForTest();
 assert.equal(m.titleDeckFocusShoulder({detail:{button:5}}),-1);
 assert.equal(m.titleDeckFocusShoulder({detail:{button:6}}),1);
 assert.equal(m.titleDeckFocusShoulder({detail:{button:4}}),0);
 assert.equal(m.titleDeckFocusShoulder({detail:{button:9}}),0);
 assert.equal(m.titleDeckFocusShoulder({detail:{button:10}}),0);
 assert.equal(m.titleDeckFocusShoulder({detail:{button:5,is_repeat:true}}),0);
 assert.equal(m.titleDeckFocusShoulder({detail:{button:'BUMPER_RIGHT'}}),1);
 assert.equal(m.titleDeckFocusShoulder({detail:{button:'BUMPER_LEFT'}}),-1);
 assert.equal(m.titleDeckFocusShoulder(null),0);
});

test('1.1.6 manager root subscribes to Decky native onButtonDown in addition to PS4 fallback',()=>{
 assert(source.includes("'flow-children':'down',onButtonDown:e=>"));
 assert(source.includes('const bridge=createLibraryShoulderBridge(delta=>pageFromShoulder(delta),{'));
 assert(source.includes('const pageFromShoulder=delta=>{'));
 assert(source.includes('if(time-last.time<180&&last.delta===delta)return false;'));
 assert(source.includes("logLibraryInput('focus-button',{delta,source:'steam-focus'})"));
 assert(source.includes('e?.stopPropagation?.();e?.preventDefault?.();'));
 assert(source.includes('onClick:()=>pageLibrary(-1)'));
 assert(source.includes('onClick:()=>pageLibrary(1)'));
});

test('1.1.6 native Deck Focusable shoulder event pages, deduplicates, and never consumes D-pad',async()=>{
 const games=Array.from({length:35},(_,i)=>({appid:String(800+i),name:`Example ${String(i).padStart(2,'0')}`,installed:true}));
 const mock=setupMock({games});const {mod,plugin}=await mock.init();
 try{
  const root=mock.render();
  assert.equal(root.type,'focusable');
  const start=mod.titleDeckControllerDiagnostic().pages;
  let stopped=0;
  const event=button=>({detail:{button},stopPropagation(){stopped++},preventDefault(){}});
  root.props.onButtonDown(event(9)); // Steam D-pad up, should remain ordinary focus navigation.
  assert.equal(stopped,0);
  assert.equal(mod.titleDeckControllerDiagnostic().pages,start);
  root.props.onButtonDown(event(6)); // Native Deck RB via Steam focus tree.
  root.props.onButtonDown(event(6)); // Same press from another source / repeated dispatch.
  assert.equal(stopped,2);
  assert.equal(mod.titleDeckControllerDiagnostic().pages,start+1);
  assert(mod.titleDeckControllerDiagnostic().events.some(e=>e.kind==='focus-button'&&e.delta===1&&e.source==='steam-focus'));
 }finally{plugin.onDismount();mock.cleanup()}
});


test('1.1.8 Full Library Manager artwork sources include Steam capsules and verified demo-parent fallback',async()=>{
 const m=await moduleForTest();
 const borderless=m.coverSources('388080');
 assert(borderless.some(x=>x.endsWith('/388080/header.jpg')));
 assert(borderless.some(x=>x.endsWith('/388080/library_capsule.jpg')));
 assert(borderless.some(x=>x.endsWith('/388080/capsule_616x353.jpg')));
 const demo=m.coverSources('4226020');
 assert(demo.some(x=>x.endsWith('/3920610/library_600x900.jpg')));
 assert(demo.some(x=>x.endsWith('/3920610/header.jpg')));
 assert(m.coverSources('3815860').some(x=>x.endsWith('/1984270/library_600x900.jpg')));
 assert(!m.coverSources('620').some(x=>x.includes('3920610')));
 assert.deepEqual(m.coverSources('nope'),[]);
});

test('1.1.8 Complete covers remain visible rather than being center-cropped by manager tiles',async()=>{
 const source=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
 assert(source.includes('.td-game-artbox .td-art{object-fit:contain!important}'));
 assert(source.includes("call('get_local_cover',id)"));
 assert(source.includes("localStatus!=='idle'"));
 assert(source.includes('localArtworkCache.clear()'));
});

test('1.1.8 only hides explicit manager tile IDs, never Steam shortcuts or similarly named games',async()=>{
 const m=await moduleForTest();
 const games=[{appid:'100',name:'ES-DE'},{appid:'101',name:'ES-DE (Program)'},{appid:'102',name:'ES-DE Demo'}];
 assert.deepEqual(m.managerVisibleGames(games,['101']).map(g=>g.appid),['100','102']);
 assert.equal(games.length,3,'must not modify the original game library');
 assert.deepEqual(m.managerVisibleGames(games,[]),games);
 assert.deepEqual(m.validHiddenManagerIds('["101","101","../invalid",101,"102"]'),['101','102']);
 assert.deepEqual(m.validHiddenManagerIds('{bad'),[]);
 assert.equal(m.settingsFocusWithHidden('setting-recover',10),'setting-show-hidden');
 assert.equal(m.settingsFocusWithHidden('setting-show-hidden',9),'setting-recover');
 assert.equal(m.settingsFocusWithHidden('setting-show-hidden',10),'setting-placement-info');
});

test('1.1.8 retains verified Decky Focusable shoulder path and protected Game Info functions',()=>{
 const source=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
 assert(source.includes('titleDeckFocusShoulder(e)'));
 assert(source.includes('onNativeShoulder(e);'));
 assert(source.includes('createLibraryShoulderBridge'));
 assert(source.includes("\'data-td-focus\':\'edit-hide\'"));
 assert(source.includes('Show all hidden tiles'));
});


test('1.1.8 scrolls Full Library Manager editor with right stick without touching Steam UI',async()=>{
  const m=await moduleForTest();
  const pane={scrollTop:0,scrollHeight:820,clientHeight:200};
  const root={classList:{contains:()=>false},querySelector:sel=>sel==='.td-workspace'?pane:null};
  assert.equal(m.scrollManagerWorkspaceByStick(root,1,'editor'),true);
  assert.equal(pane.scrollTop,25);
  assert.equal(m.scrollManagerWorkspaceByStick(root,-1,'editor'),true);
  assert.equal(pane.scrollTop,0);
  assert.equal(m.scrollManagerWorkspaceByStick(root,-1,'editor'),false,'no scrolling past top');
  assert.equal(m.scrollManagerWorkspaceByStick(root,1,'library'),false,'library paging stays separate');
  assert.equal(m.scrollManagerWorkspaceByStick(root,0,'editor'),false);
  root.classList.contains=key=>key==='td-inline-keyboard-open';
  assert.equal(m.scrollManagerWorkspaceByStick(root,1,'editor'),false,'OSK owns focus during typing');
  root.classList.contains=()=>false;
  const desc={scrollTop:0,scrollHeight:900,clientHeight:150};
  root.querySelector=sel=>sel==='[data-td-description-workspace]'?desc:null;
  assert.equal(m.scrollManagerWorkspaceByStick(root,0.8,'description'),true);
  assert.equal(desc.scrollTop,20);
  desc.scrollHeight=desc.clientHeight;
  assert.equal(m.scrollManagerWorkspaceByStick(root,0.8,'description'),false,'no false scrolling without overflow');
});

test('1.1.8 uses verified hashed JWE3 Steam cover and preserves portrait contents in full-bleed tile',async()=>{
  const m=await moduleForTest();
  const jwe=m.coverSources('2958130');
  assert(jwe.some(x=>x.includes('/2958130/317faa59ced4fff3eae44f72df7785b841340eb5/library_600x900.jpg')));
  assert.equal(jwe[0],'/customimages/2958130p.png','Steam custom art takes priority');
  assert(!m.coverSources('388080').some(x=>x.includes('317faa59')),'never apply another game cover');
  const source=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
  assert(source.includes('td-art-backdrop'));
  assert(source.includes('object-fit:cover!important;filter:blur(12px)'));
  assert(source.includes('.td-root .td-game-artbox .td-art{'));
  assert(source.includes('object-fit:contain!important'));
  assert(source.includes("h(Cover,{id:game.appid,title:game.name,priority:index<24,tile:true})"));
});

test('1.1.8 preserves 1.1.6 native shoulder paging while hiding public diagnostics',async()=>{
  const source=fs.readFileSync(path.join(root,'src/index.js'),'utf8');
  assert(source.includes('onNativeShoulder(e);'));
  assert(source.includes('createLibraryShoulderBridge'));
  assert(source.includes("h(UI.ButtonItem,{onClick:captureController,layout:'below'},'Save LB/RB input diagnostic')"));
  assert(source.includes("...(developerDiagnosticsEnabled()?["));
});
