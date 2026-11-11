#!/usr/bin/env node
/* =====================================================================
   BUILD: node tools/build.js <topic-folder>
   Reads <topic>/story.js and writes:
     <topic>/index.html  standalone video page (engine + Hindi fonts inlined, works offline)
     <topic>/script.md   recording script: every shot's Hindi line with start time & length
   ===================================================================== */
const fs=require('fs'), path=require('path'), vm=require('vm');
const ROOT=path.join(__dirname,'..'), ENG=path.join(ROOT,'engine');
const topic=(process.argv[2]||'').replace(/\/$/,'');
if(!topic){ console.error('usage: node tools/build.js <topic-folder>'); process.exit(1); }
const dir=path.join(ROOT,topic), storyPath=path.join(dir,'story.js');
if(!fs.existsSync(storyPath)){ console.error('missing '+storyPath); process.exit(1); }
const read=f=>fs.readFileSync(f,'utf8');
const story=read(storyPath);

/* 1) timing + script.md (runs the story in a sandbox with stub drawing helpers) */
const ctx={ console, module:undefined };
vm.createContext(ctx);
vm.runInContext(read(path.join(ENG,'timing.js'))+'\n'+read(path.join(ENG,'characters.js')), ctx);
let CFG=null; ctx.VIDEO=c=>{ CFG=c; };
vm.runInContext(story, ctx);
if(!CFG){ console.error('story.js must call VIDEO({...})'); process.exit(1); }
const plan=ctx.planTiming(CFG);
const fmt=s=>Math.floor(s/60)+':'+(s%60).toFixed(1).padStart(4,'0');
let md=`# ${CFG.title||topic} — Recording script\n\n`+
  `Total length: **${fmt(plan.duration)}** · ${plan.shots.length} shots · format: ${CFG.format||'short'}\n\n`+
  `How to record: open \`index.html?prompter=1\` in Chrome, start your recorder, press **Start**, and read each line as it appears. `+
  `Pause briefly at each "|". If a line feels rushed, tell Kiro the shot number and the extra seconds you need.\n\n`+
  `| # | Start | Length | Line (Hindi) |\n|---|---|---|---|\n`;
plan.shots.forEach((s,i)=>{ md+=`| ${i+1} | ${fmt(s.start)} | ${s.dur.toFixed(1)}s | ${s.line?s.line.replace(/\|/g,'/'):'(opening montage: no narration)'} |\n`; });
md+=`\n## Full narration (one block)\n\n`+plan.shots.map(s=>s.line).filter(Boolean).join(' |\n')+'\n';
fs.writeFileSync(path.join(dir,'script.md'), md);

/* 2) standalone index.html */
const font=(fam,file,w)=>`@font-face{font-family:'${fam}';font-weight:${w};font-display:block;src:url(data:font/ttf;base64,${fs.readFileSync(path.join(ENG,'fonts',file)).toString('base64')}) format('truetype')}`;
const fonts=[font('Mukta','Mukta-Medium.ttf',500),font('Mukta','Mukta-Bold.ttf',700),font('Mukta','Mukta-ExtraBold.ttf',800),font('Tiro','TiroDevanagariHindi-Regular.ttf',400)].join('\n');
const js=['timing.js','scenes.js','rig.js','characters.js','core.js'].map(f=>`/* ---- engine/${f} ---- */\n`+read(path.join(ENG,f))).join('\n');
const html=`<!DOCTYPE html>
<html lang="hi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${(CFG.title||topic).replace(/</g,'')}</title>
<!-- Built by tools/build.js from ${topic}/story.js. Edit story.js, not this file. Fonts: Mukta & Tiro Devanagari Hindi (SIL OFL 1.1). -->
<style>
${fonts}
${read(path.join(ENG,'engine.css'))}
</style></head><body>
<script>
(function(){
${js}
/* ---- ${topic}/story.js ---- */
${story}
})();
</script>
</body></html>
`;
fs.writeFileSync(path.join(dir,'index.html'), html);
console.log(`built ${topic}/index.html (${(html.length/1e6).toFixed(2)} MB) and script.md — ${plan.shots.length} shots, ${plan.duration.toFixed(1)}s`);
