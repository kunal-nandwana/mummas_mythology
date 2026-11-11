/* =====================================================================
   TIMING: turns the story's Hindi lines into shot start/end times and
   per-word timings. Used by the browser player AND tools/build.js, so the
   video, prompter and script.md always agree.

   - Each shot's natural length comes from its line (about 13 "letter
     weights" per second, a calm narration pace).
   - cfg.target (seconds) rescales the flexible shots to hit the total.
   - shot.dur fixes one shot's length exactly.
   - cfg.minShot (default 2.4s) is the shortest any shot can be.
   - cfg.intro (seconds) puts the channel sting BEFORE shot 1: every shot starts that much later.
   - cfg.outro (seconds) adds the end card AFTER the last shot. Neither counts towards cfg.target.
   ===================================================================== */
function tStrip(s){ return s.replace(/[.,!?'"‘’“”—\-–…:;।()]/g,''); }
function tWords(line){ return (line||'').split(/\s+/).filter(w=>w && !/^[—\-–…]+$/.test(w)); }

function planTiming(cfg){
  const minShot = cfg.minShot || 2.4, PACE = cfg.pace || 13;
  const P = cfg.shots.map(s=>{
    const w = tWords(s.line), wt = w.map(x=>tStrip(x).length+2);
    const raw = w.length ? wt.reduce((a,b)=>a+b,0)/PACE + 0.45 : 2.2;
    return {w, wt, raw, fixed: s.dur||null};
  });
  // Solve the scale so the total hits cfg.target, honouring minShot.
  let scale = 1;
  if(cfg.target){
    for(let it=0; it<6; it++){
      let fixed=0, flex=0;
      P.forEach(p=>{ if(p.fixed) fixed+=p.fixed; else if(p.raw*scale<minShot) fixed+=minShot; else flex+=p.raw; });
      if(flex<=0) break;
      scale = Math.max(0.4, (cfg.target-fixed)/flex);
    }
  }
  const intro = cfg.intro||0, outro = cfg.outro||0;
  let T=intro; const shots=[];
  P.forEach((p,i)=>{
    const dur = p.fixed || Math.max(minShot, p.raw*scale);
    const start=T, end=T+dur; T=end;
    const total = p.wt.reduce((a,b)=>a+b,0)||1, lead=0.18, speak=Math.max(0.6, dur-0.5);
    let acc=0;
    const words = p.w.map((w,k)=>{ const o={text:w, t:start+lead+acc/total*speak, e:0}; acc+=p.wt[k]; o.e=start+lead+acc/total*speak; return o; });
    shots.push({i, start, end, dur, line: cfg.shots[i].line||'', words, speakEnd: start+lead+speak});
  });
  return {shots, duration:T+outro, intro, outro, narrEnd:T};
}

/* Split a line's words into caption chunks (<= maxChars letters each). */
function captionChunks(words, maxChars){
  maxChars = maxChars || 26; const out=[]; let cur=[], n=0;
  words.forEach(w=>{ const l=tStrip(w.text).length+1;
    if(cur.length && (n+l>maxChars)){ out.push(cur); cur=[]; n=0; }
    cur.push(w); n+=l;
    if(/[,।!?—]$/.test(w.text) && n>maxChars*0.55){ out.push(cur); cur=[]; n=0; }
  });
  if(cur.length) out.push(cur);
  return out;
}

if(typeof module!=='undefined') module.exports={planTiming, captionChunks, tWords};
