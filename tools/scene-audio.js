#!/usr/bin/env node
/* =====================================================================
   SCENE-AUDIO: the scene sound library + the music composer that uses it.
   Original, copyright-free, made from code (same instruments as tools/make-score.js).

   How it works
   - music/scene-library/library.json holds one saved sound recipe ("cue") per scene type,
     e.g. "shiva-slays-yamraj", "yamraj-arrives", "revival-blessing", plus a default per mood ("mood-sad" ...).
   - In story.js give a shot  scene:'name'  and set  music:'scenes'  for the video.
     A shot without scene:  uses the default cue of its mood.
   - A NEW scene name that is not in the library gets a recipe created from its mood and SAVED into library.json
     (so it is there for the next video, and gets committed to GitHub like everything else).
   - The same cue always sounds the same (same tune, a leitmotif), so when Shiva strikes again you hear Shiva's music again.
   - Scenes cross-fade smoothly (equal-power, 2 s) over one continuous tanpura drone: no jumps.
   - Key moments: shot  focus:{at,sound,dur,duck}  plays a DOMINANT sound (sfx.js: slay emerge arrive noose revive kaal ...)
     and the music dips smoothly to  duck  (0.3 = 30 % volume) for dur seconds, then swells back.
   - Loudness is fixed here (music RMS about -21 dBFS); render.js then tucks it under your voice (about 12 dB below speech).

   Commands:
     node tools/scene-audio.js list                 show all saved scenes
     node tools/scene-audio.js preview [name]       write a 16 s listening copy of each scene into music/scene-library/*.wav
     node tools/scene-audio.js new <name> <mood>    create + save a new scene sound (mood: calm joy hope divine sad shock anger)
   ===================================================================== */
const fs=require('fs'), path=require('path');
const MS=require('./make-score'), SFX=require('./sfx');
const {SR,TAU,hz,rng,T,MAJ,MIN,CH_MAJ,CH_MIN,padChords,melody,arp,tanpura,reverb}=MS;
const LIBFILE=path.join(__dirname,'..','music','scene-library','library.json');
const MOODS=['calm','joy','hope','divine','sad','shock','anger'];
const BLOCK_RMS=0.12;           // every scene is first brought to the same loudness, then its own level (library.json) is applied, so busy scenes can't overpower sparse ones
const LEVEL_CURVE=0.6;          // level^0.6: a softer spread between the quietest and loudest scene (voice-over needs a steady bed)
const TARGET_RMS=0.09;          // music loudness before it is tucked under the voice (about -21 dBFS)

const SCALES={MAJ,MIN};
const CHORDS={ maj:CH_MAJ, min:CH_MIN,
  divine:[[-12,0,7,12],[-12,0,7,16],[-17,-5,2,12]],
  open:[[-12,0,7,12],[-5,2,7,12]],
  fifth:[[0,7]],
  deep:[[-12,-5,0,7],[-14,-7,-2,5]] };

/* ---------- the library file ---------- */
function loadLib(){ try{ return JSON.parse(fs.readFileSync(LIBFILE,'utf8')); }catch(e){ return {_about:'Scene sound library',cues:{}}; } }
function saveLib(lib){ fs.mkdirSync(path.dirname(LIBFILE),{recursive:true}); fs.writeFileSync(LIBFILE,JSON.stringify(lib,null,2).replace(/\[\s+([-\d.,\s]+?)\s+\]/g,(m,a)=>'['+a.replace(/\s+/g,' ')+']')+'\n'); }
function hash(str){ let h=2166136261; for(const c of String(str)){ h^=c.codePointAt(0); h=Math.imul(h,16777619)>>>0; } return h>>>0; }
const moodName=m=>{ const n=typeof m==='string'?m:(m&&m.base)||'calm'; return MOODS.includes(n)?n:'calm'; };

/* ---------- make a new cue for a scene name (varies the mood's default recipe, same family of sound) ---------- */
function createCue(name,mood,line){ const lib=loadLib(), base=lib.cues['mood-'+mood]||lib.cues['mood-calm'], R=rng(hash(name)), pick=a=>a[Math.floor(R()*a.length)], jit=(v,p)=>+(v*(1+(R()-.5)*2*p)).toFixed(3);
  const c=JSON.parse(JSON.stringify(base)); c.mood=mood; c.auto=true;
  c.desc=`Auto-created for scene "${name}" (${mood})${line?': '+line.slice(0,50):''}. Edit this recipe in library.json to change it.`;
  c.level=c.level.map(v=>jit(v,.06));
  if(c.pad){ c.pad.chords=pick(mood==='sad'||mood==='anger'?['min']:mood==='shock'?['fifth','deep']:mood==='divine'?['divine','open']:['maj','open']); c.pad.seg=Math.round(jit(c.pad.seg,.2)); }
  const kinds={calm:['flute'],hope:['flute','pluck'],joy:['flute','pluck'],divine:['flute','bow'],sad:['bow','flute'],anger:['bow','flute']}[mood];
  if(c.melody&&kinds){ c.melody.kind=pick(kinds); c.melody.note=c.melody.note.map(v=>jit(v,.15)); c.melody.rest=c.melody.rest.map(v=>jit(v,.2)); }
  if(c.arp) c.arp.pattern=pick([[0,2,4,2],[0,1,2,3,4,2],[0,2,4,5,4,2,3,1],[0,4,2,5,4,2]]), c.arp.step=jit(c.arp.step,.15);
  if(c.drums) c.drums.step=jit(c.drums.step,.1);
  if(c.bells) c.bells.notes=pick([[24],[12,19],[24,12,19],[19,24]]);
  lib.cues[name]=c; saveLib(lib); return c; }

/* make sure every scene a story uses exists; returns the list of newly created names */
function ensure(items){ const lib=loadLib(), made=[];
  items.forEach(it=>{ const mood=moodName(it.mood), name=it.scene||('mood-'+mood);
    if(!lib.cues[name]){ createCue(name,mood,it.line); made.push({name,mood}); lib.cues[name]=true; } });
  return made; }
const ensureForStory=cfg=>ensure((cfg.shots||[]).map(s=>({scene:s.scene,mood:s.mood,line:s.line})));

/* ---------- play one cue between times s and e (rs = where the layers really start, so cross-fades have sound in them) ---------- */
function playCue(b,c,s,rs,e,R){
  // pads swell slowly; start the first chord early so a short scene begins at its steady volume instead of climbing about 12 dB
  if(c.pad){ const seg=c.pad.seg||8; padChords(b,rs-seg*.6+.5,e,CHORDS[c.pad.chords]||CH_MAJ,seg,c.pad.amp||.4,!!c.pad.rich,R); }
  [].concat(c.melody||[]).forEach(m=>melody(b,rs,e,R,Object.assign({},m,{scale:SCALES[m.scale]||MAJ,lead:m.lead===undefined?.5:m.lead})));
  [].concat(c.arp||[]).forEach(a=>arp(b,rs,e,R,Object.assign({},a,{scale:SCALES[a.scale]||MAJ})));
  if(c.bells){ const bl=c.bells; let k=0; for(let t=rs+(bl.start||0);t<e;t+=bl.every,k++) T.bell(b,t,hz(bl.notes[k%bl.notes.length]),bl.amp,.3+((k*.31)%.4),bl.len||4); }
  if(c.drums){ const d=c.drums; let k=0; for(let t=rs+.05;t<e;t+=d.step,k++){ const v=d.pat[k%d.pat.length]; if(v) T.drum(b,t,hz(d.f[Math.floor(k/8)%d.f.length]),d.amp*v,.5,d.len||.45); } }
  if(c.roll){ const r=c.roll; for(let t0=rs+.8;t0<e-.5;t0+=r.every){ let t=t0, gap=.16; for(let i=0;i<r.count;i++){ T.drum(b,t,hz(r.f),r.amp*(.6+.4*i/r.count),.5,.12); t+=gap; gap=Math.max(.05,gap*.88); } } }
  if(c.shaker){ const sh=c.shaker; for(let t=rs+.15,k=0;t<e;t+=sh.step,k++) if(k%2===1) T.shaker(b,t,sh.amp,.7,R); }
  if(c.hit){ if(c.hit.drum) T.drum(b,s+.02,hz(c.hit.drum.f),c.hit.drum.amp,.5,c.hit.drum.len||.9); if(c.hit.bell) T.bell(b,s+.04,hz(c.hit.bell.f),c.hit.bell.amp,.5,c.hit.bell.len||4.5); } }

/* ---------- compose the whole video's music ----------
   levels = [{start,end,mood,scene,m,focus:[{t,sound,dur,duck}]}]  (from the engine)   Returns {L,R,SR,plan} */
const smooth=u=>{ u=Math.max(0,Math.min(1,u)); return u*u*(3-2*u); };
function compose(levels,duration){
  const lib=loadLib(), total=duration+.6, n=Math.ceil(total*SR), L=new Float32Array(n), Rr=new Float32Array(n), F=1.0, plan=[];
  tanpura({L,R:Rr},total,rng(11));                                                     // continuous drone: nothing ever feels cut
  levels.forEach((sh,k)=>{ const mood=moodName(sh.mood), name=sh.scene||('mood-'+mood), cue=lib.cues[name]||lib.cues['mood-'+mood]||lib.cues['mood-calm'];
    const s=sh.start, e=Math.max(sh.end,s+.5), last=k===levels.length-1, rs=k===0?s:s-.6, re=last?e:e+.6;
    const w0=k===0?0:s-F-.1, w1=last?total:e+F+.1, bl=new Float32Array(Math.round((w1-w0)*SR)), br=new Float32Array(bl.length), b={L:bl,R:br,t0:w0};
    playCue(b,cue,s,rs,re,rng(hash(name)));
    let e2=0, c2=0; for(let i=Math.max(0,Math.round((s-w0)*SR)), z=Math.min(bl.length,Math.round((e-w0)*SR)); i<z; i++){ e2+=bl[i]*bl[i]+br[i]*br[i]; c2+=2; }
    const nrm=e2>0 ? BLOCK_RMS/Math.sqrt(e2/c2) : 1;
    const j0=Math.round(w0*SR);
    for(let i=0;i<bl.length;i++){ const t=w0+i/SR; let env=1;                           // equal-power cross-fade (no volume dip in the middle)
      if(k>0 && t<s+F) env=Math.min(env,Math.sin(Math.PI/2*Math.max(0,Math.min(1,(t-(s-F))/(2*F)))));
      if(!last && t>e-F) env=Math.min(env,Math.cos(Math.PI/2*Math.max(0,Math.min(1,(t-(e-F))/(2*F)))));
      if(last && t>e) env=Math.min(env,Math.cos(Math.PI/2*Math.min(1,(t-e)/2.5)));         // the last scene fades away with the video's natural ending
      const j=j0+i; if(j>=n) break; L[j]+=bl[i]*env*nrm; Rr[j]+=br[i]*env*nrm; }
    const g=typeof sh.m==='number'?[sh.m,sh.m]:cue.level; plan.push({start:s,end:e,mood,scene:name,auto:!!cue.auto,g0:g[0],g1:g[1],blockRms:+(e2>0?Math.sqrt(e2/c2):0).toFixed(4)}); });
  // volume of each scene (ramps g0 -> g1), smoothed so nothing jumps
  const gc=new Float32Array(n);
  for(let i=0;i<n;i++){ const t=i/SR; let g=null; for(const p of plan){ if(t>=p.start && t<p.end){ g=p.g0+(p.g1-p.g0)*((t-p.start)/(p.end-p.start)); break; } }
    if(g===null) g=t<plan[0].start?plan[0].g0:plan[plan.length-1].g1; gc[i]=Math.pow(Math.max(g,1e-3),LEVEL_CURVE); }
  const W=Math.round(SR*.9), cs=new Float64Array(n+1); for(let i=0;i<n;i++) cs[i+1]=cs[i]+gc[i];
  const dips=[]; levels.forEach(sh=>(sh.focus||[]).forEach(f=>dips.push({a:f.t-(SFX.IMPACT[f.sound]||0), len:f.dur||2.2, duck:f.duck===undefined?.3:f.duck})));
  for(let i=0;i<n;i++){ const a=Math.max(0,i-W), z=Math.min(n,i+W+1); let g=(cs[z]-cs[a])/(z-a), t=i/SR;
    for(const d of dips){ const dn=smooth((t-(d.a-.25))/.2), up=smooth((t-(d.a+d.len))/.9), depth=dn*(1-up); if(depth>0) g*=1-depth*(1-d.duck); }   // music steps back for the dominant sound, then swells back
    L[i]*=g; Rr[i]*=g; }
  [L,Rr].forEach(ch=>{ let y=0; const k=1-Math.exp(-TAU*4200/SR); for(let i=0;i<n;i++){ y+=k*(ch[i]-y); ch[i]=y; } });   // nothing shrill
  reverb(L,Rr,.10);
  let e2=0, pk=0; for(let i=0;i<n;i++){ e2+=L[i]*L[i]+Rr[i]*Rr[i]; pk=Math.max(pk,Math.abs(L[i]),Math.abs(Rr[i])); }
  const rms=Math.sqrt(e2/(2*n)), norm=Math.min(TARGET_RMS/(rms||1), .95/(pk||1));           // fixed loudness, peaks guarded
  for(let i=0;i<n;i++){ L[i]*=norm; Rr[i]*=norm; }
  return {L,R:Rr,SR,plan,rmsDb:20*Math.log10(rms*norm)}; }

function makeSceneMusic(levels,duration,file){ const sc=compose(levels,duration); MS.writeWav(file,sc); return sc; }

/* ---------- command line ---------- */
if(require.main===module){ const [cmd,a,b]=process.argv.slice(2), lib=loadLib();
  if(cmd==='new'){ if(!a||!MOODS.includes(b)){ console.log('usage: node tools/scene-audio.js new <name> <'+MOODS.join('|')+'>'); process.exit(1); }
    if(lib.cues[a]){ console.log('"'+a+'" already exists'); process.exit(0); } createCue(a,b); console.log('✚ saved new scene sound "'+a+'" ('+b+')'); }
  else if(cmd==='preview'){ const names=a?[a]:Object.keys(lib.cues); fs.mkdirSync(path.dirname(LIBFILE),{recursive:true});
    names.forEach(nm=>{ const c=lib.cues[nm]; if(!c){ console.log('no scene called '+nm); return; } const out=path.join(path.dirname(LIBFILE),nm+'.wav');
      makeSceneMusic([{start:0,end:16,mood:c.mood,scene:nm}],16,out); console.log('♫',nm.padEnd(22),c.mood.padEnd(7),c.desc.slice(0,70)); });
    console.log('\nListen in music/scene-library/'); }
  else { Object.entries(lib.cues).forEach(([nm,c])=>console.log(nm.padEnd(22),c.mood.padEnd(7),c.auto?'(auto) ':'       ',c.desc||'')); }
}
module.exports={compose,makeSceneMusic,ensure,ensureForStory,createCue,loadLib,saveLib,MOODS};
