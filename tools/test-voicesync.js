#!/usr/bin/env node
/* Regression test for the voice sync (no ffmpeg, no audio needed):  node tools/test-voicesync.js
   Real case: Mahakal short (Nov 2026). Only 14 pauses in 2 minutes; the old pause-only fit put shots 4-14
   2.5-4.5 s early. The expected cuts were worked out by hand by matching every pause to its sentence end
   (steady pace 14-16.6 chars/s) and fixed in story.js with rec: pins. The sentence alignment must find
   them on its own (pins ignored here), within TOL seconds. */
const path=require('path'), VS=require('./voicesync'), VR=require('./voice-report');
const TOL=1.0;
const {cfg,plan}=VR.loadPlan('mahakal-origin-short-form'), nar=plan.shots.slice(cfg.opening||0);
const P=[[0.2,.45],[2.0,.24],[5.0,.27],[5.3,.23],[7.6,.24],[11.4,.39],[12.8,.26],[30.3,.25],[34.7,.26],[48.0,.21],[69.9,.25],[71.9,.44],[85.4,.20],[99.0,.22]];
const sil=P.map(([s,l])=>({s,e:s+l})).concat([{s:120.2,e:120.9}]);
const r=VS.planSync(Object.assign({silences:sil,total:120.9,nar:nar.map(s=>s.dur)},VR.syncInputs(cfg,nar)));
const want=[0,5.1,11.6,24.3,34.9,41.4,51.2,57.2,72.1,76.0,83.8,92.4,104.9,111.0];
let bad=0;
nar.forEach((s,i)=>{ if(!i) return; const d=r.cuts[i]-want[i], ok=Math.abs(d)<=TOL; if(!ok) bad++;
  console.log(`${ok?'✓':'✗'} shot ${String(i+1).padStart(2)}  ${r.cuts[i].toFixed(1).padStart(6)} s  (expected ${want[i]}, ${d>=0?'+':''}${d.toFixed(1)})  ${r.report[i-1].how}`); });
console.log(`mode: ${r.mode}, steadiest-fit pace deviation ${r.steadiness.toFixed(2)}`);

/* Parshuram-Ravan long video (Nov 2026): real pause list from the owner's voice report.
   Bug: the shlokas were counted a fixed 1.7x slower than narration, but he chants them only ~1.35x slower. The verse end landed
   inside "अर्थात...", his long pauses at sentence ends were called breaths, and from shot 15 on every picture came 1-2 shots late
   (2:01.9, his longest pause = end of chapter 2, was put 7 s before chapter 3 started).
   Expected: the chant speed is learned (1.2-1.5), and each long pause that ends a script sentence gets its cut
   (start of shot n = just after the pause). */
const fs=require('fs'), P2=fs.readFileSync(path.join(__dirname,'fixtures','parshuram-pauses.txt'),'utf8').trim().split(' · ').map(x=>{ const m=/(\d+):([\d.]+) \(([\d.]+) s\)/.exec(x); const s=+m[1]*60+ +m[2]; return {s,e:s+ +m[3]}; });
const T2='parshuram-ravan-vadh-long-form', L=VR.loadPlan(T2), nar2=L.plan.shots.slice(L.cfg.opening||0);
const micro=[]; P2.forEach(p=>{ micro.push(p); micro.push({s:p.e+0.7,e:p.e+0.8}); });   // fake tiny gaps, to exercise the snapping
const r2=VS.planSync(Object.assign({silences:[{s:0,e:0.4},...P2,{s:379.0,e:379.9}],total:379.9,nar:nar2.map(s=>s.dur),micro},VR.syncInputs(L.cfg,nar2)));
let bad2=0; r2.cuts.forEach((c,i)=>{ if(i>0 && c<r2.cuts[i-1]+0.79) bad2++; });
console.log(r2.mode==='sentences' && !bad2 && r2.durs.length===nar2.length ? '✓ parshuram plan is sane ('+r2.durs.length+' shots, '+r2.report.filter(x=>/gap/.test(x.how)).length+' cuts moved onto a gap)' : '✗ parshuram plan broken');
if(r2.mode!=='sentences'||bad2) bad++;
const cs=r2.chantSpeed, csOk=cs>=1.2 && cs<=1.5; if(!csOk) bad++;
console.log(`${csOk?'✓':'✗'} parshuram chant speed learned: ${cs}x (expected 1.2-1.5)`);
// [shot (1-based) that must start right after this pause, pause start s, the line that ends there]
[[15,51.6,'…मार ही नहीं सकते थे।'],[18,68.0,'shloka 1 …विद्यते ॥'],[20,78.2,'…छोड़ दिया था।'],[25,94.8,'…सही नहीं है।'],
 [31,121.9,'…क्यों नहीं दी? (end of chapter 2)'],[49,196.0,'…वचन दिया था:'],[50,206.7,'shloka 2 …मया पुरा ॥']].forEach(([shot,t,what])=>{
  const c=r2.cuts[shot-1], ok=c>=t && c<=t+0.9; if(!ok) bad++;
  console.log(`${ok?'✓':'✗'} parshuram shot ${shot} starts ${c.toFixed(1)} s (after the pause at ${t}: ${what})`); });
/* Tap sync (tools/tap-sync.js): a tap is ~0.2 s after the voice resumes; it must move onto that pause, and a tapped cut must win
   over the automatic fit while every other cut stays in order. */
{ const TS=require('./tap-sync'), sil=[{s:0,e:0.4},...P2,{s:379.0,e:379.9}];
  const c1=TS.tapToCut(122.95,sil), c2=TS.tapToCut(250.0,sil);   // 2:01.9-2:02.74 pause, then a tap with no pause near it
  const ok1=c1>=122.3&&c1<=122.75, ok2=Math.abs(c2-249.8)<0.01; if(!ok1||!ok2) bad++;
  console.log(`${ok1&&ok2?'✓':'✗'} tap -> cut: ${c1.toFixed(2)} (on the pause) and ${c2.toFixed(2)} (0.2 s before the tap)`);
  const forced=nar2.map(()=>null); forced[54]=226.0; forced[60]=255.0;   // shots 55 and 61 tapped well away from the fit
  const r3=VS.planSync(Object.assign({silences:sil,total:379.9,nar:nar2.map(s=>s.dur),forced},VR.syncInputs(L.cfg,nar2)));
  let order=0; r3.cuts.forEach((c,i)=>{ if(i>0&&c<=r3.cuts[i-1]) order++; });
  const ok3=Math.abs(r3.cuts[54]-226.0)<0.01 && Math.abs(r3.cuts[60]-255.0)<0.01 && !order; if(!ok3) bad++;
  console.log(`${ok3?'✓':'✗'} tapped cuts are kept and all ${r3.cuts.length} cuts stay in order`); }
console.log(bad?`✗ ${bad} problem(s)`:'✓ voice sync regression test passed'); process.exit(bad?1:0);
