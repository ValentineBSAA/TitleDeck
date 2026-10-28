const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const source=fs.readFileSync(path.join(__dirname,'../src/index.js'),'utf8');
function section(start,end){return source.slice(source.indexOf(start),source.indexOf(end,source.indexOf(start)))}
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
test('0.9.4 hardware-accepted Steam Game Info adapter is byte-for-byte unchanged',()=>{
 const block=section('export function createDescriptionAdapter(','\nconst STYLE=`');
 assert.equal(hash(block),'2e63035bf69d70ccc1786e4d0ce8fd7a2a507c679733c0de59cc471d4cced3a8');
});
test('0.9.4 Game Info native finder and cloning are byte-for-byte unchanged',()=>{
 assert.equal(hash(section('export function findSteamGameInfoDescription(','\n// Full Manager hides')),
  'c1554e12bc6edc1b00aa69263c8ddd5f9324e5a6ccea403aed88c988cc577cb1');
 assert.equal(hash(section('export function createNativeSteamDescriptionPanel(','\n/** Steam Game Info is remounted')),
  '0da3b9ceb9463200ca64ac20e4ae6ef0547c335e12cf0ab928c29671ad339286');
});

test('0.9.12 hardware-accepted rapid non-Steam Community/Game Info lifecycle is byte-for-byte unchanged',()=>{
 const whole=section('export function createNonSteamGameInfoAdapter(','export function createDescriptionAdapter(');
 const body=(from,to)=>whole.slice(whole.indexOf(from),whole.indexOf(to,whole.indexOf(from)));
 assert.equal(hash(body('  function runNow(){','  function schedule(delay=25){')),
  '0761212cb8fa58d1a33fa76cd199b641001ec9302a1feaa49ae39ea486100e2b');
 assert.equal(hash(body('  function start(){',"  function restoreGameInfo(appid=''){")),
  '77a274db4525a0c843dba5f413e70c2f92cc59ca4b9fad1acccbf11bd72eedca');
});
