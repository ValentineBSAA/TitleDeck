/** TitleDeck 1.2.1 Stable baseline; experimental right-stick fix on preview branch ONLY. */
const PLUGIN = 'TitleDeck', PLUGIN_VERSION = '1.2.1', ROUTE = '/titledeck/manager';
// Private developer opt-in. Normal users never see scan controls or timing logs;
// the bounded timing recorder remains available for future Steam UI regressions.
export function developerDiagnosticsEnabled(){
  return globalThis.__TITLEDECK_DEV_DIAGNOSTICS__ === true;
}
const R = globalThis.SP_REACT;
const UI = globalThis.DFL;
const h = (...a) => R.createElement(...a);
const QAM_VERSION_STYLE = {display:'inline-flex',alignItems:'center',fontSize:10,fontWeight:800,color:'#e9eef6',background:'#384257',border:'1px solid #7d8aa5',borderRadius:99,padding:'3px 7px',lineHeight:1};
const ICON_DATA_URI = 'data:image/webp;base64,UklGRqgKAABXRUJQVlA4IJwKAABQMwCdASqAAIAAPkUejEUioaEjppFLcHAIiUAZMBYKe/suZu678Oc32cXtq/c+ub/HetD7mfcG/T7+99VfzFfsP+0nu1eir7APgA/WbrafQA/Xn00/ZD/an9t/aFugnLcezmce+/35z8m/27/3fRbvFP51/b+Grm08mv6P/s+OTuTf8N+W/POUAPyl/pftV+Rv/c81v1N/2fcS/mP9Q/2/9t/eXvd+jMWitoTb3LX8trScgmTAZ6CNlXK/+NCqJ35IwjVVvadTm2R6vGVi1mUhHBmgbhz44HQML+P5CnnN5+O+4Ld+mzwCzq+sqhCENxixFwDz+map/LCUWU9epBI1TVSNBFWhBxFVbFLf881BHhpB4A1YKYBSRBIzlEnshJ/9TsNN1wJdCv6DML4XO9G2GqKj/c8MeSFW05HIoOhCmfARXgUUXF+w0b2/Z2bfwQQIiWYLZ9aozbymVP85xfpIMXDuoQwm6UO67ATLfXM+iP8i19bTSV6ie7W0/hVaBQgj4Q44HpyDHmtpPKOCdnAeT/aU3EY9m5pyWTriLlt9Gx24AAD+/1Z7NthDTb37UFPLoTt4wc6i9FM5jSvpHtRfewnQyAuN1wRErY6dy/zKIZbraw6NEQiosdt8dHKKIDoKJP8sINxIf71gphfbMg95t8M36NhaFndX8fsu2/83OWL85izQtfu2kPaFurTSP8kaL6vuTjNQrzuQ3I4U4DRqk3ysoIMNvgBKhzL0wEx/aHBfPUJM6jEqxK/4JEz2xVi8IgvMVlB0kXxSWxBg/s76AW02eaWGP1Xa0XYBCGf/kJlR/BmvW2XVMMdhnO+X+Zugaah9VwJHW1yqA1il9MWKQl2qlwIF69+7GH3Qld7Dt/7UgE+bAdNQXTr5Ro+G91IWYzWf9eZKyGIQoub50d15Y+/JdGlx+0bubtSRLB69N+uc2EnyfWupxFlE8leNo+b+IawppKXucZJQbWyny5RhivERow/Mbqrko9lbn5EeB9dH/RZkyvp67K2/FEmBAQrdCcgXzZBrKF74tHvNALynOK0brZ+BQatNrXRqH5xYQVOEeze2exsT5NVRPOBr69e9dfHkwKsZQsR98F8ldBpi8bsEQO1BaXzii/7m+cEp2S4RLgIDUc/iMbsISQKYc+hdoyDqhx/mrXoZrp1ea3iLaJmvxi6b0+qO5hMLv7q6MMu9ZNH9/hPB3islFno3aijnM/cvU9/7QTxOcP00fO2HkNYsDJ6eJ4CiIs0Hd2+m8ax/ABbJz1S3ZPTFX8JfAnJdtM81vtfaVDTWVTFyv/R5jilNcM/Dt/zmDiZU4/C4ehWFUBCa9LHdNWqwujB6Yw6WrYsH12u/3aqZr7cK5i++vAMc2jTgqi9fbzguGDYQ6e+BR5RyTIHRsL3pWy2T7C3kOtqkS7CUOJFJQkvxuiYN3/HwUPBDIw6c0UTaSBILNKQcHkiMY7P5RVCCR1rpwJ0qWC4gTGf+PuK4+FBWCIQYX7fs6N+ffSAxivW7sXNIM0ufe7Sn7/rPm+VFBHAJr3/qNfJjcKxRFd6lP87CwaxM+5hRgWSgbNANXvYDIIZt2xWk1xiKop3nYJ+SOAq73AtZn+/K9HvxOa67+sJq4z/BXRgUXeoKHOnhunQqCbMVHlhd0nZWEYcnAjTRIl6oN+jBynSN9KGzkcEJzhIIq+8q4C2AW1dQidlTYrRJcGIhv1HhHZjMJLWmhdyoJg0M/qrWf6/qoFFGzrbwN57NWv75bT62mP6hfko+QAkI73iQtyc0bVHD5T15lfJjaMUPvok9N/v/l0jnE3LXnSXgARpS5PyBHxZ4zuw3dajC28fmYCh/IyIS0ApGxKZoLo1NaWtcwZWg/rU/At2bPMLfj737PZbDJgnQ6Niep//PPfx7Xw6rir4riCIkA4wN+AaPrkzZcpW2vSQTKPnlNFnFO+e1vecnyJACKPLQEIyYQCHjy9LLalhUSTIn/94YgYvbKKzcYBTnQWGQ99c1DVU2B/NKbZx2eovAX8qPQVoXuYP6W66/PQu2wzouNMIZt82EtK8SXmYuohklNRKyU/3yfkrdiK2mbPqCgzg8VYQP2HevHZB6bwUT7GKGyQuLOtLRetK+a6BkAu+tTHBdOCPkVL66FBZea/iTalvLZ0Yr1SnpcCTP9WXlZviV/4sWL8EPrablCcxfSk9hmO+tfstM9tYD0yhY+ZwtoJuq3EbQ7fB9/tuCWQwXyZx7UMB7SjiuA7MMHSXSD42h8Dlz//rRI/OY8mG9ZZN80Kqu8DAI63Ai8sk23PwsX7tS5at9tmntPhA/bZ9qmjlSExflHhqWGGGJPChDhXMk2zYcf5lyRY/TrLC42pY52sppoBdETZbIE1WoCwPw74Cln/yZMh/yTHjh1xr/Wsxlyad33sSVQABiLbeQ5b/UdKxer1jvhoRGQ/4uEzmbC/1QpX8H/6n2T4Cz3hBUIf/+vaUF6z+X6TyBk3ZLiK2irO4oQqj3cwPL1MCY9OF0RShQO9tfezl5VFiTc5/GQxran4D0jDGvhgmaDCfhWB5/38TwynEeKQ8U8cKguN75fkWlS4R1td51nP5d12rEWL603V/52gqXc5NRwpsyZc2arhhKnsekIF7/OZAPY8F4iJfxR7tvSwqGcyv0oqrSoJuYOOO/Ucr9JEZYQp7QkC+ZlWRfnYCxGk2U99S6mNUDRWMoyAB5fcDUzw0QfLkXw+Y5PJXX+aBdqyM0CBtOH67g+KkQGNLYv6Uqf4T4DfmMK5IBdM6+phTVMmUB3LInI6lkfA6yAgOnVcC2gVTj8VH8zjA33HZRWor19WFEkbwnC+kCU00J0KoHKSA1WWVPok+IIZ+vjNEZhiYFA4X2pLyb1Q9339zmZ/uld1pvufjchS3D6UfOGfORWnXy/IgxJLHueFxneG8x53iFnikn+L8lQEnEzl3KZLvexFlLk6YK2A9uQiUXZJ7H3qujz1qkQR6xFz5mHCngS3/wsRop89Hrj1jo/a96GSh3Ys32aRiUbLDD3HDffU9kZ1Lx6WFdCLtnByBbDrxEdn4ghcTcH703uf6XUZmQgx5xbf/3NbTxj/NScrpc39G2oGyuxG45RmaAqt8RwAPJf77K9n28n/wbIy/r6TZTpOeFPFCy9A/QZMXuv/kFYyl3nDaR/zzRMqjZFz9TgJURuiVh9YLDrAPPTL7RtW0GMjZPxKocVmmvjY6W21hIXGR9hfiPLQpJxfQokmvet+AjIP+I9y9dDNsG8wCZwLwAmQHPzKNseiKaj189lxe/W00FWR/6Xu/6X0CdOnQXMXDz3qlZC3KmDk1Gh5n4jx3Xncl05xM3OTARujPjyu2ScQ1ioBJELZayD/nm2wdWpxtDbJJh7wLci9AH9KejL8My0U7cAiKLvK1fbAekqlfSQn/0Sp0LDxuOYnlzKRsBkKHPHW/Evnwqw2U4mQv9FgA88VuzJNzzlgTUuX1zg3G9Lx3VCFo8O5NjJhif3MSOovstVaRxKe+ksC0KxyAgNORHtgTvMCxRmvJ80VwTHcfI6DvbHEe0UwV/4fpEtl++xcC3taG8tG7Yt9r8EHcnJgQOwj8jhL0ItgZJQDnbO2OUC8ZvI3AfRnKSE7M2mnhJl4AA';

let bridge, adapter, homeMenuAdapter, descriptionAdapter, nonSteamDescriptionAdapter, gameInfoDataAdapter, controllerScrollBridge, gameContextMenuAdapter;
let pendingContextGame=null;
let steamDocument = null;
let steamBridgeStatus = "Waiting for Steam window";
const STEAM_ANCHOR = "TitleDeckSteamTextBridge";
let latestState = { schema:1, enabled:true, home_menu_titles:true, aliases:{}, descriptions:{}, description_position:'below_play', games:[], recovery:{available:false,count:0}, manual_backup:{available:false,count:0} };
const observers = new Set();
function connect() {
  if (bridge) return bridge;
  const fn=globalThis.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit;
  if (!fn?.connect) throw Error('Decky bridge is unavailable');
  bridge=fn.connect(1,PLUGIN);return bridge;
}
const call=(name,...args)=>connect().call(name,...args);
function acceptState(state){
  const before=latestState;
  if(state && typeof state ==='object'){
    if(state.cover_cache&&typeof state.cover_cache==='object')hydrateCoverResolutionCache(state.cover_cache);
    latestState={...latestState,...state};
  }
  observers.forEach(listener=>{try{listener(latestState);}catch{}});
  const aliasesChanged=before.enabled!==latestState.enabled||
    JSON.stringify(before.aliases||{})!==JSON.stringify(latestState.aliases||{});
  const descriptionsChanged=before.enabled!==latestState.enabled||
    before.description_position!==latestState.description_position||
    JSON.stringify(before.descriptions||{})!==JSON.stringify(latestState.descriptions||{});
  if(aliasesChanged)adapter?.runNow();
  if(aliasesChanged||before.home_menu_titles!==latestState.home_menu_titles)homeMenuAdapter?.runNow();
  if(descriptionsChanged){descriptionAdapter?.runNow();nonSteamDescriptionAdapter?.runNow();}
  return latestState;
}
function useStateSnapshot(){
  const [snap,setSnap]=R.useState(latestState);
  R.useEffect(()=>{observers.add(setSnap);return()=>observers.delete(setSnap)},[]);
  return snap;
}
let bootHydrationTimers=[];
function reapplySavedGameInfoAfterBoot(){
  for(const timer of bootHydrationTimers)clearTimeout(timer);
  bootHydrationTimers=[];
  const snap=latestState;
  if(snap.enabled!==true||snap.description_position!=='game_info'||
      !Object.keys(snap.descriptions||{}).length)return;
  // Decky and Valve can mount the game detail after TitleDeck hydrates. These
  // short-lived retries use Preview 24's ORIGINAL route/fiber identity and
  // native description renderer, not an alternate broad DOM insertion path.
  // Preview 24's 4-second fallback continues to handle later page navigation.
  for(const delay of [0,650,1800,5000]){
    const timer=setTimeout(()=>{
      bootHydrationTimers=bootHydrationTimers.filter(x=>x!==timer);
      if(latestState.enabled&&latestState.description_position==='game_info')
        descriptionAdapter?.runNow('boot-hydration');
      nonSteamDescriptionAdapter?.runNow('boot-hydration');
    },delay);
    bootHydrationTimers.push(timer);
  }
}
async function refreshState(){
  const state=acceptState(await call('snapshot'));
  reapplySavedGameInfoAfterBoot();
  return state;
}
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
// Games and user-added apps belong in Full Library Manager, but Steam's own
// compatibility layers and shared runtimes do not. Use narrowly anchored
// labels plus authoritative IDs, never a blanket /proton|runtime/ substring
// that could hide a real game with those words in its title.
const STEAM_COMPONENT_IDS=new Set([
  '228980',  // Steamworks Common Redistributables
  '1070560', // Steam Linux Runtime
  '1391110', // Steam Linux Runtime (soldier)
  '1628350', // Steam Linux Runtime (sniper)
  '1826330', // Proton EasyAntiCheat Runtime
  '1161040', // Proton BattlEye Runtime
  '1493710', // Proton Experimental
  '2180100', // Proton Hotfix
  '2805730', // Proton 9.0
  '2348590', // Proton 8.0
  '1887720', // Proton 7.0
  '1420170', // Proton 5.13
  '1113280', // Proton 4.2
  '1054830', // Proton 4.11
  '961940',  // Proton 3.16
  '858280'   // Proton 3.7
]);
export function isSteamUtility(appid,title,appType){
  const id=normId(appid),name=String(title||'').trim();
  if(STEAM_COMPONENT_IDS.has(id))return true;
  if(/^(?:proton(?:\s+(?:\d+(?:\.\d+)*(?:[-.][\w.]+)?|experimental|hotfix|next))?|proton\s+(?:easy\s*anti[- ]?cheat|battleye)\s+runtime|steam\s+linux\s+runtime(?:\s*\([^)]*\))?|steamworks\s+common\s+redistributables|steam\s+runtime|steam\s+controller\s+configurations)$/i.test(name))return true;
  const type=Number(appType);
  // Steam app_type=4 is Tool. Without other metadata, do not classify
  // ambiguous numeric types as utilities; keep legitimate applications.
  if(appType!==undefined&&appType!==null&&appType!==''&&Number.isFinite(type)&&type===4)return true;
  return false;
}
export function collectSteamGames(store, local=[], extras=[]) {
  const games = new Map();
  function add(input,source='steam') {
    const id=normId(input?.appid??input?.appId??input?.m_nAppID??input?.id);
    const title=String(input?.display_name??input?.displayName??input?.name??input?.app_name??input?.title??'').trim();
    if(!id||!title||title.length>180||/[\r\n]/.test(title))return;
    const type=input?.app_type??input?.type;
    // Apply to BOTH installed manifests and Steam's live inventory.
    if(isSteamUtility(id,title,type))return;
    // Include games, apps, demos and shortcuts; exclude known non-game categories.
    if(typeof type==='number' && ![0,1,2,8,1073741824].includes(type) && source!=='manifest')return;
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
  return [...games.values()].filter(g=>!isSteamUtility(g.appid,g.name)).sort((a,b)=>a.name.localeCompare(b.name)||Number(a.appid)-Number(b.appid));
}

// TitleDeck title overlay: refresh text *during Steam's mutation microtask*, before
// the next paint whenever Steam's client allows it. Preserve metadata and DOM structure.
// Only exact, uniquely identified original titles are replaced. Every write is reversible.
export function createTitleAdapter(host,getState,getStore=()=>globalThis.appStore,getDocuments=()=>[]) {
  let stopped=false, scanTimer=null, heartbeat=null, observerList=[], scanned=0, fastPasses=0;
  const changed=new Map();
  const MAX_NODES=9000, MAX_MUTATION_NODES=3500;
  function hasAliases(){const state=getState()||{};return state.enabled===true&&Object.keys(state.aliases||{}).length>0;}
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
    try{if(el.closest?.('[data-titledeck-ui], [data-titledeck-description], [data-titledeck-exclude], [class*="decky" i], [class*="PluginStore" i], [id*="decky" i], [contenteditable], [role="textbox"], [role="combobox"], input, textarea, script, style, select, option'))return true;}catch{}
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
    if(!hasAliases()){restore();return 0;}
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
    if(stopped||!hasAliases())return;
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
    if(stopped||!hasAliases())return;
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
  function runNow(){if(stopped)return 0;if(!hasAliases()){restore();return 0;}setup();return fullScan();}
  function start(){setup();fullScan();heartbeat=setInterval(()=>{if(hasAliases()){setup();fullScan();}},12000);}
  function stop(){stopped=true;if(scanTimer!==null)clearTimeout(scanTimer);if(heartbeat!==null)clearInterval(heartbeat);for(const item of observerList)item.watch.disconnect();observerList=[];restore();}
  return{start,stop,runNow,get applied(){return activeCount()},get scans(){return scanned},get fastPasses(){return fastPasses},get docs(){return observerList.length}};
}



/** 1.2.0 Preview 1: separate, fail-closed STEAM/HOME-button menu experiment.
 * MetaDeck's route patches do not reach MainMenu_uid. DeckThemes confirms it
 * is a separate CEF tab. Never pretend that BigPicture document == MainMenu.
 * We only modify a same-origin, already accessible MainMenu document, with
 * an authoritative running App ID. No CEF/debug-port injection or global
 * Steam API replacements; no changing Steam's canonical app metadata.
 */
export function homeMenuRunningAppId(contexts=[]){
  const IDs=new Set();
  for(const ctx of contexts){
    if(!ctx)continue;
    try{
      const steam=ctx.SteamUIStore||ctx.m_SteamUIStore;
      const candidate=steam?.MainRunningAppID ?? steam?.MainRunningApp?.appid ??
        steam?.m_WindowStore?.GamepadUIMainWindowInstance?.MainRunningAppID ??
        steam?.m_WindowStore?.MainWindowInstance?.MainRunningAppID;
      const id=normId(candidate);
      if(id)IDs.add(id);
    }catch{}
  }
  // Never guess when contexts disagree (or there is no active game).
  return IDs.size===1?[...IDs][0]:'';
}
export function isVerifiedHomeMenuDocument(doc){
  if(!doc?.documentElement||typeof doc.createTreeWalker!=='function')return false;
  try{
    const win=doc.defaultView;
    // A MainMenu_uid tab is independent of BigPicture/QuickAccess.
    const title=String(doc.title||'');
    const name=String(win?.name||'');
    const url=String(doc.URL||win?.location?.href||'');
    return /(?:^|[^a-z])MainMenu(?:_uid\d+)?(?:$|[^a-z])/i.test(name)||
      /^MainMenu(?:_uid\d+)?$/i.test(title.trim())||
      /(?:^|[/?#=&])MainMenu_uid\d+(?:$|[/?#=&])/i.test(url);
  }catch{return false;}
}
/** Preview 2: use the same Decky navigation-tree bridge proven in Grid Menu.
 * MainMenu browser views are not entries in g_PopupManager. The navigation
 * tree's Root.Element.ownerDocument exposes the *existing* browser view
 * without opening/creating a window. A true MainMenu identity is required
 * both on the navigation tree and on the document itself. */
export function homeMenuDocumentsFromNavigationTrees(trees=[]){
  const matched=new Set();
  try{
    for(const tree of Array.isArray(trees)?trees:[]){
      const id=String(tree?.m_ID||tree?.id||'');
      if(!/^MainMenu(?:_uid\d+)?(?:$|_)/i.test(id))continue;
      const roots=[tree?.Root?.Element,tree?.m_Root?.Element,
        tree?.Root?.m_element,tree?.m_Root?.m_element,
        tree?.Root?.m_HTMLElement,tree?.m_Root?.m_HTMLElement];
      for(const root of roots){
        const doc=root?.ownerDocument;
        if(doc&&isVerifiedHomeMenuDocument(doc))matched.add(doc);
      }
    }
  }catch{}
  return [...matched].slice(0,4);
}
/** Preview 3: Decky Music's Steam MainMenu React-fiber discovery pattern.
 * Steam's MainMenu_uid browser-view is not a navigation tree or a PopupManager
 * window. Its React subtree can nevertheless be mounted from SharedJSContext.
 * Read-only discovery never creates a new popup, reloads Steam, or touches
 * the game's canonical metadata.  Any DOM we edit must still independently
 * identify itself as the real MainMenu browser-view document.
 */
export function homeMenuReactFiberRoots(documents=[]){
  const results=new Set();
  for(const doc of documents){
    if(!doc?.querySelectorAll)continue;
    let elements=[];
    try{
      elements=[doc.getElementById?.('root'),doc.getElementById?.('app'),
        doc.querySelector?.('[data-react-nav-root]'),doc.body,doc.documentElement,
        ...Array.from(doc.querySelectorAll('body > *, #root > *')).slice(0,36)];
    }catch{}
    for(const el of elements){
      if(!el)continue;
      try{
        const key=Object.keys(el).find(k=>k.startsWith('__reactContainer$')||k.startsWith('__reactFiber$'));
        let fiber=key?el[key]:null;
        for(let i=0;fiber?.return&&i<120;i++)fiber=fiber.return;
        if(fiber&&typeof fiber==='object')results.add(fiber);
      }catch{}
    }
  }
  if(!results.size){
    // Unusual Steam layouts may mount React beneath several wrappers.
    // Only use this bounded fallback if the ordinary root anchors failed.
    for(const doc of documents){
      try{
        const elements=doc?.querySelectorAll?.('*');
        for(let i=0;elements&&i<Math.min(elements.length,900)&&results.size<2;i++){
          const el=elements[i],key=Object.keys(el).find(k=>k.startsWith('__reactFiber$'));
          let fiber=key?el[key]:null;
          for(let n=0;fiber?.return&&n<120;n++)fiber=fiber.return;
          if(fiber)results.add(fiber);
        }
      }catch{}
    }
  }
  return [...results].slice(0,8);
}
export function inspectHomeMenuReactFibers(documents=[],originals=[]){
  const roots=homeMenuReactFiberRoots(documents),menuDocs=new Set(),seen=new Set();
  const titles=new Set(originals.map(x=>String(x).trim()).filter(Boolean));
  let visited=0,hosts=0,textMatches=0;
  const stack=[...roots];
  while(stack.length&&visited<28000){
    const fiber=stack.pop();if(!fiber||typeof fiber!=='object'||seen.has(fiber))continue;
    seen.add(fiber);visited++;
    try{
      if(fiber.memoizedProps?.navID==='MainNavMenuContainer'||
         (fiber.memoizedProps?.bLoggedIn!==undefined&&fiber.memoizedProps?.open!==undefined&&
           'popup' in fiber.memoizedProps))hosts++;
      const node=fiber.stateNode;
      const possible=[node?.ownerDocument,node?.containerInfo?.ownerDocument,
        node?.containerInfo?.nodeType===9?node.containerInfo:null,
        node?.nodeType===9?node:null];
      for(const d of possible)if(isVerifiedHomeMenuDocument(d))menuDocs.add(d);
      const str=fiber.memoizedProps;
      if(titles.size&&(typeof str==='string'&&titles.has(str.trim())||
        typeof node?.nodeValue==='string'&&titles.has(node.nodeValue.trim())))textMatches++;
    }catch{}
    if(fiber.child)stack.push(fiber.child);
    if(fiber.sibling)stack.push(fiber.sibling);
  }
  return{documents:[...menuDocs].slice(0,4),roots:roots.length,hosts,visited,textMatches};
}
/** Exact-match React output rewriting, scoped to a confirmed running AppID.
 * Only React presentation props are copied; Steam app objects, handlers,
 * routes, game IDs, and event listeners remain unchanged. */
export function rewriteHomeMenuReactOutput(input,config,react=R){
  let replaced=0,visited=0;
  if(!config?.originals?.size||typeof config.alias!=='string'||!config.alias.trim())
    return{output:input,replaced:0};
  const rewrite=(value,depth)=>{
    if(visited++>3500||depth>18)return value;
    if(typeof value==='string'){
      if(config.originals.has(value.trim())){
        const at=value.indexOf(value.trim());
        replaced++;return value.slice(0,at)+config.alias+value.slice(at+value.trim().length);
      }
      return value;
    }
    if(Array.isArray(value)){
      let change=false;
      const next=value.map(v=>{const n=rewrite(v,depth+1);if(n!==v)change=true;return n;});
      return change?next:value;
    }
    if(!value||typeof value!=='object'||!value.props||!value.$$typeof)return value;
    const props=value.props,update={};
    for(const key of ['children','label','title','name']){
      if(Object.prototype.hasOwnProperty.call(props,key)){
        const prior=props[key],next=rewrite(prior,depth+1);
        if(next!==prior)update[key]=next;
      }
    }
    return Object.keys(update).length&&typeof react?.cloneElement==='function'
      ?react.cloneElement(value,update):value;
  };
  const output=rewrite(input,0);
  return{output,replaced};
}
export function createHomeMenuTitleAdapter(getState,getStore=()=>globalThis.appStore,getDocuments=()=>[],getContexts=()=>[globalThis]){
  let stopped=false, timer=null, watches=[], attempts=0, lastStatus='HOME-menu titles disabled',
    accessible=0, rewrites=0, reactRewrites=0, lastId='', lastReactProbe={roots:0,hosts:0,visited:0,textMatches:0,documents:[]}, reactPatch=null;
  const edited=new Map();
  const active=()=>{
    const state=getState()||{};
    return state.enabled===true&&state.home_menu_titles===true&&
      Object.keys(state.aliases||{}).length>0;
  };
  function contexts(){
    const set=new Set([globalThis]);
    try{for(const item of getContexts()||[])if(item)set.add(item);}catch{}
    return [...set];
  }
  function documents(config){
    const set=new Set(),add=d=>{if(isVerifiedHomeMenuDocument(d))set.add(d)};
    // Valve renders the menu into a BrowserView via React. The popup can be
    // absent from Decky's navigation tree yet present in Steam's fiber tree.
    // This is the critical Preview 3 discovery path.
    try{
      const source=new Set([globalThis.document]);
      for(const d of getDocuments()||[])if(d)source.add(d);
      for(const ctx of contexts())if(ctx?.document)source.add(ctx.document);
      lastReactProbe=inspectHomeMenuReactFibers([...source].slice(0,12),config?[...config.originals]:[]);
      for(const d of lastReactProbe.documents)add(d);
    }catch{}

    try{for(const d of getDocuments()||[])add(d);}catch{}
    // The MainMenu window is a Steam BrowserView. Decky exposes its DOM
    // through navigation trees even when the popup manager does not.
    try{for(const d of homeMenuDocumentsFromNavigationTrees(UI?.getGamepadNavigationTrees?.()||[]))add(d);}catch{}
    for(const ctx of contexts()){
      try{add(ctx?.document);}catch{}
      // Some Steam client builds expose popup BrowserWindow refs to plugins.
      // All access is read-only until a *verified* MainMenu tab is located.
      try{
        const store=ctx?.SteamUIStore?.m_WindowStore;
        for(const instance of [store?.MainWindowInstance,store?.GamepadUIMainWindowInstance,
          ...(Array.isArray(store?.SteamUIWindows)?store.SteamUIWindows.slice(0,12):[])]){
          add(instance?.BrowserWindow?.document);add(instance?.m_BrowserWindow?.document);
        }
      }catch{}
      try{
        const pm=ctx?.g_PopupManager;
        const sources=[pm?.m_mapPopups,pm?.m_mapPopupsByName,pm?.m_rgPopups,pm?.m_Popups];
        for(const source of sources){
          let values=[];
          if(source instanceof Map)values=[...source.values()].slice(0,16);
          else if(Array.isArray(source))values=source.slice(0,16);
          else if(source&&typeof source==='object')values=Object.values(source).slice(0,16);
          for(const item of values){
            add(item?.document);add(item?.m_window?.document);
            add(item?.window?.document);add(item?.BrowserWindow?.document);
            add(item?.m_BrowserWindow?.document);
          }
        }
      }catch{}
    }
    return [...set].slice(0,4);
  }
  function originalFor(id){
    const state=getState()||{},alias=state.aliases?.[id];
    if(typeof alias!=='string'||!alias.trim())return null;
    const originals=new Set();
    try{
      const game=state.games?.find(g=>normId(g.appid)===id);
      if(game?.name&&game.name!==alias)originals.add(String(game.name).trim());
    }catch{}
    for(const ctx of contexts())try{
      const value=steamOverview(ctx?.appStore||getStore(),id)?.display_name;
      if(value&&value!==alias)originals.add(String(value).trim());
    }catch{}
    return originals.size?{alias,originals}:null;
  }
  function restore(){
    for(const [node,record] of edited){
      try{if(node.isConnected&&node.nodeValue===record.alias)node.nodeValue=record.original;}catch{}
    }
    edited.clear();rewrites=0;
  }
  function matchNode(node,config){
    if(node?.nodeType!==3||!node.parentElement?.isConnected)return false;
    const el=node.parentElement;
    try{if(el.closest?.('[contenteditable], input, textarea, [role="textbox"], [class*="decky" i], [data-titledeck-ui]'))return false;}catch{}
    let existing=edited.get(node);
    if(existing){
      if(!node.isConnected){edited.delete(node);return false;}
      if(node.nodeValue===existing.alias){
        if(config.originals.has(existing.original.trim())&&existing.alias.trim()===config.alias)return false;
        node.nodeValue=existing.original;
      }
      edited.delete(node);
    }
    const old=String(node.nodeValue||''),trimmed=old.trim();
    if(!config.originals.has(trimmed))return false;
    const prefix=old.indexOf(trimmed),replacement=old.slice(0,prefix)+config.alias+old.slice(prefix+trimmed.length);
    if(old===replacement)return false;
    edited.set(node,{original:old,alias:replacement});
    node.nodeValue=replacement;
    return true;
  }
  function scan(doc,config){
    const walker=doc.createTreeWalker(doc.body||doc.documentElement,doc.defaultView?.NodeFilter?.SHOW_TEXT||4);
    let node,examined=0,applied=0;
    while((node=walker.nextNode())&&examined++<2400)if(matchNode(node,config))applied++;
    return applied;
  }
  function restoreReactPatch(){
    if(!reactPatch)return;
    try{
      for(const f of [reactPatch.fiber,reactPatch.fiber?.alternate]){
        if(f?.type===reactPatch.wrapper)f.type=reactPatch.original;
      }
    }catch{}
    reactPatch=null;
  }
  /** Secondary path: a narrow live-fiber render wrapper inspired by Decky
   * Music. No global module replacement, no mutation of persistent metadata.
   * If Valve no longer exposes the known menu host shape, this is a no-op. */
  function tryReactRenderBridge(config){
    if(reactPatch){
      try{
        let f=reactPatch.fiber,foundRoot=false;
        for(let n=0;f&&n<160;n++,f=f.return){if(f.tag===3){foundRoot=true;break;}}
        if(foundRoot&&reactPatch.fiber.type===reactPatch.wrapper)return true;
      }catch{}
      restoreReactPatch();
    }
    if(!active()||!config)return false;
    const source=new Set([globalThis.document]);
    try{for(const d of getDocuments()||[])if(d)source.add(d);}catch{}
    const roots=homeMenuReactFiberRoots([...source].slice(0,12));
    let found=null,seen=new Set(),scanned=0,stack=[...roots];
    while(stack.length&&scanned++<22000){
      const f=stack.pop();if(!f||seen.has(f))continue;seen.add(f);
      const p=f.memoizedProps;
      // Matches Steam's main-menu host signature documented by Decky Music.
      if(p&&p.bLoggedIn!==undefined&&p.open!==undefined&&'popup' in p&&
          typeof f.type==='function'&&!(f.type.__titledeckHomeMenuHost)){
        found=f;break;
      }
      if(f.child)stack.push(f.child);
      if(f.sibling)stack.push(f.sibling);
    }
    if(!found)return false;
    const original=found.type;
    const wrapper=function(...args){
      const result=original.apply(this,args);
      try{
        if(!active()||homeMenuRunningAppId(contexts())!==lastId)return result;
        const latest=originalFor(lastId);if(!latest)return result;
        const modified=rewriteHomeMenuReactOutput(result,latest,R);
        reactRewrites+=modified.replaced;
        return modified.output;
      }catch{return result;}
    };
    wrapper.__titledeckHomeMenuHost=true;
    try{
      found.type=wrapper;
      if(found.alternate)found.alternate.type=wrapper;
      reactPatch={fiber:found,original,wrapper};
      return true;
    }catch{restoreReactPatch();return false;}
  }
  function clearObservers(){for(const item of watches)try{item.watch.disconnect();}catch{}watches=[];}
  function runNow(){
    if(stopped)return 0;
    attempts++;
    if(!active()){restore();clearObservers();restoreReactPatch();reactRewrites=0;lastStatus='HOME-menu titles disabled';return 0;}
    const ctx=contexts(),id=homeMenuRunningAppId(ctx);
    if(!id){restore();clearObservers();restoreReactPatch();reactRewrites=0;lastId='';lastStatus='No unambiguous running game ID';return 0;}
    const config=originalFor(id);
    if(!config){restore();clearObservers();restoreReactPatch();reactRewrites=0;lastId=id;lastStatus='Running game has no recognized saved alias';return 0;}
    if(lastId!==id){restore();clearObservers();reactRewrites=0;lastId=id;}
    const docs=documents(config);accessible=docs.length;
    const reactor=tryReactRenderBridge(config);
    if(!docs.length){
      clearObservers();restore();
      let treeCount=0,menuTrees=0;
      try{const trees=UI?.getGamepadNavigationTrees?.()||[];
        if(Array.isArray(trees)){
          treeCount=trees.length;
          menuTrees=trees.filter(t=>/^MainMenu(?:_uid\d+)?(?:$|_)/i.test(String(t?.m_ID||t?.id||''))).length;
        }
      }catch{}
      lastStatus=reactRewrites?`React menu text replaced ${reactRewrites}×; check STEAM menu`:
        `MainMenu DOM not found · React roots ${lastReactProbe.roots}, hosts ${lastReactProbe.hosts}, render hook ${reactor?'armed':'absent'} · nav trees ${treeCount}, menu trees ${menuTrees}`;
      return 0;
    }
    let count=0;
    for(const doc of docs){
      try{
        count+=scan(doc,config);
        if(watches.some(x=>x.doc===doc))continue;
        const Observer=doc.defaultView?.MutationObserver||globalThis.MutationObserver;
        if(typeof Observer!=='function')continue;
        const watch=new Observer(records=>{
          if(stopped||!active())return;
          // A running app may change without a menu repaint. Fail closed.
          if(homeMenuRunningAppId(contexts())!==id)return runNow();
          const updated=originalFor(id);if(!updated)return;
          let inspected=0;
          for(const record of records){
            const nodes=record.type==='characterData'?[record.target]:(record.addedNodes||[]);
            for(const target of nodes){
              if(inspected++>160)return;
              if(target.nodeType===3){if(matchNode(target,updated))rewrites++;continue;}
              if(target.nodeType!==1)continue;
              const walk=doc.createTreeWalker(target,doc.defaultView?.NodeFilter?.SHOW_TEXT||4);
              let child,steps=0;while((child=walk.nextNode())&&steps++<120)if(matchNode(child,updated))rewrites++;
            }
          }
        });
        watch.observe(doc.documentElement,{subtree:true,characterData:true,childList:true});
        watches.push({doc,watch});
      }catch{}
    }
    for(const item of [...watches])if(!docs.includes(item.doc)){
      item.watch.disconnect();watches=watches.filter(x=>x!==item);
    }
    rewrites+=count;
    lastStatus=rewrites||reactRewrites?'HOME-menu custom title applied':
      `MainMenu DOM reached; React hook ${reactor?'armed':'absent'}; waiting for game title`;
    return count;
  }
  function start(){stopped=false;runNow();timer=setInterval(()=>{if(active())runNow();},2500);}
  function stop(){stopped=true;if(timer!==null)clearInterval(timer);timer=null;clearObservers();restore();restoreReactPatch();}
  return{start,stop,runNow,get status(){return lastStatus},get scans(){return attempts},
    get documents(){return accessible},get applied(){return edited.size},get reactProbe(){return lastReactProbe},get reactRewrites(){return reactRewrites}};
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
/** Read Valve's untouched description on demand. Never patch the shared
 * Steam GetDescriptions function. Other Decky plugins must see native data. */
export function createGameInfoDataAdapter(_getState,getContexts=()=>[globalThis]){
  let calls=0,stopped=false;
  function getOriginalDescription(appid){
    const id=normId(appid);
    if(!id||stopped)return '';
    const contexts=new Set();
    try{for(const ctx of getContexts()||[])if(ctx)contexts.add(ctx)}catch{}
    for(const ctx of contexts){
      const store=ctx?.appDetailsStore;
      if(typeof store?.GetDescriptions!=='function')continue;
      try{
        calls++;
        const original=store.GetDescriptions(Number(id));
        const value=original?.strFullDescription||original?.strSnippet;
        if(typeof value==='string'&&value.trim())return value;
      }catch{}
    }
    return '';
  }
  return{start(){stopped=false},stop(){stopped=true},runNow(){},getOriginalDescription,
    get status(){return 'Native Steam descriptions untouched'},get hookedStores(){return 0},
    get calls(){return calls},get overrides(){return 0}};
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
  const isTitleDeckOwned=el=>{
    // Native shells intentionally carry the *same* Steam GameDescription CSS
    // classes as the real element. Without explicit exclusion, a live class
    // query selects our clone first and every scan tears down/rebuilds the
    // description. Long text makes that repeated rebuild visibly scroll-jump.
    for(let node=el,depth=0;node&&depth<35;node=node.parentElement,depth++){
      if(node.getAttribute?.('data-titledeck-gameinfo-description')!==null&&
         node.getAttribute?.('data-titledeck-gameinfo-description')!==undefined)return true;
    }
    return false;
  };
  const findAll=selectors=>{
    const result=new Set();
    for(const selector of selectors)try{
      for(const el of doc.querySelectorAll(selector)||[])if(el&&!isTitleDeckOwned(el))result.add(el);
    }catch{}
    return [...result];
  };
  // Live Decky module class tokens are preferred over hard-coded hash/name
  // fragments; real Steam Deck builds do not necessarily include those names.
  const resolved=resolveLiveSteamGameInfoClasses();
  const byClass=name=>{
    if(!name)return[];
    try{return Array.from(doc.getElementsByClassName?.(name)||[]).filter(el=>!isTitleDeckOwned(el))}
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
/** Render custom Game Info as native Steam body text.
 *  We clone only the native description element's shell (no Steam children or
 *  text), retaining its CSS module classes and font/layout inheritance. The
 *  separate TitleDeck blue card is reserved for Below Play/Artwork Footer.
 *  All user text goes through textContent, never HTML or markdown injection. */
export function createNativeSteamDescriptionPanel(doc,nativeDescription,appid){
  let panel=null;
  if(nativeDescription?.cloneNode)try{panel=nativeDescription.cloneNode(false)}catch{}
  if(!panel){
    const tag=String(nativeDescription?.tagName||'div').toLowerCase();
    panel=doc.createElement(/^(?:div|section|p|article|span)$/.test(tag)?tag:'div');
    if(nativeDescription?.className&&typeof nativeDescription.className==='string')
      panel.className=nativeDescription.className;
  }
  // A cloned native id must never collide with Steam's existing element.
  try{panel.removeAttribute?.('id')}catch{}
  panel.setAttribute('data-titledeck-gameinfo-description',appid);
  panel.setAttribute('aria-label','Game description');
  if(!nativeDescription){
    // Some games have no native description. Inherit the surrounding Steam
    // Game Info typography with no plugin-colored background or heading.
    panel.style.cssText='font:inherit;color:inherit;background:transparent;border:0;margin:0;padding:0;';
  }
  const body=doc.createElement('span');
  body.setAttribute('data-titledeck-gameinfo-text','true');
  body.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;';
  panel.appendChild(body);
  return panel;
}

/** Steam Game Info is remounted when switching tabs. Apply an active custom
 * description in the same microtask as the relevant DOM insertion, before
 * the browser paints Valve's original text. Do not react to unrelated Steam,
 * GTM, Decky Store, or TitleDeck's own panel mutations. */
export function isSteamGameInfoMutation(records){
  const nativeClass=/(?:appdetailsgameinfo|GameInfoContainer|GameDescription|DescriptionStatsCtn)/i;
  // Steam's CSS modules can export opaque hashes that contain NONE of these
  // readable names. The previous filter silently ignored those mutations.
  const liveClasses=resolveLiveSteamGameInfoClasses();
  const liveTokens=new Set([liveClasses?.owner,liveClasses?.description].filter(Boolean));
  const isSteamInfoClass=classes=>nativeClass.test(String(classes||''))||
    String(classes||'').split(/\s+/).some(token=>liveTokens.has(token));
  const owned=node=>{
    try{return !!node?.closest?.('[data-titledeck-ui], [data-titledeck-gameinfo-description], [data-titledeck-description]')||
      node?.getAttribute?.('data-titledeck-gameinfo-description')!=null}catch{return false}
  };
  const related=node=>{
    if(!node)return false;
    if(node.nodeType===3)node=node.parentElement;
    if(!node||owned(node))return false;
    let current=node;
    for(let i=0;i<7&&current;i++,current=current.parentElement){
      if(owned(current))return false;
      if(isSteamInfoClass(typeof current.className==='string'?current.className:''))return true;
    }
    // Some Steam versions mount an entire Game Info subtree at once, and
    // the inserted wrapper itself has only a generic AppDetails class.
    // Query only that new subtree, never the whole Steam document.
    try{if(/AppDetails/.test(String(node.className||''))&&node.querySelector?.(
      '[class*="appdetailsgameinfo" i], [class*="GameDescription"], [class*="GameInfoContainer"]'))return true}catch{}
    return false;
  };
  for(const record of records||[]){
    // Steam can switch tabs by changing an existing panel's visibility rather
    // than adding children. Catch that before the next paint as well.
    if(record.type==='attributes'){
      if(['class','style','hidden','aria-hidden'].includes(record.attributeName)&&
         record.target?.getAttribute?.('data-titledeck-native-original')!=='true'&&
         related(record.target))return true;
      continue;
    }
    if(record.type==='characterData'){
      if(related(record.target))return true;
      continue;
    }
    if(record.type!=='childList')continue;
    // TextDeck's own clone is inserted next to the native node. Ignore its
    // insertion to prevent observer-driven redundant full-page scans.
    const added=Array.from(record.addedNodes||[]);
    if(!added.length)continue;
    if(added.some(node=>related(node)))return true;
    // Steam may mount an anonymous portal wrapper with native Game Info
    // grandchildren. Query ONLY the inserted subtree, not the document.
    if(added.some(node=>{
      if(owned(node)||!/^(?:1|undefined)$/.test(String(node?.nodeType)))return false;
      try{return !!node.querySelector?.(
        '[class*="appdetailsgameinfopanel_GameDescription"],'+
        '[class*="appdetailsgameinfocontainer_GameDescription"],'+
        '[class*="appdetailsgameinfopanel_Container"]')||
        (liveTokens.size&&node.querySelector?.([...liveTokens].map(x=>'[class~="'+x+'"]') .join(',')))}catch{return false}
    }))return true;
    if(related(record.target)&&added.some(node=>!owned(node)))return true;
  }
  return false;
}

/** TitleDeck 0.9.5, isolated NON-STEAM Game Info support.
 * The verified Steam Game Info renderer below is carried over byte for byte.
 * Native shortcuts use Steam's localized `steam_NonSteamMessage` fallback,
 * not the GameDescription DOM node used by installed Steam games.
 * Only match a confirmed non-Steam overview/shortcut App ID and a narrowly
 * identified fallback paragraph. Never alter Steam app metadata or language
 * files, never alter the original paragraph's textContent. */
export function isNativeSteamShortcutApp(appid,store=null){
  const id=normId(appid),n=Number(id);
  if(!id)return false;
  const overview=steamOverview(store,id);
  if(overview){
    try{
      if(typeof overview.BIsModOrShortcut==='function')return overview.BIsModOrShortcut()===true;
      if(typeof overview.BIsNonSteamGame==='function')return overview.BIsNonSteamGame()===true;
    }catch{}
    const type=Number(overview.app_type??overview.appType??overview.nAppType??overview.type);
    if(type===1073741824)return true;
  }
  // Valve allocates Steam shortcut 32-bit IDs with the high bit set.
  // Do not assume arbitrary 64-bit numbers are shortcuts.
  return Number.isSafeInteger(n)&&n>=0x80000000&&n<=0xffffffff;
}
function nonSteamOverviewStore(doc){
  return doc?.defaultView?.appStore||globalThis.appStore||null;
}
/** Filter ONLY non-Steam descriptions away from the existing 0.9.4 adapter.
 * With Steam-only saves, return the ORIGINAL snapshot object unchanged. */
export function steamOnlyDescriptionState(state,store=null){
  if(state?.description_position!=='game_info'||!state?.descriptions)return state;
  const entries=Object.entries(state.descriptions);
  if(!entries.some(([id])=>isNativeSteamShortcutApp(id,store)))return state;
  return {...state,descriptions:Object.fromEntries(entries.filter(([id])=>
    !isNativeSteamShortcutApp(id,store)))};
}
/** The English default token is known from SteamTracking's Valve localization
 * files. We match a leaf belonging to Steam's fallback, never a random
 * paragraph containing the words 'non-Steam'. Fail closed on other layouts or
 * translations instead of hiding arbitrary Steam UI text. */
export function isNonSteamFallbackMessage(text){
  const value=String(text||'').replace(/\s+/g,' ').trim();
  return /^Some detailed information on .{1,300} is unavailable because it is a non-Steam (?:game or mod|mod or shortcut|OpenVR application)/i.test(value)
    &&/Steam will still manage launching/i.test(value);
}
function getNonSteamMessageLeaf(root){
  if(!root?.querySelectorAll)return null;
  const candidates=[];
  try{
    for(const el of root.querySelectorAll('p, div, span, section, article')||[]){
      if(el.closest?.('[data-titledeck-ui], [data-titledeck-nonsteam-description]'))continue;
      if(!isNonSteamFallbackMessage(el.textContent))continue;
      // The innermost qualifying node holds ONLY Steam's explanatory text.
      const descendants=el.querySelectorAll?.('p, div, span, section, article')||[];
      if(Array.from(descendants).some(d=>isNonSteamFallbackMessage(d.textContent)))continue;
      if((el.querySelectorAll?.('img, button, a, input')||[]).length)continue;
      candidates.push(el);
    }
  }catch{return null}
  return candidates.length===1?candidates[0]:null;
}
function locateNonSteamArtwork(root,message){
  let best=null,bestScore=Infinity;
  try{
    const textBox=message.getBoundingClientRect?.();
    for(const img of root.querySelectorAll('img')||[]){
      if(img.closest?.('[data-titledeck-ui], [data-titledeck-nonsteam-description]'))continue;
      const box=img.getBoundingClientRect?.();
      if(!box||box.width<70||box.width>450||box.height<100||box.height>700)continue;
      if(box.height/box.width<0.8)continue; // Reject banners and small icons.
      if(!textBox||box.top<textBox.top-200||box.top>textBox.bottom+650)continue;
      const score=Math.abs(box.top-(textBox?.bottom||box.top))+
        (box.width>280?300:0);
      if(score<bestScore){best={img,box};bestScore=score}
    }
  }catch{return null}
  return best;
}
function originalInlineStyle(el,name){
  const style=el?.style;
  return {value:style?.getPropertyValue?.(name)??'',priority:style?.getPropertyPriority?.(name)??''};
}
function restoreInlineStyle(el,name,saved){
  const style=el?.style;if(!style||!saved)return;
  try{if(saved.value)style.setProperty(name,saved.value,saved.priority);else style.removeProperty(name)}catch{}
}
// Appearance settings are frontend-only and cannot mutate the Steam library or
// another Decky plugin. Stored as an independent preference (not title data).
export const TITLEDECK_COLOR_SWATCHES=Object.freeze([
  ['Wine','#8B1E3F'],['Rose','#BA3B65'],['Crimson','#C02C43'],['Copper','#B35A31'],
  ['Amber','#D18A32'],['Forest','#238568'],['Emerald','#29A26E'],['Ocean','#267EAA'],
  ['Steam Blue','#3267A3'],['Indigo','#5A56C7'],['Royal Purple','#8251B7'],['Slate','#638293']
]);
export const TITLEDECK_ACCENTS=Object.freeze({
  wine:{name:'Wine Red',main:'#902e4b',dark:'#47202f',bright:'#ffc0ce',border:'#cf7791'},
  blue:{name:'Steam Blue',main:'#276a9c',dark:'#203e5a',bright:'#c5e9ff',border:'#70b5dd'},
  green:{name:'Emerald',main:'#18765f',dark:'#183d38',bright:'#c2ffe1',border:'#6fc6a3'},
  purple:{name:'Royal Purple',main:'#7150ac',dark:'#322848',bright:'#e5d6ff',border:'#bca0ec'},
  gold:{name:'Amber',main:'#966020',dark:'#49371e',bright:'#fff0c2',border:'#dfad63'}
});
/** Saturation/brightness picker: 12 hues x 8 saturation columns x 6 brightness rows.
 * Colors are computed, not a renamed copy of the existing fixed presets. */
export function hsvPickerHex(hue,saturation,value){
  const h=((Number(hue)%360)+360)%360,s=Math.max(0,Math.min(1,Number(saturation))),v=Math.max(0,Math.min(1,Number(value)));
  const c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c;
  const [r,g,b]=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];
  return '#'+[r,g,b].map(n=>Math.round((n+m)*255).toString(16).padStart(2,'0')).join('').toUpperCase();
}
/** Continuous color editor: unlike a sampled palette, this reaches every RGB shade.
 * The square supports touch/mouse dragging, D-pad nudges and exact RGB steps. */
export function rgbOfHex(hex){
  if(!/^#[0-9a-f]{6}$/i.test(String(hex||'')))return [139,30,63];
  return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
}
export function hexOfRgb(rgb){
  return '#'+rgb.map(n=>Math.max(0,Math.min(255,Math.round(Number(n)||0))).toString(16).padStart(2,'0')).join('').toUpperCase();
}
export function hsvOfHex(hex){
  const [r,g,b]=rgbOfHex(hex).map(v=>v/255),max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min;
  let hue=0;
  if(delta>0){if(max===r)hue=60*((g-b)/delta%6);else if(max===g)hue=60*((b-r)/delta+2);else hue=60*((r-g)/delta+4)}
  return {hue:(hue+360)%360,saturation:max===0?0:delta/max,value:max};
}
export function nudgeHexChannel(hex,channel,delta){
  const rgb=rgbOfHex(hex);if(![0,1,2].includes(channel))return hexOfRgb(rgb);
  rgb[channel]=Math.max(0,Math.min(255,rgb[channel]+Number(delta||0)));
  return hexOfRgb(rgb);
}
export function pointToHsv(hue,x,y){
  return hsvPickerHex(hue,Math.max(0,Math.min(1,x)),1-Math.max(0,Math.min(1,y)));
}
export function pickerGridColor(hue,index){
  const col=index%8,row=Math.floor(index/8);
  return hsvPickerHex(hue,0.2+col*0.8/7,1-row*0.78/5);
}
/** When the controller is on a mixer bar, Up/Down must leave that bar.
 * The optional shade-edit mode captures directions ONLY while explicitly enabled. */
export function pickerMixerRoute(axis,d,adjusting=false){
  if(![9,10,11,12].includes(d))return null;
  if(axis==='hue')return d===9?'picker-cancel':d===10?'picker-sv-field':null;
  if(axis==='square'&&!adjusting)return d===9?'picker-hue-strip':d===10?'picker-rgb-0-minus':null;
  return null;
}
export function pickerRgbRoute(key,d){
  const m=/^picker-rgb-([012])-(minus|plus)$/.exec(String(key||''));
  if(!m||![9,10,11,12].includes(d))return null;
  const channel=Number(m[1]),side=m[2];
  if(d===9)return channel===0?'picker-sv-field':`picker-rgb-${channel-1}-${side}`;
  if(d===10)return channel===2?'picker-hue-0':`picker-rgb-${channel+1}-${side}`;
  if(d===11)return `picker-rgb-${channel}-minus`;
  return `picker-rgb-${channel}-plus`;
}
export function pickerMove(key,d){
  if(![9,10,11,12].includes(d))return null;
  if(key==='picker-cancel'||key==='picker-apply')return d===11?'picker-cancel':d===12?'picker-apply':d===9?'picker-cell-40':null;
  if(key.startsWith('picker-hue-')){
    const n=Number(key.slice(11));
    if(d===11)return 'picker-hue-'+Math.max(0,n-1);
    if(d===12)return 'picker-hue-'+Math.min(11,n+1);
    if(d===10)return 'picker-cell-'+Math.min(7,Math.floor(n*8/12));
    return 'picker-rgb-2-plus';
  }
  if(key.startsWith('picker-cell-')){
    const n=Number(key.slice(12)),col=n%8,row=Math.floor(n/8);
    if(d===9)return row===0?'picker-hue-'+Math.min(11,Math.floor(col*12/8)):'picker-cell-'+(n-8);
    if(d===10)return row===5?'picker-apply':'picker-cell-'+(n+8);
    if(d===11)return 'picker-cell-'+(Math.max(0,col-1)+8*row);
    if(d===12)return 'picker-cell-'+(Math.min(7,col+1)+8*row);
  }
  return null;
}
const ACCENT_STORE='titledeck.accent.v1',SCROLL_STORE='titledeck.right_stick_scroll.v1';
export function validAccent(choice){
  const raw=String(choice||'').trim().toLowerCase();
  return Object.hasOwn(TITLEDECK_ACCENTS,raw)||/^#[0-9a-f]{6}$/.test(raw)?raw:'wine';
}
function readPreference(key,fallback){try{return globalThis.localStorage?.getItem(key)||fallback}catch{return fallback}}
function writePreference(key,value){try{globalThis.localStorage?.setItem(key,value)}catch{}}
export function readControllerScrollSetting(){return readPreference(SCROLL_STORE,'on')!=='off'}
export function themeColors(choice){
  const key=validAccent(choice);
  const basic=TITLEDECK_ACCENTS[key]||
    {name:'Custom '+key.toUpperCase(),main:key,dark:'#292630',bright:'#fff1f5',border:key};
  // Derive ALL manager surfaces from the selected accent, not just outlines.
  // Palette math yields fixed six-digit hex values, compatible with Steam CEF.
  const mix=(a,b,t)=>{
    const A=a.match(/[\da-f]{2}/gi)||[],B=b.match(/[\da-f]{2}/gi)||[];
    if(A.length!==3||B.length!==3)return '#21151e';
    return '#'+A.map((v,i)=>Math.round(parseInt(v,16)*t+parseInt(B[i],16)*(1-t))
      .toString(16).padStart(2,'0')).join('');
  };
  return {...basic,
    backdrop:mix(basic.main,'#100b13',.54),
    surface:mix(basic.main,'#211822',.54),
    raised:mix(basic.main,'#33202c',.63),
    tile:mix(basic.main,'#241b27',.42),
    inset:mix(basic.main,'#130f18',.31),
    muted:mix(basic.bright,'#a5a3af',.48)};
}
/** Controller scrolling uses existing scroll containers. Nothing is added to
 * Steam's game page, and no buttons are rebound globally. */
export function normalizedRightStickY(sample){
  if(!sample||typeof sample!=='object')return 0;
  let value;
  if(Array.isArray(sample.axes))value=sample.axes[3];
  else if(typeof sample.sRightStickY==='number')value=-sample.sRightStickY; // Steam's signed Y axis increases upward.
  else for(const key of ['flRightStickY','fRightStickY','rStickY','rightStickY','flRightY','fRightY','sJoystickRightY']){
    if(typeof sample[key]==='number'){value=sample[key];break}
  }
  if(!Number.isFinite(value))return 0;
  // Steam Input versions can return signed 16-bit stick coordinates.
  if(Math.abs(value)>1)value=value/32767;
  value=Math.max(-1,Math.min(1,value));
  return Math.abs(value)<0.19?0:Math.sign(value)*((Math.abs(value)-0.19)/0.81);
}
export function findScrollableGameInfo(element){
  if(!element)return null;
  const doc=element.ownerDocument,win=doc?.defaultView;
  for(let node=element.parentElement,depth=0;node&&depth<24;node=node.parentElement,depth++){
    const height=Number(node.scrollHeight)||0,viewport=Number(node.clientHeight)||0;
    if(height<=viewport+12||viewport<50)continue;
    let overflow='';try{const st=win?.getComputedStyle?.(node);overflow=st?.overflowY||st?.overflow||''}catch{}
    if(/auto|scroll|overlay/i.test(overflow))return node;
  }
  const scrolling=doc?.scrollingElement;
  if(scrolling&&scrolling.scrollHeight>scrolling.clientHeight+12)return scrolling;
  // CEF/Steam can scroll a masked container without labeling its overflow.
  for(let node=element.parentElement,depth=0;node&&depth<24;node=node.parentElement,depth++)
    if(node.scrollHeight>node.clientHeight+20&&node.clientHeight>100)return node;
  return null;
}
/** Move only an actual Game Info scroll surface. A successful property write
 * is not proof that Steam moved: hidden, clipped or boundary containers can
 * accept scrollTop assignments while remaining stationary. Try the verified
 * nearest candidate first, then other ancestors and the document scroller. */
export function scrollGameInfoElementByStick(element,amount){
  if(!element||!Number.isFinite(amount)||Math.abs(amount)<0.01)return false;
  const doc=element.ownerDocument,win=doc?.defaultView,candidates=[];
  const add=node=>{if(node&&!candidates.includes(node))candidates.push(node)};
  add(findScrollableGameInfo(element));
  for(let node=element.parentElement,depth=0;node&&depth<24;node=node.parentElement,depth++){
    if(Number(node.scrollHeight)>Number(node.clientHeight)+12&&Number(node.clientHeight)>=50){
      let overflow='';try{const style=win?.getComputedStyle?.(node);overflow=style?.overflowY||style?.overflow||''}catch{}
      if(/auto|scroll|overlay/i.test(overflow)||!overflow||overflow==='visible')add(node);
    }
  }
  add(doc?.scrollingElement);
  for(const target of candidates){
    const height=Number(target.scrollHeight)||0,viewport=Number(target.clientHeight)||0;
    if(height<=viewport+12||viewport<50)continue;
    const before=Number(target.scrollTop)||0;
    const desired=Math.max(0,Math.min(height-viewport,before+amount*25));
    if(Math.abs(desired-before)<0.5)continue;
    try{target.scrollTop=desired}catch{continue}
    if(Math.abs((Number(target.scrollTop)||0)-before)>0.5)return true;
  }
  return false;
}
/** Separate lifecycle, observers, and DOM ownership for NON-STEAM only. */
export function createNonSteamGameInfoAdapter(host,getState,getDocuments=()=>[],getStore=nonSteamOverviewStore){
  // 0.9.7: Never hide Valve's native paragraph behind a custom overlay.
  // The native text element is already painted in the correct Steam layer;
  // a separate absolutely-positioned node was intermittently hidden by
  // Steam's tab re-renders. Keep the same node, replace ONLY a plain-text
  // leaf, and preserve its original text and inline CSS for full restoration.
  const current=new Map(),watchers=[],listeners=[],transitions=new Set(),paintGuards=new Map();
  let stopped=false,pending=null,ticker=null,status='Waiting for non-Steam Game Info';
  // 0.9.9: React owns the fallback text node and may rewrite it after TitleDeck
  // has already repaired it. A mutation callback alone does NOT guarantee a
  // paint free of generic text. Keep a non-Steam-only CSS-generated rendering
  // attached to that SAME native element. Even if React changes textContent,
  // the custom text remains the only visually rendered text until restoration.
  const PAINT_ATTRIBUTE='data-titledeck-nonsteam-live';
  const LAYOUT_ATTRIBUTE='data-titledeck-nonsteam-side-by-side';
  const GHOST_ATTRIBUTE='data-titledeck-native-ghost-art';
  const PAINT_STYLES=`
    [data-titledeck-nonsteam-live] {
      font-size:0 !important;
      line-height:0 !important;
      color:transparent !important;
      text-shadow:none !important;
    }
    [data-titledeck-nonsteam-live]::before {
      content:attr(data-titledeck-nonsteam-live);
      display:block;
      color:var(--td-nonsteam-color,#293241) !important;
      font-size:var(--td-nonsteam-font,14px) !important;
      line-height:var(--td-nonsteam-line,normal) !important;
      font-family:inherit;
      font-weight:inherit;
      letter-spacing:inherit;
      text-align:inherit;
      white-space:pre-wrap;
      overflow-wrap:anywhere;
      pointer-events:none;
    }
    /* 0.9.14: Steam's non-Steam Game Info has a vertical description and
       poster, often separated by unrelated React wrappers. Build the ONLY
       presentation row on the already verified native description element.
       This avoids grid placement on Steam-owned common ancestors. */
    [data-titledeck-nonsteam-live][data-titledeck-nonsteam-side-by-side] {
      display:grid !important;
      grid-template-columns:minmax(105px,180px) minmax(0,1fr) !important;
      grid-template-rows:auto !important;
      align-items:start !important;
      column-gap:16px !important;
      width:100% !important;
      min-width:0 !important;
      max-width:100% !important;
      height:auto !important;
      box-sizing:border-box !important;
    }
    [data-titledeck-nonsteam-live][data-titledeck-nonsteam-side-by-side]::before {
      grid-column:2 !important;
      grid-row:1 !important;
      min-width:0 !important;
      max-height:none !important;
      overflow:visible !important;
      pointer-events:auto !important;
    }
    [data-titledeck-native-ghost-art="1"],
    [data-titledeck-native-ghost-art="1"]::before,
    [data-titledeck-native-ghost-art="1"]::after {
      display:none !important;content:none !important; min-width:0 !important; min-height:0 !important;
      width:0 !important; height:0 !important; max-height:0 !important;
      margin:0 !important; padding:0 !important; border:0 !important;
      aspect-ratio:auto !important; visibility:hidden !important;
    }
    [data-titledeck-nonsteam-live][data-titledeck-nonsteam-side-by-side]::after {
      content:'';
      display:block;
      grid-column:1 !important;
      grid-row:1 !important;
      width:100%;
      aspect-ratio:2 / 3;
      min-height:135px;
      background-image:var(--td-nonsteam-poster) !important;
      background-position:top center;
      background-repeat:no-repeat;
      background-size:contain;
      pointer-events:none;
    }`;
  function ensurePaintGuard(doc){
    const existing=paintGuards.get(doc);
    if(existing?.isConnected)return true;
    try{
      const target=doc.head||doc.documentElement;
      if(!target?.appendChild||!doc.createElement)return false;
      const style=doc.createElement('style');
      style.setAttribute('data-titledeck-nonsteam-style','');
      style.textContent=PAINT_STYLES;
      target.appendChild(style);
      paintGuards.set(doc,style);
      return true;
    }catch{return false}
  }
  function showGuard(record,text){
    const message=record.message,doc=message?.ownerDocument;
    if(!message||!ensurePaintGuard(doc)||typeof message.setAttribute!=='function')return false;
    try{
      // Use the pre-overridden native typography, NOT the zero-size CSS text.
      // Applying attributes first also prevents a generic-text interval when
      // the ordinary React-owned text node is rewritten after this callback.
      const vars=[['--td-nonsteam-color',record.nativeColor],
        ['--td-nonsteam-font',record.nativeFont],['--td-nonsteam-line',record.nativeLine]];
      for(const [key,value] of vars)if(value)message.style.setProperty(key,value);
      if(message.getAttribute(PAINT_ATTRIBUTE)!==text)message.setAttribute(PAINT_ATTRIBUTE,text);
      return message.getAttribute(PAINT_ATTRIBUTE)===text;
    }catch{return false}
  }
  function clearGuard(record){
    const message=record?.message;
    try{message?.removeAttribute?.(PAINT_ATTRIBUTE);message?.removeAttribute?.(LAYOUT_ATTRIBUTE)}catch{}
    for(const name of ['--td-nonsteam-color','--td-nonsteam-font','--td-nonsteam-line','--td-nonsteam-poster'])
      restoreInlineStyle(message,name,record?.originalPaintVars?.[name]);
  }
  const touchedStyles=['position','left','top','width','height','min-width','max-width','max-height','z-index','display',
    'visibility','opacity','white-space','overflow-wrap','overflow-y','box-sizing','margin',
    'padding','color','pointer-events','scrollbar-width','overscroll-behavior'];
  const docs=()=>{
    const all=new Set(),add=d=>{if(d?.querySelectorAll&&d?.documentElement)all.add(d)};
    add(host);try{for(const d of getDocuments()||[])add(d)}catch{}
    return [...all];
  };
  const routeId=doc=>steamLibraryRouteId(doc.defaultView?.location)||steamLibraryRouteId(globalThis.location);
  function plainTextLeaf(message){
    // Do not remove React-owned child components. Steam's fallback is a
    // plain-text leaf; refuse unknown nested markup rather than damaging it.
    if((message?.childElementCount||0)>0)return false;
    const nodes=message?.childNodes;
    if(nodes&&nodes.length>1)return false;
    if(nodes?.length&&nodes[0]?.nodeType!==3)return false;
    return Boolean(message&&typeof message.textContent==='string');
  }
  function replaceText(message,value){
    if(!plainTextLeaf(message))return false;
    try{
      // Avoid new characterData records for an already correct Steam paragraph.
      // With pre-paint MutationObserver recovery, even writing the same value
      // can cause a loop of unnecessary observer callbacks.
      if(message.textContent===value)return true;
      const node=message.firstChild;
      if(node?.nodeType===3)node.nodeValue=value;
      else message.textContent=value;
      return message.textContent===value;
    }catch{return false}
  }
  function visible(el){
    if(!el?.isConnected||el.offsetParent===null)return false;
    try{
      const win=el.ownerDocument?.defaultView;
      let node=el;
      for(let depth=0;node&&depth<12;node=node.parentElement,depth++){
        const css=win?.getComputedStyle?.(node);
        if(css?.display==='none'||css?.visibility==='hidden'||css?.visibility==='collapse'||
           css?.opacity==='0'||node.getAttribute?.('aria-hidden')==='true'||node.hidden)return false;
      }
      const rect=el.getBoundingClientRect?.();
      if(rect&&(rect.width<2||rect.height<2))return false;
    }catch{return false}
    return true;
  }
  // Only the non-Steam Proton line is eligible for bottom alignment. Avoid
  // applying any global layout changes to the Steam Game Info surface.
  function locateProtonLine(root){
    let choices=[];
    try{choices=Array.from(root.querySelectorAll('div,p,span'))}catch{return null}
    const matches=choices.filter(el=>{
      const value=String(el.textContent||'').replace(/\s+/g,' ').trim();
      return value.length<280&&value.length>35&&
        /runs on this computer via Steam Play/i.test(value)&&
        /selected by you for this title|selected by Valve testing|proton/i.test(value);
    });
    return matches.sort((a,b)=>String(a.textContent||'').length-String(b.textContent||'').length)[0]||null;
  }
  // 1.0.3: Proton belongs to Steam's normal scrollable document. Version
  // 1.0.2 used CSS translate at scroll-end; transforms do not increase
  // scrollHeight, so the line could be pushed below the last reachable frame.
  // Leave it in normal flow. Hiding the redundant artwork *container* now
  // recovers the wasted room without moving this important compatibility text.
  function alignProtonFooter(record){
    if(!record?.message?.isConnected)return false;
    // Recover a 1.0.2 style if the route is still live during an upgrade.
    if(record.footerNode){restoreInlineStyle(record.footerNode,'translate',record.footerSaved);}
    record.footerShift=0;
    return false;
  }
  function restoreProtonFooter(record){
    try{record?.footerScroller?.removeEventListener?.('scroll',record?.footerListener)}catch{}
    restoreInlineStyle(record?.footerNode,'translate',record?.footerSaved);
    if(record){record.footerShift=0;record.footerScroller=null;record.footerNode=null;}
  }
  function restoreRecord(doc){
    const record=current.get(doc);if(!record)return;
    const {message,originalText,originalMessageStyle}=record;
    restoreProtonFooter(record);
    clearGuard(record); // Reveal native text BEFORE restoring its contents/position.
    // If React reused the node for another shortcut and has already replaced
    // our words with new content, don't overwrite that game's text.
    if(message?.isConnected&&message.textContent===record.text)
      replaceText(message,originalText);
    else if(!message?.isConnected&&message?.textContent===record.text)
      replaceText(message,originalText);
    for(const [name,style] of Object.entries(originalMessageStyle))
      restoreInlineStyle(message,name,style);
    restoreGrid(record);
    current.delete(doc);
  }
  // Stable, in-flow layout: Never make the React-owned description absolute.
  // Absolute cover-relative pixel coordinates in 0.9.10/11 moved whenever
  // Steam rebuilt its artwork or the page briefly became hidden. This was
  // confirmed by the user on real Steam Deck hardware.
  function directChildOf(ancestor,descendant){
    let node=descendant;
    for(let depth=0;node?.parentElement&&depth<12;depth++){
      if(node.parentElement===ancestor)return node;
      node=node.parentElement;
    }
    return null;
  }
  // The native non-Steam Game Info DOM is vertically stacked. The cover can
  // live in another React wrapper several levels away from the message.
  // Older CSS-grid placement depended on those wrappers being siblings and
  // silently failed on the real Deck. We instead visually mirror the existing
  // cover INSIDE the original fallback paragraph (which we already own for
  // text replacement), then collapse ONLY the original isolated artwork
  // element. No React-owned DOM nodes are moved or cloned into Steam's tree.
  const safePosterUrl=img=>{
    let url='';
    try{url=String(img?.currentSrc||img?.getAttribute?.('src')||img?.src||'').trim()}catch{}
    // CSS background-image cannot display a source that isn't a URL. Fail
    // closed, rather than blanking a user's custom artwork. Include local
    // Steam CDN/library resources and data/blob image URLs where present.
    if(!/^(?:https?:|file:|steam:|blob:|data:image\/|\/)/i.test(url))return '';
    if(url.length>200000)return '';
    return url;
  };
  function isolatedPosterElement(root,img,message){
    if(!img?.isConnected||!root?.contains?.(img))return null;
    // 1.0: the 0.9.14 image-only display:none left an empty Steam poster
    // wrapper underneath the description. Collapse an ancestor only when its
    // entire subtree is JUST this poster. Never hide Proton, metadata, or an
    // ancestor of the native fallback message. Do not move React-owned nodes.
    let best=img,node=img;
    for(let depth=0;depth<9;depth++){
      const parent=node.parentElement;
      if(!parent||parent===root||!root.contains?.(parent)||
         parent.contains?.(message)||/^(?:BUTTON)$/i.test(parent.tagName||''))break;
      const images=Array.from(parent.querySelectorAll?.('img')||[]);
      if(images.length!==1||images[0]!==img)break;
      // Steam may put the cover next to EMPTY decorative elements inside a
      // wrapper. Hiding only the <img> leaves an empty portrait-sized card.
      // Allow inert, textless siblings, but never another image, controls,
      // live description, badges, or Proton metadata.
      // Steam's decorative SVG art border may have a <title> child for
      // accessibility. That text is not Game Info content and must not
      // prevent collapsing an otherwise empty original poster wrapper.
      const hasVisibleContent=el=>{
        if(!el)return false;
        const name=String(el.tagName||'').toUpperCase();
        if(['SVG','TITLE','DESC','STYLE','SCRIPT'].includes(name))return false;
        for(const child of Array.from(el.childNodes||[])){
          if(child.nodeType===3&&String(child.nodeValue||'').trim())return true;
          if(child.nodeType===1&&hasVisibleContent(child))return true;
        }
        // Test doubles and unusual DOMs without childNodes: retain a safe
        // text-only guard, except SVGs which are decorative by definition.
        if(!el.childNodes&&String(el.textContent||'').trim())return true;
        return false;
      };
      if(hasVisibleContent(parent))break;
      // A poster may itself be wrapped in a link. That is safe to hide with
      // the duplicate poster if it contains ONLY this art and no link text.
      const controls=Array.from(parent.querySelectorAll?.('button, a, input, textarea, video, iframe, [role="button"], [data-titledeck-nonsteam-live]')||[]);
      if(controls.some(el=>!(String(el.tagName||'').toUpperCase()==='A'&&
           el.contains?.(img)&&!String(el.textContent||'').trim())))break;
      const descendants=Array.from(parent.querySelectorAll?.('*')||[]);
      // Decorative vector borders and image-loading chrome may be nested
      // beside the poster in Valve's live layout. Excluding every SVG stopped
      // traversal at the IMG, leaving the empty portrait-shaped outer card.
      // Refuse meaningful controls, a second image, canvas, accessible SVG
      // actions, and any actual text. Only suppress a fully artwork-owned arm.
      if(descendants.some(el=>/^(?:canvas|video|iframe)$/i.test(el.tagName||'')||
           (/^svg$/i.test(el.tagName||'')&&
             (el.hasAttribute?.('tabindex')||el.getAttribute?.('role')==='button'||
              el.getAttribute?.('aria-label')))))break;
      const siblings=Array.from(parent.children||[]).filter(el=>el!==node);
      if(siblings.some(el=>hasVisibleContent(el) ||
           (el.querySelectorAll?.('img, canvas, button, a, input, textarea, video, iframe, [role="button"]')||[]).length))break;
      // Reject a large empty section that happens to contain one image.
      try{
        const outer=parent.getBoundingClientRect?.(),poster=img.getBoundingClientRect?.();
        if(outer&&poster&&poster.width>20&&poster.height>20&&
          (outer.width>Math.max(550,poster.width*3)||outer.height>Math.max(650,poster.height*3)))break;
      }catch{}
      best=parent;node=parent;
    }
    return best;
  }
  /** 1.1.1: The Steam Deck diagnostic identified a distinct, full-width
   * artwork-only GRID (828x198) around the hidden native poster. Find that
   * row independently of the 0.9.14 artwork selection. Never promote the
   * grid into gridArtChild: doing so changes the native-cover identity on
   * subsequent React renders and can drop the side-by-side presentation.
   * This cleanup is ONLY armed after a valid CSS poster source is ready. */
  function findNativePosterGridRow(root,art,message){
    if(!root?.contains?.(art)||!art?.isConnected)return null;
    let child=art;
    for(let depth=0;child?.parentElement&&depth<9;depth++){
      const parent=child.parentElement;
      if(parent===root||parent.contains?.(message))break;
      const css=parent.ownerDocument?.defaultView?.getComputedStyle?.(parent);
      const rect=parent.getBoundingClientRect?.();
      const narrow=child.getBoundingClientRect?.();
      if(css?.display==='grid'&&rect&&narrow&&
         rect.width>=450&&rect.width<=1800&&rect.height>=100&&rect.height<=410&&
         narrow.width>=55&&narrow.width<=330&&narrow.height>=85&&narrow.height<=410&&
         narrow.width<rect.width*0.65){
        if(String(parent.textContent||'').trim())return null;
        const imgs=Array.from(parent.querySelectorAll?.('img')||[]);
        if(imgs.length!==1||imgs[0]!==art)return null;
        const controls=Array.from(parent.querySelectorAll?.('button, input, textarea, select, iframe, video, [role="button"]')||[]);
        const hasVisibleControl=controls.some(el=>{
          if(String(el.tagName||el.tag||'').toUpperCase()!=='INPUT')return true;
          const style=el.ownerDocument?.defaultView?.getComputedStyle?.(el);
          return !(el.hidden||String(el.getAttribute?.('type')||el.type||'').toLowerCase()==='hidden'||
            el.getAttribute?.('aria-hidden')==='true'||style?.display==='none'||style?.visibility==='hidden');
        });
        if(hasVisibleControl)return null;
        return parent;
      }
      child=parent;
    }
    return null;
  }
  function restoreGrid(record){
    // Restores ALL CSS values owned by the side-by-side presentation. It does
    // not change the original text. Original paragraph restoration happens in
    // restoreRecord, including Valve's fallback text.
    for(const {el,old} of record?.gridStyles||[])
      for(const [name,saved] of Object.entries(old))restoreInlineStyle(el,name,saved);
    try{record?.gridGhostNodes?.forEach?.(node=>node.removeAttribute?.(GHOST_ATTRIBUTE))}catch{}
    if(record){record.gridGhostNodes=[];record.message?.removeAttribute?.(LAYOUT_ATTRIBUTE);record.gridStyles=[];record.gridAnchor=null;record.gridArtChild=null;record.gridTextChild=null;record.nativePosterGrid=null}
  }
  function gridRemember(record,el,name,value){
    let entry=record.gridStyles.find(e=>e.el===el);
    if(!entry){entry={el,old:{}};record.gridStyles.push(entry)}
    if(!(name in entry.old))entry.old[name]=originalInlineStyle(el,name);
    if(el.style?.getPropertyValue?.(name)!==value)
      el.style?.setProperty?.(name,value,'important');
  }
  // Steam may put the original poster and the Steam Play/Proton sentence in
  // ONE container. Hiding its <img> does not remove a fixed-height poster slot
  // supplied by the parent. Find the smallest shared ancestor for that pair,
  // and release its poster sizing without hiding or moving the Proton text.
  // This is intentionally skipped when the shared ancestor also owns the
  // custom Game Info paragraph, controls, or other game details.
  /** If Steam keeps a fixed portrait placeholder in a wrapper that ALSO
   * contains the Steam Play row, collapse the dedicated artwork branch rather
   * than hiding or translating the Proton row. Unlike geometry-only matching,
   * this follows the actual image-to-Proton ancestry and does not depend on
   * scrolling coordinates or where the description happens to start. */
  function collapseNativePosterBranch(record,art,footer){
    const root=record?.root,message=record?.message;
    if(!root||!art||!footer)return false;
    let group=footer.parentElement;
    for(let depth=0;group&&depth<9;depth++,group=group.parentElement){
      if(group===root||group.contains?.(message))break;
      if(!group.contains?.(art))continue;
      let branch=art;
      while(branch.parentElement&&branch.parentElement!==group)branch=branch.parentElement;
      if(branch===group||branch.contains?.(footer)||branch.contains?.(message))return false;
      const images=Array.from(branch.querySelectorAll?.('img')||[]);
      if(images.some(img=>img!==art))return false;
      if(branch.querySelectorAll?.('button,input,textarea,iframe,video,[role="button"]')?.length)return false;
      const withoutSvg=String(branch.textContent||'').trim();
      if(withoutSvg.length>0)return false;
      if(!record.gridGhostNodes)record.gridGhostNodes=[];
      gridRemember(record,branch,'display','none');
      branch.setAttribute?.(GHOST_ATTRIBUTE,'1');
      if(!record.gridGhostNodes.includes(branch))record.gridGhostNodes.push(branch);
      return true;
    }
    return false;
  }
  function releaseArtProtonSlot(record,art){
    const root=record?.root,message=record?.message;
    if(!root?.querySelectorAll||!art?.isConnected)return false;
    let footer=null;
    try{
      const items=Array.from(root.querySelectorAll('p, div, span')||[]);
      footer=items.find(el=>{
        const text=String(el.textContent||'').replace(/\s+/g,' ').trim();
        if(!/^Runs on this computer via Steam Play\b/i.test(text))return false;
        if(text.length>400||el.contains?.(message))return false;
        return !Array.from(el.children||[]).some(child=>
          /^Runs on this computer via Steam Play\b/i.test(String(child.textContent||'').trim()));
      });
    }catch{return false}
    if(!footer)return false;
    // A shared wrapper often contains an artwork-only child and separate
    // Proton child. Remove the artwork child, not the entire group.
    const structural=collapseNativePosterBranch(record,art,footer);
    let group=footer.parentElement;
    for(let d=0;group&&d<7;d++,group=group.parentElement){
      if(group===root||group.contains?.(message))break;
      if(!group.contains?.(art))continue;
      // Exclude metadata, links, controller actions and other original images.
      if(Array.from(group.querySelectorAll?.('button, input, textarea, iframe, video, [role="button"]')||[]).length)break;
      if(Array.from(group.querySelectorAll?.('img')||[]).some(other=>other!==art))break;
      const text=String(group.textContent||'').replace(/\s+/g,' ').trim();
      if(!/^Runs on this computer via Steam Play\b/i.test(text)||text.length>400)break;
      for(const [name,value] of [
        ['min-height','0px'],['height','auto'],['aspect-ratio','auto'],
        ['background-image','none'],['box-shadow','none'],
        ['margin-bottom','0px'],['padding-bottom','0px']]){
        gridRemember(record,group,name,value);
      }
      return true;
    }
    return structural;
  }
  /** A SteamUI skin can draw ANOTHER empty portrait slot after its actual
   * poster has been hidden. The 1.0.5 parent-chain cleanup cannot find this
   * separate sibling. Locate only content-free poster-sized boxes below the
   * active description, near (but NEVER including) the Proton information.
   * All changes are recorded in gridStyles and restored with the override. */
  function collapseDetachedGhostSlot(record){
    const {root,message}=record;
    if(!root?.querySelectorAll||!message?.getBoundingClientRect)return 0;
    const own=message.getBoundingClientRect();
    if(!own||own.width<200)return 0;
    let proton=null;
    for(const el of Array.from(root.querySelectorAll('p,span,div')||[])){
      const text=String(el.textContent||'').replace(/\s+/g,' ').trim();
      if(!/^Runs on this computer via Steam Play\b/i.test(text)||text.length>450)continue;
      if(Array.from(el.children||[]).some(ch=>/^Runs on this computer via Steam Play\b/i.test(String(ch.textContent||'').trim())))continue;
      proton=el;break;
    }
    const protonRect=proton?.getBoundingClientRect?.();
    if(!protonRect||!Number.isFinite(protonRect.top))return 0;
    const hidden=new Set(record.gridGhostNodes||[]);
    let best=null,bestArea=0;
    const elems=Array.from(root.querySelectorAll('div,figure,section,article,img')||[]).slice(0,900);
    for(const el of elems){
      if(!el?.isConnected||el===root||el===message||el.contains?.(message)||el.contains?.(proton)||
         hidden.has(el)||el.hasAttribute?.(GHOST_ATTRIBUTE))continue;
      const name=String(el.className||'');
      if(/(?:button|toolbar|nav|header|footer|achievement|compat|proton)/i.test(name))continue;
      if(String(el.textContent||'').trim()||el.querySelectorAll?.('button,input,textarea,iframe,video,canvas,[role="button"]')?.length)continue;
      const imgs=String(el.tagName||'').toUpperCase()==='IMG'?[el]:Array.from(el.querySelectorAll?.('img')||[]);
      if(imgs.some(img=>img!==record.artwork&&safePosterUrl(img)))continue;
      const r=el.getBoundingClientRect?.();if(!r||r.width<75||r.width>300||r.height<115||r.height>480)continue;
      if(r.height/r.width<1.12||r.height/r.width>2.5)continue;
      // Candidate has to be in the left/poster column, BELOW the active
      // paragraph start and directly before the original Steam Play row.
      // TitleDeck's native paragraph starts to the RIGHT of the poster.
      // The old own.left-70 bound rejected the real ghost LEFT column seen
      // on Deck (the text starts ~250px to the right of the empty poster).
      // Admit either the left poster column or a Steam-native same-column box.
      const posterColumn=(r.right<=own.left+50&&r.right>=own.left-350);
      const nativeColumn=(r.left>=own.left-70&&r.left<=own.left+230);
      if(!(posterColumn||nativeColumn))continue;
      if(r.top<own.top-40||r.top>protonRect.top||
         r.bottom>protonRect.top+60||protonRect.top-r.bottom>320)continue;
      const area=r.width*r.height;if(area>bestArea){best=el;bestArea=area}
    }
    if(!best)return 0;
    gridRemember(record,best,'display','none');
    best.setAttribute?.(GHOST_ATTRIBUTE,'1');
    record.gridGhostNodes.push(best);
    return 1;
  }
  /* MetaDeck uses Steam's description data store rather than moving DOM nodes.
   * TitleDeck deliberately keeps its hardware-verified description renderer.
   * Non-Steam SteamUI sometimes creates a *separate empty artwork slot* as a
   * preceding sibling of the Proton row, with no IMG left inside it. This is
   * a narrower structural fix than scanning all rectangles in the page. */
  function collapseProtonAdjacentGhostSlot(record){
    const {root,message,artwork}=record||{};
    if(!root?.querySelectorAll||!message?.isConnected)return 0;
    const footer=locateProtonLine(root);
    if(!footer?.isConnected)return 0;
    let branch=footer,collapsed=0;
    for(let level=0;level<7&&branch?.parentElement;level++){
      const parent=branch.parentElement;
      if(parent===root||parent.contains?.(message))break;
      const siblings=Array.from(parent.children||[]);
      for(const slot of siblings){
        if(slot===branch||slot===footer||slot===root||slot===message||
           slot.contains?.(message)||slot.contains?.(footer)||
           slot.hasAttribute?.(GHOST_ATTRIBUTE))continue;
        const tag=String(slot.tagName||slot.tag||'').toUpperCase();
        if(!['DIV','SECTION','FIGURE','ARTICLE','SPAN'].includes(tag))continue;
        if(String(slot.textContent||'').trim())continue;
        if(slot.querySelectorAll?.('button,input,textarea,select,iframe,video,canvas,[role="button"],[data-titledeck-nonsteam-live]')?.length)continue;
        const imgs=Array.from(slot.querySelectorAll?.('img')||[]);
        if(imgs.some(img=>img!==artwork&&safePosterUrl(img)))continue;
        // Require evidence that this really is the old poster arm; merely
        // being an empty sibling is insufficient to modify Steam's UI.
        let box=null,styled=null;
        try{box=slot.getBoundingClientRect?.();styled=slot.ownerDocument?.defaultView?.getComputedStyle?.(slot)}catch{}
        const ratio=box?.width>65&&box.width<420&&box.height>100&&box.height<620&&
          box.height/box.width>1.12&&box.height/box.width<2.85;
        const signature=/(?:poster|artwork|cover|capsule|portrait|gameimage|gameart|headerimage)/i.test(
          String(slot.className||'')+' '+String(slot.getAttribute?.('data-testid')||''));
        const childPoster=imgs.includes(artwork)||imgs.some(img=>img===artwork);
        const cssPoster=/^(?:[1-9]\d*|\d*\.[1-9]\d*)\s*\/\s*(?:[1-9]\d*|\d*\.[1-9]\d*)$/.test(String(styled?.aspectRatio||''));
        if(!ratio&&!signature&&!childPoster&&!cssPoster)continue;
        // A detached decorative wrapper can be an empty image placeholder,
        // but never remove Steam's real Proton row or a section with data.
        gridRemember(record,slot,'display','none');
        slot.setAttribute?.(GHOST_ATTRIBUTE,'1');
        if(!record.gridGhostNodes.includes(slot))record.gridGhostNodes.push(slot);
        collapsed++;
      }
      branch=parent;
    }
    return collapsed;
  }
  // A deliberately bounded, text-free Steam DOM snapshot for diagnosing real
  // SteamUI/CSS Loader layouts. No descriptions, filenames or image URLs.
  function captureGhostLayout(){
    const records=[];
    for(const [doc,record] of current){
      if(!record?.root?.isConnected||!record?.message?.isConnected)continue;
      const {root,message,artwork}=record,footer=locateProtonLine(root);
      const seen=new Set(),nodes=[];
      const add=(node,label)=>{
        if(!node||seen.has(node)||nodes.length>=85)return;
        seen.add(node);
        let rect,css;
        try{rect=node.getBoundingClientRect?.();css=node.ownerDocument?.defaultView?.getComputedStyle?.(node)}catch{}
        const fmt=x=>Number.isFinite(Number(x))?Math.round(Number(x)):null;
        nodes.push({label,tag:String(node.tagName||''),cls:String(node.className||'').slice(0,150),
          rect:rect?{x:fmt(rect.x??rect.left),y:fmt(rect.y??rect.top),w:fmt(rect.width),h:fmt(rect.height)}:null,
          css:css?{display:css.display,position:css.position,minHeight:css.minHeight,aspectRatio:css.aspectRatio,
            background:css.backgroundImage&&css.backgroundImage!=='none'?'image':'none'}:null,
          contents:node===message?'description':node===footer?'steam-play':
            node===artwork?'native-image':String(node.textContent||'').trim()?'has-text':'empty',
          ghost:node.getAttribute?.(GHOST_ATTRIBUTE)==='1'});
      };
      add(root,'root');add(message,'custom-description');add(artwork,'original-artwork');add(footer,'steam-play');
      for(const [label,start] of [['poster',artwork],['footer',footer],['description',message]]){
        let node=start;
        for(let depth=0;node&&depth<10;depth++,node=node.parentElement){
          add(node,`${label}-ancestor-${depth}`);
          if(node===root)break;
          for(const child of Array.from(node.parentElement?.children||[]).slice(0,14))
            add(child,`${label}-sibling-level-${depth}`);
        }
      }
      records.push({kind:'nonsteam-game-info',nodes});
    }
    return {format:'titledeck-layout-v1',records};
  }
  function positionNative(record){
    const {root,message}=record;
    if(!root?.isConnected||!message?.isConnected)return false;
    let art=record.artwork;
    if(!art?.isConnected)art=locateNonSteamArtwork(root,message)?.img||null;
    const url=safePosterUrl(art);
    if(!url){
      // No trustworthy source: do not fabricate artwork or hide anything.
      // Continue displaying the saved text in the native Steam layout.
      restoreGrid(record);
      message.removeAttribute?.(LAYOUT_ATTRIBUTE);
      return false;
    }
    // Keep the artwork identity stable across frames. A hidden Steam poster
    // reports 0x0 dimensions; re-running geometry selection on that hidden
    // element can yield a different ancestor and undo the working layout.
    const existing=record.gridArtChild;
    const stable=existing?.isConnected&&root.contains?.(existing)&&
      (existing===art||existing.contains?.(art))&&!existing.contains?.(message);
    const native=stable?existing:isolatedPosterElement(root,art,message);
    if(!native)return false;
    // Keep the grid only as a separate cleanup target, NEVER as the native
    // artwork anchor. Measure it before hiding the source IMG/wrapper.
    const posterGrid=stable?record.nativePosterGrid:findNativePosterGridRow(root,art,message);
    // If Steam replaces the old image, reveal it before hiding the new one.
    if(record.gridArtChild&&record.gridArtChild!==native)restoreGrid(record);
    // Never replace the source IMG reference with its wrapper: React can refresh
    // this layout many times while Community/Game Info changes.
    record.artwork=art;
    const cssUrl=`url(${JSON.stringify(url)})`;
    gridRemember(record,message,'--td-nonsteam-poster',cssUrl);
    if(message.getAttribute?.(LAYOUT_ATTRIBUTE)!=='1')message.setAttribute?.(LAYOUT_ATTRIBUTE,'1');
    // Only collapse the original image after the side-by-side host has been
    // armed with a usable poster source. No style changes to its parent, so
    // Steam Play and other Game Info sections retain their native flow.
    gridRemember(record,native,'display','none');
    if(!record.gridGhostNodes)record.gridGhostNodes=[];
    if(!record.gridGhostNodes.includes(native))record.gridGhostNodes.push(native);
    native.setAttribute?.(GHOST_ATTRIBUTE,'1');
    if(posterGrid?.isConnected&&posterGrid!==native&&
       !posterGrid.contains?.(message)&&root.contains?.(posterGrid)){
      gridRemember(record,posterGrid,'display','none');
      posterGrid.setAttribute?.(GHOST_ATTRIBUTE,'1');
      if(!record.gridGhostNodes.includes(posterGrid))record.gridGhostNodes.push(posterGrid);
      record.nativePosterGrid=posterGrid;
    }
    // Also collapse otherwise empty native art holders left by a React/CSS
    // poster skeleton. Never collapse the root, a paragraph, or any ancestor
    // containing text (including the Proton compatibility row).
    let ghost=native;
    for(let depth=0;depth<4;depth++){
      const outer=ghost.parentElement;
      if(!outer||outer===root||outer.contains?.(message)||!root.contains?.(outer))break;
      const raw=String(outer.textContent||'').trim();
      if(raw||outer.querySelectorAll?.('button, input, textarea, video, iframe, [role="button"]')?.length)break;
      const imgs=Array.from(outer.querySelectorAll?.('img')||[]);
      if(imgs.some(other=>other!==art))break;
      // Do not take a full-width page column when only a narrow poster was
      // duplicated. Its width must be poster-sized relative to the source.
      try{
        const box=outer.getBoundingClientRect?.(),src=art.getBoundingClientRect?.();
        if(box?.width>440||(box?.height>520))break;
        if(src?.width>0&&box?.width>src.width*2.2)break;
      }catch{}
      if(!record.gridGhostNodes.includes(outer))record.gridGhostNodes.push(outer);
      outer.setAttribute?.(GHOST_ATTRIBUTE,'1');
      gridRemember(record,outer,'display','none');
      ghost=outer;
    }
    // An image-only wrapper in some Steam skins retains an explicit poster
    // min-height/aspect-ratio even after its child IMG is hidden. Collapse
    // that same safely-isolated branch, not the enclosing Game Info content.
    for(const name of ['min-height','height','margin-top','margin-bottom','padding-top','padding-bottom'])
      gridRemember(record,native,name,'0px');
    releaseArtProtonSlot(record,art);
    collapseDetachedGhostSlot(record);
    collapseProtonAdjacentGhostSlot(record);
    record.gridArtChild=native;
    record.gridAnchor=message;
    record.gridTextChild=message;
    return true;
  }
  function runNow(){
    if(stopped)return 0;
    const state=getState()||{},saved=state.descriptions||{};
    let shown=0;
    for(const doc of docs()){
      const id=routeId(doc),record=current.get(doc);
      const text=String(saved[id]||'').trim();
      if(!state.enabled||state.description_position!=='game_info'||!id||!text||
         !isNativeSteamShortcutApp(id,getStore(doc))){restoreRecord(doc);continue}
      if(record&&(record.appid!==id||!record.message?.isConnected||
         !record.root?.isConnected||appidFromVisibleGame(record.root)!==id))
        restoreRecord(doc);
      // Community hides Game Info without necessarily unmounting it. Do NOT
      // remove the paint guard during this transition: revealing the same
      // paragraph would expose the generic Valve text before React settles.
      const hidden=current.get(doc);
      if(hidden&&!visible(hidden.root)){
        if(showGuard(hidden,text)){hidden.text=text;shown++;continue}
        restoreRecord(doc);continue;
      }
      const active=current.get(doc);
      if(active){
        // The saved text is independent of artwork: NEVER undo the visible
        // paragraph just because a cover is temporarily unmounted or loading.
        if(!showGuard(active,text)||!replaceText(active.message,text)){
          restoreRecord(doc);status='Native description paragraph no longer writable';
          continue;
        }
        active.text=text;
        // Grid is attached only once per live content group. Rehydrate when
        // Steam replaces the group, but never chase artwork coordinates.
        positionNative(active);
        shown++;continue;
      }
      let roots=[];
      try{roots=Array.from(doc.querySelectorAll('[class*="AppDetailsContainer"], [class*="AppDetailsRoot"]'))}catch{}
      const live=UI?.basicAppDetailsSectionStylerClasses?.AppDetailsContainer;
      if(typeof live==='string'&&live.trim())try{roots.push(...Array.from(doc.getElementsByClassName(live)||[]))}catch{}
      roots=[...new Set(roots)];
      // PRE-PAINT: validate the route + React owner + exact Valve fallback.
      // Steam may take 1-4 seconds to load artwork. That must not delay text.
      // A hidden but connected owner is eligible for pre-hydration too, so
      // Community -> Game Info does not first expose the generic fallback.
      const matched=roots.filter(root=>root?.isConnected&&appidFromVisibleGame(root)===id);
      const candidates=matched.map(root=>({root,message:getNonSteamMessageLeaf(root)}))
        .filter(item=>item.message?.isConnected&&plainTextLeaf(item.message));
      const innermost=candidates.filter(item=>!candidates.some(other=>other!==item&&
        item.root.contains?.(other.root)));
      // If multiple pages exist during navigation prefer the one actually
      // visible; never apply the same text to an unverified other game.
      const visibleMatches=innermost.filter(item=>visible(item.root)&&visible(item.message));
      const chosen=visibleMatches.length===1?visibleMatches[0]:
        innermost.length===1?innermost[0]:null;
      if(!chosen){
        status='Waiting for a uniquely verified non-Steam Game Info paragraph';
        continue;
      }
      const {root,message}=chosen;
      const art=locateNonSteamArtwork(root,message);
      const originalMessageStyle={};
      for(const name of touchedStyles)originalMessageStyle[name]=originalInlineStyle(message,name);
      const originalRootStyle=originalInlineStyle(root,'position');
      const nativeCSS=doc.defaultView?.getComputedStyle?.(message);
      const originalPaintVars={};
      for(const key of ['--td-nonsteam-color','--td-nonsteam-font','--td-nonsteam-line'])
        originalPaintVars[key]=originalInlineStyle(message,key);
      const newRecord={appid:id,root,message,artwork:art?.img||null,originalText:message.textContent,
        originalMessageStyle,originalRootStyle,originalPaintVars,
        nativeColor:nativeCSS?.color||'#293241',
        nativeFont:nativeCSS?.fontSize||'14px',
        nativeLine:nativeCSS?.lineHeight||'normal',
        gridStyles:[],gridAnchor:null,gridArtChild:null,gridTextChild:null,text};
      try{
        // The paragraph itself is the hard requirement, NOT the cover. Apply
        // custom text synchronously before attempting any artwork layout.
        if(!showGuard(newRecord,text)||!replaceText(message,text))
          throw Error('Native description not ready');
        current.set(doc,newRecord);shown++;
        // Use stable in-flow grid only when cover and text have a confirmed
        // safe shared parent. Otherwise leave Steam's native page layout alone.
        positionNative(newRecord);
      }catch{
        // Failed initial placement must NEVER leave a blank Game Info page.
        clearGuard(newRecord);
        if(message.textContent===text)replaceText(message,newRecord.originalText);
        for(const [name,style] of Object.entries(originalMessageStyle))restoreInlineStyle(message,name,style);
        restoreGrid(newRecord);
        status='Native replacement unavailable; original fallback left visible';
      }
    }
    if(shown)status='Native non-Steam description visible ('+shown+')';
    return shown;
  }
  function schedule(delay=25){
    if(stopped||pending!==null)return;
    pending=setTimeout(()=>{pending=null;runNow()},delay);
  }
  function queueTransition(delay){
    const t=setTimeout(()=>{transitions.delete(t);if(!stopped)runNow()},delay);
    transitions.add(t);
  }
  function start(){
    runNow();
    for(const doc of docs()){
      const Observer=doc.defaultView?.MutationObserver||globalThis.MutationObserver;
      if(typeof Observer==='function')try{
        const observer=new Observer(records=>{
          // Steam commits its fallback paragraph before the next browser paint.
          // MutationObserver callbacks run in the microtask checkpoint before
          // rendering. Waiting 16 ms let the generic text appear for a frame
          // during Community <-> Game Info tab changes. Reassert synchronously
          // here instead of chasing that visible flash with timer retries.
          if(stopped||!records?.length)return;
          const state=getState()||{},id=routeId(doc);
          const saved=state.descriptions||{};
          const record=current.get(doc);
          if(!state.enabled||state.description_position!=='game_info'||
             !id||!String(saved[id]||'').trim()||
             !isNativeSteamShortcutApp(id,getStore(doc))){
            if(record)runNow(); // Restore immediately when a saved override ends.
            return;
          }
          // The first mount may be an anonymous React portal. Even if the
          // mount is not yet recognized by the game root, a childList mutation
          // is enough to try before paint. CharacterData matters when React
          // writes a fallback into a newly mounted or already patched leaf.
          const relevant=records.some(change=>{
            if(change.type==='childList'||change.type==='attributes')return true;
            if(change.type!=='characterData')return false;
            if(record?.message &&
              (change.target===record.message.firstChild||
               change.target?.parentElement===record.message))
              return record.message.textContent!==String(saved[id]).trim();
            return isNonSteamFallbackMessage(change.target?.nodeValue||
              change.target?.textContent||'');
          });
          if(relevant)runNow();
        });
        observer.observe(doc.documentElement,{subtree:true,childList:true,characterData:true,
          attributes:true,attributeFilter:['class','hidden','aria-hidden']});
        watchers.push(observer);
      }catch{}
      const onTab=e=>{
        let target=e?.target;
        if(target?.nodeType===3)target=target.parentElement;
        for(let i=0;target&&i<6;i++,target=target.parentElement){
          const label=String(target.getAttribute?.('aria-label')||target.textContent||'')
            .replace(/\s+/g,' ').trim();
          if(/^(?:Game Info|Community)$/i.test(label)){
            // Preflight the existing Game Info node during the capture phase,
            // before Steam's click handler starts another React update.
            // Controller-driven navigation remains covered by the observer.
            runNow();
            queueTransition(0);queueTransition(65);queueTransition(230);
            break;
          }
        }
      };
      doc.addEventListener?.('click',onTab,true);
      listeners.push(()=>doc.removeEventListener?.('click',onTab,true));
      const win=doc.defaultView,resize=()=>schedule(30);
      win?.addEventListener?.('resize',resize);
      listeners.push(()=>win?.removeEventListener?.('resize',resize));
    }
    // Safety-only recovery, never the mechanism for normal tab switching.
    ticker=setInterval(runNow,12000);
  }
  function restoreGameInfo(appid=''){
    const target=normId(appid);
    for(const [doc,record] of current)if(!target||record.appid===target)restoreRecord(doc);
  }
  function stop(){
    stopped=true;
    if(pending!==null)clearTimeout(pending);
    if(ticker!==null)clearInterval(ticker);
    for(const observer of watchers)observer.disconnect?.();
    for(const t of transitions)clearTimeout(t);
    for(const fn of listeners)fn();
    for(const doc of current.keys())restoreRecord(doc);
    for(const style of paintGuards.values())try{style.remove?.()}catch{}
    paintGuards.clear();
  }
  function scrollByStick(amount){
    if(!Number.isFinite(amount)||Math.abs(amount)<0.01)return false;
    const state=getState()||{};
    if(!state.enabled||state.description_position!=='game_info')return false;
    for(const doc of docs()){
      const rec=current.get(doc),id=routeId(doc);
      if(!rec||rec.appid!==id||!state.descriptions?.[id]||
         !rec.message?.isConnected||!visible(rec.message)||
         !isNativeSteamShortcutApp(id,getStore(doc)))continue;
      if(scrollGameInfoElementByStick(rec.message,amount))return true;
    }
    return false;
  }
  const alignFooter=()=>{for(const record of current.values())alignProtonFooter(record)};
  return {start,stop,runNow,restoreGameInfo,scrollByStick,alignFooter,captureGhostLayout,get shown(){return current.size},get status(){return status}};
}


/** Also scroll the already hardware-verified *Steam* Game Info custom panel.
 * Read-only lookup: never change the 0.9.4 renderer, Steam metadata, or its
 * native page structure. Non-Steam scrolling still uses its own adapter. */
export function scrollSteamGameInfoByStick(amount,documents=()=>[steamDocument,globalThis.document,...discoverDocuments()],state=()=>latestState){
  if(!Number.isFinite(amount)||Math.abs(amount)<0.01)return false;
  const snapshot=state()||{};
  if(!snapshot.enabled||snapshot.description_position!=='game_info')return false;
  let docs=[];
  try{docs=[...new Set(documents()||[])].filter(Boolean)}catch{return false}
  for(const doc of docs){
    const id=steamLibraryRouteId(doc.defaultView?.location)||steamLibraryRouteId(globalThis.location);
    if(!id||!String(snapshot.descriptions?.[id]||'').trim()||
       isNativeSteamShortcutApp(id,nonSteamOverviewStore(doc)))continue;
    let panels=[];
    try{panels=Array.from(doc.querySelectorAll('[data-titledeck-gameinfo-description], [data-titledeck-description]'))}catch{}
    for(const panel of panels){
      if(panel.getAttribute?.('data-titledeck-gameinfo-description')!==id&&
         panel.getAttribute?.('data-titledeck-description')!==id)continue;
      if(!panel.isConnected||panel.offsetParent===null)continue;
      if(scrollGameInfoElementByStick(panel,amount))return true;
    }
  }
  return false;
}

/** Find Steam's native scroll-up control when it is a styled div/span rather
 * than a button. Exact visible caption or class signature only; never match
 * a Game Info description which merely mentions scrolling in its prose. */
export function findSteamScrollTopControls(doc){
  let nodes=[];
  try{nodes=Array.from(doc.querySelectorAll('button, [role="button"], [class*="ScrollToTop" i], [class*="scroll_to_top" i], div, span'))}catch{return []}
  const out=new Set();
  for(const node of nodes){
    if(!node?.style)continue;
    const name=String(node.className||'');
    const matchesClass=/(?:scroll.?to.?top|scroll.?top|go.?to.?top)/i.test(name);
    const label=String(node.getAttribute?.('aria-label')||node.getAttribute?.('title')||node.textContent||'').replace(/\s+/g,' ').trim();
    if(!matchesClass&&!/^(?:scroll to top|back to top)$/i.test(label))continue;
    // Do not hide an ancestor that includes any description or other Steam UI.
    if(label.length>45&&!matchesClass)continue;
    let target=node;
    for(let i=0;i<8&&target.parentElement;i++){
      const parent=target.parentElement;
      const pLabel=String(parent.getAttribute?.('aria-label')||parent.textContent||'').replace(/\s+/g,' ').trim();
      const parentClass=String(parent.className||'');
      const sameCaption=pLabel.toLowerCase()===label.toLowerCase()&&pLabel.length<=45;
      const classMatches=/(?:scroll.?to.?top|scroll.?top|go.?to.?top)/i.test(parentClass);
      if(!sameCaption&&!classMatches)break;
      if(/^(?:HTML|BODY|MAIN|SECTION|ARTICLE)$/i.test(parent.tagName||''))break;
      // A plain wrapper enclosing only the button caption is part of that
      // floating control. Hide the whole clickable blue surface, not just
      // its nested text span. Reject oversized Steam app containers.
      const rect=parent.getBoundingClientRect?.();
      if(rect&&((rect.width||0)>475||(rect.height||0)>145))break;
      if(parent?.querySelectorAll){
        const buttons=Array.from(parent.querySelectorAll('button, [role="button"]')||[]);
        if(buttons.filter(x=>x!==node&&x!==target&&!x.contains?.(node)&&!x.contains?.(target)).length)break;
      }
      if(parent.style)target=parent;
      else break;
    }
    if(target?.style)out.add(target);
  }
  return [...out];
}

/** Hide Valve's fixed Scroll to Top button only on Game Info pages where a
 * TitleDeck custom description is ACTIVE. Undo when leaving or restoring.
 * This does not remove or alter the actual scrollable Steam content. */
export function createScrollTopCleaner(documents=()=>[steamDocument,globalThis.document,...discoverDocuments()],state=()=>latestState){
  const touched=new Map();
  function restore(){
    for(const [el,previous] of touched)restoreInlineStyle(el,'display',previous);
    touched.clear();
  }
  function runNow(){
    const s=state()||{};
    let docs=[];try{docs=[...new Set(documents()||[])].filter(Boolean)}catch{}
    const keep=new Set();
    // Steam frequently renders the Game Info tab in one document and the blue
    // floating Scroll to Top control in its outer SteamUI document. The old
    // code checked each document's *own* location separately; for the outer
    // overlay, that location is not the library route and the button survived.
    const eligible=new Set();
    if(s.enabled&&s.description_position==='game_info'){
      for(const doc of docs){
        const id=steamLibraryRouteId(doc.defaultView?.location);
        if(id&&String(s.descriptions?.[id]||'').trim())eligible.add(id);
      }
      const globalId=steamLibraryRouteId(globalThis.location);
      if(globalId&&String(s.descriptions?.[globalId]||'').trim())eligible.add(globalId);
    }
    // Refuse cross-window cleanup if several unrelated Game Info routes are
    // simultaneously active. Only the exact Scroll to Top control is hidden.
    const activeId=eligible.size===1?[...eligible][0]:'';
    if(activeId)for(const doc of docs){
      const docRoute=steamLibraryRouteId(doc.defaultView?.location);
      if(docRoute&&docRoute!==activeId)continue;
      for(const button of findSteamScrollTopControls(doc)){
        if(!touched.has(button))touched.set(button,originalInlineStyle(button,'display'));
        try{button.style?.setProperty?.('display','none','important');keep.add(button)}catch{}
      }
    }
    for(const [el,previous] of touched)if(!keep.has(el)){
      restoreInlineStyle(el,'display',previous);touched.delete(el);
    }
  }
  return {runNow,stop:restore};
}

/** Optional right-stick input bridge, separate from the physically accepted
 * non-Steam paint/navigation adapter and removed on plugin dismount. */
export function createControllerScrollBridge(getAdapter=()=>nonSteamDescriptionAdapter,env=globalThis){
  let timer=null,registeredInput=null,unsubscribe=null,registration='waiting',ticks=0;
  const steamSticks=new Map(),topWatchers=[],scrollTopCleaner=createScrollTopCleaner();
  let callbackCount=0,scrollCount=0,lastSource='none';
  const windows=()=>{
    const contexts=[steamDocument?.defaultView];
    try{contexts.push(...discoverDocuments().map(doc=>doc?.defaultView))}catch{}
    contexts.push(env);
    return [...new Set(contexts.filter(Boolean))];
  };
  function onSteamControllerChanges(changes){
    callbackCount++;
    for(const sample of Array.isArray(changes)?changes:[changes]){
      if(!sample||typeof sample!=='object')continue;
      const keys=['sRightStickY','flRightStickY','fRightStickY','rStickY','rightStickY','flRightY','fRightY','sJoystickRightY'];
      if(!keys.some(key=>typeof sample[key]==='number'))continue;
      const index=Number(sample.unControllerIndex);
      const id=Number.isFinite(index)?index:'default';
      steamSticks.set(id,{value:normalizedRightStickY(sample),at:Date.now()});
    }
  }
  // Decky's context may mount before Steam's real UI document is available.
  // Retry and prefer the actual Steam document, not only the plugin window.
  function ensureSteamInput(){
    let input=null;
    for(const context of windows()){
      const candidate=context?.SteamClient?.Input;
      if(typeof candidate?.RegisterForControllerStateChanges==='function'){input=candidate;break}
    }
    if(input&&input===registeredInput)return;
    try{unsubscribe?.()}catch{}
    unsubscribe=null;registeredInput=null;steamSticks.clear();
    if(!input){registration='unavailable';return}
    try{
      const token=input.RegisterForControllerStateChanges(onSteamControllerChanges);
      unsubscribe=typeof token==='function'?token:
        typeof token?.unregister==='function'?()=>token.unregister():
        typeof token?.Unregister==='function'?()=>token.Unregister():null;
      registeredInput=input;registration='registered';
    }catch{registration='error'}
  }
  function tick(){
    if(++ticks%12===0){scrollTopCleaner.runNow();getAdapter()?.alignFooter?.()}
    if(ticks%20===0||!registeredInput)ensureSteamInput();
    if(!readControllerScrollSetting())return;
    let amount=0,source='none';
    // Keep ordinary browser gamepads working. This source often exposes an
    // external pad but omits the Deck's integrated Neptune controls.
    try{
      for(const context of windows()){
        for(const pad of context?.navigator?.getGamepads?.()||[]){
          if(pad?.connected===false)continue;
          const value=normalizedRightStickY(pad);
          if(Math.abs(value)>Math.abs(amount)){amount=value;source='browser'}
        }
      }
    }catch{}
    if(!amount){
      const now=Date.now();
      for(const [id,sample] of steamSticks){
        if(now-sample.at>450){steamSticks.delete(id);continue}
        if(Math.abs(sample.value)>Math.abs(amount)){amount=sample.value;source='steam'}
      }
    }
    if(!amount)return;
    lastSource=source;
    const handled=getAdapter()?.scrollByStick?.(amount);
    if(handled||scrollSteamGameInfoByStick(amount))scrollCount++;
  }
  function start(){
    if(timer!==null)return;
    ensureSteamInput();
    const docs=[steamDocument,env.document,...discoverDocuments()];
    for(const doc of new Set(docs.filter(Boolean))){
      const Observer=doc.defaultView?.MutationObserver||env.MutationObserver;
      if(!Observer||!doc.documentElement)continue;
      try{
        const observer=new Observer(changes=>{
          if(changes?.some(change=>change.type==='childList'))scrollTopCleaner.runNow();
        });
        observer.observe(doc.documentElement,{subtree:true,childList:true});
        topWatchers.push(observer);
      }catch{}
    }
    scrollTopCleaner.runNow();
    const set=env.setInterval?.bind(env)||setInterval;
    timer=set(tick,45);
  }
  function stop(){
    if(timer!==null){const clear=env.clearInterval?.bind(env)||clearInterval;clear(timer)}
    timer=null;
    for(const watcher of topWatchers.splice(0))watcher.disconnect?.();
    try{unsubscribe?.()}catch{}
    unsubscribe=null;registeredInput=null;steamSticks.clear();
    scrollTopCleaner.stop();
  }
  return {start,stop,get diagnostics(){return {registration,callbackCount,scrollCount,lastSource}}};
}
/** Game Info native description overlay remains unchanged. */
export function createDescriptionAdapter(host,getState,getDocuments=()=>[],getClass=()=>UI?.basicAppDetailsSectionStylerClasses?.AppDetailsContainer,getSteamOriginal=()=> ''){
  const MARK='data-titledeck-description',owned=new Map(),nativeInfo=new Map(),watchers=[],scrollListeners=[];
  // Warm native-styled clones and verified active game roots remain local to a
  // document and are invalidated on game changes and Restore Original.
  const verifiedRoot=new Map(),warmPanels=new Map();
  // Bounded, on-device Game Info timing diagnostics. Never record saved
  // descriptions, game names, keyboard input, or other plugin contents.
  const timingEvents=[],observedDocs=new Set();
  let tabSwitchAt=0,lastTimingText='',lastTimingAt=0,mutationBatches=0,verifiedEvents=0;
  function markTiming(kind,detail=''){
    const now=Date.now();
    const clean=String(detail).replace(/[^a-zA-Z0-9 .:_+-]/g,' ').slice(0,76);
    const label=kind+(clean?' '+clean:'');
    if(label===lastTimingText&&now-lastTimingAt<300)return;
    lastTimingText=label;lastTimingAt=now;
    timingEvents.push({time:now,delta:tabSwitchAt?now-tabSwitchAt:null,label});
    if(timingEvents.length>25)timingEvents.splice(0,timingEvents.length-25);
  }
  function markTabClick(event){
    let el=event?.target;
    if(el?.nodeType===3)el=el.parentElement;
    if(el?.closest?.('[data-titledeck-ui], [class*="decky" i], [class*="PluginStore" i]'))return;
    for(let i=0;el&&i<8;i++,el=el.parentElement){
      const label=String(el.getAttribute?.('aria-label')||el.textContent||'').replace(/\s+/g,' ').trim();
      if(/^(?:game info|community)$/i.test(label)&&
        /^(?:button|div|a|span)$/i.test(String(el.tagName||''))){
        tabSwitchAt=Date.now();markTiming('tab selected',label);
        const doc=el.ownerDocument;
        const state=getState()||{};
        if(doc&&routeId(doc)&&state.enabled&&state.description_position==='game_info'){
          // React commits following the input event; re-check only the
          // verified game root once, never poll or scan the whole page.
          setTimeout(()=>{if(!stopped)applyVerifiedGameInfo(doc,getState()||{})},0);
        }
        break;
      }
    }
  }
  function timingReport(){
    const elapsed=tabSwitchAt?Date.now()-tabSwitchAt:null;
    const head='Preview 24 Game Info timing | watched documents '+observedDocs.size+
      ' | adapter checks '+checks+' | last tab '+(elapsed===null?'not detected':elapsed+'ms ago')+
      ' | visible panels '+nativeInfo.size+' | mutations '+mutationBatches+' | verified events '+verifiedEvents;
    const lines=timingEvents.slice(-12).map(e=>
      (e.delta===null?'[startup]':'['+(e.delta>=0?'+':'')+e.delta+'ms]')+' '+e.label);
    return head+(lines.length?'\n'+lines.join('\n'):'\nNo timing events yet. Switch Game Info / Community twice.');
  }
  function removeOldBlankGuard(doc){
    // Preview 19 left a body-wide visibility rule until a delayed re-render.
    // Remove only TitleDeck's own guard, even on hot upgrade.
    try{doc?.body?.removeAttribute?.('data-titledeck-gameinfo-active')}catch{}
    try{for(const style of doc?.querySelectorAll?.('[data-titledeck-gameinfo-guard]')||[])style.remove?.()}catch{}
  }
  const comparable=x=>String(x||'').replace(/\s+/g,' ').trim();
  function repairSteamRestore(doc,id,original,previous){
    if(!id||!original||!previous||comparable(original)===comparable(previous))return false;
    if(routeId(doc)!==id)return false; // Never repair a different game's page.
    const options=candidates(doc).filter(visible);
    const matched=options.find(el=>appidFromVisibleGame(el)===id);
    if(!matched)return false;
    const found=findSteamGameInfoDescription(doc,matched);
    const native=found?.nativeDescription;
    if(!native||native.getAttribute?.('data-titledeck-gameinfo-description'))return false;
    if(comparable(native.textContent)!==comparable(previous))return false;
    // One-time repair of legacy cached text, not an ongoing React rewrite.
    native.textContent=original;
    return true;
  }
  function clearGameInfo(doc,keepWarm=false){
    const prior=nativeInfo.get(doc);
    if(!prior){if(!keepWarm)warmPanels.delete(doc);return;}
    if(keepWarm&&prior.panel)warmPanels.set(doc,{appid:prior.appid,panel:prior.panel});
    else warmPanels.delete(doc);
    // A failure restoring one style must not prevent removing the clone.
    const native=prior.nativeNode,style=native?.style;
    if(style)try{
      if(prior.originalDisplayProperty!==null&&typeof style.setProperty==='function'){
        if(prior.originalDisplayProperty)style.setProperty('display',prior.originalDisplayProperty,prior.originalDisplayPriority||'');
        else style.removeProperty('display');
      }else if(style.display==='none')style.display=prior.originalDisplay;
    }catch{
      try{if(style.display==='none')style.display=''}catch{}
    }
    try{native?.removeAttribute?.('data-titledeck-native-original')}catch{}
    try{prior.panel?.remove?.()}catch{}
    nativeInfo.delete(doc);
  }
  function recoverGameInfoOrphans(doc){
    // Older previews could leave a clone behind on the game page. Cleanup is
    // constrained to TitleDeck-marked panels, never generic Steam elements.
    const retained=nativeInfo.get(doc)?.panel;
    let orphans=[];
    try{orphans=[...(doc.querySelectorAll?.('[data-titledeck-gameinfo-description]')||[])]}catch{}
    for(const panel of orphans){
      if(panel===retained)continue;
      const native=panel.nextSibling;
      if(native&&native.style){
        const marked=native.getAttribute?.('data-titledeck-native-original')==='true';
        const sameClass=typeof panel.className==='string'&&!!panel.className&&
          panel.className===native.className;
        if(marked||sameClass){
          try{
            if(native.style.display==='none'){
              if(typeof native.style.removeProperty==='function')native.style.removeProperty('display');
              else native.style.display='';
            }
            native.removeAttribute?.('data-titledeck-native-original');
          }catch{}
        }
      }
      try{panel.remove?.()}catch{}
    }
  }
  function drawGameInfo(doc,gameRoot,appid,description,located=null){
    // On a stable game page the existing Steam native node is the source of
    // truth. Never re-identify the original from a DOM containing our styled
    // clone, even if Steam's live class finder changes the match order.
    let prior=nativeInfo.get(doc);
    if(prior&&(prior.appid!==appid||!prior.parent?.isConnected||
      !prior.nativeNode?.isConnected||!prior.panel?.isConnected)){
      // Keep the existing filled clone across *this same game's* tab remount;
      // drop it on a route change or explicit Restore Original.
      const sameApp=prior.appid===appid;
      clearGameInfo(doc,sameApp);prior=null;
    }
    const found=prior?{container:prior.parent,nativeDescription:prior.nativeNode}
      :located||findSteamGameInfoDescription(doc,gameRoot);
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
    if(!prior){
      const warmed=warmPanels.get(doc);
      const panel=warmed?.appid===appid&&warmed.panel? warmed.panel:
        createNativeSteamDescriptionPanel(doc,nativeDescription,appid);
      warmPanels.delete(doc);
      if(warmed?.appid===appid&&nativeDescription?.className&&
        typeof nativeDescription.className==='string')panel.className=nativeDescription.className;
      // Populate BEFORE the panel is connected or Steam's original text hidden.
      const body=panel.querySelector?.('[data-titledeck-gameinfo-text]')||panel.lastChild;
      if(body&&body.textContent!==description)body.textContent=description;
      const style=nativeDescription?.style;
      const originalDisplay=style?.display??'';
      const originalDisplayProperty=typeof style?.getPropertyValue==='function'?style.getPropertyValue('display'):null;
      const originalDisplayPriority=typeof style?.getPropertyPriority==='function'?style.getPropertyPriority('display'):'';
      try{parent.insertBefore(panel,nativeDescription||parent.firstChild||null)}catch{return false}
      try{nativeDescription?.setAttribute?.('data-titledeck-native-original','true')}catch{}
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
    status='Game Info: native-styled description active for app '+appid;
    return true;
  }
  let stopped=false,ticker=null,pending=null,checks=0,status='Waiting for Steam game page';
  let cleanedInitialDocs=false;
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
  const nativeDescriptionSelector='[class*="appdetailsgameinfopanel_GameDescription"],'+
    '[class*="appdetailsgameinfocontainer_GameDescription"]';
  function isOwnedNode(node){
    for(let cur=node,i=0;cur&&i<10;cur=cur.parentElement,i++)
      if(cur.getAttribute?.('data-titledeck-gameinfo-description')!=null||
         cur.getAttribute?.('data-titledeck-ui')!=null)return true;
    return false;
  }
  function nativeInMutation(records){
    const classToken=resolveLiveSteamGameInfoClasses()?.description||'';
    const match=node=>{
      if(!node||node.nodeType===3||isOwnedNode(node)||!node.isConnected)return false;
      const cls=String(node.className||'');
      return /appdetailsgameinfopanel_GameDescription|appdetailsgameinfocontainer_GameDescription/.test(cls)||
        (!!classToken&&cls.split(/\s+/).includes(classToken));
    };
    // Inspect only the changed Steam subtree, never the full Decky page.
    const scan=root=>{
      if(!root||isOwnedNode(root))return null;
      if(match(root))return root;
      try{
        const matches=root.querySelectorAll?.(nativeDescriptionSelector)||[];
        for(let i=0;i<Math.min(matches.length,20);i++)if(match(matches[i]))return matches[i];
        if(classToken){const live=root.getElementsByClassName?.(classToken)||[];
          for(let i=0;i<Math.min(live.length,20);i++)if(match(live[i]))return live[i]}
      }catch{}
      // Small fallback for the test DOM and builds without querySelectorAll.
      const pending=[...(root.children||[])];let visited=0;
      while(pending.length&&visited++<100){const el=pending.shift();
        if(match(el))return el;
        if(!isOwnedNode(el))pending.push(...(el.children||[]));
      }
      return null;
    };
    for(const rec of records||[]){
      for(const n of rec.addedNodes||[]){const found=scan(n);if(found)return found}
      const found=scan(rec.target?.nodeType===3?rec.target.parentElement:rec.target);
      if(found)return found;
    }
    return null;
  }
  // MetaDeck's route-scoped metadata work is a useful model: identify the
  // active Steam game, do not rely on an old DOM container staying mounted.
  // This adapter deliberately leaves Steam's shared GetDescriptions and app
  // cache untouched to avoid competing with MetaDeck, GTM, and Valve.
  function rootContainingNative(doc,native,id){
    if(!native?.isConnected||!id)return null;
    const within=(root,child)=>{
      for(let cur=child,hops=0;cur&&hops++<36;cur=cur.parentElement)
        if(cur===root)return true;
      return false;
    };
    const known=verifiedRoot.get(doc);
    if(known?.appid===id&&known.root?.isConnected&&
       within(known.root,native)&&appidFromVisibleGame(known.root)===id)
      return known.root;
    // React replaces the whole game view on some Steam builds. Find the new
    // owner in the SAME inserted subtree, before the mutation is painted.
    // Do not require offsetParent: Steam may not have revealed the new tab yet.
    let matched=null;
    for(let el=native.parentElement,depth=0;el&&depth++<30;el=el.parentElement){
      if(el===doc.body||el===doc.documentElement)break;
      const cls=String(el.className||'');
      if(/AppDetails(?:Container|Root|Page)/.test(cls)&&
         appidFromVisibleGame(el)===id){matched=el;break;}
    }
    // Some CSS Loader themes rename AppDetails classes. A React overview on
    // an actual ancestor is acceptable, but never accept the route alone.
    if(!matched){
      for(let el=native.parentElement,depth=0;el&&depth++<30;el=el.parentElement){
        if(el===doc.body||el===doc.documentElement)break;
        const keys=Object.keys(el||{});
        if(keys.some(k=>k.startsWith('__reactFiber$'))&&appidFromVisibleGame(el)===id){
          matched=el;break;
        }
      }
    }
    // Some Steam layouts attach the overview only to the Game Info React
    // fiber. Its parent chain still establishes identity for the active app.
    // This is stronger evidence than a matching URL on its own.
    if(!matched&&appidFromVisibleGame(native)===id){
      for(let el=native.parentElement,depth=0;el&&depth++<30;el=el.parentElement){
        if(/AppDetails(?:Container|Root|Page)/.test(String(el.className||''))){
          matched=el;break;
        }
        if(el===doc.body||el===doc.documentElement)break;
      }
      if(!matched)matched=native.parentElement;
    }
    if(!matched)return null;
    verifiedRoot.set(doc,{appid:id,root:matched});
    return matched;
  }
  // On real SteamOS the native tab may mount under a generic React wrapper
  // whose CSS class is completely opaque. Follow the already VERIFIED game
  // root as an alternate fast signal. This is not a full-document poll.
  function mutationInsideVerifiedGame(doc,records,id){
    const known=verifiedRoot.get(doc);
    if(!known||known.appid!==id||!known.root?.isConnected||
       appidFromVisibleGame(known.root)!==id)return false;
    const root=known.root;
    const within=node=>{
      for(let n=node,depth=0;n&&depth++<36;n=n.parentElement){
        if(n===root)return true;
        if(n.getAttribute?.('data-titledeck-ui')!=null||
           n.getAttribute?.('data-titledeck-gameinfo-description')!=null)return false;
      }
      return false;
    };
    return (records||[]).some(record=>{
      const target=record.target?.nodeType===3?record.target.parentElement:record.target;
      if(!target||isOwnedNode(target)||target.getAttribute?.('data-titledeck-native-original')==='true')return false;
      if(within(target))return true;
      if(record.type==='childList')return Array.from(record.addedNodes||[]).some(n=>
        !isOwnedNode(n)&&(within(n)||n?.contains?.(root)));
      return false;
    });
  }
  function applyVerifiedGameInfo(doc,state){
    const id=routeId(doc),text=state?.descriptions?.[id];
    const verified=verifiedRoot.get(doc);
    if(!id||!text||!verified||verified.appid!==id||!verified.root?.isConnected||
       appidFromVisibleGame(verified.root)!==id)return false;
    // This search only runs on a VERIFIED active game page after a relevant
    // mutation; it never enumerates Steam's full game library or Decky UI.
    const found=findSteamGameInfoDescription(doc,verified.root);
    if(!found?.nativeDescription)return false;
    if(drawGameInfo(doc,verified.root,id,String(text).trim(),found)){
      markTiming('FAST verified game render',id);
      return true;
    }
    return false;
  }
  function applyGameInfoMutation(doc,records,state){
    if(state?.description_position!=='game_info'||!state.enabled)return false;
    const id=routeId(doc),text=state.descriptions?.[id];
    if(!id||!text){markTiming('fast rejected','no active saved description');return false;}
    const native=nativeInMutation(records);
    if(!native?.parentElement){markTiming('fast rejected','native description not found');return false;}
    // Root identity is recovered from THIS native node, not a previous tab.
    // A route match without a matching React overview must fail closed.
    const root=rootContainingNative(doc,native,id);
    if(!root){markTiming('fast rejected','React game identity unconfirmed '+id);return false;}
    const result=drawGameInfo(doc,root,id,String(text).trim(),
      {container:native.parentElement,nativeDescription:native});
    if(result){status='Game Info: description inserted synchronously for app '+id;markTiming('FAST description ready',id)}
    else markTiming('fast rejected','render failed '+id);
    return result;
  }
  function runNow(trigger='manual'){
    if(stopped)return 0;checks++;
    const state=getState()||{},descriptions=state.descriptions||{};
    const active=state.enabled===true&&Object.keys(descriptions).length>0;
    if(!active&&cleanedInitialDocs&&!owned.size&&!nativeInfo.size)return 0;
    let applied=0,realPageSeen=false,issues=[];
    const docs=documents();
    let docNo=0;
    for(const doc of docs){
      docNo++;
      // Orphan cleanup matters on initial hot-upgrade; repeating a broad
      // query on every Steam/Decky mutation costs time and moves focus.
      if(!cleanedInitialDocs)recoverGameInfoOrphans(doc);
      const id=routeId(doc);
      if(!state.enabled||!Object.keys(descriptions).length){
        verifiedRoot.delete(doc);
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
        verifiedRoot.delete(doc);
        clear(doc);clearGameInfo(doc);
        const issue=!options.length?'No visible Steam details container':id?'Visible app ID does not match route '+id:'Cannot confirm one visible game page';
        // A second empty Steam/Decky document is not evidence about the
        // actual game page and must never override the useful Game Info result.
        if(id||uniqueIds.length)issues.push(issue);
        continue;
      }
      const position=state.description_position==='game_info'?'game_info'
        :state.description_position==='hero_footer'?'hero_footer':'below_play';
      verifiedRoot.set(doc,{appid:match.gameId,root:match.el});
      if(position==='game_info'){
        // Keep Steam's original visible until the populated clone is ready.
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
    cleanedInitialDocs=true;
    if(applied){status='Custom description visible ('+applied+' panel'+(applied===1?'':'s')+')';markTiming('SCAN description ready',trigger)}
    else if(realPageSeen)status=issues[issues.length-1]||'Game page detected, no description shown';
    else status='Game page not visible while manager is open. Use Quick Access capture on GAME INFO.';
    return applied;
  }
  const schedule=()=>{
    if(stopped||pending!==null)return;
    const state=getState()||{};
    if((!state.enabled||!Object.keys(state.descriptions||{}).length)&&!owned.size&&!nativeInfo.size)return;
    pending=setTimeout(()=>{pending=null;runNow('delayed')},300);
  };
  function start(){
    for(const doc of documents())removeOldBlankGuard(doc);
    runNow('startup');
    for(const doc of documents())try{
      const Observer=doc.defaultView?.MutationObserver||globalThis.MutationObserver;
      if(typeof Observer!=='function')continue;
      observedDocs.add(doc);
      markTiming('watcher attached','doc '+observedDocs.size);
      doc.addEventListener?.('click',markTabClick,true);
      // Controller navigation may select tabs through focus rather than a
      // mouse click. Capture focus without looking inside Decky/GTM panels.
      doc.addEventListener?.('focusin',markTabClick,true);
      scrollListeners.push(()=>{
        doc.removeEventListener?.('click',markTabClick,true);
        doc.removeEventListener?.('focusin',markTabClick,true);
      });
      const watcher=new Observer(records=>{
        mutationBatches++;
        // Decky/GTM/Plugin Store changes are not a reason to scan Steam.
        if(records?.length&&records.every(r=>{
          const el=r.target?.nodeType===3?r.target.parentElement:r.target;
          try{return !!el?.closest?.('[data-titledeck-ui], [class*="decky" i], [class*="PluginStore" i], [id*="decky" i]')}catch{return false}
        }))return;
        const state=getState()||{};
        if(state.description_position==='game_info'){
          const id=routeId(doc);
          if(!state.enabled||!id||!state.descriptions?.[id]){
            // Cross-game navigation must never wait for the periodic scan to
            // remove a previous app's custom description.
            if(nativeInfo.has(doc)||warmPanels.has(doc)){
              clearGameInfo(doc);warmPanels.delete(doc);verifiedRoot.delete(doc);
            }
            return;
          }
          // Some Steam builds remount the entire AppDetails view. Its
          // generic parent may not contain the familiar GameInfo class when
          // Steam queues the first observer delivery. Inspect only inserted
          // AppDetails subtrees, never all documents or Decky plugin panels.
          const newGameView=records?.some(r=>r.type==='childList'&&
            Array.from(r.addedNodes||[]).some(n=>n?.nodeType===1&&
              /AppDetails/i.test(String(n.className||''))&&!isOwnedNode(n)));
          const explicit=isSteamGameInfoMutation(records)||newGameView;
          const verified=mutationInsideVerifiedGame(doc,records,id);
          if(verified)verifiedEvents++;
          if(explicit||verified){
            markTiming(explicit?'gameinfo mutation':'verified root mutation',
              'doc '+(Array.from(observedDocs).indexOf(doc)+1));
            // Try Steam's native descriptor in changed subtrees, THEN the
            // verified active page. A generic hashed wrapper must not leave
            // us waiting for the four-second fallback.
            if(!(explicit&&applyGameInfoMutation(doc,records,state))&&
               !applyVerifiedGameInfo(doc,state)){
              schedule();
            }
          }
          // The existing low-frequency ticker is a fallback for older Steam
          // layouts whose class names cannot be recognized. Avoid scheduling
          // a full traversal for every unrelated Decky, audio, or UI event.
          return;
        }
        schedule();
      });watcher.observe(doc.documentElement,{childList:true,subtree:true,attributes:true,characterData:true,attributeFilter:['class','style','hidden','aria-hidden']});watchers.push(watcher);
      // Native Game Info needs no scroll-driven DOM updates; these can
      // interfere with Steam's own scroll anchoring for long descriptions.
      const reposition=()=>{if(getState()?.description_position==='hero_footer')schedule()};
      doc.addEventListener?.('scroll',reposition,true);
      doc.defaultView?.addEventListener?.('resize',reposition);
      scrollListeners.push(()=>{doc.removeEventListener?.('scroll',reposition,true);doc.defaultView?.removeEventListener?.('resize',reposition)});
    }catch{}
    // Rare safety net; normal tab changes use the targeted observer above.
    ticker=setInterval(()=>runNow('4s fallback'),4000);
  }
  function restoreGameInfo(appid='',previousText=''){
    const target=appid?normId(appid):'';
    for(const [doc,warm] of warmPanels)if(!target||warm.appid===target)warmPanels.delete(doc);
    const previous=String(previousText||'').trim();
    let original=target?String(getSteamOriginal(target)||'').trim():'';
    if(target&&!original){
      for(const doc of documents()){
        const prior=nativeInfo.get(doc);
        const saved=prior?.appid===target?prior.nativeNode?.textContent:'';
        if(saved&&comparable(saved)!==comparable(previous)){
          original=String(saved).trim();break;
        }
      }
    }
    for(const doc of documents()){
      const prior=nativeInfo.get(doc);
      if(prior&&(!target||prior.appid===target))clearGameInfo(doc);
      
      recoverGameInfoOrphans(doc);
      if(target&&previous&&original)repairSteamRestore(doc,target,original,previous);
    }
  }
  function stop(){
    stopped=true;if(ticker!==null)clearInterval(ticker);if(pending!==null)clearTimeout(pending);
    watchers.forEach(w=>w.disconnect());scrollListeners.forEach(stop=>stop());for(const doc of documents()){clear(doc);clearGameInfo(doc);removeOldBlankGuard(doc);recoverGameInfoOrphans(doc)}
    verifiedRoot.clear();warmPanels.clear();observedDocs.clear();
  }
  return{start,stop,runNow,restoreGameInfo,timingReport,get shown(){return owned.size+nativeInfo.size},get checks(){return checks},get status(){return status}};
}

const STYLE=`
/* 1.1.8: full-bleed artwork atmosphere without cropping the original.
 * Constrain everything to manager tiles; Steam's Game Info is untouched. */
.td-root .td-game-artbox .td-art-backdrop{
 position:absolute!important;inset:-10%!important;width:120%!important;height:120%!important;
 object-fit:cover!important;filter:blur(12px) saturate(.9)!important;opacity:.64!important;
 z-index:1!important;pointer-events:none!important;background:transparent!important
}
.td-root .td-game-artbox .td-art{
 position:relative!important;z-index:2!important;object-fit:contain!important;
 background:transparent!important;max-width:100%!important;max-height:100%!important
}
.td-root .td-game-artbox .td-art-pending{z-index:0!important}
/* 1.1.9: RENAMED stays above the sharp cover (z=2) and blurred backdrop (z=1).
 * Scope this to Full Library Manager; do not affect Game Info art. */
.td-root .td-game-artbox > .td-game-mark{
 position:absolute!important;z-index:3!important;pointer-events:none!important;
}

/* Keep title and description restoration distinct on short Steam Deck screens. */
.td-root .td-title-editor-toolbar .td-action{width:auto!important;flex:0 1 auto!important;min-width:0!important;white-space:normal!important;line-height:1.1!important}
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
.td-game-artbox{width:100%;position:relative;aspect-ratio:600/850;min-height:0;max-height:185px;overflow:hidden;border-radius:7px;background:#2e3542}.td-art{width:100%;height:100%;object-fit:cover;display:block;background:#232935}.td-art-pending{position:absolute;inset:0;z-index:0}.td-art{position:relative}.td-game-artbox .td-art{object-fit:contain!important}.td-art-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#303440;color:#f4c2c9;font-size:35px;font-weight:850}.td-game-copy{display:flex;flex-direction:column;gap:3px;min-width:0;min-height:42px}.td-game-title{font-size:13px;font-weight:750;line-height:1.24;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow-wrap:anywhere}.td-game-sub{font-size:10px;color:#aeb5c0;line-height:1.15;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.td-game-mark{position:absolute;top:13px;right:13px;font-weight:800;font-size:9px;letter-spacing:.02em;border-radius:6px;padding:4px 6px;color:#fff;background:#9b4059;border:1px solid #d97889}
.td-bottom{justify-content:space-between;color:#b7bec9;font-size:11px;gap:8px;padding:4px 13px}.td-bottom strong{color:#ecf0f5;font-size:11px}.td-status{color:#b4bac5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.td-message{position:absolute;bottom:46px;left:18px;right:18px;z-index:6;max-width:860px;margin:auto;background:#33262e;color:#f6c9d1;border:1px solid #905363;border-radius:11px;box-shadow:0 10px 25px #0009;padding:10px 14px;font-size:12px;pointer-events:none}.td-message.success{background:#23362f;color:#c4edd8;border-color:#527e66}
.td-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;text-align:center;color:#aeb6c3;padding:65px 18px}.td-empty h2{font-size:20px;color:#faf8f8;margin:0}.td-empty p{margin:0;max-width:480px}
.td-saved-description-preview{max-height:138px;overflow:hidden;margin-top:10px!important;padding:10px 12px;border:1px solid #434e60;border-radius:8px;background:#1c2532;}
.td-saved-description-heading{font-size:12px;font-weight:750;color:#e5edf8;margin-bottom:6px}
.td-saved-description-excerpt{color:#bdcbdc;font-size:12px;line-height:1.4;overflow:hidden;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;max-height:52px}
.td-saved-description-hint{font-size:10px;color:#aab9cc;margin-top:6px;line-height:1.3}
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
.td-root .td-description-character-count{font-size:12px;color:#b6cce6;margin:5px 0 2px;line-height:1.3;font-variant-numeric:tabular-nums}
.td-root.td-inline-keyboard-open .td-description-character-count{font-size:13px;color:#e2edff;margin:4px 2px}
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

/* 1.2.0: native-controller-friendly, theme-aware STEAM menu title switch. */
.td-root .td-home-toggle{display:inline-flex;gap:10px;align-items:center;justify-content:center;width:100%;font-weight:800}
.td-root .td-home-toggle-track{width:35px;height:19px;display:inline-flex;align-items:center;flex-shrink:0;border-radius:99px;padding:2px;background:#4e5562;border:1px solid #818a98;transition:background .18s ease,border-color .18s ease}
.td-root .td-home-toggle-track[data-on="true"]{background:#2e865f;border-color:#90d5a8}
.td-root .td-home-toggle-knob{width:13px;height:13px;border-radius:50%;background:#f2f4f8;box-shadow:0 1px 3px #0007;transition:transform .18s ease}
.td-root .td-home-toggle-track[data-on="true"] .td-home-toggle-knob{transform:translateX(16px)}

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


/* 1.0.0 manager-only accent palette: never styles Steam's own pages. */
.td-root{--td-accent:#902e4b;--td-accent-dark:#47202f;--td-accent-bright:#ffc0ce;--td-accent-border:#cf7791}
.td-root .td-version-chip,.td-root .td-pill{background:var(--td-accent-dark)!important;color:var(--td-accent-bright)!important;border-color:var(--td-accent-border)!important}
.td-root .td-btn.td-active:not(.gpfocus):not(:focus-visible),.td-root button.td-btn.td-active:not(.gpfocus):not(:focus-visible){background:var(--td-accent-dark)!important;border-color:var(--td-accent-border)!important;color:var(--td-accent-bright)!important}
.td-root .td-btn.gpfocus,.td-root .td-btn:focus-visible,.td-root button.td-btn.gpfocus,.td-root button.td-btn:focus-visible{outline:3px solid var(--td-accent-bright)!important;border-color:var(--td-accent-border)!important;background:var(--td-accent)!important;color:white!important;-webkit-text-fill-color:white!important;box-shadow:0 0 0 2px var(--td-accent-dark)!important}
.td-root button.td-game.gpfocus,.td-root button.td-game:focus-visible{outline:3px solid var(--td-accent-bright)!important;border-color:var(--td-accent-border)!important;background:var(--td-accent-dark)!important}
.td-root .td-setting-panel{border-color:#6f6170!important;background:#2a2430!important}
.td-root .td-setting-panel.td-panel-wide{background:var(--td-accent-dark)!important;border-color:var(--td-accent-border)!important}
.td-root button.td-game:not(.gpfocus):not(:focus-visible){background:linear-gradient(160deg,#31252e,#1c2028)!important;border-color:#634655!important}
.td-root .td-game-title{font-size:14px!important;line-height:1.34!important}
.td-root .td-game-sub{font-size:11px!important;line-height:1.36!important}
.td-root .td-page{white-space:nowrap!important;font-size:11px!important}
.td-root .td-custom-accent{display:flex;align-items:center;gap:8px}
.td-root .td-custom-accent input{flex:1;min-width:0;background:#181a23;color:white;border:2px solid var(--td-accent-border);border-radius:7px;padding:8px;font-size:14px}
.td-root .td-custom-accent .td-btn{flex:1}

/* 1.0.1 COMPLETE MANAGER PALETTE. Override prior fixed-gray rules and
   CSS Loader orange focus colors inside TitleDeck only. */
.td-root{
 background:radial-gradient(ellipse at 55% -22%,var(--td-raised) 0%,var(--td-backdrop) 56%,var(--td-inset) 100%)!important;
 color:#fff3f7!important;-webkit-text-fill-color:initial!important;
}
.td-root .td-shell{background:transparent!important}
.td-root .td-header,.td-root .td-rail,.td-root .td-actions,.td-root .td-bottom{
 background:linear-gradient(125deg,var(--td-raised),var(--td-surface))!important;
 border:1px solid var(--td-accent-border)!important;
 box-shadow:inset 0 1px 0 #ffffff1a,0 3px 15px #0005!important;
 color:#fff1f6!important;
}
.td-root .td-workspace{background:linear-gradient(165deg,var(--td-backdrop),var(--td-inset))!important;
 border:1px solid var(--td-accent-border)!important;border-radius:10px!important;
 scrollbar-color:var(--td-accent-border) var(--td-inset)!important;
}
.td-root .td-workspace::-webkit-scrollbar-thumb{background:var(--td-accent-border)!important}
.td-root .td-heading,.td-root .td-title-large,.td-root .td-title-large *,
.td-root .td-game-title,.td-root .td-review-custom{color:#fff6f8!important;-webkit-text-fill-color:#fff6f8!important}
.td-root .td-sub,.td-root .td-rail-label,.td-root .td-results,.td-root .td-status,
.td-root .td-bottom,.td-root .td-game-sub,.td-root .td-setting-panel p,
.td-root .td-settings-intro,.td-root .td-editor-note,.td-root .td-small,
.td-root .td-copy-label{color:var(--td-muted)!important;-webkit-text-fill-color:var(--td-muted)!important}
.td-root .td-card,.td-root .td-setting-panel,.td-root .td-setting-panel.td-panel-wide,
.td-root .td-confirm,.td-root .td-confirm-examples,.td-root .td-preview,
.td-root .td-cleanup-preview,.td-root .td-cleanup-comparison>div,
.td-root .td-review-panel,.td-root .td-native-entry{
 background:linear-gradient(155deg,var(--td-raised),var(--td-surface))!important;
 border-color:var(--td-accent-border)!important;color:#fff2f6!important;
 box-shadow:inset 0 1px 0 #ffffff12!important;
}
.td-root button.td-game,.td-root button.td-game:not(.gpfocus):not(:focus-visible){
 background:linear-gradient(155deg,var(--td-tile),var(--td-surface))!important;
 border-color:var(--td-accent-border)!important;color:#fff2f6!important;
 box-shadow:inset 0 1px 0 #ffffff13,0 3px 12px #0004!important;
}
.td-root .td-game-artbox,.td-root .td-art,.td-root .td-art-pending,
.td-root .td-art-fallback{background:var(--td-inset)!important}
.td-root .td-game-mark,.td-root .td-pill,.td-root .td-version-chip{
 background:var(--td-accent)!important;border-color:var(--td-accent-bright)!important;
 color:#fff!important;-webkit-text-fill-color:#fff!important;
 box-shadow:0 0 12px var(--td-accent-border)!important;
}
.td-root button.td-btn,.td-root button.td-btn:not(.gpfocus):not(:focus-visible),
.td-root .td-btn:not(.gpfocus):not(:focus-visible){
 background:linear-gradient(180deg,var(--td-raised),var(--td-surface))!important;
 color:#fff2f6!important;-webkit-text-fill-color:#fff2f6!important;
 border-color:var(--td-accent-border)!important;
 box-shadow:inset 0 1px 0 #ffffff1a!important;
}
.td-root button.td-btn.td-active,.td-root button.td-btn.td-active:not(.gpfocus):not(:focus-visible){
 background:var(--td-accent)!important;color:#fff!important;-webkit-text-fill-color:#fff!important;
 border-color:var(--td-accent-bright)!important;
 box-shadow:0 0 12px var(--td-accent-border)!important;
}
@keyframes tdFocusHeartbeat{
  0%,100%{box-shadow:0 0 0 2px var(--td-accent-bright),0 0 9px var(--td-accent-border),inset 0 0 8px var(--td-accent-dark)}
  50%{box-shadow:0 0 0 3px var(--td-accent-bright),0 0 20px 3px var(--td-accent-border),inset 0 0 12px var(--td-accent)}
}
.td-root button.td-game.gpfocus,.td-root button.td-game:focus,
.td-root button.td-game:focus-visible,.td-root button.td-btn.gpfocus,
.td-root button.td-btn:focus,.td-root button.td-btn:focus-visible,
.td-root .td-btn.gpfocus,.td-root .td-btn:focus-visible,
.td-root [data-td-focus].gpfocus{
 background:var(--td-accent)!important;
 background-image:linear-gradient(135deg,var(--td-accent),var(--td-accent-dark))!important;
 color:#fff!important;-webkit-text-fill-color:#fff!important;
 outline:3px solid var(--td-accent-bright)!important;outline-offset:1px!important;
 border-color:var(--td-accent-bright)!important;
 animation:tdFocusHeartbeat 2.15s ease-in-out infinite!important;
}
.td-root .td-setting-panel h3,.td-root .td-editor-original-meta strong,
.td-root .td-cleanup-heading{color:var(--td-accent-bright)!important}
.td-root .td-setting-panel input,.td-root .td-native-field input,
.td-root .td-native-field textarea,.td-root .td-custom-accent input{
 background:var(--td-inset)!important;color:#fff6f9!important;
 -webkit-text-fill-color:#fff6f9!important;border-color:var(--td-accent-border)!important;
}
.td-root .td-toast{background:var(--td-raised)!important;border-color:var(--td-accent-border)!important}
/* CSS Loader may place focus on a parent or a descendant, not the button
   itself. Keep the selected tile identifiable regardless of focus transport. */
.td-root button.td-game:focus-within,.td-root button.td-btn:focus-within,
.td-root .td-grid-row:focus-within button.td-game:focus,
.td-root .td-tab:focus-within,.td-root button.td-tab.gpfocus{
 border-color:var(--td-accent-bright)!important;
 outline:3px solid var(--td-accent-bright)!important;outline-offset:1px!important;
 background:linear-gradient(145deg,var(--td-accent),var(--td-accent-dark))!important;
 box-shadow:0 0 0 2px var(--td-accent-border),0 0 19px var(--td-accent-border)!important;
 animation:tdFocusHeartbeat 2.15s ease-in-out infinite!important;
}
@media (prefers-reduced-motion:reduce){
 .td-root button.td-game.gpfocus,.td-root button.td-game:focus-visible,
 .td-root button.td-btn.gpfocus,.td-root button.td-btn:focus-visible,
 .td-root .td-btn.gpfocus,.td-root button.td-game:focus-within,
 .td-root button.td-btn:focus-within,.td-root .td-tab:focus-within,
 .td-root button.td-tab.gpfocus{animation:none!important}
}
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

/* 1.0.2 refined premium library: complete theme surfaces and glass tiles.
   All rules are isolated to TitleDeck; never change Steam or CSS Loader. */
.td-root{height:calc(100dvh - 64px)!important;max-height:calc(100dvh - 64px)!important;min-height:0!important;overflow:hidden!important}
.td-root .td-shell{min-height:0!important;max-height:100%!important}
.td-root .td-actions{grid-template-columns:minmax(95px,2.1fr) repeat(3,minmax(62px,1fr)) repeat(3,minmax(48px,.7fr)) auto!important;gap:5px!important}
.td-root .td-actions .td-results{font-size:10px!important;padding:0 3px!important}
.td-root .td-rail,.td-root .td-actions{position:relative;z-index:2}
.td-root button.td-game,.td-root button.td-game:not(.gpfocus):not(:focus-visible){
 background:linear-gradient(150deg, color-mix(in srgb,var(--td-raised) 75%,#fff 4%),var(--td-tile) 54%,var(--td-inset))!important;
 border:1px solid color-mix(in srgb,var(--td-accent-border) 60%,#fff 8%)!important;
 backdrop-filter:blur(14px) saturate(130%)!important;
 -webkit-backdrop-filter:blur(14px) saturate(130%)!important;
 box-shadow:inset 0 1px 0 #ffffff32,inset 0 0 22px #ffffff08,0 7px 15px #0006!important;
 transition:box-shadow .18s ease,background .18s ease,border-color .18s ease!important;
}
.td-root button.td-game::after{content:'';position:absolute;inset:0;pointer-events:none;
 background:linear-gradient(125deg,#ffffff12 0%,transparent 42%,#ffffff07 100%);border-radius:inherit}
.td-root button.td-game.gpfocus,.td-root button.td-game:focus-visible,.td-root button.td-game:focus{
 background:linear-gradient(155deg,var(--td-accent),var(--td-accent-dark))!important;
 border-color:var(--td-accent-bright)!important;
 box-shadow:0 0 0 2px var(--td-accent-border),0 0 26px 3px var(--td-accent-border),inset 0 1px 0 #ffffff77!important;
}
.td-root .td-game-sub{display:flex!important;align-items:center!important;gap:4px!important}
.td-root .td-installed-dot{color:#39ee94!important;-webkit-text-fill-color:#39ee94!important;
 font-size:14px!important;line-height:1!important;text-shadow:0 0 8px #39ee9499,0 0 3px #39ee94!important}
.td-root .td-installed-label{color:#c4e3ce!important;-webkit-text-fill-color:#c4e3ce!important}
.td-root .td-header{flex-shrink:0!important}
@media(max-width:1030px){.td-root .td-actions .td-results{display:none!important}}
@media(max-height:660px){.td-root{height:calc(100dvh - 52px)!important;max-height:calc(100dvh - 52px)!important}}
@media(prefers-reduced-motion:reduce){.td-root button.td-game{transition:none!important}}
/* 1.0.3: Reserve the SteamOS header's visual space. The root was only
   shortened in 1.0.2, leaving its upper rows UNDER the fixed Steam bar.
   --td-top-safe is measured from the actual route mount, and is zero if
   Steam already reserved the space. */
.td-root{
 margin-top:var(--td-top-safe,0px)!important;
 height:calc(100dvh - 64px)!important;
 max-height:calc(100dvh - 64px)!important;
 scroll-margin-top:68px!important;
}
.td-root .td-header{position:relative!important;z-index:5!important}
.td-root .td-rail,.td-root .td-actions{z-index:4!important}
/* 1.0.5: settings DOM really is one-column; its controller focus graph now follows
   this same vertical order. The palette is the only intentionally 4-wide grid. */
.td-root .td-settings{max-width:900px!important}
.td-root .td-settings-grid{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:11px!important}
.td-root .td-settings-grid .td-setting-panel{grid-column:1/-1!important;width:100%!important;min-width:0!important}
/* 1.0.6: override legacy TWO-COLUMN !important on .td-card-buttonrow.
   Otherwise Steam's spatial nav correctly follows the mistaken horizontal grid. */
.td-root .td-settings-grid .td-description-position-options{
  display:grid!important;grid-template-columns:minmax(0,1fr)!important;
  grid-auto-flow:row!important;grid-auto-rows:minmax(48px,auto)!important;
  align-items:stretch!important;justify-items:stretch!important;gap:9px!important;
}
.td-root .td-description-position-options>.td-btn{display:block!important;width:100%!important;min-width:0!important;text-align:left!important;}
.td-root .td-picker-panel{margin:12px auto;max-width:850px;border-radius:18px;padding:16px;background:var(--td-surface);border:2px solid var(--td-accent-border);box-shadow:0 15px 45px #0008;}
.td-root .td-picker-help{font-size:13px;line-height:1.4;margin:8px 0;color:var(--td-accent-bright)!important;}
.td-root .td-picker-gradient-hue{display:block!important;position:relative!important;width:100%!important;height:45px!important;padding:0!important;margin:8px 0 16px!important;overflow:visible!important;
  background:linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)!important;border:2px solid #fff9!important;border-radius:8px!important;}
.td-root .td-picker-gradient-hue-indicator{pointer-events:none;position:absolute;top:-5px;bottom:-5px;width:4px;border:1px solid #000;background:#fff;box-shadow:0 0 0 2px #fff8,0 0 9px #000;transform:translateX(-50%);}
.td-root .td-picker-gradient-square{display:block!important;position:relative!important;width:100%!important;min-height:185px!important;padding:0!important;margin:8px 0 14px!important;
  background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,transparent)!important;
  border:2px solid #fffb!important;border-radius:10px!important;touch-action:none;}
.td-root .td-picker-gradient-square-cursor{pointer-events:none;position:absolute;width:17px;height:17px;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 2px #222,0 0 10px #000;transform:translate(-50%,-50%);}
.td-root .td-picker-channel-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:10px 0 18px;}
.td-root .td-picker-channel{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;background:var(--td-inset);border-radius:8px;border:1px solid var(--td-accent-border);padding:9px;}
.td-root .td-picker-channel>span{grid-column:1 / -1;font-size:14px;font-weight:700;text-align:center;}
.td-root .td-picker-channel .td-btn{min-height:40px!important;}
.td-root .td-picker-hues{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:5px;margin:10px 0 16px;}
.td-root .td-picker-shades{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:5px;margin:10px 0;}
.td-root .td-picker-hues .td-btn,.td-root .td-picker-shades .td-btn{min-height:44px!important;padding:2px!important;border-radius:8px!important;}
.td-root .td-picker-chip{display:block;width:100%;height:37px;border-radius:6px;border:1px solid #fffa;box-shadow:inset 0 1px 3px #fff5;}
.td-root .td-picker-chip[data-selected='true']{outline:3px solid white;outline-offset:-3px;}
.td-root .td-picker-selected{display:flex;align-items:center;gap:12px;font-size:16px;font-weight:bold;margin:8px 0 12px;}
.td-root .td-picker-preview{width:60px;height:42px;border-radius:8px;border:2px solid #fffa;}
.td-root .td-picker-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:15px;}

.td-root .td-color-picker{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:8px!important;margin:10px 0!important}
.td-root button.td-swatch{height:72px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:4px!important;padding:5px!important}
.td-root .td-swatch-chip{width:100%!important;max-width:130px!important;height:30px!important;border-radius:7px!important;border:1px solid #fff8!important;box-shadow:inset 0 2px 4px #fff4,0 2px 8px #0006!important}
.td-root .td-custom-accent{display:flex!important;flex-direction:column!important;gap:8px!important}
.td-root .td-swatch-label{font-size:11px!important;color:#fff!important;-webkit-text-fill-color:#fff!important}
.td-root button.td-swatch-selected{border:2px solid var(--td-accent-bright)!important}
/* CSS Loader owns Steam's top chrome, not TitleDeck. Avoid creating a second
   opaque header-sized strip on the app root. Keep 1.0.3's clearance. */
.td-root{background:transparent!important}
@media(max-height:660px){.td-root{height:calc(100dvh - 52px)!important;max-height:calc(100dvh - 52px)!important}}
`;
const dir=e=>Number(e?.detail?.button??-1);
function halt(e){e?.preventDefault?.();e?.stopPropagation?.();}
/** Scroll ONLY TitleDeck's tile viewport. Native scrollIntoView also scrolls
 * Valve's parent page and can push the entire manager header under SteamUI. */
export function scrollLibraryTileIntoView(el){
  if(!el)return false;
  const work=el.closest?.('[data-td-scroll="library"]');
  if(!work)return false;
  try{
    const cell=el.getBoundingClientRect?.(),frame=work.getBoundingClientRect?.();
    if(!cell||!frame)return true;
    if(cell.top<frame.top+3)work.scrollTop-=frame.top+3-cell.top;
    else if(cell.bottom>frame.bottom-3)work.scrollTop+=cell.bottom-(frame.bottom-3);
    return true;
  }catch{return false}
}
/** Scroll Settings and game tiles inside TitleDeck, never Steam's outer
 * library route. CSS Loader headers must retain their own scroll position. */
export function scrollManagerNodeIntoView(el){
  if(!el)return false;
  const work=el.closest?.('[data-td-scroll="settings"], [data-td-scroll="library"]');
  if(!work)return false;
  try{
    const r=el.getBoundingClientRect?.(),b=work.getBoundingClientRect?.();
    if(!r||!b)return true;
    if(r.top<b.top+5)work.scrollTop-=b.top+5-r.top;
    else if(r.bottom>b.bottom-5)work.scrollTop+=r.bottom-b.bottom+5;
    return true;
  }catch{return false}
}
/** Check the actual rendered location rather than assuming TitleDeck begins
 * below Steam's permanently visible chrome. Never move the route itself. */
export function fitManagerBelowSteamHeader(root,viewport=globalThis){
  if(!root?.style||!root.getBoundingClientRect)return 0;
  try{
    const existing=Number.parseFloat(root.style.getPropertyValue('--td-top-safe'))||0;
    const top=root.getBoundingClientRect().top-existing;
    const h=Number(viewport?.innerHeight||root.ownerDocument?.defaultView?.innerHeight)||720;
    const safe=h<=670?52:64;
    const inset=Math.max(0,Math.min(safe,Math.ceil(safe-top)));
    if(existing!==inset)root.style.setProperty('--td-top-safe',`${inset}px`);
    return inset;
  }catch{return 0}
}
function focusNode(el){
  if(!el)return false;
  try{const get=UI?.getGamepadNavigationTrees;if(typeof get==='function'){
    const roots=get(),stack=Array.isArray(roots)?[...roots]:[roots],seen=new Set();let n=0;
    while(stack.length&&n++<6000){const item=stack.pop();if(!item||typeof item!=='object'||seen.has(item))continue;seen.add(item);
      const node=item.m_element||item.element||item.m_HTMLElement||item.m_DOMElement||item.m_el;
      if(node===el||(node&&el?.contains?.(node))){const take=item.BTakeFocus||item.TakeFocus||item.takeFocus;if(typeof take==='function'&&take.call(item)!==false){if(!scrollManagerNodeIntoView(node||el))(node||el).scrollIntoView?.({block:'nearest'});return true;}}
      for(const key of ['m_Children','children','m_rgChildren','m_vecChildren','m_FocusableChildren']){
        const val=item[key];if(Array.isArray(val))stack.push(...val);else if(val&&typeof val==='object')stack.push(val);
      }
    }
  }}catch{}
  try{el.focus?.({preventScroll:true});if(!scrollManagerNodeIntoView(el))el.scrollIntoView?.({block:'nearest'});return el.ownerDocument?.activeElement===el;}catch{return false;}
}
function focusQuery(root,selector,delay=0){setTimeout(()=>{try{focusNode(root?.querySelector(selector));}catch{}},delay);}
export function scrollDescriptionWorkspace(root,bottom=true){
  const scroller=root?.querySelector?.('[data-td-description-workspace]');
  if(!scroller)return false;
  try{scroller.scrollTop=bottom?scroller.scrollHeight:0;return true}catch{return false}
}
/** Restore manager chrome when Steam has also scrolled its outer route.
 * Only called for library toolbar/home navigation, never ordinary tiles. */
function scrollManagerChromeToTop(root){
  if(!root)return;
  let outer=root.parentElement;
  for(let depth=0;outer&&depth<12;outer=outer.parentElement,depth++)
    if(outer.scrollTop>0)outer.scrollTop=0;
  const doc=root.ownerDocument;
  if(doc?.scrollingElement?.scrollTop>0)doc.scrollingElement.scrollTop=0;
}
export function scrollManagerToTop(root){
  if(!root)return false;
  let changed=false;
  try{
    const work=root.querySelector?.('[data-td-scroll="library"]');
    if(work){work.scrollTop=0;changed=true}
    let outer=root.parentElement;
    for(let depth=0;outer&&depth<12;outer=outer.parentElement,depth++){
      if(outer.scrollTop>0){outer.scrollTop=0;changed=true}
    }
    const doc=root.ownerDocument;
    if(doc?.scrollingElement?.scrollTop>0){doc.scrollingElement.scrollTop=0;changed=true}
  }catch{}
  return changed;
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
/** Prefer covers that Steam already has (including SteamGridDB custom art).
 *  In Steam's Gaming Mode CEF, /customimages and /assets are native paths.
 *  The public Steam CDN is a final fallback, never the only art source.
 *  A missing user-customized image must not mutate Steam's artwork files. */
export function coverSources(appid){
  const id=normId(appid);
  if(!id)return[];
  const parentId=({'4226020':'3920610','3815860':'1984270'})[id]; // Verified parent games for Fatal Frame II and Digimon Time Stranger demos.
  return [
    // Steam's native custom portrait files come first, including SteamGridDB overrides.
    `/customimages/${id}p.png`,
    `/customimages/${id}p.jpg`,
    `/customimages/${id}p.webp`,
    `/assets/${id}/library_600x900.jpg`,
    `/assets/${id}/library_600x900.png`,
    `/assets/${id}/library_600x900.webp`,
    // Modern Steam store artwork can require a content hash. Verified official
    // Jurassic World Evolution 3 portrait (App 2958130); custom art wins first.
    ...(id==='2958130'?[
      `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2958130/317faa59ced4fff3eae44f72df7785b841340eb5/library_600x900.jpg`
    ]:[]),
    // Some applications and demos have headers/capsules but no portrait.
    `/assets/${id}/library_capsule.jpg`,
    `/assets/${id}/header.jpg`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${id}/library_600x900.jpg`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${id}/library_600x900.png`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${id}/library_capsule.jpg`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${id}/header.jpg`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${id}/capsule_616x353.jpg`,
    `https://shared.fastly.steamstatic.com/steam/apps/${id}/library_600x900.jpg`,
    `https://shared.fastly.steamstatic.com/steam/apps/${id}/header.jpg`,
    ...(parentId?[
      `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${parentId}/library_600x900.jpg`,
      `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${parentId}/header.jpg`
    ]:[])
  ];
}

export function savedDescriptionPreview(text,limit=210){
  const full=String(text||''),flat=full.replace(/\s+/g,' ').trim();
  const max=Math.min(300,Math.max(80,Number(limit)||210));
  return{length:Array.from(full).length,excerpt:flat.length>max?flat.slice(0,max).trimEnd()+'…':flat,
    truncated:flat.length>max};
}
// Resolve artwork once, persist only successful source indices in TitleDeck's
// private settings, and hydrate before rendering tiles on the next Deck start.
// Failed candidates are remembered within a session, never embedded as URLs.
const coverResolutionCache=new Map();
const COVER_CACHE_MAX=1200, COVER_CACHE_TTL=30*24*60*60*1000;
let coverPersistTimer=null,coverWriteRevision=0;
export function hydrateCoverResolutionCache(snapshot){
  if(!snapshot||typeof snapshot!=='object')return;
  for(const [id,index] of Object.entries(snapshot)){
    if(!normId(id)||!Number.isInteger(index)||index<0||index>=coverSources(id).length)continue;
    const old=coverResolutionCache.get(id);
    if(!old||!old.loaded)coverResolutionCache.set(id,{index,loaded:true,time:Date.now()});
  }
  while(coverResolutionCache.size>COVER_CACHE_MAX)coverResolutionCache.delete(coverResolutionCache.keys().next().value);
}
function successfulCoverIndices(){
  const cache={};for(const [id,entry] of coverResolutionCache)if(entry.loaded)cache[id]=entry.index;
  return cache;
}
function scheduleCoverPersistence(){
  if(coverPersistTimer!==null)return;
  const revision=coverWriteRevision;
  coverPersistTimer=setTimeout(()=>{
    coverPersistTimer=null;
    if(revision!==coverWriteRevision)return;
    // The backend writes an atomic independent JSON cache. Never block cover
    // loading if the Decky bridge is temporarily disconnected at startup.
    void call('save_cover_cache',successfulCoverIndices()).catch(()=>{});
  },850);
}
export function cachedCoverStartIndex(appid){
  const id=normId(appid),entry=coverResolutionCache.get(id);
  if(!entry)return 0;
  if(Date.now()-entry.time>COVER_CACHE_TTL){coverResolutionCache.delete(id);return 0;}
  coverResolutionCache.delete(id);coverResolutionCache.set(id,entry);
  return entry.index;
}
export function rememberCoverResolution(appid,index,loaded=false){
  const id=normId(appid),sources=coverSources(id);
  if(!id||!Number.isInteger(index)||index<0||index>=sources.length)return;
  const existing=coverResolutionCache.get(id);
  if(existing?.loaded&&!loaded&&existing.index!==index)return;
  const next=loaded?index:Math.min(index+1,sources.length);
  if(existing?.loaded===Boolean(loaded)&&existing.index===next)return;
  coverResolutionCache.delete(id);
  coverResolutionCache.set(id,{index:next,loaded:Boolean(loaded),time:Date.now()});
  while(coverResolutionCache.size>COVER_CACHE_MAX)coverResolutionCache.delete(coverResolutionCache.keys().next().value);
  if(loaded)scheduleCoverPersistence();
}
export function resetCoverResolutionCache(){
  coverWriteRevision++;
  if(coverPersistTimer!==null){clearTimeout(coverPersistTimer);coverPersistTimer=null}
  coverResolutionCache.clear();
  localArtworkCache.clear();
}
// Local Steam grid artwork can be available to the Decky backend but not the
// frontend CEF URL namespace. Read-only backend fallback, bounded memory cache.
const localArtworkCache=new Map();
export function cachedLocalArtwork(appid){return localArtworkCache.get(normId(appid))||null}
export function rememberLocalArtwork(appid,dataUri){
  const id=normId(appid);
  if(!id||typeof dataUri!=='string'||!/^data:image\/(?:jpeg|png|webp);base64,/.test(dataUri)||dataUri.length>7_000_000)return false;
  localArtworkCache.delete(id);localArtworkCache.set(id,dataUri);
  while(localArtworkCache.size>28)localArtworkCache.delete(localArtworkCache.keys().next().value);
  return true;
}
function Cover({id,title,className='',priority=false,tile=false}){
  const sources=coverSources(id);
  const [candidate,setCandidate]=R.useState(()=>({id,index:cachedCoverStartIndex(id)}));
  const [loadedKey,setLoadedKey]=R.useState('');
  const [localResult,setLocalResult]=R.useState(()=>({id,status:'idle',uri:cachedLocalArtwork(id)}));
  const index=candidate.id===id?candidate.index:cachedCoverStartIndex(id);
  const localUri=localResult.id===id?localResult.uri:cachedLocalArtwork(id);
  const localStatus=localResult.id===id?localResult.status:'idle';
  const exhausted=index>=sources.length;
  R.useEffect(()=>{
    if(index<6||!normId(id)||localUri||localStatus!=='idle')return;
    let active=true;
    setLocalResult({id,status:'loading',uri:null});
    void call('get_local_cover',id).then(result=>{
      if(!active)return;
      const uri=String(result?.data_uri||'');
      if(rememberLocalArtwork(id,uri))setLocalResult({id,status:'loaded',uri});
      else setLocalResult({id,status:'missing',uri:null});
    }).catch(()=>{if(active)setLocalResult({id,status:'missing',uri:null})});
    return()=>{active=false};
  },[id,index,localUri,localStatus]);
  const useLocal=!!localUri;
  const key=useLocal?`${id}-local`:`${id}-${index}`;
  const ready=loadedKey===key;
  const initials=title?.trim()?.slice(0,2)?.toUpperCase()||'G';
  if(!sources.length||(exhausted&&!localUri))
    return h('div',{className:`td-art-fallback ${className}`},initials);
  const imageSrc=useLocal?localUri:sources[index];
  return h(R.Fragment,null,
    !ready?h('div',{className:'td-art-fallback td-art-pending','aria-hidden':'true'},initials):null,
    // A soft full-bleed copy fills the portrait/square tile's empty margins.
    // The sharp foreground stays uncropped, preserving logos and faces.
    tile?h('img',{key:`${key}-backdrop`,className:'td-art-backdrop',src:imageSrc,
      loading:priority?'eager':'lazy',decoding:'async',alt:'','aria-hidden':'true'}):null,
    h('img',{key,className:`td-art ${className}`,
      style:ready?null:{opacity:0},loading:priority?'eager':'lazy',decoding:'async',alt:'',src:imageSrc,
      onLoad:()=>{if(!useLocal)rememberCoverResolution(id,index,true);setLoadedKey(key)},
      onError:()=>{
        setLoadedKey('');
        if(useLocal){localArtworkCache.delete(normId(id));setLocalResult({id,status:'missing',uri:null});return;}
        rememberCoverResolution(id,index,false);setCandidate({id,index:Math.min(index+1,sources.length)});
      }}));
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
  placeholder='Enter a game display name…',fieldKind='name',nonSteamDescription=false,finishFocus='edit-save'}){
  // Title fields remain at 180; descriptions have no artificial maxLength.
  maxLength=fieldKind==='description'?undefined:maxLength;
  const wrap=R.useRef(null),latest=R.useRef({value,setValue,onEnter,maxLength,finishFocus});
  const clearedDraft=R.useRef(null),[clearUndoAvailable,setClearUndoAvailable]=R.useState(false);
  latest.current={value,setValue,onEnter,maxLength,finishFocus};
  const sync=()=>{
    const field=wrap.current?.querySelector?.('input,textarea');
    if(typeof field?.value!=='string')return latest.current.value;
    // A legacy saved synopsis can exceed today's cap. Polling the Steam
    // keyboard must never truncate an unchanged legacy description.
    if(field.value===latest.current.value)return latest.current.value;
    const max=latest.current.maxLength;
    const next=Number.isFinite(max)&&max>0?field.value.slice(0,max):field.value;
    if(next!==latest.current.value){
      if(clearedDraft.current!==null){clearedDraft.current=null;setClearUndoAvailable(false)}
      latest.current.value=next;latest.current.setValue(next);
    }
    return next;
  };
  const applyDraft=next=>{
    const field=wrap.current?.querySelector?.('input,textarea');
    if(field&&typeof field.value==='string')field.value=next;
    latest.current.value=next;
    latest.current.setValue(next);
  };
  const clearOrUndo=()=>{
    if(fieldKind!=='description')return;
    if(clearedDraft.current!==null){
      const previous=clearedDraft.current;
      clearedDraft.current=null;setClearUndoAvailable(false);
      applyDraft(previous);
      return;
    }
    const before=sync(); // Capture unsaved Steam keyboard text before clearing.
    if(!before)return;
    clearedDraft.current=before;
    applyDraft('');
    setClearUndoAvailable(true);
    // Only the draft changes. Saving or Restore Default remains explicit.
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
      // A false/stale initial Steam keyboard status is not a confirmed close.
      // This fallback must not be suppressed by an unrelated "closed" event.
      schedule(()=>{if(motion.requested&&!motion.raised)show()},260);
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
    activeInlineKeyboard={begin,show,close,done:onDone};
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
  const change=e=>{const text=textFromNativeEvent(e,latest.current.value),max=latest.current.maxLength;
    const next=Number.isFinite(max)&&max>0?text.slice(0,max):text;
    if(next!==latest.current.value&&clearedDraft.current!==null){
      clearedDraft.current=null;setClearUndoAvailable(false);
    }
    latest.current.value=next;latest.current.setValue(next)};
  const enter=()=>{sync();activeInlineKeyboard?.close();latest.current.onEnter()};
  const props={value,onChange:change,onEnterKeyPress:enter,autoFocus:false,bShouldAutoFocus:false,
    label,placeholder,maxLength,
    // Steam adds a clear-text X by default; retain it for title edits but
    // not for descriptions, where a mistaken A press could erase a long draft.
    bShowClearAction:fieldKind!=='description','aria-label':label};
  return h('div',{ref:wrap,className:`td-native-field ${fieldKind==='description'?'td-game-description-field':'td-game-name-field'}`,
    'data-td-inline-game-name':fieldKind==='name'?'true':undefined,'data-td-inline-description':fieldKind==='description'?'true':undefined,
    onInputCapture:sync,onPasteCapture:()=>setTimeout(sync,0)},
    UI?.TextField?h(UI.TextField,props):h('input',{...props,type:'text',onKeyDown:e=>{if(e?.key==='Enter'){e.preventDefault?.();enter()}}}),
    fieldKind==='description'?h('div',{className:'td-description-character-count',
      'data-td-description-count':'true'},Array.from(value).length+' characters'):null,
    h('div',{className:'td-inline-keyboard-fallback'},
      fieldKind==='description'
        ?h(Btn,{className:'td-inline-finish','data-td-description-clear':'true',
          disabled:!clearUndoAvailable&&!value.length,onClick:clearOrUndo},
          clearUndoAvailable?'↶ Undo clear':'Clear text field')
        :h(Btn,{className:'td-inline-finish',onClick:()=>{activeInlineKeyboard?.done();focusQuery(wrap.current?.closest?.('.td-root'),`[data-td-focus="${latest.current.finishFocus}"]`,50)}},'Done editing')));
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
export function editorDestination(key,d,{canSave=true,canRestore=true,canRestoreDescription=false}={}){
  if(![9,10,11,12].includes(d))return null;
  const active={
    'close':{10:'edit-back'},
    'edit-back':{9:'close',10:'edit-name',12:'edit-description'},
    'edit-description':{11:'edit-back',12:'edit-description-restore',10:'edit-name'},
    'edit-description-restore':{11:'edit-description',12:'edit-hide',10:'edit-restore'},
    'edit-hide':{11:'edit-description-restore',9:'edit-description',10:'edit-name'},
    'edit-name':{9:'edit-back',12:'edit-clean',10:'edit-save'},
    'edit-clean':{9:'edit-back',11:'edit-name',10:'edit-restore'},
    'edit-save':{9:'edit-name',12:'edit-restore'},
    'edit-restore':{9:'edit-clean',11:'edit-save'}
  };
  let to=active[key]?.[d]||null;
  if(to==='edit-description-restore'&&!canRestoreDescription)to='edit-hide';
  if(key==='edit-hide'&&d===11&&!canRestoreDescription)to='edit-description';
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
/** Controller settings navigation must match what is visually rendered.
 * Down NEVER means sideways into an unrelated settings card. The palette
 * uses a four-column controller grid; all other settings form one column. */
export function settingsFocusDestination(key,d,diagnostics=false){
  if(![9,10,11,12].includes(d))return null;
  const swatches=Array.from({length:12},(_,i)=>`setting-swatch-${i}`);
  const list=['setting-0','setting-backup','setting-backup-restore','setting-recover',
    'setting-placement-info','setting-placement-hero','setting-placement-below',
    ...(diagnostics?['setting-scan']:[]),'setting-theme','setting-stick',
    ...swatches,'setting-custom-edit','setting-custom','setting-restore-all'];
  if(key==='settings-back')return d===10?list[0]:null;
  const at=list.indexOf(key);if(at<0)return null;
  if(key.startsWith('setting-swatch-')){
    const n=Number(key.slice('setting-swatch-'.length));
    if(d===11&&n%4>0)return swatches[n-1];
    if(d===12&&n%4<3)return swatches[n+1];
    if(d===9)return n>=4?swatches[n-4]:'setting-stick';
    if(d===10)return n<8?swatches[n+4]:'setting-custom-edit';
    return null;
  }
  if(d===9){if(at===0)return 'settings-back';if(key==='setting-custom-edit')return swatches[8];return list[at-1]}
  if(d===10){if(key==='setting-stick')return swatches[0];return list[Math.min(list.length-1,at+1)]}
  return null;
}
/** Controlled pagination: scroll TitleDeck's own grid to the destination row.
 * Steam's full-page scrollIntoView can move the outer route and obscure buttons.
 * Different-sized tiles are accounted for using the destination row's DOM box. */
export function scrollLibraryPageToIndex(root,index,columns=4){
  const scroll=root?.querySelector?.('[data-td-scroll="library"]');
  const rowIndex=Math.max(0,Math.floor(index/Math.max(1,columns)));
  const row=root?.querySelector?.(`[data-td-row="${rowIndex}"]`);
  if(!scroll||!row)return false;
  try{
    const r=row.getBoundingClientRect?.(),b=scroll.getBoundingClientRect?.();
    if(r&&b&&Number.isFinite(r.top)&&Number.isFinite(b.top)){
      scroll.scrollTop=Math.max(0,scroll.scrollTop+r.top-b.top-3);
    }else if(Number.isFinite(row.offsetTop))scroll.scrollTop=Math.max(0,row.offsetTop);
    return true;
  }catch{return false}
}
/** Physical Steam controller button flags are NOT browser button indices.
 * Steam's native `ulButtons` maps B to 0x200000 (already used by our working
 * editor) and the shoulders to LB=0x080000, RB=0x040000. 1.1.4 mistakenly
 * used 0x08/0x04, which denote OTHER Steam Controller button states.
 * `ulUpperButtons` is captured diagnostically but cannot be decoded with
 * lower-word button constants: it describes a different set of inputs.
 */
export function titleDeckShoulderState(sample){
  if(!sample||typeof sample!=='object')return {left:false,right:false};
  if(Array.isArray(sample.buttons))return {
    left:Boolean(sample.buttons[4]?.pressed),right:Boolean(sample.buttons[5]?.pressed)};
  const flags=Number(sample.ulButtons);
  const mask=Number.isFinite(flags)?flags:0;
  const pressureLeft=Number(sample.sPressureBumperLeft);
  const pressureRight=Number(sample.sPressureBumperRight);
  return {
    left:Boolean((mask&0x080000)!==0||sample.bLeftBumper===true||sample.bL1===true||
      (Number.isFinite(pressureLeft)&&pressureLeft>0)),
    right:Boolean((mask&0x040000)!==0||sample.bRightBumper===true||sample.bR1===true||
      (Number.isFinite(pressureRight)&&pressureRight>0))
  };
}

/** Steam's actual Deck navigation is routed through the focused UI tree.
 * Unlike navigator.getGamepads(), `onButtonDown` on a Decky Focusable receives
 * built-in Deck shoulders. This is the enum exported by Decky's FooterLegend:
 * BUMPER_LEFT=5 and BUMPER_RIGHT=6. Do not use browser button positions 4/5.
 * Ignore repeats; all ordinary D-pad, A/B, triggers stay in Steam's focus flow.
 */
export function titleDeckFocusShoulder(event){
  const detail=event?.detail||event;
  if(!detail||typeof detail!=='object'||detail.is_repeat===true)return 0;
  const button=detail.button;
  if(button===5||button==='BUMPER_LEFT')return -1;
  if(button===6||button==='BUMPER_RIGHT')return 1;
  return 0;
}

// Diagnostic is bounded and only contains input-state numbers and source tags.
// No games, descriptions, controller serial numbers, paths or user settings.
const libraryControllerLog={events:[],callbacks:0,steamSamples:0,browserSamples:0,
  pages:0,registration:'not attempted'};
function logLibraryInput(kind,fields={}){
  const entry={kind};
  for(const key of ['left','right','buttons','upper','controller','delta','source']){
    const value=fields[key];
    if(typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value)||
       key==='source'&&typeof value==='string')entry[key]=value;
  }
  libraryControllerLog.events.push(entry);
  if(libraryControllerLog.events.length>64)libraryControllerLog.events.shift();
}
export function titleDeckControllerDiagnostic(){
  return {format:'titledeck-controller-v1',version:PLUGIN_VERSION,
    registration:libraryControllerLog.registration,
    callbacks:libraryControllerLog.callbacks,steamSamples:libraryControllerLog.steamSamples,
    browserSamples:libraryControllerLog.browserSamples,pages:libraryControllerLog.pages,
    events:libraryControllerLog.events.slice()};
}
/** One input lifecycle for Steam native events AND browser Gamepad fallback.
 * Scope to Full Library Manager; preserve pageLibrary() and use rising edges.
 */
export function createLibraryShoulderBridge(onPage,env=globalThis){
  const host=env.window||env;
  const now=()=>typeof env.now==='function'?env.now():Date.now();
  const steamControllers=new Map();
  let interval=null,unregister=null,previousLeft=false,previousRight=false,lastFireAt=-Infinity;
  let previousBrowserLeft=false,previousBrowserRight=false;
  const browserState=()=>{
    let left=false,right=false;
    const navigators=[host?.navigator,env.navigator];
    const visited=new Set();
    for(const nav of navigators){
      if(!nav||visited.has(nav))continue;visited.add(nav);
      try{
        for(const pad of nav.getGamepads?.()||[]){
          if(!pad||pad.connected===false)continue;
          const state=titleDeckShoulderState(pad);
          left=left||state.left;right=right||state.right;
        }
      }catch{}
    }
    if(left!==previousBrowserLeft||right!==previousBrowserRight){
      libraryControllerLog.browserSamples++;
      logLibraryInput('browser-change',{left,right,source:'gamepad'});
      previousBrowserLeft=left;previousBrowserRight=right;
    }
    return {left,right};
  };
  function reconcile(){
    if(interval===null)return;
    const time=now(),browser=browserState();
    let left=browser.left,right=browser.right;
    for(const [id,state] of steamControllers){
      // Bound a stale native state in case a controller disconnects silently.
      if(time-state.time>1200){steamControllers.delete(id);continue}
      left=left||state.left;right=right||state.right;
    }
    const rightEdge=right&&!previousRight,leftEdge=left&&!previousLeft;
    if(time-lastFireAt>=150){
      if(rightEdge){lastFireAt=time;if(onPage(1)!==false){libraryControllerLog.pages++;logLibraryInput('page',{delta:1,source:'shoulder'});}}
      else if(leftEdge){lastFireAt=time;if(onPage(-1)!==false){libraryControllerLog.pages++;logLibraryInput('page',{delta:-1,source:'shoulder'});}}
    }
    previousLeft=left;previousRight=right;
  }
  function steamChanges(changes){
    if(interval===null)return;
    libraryControllerLog.callbacks++;
    for(const sample of Array.isArray(changes)?changes:[changes]){
      if(!sample||typeof sample!=='object')continue;
      if(!('ulButtons' in sample)&&!('ulUpperButtons' in sample)&&
         !('sPressureBumperLeft' in sample)&&!('sPressureBumperRight' in sample)&&
         !('bLeftBumper' in sample)&&!('bRightBumper' in sample)&&
         !('bL1' in sample)&&!('bR1' in sample))continue;
      const index=Number(sample.unControllerIndex),key=Number.isFinite(index)?String(index):'default';
      const state=titleDeckShoulderState(sample);
      const previous=steamControllers.get(key);
      const flags=Number(sample.ulButtons),upper=Number(sample.ulUpperButtons);
      // Save changes, not the high-frequency repeated state packets.
      if(!previous||previous.left!==state.left||previous.right!==state.right||
         previous.buttons!==flags||previous.upper!==upper){
        logLibraryInput('steam-change',{...state,controller:Number.isFinite(index)?index:-1,
          buttons:Number.isFinite(flags)?flags:0,upper:Number.isFinite(upper)?upper:0,source:'steam'});
      }
      libraryControllerLog.steamSamples++;
      steamControllers.set(key,{...state,time:now(),buttons:flags,upper});
    }
    reconcile();
  }
  function start(){
    if(interval!==null)return;
    const set=host?.setInterval?.bind(host)||setInterval;
    interval=set(reconcile,70);
    logLibraryInput('manager-open');
    const input=host?.SteamClient?.Input||env?.SteamClient?.Input;
    libraryControllerLog.registration='unavailable';
    if(typeof input?.RegisterForControllerStateChanges==='function')try{
      const token=input.RegisterForControllerStateChanges(steamChanges);
      unregister=typeof token==='function'?token:
        typeof token?.unregister==='function'?()=>token.unregister():
        typeof token?.Unregister==='function'?()=>token.Unregister():null;
      libraryControllerLog.registration='registered';
    }catch{libraryControllerLog.registration='error'}
    logLibraryInput('steam-registration',{source:libraryControllerLog.registration});
  }
  function stop(){
    if(interval===null)return;
    const clear=host?.clearInterval?.bind(host)||clearInterval;
    clear(interval);interval=null;
    try{unregister?.()}catch{}
    unregister=null;steamControllers.clear();previousLeft=false;previousRight=false;
    logLibraryInput('manager-close');
  }
  return {start,stop};
}

// These are *only* Full Library Manager visibility preferences. Separate App
// IDs are separate Steam shortcuts, even when their labels are similar.
const HIDDEN_LIBRARY_STORE='titledeck-hidden-manager-entries-v1';
export function validHiddenManagerIds(raw){
  let ids=raw;
  if(typeof raw==='string'){try{ids=JSON.parse(raw)}catch{return[]}}
  if(!Array.isArray(ids))return[];
  return [...new Set(ids.map(normId).filter(Boolean))].slice(0,400);
}
export function managerVisibleGames(games,hiddenIds=[]){
  const excluded=new Set(validHiddenManagerIds(hiddenIds));
  return (games||[]).filter(g=>!excluded.has(normId(g?.appid)));
}
// Extend the settings focus graph ONLY for our reversible visibility row.
// The previously hardware-verified settingsFocusDestination stays unchanged.
export function settingsFocusWithHidden(key,d,diagnostics=false){
  if(key==='setting-0'&&d===10)return 'setting-home-menu';
  if(key==='setting-home-menu')return d===9?'setting-0':d===10?'setting-context-placement':null;
  if(key==='setting-context-placement')return d===9?'setting-home-menu':d===10?'setting-backup':null;
  if(key==='setting-backup'&&d===9)return 'setting-context-placement';
  if(key==='setting-recover'&&d===10)return 'setting-show-hidden';
  if(key==='setting-show-hidden')return d===9?'setting-recover':d===10?'setting-placement-info':null;
  if(key==='setting-placement-info'&&d===9)return 'setting-show-hidden';
  return settingsFocusDestination(key,d,diagnostics);
}
/** 1.1.8 Manager-only right-stick scrolling. Uses the same normalized axis
 * as accepted Game Info scrolling, but NEVER touches Steam's content or
 * registers a global navigation listener. Returns false at screen limits. */
export function scrollManagerWorkspaceByStick(root,amount,view='editor'){
  if(!root||!Number.isFinite(amount)||!amount||!['editor','description','settings','review'].includes(view))return false;
  // During OSK editing Steam owns the stick/focus; do not fight it.
  if(root.classList?.contains?.('td-inline-keyboard-open'))return false;
  const workspace=view==='description'
    ?root.querySelector?.('[data-td-description-workspace]')
    :root.querySelector?.('.td-workspace');
  if(!workspace)return false;
  const height=Number(workspace.scrollHeight)||0,shown=Number(workspace.clientHeight)||0;
  if(height<=shown+2||shown<=0)return false;
  const before=Number(workspace.scrollTop)||0;
  const next=Math.max(0,Math.min(height-shown,before+amount*25));
  if(Math.abs(next-before)<.2)return false;
  try{workspace.scrollTop=next;return true}catch{return false}
}

/** Consume the context-menu request once, without scanning the library.
 * Every lookup is scoped to the selected App ID, never a string-only guess.
 * The async full-library catalog is loaded only if the user opens All games. */
export function initialContextEditor(request,snapshot=latestState,store=globalThis.appStore,now=Date.now()){
  const id=normId(request?.appid);
  if(!id||!Number.isFinite(Number(request?.at))||now-Number(request.at)>20000||Number(request.at)-now>5000)return null;
  const row=Array.isArray(snapshot?.games)?snapshot.games.find(g=>normId(g?.appid)===id):null;
  const steamName=String(steamOverview(store,id)?.display_name||'').trim();
  const rawName=steamName||String(row?.name||'').trim()||String(request?.name||'').trim()||`Steam App ${id}`;
  // Prefer Steam's original name; if unavailable, still open the right App ID.
  if(!rawName||rawName.length>180||/[\r\n]/.test(rawName))return null;
  return {appid:id,name:rawName,installed:Boolean(row?.installed),source:'context'};
}
/** Only a context-menu-launched editor uses this alternative Back gesture.
 * B/Circle is Steam's GamepadButton.CANCEL (2), independent of label layout.
 * A quick tap keeps the established single-level Back behavior. A hold
 * (650 ms) invokes one Steam route-back action, without opening the catalog.
 * Timers and key state are always cleaned up when the editor unmounts. */
export function createContextHoldExit({onExit,onShortBack,isEnabled=()=>true,now=Date.now,
  setTimer=setTimeout,clearTimer=clearTimeout,delay=650}={}){
  let since=null,timer=null,exited=false,releaseAt=-Infinity;
  const isB=e=>Number(e?.detail?.button)===2 || (e?.key==='Escape');
  const reset=()=>{if(timer!==null)clearTimer(timer);timer=null;since=null;};
  const down=e=>{
    if(!isB(e)||!isEnabled())return false;
    halt(e);
    if(since!==null)return true;
    since=now();exited=false;
    timer=setTimer(()=>{
      timer=null;
      if(since!==null&&!exited&&isEnabled()){
        exited=true;try{onExit?.()}catch(err){console.warn('[TitleDeck] hold B exit:',err)}
      }
    },delay);
    return true;
  };
  const up=e=>{
    if(!isB(e)||since===null)return false;
    halt(e);
    const wasExit=exited;
    reset();releaseAt=now();
    if(!wasExit&&isEnabled())onShortBack?.();
    return true;
  };
  return{down,up,stop:reset,pressed:()=>since!==null,
    recentlyReleased:()=>now()-releaseAt<120};
}

function Manager(){
  const state=useStateSnapshot(),root=R.useRef(null);
  // A context-menu click is a direct editor launch, not a library browse.
  // Claim it in the lazy initializer before any intermediate library frame.
  const [contextGame]=R.useState(()=>initialContextEditor(pendingContextGame,latestState,globalThis.appStore));
  const contextEntryActive=R.useRef(Boolean(contextGame));
  const holdExitRef=R.useRef(null);
  const returnFromHoldRef=R.useRef(null);
  // Consume only after commit: React may run lazy initializers twice under
  // StrictMode. Consuming there could lose the selected game on the second pass.
  R.useEffect(()=>{
    if(pendingContextGame && (contextGame?.appid===normId(pendingContextGame.appid) ||
      Date.now()-Number(pendingContextGame.at)>20000))pendingContextGame=null;
  },[]);
  const [games,setGames]=R.useState(()=>contextGame?[contextGame]:[]),[scope,setScope]=R.useState('all'),[query,setQuery]=R.useState(''),[view,setView]=R.useState(contextGame?'editor':'library');
  const [selected,setSelected]=R.useState(contextGame?.appid||''),[draft,setDraft]=R.useState(contextGame?(state.aliases?.[contextGame.appid]||contextGame.name):''),[notice,setNotice]=R.useState(null),[working,setWorking]=R.useState(false);
  const [entry,setEntry]=R.useState(''),[lastTile,setLastTile]=R.useState(''),[catalogBusy,setCatalogBusy]=R.useState(false);
  const [renderCols,setRenderCols]=R.useState(4);
  const [hiddenManagerIds,setHiddenManagerIds]=R.useState(()=>validHiddenManagerIds(readPreference(HIDDEN_LIBRARY_STORE,'[]')));
  const [descriptionDraft,setDescriptionDraft]=R.useState(contextGame?(state.descriptions?.[contextGame.appid]||''):'');
  const [accent,setAccent]=R.useState(validAccent(readPreference(ACCENT_STORE,'wine')));
  const [hexDraft,setHexDraft]=R.useState('');
  const [customPickerOpen,setCustomPickerOpen]=R.useState(false);
  const [pickerAdjust,setPickerAdjust]=R.useState(false);
  const [pickerHue,setPickerHue]=R.useState(345);
  const [pickerChoice,setPickerChoice]=R.useState('#8b1e3f');
  const [stickScroll,setStickScroll]=R.useState(readControllerScrollSetting());
  const [contextPosition,setContextPosition]=R.useState(readContextMenuPosition());
  const lastPageInput=R.useRef(0);
  // Independent of LB/RB: the accepted shoulder-button Focusable bridge is untouched.
  R.useEffect(()=>{
    if(!['editor','description','settings','review'].includes(view))return;
    const shell=root.current;
    const win=shell?.ownerDocument?.defaultView||globalThis;
    const poll=()=>{
      if(!readControllerScrollSetting())return;
      let amount=0;
      try{for(const pad of win?.navigator?.getGamepads?.()||globalThis.navigator?.getGamepads?.()||[]){
        if(pad?.connected!==false)amount=normalizedRightStickY(pad);
        if(amount)break;
      }}catch{}
      if(amount)scrollManagerWorkspaceByStick(root.current,amount,view);
    };
    const timer=setInterval(poll,45);
    return()=>clearInterval(timer);
  },[view]);
  const catalogReady=R.useRef(false);
  const pageLibraryRef=R.useRef(null);
  R.useEffect(()=>{
    const shell=root.current,win=shell?.ownerDocument?.defaultView;
    if(!shell)return;
    const update=()=>{const width=shell.getBoundingClientRect?.().width||shell.clientWidth||960;setRenderCols(columnsForWidth(width));};
    update();
    const observer=typeof win?.ResizeObserver==='function'?new win.ResizeObserver(update):null;
    observer?.observe(shell);win?.addEventListener?.('resize',update);
    return()=>{observer?.disconnect();win?.removeEventListener?.('resize',update)};
  },[]);
  // Run after the manager opens and after Steam's route has settled. The
  // library alone remains scrollable; its header is kept below Steam chrome.
  R.useEffect(()=>{
    const shell=root.current;if(!shell)return;
    scrollManagerChromeToTop(shell);
    fitManagerBelowSteamHeader(shell,shell.ownerDocument?.defaultView||globalThis);
    const recheck=setTimeout(()=>fitManagerBelowSteamHeader(shell,shell.ownerDocument?.defaultView||globalThis),180);
    const onResize=()=>fitManagerBelowSteamHeader(shell,shell.ownerDocument?.defaultView||globalThis);
    const win=shell.ownerDocument?.defaultView;
    win?.addEventListener?.('resize',onResize);
    return()=>{clearTimeout(recheck);win?.removeEventListener?.('resize',onResize)};
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
  const fullLibrary=R.useCallback(async({refreshArtwork=false}={})=>{
    if(refreshArtwork){
      resetCoverResolutionCache();
      try{await call('save_cover_cache',{})}catch{}
    }
    setCatalogBusy(true);
    try{
      const snapshot=await refreshState();
      let extras=[];
      try{const result=await globalThis.SteamClient?.Apps?.GetInstalledApps?.();if(Array.isArray(result))extras=result;}catch{}
      remoteGames.current=extras;
      const current=collectSteamGames(globalThis.appStore,snapshot.games,extras);
      setGames(current);
      return current;
    }finally{catalogReady.current=true;setCatalogBusy(false)}
  },[]);
  R.useEffect(()=>{if(view==='library'&&!catalogReady.current)void fullLibrary().catch(e=>notify(`Library scan failed: ${String(e?.message||e)}`,setNotice))},[view]);
  R.useEffect(()=>{if(contextGame&&view!=='library')return;setGames(previous=>collectSteamGames(globalThis.appStore,state.games||[],[...remoteGames.current,...previous]));},[state.games,view]);
  const filtered=managerVisibleGames(games,hiddenManagerIds).filter(g=>(scope==='all'||(scope==='installed'?g.installed:Boolean(aliases[g.appid])))&&
     (`${g.name} ${aliases[g.appid]||''} ${g.appid}`).toLowerCase().includes(query.toLowerCase()));
  const pageLibrary=delta=>{
    if(view!=='library'||!filtered.length||!Number.isFinite(delta)||!delta)return false;
    const shell=root.current;
    const activeTile=shell?.ownerDocument?.activeElement?.closest?.('[data-td-game]');
    const focusedId=activeTile?.getAttribute?.('data-td-game');
    const activeIndex=filtered.findIndex(g=>String(g.appid)===String(focusedId||lastTile||selected));
    const currentIndex=Math.max(0,activeIndex);
    const nextIndex=Math.min(filtered.length-1,Math.max(0,currentIndex+Math.sign(delta)*Math.max(1,renderCols*3)));
    if(nextIndex===currentIndex)return false;
    const next=filtered[nextIndex];setLastTile(next.appid);
    const focus=()=>{
      const container=root.current;
      const tile=container?.querySelector?.(`[data-td-focus="tile-${nextIndex}"]`);
      if(!tile)return false;
      // 1.0.2 hardware-verified page switching used Steam's navigation tree,
      // NOT the HTML .focus({preventScroll:true}) adopted in 1.0.3.
      const grid=container?.querySelector?.('[data-td-scroll="library"]');
      if(grid)scrollLibraryTileIntoView(tile);
      if(!focusNode(tile)){
        try{tile.focus?.();}catch{}
      }
      if(grid)scrollLibraryTileIntoView(tile);
      return true;
    };
    // The new row can be installed during React's next commit; retry after
    // React renders and Steam refreshes its controller navigation tree.
    setTimeout(focus,35);
    return true;
  };
  pageLibraryRef.current=pageLibrary;
  // One shared gate for Decky's native Focusable button event AND the PS4/browser
  // fallback. Both can report the same physical shoulder press; never double-page.
  // On-screen buttons still call pageLibrary directly and are unaffected.
  const shoulderLast=R.useRef({time:-Infinity,delta:0});
  const pageFromShoulder=delta=>{
    if(view!=='library'||(delta!==1&&delta!==-1))return false;
    const time=Date.now(),last=shoulderLast.current;
    if(time-last.time<180&&last.delta===delta)return false;
    shoulderLast.current={time,delta};
    return Boolean(pageLibraryRef.current?.(delta));
  };
  const onNativeShoulder=e=>{
    if(view!=='library')return;
    const delta=titleDeckFocusShoulder(e);
    if(!delta)return;
    // Steam's native Focusable handler is the missing Deck built-in controller
    // path (the diagnostic showed SteamClient.Input registration unavailable).
    logLibraryInput('focus-button',{delta,source:'steam-focus'});
    if(pageFromShoulder(delta)){
      libraryControllerLog.pages++;
      logLibraryInput('page',{delta,source:'steam-focus'});
    }
    e?.stopPropagation?.();e?.preventDefault?.();
  };
  // Physical LB/RB can be absent from navigator.getGamepads() in SteamOS
  // Gaming Mode. Use SteamClient controller-state events first, with browser
  // Gamepad fallback, while keeping the proven pageLibrary() function intact.
  R.useEffect(()=>{
    if(view!=='library')return;
    const win=root.current?.ownerDocument?.defaultView||globalThis;
    const bridge=createLibraryShoulderBridge(delta=>pageFromShoulder(delta),{
      window:win,navigator:globalThis.navigator,SteamClient:globalThis.SteamClient
    });
    bridge.start();
    return()=>bridge.stop();
  },[view]);
  const installedCount=games.filter(g=>g.installed).length;
  const setHiddenEntries=ids=>{const next=validHiddenManagerIds(ids);setHiddenManagerIds(next);writePreference(HIDDEN_LIBRARY_STORE,JSON.stringify(next));};
  const hideSelectedFromManager=()=>{
    if(!normId(selected))return;
    setHiddenEntries([...hiddenManagerIds,selected]);
    setLastTile('');setSelected('');setScope('all');setQuery('');
    enterView('library','tile-0');
    notify('Hidden from TitleDeck manager only. Steam shortcut is untouched; restore under Settings.',setNotice,true);
  };
  const original=games.find(g=>g.appid===selected)?.name||steamOverview(globalThis.appStore,selected)?.display_name||'';
  const restoreTile=()=>focusQuery(root.current,`[data-td-game="${lastTile||selected}"]`,70);
  const enterView=(next,first)=>{setNotice(null);setView(next);if(next==='settings')setTimeout(()=>{const scroller=root.current?.querySelector?.('[data-td-scroll="settings"]');if(scroller)scroller.scrollTop=0;},25);if(first)focusQuery(root.current,`[data-td-focus="${first}"]`,90);};
  const openGame=g=>{
    activeInlineKeyboard?.close();setCleanupPreview(null);setCleanupUndo(null);
    setLastTile(g.appid);setSelected(g.appid);setDraft(aliases[g.appid]||g.name);
    setDescriptionDraft(state.descriptions?.[g.appid]||'');
    enterView('editor','edit-name');
    // When returning from a long library list, don't inherit the old
    // scroll position or jump to the bottom of a description preview.
    setTimeout(()=>{const area=root.current?.querySelector?.('.td-workspace');if(area)area.scrollTop=0},145);
  };
  // Initial direct editor is already rendered. Set controller focus after
  // Steam has mounted the native gamepad navigation tree, without relayout.
  R.useEffect(()=>{if(contextGame)focusQuery(root.current,'[data-td-focus="edit-name"]',90)},[]);
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
    // Steam's OSK is sometimes raised before our 260-ms keyboard signal.
    // Raise the editor layout at once, after the click has been delivered.
    // This also avoids the reported need to press Down then Up.
    activeInlineKeyboard?.show?.();
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
    contextEntryActive.current=false;holdExitRef.current?.stop();
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
  // The native shortcut enters a single editor straight from a game tile's
  // Options menu. Route-back once is enough; visiting All games disables the
  // hold shortcut so an ordinary Full Library Manager keeps its old controls.
  returnFromHoldRef.current=()=>{
    if(!contextEntryActive.current)return;
    contextEntryActive.current=false;
    holdExitRef.current?.stop();
    activeInlineKeyboard?.close();
    try{UI.Navigation?.NavigateBack?.()}catch(err){console.warn('[TitleDeck] return to Steam:',err)}
  };
  const onShortContextBackRef=R.useRef(null);
  onShortContextBackRef.current=back;
  R.useEffect(()=>{
    if(!contextGame)return;
    const shell=root.current,doc=shell?.ownerDocument;
    const enabled=()=>contextEntryActive.current &&
      !shell?.classList?.contains?.('td-native-keyboard-open') &&
      !shell?.ownerDocument?.activeElement?.matches?.('input,textarea');
    const hold=createContextHoldExit({
      onExit:()=>returnFromHoldRef.current?.(),
      onShortBack:()=>onShortContextBackRef.current?.(),isEnabled:enabled
    });
    holdExitRef.current=hold;
    // Steam emits native focus events which may be consumed by descendants.
    // Observe only within our editor and in capture phase; no global bindings.
    const press=e=>hold.down(e),release=e=>hold.up(e);
    shell?.addEventListener?.('vgp_onbuttondown',press,true);
    shell?.addEventListener?.('vgp_onbuttonup',release,true);
    return()=>{
      shell?.removeEventListener?.('vgp_onbuttondown',press,true);
      shell?.removeEventListener?.('vgp_onbuttonup',release,true);
      hold.stop();if(holdExitRef.current===hold)holdExitRef.current=null;
    };
  },[contextGame?.appid]);
  const save=async(method,...args)=>{
    if(working)return;
    setCleanupPreview(null);setCleanupUndo(null);
    setWorking(true);
    try{await call(method,...args);const verified=await refreshState();
      const valid=method==='save_alias'?verified.aliases?.[String(args[0])]===args[1]
        :method==='delete_alias'?!verified.aliases?.[String(args[0])]
        :method==='set_description_position'?verified.description_position===args[0]
        :method==='set_home_menu_titles'?verified.home_menu_titles===args[0]
        :verified.enabled===args[0];
      if(!valid)throw Error('Settings readback failed');
      notify(method==='save_alias'?`Saved “${args[1]}”. TitleDeck confirmed your alias. Open Steam's game page to check the visible title.`:
        method==='delete_alias'?'Restored original Steam title.'
        :method==='set_home_menu_titles'?`STEAM-button menu custom titles ${args[0]?'enabled':'disabled'}.`
        :method==='set_description_position'?`Description placement changed to ${args[0]==='game_info'?'Game Info':args[0]==='hero_footer'?'Artwork Footer':'Below Play'}.`
        :'Display replacements updated.',setNotice,true);
    }catch(e){notify('Could not save: '+String(e?.message||e),setNotice);}finally{setWorking(false);}
  };
  const saveDescription=async(remove=false)=>{
    if(working)return;
    const content=descriptionDraft.replace(/\r\n?/g,'\n').trim();
    if(!remove&&(!content||/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(content))){
      notify('Description must contain plain text without control characters.',setNotice);return;
    }
    setWorking(true);
    try{
      if(remove){
        await call('delete_description',selected);
        // Remove the TitleDeck-owned Game Info element immediately. Never
        // repeatedly rewrite Steam's React text during subsequent scans.
        descriptionAdapter?.restoreGameInfo?.(selected,state.descriptions?.[selected]||'');
        nonSteamDescriptionAdapter?.restoreGameInfo?.(selected);
      }else await call('save_description',selected,content);
      const verified=await refreshState();
      if(remove?Boolean(verified.descriptions?.[selected]):verified.descriptions?.[selected]!==content)throw Error('Description readback did not match.');
      setDescriptionDraft(remove?'':content);
      notify(remove?'Removed your local description override.':'Description saved. The game-page panel appears when Steam shows the matching game.',setNotice,true);
    }catch(e){notify('Could not save description: '+String(e?.message||e),setNotice);}
    finally{setWorking(false);}
  };
  const restoreOriginalGame=async()=>{
    if(working||!selected)return;
    const target=selected,previous=state.descriptions?.[target]||'';
    activeInlineKeyboard?.close();setCleanupPreview(null);setCleanupUndo(null);
    setWorking(true);
    try{
      await call('restore_original_game',target);
      const verified=await refreshState();
      if(verified.aliases?.[target]||verified.descriptions?.[target])
        throw Error('Original game state was not restored in saved settings.');
      // The shared snapshot already triggers both display adapters. Explicitly
      // dismantle the active Game Info shell before the next Steam paint.
      descriptionAdapter?.restoreGameInfo?.(target,previous);
      nonSteamDescriptionAdapter?.restoreGameInfo?.(target);
      adapter?.runNow();
      setDraft(original);setDescriptionDraft('');
      notify('Restored original game state: Steam title and description. Unsaved edits cleared.',setNotice,true);
    }catch(e){notify('Could not restore original game state: '+String(e?.message||e),setNotice);}
    finally{setWorking(false)}
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
  const navHeader=(key,e)=>{const target=topMove(key,dir(e),scope);if(target){if(target==='tile-0'&&!filtered.length)return false;if(target==='close'||target.startsWith('filter-')||target.startsWith('tool-'))scrollManagerChromeToTop(root.current);return directionTo(root.current,target,e);}halt(e);return true;};
  const navTile=(index,e)=>{const d=dir(e);if(![9,10,11,12].includes(d))return false;const columns=renderCols,visual=measuredGridDestination(root.current,index,d),next=visual!==undefined?visual:libraryMove(index,d,filtered.length,columns);
    if(next!==null){if(directionTo(root.current,`tile-${next}`,e))return true;return false;} // Native nested row/column navigation handles focus when no explicit target is mounted.
    if(d===9&&index<columns){scrollManagerChromeToTop(root.current);const destinations=['tool-search','tool-search','tool-id','tool-refresh','tool-settings'];return directionTo(root.current,destinations[Math.min(destinations.length-1,Math.floor(index*5/Math.max(1,columns)))],e)}
    // At a grid edge, keep focus on the current game, never skip into random controls.
    halt(e);return true;
  };
  const editorNav=(key,e)=>{
    const d=dir(e);
    if(![9,10,11,12].includes(d))return false;
    const to=editorDestination(key,d,{canSave:!!draft.trim()&&!working,canRestore:!working,canRestoreDescription:!!state.descriptions?.[selected]&&!working});
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
  const changeFilter=k=>{scrollManagerToTop(root.current);setScope(k);setQuery('');focusQuery(root.current,'[data-td-focus="tile-0"]',65);};
  const showMessage=h(Toast,{notice});
  const footer=(primary,secondary)=>h('div',{className:'td-bottom'},h('span',{className:'td-status'},primary),h('strong',null,secondary));
  let rail,actions,workspace,bottom;
  if(view==='library'){
    rail=h(UI.Focusable,{'flow-children':'right',className:'td-rail','data-td-layout':'filter-row'},
      ...[['all','All games'],['installed','Installed'],['renamed','Renamed']].map(([k,label])=>h(Btn,{key:k,className:'td-tab',kind:scope===k?'selected':'',
        'data-td-focus':`filter-${k}`,nav:e=>navHeader(`filter-${k}`,e),onClick:()=>changeFilter(k)},label)));
    actions=h(UI.Focusable,{'flow-children':'right',className:'td-actions','data-td-layout':'tool-row'},
      ...[['tool-search',query?`Search: ${query}`:'⌕ Search library',openSearch],['tool-id','App ID',manualId],['tool-refresh',catalogBusy?'Scanning…':'↻ Refresh',()=>void fullLibrary({refreshArtwork:true}).then(()=>notify('Game list and artwork sources refreshed.',setNotice,true)).catch(e=>notify(String(e),setNotice))],['tool-settings','⚙ Settings',()=>enterView('settings','setting-0')]].map(([key,label,click])=>h(Btn,{key,className:'td-action','data-td-focus':key,
        nav:e=>navHeader(key,e),onClick:click,disabled:catalogBusy&&key==='tool-refresh'},label)),
      h(Btn,{className:'td-action td-page', 'data-td-focus':'tool-page-prev',nav:e=>navHeader('tool-page-prev',e),onClick:()=>pageLibrary(-1)},'◀ LB'),
      h(Btn,{className:'td-action td-page', 'data-td-focus':'tool-page-next',nav:e=>navHeader('tool-page-next',e),onClick:()=>pageLibrary(1)},'RB ▶'),
      h('span',{className:'td-results'},`${filtered.length} shown`));
    workspace=h('div',{className:'td-workspace','data-td-scroll':'library'},
      filtered.length?h(UI.Focusable,{'flow-children':'down',className:'td-grid','data-td-grid':'true','data-td-columns':renderCols},
        ...rowChunks(filtered,renderCols).map((row,rowIndex)=>h(UI.Focusable,{
          key:`game-row-${rowIndex}`,'flow-children':'right',className:'td-grid-row',
          'data-td-row':String(rowIndex)},
          ...row.map((game,col)=>{const index=rowIndex*renderCols+col;return h(Btn,{
            key:game.appid,className:'td-game','data-td-game':game.appid,'data-td-focus':`tile-${index}`,
            nav:e=>navTile(index,e),onClick:()=>openGame(game),onFocus:()=>setLastTile(game.appid),onGamepadFocus:()=>setLastTile(game.appid)},
            h('div',{className:'td-game-artbox'},h(Cover,{id:game.appid,title:game.name,priority:index<24,tile:true}),aliases[game.appid]?h('span',{className:'td-game-mark'},'RENAMED'):null),
            h('div',{className:'td-game-copy'},h('div',{className:'td-game-title'},aliases[game.appid]||game.name),
              h('div',{className:'td-game-sub'},...(game.installed?[h('span',{className:'td-installed-dot',title:'Installed','aria-label':'Installed'},'●'),h('span',{className:'td-installed-label'},aliases[game.appid]?`Installed · ${game.name}`:'Installed')]:[h('span',null,aliases[game.appid]?game.name:`App ${game.appid}`)]))));}))))
       :h('div',{className:'td-empty'},h('h2',null,query?'No matching games':'No games in this category'),h('p',null,query?'Open Search to try a different title or App ID.':'Refresh the library or choose All games.'),
         h(Btn,{onClick:()=>{setScope('all');setQuery('');}},'Show all games')));
    bottom=footer('D-pad: browse   •   LB/RB: page   •   A: select   •   B: back',`${filtered.length} titles`);
  }else if(view==='editor'){
    rail=h('div',{className:'td-rail'},h('div',{className:'td-rail-label'},'CUSTOM NAME'),h('div',{className:'td-rail-label',style:{textAlign:'center'}},'Steam game '+selected),h('div',{className:'td-rail-label',style:{textAlign:'right'}},aliases[selected]?'● Saved override':'Original title'));
    actions=h('div',{className:'td-actions td-title-editor-toolbar',style:{display:'flex'}},h(Btn,{className:'td-action','data-td-focus':'edit-back',nav:e=>editorNav('edit-back',e),onClick:returnLibrary},'← All games'),h(Btn,{className:'td-action','data-td-focus':'edit-description',nav:e=>editorNav('edit-description',e),onClick:openDescription},state.descriptions?.[selected]?'✎ Edit description ●':'✎ Add description'),
      state.descriptions?.[selected]?h(Btn,{className:'td-action','data-td-focus':'edit-description-restore',nav:e=>editorNav('edit-description-restore',e),disabled:working,
        onClick:()=>{activeInlineKeyboard?.close();void saveDescription(true)}},'↶ Restore Steam description'):null,
      h(Btn,{className:'td-action','data-td-focus':'edit-hide',nav:e=>editorNav('edit-hide',e),disabled:working,onClick:hideSelectedFromManager},'Hide tile'),
      h('div',{style:{flex:1}}),h('span',{className:'td-results'},'Edit → Save → Verify in Steam'));
    workspace=h('div',{className:'td-workspace'},h('div',{className:'td-editor'},h('div',null,h('div',{className:'td-editor-art'},h(Cover,{id:selected,title:original,priority:true}))),
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
            h(Btn,{'data-td-focus':'edit-restore',nav:e=>editorNav('edit-restore',e),disabled:working,
              onClick:()=>void restoreOriginalGame()},'↶ Restore original game'))),
        h('div',{className:'td-editor-note'},aliases[selected]?`Saved as: ${aliases[selected]}. Changes to visible game titles are active when TitleDeck is enabled. Restore original game also removes any saved description.`:
          'Change name opens Steam’s keyboard. Suggest cleanup previews a change before applying it, with Undo available afterward. Restore original game clears both title and description overrides.'),
        state.descriptions?.[selected]?h('div',{className:'td-editor-note td-saved-description-preview','data-td-saved-description-preview':'true'},
          h('div',{className:'td-saved-description-heading'},
            'Saved description · '+savedDescriptionPreview(state.descriptions[selected]).length+' characters'),
          h('div',{className:'td-saved-description-excerpt'},
            savedDescriptionPreview(state.descriptions[selected]).excerpt),
          h('div',{className:'td-saved-description-hint'},
            'Full text is preserved. Use Edit description or Restore Steam description above.')):null)));
    bottom=footer(contextEntryActive.current?'A: select  •  Tap B/Circle: All games  •  Hold B/Circle: Steam':'A: select an action  •  B: return to library',state.enabled?'Steam title replacement ON':'Display replacement paused');
  }else if(view==='description'){
    const nonSteamEdit=isNativeSteamShortcutApp(selected,nonSteamOverviewStore(steamDocument||globalThis.document));
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
      h('div',{className:'td-rail-label'},(nonSteamEdit?'Non-Steam shortcut ':'Steam game ')+selected),
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
      h('p',{className:'td-editor-note'},nonSteamEdit?'Customize this non-Steam shortcut locally. In Game Info, your artwork appears beside the description and the right stick scrolls longer text. Original Steam metadata remains unchanged.':'Customize the description displayed locally on the matching Steam game page. Longer descriptions can be scrolled with the right stick. Original Steam metadata stays unchanged.'),
      h(UI.Focusable,{'flow-children':'down'},h(Btn,{'data-td-focus':'description-open',nav:e=>descNav('description-open',e),onClick:openDescriptionTyping},'⌨ Edit description using Steam keyboard')),
      h('div',{'data-td-focus':'description-input',className:'td-description-native-input',
        onGamepadDirection:e=>descNav('description-input',e)},
        h(InlineGameNameField,{value:descriptionDraft,setValue:setDescriptionDraft,
          label:'Custom game description',
          placeholder:'Write your custom description…',fieldKind:'description',nonSteamDescription:nonSteamEdit,finishFocus:'description-save',
          onEnter:()=>focusQuery(root.current,'[data-td-focus="description-save"]',70)})),
      h('div',{className:'td-editor-note',style:{whiteSpace:'pre-wrap',overflowWrap:'anywhere',minHeight:85,
        maxHeight:160,overflowY:'auto',padding:'14px 16px',borderRadius:10,background:'#172234',border:'1px solid #43566e'}},
        descriptionDraft||'Your custom description preview will appear here.'),
      h('div',{className:'td-editor-original-meta'},nonSteamEdit?'Non-Steam Game Info: artwork on the left, text on the right · Full descriptions remain saved · Scroll with the right stick · Save and Restore are above':'Full descriptions remain saved · Scroll with the right stick · Save and Restore are above'),
      stored?h('div',{className:'td-editor-note',style:{whiteSpace:'pre-wrap',overflowWrap:'anywhere',maxHeight:150,overflowY:'auto',marginTop:15}},'Saved local description: '+stored):null
    ));
    bottom=footer(contextEntryActive.current?'A: edit or save  •  B: back  •  Hold B/Circle: Steam':'A: edit or save  •  B: return to game editor','Shown on matching Steam game detail pages');
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
    const settingsOrder=['setting-0','setting-home-menu','setting-backup','setting-backup-restore','setting-recover',
      'setting-show-hidden',
    'setting-placement-info','setting-placement-hero','setting-placement-below',
      ...(developerDiagnosticsEnabled()?['setting-scan']:[]),
      'setting-theme','setting-stick',...Array.from({length:12},(_,i)=>`setting-swatch-${i}`),
      'setting-custom-edit','setting-custom','setting-restore-all'];
    const settingsDirection=(key,e)=>{
      // Stop Steam's default spatial search FIRST. Otherwise when a target's
      // navigation node isn't mounted yet, the fallback goes right instead of
      // down through the three vertically stacked placement choices.
      halt(e);
      const d=dir(e),next=settingsFocusWithHidden(key,d,developerDiagnosticsEnabled());
      if(!next)return true;
      const focus=()=>{
        const node=root.current?.querySelector?.(`[data-td-focus="${next}"]`);
        if(node)focusNode(node);
      };
      if(next==='settings-back'){
        const scroller=root.current?.querySelector?.('[data-td-scroll="settings"]');
        if(scroller)scroller.scrollTop=0;
      }
      focus();setTimeout(focus,0);
      return true;
    };
    const button=(text,onClick,opts={})=>h(Btn,{className:'td-action',onClick,disabled:opts.disabled||working,'data-td-focus':opts.focus||undefined,nav:opts.focus?e=>settingsDirection(opts.focus,e):undefined},text);
    const safeCall=async(name,success)=>{if(working)return;setWorking(true);try{const result=await call(name);await refreshState();adapter?.runNow();notify(success(result),setNotice,true);}catch(e){notify(`Could not ${name.replaceAll('_',' ')}: ${String(e?.message||e)}.`,setNotice);}finally{setWorking(false)}};
    workspace=h('div',{className:'td-workspace','data-td-scroll':'settings'},h('div',{className:'td-settings'},
      h('h2',{className:'td-title-large'},'Settings'),
      h('p',{className:'td-settings-intro'},'Make your library yours. Custom titles and descriptions stay local to TitleDeck; original Steam metadata remains unchanged.'),
      h('div',{className:'td-settings-grid'},
        settingPanel('overrides','Display title replacement','Keep your custom titles active throughout supported Steam screens.',
          button(state.enabled?'Pause replacements':'Enable replacements',()=>void save('set_enabled',!state.enabled),{focus:'setting-0'}),state.enabled?'● Enabled':'○ Paused'),
        settingPanel('home-menu-titles','STEAM-button menu titles',
          'Display your saved custom title for the running game when you press STEAM. Supports Steam and non-Steam games; the original Steam name and artwork remain unchanged. Turn off to show the original title.',
          button(h('span',{className:'td-home-toggle',role:'presentation'},
              h('span',{className:'td-home-toggle-track','data-on':state.home_menu_titles?'true':'false'},
                h('span',{className:'td-home-toggle-knob'})),
              h('span',null,state.home_menu_titles?'Custom names ON':'Custom names OFF')),
            ()=>void save('set_home_menu_titles',!state.home_menu_titles),{focus:'setting-home-menu'}),
          state.home_menu_titles?'● Enabled · Steam and non-Steam games':'○ Disabled · Original game names'),
        settingPanel('context-menu-position','Game Options menu placement',
          'Position “Edit with TitleDeck” after Developer, or before Properties when that row exists. If non-Steam games show Properties only inside Manage, the shortcut goes at the end of the main actions. Other plugins are untouched.',
          button(contextPosition==='after-developer'?'✓ After Developer · Change':'✓ Before Properties · Change',()=>{
            const next=contextPosition==='after-developer'?'before-properties':'after-developer';
            setContextPosition(next);writePreference(CONTEXT_MENU_POSITION_STORE,next);
            notify(`TitleDeck context shortcut will appear ${next==='after-developer'?'after Developer':'before Properties'} the next time Steam builds the menu.`,setNotice,true);
          },{focus:'setting-context-placement'}),
          contextPosition==='after-developer'?'● Near top · After Developer':'● Last game action on non-Steam menus without Properties'),
        settingPanel('backup','Save a backup','Save the current names to a separate local backup you can restore later.',
          button('Create backup',()=>void safeCall('create_backup',()=> 'TitleDeck backup saved.'),{focus:'setting-backup'}),manual.available?`Saved backup: ${manual.count} name(s)`:'No manual backup yet'),
        settingPanel('backup-restore','Restore a saved backup',manual.available?`Replace current names with the ${manual.count} name(s) in your saved backup.`:'Create a backup first to use this feature.',
          button('Restore saved backup',()=>{setView('backupConfirm');focusQuery(root.current,'[data-td-focus="backup-cancel"]',90)},{disabled:!manual.available,focus:'setting-backup-restore'}),manual.available?'● Backup available':'○ No backup'),
        settingPanel('recovery','Recover after Restore All',recovery.available?`Your last Restore All saved ${recovery.count} name(s). Undo is allowed only if you have not added new names.`:'No Restore All recovery is available yet. This option activates after a confirmed reset.',
          button(`Recover ${recovery.count||0} names`,()=>void safeCall('undo_restore_all',r=>`Recovered ${r?.recovered_count||recovery.count} custom titles.`),{disabled:!recovery.available||aliasCount!==0,focus:'setting-recover'}),recovery.available?(aliasCount?'Save or clear current names before recovery':'● Recovery ready'):'○ Nothing to recover'),
        settingPanel('hidden-library','Hidden Full Library Manager entries',
          `Only TitleDeck tiles are hidden, never deleted from Steam. ${hiddenManagerIds.length} hidden. Use Hide tile in a game's editor to remove an unwanted duplicate.` ,
          button(`Show all hidden tiles (${hiddenManagerIds.length})`,()=>{
            setHiddenEntries([]);notify('All hidden manager tiles restored. Steam entries were never changed.',setNotice,true);
          },{focus:'setting-show-hidden',disabled:hiddenManagerIds.length===0})),
        settingPanel('description-placement','Custom game description location',
          'Game Info replaces the visible description inside Steam’s GAME INFO tab. Artwork Footer uses the strip above Play. Below Play keeps the full-width panel. All three preserve your original Steam metadata.',
          h(UI.Focusable,{'flow-children':'down',className:'td-card-buttonrow td-description-position-options',style:{display:'flex',flexDirection:'column',gap:6}},
            button(state.description_position==='game_info'?'✓ Game Info (selected)':'Show inside GAME INFO',
              ()=>void save('set_description_position','game_info'),{focus:'setting-placement-info'}),
            button(state.description_position==='hero_footer'?'✓ Artwork Footer (selected)':'Show in Artwork Footer',
              ()=>void save('set_description_position','hero_footer'),{focus:'setting-placement-hero'}),
            button(state.description_position==='below_play'?'✓ Below Play (selected)':'Show Below Play',
              ()=>void save('set_description_position','below_play'),{focus:'setting-placement-below'})),
          state.description_position==='game_info'?'● Game Info selected · open Steam’s GAME INFO tab'
            :state.description_position==='hero_footer'?'● Artwork Footer selected · compact preview above Play'
            :'● Below Play selected · full description panel'),
        ...(developerDiagnosticsEnabled()?[settingPanel('diagnostics','Developer: Steam display diagnostics',`Bridge: ${steamBridgeStatus}. Documents: ${adapter?.docs||0}. Visible text matches: ${adapter?.applied||0}. Live UI updates: ${adapter?.fastPasses||0}. Description panels: ${descriptionAdapter?.shown||0}. Current view: ${descriptionAdapter?.status||'not ready'}. Last captured Steam game page: ${formatDescriptionGameProbe()}. Native Game Info data: ${gameInfoDataAdapter?.status||'not connected'}; hooks ${gameInfoDataAdapter?.hookedStores||0}, overrides ${gameInfoDataAdapter?.overrides||0}. Description placement: ${state.description_position==='game_info'?'Game Info':state.description_position==='hero_footer'?'Artwork Footer':'Below Play'}. Saved names: ${aliasCount}; descriptions: ${Object.keys(state.descriptions||{}).length}. No Steam artwork or metadata is modified.`,
          button('Rescan Steam UI',()=>{adapter?.runNow();descriptionAdapter?.runNow();nonSteamDescriptionAdapter?.runNow();notify(`Steam scan complete. Titles: ${adapter?.applied||0}; description panels: ${descriptionAdapter?.shown||0}.`,setNotice,true)},{focus:'setting-scan'}))]:[]),
        settingPanel('appearance','Full manager color theme',
          'Choose a complete TitleDeck color theme for backgrounds, cards, buttons, text and glowing focus. Default: Wine Red. Steam pages stay untouched.',
          button(`Accent: ${themeColors(accent).name}  •  Change`,()=>{
            const keys=Object.keys(TITLEDECK_ACCENTS),at=keys.indexOf(accent);
            const next=keys[(at+1+keys.length)%keys.length];setAccent(next);writePreference(ACCENT_STORE,next);
          },{focus:'setting-theme'}),`● ${themeColors(accent).name}`),
        settingPanel('controls','Right-stick Game Info scrolling',
          'Scroll long Steam and non-Steam Game Info descriptions with the right analog stick. It works only on active customized Game Info pages.',
          button(stickScroll?'✓ Right stick scrolling ON':'Right stick scrolling OFF',()=>{
            const value=!stickScroll;setStickScroll(value);writePreference(SCROLL_STORE,value?'on':'off');
          },{focus:'setting-stick'}),stickScroll?'● Enabled':'○ Disabled'),
        settingPanel('color-picker','Choose a color',
          'Use the D-pad to select a color. Press A to apply it immediately. The hex field underneath is for any other shade.',
          h('div',{className:'td-color-picker',role:'group','aria-label':'Accent color palette'},
            ...TITLEDECK_COLOR_SWATCHES.map(([name,color],i)=>
              h(Btn,{key:color,className:`td-swatch${accent.toLowerCase()===color.toLowerCase()?' td-swatch-selected':''}`,
                'data-td-focus':`setting-swatch-${i}`,nav:e=>settingsDirection(`setting-swatch-${i}`,e),
                'aria-label':`Select ${name} (${color})`,
                onClick:()=>{setAccent(color);setHexDraft(color);writePreference(ACCENT_STORE,color)}},
                  h('span',{className:'td-swatch-chip',style:{backgroundColor:color}},null),
                  h('span',{className:'td-swatch-label'},name))))),
        settingPanel('custom-color','Custom accent (hex)',
          'Open the visual picker to create any RGB color with a dragable hue bar, two-dimensional color square, D-pad fine adjustment and exact RGB controls.',
          h('div',{className:'td-custom-accent'},
            h(UI?.TextField||'input',{type:'text',inputMode:'text',placeholder:'#8B1E3F',maxLength:7,autocomplete:'off',
              'aria-label':'Custom accent hex color',value:hexDraft,
              onChange:e=>setHexDraft(String(e.target?.value||''))}),
            button('Open visual color picker ▦',()=>{
              setPickerChoice(/^#[0-9a-f]{6}$/i.test(hexDraft)?hexDraft.toUpperCase():
                (/^#[0-9a-f]{6}$/i.test(accent)?accent.toUpperCase():'#8B1E3F'));
              setPickerHue(hsvOfHex(/^#[0-9a-f]{6}$/i.test(hexDraft)?hexDraft:
                (/^#[0-9a-f]{6}$/i.test(accent)?accent:'#8B1E3F')).hue);
              setPickerAdjust(false);
              setCustomPickerOpen(true);
              focusQuery(root.current,'[data-td-focus="picker-hue-strip"]',70);
            },{focus:'setting-custom-edit'}),
            button('Apply custom accent',()=>{
              const next=validAccent(hexDraft);
              if(!/^#[0-9a-f]{6}$/.test(next)){notify('Use a 6-digit hex color, such as #8B1E3F.',setNotice);return}
              setAccent(next);writePreference(ACCENT_STORE,next);
              notify('Custom accent saved for Full Library Manager.',setNotice,true);
            },{focus:'setting-custom'}))),
        h('section',{className:'td-setting-panel td-panel-wide td-panel-danger'},h('h3',null,'Restore every original Steam title'),
          h('p',null,`Remove all ${aliasCount} saved display override${aliasCount===1?'':'s'} from TitleDeck. You will review a separate confirmation and an automatic recovery backup will be created first.`),
          button('Review Restore All…',startRestoreAll,{disabled:!aliasCount,focus:'setting-restore-all'}),
          h('div',{className:'td-mini-state'},'Nothing is removed until you explicitly confirm.'))
      )));
    if(customPickerOpen){
      const focusPicker=(key)=>{
        if(!key)return false;
        const focus=()=>{const node=root.current?.querySelector?.(`[data-td-focus="${key}"]`);
          if(node)focusNode(node)};
        focus();setTimeout(focus,0);return true;
      };
      const pickerDirection=(key,e)=>{
        const d=dir(e);if(![9,10,11,12].includes(d))return false;
        halt(e);focusPicker(pickerMove(key,d));return true;
      };
      const currentHSV=hsvOfHex(pickerChoice);
      const chooseHue=(hue)=>{const old=hsvOfHex(pickerChoice);setPickerHue(hue);setPickerChoice(hsvPickerHex(hue,old.saturation,old.value))};
      const freeDirection=(axis,e)=>{
        const d=dir(e);if(![9,10,11,12].includes(d))return false;
        halt(e);
        const destination=pickerMixerRoute(axis,d,pickerAdjust);
        if(destination){focusPicker(destination);return true}
        if(axis==='hue'&&(d===11||d===12)){
          chooseHue((currentHSV.hue+(d===12?1:-1)+360)%360);return true;
        }
        if(axis==='square'&&pickerAdjust){
          const sat=Math.max(0,Math.min(1,currentHSV.saturation+(d===12?1:d===11?-1:0)*.01));
          const value=Math.max(0,Math.min(1,currentHSV.value+(d===9?1:d===10?-1:0)*.01));
          setPickerChoice(hsvPickerHex(currentHSV.hue,sat,value));return true;
        }
        // In navigation mode, left/right tune saturation; Up/Down leave.
        if(axis==='square'&&(d===11||d===12)){
          const sat=Math.max(0,Math.min(1,currentHSV.saturation+(d===12?1:-1)*.01));
          setPickerChoice(hsvPickerHex(currentHSV.hue,sat,currentHSV.value));return true;
        }
        return true;
      };
      const chooseFromPointer=(axis,e)=>{
        const target=e.currentTarget,rect=target?.getBoundingClientRect?.();
        if(!rect?.width||!rect?.height)return;
        const x=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
        if(axis==='hue')chooseHue(Math.round(359*x));
        else setPickerChoice(pointToHsv(currentHSV.hue,x,(e.clientY-rect.top)/rect.height));
      };
      const pickerDrag=(axis,e)=>{if(e.buttons===1||e.pressure>0)chooseFromPointer(axis,e)};
      const cancelPicker=()=>{setPickerAdjust(false);setCustomPickerOpen(false);focusQuery(root.current,'[data-td-focus="setting-custom-edit"]',60)};
      const applyPicker=()=>{
        const hex=pickerChoice.toUpperCase();setAccent(hex);setHexDraft(hex);
        writePreference(ACCENT_STORE,hex);setPickerAdjust(false);setCustomPickerOpen(false);
        focusQuery(root.current,'[data-td-focus="setting-custom-edit"]',70);
        notify(`Custom color ${hex} applied.`,setNotice,true);
      };
      workspace=h('div',{className:'td-workspace td-picker-workspace','data-td-scroll':'settings'},
        h(UI.Focusable,{'flow-children':'down',className:'td-picker-panel'},
          h('h2',{className:'td-title-large'},'Visual custom color picker'),
          h('p',{className:'td-settings-intro'},'Create any color using the free hue bar, two-dimensional color square, or exact RGB +/- controls. Quick swatches below are optional.'),
          h('h3',null,'1 · Mix any color'),
          h('p',{className:'td-picker-help'},'D-pad Down moves from Hue → Shade → RGB → swatches → Apply. Left/Right adjusts hue or saturation. On Shade, press A for precise brightness adjustment; press A again to move on. B closes the picker.'),
          h(Btn,{className:'td-picker-gradient-hue','data-td-focus':'picker-hue-strip',
            nav:e=>freeDirection('hue',e),onClick:()=>focusPicker('picker-sv-field'),
            onPointerDown:e=>chooseFromPointer('hue',e),onPointerMove:e=>pickerDrag('hue',e),
            'aria-label':`Continuous hue, ${Math.round(currentHSV.hue)} degrees; left or right to adjust`},
            h('span',{className:'td-picker-gradient-hue-indicator',style:{left:`${currentHSV.hue/359*100}%`}})),
          h(Btn,{className:'td-picker-gradient-square','data-td-focus':'picker-sv-field',
            nav:e=>freeDirection('square',e),
            onClick:()=>setPickerAdjust(value=>!value),
            onPointerDown:e=>chooseFromPointer('square',e),onPointerMove:e=>pickerDrag('square',e),
            style:{backgroundColor:hsvPickerHex(currentHSV.hue,1,1)},
            'aria-label':'Continuous saturation and brightness. Left/right changes saturation; up/down changes brightness.'},
            h('span',{className:'td-picker-gradient-square-cursor',
              style:{left:`${currentHSV.saturation*100}%`,top:`${(1-currentHSV.value)*100}%`}})),
          h('p',{className:'td-picker-help','data-td-picker-mode':pickerAdjust?'adjust':'navigate'},
            pickerAdjust?'Shade adjustment ON · D-pad adjusts saturation and brightness · A finishes adjusting · B exits adjustment':
              'D-pad Down: RGB controls · Left/Right: saturation · A: adjust shade brightness · B: Cancel'),
          h('div',{className:'td-picker-channel-grid'},
            ...['Red','Green','Blue'].map((name,channel)=>h('div',{className:'td-picker-channel',key:name},
              h('span',null,`${name}: ${rgbOfHex(pickerChoice)[channel]}`),
              h(Btn,{className:'td-action','data-td-focus':`picker-rgb-${channel}-minus`,
                nav:e=>{const d=dir(e);if(![9,10,11,12].includes(d))return false;halt(e);focusPicker(pickerRgbRoute(`picker-rgb-${channel}-minus`,d));return true},
                onClick:()=>setPickerChoice(nudgeHexChannel(pickerChoice,channel,-1)),
                'aria-label':`Decrease ${name} by one`},'− 1'),
              h(Btn,{className:'td-action','data-td-focus':`picker-rgb-${channel}-plus`,
                nav:e=>{const d=dir(e);if(![9,10,11,12].includes(d))return false;halt(e);focusPicker(pickerRgbRoute(`picker-rgb-${channel}-plus`,d));return true},
                onClick:()=>setPickerChoice(nudgeHexChannel(pickerChoice,channel,1)),
                'aria-label':`Increase ${name} by one`},'+ 1')))),
          h('h3',null,'2 · Optional quick color squares'),
          h(UI.Focusable,{'flow-children':'right',className:'td-picker-hues'},
            ...Array.from({length:12},(_,i)=>h(Btn,{key:i,className:'td-picker-tile',
              'data-td-focus':`picker-hue-${i}`,nav:e=>pickerDirection(`picker-hue-${i}`,e),
              'aria-label':`Hue ${i+1}`,onClick:()=>setPickerHue(i*30)},
              h('span',{className:'td-picker-chip','data-selected':pickerHue===i*30?'true':'false',style:{backgroundColor:hsvPickerHex(i*30,1,1)}})))),
          h('h3',null,'2 · Saturation and brightness'),
          h(UI.Focusable,{'flow-children':'down',className:'td-picker-shades'},
            ...Array.from({length:48},(_,i)=>{const hex=pickerGridColor(pickerHue,i);return h(Btn,{key:i,
              className:'td-picker-tile','data-td-focus':`picker-cell-${i}`,nav:e=>pickerDirection(`picker-cell-${i}`,e),
              'aria-label':`Select custom shade ${i+1}: ${hex}`,onClick:()=>setPickerChoice(hex)},
              h('span',{className:'td-picker-chip','data-selected':pickerChoice===hex?'true':'false',style:{backgroundColor:hex}}))})),
          h('div',{className:'td-picker-selected'},h('span',{className:'td-picker-preview',style:{backgroundColor:pickerChoice}}),
            h('span',null,`Selected: ${pickerChoice.toUpperCase()}`)),
          h(UI.Focusable,{'flow-children':'right',className:'td-picker-actions'},
            h(Btn,{className:'td-action','data-td-focus':'picker-cancel',nav:e=>pickerDirection('picker-cancel',e),onClick:cancelPicker},'Cancel'),
            h(Btn,{className:'td-action','data-td-focus':'picker-apply',nav:e=>pickerDirection('picker-apply',e),onClick:applyPicker},'✓ Apply custom color'))));
    }
    bottom=footer(customPickerOpen?'D-pad: adjust hue/brightness · Touch: drag to mix · A: apply · B: close':'B: return to library',`TitleDeck ${PLUGIN_VERSION}`);
  }
  const nativeScreen=view==='keyboard'||view==='search'||view==='appid';
  return h(UI.Focusable,{'data-titledeck-ui':'true',className:`td-root${nativeScreen?' td-native-screen':''}`,ref:root,
    style:{'--td-accent':themeColors(accent).main,'--td-accent-dark':themeColors(accent).dark,
      '--td-accent-bright':themeColors(accent).bright,'--td-accent-border':themeColors(accent).border,
      '--td-backdrop':themeColors(accent).backdrop,'--td-surface':themeColors(accent).surface,
      '--td-raised':themeColors(accent).raised,'--td-tile':themeColors(accent).tile,
      '--td-inset':themeColors(accent).inset,'--td-muted':themeColors(accent).muted},
    'flow-children':'down',onButtonDown:e=>{if(contextEntryActive.current&&holdExitRef.current?.down(e))return;onNativeShoulder(e);},
    onButtonUp:e=>{if(contextEntryActive.current)holdExitRef.current?.up(e);},
    onKeyUp:e=>{if(contextEntryActive.current)holdExitRef.current?.up(e);},
    onKeyDown:e=>{if(contextEntryActive.current&&e.key==='Escape'&&holdExitRef.current?.down(e))return;
    if(view==='library'&&!(e.target?.matches?.('input,textarea'))){
      if(e.key==='PageDown'){e.preventDefault?.();pageLibrary(1)}
      if(e.key==='PageUp'){e.preventDefault?.();pageLibrary(-1)}
    }},onCancel:e=>{halt(e);
    if(contextEntryActive.current&&(holdExitRef.current?.pressed()||holdExitRef.current?.recentlyReleased()))return;
    if(customPickerOpen){if(pickerAdjust){setPickerAdjust(false);focusQuery(root.current,'[data-td-focus="picker-sv-field"]',25)}else{setCustomPickerOpen(false);focusQuery(root.current,'[data-td-focus="setting-custom-edit"]',70)}}else back()}},
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
 const scan=()=>{try{setCapture(descriptionAdapter?.timingReport?.()||'Game Info adapter not connected')}
   catch(e){setCapture('Game Info scan error: '+String(e?.message||e))}};
 const captureController=async()=>{try{
   const report=titleDeckControllerDiagnostic();
   const result=await call('save_controller_diagnostic',JSON.stringify(report));
   setCapture(`Controller report saved: ${result.path}. Open Full Library Manager, try Deck LB/RB, then capture this report if paging still fails.`);
 }catch(e){setCapture('Controller diagnostic error: '+String(e?.message||e))}};
 const captureArt=async()=>{try{
   const report=nonSteamDescriptionAdapter?.captureGhostLayout?.();
   if(!report?.records?.length){setCapture('Open a non-Steam game with a saved custom description, then Game Info, before capturing.');return;}
   const result=await call('save_layout_diagnostic',JSON.stringify(report));
   setCapture(`Layout captured (${report.records[0].nodes.length} elements). Saved locally: ${result.path}. Share that JSON file to identify the actual Steam poster wrapper.`);
 }catch(e){setCapture('Layout capture error: '+String(e?.message||e))}};
 return h(UI.PanelSection,{title:'TitleDeck'},h('div',{'data-titledeck-ui':'true'},
   h('div',{style:{display:'flex',alignItems:'center',gap:9,padding:'6px 0'}},h('img',{src:ICON_DATA_URI,style:{width:42,height:42,borderRadius:9}}),h('div',null,h('div',{style:{display:'flex',alignItems:'center',gap:7}},h('strong',null,'TitleDeck'),h('span',{className:'td-qam-version',style:QAM_VERSION_STYLE},`v${PLUGIN_VERSION}`)),h('div',{style:{fontSize:12,opacity:.7}},Object.keys(data.descriptions||{}).length?`${Object.keys(data.aliases||{}).length} names · ${Object.keys(data.descriptions||{}).length} descriptions`:`${Object.keys(data.aliases||{}).length} custom names`))),
   h(UI.PanelSectionRow,null,h(UI.ButtonItem,{onClick:open,layout:'below'},'Open full library manager')),
   ...(developerDiagnosticsEnabled()?[
     h(UI.PanelSectionRow,null,h(UI.ButtonItem,{onClick:captureController,layout:'below'},'Save LB/RB input diagnostic')),
     ...(nonSteamDescriptionAdapter?.shown>0?[
       h(UI.PanelSectionRow,null,h(UI.ButtonItem,{onClick:captureArt,layout:'below'},'Diagnose non-Steam artwork')),
     ]:[]),
     capture?h('div',{style:{fontSize:11,opacity:.9,whiteSpace:'pre-wrap',overflowWrap:'anywhere',padding:6}},capture):null,
   ]:[]),
   ...(developerDiagnosticsEnabled()?[
     h(UI.PanelSectionRow,null,h(UI.ButtonItem,{onClick:scan,layout:'below'},'Capture Game Info timing')),
     h('div',{style:{fontSize:11,opacity:.84,lineHeight:1.4,padding:'6px 4px',whiteSpace:'pre-wrap',overflowWrap:'anywhere',maxHeight:250,overflowY:'auto'}},
       capture||'Developer timing capture. Switch Community / Game Info twice, then tap Capture.')
   ]:[]),
   error?h('div',null,error):null));
}

/** 1.2.1 Preview: Steam's native game context menu (☰/Options).
 * Based on the established Decky SteamGridDB/MetaDeck context-menu hooks.
 * Never patch generic context menus or infer a missing App ID; no Steam
 * metadata is modified. On unsupported Steam clients this simply does nothing. */
const CONTEXT_ACTION_KEY='titledeck-edit-game';
const CONTEXT_MENU_POSITION_STORE='titledeck-context-position-v1';
export function validContextMenuPosition(value){
  return value==='before-properties'?'before-properties':'after-developer';
}
function readContextMenuPosition(){
  return validContextMenuPosition(readPreference(CONTEXT_MENU_POSITION_STORE,'after-developer'));
}
/** Read the *row itself*, not a label inside Manage's nested sub-menu.
 * Non-Steam Manage often contains a Properties action in its children; a
 * recursive property search places our shortcut before Launch Options. */
export function nativeGameContextLabel(node){
  const props=node?.props||{};
  if(typeof props.label==='string')return props.label.trim();
  if(typeof props.children==='string')return props.children.trim();
  if(Array.isArray(props.children)){
    const texts=props.children.filter(c=>typeof c==='string').map(c=>c.trim()).filter(Boolean);
    if(texts.length===1)return texts[0];
  }
  const child=props.children;
  if(child&&typeof child==='object'&&!Array.isArray(child)){
    if(typeof child.props?.label==='string')return child.props.label.trim();
    if(typeof child.props?.children==='string')return child.props.children.trim();
  }
  return '';
}
function contextRowKey(row){return String(row?.key||'').toLowerCase().replace(/^.*[.$:]/,'')}
function contextPropertyRow(row){
  const key=contextRowKey(row),label=nativeGameContextLabel(row).toLowerCase();
  if(key==='properties'||/^properties(?:\.{3}|…)?$/i.test(label))return true;
  // Native Properties is sometimes wrapped by one React element. Don't
  // recursively scan Manage's nested submenu for its own Properties action.
  const direct=[row?.props?.onSelected,row?.onSelected,row?.props?.children?.props?.onSelected];
  return direct.some(fn=>typeof fn==='function'&&/AppProperties/.test(Function.prototype.toString.call(fn)));
}
export function contextMenuInsertIndex(items,mode=readContextMenuPosition()){
  if(!Array.isArray(items))return 0;
  const index=(pred)=>items.findIndex(pred);
  const afterDeveloper=index(row=>contextRowKey(row)==='developer'||nativeGameContextLabel(row).toLowerCase()==='developer');
  if(mode==='after-developer'){
    if(afterDeveloper>=0)return afterDeveloper+1;
    const launch=index(row=>/^(?:launch-options|launchoptions)$/.test(contextRowKey(row))||nativeGameContextLabel(row).toLowerCase()==='launch options');
    if(launch>=0)return launch;
  }
  const properties=index(contextPropertyRow);
  if(properties>=0)return properties;
  // Non-Steam menus can contain Properties only *inside* the Manage
  // sub-menu, not in this top-level list. Do not claim we found it there.
  // Use the bottom of the top-level actions, just before Cancel if present.
  const cancel=index(row=>contextRowKey(row)==='cancel'||nativeGameContextLabel(row).toLowerCase()==='cancel');
  return cancel>=0?cancel:items.length;
}

function contextMenuNodes(root,max=320){
  const out=[],seen=new Set(),queue=[root];
  for(let n=0;queue.length&&n++<max;){
    const x=queue.shift();if(!x||typeof x!=='object'||seen.has(x))continue;seen.add(x);out.push(x);
    if(Array.isArray(x)){queue.push(...x);continue}
    if(x.props?.children)queue.push(x.props.children);
    if(x.children)queue.push(x.children);
  }
  return out;
}
function nativeGameContextEntry(x){
  try{
    // Real Steam menus may wrap their native MenuItem in another React element.
    // Match its action, but never infer a context from a generic caption.
    for(const node of contextMenuNodes(x,55)){
      if(node?.key==='properties')return true;
      const handler=node?.props?.onSelected??node?.onSelected;
      if(typeof handler==='function' && /AppProperties|launchSource/.test(Function.prototype.toString.call(handler)))return true;
    }
  }catch{}
  return false;
}
export function resolveContextMenuAppId(component,items){
  // Steam's most recent game context props override stale element ownership.
  const nodes=contextMenuNodes([items,component?.props?.children,component?.props],450);
  const live=new Set();
  for(const node of nodes){
    const id=normId(node?.app?.appid??node?.app?.appId??node?.props?.app?.appid);
    if(id)live.add(id);
  }
  if(live.size===1)return [...live][0];
  if(live.size>1)return ''; // Ambiguous: refuse to open the wrong game's editor.
  const overview=normId(component?._owner?.pendingProps?.overview?.appid ??
    component?.props?.overview?.appid ?? component?.props?.appid);
  const owner=new Set(nodes.map(node=>normId(node?._owner?.pendingProps?.overview?.appid)).filter(Boolean));
  if(owner.size===1)return [...owner][0];
  if(owner.size>1)return ''; // Multiple overview owners: no safe selection.
  return overview;
}
export function findNativeGameContextItems(root){
  // Steam's native game menu includes Properties or a launch-source action;
  // don't alter friends, downloads, settings, or other context menus.
  let best=null,score=-1;
  for(const x of contextMenuNodes(root,350)){
    if(!Array.isArray(x) || !x.some(nativeGameContextEntry))continue;
    // Prefer the actual list of native actions over an outer React array
    // containing an entire panel. This also handles a wrapped Properties row.
    const direct=x.filter(item=>item?.key==='properties'||
      typeof item?.props?.onSelected==='function'||
      (item?.props?.children?.props&&typeof item.props.children.props.onSelected==='function')).length;
    // A non-Steam Manage submenu may have more native actions than the
    // outer menu. Prefer the outer game menu's Play and Developer landmarks.
    // This prevents accidentally inserting the shortcut inside Manage.
    const label=row=>nativeGameContextLabel(row).toLowerCase();
    const topPlay=x.some(row=>contextRowKey(row)==='play'||label(row)==='play'||label(row)==='resume');
    const topDeveloper=x.some(row=>contextRowKey(row)==='developer'||label(row)==='developer');
    const topLaunch=x.some(row=>contextRowKey(row)==='launch-options'||label(row)==='launch options');
    const points=(topPlay?3000:0)+(topDeveloper?1800:0)+(topLaunch?700:0)+direct*10+(x.length>1?1:0);
    if(points>score){best=x;score=points;}
  }
  return best;
}
export function insertTitleDeckContextItem(items,appid,createItem,mode=readContextMenuPosition()){
  const id=normId(appid);
  if(!id||!Array.isArray(items)||!items.some(nativeGameContextEntry)||typeof createItem!=='function')return false;
  // Remove our old placement before inserting. Steam and other Decky plugins
  // may rebuild menus, so never move, rename, or splice their entries.
  for(let i=items.length-1;i>=0;i--)if(items[i]?.key===CONTEXT_ACTION_KEY)items.splice(i,1);
  const item=createItem(id);
  if(!item||item.key!==CONTEXT_ACTION_KEY)return false;
  items.splice(contextMenuInsertIndex(items,mode),0,item);
  return true;
}
function requestTitleDeckEditor(appid,title=''){
  const id=normId(appid);
  if(!id)return false;
  pendingContextGame={appid:id,name:String(title||'').slice(0,180),at:Date.now()};
  try{
    if(typeof UI.Navigation?.Navigate!=='function'){pendingContextGame=null;return false;}
    UI.Navigation.CloseSideMenus?.();UI.Navigation.Navigate(ROUTE);return true;
  }
  catch(e){pendingContextGame=null;console.warn('[TitleDeck] context menu navigation:',e);return false;}
}
export function createGameContextMenuAdapter(ui=UI,getStore=()=>globalThis.appStore){
  let patches=[],mounted=false,status='Not connected';
  const visitedArrays=new Set();
  let currentId='';
  function remember(p){if(p?.unpatch)patches.push(p)}
  function menuItem(id){
    const nativeMenu=ui.MenuItem;
    if(typeof nativeMenu!=='function'&&typeof nativeMenu!=='object')return null;
    const name=String(steamOverview(getStore(),id)?.display_name||'');
    return h(nativeMenu,{key:CONTEXT_ACTION_KEY,onSelected:()=>requestTitleDeckEditor(id,name)},'Edit with TitleDeck');
  }
  function inject(items,component){
    const arr=findNativeGameContextItems(items);
    if(!arr)return false;
    const id=resolveContextMenuAppId(component||{},arr);
    // Missing or conflicting App IDs fail closed: never reuse another game's ID.
    if(!id)return false;
    const ok=insertTitleDeckContextItem(arr,id,menuItem);
    if(ok){
      visitedArrays.add(arr);if(visitedArrays.size>45){const oldest=visitedArrays.values().next().value;visitedArrays.delete(oldest)}
      status='Native game context menu ready';
    }
    return ok;
  }
  function patchLibraryComponent(LibraryContextMenu){
    if(!LibraryContextMenu?.prototype||typeof LibraryContextMenu.prototype.render!=='function')return false;
    if(typeof ui.afterPatch!=='function')return false;
    const patchedClasses=new WeakSet();
    remember(ui.afterPatch(LibraryContextMenu.prototype,'render',(_,component)=>{
      try{
        const found=resolveContextMenuAppId(component,component?.props?.children);
        currentId=found||''; // Never keep a previous game's ID on an unrelated menu.
        if(!currentId)return component;
        inject(component?.props?.children,component);
        const target=component?.type;
        if(target && typeof target==='function' && !patchedClasses.has(target)){
          patchedClasses.add(target);
          remember(ui.afterPatch(component,'type',(_,ret)=>{
            try{
              const cls=ret?.type;
              if(cls?.prototype && !patchedClasses.has(cls)){
                patchedClasses.add(cls);
                if(typeof cls.prototype.render==='function')remember(ui.afterPatch(cls.prototype,'render',(_,rendered)=>{
                  try{inject(rendered,component)}catch{}
                  return rendered;
                }));
                if(typeof cls.prototype.shouldComponentUpdate==='function')remember(ui.afterPatch(cls.prototype,'shouldComponentUpdate',([nextProps],shouldUpdate)=>{
                  try{if(shouldUpdate===true){const id=resolveContextMenuAppId({props:nextProps},nextProps?.children);if(id){currentId=id;inject(nextProps?.children,{props:nextProps});}}}catch{}
                  return shouldUpdate;
                }));
              }
            }catch{}
            return ret;
          }));
        }
      }catch(e){status='Context menu unavailable: '+String(e?.message||e).slice(0,100)}
      return component;
    }));
    return true;
  }
  function discover(){
    // Resolve only the native library game context component (SteamGridDB
    // implementation). No route or global render monkey-patch.
    try{
      const f=(x)=>typeof x==='function'&&/\(\)\.LibraryContextMenu/.test(String(x));
      let candidate;
      if(typeof ui.findModuleByExport==='function'){
        const module=ui.findModuleByExport(f);
        candidate=Object.values(module||{}).find(x=>typeof x==='function'&&/navigator:/.test(String(x)));
      }
      if(!candidate&&typeof ui.findModuleChild==='function')candidate=ui.findModuleChild(m=>{
        if(!m||typeof m!=='object'||!Object.values(m).some(f))return;
        return Object.values(m).find(x=>typeof x==='function'&&/navigator:/.test(String(x)));
      });
      if(!candidate||typeof ui.fakeRenderComponent!=='function')return null;
      return ui.fakeRenderComponent(candidate)?.type||null;
    }catch(e){status='Native menu discovery failed: '+String(e?.message||e).slice(0,80);return null}
  }
  return{
    get status(){return status},
    start(){
      if(mounted)return;
      // Retry boundedly during startup; no permanent high-frequency menu scans.
      let tries=0;
      const attempt=()=>{
        if(mounted)return;
        const cls=discover();
        if(cls&&patchLibraryComponent(cls)){mounted=true;status='Installed (awaiting game context menu)';}
        else if(++tries>=10){clearInterval(retry);status='Native context menu not exposed on this Steam build';}
      };
      const retry=setInterval(attempt,1700);
      attempt();
      patches.push({unpatch:()=>clearInterval(retry)});
    },
    stop(){mounted=false;currentId='';
      for(const arr of visitedArrays)try{for(let i=arr.length-1;i>=0;i--)if(arr[i]?.key===CONTEXT_ACTION_KEY)arr.splice(i,1)}catch{}
      visitedArrays.clear();for(const patch of patches.reverse())try{patch?.unpatch?.()}catch{};patches=[];
      status='Unloaded';
    }
  };
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
      adapter?.stop();homeMenuAdapter?.stop();descriptionAdapter?.stop();nonSteamDescriptionAdapter?.stop();gameInfoDataAdapter?.stop();
      adapter=createTitleAdapter(doc,()=>latestState,()=>doc.defaultView?.appStore||globalThis.appStore,()=>[doc,...discoverDocuments()]);
      homeMenuAdapter=createHomeMenuTitleAdapter(()=>latestState,()=>doc.defaultView?.appStore||globalThis.appStore,()=>[doc,...discoverDocuments()],()=>[globalThis,doc.defaultView,...discoverDocuments().map(d=>d.defaultView)]);
      descriptionAdapter=createDescriptionAdapter(doc,()=>steamOnlyDescriptionState(latestState,nonSteamOverviewStore(doc)),()=>[doc,...discoverDocuments()],undefined,id=>gameInfoDataAdapter?.getOriginalDescription(id)||'');
      nonSteamDescriptionAdapter=createNonSteamGameInfoAdapter(doc,()=>latestState,()=>[doc,...discoverDocuments()]);
      gameInfoDataAdapter=createGameInfoDataAdapter(()=>latestState,()=>[globalThis,doc.defaultView,...discoverDocuments().map(d=>d.defaultView)]);
      adapter.start();homeMenuAdapter.start();descriptionAdapter.start();nonSteamDescriptionAdapter.start();gameInfoDataAdapter.start();
      reapplySavedGameInfoAfterBoot();
      steamBridgeStatus='Connected to Steam UI document';
    }
    return ()=>{if(steamDocument===doc){adapter?.stop();adapter=null;homeMenuAdapter?.stop();homeMenuAdapter=null;descriptionAdapter?.stop();descriptionAdapter=null;nonSteamDescriptionAdapter?.stop();nonSteamDescriptionAdapter=null;gameInfoDataAdapter?.stop();gameInfoDataAdapter=null;steamDocument=null;steamBridgeStatus='Steam UI detached';}};
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
 if(!homeMenuAdapter){homeMenuAdapter=createHomeMenuTitleAdapter(()=>latestState,()=>globalThis.appStore,()=>[steamDocument,globalThis.document,...discoverDocuments()],()=>[globalThis,steamDocument?.defaultView,...discoverDocuments().map(d=>d.defaultView)]);homeMenuAdapter.start();}
 if(!descriptionAdapter){descriptionAdapter=createDescriptionAdapter(globalThis.document,()=>steamOnlyDescriptionState(latestState,nonSteamOverviewStore(steamDocument||globalThis.document)),()=>steamDocument?[steamDocument]:discoverDocuments(),undefined,id=>gameInfoDataAdapter?.getOriginalDescription(id)||'');descriptionAdapter.start();}
 if(!nonSteamDescriptionAdapter){nonSteamDescriptionAdapter=createNonSteamGameInfoAdapter(globalThis.document,()=>latestState,()=>steamDocument?[steamDocument]:discoverDocuments());nonSteamDescriptionAdapter.start();}
 if(!controllerScrollBridge){controllerScrollBridge=createControllerScrollBridge();controllerScrollBridge.start();}
 if(!gameContextMenuAdapter){gameContextMenuAdapter=createGameContextMenuAdapter();gameContextMenuAdapter.start();}
 if(!gameInfoDataAdapter){gameInfoDataAdapter=createGameInfoDataAdapter(()=>latestState,()=>[globalThis,steamDocument?.defaultView,...discoverDocuments().map(d=>d.defaultView)]);gameInfoDataAdapter.start();}
 refreshState().catch(e=>console.warn('[TitleDeck] state load:',e));
 return{name:PLUGIN,titleView:h('span',{style:{display:'flex',alignItems:'center',gap:8}},'TitleDeck',h('span',{className:'td-version-chip',style:QAM_VERSION_STYLE},`v${PLUGIN_VERSION}`)),content:h(QuickPanel),
   icon:h('img',{src:ICON_DATA_URI,alt:'TitleDeck',style:{width:24,height:24,objectFit:'contain'}}),
   onDismount(){gameContextMenuAdapter?.stop();gameContextMenuAdapter=null;pendingContextGame=null;controllerScrollBridge?.stop();controllerScrollBridge=null;adapter?.stop();adapter=null;homeMenuAdapter?.stop();homeMenuAdapter=null;descriptionAdapter?.stop();descriptionAdapter=null;nonSteamDescriptionAdapter?.stop();nonSteamDescriptionAdapter=null;gameInfoDataAdapter?.stop();gameInfoDataAdapter=null;steamDocument=null;
     try{api.routerHook?.removeGlobalComponent?.(STEAM_DOC_ANCHOR)}catch{}
     try{api.routerHook?.removeRoute?.(ROUTE)}catch{}
     for(const timer of bootHydrationTimers)clearTimeout(timer);bootHydrationTimers=[];
     bridge=null;observers.clear();}};
}
