/** TitleDeck 0.8: compact controller-first game library, editable aliases, conservative Steam title overlay. */
const PLUGIN = 'TitleDeck', PLUGIN_VERSION = '0.8.1', ROUTE = '/titledeck/manager';
const R = globalThis.SP_REACT;
const UI = globalThis.DFL;
const h = (...a) => R.createElement(...a);
const QAM_VERSION_STYLE = {display:'inline-flex',alignItems:'center',fontSize:10,fontWeight:800,color:'#e9eef6',background:'#384257',border:'1px solid #7d8aa5',borderRadius:99,padding:'3px 7px',lineHeight:1};
const ICON_DATA_URI = 'data:image/webp;base64,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';

let bridge, adapter;
let steamDocument = null;
let steamBridgeStatus = "Waiting for Steam window";
const STEAM_ANCHOR = "TitleDeckSteamTextBridge";
let latestState = { schema:1, enabled:true, aliases:{}, games:[], recovery:{available:false,count:0}, manual_backup:{available:false,count:0} };
const observers = new Set();
function connect() {
  if (bridge) return bridge;
  const fn=globalThis.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit;
  if (!fn?.connect) throw Error('Decky bridge is unavailable');
  bridge=fn.connect(1,PLUGIN);return bridge;
}
const call=(name,...args)=>connect().call(name,...args);
function acceptState(state){
  if(state && typeof state ==='object') latestState={...latestState,...state};
  observers.forEach(listener=>{try{listener(latestState);}catch{}});
  adapter?.runNow();
  return latestState;
}
function useStateSnapshot(){
  const [snap,setSnap]=R.useState(latestState);
  R.useEffect(()=>{observers.add(setSnap);return()=>observers.delete(setSnap)},[]);
  return snap;
}
async function refreshState(){return acceptState(await call('snapshot'));}
export function cleanTitle(title){
  const old=String(title||'').trim();
  let candidate=old.replace(/[™®©]/g,'').replace(/\s{2,}/g,' ').trim();
  if(candidate && candidate===candidate.toUpperCase() && /[A-Z]/.test(candidate)) candidate=candidate.toLowerCase().replace(/(^|[\s:()\-])([a-z])/g,(_,a,b)=>a+b.toUpperCase());
  return candidate!==old ? candidate : '';
}
function normId(value){const s=String(value??'').trim();return /^[1-9]\d{0,11}$/.test(s)?String(Number(s)):'';}
function steamOverview(store,id){
  try{return store?.GetAppOverviewByAppID?.(Number(id))||store?.GetAppOverviewByGameID?.(String(id))||null;}catch{return null;}
}
export function collectSteamGames(store, local=[], extras=[]) {
  const games = new Map();
  function add(input,source='steam') {
    const id=normId(input?.appid??input?.appId??input?.m_nAppID??input?.id);
    const title=String(input?.display_name??input?.displayName??input?.name??input?.app_name??input?.title??'').trim();
    if(!id||!title||title.length>180||/[\r\n]/.test(title))return;
    const type=input?.app_type??input?.type;
    // Keep games and shortcuts, discard only clearly identified Steam tools and media.
    if(typeof type==='number' && ![0,1,1073741824].includes(type) && source!=='manifest') return;
    const installed=source==='manifest'||Boolean(input?.installed||input?.is_installed||input?.local_per_client_data?.installed);
    const existing=games.get(id);
    if(!existing)games.set(id,{appid:id,name:title,installed,source});
    else games.set(id,{...existing,name:source==='steam'?title:existing.name,installed:installed||existing.installed,source:source==='steam'?'steam':existing.source});
  }
  (local||[]).forEach(x=>add(x,'manifest'));
  (extras||[]).forEach(x=>add(x,'steam'));
  if(store){
    let visited=0;
    const sources=['allApps','m_mapApps','m_mapAppOverviews','m_mapAppOverview','m_rgApps','m_rgAllApps'];
    const collections=[];
    for(const key of sources)try{if(store[key])collections.push(store[key]);}catch{}
    try{if(typeof store.GetAllApps==='function')collections.push(store.GetAllApps());}catch{}
    for(const collection of collections){
      let items=[];
      try{if(Array.isArray(collection))items=collection;
        else if(typeof collection?.values==='function')items=[...collection.values()];
        else if(collection&&typeof collection==='object')items=Object.values(collection);
      }catch{}
      for(const item of items){if(++visited>16000)break;if(typeof item==='object'&&item)add(item,'steam');else if(normId(item)){const overview=steamOverview(store,item);if(overview)add(overview,'steam');}}
      if(visited>16000)break;
    }
    for(const x of [...games.values()]){
      const overview=steamOverview(store,x.appid);
      if(overview)add({...overview,appid:x.appid,installed:x.installed},'steam');
    }
  }
  return [...games.values()].sort((a,b)=>a.name.localeCompare(b.name)||Number(a.appid)-Number(b.appid));
}

// Alias replacement targets actual text nodes, not Steam metadata, installs, logos or artwork.
// It discovers Steam/Decky documents instead of assuming the plugin's global document
// is the same document the library is rendered into. Bounded and fully reversible.
export function createTitleAdapter(host,getState,getStore=()=>globalThis.appStore,getDocuments=()=>[]) {
  let stopped=false, scanTimer=null, heartbeat=null, observerList=[], count=0, scanned=0;
  const changed=new Map();
  const MAX_NODES=9000;
  function restore(){
    for(const [node,saved] of changed){
      try{if(node.isConnected && node.nodeValue===saved.alias) node.nodeValue=saved.original;}catch{}
    }
    changed.clear();count=0;
  }
  function docs(){
    const unique=new Set();
    const add=d=>{if(d?.documentElement&&typeof d.createTreeWalker==='function')unique.add(d);};
    add(host);
    try{add(globalThis.document);}catch{}
    try{add(globalThis.top?.document);}catch{}
    try{add(globalThis.window?.top?.document);}catch{}
    try{const frame=globalThis.document?.querySelectorAll?.('iframe');for(const f of [...(frame||[])].slice(0,12))add(f.contentDocument);}catch{}
    try{getDocuments().forEach(add);}catch{}
    return [...unique];
  }
  function isExcluded(el){
    if(!el || !el.isConnected) return true;
    try{if(el.closest?.('[data-titledeck-ui], [data-titledeck-exclude], [role="dialog"], [contenteditable], input, textarea, script, style, select, option'))return true;}catch{}
    const name=String(el.className||'');
    if(/(?:decky|notification|toast|tooltip|chat|friendslist)/i.test(name))return true;
    return false;
  }
  function apply(){
    if(stopped)return 0;
    const {enabled,aliases={},games=[]}=getState()||{};
    if(!enabled||!Object.keys(aliases).length){restore();return 0;}
    const mapping=new Map(), duplicates=new Set();
    for(const [id,alias] of Object.entries(aliases)){
      if(!alias)continue;
      const original=steamOverview(getStore(),id)?.display_name||games.find(g=>String(g.appid)===id)?.name;
      if(!original || original===alias)continue;
      if(mapping.has(original)&&mapping.get(original)!==alias) duplicates.add(original);
      mapping.set(original,alias);
    }
    for(const original of duplicates)mapping.delete(original);
    for(const [node,saved] of [...changed]){
      if(!node.isConnected){changed.delete(node);continue;}
      const next=mapping.get(String(saved.original).trim());
      if(!next){if(node.nodeValue===saved.alias)node.nodeValue=saved.original;changed.delete(node);}
      else if(node.nodeValue===saved.alias && String(next)!==String(saved.alias).trim()) {
        const old=saved.original,trimmed=old.trim(),offset=old.indexOf(trimmed);
        const replacement=old.slice(0,offset)+next+old.slice(offset+trimmed.length);
        node.nodeValue=replacement;saved.alias=replacement;
      }
      else if(node.nodeValue!==saved.alias && node.nodeValue!==saved.original)changed.delete(node);
    }
    if(!mapping.size){count=0;return 0;}
    const activeDocs=docs();scanned++;
    for(const doc of activeDocs){
      try{
        const view=doc.defaultView;
        const showText=view?.NodeFilter?.SHOW_TEXT||4;
        const walker=doc.createTreeWalker(doc.body||doc.documentElement,showText);
        let node,i=0;
        while((node=walker.nextNode())&&i++<MAX_NODES){
          if(!node.parentElement||changed.has(node)||isExcluded(node.parentElement))continue;
          const raw=node.nodeValue||'';const stripped=raw.trim();const alias=mapping.get(stripped);
          if(!alias||!stripped)continue;
          if(node.parentElement.closest?.('[aria-hidden="true"]'))continue;
          if(view?.getComputedStyle?.(node.parentElement)?.display==='none')continue;
          const start=raw.indexOf(stripped);const replacement=raw.slice(0,start)+alias+raw.slice(start+stripped.length);
          changed.set(node,{original:raw,alias:replacement});node.nodeValue=replacement;
        }
      }catch(e){try{console.warn('[TitleDeck] UI matching:',e);}catch{}}
    }
    count=[...changed].filter(([node,record])=>node.isConnected&&node.nodeValue===record.alias).length;
    return count;
  }
  function schedule(){if(stopped||scanTimer)return;scanTimer=setTimeout(()=>{scanTimer=null;apply()},700);}
  function setup(){
    if(stopped)return;
    for(const doc of docs()){
      if(observerList.some(entry=>entry.doc===doc)||typeof MutationObserver==='undefined')continue;
      try{const watch=new MutationObserver(schedule);watch.observe(doc.body||doc.documentElement,{childList:true,characterData:true,subtree:true});observerList.push({doc,watch});}catch{}
    }
  }
  function runNow(){if(stopped)return 0;setup();return apply();}
  function start(){setup();runNow();heartbeat=setInterval(()=>{setup();apply()},2400);}
  function stop(){stopped=true;if(scanTimer!=null)clearTimeout(scanTimer);if(heartbeat!=null)clearInterval(heartbeat);for(const item of observerList)item.watch.disconnect();observerList=[];restore();}
  return{start,stop,runNow,get applied(){return count},get scans(){return scanned},get docs(){return observerList.length}};
}


const STYLE=`
/* Review uses six names per page, paginated through the entire alias collection. */
.td-root .td-review-workspace{overflow:hidden!important;min-height:0;display:flex;flex-direction:column}
.td-root .td-review-panel{max-width:850px;width:100%;height:100%;min-height:0;padding:12px 18px;margin:0 auto!important;display:flex;flex-direction:column;gap:5px;overflow:hidden}
.td-root .td-review-panel .td-title-large{font-size:19px!important;margin:1px 0 3px}
.td-root .td-review-panel p.td-editor-note{margin:3px 0 8px;font-size:12px}
.td-review-header{display:flex;align-items:center;justify-content:space-between;color:#f5dee3;font-size:12px;gap:12px}
.td-root .td-review-list{flex:1;max-height:none;min-height:0;overflow-y:auto!important;overscroll-behavior:contain;margin:3px 0!important;padding:5px 10px!important;scrollbar-width:thin}
.td-review-row{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:10px;align-items:center;min-height:28px}
.td-review-custom{color:#faf6f8;font-weight:750;overflow-wrap:anywhere}
.td-review-original{color:#cbd1da;overflow-wrap:anywhere}
.td-review-arrow{color:#ffaaba;font-weight:850}
.td-review-pager{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:5px 0;min-width:0}
.td-root .td-review-pager .td-btn{min-height:34px!important;width:100%!important}
.td-root .td-review-note{font-size:11px!important;margin:2px 0!important}
.td-root .td-review-panel .td-confirm-actions{margin:5px 0 0;gap:9px}
.td-root .td-review-panel .td-confirm-actions .td-btn{min-height:38px!important}
@media(max-height:640px){.td-root .td-review-panel{padding:7px 12px!important;gap:3px}.td-root .td-review-panel .td-editor-note{font-size:11px!important;line-height:1.25!important}.td-root .td-review-list{min-height:0}}

/* TitleDeck 0.8 - ResonaDeck-inspired compact manager shell. Native button skins are overpainted safely. */
.td-root{color:#f6f4f2;background:#111319!important;height:100vh!important;min-height:0!important;max-height:100vh!important;overflow:hidden!important;padding:8px 12px!important;box-sizing:border-box!important;font-family:inherit;width:100%}
.td-root *{box-sizing:border-box}.td-shell{height:100%;min-height:0;display:grid;grid-template-rows:46px 40px 42px minmax(0,1fr) 34px;gap:7px;overflow:hidden}
.td-header,.td-rail,.td-actions,.td-bottom{min-width:0;border:1px solid #3e434f;background:#20242d;border-radius:10px;display:flex;align-items:center;gap:9px;padding:4px 10px}
.td-header{justify-content:space-between}.td-identity{display:flex;align-items:center;gap:9px;min-width:0}.td-logo{width:34px;height:34px;border-radius:7px;object-fit:cover}.td-heading{font-size:18px;font-weight:800;letter-spacing:-.025em;line-height:1.15}.td-sub{font-size:10px;color:#b4bbc7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.td-pill{font-size:11px;line-height:1.2;border:1px solid #5c454d;background:#37242c;color:#f6cbd2;border-radius:30px;padding:6px 11px;white-space:nowrap}.td-header-tools{display:flex;align-items:center;gap:8px;flex-shrink:0}
.td-rail{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);padding:3px;gap:6px}.td-rail-label{font-size:10px;color:#c1c5cd;letter-spacing:.04em}
.td-actions{display:grid;grid-template-columns:minmax(0,3fr) minmax(0,1.25fr) minmax(0,1.25fr) minmax(0,1.3fr) auto;gap:6px;padding:3px 6px}.td-results{white-space:nowrap;font-size:11px;color:#c7ccd5;padding:0 7px}
.td-workspace{min-height:0;overflow-y:auto;overflow-x:hidden;padding:4px 5px 14px;scrollbar-width:thin;scrollbar-color:#6d727d #171b24;overscroll-behavior:contain}.td-workspace::-webkit-scrollbar{width:8px}.td-workspace::-webkit-scrollbar-thumb{background:#555e70;border-radius:10px}
.td-grid{display:flex;flex-direction:column;align-items:stretch;gap:11px;padding:4px;width:100%;min-width:0}.td-grid-row{display:grid;grid-template-columns:repeat(var(--td-grid-cols,4),minmax(0,1fr));gap:11px;width:100%;min-width:0}.td-grid[data-td-columns="2"] .td-grid-row{--td-grid-cols:2}.td-grid[data-td-columns="3"] .td-grid-row{--td-grid-cols:3}.td-grid[data-td-columns="4"] .td-grid-row{--td-grid-cols:4}.td-grid[data-td-columns="5"] .td-grid-row{--td-grid-cols:5}.td-root button.td-btn,.td-root .td-btn{background:linear-gradient(180deg,#313742,#222831)!important;color:#f4f6f8!important;border:1px solid #49515f!important;border-radius:8px!important;padding:7px 12px!important;min-width:0!important;min-height:32px!important;line-height:1.2!important;max-width:100%!important;text-align:center!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.065)!important;cursor:pointer}
.td-root button.td-btn.gpfocus,.td-root .td-btn.gpfocus,.td-root button.td-btn:focus-visible,.td-root .td-btn:focus-visible{outline:2px solid #f0b778!important;outline-offset:1px!important;background:#4b3540!important;border-color:#eb8d9d!important;box-shadow:0 0 0 2px rgba(234,113,136,.25)!important}.td-root .td-btn.td-active{background:#513039!important;border-color:#bb6e7d!important}.td-root .td-btn:disabled{opacity:.4!important}
.td-root button.td-tab,.td-root .td-tab{width:100%!important;height:32px!important;padding:4px 8px!important;font-size:13px!important;font-weight:700!important}.td-root button.td-action,.td-root .td-action{width:100%!important;height:33px!important;min-height:33px!important;padding:4px 8px!important;font-size:12px!important;font-weight:700!important;white-space:nowrap!important}.td-root .td-close{min-width:80px!important}
.td-root button.td-game,.td-root .td-game{width:100%!important;min-height:0!important;height:auto!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:start!important;gap:7px!important;text-align:left!important;padding:8px!important;background:linear-gradient(160deg,#2b303a,#1b2028)!important;border:1px solid #424854!important;border-radius:11px!important;position:relative;overflow:hidden!important}
.td-root button.td-game.gpfocus,.td-root button.td-game:focus-visible{border-color:#f3bb9a!important;outline:3px solid #f3bb9a!important;outline-offset:1px!important;background:#39303a!important}
.td-game-artbox{width:100%;position:relative;aspect-ratio:600/850;min-height:0;max-height:185px;overflow:hidden;border-radius:7px;background:#2e3542}.td-art{width:100%;height:100%;object-fit:cover;display:block;background:#232935}.td-art-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#303440;color:#f4c2c9;font-size:35px;font-weight:850}.td-game-copy{display:flex;flex-direction:column;gap:3px;min-width:0;min-height:42px}.td-game-title{font-size:13px;font-weight:750;line-height:1.24;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow-wrap:anywhere}.td-game-sub{font-size:10px;color:#aeb5c0;line-height:1.15;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.td-game-mark{position:absolute;top:13px;right:13px;font-weight:800;font-size:9px;letter-spacing:.02em;border-radius:6px;padding:4px 6px;color:#fff;background:#9b4059;border:1px solid #d97889}
.td-bottom{justify-content:space-between;color:#b7bec9;font-size:11px;gap:8px;padding:4px 13px}.td-bottom strong{color:#ecf0f5;font-size:11px}.td-status{color:#b4bac5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.td-message{position:absolute;bottom:46px;left:18px;right:18px;z-index:6;max-width:860px;margin:auto;background:#33262e;color:#f6c9d1;border:1px solid #905363;border-radius:11px;box-shadow:0 10px 25px #0009;padding:10px 14px;font-size:12px;pointer-events:none}.td-message.success{background:#23362f;color:#c4edd8;border-color:#527e66}
.td-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;text-align:center;color:#aeb6c3;padding:65px 18px}.td-empty h2{font-size:20px;color:#faf8f8;margin:0}.td-empty p{margin:0;max-width:480px}
.td-editor{max-width:1020px;margin:0 auto;display:grid;grid-template-columns:190px minmax(0,1fr);gap:19px;padding:8px}.td-editor-art{width:190px;height:280px;object-fit:cover;border-radius:11px;background:#31353e;border:1px solid #4a4d57}.td-card{background:#252a33;border:1px solid #444c5b;border-radius:13px;padding:16px;min-width:0}.td-copy-label{color:#aeb6c2;font-size:11px;font-weight:750;letter-spacing:.075em}.td-title-large{font-size:23px;font-weight:800;line-height:1.25;overflow-wrap:anywhere;margin:6px 0 15px}.td-preview{background:#161a20;border:1px solid #595f6b;border-radius:9px;padding:12px 15px;margin:8px 0 14px;font-size:20px;font-weight:800;line-height:1.25;overflow-wrap:anywhere}.td-editor-actions{display:flex;flex-direction:column;gap:8px;min-width:0}.td-editor-action-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;min-width:0}.td-editor-actions button.td-btn{min-height:44px!important}.td-editor-note{color:#b9c0cd;font-size:11px;line-height:1.4;margin-top:12px}.td-editor-footer{display:flex;align-items:center;justify-content:space-between;margin-top:12px;gap:10px}.td-small{font-size:12px;color:#c5cad1}.td-settings{max-width:820px;margin:auto;padding:15px}.td-setting-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #414752}.td-setting-row .td-btn{flex-shrink:0}
.td-keyscreen{max-width:930px;margin:0 auto;padding:6px 12px}.td-keyscreen .td-preview{margin:9px 0 13px}.td-keygrid{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:5px}.td-root button.td-key,.td-root .td-key{height:35px!important;min-height:35px!important;padding:4px 0!important;font-size:14px!important}.td-key-help{color:#c0c6ce;font-size:12px;margin-top:12px}.td-editor-input{font-size:21px;color:#fff}.td-key-hint{font-size:11px;color:#abb2be}
@media(max-width:1050px){.td-grid-row{gap:9px}.td-game-artbox{max-height:180px}.td-root{padding:6px 10px!important}}
@media(max-height:700px){.td-game-artbox{max-height:160px}.td-shell{grid-template-rows:43px 37px 38px minmax(0,1fr) 31px;gap:5px}.td-game-copy{min-height:38px}}
.td-confirm{max-width:760px;margin:22px auto;padding:23px 26px}.td-warning-label{color:#f0a1aa;font-size:12px;letter-spacing:.1em;font-weight:900}.td-confirm .td-title-large{margin-bottom:5px}.td-confirm .td-editor-note{font-size:13px;line-height:1.55}.td-confirm-examples{background:#191c25;border:1px solid #454b56;border-radius:9px;padding:10px 15px;margin:12px 0}.td-confirm-example{color:#cfd4de;font-size:12px;border-bottom:1px solid #3a4049;padding:5px 0;overflow-wrap:anywhere}.td-confirm-example:last-of-type{border-bottom:0}.td-confirm-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px}.td-confirm-actions .td-btn{min-height:45px!important;font-size:13px!important}.td-root .td-danger{border-color:#995261!important;background:#4d2c38!important;color:#fff4f4!important}.td-root .td-danger.gpfocus,.td-root .td-danger:focus-visible{outline:3px solid #f3b7bb!important}


/* 0.5: isolate Settings from CSS Loader's native dialog skin dimensions. */
.td-root .td-workspace .td-settings{width:min(100%,900px)!important;max-width:900px!important;min-width:0!important;margin:0 auto!important;padding:8px 12px 16px!important;overflow:visible!important;box-sizing:border-box!important}
.td-root .td-settings *{box-sizing:border-box!important;min-width:0}
.td-root .td-settings .td-title-large{font-size:20px!important;line-height:1.2!important;margin:0 0 8px!important;color:#f9fafc!important}
.td-settings-intro{color:#d5dae4;font-size:12px;line-height:1.5;margin:0 0 12px}
.td-settings-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;width:100%!important;min-width:0!important}
.td-root .td-setting-panel{padding:12px!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:6px!important;background:#242a36!important;border:1px solid #455063!important;border-radius:10px!important;color:#f4f6fb!important;min-width:0!important;max-width:100%!important}
.td-root .td-setting-panel h3{font-size:14px!important;line-height:1.3!important;letter-spacing:0!important;margin:0!important;color:#f5f6f8!important;font-weight:800!important}
.td-root .td-setting-panel p{font-size:12px!important;line-height:1.45!important;color:#d0d5e2!important;margin:0 0 6px!important;overflow-wrap:anywhere!important;flex:1!important}
.td-root .td-setting-panel .td-btn{font-size:12px!important;line-height:1.25!important;min-height:36px!important;width:100%!important;max-width:100%!important;padding:6px 10px!important;flex-shrink:0!important}
.td-setting-panel .td-mini-state{font-size:11px;color:#f1c8ce;font-weight:800;letter-spacing:.02em;line-height:1.3}
.td-root .td-setting-panel.td-panel-wide{grid-column:1 / -1!important;background:#322833!important;border-color:#785461!important}
.td-root .td-setting-panel.td-panel-danger{background:#382630!important;border-color:#9c6570!important}
.td-root .td-setting-panel .td-card-buttonrow{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important;width:100%!important}
.td-root button.td-btn,.td-root .td-btn{font-size:13px!important;font-weight:750!important}
.td-root .td-game-title{color:#f9f9fa!important;-webkit-text-fill-color:#f9f9fa!important;opacity:1!important}
.td-root .td-game-sub{color:#cbd0dc!important;-webkit-text-fill-color:#cbd0dc!important;opacity:1!important}
.td-root .td-game-copy{background:transparent!important}
.td-root .td-rail-label,.td-root .td-results{color:#f1f3f7!important}
@media(max-width:690px){.td-settings-grid{grid-template-columns:1fr!important}.td-root .td-workspace .td-settings{padding:5px!important}}


/* 0.6: Native dialog buttons should not retain orange in inactive states. */
.td-root{position:relative!important}
.td-root .td-btn:not(.gpfocus):not(:focus-visible):not(.td-active),
.td-root button.td-btn:not(.gpfocus):not(:focus-visible):not(.td-active){background:#303846!important;color:#f5f7fa!important;-webkit-text-fill-color:#f5f7fa!important;border-color:#556173!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.07)!important;opacity:1!important}
.td-root .td-btn.td-active:not(.gpfocus):not(:focus-visible){background:#513039!important;color:#f8e4e9!important;-webkit-text-fill-color:#f8e4e9!important;border-color:#ac6c7c!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)!important}
.td-root .td-btn.gpfocus,.td-root button.td-btn.gpfocus,.td-root .td-btn:focus-visible,.td-root button.td-btn:focus-visible{background:#e5a451!important;color:#19212b!important;-webkit-text-fill-color:#19212b!important;outline:2px solid #ffe4ae!important;outline-offset:1px!important;border-color:#ffe4ae!important;box-shadow:0 0 0 2px #74462c!important;opacity:1!important}
.td-root .td-btn:disabled{opacity:.46!important}
.td-version-chip,.td-qam-version{font-size:10px;font-weight:850;line-height:1;white-space:nowrap;letter-spacing:.025em;background:#432b39;color:#ffe1e7;border:1px solid #9c5b70;border-radius:999px;padding:4px 7px;vertical-align:middle}
.td-qam-version{display:inline-flex;align-items:center;background:#343c50;color:#e6eaf3;border-color:#69748a}
/* UI-only notification. Lives in the manager, never in Steam's game page. */
.td-root .td-toast{position:absolute!important;left:auto!important;right:18px!important;bottom:47px!important;top:auto!important;width:min(410px,calc(100% - 36px))!important;max-width:410px!important;z-index:60!important;min-width:0!important;padding:0!important;overflow:hidden!important;pointer-events:none!important;color:#f7f9fc!important;background:#263449!important;border:1px solid #7d93b4!important;border-radius:10px!important;box-shadow:0 14px 32px #0009!important;animation:tdToastEnter .24s cubic-bezier(.18,.75,.2,1) both,tdToastExit .34s ease-in var(--td-toast-exit-ms) forwards!important}
.td-root .td-toast.failure{background:#422a34!important;border-color:#c47489!important}
.td-root .td-toast.success{background:#243b36!important;border-color:#6d9a83!important}
.td-toast-row{display:flex;align-items:flex-start;gap:10px;padding:12px 13px 13px;line-height:1.4;font-size:12px;font-weight:650;overflow-wrap:anywhere}
.td-toast-symbol{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:20px;height:20px;border-radius:50%;background:#67967e;color:#fff;font-size:13px;font-weight:900}
.failure .td-toast-symbol{background:#b7667a}
.td-toast-label{flex:1;min-width:0}
.td-toast-track{position:relative;height:3px;background:rgba(255,255,255,.20);width:100%;overflow:hidden}
.td-toast-bar{height:100%;background:#d8ffdf;width:100%;transform-origin:left center;animation:tdToastCountdown var(--td-toast-ms) linear forwards}
.failure .td-toast-bar{background:#ffc2d1}
@keyframes tdToastEnter{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes tdToastExit{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(10px)}}
@keyframes tdToastCountdown{from{transform:scaleX(1)}to{transform:scaleX(0)}}
@media (prefers-reduced-motion: reduce){.td-root .td-toast,.td-toast-bar{animation:none!important}}


/* Never hide the final review rows on a small Gaming Mode screen. The page scrolls; the review list itself does not trap focus. */
.td-root .td-review-workspace{overflow-y:auto!important;overflow-x:hidden!important;display:block!important}
.td-root .td-review-panel{height:auto!important;overflow:visible!important;min-height:0!important;margin:4px auto!important}
.td-root .td-review-list{flex:0 0 auto!important;overflow:visible!important;height:auto!important;max-height:none!important;min-height:0!important}
.td-root .td-review-list .td-confirm-example{min-height:28px}

/* Small-display review: six complete names AND safe confirm actions on the first screen. */
.td-root .td-review-panel{gap:3px!important;padding:6px 12px!important}
.td-root .td-review-panel .td-warning-label{display:none!important}
.td-root .td-review-panel .td-title-large{margin:0!important;font-size:18px!important}
.td-root .td-review-panel p.td-editor-note{font-size:10px!important;line-height:1.25!important;margin:0 0 2px!important}
.td-root .td-review-list .td-confirm-example{min-height:24px!important;padding:3px 0!important;font-size:11px!important;line-height:1.2!important}
.td-root .td-review-pager{margin:2px 0!important}
.td-root .td-review-note{display:none!important}
.td-root .td-review-panel .td-confirm-actions{margin:2px 0 0!important;gap:8px!important}
.td-root .td-review-panel .td-confirm-actions .td-btn{min-height:35px!important}
.td-root .td-review-workspace{padding-bottom:5px!important}
`;
const dir=e=>Number(e?.detail?.button??-1);
function halt(e){e?.preventDefault?.();e?.stopPropagation?.();}
function focusNode(el){
  if(!el)return false;
  try{const get=UI?.getGamepadNavigationTrees;if(typeof get==='function'){
    const roots=get(),stack=Array.isArray(roots)?[...roots]:[roots],seen=new Set();let n=0;
    while(stack.length&&n++<6000){const item=stack.pop();if(!item||typeof item!=='object'||seen.has(item))continue;seen.add(item);
      const node=item.m_element||item.element||item.m_HTMLElement||item.m_DOMElement||item.m_el;
      if(node===el||(node&&el?.contains?.(node))){const take=item.BTakeFocus||item.TakeFocus||item.takeFocus;if(typeof take==='function'&&take.call(item)!==false){(node||el).scrollIntoView?.({block:'nearest'});return true;}}
      for(const key of ['m_Children','children','m_rgChildren','m_vecChildren','m_FocusableChildren']){
        const val=item[key];if(Array.isArray(val))stack.push(...val);else if(val&&typeof val==='object')stack.push(val);
      }
    }
  }}catch{}
  try{el.focus?.({preventScroll:true});el.scrollIntoView?.({block:'nearest'});return el.ownerDocument?.activeElement===el;}catch{return false;}
}
function focusQuery(root,selector,delay=0){setTimeout(()=>{try{focusNode(root?.querySelector(selector));}catch{}},delay);}
function directionTo(root,next,e){const node=root?.querySelector?.(`[data-td-focus="${next}"]`);if(node && focusNode(node)){halt(e);return true;}return false;}
export function gridDestination(index,d,length,width=5) {
  if(!Number.isInteger(index)||index<0||index>=length)return null;
  if(d===11)return index%width>0?index-1:null;
  if(d===12)return index%width<width-1&&index+1<length?index+1:null;
  if(d===9)return index-width>=0?index-width:null;
  if(d===10)return index+width<length?index+width:null;
  return null;
}
export function resetReviewRows(aliases,games){
  const titles=new Map((games||[]).map(g=>[String(g.appid),g.name]));
  return Object.entries(aliases||{}).map(([appid,custom])=>({
    appid:String(appid),custom:String(custom),original:titles.get(String(appid))||null
  })).sort((a,b)=>(a.original||a.custom).localeCompare(b.original||b.custom)||Number(a.appid)-Number(b.appid));
}
export function reviewPage(rows,page,size=8){
  const perPage=Math.max(1,Math.floor(size)),pages=Math.max(1,Math.ceil(rows.length/perPage));
  const at=Math.min(Math.max(0,Math.floor(page)),pages-1);
  return {at,pages,start:at*perPage,end:Math.min(rows.length,(at+1)*perPage),items:rows.slice(at*perPage,(at+1)*perPage)};
}
function columnsFor(root) {
  try { const grid=root?.querySelector('.td-grid');const raw=grid?.ownerDocument?.defaultView?.getComputedStyle?.(grid)?.gridTemplateColumns;
    if(raw){const cols=raw.trim().split(/\s+/).length; if(cols>=2&&cols<=6)return cols;}
  }catch{}
  return 4;
}
// Screen geometry, not a fixed desktop-wide index or a cascading Steam focus list.
export function columnsForWidth(width){
  return width>=1140?5:width>=700?4:width>=480?3:2;
}
export function rowChunks(items,columns){
  const width=Math.max(1,Math.min(6,Number(columns)||4)),out=[];
  for(let i=0;i<items.length;i+=width)out.push(items.slice(i,i+width));
  return out;
}
function Btn({children,onClick,kind='',className='',nav,disabled=false,onFocus,onGamepadFocus,onBlur,onGamepadBlur,...rest}){
  const keyboardDirection=e=>{
    const d=({ArrowUp:9,ArrowDown:10,ArrowLeft:11,ArrowRight:12})[e?.key];
    if(d&&typeof nav==='function')return nav({detail:{button:d},currentTarget:e.currentTarget,preventDefault:()=>e.preventDefault?.(),stopPropagation:()=>e.stopPropagation?.()});
  };
  return h(UI.DialogButton,{className:`td-btn ${kind==='selected'?'td-active':''} ${className}`,focusable:true,onClick,disabled,
    onGamepadDirection:nav,onKeyDown:keyboardDirection,onFocus,onGamepadFocus,onBlur,onGamepadBlur,...rest},children);
}
let noticeSequence=0;
export function toastTimeout(ok){return ok?4200:6200;}
function notify(message,setNotice,ok=false){
  const value=String(message||'').trim();
  setNotice({id:++noticeSequence,text:value,ok:Boolean(ok),ttl:toastTimeout(ok)});
}
function Toast({notice}){
  if(!notice)return null;
  const ttl=notice.ttl||toastTimeout(notice.ok);
  return h('div',{key:notice.id,className:`td-message td-toast ${notice.ok?'success':'failure'}`,role:notice.ok?'status':'alert','aria-live':notice.ok?'polite':'assertive',style:{'--td-toast-ms':`${ttl}ms`,'--td-toast-exit-ms':`${Math.max(0,ttl-350)}ms`}},
    h('div',{className:'td-toast-row'},
      h('span',{className:'td-toast-symbol','aria-hidden':'true'},notice.ok?'✓':'!'),
      h('span',{className:'td-toast-label'},notice.text)),
    h('div',{className:'td-toast-track','aria-hidden':'true'},h('div',{className:'td-toast-bar'})));
}
function Cover({id,title,className=''}){
  const [broken,setBroken]=R.useState(false);
  R.useEffect(()=>setBroken(false),[id]);
  if(broken||Number(id)>4294967295)return h('div',{className:`td-art-fallback ${className}`},title?.trim()?.slice(0,2)?.toUpperCase()||'G');
  return h('img',{className:`td-art ${className}`,loading:'lazy',alt:'',src:`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${id}/library_600x900.jpg`,onError:()=>setBroken(true)});
}
const KEYBOARD='1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
function Keypad({value,setValue,done,root}){
  const [caps,setCaps]=R.useState(false);
  const keys=[...KEYBOARD].map(c=>caps?c:c.toLowerCase()).concat(['SPACE','⌫','CLEAR','CAPS','.',':','-','(',')','&','DONE']);
  return h('div',{className:'td-keyscreen','data-tdkeyboard':'true'},
    h('div',{className:'td-copy-label'},'CONTROLLER KEYBOARD'),
    h('div',{className:'td-preview td-editor-input'},value||'Start typing…'),
    h('div',{className:'td-keygrid'},keys.map((key,i)=>h(Btn,{key:i,className:'td-key','data-td-focus':`key-${i}`,
      nav:e=>{const d=dir(e),next=d===11?i-1:d===12?i+1:d===9?i-10:d===10?i+10:i;
        if(next>=0&&next<keys.length&&next!==i&&(d!==11&&d!==12||Math.floor(i/10)===Math.floor(next/10)))return directionTo(root,`key-${next}`,e);
        halt(e);return true;},
      onClick:()=>{if(key==='DONE'){done();return;}if(key==='CAPS'){setCaps(!caps);return;}
        if(key==='⌫'){setValue(v=>v.slice(0,-1));return;}
        if(key==='CLEAR'){setValue('');return;}
        setValue(v=>(v+(key==='SPACE'?' ':key)).slice(0,180));}
    },key))),
    h('div',{className:'td-key-help'},'D-pad moves between keys  •  A types  •  B returns to editor  •  DONE confirms'));
}
export function libraryMove(index,d,count,columns=5){
  if(!Number.isInteger(index)||index<0||index>=count)return null;
  return gridDestination(index,d,count,columns);
}
// Four-way movement uses real rectangles rather than CSS grid column guesses.
// Themes / Steam zoom can render four columns even when a CSS fallback says five.
export function visualGridDestination(rectangles,index,d){
  if(!Array.isArray(rectangles)||!Number.isInteger(index)||index<0||index>=rectangles.length)return null;
  if(![9,10,11,12].includes(d))return null;
  const r=rectangles[index];if(!r)return null;
  const c=(a)=>({x:(a.left+a.right)/2,y:(a.top+a.bottom)/2,w:a.right-a.left,h:a.bottom-a.top});
  const from=c(r),vertical=d===9||d===10,sign=d===9||d===11?-1:1;
  let result=null,best=Infinity;
  for(let i=0;i<rectangles.length;i++){
    if(i===index||!rectangles[i])continue;
    const to=c(rectangles[i]);if(to.w<=0||to.h<=0)continue;
    const along=(vertical?to.y-from.y:to.x-from.x)*sign;
    const cross=Math.abs(vertical?to.x-from.x:to.y-from.y);
    if(along<=Math.max(3,vertical?Math.min(from.h,to.h)*.4:Math.min(from.w,to.w)*.4))continue;
    // A horizontal press must stay on the same visual row.
    if(!vertical&&cross>Math.max(7,Math.min(from.h,to.h)*.36))continue;
    // Vertical navigation strongly prefers the same on-screen column.
    const score=along+(vertical?cross*3:cross*5);
    if(score<best){best=score;result=i;}
  }
  return result;
}
function measuredGridDestination(root,index,d){
  const grid=root?.querySelector?.('[data-td-grid="true"]');if(!grid)return undefined;
  const cells=[...(grid.querySelectorAll?.('[data-td-focus^="tile-"]')||[])];
  if(!cells.length||index>=cells.length)return undefined;
  const rects=cells.map(el=>{try{return el.getBoundingClientRect?.()||null}catch{return null}});
  if(!rects[index]||rects[index].width<=0)return undefined;
  const target=visualGridDestination(rects,index,d);
  return target==null?null:Number(cells[target]?.getAttribute?.('data-td-focus')?.slice(5));
}
export function topMove(key,d,scope='all'){
  const tabs=['filter-all','filter-installed','filter-renamed'];
  const tools=['tool-search','tool-id','tool-refresh','tool-settings'];
  if(key==='close')return d===10?`filter-${scope}`:null;
  const ti=tabs.indexOf(key),bi=tools.indexOf(key);
  if(ti>=0){if(d===11)return tabs[Math.max(ti-1,0)];if(d===12)return tabs[Math.min(ti+1,2)];if(d===10)return tools[ti===2?3:0];if(d===9)return 'close';}
  if(bi>=0){if(d===11)return tools[Math.max(bi-1,0)];if(d===12)return tools[Math.min(bi+1,3)];if(d===9)return tabs[bi>=2?2:bi];if(d===10)return 'tile-0';}
  return null;
}
// Editor focus works for every game. A missing or disabled action is never a destination.
// Button IDs describe a stable 2 x 2 layout, independent of Steam's default focus order.
export function editorDestination(key,d,{canSave=true,canRestore=true}={}){
  if(![9,10,11,12].includes(d))return null;
  const active={
    'close':{10:'edit-back'},
    'edit-back':{9:'close',10:'edit-name'},
    'edit-name':{9:'edit-back',12:'edit-clean',10:'edit-save'},
    'edit-clean':{9:'edit-back',11:'edit-name',10:'edit-restore'},
    'edit-save':{9:'edit-name',12:'edit-restore'},
    'edit-restore':{9:'edit-clean',11:'edit-save'}
  };
  let to=active[key]?.[d]||null;
  if(to==='edit-save'&&!canSave)to=d===10&&key==='edit-name'&&canRestore?'edit-restore':null;
  if(to==='edit-restore'&&!canRestore)to=d===10&&key==='edit-clean'&&canSave?'edit-save':null;
  return to;
}
function Manager(){
  const state=useStateSnapshot(),root=R.useRef(null);
  const [games,setGames]=R.useState([]),[scope,setScope]=R.useState('all'),[query,setQuery]=R.useState(''),[view,setView]=R.useState('library');
  const [selected,setSelected]=R.useState(''),[draft,setDraft]=R.useState(''),[notice,setNotice]=R.useState(null),[working,setWorking]=R.useState(false);
  const [entry,setEntry]=R.useState(''),[lastTile,setLastTile]=R.useState(''),[catalogBusy,setCatalogBusy]=R.useState(false);
  const [renderCols,setRenderCols]=R.useState(4);
  R.useEffect(()=>{
    const shell=root.current,win=shell?.ownerDocument?.defaultView;
    if(!shell)return;
    const update=()=>{const width=shell.getBoundingClientRect?.().width||shell.clientWidth||960;setRenderCols(columnsForWidth(width));};
    update();
    const observer=typeof win?.ResizeObserver==='function'?new win.ResizeObserver(update):null;
    observer?.observe(shell);win?.addEventListener?.('resize',update);
    return()=>{observer?.disconnect();win?.removeEventListener?.('resize',update)};
  },[]);
  const [resetPage,setResetPage]=R.useState(0);
  R.useEffect(()=>{
    if(!notice)return;
    const id=notice.id;
    const timer=setTimeout(()=>setNotice(current=>current?.id===id?null:current),notice.ttl||toastTimeout(notice.ok));
    return()=>clearTimeout(timer);
  },[notice?.id]);
  // Start Settings at the top, including when returning from a confirmation dialog.
  R.useEffect(()=>{
    if(view!=='settings')return;
    const scroller=root.current?.querySelector?.('[data-td-scroll="settings"]');
    if(scroller)scroller.scrollTop=0;
  },[view]);

  const aliases=state.aliases||{};
  const remoteGames=R.useRef([]);
  const fullLibrary=R.useCallback(async()=>{
    setCatalogBusy(true);
    try{
      const snapshot=await refreshState();
      let extras=[];
      try{const result=await globalThis.SteamClient?.Apps?.GetInstalledApps?.();if(Array.isArray(result))extras=result;}catch{}
      remoteGames.current=extras;
      const current=collectSteamGames(globalThis.appStore,snapshot.games,extras);
      setGames(current);
      return current;
    }finally{setCatalogBusy(false)}
  },[]);
  R.useEffect(()=>{void fullLibrary().catch(e=>notify(`Library scan failed: ${String(e?.message||e)}`,setNotice))},[]);
  R.useEffect(()=>{setGames(previous=>collectSteamGames(globalThis.appStore,state.games||[],[...remoteGames.current,...previous]));},[state.games]);
  const filtered=games.filter(g=>(scope==='all'||(scope==='installed'?g.installed:Boolean(aliases[g.appid])))&&
     (`${g.name} ${aliases[g.appid]||''} ${g.appid}`).toLowerCase().includes(query.toLowerCase()));
  const installedCount=games.filter(g=>g.installed).length;
  const original=games.find(g=>g.appid===selected)?.name||steamOverview(globalThis.appStore,selected)?.display_name||'';
  const restoreTile=()=>focusQuery(root.current,`[data-td-game="${lastTile||selected}"]`,70);
  const enterView=(next,first)=>{setNotice(null);setView(next);if(next==='settings')setTimeout(()=>{const scroller=root.current?.querySelector?.('[data-td-scroll="settings"]');if(scroller)scroller.scrollTop=0;},25);if(first)focusQuery(root.current,`[data-td-focus="${first}"]`,90);};
  const openGame=g=>{setLastTile(g.appid);setSelected(g.appid);setDraft(aliases[g.appid]||g.name);enterView('editor','edit-name');};
  const returnLibrary=()=>{setView('library');setNotice(null);restoreTile();};
  const openSearch=()=>{setEntry(query);enterView('search','key-0')};
  const manualId=()=>{setEntry('');enterView('appid','key-0')};
  const chooseId=()=>{const id=normId(entry);if(!id){notify('Enter a valid positive numeric App ID.',setNotice);return;}
    let game=games.find(g=>g.appid===id);
    if(!game){game={appid:id,name:steamOverview(globalThis.appStore,id)?.display_name||`Steam App ${id}`,installed:false,source:'manual'};
      setGames(previous=>[...previous,game].sort((a,b)=>a.name.localeCompare(b.name)));}
    openGame(game);
  };
  const back=()=>{
    if(view==='library'){UI.Navigation?.NavigateBack?.();return;}
    if(view==='keyboard'){enterView('editor','edit-name');return;}
    if(view==='resetConfirm'){enterView('settings','setting-restore-all');return;}
    if(view==='backupConfirm'){enterView('settings','setting-backup-restore');return;}
    if(view==='search'||view==='appid'||view==='settings'){returnLibrary();return;}
    if(view==='editor')returnLibrary();
  };
  const save=async(method,...args)=>{if(working)return;setWorking(true);
    try{await call(method,...args);const verified=await refreshState();
      const valid=method==='save_alias'?verified.aliases?.[String(args[0])]===args[1]:method==='delete_alias'?!verified.aliases?.[String(args[0])]:verified.enabled===args[0];
      if(!valid)throw Error('Settings readback failed');
      adapter?.runNow();
      notify(method==='save_alias'?`Saved “${args[1]}”. TitleDeck confirmed your alias. Open Steam's game page to check the visible title.`:
        method==='delete_alias'?'Restored original Steam title.':'Display replacements updated.',setNotice,true);
    }catch(e){notify('Could not save: '+String(e?.message||e),setNotice);}finally{setWorking(false);}
  };
  const restoreAll=async()=>{
    if(working)return;
    setWorking(true);
    try{
      // Send the exact alias map displayed on the confirmation page. The backend rejects stale requests.
      const result=await call('restore_all_titles',{...aliases});
      const verified=await refreshState();
      if(Object.keys(verified.aliases||{}).length)throw Error('Restore All could not be verified');
      adapter?.runNow();
      setDraft('');setQuery('');setScope('all');setSelected('');setLastTile('');setView('settings');
      notify(`${result?.restored_count||0} custom titles removed. Steam originals restored where TitleDeck was applying labels. Recovery backup saved.`,setNotice,true);
      focusQuery(root.current,'[data-td-focus="setting-0"]',90);
    }catch(e){
      notify(`Restore All failed: ${String(e?.message||e)}`,setNotice);
      setView('settings');
    }finally{setWorking(false)}
  };
  const startRestoreAll=()=>{
    if(!Object.keys(aliases).length){notify('There are no custom names to restore.',setNotice);return;}
    setResetPage(0);enterView('resetConfirm','reset-cancel');
  };
  // Explicit focus graph. Do not let the native two-pane/flex layout determine D-pad targets.
  const navHeader=(key,e)=>{const target=topMove(key,dir(e),scope);if(target){if(target==='tile-0'&&!filtered.length)return false;return directionTo(root.current,target,e);}halt(e);return true;};
  const navTile=(index,e)=>{const d=dir(e);if(![9,10,11,12].includes(d))return false;const columns=renderCols,visual=measuredGridDestination(root.current,index,d),next=visual!==undefined?visual:libraryMove(index,d,filtered.length,columns);
    if(next!==null){if(directionTo(root.current,`tile-${next}`,e))return true;return false;} // Native nested row/column navigation handles focus when no explicit target is mounted.
    if(d===9&&index<columns){const destinations=['tool-search','tool-search','tool-id','tool-refresh','tool-settings'];return directionTo(root.current,destinations[Math.min(destinations.length-1,Math.floor(index*5/Math.max(1,columns)))],e)}
    // At a grid edge, keep focus on the current game, never skip into random controls.
    halt(e);return true;
  };
  const editorNav=(key,e)=>{
    const d=dir(e);
    if(![9,10,11,12].includes(d))return false;
    const to=editorDestination(key,d,{canSave:!!draft.trim()&&!working,canRestore:!!aliases[selected]&&!working});
    if(to&&directionTo(root.current,to,e))return true;
    // Do not hand the direction to Steam's implicit flat traversal. It can jump rows.
    halt(e);return true;
  };
  const title=view==='library'?'Library':view==='editor'?'Rename game':view==='settings'?'Settings':view==='resetConfirm'?'Restore original titles':view==='backupConfirm'?'Restore backup':view==='search'?'Search your games':'Find game by App ID';
  const summary=view==='library'?`${games.length} games  ·  ${installedCount} installed  ·  ${Object.keys(aliases).length} renamed`:'Custom display titles, saved locally';
  const changeFilter=k=>{setScope(k);setQuery('');focusQuery(root.current,'[data-td-focus="tile-0"]',65);};
  const showMessage=h(Toast,{notice});
  const footer=(primary,secondary)=>h('div',{className:'td-bottom'},h('span',{className:'td-status'},primary),h('strong',null,secondary));
  let rail,actions,workspace,bottom;
  if(view==='library'){
    rail=h(UI.Focusable,{'flow-children':'right',className:'td-rail','data-td-layout':'filter-row'},
      ...[['all','All games'],['installed','Installed'],['renamed','Renamed']].map(([k,label])=>h(Btn,{key:k,className:'td-tab',kind:scope===k?'selected':'',
        'data-td-focus':`filter-${k}`,nav:e=>navHeader(`filter-${k}`,e),onClick:()=>changeFilter(k)},label)));
    actions=h(UI.Focusable,{'flow-children':'right',className:'td-actions','data-td-layout':'tool-row'},
      ...[['tool-search',query?`Search: ${query}`:'⌕ Search library',openSearch],['tool-id','App ID',manualId],['tool-refresh',catalogBusy?'Scanning…':'↻ Refresh',()=>void fullLibrary().then(()=>notify('Game list refreshed.',setNotice,true)).catch(e=>notify(String(e),setNotice))],['tool-settings','⚙ Settings',()=>enterView('settings','setting-0')]].map(([key,label,click])=>h(Btn,{key,className:'td-action','data-td-focus':key,
        nav:e=>navHeader(key,e),onClick:click,disabled:catalogBusy&&key==='tool-refresh'},label)),
      h('span',{className:'td-results'},`${filtered.length} shown`));
    workspace=h('div',{className:'td-workspace','data-td-scroll':'library'},
      filtered.length?h(UI.Focusable,{'flow-children':'down',className:'td-grid','data-td-grid':'true','data-td-columns':renderCols},
        ...rowChunks(filtered,renderCols).map((row,rowIndex)=>h(UI.Focusable,{
          key:`game-row-${rowIndex}`,'flow-children':'right',className:'td-grid-row',
          'data-td-row':String(rowIndex)},
          ...row.map((game,col)=>{const index=rowIndex*renderCols+col;return h(Btn,{
            key:game.appid,className:'td-game','data-td-game':game.appid,'data-td-focus':`tile-${index}`,
            nav:e=>navTile(index,e),onClick:()=>openGame(game),onFocus:()=>setLastTile(game.appid),onGamepadFocus:()=>setLastTile(game.appid)},
            h('div',{className:'td-game-artbox'},h(Cover,{id:game.appid,title:game.name}),aliases[game.appid]?h('span',{className:'td-game-mark'},'RENAMED'):null),
            h('div',{className:'td-game-copy'},h('div',{className:'td-game-title'},aliases[game.appid]||game.name),
              h('div',{className:'td-game-sub'},aliases[game.appid]?game.name:game.installed?'● Installed':`App ${game.appid}`)));}))))
       :h('div',{className:'td-empty'},h('h2',null,query?'No matching games':'No games in this category'),h('p',null,query?'Open Search to try a different title or App ID.':'Refresh the library or choose All games.'),
         h(Btn,{onClick:()=>{setScope('all');setQuery('');}},'Show all games')));
    bottom=footer('D-pad: browse   •   A: rename   •   B: back   •   Search and filters above',`${filtered.length} titles`);
  }else if(view==='editor'){
    rail=h('div',{className:'td-rail'},h('div',{className:'td-rail-label'},'CUSTOM NAME'),h('div',{className:'td-rail-label',style:{textAlign:'center'}},'Steam game '+selected),h('div',{className:'td-rail-label',style:{textAlign:'right'}},aliases[selected]?'● Saved override':'Original title'));
    actions=h('div',{className:'td-actions',style:{display:'flex'}},h(Btn,{className:'td-action','data-td-focus':'edit-back',nav:e=>editorNav('edit-back',e),onClick:returnLibrary},'← All games'),h('div',{style:{flex:1}}),h('span',{className:'td-results'},'Edit → Save → Verify in Steam'));
    workspace=h('div',{className:'td-workspace'},h('div',{className:'td-editor'},h('div',null,h('div',{className:'td-editor-art'},h(Cover,{id:selected,title:original}))),
      h('div',{className:'td-card'},h('div',{className:'td-copy-label'},'ORIGINAL STEAM TITLE'),h('div',{className:'td-title-large'},original||'Unknown game'),
        h('div',{className:'td-copy-label'},'CUSTOM DISPLAY TITLE'),h('div',{className:'td-preview'},draft||'No title entered'),
        h(UI.Focusable,{'flow-children':'down',className:'td-editor-actions','data-td-layout':'editor-grid'},
          h(UI.Focusable,{'flow-children':'right',className:'td-editor-action-row','data-td-layout':'editor-top'},
            h(Btn,{'data-td-focus':'edit-name',nav:e=>editorNav('edit-name',e),onClick:()=>enterView('keyboard','key-0')},'✎ Change name'),
            h(Btn,{'data-td-focus':'edit-clean',nav:e=>editorNav('edit-clean',e),onClick:()=>{const suggested=cleanTitle(original);if(suggested){setDraft(suggested);notify('Cleanup suggestion ready for review.',setNotice,true)}else notify('No changes needed. Set your own title instead.',setNotice);}},'Suggest cleanup')),
          h(UI.Focusable,{'flow-children':'right',className:'td-editor-action-row','data-td-layout':'editor-bottom'},
            h(Btn,{'data-td-focus':'edit-save',nav:e=>editorNav('edit-save',e),disabled:working||!draft.trim(),onClick:()=>void save('save_alias',selected,draft.trim())},working?'Saving…':'✓ Save custom title'),
            h(Btn,{'data-td-focus':'edit-restore',nav:e=>editorNav('edit-restore',e),disabled:working||!aliases[selected],onClick:()=>{setDraft(original);void save('delete_alias',selected)}},'Restore original'))),
        h('div',{className:'td-editor-note'},aliases[selected]?`Saved as: ${aliases[selected]}. Changes to visible game titles are active when TitleDeck is enabled.`:
          'Your new title stays independent of Steam metadata. The Steam title override is already working on the tested Catherine game.'))));
    bottom=footer('A: select an action  •  B: return to library',state.enabled?'Steam title replacement ON':'Display replacement paused');
  }else if(view==='keyboard'||view==='search'||view==='appid'){
    rail=h('div',{className:'td-rail'},h('div',{className:'td-rail-label'},'TYPE'),h('div',{className:'td-rail-label',style:{textAlign:'center'}},view==='keyboard'?'New game title':view==='search'?'Search library':'Steam App ID'),h('div',{className:'td-rail-label',style:{textAlign:'right'}},'A to select'));
    actions=h('div',{className:'td-actions',style:{display:'flex'}},h(Btn,{className:'td-action',onClick:back},'← Back'),h('div',{style:{flex:1}}),h('span',{className:'td-results'},'On-screen controller keyboard'));
    const typing=view==='keyboard'?draft:entry;
    const setTyping=view==='keyboard'?setDraft:setEntry;
    workspace=h('div',{className:'td-workspace'},h(Keypad,{value:typing,setValue:setTyping,root:root.current,done:()=>{
      if(view==='search'){setQuery(entry.trim());enterView('library','tile-0');}
      else if(view==='appid')chooseId();
      else enterView('editor','edit-name');}}));
    bottom=footer('D-pad: move  •  A: type  •  B: go back',view==='search'?'Search the full library':'No Steam overlay keyboard needed');
  }else if(view==='backupConfirm'){
    const manual=state.manual_backup||{};
    rail=h('div',{className:'td-rail'},h('div',{className:'td-rail-label'},'BACKUP'),h('div',{className:'td-rail-label'},`${manual.count||0} stored names`),h('div',{className:'td-rail-label'},'Confirmation required'));
    actions=h('div',{className:'td-actions'},h('span',{className:'td-results'},'Restoring a backup replaces current aliases'));
    workspace=h('div',{className:'td-workspace'},h('div',{className:'td-card td-confirm'},
      h('div',{className:'td-warning-label'},'REPLACE CURRENT TITLES'),
      h('div',{className:'td-title-large'},'Restore saved backup?'),
      h('p',{className:'td-editor-note'},`Your current ${Object.keys(aliases).length} custom names will be replaced with ${manual.count||0} saved names. Steam files will not change.`),
      h('div',{className:'td-confirm-actions'},
        h(Btn,{'data-td-focus':'backup-cancel',onClick:()=>enterView('settings','setting-backup-restore'),nav:e=>{if(dir(e)===12)return directionTo(root.current,'backup-confirm',e);halt(e);return true}},'Keep current names'),
        h(Btn,{'data-td-focus':'backup-confirm',disabled:working||!manual.available,onClick:async()=>{setWorking(true);try{await call('restore_backup');await refreshState();adapter?.runNow();setView('settings');notify('Saved backup restored.',setNotice,true)}catch(e){notify('Could not restore backup: '+String(e?.message||e),setNotice)}finally{setWorking(false)}},nav:e=>{if(dir(e)===11)return directionTo(root.current,'backup-cancel',e);halt(e);return true}},'Confirm restore backup'))));
    bottom=footer('B: cancel','Your current names are preserved until you confirm');
  }else if(view==='resetConfirm'){
    const rows=resetReviewRows(aliases,games),count=rows.length;
    const page=reviewPage(rows,resetPage,6);
    const switchPage=(step)=>{const at=Math.min(Math.max(0,page.at+step),page.pages-1);setResetPage(at);focusQuery(root.current,step>0?'[data-td-focus="review-next"]':'[data-td-focus="review-prev"]',55);};
    const reviewNav=(key,e)=>{
      const d=dir(e);
      const destinations={
        'review-prev':{12:'review-next',10:'reset-cancel',9:'reset-cancel'},
        'review-next':{11:'review-prev',10:'reset-yes',9:'reset-cancel'},
        'reset-cancel':{12:'reset-yes',9:page.at===0?'review-next':'review-prev'},
        'reset-yes':{11:'reset-cancel',9:'review-next'}
      };
      const target=destinations[key]?.[d];if(target&&directionTo(root.current,target,e))return true;
      halt(e);return true;
    };
    rail=h('div',{className:'td-rail'},h('div',{className:'td-rail-label'},'REVIEW RESET'),h('div',{className:'td-rail-label',style:{textAlign:'center'}},`${count} saved title${count===1?'':'s'}`),h('div',{className:'td-rail-label',style:{textAlign:'right'}},'Confirmation required'));
    actions=h('div',{className:'td-actions',style:{display:'flex'}},h('span',{className:'td-results'},`All ${count} names available for review • page ${page.at+1} of ${page.pages}`));
    workspace=h('div',{className:'td-workspace td-review-workspace'},h('div',{className:'td-card td-confirm td-review-panel'},
      h('div',{className:'td-warning-label'},'RESTORE ALL ORIGINAL TITLES'),
      h('div',{className:'td-title-large'},`Remove ${count} custom display name${count===1?'':'s'}?`),
      h('p',{className:'td-editor-note'},'Only TitleDeck aliases will be cleared. Steam files and metadata stay untouched. A recovery backup will be created before removal.'),
      h('div',{className:'td-review-header'},h('strong',null,`Names ${count?page.start+1:0}–${page.end} of ${count}`),h('span',null,`Page ${page.at+1} / ${page.pages}`)),
      h('div',{className:'td-confirm-examples td-review-list','aria-label':'All custom title changes, paginated'},
        ...page.items.map(v=>h('div',{key:v.appid,className:'td-confirm-example td-review-row'},
          h('span',{className:'td-review-custom'},v.custom),h('span',{className:'td-review-arrow','aria-hidden':'true'},'→'),
          h('span',{className:'td-review-original'},v.original||`Original Steam title unavailable (App ${v.appid})`)))),
      h(UI.Focusable,{'flow-children':'right',className:'td-review-pager'},
        h(Btn,{'data-td-focus':'review-prev',className:'td-action',disabled:page.at===0,onClick:()=>switchPage(-1),nav:e=>reviewNav('review-prev',e)},'‹ Previous names'),
        h(Btn,{'data-td-focus':'review-next',className:'td-action',disabled:page.at>=page.pages-1,onClick:()=>switchPage(1),nav:e=>reviewNav('review-next',e)},'Next names ›')),
      h('div',{className:'td-editor-note td-review-note'},`Review all ${count} names before confirming if desired. Recovery backup is created automatically.`),
      h(UI.Focusable,{'flow-children':'right',className:'td-confirm-actions'},
        h(Btn,{className:'td-action','data-td-focus':'reset-cancel',nav:e=>reviewNav('reset-cancel',e),onClick:()=>enterView('settings','setting-restore-all')},'Keep my custom titles'),
        h(Btn,{className:'td-action td-danger','data-td-focus':'reset-yes',disabled:working||count===0,nav:e=>reviewNav('reset-yes',e),onClick:()=>void restoreAll()},working?'Restoring…':`Confirm restore all (${count})`))));
    bottom=footer('A: choose  •  Left/Right: switch  •  B: cancel','No changes happen until confirmation');
  }else{
    const aliasCount=Object.keys(aliases).length,recovery=state.recovery||{},manual=state.manual_backup||{};
    rail=h('div',{className:'td-rail'},h('div',{className:'td-rail-label'},'PREFERENCES'),h('div',{className:'td-rail-label',style:{textAlign:'center'}},`${aliasCount} custom title${aliasCount===1?'':'s'}`),h('div',{className:'td-rail-label',style:{textAlign:'right'}},'Local-first • reversible'));
    actions=h('div',{className:'td-actions',style:{display:'flex'}},h(Btn,{className:'td-action','data-td-focus':'settings-back',nav:e=>{if(dir(e)===10)return directionTo(root.current,'setting-0',e);if(dir(e)===9)return directionTo(root.current,'close',e);halt(e);return true;},onClick:returnLibrary},'← All games'),h('div',{style:{flex:1}}),h('span',{className:'td-results'},'Aliases & recovery'));
    const settingPanel=(id,title,desc,action,extra='',wide=false)=>h('section',{className:`td-setting-panel ${wide?'td-panel-wide':''}`,'data-td-setting':id},
      h('h3',null,title),h('p',null,desc),extra?h('div',{className:'td-mini-state'},extra):null,action);
    const settingsGrid=[['setting-0','setting-backup'],['setting-backup-restore','setting-recover'],['setting-scan'],['setting-restore-all']];
    const settingsDirection=(key,e)=>{
      const d=dir(e),coord=settingsGrid.flatMap((r,y)=>r.map((v,x)=>({v,y,x}))).find(x=>x.v===key);
      if(!coord)return false;
      if(d===9&&coord.y===0){const scroller=root.current?.querySelector?.('[data-td-scroll="settings"]');if(scroller)scroller.scrollTop=0;return directionTo(root.current,'settings-back',e);}
      const candidates=[];
      if(d===11&&coord.x>0)candidates.push(settingsGrid[coord.y][coord.x-1]);
      if(d===12&&coord.x<settingsGrid[coord.y].length-1)candidates.push(settingsGrid[coord.y][coord.x+1]);
      if(d===9&&coord.y>0){for(let row=coord.y-1;row>=0;row--)candidates.push(settingsGrid[row][Math.min(coord.x,settingsGrid[row].length-1)]);}
      if(d===10&&coord.y<settingsGrid.length-1){for(let row=coord.y+1;row<settingsGrid.length;row++)candidates.push(settingsGrid[row][Math.min(coord.x,settingsGrid[row].length-1)]);}
      for(const dest of candidates){const node=root.current?.querySelector?.(`[data-td-focus=\"${dest}\"]`);if(node&&!node.disabled&&directionTo(root.current,dest,e))return true;}
      halt(e);return true;
    };
    const button=(text,onClick,opts={})=>h(Btn,{className:'td-action',onClick,disabled:opts.disabled||working,'data-td-focus':opts.focus||undefined,nav:opts.focus?e=>settingsDirection(opts.focus,e):undefined},text);
    const safeCall=async(name,success)=>{if(working)return;setWorking(true);try{const result=await call(name);await refreshState();adapter?.runNow();notify(success(result),setNotice,true);}catch(e){notify(`Could not ${name.replaceAll('_',' ')}: ${String(e?.message||e)}.`,setNotice);}finally{setWorking(false)}};
    workspace=h('div',{className:'td-workspace','data-td-scroll':'settings'},h('div',{className:'td-settings'},
      h('h2',{className:'td-title-large'},'Settings'),
      h('p',{className:'td-settings-intro'},'Make your library yours. Every name stays in TitleDeck, never in Steam game files. Your existing changes remain safe.'),
      h('div',{className:'td-settings-grid'},
        settingPanel('overrides','Display title replacement','Keep your custom titles active throughout supported Steam screens.',
          button(state.enabled?'Pause replacements':'Enable replacements',()=>void save('set_enabled',!state.enabled),{focus:'setting-0'}),state.enabled?'● Enabled':'○ Paused'),
        settingPanel('backup','Save a backup','Save the current names to a separate local backup you can restore later.',
          button('Create backup',()=>void safeCall('create_backup',()=> 'TitleDeck backup saved.'),{focus:'setting-backup'}),manual.available?`Saved backup: ${manual.count} name(s)`:'No manual backup yet'),
        settingPanel('backup-restore','Restore a saved backup',manual.available?`Replace current names with the ${manual.count} name(s) in your saved backup.`:'Create a backup first to use this feature.',
          button('Restore saved backup',()=>{setView('backupConfirm');focusQuery(root.current,'[data-td-focus="backup-cancel"]',90)},{disabled:!manual.available,focus:'setting-backup-restore'}),manual.available?'● Backup available':'○ No backup'),
        settingPanel('recovery','Recover after Restore All',recovery.available?`Your last Restore All saved ${recovery.count} name(s). Undo is allowed only if you have not added new names.`:'No Restore All recovery is available yet. This option activates after a confirmed reset.',
          button(`Recover ${recovery.count||0} names`,()=>void safeCall('undo_restore_all',r=>`Recovered ${r?.recovered_count||recovery.count} custom titles.`),{disabled:!recovery.available||aliasCount!==0,focus:'setting-recover'}),recovery.available?(aliasCount?'Save or clear current names before recovery':'● Recovery ready'):'○ Nothing to recover'),
        settingPanel('diagnostics','Steam display diagnostics',`Bridge: ${steamBridgeStatus}. Documents: ${adapter?.docs||0}. Visible text matches: ${adapter?.applied||0}. Saved names: ${aliasCount}. No Steam artwork or metadata is modified.`,
          button('Rescan Steam titles',()=>{adapter?.runNow();notify(`Steam display scan complete. Visible matches: ${adapter?.applied||0}.`,setNotice,true)},{focus:'setting-scan'})),
        h('section',{className:'td-setting-panel td-panel-wide td-panel-danger'},h('h3',null,'Restore every original Steam title'),
          h('p',null,`Remove all ${aliasCount} saved display override${aliasCount===1?'':'s'} from TitleDeck. You will review a separate confirmation and an automatic recovery backup will be created first.`),
          button('Review Restore All…',startRestoreAll,{disabled:!aliasCount,focus:'setting-restore-all'}),
          h('div',{className:'td-mini-state'},'Nothing is removed until you explicitly confirm.'))
      )));
    bottom=footer('B: return to library',`TitleDeck ${PLUGIN_VERSION}`);
  }
  return h(UI.Focusable,{'data-titledeck-ui':'true',className:'td-root',ref:root,'flow-children':'down',onCancel:e=>{halt(e);back()}},
    h('style',null,STYLE),
    h('main',{className:'td-shell','data-td-layout':'manager-shell'},
      h('header',{className:'td-header'},h('div',{className:'td-identity'},h('img',{src:ICON_DATA_URI,className:'td-logo',alt:''}),
        h('div',{style:{minWidth:0}},h('div',{className:'td-heading'},'TitleDeck ',h('span',{className:'td-version-chip'},`v${PLUGIN_VERSION}`),' · ',title),h('div',{className:'td-sub'},summary))),
        h('div',{className:'td-header-tools'},h('span',{className:'td-pill'},`${Object.keys(aliases).length} renamed`),
          h(Btn,{className:'td-close','data-td-focus':'close',nav:e=>view==='editor'?editorNav('close',e):navHeader('close',e),onClick:back},view==='library'?'✕ Close':'← Back'))),
      rail,actions,workspace,bottom,showMessage));
}
function QuickPanel(){
 const data=useStateSnapshot(),[error,setError]=R.useState('');
 const open=()=>{try{UI.Navigation.CloseSideMenus?.();UI.Navigation.Navigate(ROUTE);}catch(e){setError(String(e));}};
 return h(UI.PanelSection,{title:'TitleDeck'},h('div',{'data-titledeck-ui':'true'},
   h('div',{style:{display:'flex',alignItems:'center',gap:9,padding:'6px 0'}},h('img',{src:ICON_DATA_URI,style:{width:42,height:42,borderRadius:9}}),h('div',null,h('div',{style:{display:'flex',alignItems:'center',gap:7}},h('strong',null,'TitleDeck'),h('span',{className:'td-qam-version',style:QAM_VERSION_STYLE},`v${PLUGIN_VERSION}`)),h('div',{style:{fontSize:12,opacity:.7}},`${Object.keys(data.aliases||{}).length} custom names`))),
   h(UI.PanelSectionRow,null,h(UI.ButtonItem,{onClick:open,layout:'below'},'Open full library manager')),
   error?h('div',null,error):null));
}
function discoverDocuments(){
 const docs=[];
 try{const trees=UI?.getGamepadNavigationTrees?.()||[];const stack=Array.isArray(trees)?[...trees]:[trees];let n=0;const seen=new Set();
   while(stack.length&&n++<1200){const node=stack.pop();if(!node||typeof node!=='object'||seen.has(node))continue;seen.add(node);
     const el=node.m_element||node.element||node.m_HTMLElement||node.m_DOMElement||node.m_el;
     if(el?.ownerDocument&& !docs.includes(el.ownerDocument))docs.push(el.ownerDocument);
     if(docs.length>8)break;
     for(const key of ['m_Children','children','m_rgChildren','m_vecChildren']){const kids=node[key];if(Array.isArray(kids))stack.push(...kids);}
   }
 }catch{}
 return docs;
}
// Decky owns this React component in the main Steam window. Its hidden anchor
// is only used to locate the right document; no shared React render funcs patched.
const STEAM_DOC_ANCHOR = 'TitleDeckSteamDocumentAnchor';
function SteamDocumentAnchor(){
  const ref=R.useRef(null);
  R.useEffect(()=>{
    const doc=ref.current?.ownerDocument;
    if(!doc?.body)return;
    if(steamDocument!==doc){
      steamDocument=doc;
      adapter?.stop();
      adapter=createTitleAdapter(doc,()=>latestState,()=>doc.defaultView?.appStore||globalThis.appStore,()=>[doc,...discoverDocuments()]);
      adapter.start();
      steamBridgeStatus='Connected to Steam UI document';
    }
    return ()=>{if(steamDocument===doc){adapter?.stop();adapter=null;steamDocument=null;steamBridgeStatus='Steam UI detached';}};
  },[]);
  return h('span',{ref,style:{display:'none'},'data-titledeck-ui':'true'});
}
export default function createPlugin(){
 if(!R?.createElement||!UI?.DialogButton||!UI?.Focusable||!UI?.PanelSection)throw Error('TitleDeck requires Decky frontend.');
 const api=connect();
 api.routerHook?.addRoute?.(ROUTE,Manager,{exact:true});
 if(typeof api.routerHook?.addGlobalComponent==='function'){
   try{api.routerHook.addGlobalComponent(STEAM_DOC_ANCHOR,SteamDocumentAnchor);}catch(e){steamBridgeStatus='Steam UI bridge unavailable: '+String(e);}
 }else{steamBridgeStatus='Steam UI global component API unavailable';}
 // Fallback adapter watches only the plugin document until the real Steam anchor mounts.
 if(!adapter){adapter=createTitleAdapter(globalThis.document,()=>latestState,()=>globalThis.appStore,()=>steamDocument?[steamDocument]:discoverDocuments());adapter.start();}
 refreshState().catch(e=>console.warn('[TitleDeck] state load:',e));
 return{name:PLUGIN,titleView:h('span',{style:{display:'flex',alignItems:'center',gap:8}},'TitleDeck',h('span',{className:'td-version-chip',style:QAM_VERSION_STYLE},`v${PLUGIN_VERSION}`)),content:h(QuickPanel),
   icon:h('img',{src:ICON_DATA_URI,alt:'TitleDeck',style:{width:24,height:24,objectFit:'contain'}}),
   onDismount(){adapter?.stop();adapter=null;steamDocument=null;
     try{api.routerHook?.removeGlobalComponent?.(STEAM_DOC_ANCHOR)}catch{}
     try{api.routerHook?.removeRoute?.(ROUTE)}catch{}
     bridge=null;observers.clear();}};
}
