/* =====================================================================
   CORE: builds the stage from a story and plays it.
   A story calls VIDEO({...}). URL options:
     ?shot=N    freeze on shot N        ?t=12.5   freeze at a time
     ?notext=1  hide captions/titles     ?clean=1  hide buttons
     ?prompter=1  recording mode: shows current + next line, 3-2-1 start
     ?render=1  no playback loop; renderer calls __ENGINE.seek(t)

   Animation pack (all optional, old stories keep working):
     cfg.intro:1.0 / cfg.outro:3.6   "Mumma's Mythology" sting before shot 1 and end card after the last shot
     cfg.hook:{at,hold,words:[{text,size,y,delay,count:[a,b]}]}   big slam-in hook text in the first 2 seconds
     cfg.ending:3.2                  natural finish after the last word: scene holds + slow push-in, music fades, fade to black (0 = off)
     cfg.handheld:0.6                tiny camera breathing (0 = off)
     shot.sky / far / mid / art / near   depth layers that move at different speeds when the camera moves
                                     (parallax factors .3 / .6 / .85 / 1 / 1.4). Plain `art` alone = flat, as before.
     shot.cam:{keys:[[t,x,y,zoom,'snap'?],...]}   keyframed camera (push-ins, tilts, whip to a face)
     shot.mood:'anger'|'sad'|'joy'|'hope'|'calm'|'shock'|'divine'   lighting + colour grade per emotion
     shot.tr:'fade'|'glow'|'whip'|'zoom'|'iris'|'wipe'|'flash'|'dip'|'cut'   cinematic transition INTO this shot
   More (all optional):
     cfg.opening:N                  first N shots = silent 0.8 s MONTAGE (give them art/cast/cam/tr, no line); voice starts at shot N+1
     shot.calli:{lines,source,y,size,delay,gap,write,hold}   Sanskrit verse "written" in calligraphy (see calligraphy() in scenes.js)
     Sound effects are added automatically (quiet whoosh on whip/wipe,
     soft shimmer on glow/iris, bell entering a 'divine' shot, one soft thump on the hook). Extra ones: shot.sfx:[[secondsIntoShot,'gong',vol?],...]
     names: whoosh boom hit gong bell shimmer tick riser.   cfg.sfx:false turns all SFX off.
   ===================================================================== */
const LAYER_F={sky:.3,far:.6,mid:.85,art:1,near:1.4};
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
    <div id="mood"><i></i><i></i><i></i></div>
    <svg id="over" viewBox="0 0 ${W} ${H}"></svg><svg id="trfx" viewBox="0 0 ${W} ${H}"></svg><div id="flash"></div>
    <div id="shade"></div><div id="cap"></div>
    <svg id="card" viewBox="0 0 ${W} ${H}"></svg><svg id="sting" viewBox="0 0 ${W} ${H}"></svg><svg id="hook" viewBox="0 0 ${W} ${H}"></svg><div id="bar"></div>
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

  // Timing measured from the owner's real voice (set by tools/render.js before the page loads): window.__SYNC = {durs:[..], speech:[[[s,e],..],..]}
  // for the narration shots. ?durs=a,b,c works too (lengths only).
  const SY = window.__SYNC || (qs.has('durs') ? {durs:qs.get('durs').split(',').map(Number)} : null);
  if(SY && SY.durs){ const o=cfg.opening||0;
    cfg.shots=cfg.shots.map((s,i)=> i>=o && SY.durs[i-o]>0 ? Object.assign({},s,{dur:SY.durs[i-o], speech:SY.speech?SY.speech[i-o]:undefined}) : s); }
  const plan=planTiming(cfg), ENDING=plan.ending||0, DURATION=plan.duration, INTRO=plan.intro, NARR_END=plan.narrEnd, OUTRO=plan.outro;
  const KEY=(cfg.keywords||[]);
  const SH = cfg.shots.map((s,i)=>Object.assign({}, s, plan.shots[i]));

  /* ---- build every shot once ---- */
  SH.forEach((sc,i)=>{
    const rigs=(sc.cast||[]).map(makeRig);
    const title = sc.title ? big(W/2, sc.title.y||150, (sc.title.size||50)*0.82, sc.title.color||'#ffd25e', sc.title.text, sc.title.delay||0.5) : '';
    const d=document.createElement('div'); d.className='scene';
    const calli = sc.calli ? calligraphy(sc.calli.lines, sc.calli) : '';
    const stage0=`${sc.art?sc.art():''}${rigs.map(r=>r.svg).join('')}${sc.front?sc.front():''}${calli}${title}`;
    const layered=!!(sc.sky||sc.far||sc.mid||sc.near);
    d.innerHTML=`<svg viewBox="0 0 ${W} ${H}">`+(layered ?
      `<g class="L" data-f="${LAYER_F.sky}" data-dof="1.6">${sc.sky?sc.sky():''}</g><g class="L" data-f="${LAYER_F.far}" data-dof="1">${sc.far?sc.far():''}</g><g class="L" data-f="${LAYER_F.mid}" data-dof="0.5">${sc.mid?sc.mid():''}</g>`+
      `<g class="L" data-f="1">${stage0}</g><g class="L" data-f="${LAYER_F.near}" data-dof="-1.2">${sc.near?sc.near():''}</g>` : stage0)+`</svg>`;
    scenesEl.appendChild(d); sc.el=d;
    sc.layers=[...d.querySelectorAll('g.L')].map(e=>({e,f:+e.dataset.f,dof:+(e.dataset.dof||0)}));
    rigs.forEach(r=>bindRig(r,d)); sc.rigs=rigs;
    sc.anims=[...d.querySelectorAll('[data-a]')].map(e=>{ const p=e.dataset.a.split(':'); return {e,type:p[0],a:p.slice(1).map(Number),ph:rnd()*6.28}; });
    if(NOTEXT) d.querySelectorAll('text').forEach(e=>e.style.display='none');
    // captions
    sc.chunks= sc.nocap ? [] : captionChunks(sc.words, cfg.captionChars||28).map(ch=>{ const el=document.createElement('div'); el.className='chunk';
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
        case 'reveal':{ const k=easeIO(clamp01((lt-a[0])/a[1])); e.setAttribute('width',((a[3]-a[2])*k).toFixed(1)); break; }
        case 'glint':{ const u=(lt-a[0])/a[1], k=easeIO(clamp01(u)); e.setAttribute('transform',`translate(${(a[2]+(a[3]-a[2])*k).toFixed(1)} 0)`); op=(u<0||u>=1)?0:Math.min(1,Math.min(u,1-u)*8); break; }
        case 'fadeout':{ op=1-clamp01((lt-a[0])/a[1]); break; }
        case 'fadein':{ op=clamp01((lt-a[0])/a[1]); break; }
        case 'orbit':{ const ang=(lt/a[4])*6.283, x=a[2]+a[0]*Math.cos(ang), y=a[3]+a[1]*Math.sin(ang), tang=Math.atan2(a[1]*Math.cos(ang),-a[0]*Math.sin(ang))*57.3; tr=`translate(${r1(x)} ${r1(y)}) rotate(${r1(tang)})`; op=Math.sin(ang)<-0.2?0.55:1; break; }
      }
      if(tr) e.setAttribute('transform',tr); if(op!==null) e.setAttribute('opacity',op.toFixed(3)); });
  }

  /* ---- camera: preset name, {from:[x,y,zoom], to:[x,y,zoom]} or {keys:[[t,x,y,zoom,'snap'?],...]} (x,y = point to centre on) ---- */
  const CAMS={ in:{from:[270,480,1],to:[270,480,1.08]}, out:{from:[270,480,1.1],to:[270,480,1]},
    panL:{from:[286,480,1.08],to:[254,480,1.08]}, panR:{from:[254,480,1.08],to:[286,480,1.08]},
    up:{from:[270,500,1.06],to:[270,470,1.06]}, down:{from:[270,460,1.06],to:[270,490,1.06]}, still:{from:[270,480,1.02],to:[270,480,1.02]} };
  const easeSnap=k=>{ k=clamp01(k); return k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2; };
  const HAND = cfg.handheld===undefined ? 0.6 : cfg.handheld;
  function camState(sc,lt,t){
    const c=typeof sc.cam==='object'?sc.cam:(CAMS[sc.cam]||CAMS.in); let x,y,z;
    if(c.keys){ const K=c.keys; let i=0; while(i+1<K.length && K[i+1][0]<=lt) i++;
      if(i+1>=K.length||lt<=K[0][0]){ const k0=K[Math.min(i,K.length-1)]; [x,y,z]=[k0[1],k0[2],k0[3]]; }
      else { const a=K[i], b=K[i+1], u=(lt-a[0])/(b[0]-a[0]), k=(b[4]==='snap'?easeSnap:easeIO)(u); x=lerp(a[1],b[1],k); y=lerp(a[2],b[2],k); z=lerp(a[3],b[3],k); } }
    else { const k=easeIO(clamp01(lt/sc.dur)); x=lerp(c.from[0],c.to[0],k); y=lerp(c.from[1],c.to[1],k); z=lerp(c.from[2],c.to[2],k); }
    if(sc.shake){ const [st,du,amp]=sc.shake; const e=clamp01((lt-st)/du); if(e>0&&e<1){ const f=(1-e)*amp; x+=Math.sin(lt*70)*f; y+=Math.cos(lt*57)*f; } }
    if(HAND){ x+=Math.sin(t*0.83)*HAND*1.4+Math.sin(t*2.1)*HAND*0.35; y+=Math.cos(t*0.67)*HAND*1.1+Math.sin(t*1.9)*HAND*0.3; }
    const hs=hookShake(t); x+=hs[0]; y+=hs[1];
    // keep the frame covered: centre point can't drift past the edge allowed by the zoom
    if(ENDING>0 && sc===SH[SH.length-1] && lt>sc.dur){ const u=lt-sc.dur; z*=1+0.035*u/ENDING; y-=6*u/ENDING; }   // ending: slow, calm push-in
    const mx=W/2/z, my=H/2/z; x=Math.max(mx,Math.min(W-mx,x)); y=Math.max(my,Math.min(H-my,y));
    return {x,y,z}; }
  const camCss=c=>`translate(${r1(W/2)}px,${r1(H/2)}px) scale(${c.z.toFixed(4)}) translate(${r1(-c.x)}px,${r1(-c.y)}px)`;
  // parallax: a layer with factor f follows the camera f times as far (f<1 = distant, f>1 = in front of the actors)
  function layerTf(f,c){ const zf=1+(c.z-1)*f, s=zf/c.z, tx=c.x-s*(W/2+(c.x-W/2)*f), ty=c.y-s*(H/2+(c.y-H/2)*f); return `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})`; }

  /* ---- mood: lighting + colour grade per emotion (cross-fades between shots) ---- */
  const MOOD0={sat:1,bri:1,con:1,hue:0,tint:[0,0,0,0],vig:0,glow:[.5,.5,.8,255,255,255,0],rim:[255,255,255,0],pulse:0};
  const MOODS={ neutral:{},
    calm:  {sat:1.0,bri:1,con:1.03,tint:[120,150,255,.04],glow:[.5,.2,.7,205,222,255,.07],rim:[190,210,255,.55],vig:.12},
    joy:   {sat:1.14,bri:1.05,con:1.05,hue:-3,tint:[255,190,110,.07],glow:[.55,.6,.7,255,205,120,.10],rim:[255,214,140,.8],vig:.1},
    hope:  {sat:1.12,bri:1.05,con:1.06,hue:-4,tint:[255,170,90,.09],glow:[.78,.8,.75,255,190,110,.17],rim:[255,205,130,.9],vig:.1},
    anger: {sat:1.28,bri:.9,con:1.2,hue:-9,tint:[255,28,10,.16],glow:[.5,.92,.8,255,50,15,.24],rim:[255,70,40,.95],vig:.55,pulse:1},
    sad:   {sat:.62,bri:.88,con:1.06,hue:12,tint:[56,86,170,.18],glow:[.5,.1,.7,150,180,255,.09],rim:[130,170,255,.75],vig:.5},
    shock: {sat:.65,bri:1.06,con:1.26,hue:6,tint:[220,235,255,.10],glow:[.5,.45,.6,255,255,255,.12],rim:[255,255,255,.9],vig:.32,pulse:.6},
    divine:{sat:1.08,bri:1.02,con:1.05,hue:2,tint:[190,140,255,.06],glow:[.5,.42,.65,255,226,150,.14],rim:[255,226,160,.85],vig:.2} };
  const moodOf=m=>{ if(!m) m='neutral'; if(typeof m==='string') m={base:m}; return Object.assign({},MOOD0,MOODS[m.base||'neutral'],m); };
  const mixV=(a,b,k)=>Array.isArray(a)?a.map((v,i)=>lerp(v,b[i],k)):lerp(a,b,k);
  const moodEl=document.querySelectorAll('#mood i'), scenesBox=$('scenes');
  const smooth=k=>{ k=clamp01(k); return k*k*(3-2*k); };
  function applyMood(t,idx){
    const sc=SH[idx], pv=SH[Math.max(0,idx-1)], A0=moodOf(pv.mood), B0=moodOf(sc.mood), k=idx===0?1:smooth((t-(sc.start-0.2))/0.9), M={};
    for(const key in MOOD0) M[key]=mixV(A0[key],B0[key],k);
    if(t>=NARR_END && OUTRO>0) for(const key in MOOD0) M[key]=mixV(M[key],MOOD0[key],smooth((t-NARR_END)/0.5));
    const beat=Math.pow(Math.max(0,Math.sin(t*6.2)),6)+0.6*Math.pow(Math.max(0,Math.sin(t*6.2-1.1)),6), pu=1+M.pulse*(0.35*beat-0.1);
    const id=Math.abs(M.sat-1)+Math.abs(M.bri-1)+Math.abs(M.con-1)+Math.abs(M.hue)<0.01;
    scenesBox.style.filter= id?'':`saturate(${M.sat.toFixed(3)}) brightness(${M.bri.toFixed(3)}) contrast(${M.con.toFixed(3)}) hue-rotate(${M.hue.toFixed(1)}deg)`;
    const T=M.tint, G=M.glow, rgb=a=>a.map(Math.round).join(',');
    moodEl[0].style.background = T[3]>0.003 ? `rgba(${rgb(T.slice(0,3))},${T[3].toFixed(3)})` : 'none';
    moodEl[1].style.background = G[6]>0.003 ? `radial-gradient(circle at ${(G[0]*100).toFixed(1)}% ${(G[1]*100).toFixed(1)}%, rgba(${rgb(G.slice(3,6))},${(G[6]*pu).toFixed(3)}) 0%, rgba(${rgb(G.slice(3,6))},0) ${(G[2]*100).toFixed(0)}%)` : 'none';
    moodEl[2].style.background = M.vig>0.003 ? `radial-gradient(ellipse at 50% 46%, rgba(0,0,0,0) ${(46-18*M.vig).toFixed(0)}%, rgba(${(T[0]>200&&T[1]<80)?'30,0,0':'0,0,6'},${Math.min(.92,M.vig*pu).toFixed(3)}) 100%)` : 'none';
    scenesBox.style.setProperty('--rimc',`rgb(${rgb(M.rim.slice(0,3))})`); scenesBox.style.setProperty('--rimo',M.rim[3].toFixed(2)); }

  /* ---- cinematic transitions INTO a shot (shot.tr). Overlap types play across the cut: half before, half after ---- */
  const TRDUR={fade:.5,glow:.7,whip:.42,zoom:.5,iris:.75,wipe:.55};
  const TRN=SH.map((sc,i)=> i>0 && TRDUR[sc.tr] ? {type:sc.tr, d:TRDUR[sc.tr]} : null);
  const trfx=$('trfx');
  trfx.innerHTML=`<defs><linearGradient id="wipeG" x1="0" x2="1"><stop offset="0" stop-color="#ffe7a8" stop-opacity="0"/><stop offset=".7" stop-color="#ffe7a8" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient></defs>`+
    `<circle id="irisRing" r="0" fill="none" stroke="#ffe7a8" stroke-width="7" opacity="0" filter="url(#b4)"/><circle id="irisRing2" r="0" fill="none" stroke="#fff6dc" stroke-width="2.5" opacity="0"/><path id="wipeBand" fill="url(#wipeG)" opacity="0"/><g id="whipLines" opacity="0"></g>`;
  const irisRing=$('irisRing'), irisRing2=$('irisRing2'), wipeBand=$('wipeBand'), whipLines=$('whipLines');
  whipLines.innerHTML=[150,260,420,540,700,810].map((y,i)=>`<rect x="-40" y="${y}" width="620" height="${i%2?8:14}" rx="6" fill="#fff" opacity=".22" filter="url(#b4)"/>`).join('');
  const easeBack=k=>{ k=clamp01(k); const c1=1.70158,c3=c1+1; return 1+c3*Math.pow(k-1,3)+c1*Math.pow(k-1,2); };
  // returns {op, tf (screen-space, before camera), blur, clip, bright}
  function trStyle(type,role,p,sc){ const e=easeIO(p), o={op:1,tf:'',blur:0,clip:'',bright:1}, cxy=[W/2,H/2];
    const scaleAbout=(s,x,y)=>`translate(${x}px,${y}px) scale(${s.toFixed(4)}) translate(${-x}px,${-y}px)`;
    switch(type){
      case 'fade': if(role==='in') o.op=e; break;
      case 'glow': { const g=Math.sin(Math.PI*p); if(role==='in') o.op=e; o.bright=1+0.45*g; o.blur=g*2; break; }
      case 'whip': { const w=easeSnap(p); o.blur=Math.sin(Math.PI*w)*11; o.tf = role==='in' ? `translate(${r1((1-w)*W)}px,0)` : `translate(${r1(-w*W)}px,0)`; break; }
      case 'zoom': if(role==='out'){ o.tf=scaleAbout(1+e*1.1,cxy[0],cxy[1]); o.op=1-smooth((e-.25)/.75); o.blur=e*7; } else { o.tf=scaleAbout(1.45-0.45*e,cxy[0],cxy[1]); o.op=smooth(e*1.5); o.blur=(1-e)*6; } break;
      case 'iris': if(role==='in'){ const c=sc.trAt||[W/2,H*0.44], r=easeIO(p)*Math.hypot(W,H); o.clip=`circle(${r.toFixed(1)}px at ${c[0]}px ${c[1]}px)`; } break;
      case 'wipe': if(role==='in'){ const S=300, xt=e*(W+S); o.clip=`polygon(0 0, ${xt.toFixed(1)}px 0, ${(xt-S).toFixed(1)}px ${H}px, 0 ${H}px)`; } break;
    } return o; }
  function trOverlay(type,p,sc){ irisRing.setAttribute('opacity',0); irisRing2.setAttribute('opacity',0); wipeBand.setAttribute('opacity',0); whipLines.setAttribute('opacity',0);
    if(!type) return; const e=easeIO(p);
    if(type==='iris'){ const c=sc.trAt||[W/2,H*0.44], r=e*Math.hypot(W,H); [irisRing,irisRing2].forEach(el=>{ el.setAttribute('cx',c[0]); el.setAttribute('cy',c[1]); el.setAttribute('r',r.toFixed(1)); el.setAttribute('opacity',(1-p*p).toFixed(2)); }); }
    else if(type==='wipe'){ const S=300, xt=e*(W+S); wipeBand.setAttribute('d',`M${(xt-60).toFixed(1)} 0 L${(xt+14).toFixed(1)} 0 L${(xt-S+14).toFixed(1)} ${H} L${(xt-S-60).toFixed(1)} ${H}Z`); wipeBand.setAttribute('opacity',Math.sin(Math.PI*p).toFixed(2)); }
    else if(type==='whip'){ whipLines.setAttribute('opacity',(Math.sin(Math.PI*p)).toFixed(2)); whipLines.setAttribute('transform',`translate(${r1((0.5-p)*160)} 0)`); } }

  /* ---- hook: big kinetic text that slams in during the first 2 seconds ---- */
  const HK=cfg.hook||null, hookEl=$('hook');
  const HKAT=HK?(HK.at!==undefined?HK.at:Math.max(0.2,INTRO*0.7)):0, HKHOLD=HK?(HK.hold||1.7):0;
  if(HK){
    hookEl.innerHTML=`<defs><linearGradient id="hookG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#ffc83c"/><stop offset="1" stop-color="#ff8a1c"/></linearGradient>
      <radialGradient id="hookR"><stop offset="0" stop-color="#ffd25e" stop-opacity=".55"/><stop offset="1" stop-color="#ffd25e" stop-opacity="0"/></radialGradient></defs>`+
      `<g id="hkRays">${Array.from({length:16},(_,i)=>`<path d="M0 0 L${i%2?34:22} -520 L-${i%2?34:22} -520Z" transform="rotate(${i*22.5})" fill="url(#hookR)"/>`).join('')}</g>`+
      `<circle id="hkRing" r="0" fill="none" stroke="#fff3b0" stroke-width="6" opacity="0"/>`+
      HK.words.map((w,i)=>`<g class="hw" id="hw${i}"><text text-anchor="middle" font-size="${w.size}" fill="${w.glow||'#ff8a1c'}" filter="url(#b10)" opacity=".85" style="font-weight:800">${w.text}</text>`+
        `<text text-anchor="middle" font-size="${w.size}" fill="url(#hookG)" stroke="#3a1204" stroke-width="${Math.max(6,w.size*.075)}" stroke-linejoin="round" paint-order="stroke" style="font-weight:800">${w.text}</text></g>`).join('');
    HK.words.forEach((w,i)=>{ w.g=hookEl.querySelector('#hw'+i); w.txt=[...w.g.querySelectorAll('text')]; if(NOTEXT) w.g.style.display='none'; });
    hookEl.style.display='none';
  }
  const hookImpact=w=>HKAT+(w.delay||0)+0.3;
  function hookShake(t){ if(!HK||NOTEXT) return [0,0]; let ax=0, ay=0; HK.words.forEach(w=>{ const k=(t-hookImpact(w))/0.35; if(k>0&&k<1){ const a=(w.shake===undefined?9:w.shake)*(1-k); ax+=Math.sin(k*70)*a; ay+=Math.cos(k*55)*a; } }); return [ax,ay]; }
  function updateHook(t){ if(!HK) return; const end=HKAT+HKHOLD+0.35, on=t>=HKAT && t<end && !NOTEXT; hookEl.style.display=on?'block':'none'; if(!on) return;
    const ex=clamp01((t-(HKAT+HKHOLD))/0.35), cx0=270, cy0=HK.words[0].y-HK.words[0].size*0.35;
    const rays=$('hkRays'); rays.setAttribute('transform',`translate(${cx0} ${cy0}) rotate(${r1(t*14)}) scale(1.4)`); rays.setAttribute('opacity',(smooth((t-HKAT)/0.3)*(1-ex)*0.42).toFixed(2));
    let ring=0, rr=0; HK.words.forEach(w=>{ const kr=(t-hookImpact(w))/0.5; if(kr>0&&kr<1&&w.ring!==false){ ring=1-kr; rr=40+kr*300; } });
    const hr=$('hkRing'); hr.setAttribute('cx',cx0); hr.setAttribute('cy',cy0); hr.setAttribute('r',rr.toFixed(1)); hr.setAttribute('opacity',(ring*.8).toFixed(2));
    HK.words.forEach(w=>{ const k=(t-HKAT-(w.delay||0))/0.34; if(k<0){ w.g.setAttribute('opacity',0); return; }
      const eb=easeBack(k), sc=lerp(3.6,1,eb)*(1+0.018*Math.sin(t*5)) *(1+ex*0.55), rot=(1-eb)*(w.rot===undefined?-9:w.rot), dy=-ex*34+(1-clamp01(k))*-40;
      w.g.setAttribute('opacity',(clamp01(k*5)*(1-ex)).toFixed(3));
      w.g.setAttribute('transform',`translate(270 ${r1(w.y+dy)}) rotate(${r1(rot)}) scale(${sc.toFixed(3)})`);
      if(w.count){ const n=Math.round(lerp(w.count[0],w.count[1],1-Math.pow(1-clamp01((t-HKAT-(w.delay||0))/0.55),3))); w.txt.forEach(e=>e.textContent=n); } }); }

  /* ---- channel brand: crescent + "Mumma's Mythology" (used by the intro sting and the end card) ---- */
  let _bn=0;
  function brandMark(){ const n=_bn++;
    return `<defs><mask id="bm${n}"><rect x="-90" y="-90" width="180" height="180" fill="#fff"/><circle cx="26" cy="-16" r="52" fill="#000"/></mask>
      <linearGradient id="bg${n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset=".55" stop-color="#f1c04e"/><stop offset="1" stop-color="#b98428"/></linearGradient>
      <clipPath id="bt${n}"><text x="0" y="60" text-anchor="middle" font-size="80" style="font-family:'Tiro','Mukta',serif;font-weight:400">Mumma’s</text><text x="0" y="112" text-anchor="middle" font-size="35" letter-spacing="13" style="font-family:'Mukta',sans-serif;font-weight:800">MYTHOLOGY</text></clipPath></defs>
      <g class="bm-moon"><circle r="120" fill="url(#moonG)" opacity=".5"/><circle r="60" fill="#f3ecd2" mask="url(#bm${n})"/><path transform="translate(58 -52) scale(1.4)" d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2Z" fill="#fff3c4"/></g>
      <g class="bm-text"><text x="0" y="60" text-anchor="middle" font-size="80" fill="url(#bg${n})" style="font-family:'Tiro','Mukta',serif;font-weight:400">Mumma’s</text>
        <text x="0" y="112" text-anchor="middle" font-size="35" letter-spacing="13" fill="url(#bg${n})" style="font-family:'Mukta',sans-serif;font-weight:800">MYTHOLOGY</text>
        <g clip-path="url(#bt${n})"><rect class="bm-shine" x="-400" y="-20" width="46" height="170" fill="#fff" opacity=".85" transform="skewX(-18)"/></g></g>
      <path class="bm-line" d="M-120 134 L120 134" stroke="#f1c04e" stroke-width="2" opacity=".7"/><path d="M-6 134 L0 128 L6 134 L0 140Z" fill="#f1c04e"/>`; }
  function brandUpdate(root,u){ // u: seconds since the lockup began
    const moon=root.querySelector('.bm-moon'), tx=root.querySelector('.bm-text'), ln=root.querySelector('.bm-line'), sh=root.querySelector('.bm-shine');
    const mk=easeBack(clamp01(u/0.5)), tk=smooth((u-0.18)/0.4);
    moon.setAttribute('transform',`translate(0 ${r1(-86+(1-mk)*26)}) scale(${(0.5+0.5*mk).toFixed(3)})`); moon.setAttribute('opacity',clamp01(u/0.25).toFixed(2));
    tx.setAttribute('opacity',tk.toFixed(2)); tx.setAttribute('transform',`translate(0 ${r1((1-tk)*22)})`);
    ln.setAttribute('opacity',(0.7*smooth((u-0.35)/0.3)).toFixed(2));
    sh.setAttribute('x',r1(-420+Math.max(0,(u-0.32))*1000)); }

  /* ---- intro sting (before shot 1) ---- */
  const stingEl=$('sting');
  if(INTRO>0){ stingEl.innerHTML=`<defs><mask id="stM"><rect width="${W}" height="${H}" fill="#fff"/><circle id="stHole" cx="${W/2}" cy="${H*0.44}" r="0" fill="#000"/></mask>
      <radialGradient id="stG"><stop offset="0" stop-color="#2a2a6a"/><stop offset="1" stop-color="#05060f"/></radialGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#stG)" mask="url(#stM)"/><circle id="stRing" cx="${W/2}" cy="${H*0.44}" r="0" fill="none" stroke="#ffe7a8" stroke-width="5" opacity="0"/>
      <g id="stStars">${Array.from({length:40},(_,i)=>{ const a=i*2.399, rr=40+(i*47)%330; return `<circle cx="${r1(W/2+Math.cos(a)*rr)}" cy="${r1(H*0.44+Math.sin(a)*rr*1.3)}" r="${i%5?1:1.8}" fill="#fff" opacity=".7"/>`; }).join('')}</g>
      <g id="stLogo" transform="translate(${W/2} ${H*0.44})">${brandMark()}</g>`; }
  function updateSting(t){ if(INTRO<=0) return; const on=t<INTRO+0.02; stingEl.style.display=on?'block':'none'; if(!on) return;
    const holdEnd=INTRO*0.5, iris=smooth((t-holdEnd)/(INTRO-holdEnd)), R=iris*Math.hypot(W,H)*0.6;
    $('stHole').setAttribute('r',R.toFixed(1)); const ring=$('stRing'); ring.setAttribute('r',R.toFixed(1)); ring.setAttribute('opacity',(iris>0&&iris<1?(1-iris)*.9:0).toFixed(2));
    const logo=$('stLogo'); brandUpdate(logo,t); const fade=1-smooth((t-INTRO*0.55)/(INTRO*0.3)), sc=1+0.12*smooth(t/INTRO);
    logo.setAttribute('transform',`translate(${W/2} ${H*0.44}) scale(${(0.9*sc).toFixed(3)})`); logo.setAttribute('opacity',fade.toFixed(2));
    $('stStars').setAttribute('opacity',(fade*smooth(t/0.3)).toFixed(2)); }

  /* ---- end card (after the last shot) ---- */
  const cardEl=$('card'), CD_CY=372;
  if(OUTRO>0){ cardEl.innerHTML=`<defs><linearGradient id="cdBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050716"/><stop offset=".6" stop-color="#1a1f4a"/><stop offset="1" stop-color="#3a2a52"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#cdBg)"/>
      <g id="cdStars">${Array.from({length:70},(_,i)=>`<circle cx="${r1(((i*97)%540))}" cy="${r1(((i*211)%940))}" r="${i%7?.9:1.7}" fill="#fff" data-p="${(i*0.77).toFixed(2)}"/>`).join('')}</g>
      <g id="cdRing" transform="translate(${W/2} ${CD_CY})">${Array.from({length:27},(_,i)=>{ const a=-Math.PI/2+i*2*Math.PI/27; return `<g class="rs" transform="translate(${r1(Math.cos(a)*205)} ${r1(Math.sin(a)*205)}) scale(.9)"><path d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2Z" fill="#f0d79a"/></g>`; }).join('')}</g>
      <g id="cdLogo" transform="translate(${W/2} ${CD_CY+30})">${brandMark()}</g>
      <g id="cdCta" transform="translate(${W/2} 690)"><rect x="-150" y="-36" width="300" height="72" rx="36" fill="#d8302a"/><rect x="-150" y="-36" width="300" height="72" rx="36" fill="none" stroke="#ffd25e" stroke-width="3"/>
        <g id="cdBell" transform="translate(-100 0)"><path d="M-12 8 Q-12 -4 -10 -9 Q-8 -17 0 -18 Q8 -17 10 -9 Q12 -4 12 8 L16 12 L-16 12Z" fill="#fff3c4"/><circle cx="0" cy="17" r="4" fill="#fff3c4"/></g>
        <text x="14" y="13" text-anchor="middle" font-size="36" fill="#fff" style="font-weight:800">सब्सक्राइब करें</text></g>`; }
  function updateCard(t){ if(OUTRO<=0) return; const u=t-NARR_END, on=u>-0.001; cardEl.style.display=on?'block':'none'; if(!on) return;
    cardEl.style.opacity=smooth(u/0.55).toFixed(3);
    cardEl.querySelectorAll('#cdStars circle').forEach(c=>c.setAttribute('opacity',(0.25+0.65*(0.5+0.5*Math.sin(t*2+ +c.dataset.p*5))).toFixed(2)));
    const ring=$('cdRing'); ring.setAttribute('transform',`translate(${W/2} ${CD_CY}) rotate(${r1(t*6)})`);
    ring.querySelectorAll('.rs').forEach((g,i)=>{ g.setAttribute('opacity',smooth((u-0.35-i*0.035)/0.3).toFixed(2)); });
    const logo=$('cdLogo'); brandUpdate(logo,u-0.25); logo.setAttribute('transform',`translate(${W/2} ${CD_CY+30}) scale(${(1.0+0.025*Math.min(u,3)).toFixed(3)})`);
    const cta=$('cdCta'), ck=easeBack((u-1.5)/0.45); cta.setAttribute('opacity',clamp01((u-1.5)/0.2).toFixed(2));
    cta.setAttribute('transform',`translate(${W/2} 690) scale(${(lerp(0.4,1,ck)*(1+0.03*Math.sin(Math.max(0,u-2)*5))).toFixed(3)})`);
    const decay=Math.exp(-Math.max(0,u-2.0)*1.2); $('cdBell').setAttribute('transform',`translate(-100 0) rotate(${r1(u>2?22*decay*Math.sin(u*28):0)} 0 -18)`); }

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
    cx.clearRect(0,0,W,H); let active=-1, fl=0, trOv=null, cur=0;
    SH.forEach((sc,i)=>{ if(t>=sc.start) cur=i; });
    SH.forEach((sc,i)=>{
      const tr=TRN[i], nx=TRN[i+1], pre=tr?tr.d/2:0, post=nx?nx.d/2:0;
      const last=i===SH.length-1, endT=last&&ENDING>0 ? DURATION+1 : sc.end+post;
      const on = i===0 ? t<endT : (t>=sc.start-pre && t<endT);
      sc.el.style.display=on?'block':'none'; if(!on) return;
      const isA=t>=sc.start&&t<sc.end; if(isA) active=i;
      let inP=null, outP=null;
      if(tr && t>=sc.start-pre && t<sc.start+pre) inP=(t-(sc.start-pre))/tr.d;
      if(nx && t>=sc.end-post && t<sc.end+post) outP=(t-(sc.end-post))/nx.d;
      let o={op:1,tf:'',blur:0,clip:'',bright:1}, z=isA?2:1;
      if(inP!==null){ o=trStyle(tr.type,'in',inP,sc); trOv={type:tr.type,p:inP,sc}; z=tr.type==='zoom'?1:3; }
      else if(outP!==null){ o=trStyle(nx.type,'out',outP,SH[i+1]); trOv={type:nx.type,p:outP,sc:SH[i+1]}; z=nx.type==='zoom'?3:1; }
      const lt=Math.max(0,t-sc.start), cs=camState(sc,lt,t);
      const st=sc.el.style; st.zIndex=z; st.opacity=o.op.toFixed(3); st.transform=(o.tf?o.tf+' ':'')+camCss(cs);
      st.clipPath=o.clip||'none';
      st.filter=(o.blur>0.2?`blur(${o.blur.toFixed(1)}px) `:'')+(o.bright>1.01?`brightness(${o.bright.toFixed(2)})`:'')||'none';
      // parallax layers + depth of field in close-ups
      sc.layers.forEach(L=>{ if(L.f!==1) L.e.setAttribute('transform',layerTf(L.f,cs));
        if(L.dof){ const bl=Math.max(0,cs.z-1.5)*(L.dof>0?1.7:2.6)*Math.abs(L.dof); L.e.style.filter=bl>0.3?`blur(${bl.toFixed(1)}px)`:''; } });
      animate(sc,lt,t); drawFx(sc.fx,t,o.op);
      sc.rigs.forEach(r=>{ let talk=0; if(r.cast.talk && isA){ const w=sc.words.find(w=>t>=w.t&&t<w.e); if(w) talk=(t-w.t)<(w.e-w.t)-0.06?1:0; } updateRig(r,lt,t,talk); });
      if(isA && (sc.tr==='flash'||sc.tr==='dip')){ const k=lt/0.5; if(k<1) fl=Math.max(fl,1-k); flash.style.background=sc.tr==='flash'?'#fff4d6':'#000'; }
    });
    if(trOv && trOv.type==='glow'){ fl=Math.max(fl,0.28*Math.sin(Math.PI*trOv.p)); flash.style.background='radial-gradient(circle at 50% 45%,#fff0c0,#ffb45a)'; }
    trOverlay(trOv?trOv.type:null, trOv?trOv.p:0, trOv?trOv.sc:null);
    if(ENDING>0){ const fb=smooth((t-(DURATION-1.5))/1.4); if(fb>fl){ fl=fb; flash.style.background='#000'; } }   // ending: gentle fade to black
    flash.style.opacity=fl.toFixed(3);
    applyMood(t,cur);
    if(active>=0) placeCap(SH[active].capTop||CAPTOP);
    SH.forEach((sc,i)=>{ let ag=-1; if(i===active) sc.chunks.forEach((c,ci)=>{ if(t>=c.t-0.05) ag=ci; });
      sc.chunks.forEach((c,ci)=>{ const on=ci===ag; c.el.style.display=on?'block':'none';
        if(on){ const k=clamp01((t-c.t)/0.22), e=1-Math.pow(1-k,3); c.el.style.opacity=(0.2+0.8*e).toFixed(2); c.el.style.transform=`translateY(${((1-e)*16).toFixed(1)}px) scale(${(0.94+0.06*e).toFixed(3)})`; }
        if(on) c.words.forEach(w=>{ w.el.classList.toggle('on', t>=w.t && t<w.e); w.el.classList.toggle('said', t>=w.e); }); }); });
    updateHook(t); updateSting(t); updateCard(t);
    bar.style.width=(100*t/DURATION)+'%';
    if(PROMPT) prompter(t, active);
  }

  /* ---- prompter (recording helper) ---- */
  const pm=$('prompter'), fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
  function prompter(t, a){ if(a<0) return; const sc=SH[a], nx=SH[a+1];
    pm.querySelector('.meta').textContent=`शॉट ${a+1}/${SH.length}   •   ${fmt(t)} / ${fmt(DURATION)}`;
    pm.querySelector('.now').textContent=sc.line||'… (शुरुआती झलक: बस चुप रहें)'; pm.querySelector('.next').textContent=nx?('अगला: '+nx.line):'— समाप्त —';
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
  /* ---- sound-effect events (render.js turns these into audio with tools/sfx.js) ---- */
  const OPEN=cfg.opening||0;
  function sfxEvents(){ if(cfg.sfx===false) return []; const ev=[], add=(t,n,v)=>{ if(t>=0&&t<DURATION) ev.push({t:+t.toFixed(3),name:n,vol:v===undefined?1:v}); };
    const TRSFX={whip:['whoosh',-1,.8],wipe:['whoosh',-1,.7],glow:['shimmer',-.2,.7],iris:['shimmer',-.3,.7]};   // soft sounds only
    SH.forEach((sc,i)=>{ const tr=TRN[i];
      if(i<OPEN){ add(sc.start,'tick',.7); }
      if(tr && TRSFX[tr.type] && i>0){ const m=TRSFX[tr.type]; add(sc.start+(m[1]===-1?-tr.d/2:m[1]===0?0:m[1]*tr.d),m[0],m[2]); }
      if(sc.mood==='divine' && i>0 && SH[i-1].mood!=='divine') add(sc.start+.25,'bell',.7);
      (sc.sfx||[]).forEach(e=>add(sc.start+e[0],e[1],e[2])); });
    if(HK) HK.words.forEach((w,k)=>{ if(k===0) add(hookImpact(w)-.02,'boom',.7); });
    return ev.sort((a,b)=>a.t-b.t); }
  /* background-music level per shot (the music swells and dips with the scene). shot.music = number overrides (1 = normal). */
  const MUSIC_G={calm:.9,joy:1.0,hope:1.15,anger:1.1,sad:.75,shock:.8,divine:1.0,neutral:.9};
  const musicLevels=SH.map(s=>({start:s.start, end:s.end, mood:(typeof s.mood==='string'?s.mood:(s.mood&&s.mood.base)||'neutral'), m:(typeof s.music==='number'?s.music:null), g: typeof s.music==='number' ? s.music : (MUSIC_G[typeof s.mood==='string'?s.mood:(s.mood&&s.mood.base)||'neutral']||.85)}));
  window.__ENGINE={ words:SH.map(s=>s.words.map(w=>({text:w.text,t:+w.t.toFixed(2)}))), musicLevels, voiceAt:plan.voiceAt, sfx:sfxEvents(), music:cfg.music, duration:DURATION, intro:INTRO, narrEnd:NARR_END, W, H, shots:SH.map(s=>({start:s.start,end:s.end,line:s.line})), seek:t=>render(t), ready:document.fonts?document.fonts.ready:Promise.resolve() };
  window.__DUR=DURATION;
  if(!RENDER){ (function loop(){ const t=now(); if(!PROMPT && fixed===null && !paused && t>=DURATION-0.002){ t0=performance.now(); if(audio){audio.currentTime=0;audio.play().catch(()=>{});} }
      last=t; render(t); requestAnimationFrame(loop); })(); }
  else render(0);
}
