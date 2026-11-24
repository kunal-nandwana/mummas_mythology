/* =====================================================================
   FRONT-FACING RIG: a character that faces the camera instead of the
   default side profile (rig.js). Select it per cast member with
   `facing:'front'` on the cast entry; everything else (x, y, s, flip,
   c costume, acts, walk, expr, talk, enter/exit) still works the same
   way callers already use for the side rig.

   Scope vs. the side rig: this view supports gestures that read well
   face-on (namaste, blessing, raised fist, open arms, a walk with a
   real foot-lift cycle) and head turns via asymmetric eye/ear/nose
   shifts (a true turn cue, not the side rig's squash trick, which
   only works on an already-asymmetric profile face).

   Pose fields (all in FPOSE0 below):
     lArmOut/rArmOut : shoulder abduction, 0 = hanging at the side, + = lifted out/up
     lArmFwd/rArmFwd : swing toward/away from the camera -- shown by foreshortening, not sideways rotation
     lElbow/rElbow   : elbow bend (composes with ArmOut, see foreshorten()/updateFrontRigShot)
     lHand/rHand     : 'fist' | 'open' | 'namaste'
     lHipFwd/rHipFwd, lKnee/rKnee : leg swing/bend, driven automatically during cast.walk
     headYaw (-40..40 reads best), headTilt, lean, drop
   ===================================================================== */

const n1=v=>Math.round(v*10)/10;   // local alias (engine's scenes.js calls the same thing r1)
const FPOSE0 = {
  lArmOut:4, lArmFwd:0, lElbow:6, lHand:'fist',
  rArmOut:4, rArmFwd:0, rElbow:6, rHand:'fist',
  lHipFwd:0, lKnee:2, rHipFwd:0, rKnee:2,
  headYaw:0, headTilt:0, lean:0, drop:0,
};
const FPOSES = {
  stand:{}, relax:{},
  namaste:{lArmOut:6, lArmFwd:20, lElbow:122, rArmOut:6, rArmFwd:20, rElbow:122, lHand:'namaste', rHand:'namaste'},
  bless:{rArmOut:95, rArmFwd:-40, rElbow:4, rHand:'open', headTilt:-3},
  point:{rArmOut:95, rArmFwd:70, rElbow:4, rHand:'open'},
  fistUp:{rArmOut:170, rArmFwd:6, rElbow:8, rHand:'fist', lean:-2},
  rage:{lArmOut:55, lArmFwd:14, lElbow:70, rArmOut:55, rArmFwd:14, rElbow:70, headTilt:2, lean:3},
  lookL:{headYaw:-26}, lookR:{headYaw:26},
  bowHead:{headTilt:-14, lean:10},
};
function poseOfFront(p){
  if(!p) return Object.assign({},FPOSE0);
  if(typeof p==='object') return Object.assign({},FPOSE0,p);
  return Object.assign({},FPOSE0,...p.split('+').map(k=>FPOSES[k]||{}));
}
function blendPoseFront(A,B,k){ const o={}; for(const key in A){ const x=A[key],y=B[key];
  if(typeof x==='number') o[key]=lerp(x,y,k); else o[key]=k<.5?x:y; } return o; }

/* ---- limb builder: tapered quad with a light/shadow overlay, pivots at (0,0), runs down +y ---- */
function limbF(len, w0, w1, col, flipShade){
  const grad = flipShade? 'limbShR' : 'limbSh';
  return `<path d="M${-w0} -3 Q0 -6 ${w0} -3 L${w1} ${len} Q0 ${len+5} ${-w1} ${len}Z" fill="${col}"/>`+
         `<path d="M${-w0} -3 Q0 -6 ${w0} -3 L${w1} ${len} Q0 ${len+5} ${-w1} ${len}Z" fill="url(#${grad})"/>`;
}
function handF(kind,col){
  if(kind==='open') return `<path d="M-8 -2 Q-11 10 -5 20 L6 20 Q10 9 7 -2Z" fill="${col}"/>`;
  if(kind==='namaste') return `<ellipse rx="6" ry="13" cy="10" fill="${col}"/>`;
  return `<circle cy="9" r="9" fill="${col}"/>`;
}

/* ---- build ---- */
function makeFrontRig(cast){
  const c=Object.assign({}, COSTUME0, cast.c||{}, cast.with||{});
  const id='r'+(RIG_ID++), J=n=>`data-fj="${id}:${n}"`;
  const skin=c.skin, skinSh=shade(skin,-.18);
  const bottom=c.bottom||'#8e1d24', top=c.top||'#1f2640';

  const legW0=15, legW1=12, shinW0=12, shinW1=9.5, legLen=86, shinLen=82;
  const armW0=12, armW1=9, foreW0=9.5, foreW1=7.2, armLen=62, foreLen=56;

  const leg=(n,col)=>`<g ${J(n)}>${limbF(legLen,legW0,legW1,col,n==='R')}
    <g ${J(n+'K')} transform="translate(0 ${legLen})">${limbF(shinLen,shinW0,shinW1,shade(col,-.08),n==='R')}
      <rect x="${-shinW1}" y="${shinLen-8}" width="${shinW1*2}" height="6" rx="2" fill="url(#gold)" opacity=".85"/>
      <g ${J(n+'F')} transform="translate(0 ${shinLen})"><path d="M-14 0 L14 0 L18 13 Q0 22 -20 13Z" fill="${shade(skin,-.35)}"/></g>
    </g></g>`;
  const arm=(n,col,isLeft,handKind)=>`<g ${J(n)}>${limbF(armLen,armW0,armW1,col,!isLeft)}
    <g ${J(n+'E')} transform="translate(0 ${armLen})">${limbF(foreLen,foreW0,foreW1,shade(col,.03),!isLeft)}
      <g ${J(n+'H')} transform="translate(0 ${foreLen})"><g ${J(n+'Hk')}>${handF(handKind||'fist',col)}</g></g>
    </g></g>`;

  const torso=`<g ${J('torso')}>
    <path d="M-48 -214 C-55 -196 -52 -172 -46 -148 C-41 -122 -38 -92 -36 -56 L36 -56 C38 -92 41 -122 46 -148 C52 -172 55 -196 48 -214 C38 -228 -38 -228 -48 -214Z" fill="${top}"/>
    <path d="M-36 -202 C-25 -193 -9 -189 0 -191 C9 -189 25 -193 36 -202" stroke="#000" stroke-opacity=".22" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M-48 -214 C-55 -196 -52 -172 -46 -148 C-41 -122 -38 -92 -36 -56 L-27 -56 C-29 -92 -32 -122 -36 -148 C-40 -172 -42 -196 -38 -214Z" fill="#000" opacity=".16"/>
    <path d="M48 -214 C55 -196 52 -172 46 -148 C41 -122 38 -92 36 -56 L27 -56 C29 -92 32 -122 36 -148 C40 -172 42 -196 38 -214Z" fill="#fff" opacity=".06"/>
    ${c.sash?`<path d="M-44 -210 C-18 -178 8 -130 28 -62 L15 -55 C-5 -118 -28 -164 -48 -196Z" fill="${c.sash}"/><path d="M-44 -210 C-18 -178 8 -130 28 -62" stroke="url(#gold)" stroke-width="3" fill="none"/>`:''}
    <rect ${J('belt')} x="-40" y="-60" width="80" height="15" rx="3" fill="url(#gold)"/>
    <circle cx="0" cy="-52" r="7.5" fill="#fff3c4" stroke="#a8741a" stroke-width="2"/>
  </g>`;

  const face=`
    <path d="M-27 -258 C-31 -284 -18 -304 0 -304 C18 -304 31 -284 27 -258 C25 -244 17 -234 0 -232 C-17 -234 -25 -244 -27 -258Z" fill="${skin}"/>
    <path d="M-19 -242 C-11 -235 11 -235 19 -242 L17 -238 C9 -233 -9 -233 -17 -238Z" fill="#000" opacity=".13"/>
    <path d="M-23 -264 Q-25 -251 -19 -242" stroke="#fff" stroke-opacity=".10" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M23 -264 Q25 -251 19 -242" stroke="#000" stroke-opacity=".12" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g ${J('eyeL')} transform="translate(-12.5 -274)"><path d="M-6.5 0 Q0 -5 6.5 0 Q0 4 -6.5 0Z" fill="${c.eyeCol||'#f3ead8'}"/>
      <circle ${J('pupL')} cx="0" cy="0" r="2.4" fill="${c.pupilCol||'#2a1710'}"/><circle cx="0.6" cy="-0.6" r=".8" fill="#fff"/>
      <path d="M-7.5 -1 Q0 -7 7.5 -1" stroke="#140a06" stroke-width="2" fill="none" stroke-linecap="round"/></g>
    <g ${J('eyeR')} transform="translate(12.5 -274)"><path d="M6.5 0 Q0 -5 -6.5 0 Q0 4 6.5 0Z" fill="${c.eyeCol||'#f3ead8'}"/>
      <circle ${J('pupR')} cx="0" cy="0" r="2.4" fill="${c.pupilCol||'#2a1710'}"/><circle cx="0.6" cy="-0.6" r=".8" fill="#fff"/>
      <path d="M7.5 -1 Q0 -7 -7.5 -1" stroke="#140a06" stroke-width="2" fill="none" stroke-linecap="round"/></g>
    <g ${J('browL')} transform="translate(-12.5 -282)"><path d="M-8.5 0 Q0 -4 8.5 1" stroke="#140a06" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
    <g ${J('browR')} transform="translate(12.5 -282)"><path d="M8.5 0 Q0 -4 -8.5 1" stroke="#140a06" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
    <path ${J('mouth')} d="M-8 -241 Q0 -237 9 -241.5" stroke="#5a2a1c" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <g ${J('earL')} transform="translate(-25 -252.5)"><ellipse rx="3.6" ry="6.4" fill="${shade(skin,-.08)}"/>${c.earring?`<circle cy="7" r="3" fill="none" stroke="#e8b83a" stroke-width="1.5"/>`:''}</g>
    <g ${J('earR')} transform="translate(25 -252.5)"><ellipse rx="3.6" ry="6.4" fill="${shade(skin,-.08)}"/>${c.earring?`<circle cy="7" r="3" fill="none" stroke="#e8b83a" stroke-width="1.5"/>`:''}</g>`;
  const nose=`<g ${J('nose')}>
    <path d="M-2 -272 Q-4.5 -261 -3 -254 Q0 -251 3 -254 Q4.5 -261 2 -272Z" fill="${shade(skin,-.14)}" opacity=".55"/>
    <path d="M-3 -254 Q0 -250 3 -254" stroke="#000" stroke-opacity=".28" stroke-width="1.4" fill="none"/></g>`;

  const hairPath = c.hair==='none' ? '' : `<g ${J('hair')}>
    <path d="M-29 -262 C-35 -290 -19 -310 0 -310 C19 -310 35 -290 29 -262
             C33 -272 35 -286 29 -296 C23 -306 10 -312 0 -312 C-10 -312 -23 -306 -29 -296 C-35 -286 -33 -272 -29 -262Z" fill="#0d0a10"/>
    <path d="M-29 -262 C-42 -244 -46 -206 -44 -168 L-33 -168 C-33 -204 -29 -236 -21 -256Z" fill="#0d0a10"/>
    <path d="M29 -262 C42 -244 46 -206 44 -168 L33 -168 C33 -204 29 -236 21 -256Z" fill="#0d0a10"/>
    <path d="M-29 -296 Q0 -306 29 -296" stroke="#2a2030" stroke-width="2" fill="none" opacity=".55"/></g>`;

  const crown = c.head==='crown' ? `
    <path d="M-25 -294 L-29 -325 L-15 -309 L-7 -336 L0 -305 L7 -336 L15 -309 L29 -325 L25 -294Z" fill="url(#gold)" stroke="#8a5a14" stroke-width="1"/>
    <path d="M-25 -294 Q0 -287 25 -294 L25 -288 Q0 -281 -25 -288Z" fill="url(#gold)"/>
    <circle cx="0" cy="-292" r="4.2" fill="#d63a2a" stroke="#ffd25e" stroke-width="1.2"/>
    <circle cx="-13" cy="-290" r="2.1" fill="#2ec28a"/><circle cx="13" cy="-290" r="2.1" fill="#2ec28a"/>
    <path d="M0 -282 L0 -273" stroke="#d63a2a" stroke-width="2.2"/>` : '';

  const headGroup=`<g ${J('neck')}><rect x="-8" y="-234" width="16" height="20" fill="${skin}"/><path d="M-8 -234 L8 -234 L8 -215 L-8 -215Z" fill="#000" opacity=".12"/>
    <g ${J('head')}>${face}${nose}${hairPath}${crown}</g></g>`;

  const legs=`<g ${J('legs')}>
    <g ${J('hipR')} transform="translate(21 -48)">${leg('R', bottom)}</g>
    <g ${J('hipL')} transform="translate(-21 -48)">${leg('L', shade(bottom,.07))}</g>
  </g>`;
  const arms=`
    <g ${J('shR')} transform="translate(46 -206)">${arm('R', skinSh, false)}</g>
    <g ${J('shL')} transform="translate(-46 -206)">${arm('L', skin, true)}</g>`;

  const aura = (cast.aura||c.aura) ? `<g ${J('aura')}><circle cx="0" cy="-170" r="200" fill="url(#${cast.aura||c.aura})" opacity=".6"/></g>` : '';
  const svgInner=`<g ${J('root')}>${aura}<ellipse ${J('shadow')} cx="0" cy="186" rx="64" ry="11" fill="#000" opacity=".35"/>
    ${legs}<g ${J('upper')}>${torso}${headGroup}${arms}</g></g>`;

  return {id, c, cast, svg:svgInner, frontRig:true, seed:RIG_ID*1.37};
}

function bindFrontRig(r, root){
  const q={}; root.querySelectorAll(`[data-fj^="${r.id}:"]`).forEach(e=>{ q[e.getAttribute('data-fj').split(':')[1]]=e; });
  r.q=q;
  r.keys=(r.cast.acts||[[0,r.cast.pose||'stand']]).map(k=>({t:k[0],p:poseOfFront(k[1]),d:k[2]||0.5})).sort((a,b)=>a.t-b.t);
  if(r.keys[0].t>0) r.keys.unshift({t:0,p:poseOfFront(r.cast.pose||'stand'),d:0});
}
function poseAtFront(r,lt){
  const K=r.keys; let i=0; while(i+1<K.length && K[i+1].t<=lt) i++;
  const cur=K[i]; if(i===0||lt-cur.t>=cur.d) return cur.p;
  return blendPoseFront(K[i-1].p, cur.p, easeIO((lt-cur.t)/cur.d));
}
function foreshortenFront(fwdDeg, maxDeg){ const k=Math.max(-1,Math.min(1, fwdDeg/maxDeg)); return {scale:1-0.5*Math.abs(k), slide:k*14}; }

/* Called every frame, same signature as the side rig's updateRig. */
function updateFrontRigShot(r, lt, t, talking){
  const q=r.q; if(!q) return;
  let P=Object.assign({}, poseAtFront(r, lt));
  const cast=r.cast;
  let x=cast.x||270, y=cast.y||840, s=cast.s||1, flip=cast.flip?-1:1, op=1;
  if(cast.enter){ const e=cast.enter; op=clamp01((lt-(e.delay||0))/(e.fade||0.8)); if(e.rise) y+=(1-easeIO(op))*e.rise; }
  if(cast.exit){ const e=cast.exit; op*=1-clamp01((lt-e.at)/(e.fade||0.8)); }
  if(cast.walk){ const w=cast.walk, k=clamp01((lt-(w.delay||0))/(w.dur||3)); x += (w.from||-200)*(1-(1-Math.pow(1-k,1.7)))*flip; }
  q.root.setAttribute('opacity', op.toFixed(3));

  let footLiftL=0, footLiftR=0;
  if(cast.walk){
    const w=cast.walk, k=clamp01((lt-(w.delay||0))/(w.dur||3));
    const ph=lt*2*Math.PI*1.3, stride=k<1?1:0;
    P.lHipFwd+=24*Math.sin(ph)*stride;       P.lKnee+=(8+22*Math.max(0,-Math.cos(ph)))*stride;
    P.rHipFwd+=24*Math.sin(ph+Math.PI)*stride; P.rKnee+=(8+22*Math.max(0,-Math.cos(ph+Math.PI)))*stride;
    P.lArmFwd+=-16*Math.sin(ph)*stride;      P.rArmFwd+=-16*Math.sin(ph+Math.PI)*stride;
    P.drop += Math.abs(Math.cos(ph))*-2.6*stride;
    footLiftL = Math.max(0, Math.sin(ph))*10*stride;
    footLiftR = Math.max(0, Math.sin(ph+Math.PI))*10*stride;
  }

  // expression attitude, reusing the side rig's ATTITUDE table so moods stay consistent across both views
  let ex=cast.expr||'calm', exT=0;
  if(cast.exprKeys) for(const k of cast.exprKeys) if(lt>=k[0]){ ex=k[1]; exT=k[0]; }
  const at=ATTITUDE[ex], ak=smooth01((lt-exT)/0.6);
  if(at){ P.headTilt+=(at.head||0)*ak*0.6; P.lean+=(at.lean||0)*ak; }

  const breathe=Math.sin(t*2.1+r.seed)*1.0;
  setT(q.root, `translate(${n1(x)} ${n1(y+P.drop)}) scale(${n1(s*flip)} ${n1(s)})`);
  setT(q.upper, `rotate(${n1(P.lean)} 0 -150) translate(0 ${n1(breathe*0.5)})`);

  const yawShift=P.headYaw*0.22;
  setT(q.head, `translate(${n1(yawShift)} 0) rotate(${n1(P.headTilt)} 0 -234)`);
  const yk=clamp01(Math.abs(P.headYaw)/24), toR=P.headYaw>0;
  const farScale=1-1.0*yk, nearShift=(toR?-1:1)*yk*6.5;
  setT(q.hair, `translate(${n1((toR?1:-1)*yk*5.5)} 0) scale(${n1(1-0.16*yk)} 1)`);
  setT(q.eyeL, `translate(${n1(-12.5+(toR?0:nearShift))} -274) scale(${n1(toR?farScale:1+0.14*yk)} 1)`);
  setT(q.eyeR, `translate(${n1(12.5+(toR?nearShift:0))} -274) scale(${n1(toR?1+0.14*yk:farScale)} 1)`);
  setT(q.earL, `translate(${n1(-25-(toR?9*yk:0))} -252.5) scale(${n1(toR?farScale:1)})`);
  setT(q.earR, `translate(${n1(25+(toR?0:9*yk))} -252.5) scale(${n1(toR?1:farScale)})`);
  setT(q.browL, `translate(${n1(-12.5+(toR?-farScale*0.5:nearShift*0.4))} -282) scale(${n1(toR?farScale:1)} 1)`);
  setT(q.browR, `translate(${n1(12.5+(toR?nearShift*0.4:0))} -282) scale(${n1(toR?1:farScale)} 1)`);
  setT(q.nose, `translate(${n1((toR?1:-1)*yk*12)} 0) scale(${n1(1-0.4*yk)} 1)`);
  if(q.pupL) q.pupL.setAttribute('cx', n1((toR?-1:1)*2.6*yk));
  if(q.pupR) q.pupR.setAttribute('cx', n1((toR?-1:1)*2.6*yk));
  if(q.mouth) q.mouth.setAttribute('transform', `translate(${n1((toR?1:-1)*yk*4)} 0) scale(${n1(1-0.22*yk)} 1)`);

  const lThigh=foreshortenFront(P.lHipFwd,30), rThigh=foreshortenFront(P.rHipFwd,30);
  setT(q.hipL, `translate(-21 -48) rotate(${n1(lThigh.slide*0.6)}) scale(1 ${n1(lThigh.scale)})`);
  setT(q.hipR, `translate(21 -48) rotate(${n1(-rThigh.slide*0.6)}) scale(1 ${n1(rThigh.scale)})`);
  setT(q.LK, `translate(0 ${n1(86-footLiftL)}) scale(1 ${n1(1-Math.min(.32,P.lKnee/150))})`);
  setT(q.RK, `translate(0 ${n1(86-footLiftR)}) scale(1 ${n1(1-Math.min(.32,P.rKnee/150))})`);
  setT(q.LF, `translate(0 82) rotate(${n1(-footLiftL*2.2)})`);
  setT(q.RF, `translate(0 82) rotate(${n1(-footLiftR*2.2)})`);

  const lFore=foreshortenFront(P.lArmFwd,60), rFore=foreshortenFront(P.rArmFwd,60);
  // once an arm lifts above shoulder height (Out>90), a NEGATIVE ArmFwd (swinging toward the camera/up)
  // adds extra rotation instead of just foreshortening, so the hand keeps rising toward straight overhead
  const liftL = P.lArmOut>90 ? Math.max(0,-P.lArmFwd)*0.9 : 0, liftR = P.rArmOut>90 ? Math.max(0,-P.rArmFwd)*0.9 : 0;
  setT(q.shL, `translate(-46 -206) rotate(${n1(P.lArmOut+liftL)}) scale(${n1(lFore.scale)} ${n1(lFore.scale)})`);
  setT(q.shR, `translate(46 -206) rotate(${n1(-(P.rArmOut+liftR))}) scale(${n1(rFore.scale)} ${n1(rFore.scale)})`);
  setT(q.LE, `translate(0 62) rotate(${n1(-P.lElbow)})`);
  setT(q.RE, `translate(0 62) rotate(${n1(P.rElbow)})`);

  if(cast.talk && talking>0){
    const open=(0.3+0.5*Math.abs(Math.sin(t*15.5+Math.sin(t*4))))*talking;
    setT(q.mouth, (q.mouth.getAttribute('transform')||'')+` scale(1 ${n1(1+open*1.6)})`);
  }
  if(q.aura) q.aura.setAttribute('opacity', (0.75+0.25*Math.sin(t*1.6)).toFixed(3));
}
