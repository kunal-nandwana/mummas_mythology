#!/usr/bin/env node
/* =====================================================================
   TAP SYNC: you set the shot timing with your own ears (free, no Kiro credits).
     node tools/tap-sync.js <topic-folder>        (or double-click tap-sync.command)
   Your recording plays in Chrome with the script on screen. Press SPACE the moment you HEAR the next line begin.
   Every tap is saved at once to <topic>/voice-taps.json. render.js and voice-report.js then use your taps as the
   shot changes (each tap is moved onto your pause just before it, so a cut never lands inside a word).
   Why: the automatic sync only sees pauses and counts syllables, so it can be ~1 s off where you speed up
   (Parshuram long video, Nov 2026). Your ears are exact.
   Keys: SPACE = next line starts now · BACKSPACE = undo the last tap (jumps back) · P = pause/play · LEFT/RIGHT arrow = 3 s back/forward
   You can start from any shot (taps for other shots are kept), so fixing one part takes a minute.
   ===================================================================== */
const fs=require('fs'), path=require('path'), http=require('http'), {spawn}=require('child_process');
const VR=require('./voice-report');
const ROOT=path.join(__dirname,'..');
const TAPFILE=topic=>path.join(ROOT,topic,'voice-taps.json');

/* taps saved for THIS recording (same file name and size), else null */
function loadTaps(topic,voice){
  const f=TAPFILE(topic); if(!fs.existsSync(f)||!voice) return null;
  try{ const j=JSON.parse(fs.readFileSync(f,'utf8')), st=fs.statSync(voice);
    if(j.voice!==path.basename(voice) || j.size!==st.size) return null;
    return j.taps||{}; }catch(e){ return null; } }

/* tap time -> cut time: on the pause that ends just before the tap (you hear the line start a moment after the voice
   resumes, so a tap is ~0.2 s late), else 0.2 s before the tap */
const REACT=0.2;
function tapToCut(t,silences){
  let best=null;
  for(const p of silences||[]){ if(p.e<=t+0.15 && p.e>=t-0.8 && (p.e-p.s)>=0.12){ if(!best||Math.abs(p.e-(t-REACT))<Math.abs(best.e-(t-REACT))) best=p; } }
  return best ? Math.max((best.s+best.e)/2, best.e-0.25) : Math.max(0,t-REACT); }

module.exports={loadTaps, tapToCut, TAPFILE};
if(require.main!==module) return;

const topic=(process.argv[2]||'').replace(/\/+$/,'');
if(!topic||!fs.existsSync(path.join(ROOT,topic,'story.js'))){ console.error('Usage: node tools/tap-sync.js <topic-folder>'); process.exit(1); }
const voice=VR.findVoice(topic,null);
if(!voice||!fs.existsSync(voice)){ console.error(`✗ No recording found. Put your voice file in ${topic}/ (or the repo root) first.`); process.exit(1); }
const {cfg,plan}=VR.loadPlan(topic), nar=plan.shots.slice(cfg.opening||0);
// where the shots are now (so "start from shot N" jumps to the right place)
let now=null; try{ const A=VR.analyse(topic,voice); if(A.ok&&A.sync) now=A.sync.cuts.slice(0,nar.length).map((c,i)=>i===0?A.sync.start:c); }catch(e){}
const size=fs.statSync(voice).size, old=loadTaps(topic,voice)||{};
const P0=nar[0].start, PL=nar[nar.length-1].end-P0;
const DATA={topic, title:cfg.title||topic, lines:nar.map(s=>s.line), plan:nar.map(s=>(s.start-P0)/PL), now, taps:old};

const page=`<!doctype html><html><head><meta charset="utf-8"><title>Tap sync: ${DATA.title}</title><style>
@font-face{font-family:Mukta;src:url(/font)}
body{margin:0;background:#120c22;color:#f4ead2;font:20px Mukta,system-ui,sans-serif;display:flex;flex-direction:column;align-items:center}
#bar{margin:18px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center}
button,select{font-size:18px;padding:8px 14px;border-radius:8px;border:0;background:#f1c04e;color:#1a1030;cursor:pointer}
#prev,#cur,#next{width:88vw;text-align:center;margin:6px 0}#prev{opacity:.4;font-size:24px}#cur{font-size:44px;color:#ffd25e;min-height:120px}
#next{font-size:30px;opacity:.75}#help{opacity:.7;font-size:16px;margin:14px;text-align:center}#st{font-size:16px;opacity:.85}
</style></head><body>
<div id="bar"><span>Start from shot</span><select id="from"></select><button id="go">▶ Start</button><span id="st"></span></div>
<div id="prev"></div><div id="cur">Press ▶ Start, then SPACE each time you hear the NEXT line begin.</div><div id="next"></div>
<div id="help">SPACE = next line starts now · BACKSPACE = undo last tap · P = pause/play · LEFT/RIGHT arrow = 3 s back/forward<br>Every tap is saved at once. Close this tab when you are done, then run make-video.command.</div>
<audio id="au" src="/audio" preload="auto"></audio>
<script>
const D=${JSON.stringify(DATA)}, au=document.getElementById('au'), N=D.lines.length; let k=0, saved=0;
const $=id=>document.getElementById(id), fmt=s=>Math.floor(s/60)+':'+(s%60).toFixed(1).padStart(4,'0');
D.lines.forEach((l,i)=>{ const o=document.createElement('option'); o.value=i; o.textContent=(i+1)+'. '+l.slice(0,40); o.style.fontFamily='Mukta'; $('from').appendChild(o); });
function show(){ $('prev').textContent=k>0?D.lines[k-1]:''; $('cur').textContent=D.lines[k]||'(end)'; $('next').textContent=D.lines[k+1]?'next: '+D.lines[k+1]:'';
  $('st').textContent='shot '+(k+1)+' of '+N+' · '+Object.keys(D.taps).length+' taps saved · '+fmt(au.currentTime); }
function save(){ fetch('/save',{method:'POST',body:JSON.stringify(D.taps)}).then(()=>{ saved++; show(); }); }
$('go').onclick=()=>{ k=+$('from').value; const t0=k===0?0:((D.taps[k+1]!==undefined?D.taps[k+1]:(D.now?D.now[k]:D.plan[k]*(au.duration||0)))-2); au.currentTime=Math.max(0,t0); au.play(); show(); $('go').blur(); };
document.addEventListener('keydown',e=>{
  if(e.code==='Space'){ e.preventDefault(); if(au.paused||k>=N-1) return; k++; D.taps[k+1]=+au.currentTime.toFixed(2); save(); }
  else if(e.code==='Backspace'){ e.preventDefault(); if(k<=0) return; const t=D.taps[k+1]; delete D.taps[k+1]; k--; if(t!==undefined) au.currentTime=Math.max(0,t-3); save(); }
  else if(e.key==='p'||e.key==='P'){ au.paused?au.play():au.pause(); }
  else if(e.code==='ArrowLeft'){ au.currentTime=Math.max(0,au.currentTime-3); } else if(e.code==='ArrowRight'){ au.currentTime+=3; }
  show(); });
setInterval(show,200);
</script></body></html>`;

const srv=http.createServer((req,res)=>{
  if(req.url==='/'){ res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}); return res.end(page); }
  if(req.url==='/font'){ res.writeHead(200,{'Content-Type':'font/ttf'}); return fs.createReadStream(path.join(ROOT,'engine','fonts','Mukta-Medium.ttf')).pipe(res); }
  if(req.url==='/audio'){ const ext=path.extname(voice).slice(1).toLowerCase(), type={mp3:'audio/mpeg',m4a:'audio/mp4',wav:'audio/wav',aac:'audio/aac',ogg:'audio/ogg',flac:'audio/flac'}[ext]||'application/octet-stream';
    const m=/bytes=(\d*)-(\d*)/.exec(req.headers.range||'');
    if(m){ const a=m[1]?+m[1]:0, b=m[2]?Math.min(+m[2],size-1):size-1;
      res.writeHead(206,{'Content-Type':type,'Accept-Ranges':'bytes','Content-Range':`bytes ${a}-${b}/${size}`,'Content-Length':b-a+1}); return fs.createReadStream(voice,{start:a,end:b}).pipe(res); }
    res.writeHead(200,{'Content-Type':type,'Accept-Ranges':'bytes','Content-Length':size}); return fs.createReadStream(voice).pipe(res); }
  if(req.url==='/save'&&req.method==='POST'){ let body=''; req.on('data',c=>body+=c); req.on('end',()=>{
      try{ const taps=JSON.parse(body), clean={}; Object.keys(taps).forEach(s=>{ const n=+s, t=+taps[s]; if(n>=2&&n<=nar.length&&isFinite(t)&&t>=0) clean[n]=t; });
        fs.writeFileSync(TAPFILE(topic),JSON.stringify({voice:path.basename(voice), size, taps:clean},null,1)); res.end('ok'); }
      catch(e){ res.writeHead(400); res.end('bad'); } }); return; }
  res.writeHead(404); res.end();
});
srv.listen(0,'127.0.0.1',()=>{ const url=`http://127.0.0.1:${srv.address().port}/`;
  console.log(`♪ Tap sync for ${topic} with ${path.basename(voice)}\n  Open: ${url}\n  Taps are saved to ${path.relative(ROOT,TAPFILE(topic))}. Press Ctrl+C here when you are done.`);
  if(process.platform==='darwin' && !process.env.NO_OPEN){ const chrome='/Applications/Google Chrome.app'; spawn('open',fs.existsSync(chrome)?['-a','Google Chrome',url]:[url],{stdio:'ignore',detached:true}).unref(); } });
