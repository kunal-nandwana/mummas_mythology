/* =====================================================================
   FRONT-FACING RIG (v2): a character that faces the camera instead of the
   default side profile (rig.js). Select it per cast member with
   `facing:'front'`; x, y (= ground under the feet), s, flip, c costume, acts,
   walk, expr, talk, props, enter/exit work like the side rig.

   Look (matches the reference stills): broad shoulders and chest, bare or
   tunic torso, draped dhoti with a centre fold panel and gold hem, gold
   armbands + bracers, chain / mala / garland, diagonal sash, almond eyes with
   heavy brows, tilak, tiered gold mukut with side flares (head:'crown' | 'big' |
   'kirita'), jata top-knot, beard, long hair, kundal, cape, quiver, aura, halo,
   extra arms (arms:N + armItems), extra heads (faces:[...]), vanara face.
   Feet stand at y=0, about 345 units to the top of the head.

   Costume keys used: skin top bottom shin hair head beard mus big bare armor
   fem skirt sash belt pads bracer mala garland tilak bindi nose earring kundal
   cape quiver veil pallu braid bangles halo arms armItems faces vanara face
   furDark tail ash rudra trim jewel holds eyeCol pupilCol lips beardLen.
   Props (props:{front:'gada'} = right hand, back = left hand): gada mace
   parashu axe bow trishul staff khadga chakra shankh lotus.

   Pose fields (all in FPOSE0 below):
     lArmOut/rArmOut : shoulder abduction, 0 = hanging at the side, + = lifted out/up
     lArmFwd/rArmFwd : swing toward/away from the camera (foreshortening)
     lElbow/rElbow   : elbow bend (+ = forearm folds in toward the body)
     lHand/rHand     : 'fist' | 'open' | 'namaste'
     lHipFwd/rHipFwd, lKnee/rKnee : leg swing/bend, driven automatically during cast.walk
     headYaw (-40..40 reads best), headTilt, lean, drop
   ===================================================================== */

const n1=v=>Math.round(v*10)/10;
const FPOSE0 = {
  lArmOut:5, lArmFwd:0, lElbow:8, lHand:'fist',
  rArmOut:5, rArmFwd:0, rElbow:8, rHand:'fist',
  lHipFwd:0, lKnee:2, rHipFwd:0, rKnee:2,
  headYaw:0, headTilt:0, lean:0, drop:0,
};
const FPOSES = {
  stand:{}, relax:{lHand:'open', rHand:'open'},
  namaste:{lArmOut:2, lArmFwd:0, lElbow:138, rArmOut:2, rArmFwd:0, rElbow:138, lHand:'namaste', rHand:'namaste'},
  bless:{rArmOut:48, rArmFwd:0, rElbow:-128, rHand:'open', headTilt:-3},
  point:{rArmOut:95, rArmFwd:70, rElbow:4, rHand:'open'},
  fistUp:{rArmOut:170, rArmFwd:6, rElbow:8, rHand:'fist', lean:-2},
  rage:{lArmOut:55, lArmFwd:14, lElbow:70, rArmOut:55, rArmFwd:14, rElbow:70, headTilt:2, lean:3},
  lookL:{headYaw:-26}, lookR:{headYaw:26},
  bowHead:{headTilt:-14, lean:10},
  // holding a prop in the right hand: carry = weapon upright at the side, shoulder = resting on the shoulder
  carry:{rArmOut:16, rElbow:62},
  shoulder:{rArmOut:34, rElbow:128},
  hip:{lArmOut:40, lElbow:100},                 // left hand on the hip
  heroic:{lArmOut:40, lElbow:100, rArmOut:16, rElbow:62, headTilt:-1},
  offer:{lArmOut:34, lArmFwd:40, lElbow:70, rArmOut:34, rArmFwd:40, rElbow:70, lHand:'open', rHand:'open', lean:3},
};
/* aliases so stories written with the side-view pose names still read well face-on */
const _N={lHand:'namaste',rHand:'namaste',lArmOut:2,lArmFwd:0,lElbow:138,rArmOut:2,rArmFwd:0,rElbow:138};
Object.assign(FPOSES,{
  armUp:{rArmOut:165, rHand:'open', headTilt:-3},
  pranam:Object.assign({}, _N, {lean:14, headTilt:-12}),
  think:{rArmOut:14, rElbow:135, headTilt:-4},
  explain:{rArmOut:38, rElbow:-35, rHand:'open', lean:2},
  plead:{lArmOut:30, lElbow:70, rArmOut:30, rElbow:70, lHand:'open', rHand:'open', lean:6, headTilt:-4},
  accuse:{rArmOut:95, rArmFwd:70, rElbow:4, rHand:'open', lean:4},
  shock:{lArmOut:40, lElbow:-50, rArmOut:40, rElbow:-50, lHand:'open', rHand:'open', lean:-4},
  recoil:{lArmOut:40, lElbow:-50, rArmOut:40, rElbow:-50, lHand:'open', rHand:'open', lean:-9},
  weep:{rArmOut:10, rElbow:150, headTilt:-16, lean:6},
  grief:{lArmOut:2, lElbow:130, rArmOut:2, rElbow:130, lHand:'open', rHand:'open', lean:8, headTilt:-14},
  hold:{lArmOut:34, lArmFwd:40, lElbow:70, rArmOut:34, rArmFwd:40, rElbow:70, lHand:'open', rHand:'open', lean:2},
  give:{rArmOut:50, rArmFwd:40, rElbow:20, rHand:'open', lean:3},
  fist:{lArmOut:55, lArmFwd:14, lElbow:70, rArmOut:55, rArmFwd:14, rElbow:70},
  lookUp:{headTilt:6}, lookDown:{headTilt:-10}, lookAway:{headYaw:26}, lookBack:{headYaw:-26},
  bowReady:{rArmOut:16, rElbow:62}, bowDraw:{rArmOut:16, rElbow:62},
  kneel:{drop:46, lean:3, lKnee:30, rKnee:30}, kneelPray:Object.assign({}, _N, {drop:46, lKnee:30, rKnee:30}),
  kneelBow:Object.assign({}, _N, {drop:46, lean:30, headTilt:-18, lKnee:30, rKnee:30}),
  kneelOffer:{drop:46, lArmOut:34, lArmFwd:40, lElbow:70, rArmOut:34, rArmFwd:40, rElbow:70, lHand:'open', rHand:'open', lKnee:30, rKnee:30},
});
function poseOfFront(p){
  if(!p) return Object.assign({},FPOSE0);
  if(typeof p==='object') return Object.assign({},FPOSE0,p);
  return Object.assign({},FPOSE0,...p.split('+').map(k=>FPOSES[k]||{}));
}
function blendPoseFront(A,B,k){ const o={}; for(const key in A){ const x=A[key],y=B[key];
  if(typeof x==='number') o[key]=lerp(x,y,k); else o[key]=k<.5?x:y; } return o; }

/* ---- geometry (feet at y=0) ---- */
const FG = {hipY:-170, hipX:19, thigh:90, shin:66, shY:-268, shX:50, arm:64, fore:58, neckY:-290, lean:-172};
const RIM = 'stroke="#ffe9b8" stroke-opacity=".30" stroke-width="1.3" stroke-linejoin="round"';

function handF(kind,col,isLeft){
  const th = isLeft?1:-1;
  if(kind==='open') return `<path d="M-8 -2 C-10 6 -9 12 -7 14 L7 14 C9 12 10 6 8 -2Z" fill="${col}"/>`+
    `<g stroke="${col}" stroke-width="4.4" stroke-linecap="round" fill="none"><path d="M-5.5 12 L-7 26"/><path d="M-1.8 13 L-2.4 29"/><path d="M1.8 13 L2.4 29"/><path d="M5.5 12 L7.5 25"/><path d="M${th*7} 4 L${th*14} 13"/></g>`;
  if(kind==='namaste') return `<path d="M-5.5 -2 C-8.5 12 -5 28 -3.5 32 Q0 35 3.5 32 C5 28 8.5 12 5.5 -2Z" fill="${col}"/><path d="M0 6 L0 30" stroke="#000" stroke-opacity=".22" stroke-width="1"/>`;
  return `<path d="M-8.5 -2 C-11 6 -10 14 -6 18 Q0 22 6 18 C10 14 11 6 8.5 -2Z" fill="${col}"/>`+
    `<path d="M-5 12.5 h10 M-5 16 h10" stroke="#000" stroke-opacity=".25" stroke-width="1.2"/><ellipse cx="${th*-7.5}" cy="6" rx="3.2" ry="6.2" fill="${col}" transform="rotate(${th*14} ${th*-7.5} 6)"/>`;
}

/* props held in a hand (origin = palm, drawn upright, up = -y) */
function propF(p, c){
  const gold='url(#gold)';
  switch(p){
    case 'gada': case 'mace': return `<g transform="scale(.8)"><line x1="0" y1="32" x2="0" y2="-92" stroke="#7a4a1c" stroke-width="8" stroke-linecap="round"/>`+
      `<rect x="-6" y="14" width="12" height="18" rx="3" fill="${gold}"/>`+
      `<ellipse cx="0" cy="-122" rx="25" ry="30" fill="${gold}" ${RIM}/><g stroke="#8a5a1a" stroke-width="1.8" fill="none"><path d="M0 -152 Q-14 -122 0 -92 M0 -152 Q14 -122 0 -92 M-25 -122 H25"/><path d="M-20 -140 Q0 -134 20 -140 M-20 -104 Q0 -110 20 -104"/></g>`+
      `<path d="M-4 -150 L0 -166 L4 -150Z" fill="${gold}"/></g>`;
    case 'parashu': case 'axe': return `<line x1="0" y1="46" x2="0" y2="-150" stroke="#5a3418" stroke-width="8" stroke-linecap="round"/>`+
      `<rect x="-5" y="16" width="10" height="16" rx="2" fill="${gold}"/><rect x="-6" y="-150" width="12" height="22" rx="3" fill="${gold}" ${RIM}/>`+
      `<path d="M5 -146 C26 -172 58 -166 74 -150 C58 -136 28 -126 5 -122Z" fill="#dfe6ea" stroke="#fff" stroke-opacity=".6" stroke-width="1.5"/><path d="M12 -142 C34 -156 54 -154 66 -150" stroke="#9fb0c0" stroke-width="1.6" fill="none"/>`;
    case 'bow': return `<path d="M0 -118 Q44 0 0 118" stroke="#5a3a18" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M0 -118 Q44 0 0 118" stroke="#d9a73a" stroke-width="2" fill="none"/><line x1="0" y1="-118" x2="0" y2="118" stroke="#efe6cc" stroke-width="1.3"/>`;
    case 'trishul': return `<line x1="0" y1="50" x2="0" y2="-150" stroke="#6a6a72" stroke-width="6" stroke-linecap="round"/><path d="M-20 -176 Q-20 -148 0 -146 Q20 -148 20 -176 M0 -186 V-140" stroke="${gold}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-24 -170 l4 -18 l4 18Z M-4 -178 l4 -22 l4 22Z M16 -170 l4 -18 l4 18Z" fill="${gold}"/>`;
    case 'staff': return `<line x1="0" y1="60" x2="0" y2="-160" stroke="#6a4218" stroke-width="6" stroke-linecap="round"/><circle cy="-164" r="6" fill="${gold}"/><rect x="-5" y="-60" width="10" height="7" rx="2" fill="${gold}"/>`;
    case 'khadga': return `<rect x="-3.5" y="-6" width="7" height="22" rx="2" fill="#0f5a46"/><rect x="-14" y="-12" width="28" height="6" rx="2" fill="${gold}"/><path d="M-4 -12 L4 -12 C9 -48 9 -92 0 -132 C-9 -92 -9 -48 -4 -12Z" fill="#e3e8ee" stroke="#9fb0c0" stroke-width="1.2"/><path d="M0 -14 V-118" stroke="#9fb0c0" stroke-width="1"/>`;
    case 'chakra': return `<g data-spin="1" transform="translate(0 -34)"><circle r="27" fill="none" stroke="${gold}" stroke-width="6"/><circle r="27" fill="none" stroke="#fff3c4" stroke-width="1" opacity=".7"/><circle r="5" fill="${gold}"/>`+
      [0,45,90,135].map(a=>`<line x1="0" y1="-24" x2="0" y2="24" stroke="${gold}" stroke-width="2.4" transform="rotate(${a})"/>`).join('')+
      Array.from({length:12},(_,k)=>{const a=k*30*Math.PI/180; return `<path d="M${n1(Math.sin(a)*27-3)} ${n1(-Math.cos(a)*27)} l3 -8 l3 8Z" fill="${gold}" transform="rotate(0)"/>`;}).join('')+`</g>`;
    case 'shankh': return `<g transform="translate(0 -24)"><path d="M-4 18 C-24 8 -26 -22 -4 -30 C10 -34 24 -20 18 -2 C14 8 6 14 -4 18Z" fill="#f4eee0" stroke="#d9c9a0" stroke-width="1.6"/><path d="M-10 4 C-6 -8 4 -10 10 -4 M-12 -8 C-6 -18 6 -20 12 -12" stroke="#cdbd96" stroke-width="1.4" fill="none"/><path d="M-4 18 L-8 28" stroke="${gold}" stroke-width="5" stroke-linecap="round"/></g>`;
    case 'lotus': return `<line x1="0" y1="30" x2="0" y2="-12" stroke="#4a8a3a" stroke-width="3"/><g transform="translate(0 -14)">`+[-50,-25,25,50,0].map(a=>`<path d="M0 0 C-9 -10 -7 -26 0 -34 C7 -26 9 -10 0 0Z" fill="${a?'#f08ab0':'#f7b2cc'}" stroke="#fff" stroke-opacity=".5" stroke-width="1" transform="rotate(${a})"/>`).join('')+`</g>`;
    default: return '';
  }
}

/* tiered gold crown: h = cone height, fl = side-flare size, tiers = decorated rows */
function mukutF(h, fl, tiers, pearl, metal){   // metal = solid colour (e.g. silver '#d9dee8') instead of the gold gradient
  const g=metal||'url(#gold)', sk=metal?'#5a6272':'#8a5a14', top=-353-h;
  let s='';
  const flare=`<path d="M27 -349 C${35+fl*3} -349 ${40+fl*4} ${-356-fl*3} ${36+fl*3} ${-364-fl*5} C33 ${-360-fl*3} 30 -358 25 -357Z" fill="${g}" stroke="${sk}" stroke-width="1.2"/>`;
  s+=flare+`<g transform="scale(-1 1)">${flare}</g>`;
  s+=`<path d="M-26 -353 L-10 ${top} Q0 ${top-7} 10 ${top} L26 -353Z" fill="${g}" stroke="${sk}" stroke-width="1.2"/>`;
  s+=`<path d="M-26 -353 L-10 ${top} L-4 ${top-4} L-8 -353Z" fill="#000" opacity=".13"/>`;
  for(let i=1;i<=tiers;i++){
    const f=i/(tiers+1), y=n1(-353-h*f), hw=n1(26-16*f);
    s+=`<path d="M${-hw} ${y} H${hw}" stroke="${sk}" stroke-width="1.6"/>`;
    for(let x=-hw+5;x<hw-2;x+=7) s+=`<circle cx="${n1(x)}" cy="${n1(y+5)}" r="1.5" fill="#fff3c4"/>`;
  }
  s+=`<circle cx="0" cy="${top-5}" r="3.6" fill="${g}" stroke="${sk}" stroke-width="1"/><path d="M0 ${top-8} Q-4.5 ${top-15} 0 ${top-23} Q4.5 ${top-15} 0 ${top-8}Z" fill="${g}" stroke="${sk}" stroke-width="1"/>`;
  s+=`<rect x="-30" y="-355" width="60" height="16" rx="5" fill="${g}" stroke="${sk}" stroke-width="1.3"/>`;
  for(let x=-24;x<=24;x+=8) if(Math.abs(x)>6) s+=`<circle cx="${x}" cy="-347" r="1.9" fill="#fff3c4"/>`;
  s+=`<circle cx="0" cy="-347" r="5.2" fill="${pearl||'#fff7e0'}" stroke="#b98428" stroke-width="1.4"/>`;
  return s;
}

/* ---- build ---- */
function makeFrontRig(cast){
  const c=Object.assign({}, COSTUME0, cast.c||{}, cast.with||{});
  const id='r'+(RIG_ID++), J=n=>`data-fj="${id}:${n}"`;
  const skin=c.skin, skinSh=shade(skin,-.2), skinHi=shade(skin,.1);
  const bottom=c.bottom||'#8e1d24', topC=c.top||'#1f2640';
  const gold='url(#gold)', goldD='#8a5a14';
  const fem=!!c.fem, W=(c.big?1.14:1)*(fem?.82:1), AW=(c.big?1.12:1)*(c.mus?1.1:1)*(fem?.78:1);
  const bare = !c.tunic;   // reference style: bare chest + sash; set with:{tunic:true} for a shirt in the top colour
  const jew = c.jewel!==false || !!c.pads || !!c.armor;
  const hairCol='#14100f', beardCol=c.beard==='white'?'#e9e5dc':'#17100f';
  const lipCol=c.lips||shade(skin,-.3);
  const props=Object.assign({}, c.holds||{}, cast.props||{});
  const hemY = c.skirt? -8 : (c.kilt? -60 : -54);
  const legCol=c.shin||skin, SX=FG.shX*W, SY=FG.shY;

  /* ----- limbs ----- */
  const legL=(n,isL)=>`<g ${J(n)}>
      <path d="M-15 -4 C-17 20 -15 60 -11 ${FG.thigh} L11 ${FG.thigh} C15 60 17 20 15 -4Z" fill="${legCol}"/>
      <g ${J(n+'K')} transform="translate(0 ${FG.thigh})">
        <path d="M-11.5 -2 C-14.5 16 -12 40 -7.5 ${FG.shin} L7.5 ${FG.shin} C12 40 14.5 16 11.5 -2Z" fill="${legCol}" ${RIM}/>
        <path d="M-11.5 -2 C-14.5 16 -12 40 -7.5 ${FG.shin} L7.5 ${FG.shin} C12 40 14.5 16 11.5 -2Z" fill="url(#${isL?'limbSh':'limbShR'})"/>
        ${jew?`<rect x="-9.2" y="${FG.shin-14}" width="18.4" height="6" rx="2.4" fill="${gold}" stroke="${goldD}" stroke-width=".8"/>`:''}
        <g ${J(n+'F')} transform="translate(0 ${FG.shin})"><g transform="rotate(${isL?-7:7})"><path d="M-8 -2 C-10 5 -13 10 -12 14 Q0 18 12 14 C13 10 10 5 8 -2Z" fill="${shade(legCol,-.1)}" ${RIM}/><path d="M-8 12 q2 1.6 4 0 M-2 13 q2 1.6 4 0 M4 12 q2 1.6 4 0" stroke="#000" stroke-opacity=".25" stroke-width="1" fill="none"/></g></g>
      </g></g>`;

  const arm=(n,isLeft,handKind)=>{
    const col=skin, cl=isLeft?'limbSh':'limbShR', a=AW;
    const U=`M${-15*a} -6 C${-17.5*a} 14 ${-14.5*a} 36 ${-10.5*a} ${FG.arm} L${10.5*a} ${FG.arm} C${14.5*a} 36 ${17.5*a} 14 ${15*a} -6 Q0 -15 ${-15*a} -6Z`;
    const F=`M${-10.5*a} -2 C${-12.5*a} 14 ${-10*a} 36 ${-7*a} ${FG.fore} L${7*a} ${FG.fore} C${10*a} 36 ${12.5*a} 14 ${10.5*a} -2Z`;
    const band=jew?`<g><rect x="${-14.4*a}" y="20" width="${28.8*a}" height="17" rx="3" fill="${c.pads||gold}" stroke="${goldD}" stroke-width="1"/><path d="M0 24.5 l3.6 4 l-3.6 4 l-3.6 -4Z" fill="#c43a2a" stroke="#ffe9b8" stroke-width=".7"/></g>`:'';
    const brac=(jew||c.bracer)?`<rect x="${-9.2*a}" y="${FG.fore-18}" width="${18.4*a}" height="12" rx="3" fill="${c.pads||gold}" stroke="${goldD}" stroke-width="1"/>`:'';
    const bangles=c.bangles?c.bangles.map((b,i)=>`<rect x="${-8*a}" y="${FG.fore-30+i*5}" width="${16*a}" height="3.2" rx="1.6" fill="${b}"/>`).join(''):'';
    const cap=!bare?`<path d="M${-17*a} -8 C${-18*a} 14 ${-15*a} 22 ${-12*a} 26 L${12*a} 26 C${15*a} 22 ${18*a} 14 ${17*a} -8 Q0 -17 ${-17*a} -8Z" fill="${topC}" ${RIM}/><path d="M${-12*a} 24 H${12*a}" stroke="${gold}" stroke-width="2.4"/>`:'';
    return `<g ${J(isLeft?'shL':'shR')}>
      <path d="${U}" fill="${col}" ${RIM}/><path d="${U}" fill="url(#${cl})"/>
      <circle cx="0" cy="-1" r="${15.5*a}" fill="${col}"/><circle cx="0" cy="-1" r="${15.5*a}" fill="url(#${cl})"/>
      ${band}${cap}
      <g ${J(n+'E')} transform="translate(0 ${FG.arm})">
        <path d="${F}" fill="${col}" ${RIM}/><path d="${F}" fill="url(#${cl})"/><circle r="${10.4*a}" fill="${col}"/><circle r="${10.4*a}" fill="url(#${cl})"/>
        ${brac}${bangles}
        <g ${J(n+'H')} transform="translate(0 ${FG.fore})"><g ${J(n+'Pr')}>${propF(isLeft?props.back:props.front,c)}</g><g ${J(n+'Hk')}>${handF(handKind||'fist',col,isLeft)}</g></g>
      </g></g>`;
  };

  /* extra arms (Vishnu, Ravan, Sahastrabahu): fanned behind the shoulders, each holding an item */
  const extraArms=()=>{
    const N=c.arms||0; if(!N) return ''; let s='';
    for(let i=0;i<N;i++){
      const right=i%2===0, pair=Math.floor(i/2);
      const item=(c.armItems&&c.armItems[i])||null;
      const ang=right?-(100+pair*34):(100+pair*34), eb=right?(-62+pair*10):(62-pair*10);
      s+=`<g transform="translate(${(right?1:-1)*SX*0.94} ${SY}) rotate(${ang})">`+
         `<path d="M${-12*AW} -4 C${-14*AW} 14 ${-11*AW} 36 ${-9*AW} ${FG.arm} L${9*AW} ${FG.arm} C${11*AW} 36 ${14*AW} 14 ${12*AW} -4Z" fill="${skinSh}" ${RIM}/>`+
         (jew?`<rect x="${-12*AW}" y="22" width="${24*AW}" height="14" rx="3" fill="${gold}" stroke="${goldD}" stroke-width=".9"/>`:'')+
         `<g transform="translate(0 ${FG.arm}) rotate(${eb})"><path d="M${-9*AW} -2 C${-10*AW} 14 ${-8*AW} 36 ${-6.5*AW} ${FG.fore} L${6.5*AW} ${FG.fore} C${8*AW} 36 ${10*AW} 14 ${9*AW} -2Z" fill="${skinSh}" ${RIM}/>`+
         (jew?`<rect x="${-8.6*AW}" y="${FG.fore-16}" width="${17.2*AW}" height="10" rx="3" fill="${gold}" stroke="${goldD}" stroke-width=".9"/>`:'')+
         `<g transform="translate(0 ${FG.fore}) rotate(${-(ang+eb)})"><g>${propF(item,c)}</g>${handF('open',skinSh,!right)}</g></g></g>`;
    }
    return s;
  };

  /* ----- torso ----- */
  const TP=`M-11 -288 Q${-30*W} -284 ${-50*W} -272 C${-57*W} -262 ${-53*W} -245 ${-47*W} -232 C${-43*W} -215 ${-37*W} -200 ${-34*W} -186 L${-37*W} -166 L${37*W} -166 L${34*W} -186 C${37*W} -200 ${43*W} -215 ${47*W} -232 C${53*W} -245 ${57*W} -262 ${50*W} -272 Q${30*W} -284 11 -288Z`;
  const mu=c.mus?.26:.14, w=W;
  const chestLines = fem?'' :
    `<path d="M${-41*w} -238 Q${-22*w} -216 -3 -230" stroke="#000" stroke-opacity="${mu}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`+
    `<path d="M${41*w} -238 Q${22*w} -216 3 -230" stroke="#000" stroke-opacity="${mu}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`+
    `<path d="M0 -232 V-204 M${-12*w} -207 H${12*w} M${-11*w} -197 H${11*w} M${-10*w} -188 H${10*w}" stroke="#000" stroke-opacity="${mu*.8}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`+
    `<path d="M${-9*w} -283 Q${-28*w} -278 ${-45*w} -270 M${9*w} -283 Q${28*w} -278 ${45*w} -270" stroke="#000" stroke-opacity=".14" stroke-width="2" fill="none"/>`+
    `<ellipse cx="0" cy="-178" rx="2.4" ry="3.2" fill="#000" opacity=".22"/>`;
  const ashLines = c.ash? [-238,-228,-218].map((y,i)=>`<path d="M${-30*w} ${y} Q0 ${y+7} ${30*w} ${y}" stroke="#e8e2d6" stroke-opacity=".78" stroke-width="3.4" fill="none" stroke-linecap="round"/>`).join(''):'';
  let garmentH = bare? 0 : -166;
  const clipId=id+'t';
  const garment = fem
    ? `<g clip-path="url(#${clipId})"><rect x="-70" y="-300" width="140" height="${300-226}" fill="${topC}"/><path d="M-60 -226 Q0 -216 60 -226" stroke="${gold}" stroke-width="3" fill="none"/></g>`
    : (!bare ? `<g clip-path="url(#${clipId})"><rect x="-70" y="-300" width="140" height="140" fill="${topC}"/></g><path d="M-14 -288 L0 -244 L14 -288" fill="none" stroke="${gold}" stroke-width="4" stroke-linejoin="round"/>` : '');
  const armor = c.armor? `<path d="M${-36*w} -262 C${-30*w} -236 ${-26*w} -214 ${-24*w} -194 L${24*w} -194 C${26*w} -214 ${30*w} -236 ${36*w} -262 Q0 -250 ${-36*w} -262Z" fill="${gold}" stroke="${goldD}" stroke-width="1.4"/><circle cx="0" cy="-232" r="6.5" fill="#d63a2a" stroke="#ffe9b8" stroke-width="1.4"/><path d="M${-24*w} -218 H${24*w} M${-25*w} -204 H${25*w}" stroke="${goldD}" stroke-width="1.4" opacity=".7"/>` : '';
  const sashSvg = (c.sash && !fem) ? `<path d="M${-46*W} -270 L${-30*W} -282 L${38*W} -178 L${20*W} -167Z" fill="${c.sash}" ${RIM}/><path d="M${-46*W} -270 L${20*W} -167" stroke="${gold}" stroke-width="2.6" fill="none"/><path d="M${-30*W} -282 L${38*W} -178" stroke="#000" stroke-opacity=".18" stroke-width="1.6" fill="none"/>`+
        (c.studs?[0.2,0.4,0.6,0.8].map(k=>`<circle cx="${n1(lerp(-38*W,29*W,k))}" cy="${n1(lerp(-274,-172,k))}" r="2" fill="${c.studs}"/>`).join(''):'') : '';
  const thread = (!c.sash && bare && !fem && (c.tilak||c.rudra||c.ash)) ? `<path d="M${-38*W} -276 L${28*W} -172" stroke="#f4ecd8" stroke-opacity=".85" stroke-width="1.8" fill="none"/>` : '';
  const pallu = (c.pallu||fem&&c.veil) ? `<path d="M${-48*W} -270 L${-26*W} -284 L${40*W} -196 L${22*W} -186Z" fill="${c.pallu||c.veil}" ${RIM}/><path d="M${-48*W} -270 L${22*W} -186" stroke="${gold}" stroke-width="2.4" fill="none"/>`:'';
  /* necklace / mala / garland */
  const U=(y,dip)=>`M-13 -287 Q0 ${y+dip} 13 -287`;
  let neck='';
  if(c.mala && c.mala.length){ c.mala.slice(0,4).forEach((b,i)=>{ const dip=34+i*14; neck+=`<path d="M${-14-i*2} -286 Q0 ${-286+dip*1.9} ${14+i*2} -286" stroke="${b}" stroke-width="5" stroke-dasharray="0.1 6.4" stroke-linecap="round" fill="none"/>`; }); }
  else if(c.rudra && c.rudra!==false && bare && !fem){ neck+=`<path d="M-14 -286 Q0 -224 14 -286" stroke="${c.rudra===true?'#6a3a18':c.rudra}" stroke-width="5" stroke-dasharray="0.1 6" stroke-linecap="round" fill="none"/>`; }
  if(jew && !c.garland){ neck+=`<path d="M-15 -286 Q0 -246 15 -286" stroke="${gold}" stroke-width="2.6" fill="none"/><path d="M-17 -284 Q0 -232 17 -284" stroke="${gold}" stroke-width="2" fill="none" opacity=".9"/><circle cx="0" cy="-243" r="4.4" fill="#d63a2a" stroke="#ffe9b8" stroke-width="1.2"/>`; }
  if(c.garland){ neck+=`<path d="M-18 -284 Q0 -190 18 -284" stroke="#e9a8b8" stroke-width="9" fill="none" opacity=".35"/><path d="M-18 -284 Q0 -190 18 -284" stroke="${c.garland}" stroke-width="8" stroke-dasharray="0.1 8" stroke-linecap="round" fill="none"/>`; }
  /* belt + dhoti */
  const dhoti = c.skirt
    ? `<path d="M${-37*W} -172 L${37*W} -172 C${44*W} -110 ${56*W} -50 ${66*W} ${hemY} Q0 ${hemY+14} ${-66*W} ${hemY} C${-56*W} -50 ${-44*W} -110 ${-37*W} -172Z" fill="${bottom}" ${RIM}/>`+
      `<g stroke="${shade(bottom,-.35)}" stroke-opacity=".55" stroke-width="2.2" fill="none"><path d="M-14 -164 C-18 -110 -24 -50 -30 ${hemY+4}"/><path d="M4 -164 C4 -110 6 -50 8 ${hemY+6}"/><path d="M20 -164 C26 -110 36 -50 46 ${hemY+2}"/></g>`+
      (c.trim!==null?`<path d="M${-66*W} ${hemY-1} Q0 ${hemY+13} ${66*W} ${hemY-1}" stroke="${gold}" stroke-width="5" fill="none"/>`:'')
    : `<path d="M${-39*W} -176 L${39*W} -176 C${42*W} -138 ${45*W} -96 ${47*W} ${hemY} Q0 ${hemY+8} ${-47*W} ${hemY} C${-45*W} -96 ${-42*W} -138 ${-39*W} -176Z" fill="${c.kilt||bottom}" ${RIM}/>`+
      `<path d="M${-39*W} -176 L${39*W} -176 C${42*W} -138 ${45*W} -96 ${47*W} ${hemY} L${28*W} ${hemY+5} C${28*W} -100 ${26*W} -140 ${24*W} -176Z" fill="#fff" opacity=".07"/>`+
      `<g stroke="${shade(c.kilt||bottom,-.4)}" stroke-opacity=".5" stroke-width="2.2" fill="none" stroke-linecap="round"><path d="M${-26*W} -170 C${-29*W} -130 ${-33*W} -90 ${-36*W} ${hemY+3}"/><path d="M${-8*W} -170 C${-12*W} -130 ${-14*W} -90 ${-16*W} ${hemY+7}"/><path d="M${28*W} -170 C${31*W} -130 ${35*W} -90 ${38*W} ${hemY+3}"/></g>`+
      `<path d="M-13 -170 Q-16 -114 -9 -96 Q0 -88 9 -96 Q16 -114 13 -170Z" fill="${shade(c.kilt||bottom,-.16)}" stroke="${gold}" stroke-width="1.8"/>`+
      (c.trim!==null?`<path d="M${-47*W} ${hemY-1} Q0 ${hemY+7} ${47*W} ${hemY-1}" stroke="${gold}" stroke-width="3.4" fill="none"/>`:'');
  const beltSvg = `<rect x="${-41*W}" y="-186" width="${82*W}" height="17" rx="3.5" fill="${c.belt||gold}" stroke="${goldD}" stroke-width="1.2"/><circle cx="0" cy="-176.5" r="7.2" fill="#fff3c4" stroke="#a8741a" stroke-width="1.8"/>`;
  const tigerSkin = c.tiger? `<path d="M${-40*W} -176 L${40*W} -176 L${46*W} -118 L${-46*W} -118Z" fill="#c8801e" opacity=".92"/>`:'';

  const torso=`<g ${J('torso')}>
    <clipPath id="${clipId}"><path d="${TP}"/></clipPath>
    <path d="${TP}" fill="${skin}" ${RIM}/>
    ${garment}
    <path d="${TP}" fill="url(#limbSh)" opacity=".75"/>
    ${bare?chestLines:''}${ashLines}${armor}${pallu}${sashSvg}${thread}${neck}
  </g>`;

  /* ----- head ----- */
  const faceP=`M-25 -334 C-29 -322 -29 -306 -24 -296 C-19 -286 -9 -281 0 -280 C9 -281 19 -286 24 -296 C29 -306 29 -322 25 -334 C14 -343 -14 -343 -25 -334Z`;
  const almond=`M-7.6 0.5 Q0 -6 7.6 0.5 Q0 4.6 -7.6 0.5Z`;
  const eyeCol=c.eyeCol||'#f6efe0', pupCol=c.pupilCol||'#1c100a';
  const headSvg=(JJ, copy)=>{
    const eye=(n,x)=>`<g ${JJ(n)} transform="translate(${x} -318)"><g ${x>0?'transform="scale(-1 1)"':''}>
        <clipPath id="${id}${n}c"><path d="${almond}"/></clipPath>
        <g ${JJ(n+'o')}><path d="${almond}" fill="${eyeCol}"/><g clip-path="url(#${id}${n}c)"><g ${JJ(n.replace('eye','pup'))}><circle cx="0" cy="-0.4" r="3.1" fill="${pupCol}"/><circle cx="0.9" cy="-1.3" r=".95" fill="#fff"/></g></g></g>
        <path d="M-8.4 0.6 Q0 -7 8.2 0.6" stroke="#120a06" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M-8.4 0.6 L-11 -1.4" stroke="#120a06" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M-6 4 Q0 6 6 3.6" stroke="#000" stroke-opacity=".18" stroke-width="1" fill="none"/></g></g>`;
    const brow=(n,x)=>`<g ${JJ(n)} transform="translate(${x} -327)"><g ${x>0?'transform="scale(-1 1)"':''}><path d="M-10.5 3.2 Q-3 -3.6 10 -0.6 L10 1.8 Q-2 -0.6 -10.5 5.4Z" fill="${c.hair==='none'&&c.beard==='white'?'#d8d2c6':'#120c0a'}"/></g></g>`;
    const earJ=(n,x)=>`<g ${JJ(n)} transform="translate(${x} -314)">${c.vanara
      ? `<path d="M${x<0?4:-4} 6 L${x<0?-12:12} -20 L${x<0?-14:14} 10Z" fill="${c.furDark||skinSh}"/><path d="M${x<0?2:-2} 4 L${x<0?-9:9} -14 L${x<0?-10:10} 6Z" fill="${c.face||skinHi}"/>`
      : `<ellipse rx="4.4" ry="8.6" fill="${shade(skin,-.06)}" ${RIM}/><path d="M${x<0?1:-1} -3 q${x<0?-3:3} 4 0 8" stroke="#000" stroke-opacity=".2" stroke-width="1.4" fill="none"/>`}
      ${c.earring!==false&&jew? (c.kundal?`<circle cy="14" r="7.5" fill="none" stroke="${gold}" stroke-width="2.6"/><circle cy="14" r="2.6" fill="#d63a2a"/>`:`<circle cy="12" r="4.2" fill="none" stroke="#e8b83a" stroke-width="1.8"/>`):''}</g>`;
    const vanFace = c.vanara ? `<path d="M0 -334 C-18 -334 -25 -318 -23 -304 C-21 -290 -10 -282 0 -281 C10 -282 21 -290 23 -304 C25 -318 18 -334 0 -334Z" fill="${c.face||skinHi}"/><ellipse cx="0" cy="-297" rx="15" ry="12" fill="${shade(c.face||skinHi,.08)}" stroke="#000" stroke-opacity=".18"/><path d="M-5 -293 Q0 -290 5 -293" stroke="#3a1a10" stroke-width="1.6" fill="none"/><path d="M-24 -330 Q0 -346 24 -330 L22 -324 Q0 -334 -22 -324Z" fill="${c.furDark||skinSh}"/><path d="M-7.5 -306 Q0 -301 7.5 -306 Q0 -298 -7.5 -306Z" fill="#1a0f0c"/>` : '';
    const noseSvg = c.vanara? '' : `<g ${JJ('nose')}><path d="M-2 -322 Q-4.4 -311 -5.4 -304 Q0 -299.5 5.4 -304 Q4.4 -311 2 -322Z" fill="${shade(skin,-.16)}" opacity=".5"/><path d="M-5.4 -304 Q0 -300 5.4 -304" stroke="#000" stroke-opacity=".34" stroke-width="1.5" fill="none"/>${c.nose?`<circle cx="-5" cy="-305" r="1.5" fill="${gold}"/>`:''}</g>`;
    const mouthSvg=`<g ${JJ('mouth')}>
        <g ${JJ('m_n')}><path d="M-8.6 -294 Q-4 -297.6 0 -296.2 Q4 -297.6 8.6 -294 Q0 -292.4 -8.6 -294Z" fill="${lipCol}"/><path d="M-6.6 -293.6 Q0 -288.6 6.6 -293.6 Q0 -291.8 -6.6 -293.6Z" fill="${lipCol}" opacity=".85"/></g>
        <g ${JJ('m_s')} style="display:none"><path d="M-9.4 -295.6 Q0 -288 9.4 -295.6 Q0 -291.4 -9.4 -295.6Z" fill="${lipCol}"/><path d="M-9.4 -295.6 q-1.6 -1 -2.4 -2.6 M9.4 -295.6 q1.6 -1 2.4 -2.6" stroke="#000" stroke-opacity=".25" stroke-width="1.2" fill="none"/></g>
        <g ${JJ('m_f')} style="display:none"><path d="M-8.6 -291.6 Q0 -298.6 8.6 -291.6 Q0 -295.4 -8.6 -291.6Z" fill="${lipCol}"/></g>
        <g ${JJ('m_o')} style="display:none"><ellipse ${JJ('m_oe')} cx="0" cy="-293" rx="5.8" ry="3" fill="#4a1410"/><rect x="-4.6" y="-296" width="9.2" height="2.2" rx="1" fill="#f4eee0"/></g></g>`;
    const must=(c.mus||c.beard||c.fierce)&&!c.vanara?`<path d="M-15 -297 Q-8 -305 0 -300 Q8 -305 15 -297 Q8 -296 0 -296.6 Q-8 -296 -15 -297Z" fill="${beardCol}"/>`:'';
    const bl=c.beardLen||0, tip=n1(-278+30*bl+(c.beard&&bl===0?0:0));
    const beard=c.beard&&!c.vanara?`<path d="M-26 -322 C-29 -304 -23 -288 -12 -279 L0 ${tip} L12 -279 C23 -288 29 -304 26 -322 C24 -308 21 -299 15 -294 Q0 -287 -15 -294 C-21 -299 -24 -308 -26 -322Z" fill="${beardCol}" stroke="#fff" stroke-opacity=".12" stroke-width="1"/><path d="M-10 -283 Q0 ${n1(tip+6)} 10 -283" stroke="#fff" stroke-opacity=".12" stroke-width="1.2" fill="none"/>`:'';
    let tilak='';
    if(c.tilak==='namam') tilak=`<path d="M-7 -343 Q-7 -331 0 -330 Q7 -331 7 -343" stroke="#f6f1e4" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M0 -341 V-331" stroke="#d42020" stroke-width="2.6" stroke-linecap="round"/>`;
    else if(c.tilak) tilak=`<path d="M0 -337 V-328" stroke="#c81e1e" stroke-width="3.2" stroke-linecap="round"/>`;
    if(c.bindi) tilak+=`<circle cx="0" cy="-331" r="2.8" fill="#c41e2a"/>`;
    if(c.third) tilak+=`<ellipse cx="0" cy="-334" rx="2.2" ry="5.4" fill="#c82a1a" stroke="#ffd25e" stroke-width=".8"/>`;
    const blind = c.blindfold?`<path d="M-27 -326 H27 L27 -311 H-27Z" fill="#f2ece0" stroke="#d9cfb8" stroke-width="1"/>`:'';
    const fx=`<g ${JJ('feat')}>${vanFace}${eye('eyeL',-11)}${eye('eyeR',11)}${brow('browL',-11)}${brow('browR',11)}${noseSvg}${must}${mouthSvg}${beard}${tilak}${blind}</g>`;

    /* hair cap, long fall, bun / jata, crowns */
    const hairCap = (c.hair==='none'||c.head==='turban'||c.vanara)? '' :
      `<g ${JJ('hair')}><path d="M-26.5 -330 C-31 -354 -14 -362 0 -362 C14 -362 31 -354 26.5 -330 C21 -340 11 -344 0 -341 C-11 -344 -21 -340 -26.5 -330Z" fill="${hairCol}"/><path d="M-27 -330 C-32 -318 -31 -306 -28 -298 L-25 -300 C-26 -312 -26 -322 -24 -330Z M27 -330 C32 -318 31 -306 28 -298 L25 -300 C26 -312 26 -322 24 -330Z" fill="${hairCol}"/></g>`;
    const bun = c.hair==='bun' ? `<circle cx="0" cy="-364" r="13" fill="${hairCol}"/><path d="M-8 -368 Q0 -374 8 -368" stroke="#3a3040" stroke-width="1.6" fill="none"/>`:'';
    const vanFur = c.vanara ? `<path d="M-27 -326 C-34 -312 -32 -296 -26 -286 L-22 -292 C-26 -302 -26 -316 -24 -326Z M27 -326 C34 -312 32 -296 26 -286 L22 -292 C26 -302 26 -316 24 -326Z" fill="${c.furDark||skinSh}"/><path d="M-26 -332 C-30 -350 -14 -358 0 -358 C14 -358 30 -350 26 -332 C14 -342 -14 -342 -26 -332Z" fill="${c.furDark||skinSh}"/>`:'';
    let gear='';
    const ht=c.head;
    if(ht==='crown') gear=mukutF(34,.8,2,c.jewelPearl,c.crownCol);
    else if(ht==='big') gear=mukutF(46,1,3,null,c.crownCol);
    else if(ht==='kirita') gear=mukutF(62,1.1,4,null,c.crownCol);
    else if(ht==='ravan') gear=`<rect x="-30" y="-355" width="60" height="16" rx="4" fill="${gold}" stroke="${goldD}" stroke-width="1.3"/>`+
        [-26,-13,0,13,26].map((x,i)=>{ const h=i===2?44:(i%2?30:36); return `<path d="M${x-7} -353 L${x} ${-353-h} L${x+7} -353Z" fill="${gold}" stroke="${goldD}" stroke-width="1"/>`; }).join('')+
        `<circle cx="0" cy="-347" r="4.8" fill="#d63a2a" stroke="#ffe9b8" stroke-width="1.2"/>`+[-18,-9,9,18].map(x=>`<circle cx="${x}" cy="-347" r="2" fill="#2ec28a"/>`).join('');
    else if(ht==='feather') gear=`<path d="M-28 -347 Q0 -358 28 -347 L28 -339 Q0 -349 -28 -339Z" fill="${gold}" stroke="${goldD}" stroke-width="1.2"/>`+
        `<path d="M6 -350 C14 -380 22 -400 30 -420" stroke="#2a6a5a" stroke-width="2.4" fill="none"/><g transform="translate(26 -416) rotate(24)"><ellipse rx="13" ry="22" fill="#1f7a68" stroke="#0e4a40" stroke-width="1.2"/><ellipse rx="8" ry="14" fill="#2aa088"/><ellipse rx="4.4" ry="7.6" fill="#2a4aa8"/><circle cy="-1" r="2.2" fill="#e8c04a"/></g>`+
        `<circle cx="0" cy="-346" r="4.6" fill="#fff7e0" stroke="#b98428" stroke-width="1.3"/>`;
    else if(ht==='jata'||ht==='jata2'||ht==='mahadev'){
      gear=`<path d="M-18 -344 L-17 -402 Q0 -416 17 -402 L18 -344Z" fill="${hairCol}" ${RIM}/>`+
        [-356,-368,-380,-392].map(y=>`<path d="M-18 ${y} Q0 ${y+5} 18 ${y}" stroke="${gold}" stroke-width="2.2" fill="none"/>`).join('')+
        `<path d="M-14 -352 V-398 M-6 -350 V-406 M2 -350 V-408 M10 -352 V-402" stroke="#3a3040" stroke-width="1.2" opacity=".7"/>`+
        `<path d="M-30 -330 Q-31 -345 -20 -347 L20 -347 Q31 -345 30 -330 C20 -341 -20 -341 -30 -330Z" fill="${hairCol}"/>`;
      if(ht==='mahadev') gear+=`<path d="M12 -402 a8 8 0 1 0 6 12 a6.4 6.4 0 1 1 -6 -12Z" fill="#f4ecd0" stroke="#d9c98a" stroke-width="1"/><path d="M-14 -400 Q-22 -380 -26 -350" stroke="#9fd4f0" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"/>`;
    }
    else if(ht==='band') gear=`<circle cx="0" cy="-366" r="13" fill="${hairCol}"/><path d="M-27 -340 Q0 -352 27 -340 L27 -333 Q0 -344 -27 -333Z" fill="#a8221a" stroke="${gold}" stroke-width="1.4"/>`;
    else if(ht==='turban') gear=`<path d="M-30 -334 C-35 -362 -14 -380 4 -378 C24 -376 35 -358 30 -334 C14 -344 -14 -344 -30 -334Z" fill="${c.turban}" ${RIM}/><path d="M-26 -340 Q4 -366 28 -346 M-22 -350 Q4 -374 26 -358" stroke="#000" stroke-opacity=".2" stroke-width="2" fill="none"/><circle cx="0" cy="-350" r="4.4" fill="#d63a2a" stroke="${gold}" stroke-width="1.2"/>`;
    else if(ht==='demon') gear=`<path d="M-22 -346 C-40 -362 -46 -388 -34 -408 C-32 -388 -26 -372 -16 -362Z M22 -346 C40 -362 46 -388 34 -408 C32 -388 26 -372 16 -362Z" fill="#e8dcc0" stroke="#7a6a50" stroke-width="1.4"/>`;
    else if(ht==='meghnad') gear=mukutF(40,1.2,2,'#d9b8ff');
    const veil = c.veil && !fem ? '' : (c.veil? `<path d="M-30 -332 C-34 -354 -10 -364 0 -364 C10 -364 34 -354 30 -332 C37 -302 40 -272 37 -248 L25 -250 C29 -278 25 -306 19 -326 C9 -337 -9 -337 -19 -326 C-25 -306 -29 -278 -25 -250 L-37 -248 C-40 -272 -37 -302 -30 -332Z" fill="${c.veil}" ${RIM}/><path d="M-25 -336 Q0 -346 25 -336" stroke="#fff3c4" stroke-width="1.6" stroke-dasharray="0.1 4" stroke-linecap="round" fill="none"/>`:'');
    const flowers = c.flowers? [-20,-10,0,10,20].map((x,i)=>`<circle cx="${x}" cy="${-350+Math.abs(x)*.2}" r="3.4" fill="${i%2?'#ffd2e8':'#fff'}"/>`).join(''):'';
    const skinHead = `<path d="${faceP}" fill="${skin}" ${RIM}/><path d="M-19 -290 C-10 -283 10 -283 19 -290 L18 -287 C9 -281 -9 -281 -18 -287Z" fill="#000" opacity=".12"/><path d="M-24 -318 Q-26 -302 -19 -291" stroke="#fff" stroke-opacity=".12" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M24 -318 Q26 -302 19 -291" stroke="#000" stroke-opacity=".13" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    return `${earJ('earL',-27)}${earJ('earR',27)}${skinHead}${vanFur}${fx}${hairCap}${bun}${veil}${flowers}${gear}`;
  };

  const neckSvg=`<path d="M-10 -296 L10 -296 L12 -266 L-12 -266Z" fill="${shade(skin,-.1)}"/><path d="M-10 -296 H10 V-286 Q0 -280 -10 -286Z" fill="#000" opacity=".14"/>`;
  const J0=()=>'';
  const haloSvg = c.halo ? `<circle cx="0" cy="-318" r="${(c.halo[2]||46)*1.35}" fill="url(#gw)" opacity=".45"/><circle cx="0" cy="-318" r="${(c.halo[2]||46)*1.25}" fill="none" stroke="#ffe9a8" stroke-width="1.6" opacity=".7"/>` : '';
  /* extra heads (Ravan 10 heads, Brahma 4): fanned behind the main head */
  let extraHeads='';
  if(c.faces && c.faces.length){ const n=c.faces.length, sp=n>=4?30:26;
    for(let j=n;j>=1;j--){ const side=j%2?1:-1, k=Math.ceil(j/2), sc=Math.max(.68,1-k*.06), x=side*k*sp, y=k*6*(n>=4?1.3:0.8), rot=side*k*(n>=4?8:5);
      extraHeads+=`<g transform="translate(${n1(x)} ${n1(y)}) rotate(${rot} 0 -300) translate(0 -300) scale(${n1(sc)}) translate(0 300)">${headSvg(J0,true)}</g>`; } }

  const cape = c.cape? `<g ${J('cape')}><path d="M${-50*W} -272 L${50*W} -272 C${72*W} -200 ${84*W} -120 ${96*W} -46 Q0 -30 ${-96*W} -46 C${-84*W} -120 ${-72*W} -200 ${-50*W} -272Z" fill="${c.cape}" ${RIM}/><path d="M${-50*W} -272 C${-40*W} -190 ${-44*W} -110 ${-60*W} -42 L${-20*W} -40 C${-18*W} -120 ${-22*W} -200 ${-14*W} -270Z" fill="#000" opacity=".16"/><path d="M${40*W} -272 C${48*W} -190 ${60*W} -110 ${76*W} -42" stroke="#fff" stroke-opacity=".08" stroke-width="6" fill="none"/></g>`:'';
  const quiver = c.quiver? `<g transform="rotate(-16 ${-36*W} -250)"><rect x="${-50*W}" y="-318" width="16" height="84" rx="5" fill="#5a3418" stroke="${gold}" stroke-width="1.2"/><g stroke="#e9e1c8" stroke-width="2.2"><path d="M${-46*W} -318 V-340 M${-42*W} -318 V-346 M${-38*W} -318 V-338"/></g><g fill="#fff"><path d="M${-46*W} -340 l-3 6 h6Z M${-42*W} -346 l-3 6 h6Z M${-38*W} -338 l-3 6 h6Z"/></g></g>`:'';
  const tail = c.tail? `<path d="M${30*W} -150 C${90*W} -140 ${110*W} -220 ${86*W} -270 C${100*W} -200 ${70*W} -160 ${30*W} -166Z" fill="${c.skin}" stroke="${c.furDark||skinSh}" stroke-width="2"/>`:'';
  const braid = c.braid? `<g ${J('braid')}><path d="M${-24*W} -300 C${-34*W} -270 ${-30*W} -230 ${-26*W} -188 L${-18*W} -188 C${-22*W} -230 ${-24*W} -270 ${-18*W} -300Z" fill="${c.braid}" ${RIM}/><path d="M${-30*W} -262 l10 4 M${-29*W} -244 l10 4 M${-28*W} -226 l10 4 M${-27*W} -208 l10 4" stroke="#fff" stroke-opacity=".2" stroke-width="1.4"/></g>`:'';
  const hairFall = (c.hair==='long' && !c.braid && !c.veil && c.head!=='turban' && !c.vanara) ? `<path d="M-27 -332 C-38 -308 -42 -270 -40 -238 L-30 -236 C-31 -266 -29 -296 -24 -320Z M27 -332 C38 -308 42 -270 40 -238 L30 -236 C31 -266 29 -296 24 -320Z" fill="${hairCol}" ${RIM}/><path d="M-34 -300 C-36 -280 -35 -258 -34 -244 M34 -300 C36 -280 35 -258 34 -244" stroke="#4a3a52" stroke-width="1.4" fill="none" opacity=".6"/>`:'';
  const aura = (cast.aura||c.aura) ? `<g ${J('aura')}><circle cx="0" cy="-190" r="230" fill="url(#${cast.aura||c.aura})" opacity=".6"/></g>` : '';

  const legs=`<g ${J('legs')}>
    <g ${J('hipR')} transform="translate(${FG.hipX} ${FG.hipY})">${legL('R',false)}</g>
    <g ${J('hipL')} transform="translate(${-FG.hipX} ${FG.hipY})">${legL('L',true)}</g></g>`;
  const arms = arm('R',false,'fist') + arm('L',true,'fist');

  const svgInner=`<g ${J('root')}>${aura}<ellipse ${J('shadow')} cx="0" cy="2" rx="${66*W}" ry="11" fill="#000" opacity=".38"/>
    ${legs}${tail}
    <g ${J('upper')}>${cape}${quiver}${extraArms()}${extraHeads}${haloSvg}
      ${torso}${dhoti}${tigerSkin}${beltSvg}
      <g ${J('neckG')}>${neckSvg}</g>
      ${braid}${hairFall}
      <g ${J('head')}>${headSvg(J,false)}</g>
      ${arms}</g></g>`;

  return {id, c, cast, svg:svgInner.replace(/(\d+\.\d{2})\d+/g,'$1'), frontRig:true, seed:RIG_ID*1.37, props};
}

function bindFrontRig(r, root){
  const q={}; root.querySelectorAll(`[data-fj^="${r.id}:"]`).forEach(e=>{ q[e.getAttribute('data-fj').split(':')[1]]=e; });
  r.q=q;
  r.keys=(r.cast.acts||[[0,r.cast.pose||'stand']]).map(k=>({t:k[0],p:poseOfFront(k[1]),d:k[2]||0.5})).sort((a,b)=>a.t-b.t);
  if(r.keys[0].t>0) r.keys.unshift({t:0,p:poseOfFront(r.cast.pose||'stand'),d:0});
  r.spin=[...root.querySelectorAll('[data-spin]')];
}
function poseAtFront(r,lt){
  const K=r.keys; let i=0; while(i+1<K.length && K[i+1].t<=lt) i++;
  const cur=K[i]; if(i===0||lt-cur.t>=cur.d) return cur.p;
  return blendPoseFront(K[i-1].p, cur.p, easeIO((lt-cur.t)/cur.d));
}
function foreshortenFront(fwdDeg, maxDeg){ const k=Math.max(-1,Math.min(1, fwdDeg/maxDeg)); return {scale:1-0.4*Math.abs(k), slide:k*14}; }

/* Called every frame, same signature as the side rig's updateRig. */
function updateFrontRigShot(r, lt, t, talking){
  const q=r.q; if(!q) return;
  const c=r.c, G=FG, W=(c.big?1.14:1)*(c.fem?.82:1), SX=G.shX*W;
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

  let ex=cast.expr||'calm', exT=0;
  if(cast.exprKeys) for(const k of cast.exprKeys) if(lt>=k[0]){ ex=k[1]; exT=k[0]; }
  const at=ATTITUDE[ex], ak=smooth01((lt-exT)/0.6);
  if(at){ P.headTilt+=(at.head||0)*ak*0.6; P.lean+=(at.lean||0)*ak; }

  const breathe=Math.sin(t*2.1+r.seed)*1.0;
  setT(q.root, `translate(${n1(x)} ${n1(y+P.drop)}) scale(${n1(s*flip)} ${n1(s)})`);
  setT(q.upper, `rotate(${n1(P.lean)} 0 ${G.lean}) translate(0 ${n1(breathe*0.5)})`);
  if(q.cape) setT(q.cape, `translate(0 -272) scale(${n1(1+0.025*Math.sin(t*1.3+r.seed))} 1) translate(0 272)`);

  /* head: yaw slides the features toward the turn side and squeezes them (a turn cue on a front face) */
  const yawShift=P.headYaw*0.2;
  setT(q.head, `translate(${n1(yawShift)} 0) rotate(${n1(P.headTilt)} 0 ${G.neckY})`);
  const yk=clamp01(Math.abs(P.headYaw)/26), dir=P.headYaw>0?1:-1, toR=dir>0;
  setT(q.feat, `translate(${n1(dir*yk*9)} 0) scale(${n1(1-0.12*yk)} 1)`);
  if(q.hair) setT(q.hair, `translate(${n1(dir*yk*4)} 0)`);
  const far=1-0.55*yk;
  const eyeX=(sgn)=>{ const near=(sgn>0)===toR; return near?1+0.1*yk:far; };
  // blink / expression
  const bt=(t+r.seed*2.3)%3.7; let lid=bt<0.16?Math.sin(Math.PI*bt/0.16):0;
  if(cast.eyes==='closed' && !(cast.openAt!==undefined && lt>=cast.openAt)) lid=1;
  else if(ex==='serene') lid=Math.max(lid,0.4); else if(ex==='sad') lid=Math.max(lid,0.25); else if(ex==='angry') lid=Math.max(lid,0.2);
  const wid=ex==='surprise'?1.25:1, eo=Math.max(0.06,(1-lid)*wid);
  const browRot = ex==='angry'?14: ex==='sad'?-12 : 0, browLift = ex==='surprise'?-4: ex==='angry'?2: ex==='sad'?-1:0;
  [['eyeL',-11,-1],['eyeR',11,1]].forEach(([n,bx,sg])=>{
    setT(q[n], `translate(${n1(bx)} -318) scale(${n1(eyeX(sg))} 1)`);
    setT(q[n+'o'], `scale(1 ${n1(eo)})`);
    const pu=q[n.replace('eye','pup')]; if(pu) setT(pu, `translate(${n1(dir*yk*2.2)} 0)`);
  });
  [['browL',-11,-1],['browR',11,1]].forEach(([n,bx,sg])=>{
    setT(q[n], `translate(${n1(bx)} ${n1(-327+browLift)}) scale(${n1(eyeX(sg))} 1) rotate(${n1(-sg*browRot)})`);
  });
  setT(q.nose, `translate(${n1(dir*yk*6)} 0) scale(${n1(1-0.25*yk)} 1)`);
  const open = talking>0 ? (0.35+0.65*Math.abs(Math.sin(t*15.5+Math.sin(t*4))))*talking : (ex==='surprise'?0.8:0);
  const show=(e,on)=>{ if(e) e.style.display=on?'':'none'; };
  const isOpen=open>0.15;
  show(q.m_o, isOpen); show(q.m_n, !isOpen && !['smile','serene','sad','angry'].includes(ex));
  show(q.m_s, !isOpen && (ex==='smile'||ex==='serene')); show(q.m_f, !isOpen && (ex==='sad'||ex==='angry'));
  if(isOpen && q.m_oe) q.m_oe.setAttribute('ry', n1(1.4+open*3.6));
  if(isOpen && q.m_oe) q.m_oe.setAttribute('cy', n1(-293+open*0.8));

  /* legs */
  const lThigh=foreshortenFront(P.lHipFwd,30), rThigh=foreshortenFront(P.rHipFwd,30);
  setT(q.hipL, `translate(${-G.hipX} ${G.hipY}) rotate(${n1(lThigh.slide*0.5)}) scale(1 ${n1(lThigh.scale)})`);
  setT(q.hipR, `translate(${G.hipX} ${G.hipY}) rotate(${n1(-rThigh.slide*0.5)}) scale(1 ${n1(rThigh.scale)})`);
  setT(q.LK, `translate(0 ${n1(G.thigh-footLiftL)}) scale(1 ${n1(1-Math.min(.3,P.lKnee/150))})`);
  setT(q.RK, `translate(0 ${n1(G.thigh-footLiftR)}) scale(1 ${n1(1-Math.min(.3,P.rKnee/150))})`);
  setT(q.LF, `translate(0 ${G.shin}) rotate(${n1(-footLiftL*2.2)})`);
  setT(q.RF, `translate(0 ${G.shin}) rotate(${n1(-footLiftR*2.2)})`);

  /* arms */
  const lFore=foreshortenFront(P.lArmFwd,60), rFore=foreshortenFront(P.rArmFwd,60);
  const liftL = P.lArmOut>90 ? Math.max(0,-P.lArmFwd)*0.9 : 0, liftR = P.rArmOut>90 ? Math.max(0,-P.rArmFwd)*0.9 : 0;
  const rotL=P.lArmOut+liftL, rotR=-(P.rArmOut+liftR);
  setT(q.shL, `translate(${-SX} ${G.shY}) rotate(${n1(rotL)}) scale(${n1(lFore.scale)} ${n1(lFore.scale)})`);
  setT(q.shR, `translate(${SX} ${G.shY}) rotate(${n1(rotR)}) scale(${n1(rFore.scale)} ${n1(rFore.scale)})`);
  setT(q.LE, `translate(0 ${G.arm}) rotate(${n1(-P.lElbow)})`);
  setT(q.RE, `translate(0 ${G.arm}) rotate(${n1(P.rElbow)})`);
  // hand shape
  const hk=(n,kind)=>{ const el=q[n+'Hk']; if(!el) return; const key=kind; if(el.__k===key) return; el.__k=key; el.innerHTML=handF(kind,r.c.skin,n==='L'); };
  hk('L',P.lHand); hk('R',P.rHand);
  // namaste: hands point straight up whatever the forearm angle
  setT(q.LHk, P.lHand==='namaste' ? `rotate(${n1(-180-(rotL-P.lElbow))})` : '');
  setT(q.RHk, P.rHand==='namaste' ? `rotate(${n1(180-(rotR+P.rElbow))})` : '');
  // held props stay upright (cancel the arm rotation), with a little sway
  const tilt=cast.propTilt!==undefined?cast.propTilt:7, sway=Math.sin(t*1.7+r.seed)*0.8;
  setT(q.RPr, `rotate(${n1((P.rArmOut+liftR)-P.rElbow+tilt+sway)})`);
  setT(q.LPr, `rotate(${n1(-(P.lArmOut+liftL)+P.lElbow-tilt-sway)})`);
  r.spin.forEach(e=>{ e.setAttribute('transform', `translate(0 -34) rotate(${n1(t*140)})`); });

  if(q.aura) q.aura.setAttribute('opacity', (0.75+0.25*Math.sin(t*1.6)).toFixed(3));
}
