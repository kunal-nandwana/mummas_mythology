#!/usr/bin/env node
/* =====================================================================
   CHECK: node tools/check.js <topic-folder>
   Free, instant check of <topic>/story.js BEFORE you open the video.
   Catches the mistakes that normally cost a whole fix round:
     - story.js crashes, or uses a character / scene helper that does not exist
     - unknown pose, expression, mood, transition, fx, camera preset
     - Hindi lines that differ from <topic>/my-script.md (your exact words)
     - shots that are too short / too long for their line, or captions too long
     - characters placed off-screen, missing keywords, missing scene names
   Exit code 1 if there are ERRORS (warnings do not fail).
   ===================================================================== */
const fs=require('fs'), path=require('path'), vm=require('vm');
const ROOT=path.join(__dirname,'..'), ENG=path.join(ROOT,'engine');
const topic=(process.argv[2]||'').replace(/\/$/,'');
if(!topic){ console.error('usage: node tools/check.js <topic-folder>'); process.exit(1); }
const dir=path.join(ROOT,topic), storyPath=path.join(dir,'story.js');
if(!fs.existsSync(storyPath)){ console.error('missing '+storyPath); process.exit(1); }
const read=f=>fs.readFileSync(f,'utf8');

const errors=[], warns=[];
const E=(m)=>errors.push(m), W=(m)=>warns.push(m);

/* 1) load the engine pieces that need no browser (poses, costumes, scene helpers, timing) */
const ctx={ console:{log(){},warn(m){ if(String(m).startsWith('unknown pose')) E('engine: '+m); },error(){}}, Math, Object, Array, String, Number, JSON };
vm.createContext(ctx);
try{
  vm.runInContext(['timing.js','scenes.js','rig.js','characters.js'].map(f=>read(path.join(ENG,f))).join('\n'), ctx);
}catch(e){ console.error('engine failed to load: '+e.message); process.exit(2); }
const known=(expr,def)=>{ try{ return vm.runInContext(expr,ctx); }catch(e){ return def; } };
const POSES=known('POSES',{}), CHARS=known('Object.keys({})',[]);
/* characters are `const NAME = {...}`: list every UPPERCASE const in characters.js */
const charNames=[...read(path.join(ENG,'characters.js')).matchAll(/^const\s+([A-Z_0-9]+)\s*=/gm)].map(m=>m[1]);
const coreSrc=read(path.join(ENG,'core.js'));
const MOODS=[...((coreSrc.match(/const MOODS=\{([\s\S]*?)\n\s*\};?/)||['',''])[1]).matchAll(/(?:^|[\s,{])([a-z]+):\{/g)].map(m=>m[1]);
const GRADS=new Set([...(coreSrc+read(path.join(ENG,'scenes.js'))).matchAll(/id=["']([A-Za-z0-9_]+)["']/g)].map(m=>m[1]));

const TRANS=['cut','fade','glow','whip','zoom','iris','wipe','flash','dip'];
const FX=['dust','embers','sparks','stars','flies','petals'];
const CAMS=['in','out','panL','panR','up','down','still'];
const EXPRS=['calm','smile','serene','sad','angry','surprise'];
const MOODNAMES=['calm','joy','hope','anger','sad','shock','divine','neutral'];

/* 2) run story.js */
let CFG=null; ctx.VIDEO=c=>{ CFG=c; };
try{ vm.runInContext(read(storyPath), ctx, {filename:storyPath}); }
catch(e){
  const m=/(\w+) is not defined/.exec(e.message);
  console.log('✗ story.js could not run: '+e.message+(m?`\n  → "${m[1]}" does not exist. Check the spelling in engine/API.md (characters, scenes, props).`:''));
  process.exit(1);
}
if(!CFG){ console.log('✗ story.js must call VIDEO({...})'); process.exit(1); }
const shots=CFG.shots||[];
if(!shots.length) E('no shots');

/* 3) options on the whole video */
['intro','outro','hook','opening'].forEach(k=>{ if(CFG[k]) W(`VIDEO.${k} is set, but the owner does not want intros, hook text or end cards (see steering).`); });
if(!CFG.target) W('no target (seconds) set: length will follow the text only.');
if(!CFG.keywords||!CFG.keywords.length) W('no keywords: no caption words will be highlighted.');
if(CFG.music==='scenes' && shots.some(s=>!s.scene)) W('music:\'scenes\' but some shots have no scene:\'name\' (they fall back to the mood default).');

/* 4) per shot */
const bad=(arr,v)=>v && !arr.includes(v);
shots.forEach((s,i)=>{
  const n=i+1, P=m=>`shot ${n}: ${m}`;
  if(!s.line && !CFG.opening) W(P('no line (silent shot).'));
  if(s.tr && !TRANS.includes(s.tr)) E(P(`unknown transition "${s.tr}" (${TRANS.join(', ')})`));
  if(typeof s.fx==='string' && bad(FX,s.fx)) E(P(`unknown fx "${s.fx}" (${FX.join(', ')})`));
  if(typeof s.cam==='string' && bad(CAMS,s.cam)) E(P(`unknown camera preset "${s.cam}" (${CAMS.join(', ')})`));
  if(s.cam && typeof s.cam==='object' && !s.cam.keys && !(s.cam.from&&s.cam.to)) E(P('cam object needs {keys:[..]} or {from:[..],to:[..]}'));
  if(typeof s.mood==='string' && !MOODNAMES.includes(s.mood) && !(MOODS.includes(s.mood))) E(P(`unknown mood "${s.mood}" (${MOODNAMES.join(', ')})`));
  if(s.cam && s.cam.keys){ s.cam.keys.forEach(k=>{ if(!(k[3]>0 && k[3]<6)) W(P(`camera zoom ${k[3]} looks odd (usually 1 to 2.5)`)); }); }

  /* art functions must run and use real gradients */
  ['art','sky','far','mid','near','front','back'].forEach(k=>{
    if(s[k]===undefined) return;
    if(typeof s[k]!=='function'){ E(P(`"${k}" must be a function: ${k}:()=>svg`)); return; }
    let svg=''; try{ svg=String(s[k]()); }catch(e){ E(P(`${k}() crashed: ${e.message}`)); return; }
    [...svg.matchAll(/url\(#([A-Za-z0-9_]+)\)/g)].forEach(m=>{ if(GRADS.size && !GRADS.has(m[1]) && !svg.includes(`id="${m[1]}"`)) W(P(`${k}() uses gradient #${m[1]} that is not defined in the engine`)); });
    if(/NaN|undefined/.test(svg)) E(P(`${k}() produced "NaN" or "undefined" in the SVG (a wrong number or missing argument)`));
  });
  if(!s.art && !s.sky && !s.mid && !s.far) W(P('no background (art / sky / mid).'));

  /* cast */
  (s.cast||[]).forEach((c,ci)=>{
    const who=`cast ${ci+1}`;
    if(!c.c || typeof c.c!=='object') { E(P(`${who}: "c" must be a character like KRISHNA`)); return; }
    if(typeof c.x!=='number'||typeof c.y!=='number') E(P(`${who}: needs x and y numbers`));
    else{
      if(c.x<-60||c.x>600) { if(!c.walk && !c.enter) W(P(`${who}: x=${c.x} is off-screen (0-540)`)); }
      if(c.y<400||c.y>1000) W(P(`${who}: feet y=${c.y} is unusual (normally 700-900)`));
    }
    if(c.s!==undefined && !(c.s>0.2&&c.s<3)) W(P(`${who}: scale ${c.s} looks odd`));
    if(c.expr && !EXPRS.includes(c.expr)) E(P(`${who}: unknown expr "${c.expr}" (${EXPRS.join(', ')})`));
    (c.acts||[]).forEach(a=>{
      if(!Array.isArray(a)||typeof a[0]!=='number'){ E(P(`${who}: acts must look like [seconds,'pose']`)); return; }
      if(typeof a[1]==='string') a[1].split('+').forEach(p=>{ if(!POSES[p]) E(P(`${who}: unknown pose "${p}"`)); });
    });
  });
});

/* 5) timing: too short / too long for the line */
try{
  const plan=ctx.planTiming(CFG);
  plan.shots.forEach((p,i)=>{
    const s=shots[i], words=ctx.tWords(p.line).length;
    if(words && p.dur<words*0.2) W(`shot ${i+1}: ${p.dur.toFixed(1)}s for ${words} words is fast — add dur:${(words*0.3).toFixed(1)} or raise target.`);
    if(p.dur>9 && !s.calli) W(`shot ${i+1}: ${p.dur.toFixed(1)}s is long for one picture — consider splitting it or adding camera keys.`);
    if(/॥/.test(p.line) && !s.calli) W(`shot ${i+1}: line has ॥ (verse) but no calli — put verses in their own shot with calli.`);
  });
  if(CFG.target && Math.abs(plan.narrEnd-CFG.target)>CFG.target*0.08) W(`narration is ${plan.narrEnd.toFixed(1)}s but target is ${CFG.target}s (some shots are locked by minShot/dur).`);
  console.log(`${topic}: ${shots.length} shots, ${plan.narrEnd.toFixed(1)}s narration (+${plan.ending}s ending)`);
}catch(e){ E('timing failed: '+e.message); }

/* 6) your exact words (my-script.md) */
const scriptPath=path.join(dir,'my-script.md');
const norm=w=>w.replace(/[.,!?'"‘’“”—\-–…:;।॥()\[\]*_`#>|]/g,'').trim();
const wordsOf=t=>t.split(/\s+/).map(norm).filter(Boolean);
if(fs.existsSync(scriptPath)){
  let src=read(scriptPath).replace(/\[\d{1,2}:\d{2}(?::\d{2})?\]/g,' ');   // [00:06] time stamps
  const sw=wordsOf(src), used=new Array(sw.length).fill(false);
  shots.forEach((s,i)=>{
    const lw=wordsOf(s.line||''); if(!lw.length) return;
    let at=-1;
    for(let a=0;a+lw.length<=sw.length && at<0;a++){ let ok=true; for(let k=0;k<lw.length;k++) if(sw[a+k]!==lw[k]){ ok=false; break; } if(ok) at=a; }
    if(at<0){
      /* find the longest run of words that DOES match the script, and report the word next to it */
      let best=0,bj=0,ba=0;
      for(let j=0;j<lw.length;j++) for(let a=0;a<sw.length;a++){ let k=0; while(j+k<lw.length && a+k<sw.length && lw[j+k]===sw[a+k]) k++; if(k>best){ best=k; bj=j; ba=a; } }
      let msg;
      if(best<2) msg='no matching words found at all (is this line from another script?)';
      else if(bj>0) msg=`story has "${lw[bj-1]}" before "${lw[bj]}", script has "${sw[ba-1]||'(start)'}"`;
      else { const e=bj+best; msg=`after "${lw[e-1]}" story has "${lw[e]||'(end)'}", script has "${sw[ba+best]||'(end of script)'}"`; }
      E(`shot ${i+1}: line is not exactly in my-script.md — ${msg}.`);
    } else for(let k=0;k<lw.length;k++) used[at+k]=true;
  });
  const miss=[]; sw.forEach((w,k)=>{ if(!used[k] && /[\u0900-\u097F]/.test(w)) miss.push(w); });
  if(miss.length>3) W(`${miss.length} Hindi words in my-script.md are not in any shot (first: ${miss.slice(0,8).join(' ')} …). Fine for headings; otherwise a line may be missing.`);
} else W('no my-script.md: cannot check that story.js keeps your exact words.');

/* 7) caption keywords actually appear */
(CFG.keywords||[]).forEach(k=>{ if(!shots.some(s=>(s.line||'').includes(k))) W(`keyword "${k}" never appears in any line.`); });

/* report */
errors.forEach(m=>console.log('✗ '+m));
warns.forEach(m=>console.log('! '+m));
if(!errors.length && !warns.length) console.log('✓ all good');
else if(!errors.length) console.log(`✓ no errors (${warns.length} warning${warns.length>1?'s':''})`);
else console.log(`\n${errors.length} error${errors.length>1?'s':''}, ${warns.length} warning${warns.length!==1?'s':''}`);
process.exit(errors.length?1:0);
