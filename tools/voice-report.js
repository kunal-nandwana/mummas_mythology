#!/usr/bin/env node
/* =====================================================================
   VOICE REPORT: measures your recording (pauses, pace, loudness) and shows how the shots line up with it.
   Writes <topic>/voice-report.md. Nothing is changed in your audio.
     node tools/voice-report.js <topic-folder> [--voice file]
   It also runs automatically every time you make a video with your voice (render.js / make-video.command).
   Paste the report into the Kiro chat if something doesn't line up: it lets Kiro "see" your timing.
   ===================================================================== */
const fs=require('fs'), path=require('path'), vm=require('vm'), {spawnSync}=require('child_process');
const VS=require('./voicesync');
const ROOT=path.join(__dirname,'..'), ENG=path.join(ROOT,'engine');

/* the planned timing, computed exactly like the video page does (no browser needed) */
function loadPlan(topic){
  const read=f=>fs.readFileSync(f,'utf8'), ctx={console, module:undefined}; vm.createContext(ctx);
  vm.runInContext(read(path.join(ENG,'timing.js'))+'\n'+read(path.join(ENG,'characters.js')), ctx);
  let cfg=null; ctx.VIDEO=c=>{ cfg=c; };
  vm.runInContext(read(path.join(ROOT,topic,'story.js')), ctx);
  return {cfg, plan:ctx.planTiming(cfg)}; }

/* find the voice recording: --voice, else voice.* / any audio file in the topic folder, else in the repo root */
function findVoice(topic,given){
  const DIR=path.join(ROOT,topic);
  if(given && given!==true) return path.isAbsolute(given)?given:(fs.existsSync(given)?path.resolve(given):path.join(DIR,given));
  for(const d of [DIR, ROOT]){ const f=fs.readdirSync(d).filter(n=>VS.AUDIO_EXT.test(n) && n!==topic+'.mp4' && !/^\./.test(n) && !/-v\d+\.wav$/.test(n))
      .sort((a,b)=>(/^voice/i.test(b)?1:0)-(/^voice/i.test(a)?1:0)); if(f.length) return path.join(d,f[0]); }
  return null; }

/* how long each narration shot should take in the voice, in seconds at the plan pace (the sync fit shares the real recording out by these).
   Normal lines: by the number of letters. Chanted verses (shot.calli, or a line containing ॥) are spoken much slower than
   narration, so they count CHANT times more, and never less than a fixed `dur:` given in story.js. Without this the verse shot was
   given too little time and the next scene came in while the owner was still chanting. Per shot override: `chant:2` (or chant:1 = normal). */
const CHANT=1.7;
function textWeights(cfg,nar){
  const strip=w=>w.replace(/[.,!?'"‘’“”—\-–…:;।॥()]/g,'');
  return nar.map(s=>{ const sh=cfg.shots[s.i]||{}, w=s.words.reduce((a,x)=>a+strip(x.text).length+2,0)/(cfg.pace||13);
    const verse=!!sh.calli || /॥/.test(sh.line||'');
    const k=sh.chant!==undefined ? sh.chant : (verse ? (cfg.chant||CHANT) : 1);
    return k===1 ? w : Math.max(w*k, sh.dur||0); }); }

/* probe + sync plan for a topic and a voice file */
function analyse(topic,voice){
  const {cfg,plan}=loadPlan(topic), open=cfg.opening||0, nar=plan.shots.slice(open);
  const info=VS.probe(voice, nar.length); if(!info.ok) return {ok:false, error:info.error, cfg, plan};
  // shot.rec:'0:31.8' in story.js pins that shot to a time in the recording (fix for a shot the automatic fit got wrong)
  const toSec=v=>{ if(v===undefined||v===null) return null; if(typeof v==='number') return v; const p=String(v).split(':').map(Number); return p.length===2?p[0]*60+p[1]:p[0]; };
  const forced=nar.map(s=>toSec(cfg.shots[s.i].rec));
  const weights=textWeights(cfg,nar);
  const words=nar.map(s=>s.words.map(w=>w.text));
  const sync=VS.planSync({silences:info.silences,total:info.total,nar:nar.map(s=>s.dur),forced,weights,words});
  return {ok:true, cfg, plan, nar, info, sync, voice}; }

const mmss=s=>{ s=Math.round(Math.max(0,s)*10)/10; return Math.floor(s/60)+':'+(s%60).toFixed(1).padStart(4,'0'); };
function writeReport(topic,A,extra){
  const {cfg,nar,info,sync,voice}=A, out=path.join(ROOT,topic,'voice-report.md');
  const plannedT=nar.reduce((a,s)=>a+s.dur,0), words=nar.reduce((a,s)=>a+s.words.length,0);
  let md=`# Voice report: ${cfg.title||topic}\n\nPaste this whole file into the Kiro chat if the voice and the pictures don't line up.\n\n`;
  md+=`## Your recording\n\n| | |\n|---|---|\n| File | \`${path.basename(voice)}\` |\n| Length | ${mmss(info.total)} |\n`;
  md+=`| Loudness | average ${isFinite(info.mean)?info.mean.toFixed(1):'?'} dB, peak ${isFinite(info.peak)?info.peak.toFixed(1):'?'} dB |\n`;
  md+=`| Pause detection | quieter than ${info.threshold} dB for 0.2 s+ (chosen automatically for your room) |\n`;
  if(sync){ const sp=sync.end-sync.start;
    md+=`| Speech starts / ends | ${mmss(sync.start)} / ${mmss(sync.end)} |\n| You speak for | ${sp.toFixed(1)} s (the script plan was ${plannedT.toFixed(1)} s, so you are ${sp>plannedT?((sp/plannedT-1)*100).toFixed(0)+'% slower':((1-sp/plannedT)*100).toFixed(0)+'% faster'}) |\n`;
    md+=`| Pace | about ${Math.round(words/(sp/60))} words a minute |\n| Pauses found | ${sync.pauses.length} |\n| Shot changes on your pauses | ${sync.snapped} of ${nar.length-1} |\n`; }
  if(extra) md+=extra;
  md+='\n';
  const warn=[];
  if(isFinite(info.peak) && info.peak>-0.5) warn.push('The recording touches 0 dB (clipping). Keep the phone a little further away or lower the input level.');
  if(isFinite(info.mean) && info.mean<-38) warn.push('The recording is very quiet. Clip the Boya M1 about 15-20 cm below your mouth.');
  if(!sync) warn.push('No clear speech was found, so the planned pace was used.');
  else if(sync.mode==='sentences'){
    if(sync.steadiness>0.35) warn.push(`Your pace changes a lot in places (up to ${Math.round((Math.exp(sync.steadiness)-1)*100)}% from your average), so a few "by sentence pace" cuts may be up to a second off. Watch those shots; if one is wrong, say e.g. "shot 7 should start at 0:31.8".`); }
  else if(sync.snapped < (nar.length-1)*0.6) warn.push('Only a few shot changes landed on a real pause. Leave a short pause (about half a second) at the end of every line.');
  if(warn.length) md+='## Things to check\n\n'+warn.map(w=>'- '+w).join('\n')+'\n\n';
  if(sync){
    md+=`## Shots against your voice\n\n"Starts at" is the time in YOUR recording. "How": *at your pause* = the cut sits on your pause after that line; *by sentence pace* = no pause there, so the cut is placed from your steady pace between the nearest pauses that match sentence ends in the script (breaths inside a sentence are ignored).${sync.mode==='sentences'?` Pace steadiness: ${sync.steadiness<=0.2?'very steady':sync.steadiness<=0.35?'steady':'uneven'} (largest change ${Math.round((Math.exp(sync.steadiness)-1)*100)}%).`:''}\n\n| Shot | Starts at | Your length | Plan | How | Line begins |\n|---|---|---|---|---|---|\n`;
    nar.forEach((s,i)=>{ const st=i===0?sync.start:sync.cuts[i]; md+=`| ${i+1+(cfg.opening||0)} | ${mmss(st)} | ${sync.durs[i].toFixed(1)} s | ${s.dur.toFixed(1)} s | ${i===0?'speech start':sync.report[i-1].how} | ${s.line.split(/\s+/).slice(0,5).join(' ')}… |\n`; });
    md+=`\nIf one shot starts at the wrong moment, tell Kiro e.g. "shot 7 should start at 0:31.8" (Kiro adds \`rec:'0:31.8'\` to that shot).\n\n## Your pauses\n\n${sync.pauses.slice(0,120).map(p=>`${mmss(p.s)} (${p.len.toFixed(2)} s)`).join(' · ')||'none'}\n`; }
  fs.writeFileSync(out,md); return out; }

module.exports={loadPlan, findVoice, analyse, writeReport, textWeights};

if(require.main===module){
  const args=process.argv.slice(2), topic=(args.find(a=>!a.startsWith('--'))||'').replace(/\/$/,'');
  const vi=args.indexOf('--voice'), given=vi>=0?args[vi+1]:null;
  if(!topic || !fs.existsSync(path.join(ROOT,topic,'story.js'))){ console.log('Usage: node tools/voice-report.js <topic-folder> [--voice file]'); process.exit(1); }
  if(spawnSync('ffmpeg',['-version']).status!==0){ console.error('✗ ffmpeg is not installed. Run setup-mac.command first.'); process.exit(1); }
  const voice=findVoice(topic,given);
  if(!voice || !fs.existsSync(voice)){ console.error(`✗ No voice recording found. Put it in ${topic}/ as voice.m4a (m4a, mp3, wav, qta all work).`); process.exit(1); }
  const A=analyse(topic,voice);
  if(!A.ok){ console.error(`✗ ffmpeg cannot read ${path.basename(voice)} (${A.error}). Export it from your recorder as .m4a or .wav.`); process.exit(1); }
  const f=writeReport(topic,A); console.log('✓ wrote '+path.relative(ROOT,f));
}
