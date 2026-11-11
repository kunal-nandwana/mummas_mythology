/* =====================================================================
   CORE: builds the stage from a story and plays it.
   A story calls VIDEO({...}). URL options:
     ?shot=N    freeze on shot N        ?t=12.5   freeze at a time
     ?notext=1  hide captions/titles     ?clean=1  hide buttons
     ?prompter=1  recording mode: shows current + next line, 3-2-1 start
     ?render=1  no playback loop; renderer calls __ENGINE.seek(t)
   ===================================================================== */
function VIDEO(cfg){
  const W=540, H=960;                       // design space (9:16). Long-form scenes come in a later step.
  const qs=new URLSearchParams(location.search);
  const RENDER=qs.has('render'), PROMPT=qs.has('prompter'), NOTEXT=qs.has('notext');
  document.title = cfg.title || 'Mumma\'s Mythology';
  document.body.innerHTML = `
  <div id="ui"><button id="restart">Restart</button><button id="toggle">Pause</button></div>
  <div id="wrap"><div id="stage">
    <svg width="0" height="0" style="position:absolute" id="defs"></svg>
    <div id="scenes"></div><canvas id="fx" width="${W}" height="${H}"></canvas>
    <svg id="over" viewBox="0 0 ${W} ${H}"></svg><div id="flash"></div>
    <div id="shade"></div><div id="cap"></div><div id="bar"></div>
  </div></div>
  <div id="prompter"><div class="meta"></div><div class="now"></div><div class="next"></div><div class="pbar"><i></i></div>
    <div class="start"><button>▶ Start recording run</button><small>Start your voice recorder first, then press the button. A 3-2-1 count follows.</small></div><div class="count"></div></div>`;
  if(qs.has('clean')||RENDER) document.body.classList.add('clean');
  if(PROMPT) document.body.classList.add('prompt');
  const $=id=>document.getElementById(id);
  const stage=$('stage'), scenesEl=$('scenes'), cap=$('cap');
  $('defs').innerHTML=DEFS;
  $('over').innerHTML=`<rect width="${W}" height="${H}" filter="url(#blotch)" style="mix-blend-mode:multiply"/><rect width="${W}" height="${H}" filter="url(#paper)" style="mix-blend-mode:overlay" opacity=".5"/><rect width="${W}" height="${H}" fill="url(#vg)"/>`;
  // captions sit in the upper-middle band (above character heads, clear of the Shorts UI); per-shot override: shot.capTop
  const CAPTOP=cfg.captionTop||400, shadeEl=$('shade');
  cap.style.top=CAPTOP+'px';
  const placeCap=y=>{ cap.style.top=y+'px'; shadeEl.style.top=(y-80)+'px'; };
  placeCap(CAPTOP);

  const plan=planTiming(cfg), DURATION=plan.duration, FADE=0.45;
  const KEY=(cfg.keywords||[]);
  const SH = cfg.shots.map((s,i)=>Object.assign({}, s, plan.shots[i]));

  /* ---- build every shot once ---- */
  SH.forEach((sc,i)=>{
    const rigs=(sc.cast||[]).map(makeRig);
    const title = sc.title ? big(W/2, sc.title.y||150, sc.title.size||60, sc.title.color||'#ffd25e', sc.title.text, sc.title.delay||0.5) : '';
    const d=document.createElement('div'); d.className='scene';
    d.innerHTML=`<svg viewBox="0 0 ${W} ${H}">${sc.art?sc.art():''}${rigs.map(r=>r.svg).join('')}${sc.front?sc.front():''}${title}</svg>`;
    scenesEl.appendChild(d); sc.el=d;
    rigs.forEach(r=>bindRig(r,d)); sc.rigs=rigs;
    sc.anims=[...d.querySelectorAll('[data-a]')].map(e=>{ const p=e.dataset.a.split(':'); return {e,type:p[0],a:p.slice(1).map(Number),ph:rnd()*6.28}; });
    if(NOTEXT) d.querySelectorAll('text').forEach(e=>e.style.display='none');
    // captions
    sc.chunks=captionChunks(sc.words, cfg.captionChars||24).map(ch=>{ const el=document.createElement('div'); el.className='chunk';
      ch.forEach(w=>{ const s=document.createElement('span'); s.className='w'+(KEY.some(k=>tStrip(w.text).includes(k))?' hl':''); s.textContent=w.text; w.el=s; el.appendChild(s); el.appendChild(document.createTextNode(' ')); });
      cap.appendChild(el); return {el, words:ch, t:ch[0].t}; });
  });
  if(NOTEXT){ cap.style.display='none'; $('shade').style.display='none'; }

  /* ---- per-element animations (data-a) ---- */
  const easeOut=k=>1-Math.pow(1-clamp01(k),3);
  function animate(sc,lt,t){
    sc.anims.forEach(({e,type,a,ph})=>{ let tr='', op=null;
      switch(type){
        case 'flick': op=0.55+0.45*(0.5+0.5*Math.sin(t*a[0]+ph)); break;
        case 'pulse': op=0.55+0.45*(0.5+0.5*Math.sin(t*a[0]+(a[1]!==undefined?a[1]:ph))); break;
        case 'bob':   tr=`translate(0 ${r1(-a[0]*Math.sin(t*a[1]*6.28+ph))})`; break;
        case 'spin':  tr=`rotate(${r1((lt/a[0])*360)} ${a[1]} ${a[2]})`; break;
        case 'rock':  tr=`rotate(${r1(a[0]*Math.sin(t*a[1]*2+ph)/2)} ${a[2]} ${a[3]})`; break;
        case 'pop':  { const k=easeOut((lt-a[0])/0.7); op=k; tr=`translate(0 ${r1((1-k)*24)})`; break; }
        case 'rise': { const k=easeOut((lt-a[2])/a[1]); op=Math.min(1,k*1.4); tr=`translate(0 ${r1((1-k)*a[0])})`; break; }
        case 'slide':{ const k=easeOut((lt-a[3])/a[2]); tr=`translate(${r1((1-k)*a[0])} ${r1((1-k)*a[1])})`; op=lt<a[3]?0:1; break; }
        case 'walk': { const k=clamp01((lt-a[2])/a[1]), kk=1-Math.pow(1-k,1.6); tr=`translate(${r1((1-kk)*a[0])} ${k<1?r1(-Math.abs(Math.sin(lt*4.2))*4):0})`; break; }
        case 'fadeout':{ op=1-clamp01((lt-a[0])/a[1]); break; }
        case 'fadein':{ op=clamp01((lt-a[0])/a[1]); break; }
        case 'orbit':{ const ang=(lt/a[4])*6.283, x=a[2]+a[0]*Math.cos(ang), y=a[3]+a[1]*Math.sin(ang), tang=Math.atan2(a[1]*Math.cos(ang),-a[0]*Math.sin(ang))*57.3; tr=`translate(${r1(x)} ${r1(y)}) rotate(${r1(tang)})`; op=Math.sin(ang)<-0.2?0.55:1; break; }
      }
      if(tr) e.setAttribute('transform',tr); if(op!==null) e.setAttribute('opacity',op.toFixed(3)); });
  }

  /* ---- camera: preset name or {from:[x,y,zoom], to:[x,y,zoom]} (x,y = point to centre on) ---- */
  const CAMS={ in:{from:[270,480,1],to:[270,480,1.08]}, out:{from:[270,480,1.1],to:[270,480,1]},
    panL:{from:[286,480,1.08],to:[254,480,1.08]}, panR:{from:[254,480,1.08],to:[286,480,1.08]},
    up:{from:[270,500,1.06],to:[270,470,1.06]}, down:{from:[270,460,1.06],to:[270,490,1.06]}, still:{from:[270,480,1.02],to:[270,480,1.02]} };
  function camT(sc,lt){ const c=typeof sc.cam==='object'?sc.cam:(CAMS[sc.cam]||CAMS.in), k=easeIO(clamp01(lt/sc.dur));
    let x=lerp(c.from[0],c.to[0],k), y=lerp(c.from[1],c.to[1],k), z=lerp(c.from[2],c.to[2],k);
    if(sc.shake){ const [st,du,amp]=sc.shake; const e=clamp01((lt-st)/du); if(e>0&&e<1){ const f=(1-e)*amp; x+=Math.sin(lt*70)*f; y+=Math.cos(lt*57)*f; } }
    // keep the frame covered: centre point can't drift past the edge allowed by the zoom
    const mx=W/2/z, my=H/2/z; x=Math.max(mx,Math.min(W-mx,x)); y=Math.max(my,Math.min(H-my,y));
    return `translate(${r1(W/2)}px,${r1(H/2)}px) scale(${z.toFixed(4)}) translate(${r1(-x)}px,${r1(-y)}px)`; }

  /* ---- particles ---- */
  const cv=$('fx'), cx=cv.getContext('2d');
  const PART=Array.from({length:70},()=>({x:rnd()*W,y:rnd()*H,s:6+rnd()*14,r:.6+rnd()*1.6,ph:rnd()*6.28,w:rnd()}));
  const FXC={dust:'#ffcf9a',embers:'#ffb45a',sparks:'#ffe7a8',stars:'#e8ecff',flies:'#e8ff9a',petals:'#f2a0b8'};
  function drawFx(kind,t,alpha){ if(!kind||alpha<=0) return;
    PART.forEach((p,i)=>{ let x,y,r=p.r,a=alpha;
      if(kind==='petals'){ y=(p.y+t*(p.s*3+20))%(H+40)-20; x=p.x+Math.sin(t*.8+p.ph)*30; cx.save(); cx.translate(x,y); cx.rotate(t+p.ph); cx.globalAlpha=a*.85; cx.fillStyle=i%3?'#f2a0b8':'#ffb43c'; cx.beginPath(); cx.ellipse(0,0,4,7,0,0,6.283); cx.fill(); cx.restore(); return; }
      if(kind==='flies'){ if(i>26) return; x=p.x+Math.sin(t*.7+p.ph)*18; y=400+(p.y%420)+Math.cos(t*.9+p.ph)*12; a*=Math.max(0,Math.sin(t*1.6+p.ph)); r=1.8; cx.shadowColor=FXC.flies; cx.shadowBlur=8; }
      else if(kind==='embers'||kind==='sparks'){ const life=4+p.w*4, l=((t+p.ph)%life)/life; x=p.x+Math.sin(t+p.ph)*10; y=(kind==='embers'?H:H-60)-l*(500+p.s*20); a*=(1-l)*.9; }
      else { y=(p.y-t*p.s+H*10)%H; x=p.x+Math.sin(t*.5+p.ph)*8; a*=.35+.4*Math.sin(t*2+p.ph); }
      cx.globalAlpha=Math.max(0,a); cx.fillStyle=FXC[kind]; cx.beginPath(); cx.arc(x,y,r,0,6.283); cx.fill(); cx.shadowBlur=0; });
    cx.globalAlpha=1; }

  /* ---- one frame ---- */
  const flash=$('flash'), bar=$('bar');
  function render(t){
    cx.clearRect(0,0,W,H); let active=-1, fl=0;
    SH.forEach((sc,i)=>{
      let o=0; if(t>=sc.start-FADE && t<sc.end) o=Math.min(1,(t-(sc.start-FADE))/FADE); if(i===0&&t<sc.end) o=1;
      if(sc.tr==='cut' && t<sc.start) o=0;
      const on=o>0; sc.el.style.display=on?'block':'none'; if(!on) return;
      const isA=t>=sc.start&&t<sc.end; if(isA) active=i;
      sc.el.style.opacity=o.toFixed(3); sc.el.style.zIndex=isA?2:1;
      const lt=Math.max(0,t-sc.start);
      sc.el.style.transform=camT(sc,lt); animate(sc,lt,t); drawFx(sc.fx,t,o);
      sc.rigs.forEach(r=>{ let talk=0; if(r.cast.talk && isA){ const w=sc.words.find(w=>t>=w.t&&t<w.e); if(w) talk=(t-w.t)<(w.e-w.t)-0.06?1:0; } updateRig(r,lt,t,talk); });
      if(isA && (sc.tr==='flash'||sc.tr==='dip')){ const k=lt/0.5; if(k<1) fl=Math.max(fl,1-k); flash.style.background=sc.tr==='flash'?'#fff4d6':'#000'; }
    });
    flash.style.opacity=fl.toFixed(3);
    if(active>=0) placeCap(SH[active].capTop||CAPTOP);
    SH.forEach((sc,i)=>{ let ag=-1; if(i===active) sc.chunks.forEach((c,ci)=>{ if(t>=c.t-0.05) ag=ci; });
      sc.chunks.forEach((c,ci)=>{ const on=ci===ag; c.el.style.display=on?'block':'none';
        if(on) c.words.forEach(w=>{ w.el.classList.toggle('on', t>=w.t && t<w.e); w.el.classList.toggle('said', t>=w.e); }); }); });
    bar.style.width=(100*t/DURATION)+'%';
    if(PROMPT) prompter(t, active);
  }

  /* ---- prompter (recording helper) ---- */
  const pm=$('prompter'), fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
  function prompter(t, a){ if(a<0) return; const sc=SH[a], nx=SH[a+1];
    pm.querySelector('.meta').textContent=`शॉट ${a+1}/${SH.length}   •   ${fmt(t)} / ${fmt(DURATION)}`;
    pm.querySelector('.now').textContent=sc.line; pm.querySelector('.next').textContent=nx?('अगला: '+nx.line):'— समाप्त —';
    pm.querySelector('.pbar i').style.width=(100*clamp01((t-sc.start)/sc.dur))+'%'; }

  /* ---- player ---- */
  function fit(){ const sc=Math.min(innerWidth/W, innerHeight/H); stage.style.transform=`scale(${sc})`; }
  addEventListener('resize',fit); fit();
  let fixed=null; if(qs.has('shot')){ const sc=SH[+qs.get('shot')]; fixed=sc.start+Math.min(sc.dur*0.75,3.6); } else if(qs.has('t')) fixed=parseFloat(qs.get('t'));
  const audio=(cfg.audio&&!RENDER)?new Audio(cfg.audio):null;
  let t0=performance.now(), paused=PROMPT, pausedAt=0, last=0;
  const now=()=> fixed!==null?fixed:(paused?pausedAt:Math.min(DURATION-0.001,(performance.now()-t0)/1000));
  const restart=()=>{ t0=performance.now(); paused=false; $('toggle').textContent='Pause'; if(audio){audio.currentTime=0;audio.play().catch(()=>{});} };
  $('restart').onclick=restart;
  $('toggle').onclick=e=>{ if(!paused){pausedAt=now();paused=true;e.target.textContent='Play';audio&&audio.pause();} else {t0=performance.now()-pausedAt*1000;paused=false;e.target.textContent='Pause';audio&&audio.play().catch(()=>{});} };
  pm.querySelector('.start button').onclick=()=>{ const st=pm.querySelector('.start'), ct=pm.querySelector('.count'); st.style.display='none'; let n=3; ct.textContent=n; ct.style.display='flex';
    const iv=setInterval(()=>{ n--; if(n>0) ct.textContent=n; else { clearInterval(iv); ct.style.display='none'; restart(); } },1000); };
  window.__ENGINE={ duration:DURATION, W, H, shots:SH.map(s=>({start:s.start,end:s.end,line:s.line})), seek:t=>render(t), ready:document.fonts?document.fonts.ready:Promise.resolve() };
  window.__DUR=DURATION;
  if(!RENDER){ (function loop(){ const t=now(); if(!PROMPT && fixed===null && !paused && t>=DURATION-0.002){ t0=performance.now(); if(audio){audio.currentTime=0;audio.play().catch(()=>{});} }
      last=t; render(t); requestAnimationFrame(loop); })(); }
  else render(0);
}
