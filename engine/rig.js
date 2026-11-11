/* =====================================================================
   RIG: jointed side-profile character (faces right, feet at y=0,
   about 330 units tall). Joints: shoulders, elbows, wrists (props),
   hips, knees, ankles, neck, waist (lean). Automatic life: blinking,
   breathing, cape/hair sway, talking mouth, walk cycle, eased
   pose-to-pose transitions.

   Angles (degrees):
     a/b = front/back arm  [shoulder, elbow]  (+ = swing forward / bend up)
     f/k = front/back leg  [hip, knee]        (+hip = forward, +knee = bend back)
     head (+ = look up), lean (+ = bow forward), drop (body lowered, kneel = 72)
     draw (0..1 bowstring pull), kt (back-foot extra rotation)
   ===================================================================== */
const POSE0 = {a:[6,10], b:[-6,8], f:[3,3], k:[-3,3], head:0, lean:0, drop:0, draw:0, kt:0, hand:'fist', handB:'fist'};
const KNEEL = {f:[88,92], k:[2,92], drop:72, kt:160};
const POSES = {
  stand:{}, relax:{a:[3,4], b:[-3,4]},
  point:{a:[96,0], head:4},           // arm straight out ahead
  armUp:{a:[162,0], head:12, hand:'open'},
  bless:{a:[28,104], hand:'open'},    // abhaya mudra, palm raised
  offer:{a:[58,26], b:[52,30], hand:'open', handB:'open', lean:6},
  give:{a:[70,8], hand:'open', lean:4},
  namaste:{a:[28,112], b:[22,118], hand:'namaste', handB:'namaste'},
  think:{a:[26,142], head:-6},
  fist:{a:[64,96], head:6},
  shock:{a:[40,70], b:[34,74], hand:'open', handB:'open', lean:-8, head:8},
  bowReady:{a:[78,0], b:[18,40]},
  bowDraw:{a:[88,0], b:[86,165], draw:1, head:2},
  carry:{a:[22,60]},                  // mace / staff held at chest
  shoulder:{a:[24,128]},              // weapon resting on shoulder
  pranam:{lean:16, head:-12, a:[22,64], b:[18,68], hand:'namaste', handB:'namaste'},
  lookUp:{head:18}, lookDown:{head:-14},
  kneel:KNEEL,
  kneelPray:Object.assign({}, KNEEL, {a:[28,112], b:[22,118], hand:'namaste', handB:'namaste'}),
  kneelOffer:Object.assign({}, KNEEL, {a:[58,26], b:[52,30], hand:'open', handB:'open', lean:6}),
  kneelBow:Object.assign({}, KNEEL, {lean:34, head:-18, a:[24,64], b:[18,68], hand:'namaste', handB:'namaste'}),
};
/* 'kneel+namaste' merges left to right; objects are merged too. */
function poseOf(p){
  if(!p) return Object.assign({}, POSE0);
  if(typeof p==='object') return Object.assign({}, POSE0, p);
  return Object.assign({}, POSE0, ...p.split('+').map(n=>{ if(!POSES[n]) console.warn('unknown pose',n); return POSES[n]||{}; }));
}
const lerp=(a,b,k)=>a+(b-a)*k, clamp01=k=>Math.max(0,Math.min(1,k));
const easeIO=k=>{ k=clamp01(k); return k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; };
function blendPose(A,B,k){
  const o={};
  for(const key in A){ const x=A[key], y=B[key];
    if(Array.isArray(x)) o[key]=[lerp(x[0],y[0],k), lerp(x[1],y[1],k)];
    else if(typeof x==='number') o[key]=lerp(x,y,k);
    else o[key]= k<.5?x:y; }
  return o;
}
function shade(hex,amt){ const n=parseInt(hex.slice(1),16); let r=n>>16, g=(n>>8)&255, b=n&255;
  const f=v=>Math.round(Math.max(0,Math.min(255, amt<0? v*(1+amt) : v+(255-v)*amt)));
  return '#'+((1<<24)+(f(r)<<16)+(f(g)<<8)+f(b)).toString(16).slice(1); }

const COSTUME0 = {skin:'#8c6248', top:'#1f2640', bottom:'#8e1d24', shin:null, foot:null, sleeve:null, skirt:false,
  trim:'url(#gold)', hair:'long', head:'crown', beard:null, mus:false, cape:null, quiver:false, garland:null, sash:null,
  veil:null, turban:'#ece5d4', tilak:false, earring:true, big:false, aura:null, jewel:true};

let RIG_ID=0;
/* Build one character. cast = {c:COSTUME, x, y, s, flip, acts:[[t,pose,dur?],...], expr, eyes, talk,
   props:{front:'bow'|'mace'|..., back:...}, walk:{from:dx, dur, delay}, enter:{fade,delay}, aura, glow} */
function makeRig(cast){
  const c=Object.assign({}, COSTUME0, cast.c||{}, cast.with||{});
  const id='r'+(RIG_ID++), J=n=>`data-j="${id}:${n}"`;
  const skin=c.skin, skinB=shade(skin,-.22), dark='#0d0a10';
  const legC=c.bottom, shinC=c.shin||c.bottom, footC=c.foot||shade(skin,-.15);
  const wide=c.big?1.22:1, legW=c.skirt?1.35:1;
  const props=Object.assign({}, cast.props||{});

  const leg=(n,back)=>{ const lc=back?shade(legC,-.25):legC, sc=back?shade(shinC,-.25):shinC, fc=back?shade(footC,-.2):footC;
    return `<g ${J(n)}><rect x="${-14*legW}" y="-8" width="${28*legW}" height="88" rx="${13*legW}" fill="${lc}"/>`+
      `<g ${J(n+'K')}><rect x="${-11.5*legW}" y="-6" width="${23*legW}" height="80" rx="${10*legW}" fill="${sc}"/>`+
      (c.skirt?'':`<rect x="-11.5" y="62" width="23" height="5" fill="url(#gold)" opacity=".85"/>`)+
      `<g ${J(n+'F')}><path d="M-10 -9 L12 -9 Q26 -6 27 0 L-10 0Z" fill="${fc}"/></g></g></g>`; };

  const hand=(n,col)=>`<g ${J(n+'_fist')}><circle r="7" fill="${col}"/></g>`+
    `<g ${J(n+'_open')} style="display:none"><path d="M-6 -3 Q-8 9 -3 17 L4 17 Q8 8 6 -3Z" fill="${col}"/><path d="M5 2 Q11 4 11 9" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`+
    `<g ${J(n+'_namaste')} style="display:none"><ellipse cx="0" cy="9" rx="5" ry="12" fill="${col}"/></g>`;

  const arm=(n,back)=>{ const col=back?skinB:skin, sl=c.sleeve?(back?shade(c.sleeve,-.25):c.sleeve):col;
    return `<g ${J(n)}><line x1="0" y1="0" x2="0" y2="50" stroke="${sl}" stroke-width="${13*wide}" stroke-linecap="round"/>`+
      (c.jewel?`<line x1="${-6.5*wide}" y1="16" x2="${6.5*wide}" y2="16" stroke="#d9a73a" stroke-width="3"/>`:'')+
      `<g ${J(n+'E')}><line x1="0" y1="0" x2="0" y2="46" stroke="${col}" stroke-width="${11*wide}" stroke-linecap="round"/>`+
      (c.jewel?`<line x1="-5.5" y1="38" x2="5.5" y2="38" stroke="#e8b83a" stroke-width="2.5"/>`:'')+
      `<g ${J(n+'H')}>${hand(n,col)}<g ${J(n+'P')}>${prop(back?props.back:props.front, n)}</g></g></g></g>`; };

  function prop(p, n){ if(!p) return '';
    switch(p){
      case 'bow': return `<path d="M-6 -162 Q46 -32 -6 128" stroke="#6a4218" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-6 -162 Q46 -32 -6 128" stroke="#d9a73a" stroke-width="2" fill="none"/>`+
        `<polyline ${J('string')} points="-6,-162 -6,-17 -6,128" stroke="#efe6cc" stroke-width="1.3" fill="none"/>`+
        `<g ${J('arrow')} style="display:none"><line x1="0" y1="0" x2="150" y2="0" stroke="#d9c08a" stroke-width="2.6"/><polygon points="150,-5 164,0 150,5" fill="#e9e1c8"/><path d="M0 0 l-10 -6 M0 0 l-10 6" stroke="#ff4a3c" stroke-width="2.4"/></g>`;
      case 'mace': return `<line x1="-2" y1="22" x2="6" y2="-96" stroke="#6a4218" stroke-width="7" stroke-linecap="round"/><ellipse cx="8" cy="-120" rx="21" ry="33" fill="url(#gold)"/><path d="M-12 -120 h40 M-6 -142 h28 M-6 -98 h28" stroke="#8a5a1a" stroke-width="2"/><circle cx="8" cy="-156" r="5" fill="url(#gold)"/>`;
      case 'staff': return `<line x1="0" y1="-120" x2="0" y2="150" stroke="#5a3c1c" stroke-width="5" stroke-linecap="round"/>`;
      case 'lantern': return `<g transform="translate(0 16)"><line x1="0" y1="-14" x2="0" y2="0" stroke="#6a4a22" stroke-width="2"/>${A('flick:9','<circle r="90" fill="url(#saf)"/>')}<path d="M-8 0 h16 l-2 20 h-12Z" fill="#7a5420"/><rect x="-5" y="3" width="10" height="13" fill="#ffd27a"/><path d="M-9 0 L0 -8 L9 0Z" fill="#5a3a14"/></g>`;
      case 'diya': return `<g transform="translate(0 -8)">${A('flick:7','<circle cy="-14" r="46" fill="url(#saf)"/>')}<path d="M-14 0 Q0 12 14 0 L10 -6 L-10 -6Z" fill="#a8582a"/><path d="M4 -6 Q8 -18 2 -26 Q-2 -16 4 -6Z" fill="#ffd27a"/></g>`;
      case 'lotus': return `<g transform="translate(0 -10)">${[-50,-25,0,25,50].map(r=>`<ellipse rx="5" ry="14" transform="rotate(${r}) translate(0 -10)" fill="${r?'#f3a6c0':'#ffd0dc'}"/>`).join('')}</g>`;
      case 'trishul': return `<line x1="0" y1="-190" x2="0" y2="150" stroke="#b9b2a0" stroke-width="5"/><path d="M-22 -200 Q-22 -170 0 -168 Q22 -170 22 -200 M0 -168 L0 -230" stroke="#d9d2c0" stroke-width="5" fill="none"/><path d="M-26 -198 l4 -14 l4 14Z M22 -198 l4 -14 l4 14Z M-4 -228 l4 -16 l4 16Z" fill="#d9d2c0"/>`;
      case 'sword': return `<g transform="rotate(-90)"><rect x="-3" y="-8" width="6" height="16" fill="#6a4218"/><rect x="-10" y="6" width="20" height="4" fill="url(#gold)"/><path d="M-3 10 L3 10 L2 96 L0 104 L-2 96Z" fill="#dfe3ea"/></g>`;
      case 'arrows3': return ['#ff4a3c','#4ee08a','#ffd25e'].map((col,i)=>`<g transform="rotate(${-58+i*14})"><line x1="0" y1="0" x2="72" y2="0" stroke="${col}" stroke-width="3"/><polygon points="72,-6 88,0 72,6" fill="${col}"/>${A('pulse:3','<circle cx="80" cy="0" r="7" fill="'+col+'" opacity=".45"/>')}<path d="M0 0 l-8 -5 M0 0 l-8 5" stroke="${col}" stroke-width="2"/></g>`).join('');
      case 'orb': return `<g transform="translate(14 -8)">${A('pulse:2','<circle r="54" fill="url(#gw)"/>')}<circle r="18" fill="#fff3c4"/></g>`;
      case 'chakra': { let t=''; for(let i=0;i<16;i++) t+=`<path d="M0 -30 L4 -36 L-4 -36Z" transform="rotate(${i*22.5})" fill="#ffd25e"/>`;
        return `<g transform="translate(0 -40)">${A('spin:1.2:0:0',`<circle r="40" fill="url(#gw)" opacity=".7"/><circle r="28" fill="none" stroke="#ffd25e" stroke-width="4"/>${t}<circle r="6" fill="#ffd25e"/>`)}</g>`; }
      case 'flute': return `<g transform="rotate(-80)"><rect x="-3" y="-60" width="6" height="110" rx="3" fill="#a8742a"/><circle cx="0" cy="-30" r="1.6" fill="#3a2010"/><circle cx="0" cy="-15" r="1.6" fill="#3a2010"/><circle cx="0" cy="0" r="1.6" fill="#3a2010"/></g>`;
      default: return '';
    } }
  const UPRIGHT={bow:1,mace:1,staff:1,lantern:1,diya:1,lotus:1,trishul:1,orb:1,chakra:1,arrows3:1};

  /* ---- head ---- */
  let head='';
  if(c.veil) head+=`<path d="M-18 -292 C-40 -270 -50 -220 -56 -150 L-30 -150 C-28 -210 -20 -250 -8 -276Z" fill="${c.veil}"/>`;
  if(c.hair==='long' && !c.veil) head+=`<g ${J('hair')}><path d="M-12 -272 C-30 -262 -34 -230 -40 -196 L-22 -204 C-20 -226 -14 -244 -6 -256Z" fill="${dark}"/></g>`;
  if(c.hair==='bun') head+=`<circle cx="-16" cy="-280" r="11" fill="${dark}"/>`;
  if(c.head==='jata') head+=`<g ${J('hair')}><path d="M-16 -272 C-46 -262 -52 -220 -58 -170 L-40 -180 C-36 -220 -28 -246 -8 -258Z" fill="${dark}"/></g><path d="M-14 -284 C-18 -320 10 -330 18 -300 L16 -286Z" fill="${dark}"/><path d="M2 -318 a12 12 0 1 0 10 -10 a9 9 0 1 1 -10 10Z" fill="#f3ecd2"/>`;
  head+=`<rect x="-6" y="-254" width="14" height="20" fill="${skin}"/><path d="M-6 -254 L8 -254 L8 -234 L-6 -234Z" fill="#000" opacity=".15"/>`;
  head+=`<path d="M-14 -262 C-16 -286 0 -294 14 -288 C22 -284 24 -276 24 -270 L32 -260 L24 -258 C24 -252 22 -248 16 -246 L-6 -244Z" fill="${skin}"/>`;
  if(c.head!=='turban' && !c.veil && c.head!=='jata' && c.hair!=='none') head+=`<path d="M-16 -268 C-20 -292 0 -300 18 -290 L14 -280 C2 -284 -8 -282 -12 -262Z" fill="${dark}"/>`;
  if(c.beard) head+=`<path d="M6 -248 Q26 -246 22 -222 Q12 -210 2 -222 Q-4 -236 -2 -246Z" fill="${c.beard==='white'?'#e7e1d4':dark}"/>`;
  // eye (almond, kajal line) with blink
  head+=`<g ${J('eye')}><path d="M9 -270.5 Q15 -275.5 21.5 -270 Q15 -267.4 9 -270.5Z" fill="#f3ead8"/><circle ${J('pupil')} cx="16.8" cy="-270.6" r="2" fill="#1a0f08"/><path d="M8.5 -271 Q15 -276.5 22 -270" stroke="#140a06" stroke-width="1.7" fill="none"/></g>`;
  head+=`<path ${J('lid')} d="M9 -270.5 q6.5 3 12.5 0" stroke="#140a06" stroke-width="2" fill="none" style="display:none"/>`;
  head+=`<path ${J('brow')} d="M8 -278 Q15 -281.5 22.5 -277.5" stroke="${c.beard==='white'?'#d9d2c4':dark}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  // mouth variants
  head+=`<path ${J('m_neutral')} d="M17 -251 q4 0 7 -1" stroke="#3a1a10" stroke-width="2" fill="none"/>`+
        `<path ${J('m_smile')} d="M16.5 -252.5 q4 3.5 8.5 -1" stroke="#3a1a10" stroke-width="2" fill="none" style="display:none"/>`+
        `<path ${J('m_sad')} d="M17 -250 q4 -2.5 7.5 0" stroke="#3a1a10" stroke-width="2" fill="none" style="display:none"/>`+
        `<ellipse ${J('m_open')} cx="21" cy="-251" rx="3" ry="1.5" fill="#3a1010" style="display:none"/>`;
  if(c.mus) head+=`<path d="M12 -254 q8 -4 15 1" stroke="${dark}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
  if(c.tilak) head+=`<path d="M20 -287 l1 7" stroke="#d63a2a" stroke-width="2.2"/>`;
  if(c.head==='turban') head+=`<path d="M-22 -270 C-24 -296 2 -306 24 -290 C30 -284 28 -276 22 -276 C10 -280 -4 -282 -18 -264Z" fill="${c.turban}"/><circle cx="-22" cy="-286" r="9" fill="${c.turban}"/>`;
  if(c.head==='crown'||c.head==='feather') head+=`<path d="M-16 -286 L-12 -318 L-4 -300 L2 -326 L8 -300 L16 -316 L18 -286Z" fill="url(#gold)"/><circle cx="2" cy="-296" r="3" fill="#d63a2a"/>`;
  if(c.head==='feather') head+=`<g transform="translate(0 -322) rotate(-14)"><path d="M0 0 Q-6 -24 0 -46" stroke="#3a7a4f" stroke-width="2.5" fill="none"/><ellipse cx="0" cy="-48" rx="9" ry="15" fill="#2e9a86"/><ellipse cx="0" cy="-48" rx="5.5" ry="9" fill="#1f5fb0"/><ellipse cx="0" cy="-48" rx="2.5" ry="4.5" fill="#e8c24a"/></g>`;
  if(c.head==='band') head+=`<path d="M-16 -282 Q2 -292 20 -284 L20 -277 Q2 -285 -16 -275Z" fill="url(#gold)"/><circle cx="4" cy="-286" r="2.6" fill="#d63a2a"/>`;
  if(c.head==='big') head+=`<path d="M-18 -284 L-16 -326 L-6 -308 L2 -340 L10 -308 L20 -324 L20 -284Z" fill="url(#gold)"/><circle cx="2" cy="-300" r="4" fill="#d63a2a"/><circle cx="-8" cy="-292" r="2" fill="#2ec28a"/><circle cx="12" cy="-292" r="2" fill="#2ec28a"/>`;
  if(c.veil) head+=`<path d="M-20 -290 C0 -306 22 -300 24 -284 C14 -290 0 -290 -12 -278 C-16 -270 -18 -262 -16 -250 L-24 -250 C-26 -270 -26 -284 -20 -290Z" fill="${c.veil}"/><path d="M-20 -290 C0 -306 22 -300 24 -284" stroke="url(#gold)" stroke-width="2.4" fill="none"/>`;
  if(c.earring && c.head!=='turban') head+=`<circle cx="-4" cy="-256" r="4" fill="none" stroke="#e8b83a" stroke-width="2"/>`;

  /* ---- torso ---- */
  let torso=`<g transform="scale(${wide} 1)"><path d="M-8 -238 C-28 -234 -34 -214 -34 -192 L-28 -148 L26 -148 L28 -194 C28 -222 18 -236 8 -238Z" fill="${c.top}"/>`;
  if(c.skirt) torso+=`<path d="M-30 -150 C-30 -170 -28 -190 -26 -200 L28 -160 L26 -150Z" fill="${c.bottom}"/>`;
  else if(c.trim) torso+=`<path d="M-30 -156 L28 -156 L28 -146 L-30 -146Z" fill="${c.trim}"/>`;
  if(c.sash) torso+=`<path d="M-34 -220 C-10 -200 10 -170 26 -150 L10 -150 C-6 -176 -22 -196 -36 -206Z" fill="${c.sash}"/>`;
  if(c.jewel && !c.skirt) torso+=`<path d="M-22 -230 Q2 -196 22 -228" stroke="url(#gold)" stroke-width="3" fill="none"/>`;
  if(c.garland) torso+=`<path d="M-22 -234 Q2 -160 22 -230" stroke="${c.garland}" stroke-width="6" fill="none" stroke-dasharray="1 5" stroke-linecap="round"/>`;
  torso+='</g>';

  let back='';
  if(c.cape) back+=`<g ${J('cape')}><path d="M-20 -232 C-56 -200 -78 -110 -96 -4 L-30 -4 C-36 -80 -30 -160 -10 -226Z" fill="${c.cape}"/><path d="M-20 -232 C-56 -200 -78 -110 -96 -4 L-80 -4 C-62 -100 -44 -180 -16 -228Z" fill="#000" opacity=".25"/></g>`;
  if(c.quiver) back+=`<g transform="rotate(-18 -18 -200)"><rect x="-34" y="-260" width="18" height="110" rx="5" fill="#4a2c18" stroke="#c99a3a" stroke-width="2"/><path d="M-31 -260 l3 -18 l3 18Z" fill="#ff4a3c"/><path d="M-26 -260 l3 -24 l3 24Z" fill="#4ee08a"/><path d="M-21 -260 l3 -18 l3 18Z" fill="#ffd25e"/></g>`;
  const skirtFlare = c.skirt ? `<path ${J('skirt')} d="M-30 -150 C-38 -100 -46 -50 -52 -2 L48 -2 C42 -50 36 -100 28 -150Z" fill="${c.bottom}"/><path d="M-52 -10 L48 -10 L48 -2 L-52 -2Z" fill="url(#gold)"/>` : '';

  const aura = (cast.aura||c.aura) ? `<g ${J('aura')}><circle cx="0" cy="-170" r="200" fill="url(#${cast.aura||c.aura})" opacity=".6"/></g>` : '';
  const svg = `<g ${J('root')}>${aura}<ellipse ${J('shadow')} cx="4" cy="0" rx="56" ry="9" fill="#000" opacity=".35"/>`+
    `<g ${J('body')}>`+
      `<g ${J('upperB')}>${back}${arm('B',true)}</g>`+
      leg('K',true)+leg('F',false)+skirtFlare+
      `<g ${J('upper')}>${torso}<g ${J('head')}>${head}</g>${arm('A',false)}</g>`+
    `</g></g>`;

  return {id, c, cast, svg, props, UPRIGHT, seed:RIG_ID*1.37};
}

/* After the SVG is in the DOM, grab joint elements. */
function bindRig(r, root){
  const q={}; root.querySelectorAll(`[data-j^="${r.id}:"]`).forEach(e=>{ q[e.getAttribute('data-j').split(':')[1]]=e; });
  r.q=q;
  // keyframes, sorted
  r.keys=(r.cast.acts||[[0,r.cast.pose||'stand']]).map(k=>({t:k[0], p:poseOf(k[1]), d:k[2]||0.55})).sort((a,b)=>a.t-b.t);
  if(r.keys[0].t>0) r.keys.unshift({t:0,p:poseOf(r.cast.pose||'stand'),d:0});
}
function poseAt(r, lt){
  const K=r.keys; let i=0; while(i+1<K.length && K[i+1].t<=lt) i++;
  const cur=K[i]; if(i===0 || lt-cur.t>=cur.d) return cur.p;
  return blendPose(K[i-1].p, cur.p, easeIO((lt-cur.t)/cur.d));
}
const show=(e,on)=>{ if(e) e.style.display=on?'':'none'; };
const setT=(e,tr)=>{ if(e) e.setAttribute('transform',tr); };

/* Called every frame. lt = time since shot start, t = global time, talking = 0..1 */
function updateRig(r, lt, t, talking){
  const q=r.q, cast=r.cast; if(!q) return;
  let P=Object.assign({}, poseAt(r, lt));
  let x=cast.x||270, y=cast.y||840, s=cast.s||1, flip=cast.flip?-1:1, bob=0, op=1;

  // walk cycle
  if(cast.walk){ const w=cast.walk, k=clamp01((lt-(w.delay||0))/(w.dur||2)); const kk=1-Math.pow(1-k,1.7);
    x += (w.from||-200)*(1-kk)*flip;
    const g = k<1 && lt>=(w.delay||0) ? Math.min(1,(1-k)*6) : 0;     // gait weight, eases out on arrival
    if(g>0){ const ph=lt*2*Math.PI*1.5, sn=Math.sin(ph);
      P.f=[P.f[0]+24*sn*g, P.f[1]+ (6+22*Math.max(0,-Math.cos(ph)))*g];
      P.k=[P.k[0]-24*sn*g, P.k[1]+ (6+22*Math.max(0, Math.cos(ph)))*g];
      if(P.a[0]<35) P.a=[P.a[0]-16*sn*g, P.a[1]+8*g];
      P.b=[P.b[0]+16*sn*g, P.b[1]+8*g];
      bob=-Math.abs(Math.cos(ph))*4*g; } }
  if(cast.enter){ const e=cast.enter; op=clamp01((lt-(e.delay||0))/(e.fade||0.8)); if(e.rise) y+= (1-easeIO(op))*e.rise; }
  if(cast.exit){ const e=cast.exit; op*=1-clamp01((lt-e.at)/(e.fade||0.8)); }

  // breathing
  const br=Math.sin(t*2.1+r.seed)*1.1;
  setT(q.root, `translate(${r1(x)} ${r1(y)}) scale(${s*flip} ${s})`); q.root.setAttribute('opacity', op.toFixed(3));
  setT(q.body, `translate(0 ${r1(P.drop+bob)})`);
  const up=`rotate(${r1(P.lean)} 0 -150) translate(0 ${r1(br*0.6)})`;
  setT(q.upper, up); setT(q.upperB, up);
  setT(q.head, `rotate(${r1(-P.head + Math.sin(t*0.9+r.seed)*1.2)} 2 -246)`);

  // arms (shoulder, elbow) and prop counter-rotation
  const sw=r.c.big?4:0;
  [['A',P.a,P.hand,4+sw,'front'],['B',P.b,P.handB,-4-sw,'back']].forEach(([n,ang,hnd,sx,side])=>{
    setT(q[n], `translate(${sx} -224) rotate(${r1(-ang[0])})`);
    setT(q[n+'E'], `translate(0 50) rotate(${r1(-ang[1])})`);
    setT(q[n+'H'], `translate(0 46)`);
    const pr=r.props[side]; setT(q[n+'P'], r.UPRIGHT[pr] ? `rotate(${r1(ang[0]+ang[1])})` : '');
    ['fist','open','namaste'].forEach(h=>show(q[n+'_'+h], h===hnd && !(pr&&h==='fist'&&!r.UPRIGHT[pr]&&false)));
  });
  // bowstring + nocked arrow
  if(q.string){ const d=P.draw, sx=-6-92*d; q.string.setAttribute('points',`-6,-162 ${r1(sx)},-14 -6,128`);
    show(q.arrow, d>0.25); setT(q.arrow, `translate(${r1(sx)} -14)`); }
  // legs: thigh, knee, flat foot
  [['F',P.f,0],['K',P.k,P.kt]].forEach(([n,ang,ft])=>{
    setT(q[n], `translate(${n==='F'?4:-4} -150) rotate(${r1(-ang[0])})`);
    setT(q[n+'K'], `translate(0 76) rotate(${r1(ang[1])})`);
    setT(q[n+'F'], `translate(0 74) rotate(${r1(ang[0]-ang[1]+ft)})`);
  });
  if(q.skirt) q.skirt.setAttribute('opacity', (1-clamp01(P.drop/40)).toFixed(2));
  if(q.cape) setT(q.cape, `rotate(${r1(Math.sin(t*1.3+r.seed)*2.2 - P.lean*0.85)} -16 -230) translate(-16 -230) scale(1 ${(1-clamp01(P.drop/72)*0.32).toFixed(3)}) translate(16 230)`);
  if(q.hair) setT(q.hair, `rotate(${r1(Math.sin(t*1.1+r.seed)*2)} -8 -262)`);
  if(q.aura) q.aura.setAttribute('opacity', (0.75+0.25*Math.sin(t*1.6)).toFixed(3));

  // face: expression, blink, talk
  const ex=cast.expr||'calm';
  const bt=(t+r.seed*2.3)%3.7; let lid = bt<0.16 ? Math.sin(Math.PI*bt/0.16) : 0;
  if(cast.eyes==='closed') lid=1; else if(ex==='serene') lid=Math.max(lid,0.35);
  const ey=1-lid; setT(q.eye, `translate(15 -270.5) scale(1 ${Math.max(0.05,ey).toFixed(3)}) translate(-15 270.5)`);
  show(q.eye, ey>0.2); show(q.lid, ey<=0.2);
  if(cast.look==='up' && q.pupil) q.pupil.setAttribute('cy','-271.6');
  setT(q.brow, ex==='angry'?'rotate(12 15 -278)': ex==='sad'?'rotate(-10 15 -278)': ex==='surprise'?'translate(0 -3)':'');
  const open = talking>0 ? (0.35+0.65*Math.abs(Math.sin(t*15.5+Math.sin(t*4))))*talking : (ex==='surprise'?0.8:0);
  show(q.m_open, open>0.15); if(open>0.15) q.m_open.setAttribute('ry', (0.8+open*2.4).toFixed(2));
  show(q.m_smile, open<=0.15 && (ex==='smile'||ex==='serene'));
  show(q.m_sad,   open<=0.15 && (ex==='sad'||ex==='angry'));
  show(q.m_neutral, open<=0.15 && !['smile','serene','sad','angry'].includes(ex));
}
