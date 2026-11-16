#!/usr/bin/env node
/* =====================================================================
   TIMELINE: node tools/timeline.js <topic-folder>
   Writes <topic>/preview/timeline.json (every shot, word and sfx cue in
   seconds: one clock for picture, captions and sound) and prints a pacing
   report, so rhythm problems show up before you watch the video.
   Free and instant: needs only Node (no browser). Exit 1 on errors.

   Checks: shot length spread, reading speed (words/sec), caption chunk
   length, sfx cues outside their shot, long runs of same-length shots
   (monotone rhythm), and the weakest/strongest beats.
   ===================================================================== */
const fs=require('fs'), path=require('path'), vm=require('vm');
const ROOT=path.join(__dirname,'..'), ENG=path.join(ROOT,'engine');
const topic=(process.argv[2]||'').replace(/\/$/,'');
if(!topic){ console.error('usage: node tools/timeline.js <topic-folder>'); process.exit(1); }
const dir=path.join(ROOT,topic), storyPath=path.join(dir,'story.js');
if(!fs.existsSync(storyPath)){ console.error('missing '+storyPath); process.exit(1); }

const read=f=>fs.readFileSync(f,'utf8');
const ctx={console}; vm.createContext(ctx);
vm.runInContext(read(path.join(ENG,'timing.js'))+'\n'+read(path.join(ENG,'characters.js')), ctx);
let CFG=null; ctx.VIDEO=c=>{ CFG=c; };
vm.runInContext(read(storyPath), ctx);
if(!CFG){ console.error('story.js did not call VIDEO(...)'); process.exit(1); }
const plan=ctx.planTiming(CFG);

const errors=[], warns=[];
const WPS_MAX=3.2, WPS_MIN=0.8, CHUNK_MAX=(CFG.captionChars||24)+4, SAME_RUN=4;
const shots=plan.shots.map(s=>{
  const sc=CFG.shots[s.i];
  const wps=s.words.length? s.words.length/Math.max(0.1, s.speakEnd-s.start-0.18) : 0;
  const sfx=(sc.sfx||[]).map(([t,name,vol])=>({at:+(s.start+t).toFixed(2), name, vol:vol==null?1:vol, inShot:t>=0&&t<=s.dur}));
  const chunks=ctx.captionChunks(s.words, CFG.captionChars||24).map(c=>({
    t:+c[0].t.toFixed(2), e:+c[c.length-1].e.toFixed(2), text:c.map(w=>w.text).join(' ')}));
  const n=s.i+1;
  if(s.words.length && wps>WPS_MAX) warns.push(`shot ${n}: ${wps.toFixed(1)} words/s is fast to read (max ${WPS_MAX})`);
  if(s.words.length>2 && wps<WPS_MIN) warns.push(`shot ${n}: ${wps.toFixed(1)} words/s leaves dead air (min ${WPS_MIN})`);
  chunks.forEach(c=>{ if(c.text.replace(/\s/g,'').length>CHUNK_MAX) warns.push(`shot ${n}: caption chunk too long: "${c.text}"`); });
  sfx.forEach(x=>{ if(!x.inShot) errors.push(`shot ${n}: sfx '${x.name}' at ${x.at}s is outside the shot`); });
  return {n, start:+s.start.toFixed(2), end:+s.end.toFixed(2), dur:+s.dur.toFixed(2), wps:+wps.toFixed(2),
          words:s.words.length, line:s.line, chunks, sfx, scene:sc.scene||null, cam:sc.cam||null, tr:sc.tr||null};
});

/* rhythm: runs of near-identical shot lengths feel mechanical */
let run=1;
for(let i=1;i<shots.length;i++){
  run = Math.abs(shots[i].dur-shots[i-1].dur)<0.4 ? run+1 : 1;
  if(run===SAME_RUN) warns.push(`shots ${i-SAME_RUN+2}-${i+1}: ${SAME_RUN} shots in a row last about ${shots[i].dur.toFixed(1)}s (monotone rhythm)`);
}
const durs=shots.map(s=>s.dur), avg=durs.reduce((a,b)=>a+b,0)/durs.length;
const sorted=[...durs].sort((a,b)=>a-b);

const out={topic, title:CFG.title||topic, duration:+plan.duration.toFixed(2), shotCount:shots.length,
  avgShot:+avg.toFixed(2), medianShot:+sorted[Math.floor(sorted.length/2)].toFixed(2), shots};
fs.mkdirSync(path.join(dir,'preview'),{recursive:true});
fs.writeFileSync(path.join(dir,'preview','timeline.json'), JSON.stringify(out,null,1));

/* report */
const bar=d=>'█'.repeat(Math.max(1,Math.round(d*4)));
console.log(`\n${out.title}  ·  ${out.duration}s  ·  ${shots.length} shots  ·  avg ${out.avgShot}s  ·  median ${out.medianShot}s\n`);
shots.forEach(s=>console.log(`${String(s.n).padStart(2)}  ${s.start.toFixed(1).padStart(5)}s  ${s.dur.toFixed(1).padStart(4)}s  ${String(s.wps.toFixed(1)).padStart(4)}w/s  ${bar(s.dur)}${s.sfx.length?'  ♪'+s.sfx.length:''}`));
console.log(`\n${errors.length} error(s), ${warns.length} warning(s)`);
errors.forEach(e=>console.log('  ERROR '+e)); warns.forEach(w=>console.log('  warn  '+w));
console.log(`\n→ ${topic}/preview/timeline.json`);
process.exit(errors.length?1:0);
