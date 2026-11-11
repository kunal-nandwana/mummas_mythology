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

const SYN={
  whoosh:()=>sweep(0.75,350,3200,u=>Math.pow(Math.sin(Math.PI*Math.pow(u,0.8)),1.6),11,0.3),
  riser:()=>sweep(1.3,250,5200,u=>Math.pow(u,2.2)*(u>.97?(1-u)/.03:1),12,0.4),
  boom:()=>{ const n=N(2.0), o=new Float32Array(n), R=rng(13); let ph=0, lp=0;
    for(let i=0;i<n;i++){ const t=i/SR, f=36+60*Math.exp(-t*6); ph+=TAU*f/SR; lp+=0.04*((R()*2-1)-lp);
      o[i]=Math.tanh(1.6*Math.sin(ph)*Math.exp(-t*2.6)+lp*6*Math.exp(-t*9))*Math.min(1,t/0.004); } return o; },
  hit:()=>{ const n=N(0.55), o=new Float32Array(n), R=rng(14); let ph=0;
    for(let i=0;i<n;i++){ const t=i/SR, f=52+110*Math.exp(-t*28); ph+=TAU*f/SR; o[i]=Math.tanh(1.8*Math.sin(ph)*Math.exp(-t*8)+(R()*2-1)*0.5*Math.exp(-t*60)); } return o; },
  gong:()=>{ const n=N(5), o=new Float32Array(n), P=[[1,1],[1.51,.7],[2.03,.55],[2.52,.4],[3.4,.3],[4.37,.2],[5.9,.12]], base=112;
    P.forEach(([r,a],k)=>{ const f=base*r, dec=2.6/(1+k*0.45); for(let i=0;i<n;i++){ const t=i/SR, e=Math.exp(-t/dec)*Math.min(1,t/0.012);
      o[i]+=a*e*(Math.sin(TAU*f*t)+0.5*Math.sin(TAU*(f+0.7+k*.3)*t)); } }); return o; },
  bell:()=>{ const n=N(3.4), o=new Float32Array(n), P=[[1,1],[2,.5],[2.76,.6],[5.4,.25],[8.93,.12]], base=698;
    P.forEach(([r,a],k)=>{ const f=base*r, dec=2.0/(1+k*0.6); for(let i=0;i<n;i++){ const t=i/SR; o[i]+=a*Math.exp(-t/dec)*Math.min(1,t/0.003)*Math.sin(TAU*f*t); } }); return o; },
  shimmer:()=>{ const n=N(1.6), o=new Float32Array(n), R=rng(15);
    for(let k=0;k<16;k++){ const t0=R()*0.9, f=3200+R()*3800, a=.35+R()*.65, len=N(.35); for(let i=0;i<len;i++){ const t=i/SR, j=N(t0)+i; if(j>=n) break;
      o[j]+=a*Math.exp(-t*9)*Math.sin(TAU*f*t)*Math.min(1,t/0.002); } }
    const sw=sweep(1.6,2000,7000,u=>Math.sin(Math.PI*u)*0.25,16,0.2); for(let i=0;i<n;i++) o[i]+=sw[i]; return o; },
  tick:()=>{ const n=N(0.16), o=new Float32Array(n), R=rng(17);
    for(let i=0;i<n;i++){ const t=i/SR; o[i]=(Math.sin(TAU*1900*t)*0.8+(R()*2-1)*0.6)*Math.exp(-t*55); } return o; },
};
const GAIN={whoosh:.55,riser:.5,boom:.95,hit:.8,gong:.6,bell:.45,shimmer:.5,tick:.4};
const cache={};
function sound(name){ if(!cache[name]){ const s=SYN[name](); let pk=0; for(const v of s) pk=Math.max(pk,Math.abs(v)); const g=(GAIN[name]||.5)/(pk||1); cache[name]=s.map(v=>v*g); } return cache[name]; }

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
module.exports={renderSfx,writeWav,names:Object.keys(SYN),SR};
