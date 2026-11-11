#!/usr/bin/env node
/* =====================================================================
   MAKE-MUSIC: creates original, copyright-free background music (no downloads, no samples).
   Indian-flavoured ambient: tanpura drone + warm pad + a soft bansuri-style flute + light reverb.
   Each track is a seamless 2-minute loop; render.js loops it under your voice.

   Usage:  node tools/make-music.js            (makes any missing track in music/)
           node tools/make-music.js calm 7     (re-make one track; the number = a different tune)
   Tracks: calm    peaceful, devotional (most stories)
           dark    low, tense, with a slow heartbeat (war, curse, sad moments)
           bright  warm, hopeful, a little faster (victory, blessing, happy ending)
   ===================================================================== */
const fs=require('fs'), path=require('path');
const SR=44100, SECS=120, N=SR*SECS, TAU=Math.PI*2;
const OUT=path.join(__dirname,'..','music');

const hz=(root,semi)=>root*Math.pow(2,semi/12);
const TRACKS={
  // root = Sa in Hz, scale = semitones above Sa, chords = [semitones...] cycled, tempo = melody speed
  calm:  {root:146.83, scale:[0,2,4,7,9,12,14,16,19], chords:[[0,7,12,16],[-5,2,7,11],[-3,4,9,12],[0,7,12,14]], pad:.50, melody:.34, beat:0, pluckGap:1.15, rest:.45, oct:1, vib:5.2, seed:1},
  dark:  {root:130.81, scale:[0,1,3,5,7,8,12,13,15],  chords:[[0,7,12,15],[-4,3,8,12],[-2,5,10,13],[0,7,12,13]], pad:.55, melody:.20, beat:1, pluckGap:1.5,  rest:.65, oct:.5, vib:4.4, seed:2},
  bright:{root:164.81, scale:[0,2,4,7,9,12,14,16,19], chords:[[0,7,12,16],[-3,4,9,12],[-8,-1,4,8],[-5,2,7,11]], pad:.45, melody:.40, beat:0, pluckGap:.95, rest:.30, oct:1, vib:5.6, seed:3},
};

function rng(seed){ let s=(seed*2654435761)>>>0||1; return ()=>{ s^=s<<13; s>>>=0; s^=s>>>17; s^=s<<5; s>>>=0; return s/4294967296; }; }

/* add value v at sample i, wrapping around the loop so the end flows into the start */
const wrapAdd=(buf,i,v)=>{ buf[((i%N)+N)%N]+=v; };

function tanpura(root,gap,R){ // 4 strings: Pa(low) Sa Sa Sa(low), plucked in turn, each ring decays slowly
  const L=new Float32Array(N), Rr=new Float32Array(N), str=[hz(root,-5)/2, root, root, root/2];
  const cyc=gap*4.4; let t=0, k=0;
  while(t<SECS){ const f=str[k%4], pan=[.4,.6,.5,.45][k%4], start=Math.floor(t*SR), len=Math.floor(SR*6.5), amp=.5;
    for(let h=1;h<=14;h++){ // jivari buzz: upper harmonics get a lift and ring a bit longer
      const ha=amp*(1/h)*(h>=4&&h<=9?1.9:1), dec=2.2+h*0.18, fh=f*h; if(fh>9000) break;
      for(let i=0;i<len;i+=1){ const e=Math.exp(-i/(SR*dec/ (h>5?1.3:1)))*Math.min(1,i/(SR*0.012)); if(e<.002) break;
        const v=ha*e*Math.sin(TAU*fh*i/SR+h*.7); wrapAdd(L,start+i,v*(1-pan)*2); wrapAdd(Rr,start+i,v*pan*2); } }
    t+= (k%4===3)? cyc-gap*3.3 : gap*1.1; k++; }
  return [L,Rr]; }

function pad(T,R){ // slow chord pad: a few detuned soft saws, chord changes every 15 s, long crossfades
  const L=new Float32Array(N), Rr=new Float32Array(N), seg=SECS/ (T.chords.length*2), segN=Math.floor(seg*SR);
  const order=[]; for(let i=0;i<T.chords.length*2;i++) order.push(T.chords[i%T.chords.length]);
  order.forEach((ch,ci)=>{ const s0=ci*segN;
    ch.forEach((semi,vi)=>{ const f0=hz(T.root,semi)*(semi<0?1:1), pan=.25+((vi*.37)%.5);
      for(let d=-1;d<=1;d++){ const f=f0*(1+d*0.0035), ph=R()*TAU;
        for(let i=-segN*0.45;i<segN*1.45;i++){ const u=(i+segN*0.45)/(segN*1.9), env=Math.sin(Math.PI*u); if(env<=0) continue; const e=env*env;
          const x=f*i/SR+ph/TAU, saw=(x%1)*2-1, soft=Math.sin(TAU*x)*.6+saw*.12+Math.sin(TAU*2*x)*.12, v=soft*e*.05*T.pad;
          wrapAdd(L,s0+Math.floor(i),v*(1-pan)*1.6); wrapAdd(Rr,s0+Math.floor(i),v*pan*1.6); } } }); });
  return [L,Rr]; }

function flute(T,R){ // sparse, breathy melody that wanders around the scale and often rests
  const L=new Float32Array(N), Rr=new Float32Array(N), sc=T.scale; let idx=3, t=3+R()*2;
  while(t<SECS-5){ const phrase=3+Math.floor(R()*4);
    for(let p=0;p<phrase && t<SECS-4;p++){
      idx=Math.max(0,Math.min(sc.length-1, idx+Math.round((R()-.5)*3.2)));
      const dur=(1.1+R()*1.7)/ (T.melody>.3?1.1:.9), f=hz(T.root*2*T.oct,sc[idx]), start=Math.floor(t*SR), len=Math.floor(dur*SR*1.5), ph=R()*TAU;
      for(let i=0;i<len;i++){ const u=i/(dur*SR), a=Math.min(1,i/(SR*.09)), r=u<1?1:Math.exp(-(u-1)*5), e=a*r; if(e<.003) continue;
        const vib=1+Math.sin(TAU*T.vib*i/SR)*.004*Math.min(1,i/(SR*.4)), x=f*vib*i/SR;
        const breath=(R()-.5)*.05*e, v=(Math.sin(TAU*x+ph)+.28*Math.sin(TAU*2*x)+.1*Math.sin(TAU*3*x)+breath*4)*e*.07*T.melody*2.2;
        wrapAdd(L,start+i,v*.7); wrapAdd(Rr,start+i,v*.5); }
      t+=dur*(1.0+R()*.25); }
    t+= (2+R()*5)*T.rest*2.2; }
  return [L,Rr]; }

function heartbeat(T){ // dark track only: a very soft low pulse every 2.4 s
  const L=new Float32Array(N), Rr=new Float32Array(N); if(!T.beat) return [L,Rr];
  for(let t=1; t<SECS; t+=2.4) [0,.34].forEach((o,j)=>{ const s0=Math.floor((t+o)*SR), len=Math.floor(SR*.5);
    for(let i=0;i<len;i++){ const u=i/SR, f=62-32*Math.min(1,u*3), e=Math.exp(-u*9), v=Math.sin(TAU*f*u)*e*(j?.22:.3); wrapAdd(L,s0+i,v); wrapAdd(Rr,s0+i,v); } });
  return [L,Rr]; }

/* simple stereo reverb (Schroeder combs + all-pass). Runs over the loop twice so the tail wraps seamlessly. */
function reverb(L,Rr,wet){
  const mk=(sz)=>({b:new Float32Array(sz),i:0,n:sz});
  const comb=(c,x,fb,damp)=>{ const y=c.b[c.i]; c.lp=(c.lp||0)*damp+y*(1-damp); c.b[c.i]=x+c.lp*fb; c.i=(c.i+1)%c.n; return y; };
  const ap=(c,x)=>{ const y=c.b[c.i]; c.b[c.i]=x+y*.5; c.i=(c.i+1)%c.n; return y-x; };
  const sets=[[1557,1617,1491,1422],[1580,1640,1514,1445]], aps=[[225,556],[241,575]];
  const outs=[new Float32Array(N), new Float32Array(N)], src=[L,Rr];
  [0,1].forEach(ch=>{ const cs=sets[ch].map(mk), as=aps[ch].map(mk);
    for(let pass=0;pass<2;pass++) for(let i=0;i<N;i++){ const x=(L[i]+Rr[i])*.5*.3; let y=0; cs.forEach(c=>{ y+=comb(c,x,.86,.35); }); as.forEach(a=>{ y=ap(a,y); }); if(pass===1) outs[ch][i]=y; } });
  const oL=new Float32Array(N), oR=new Float32Array(N);
  for(let i=0;i<N;i++){ oL[i]=src[0][i]*(1-wet*.5)+outs[0][i]*wet*3; oR[i]=src[1][i]*(1-wet*.5)+outs[1][i]*wet*3; }
  return [oL,oR]; }

function writeWav(file,L,Rr){ // 16-bit stereo, normalised to about -3 dBFS peak
  let pk=0; for(let i=0;i<N;i++) pk=Math.max(pk,Math.abs(L[i]),Math.abs(Rr[i])); const g=.7/(pk||1);
  const buf=Buffer.alloc(44+N*4); buf.write('RIFF',0); buf.writeUInt32LE(36+N*4,4); buf.write('WAVEfmt ',8); buf.writeUInt32LE(16,16); buf.writeUInt16LE(1,20); buf.writeUInt16LE(2,22);
  buf.writeUInt32LE(SR,24); buf.writeUInt32LE(SR*4,28); buf.writeUInt16LE(4,32); buf.writeUInt16LE(16,34); buf.write('data',36); buf.writeUInt32LE(N*4,40);
  for(let i=0;i<N;i++){ buf.writeInt16LE(Math.max(-32767,Math.min(32767,Math.round(L[i]*g*32767))),44+i*4); buf.writeInt16LE(Math.max(-32767,Math.min(32767,Math.round(Rr[i]*g*32767))),46+i*4); }
  fs.writeFileSync(file,buf); }

function makeTrack(name,seedShift){
  const T=TRACKS[name], R=rng(T.seed*100+(+seedShift||0)+7);
  const parts=[tanpura(T.root,T.pluckGap,R), pad(T,R), flute(T,R), heartbeat(T)], mix=[new Float32Array(N), new Float32Array(N)];
  const gains=[.5,1,1,1];
  parts.forEach((p,k)=>{ for(let i=0;i<N;i++){ mix[0][i]+=p[0][i]*gains[k]; mix[1][i]+=p[1][i]*gains[k]; } });
  const [L,Rr]=reverb(mix[0],mix[1],.18);
  fs.mkdirSync(OUT,{recursive:true}); const file=path.join(OUT,name+'.wav'); writeWav(file,L,Rr);
  return file; }

if(require.main===module){
  const [name,seed]=process.argv.slice(2);
  const names=name?[name]:Object.keys(TRACKS).filter(n=>!fs.existsSync(path.join(OUT,n+'.wav')));
  names.forEach(n=>{ if(!TRACKS[n]){ console.error('✗ unknown track',n,'(calm | dark | bright)'); process.exit(1); }
    process.stdout.write(`♫ making ${n}... `); const t0=Date.now(); const f=makeTrack(n,seed); console.log(`done (${((Date.now()-t0)/1000).toFixed(0)}s) → ${path.relative(path.join(__dirname,'..'),f)}`); });
  if(!names.length) console.log('♫ all music already made (music/calm.wav, dark.wav, bright.wav)');
}
module.exports={makeTrack, TRACKS, OUT};
