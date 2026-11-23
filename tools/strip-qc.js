#!/usr/bin/env node
/* =====================================================================
   STRIP QC: node tools/strip-qc.js <topic-folder>
   Looks at the real picture (same Playwright as render.js and contact-sheet.js) and finds shots
   that are probably broken, BEFORE you spend minutes on a render:
     BLANK        almost one flat colour (a layer failed to draw, a missing gradient id, an empty shot)
     DARK/BRIGHT  nearly black or nearly white all over
     LOW CONTRAST washed out or muddy picture
     FROZEN       a shot longer than 2.5 s where nothing moves between 25% and 90% of the shot
   Three frames per shot are checked (start+0.3 s, 60%, end-0.2 s). Needs: node tools/build.js <topic> first.
   Writes <topic>/preview/qc.md. Exit code 1 only when a shot is BLANK. Everything else is a warning to look at,
   because a deliberate black frame or a calm still shot is allowed (reply "intended" for that shot in your fix message).
   ===================================================================== */
const fs=require('fs'), path=require('path'), vm=require('vm');
const ROOT=path.join(__dirname,'..'), ENG=path.join(ROOT,'engine');

/* ---------- pure analysis (tested without a browser: node tools/strip-qc.js --selftest) ---------- */
/* lum: array of 0-255 grey values of a small frame. returns mean, standard deviation and share of near-black / near-white pixels */
function stats(lum){ const n=lum.length; let s=0; for(let i=0;i<n;i++) s+=lum[i]; const mean=s/n; let v=0, dark=0, bright=0;
  for(let i=0;i<n;i++){ const d=lum[i]-mean; v+=d*d; if(lum[i]<16) dark++; if(lum[i]>240) bright++; }
  return { mean, std:Math.sqrt(v/n), dark:dark/n, bright:bright/n }; }
/* mean absolute difference between two frames of the same size (0 = identical) */
function diff(a,b){ let s=0; for(let i=0;i<a.length;i++) s+=Math.abs(a[i]-b[i]); return s/a.length; }
/* frames: [{lum}, {lum}, {lum}] for one shot; dur = shot length in s. returns a list of {level:'error'|'warn', code, msg} */
function judge(frames,dur){ const out=[]; const st=frames.map(f=>stats(f.lum));
  const worst=st.reduce((a,b)=>b.std<a.std?b:a);
  if(st.every(x=>x.std<6)) out.push({level:'error',code:'BLANK',msg:`picture is almost one flat colour (spread ${worst.std.toFixed(1)})`});
  else{
    if(st.every(x=>x.mean<14)) out.push({level:'warn',code:'DARK',msg:`nearly black in every checked frame (average ${st[0].mean.toFixed(0)}/255)`});
    if(st.every(x=>x.mean>240)) out.push({level:'warn',code:'BRIGHT',msg:`nearly white in every checked frame (average ${st[0].mean.toFixed(0)}/255)`});
    if(st.every(x=>x.std<22) && !out.length) out.push({level:'warn',code:'LOW-CONTRAST',msg:`washed out or muddy (spread ${Math.max(...st.map(x=>x.std)).toFixed(0)}, normally 40+)`}); }
  if(dur>2.5 && frames.length>=3){ const d=diff(frames[0].lum,frames[frames.length-1].lum); if(d<0.35 && st[0].std>=6) out.push({level:'warn',code:'FROZEN',msg:`nothing moves during a ${dur.toFixed(1)} s shot (change ${d.toFixed(2)}/255); add a camera move, drift or pulse if this is not meant to be a still`}); }
  return out; }
module.exports={stats,diff,judge};

if(process.argv.includes('--selftest')){
  const flat=Array(500).fill(120), noisy=Array.from({length:500},(_,i)=>(i*37)%256), dark=Array(500).fill(3), grey=Array.from({length:500},(_,i)=>90+(i%40));
  const T=(name,got,want)=>{ const ok=JSON.stringify(got)===JSON.stringify(want); console.log((ok?'ok   ':'FAIL ')+name+(ok?'':'  got '+JSON.stringify(got))); if(!ok) process.exitCode=1; };
  const codes=(f,d)=>judge(f,d).map(x=>x.code);
  T('flat colour is BLANK',codes([{lum:flat},{lum:flat},{lum:flat}],3),['BLANK']);
  T('black is BLANK',codes([{lum:dark},{lum:dark},{lum:dark}],3),['BLANK']);
  T('busy picture, changing = nothing',codes([{lum:noisy},{lum:noisy.map(v=>(v+90)%256)},{lum:noisy.map(v=>(v+200)%256)}],3),[]);
  T('busy picture, identical frames = FROZEN',codes([{lum:noisy},{lum:noisy},{lum:noisy}],3),['FROZEN']);
  T('short still shot is allowed',codes([{lum:noisy},{lum:noisy},{lum:noisy}],1.8),[]);
  T('muddy grey is LOW-CONTRAST',codes([{lum:grey},{lum:grey.map(v=>v+3)},{lum:grey.map(v=>v+6)}],2),['LOW-CONTRAST']);
  T('one dark frame (flash) is fine',codes([{lum:dark},{lum:noisy},{lum:noisy.map(v=>(v+50)%256)}],3),[]);
  process.exit(process.exitCode||0);
}

const args=process.argv.slice(2), topic=(args.find(a=>!a.startsWith('--'))||'').replace(/\/$/,'');
if(!topic){ console.error('usage: node tools/strip-qc.js <topic-folder>'); process.exit(1); }
const dir=path.join(ROOT,topic), HTML=path.join(dir,'index.html');
if(!fs.existsSync(HTML)){ console.error('missing index.html: run  node tools/build.js '+topic+'  first'); process.exit(1); }
let chromium; try{ ({chromium}=require('playwright')); }catch(e){ console.error('✗ Playwright missing. Run: npm install && npx playwright install chromium'); process.exit(1); }
const read=f=>fs.readFileSync(f,'utf8');
const ctx={console}; vm.createContext(ctx);
vm.runInContext(read(path.join(ENG,'timing.js'))+'\n'+read(path.join(ENG,'characters.js')), ctx);
let CFG=null; ctx.VIDEO=c=>{ CFG=c; }; vm.runInContext(read(path.join(dir,'story.js')), ctx);
const plan=ctx.planTiming(CFG), LONG=CFG.format==='long', VW=LONG?960:540, VH=LONG?540:960;

(async()=>{
  const browser=await chromium.launch(), page=await browser.newPage({viewport:{width:VW,height:VH}});
  await page.goto('file://'+HTML+'?render=1'); 
  await page.waitForFunction(()=>window.__ENGINE&&window.__ENGINE.seek, null, {timeout:20000});
  const tools=await browser.newPage();       // turns a screenshot into a small grey-value array
  const grey=async buf=>tools.evaluate(async b64=>{ const img=new Image(); img.src='data:image/jpeg;base64,'+b64; await img.decode();
    const w=54, h=Math.round(54*img.naturalHeight/img.naturalWidth), c=document.createElement('canvas'); c.width=w; c.height=h; const x=c.getContext('2d'); x.drawImage(img,0,0,w,h);
    const d=x.getImageData(0,0,w,h).data, o=[]; for(let i=0;i<d.length;i+=4) o.push(Math.round(0.299*d[i]+0.587*d[i+1]+0.114*d[i+2])); return o; }, buf.toString('base64'));
  const rows=[]; let errors=0, warns=0;
  for(const s of plan.shots){
    const ts=[s.start+0.3, s.start+Math.max(0.4,s.dur*0.6), s.start+Math.max(0.5,s.dur-0.2)].map(t=>Math.min(t,s.start+s.dur-0.05)), frames=[];
    for(const t of ts){ await page.evaluate(t=>window.__ENGINE.seek(t), t); frames.push({lum:await grey(await page.screenshot({type:'jpeg',quality:70}))}); }
    const res=judge(frames,s.dur); res.forEach(r=>r.level==='error'?errors++:warns++);
    rows.push({n:s.i+1, t:s.start, dur:s.dur, line:(s.line||'').split(/\s+/).slice(0,6).join(' '), res}); }
  await browser.close();
  const lines=rows.filter(r=>r.res.length).map(r=>`- **shot ${r.n}** (${r.t.toFixed(1)} s, ${r.dur.toFixed(1)} s long, "${r.line}"): `+r.res.map(x=>`${x.level==='error'?'ERROR':'warn'} ${x.code}: ${x.msg}`).join('; '));
  const md=`# Strip QC: ${topic}\n\n${plan.shots.length} shots checked (3 frames each): ${errors} error(s), ${warns} warning(s).\n\n`+(lines.length?lines.join('\n'):'No problems found.')+'\n';
  fs.mkdirSync(path.join(dir,'preview'),{recursive:true}); fs.writeFileSync(path.join(dir,'preview','qc.md'),md);
  console.log(md.trim()); console.log(`\n→ ${topic}/preview/qc.md`);
  process.exit(errors?1:0);
})().catch(e=>{ console.error('✗ '+e.message); process.exit(1); });
