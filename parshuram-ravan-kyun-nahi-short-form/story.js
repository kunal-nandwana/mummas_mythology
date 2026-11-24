/* परशुराम जी ने रावण का वध क्यों नहीं किया? — Short, about 85 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js parshuram-ravan-kyun-nahi-short-form
   Look: deep teal-green night on Mahendra Parvat -> first-light gold -> warm Ayodhya dusk -> a quiet dark-teal shrine lit by three diyas.
   Story beat: no villain, no fight. Only an unanswered question, then three diyas lit one by one (Narasimha, Parshuram, Ram). The third glows brightest.
   Signature art (new): the three diyas (DIYA, SHRINE). Not used here: avatar medallions, event chain, chapter cards.
   Camera: crane pull-back from the glowing parashu at the start, slow orbit round the diyas at the end.
   No hook text, no intro, no end card, no shlokas. Music: scene library (soft). */

/* ---------- helpers ---------- */
/* split one script line over several shots (cuts only at spaces; each cut text stays with the part before it) */
const SPLIT = (text, cuts, parts) => { const bits=[]; let rest=text; cuts.forEach(c=>{ const i=rest.indexOf(c); if(i<0) throw new Error('SPLIT cut not found: '+c); bits.push(rest.slice(0,i+c.length).trim()); rest=rest.slice(i+c.length).trim(); }); bits.push(rest); return parts.map((p,k)=>Object.assign({line:bits[k]},p)); };
const PAR = o => Object.assign({c:PARSHURAM, y:860, s:.95, props:{front:'parashu'}, expr:'calm', acts:[[0,'stand']]}, o);   // Parshuram always carries the parashu

/* ---------- Mahendra Parvat: deep teal night -> first-light gold ---------- */
const NIGHT_SKY = ()=>skyBand([[0,'#03141c'],[.45,'#0a343a'],[.8,'#15605a'],[1,'#2b8a76']])+stars(60,520)+`<circle cx="400" cy="210" r="150" fill="url(#gw)" opacity=".16"/>`;
const GOLD_SKY = (k)=>skyBand([[0,'#1b4a52'],[.34,'#4d8a78'],[.6,'#f0c070'],[.84,'#ffe2a0'],[1,'#fff0c4']])+`<circle cx="330" cy="640" r="${260*(k||1)}" fill="url(#gw)" opacity=".7"/><circle cx="330" cy="650" r="54" fill="#fff4d0"/>`;
const DAWN_TEAL = ()=>skyBand([[0,'#0c3038'],[.4,'#1f6a64'],[.72,'#6ab09a'],[.9,'#d8d09a'],[1,'#f2dca0']])+stars(24,300)+`<circle cx="270" cy="700" r="240" fill="url(#gw)" opacity=".4"/>`;
function RIDGE(y,col,seed,rim){ let d=`M-20 1000 L-20 ${y}`; for(let x=-20;x<=560;x+=30){ const yy=y-70*Math.abs(Math.sin(x*.012+seed))-34*Math.sin(x*.037+seed*2); d+=` L${x} ${r1(yy)}`; }
  d+=' L560 1000Z'; return `<path d="${d}" fill="${col}"/>`+(rim?`<path d="${d.replace(/^M-20 1000 L/,'M').replace(/ L560 1000Z$/,'')}" fill="none" stroke="${rim}" stroke-width="2" opacity=".5"/>`:''); }
const LEDGE = (y,col,rim)=>`<path d="M-20 ${y} Q120 ${y-24} 270 ${y-8} Q420 ${y-30} 560 ${y-4} L560 1000 L-20 1000Z" fill="${col||'#0c2a2e'}"/><path d="M-20 ${y} Q120 ${y-24} 270 ${y-8} Q420 ${y-30} 560 ${y-4}" fill="none" stroke="${rim||'#4aa890'}" stroke-width="2.4" opacity=".6"/>`;
const MIST = (y,col,op)=>A('drift:140:0:18',`<ellipse cx="90" cy="${y}" rx="230" ry="28" fill="${col||'#7ac0b0'}" opacity="${op||.16}"/><ellipse cx="440" cy="${y+50}" rx="240" ry="24" fill="${col||'#7ac0b0'}" opacity="${(op||.16)*.8}"/>`);
const BIRDS = (y,n,col)=>{ let o=''; for(let i=0;i<(n||3);i++) o+=A(`drift:${420+i*30}:${-30+i*10}:${6+i}`,`<path transform="translate(${40+i*60} ${y+i*24})" d="M0 0 q-10 -9 -20 0 q10 -3 20 4 q10 -7 20 -4 q-10 -9 -20 0Z" fill="${col||'#0a2a30'}"/>`); return o; };
const MAHENDRA = (tone)=>({ sky: tone==='gold'?()=>GOLD_SKY(1):tone==='dawn'?DAWN_TEAL:NIGHT_SKY,
  far: ()=>RIDGE(640,tone==='gold'?'#6a9a80':'#0f4a4a',1.1,tone==='gold'?'#fff0c4':'#5ac0a8')+RIDGE(740,tone==='gold'?'#3f7a66':'#0a3a3c',2.6),
  mid: ()=>RIDGE(820,tone==='gold'?'#245a50':'#082a2e',4.3,tone==='gold'?'#ffe2a0':'#4aa890')+MIST(790,tone==='gold'?'#fff0c4':'#7ac0b0',.14),
  art: ()=>LEDGE(870,tone==='gold'?'#143c38':'#0a2226',tone==='gold'?'#ffe2a0':'#4aa890') });

/* ---------- glow pieces ---------- */
const ORB = (x,y,r,col)=>A('pulse:2.6',`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#gw)" opacity=".85"/><circle cx="${x}" cy="${y}" r="${r*.28}" fill="${col||'#fff4d0'}" opacity=".9"/>`);
/* glowing question mark (from the owner's shot plan, shot 3): soft, gold, gently pulsing */
const QMARK = (x,y,s,delay)=>A(`pop:${delay||0}`,A('pulse:3.2',`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="120" fill="url(#gw)" opacity=".6"/><text y="64" text-anchor="middle" font-size="190" fill="#ffe8a8" style="font-family:'Tiro','Mukta',serif;font-weight:400">?</text></g>`));
/* an empty ring of light, where "humans" would be in Ravan's boon: only a soft empty glow, nothing inside */
const EMPTY_GLOW = (x,y,r,delay)=>A(`fadein:${delay||0}:1.2`,A('pulse:3.4',`<g transform="translate(${x} ${y})"><circle r="${r*1.8}" fill="url(#gw)" opacity=".5"/><circle r="${r}" fill="none" stroke="#ffe8a8" stroke-width="3" stroke-dasharray="4 12" opacity=".85"/><circle r="${r*.7}" fill="#fff4d0" opacity=".1"/></g>`));

/* ---------- Ravan's calm hall (teal + gold, no fire) ---------- */
const HALL_SKY = ()=>skyBand([[0,'#06222a'],[.5,'#0d4a4a'],[1,'#2a7a62']])+`<circle cx="270" cy="520" r="260" fill="url(#gw)" opacity=".3"/>`;
function ARCHES(){ let s=''; [[-20,150],[120,150],[270,170],[420,150],[560,150]].forEach(([x,w],i)=>{ s+=`<path d="M${x-w/2} 900 V560 Q${x} ${470-i%2*10} ${x+w/2} 560 V900" fill="none" stroke="#c8a24a" stroke-width="4" opacity=".55"/>`; });
  for(let i=0;i<4;i++) s+=A(`flick:${3+i}`,`<circle cx="${70+i*135}" cy="${330+(i%2)*30}" r="9" fill="#ffd27a"/><circle cx="${70+i*135}" cy="${330+(i%2)*30}" r="40" fill="url(#gw)" opacity=".4"/>`);
  return s; }
const HALL_FLOOR = ()=>`<rect x="-20" y="880" width="580" height="140" fill="#08262a"/><path d="M-20 880 H560" stroke="#c8a24a" stroke-width="3" opacity=".6"/>`;

/* ---------- Ayodhya at dusk (warm plum + amber) ---------- */
const AYO_SKY = ()=>skyBand([[0,'#2a2254'],[.4,'#6a4a7c'],[.7,'#e0935c'],[1,'#fde2a4']])+stars(20,260)+`<circle cx="270" cy="760" r="240" fill="url(#gw)" opacity=".5"/>`;
function AYO_SKYLINE(y,col,gold){ let s=''; [[-10,90,70],[70,140,60],[140,110,80],[230,170,64],[300,120,76],[376,150,60],[436,100,70],[500,130,50]].forEach(([x,h,w],i)=>{
    s+=`<rect x="${x}" y="${y-h}" width="${w}" height="${h+240}" fill="${col}"/><path d="M${x+4} ${y-h} Q${x+w/2} ${y-h-w*.8} ${x+w-4} ${y-h}Z" fill="${col}"/><circle cx="${x+w/2}" cy="${y-h-w*.8-6}" r="3" fill="${gold}"/>`;
    s+=`<path d="M${x+4} ${y-h} Q${x+w/2} ${y-h-w*.8} ${x+w-4} ${y-h}" fill="none" stroke="${gold}" stroke-width="1.8" opacity=".7"/>`;
    for(let k=0;k<3;k++) s+=A(`flick:${(3+((i+k)%4)).toFixed(1)}`,`<path d="M${r1(x+10+k*(w/3.2))} ${y-h+30+k*24} v-9 q3 -5 6 0 v9Z" fill="#ffc060"/>`); });
  return s; }
const AYO_GROUND = ()=>`<rect x="-20" y="880" width="580" height="140" fill="#2a1a3a"/><path d="M-20 880 H560" stroke="#f0b872" stroke-width="3" opacity=".6"/>`;
/* infant Ram's birth glow: a swaddled baby (blue-green skin, yellow cloth) on a golden light, rays turning slowly. Light only. */
const BIRTH_GLOW = (x,y,s)=>A('pulse:3',`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="190" fill="url(#gw)" opacity=".7"/>`)+
  A('spin:60:'+x+':'+y,`<g transform="translate(${x} ${y})">`+[0,1,2,3,4,5,6,7].map(i=>`<path transform="rotate(${i*45})" d="M-7 -30 L0 -170 L7 -30Z" fill="#fff0c4" opacity=".28"/>`).join('')+`</g>`)+
  `<g transform="translate(${x} ${y}) scale(${s||1})"><ellipse cx="0" cy="22" rx="46" ry="12" fill="#f2c05a" opacity=".85"/><path d="M-30 14 Q0 -22 30 14 Q0 30 -30 14Z" fill="#e5b324"/><circle cx="-14" cy="-6" r="15" fill="#3a8a9a"/><circle cx="-18" cy="-8" r="1.8" fill="#10282e"/><path d="M-22 0 q4 3 8 0" stroke="#10282e" stroke-width="1.4" fill="none"/></g>`;

/* ---------- blank scripture bundles (pothi): the pages open and stay empty ---------- */
function BLANK_POTHI(x,y,s,rot,delay){ let l='';
  for(let i=0;i<5;i++) l+=`<rect x="-150" y="${-i*13}" width="300" height="46" rx="9" fill="${i%2?'#f2e2b0':'#ead6a0'}" stroke="#b88a3a" stroke-width="2"/>`;
  l+=`<circle cx="-112" cy="-26" r="5" fill="#8a5a1c"/><circle cx="112" cy="-26" r="5" fill="#8a5a1c"/><path d="M-112 -70 V30 M112 -70 V30" stroke="#a8321a" stroke-width="3" opacity=".8"/>`;
  const open=`<g transform="translate(0 -66)">`+A(`rock:-14:5:-150:0`,`<rect x="-150" y="-46" width="300" height="46" rx="9" fill="#fff0c8" stroke="#b88a3a" stroke-width="2"/>`)+`</g>`;
  return A(`rise:-26:1.4:${delay||0}`,`<g transform="translate(${x} ${y}) rotate(${rot||0}) scale(${s||1})"><ellipse cx="0" cy="40" rx="170" ry="16" fill="#000" opacity=".25"/>${l}${open}</g>`); }
const PAGE_SKY = ()=>skyBand([[0,'#0a2a3a'],[.6,'#1a4a5a'],[1,'#3a6a6a']])+`<circle cx="270" cy="600" r="300" fill="url(#gw)" opacity=".3"/>`+stars(40,380);

/* ---------- a crown that rises as light (Sahastrabahu, nothing violent) ---------- */
const CROWN_LIGHT = (x,y,delay)=>A(`rise:-230:3.2:${delay}`,A(`fadeout:${delay+2.2}:1.2`,`<g transform="translate(${x} ${y})"><circle r="110" fill="url(#gw)" opacity=".7"/><path d="M-50 20 L-58 -30 L-28 -6 L0 -48 L28 -6 L58 -30 L50 20Z" fill="#ffd25e" stroke="#fff4d0" stroke-width="3"/><rect x="-50" y="20" width="100" height="14" rx="4" fill="#f2b630"/><circle cx="0" cy="-48" r="6" fill="#fff4d0"/></g>`));
/* land given as a glowing patch of earth moving from hand to hand */
const LAND_LIGHT = (x1,x2,y,delay)=>A(`slide:${x2-x1}:0:2.2:${delay}`,A('pulse:1.6',`<g transform="translate(${x1} ${y})"><circle r="70" fill="url(#gw)" opacity=".8"/><ellipse cx="0" cy="0" rx="34" ry="16" fill="#6a9a40"/><ellipse cx="0" cy="-4" rx="26" ry="9" fill="#9ac860"/></g>`));

/* ---------- Lanka far away: a faint line on the horizon ---------- */
const FAINT_LANKA = (y)=>A('pulse:5',`<path d="M300 ${y} h60 l6 -14 l8 14 h10 l8 -22 l8 22 h18 l6 -10 l6 10 h40" fill="none" stroke="#ffe2a0" stroke-width="2" opacity=".55"/><ellipse cx="400" cy="${y}" rx="130" ry="14" fill="#ffe2a0" opacity=".1"/>`);

/* ---------- the fading flame, and the golden thread of light (shot 7) ---------- */
const FADING_FLAME = (x,y,s)=>A('fadeout:1.4:3',A('flick:4',`<g transform="translate(${x} ${y}) scale(${s||1})"><circle cy="-40" r="80" fill="url(#gw)" opacity=".6"/><path d="M0 0 Q-24 -40 0 -100 Q24 -40 0 0Z" fill="#ffb53a"/><path d="M0 -4 Q-10 -34 0 -72 Q10 -34 0 -4Z" fill="#fff2b0"/></g>`));
/* gold thread of light drawn from one chest to the other, with a bright mote travelling along it */
const LIGHT_THREAD = (x1,y1,x2,y2,delay)=>{ const mx=(x1+x2)/2, my=Math.min(y1,y2)-110;
  return A(`draw:${delay}:2.4`,`<path d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" fill="none" stroke="#ffe8a8" stroke-width="6" stroke-linecap="round" opacity=".95"/>`)+
    A(`draw:${delay}:2.4`,`<path d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" fill="none" stroke="#fff4d0" stroke-width="16" stroke-linecap="round" opacity=".25"/>`)+
    whisperTrail(x1,y1,x2,y2,delay,16); };

/* ---------- THE SIGNATURE: the shrine with three diyas ---------- */
const SHRINE_SKY = ()=>skyBand([[0,'#041a22'],[.55,'#0a3a42'],[1,'#17574f']])+stars(40,420)+`<circle cx="270" cy="560" r="280" fill="url(#gw)" opacity=".14"/>`;
const SHRINE_FLOOR = ()=>`<ellipse cx="270" cy="880" rx="330" ry="46" fill="#0a2a2e"/><ellipse cx="270" cy="872" rx="320" ry="40" fill="#124a46"/><path d="M-50 872 Q270 846 590 872" fill="none" stroke="#c8a24a" stroke-width="2.4" opacity=".6"/>`;
const DX = [120,270,420], DY = 868;   // positions of the three diyas
/* one diya. mode: 'off' (empty), 'on' (already lit), or {at, big} (lights at planned second `at`; big = brightest) */
function DIYA(x,y,s,mode,big){ const bowl=`<ellipse cx="0" cy="30" rx="42" ry="9" fill="#4a2410"/><path d="M-40 0 Q-36 32 0 32 Q36 32 40 0 Q0 11 -40 0Z" fill="#b8602a"/><ellipse cx="0" cy="0" rx="40" ry="9" fill="#e09a50"/><ellipse cx="0" cy="1" rx="31" ry="5.5" fill="#5a2a10"/><rect x="-3" y="-12" width="6" height="13" rx="2" fill="#2a1a12"/>`;
  const k=big?1.5:1;
  const lit=`<circle cy="-34" r="${r1(100*k)}" fill="url(#gw)" opacity="${big?.95:.7}"/>`+(big?A('pulse:3.4',`<circle cy="-40" r="230" fill="url(#gw)" opacity=".55"/>`)+A('spin:50:0:-40',`<g transform="translate(0 -40)">`+[0,1,2,3,4,5,6,7,8,9].map(i=>`<path transform="rotate(${i*36})" d="M-8 -50 L0 -230 L8 -50Z" fill="#fff0c4" opacity=".16"/>`).join('')+`</g>`):'')+
    A(`flick:${big?2.6:3.2}`,`<g transform="scale(${k})"><path d="M0 -10 Q-18 -38 0 -78 Q18 -38 0 -10Z" fill="#ffb53a"/><path d="M0 -12 Q-8 -32 0 -56 Q8 -32 0 -12Z" fill="#fff4c0"/></g>`);
  let flame=''; if(mode==='on') flame=lit; else if(mode&&mode.at!==undefined) flame=A(`fadein:${mode.at}:.9`,lit);
  return `<g transform="translate(${x} ${y}) scale(${s})">${bowl}${flame}</g>`; }
const DIYAS = (m1,m2,m3,s)=>DIYA(DX[0],DY,s||1.1,m1)+DIYA(DX[1],DY,s||1.1,m2)+DIYA(DX[2],DY,s||1.1,m3,m3!=='off');
const SHRINE = (m1,m2,m3)=>({ sky:SHRINE_SKY, art:SHRINE_FLOOR, front:()=>DIYAS(m1,m2,m3) });
const BEHIND_GLOW = (x,col)=>`<circle cx="${x}" cy="640" r="190" fill="url(#gw)" opacity=".5"/>`;
/* Narasimha: only a soft golden silhouette (mane, face, broad shoulders, raised arms). No new character. */
function NARASIMHA(x,y,s){ let mane=''; for(let i=0;i<14;i++) mane+=`<ellipse transform="rotate(${i*25.7} 0 -250)" cx="0" cy="-296" rx="15" ry="42"/>`;
  return A('pulse:4',`<g transform="translate(${x} ${y}) scale(${s})" fill="#f2c050" opacity=".78"><circle cy="-250" r="110" fill="url(#gw)" opacity=".5"/>${mane}<circle cy="-250" r="40"/><path d="M-30 -276 l-12 -26 l24 12Z M30 -276 l12 -26 l-24 12Z"/><path d="M-70 -200 Q-110 -150 -96 -70 L-40 -80 L-34 -190Z M70 -200 Q110 -150 96 -70 L40 -80 L34 -190Z"/><path d="M-52 -208 Q0 -184 52 -208 L66 -100 Q0 -80 -66 -100Z"/><path d="M-62 -200 Q-150 -240 -140 -330 L-112 -322 Q-112 -250 -50 -190Z M62 -200 Q150 -240 140 -330 L112 -322 Q112 -250 50 -190Z"/><path d="M-60 -100 L-76 0 L-26 0 L-10 -90Z M60 -100 L76 0 L26 0 L10 -90Z"/></g>`); }
const GOLD_SIL = {skin:'#f0bf55', top:'#f0bf55', bottom:'#f0bf55', shin:'#f0bf55', foot:'#f0bf55', sash:'#f0bf55', cape:'#f0bf55', pads:'#f0bf55', belt:'#f0bf55', mala:['#f0bf55'], studs:'#f0bf55', beard:'#f0bf55', ash:false, rudra:false, tilak:false, trim:null, aura:'gw'};   // Parshuram as a golden silhouette (same character, recoloured)
const VISH_SHADOW = {skin:'#1d5668', top:'#1d5668', bottom:'#1d5668', shin:'#1d5668', sash:'#1d5668', cape:'#1d5668', pads:'#1d5668', belt:'#1d5668', mala:['#1d5668'], studs:'#1d5668', tilak:false, aura:'gw'};   // Vishnu's faint shadow behind Parshuram (shot 2)

VIDEO({ rig:'side',
  title:'परशुराम जी ने रावण का वध क्यों नहीं किया?', format:'short', target:85,
  music:'scenes',
  ending:3.2,
  handheld:0.6,
  keywords:['परशुराम','रावण','श्रीराम','विष्णु','अवतार','वरदान','रामायण','पुराण','कश्यप','तपस्या','सहस्त्रबाहु','नृसिंह','हिरण्यकशिपु','लीला'],
  shots:[
    /* 1 — close-up of the glowing parashu in deep teal night; crane pull-back reveals Parshuram on Mahendra Parvat */
    { line:'आखिर परशुराम जी ने रावण का वध क्यों नहीं किया? ज़रा सोचिए...', scene:'pk-mountain-night', mood:'calm', fx:'stars', capTop:140,
      cam:{keys:[[0,330,720,3.0],[2.0,320,700,2.5],[5.2,270,520,1.0]]},
      ...MAHENDRA('night'),
      front:()=>A('fadeout:2.4:2.6',ORB(330,720,70,'#d8fff0')),
      cast:[PAR({x:270, y:860})] },

    /* 2a — Vishnu's faint shadow behind Parshuram */
    { line:'परशुराम जी भी तो भगवान विष्णु के ही मानव अवतार थे,', scene:'pk-mountain-night', mood:'calm', fx:'stars', tr:'dissolve', capTop:140,
      cam:{keys:[[0,270,600,1.1],[4.4,270,540,1.0]]},
      ...MAHENDRA('night'),
      cast:[{c:VISHNU, with:VISH_SHADOW, x:270, y:1000, s:1.5, expr:'calm', enter:{fade:2.4,delay:.6}, aura:'gw'},
            PAR({x:190, y:860, s:.9})] },

    /* 2b — cut to a calm Ravan_King; above him an empty glow where "humans" would be */
    { line:'और रावण को मिले वरदान में मनुष्यों से कोई सुरक्षा नहीं थी।', scene:'pk-question', mood:'calm', fx:'dust', tr:'dissolve', capTop:140,
      cam:{keys:[[0,270,600,1.0],[4.6,270,560,1.12]]},
      sky:HALL_SKY, mid:ARCHES, art:HALL_FLOOR, front:()=>EMPTY_GLOW(270,330,85,1.4),
      cast:[{c:RAVAN_KING, x:270, y:900, s:.72, expr:'calm', props:{front:'khadga'}, acts:[[0,'stand'],[2.2,'lookUp',1.0]]}] },

    /* 3 — Ayodhya at dusk, infant Ram's birth glow, a glowing question mark */
    { line:'तो फिर श्रीराम को जन्म लेने की आवश्यकता क्यों पड़ी?', scene:'pk-ayodhya-dusk', mood:'hope', fx:'sparks', tr:'dissolve', capTop:140,
      cam:{keys:[[0,270,520,1.0],[3.6,270,600,1.15]]},
      sky:AYO_SKY, far:()=>AYO_SKYLINE(780,'#3a2656','#f2c05a'), mid:()=>AYO_SKYLINE(860,'#241638','#e2a64a'), art:AYO_GROUND,
      front:()=>BIRTH_GLOW(270,790,1.4)+QMARK(270,430,1.0,1.2) },

    /* 4 — scripture bundles (pothi) open, the pages stay blank */
    { line:'वाल्मीकि रामायण से लेकर भागवत पुराण तक, किसी भी ग्रंथ में इस सवाल का सीधा उत्तर दर्ज नहीं है।', scene:'pk-pothi', mood:'calm', fx:'dust', tr:'dissolve', capTop:140,
      cam:{keys:[[0,270,600,1.0],[7.0,270,640,1.25]]},
      sky:PAGE_SKY, mid:()=>BLANK_POTHI(150,760,.78,-6,.4)+BLANK_POTHI(390,700,.78,5,1.6), art:()=>BLANK_POTHI(270,880,1.0,0,2.8)+A('pulse:4',`<circle cx="270" cy="840" r="160" fill="url(#gw)" opacity=".22"/>`) },

    /* 5a — Sahastrabahu: his crown rises as light (nothing violent) */
    ...SPLIT('यह सच है कि पृथ्वी को अत्याचारी राजाओं से मुक्त कराने और महर्षि कश्यप को भूमि दान करने के बाद परशुराम जी तपस्या में लीन हो गए थे।',
      ['मुक्त कराने','दान करने के बाद'], [
      { scene:'pk-first-light', mood:'hope', fx:'sparks', tr:'dissolve', capTop:140,
        cam:{keys:[[0,270,620,1.0],[3.4,270,540,1.2]]},
        ...MAHENDRA('gold'), front:()=>CROWN_LIGHT(270,430,.6),
        cast:[{c:SAHASTRABAHU, x:270, y:870, s:.85, expr:'calm', acts:[[0,'stand'],[2.4,'lookUp',1.0]]}] },
      /* 5b — Parshuram gives the land to Kashyap */
      { scene:'pk-first-light', mood:'hope', fx:'petals', tr:'dissolve', capTop:140,
        cam:{keys:[[0,270,640,1.0],[3.4,270,600,1.2]]},
        ...MAHENDRA('gold'), front:()=>LAND_LIGHT(200,350,640,1.0),
        cast:[PAR({x:150, y:870, s:.88, acts:[[0,'stand'],[0.8,'give',.8]]}),
              {c:KASHYAP, x:400, y:870, s:.86, flip:true, expr:'smile', acts:[[0,'stand'],[1.8,'bless',.8]]}] },
      /* 5c — he sits in tapasya on the mountain */
      { scene:'pk-tapasya', mood:'calm', fx:'dust', tr:'dissolve', capTop:140,
        cam:{keys:[[0,270,700,1.5],[4.0,270,600,1.0]]},
        ...MAHENDRA('dawn'),
        cast:[PAR({x:270, y:870, s:1.0, eyes:'closed', acts:[[0,'kneel']]})] } ]),

    /* 6 — Parshuram opens his eyes, parashu in hand; a faint line of Lanka far away */
    { line:'लेकिन संन्यास लेने का मतलब यह तो नहीं था कि वे रावण का सामना नहीं कर सकते थे!', scene:'pk-tapasya', mood:'calm', fx:'dust', tr:'dissolve', capTop:140,
      cam:{keys:[[0,270,640,1.5],[2.0,270,600,1.2],[6.0,330,600,1.0]]},
      ...MAHENDRA('dawn'), far:()=>RIDGE(740,'#0f4a4a',2.6)+FAINT_LANKA(740),
      cast:[PAR({x:210, y:870, s:1.0, acts:[[0,'kneel'],[1.6,'stand',1.2],[3.4,'lookAway',1.0]]})] },

    /* 7a — a fading flame */
    ...SPLIT('कई लोग तर्क देते हैं कि परशुराम जी की वैष्णवी शक्ति समाप्त हो गई थी—परंतु उन्होंने अपनी वह दिव्य ऊर्जा श्रीराम को तब सौंपी थी, जब श्रीराम का जन्म हो चुका था।',
      ['थी—परंतु'], [
      { scene:'pk-first-light', mood:'calm', fx:'embers', tr:'dissolve', capTop:140,
        cam:{keys:[[0,270,640,1.0],[4.8,250,600,1.3]]},
        ...MAHENDRA('dawn'), front:()=>FADING_FLAME(370,720,1.3),
        cast:[PAR({x:170, y:870, s:.95, expr:'serene', acts:[[0,'stand'],[2.6,'lookDown',1.0]]})] },
      /* 7b — a golden light thread runs from Parshuram to Ram (FOCUS MOMENT) */
      { scene:'pk-light-thread', mood:'divine', fx:'sparks', tr:'glow', capTop:140,
        cam:{keys:[[0,270,620,1.0],[6.0,270,600,1.1]]},
        sky:()=>skyBand([[0,'#0c3038'],[.5,'#2a6a62'],[.8,'#d8b070'],[1,'#fde2a4']])+stars(20,260), far:()=>RIDGE(760,'#0f4a4a',2.6,'#ffe2a0'), art:()=>LEDGE(870,'#0a2226','#ffe2a0')+MIST(820,'#ffe8a8',.14),
        front:()=>LIGHT_THREAD(190,680,380,680,1.0)+A('beat:380:690:.06:50',`<circle cx="380" cy="690" r="60" fill="url(#gw)" opacity=".7"/>`),
        focus:{at:1.0, sound:'revive', dur:3.0, duck:.28},
        cast:[PAR({x:150, y:870, s:.92, expr:'serene', acts:[[0,'stand'],[1.0,'bless',.8]]}),
              {c:RAMA, x:400, y:870, s:.8, flip:true, expr:'calm', props:{front:'bow'}, aura:'gg', acts:[[0,'stand'],[2.4,'offer',1.0]]}] } ]),

    /* 8 — Parshuram alone, silence */
    { line:'तो फिर उससे पहले उन्हें किसने रोका था?', scene:'pk-silence', mood:'calm', fx:'stars', tr:'dissolve', capTop:140,
      cam:{keys:[[0,270,700,1.6],[4.0,270,560,1.0]]},
      ...MAHENDRA('night'), front:()=>MIST(900,'#7ac0b0',.12),
      cast:[PAR({x:270, y:870, s:.85, acts:[[0,'stand'],[1.4,'lookUp',1.2]]})] },

    /* 9 — Vishnu appears with three empty diyas in front of him */
    { line:'इसका सबसे गहरा कारण सृष्टि के विधान में छिपा है—भगवान विष्णु का हर अवतार एक विशेष मर्यादा और लक्ष्य लेकर आता है।', scene:'pk-diyas', mood:'divine', fx:'sparks', tr:'glow', capTop:140,
      cam:{keys:[[0,270,640,1.1],[8.0,270,620,1.0]]},
      ...SHRINE('off','off','off'),
      cast:[{c:VISHNU, x:270, y:830, s:.78, expr:'calm', enter:{fade:1.6,delay:.2}, acts:[[0,'stand'],[3.0,'bless',1.0]]}] },

    /* 10 — the first diya lights; Narasimha's golden silhouette behind it */
    { line:'नृसिंह अवतार का प्रयोजन हिरण्यकशिपु का अंत था;', scene:'pk-diyas', mood:'divine', fx:'embers', tr:'dissolve', capTop:140,
      cam:{keys:[[0,150,720,1.3],[4.2,130,700,1.6]]},
      sky:SHRINE_SKY, art:SHRINE_FLOOR, mid:()=>BEHIND_GLOW(DX[0])+A('fadein:1.2:1.6',NARASIMHA(DX[0],860,.78)),
      front:()=>DIYAS({at:.8},'off','off') },

    /* 11 — the second diya lights; Parshuram's golden silhouette behind it */
    { line:'परशुराम जी का कार्य सहस्त्रबाहु और अधर्मी राजाओं का संहार करना था;', scene:'pk-diyas', mood:'divine', fx:'embers', tr:'dissolve', capTop:140,
      cam:{keys:[[0,210,720,1.2],[4.6,270,700,1.55]]},
      sky:SHRINE_SKY, art:SHRINE_FLOOR, mid:()=>BEHIND_GLOW(DX[1]),
      front:()=>DIYAS('on',{at:1.0},'off'),
      cast:[PAR({x:DX[1], y:862, s:.8, with:GOLD_SIL, expr:'calm', acts:[[0,'stand']], enter:{fade:1.2,delay:.4}})] },

    /* 12a — the third diya lights, brightest (FOCUS MOMENT) */
    ...SPLIT('और रावण के वध के साथ-साथ समाज में आदर्श स्थापित करने का दायित्व स्वयं श्रीराम अवतार के लिए निश्चित था।',
      ['स्थापित करने का'], [
      { scene:'pk-third-diya', mood:'divine', fx:'sparks', tr:'glow', capTop:140,
        cam:{keys:[[0,330,720,1.2],[4.0,420,680,1.55]]},
        sky:SHRINE_SKY, art:SHRINE_FLOOR, mid:()=>BEHIND_GLOW(DX[2]),
        front:()=>DIYAS('on','on',{at:.7}),
        focus:{at:.7, sound:'arrive', dur:3.0, duck:.28},
        cast:[{c:RAMA, x:DX[2], y:862, s:.86, expr:'calm', props:{front:'bow'}, aura:'gg', enter:{fade:1.4,delay:.9}, acts:[[0,'stand']]}] },
      /* 12b — Rama stands calm with his bow, the brightest light */
      { scene:'pk-third-diya', mood:'divine', fx:'sparks', tr:'dissolve', capTop:140,
        cam:{keys:[[0,420,640,1.55],[4.0,330,640,1.25]]},
        sky:SHRINE_SKY, art:SHRINE_FLOOR, mid:()=>BEHIND_GLOW(DX[2]),
        front:()=>DIYAS('on','on','on'),
        cast:[{c:RAMA, x:DX[2], y:862, s:.86, expr:'calm', props:{front:'bow'}, aura:'gg', acts:[[0,'stand']]}] } ]),

    /* 13 — Vishnu's smiling close-up */
    { line:'शास्त्रों की इस गूढ़ लीला पर आपका क्या विचार है?', scene:'pk-diyas', mood:'divine', fx:'sparks', tr:'dissolve', capTop:700,
      cam:{keys:[[0,270,600,1.1],[1.4,270,640,2.2],[4.2,270,630,2.6]]},
      sky:SHRINE_SKY, art:SHRINE_FLOOR, front:()=>DIYAS('on','on','on'),
      cast:[{c:VISHNU, x:270, y:900, s:.9, expr:'smile', talk:false, acts:[[0,'stand']]}] },

    /* 14 — the three diyas burn quietly; the camera slowly pulls back and orbits (natural ending follows) */
    ...SPLIT('क्या आप किसी अन्य प्रसंग के बारे में जानते हैं? नीचे कमेंट्स में ज़रूर लिखिएगा।',
      ['जानते हैं?'], [
      { scene:'pk-ending', mood:'hope', fx:'embers', tr:'dissolve', capTop:140,
        cam:{keys:[[0,150,740,1.5],[3.2,270,720,1.2]]},
        sky:SHRINE_SKY, art:SHRINE_FLOOR, front:()=>DIYAS('on','on','on') },
      { scene:'pk-ending', mood:'hope', fx:'embers', tr:'dissolve', capTop:140,
        cam:{keys:[[0,270,720,1.2],[3.2,390,640,1.0]]},
        sky:SHRINE_SKY, art:SHRINE_FLOOR, front:()=>DIYAS('on','on','on') } ])
  ]
});
