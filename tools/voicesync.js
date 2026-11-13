/* =====================================================================
   VOICESYNC: makes the video follow YOUR speaking pace.
   1) ffmpeg finds the pauses in your recording. Several loudness levels are tried and the one that
      fits your room's noise best is used (a fixed level fails when the room is noisy or very quiet).
   2) Every shot change is placed on one of your real pauses, choosing the set of pauses that best fits
      the whole script (best-fit search, so one missed pause doesn't shift everything after it).
   3) Inside each shot, the caption words follow your speech: they wait during your pauses.
   planSync() is pure JS (no ffmpeg) so it can be tested anywhere:  node tools/voicesync.js
   ===================================================================== */
const {spawnSync}=require('child_process');

const AUDIO_EXT=/\.(m4a|mp3|wav|aac|ogg|oga|opus|flac|aif|aiff|caf|wma|amr|3gp|qta|mov|mp4|webm)$/i;

/* Parse ffmpeg silencedetect output into [{s,e}] (seconds). A silence that runs to the end has e = total. */
function parseSilences(stderr,total){
  const out=[]; let s=null;
  String(stderr||'').split('\n').forEach(l=>{
    let m=/silence_start: (-?[\d.]+)/.exec(l); if(m){ s=Math.max(0,+m[1]); return; }
    m=/silence_end: (-?[\d.]+)/.exec(l); if(m && s!==null){ out.push({s,e:+m[1]}); s=null; } });
  if(s!==null) out.push({s,e:total});
  return out; }

function ff(args){ return spawnSync('ffmpeg',['-hide_banner',...args,'-f','null','-'],{encoding:'utf8',maxBuffer:64*1024*1024}); }
function lengthOf(err){ const dm=/Duration: (\d+):(\d+):([\d.]+)/.exec(err), tm=/time=(\d+):(\d+):([\d.]+)/g;
  let total=dm?(+dm[1]*3600+ +dm[2]*60+ +dm[3]):0, mm, last=null; while((mm=tm.exec(err))) last=mm;
  if(last){ const t=+last[1]*3600+ +last[2]*60+ +last[3]; if(t>0 && (!total||t<total)) total=t; } return total; }

/* score a pause set: we want roughly one or two pauses per shot and 55-92% of the time to be speech */
function scoreSet(sil,total,nShots){
  const inner=sil.filter(p=>p.s>0.05 && p.e<total-0.05), quiet=sil.reduce((a,p)=>a+(p.e-p.s),0);
  const first=sil[0], last=sil[sil.length-1];
  const start=first&&first.s<=0.08?first.e:0, end=Math.min(total,last&&last.e>=total-0.08?last.s:total), speakT=Math.max(0.1,end-start);
  const innerQuiet=inner.reduce((a,p)=>a+(p.e-p.s),0), speechFrac=1-innerQuiet/speakT;
  const want=nShots?nShots*1.3:10;
  let sc=-Math.abs(Math.log((inner.length+1)/(want+1)))*2;
  if(speechFrac<0.55) sc-=(0.55-speechFrac)*12; if(speechFrac>0.97) sc-=2;
  if(inner.length<Math.max(2,(nShots||4)*0.5)) sc-=3;
  if(speechFrac<0.8) sc-=(0.8-speechFrac)*4;   // breaths and soft syllables counted as pauses = too sensitive
  return {sc, speechFrac, pauses:inner.length, quiet}; }

/* probe(file, nShots): length, loudness, noise floor and the best pause list */
function probe(file,nShots){
  const base=ff(['-i',file,'-af','volumedetect']); const err=base.stderr||'';
  const total=lengthOf(err);
  if(base.status!==0 || !total) return {ok:false, error:(err.split('\n').filter(x=>x.trim()).slice(-2).join(' ')||'ffmpeg could not open the file')};
  const mean=+(/mean_volume: (-?[\d.]+) dB/.exec(err)||[0,NaN])[1], peak=+(/max_volume: (-?[\d.]+) dB/.exec(err)||[0,NaN])[1];
  const tries=[];
  [-50,-45,-40,-36,-32,-28,-24].forEach(db=>{   // try several levels, keep the one that fits best if(isFinite(peak) && db>peak-6) return;
    const r=ff(['-i',file,'-af',`silencedetect=noise=${db}dB:d=0.2`]); const sil=parseSilences(r.stderr,total);
    tries.push(Object.assign({db, silences:sil}, scoreSet(sil,total,nShots))); });
  if(!tries.length) return {ok:false, error:'the recording looks silent'};
  tries.sort((a,b)=>b.sc-a.sc); const best=tries[0];
  return {ok:true, total, mean, peak, threshold:best.db, silences:best.silences, speechFrac:best.speechFrac, tries:tries.map(t=>({db:t.db,pauses:t.pauses,sc:+t.sc.toFixed(2)}))}; }

/* nar = planned lengths (s) of the narration shots. Returns null if the recording has no clear speech.
   -> {durs[], speech[][] (speech parts inside each shot, relative to the shot start), cuts[], start, end, snapped, report[]} */
function planSync({silences,total,nar,forced,weights,words}){   // words[i] = word strings of narration shot i (enables sentence alignment)
   // weights[i] = how much text shot i has (seconds at the plan pace); default = nar   // forced[i] = time (s) in the recording where narration shot i must start
  const n=nar.length; if(!n) return null;
  const first=silences[0], last=silences[silences.length-1];
  const start = first && first.s<=0.08 ? first.e : 0;
  const end = Math.min(total, last && last.e>=total-0.08 ? last.s : total);
  const L=end-start; if(L<=1) return null;
  const P=silences.filter(p=>p.s>start+0.05 && p.e<end-0.05).map(p=>({s:p.s,e:p.e,len:p.e-p.s,mid:(p.s+p.e)/2}));
  const cuts=[], how=[]; let steadiness=null;
  // speech time between two moments (pauses not counted): a shot's spoken length should match how much text it has
  const pre=[0]; P.forEach((p,i)=>pre.push(pre[i]+p.len));
  const quietBefore=x=>{ let q=0; for(const p of P){ if(p.e<=x) q+=p.len; else if(p.s<x) q+=x-p.s; else break; } return q; };
  const SPT=x=>(x-start)-quietBefore(x);
  const textW=(weights||nar.map(d=>d-0.45)).map(d=>Math.max(0.5,d)), sumW=textW.reduce((a,b)=>a+b,0), kS=SPT(end)/sumW;
  let aligned=null;
  if(n>1 && words && words.length===n && P.length){
    const S=scriptBreaks(words,weights||null), al=alignSentences({P,start,end,br:S.br,total:S.total});
    if(al){ aligned=al;
      const onPause={}; al.anchors.forEach(a=>{ const b=S.br[a.b]; if(b.shot) onPause[b.shot]=a; });   // shot ends that have their own pause
      for(let i=0;i<n-1;i++){ const a=onPause[i+1];
        if(a){ const len=a.t1-a.t0; cuts[i]=Math.max(a.t0+len*0.5, a.t1-0.25); how[i]='at your pause'; }
        else { cuts[i]=al.timeAt(S.shotAt[i+1]); how[i]='by sentence pace'; } }
      for(let i=1;i<n-1;i++) if(cuts[i]<cuts[i-1]+0.8) cuts[i]=cuts[i-1]+0.8;
      steadiness=al.worst;
      for(let i=0;i<n-1;i++){ const f=forced&&forced[i+1]; if(f!==undefined&&f!==null){ cuts[i]=f; how[i]='pinned (rec)'; } } } }
  if(n>1 && !aligned){
    // candidates: your real pauses + "no pause" points every 0.25 s (used when you read two lines without stopping)
    const C=P.map(p=>({mid:p.mid, cut:Math.max(p.s+p.len*0.5, p.e-0.25), len:p.len, real:true}));
    for(let x=start+0.6; x<end-0.6; x+=0.25){ if(!P.some(p=>x>p.s-0.15 && x<p.e+0.15)) C.push({mid:x, cut:x, len:0, real:false}); }
    C.sort((a,b)=>a.mid-b.mid); const m=C.length;
    // best-fit search: cut i sits on candidate j; cost = how far each shot's spoken length is from its text,
    // minus a reward for a real pause (longer = more likely a line end), plus a fee for cutting where you did not pause
    const NOPAUSE=2.2;
    const bonus=j=>C[j].real ? 3*Math.min(C[j].len,1.0) : -NOPAUSE;
    // pinned shots (shot.rec in story.js): that cut must sit within 1 s of the given time
    const pin=(i,j)=>{ const f=forced&&forced[i+1]; if(f===undefined||f===null) return 0; const d=Math.abs(C[j].mid-f); return d<=1.0 ? d*4 : 1e7; };
    const fit=sig=>{ const seg=(i,a,b)=>{ const r=(SPT(b)-SPT(a))/(textW[i]*kS); if(r<=0.05) return 1e6; const l=Math.log(r)/sig; return l*l; };
      const INF=1e18, dp=[], bk=[];
      for(let i=0;i<n-1;i++){ dp.push(new Float64Array(m).fill(INF)); bk.push(new Int32Array(m).fill(-1));
        for(let j=i;j<m-(n-2-i);j++){
          if(i===0){ dp[0][j]=seg(0,start,C[j].mid)-bonus(j)+pin(0,j); continue; }
          for(let q=i-1;q<j;q++){ if(dp[i-1][q]>=INF || C[j].mid-C[q].mid<0.8) continue; const v=dp[i-1][q]+seg(i,C[q].mid,C[j].mid)-bonus(j)+pin(i,j); if(v<dp[i][j]){ dp[i][j]=v; bk[i][j]=q; } } } }
      let j=-1, bestV=INF; for(let q=n-2;q<m;q++){ if(dp[n-2][q]>=INF) continue; const v=dp[n-2][q]+seg(n-1,C[q].mid,end); if(v<bestV){ bestV=v; j=q; } }
      const pick=[]; for(let i=n-2;i>=0;i--){ pick[i]=j; j=bk[i][j]; } return pick; };
    // pass 1 with a loose tolerance, then learn how steady YOUR pace is and fit again with that tolerance
    let pick=fit(0.55);
    const ends=[start,...pick.map(j=>C[j].mid),end], lr=nar.map((_,i)=>Math.log((SPT(ends[i+1])-SPT(ends[i]))/(textW[i]*kS))).sort((a,b)=>a-b);
    const med=lr[lr.length>>1], mad=lr.map(x=>Math.abs(x-med)).sort((a,b)=>a-b)[lr.length>>1];
    const sig=Math.max(0.2,Math.min(0.55,1.4826*mad*1.6));
    if(sig<0.54) pick=fit(sig);
    pick.forEach((j,i)=>{ cuts[i]=C[j].cut; how[i]=C[j].real?'at your pause':'no pause (by pace)'; });
    steadiness=sig;
    for(let i=0;i<n-1;i++){ const f=forced&&forced[i+1]; if(f!==undefined&&f!==null){ if(Math.abs(cuts[i]-f)>1.0) cuts[i]=f; how[i]='pinned (rec)'; } }
  } else if(false){
    let c=0; for(let i=0;i<n-1;i++){ c+=textW[i]; const want=c*kS; let lo=start, hi=end; for(let it=0;it<40;it++){ const md=(lo+hi)/2; if(SPT(md)<want) lo=md; else hi=md; } cuts.push(lo); how.push('by pace'); } }
  const B=[start-0.15, ...cuts, end+0.55];
  const durs=[], speech=[], report=[]; let snapped=0;
  for(let i=0;i<n;i++){ const a=B[i], b=B[i+1]; durs.push(Math.max(0.8,b-a));
    // speech parts inside this shot (between the pauses), relative to the shot start
    let segs=[[Math.max(a,start),Math.min(b,end)]];
    P.forEach(p=>{ segs=segs.flatMap(([x,y])=> (p.s>=y||p.e<=x) ? [[x,y]] : [[x,Math.max(x,p.s)],[Math.min(y,p.e),y]]); });
    segs=segs.filter(([x,y])=>y-x>0.12).map(([x,y])=>[+(x-a).toFixed(3),+(y-a).toFixed(3)]);
    speech.push(segs.length?segs:[[0.18,Math.max(0.6,b-a-0.3)]]);
    if(i>0){ if(how[i-1]==='at your pause') snapped++; report.push({shot:i+1, at:B[i], how:how[i-1]}); } }
  return {durs, speech, cuts:B, start, end, snapped, pauses:P, report, steadiness, mode:aligned?'sentences':'pauses'}; }

/* ---------------------------------------------------------------------
   SENTENCE ALIGNMENT (used when the shots' words are known: planSync({..., words}))
   Why: with few pauses the old fit treated a breath inside a sentence as a shot change, and from that
   point every later cut drifted early (Mahakal short, Nov 2026: shots 4-14 were 2.5-4.5 s early).
   How: every pause is matched to a sentence/clause end in the SCRIPT (। ? ! , — and every shot end)
   or marked as a breath, choosing the matching where the speaking pace (characters per second of speech)
   stays steadiest. The matched pauses become anchors; each shot cut is then placed on its own pause if it
   has one, otherwise between the two nearest anchors at the local pace. This works even when only a few
   lines end with a pause.
   --------------------------------------------------------------------- */
const BRK_SENT=/[।?!.॥]["'”’)]*$/, BRK_SOFT=/[,—;:–]["'”’)]*$|—/;
function scriptBreaks(words,weights){
  // words[i] = array of word strings of narration shot i; weights[i] = how much text shot i has (keeps chant slow-down)
  const strip=w=>w.replace(/[.,!?'"‘’“”—\-–…:;।॥()]/g,'');
  const br=[], shotAt=[]; let c=0;
  words.forEach((ws,si)=>{ const raw=ws.map(w=>strip(w).length+2), tot=raw.reduce((a,b)=>a+b,0)||1, k=weights?(weights[si]/tot):1;
    shotAt.push(c);
    ws.forEach((w,wi)=>{ c+=raw[wi]*k; const end=wi===ws.length-1;
      if(end) br.push({c, kind:2, shot:si+1}); else if(BRK_SENT.test(w)) br.push({c,kind:2}); else if(BRK_SOFT.test(w)) br.push({c,kind:1}); }); });
  return {br, shotAt, total:c}; }

function alignSentences({P,start,end,br,total}){
  const m=P.length, nb=br.length; if(!m||!nb||total<=0) return null;
  const quiet=(a,b)=>P.reduce((q,p)=>q+Math.max(0,Math.min(b,p.e)-Math.max(a,p.s)),0);
  const K=((end-start)-quiet(start,end))/total;            // seconds of speech per unit of text (whole recording)
  // anchor = {t0: speech stops, t1: speech resumes, c: text position}
  const A0={t0:start,t1:start,c:0}, AE={t0:end,t1:end,c:total};
  const seg=(a,b)=>{ const sp=(b.t0-a.t1)-quiet(a.t1,b.t0), c=b.c-a.c; if(c<=0||sp<=0.05) return 1e9;
    const r=Math.log(sp/(c*K)), sg=0.06+0.16/Math.sqrt(Math.max(0.3,c)); return (r/sg)*(r/sg); };
  const reward=(p,kind)=> kind===2 ? -1.2-1.5*Math.min(p.len,0.6) : -0.4-0.6*Math.min(p.len,0.6);
  const skipCost=p=>0.5+3*Math.max(0,p.len-0.35);         // calling a pause "just a breath" (long pauses rarely are)
  const SKIPMAX=6;
  // dp[j][b]: best cost with pause j matched to break b (pauses between matched ones are breaths)
  const INF=1e18, dp=[...Array(m)].map(()=>new Float64Array(nb).fill(INF)), bk=[...Array(m)].map(()=>new Int32Array(nb*2).fill(-1));
  const anc=(j,b)=>({t0:P[j].s,t1:P[j].e,c:br[b].c});
  const skips=(j0,j1)=>{ let s=0; for(let j=j0+1;j<j1;j++) s+=skipCost(P[j]); return s; };
  for(let j=0;j<m;j++) for(let b=0;b<nb;b++){ const me=anc(j,b), rw=reward(P[j],br[b].kind);
    if(br[b].c>=total-1e-6) continue;                      // the last break is the end of the recording
    let best=(j<=SKIPMAX? seg(A0,me)+skips(-1,j) : INF), bj=-1, bb=-1;
    for(let pj=Math.max(0,j-SKIPMAX-1);pj<j;pj++) for(let pb=0;pb<b;pb++){ if(dp[pj][pb]>=INF) continue;
      const v=dp[pj][pb]+seg(anc(pj,pb),me)+skips(pj,j); if(v<best){ best=v; bj=pj; bb=pb; } }
    dp[j][b]=best+rw; bk[j][b*2]=bj; bk[j][b*2+1]=bb; }
  let bestV=seg(A0,AE)+skips(-1,m), bj=-1, bb=-1;
  for(let j=Math.max(0,m-SKIPMAX-1);j<m;j++) for(let b=0;b<nb;b++){ if(dp[j][b]>=INF) continue; const v=dp[j][b]+seg(anc(j,b),AE)+skips(j,m); if(v<bestV){ bestV=v; bj=j; bb=b; } }
  const anchors=[]; while(bj>=0){ anchors.unshift({...anc(bj,bb), j:bj, b:bb}); const nj=bk[bj][bb*2], nb2=bk[bj][bb*2+1]; bj=nj; bb=nb2; }
  // how steady is the pace between anchors? (1.0 = perfectly even). Shown in the report.
  const all=[A0,...anchors,AE], rates=[];
  for(let i=1;i<all.length;i++){ const a=all[i-1], b=all[i], sp=(b.t0-a.t1)-quiet(a.t1,b.t0), c=b.c-a.c; if(c>0&&sp>0.05) rates.push({r:sp/(c*K), w:c}); }
  const worst=rates.reduce((x,y)=>Math.max(x,Math.abs(Math.log(y.r))),0);
  // time in the recording where text position c is spoken (pace interpolated between anchors, breaths skipped)
  const timeAt=c=>{ let i=1; while(i<all.length-1 && all[i].c<c) i++; const a=all[i-1], b=all[i];
    const sp=(b.t0-a.t1)-quiet(a.t1,b.t0), want=(b.c>a.c?(c-a.c)/(b.c-a.c):0)*sp;
    let t=a.t1, left=want; for(const p of P){ if(p.e<=a.t1||p.s>=b.t0) continue; const run=p.s-t; if(run>=left) break; left-=Math.max(0,run); t=p.e; }
    return Math.min(b.t0,t+left); };
  return {anchors, timeAt, worst, K}; }

module.exports={AUDIO_EXT, parseSilences, probe, planSync, scriptBreaks, alignSentences};

/* self-test:  node tools/voicesync.js */
if(require.main===module){
  // 4 shots planned 4/5/4/4 s; speaker is slower (pauses at 5.2, 11.3, 16.0) and has an extra mid-sentence pause at 8.0
  const sil=[{s:0,e:1.2},{s:5.0,e:5.5},{s:7.9,e:8.15},{s:11.0,e:11.6},{s:15.8,e:16.3},{s:20.4,e:22.0}];
  const r=planSync({silences:sil,total:22.0,nar:[4,5,4,4]});
  console.log('cuts',r.cuts.map(x=>x.toFixed(2)).join(' '),' snapped',r.snapped+'/3');
  console.log('durs',r.durs.map(x=>x.toFixed(2)).join(' '));
  console.log('shot2 speech parts',JSON.stringify(r.speech[1]));
  const ok = Math.abs(r.cuts[1]-5.25)<0.3 && Math.abs(r.cuts[2]-11.35)<0.3 && Math.abs(r.cuts[3]-16.05)<0.3;
  console.log(ok?'✓ self-test passed':'✗ self-test FAILED'); process.exit(ok?0:1);
}
