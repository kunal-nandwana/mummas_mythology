/* =====================================================================
   VOICESYNC: makes the shots follow YOUR speaking pace.
   1) ffmpeg finds the pauses in your recording (silencedetect).
   2) The planned shot lengths are stretched/squeezed to your total speaking time.
   3) Each shot change is moved to the nearest real pause (a comma or full stop in your speech),
      so pictures change when you pause, not in the middle of a sentence.
   Pure functions, no ffmpeg needed for planSync() (so it can be tested anywhere).
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

function probe(file){
  const r=spawnSync('ffmpeg',['-hide_banner','-i',file,'-af','silencedetect=noise=-34dB:d=0.22','-f','null','-'],{encoding:'utf8',maxBuffer:64*1024*1024});
  const err=r.stderr||'';
  const dm=/Duration: (\d+):(\d+):([\d.]+)/.exec(err), tm=/time=(\d+):(\d+):([\d.]+)/g;
  let total=dm?(+dm[1]*3600+ +dm[2]*60+ +dm[3]):0, mm, last=null; while((mm=tm.exec(err))) last=mm;
  if(last){ const t=+last[1]*3600+ +last[2]*60+ +last[3]; if(!total||t<total) total=t; }
  if(r.status!==0 || !total) return {ok:false, error:(err.split('\n').filter(x=>x.trim()).slice(-2).join(' ')||'ffmpeg could not open the file')};
  return {ok:true, total, silences:parseSilences(err,total)}; }

/* nar = planned lengths (seconds) of the narration shots, in order.
   Returns {durs, start, end, snapped, report[]} where durs[i] is the new length of narration shot i. */
function planSync({silences,total,nar,minShot}){
  minShot=minShot||1.4;
  const n=nar.length; if(!n) return null;
  const first=silences[0], last=silences[silences.length-1];
  const speechStart = first && first.s<=0.08 ? first.e : 0;
  const speechEnd = last && last.e>=total-0.08 ? last.s : total;
  const L=speechEnd-speechStart; if(L<=1) return null;
  const sum=nar.reduce((a,b)=>a+b,0), k=L/sum;
  const pauses=silences.filter(p=>p.s>speechStart+0.1 && p.e<speechEnd-0.1).map(p=>({s:p.s,e:p.e,len:p.e-p.s,mid:(p.s+p.e)/2}));
  const cuts=[speechStart-0.15], report=[]; let cum=0, snapped=0;
  for(let i=1;i<n;i++){ cum+=nar[i-1]; const target=speechStart+cum*k, prev=cuts[cuts.length-1];
    const win=Math.min(2.2, 0.5*Math.min(nar[i-1],nar[i])*k);
    let best=null, bestScore=1e9;
    pauses.forEach(p=>{ const d=Math.abs(p.mid-target); if(d>win || p.mid<prev+minShot) return; const sc=d-0.5*Math.min(p.len,1.2); if(sc<bestScore){ bestScore=sc; best=p; } });
    let cut=target, how='by pace';
    if(best){ cut=Math.max(best.s+best.len*0.5, best.e-0.22); how='at your pause'; snapped++; }
    cut=Math.max(cut, prev+minShot);
    cuts.push(cut); report.push({shot:i, at:cut, how}); }
  cuts.push(speechEnd+0.55);
  const durs=[]; for(let i=0;i<n;i++) durs.push(Math.max(0.8, cuts[i+1]-cuts[i]));
  return {durs, start:speechStart, end:speechEnd, snapped, pauses:pauses.length, report}; }

module.exports={AUDIO_EXT, parseSilences, probe, planSync};

/* quick self-test:  node tools/voicesync.js */
if(require.main===module){
  const sil=[{s:0,e:1.2},{s:4.1,e:4.6},{s:8.9,e:9.3},{s:13.0,e:13.2},{s:17.6,e:19.0}];
  const r=planSync({silences:sil,total:19.0,nar:[4,5,4,4]});
  console.log(JSON.stringify(r,(k,v)=>typeof v==='number'?+v.toFixed(2):v));
  const sum=r.durs.reduce((a,b)=>a+b,0); console.log('sum durs',sum.toFixed(2),'expected',(17.6+0.55-(1.2-0.15)).toFixed(2));
}
