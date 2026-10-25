/** TitleDeck 0.9.0 RC: compact controller-first game library, editable aliases, conservative Steam title overlay. */
const PLUGIN = 'TitleDeck', PLUGIN_VERSION = '0.9.0-rc.1', ROUTE = '/titledeck/manager';
const R = globalThis.SP_REACT;
const UI = globalThis.DFL;
const h = (...a) => R.createElement(...a);
const QAM_VERSION_STYLE = {display:'inline-flex',alignItems:'center',fontSize:10,fontWeight:800,color:'#e9eef6',background:'#384257',border:'1px solid #7d8aa5',borderRadius:99,padding:'3px 7px',lineHeight:1};
const ICON_DATA_URI = 'data:image/webp;base64,UklGRqgKAABXRUJQVlA4IJwKAABQMwCdASqAAIAAPkUejEUioaEjppFLcHAIiUAZMBYKe/suZu678Oc32cXtq/c+ub/HetD7mfcG/T7+99VfzFfsP+0nu1eir7APgA/WbrafQA/Xn00/ZD/an9t/aFugnLcezmce+/35z8m/27/3fRbvFP51/b+Grm08mv6P/s+OTuTf8N+W/POUAPyl/pftV+Rv/c81v1N/2fcS/mP9Q/2/9t/eXvd+jMWitoTb3LX8trScgmTAZ6CNlXK/+NCqJ35IwjVVvadTm2R6vGVi1mUhHBmgbhz44HQML+P5CnnN5+O+4Ld+mzwCzq+sqhCENxixFwDz+map/LCUWU9epBI1TVSNBFWhBxFVbFLf881BHhpB4A1YKYBSRBIzlEnshJ/9TsNN1wJdCv6DML4XO9G2GqKj/c8MeSFW05HIoOhCmfARXgUUXF+w0b2/Z2bfwQQIiWYLZ9aozbymVP85xfpIMXDuoQwm6UO67ATLfXM+iP8i19bTSV6ie7W0/hVaBQgj4Q44HpyDHmtpPKOCdnAeT/aU3EY9m5pyWTriLlt9Gx24AAD+/1Z7NthDTb37UFPLoTt4wc6i9FM5jSvpHtRfewnQyAuN1wRErY6dy/zKIZbraw6NEQiosdt8dHKKIDoKJP8sINxIf71gphfbMg95t8M36NhaFndX8fsu2/83OWL85izQtfu2kPaFurTSP8kaL6vuTjNQrzuQ3I4U4DRqk3ysoIMNvgBKhzL0wEx/aHBfPUJM6jEqxK/4JEz2xVi8IgvMVlB0kXxSWxBg/s76AW02eaWGP1Xa0XYBCGf/kJlR/BmvW2XVMMdhnO+X+Zugaah9VwJHW1yqA1il9MWKQl2qlwIF69+7GH3Qld7Dt/7UgE+bAdNQXTr5Ro+G91IWYzWf9eZKyGIQoub50d15Y+/JdGlx+0bubtSRLB69N+uc2EnyfWupxFlE8leNo+b+IawppKXucZJQbWyny5RhivERow/Mbqrko9lbn5EeB9dH/RZkyvp67K2/FEmBAQrdCcgXzZBrKF74tHvNALynOK0brZ+BQatNrXRqH5xYQVOEeze2exsT5NVRPOBr69e9dfHkwKsZQsR98F8ldBpi8bsEQO1BaXzii/7m+cEp2S4RLgIDUc/iMbsISQKYc+hdoyDqhx/mrXoZrp1ea3iLaJmvxi6b0+qO5hMLv7q6MMu9ZNH9/hPB3islFno3aijnM/cvU9/7QTxOcP00fO2HkNYsDJ6eJ4CiIs0Hd2+m8ax/ABbJz1S3ZPTFX8JfAnJdtM81vtfaVDTWVTFyv/R5jilNcM/Dt/zmDiZU4/C4ehWFUBCa9LHdNWqwujB6Yw6WrYsH12u/3aqZr7cK5i++vAMc2jTgqi9fbzguGDYQ6e+BR5RyTIHRsL3pWy2T7C3kOtqkS7CUOJFJQkvxuiYN3/HwUPBDIw6c0UTaSBILNKQcHkiMY7P5RVCCR1rpwJ0qWC4gTGf+PuK4+FBWCIQYX7fs6N+ffSAxivW7sXNIM0ufe7Sn7/rPm+VFBHAJr3/qNfJjcKxRFd6lP87CwaxM+5hRgWSgbNANXvYDIIZt2xWk1xiKop3nYJ+SOAq73AtZn+/K9HvxOa67+sJq4z/BXRgUXeoKHOnhunQqCbMVHlhd0nZWEYcnAjTRIl6oN+jBynSN9KGzkcEJzhIIq+8q4C2AW1dQidlTYrRJcGIhv1HhHZjMJLWmhdyoJg0M/qrWf6/qoFFGzrbwN57NWv75bT62mP6hfko+QAkI73iQtyc0bVHD5T15lfJjaMUPvok9N/v/l0jnE3LXnSXgARpS5PyBHxZ4zuw3dajC28fmYCh/IyIS0ApGxKZoLo1NaWtcwZWg/rU/At2bPMLfj737PZbDJgnQ6Niep//PPfx7Xw6rir4riCIkA4wN+AaPrkzZcpW2vSQTKPnlNFnFO+e1vecnyJACKPLQEIyYQCHjy9LLalhUSTIn/94YgYvbKKzcYBTnQWGQ99c1DVU2B/NKbZx2eovAX8qPQVoXuYP6W66/PQu2wzouNMIZt82EtK8SXmYuohklNRKyU/3yfkrdiK2mbPqCgzg8VYQP2HevHZB6bwUT7GKGyQuLOtLRetK+a6BkAu+tTHBdOCPkVL66FBZea/iTalvLZ0Yr1SnpcCTP9WXlZviV/4sWL8EPrablCcxfSk9hmO+tfstM9tYD0yhY+ZwtoJuq3EbQ7fB9/tuCWQwXyZx7UMB7SjiuA7MMHSXSD42h8Dlz//rRI/OY8mG9ZZN80Kqu8DAI63Ai8sk23PwsX7tS5at9tmntPhA/bZ9qmjlSExflHhqWGGGJPChDhXMk2zYcf5lyRY/TrLC42pY52sppoBdETZbIE1WoCwPw74Cln/yZMh/yTHjh1xr/Wsxlyad33sSVQABiLbeQ5b/UdKxer1jvhoRGQ/4uEzmbC/1QpX8H/6n2T4Cz3hBUIf/+vaUF6z+X6TyBk3ZLiK2irO4oQqj3cwPL1MCY9OF0RShQO9tfezl5VFiTc5/GQxran4D0jDGvhgmaDCfhWB5/38TwynEeKQ8U8cKguN75fkWlS4R1td51nP5d12rEWL603V/52gqXc5NRwpsyZc2arhhKnsekIF7/OZAPY8F4iJfxR7tvSwqGcyv0oqrSoJuYOOO/Ucr9JEZYQp7QkC+ZlWRfnYCxGk2U99S6mNUDRWMoyAB5fcDUzw0QfLkXw+Y5PJXX+aBdqyM0CBtOH67g+KkQGNLYv6Uqf4T4DfmMK5IBdM6+phTVMmUB3LInI6lkfA6yAgOnVcC2gVTj8VH8zjA33HZRWor19WFEkbwnC+kCU00J0KoHKSA1WWVPok+IIZ+vjNEZhiYFA4X2pLyb1Q9339zmZ/uld1pvufjchS3D6UfOGfORWnXy/IgxJLHueFxneG8x53iFnikn+L8lQEnEzl3KZLvexFlLk6YK2A9uQiUXZJ7H3qujz1qkQR6xFz5mHCngS3/wsRop89Hrj1jo/a96GSh3Ys32aRiUbLDD3HDffU9kZ1Lx6WFdCLtnByBbDrxEdn4ghcTcH703uf6XUZmQgx5xbf/3NbTxj/NScrpc39G2oGyuxG45RmaAqt8RwAPJf77K9n28n/wbIy/r6TZTpOeFPFCy9A/QZMXuv/kFYyl3nDaR/zzRMqjZFz9TgJURuiVh9YLDrAPPTL7RtW0GMjZPxKocVmmvjY6W21hIXGR9hfiPLQpJxfQokmvet+AjIP+I9y9dDNsG8wCZwLwAmQHPzKNseiKaj189lxe/W00FWR/6Xu/6X0CdOnQXMXDz3qlZC3KmDk1Gh5n4jx3Xncl05xM3OTARujPjyu2ScQ1ioBJELZayD/nm2wdWpxtDbJJh7wLci9AH9KejL8My0U7cAiKLvK1fbAekqlfSQn/0Sp0LDxuOYnlzKRsBkKHPHW/Evnwqw2U4mQv9FgA88VuzJNzzlgTUuX1zg3G9Lx3VCFo8O5NjJhif3MSOovstVaRxKe+ksC0KxyAgNORHtgTvMCxRmvJ80VwTHcfI6DvbHEe0UwV/4fpEtl++xcC3taG8tG7Yt9r8EHcnJgQOwj8jhL0ItgZJQDnbO2OUC8ZvI3AfRnKSE7M2mnhJl4AA';

let bridge, adapter, descriptionAdapter, gameInfoDataAdapter;
let steamDocument = null;
let steamBridgeStatus = "Waiting for Steam window";
const STEAM_ANCHOR = "TitleDeckSteamTextBridge";
let latestState = { schema:1, enabled:true, aliases:{}, descriptions:{}, description_position:'below_play', games:[], recovery:{available:false,count:0}, manual_backup:{available:false,count:0} };
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
  adapter?.runNow();descriptionAdapter?.runNow();gameInfoDataAdapter?.runNow();
  return latestState;
}
function useStateSnapshot(){
  const [snap,setSnap]=R.useState(latestState);
  R.useEffect(()=>{observers.add(setSnap);return()=>observers.delete(setSnap)},[]);
  return snap;
}
async function refreshState(){return acceptState(await call('snapshot'));}
// Suggest capitalization edits without destroying distinctive symbols or series names.
// Not applied automatically: the user must review the draft and choose Save.
const ORIGINAL_CASE_TOKENS = new Set([
  'HD','VR','DX','DLC','RPG','MMO','FPS','PC','PS','PSP','PSVITA','GTA','NFS',
  'DOOM','NBA','NFL','FIFA','WWE','UFC','USA','UK','EU','GOTY','FFXII','FFXIV',
  'FFXI','FFVII','FFVIII','FFXVI','FFX','FFIX','FFXV','FFXIII',
]);
function keepUppercaseToken(word){
  return ORIGINAL_CASE_TOKENS.has(word) || /^(?:[IVXLCDM]{2,}|FF[IVXLCDM]+)$/.test(word) || (word.length<=2 && !/^(?:A|AN|AT|BY|IN|IT|OF|ON|OR|TO)$/.test(word));
}
export function cleanTitle(title){
  const old=String(title||'').trim();
  let candidate=old.replace(/[™®©]/g,'').replace(/\s{2,}/g,' ').trim();
  // Only alter genuinely ALL-CAPS Latin words. Mixed-case words, Greek letters
  // (Σ, Ω), digits, Roman-numeral suffixes and punctuation stay unchanged.
  const latin=/[A-Za-z]+(?:['’][A-Za-z]+)*/g;
  const words=[...candidate.matchAll(latin)].map(m=>m[0]);
  const needsCase=words.some(word=>word.length>=3 && word===word.toUpperCase() && !keepUppercaseToken(word));
  if(needsCase){
    let pos=0,afterBoundary=true;
    candidate=candidate.replace(latin,(word,offset,whole)=>{
      const before=whole.slice(pos,offset);
      if(/[.:!?]/.test(before))afterBoundary=true;
      const atStart=afterBoundary || offset===0;
      pos=offset+word.length;
      afterBoundary=false;
      if(word!==word.toUpperCase() || keepUppercaseToken(word))return word;
      const lower=word.toLowerCase();
      if(!atStart && /^(?:and|or|of|for|to|in|on|at|by|the|a|an)$/.test(lower))return lower;
      return lower[0].toUpperCase()+lower.slice(1);
    });
  }
  return candidate!==old?candidate:'';
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

// TitleDeck title overlay: refresh text *during Steam's mutation microtask*, before
// the next paint whenever Steam's client allows it. Preserve metadata and DOM structure.
// Only exact, uniquely identified original titles are replaced. Every write is reversible.
export function createTitleAdapter(host,getState,getStore=()=>globalThis.appStore,getDocuments=()=>[]) {
  let stopped=false, scanTimer=null, heartbeat=null, observerList=[], scanned=0, fastPasses=0;
  const changed=new Map();
  const MAX_NODES=9000, MAX_MUTATION_NODES=3500;
  function restore(){
    for(const [node,saved] of changed){
      try{if(node.isConnected && node.nodeValue===saved.alias)node.nodeValue=saved.original;}catch{}
    }
    changed.clear();
  }
  function docs(){
    const unique=new Set();
    const add=d=>{if(d?.documentElement&&typeof d.createTreeWalker==='function')unique.add(d);};
    add(host);
    try{add(globalThis.document);}catch{}
    try{add(globalThis.top?.document);}catch{}
    try{add(globalThis.window?.top?.document);}catch{}
    try{const frames=globalThis.document?.querySelectorAll?.('iframe');for(const frame of [...(frames||[])].slice(0,12))add(frame.contentDocument);}catch{}
    try{getDocuments().forEach(add);}catch{}
    return [...unique];
  }
  function isExcluded(el){
    if(!el || !el.isConnected)return true;
    // Allow Steam's own game-options dialogs, whose headings can show a title.
    // Keep editable controls, other Decky panels, and unrelated notifications untouched.
    try{if(el.closest?.('[data-titledeck-ui], [data-titledeck-description], [data-titledeck-exclude], [contenteditable], [role="textbox"], [role="combobox"], input, textarea, script, style, select, option'))return true;}catch{}
    const name=String(el.className||'');
    return /(?:decky|notification|toast|tooltip|chat|friendslist)/i.test(name);
  }
  function titleMap(){
    const {enabled,aliases={},games=[]}=getState()||{};
    if(!enabled)return new Map();
    const mapping=new Map(),owners=new Map(),ambiguous=new Set();
    const gamesById=new Map(games.map(game=>[String(game.appid),game]));
    let store=null;
    try{store=getStore();}catch{}
    for(const [id,alias] of Object.entries(aliases)){
      if(typeof alias!=='string'||!alias.trim())continue;
      const overview=steamOverview(store,id);
      const game=gamesById.get(id);
      // Steam can refresh names in the app store and retain the previous local
      // manifest name for a while. Accept either *known original* for this ID.
      for(const value of [overview?.display_name,game?.name]){
        const original=String(value||'').trim();
        if(!original||original===alias)continue;
        if(owners.has(original)&&owners.get(original)!==id)ambiguous.add(original);
        owners.set(original,id);mapping.set(original,alias);
      }
    }
    for(const name of ambiguous)mapping.delete(name);
    return mapping;
  }
  function substitute(raw,alias){
    const stripped=raw.trim(),start=raw.indexOf(stripped);
    return raw.slice(0,start)+alias+raw.slice(start+stripped.length);
  }
  function patchText(node,mapping,checkVisibility=false){
    if(!node||typeof node.nodeValue!=='string')return false;
    let prior=changed.get(node);
    if(prior){
      if(!node.isConnected){changed.delete(node);return false;}
      const next=mapping.get(prior.original.trim());
      if(!next){
        if(node.nodeValue===prior.alias)node.nodeValue=prior.original;
        changed.delete(node);return false;
      }
      const expected=substitute(prior.original,next);
      if(node.nodeValue===prior.alias){
        if(expected!==prior.alias){node.nodeValue=expected;prior.alias=expected;return true;}
        return false;
      }
      // Steam may update the SAME text node when a menu opens. Previously the
      // node stayed tracked but was skipped, leaving the original title visible.
      // Re-evaluate it just like a newly-created node.
      changed.delete(node);
    }
    const el=node.parentElement;
    if(!el||isExcluded(el))return false;
    const raw=node.nodeValue||'',stripped=raw.trim(),alias=mapping.get(stripped);
    if(!alias||!stripped)return false;
    try{if(el.closest?.('[aria-hidden="true"]'))return false;}catch{}
    if(checkVisibility){
      try{if(el.ownerDocument?.defaultView?.getComputedStyle?.(el)?.display==='none')return false;}catch{}
    }
    const replacement=substitute(raw,alias);
    changed.set(node,{original:raw,alias:replacement});
    node.nodeValue=replacement;
    return true;
  }
  function reconcileExisting(mapping){
    for(const node of [...changed.keys()])patchText(node,mapping);
  }
  function fullScan(){
    if(stopped)return 0;
    const mapping=titleMap();
    if(!mapping.size){restore();return 0;}
    reconcileExisting(mapping);
    scanned++;
    for(const doc of docs()){
      try{
        const walker=doc.createTreeWalker(doc.body||doc.documentElement,doc.defaultView?.NodeFilter?.SHOW_TEXT||4);
        let node,i=0;
        while((node=walker.nextNode())&&i++<MAX_NODES)patchText(node,mapping,true);
      }catch(e){try{console.warn('[TitleDeck] full title scan:',e);}catch{}}
    }
    return activeCount();
  }
  function activeCount(){
    let count=0;
    for(const [node,saved] of changed)if(node.isConnected&&node.nodeValue===saved.alias)count++;
    return count;
  }
  function scheduleFullScan(delay=45){
    if(stopped||scanTimer!==null)return;
    scanTimer=setTimeout(()=>{scanTimer=null;setup();fullScan();},delay);
  }
  function consumeMutations(records,doc){
    if(stopped)return;
    const mapping=titleMap();
    if(!mapping.size){if(changed.size)restore();return;}
    fastPasses++;
    const candidates=new Set();
    let examined=0,overflow=false;
    const collect=node=>{
      if(!node||candidates.has(node))return;
      if(examined>=MAX_MUTATION_NODES){overflow=true;return;}
      if(node.nodeType===3||(!node.nodeType&&typeof node.nodeValue==='string')){
        examined++;candidates.add(node);return;
      }
      if(node.nodeType!==1&&node.nodeType!==9&&node.nodeType!==11)return;
      // Only inspect the inserted subtree, not thousands of unrelated games.
      const iterator=doc.createTreeWalker(node,doc.defaultView?.NodeFilter?.SHOW_TEXT||4);
      let child;
      while((child=iterator.nextNode())){
        if(examined++>=MAX_MUTATION_NODES){overflow=true;break;}
        candidates.add(child);
      }
    };
    for(const record of records){
      if(record.type==='characterData')collect(record.target);
      else if(record.type==='childList')for(const added of record.addedNodes||[])collect(added);
      if(overflow)break;
    }
    // The browser calls MutationObserver before painting the DOM mutations.
    // Patching synchronously here eliminates the old 700 ms title reversion.
    for(const node of candidates)patchText(node,mapping);
    if(overflow)scheduleFullScan(36);
  }
  function setup(){
    if(stopped)return;
    for(const doc of docs()){
      if(observerList.some(entry=>entry.doc===doc))continue;
      const Observer=doc.defaultView?.MutationObserver||globalThis.MutationObserver;
      if(typeof Observer!=='function')continue;
      try{
        const watch=new Observer(records=>consumeMutations(records,doc));
        watch.observe(doc.documentElement,{childList:true,characterData:true,subtree:true});
        observerList.push({doc,watch});
      }catch{}
    }
  }
  function runNow(){if(stopped)return 0;setup();return fullScan();}
  function start(){setup();fullScan();heartbeat=setInterval(()=>{setup();fullScan();},2400);}
  function stop(){stopped=true;if(scanTimer!==null)clearTimeout(scanTimer);if(heartbeat!==null)clearInterval(heartbeat);for(const item of observerList)item.watch.disconnect();observerList=[];restore();}
  return{start,stop,runNow,get applied(){return activeCount()},get scans(){return scanned},get fastPasses(){return fastPasses},get docs(){return observerList.length}};
}


export function appidFromVisibleGame(el){
  try{
    const key=Object.keys(el||{}).find(k=>k.startsWith('__reactFiber$'));
    let fiber=key?el[key]:null;
    for(let i=0;fiber&&i<40;i++,fiber=fiber.return){
      const ov=fiber.memoizedProps?.overview||fiber.pendingProps?.overview,id=normId(ov?.appid??ov?.appId??ov?.m_gameid??ov?.m_nAppID);
      if(id)return id;
    }
  }catch{}
  return '';
}



/** Local, reversible read-time Game Info description override.
    MetaDeck demonstrated that Game Info reads GetDescriptions, even when no
    stable Game Info DOM node exists. We never write to Steam's cache. */
export function currentSteamGameAppId(context){
  const locations=[
    context?.Router?.WindowStore?.GamepadUIMainWindowInstance?.m_history?.location,
    context?.SteamUIStore?.m_WindowStore?.GamepadUIMainWindowInstance?.m_history?.location,
    context?.SteamUIStore?.m_WindowStore?.MainWindowInstance?.m_history?.location,
    context?.location
  ];
  for(const loc of locations){
    if(!loc)continue;
    const full=[loc.pathname,loc.search,loc.hash].filter(Boolean).join('');
    const found=full.match(/\/(?:routes\/)?library\/(?:app|details)\/([1-9]\d{0,11})(?:[/?#&]|$)/i);
    if(found)return normId(found[1]);
  }
  return '';
}
export function createGameInfoDataAdapter(getState,getContexts=()=>[globalThis]){
  const patched=new Map();let stopped=false,ticker=null,requests=0,overrides=0,status='Awaiting Steam GetDescriptions';
  function runNow(){
    if(stopped)return;
    const contexts=new Set();
    try{for(const ctx of getContexts()||[])if(ctx)contexts.add(ctx)}catch{}
    for(const context of contexts){
      const store=context?.appDetailsStore;
      if(!store||typeof store.GetDescriptions!=='function'||patched.has(store))continue;
      const own=Object.getOwnPropertyDescriptor(store,'GetDescriptions');
      if(own&&!own.configurable){status='Steam description getter cannot be wrapped';continue}
      const original=store.GetDescriptions;
      const wrapper=function(...args){
        const result=original.apply(this,args);
        requests++;
        const state=getState()||{},id=normId(args[0]),desc=state.descriptions?.[id];
        // Steam's GetDescriptions can live in a different window than its
        // router. Cross-check every available live context, never use an old
        // saved game ID as proof that a different game is currently visible.
        const routes=new Set();
        try{for(const c of getContexts()||[]){
          const current=currentSteamGameAppId(c);
          if(current)routes.add(current);
        }}catch{}
        const localRoute=currentSteamGameAppId(context);
        if(localRoute)routes.add(localRoute);
        const visibleApp=routes.size===1?[...routes][0]:'';
        if(state.enabled!==true||state.description_position!=='game_info'||
           !id||!visibleApp||visibleApp!==id||typeof desc!=='string'||!desc.trim())return result;
        overrides++;status='Native description served for app '+id;
        const value=desc.trim().slice(0,4000);
        return {...(result&&typeof result==='object'?result:{}),
          strFullDescription:value,strSnippet:value};
      };
      try{
        Object.defineProperty(store,'GetDescriptions',{configurable:true,writable:true,
          enumerable:own?.enumerable??false,value:wrapper});
        patched.set(store,{own,wrapper});status='Native GetDescriptions connected';
      }catch{status='Steam description getter access denied'}
    }
  }
  function start(){runNow();ticker=setInterval(runNow,2400)}
  function stop(){
    stopped=true;if(ticker!==null)clearInterval(ticker);
    for(const [store,{own,wrapper}] of patched){
      try{
        if(store.GetDescriptions!==wrapper)continue; // don't undo later peer patches
        if(own)Object.defineProperty(store,'GetDescriptions',own);
        else delete store.GetDescriptions;
      }catch{}
    }
    patched.clear();
  }
  return{start,stop,runNow,get status(){return status},get hookedStores(){return patched.size},
    get calls(){return requests},get overrides(){return overrides}};
}

export function steamLibraryRouteId(location){
  try{
    const route=[location?.pathname,location?.search,location?.hash].filter(Boolean).join('');
    const found=route.match(/\/library\/app\/([1-9][0-9]{0,11})(?:[/?#&]|$)/);
    return found?normId(found[1]):'';
  }catch{return ''}
}

/* Art Hero and other CSS Loader themes change artwork height. Anchor the
   optional overlay to Steam's actual Play-bar rectangle, never to a guessed
   fixed screen Y coordinate or to the artwork's internal React children. */
export function heroFooterGeometry(rect,viewportWidth,viewportHeight){
  if(!rect||!Number.isFinite(rect.top)||!Number.isFinite(rect.left)||!Number.isFinite(rect.width))return null;
  const w=Number(viewportWidth)||0,h=Number(viewportHeight)||0;
  if(w<300||h<250||rect.width<180||rect.width>w*1.5)return null;
  const height=76,margin=12,top=Math.round(rect.top-height-margin);
  // If the header or Play bar has scrolled out of view, remove this overlay.
  if(top<68||rect.top>h+70)return null;
  const left=Math.max(8,Math.round(rect.left+16));
  const width=Math.min(w-left-8,Math.round(rect.width-32));
  if(width<150)return null;
  return{left,top,width,height};
}
export function findDescriptionPlayBar(doc,target){
  const plausible=node=>{
    if(!node?.getBoundingClientRect||!node.isConnected||node.offsetParent===null)return false;
    const rect=node.getBoundingClientRect();
    const height=rect?.height||((rect?.bottom||0)-(rect?.top||0));
    return Number.isFinite(rect?.top)&&height>=32&&height<=180&&rect.width>=180;
  };
  const selectors=[];
  // Native Steam Deck Gaming Mode uses basicAppDetailsSectionStylerClasses,
  // NOT the desktop-only appdetailsplaysection_PlayBar name. These class
  // exports survive changes to Steam's minified class hashes.
  for(const token of [
    UI?.basicAppDetailsSectionStylerClasses?.PlaySection,
    UI?.playSectionClasses?.PlayBar,
    UI?.playSectionClasses?.Container,
    UI?.basicAppDetailsSectionStylerClasses?.PlayBar
  ]){
    if(typeof token==='string'){
      for(const cls of token.split(/\s+/).filter(x=>/^[A-Za-z0-9_-]+$/.test(x))){
        if(cls&&doc.getElementsByClassName)try{
          const nodes=doc.getElementsByClassName(cls);
          for(const node of nodes)if(plausible(node))return node;
        }catch{}
      }
    }
  }
  // Different module names in Desktop Steam, Big Picture and SteamOS.
  selectors.push(
    '[class*="basicappdetailssection_PlaySection"]',
    '[class*="basicappdetailssectionstyler_PlaySection"]',
    '[class*="appdetailsplaysection_PlayBar"]',
    '[class*="appdetailsplaysection_PlaySection"]',
    '[class*="appdetailsplaysection_Container"]',
    '[class*="appdetailsplaysection_PlayArea"]',
    '[class*="appdetails_PlaySection"]'
  );
  for(const sel of selectors)try{
    for(const node of doc.querySelectorAll(sel))if(plausible(node))return node;
  }catch{}
  // The real Play section can be the immediate previous sibling of the
  // details container. Also check one wrapper above for themed layouts.
  for(const el of [target?.previousElementSibling,target?.parentElement?.previousElementSibling]){
    if(plausible(el))return el;
  }
  // Last-resort: use Decky's Play-button class, but only inside the current
  // game's visible details tree; never base a position on unrelated buttons.
  const buttonTokens=[
    UI?.appActionButtonClasses?.PlayButton,
    UI?.appActionButtonClasses?.PlayButtonContainer
  ].filter(x=>typeof x==='string');
  for(const token of buttonTokens){
    const cls=token.split(/\s+/).find(x=>/^[A-Za-z0-9_-]+$/.test(x));
    if(!cls)continue;
    for(const node of doc.getElementsByClassName?.(cls)||[]){
      if(!node?.isConnected)continue;
      let parent=node;
      for(let depth=0;parent&&depth<7;depth++,parent=parent.parentElement){
        if(plausible(parent)&&parent.getBoundingClientRect().width>=300){
          if(target?.parentElement?.contains?.(parent)||parent.parentElement?.contains?.(target))
            return parent;
        }
      }
    }
  }
  return null;
}


/* The original requester wants the text INSIDE Steam's GAME INFO tab,
   not merely an extra card below Play. Locate only the selected game's
   visible native Game Info container, then insert our text beside the
   existing description without modifying Steam's description markup. */
const steamInfoClassCache=new WeakMap();
export function resolveLiveSteamGameInfoClasses(ui=UI){
  if(!ui||typeof ui!=='object')return null;
  const cached=steamInfoClassCache.get(ui);
  if(cached&&(cached.classes||Date.now()-cached.checked<12000))return cached.classes;
  // Decky Metadata confirms that Steam's GameInfoContainer and
  // GameDescription are exported in separate live SteamUI CSS modules.
  // Never enumerate Steam store data or execute untrusted module factories.
  const finder=ui?.findModuleChild;
  if(typeof finder!=='function')return null;
  const inspect=(mod,kind)=>{
    const match=obj=>obj&&typeof obj==='object'&&!Array.isArray(obj)&&
      (kind==='owner'
        ?typeof obj.GameInfoContainer==='string'&&typeof obj.GameInfoQuickLinks==='string'
        :typeof obj.GameDescription==='string'&&typeof obj.DescriptionStatsCtn==='string');
    if(match(mod))return mod;
    if(!mod||typeof mod!=='object')return null;
    try{
      for(const entry of Object.values(mod)){
        if(match(entry))return entry;
      }
    }catch{}
    return null;
  };
  const find=kind=>{
    try{
      const found=finder(mod=>inspect(mod,kind)||undefined);
      return inspect(found,kind);
    }catch{return null}
  };
  const owner=find('owner'),description=find('description');
  if(!owner||!description)return null;
  const token=x=>typeof x==='string'&&/^[A-Za-z_-][A-Za-z0-9_-]{0,140}$/.test(x)?x:null;
  const ownerName=token(owner.GameInfoContainer),descriptionName=token(description.GameDescription);
  const classes=ownerName&&descriptionName?{owner:ownerName,description:descriptionName}:null;
  steamInfoClassCache.set(ui,{classes,checked:Date.now()});
  return classes;
}

export function findSteamGameInfoDescription(doc,gameRoot){
  // This is called ONLY after runNow() confirms the Steam game's app ID.
  // Game Info may be a sibling of the AppDetailsContainer or a portal, so
  // searching just gameRoot.parentElement silently fails on real SteamOS.
  if(!doc||!gameRoot||!appidFromVisibleGame(gameRoot))return null;
  const page=gameRoot.closest?.('[class*="AppDetailsRoot"]')
    ||gameRoot.closest?.('[class*="AppDetailsContainer"]')||gameRoot.parentElement||gameRoot;
  const contains=(parent,child)=>{
    if(!parent||!child)return false;
    if(parent===child||parent.contains?.(child))return true;
    let node=child;
    for(let i=0;node&&i<35;i++,node=node.parentElement)if(node===parent)return true;
    return false;
  };
  const within=el=>contains(page,el)||contains(gameRoot,el);
  const visible=el=>{
    if(!el?.isConnected)return false;
    // Do not reject the native description itself if TitleDeck hid it.
    try{
      if(el.offsetParent===null)return false;
      const style=el.ownerDocument?.defaultView?.getComputedStyle?.(el);
      return style?.display!=='none'&&style?.visibility!=='hidden';
    }catch{return true}
  };
  const descriptionSelectors=[
    '[class*="appdetailsgameinfopanel_GameDescription"]',
    '[class*="appdetailsgameinfopanel_Description"]',
    '[class*="appdetailsgameinfocontainer_GameDescription"]',
    '[class*="appdetailsgameinfocontainer_Description"]'
  ];
  const containerSelectors=[
    '[class*="appdetailsgameinfopanel_Container"]',
    '[class*="appdetailsgameinfocontainer_AppGameInfoContainer"]',
    '[class*="appdetailsgameinfo_Container"]'
  ];
  const findAll=selectors=>{
    const result=new Set();
    for(const selector of selectors)try{
      for(const el of doc.querySelectorAll(selector)||[])if(el&&!el.closest?.('[data-titledeck-gameinfo-description]'))result.add(el);
    }catch{}
    return [...result];
  };
  // Live Decky module class tokens are preferred over hard-coded hash/name
  // fragments; real Steam Deck builds do not necessarily include those names.
  const resolved=resolveLiveSteamGameInfoClasses();
  const byClass=name=>{
    if(!name)return[];
    try{return Array.from(doc.getElementsByClassName?.(name)||[])}
    catch{return[]}
  };
  const containers=[...new Set([...findAll(containerSelectors),...byClass(resolved?.owner)])].filter(visible);
  const allDescriptions=[...new Set([...findAll(descriptionSelectors),...byClass(resolved?.description)])]
    .filter(el=>el.isConnected&&el.parentElement);
  const descriptions=allDescriptions.filter(el=>containers.some(parent=>contains(parent,el)));
  if(!descriptions.length&&allDescriptions.length===1){
    // Newer Steam builds can rename only the wrapping panel, leaving the
    // native GameDescription selector intact. A single description-bearing
    // parent with a native appdetailsgameinfo ancestor is sufficient here,
    // because the caller already confirmed the page's unique app ID.
    const native=allDescriptions[0];
    let ancestor=native.parentElement;
    let recognized=false;
    for(let i=0;ancestor&&i<8;i++,ancestor=ancestor.parentElement){
      if(/appdetailsgameinfo/i.test(String(ancestor.className||''))){recognized=true;break}
    }
    if(recognized&&visible(native.parentElement))
      return {container:native.parentElement,nativeDescription:native,
        diagnostic:{containers:0,scoped:0,descriptions:1,selected:'native-description-parent'}};
  }
  // An original description hidden by TitleDeck must remain discoverable.
  // Prefer the current AppDetails page. If Game Info was rendered in a portal,
  // ONLY a single visible Game Info panel in the whole document is eligible.
  const eligible=containers.filter(el=>!el.closest?.('[aria-hidden="true"]'));
  const scoped=eligible.filter(within);
  let group=scoped.length?scoped:eligible;
  // Game Info has nested wrappers, not multiple game tabs. Prefer a unique
  // innermost visible panel containing the actual native description.
  const withDesc=group.filter(el=>descriptions.some(child=>contains(el,child)));
  if(withDesc.length)group=withDesc;
  const inner=group.filter(el=>!group.some(other=>other!==el&&contains(el,other)));
  if(inner.length)group=inner;
  const root=group.length===1?group[0]:null;
  if(!root)return null; // refuse genuinely ambiguous active Game Info tabs
  const matching=descriptions.filter(el=>contains(root,el));
  const nativeDescription=matching.find(el=>/GameDescription/.test(String(el.className||'')))||matching[0]||null;
  return {container:root,nativeDescription,
    diagnostic:{containers:containers.length,scoped:scoped.length,descriptions:descriptions.length,
      selected:root.className||'native game info'}};
}

// Full Manager hides Steam's game view. Retain the most recent actual game-page
// observation so diagnostics remain useful when that manager is open.
let lastDescriptionGameProbe=null;
export function getLastDescriptionGameProbe(){return lastDescriptionGameProbe?{...lastDescriptionGameProbe}:null}
export function formatDescriptionGameProbe(probe=getLastDescriptionGameProbe()){
  if(!probe)return 'No Game Info capture yet. Open GAME INFO on a game, then select Capture Game Info in TitleDeck Quick Access.';
  return 'App '+probe.appid+' · '+probe.phase+
    ' · game containers '+probe.detailContainers+' · info panels '+probe.infoPanels+
    ' · description nodes '+probe.nativeDescriptions+
    ' · document '+probe.documentNumber+'/'+probe.documentCount+
    ' · Live CSS modules '+(probe.moduleStatus||'unknown')+
    ' · CSS clues '+(probe.cssHints||'none')+
    ' · '+probe.time;
}
export function createDescriptionAdapter(host,getState,getDocuments=()=>[],getClass=()=>UI?.basicAppDetailsSectionStylerClasses?.AppDetailsContainer){
  const MARK='data-titledeck-description',owned=new Map(),nativeInfo=new Map(),watchers=[],scrollListeners=[];
  function clearGameInfo(doc){
    const prior=nativeInfo.get(doc);
    if(!prior)return;
    try{
      if(prior.nativeNode?.isConnected&&prior.nativeNode.style){
        const style=prior.nativeNode.style;
        if(prior.originalDisplayProperty!==null&&typeof style.setProperty==='function'){
          if(prior.originalDisplayProperty)style.setProperty('display',prior.originalDisplayProperty,prior.originalDisplayPriority||'');
          else style.removeProperty('display');
        }else if(style.display==='none')style.display=prior.originalDisplay;
      }
      prior.panel?.remove?.();
    }catch{}
    nativeInfo.delete(doc);
  }
  function drawGameInfo(doc,gameRoot,appid,description){
    const found=findSteamGameInfoDescription(doc,gameRoot);
    if(!found){
      clearGameInfo(doc);
      let panelCount=0,descCount=0;
      try{
        panelCount=doc.querySelectorAll('[class*="appdetailsgameinfopanel_Container"],[class*="appdetailsgameinfocontainer_AppGameInfoContainer"]').length;
        descCount=doc.querySelectorAll('[class*="appdetailsgameinfopanel_GameDescription"],[class*="appdetailsgameinfocontainer_GameDescription"]').length;
      }catch{}
      status='Game Info not located: '+panelCount+' panels, '+descCount+
        ' native descriptions. Open GAME INFO, then use Rescan Steam UI.';
      return false;
    }
    const {container,nativeDescription}=found;
    const parent=nativeDescription?.parentElement||container;
    if(!parent?.insertBefore)return false;
    let prior=nativeInfo.get(doc);
    if(prior&&(prior.appid!==appid||prior.parent!==parent||prior.nativeNode!==nativeDescription
      ||!prior.panel?.isConnected)){
      clearGameInfo(doc);prior=null;
    }
    if(!prior){
      const panel=doc.createElement('section');
      panel.setAttribute('data-titledeck-gameinfo-description',appid);
      panel.setAttribute('role','region');
      panel.setAttribute('aria-label','Custom game description from TitleDeck');
      panel.style.cssText='box-sizing:border-box;width:100%;margin:8px 0 14px;padding:12px 15px;border-radius:7px;background:rgba(26,37,54,.84);border:1px solid rgba(126,151,178,.45);color:#eff6ff;';
      const heading=doc.createElement('div');
      heading.textContent='YOUR CUSTOM GAME DESCRIPTION';
      heading.style.cssText='font-size:12px;font-weight:700;letter-spacing:.035em;color:#c2d8f0;margin-bottom:6px;';
      const body=doc.createElement('p');
      body.setAttribute('data-titledeck-gameinfo-text','true');
      body.style.cssText='margin:0;white-space:pre-wrap;overflow-wrap:anywhere;font-size:14px;line-height:1.5;color:#f1f6ff;';
      panel.appendChild(heading);panel.appendChild(body);
      const style=nativeDescription?.style;
      const originalDisplay=style?.display??'';
      const originalDisplayProperty=typeof style?.getPropertyValue==='function'?style.getPropertyValue('display'):null;
      const originalDisplayPriority=typeof style?.getPropertyPriority==='function'?style.getPropertyPriority('display'):'';
      try{parent.insertBefore(panel,nativeDescription||parent.firstChild||null)}catch{return false}
      if(style){
        if(typeof style.setProperty==='function')style.setProperty('display','none','important');
        else style.display='none';
      }
      prior={appid,parent,nativeNode:nativeDescription,originalDisplay,originalDisplayProperty,originalDisplayPriority,panel};
      nativeInfo.set(doc,prior);
    }
    if(prior.nativeNode?.style&&typeof prior.nativeNode.style.getPropertyValue==='function'&&
       prior.nativeNode.style.getPropertyValue('display')!=='none'){
      prior.nativeNode.style.setProperty('display','none','important');
    }
    const body=prior.panel.querySelector?.('[data-titledeck-gameinfo-text]')||prior.panel.lastChild;
    if(body&&body.textContent!==description)body.textContent=description;
    status='Game Info: custom description active for app '+appid;
    return true;
  }
  let stopped=false,ticker=null,pending=null,checks=0,status='Waiting for Steam game page';
  function documents(){
    const result=new Set(),add=d=>{if(d?.documentElement&&d.querySelectorAll&&d.createElement)result.add(d)};
    add(host);try{getDocuments().forEach(add)}catch{}
    return [...result];
  }
  function clear(doc){
    const old=owned.get(doc);if(old){old.remove?.();owned.delete(doc)}
    try{for(const el of doc.querySelectorAll('['+MARK+']'))if(el.getAttribute?.(MARK))el.remove?.()}catch{}
  }
  function routeId(doc){
    // Steam often uses a hash route. Only reading pathname made preview.2
    // silently remove saved descriptions even on the correct game page.
    return steamLibraryRouteId(doc.defaultView?.location)||steamLibraryRouteId(globalThis.location);
  }
  function candidates(doc){
    const result=new Set(),klass=getClass();
    if(typeof klass==='string'&&klass.trim())try{for(const el of doc.getElementsByClassName?.(klass)||[])result.add(el)}catch{}
    try{for(const el of doc.querySelectorAll('[class*="AppDetailsContainer"],[class*="AppDetailsRoot"]'))result.add(el)}catch{}
    return [...result];
  }
  function visible(node){
    if(!node?.isConnected||node.offsetParent===null)return false;
    try{const style=node.ownerDocument?.defaultView?.getComputedStyle?.(node);
      if(style?.display==='none'||style?.visibility==='hidden')return false;}catch{}
    return true;
  }
  function draw(doc,target,id,description,position='below_play') {
    const parent=target.parentElement;if(!parent)return false;
    let pane=owned.get(doc);
    if(pane&&!pane.isConnected){owned.delete(doc);pane=null}
    if(pane?.getAttribute?.(MARK)!==id){clear(doc);pane=null}
    if(!pane){
      pane=doc.createElement('section');pane.setAttribute(MARK,id);
      pane.setAttribute('role','region');pane.setAttribute('aria-label','TitleDeck custom game description');
      pane.style.cssText='box-sizing:border-box;width:calc(100% - 40px);margin:12px 20px;padding:16px 20px;border-radius:9px;background:#203045;border:1px solid #445b73;color:#ecf3f9;';
      const heading=doc.createElement('h3');heading.textContent='YOUR GAME DESCRIPTION';
      heading.style.cssText='margin:0 0 9px;font-size:15px;font-weight:750;color:#afd3f2;';
      const body=doc.createElement('p');body.setAttribute('data-titledeck-description-text','true');
      body.style.cssText='margin:0;white-space:pre-wrap;overflow-wrap:anywhere;font-size:15px;line-height:1.5;';
      pane.appendChild(heading);pane.appendChild(body);
      owned.set(doc,pane);
    }
    const preferHero=position==='hero_footer';
    const playBar=preferHero?findDescriptionPlayBar(doc,target):null;
    const win=doc.defaultView;
    const rect=playBar?.getBoundingClientRect?.();
    const box=preferHero?heroFooterGeometry(rect,win?.innerWidth||doc.documentElement?.clientWidth,
      win?.innerHeight||doc.documentElement?.clientHeight):null;
    if(preferHero&&!box){
      // Do not silently show Below Play when Artwork Footer is selected.
      // That made the old build appear unchanged to the user.
      pane.remove?.();owned.delete(doc);
      status=playBar?'Artwork Footer: Play bar out of view or no safe gap':'Artwork Footer: Steam Deck Play bar not found';
      return false;
    }
    const layout=preferHero?'hero_footer':'below_play';
    if(layout==='hero_footer'){
      if(!doc.body?.appendChild)return false;
      if(pane.parentElement!==doc.body)doc.body.appendChild(pane);
      const key=[box.left,box.top,box.width,box.height].join(':');
      if(pane._titledeckLayoutKey!==key||pane._titledeckMode!=='hero_footer'){
        pane._titledeckLayoutKey=key;pane._titledeckMode='hero_footer';
        pane.style.cssText='box-sizing:border-box;position:fixed;left:'+box.left+'px;top:'+box.top+'px;width:'+box.width+'px;height:'+box.height+
          'px;z-index:50;overflow:hidden;pointer-events:none;margin:0;padding:9px 16px;border-radius:8px;background:rgba(16,22,34,.82);border:1px solid rgba(119,149,179,.65);color:#f2f7fe;box-shadow:0 2px 15px rgba(0,0,0,.27);';
      }
    }else{
      if(pane.parentElement!==parent||pane.nextSibling!==target)
        try{parent.insertBefore(pane,target)}catch{return false}
      if(pane._titledeckMode!=='below_play'){
        pane._titledeckMode='below_play';pane._titledeckLayoutKey='';
        pane.style.cssText='box-sizing:border-box;width:calc(100% - 40px);margin:12px 20px;padding:16px 20px;border-radius:9px;background:#203045;border:1px solid #445b73;color:#ecf3f9;';
      }
    }
    if(pane.getAttribute?.('data-titledeck-position')!==layout)pane.setAttribute?.('data-titledeck-position',layout);
    const heading=pane.querySelector?.('h3')||pane.children?.[0];
    if(heading&&heading._titledeckHeadingMode!==layout){
      heading._titledeckHeadingMode=layout;
      heading.style.cssText=layout==='hero_footer'
        ?'margin:0 0 4px;font-size:12px;font-weight:750;color:#b8d7f0;letter-spacing:.035em;'
        :'margin:0 0 9px;font-size:15px;font-weight:750;color:#afd3f2;';
    }
    const body=pane.querySelector?.('[data-titledeck-description-text]')||pane.lastChild;
    if(body){
      if(body.textContent!==description)body.textContent=description; // Plain text only.
      const textStyle=layout==='hero_footer'
        ?'margin:0;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px;line-height:1.4;'
        :'margin:0;white-space:pre-wrap;overflow-wrap:anywhere;font-size:15px;line-height:1.5;';
      if(body._titledeckTextMode!==layout){body.style.cssText=textStyle;body._titledeckTextMode=layout}
    }
    return true;
  }
  function runNow(){
    if(stopped)return 0;checks++;
    const state=getState()||{},descriptions=state.descriptions||{};
    let applied=0,realPageSeen=false,issues=[];
    const docs=documents();
    let docNo=0;
    for(const doc of docs){
      docNo++;
      const id=routeId(doc);
      if(!state.enabled||!Object.keys(descriptions).length){
        clear(doc);clearGameInfo(doc);status=!state.enabled?'Display overrides paused':'No saved descriptions';continue;
      }
      let options=candidates(doc).filter(visible);
      if(id&&!options.length){
        // Decky style-token exports and Valve's hashed classes may differ.
        // Only attempt a bounded fiber lookup on an actual game-details route.
        try{
          const all=doc.querySelectorAll('div');
          const limit=Math.min(all.length,3200);
          for(let i=0;i<limit;i++){
            const el=all[i];
            if(!visible(el)||appidFromVisibleGame(el)!==id)continue;
            // Select a reasonably large parent so we add a panel to the
            // game page rather than inside its title/play-button text.
            let anchor=el;
            for(let depth=0;depth<5&&anchor.parentElement;depth++){
              const parent=anchor.parentElement,cls=String(parent.className||'');
              if(/AppDetails(Container|Root)/.test(cls)){anchor=parent;break}
              if(parent===doc.body||parent===doc.documentElement||!parent.parentElement)break;
              anchor=parent;
            }
            options.push(anchor);break;
          }
        }catch{}
      }
      const matches=options.map(el=>({el,gameId:appidFromVisibleGame(el)}))
        .filter(item=>item.gameId&&typeof descriptions[item.gameId]==='string'&&descriptions[item.gameId].trim());
      // Route and visible Steam React overview must agree when a route is
      // known. Without a route, accept only one unambiguous visible page ID.
      const uniqueIds=[...new Set(matches.map(item=>item.gameId))];
      const match=id?matches.find(item=>item.gameId===id):(uniqueIds.length===1?matches[0]:null);
      const nativeStats=()=>{
        let infoPanels=0,nativeDescriptions=0,cssHints='',moduleStatus='unavailable';
        const live=resolveLiveSteamGameInfoClasses();
        if(live){
          moduleStatus='resolved';
          try{
            infoPanels=doc.getElementsByClassName?.(live.owner)?.length||0;
            nativeDescriptions=doc.getElementsByClassName?.(live.description)?.length||0;
          }catch{}
        }
        try{infoPanels=Math.max(infoPanels,doc.querySelectorAll('[class*="appdetailsgameinfopanel_Container"],[class*="appdetailsgameinfocontainer_AppGameInfoContainer"],[class*="appdetailsgameinfo_Container"]').length)}catch{}
        try{nativeDescriptions=Math.max(nativeDescriptions,doc.querySelectorAll('[class*="appdetailsgameinfopanel_GameDescription"],[class*="appdetailsgameinfocontainer_GameDescription"]').length)}catch{}
        try{
          const nodes=doc.querySelectorAll('[class*="gameinfo"],[class*="GameInfo"],[class*="GameDescription"]');
          const clues=new Set();
          for(let i=0;i<Math.min(100,nodes.length)&&clues.size<3;i++){
            const names=String(nodes[i]?.className||'').split(/\s+/);
            for(const cls of names){
              if(/gameinfo|GameDescription/i.test(cls)&&/^[A-Za-z0-9_-]{4,110}$/.test(cls))clues.add(cls.slice(0,75));
              if(clues.size>=3)break;
            }
          }
          cssHints=[...clues].join(', ');
        }catch{}
        return {infoPanels,nativeDescriptions,cssHints,moduleStatus};
      };
      if(id||match||uniqueIds.length){
        realPageSeen=true;
        const stats=nativeStats();
        lastDescriptionGameProbe={
          appid:match?.gameId||id||uniqueIds.join(',')||'unconfirmed',
          phase:match?'Game page identified':'Page route found, game view not confirmed',
          detailContainers:options.length,...stats,
          documentNumber:docNo,documentCount:docs.length,
          time:new Date().toLocaleTimeString()
        };
      }
      if(!match?.el?.parentElement){
        clear(doc);clearGameInfo(doc);
        const issue=!options.length?'No visible Steam details container':id?'Visible app ID does not match route '+id:'Cannot confirm one visible game page';
        // A second empty Steam/Decky document is not evidence about the
        // actual game page and must never override the useful Game Info result.
        if(id||uniqueIds.length)issues.push(issue);
        continue;
      }
      const position=state.description_position==='game_info'?'game_info'
        :state.description_position==='hero_footer'?'hero_footer':'below_play';
      if(position==='game_info'){
        clear(doc);
        if(drawGameInfo(doc,match.el,match.gameId,descriptions[match.gameId].trim())){
          applied++;
          if(lastDescriptionGameProbe?.appid===match.gameId)lastDescriptionGameProbe.phase='Game Info replacement visible';
        }else{
          issues.push(status);
          if(lastDescriptionGameProbe?.appid===match.gameId)lastDescriptionGameProbe.phase=status;
        }
      }else{
        clearGameInfo(doc);
        if(draw(doc,match.el,match.gameId,descriptions[match.gameId].trim(),position)){
          applied++;status='Shown for Steam app '+match.gameId+' ('+position+')';
        }else if(position==='hero_footer'&&!status.startsWith('Artwork Footer:')){
          status='Artwork Footer: layout anchor unavailable';
        }
      }
    }
    if(applied)status='Custom description visible ('+applied+' panel'+(applied===1?'':'s')+')';
    else if(realPageSeen)status=issues[issues.length-1]||'Game page detected, no description shown';
    else status='Game page not visible while manager is open. Use Quick Access capture on GAME INFO.';
    return applied;
  }
  const schedule=()=>{if(!stopped&&pending===null)pending=setTimeout(()=>{pending=null;runNow()},80)};
  function start(){
    runNow();
    for(const doc of documents())try{
      const Observer=doc.defaultView?.MutationObserver||globalThis.MutationObserver;
      if(typeof Observer!=='function')continue;
      const watcher=new Observer(schedule);watcher.observe(doc.documentElement,{childList:true,subtree:true});watchers.push(watcher);
      doc.addEventListener?.('scroll',schedule,true);
      const onResize=()=>schedule();
      doc.defaultView?.addEventListener?.('resize',onResize);
      scrollListeners.push(()=>{doc.removeEventListener?.('scroll',schedule,true);doc.defaultView?.removeEventListener?.('resize',onResize)});
    }catch{}
    ticker=setInterval(runNow,1800);
  }
  function stop(){
    stopped=true;if(ticker!==null)clearInterval(ticker);if(pending!==null)clearTimeout(pending);
    watchers.forEach(w=>w.disconnect());scrollListeners.forEach(stop=>stop());for(const doc of documents()){clear(doc);clearGameInfo(doc)}
  }
  return{start,stop,runNow,get shown(){return owned.size+nativeInfo.size},get checks(){return checks},get status(){return status}};
}

const STYLE=`
/* Short-screen description editor: accessible fixed actions and genuine page scrolling. */
.td-root .td-description-toolbar{display:grid!important;grid-template-columns:1.15fr 1.1fr 1fr .7fr!important;min-width:0!important;gap:6px!important}
.td-root .td-description-toolbar .td-action{width:100%!important;min-width:0!important;white-space:normal!important;line-height:1.1!important}
.td-root [data-td-description-workspace]{overflow-y:auto!important;overscroll-behavior-y:contain!important;padding-bottom:92px!important;scroll-padding-bottom:80px!important;min-height:0!important;}
.td-root [data-td-description-workspace] .td-game-editor-card{max-height:none!important;overflow:visible!important;min-height:max-content!important}
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
.td-native-entry{max-width:840px;margin:12px auto;padding:14px 18px;display:flex;flex-direction:column;gap:15px}.td-native-entry .td-title-large{margin:4px 0}.td-native-field{width:100%;padding:6px 0}.td-native-field input,.td-native-field textarea{display:block!important;width:100%!important;min-width:0!important;min-height:49px!important;font-size:21px!important;font-weight:650!important;line-height:1.3!important;background:#151d29!important;color:#f7f9fc!important;border:2px solid #71839a!important;border-radius:9px!important;padding:9px 13px!important;box-sizing:border-box!important}.td-native-field input:focus,.td-native-field textarea:focus{outline:2px solid #efa578!important;outline-offset:1px!important}.td-native-entry .td-native-buttons{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.td-native-entry .td-editor-note{line-height:1.5}.td-native-hint{color:#d5dce9;font-size:13px;line-height:1.55}.td-native-entry .td-title-large{overflow-wrap:anywhere}@media(max-width:600px){.td-native-entry{padding:8px}.td-native-entry .td-native-buttons{gap:6px}.td-native-field input{font-size:17px!important}}

/* v0.8.7: Preserve the ordinary editor until the Steam keyboard opens.
   Once open, animate into the keyboard-safe top area; restore when dismissed.
   In a separate CEF window the OSK may not be visible in this document: the
   adapter also listens for Steam Input keyboard events and the dismiss signal. */
.td-root.td-native-screen .td-shell{
 transition:grid-template-rows .28s ease,gap .28s ease!important;
}
.td-root.td-native-screen .td-native-workspace{
 min-height:0!important;overflow-y:auto!important;scrollbar-width:thin;
}
.td-root.td-native-screen .td-native-entry{
 width:min(100%,860px);margin:16px auto!important;
 padding:14px 18px!important;gap:12px!important;
 transition:margin-top .3s cubic-bezier(.2,.78,.2,1),padding .3s ease,gap .3s ease,transform .3s ease!important;
}
.td-root.td-native-screen .td-native-entry .td-native-field input{
 min-height:54px!important;font-size:22px!important;scroll-margin-top:8px!important;
}
.td-root.td-native-keyboard-open .td-shell{
 grid-template-rows:0px 0px 0px minmax(0,1fr) 0px!important;
 gap:0!important;
}
.td-root.td-native-keyboard-open .td-header,
.td-root.td-native-keyboard-open .td-rail,
.td-root.td-native-keyboard-open .td-actions,
.td-root.td-native-keyboard-open .td-bottom{
 height:0!important;min-height:0!important;overflow:hidden!important;
 padding:0!important;border-width:0!important;opacity:0!important;
 pointer-events:none!important;visibility:hidden!important;
}
.td-root.td-native-keyboard-open .td-native-workspace{
 display:flex!important;flex-direction:column!important;justify-content:flex-start!important;
 padding:4px 10px 0!important;scrollbar-width:none;
}
.td-root.td-native-keyboard-open .td-native-entry{
 margin:0 auto!important;padding:7px 13px!important;gap:5px!important;
}
.td-root.td-native-keyboard-open .td-native-entry .td-title-large{
 font-size:17px!important;margin:0!important;
}
.td-root.td-native-keyboard-open .td-native-buttons,
.td-root.td-native-keyboard-open .td-native-hint{
 max-height:0!important;opacity:0!important;overflow:hidden!important;
 margin:0!important;padding:0!important;pointer-events:none!important;
}
.td-root.td-native-screen .td-native-buttons,
.td-root.td-native-screen .td-native-hint{
 transition:max-height .22s ease,opacity .16s ease;
}
@media(max-height:600px){
 .td-root.td-native-screen .td-native-entry{margin:8px auto!important;}
 .td-root.td-native-keyboard-open .td-native-entry{margin:0 auto!important;}
 .td-root.td-native-keyboard-open .td-native-hint{display:none!important;}
}
@media(prefers-reduced-motion:reduce){
 .td-root.td-native-screen .td-shell,.td-root.td-native-screen .td-native-entry,
 .td-root.td-native-screen .td-native-buttons,.td-root.td-native-screen .td-native-hint{
  transition:none!important;
 }
}

@media(max-width:1050px){.td-grid-row{gap:9px}.td-game-artbox{max-height:180px}.td-root{padding:6px 10px!important}}
@media(max-height:700px){.td-game-artbox{max-height:160px}.td-shell{grid-template-rows:43px 37px 38px minmax(0,1fr) 31px;gap:5px}.td-game-copy{min-height:38px}}
.td-confirm{max-width:760px;margin:22px auto;padding:23px 26px}.td-warning-label{color:#f0a1aa;font-size:12px;letter-spacing:.1em;font-weight:900}.td-confirm .td-title-large{margin-bottom:5px}.td-confirm .td-editor-note{font-size:13px;line-height:1.55}.td-confirm-examples{background:#191c25;border:1px solid #454b56;border-radius:9px;padding:10px 15px;margin:12px 0}.td-confirm-example{color:#cfd4de;font-size:12px;border-bottom:1px solid #3a4049;padding:5px 0;overflow-wrap:anywhere}.td-confirm-example:last-of-type{border-bottom:0}.td-confirm-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px}.td-confirm-actions .td-btn{min-height:45px!important;font-size:13px!important}.td-root .td-danger{border-color:#995261!important;background:#4d2c38!important;color:#fff4f4!important}.td-root .td-danger.gpfocus,.td-root .td-danger:focus-visible{outline:3px solid #f3b7bb!important}




/* v0.8.12: A non-destructive suggestion with accessible controller actions. */
.td-root .td-cleanup-preview{margin:6px 0 10px;padding:10px 12px;background:#233349!important;border:1px solid #87a1c7!important;border-radius:9px;color:#f9fbff!important}
.td-root .td-cleanup-heading{font-weight:850;font-size:12px;color:#ffe7aa!important;letter-spacing:.025em;margin-bottom:7px}
.td-root .td-cleanup-comparison{display:grid;grid-template-columns:1fr 1fr;gap:9px;min-width:0}
.td-root .td-cleanup-comparison>div{min-width:0;border:1px solid #516782;background:#172333;border-radius:6px;padding:6px 8px}
.td-root .td-cleanup-caption{display:block;color:#ced9e9!important;font-size:10px;letter-spacing:.04em;text-transform:uppercase}
.td-root .td-cleanup-before,.td-root .td-cleanup-after{font-size:13px;overflow-wrap:anywhere;color:#fff!important;font-weight:750;min-width:0}
.td-root .td-cleanup-after{color:#b7f0cf!important}
.td-root .td-cleanup-preview-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:8px}
.td-root .td-cleanup-preview-actions .td-btn{min-height:36px!important}
@media(max-width:600px){.td-root .td-cleanup-comparison{grid-template-columns:1fr}.td-root .td-cleanup-preview{padding:6px}}

/* v0.8.10: Single-surface editor. A B press consumed by Steam's separate
   keyboard window leaves the normal editor in place rather than trapping
   users behind a second route. Keep its input near the top at all sizes. */
.td-root .td-game-editor-card{padding:10px 13px!important}
.td-root .td-game-editor-card .td-game-name-field{padding:3px 0 1px!important;margin:2px 0 4px!important}
.td-root .td-game-editor-card .td-game-name-field input,
.td-root .td-game-editor-card .td-game-name-field textarea{
 min-height:43px!important;max-height:52px!important;font-size:20px!important;
 color:#fff!important;box-shadow:0 0 0 1px rgba(195,211,241,.22)!important
}
.td-root .td-editor-original-meta{color:#c6d0e0;font-size:12px;margin:4px 0 10px;line-height:1.3}
.td-root .td-editor-original-meta strong{color:#f6f8fc}
@media(max-height:640px){
 .td-root .td-editor{padding:2px!important;gap:10px!important}
 .td-root .td-game-editor-card{padding:7px 10px!important}
 .td-root .td-editor-original-meta{margin:2px 0 6px!important}
 .td-root .td-game-editor-card .td-game-name-field input{min-height:37px!important}
}

/* v0.8.10: Slide the *existing* game's title field into a Steam-keyboard-safe
   dock. Never switch routes: after OSK B, the four-button editor is still here.
   The original layout comes back when any supported keyboard-close signal fires. */
.td-root .td-shell{transition:grid-template-rows .3s cubic-bezier(.2,.75,.2,1),gap .3s ease!important}
.td-root .td-header,.td-root .td-rail,.td-root .td-actions,.td-root .td-bottom{
 transition:height .3s ease,opacity .22s ease,padding .3s ease!important;
}
.td-root .td-editor{transition:grid-template-columns .3s cubic-bezier(.2,.75,.2,1),gap .3s ease!important}
.td-root .td-game-editor-card{transition:padding .3s ease,margin .3s ease!important}
.td-root .td-game-editor-card .td-editor-actions,
.td-root .td-game-editor-card .td-editor-original-meta,
.td-root .td-game-editor-card .td-editor-note{
 transition:max-height .26s ease,opacity .2s ease,margin .3s ease!important;
}
.td-root .td-inline-keyboard-fallback{height:0;max-height:0;opacity:0;overflow:hidden;pointer-events:none;
 transition:opacity .22s ease,max-height .3s ease!important}
.td-root.td-inline-keyboard-open .td-shell{
 grid-template-rows:0px 0px 0px minmax(0,1fr) 0px!important;gap:0!important;
}
.td-root.td-inline-keyboard-open .td-header,
.td-root.td-inline-keyboard-open .td-rail,
.td-root.td-inline-keyboard-open .td-actions,
.td-root.td-inline-keyboard-open .td-bottom{
 height:0!important;min-height:0!important;max-height:0!important;overflow:hidden!important;
 padding:0!important;border-width:0!important;opacity:0!important;pointer-events:none!important;
}
.td-root.td-inline-keyboard-open .td-workspace{
 padding:4px 8px!important;overflow-y:auto!important;scrollbar-width:none!important;
}
.td-root.td-inline-keyboard-open .td-editor{
 grid-template-columns:0px minmax(0,1fr)!important;gap:0!important;padding:0 4px!important;
 width:min(100%,980px)!important;margin:0 auto!important;
}
.td-root.td-inline-keyboard-open .td-editor > div:first-child{
 overflow:hidden!important;max-width:0!important;opacity:0!important;pointer-events:none!important;
}
.td-root.td-inline-keyboard-open .td-game-editor-card{
 padding:8px 13px!important;margin:0 auto!important;width:100%!important;
 height:fit-content!important;align-self:start!important;
}
.td-root.td-inline-keyboard-open .td-game-editor-card .td-editor-actions,
.td-root.td-inline-keyboard-open .td-game-editor-card .td-editor-original-meta,
.td-root.td-inline-keyboard-open .td-game-editor-card .td-editor-note{
 max-height:0!important;opacity:0!important;overflow:hidden!important;
 margin:0!important;padding:0!important;pointer-events:none!important;
}
.td-root.td-inline-keyboard-open .td-game-name-field{margin:3px 0 0!important;padding:2px 0!important}
.td-root.td-inline-keyboard-open .td-inline-keyboard-fallback{
 height:auto!important;max-height:42px!important;opacity:1!important;overflow:visible!important;
 pointer-events:auto!important;margin-top:7px!important;
}
.td-root.td-inline-keyboard-open .td-inline-keyboard-fallback .td-btn{
 width:100%!important;min-height:32px!important;font-size:12px!important;
}
@media(prefers-reduced-motion:reduce){
 .td-root .td-shell,.td-root .td-header,.td-root .td-rail,.td-root .td-actions,
 .td-root .td-bottom,.td-root .td-editor,.td-root .td-game-editor-card,
 .td-root .td-game-editor-card .td-editor-actions,.td-root .td-inline-keyboard-fallback{
 transition:none!important;
 }
}
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
export function scrollDescriptionWorkspace(root,bottom=true){
  const scroller=root?.querySelector?.('[data-td-description-workspace]');
  if(!scroller)return false;
  try{scroller.scrollTop=bottom?scroller.scrollHeight:0;return true}catch{return false}
}
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
// Native Steam/Decky text entry. Never insert a custom alphabetic controller keypad.
// Steam's overlay Paste can update the *DOM input value* without a React change event.
// We observe input/paste and check the active field during editing so the value cannot
// silently fall back to the previous React snapshot. Physical keyboards also work.
export function textFromNativeEvent(e,current=''){
  if(typeof e==='string')return e;
  const target=e?.target||e?.currentTarget;
  return typeof target?.value==='string'?target.value:current;
}
// Identify a *visible* Steam keyboard, not merely its toolbar button or a
// hidden keyboard template. Steam's generated class names vary between builds.
export function steamKeyboardVisible(documents=[]){
  const selectors='[class*="virtualkeyboard_Keyboard"], [class*="virtualkeyboard_KeyboardContainer"], [class*="virtualkeyboard_KeyboardPanel"], [data-testid="virtual-keyboard"]';
  for(const doc of documents){
    if(!doc?.querySelectorAll)continue;
    let elements=[];
    try{elements=[...doc.querySelectorAll(selectors)].slice(0,40);}catch{continue;}
    for(const element of elements){
      try{
        const rect=element.getBoundingClientRect?.();
        const win=doc.defaultView||{};
        const width=Number(win.innerWidth)||Number(doc.documentElement?.clientWidth)||1280;
        const height=Number(win.innerHeight)||Number(doc.documentElement?.clientHeight)||800;
        if(!rect||rect.width<Math.min(260,width*.45)||rect.height<90||rect.bottom<height*.34||rect.top>height)continue;
        const style=win.getComputedStyle?.(element);
        if(style&&(style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0))continue;
        return true;
      }catch{}
    }
  }
  return false;
}
function keyboardDocuments(doc){
  const docs=new Set();
  const add=x=>{if(x?.querySelectorAll)docs.add(x);};
  add(doc);add(steamDocument);
  try{add(globalThis.document);}catch{}
  try{add(globalThis.top?.document);}catch{}
  try{add(globalThis.window?.top?.document);}catch{}
  try{for(const frame of [...(doc?.querySelectorAll?.('iframe')||[])].slice(0,8))add(frame.contentDocument);}catch{}
  return [...docs];
}
// Steam broadcasts OSK visibility through a different event path than the
// older Input keyboard-message callbacks. Never equate field focus with OSK open.
export function keyboardStatusOpen(status){
  if(typeof status==='boolean')return status;
  if(status&&typeof status==='object'){
    for(const key of ['m_bIsKeyboardOpen','isOpen','open','visible'])
      if(typeof status[key]==='boolean')return status[key];
  }
  return null;
}
// The standalone Steam keyboard runs in a separate CEF window on some Decks.
// Its B press can be consumed before a Decky onCancel/status callback fires.
// Listen to Steam's read-only physical controller state stream while a native
// text editor is mounted. Steam's controller bitfield maps physical B to bit 21
// (0x200000); also accept explicit B fields exposed by alternative Steam builds.
// This does NOT register or change any controller bindings.
export function controllerBDown(state){
  if(!state||typeof state!=='object')return false;
  if(typeof state.bB==='boolean')return state.bB;
  if(typeof state.buttonB==='boolean')return state.buttonB;
  if(typeof state.ulButtons==='number')return (state.ulButtons & 0x200000)!==0;
  return false;
}
export function NativeTextEntry({value,setValue,done,cancel,kind='title',placeholder='Type a title…',onKeyboardState=()=>{},onKeyboardDismiss=()=>{}}){
  const wrap=R.useRef(null);
  const finishedRef=R.useRef(false);
  const latest=R.useRef({value,setValue,done,cancel,onKeyboardState,onKeyboardDismiss});
  latest.current={value,setValue,done,cancel,onKeyboardState,onKeyboardDismiss};
  const syncFromDOM=()=>{
    const input=wrap.current?.querySelector?.('input,textarea');
    if(!input||typeof input.value!=='string')return latest.current.value;
    const limit=kind==='id'?12:kind==='title'?180:220;
    const next=input.value.slice(0,limit);
    if(next!==latest.current.value){latest.current.value=next;latest.current.setValue(next)}
    return next;
  };
  R.useEffect(()=>{
    const node=wrap.current;if(!node)return;
    const doc=node.ownerDocument,win=doc?.defaultView;
    const root=node.closest?.('.td-root');
    const timers=new Set(),unregister=[];
    finishedRef.current=false;
    let lifted=false,keyboardSeen=false,domKeyboardSeen=false,closingChecks=0,requested=false,disposed=false;
    let dismissedUntil=0,openingAt=0,finished=false,windowLostFocus=false,observedSteamStatus=false;
    const previousB=new Map();
    const schedule=(fn,delay)=>{
      const id=(win?.setTimeout||setTimeout)(()=>{timers.delete(id);if(!disposed)fn();},delay);
      timers.add(id);return id;
    };
    const lift=next=>{
      if(disposed||lifted===next)return;
      lifted=next;
      root?.classList?.toggle?.('td-native-keyboard-open',next);
      latest.current.onKeyboardState(next);
    };
    const visible=()=>steamKeyboardVisible(keyboardDocuments(doc));
    const opened=(fromDOM=false)=>{if(disposed||finished||Date.now()<dismissedUntil)return;
      keyboardSeen=true;domKeyboardSeen=domKeyboardSeen||fromDOM;closingChecks=0;lift(true);
    };
    const closed=(reason='dismiss')=>{
      if(disposed||finished||finishedRef.current)return;
      // Ignore any initial 'not open' status sent on registration before the
      // keyboard has actually been observed or intentionally requested.
      if(!keyboardSeen)return;
      dismissedUntil=Date.now()+750;keyboardSeen=false;domKeyboardSeen=false;requested=false;
      openingAt=0;closingChecks=0;lift(false);
      // B dismisses the OSK and cancels the unsaved title edit. RT/Enter is
      // the separate ACCEPT path, which alone carries the draft back to Save.
      if(kind==='title'){
        finished=true;finishedRef.current=true;
        schedule(()=>latest.current.onKeyboardDismiss(reason),300);
      }
    };
    const input=()=>node.querySelector?.('input,textarea');
    const requestKeyboard=()=>{
      if(disposed)return;
      const field=input();if(!field)return;
      requested=true;openingAt=Date.now();dismissedUntil=0;
      const area=root.current?.querySelector?.('.td-workspace');if(area)area.scrollTop=0;
    try{field.focus?.({preventScroll:true})}catch{try{field.focus?.()}catch{}}
      // Decky's Steam TextField normally opens the OSK from its click handler.
      // Trigger that handler after the inline field mounts, not a second A press.
      try{field.click?.()}catch{}
      if(visible()){opened(true);return;}
      // Steam can render the OSK in an inaccessible CEF window; give it time to
      // appear after the click instead of lifting on mere input focus.
      schedule(()=>{if(requested&&!keyboardSeen&&!observedSteamStatus&&Date.now()>=dismissedUntil){
        opened();
      }},360);
    };
    const watchSteam=(registration,fn,owner=globalThis.SteamClient?.Input)=>{
      if(typeof registration!=='function')return;
      try{const listener=registration.call(owner,fn);
        if(typeof listener==='function')unregister.push(listener);
        else if(typeof listener?.unregister==='function')unregister.push(()=>listener.unregister());
      }catch{}
    };
    const steamInput=globalThis.SteamClient?.Input;
    // Prefer the dedicated status channel: Steam's standalone OSK may have its
    // own CEF document, so our DOM observer cannot see its disappearance.
    const onStatus=(isOpen)=>{
      const status=keyboardStatusOpen(isOpen);
      if(status===null)return;
      observedSteamStatus=true;
      if(status){if(requested||keyboardSeen)opened();}
      else closed('status');
    };
    const steamKeyboard=globalThis.SteamClient?.Keyboard;
    watchSteam(steamKeyboard?.RegisterForStatus,onStatus,steamKeyboard);
    // Some clients expose the same service under VR.Keyboard instead.
    if(!steamKeyboard?.RegisterForStatus){
      const vrKeyboard=globalThis.SteamClient?.VR?.Keyboard;
      if(typeof vrKeyboard?.RegisterForStatus==='function'){
        try{const registration=vrKeyboard.RegisterForStatus(onStatus);
          if(typeof registration==='function')unregister.push(registration);
          else if(typeof registration?.unregister==='function')unregister.push(()=>registration.unregister());
        }catch{}
      }
    }
    watchSteam(steamInput?.RegisterForUserDismissKeyboardMessages,()=>closed('dismiss'));
    // Controller-level fallback. B often never reaches the Decky onCancel
    // handler because the separate Steam keyboard consumes the input itself.
    // Only react to a NEW B press while this editor's keyboard is active.
    if(kind==='title')watchSteam(steamInput?.RegisterForControllerStateChanges,(changes)=>{
      if(disposed||finished||finishedRef.current)return;
      for(const change of Array.isArray(changes)?changes:[changes]){
        if(!change||typeof change!=='object')continue;
        const idx=change.unControllerIndex??0;
        const pressed=controllerBDown(change),wasPressed=previousB.get(idx)||false;
        previousB.set(idx,pressed);
        if(pressed&&!wasPressed&&requested&&keyboardSeen){
          try{globalThis.SteamClient?.Keyboard?.Hide?.()}catch{}
          closed('controller-B');
          break;
        }
      }
    });
    watchSteam(steamInput?.RegisterForUserKeyboardMessages,(message)=>{
      const status=keyboardStatusOpen(message);
      if(status===false)closed('input');
      else if(status===true && requested)opened();
    });
    // A keyboard in a separate Steam window may steal focus without producing
    // the old Input dismissal event. Returning focus is a secondary signal.
    const onWindowBlur=()=>{if(keyboardSeen)windowLostFocus=true;};
    const onWindowFocus=()=>{
      if(!windowLostFocus||!keyboardSeen)return;
      windowLostFocus=false;
      schedule(()=>{if(keyboardSeen&&!visible())closed('focus-return');},180);
    };
    win?.addEventListener?.('blur',onWindowBlur);
    win?.addEventListener?.('focus',onWindowFocus);
    const onClick=e=>{
      if(e?.target?.matches?.('input,textarea')){
        // Avoid a second speculative timer for our own automatic click.
        if(requested&&Date.now()-openingAt<700){if(visible())opened(true);return;}
        requested=true;openingAt=Date.now();dismissedUntil=0;
        if(visible())opened(true);
        else schedule(()=>{if(requested&&!keyboardSeen)opened();},360);
      }
    };
    const onFocus=()=>{if(visible())opened(true);}; // Focus alone is NOT keyboard-visible.
    const onBlur=()=>schedule(()=>{
      if(!visible()&&keyboardSeen&&Date.now()-openingAt>1000)closed('blur');
    },420);
    const onKeyDown=e=>{if(e?.key==='Escape')schedule(()=>{if(!visible())closed('escape');},240);};
    const onInput=()=>syncFromDOM();
    const onPaste=()=>schedule(syncFromDOM,0);
    node.addEventListener?.('input',onInput,true);
    node.addEventListener?.('paste',onPaste,true);
    node.addEventListener?.('click',onClick,true);
    node.addEventListener?.('focusin',onFocus,true);
    node.addEventListener?.('focusout',onBlur,true);
    node.addEventListener?.('keydown',onKeyDown,true);
    const tick=()=>{
      const found=visible();
      if(found){opened(true);return;}
      if(keyboardSeen&&domKeyboardSeen){
        // Two absent samples mean the overlay rendered in this document closed.
        if(++closingChecks>=2)closed('dom');
      }
    };
    const interval=(win?.setInterval||setInterval)(()=>{syncFromDOM();tick();},120);
    // The first click on Change Name now automatically activates the input.
    // Wait for React/Steam to attach the real field before requesting the OSK.
    schedule(requestKeyboard,90);
    return()=>{
      disposed=true;finishedRef.current=true;
      node.removeEventListener?.('input',onInput,true);
      node.removeEventListener?.('paste',onPaste,true);
      node.removeEventListener?.('click',onClick,true);
      node.removeEventListener?.('focusin',onFocus,true);
      node.removeEventListener?.('focusout',onBlur,true);
      node.removeEventListener?.('keydown',onKeyDown,true);
      for(const stop of unregister)try{stop()}catch{}
      win?.removeEventListener?.('blur',onWindowBlur);
      win?.removeEventListener?.('focus',onWindowFocus);
      (win?.clearInterval||clearInterval)(interval);
      for(const id of timers)(win?.clearTimeout||clearTimeout)(id);
      root?.classList?.remove?.('td-native-keyboard-open');
      latest.current.onKeyboardState(false);
    };
  },[]);
  const maxLength=kind==='id'?12:kind==='title'?180:220;
  const handleChange=e=>{
    const next=textFromNativeEvent(e,latest.current.value).slice(0,maxLength);
    latest.current.value=next;latest.current.setValue(next);
  };
  const commit=()=>{
    if(finishedRef.current)return;
    finishedRef.current=true;
    const next=syncFromDOM();
    // A physical keyboard or native Enter also exits the editing view, and
    // dismisses the OSK when Steam provides that API. No extra B press.
    try{globalThis.SteamClient?.Keyboard?.Hide?.()}catch{}
    latest.current.done(next);
  };
  const fieldProps={value,onChange:handleChange,onEnterKeyPress:commit,autoFocus:false,bShouldAutoFocus:false,
    // Focus alone must not raise the panel before the OSK actually opens.
    placeholder,maxLength,bShowClearAction:true,label:kind==='id'?'Steam App ID':kind==='search'?'Search games':'Custom display name',
    'aria-label':kind==='id'?'Steam App ID':kind==='search'?'Search games':'Custom display name'};
  const Field=UI?.TextField;
  const field=Field?h(Field,fieldProps):h('input',{value,onChange:handleChange,autoFocus:false,placeholder,maxLength,
    type:'text','aria-label':fieldProps['aria-label'],onKeyDown:e=>{if(e.key==='Enter'){e.preventDefault?.();commit()}}});
  return h('div',{className:'td-native-field',ref:wrap,'data-td-input':'true',onInputCapture:syncFromDOM,
    onPasteCapture:()=>setTimeout(syncFromDOM,0)},field,
    h(UI.Focusable,{'flow-children':'right',className:'td-native-buttons'},
      h(Btn,{onClick:cancel,'data-td-focus':'native-cancel'},'Cancel'),
      h(Btn,{onClick:commit,'data-td-focus':'native-done'},kind==='title'?'Use this title':kind==='search'?'Search games':'Find game')));
}
// The embedded title field stays mounted in its original editor. Steam's OSK may
// open in a separate CEF window: monitor all *available* close signals rather
// than trusting a single keyboard-dismiss callback. No alias is persisted here.
export function createInlineKeyboardMotion(root){
  let raised=false,requested=false;
  const paint=next=>{
    raised=Boolean(next);
    root?.classList?.toggle?.('td-inline-keyboard-open',raised);
    try{root?.setAttribute?.('data-td-keyboard-phase',raised?'open':requested?'opening':'closed')}catch{}
    return raised;
  };
  return {
    begin(){requested=true;paint(false)},
    show(){if(requested)paint(true)},
    hide(){requested=false;paint(false)},
    get raised(){return raised},
    get requested(){return requested}
  };
}
export function gamepadBEdge(pads,previous=[]){
  let fresh=false;
  const next=[];
  for(let i=0;i<(pads?.length||0);i++){
    const pad=pads[i];
    const pressed=Boolean(pad?.connected!==false && pad?.buttons?.[1]?.pressed);
    if(pressed&&!previous[i])fresh=true;
    next[i]=pressed;
  }
  return {fresh,next};
}
let activeInlineKeyboard=null;
// Keep the Steam text field *on the real game editor*. SteamOS consumes the
// keyboard B press in a separate CEF window on some Deck builds. It cannot
// reliably deliver that press or any close event to a Decky route. Since no
// second screen exists, dismissing the OSK is sufficient to reveal the editor.
// Only the explicit Save custom title action ever persists an alias.
export function InlineGameNameField({value,setValue,onEnter=()=>{},maxLength=180,label='Custom display title',
  placeholder='Enter a game display name…',fieldKind='name',finishFocus='edit-save'}){
  const wrap=R.useRef(null),latest=R.useRef({value,setValue,onEnter,maxLength,finishFocus});
  latest.current={value,setValue,onEnter,maxLength,finishFocus};
  const sync=()=>{
    const field=wrap.current?.querySelector?.('input,textarea');
    if(typeof field?.value!=='string')return latest.current.value;
    const next=field.value.slice(0,latest.current.maxLength);
    if(next!==latest.current.value){latest.current.value=next;latest.current.setValue(next)}
    return next;
  };
  R.useEffect(()=>{
    const node=wrap.current;if(!node)return;
    const doc=node.ownerDocument,win=doc?.defaultView,root=node.closest?.('.td-root');
    const motion=createInlineKeyboardMotion(root);
    const dispose=[],timers=new Set();
    let stopped=false,domObserved=false,missing=0,windowLostFocus=false,previousPads=[];
    let requestedAt=0,liftedAt=0,seenKeyboardStatus=false;
    const schedule=(fn,delay)=>{
      const id=(win?.setTimeout||setTimeout)(()=>{timers.delete(id);if(!stopped)fn()},delay);
      timers.add(id);return id;
    };
    const field=()=>node.querySelector?.('input,textarea');
    const visible=()=>steamKeyboardVisible(keyboardDocuments(doc));
    const close=()=>{if(!motion.requested)return;motion.hide();liftedAt=0;domObserved=false;missing=0;windowLostFocus=false;};
    const show=()=>{if(!motion.raised&&motion.requested)liftedAt=Date.now();motion.show();};
    const begin=()=>{
      requestedAt=Date.now();seenKeyboardStatus=false;domObserved=false;missing=0;
      motion.begin();
      // Steam's OSK arrives in a different CEF window on physical Decks. Delay
      // the fallback slightly to coincide with its entrance, not the button click.
      schedule(()=>{if(motion.requested&&!motion.raised&&!seenKeyboardStatus)show()},260);
    };
    const state=(status)=>{
      const value=keyboardStatusOpen(status);
      if(value===null)return;
      seenKeyboardStatus=true;
      if(value){if(motion.requested)show()}
      else if(motion.raised)close();
    };
    const watch=(owner,key,fn)=>{
      const registration=owner?.[key];if(typeof registration!=='function')return;
      try{
        const sub=registration.call(owner,fn);
        if(typeof sub==='function')dispose.push(sub);
        else if(typeof sub?.unregister==='function')dispose.push(()=>sub.unregister());
      }catch{}
    };
    const inputService=globalThis.SteamClient?.Input;
    const keyboardService=globalThis.SteamClient?.Keyboard;
    watch(keyboardService,'RegisterForStatus',state);
    if(!keyboardService?.RegisterForStatus)watch(globalThis.SteamClient?.VR?.Keyboard,'RegisterForStatus',state);
    watch(inputService,'RegisterForUserDismissKeyboardMessages',close);
    watch(inputService,'RegisterForUserKeyboardMessages',state);
    // Older Input builds may expose controller events even while keyboard has
    // focus. This is a passive read, never a remapping of buttons.
    const recentB=new Map();
    watch(inputService,'RegisterForControllerStateChanges',changes=>{
      for(const item of Array.isArray(changes)?changes:[changes]){
        if(!item)continue;
        const index=item.unControllerIndex??0,now=controllerBDown(item),prior=recentB.get(index)||false;
        recentB.set(index,now);
        if(now&&!prior&&motion.raised){close();break}
      }
    });
    const onBlur=()=>{
      // Steam can leave the keyboard's CEF process without sending a dismiss
      // signal. Wait one animation frame after focus returns to another control.
      schedule(()=>{
        if(!motion.raised)return;
        const active=doc?.activeElement;
        if(active&&!node.contains?.(active)&&!visible()&&Date.now()-liftedAt>650)close();
      },150);
    };
    const onWindowBlur=()=>{if(motion.raised)windowLostFocus=true};
    const onWindowFocus=()=>{
      if(!windowLostFocus||!motion.raised)return;
      windowLostFocus=false;
      schedule(()=>{if(motion.raised&&!visible()&&Date.now()-liftedAt>650)close()},130);
    };
    const onKeyDown=e=>{
      if(['Escape','Esc'].includes(e?.key))schedule(close,100);
      if(e?.key==='Enter')schedule(close,40);
    };
    const onInput=()=>sync();
    const onPaste=()=>schedule(sync,0);
    node.addEventListener?.('input',onInput,true);
    node.addEventListener?.('paste',onPaste,true);
    node.addEventListener?.('focusout',onBlur,true);
    node.addEventListener?.('keydown',onKeyDown,true);
    win?.addEventListener?.('blur',onWindowBlur);
    win?.addEventListener?.('focus',onWindowFocus);
    const tick=()=>{
      sync();  // Steam paste may bypass React's onChange while no edit is active.
      if(!motion.requested)return;
      const found=visible();
      if(found){domObserved=true;missing=0;show()}
      else if(domObserved&&motion.raised&&++missing>=2)close();
      // Where available, browser Gamepad API can observe a physical B edge even
      // when the Steam keyboard swallows its Decky event.
      try{
        const pads=win?.navigator?.getGamepads?.()||globalThis.navigator?.getGamepads?.();
        if(pads){const result=gamepadBEdge(pads,previousPads);previousPads=result.next;
          if(result.fresh&&motion.raised)close();}
      }catch{}
      // When Steam returns focus to an editor control, the OSK is no longer
      // steering the text field, even if it was drawn in another window.
      const active=doc?.activeElement,realField=field();
      if(motion.raised&&active&&active!==doc.body&&active!==realField&&
         !node.contains?.(active)&&root?.contains?.(active)&&!found&&Date.now()-liftedAt>650)close();
    };
    const interval=(win?.setInterval||setInterval)(tick,90);
    const onBegin=()=>begin();
    const onDone=()=>{close();try{field()?.blur?.()}catch{}};
    node.addEventListener?.('titledeck-inline-keyboard-request',onBegin);
    node.addEventListener?.('titledeck-inline-keyboard-done',onDone);
    activeInlineKeyboard={begin,close,done:onDone};
    return()=>{
      stopped=true;motion.hide();
      if(activeInlineKeyboard?.begin===begin)activeInlineKeyboard=null;
      node.removeEventListener?.('input',onInput,true);
      node.removeEventListener?.('paste',onPaste,true);
      node.removeEventListener?.('focusout',onBlur,true);
      node.removeEventListener?.('keydown',onKeyDown,true);
      node.removeEventListener?.('titledeck-inline-keyboard-request',onBegin);
      node.removeEventListener?.('titledeck-inline-keyboard-done',onDone);
      win?.removeEventListener?.('blur',onWindowBlur);
      win?.removeEventListener?.('focus',onWindowFocus);
      (win?.clearInterval||clearInterval)(interval);
      for(const timer of timers)(win?.clearTimeout||clearTimeout)(timer);
      for(const stop of dispose)try{stop()}catch{}
    };
  },[]);
  const change=e=>{const next=textFromNativeEvent(e,latest.current.value).slice(0,latest.current.maxLength);
    latest.current.value=next;latest.current.setValue(next)};
  const enter=()=>{sync();activeInlineKeyboard?.close();latest.current.onEnter()};
  const props={value,onChange:change,onEnterKeyPress:enter,autoFocus:false,bShouldAutoFocus:false,
    label,placeholder,maxLength,
    bShowClearAction:true,'aria-label':label};
  return h('div',{ref:wrap,className:`td-native-field ${fieldKind==='description'?'td-game-description-field':'td-game-name-field'}`,
    'data-td-inline-game-name':fieldKind==='name'?'true':undefined,'data-td-inline-description':fieldKind==='description'?'true':undefined,
    onInputCapture:sync,onPasteCapture:()=>setTimeout(sync,0)},
    UI?.TextField?h(UI.TextField,props):h('input',{...props,type:'text',onKeyDown:e=>{if(e?.key==='Enter'){e.preventDefault?.();enter()}}}),
    h('div',{className:'td-inline-keyboard-fallback'},
      h(Btn,{className:'td-inline-finish',onClick:()=>{activeInlineKeyboard?.done();focusQuery(wrap.current?.closest?.('.td-root'),`[data-td-focus="${latest.current.finishFocus}"]`,50)}},'Done editing')));
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
    'edit-back':{9:'close',10:'edit-name',12:'edit-description'},
    'edit-description':{11:'edit-back',10:'edit-name'},
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
// Preview is controller navigable without changing the four standard editor slots.
export function cleanupPreviewDestination(key,d){
  if(key==='cleanup-keep')return d===12?'cleanup-apply':d===10?'edit-name':null;
  if(key==='cleanup-apply')return d===11?'cleanup-keep':d===10?'edit-clean':null;
  return null;
}
function Manager(){
  const state=useStateSnapshot(),root=R.useRef(null);
  const [games,setGames]=R.useState([]),[scope,setScope]=R.useState('all'),[query,setQuery]=R.useState(''),[view,setView]=R.useState('library');
  const [selected,setSelected]=R.useState(''),[draft,setDraft]=R.useState(''),[notice,setNotice]=R.useState(null),[working,setWorking]=R.useState(false);
  const [entry,setEntry]=R.useState(''),[lastTile,setLastTile]=R.useState(''),[catalogBusy,setCatalogBusy]=R.useState(false);
  const [renderCols,setRenderCols]=R.useState(4);
  const [descriptionDraft,setDescriptionDraft]=R.useState('');
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
  // Ephemeral, per-game editing aids. A suggestion never changes the draft until
  // the user explicitly applies it. Undo lasts until any manual edit or save.
  const [cleanupPreview,setCleanupPreview]=R.useState(null);
  const [cleanupUndo,setCleanupUndo]=R.useState(null);
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
  const openGame=g=>{
    activeInlineKeyboard?.close();setCleanupPreview(null);setCleanupUndo(null);
    setLastTile(g.appid);setSelected(g.appid);setDraft(aliases[g.appid]||g.name);
    setDescriptionDraft(state.descriptions?.[g.appid]||'');
    enterView('editor','edit-name');
  };
  const editDraft=next=>{setCleanupPreview(null);setCleanupUndo(null);setDraft(next)};
  const openDescription=()=>{
    activeInlineKeyboard?.close();
    setDescriptionDraft(state.descriptions?.[selected]||'');
    enterView('description','description-open');
    setTimeout(()=>scrollDescriptionWorkspace(root.current,false),110);
  };
  const openDescriptionTyping=()=>{
    const wrap=root.current?.querySelector?.('[data-td-inline-description]');
    const field=wrap?.querySelector?.('input, textarea');
    if(!field){notify('Steam description text field not ready. Try again.',setNotice);return}
    const area=root.current?.querySelector?.('.td-workspace');if(area)area.scrollTop=0;
    // Follow the verified Change Name sequence exactly: arm keyboard observer,
    // focus the Decky native TextField, then dispatch its Steam click handler.
    activeInlineKeyboard?.begin();
    try{field.focus?.({preventScroll:true})}catch{try{field.focus?.()}catch{}}
    try{field.click?.()}catch{}
  };
  const cancelCleanupPreview=()=>{setCleanupPreview(null);focusQuery(root.current,'[data-td-focus="edit-clean"]',45)};
  const applyCleanup=()=>{
    if(!cleanupPreview||cleanupPreview.appid!==selected)return;
    setDraft(cleanupPreview.after);
    setCleanupUndo({appid:selected,before:cleanupPreview.before,after:cleanupPreview.after});
    setCleanupPreview(null);
    notify('Cleanup applied to your unsaved draft. Select Undo cleanup to reverse it.',setNotice,true);
    focusQuery(root.current,'[data-td-focus="edit-clean"]',55);
  };
  const suggestCleanup=()=>{
    if(cleanupUndo?.appid===selected && draft===cleanupUndo.after){
      setDraft(cleanupUndo.before);setCleanupUndo(null);setCleanupPreview(null);
      notify('Cleanup undone. Your previous draft is back.',setNotice,true);
      return;
    }
    // The source is always the currently editable draft, never Steam metadata.
    const after=cleanTitle(draft||original);
    if(!after){notify('No cleanup to suggest. Your title was not changed.',setNotice);return;}
    setCleanupUndo(null);
    setCleanupPreview({appid:selected,before:draft,after});
    focusQuery(root.current,'[data-td-focus="cleanup-keep"]',75);
  };
  const startTitleEdit=()=>{
    const wrap=root.current?.querySelector?.('[data-td-inline-game-name]');
    const field=wrap?.querySelector?.('input, textarea');
    if(!field){notify('The game title field is not ready. Try again.',setNotice);return;}
    const area=root.current?.querySelector?.('.td-workspace');if(area)area.scrollTop=0;
    // Start observing *before* Steam takes the input into its OSK process.
    activeInlineKeyboard?.begin();
    try{field.focus?.({preventScroll:true})}catch{try{field.focus?.()}catch{}}
    try{field.click?.()}catch{}
  };
  const returnLibrary=()=>{
    activeInlineKeyboard?.close();setCleanupPreview(null);setCleanupUndo(null);
    setView('library');setNotice(null);restoreTile();
  };
  const openSearch=()=>{setEntry(query);enterView('search')};
  const manualId=()=>{setEntry('');enterView('appid')};
  const chooseId=(typed=entry)=>{const id=normId(typed);if(!id){notify('Enter a valid positive numeric App ID.',setNotice);return;}
    let game=games.find(g=>g.appid===id);
    if(!game){game={appid:id,name:steamOverview(globalThis.appStore,id)?.display_name||`Steam App ${id}`,installed:false,source:'manual'};
      setGames(previous=>[...previous,game].sort((a,b)=>a.name.localeCompare(b.name)));}
    openGame(game);
  };
  const back=()=>{
    if(view==='editor' && cleanupPreview){cancelCleanupPreview();return;}
    if(view==='library'){UI.Navigation?.NavigateBack?.();return;}
    if(view==='keyboard'){enterView('editor','edit-name');return;}
    if(view==='resetConfirm'){enterView('settings','setting-restore-all');return;}
    if(view==='backupConfirm'){enterView('settings','setting-backup-restore');return;}
    if(view==='search'||view==='appid'||view==='settings'){returnLibrary();return;}
    if(view==='description'){enterView('editor','edit-description');return;}
    if(view==='editor')returnLibrary();
  };
  const save=async(method,...args)=>{
    if(working)return;
    setCleanupPreview(null);setCleanupUndo(null);
    setWorking(true);
    try{await call(method,...args);const verified=await refreshState();
      const valid=method==='save_alias'?verified.aliases?.[String(args[0])]===args[1]
        :method==='delete_alias'?!verified.aliases?.[String(args[0])]
        :method==='set_description_position'?verified.description_position===args[0]
        :verified.enabled===args[0];
      if(!valid)throw Error('Settings readback failed');
      adapter?.runNow();descriptionAdapter?.runNow();
      notify(method==='save_alias'?`Saved “${args[1]}”. TitleDeck confirmed your alias. Open Steam's game page to check the visible title.`:
        method==='delete_alias'?'Restored original Steam title.'
        :method==='set_description_position'?`Description placement changed to ${args[0]==='game_info'?'Game Info':args[0]==='hero_footer'?'Artwork Footer':'Below Play'}.`
        :'Display replacements updated.',setNotice,true);
    }catch(e){notify('Could not save: '+String(e?.message||e),setNotice);}finally{setWorking(false);}
  };
  const saveDescription=async(remove=false)=>{
    if(working)return;
    const content=descriptionDraft.replace(/\r\n?/g,'\n').trim();
    if(!remove&&(!content||content.length>4000||/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(content))){
      notify('Description must be 1–4000 plain-text characters.',setNotice);return;
    }
    setWorking(true);
    try{
      if(remove)await call('delete_description',selected);
      else await call('save_description',selected,content);
      const verified=await refreshState();
      if(remove?Boolean(verified.descriptions?.[selected]):verified.descriptions?.[selected]!==content)throw Error('Description readback did not match.');
      setDescriptionDraft(remove?'':content);
      notify(remove?'Removed your local description override.':'Description saved. The game-page panel appears when Steam shows the matching game.',setNotice,true);
    }catch(e){notify('Could not save description: '+String(e?.message||e),setNotice);}
    finally{setWorking(false);}
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
    const to=editorDestination(key,d,{canSave:!!draft.trim()&&!working,canRestore:!working});
    if(to&&directionTo(root.current,to,e))return true;
    // Steam sometimes wraps DialogButton with a non-focusable shell. If Decky's
    // navigation tree was refreshed during rerender, retry on the next UI tick.
    if(to)focusQuery(root.current,`[data-td-focus="${to}"]`,0);
    // Do not hand the direction to Steam's implicit flat traversal. It can jump rows.
    halt(e);return true;
  };
  const previewNav=(key,e)=>{
    const d=dir(e),to=cleanupPreviewDestination(key,d);
    if(to&&directionTo(root.current,to,e))return true;
    halt(e);return true;
  };
  const title=view==='description'?'Edit game description':view==='library'?'Library':view==='editor'?'Rename game':view==='settings'?'Settings':view==='resetConfirm'?'Restore original titles':view==='backupConfirm'?'Restore backup':view==='search'?'Search your games':'Find game by App ID';
  const summary=view==='library'?`${games.length} games  ·  ${installedCount} installed  ·  ${Object.keys(aliases).length} renamed`:view==='description'?'Local custom descriptions · original Steam data preserved':'Custom display titles, saved locally';
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
    actions=h('div',{className:'td-actions',style:{display:'flex'}},h(Btn,{className:'td-action','data-td-focus':'edit-back',nav:e=>editorNav('edit-back',e),onClick:returnLibrary},'← All games'),h(Btn,{className:'td-action','data-td-focus':'edit-description',nav:e=>editorNav('edit-description',e),onClick:openDescription},state.descriptions?.[selected]?'✎ Edit description ●':'✎ Add description'),h('div',{style:{flex:1}}),h('span',{className:'td-results'},'Edit → Save → Verify in Steam'));
    workspace=h('div',{className:'td-workspace'},h('div',{className:'td-editor'},h('div',null,h('div',{className:'td-editor-art'},h(Cover,{id:selected,title:original}))),
      h('div',{className:'td-card td-game-editor-card'},
        h('div',{className:'td-copy-label'},'CUSTOM DISPLAY TITLE'),
        h(InlineGameNameField,{value:draft,setValue:editDraft,
          onEnter:()=>focusQuery(root.current,'[data-td-focus="edit-save"]',70)}),
        h('div',{className:'td-editor-original-meta'},'Original Steam title: ',h('strong',null,original||'Unknown game')),
        cleanupPreview?.appid===selected?h('div',{className:'td-cleanup-preview','data-td-cleanup-preview':'true'},
          h('div',{className:'td-cleanup-heading'},'Review suggested cleanup · not applied'),
          h('div',{className:'td-cleanup-comparison'},
            h('div',null,h('span',{className:'td-cleanup-caption'},'Current draft'),h('div',{className:'td-cleanup-before'},cleanupPreview.before)),
            h('div',null,h('span',{className:'td-cleanup-caption'},'Suggested title'),h('div',{className:'td-cleanup-after'},cleanupPreview.after))),
          h(UI.Focusable,{'flow-children':'right',className:'td-cleanup-preview-actions'},
            h(Btn,{'data-td-focus':'cleanup-keep',nav:e=>previewNav('cleanup-keep',e),onClick:cancelCleanupPreview},'Keep my title'),
            h(Btn,{'data-td-focus':'cleanup-apply',nav:e=>previewNav('cleanup-apply',e),onClick:applyCleanup},'Apply suggestion'))
        ):null,
        h(UI.Focusable,{'flow-children':'down',className:'td-editor-actions','data-td-layout':'editor-grid'},
          h(UI.Focusable,{'flow-children':'right',className:'td-editor-action-row','data-td-layout':'editor-top'},
            h(Btn,{'data-td-focus':'edit-name',nav:e=>editorNav('edit-name',e),onClick:startTitleEdit},'✎ Change name'),
            h(Btn,{'data-td-focus':'edit-clean',nav:e=>editorNav('edit-clean',e),onClick:suggestCleanup},cleanupUndo?.appid===selected&&draft===cleanupUndo.after?'↶ Undo cleanup':'Suggest cleanup')),
          h(UI.Focusable,{'flow-children':'right',className:'td-editor-action-row','data-td-layout':'editor-bottom'},
            h(Btn,{'data-td-focus':'edit-save',nav:e=>editorNav('edit-save',e),disabled:working||!draft.trim(),onClick:()=>{activeInlineKeyboard?.close();void save('save_alias',selected,draft.trim())}},working?'Saving…':'✓ Save custom title'),
            h(Btn,{'data-td-focus':'edit-restore',nav:e=>editorNav('edit-restore',e),disabled:working,onClick:()=>{
              activeInlineKeyboard?.close();setCleanupPreview(null);setCleanupUndo(null);setDraft(original);
              if(aliases[selected])void save('delete_alias',selected);
              else notify('Unsaved edits cleared. Original Steam title restored in the editor.',setNotice,true);
            }},'Restore original'))),
        h('div',{className:'td-editor-note'},aliases[selected]?`Saved as: ${aliases[selected]}. Changes to visible game titles are active when TitleDeck is enabled.`:
          'Change name opens Steam’s keyboard. Suggest cleanup previews a change before applying it, with Undo available afterward. Restore original clears a draft or saved alias.'),
        state.descriptions?.[selected]?h('div',{className:'td-editor-note',style:{whiteSpace:'pre-wrap',marginTop:10}},'Saved game description: '+state.descriptions[selected]):null)));
    bottom=footer('A: select an action  •  B: return to library',state.enabled?'Steam title replacement ON':'Display replacement paused');
  }else if(view==='description'){
    const stored=state.descriptions?.[selected]||'';
    const descNav=(key,e)=>{
      const d=dir(e),dest={
        'description-back':{10:'description-open',12:'description-save'},
        'description-open':{9:'description-back',10:'description-input',12:'description-save'},
        'description-input':{9:'description-open',10:'description-save'},
        'description-save':{9:'description-open',12:'description-restore',11:'description-back'},
        'description-restore':{11:'description-save',12:'description-bottom',9:'description-open'},
        'description-bottom':{11:'description-restore',10:'description-open'}
      }[key]?.[d];
      if(dest&&directionTo(root.current,dest,e))return true;
      halt(e);return true;
    };
    rail=h('div',{className:'td-rail'},h('div',{className:'td-rail-label'},'CUSTOM DESCRIPTION'),
      h('div',{className:'td-rail-label'},'Steam game '+selected),
      h('div',{className:'td-rail-label'},stored?'● Locally saved':'○ No override'));
    // Save and Restore stay visible in the fixed toolbar. On short-screen Deck
    // resolutions the previous buttons were clipped below a nested focus view.
    actions=h('div',{className:'td-actions td-description-toolbar',style:{display:'flex'}},
      h(Btn,{className:'td-action','data-td-focus':'description-back',nav:e=>descNav('description-back',e),onClick:()=>enterView('editor','edit-description')},'← Game editor'),
      h(Btn,{className:'td-action','data-td-focus':'description-save',nav:e=>descNav('description-save',e),disabled:working||!descriptionDraft.trim(),onClick:()=>void saveDescription(false)},working?'Saving…':'✓ Save description'),
      h(Btn,{className:'td-action','data-td-focus':'description-restore',nav:e=>descNav('description-restore',e),disabled:working||(!stored&&!descriptionDraft.trim()),onClick:()=>void saveDescription(true)},'Restore default'),
      h(Btn,{className:'td-action','data-td-focus':'description-bottom',nav:e=>descNav('description-bottom',e),onClick:()=>scrollDescriptionWorkspace(root.current,true)},'↓ Bottom'));
    workspace=h('div',{className:'td-workspace','data-td-description-workspace':'true'},h('div',{className:'td-card td-game-editor-card',style:{maxWidth:900,margin:'0 auto',paddingBottom:28}},
      h('div',{className:'td-copy-label'},'DESCRIPTION FOR '+(aliases[selected]||original||selected)),
      h('p',{className:'td-editor-note'},'Write your own summary or notes for this game. TitleDeck displays this text in its editor and in a separate section on the matching Steam library game page. Original Steam About text and store metadata stay unchanged.'),
      h(UI.Focusable,{'flow-children':'down'},h(Btn,{'data-td-focus':'description-open',nav:e=>descNav('description-open',e),onClick:openDescriptionTyping},'⌨ Edit description using Steam keyboard')),
      h('div',{'data-td-focus':'description-input',className:'td-description-native-input',
        onGamepadDirection:e=>descNav('description-input',e)},
        h(InlineGameNameField,{value:descriptionDraft,setValue:setDescriptionDraft,
          maxLength:4000,label:'Custom game description',
          placeholder:'Write your custom description…',fieldKind:'description',finishFocus:'description-save',
          onEnter:()=>focusQuery(root.current,'[data-td-focus="description-save"]',70)})),
      h('div',{className:'td-editor-note',style:{whiteSpace:'pre-wrap',overflowWrap:'anywhere',minHeight:85,
        maxHeight:160,overflowY:'auto',padding:'14px 16px',borderRadius:10,background:'#172234',border:'1px solid #43566e'}},
        descriptionDraft||'Your custom description preview will appear here.'),
      h('div',{className:'td-editor-original-meta'},descriptionDraft.length+' / 4000 characters · Save and Restore remain in the toolbar above'),
      stored?h('div',{className:'td-editor-note',style:{whiteSpace:'pre-wrap',overflowWrap:'anywhere',maxHeight:150,overflowY:'auto',marginTop:15}},'Saved local description: '+stored):null
    ));
    bottom=footer('A: edit or save  •  B: return to game editor','Shown on matching Steam game detail pages');
  }else if(view==='keyboard'||view==='search'||view==='appid'){
    const isTitle=view==='keyboard',isSearch=view==='search';
    const context=isTitle?'Change display title':isSearch?'Search your game library':'Find game by Steam App ID';
    rail=h('div',{className:'td-rail'},h('div',{className:'td-rail-label'},'STEAM TEXT INPUT'),
      h('div',{className:'td-rail-label',style:{textAlign:'center'}},context),
      h('div',{className:'td-rail-label',style:{textAlign:'right'}},'Native keyboard'));
    actions=h('div',{className:'td-actions',style:{display:'flex'}},h(Btn,{className:'td-action',onClick:back},'← Back'),
      h('div',{style:{flex:1}}),h('span',{className:'td-results'},'Steam keyboard + physical keyboard + paste'));
    const typing=isTitle?draft:entry;
    const setTyping=isTitle?setDraft:setEntry;
    const finish=next=>{
      setTyping(next);
      if(isSearch){setQuery(next.trim());enterView('library','tile-0');}
      else if(view==='appid')chooseId(next);
      else enterView('editor','edit-name');
    };
    workspace=h('div',{className:'td-workspace td-native-workspace'},h('div',{className:'td-card td-native-entry'},
      h('div',{className:'td-copy-label'},'EDIT USING STEAM'),
      h('div',{className:'td-title-large'},context),
      h(NativeTextEntry,{value:typing,setValue:setTyping,done:finish,cancel:back,kind:isTitle?'title':isSearch?'search':'id',
        placeholder:isTitle?'Enter the name you want to see…':isSearch?'Search by title or App ID…':'Enter a numeric Steam App ID…'}),
      h('div',{className:'td-native-hint'},'Steam keyboard opens automatically. If needed, select the text field or press STEAM + X. Physical keyboards and paste are supported.')));
    bottom=footer('A: edit field  •  Enter: accept  •  B: back',isTitle?'Save your new name on the next screen':'Steam native text entry');
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
    const settingsGrid=[['setting-0','setting-backup'],['setting-backup-restore','setting-recover'],['setting-placement-info','setting-scan'],['setting-placement-hero'],['setting-placement-below'],['setting-restore-all']];
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
        settingPanel('description-placement','Custom game description location',
          'Game Info replaces the visible description inside Steam’s GAME INFO tab. Artwork Footer uses the strip above Play. Below Play keeps the full-width panel. All three preserve your original Steam metadata.',
          h('div',{className:'td-card-buttonrow',style:{display:'grid',gridTemplateColumns:'1fr',gap:6}},
            button(state.description_position==='game_info'?'✓ Game Info (selected)':'Show inside GAME INFO',
              ()=>void save('set_description_position','game_info'),{focus:'setting-placement-info'}),
            button(state.description_position==='hero_footer'?'✓ Artwork Footer (selected)':'Show in Artwork Footer',
              ()=>void save('set_description_position','hero_footer'),{focus:'setting-placement-hero'}),
            button(state.description_position==='below_play'?'✓ Below Play (selected)':'Show Below Play',
              ()=>void save('set_description_position','below_play'),{focus:'setting-placement-below'})),
          state.description_position==='game_info'?'● Game Info selected · open Steam’s GAME INFO tab'
            :state.description_position==='hero_footer'?'● Artwork Footer selected · compact preview above Play'
            :'● Below Play selected · full description panel'),
        settingPanel('diagnostics','Steam display diagnostics',`Bridge: ${steamBridgeStatus}. Documents: ${adapter?.docs||0}. Visible text matches: ${adapter?.applied||0}. Live UI updates: ${adapter?.fastPasses||0}. Description panels: ${descriptionAdapter?.shown||0}. Current view: ${descriptionAdapter?.status||'not ready'}. Last captured Steam game page: ${formatDescriptionGameProbe()}. Native Game Info data: ${gameInfoDataAdapter?.status||'not connected'}; hooks ${gameInfoDataAdapter?.hookedStores||0}, overrides ${gameInfoDataAdapter?.overrides||0}. Description placement: ${state.description_position==='game_info'?'Game Info':state.description_position==='hero_footer'?'Artwork Footer':'Below Play'}. Saved names: ${aliasCount}; descriptions: ${Object.keys(state.descriptions||{}).length}. No Steam artwork or metadata is modified.`,
          button('Rescan Steam UI',()=>{adapter?.runNow();descriptionAdapter?.runNow();notify(`Steam scan complete. Titles: ${adapter?.applied||0}; description panels: ${descriptionAdapter?.shown||0}.`,setNotice,true)},{focus:'setting-scan'})),
        h('section',{className:'td-setting-panel td-panel-wide td-panel-danger'},h('h3',null,'Restore every original Steam title'),
          h('p',null,`Remove all ${aliasCount} saved display override${aliasCount===1?'':'s'} from TitleDeck. You will review a separate confirmation and an automatic recovery backup will be created first.`),
          button('Review Restore All…',startRestoreAll,{disabled:!aliasCount,focus:'setting-restore-all'}),
          h('div',{className:'td-mini-state'},'Nothing is removed until you explicitly confirm.'))
      )));
    bottom=footer('B: return to library',`TitleDeck ${PLUGIN_VERSION}`);
  }
  const nativeScreen=view==='keyboard'||view==='search'||view==='appid';
  return h(UI.Focusable,{'data-titledeck-ui':'true',className:`td-root${nativeScreen?' td-native-screen':''}`,ref:root,'flow-children':'down',onCancel:e=>{halt(e);back()}},
    h('style',null,STYLE),
    h('main',{className:'td-shell','data-td-layout':'manager-shell'},
      h('header',{className:'td-header'},h('div',{className:'td-identity'},h('img',{src:ICON_DATA_URI,className:'td-logo',alt:''}),
        h('div',{style:{minWidth:0}},h('div',{className:'td-heading'},'TitleDeck ',h('span',{className:'td-version-chip'},`v${PLUGIN_VERSION}`),' · ',title),h('div',{className:'td-sub'},summary))),
        h('div',{className:'td-header-tools'},h('span',{className:'td-pill'},`${Object.keys(aliases).length} renamed`),
          h(Btn,{className:'td-close','data-td-focus':'close',nav:e=>view==='editor'?editorNav('close',e):view==='description'?null:navHeader('close',e),onClick:back},view==='library'?'✕ Close':'← Back'))),
      rail,actions,workspace,bottom,showMessage));
}
function QuickPanel(){
 const data=useStateSnapshot(),[error,setError]=R.useState(''),[capture,setCapture]=R.useState('');
 const open=()=>{try{UI.Navigation.CloseSideMenus?.();UI.Navigation.Navigate(ROUTE);}catch(e){setError(String(e));}};
 const scan=()=>{try{descriptionAdapter?.runNow();gameInfoDataAdapter?.runNow();setCapture(formatDescriptionGameProbe()+' · native data: '+(gameInfoDataAdapter?.status||'unavailable')+' · calls '+(gameInfoDataAdapter?.calls||0)+' · overrides '+(gameInfoDataAdapter?.overrides||0))}
   catch(e){setCapture('Game Info scan error: '+String(e?.message||e))}};
 return h(UI.PanelSection,{title:'TitleDeck'},h('div',{'data-titledeck-ui':'true'},
   h('div',{style:{display:'flex',alignItems:'center',gap:9,padding:'6px 0'}},h('img',{src:ICON_DATA_URI,style:{width:42,height:42,borderRadius:9}}),h('div',null,h('div',{style:{display:'flex',alignItems:'center',gap:7}},h('strong',null,'TitleDeck'),h('span',{className:'td-qam-version',style:QAM_VERSION_STYLE},`v${PLUGIN_VERSION}`)),h('div',{style:{fontSize:12,opacity:.7}},`${Object.keys(data.aliases||{}).length} custom names`))),
   h(UI.PanelSectionRow,null,h(UI.ButtonItem,{onClick:open,layout:'below'},'Open full library manager')),
   h(UI.PanelSectionRow,null,h(UI.ButtonItem,{onClick:scan,layout:'below'},'Capture current Game Info page')),
   h('div',{style:{fontSize:11,opacity:.84,lineHeight:1.4,padding:'6px 4px',whiteSpace:'normal',overflowWrap:'anywhere'}},
     capture||'Capture while GAME INFO is visible, before opening the full manager. Only app IDs and DOM selector counts are recorded.'),
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
      adapter?.stop();descriptionAdapter?.stop();gameInfoDataAdapter?.stop();
      adapter=createTitleAdapter(doc,()=>latestState,()=>doc.defaultView?.appStore||globalThis.appStore,()=>[doc,...discoverDocuments()]);
      descriptionAdapter=createDescriptionAdapter(doc,()=>latestState,()=>[doc,...discoverDocuments()]);
      gameInfoDataAdapter=createGameInfoDataAdapter(()=>latestState,()=>[globalThis,doc.defaultView,...discoverDocuments().map(d=>d.defaultView)]);
      adapter.start();descriptionAdapter.start();gameInfoDataAdapter.start();
      steamBridgeStatus='Connected to Steam UI document';
    }
    return ()=>{if(steamDocument===doc){adapter?.stop();adapter=null;descriptionAdapter?.stop();descriptionAdapter=null;gameInfoDataAdapter?.stop();gameInfoDataAdapter=null;steamDocument=null;steamBridgeStatus='Steam UI detached';}};
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
 if(!descriptionAdapter){descriptionAdapter=createDescriptionAdapter(globalThis.document,()=>latestState,()=>steamDocument?[steamDocument]:discoverDocuments());descriptionAdapter.start();}
 if(!gameInfoDataAdapter){gameInfoDataAdapter=createGameInfoDataAdapter(()=>latestState,()=>[globalThis,steamDocument?.defaultView,...discoverDocuments().map(d=>d.defaultView)]);gameInfoDataAdapter.start();}
 refreshState().catch(e=>console.warn('[TitleDeck] state load:',e));
 return{name:PLUGIN,titleView:h('span',{style:{display:'flex',alignItems:'center',gap:8}},'TitleDeck',h('span',{className:'td-version-chip',style:QAM_VERSION_STYLE},`v${PLUGIN_VERSION}`)),content:h(QuickPanel),
   icon:h('img',{src:ICON_DATA_URI,alt:'TitleDeck',style:{width:24,height:24,objectFit:'contain'}}),
   onDismount(){adapter?.stop();adapter=null;descriptionAdapter?.stop();descriptionAdapter=null;gameInfoDataAdapter?.stop();gameInfoDataAdapter=null;steamDocument=null;
     try{api.routerHook?.removeGlobalComponent?.(STEAM_DOC_ANCHOR)}catch{}
     try{api.routerHook?.removeRoute?.(ROUTE)}catch{}
     bridge=null;observers.clear();}};
}
