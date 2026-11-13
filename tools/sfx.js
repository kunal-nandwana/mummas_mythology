/* =====================================================================
   SFX: original sound effects, synthesised from scratch (no samples, no copyright).
   names: whoosh boom hit gong bell shimmer tick riser
   renderSfx(events, seconds) -> stereo track; writeWav(file, track). Used by render.js.
   Try:  node tools/sfx.js            (writes music/sfx-preview/*.wav so you can listen to each one)
   ===================================================================== */
const fs=require('fs'), path=require('path');
const SR=44100, TAU=Math.PI*2;
function rng(seed){ let s=seed>>>0||1; return ()=>{ s^=s<<13; s>>>=0; s^=s>>>17; s^=s<<5; s>>>=0; return s/4294967296; }; }
const N=d=>Math.floor(d*SR);

// state-variable band-pass noise sweep
function sweep(d,f0,f1,shape,seed,damp){ const n=N(d), o=new Float32Array(n), R=rng(seed); let low=0,band=0;
  for(let i=0;i<n;i++){ const u=i/n, fc=f0*Math.pow(f1/f0,u), f=2*Math.sin(Math.PI*fc/SR), x=R()*2-1;
    low+=f*band; const high=x-low-(damp||0.35)*band; band+=f*high; o[i]=band*shape(u); } return o; }


// soft round tones for the scene-change beeps: [[hz, startSec], ...], total length d
function tones(list,d){ const n=N(d), o=new Float32Array(n);
  list.forEach(([f,t0])=>{ for(let i=N(t0);i<n;i++){ const t=(i-N(t0))/SR; o[i]+=Math.min(1,t/0.006)*(Math.sin(TAU*f*t)*Math.exp(-t/0.13)+0.16*Math.sin(TAU*2*f*t)*Math.exp(-t/0.05)); } });
  return o; }
// low drum thump: sine that falls from f0 to f1 Hz, decay time dec, strength a
function thump(o,t0,f0,f1,dec,a){ let ph=0; for(let i=N(t0);i<o.length;i++){ const t=(i-N(t0))/SR; if(t>dec*6) break; const f=f1+(f0-f1)*Math.exp(-t*22); ph+=TAU*f/SR; o[i]+=a*Math.exp(-t/dec)*Math.min(1,t/0.004)*Math.sin(ph); } }
// small hand-drum tap (damaru): short pitched knock
function tap(o,t0,f,dec,a){ let ph=0; for(let i=N(t0);i<o.length;i++){ const t=(i-N(t0))/SR; if(t>dec*6) break; ph+=TAU*(f*(1+0.6*Math.exp(-t*40)))/SR; o[i]+=a*Math.exp(-t/dec*3)*Math.min(1,t/0.002)*Math.sin(ph); } }

const SYN={
  whoosh:()=>sweep(1.1,300,1800,u=>Math.pow(Math.sin(Math.PI*u),2.2),11,0.9),   // soft airy swish, no harsh edge
  riser:()=>sweep(1.3,250,5200,u=>Math.pow(u,2.2)*(u>.97?(1-u)/.03:1),12,0.4),
  boom:()=>{ const n=N(2.0), o=new Float32Array(n), R=rng(13); let ph=0, lp=0;
    for(let i=0;i<n;i++){ const t=i/SR, f=36+60*Math.exp(-t*6); ph+=TAU*f/SR; lp+=0.04*((R()*2-1)-lp);
      o[i]=Math.tanh(1.2*Math.sin(ph)*Math.exp(-t*3.2)+lp*2*Math.exp(-t*12))*Math.min(1,t/0.03); } return o; },   // soft low thump
  hit:()=>{ const n=N(0.55), o=new Float32Array(n), R=rng(14); let ph=0;
    for(let i=0;i<n;i++){ const t=i/SR, f=52+110*Math.exp(-t*28); ph+=TAU*f/SR; o[i]=Math.tanh(1.8*Math.sin(ph)*Math.exp(-t*8)+(R()*2-1)*0.5*Math.exp(-t*60)); } return o; },
  gong:()=>{ const n=N(5), o=new Float32Array(n), P=[[1,1],[1.51,.7],[2.03,.55],[2.52,.4],[3.4,.3],[4.37,.2],[5.9,.12]], base=112;
    P.forEach(([r,a],k)=>{ const f=base*r, dec=2.6/(1+k*0.45); for(let i=0;i<n;i++){ const t=i/SR, e=Math.exp(-t/dec)*Math.min(1,t/0.012);
      o[i]+=a*e*(Math.sin(TAU*f*t)+0.5*Math.sin(TAU*(f+0.7+k*.3)*t)); } }); return o; },
  bell:()=>{ const n=N(3.4), o=new Float32Array(n), P=[[1,1],[2,.5],[2.76,.6],[5.4,.25],[8.93,.12]], base=523;
    P.forEach(([r,a],k)=>{ const f=base*r, dec=2.0/(1+k*0.6); for(let i=0;i<n;i++){ const t=i/SR; o[i]+=a*Math.exp(-t/dec)*Math.min(1,t/0.003)*Math.sin(TAU*f*t); } }); return o; },
  shimmer:()=>{ const n=N(1.6), o=new Float32Array(n), R=rng(15);
    for(let k=0;k<16;k++){ const t0=R()*0.9, f=3200+R()*3800, a=.35+R()*.65, len=N(.35); for(let i=0;i<len;i++){ const t=i/SR, j=N(t0)+i; if(j>=n) break;
      o[j]+=a*Math.exp(-t*9)*Math.sin(TAU*f*t)*Math.min(1,t/0.002); } }
    const sw=sweep(1.6,2000,7000,u=>Math.sin(Math.PI*u)*0.25,16,0.2); for(let i=0;i<n;i++) o[i]+=sw[i]; return o; },

  /* ---- scene-change beeps: simple, soft, round tones (no whoosh). beep = one note, beepUp = rising pair, beepDown = falling pair ---- */
  beep:()=>tones([[784,0]],0.42),
  beepUp:()=>tones([[587.3,0],[880,0.15]],0.55),
  beepDown:()=>tones([[880,0],[587.3,0.15]],0.55),
  /* ---- dominant sounds for key moments (story.js  focus:{at,sound,dur,duck}) ---- */
  slay:()=>{ const n=N(3.2), o=new Float32Array(n), R=rng(21);                       // trishul strike: deep thump + metal ring + low tail
    thump(o,0,95,34,0.30,1.0); thump(o,0.02,60,30,0.9,0.7);
    for(let i=0;i<N(0.05);i++) o[i]+=(R()*2-1)*0.5*Math.exp(-i/SR*70);
    [[1,.5],[2.32,.35],[3.76,.2],[5.4,.12]].forEach(([r,a],k)=>{ const f=420*r, dec=1.5/(1+k*.5); for(let i=0;i<n;i++){ const t=i/SR; o[i]+=a*0.5*Math.exp(-t/dec)*Math.min(1,t/0.004)*Math.sin(TAU*f*t); } });
    for(let i=0;i<n;i++){ const t=i/SR; o[i]+=0.35*Math.exp(-t/1.5)*Math.sin(TAU*46*t); } return o; },
  emerge:()=>{ const n=N(2.6), o=new Float32Array(n);                              // damaru roll that speeds up, then one deep hit at IMPACT.emerge
    let t=0, gap=0.17, k=0; while(t<1.0){ tap(o,t,k%2?210:260,0.12,(0.25+0.5*t)); t+=gap; gap=Math.max(0.045,gap*0.86); k++; }
    thump(o,1.0,85,32,0.34,1.0); thump(o,1.02,55,28,0.9,0.6);
    for(let i=0;i<n;i++){ const tt=i/SR-1.0; if(tt>0) o[i]+=0.3*Math.exp(-tt/1.2)*Math.sin(TAU*52*tt); } return o; },
  arrive:()=>{ const n=N(3.0), o=new Float32Array(n);                              // death-god arrives: two slow heavy beats + a low bell
    thump(o,0,70,30,0.5,1.0); thump(o,0.62,64,28,0.6,0.85);
    [[1,.6],[2.4,.3],[3.9,.15]].forEach(([r,a],k)=>{ const f=147*r; for(let i=N(0.62);i<n;i++){ const t=(i-N(0.62))/SR; o[i]+=a*0.35*Math.exp(-t/(2.0/(1+k*.5)))*Math.sin(TAU*f*t); } }); return o; },
  noose:()=>{ const n=N(1.6), o=new Float32Array(n), R=rng(22);                      // kaal-pash thrown: dull thud + short rope snap + small metal ting
    thump(o,0,80,36,0.22,1.0);
    for(let i=0;i<N(0.03);i++) o[i]+=(R()*2-1)*0.45*Math.exp(-i/SR*110);
    for(let i=0;i<n;i++){ const t=i/SR; o[i]+=0.3*Math.exp(-t/0.5)*Math.sin(TAU*660*t)*Math.min(1,t/0.003); } return o; },
  revive:()=>{ const n=N(4.2), o=new Float32Array(n);                               // blessing: rising bell notes over a warm swelling pad
    [293.7,440,587.3,740,880].forEach((f,k)=>{ const t0=0.05+k*0.24; for(let i=N(t0);i<n;i++){ const t=(i-N(t0))/SR; o[i]+=0.5*Math.exp(-t/1.5)*Math.min(1,t/0.004)*(Math.sin(TAU*f*t)+0.3*Math.sin(TAU*2*f*t)); } });
    [146.8,220,293.7].forEach(f=>{ for(let i=0;i<n;i++){ const t=i/SR, e=Math.pow(Math.sin(Math.PI*Math.min(1,t/3.8)),1.5); o[i]+=0.22*e*Math.sin(TAU*f*t); } }); return o; },
  kaal:()=>{ const n=N(5.5), o=new Float32Array(n);                                 // Kaalaantak revealed: very deep gong + sub swell
    [[1,1],[1.51,.6],[2.03,.45],[2.52,.3],[3.4,.2]].forEach(([r,a],k)=>{ const f=73*r, dec=3.4/(1+k*.4); for(let i=0;i<n;i++){ const t=i/SR; o[i]+=a*Math.exp(-t/dec)*Math.min(1,t/0.02)*(Math.sin(TAU*f*t)+0.4*Math.sin(TAU*(f+0.6)*t)); } });
    for(let i=0;i<n;i++){ const t=i/SR; o[i]+=0.5*Math.exp(-t/2.4)*Math.min(1,t/0.05)*Math.sin(TAU*36.7*t); } return o; },
  tick:()=>{ const n=N(0.16), o=new Float32Array(n), R=rng(17);
    for(let i=0;i<n;i++){ const t=i/SR; o[i]=(Math.sin(TAU*1900*t)*0.8+(R()*2-1)*0.6)*Math.exp(-t*55); } return o; },
};
const GAIN={whoosh:.4,riser:.35,boom:.6,hit:.5,gong:.4,bell:.3,shimmer:.3,tick:.25, beep:.55,beepUp:.55,beepDown:.55, slay:.85,emerge:.85,arrive:.8,noose:.7,revive:.7,kaal:.85};
// seconds into a sound where its main hit lands: render.js starts the sound earlier so the hit lands exactly on the picture
const IMPACT={emerge:1.0};
const LP={beep:4500,beepUp:4500,beepDown:4500,slay:3000,emerge:2500,arrive:1800,noose:3000,revive:4000,kaal:1500, whoosh:2200,riser:3000,boom:400,hit:500,gong:2500,bell:3500,shimmer:5000,tick:3500};   // gentle low-pass: nothing sharp or shrill
function lowpass(a,fc){ const k=1-Math.exp(-TAU*fc/SR); const o=new Float32Array(a.length); let y=0,y2=0; for(let i=0;i<a.length;i++){ y+=k*(a[i]-y); y2+=k*(y-y2); o[i]=y2; } return o; }
const cache={};
function sound(name){ if(!cache[name]){ const s=lowpass(SYN[name](),LP[name]||3000); let pk=0; for(const v of s) pk=Math.max(pk,Math.abs(v)); const g=(GAIN[name]||.5)/(pk||1); const fi=N(0.02), o=s.map(v=>v*g); for(let i=0;i<fi&&i<o.length;i++) o[i]*=i/fi; const fo=N(0.05); for(let i=0;i<fo&&i<o.length;i++) o[o.length-1-i]*=i/fo; cache[name]=o; } return cache[name]; }

function renderSfx(events,seconds){ const n=N(seconds), L=new Float32Array(n), R=new Float32Array(n); let k=0;
  events.forEach(ev=>{ if(!SYN[ev.name]) return; const s=sound(ev.name), v=ev.vol===undefined?1:ev.vol, i0=N(ev.t);
    const pan = ev.name==='whoosh' ? ((k++%2)?.7:.3) : ev.name==='shimmer' ? .5 : .5; // whooshes alternate slightly left/right
    for(let i=0;i<s.length && i0+i<n;i++){ L[i0+i]+=s[i]*v*(1-pan)*1.4; R[i0+i]+=s[i]*v*pan*1.4; } });
  return {L,R,n}; }

function writeWav(file,{L,R,n}){ const buf=Buffer.alloc(44+n*4); buf.write('RIFF',0); buf.writeUInt32LE(36+n*4,4); buf.write('WAVEfmt ',8); buf.writeUInt32LE(16,16); buf.writeUInt16LE(1,20); buf.writeUInt16LE(2,22);
  buf.writeUInt32LE(SR,24); buf.writeUInt32LE(SR*4,28); buf.writeUInt16LE(4,32); buf.writeUInt16LE(16,34); buf.write('data',36); buf.writeUInt32LE(n*4,40);
  const q=v=>Math.max(-32767,Math.min(32767,Math.round(Math.tanh(v)*32767)));
  for(let i=0;i<n;i++){ buf.writeInt16LE(q(L[i]),44+i*4); buf.writeInt16LE(q(R[i]),46+i*4); }
  fs.writeFileSync(file,buf); }

if(require.main===module){ const dir=path.join(__dirname,'..','music','sfx-preview'); fs.mkdirSync(dir,{recursive:true});
  Object.keys(SYN).forEach(nm=>{ const t=renderSfx([{t:0.1,name:nm}],sound(nm).length/SR+0.3); writeWav(path.join(dir,nm+'.wav'),t); console.log('♫',nm); });
  console.log('Listen to them in music/sfx-preview/'); }
module.exports={renderSfx,writeWav,names:Object.keys(SYN),SR,IMPACT};
