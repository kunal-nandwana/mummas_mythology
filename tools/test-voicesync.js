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
const r=VS.planSync({silences:sil,total:120.9,nar:nar.map(s=>s.dur),weights:VR.textWeights(cfg,nar),words:nar.map(s=>s.words.map(w=>w.text))});
const want=[0,5.1,11.6,24.3,34.9,41.4,51.2,57.2,72.1,76.0,83.8,92.4,104.9,111.0];
let bad=0;
nar.forEach((s,i)=>{ if(!i) return; const d=r.cuts[i]-want[i], ok=Math.abs(d)<=TOL; if(!ok) bad++;
  console.log(`${ok?'✓':'✗'} shot ${String(i+1).padStart(2)}  ${r.cuts[i].toFixed(1).padStart(6)} s  (expected ${want[i]}, ${d>=0?'+':''}${d.toFixed(1)})  ${r.report[i-1].how}`); });
console.log(`mode: ${r.mode}, steadiest-fit pace deviation ${r.steadiness.toFixed(2)}`);

// Parshuram-Ravan (Nov 2026): real pause list from the owner's voice report. No hand-made answers, so check the plan is sane.
const fs=require('fs'), P2=fs.readFileSync(path.join(__dirname,'fixtures','parshuram-pauses.txt'),'utf8').trim().split(' · ').map(x=>{ const m=/(\d+):([\d.]+) \(([\d.]+) s\)/.exec(x); const s=+m[1]*60+ +m[2]; return {s,e:s+ +m[3]}; });
const T2='parshuram-ravan-vadh-long-form', L=VR.loadPlan(T2), nar2=L.plan.shots.slice(L.cfg.opening||0);
const micro=[]; P2.forEach(p=>{ micro.push(p); micro.push({s:p.e+0.7,e:p.e+0.8}); });   // fake tiny gaps, to exercise the snapping
const r2=VS.planSync({silences:[{s:0,e:0.4},...P2,{s:379.0,e:379.9}],total:379.9,nar:nar2.map(s=>s.dur),weights:VR.textWeights(L.cfg,nar2),words:nar2.map(s=>s.words.map(w=>w.text)),micro});
let bad2=0; r2.cuts.forEach((c,i)=>{ if(i>0 && c<r2.cuts[i-1]+0.79) bad2++; });
console.log(r2.mode==='sentences' && !bad2 && r2.durs.length===nar2.length ? '✓ parshuram plan is sane ('+r2.durs.length+' shots, '+r2.report.filter(x=>/gap/.test(x.how)).length+' cuts moved onto a gap)' : '✗ parshuram plan broken');
if(r2.mode!=='sentences'||bad2) bad++;
console.log(bad?`✗ ${bad} problem(s)`:'✓ voice sync regression test passed'); process.exit(bad?1:0);
