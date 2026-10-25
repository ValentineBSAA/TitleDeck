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
    if(name==='set_description_position'){state.description_position=args[0];return state;}
    return null;
  }};
  const R={
    createElement:(type,props,...children)=>({type,props:props||{},children:children.flat(Infinity).filter(x=>x!==undefined&&x!==false)}),
    Fragment:'fragment',useEffect(){},useRef(v){const i=refCursor++;if(!refs[i])refs[i]={current:v};return refs[i]},useCallback:f=>f,
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
    state,render(){cursor=0;refCursor=0;return route()},
    async init(){const mod=await moduleForTest(),plugin=mod.default();await new Promise(resolve=>setImmediate(resolve));return{mod,plugin}},
    cleanup(){delete globalThis.SP_REACT;delete globalThis.DFL;delete globalThis.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit}
  };
}
test('source and packaged frontend match; approved logo/version consistent',()=>{
 assert.equal(source,fs.readFileSync(dist,'utf8'));
 const p=JSON.parse(fs.readFileSync(path.join(root,'plugin.json'))),pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json')));
 assert.equal(p.version,'0.9.0-rc.1');assert.equal(pkg.version,'0.9.0-rc.1');assert(fs.statSync(path.join(root,p.publish.image)).size>10000);
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
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children:children.flat()}),useRef:v=>({current:v}),useEffect:fn=>{effect=fn}};
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
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children}),useRef:v=>({current:v}),useEffect:fn=>{effect=fn}};
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
 globalThis.SP_REACT={createElement:(type,props,...children)=>({type,props:props||{},children}),useRef:v=>({current:v}),useEffect:fn=>{eff=fn}};
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
   assert.equal(field.props.maxLength,4000);
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
   get isConnected(){return Boolean(this._root||this.parentElement?.isConnected)},
   get nextSibling(){const a=this.parentElement?.children||[];return a[a.indexOf(this)+1]||null},
   get lastChild(){return this.children[this.children.length-1]||null},
   setAttribute(k,v){this.attrs[k]=String(v)},getAttribute(k){return this.attrs[k]??null},
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
   assert.equal(fieldComp.props.maxLength,4000);
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
   assert.equal(inp.props.maxLength,4000);
   assert.equal(inp.props['aria-label'],'Custom game description');
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
test('Quick Access offers a Game Info scan without navigating into the full manager',async()=>{
 const mock=setupMock({view:'library'});
 const {plugin}=await mock.init();
 try{
   const panel=walk(plugin.content);
   const quick=panel.find(n=>n.type==='panel');
   assert(quick);
   const all=walk(quick);
   assert(all.some(n=>n.children?.includes('Capture current Game Info page')));
   assert(all.some(n=>n.children?.includes('Open full library manager')));
 }finally{plugin.onDismount();mock.cleanup()}
});
