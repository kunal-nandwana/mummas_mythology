#!/usr/bin/env node
/* =====================================================================
   MAKE-SCORE: composes ONE background-music track that follows the story scene by scene.
   Original, copyright-free, made from code (no downloads, no samples).

   Every scene gets its own music from its mood, in the same key (D) so the changes sound natural:
     calm    soft pad + gentle bansuri flute                         (quiet-medium)
     joy     light plucked pattern + soft shaker + low pulse         (medium-loud, happy)
     hope    harp that rises + flute climbing + warm pad             (grows louder through the scene)
     divine  choir-like pad + temple bells + slow harp               (full, glowing)
     sad     slow bowed strings, minor, very sparse                  (soft, fades lower)
     shock   one soft low drum + bell, then almost silence           (hit, then drops)
     anger   steady soft drum + strong bowed line, minor             (loudest, driving, NOT scary)
   A tanpura drone runs underneath the whole video so nothing ever feels cut.
   Scenes cross-fade into each other (2 s) and each scene has its own volume (mood table below,
   or `music: 0.6` on a shot in story.js).  Only consonant (pentatonic) notes: no horror sounds.

   Used by tools/render.js when story.js says  music:'score'.   Test alone:
     node tools/make-score.js [out.wav]      (makes a sample 72 s Chandra-style score)
   ===================================================================== */
const fs=require('fs'), path=require('path');
const SR=32000, TAU=Math.PI*2, ROOT_HZ=146.83;             // Sa = D3
const hz=s=>ROOT_HZ*Math.pow(2,s/12);
const MAJ=[0,2,4,7,9], MIN=[0,3,5,7,10];                    // pentatonic = every note is consonant over the drone

/* volume of each mood: [at start of scene, at end of scene] (1 = normal). Big gaps = clearly "low" and "high" scenes. */
const MOOD_GAIN={ calm:[.70,.78], joy:[.95,1.00], hope:[.80,1.12], divine:[.72,.84], sad:[.55,.38], shock:[.95,.40], anger:[1.20,1.40], neutral:[.70,.70] };

function rng(seed){ let s=(seed*2654435761)>>>0||1; return ()=>{ s^=s<<13; s>>>=0; s^=s>>>17; s^=s<<5; s>>>=0; return s/4294967296; }; }

/* ---------- instruments: each adds a tone into buffer b = {L,R,t0} (t0 = time of sample 0) ---------- */
function put(b,t,dur,pan,fn){ // fn(i,u) -> sample value for sample i since note start; dur = seconds the note may sound
  const s0=Math.round((t-b.t0)*SR), n=Math.round(dur*SR), gl=Math.cos(pan*Math.PI/2), gr=Math.sin(pan*Math.PI/2);
  for(let i=0;i<n;i++){ const k=s0+i; if(k<0) continue; if(k>=b.L.length) break; const v=fn(i,i/SR); b.L[k]+=v*gl; b.R[k]+=v*gr; } }

const T={
  pluck(b,t,f,a,pan,ring=1.1){ put(b,t,ring*3.2,pan,(i,u)=>{ const e=Math.min(1,u/.004);
    return a*e*(Math.sin(TAU*f*u)*Math.exp(-u/ring)+.32*Math.sin(TAU*2*f*u)*Math.exp(-u/(ring*.55))+.12*Math.sin(TAU*3*f*u)*Math.exp(-u/(ring*.32))); }); },
  flute(b,t,f,a,pan,dur){ put(b,t,dur*1.7,pan,(i,u)=>{ const x=u/dur, at=Math.min(1,Math.pow(u/.2,1.5)), r=x<1?1:Math.exp(-(x-1)*4); const e=at*r; if(e<.003) return 0;
    const vib=1+Math.sin(TAU*5.2*u)*.0035*Math.min(1,u/.6), p=f*vib*u;
    return a*e*(Math.sin(TAU*p)+.16*Math.sin(TAU*2*p)+.04*Math.sin(TAU*3*p)); }); },
  bow(b,t,f,a,pan,dur){ put(b,t,dur*1.5,pan,(i,u)=>{ const x=u/dur, at=Math.min(1,u/.45), r=x<1?1:Math.exp(-(x-1)*3.5); const e=at*r; if(e<.003) return 0;
    const vib=1+Math.sin(TAU*5.0*u)*.006*Math.min(1,u/.8), p=f*vib*u; let v=0; for(let h=1;h<=6;h++) v+=Math.sin(TAU*p*h+h)/(h*h*.8);
    return a*e*v; }); },
  pad(b,t,f,a,pan,dur,rich){ const at=Math.min(1.6,dur*.4); put(b,t,dur,pan,(i,u)=>{ const e=Math.sin(Math.PI*Math.min(1,u/dur)); if(e<=0) return 0; const ee=Math.min(1,u/at)*e;
    const p=f*u, vib=1+Math.sin(TAU*.25*u)*.0015; return a*ee*(Math.sin(TAU*p*vib)*.7+Math.sin(TAU*2*p*vib)*(rich?.22:.1)+(rich?.08*Math.sin(TAU*3*p*vib):0)); }); },
  bell(b,t,f,a,pan,len=4){ put(b,t,len,pan,(i,u)=>{ const e=Math.min(1,u/.003);
    return a*e*(Math.sin(TAU*f*u)*Math.exp(-u/(len*.45))+.5*Math.sin(TAU*2*f*u)*Math.exp(-u/(len*.3))+.22*Math.sin(TAU*3*f*u)*Math.exp(-u/(len*.2))+.1*Math.sin(TAU*4.2*f*u)*Math.exp(-u/(len*.12))); }); },
  drum(b,t,f,a,pan,len=.55){ put(b,t,len,pan,(i,u)=>a*Math.exp(-u*7.5)*Math.min(1,u/.002)*Math.sin(TAU*(f*u+.9*f*(1-Math.exp(-u*28))/28))); },
  shaker(b,t,a,pan,R){ let prev=0; put(b,t,.09,pan,(i,u)=>{ const x=R()-.5, y=x-prev; prev=x; return a*y*Math.exp(-u*45)*Math.min(1,u/.003); }); },
};

/* ---------- helpers that write whole musical figures for one scene ---------- */
const P=(sc,idx)=>sc[((idx%sc.length)+sc.length)%sc.length]+12*Math.floor(idx/sc.length);   // scale degree -> semitones

function padChords(b,s,e,chords,seg,a,rich,R){ let t=s-.5, k=0; while(t<e+1){ const ch=chords[k%chords.length];
  ch.forEach((semi,vi)=>T.pad(b,t,hz(semi),a/ch.length*2,.25+((vi*.37)%.5),seg*1.5,rich)); t+=seg; k++; } }

function melody(b,s,e,R,o){ const sc=o.scale; let t=s+(o.lead??.5), idx=o.start??2;
  while(t<e-.3){ const n=o.phrase[0]+Math.floor(R()*(o.phrase[1]-o.phrase[0]+1));
    for(let p=0;p<n && t<e-.3;p++){ const last=p===n-1;
      const step=Math.round((R()-.5)*2.4+(o.rise||0)); idx=last?(R()<.5?0:2):Math.max(0,Math.min(sc.length*2-1,idx+(step||1)));
      const dur=(o.note[0]+R()*(o.note[1]-o.note[0]))*(last?1.4:1), f=hz(P(sc,idx)+o.oct);
      (T[o.kind])(b,t,f,o.amp,.3+R()*.4,dur); t+=dur*(o.gap||1.08); }
    t+=o.rest[0]+R()*(o.rest[1]-o.rest[0]); } }

function arp(b,s,e,R,o){ const sc=o.scale, pat=o.pattern; let t=s+(o.lead??.2), k=0;
  while(t<e-.2){ const shift=Math.floor(k/(pat.length*2))%3===2?1:0, idx=pat[k%pat.length]+shift;
    T.pluck(b,t,hz(P(sc,idx)+o.oct),o.amp*(k%4===0?1.15:1)*(.9+R()*.2),.3+((k*.17)%.4),o.ring); t+=o.step; k++; } }

/* ---------- one recipe per mood ---------- */
const CH_MAJ=[[0,7,12,16],[-5,2,7,12],[0,7,12,16],[-3,4,9,12]];
const CH_MIN=[[0,7,12,15],[-5,2,7,10],[0,7,12,15],[-2,5,10,14]];
const RECIPE={
  calm(b,s,e,R){ padChords(b,s,e,CH_MAJ,8,.50,false,R);
    melody(b,s,e,R,{scale:MAJ,oct:12,kind:'flute',amp:.17,note:[1.6,3],rest:[1.8,4],phrase:[3,4],lead:.8}); },
  joy(b,s,e,R){ padChords(b,s,e,CH_MAJ,6,.30,false,R);
    arp(b,s,e,R,{scale:MAJ,oct:12,pattern:[0,2,4,5,4,2,3,1],step:.30,amp:.14,ring:.7});
    for(let t=s+.15,k=0;t<e;t+=.30,k++) if(k%2===1) T.shaker(b,t,.07,.7,R);
    for(let t=s,k=0;t<e;t+=1.2,k++) T.drum(b,t,hz(-12),k%2?.16:.26,.5,.4);
    melody(b,s,e,R,{scale:MAJ,oct:24,kind:'flute',amp:.09,note:[.5,1],rest:[1,2.5],phrase:[3,4],lead:1.2}); },
  hope(b,s,e,R){ padChords(b,s,e,CH_MAJ,7,.52,true,R);
    T.bell(b,s+.1,hz(24),.07,.55,3);
    arp(b,s,e,R,{scale:MAJ,oct:12,pattern:[0,1,2,3,4,5,6,7,4,5],step:.5,amp:.13,ring:1.4,lead:.4});
    melody(b,s,e,R,{scale:MAJ,oct:12,kind:'flute',amp:.20,note:[1.2,2.4],rest:[.6,1.6],phrase:[3,4],rise:.7,lead:.9}); },
  divine(b,s,e,R){ padChords(b,s,e,[[-12,0,7,12],[-12,0,7,16],[-17,-5,2,12]],9,.60,true,R);
    for(let t=s+.1,k=0;t<e;t+=3.4,k++) T.bell(b,t,hz(k%3===1?19:(k%3===2?12:24)),.12,.3+((k*.31)%.4),5);
    arp(b,s,e,R,{scale:MAJ,oct:12,pattern:[0,2,4,2,5,4],step:.9,amp:.08,ring:2.2,lead:.6}); },
  sad(b,s,e,R){ padChords(b,s,e,CH_MIN,9,.42,false,R);
    melody(b,s,e,R,{scale:MIN,oct:0,kind:'bow',amp:.075,note:[2.4,4],rest:[2,3.5],phrase:[2,3],start:4,lead:.6}); },
  shock(b,s,e,R){ T.drum(b,s+.02,hz(-24),.70,.5,.9); T.bell(b,s+.04,hz(-12),.22,.5,4.5);
    padChords(b,s,e,[[0,7]],5,.22,false,R); },
  anger(b,s,e,R){ padChords(b,s,e,CH_MIN,5,.42,false,R);
    const q=.30; let k=0; const pat=[1,0,0,.5,0,.6,0,.45];
    for(let t=s+.05;t<e;t+=q,k++){ const v=pat[k%8]; if(v) T.drum(b,t,hz(k%16<8?-17:-14),.32*v,.5,.45); }
    melody(b,s,e,R,{scale:MIN,oct:12,kind:'bow',amp:.095,note:[.55,1.1],rest:[.2,.8],phrase:[3,5],rise:.4,start:3,lead:.2,gap:1.0}); },
};
RECIPE.neutral=RECIPE.calm;

/* ---------- tanpura: the drone under everything (Pa, Sa, Sa, low Sa) ---------- */
function tanpura(b,total,R){ const str=[hz(-5)/2,hz(0),hz(0),hz(0)/2], pan=[.4,.6,.5,.45]; let t=0,k=0; const gap=1.25;
  while(t<total){ const f=str[k%4], len=Math.round(SR*5), pn=pan[k%4], gl=Math.cos(pn*Math.PI/2), gr=Math.sin(pn*Math.PI/2), s0=Math.round(t*SR);
    for(let h=1;h<=10;h++){ const fh=f*h; if(fh>3800) break; const ha=.5/h*(h>=4&&h<=7?1.25:1), dec=(2.4+h*.15)/(h>5?1.3:1), ph=h*.7;
      for(let i=0;i<len;i++){ const e=Math.exp(-i/(SR*dec))*Math.min(1,i/(SR*.012)); if(e<.003) break; const k2=s0+i; if(k2>=b.L.length) break;
        const v=ha*e*Math.sin(TAU*fh*i/SR+ph)*.5; b.L[k2]+=v*gl*2; b.R[k2]+=v*gr*2; } }
    t+=(k%4===3)?gap*4.4-gap*3.3:gap*1.1; k++; } }

/* ---------- simple stereo reverb (Schroeder combs + all-pass) ---------- */
function reverb(L,Rr,wet){ const n=L.length, sc=SR/44100, mk=sz=>({b:new Float32Array(Math.round(sz*sc)),i:0,n:Math.round(sz*sc)});
  const comb=(c,x,fb,d)=>{ const y=c.b[c.i]; c.lp=(c.lp||0)*d+y*(1-d); c.b[c.i]=x+c.lp*fb; c.i=(c.i+1)%c.n; return y; };
  const ap=(c,x)=>{ const y=c.b[c.i]; c.b[c.i]=x+y*.5; c.i=(c.i+1)%c.n; return y-x; };
  const sets=[[1557,1617,1491,1422],[1580,1640,1514,1445]], aps=[[225,556],[241,575]], outs=[new Float32Array(n),new Float32Array(n)];
  [0,1].forEach(ch=>{ const cs=sets[ch].map(mk), as=aps[ch].map(mk);
    for(let i=0;i<n;i++){ const x=(L[i]+Rr[i])*.5*.3; let y=0; cs.forEach(c=>{ y+=comb(c,x,.86,.35); }); as.forEach(a=>{ y=ap(a,y); }); outs[ch][i]=y; } });
  for(let i=0;i<n;i++){ L[i]=L[i]*(1-wet*.5)+outs[0][i]*wet*3; Rr[i]=Rr[i]*(1-wet*.5)+outs[1][i]*wet*3; } }

/* ---------- the score ---------- */
function moodOf(sh){ const m=sh.mood; return MOOD_GAIN[m]?m:'neutral'; }
function gainOf(sh){ const m=moodOf(sh); if(typeof sh.m==='number') return [sh.m,sh.m]; return MOOD_GAIN[m]; }

/* levels = [{start,end,mood,m}] (from the engine; m = optional number override), duration in seconds.
   Returns {L,R,SR, plan:[{start,end,mood,g0,g1}]} */
function composeScore(levels,duration){
  const total=duration+.6, n=Math.ceil(total*SR), L=new Float32Array(n), R=new Float32Array(n), F=1.0;   // F = half the cross-fade
  const R0=rng(11);
  // 1) the drone, whole video
  tanpura({L,R},total,R0);
  // 2) one piece of music per scene, cross-faded
  const plan=[];
  levels.forEach((sh,k)=>{ const mood=moodOf(sh), s=sh.start, e=Math.max(sh.end,s+.5), w0=(k===0?0:s-F), w1=(k===levels.length-1?total:e+F);
    const bl=new Float32Array(Math.round((w1-w0)*SR)), br=new Float32Array(bl.length), b={L:bl,R:br,t0:w0};
    RECIPE[mood](b,s,e,rng(100+k*7+mood.length),k);
    for(let i=0;i<bl.length;i++){ const t=w0+i/SR; let env=1;
      if(k>0 && t<s+F) env=Math.min(env,Math.pow(Math.sin(Math.PI/2*Math.max(0,(t-(s-F))/(2*F))),2));
      if(k<levels.length-1 && t>e-F) env=Math.min(env,Math.pow(Math.cos(Math.PI/2*Math.min(1,Math.max(0,(t-(e-F))/(2*F)))),2));
      const j=Math.round(w0*SR)+i; if(j>=n) break; L[j]+=bl[i]*env; R[j]+=br[i]*env; }
    const g=gainOf(sh); plan.push({start:s,end:e,mood,g0:g[0],g1:g[1]}); });
  // 3) volume per scene: ramps from g0 to g1 across each scene, smoothed so nothing jumps
  const gc=new Float32Array(n); let gPrev=plan.length?plan[0].g0:1;
  for(let i=0;i<n;i++){ const t=i/SR; let g=null;
    for(const p of plan){ if(t>=p.start && t<p.end){ g=p.g0+(p.g1-p.g0)*((t-p.start)/(p.end-p.start)); break; } }
    if(g===null) g=t<(plan[0]?plan[0].start:0)?plan[0].g0:plan[plan.length-1].g1; gc[i]=g; }
  const W=Math.round(SR*.9), cs=new Float64Array(n+1); for(let i=0;i<n;i++) cs[i+1]=cs[i]+gc[i];
  for(let i=0;i<n;i++){ const a=Math.max(0,i-W), z=Math.min(n,i+W+1), g=(cs[z]-cs[a])/(z-a); L[i]*=g; R[i]*=g; }
  // 4) soften anything shrill, add a little room, normalise the loudest moment to about -3 dBFS
  [L,R].forEach(ch=>{ let y=0; const k=1-Math.exp(-TAU*4200/SR); for(let i=0;i<n;i++){ y+=k*(ch[i]-y); ch[i]=y; } });
  reverb(L,R,.10);
  let pk=0; for(let i=0;i<n;i++) pk=Math.max(pk,Math.abs(L[i]),Math.abs(R[i])); const norm=.7/(pk||1);
  for(let i=0;i<n;i++){ L[i]*=norm; R[i]*=norm; }
  return {L,R,SR,plan}; }

function writeWav(file,{L,R,SR:sr}){ const n=L.length, buf=Buffer.alloc(44+n*4);
  buf.write('RIFF',0); buf.writeUInt32LE(36+n*4,4); buf.write('WAVEfmt ',8); buf.writeUInt32LE(16,16); buf.writeUInt16LE(1,20); buf.writeUInt16LE(2,22);
  buf.writeUInt32LE(sr,24); buf.writeUInt32LE(sr*4,28); buf.writeUInt16LE(4,32); buf.writeUInt16LE(16,34); buf.write('data',36); buf.writeUInt32LE(n*4,40);
  const c=v=>Math.max(-32767,Math.min(32767,Math.round(v*32767)));
  for(let i=0;i<n;i++){ buf.writeInt16LE(c(L[i]),44+i*4); buf.writeInt16LE(c(R[i]),46+i*4); }
  fs.writeFileSync(file,buf); }

/* levels from the engine: [{start,end,mood,m}] -> writes a wav, returns the plan */
function makeScore(levels,duration,file){ const sc=composeScore(levels,duration); writeWav(file,sc); return sc.plan; }

module.exports={makeScore, composeScore, writeWav, MOOD_GAIN};

if(require.main===module){
  const out=process.argv[2]||path.join(__dirname,'..','music','score-sample.wav');
  // sample timeline = the Chandra story's moods (15 scenes, about 72 s)
  const moods=['calm','joy','divine','divine','joy','calm','calm','shock','joy','sad','anger','sad','divine','hope','divine'], durs=[4.6,5.4,6.2,6.8,5.8,4.2,6.6,3.0,4.4,4.6,6.4,4.4,4.6,6.4,7.4];
  let t=0; const lv=moods.map((m,i)=>{ const o={start:t,end:t+durs[i],mood:m}; t+=durs[i]; return o; });
  fs.mkdirSync(path.dirname(out),{recursive:true}); const t0=Date.now(); const plan=makeScore(lv,t,out);
  console.log(`♫ score made in ${((Date.now()-t0)/1000).toFixed(1)}s → ${out}`); plan.forEach((p,i)=>console.log(`  scene ${i+1}: ${p.start.toFixed(1)}-${p.end.toFixed(1)}s  ${p.mood}  volume ${p.g0}→${p.g1}`)); }
