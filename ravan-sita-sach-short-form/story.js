/* रावण और माँ सीता का सच — Short, about 75 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js ravan-sita-sach-short-form
   v2 (owner feedback): no intro / hook text; new characters (SITA, HANUMAN, RAVAN_KING, PUNJIKASTHALA in engine/characters.js);
   Hanuman's search of Ravan's palace is now a proper antahpura chamber (arches, pillars, hanging lamps, couches with sleeping women);
   richer Lanka (walls, domes, sea), Panchavati, Ashoka Vatika.
   Look: Lanka at night in torchlight (maroon + amber), Ashoka Vatika (cold teal), Panchavati at dusk (violet + ember), Brahma's gold-white light.
   The assault scenes are never shown: only silhouettes, a dark tide that slides over the picture, a drifting veil, camera cuts and close-ups of faces. */

/* ---------- shared pieces (drawn new for this video) ---------- */
const SIL = (extra)=>Object.assign({skin:'#0b0610', top:'#0b0610', bottom:'#0b0610', shin:'#0b0610', foot:'#0b0610', cape:'#0b0610',
  ash:false, rudra:false, garland:null, sash:null, jewel:false, tilak:false, earring:false,
  armor:false, bracer:false, kilt:null, kundal:false, pads:null, belt:null, mala:null, studs:null, bindi:false, nose:false, bangles:null, pallu:null, braid:null, scarf:null, flowers:false}, extra||{});   // pure silhouette costume (rim light still shows the outline)
const RAVAN_G = Object.assign({}, RAVAN_KING, {bottom:'#4a0c1c', shin:'#4a0c1c', cape:'#16060c', kilt:'#5a0c22'});                                // Ravan in gold armour
const SITA_G  = {c:SITA, with:{top:'#8a5a14', bottom:'#c8962c', pallu:'#d9ab3e', veil:'#d9ab3e'}};                                          // Sita in Ashoka Vatika: plain faded-gold silk
const WOMAN   = (top,bottom,veil)=>({c:SITA, with:{top:top, bottom:bottom, pallu:veil, veil:veil, bangles:['#c9a24a','#8a6a2a']}});           // a captive woman: rich cloth, muted by night
const HANU_G  = {c:HANUMAN, with:{holds:{}}};                                                                                              // Hanuman with the gada on his shoulder (give props:{front:'gada'} + pose 'shoulder')

const NIGHT_RED = ()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+stars(60,520);
const BIGMOON   = (x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r*1.7}" fill="url(#gr)" opacity=".55"/><circle cx="${x}" cy="${y}" r="${r}" fill="#e9a070"/><circle cx="${x-r*.3}" cy="${y-r*.2}" r="${r*.78}" fill="#f2b88a" opacity=".5"/><path d="M${x-r*.7} ${y+r*.2} q${r*.4} -${r*.18} ${r*.9} 0 M${x-r*.2} ${y-r*.5} q${r*.4} ${r*.12} ${r*.8} 0" stroke="#c97a52" stroke-width="3" fill="none" opacity=".35"/>`;
const CLOUDS_DARK = (y)=>A('drift:90:0:40',`<ellipse cx="120" cy="${y}" rx="150" ry="22" fill="#12060e" opacity=".7"/><ellipse cx="420" cy="${y+40}" rx="170" ry="18" fill="#12060e" opacity=".6"/>`);
const BATS = (y)=>[[60,0,6],[160,40,8],[300,-20,7]].map(([x,dy,p],i)=>A(`drift:${300+i*40}:${-30+i*10}:${p}`,`<path transform="translate(${x} ${y+dy})" d="M0 0 q-10 -9 -22 -2 q8 0 11 6 q4 -5 11 -4 q7 -1 11 4 q3 -6 11 -6 q-12 -7 -22 2Z" fill="#05020a"/>`)).join('');
// Lanka v2: tall towers with gold domes, finials, flags, lit windows
function LANKA(y,col){ const c=col||'#1a0a14'; let s='';
  [[14,96,58],[88,160,44],[150,118,56],[228,200,50],[300,126,64],[378,170,46],[436,104,58],[500,150,48]].forEach(([x,h,w],i)=>{
    s+=`<rect x="${x}" y="${y-h}" width="${w}" height="${h}" fill="${c}"/><rect x="${x-3}" y="${y-h*.55}" width="${w+6}" height="5" fill="${c}"/><path d="M${x-4} ${y-h} Q${x+w/2} ${y-h-w*.95} ${x+w+4} ${y-h}Z" fill="${c}"/><rect x="${x+w/2-1}" y="${y-h-w*.95-16}" width="2" height="18" fill="${c}"/><path d="M${x+w/2+1} ${y-h-w*.95-16} l16 4 l-16 5Z" fill="#c44a1a" opacity=".8"/><circle cx="${x+w/2}" cy="${y-h-w*.95-18}" r="2.4" fill="#e8b83a"/><path d="M${x-4} ${y-h} Q${x+w/2} ${y-h-w*.95} ${x+w+4} ${y-h}" fill="none" stroke="#d9a73a" stroke-width="1.8" opacity=".6"/>`;
    for(let k=0;k<3;k++) s+=A(`flick:${(3+((i+k)%4)).toFixed(1)}`,`<path d="M${r1(x+8+k*(w/3.2))} ${y-h+27+k*20} v-9 q3 -5 6 0 v9Z" fill="#ffb44a"/>`); });
  return s; }
// rampart wall with battlements, a gate and lit torches
function LANKAWALL(y,col){ const c=col||'#1a0a14'; let s=`<rect x="-10" y="${y-70}" width="560" height="${1000-y+70}" fill="${c}"/>`;
  for(let x=-6;x<546;x+=34) s+=`<rect x="${x}" y="${y-88}" width="22" height="22" fill="${c}"/>`;
  s+=`<path d="M200 ${y} V${y-60} Q270 ${y-110} 340 ${y-60} V${y}Z" fill="#05020a"/><path d="M200 ${y} V${y-60} Q270 ${y-110} 340 ${y-60} V${y}" fill="none" stroke="#d9a73a" stroke-width="2.4" opacity=".7"/>`;
  s+=A('flick:4','<path d="M214 '+y+' V'+(y-56)+' Q270 '+(y-96)+' 326 '+(y-56)+' V'+y+'Z" fill="#ff9a3a" opacity=".12"/>');
  return s; }
function SEA(y){ let s=`<rect x="0" y="${y}" width="540" height="${1000-y}" fill="#0c0610"/>`;
  for(let i=0;i<14;i++) s+=A(`flick:${(2+i%4).toFixed(1)}`,`<path d="M${(i*53)%520} ${y+10+i*9} h${40+(i%3)*18}" stroke="#e9a070" stroke-width="2" opacity="${.12+(i%3)*.06}"/>`);
  return s; }
function TORCH(x,y,s){ s=s||1; return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3" y="0" width="6" height="58" fill="#3a2410"/><path d="M-9 4 L9 4 L6 -6 L-6 -6Z" fill="#7a5a28"/></g>`+fire(x,y-18*s,1.15*s); }
function ASHOKA(x,y,s){ let b=''; [[-38,-150,46],[8,-176,52],[44,-140,44],[-4,-120,48],[-52,-112,36]].forEach(([dx,dy,r],i)=>{ b+=`<circle cx="${dx}" cy="${dy}" r="${r}" fill="${i%2?'#0d2e2c':'#0a2624'}"/>`; });
  for(let i=0;i<14;i++){ b+=`<circle cx="${r1(-70+((i*37)%140))}" cy="${r1(-205+((i*53)%120))}" r="3.6" fill="${i%3?'#ff7a3a':'#ffb060'}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-9 0 Q-6 -70 -2 -120 L8 -120 Q10 -70 12 0Z" fill="#14100e"/>${b}</g>`; }
// a pink-blossom tree of the apsara's moonlit garden
function BLOSSOM(x,y,s){ let b=''; [[-40,-150,44],[10,-180,50],[46,-140,42],[-6,-122,46],[-56,-112,32]].forEach(([dx,dy,r],i)=>{ b+=`<circle cx="${dx}" cy="${dy}" r="${r}" fill="${i%2?'#6a3a7a':'#5a2e6c'}"/>`; });
  for(let i=0;i<16;i++){ b+=`<circle cx="${r1(-80+((i*41)%150))}" cy="${r1(-215+((i*57)%130))}" r="3.4" fill="${i%3?'#ffc0e0':'#fff0f8'}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-9 0 Q-6 -70 -2 -120 L8 -120 Q10 -70 12 0Z" fill="#241430"/>${b}</g>`; }
function TRUNK(x,y,w,h,col){ return `<path d="M${x-w/2} ${y} Q${x-w*.3} ${y-h/2} ${x-w*.2} ${y-h} L${x+w*.25} ${y-h} Q${x+w*.35} ${y-h/2} ${x+w/2} ${y}Z" fill="${col||'#0e0a14'}"/>`; }
const PANCH_SKY = ()=>skyBand([[0,'#120c2a'],[.45,'#3a2250'],[.75,'#a8583a'],[1,'#e09a50']])+`<circle cx="400" cy="640" r="80" fill="#ffd9a0" opacity=".55"/><circle cx="400" cy="640" r="150" fill="url(#saf)" opacity=".35"/>`;
const ASHOKA_SKY = ()=>skyBand([[0,'#020c14'],[.5,'#0a2a30'],[1,'#17463e']])+stars(50,400);
function PANCH_FAR(y){ let s=hills(y-80,34,'#241636',120); [40,150,260,380,490].forEach((x,i)=>{ s+=TRUNK(x,y-40,34+i%3*8,380+i%2*80,'#150c1e'); }); return s; }
function ASHOKA_FAR(y){ let s=hills(y-60,30,'#0a2226',110); [60,230,410,520].forEach((x,i)=>{ s+=ASHOKA(x,y-20,.8+i%2*.3); }); return s; }
function VATIKA_GND(y){ return ground(y,'#0a1c1c','#1d5a52')+tufts(y-8,'#1b5a48',50)+flowers(y,16); }
function PANCH_GND(y){ return ground(y,'#1d1020','#5a3a4a')+tufts(y-8,'#3a2a3a',40); }
function LANKA_GND(y){ return ground(y,'url(#gndW)','#6a2a1a')+tufts(y-10,'#4a2418',30); }
const DIVINE_BG = (cx,cy)=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(cx,cy,'gw')+A('spin:60:'+cx+':'+cy,`<circle cx="${cx}" cy="${cy}" r="240" fill="none" stroke="#fff3c4" stroke-width="2" stroke-dasharray="4 14" opacity=".5"/><circle cx="${cx}" cy="${cy}" r="170" fill="none" stroke="#ffe08a" stroke-width="1.5" stroke-dasharray="2 10" opacity=".5"/>`);

/* ---------- the antahpura (women's chamber) of Ravan's palace ---------- */
function PILLAR(x,y,h,w){ w=w||36; let f=''; for(let i=1;i<5;i++) f+=`<line x1="${x-w/2+i*w/5}" y1="${y-h}" x2="${x-w/2+i*w/5}" y2="${y}" stroke="#000" stroke-opacity=".28" stroke-width="2"/>`;
  return `<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="#3a1424"/>`+f+`<rect x="${x-w/2}" y="${y-h}" width="5" height="${h}" fill="#ffd9a0" opacity=".12"/>`+
    `<rect x="${x-w/2-7}" y="${y-h-16}" width="${w+14}" height="18" rx="4" fill="url(#gold)"/><rect x="${x-w/2-4}" y="${y-8}" width="${w+8}" height="12" rx="3" fill="url(#gold)"/><path d="M${x-w/2} ${y-h*.6} h${w}" stroke="#d9a73a" stroke-width="3" opacity=".7"/>`; }
function ARCHWIN(x,y,w,h){ const r=h*.62; let g='';
  for(let i=1;i<6;i++) g+=`<line x1="${x+i*w/6}" y1="${y-r}" x2="${x+i*w/6}" y2="${y}" stroke="#d9a73a" stroke-width="1.6" opacity=".45"/>`;
  for(let j=1;j<7;j++) g+=`<line x1="${x}" y1="${y-j*r/7}" x2="${x+w}" y2="${y-j*r/7}" stroke="#d9a73a" stroke-width="1.6" opacity=".45"/>`;
  const d=`M${x} ${y} V${y-r} Q${x} ${y-h} ${x+w/2} ${y-h} Q${x+w} ${y-h} ${x+w} ${y-r} V${y}Z`;
  return `<path d="${d}" fill="#0c0618"/><path d="${d}" fill="#7a8ad8" opacity=".2"/>`+g+`<path d="${d}" fill="none" stroke="url(#gold)" stroke-width="5"/>`; }
function HANGLAMP(x,len,delay){ return A(`rock:3.5:${(.55+delay).toFixed(2)}:${x}:0`,`<line x1="${x}" y1="0" x2="${x}" y2="${len}" stroke="#d9a73a" stroke-width="2"/><path d="M${x-16} ${len} Q${x} ${len+22} ${x+16} ${len}Z" fill="url(#gold)"/>`+A('flick:6',`<circle cx="${x}" cy="${len-4}" r="46" fill="url(#saf)" opacity=".7"/>`)+`<path d="M${x-3} ${len} Q${x} ${len-16} ${x+3} ${len}Z" fill="#ffe29a"/>`); }
function CURTAIN(x,w,flip){ const f=flip?-1:1; return A(`rock:1.6:.45:${x}:0`,`<path d="M${x} -20 L${x+f*w} -20 Q${x+f*w*.7} 300 ${x+f*w*.9} 760 L${x} 800Z" fill="#6a1226"/><path d="M${x+f*w*.3} -20 Q${x+f*w*.2} 300 ${x+f*w*.35} 780 M${x+f*w*.62} -20 Q${x+f*w*.5} 300 ${x+f*w*.62} 770" stroke="#000" stroke-opacity=".3" stroke-width="3" fill="none"/><path d="M${x} 780 L${x+f*w*.9} 750" stroke="url(#gold)" stroke-width="4"/>`); }
const CH_SKY = ()=>`<rect width="540" height="960" fill="#1a0712"/><rect width="540" height="320" fill="#10040c"/><rect y="312" width="540" height="14" fill="url(#gold)" opacity=".6"/>`+
  `<circle cx="270" cy="560" r="380" fill="url(#saf)" opacity=".28"/>`;
const CH_FAR = ()=>[24,200,376].map(x=>ARCHWIN(x,790,140,340)).join('')+`<g opacity=".95">${moon(270,560,24)}</g>`+[8,182,358,532].map(x=>PILLAR(x,800,490,36)).join('');
const CH_MID = ()=>HANGLAMP(110,230,0)+HANGLAMP(270,290,.3)+HANGLAMP(430,230,.6)+CURTAIN(-6,70,false)+CURTAIN(546,70,true);
const CH_FLOOR = ()=>`<path d="M-20 790 L560 790 L560 1000 L-20 1000Z" fill="#240a16"/><path d="M130 790 L410 790 L640 1000 L-100 1000Z" fill="#7a1c2c"/><path d="M130 790 L-100 1000 M410 790 L640 1000" stroke="url(#gold)" stroke-width="5"/><path d="M175 790 L10 1000 M365 790 L530 1000" stroke="#d9a73a" stroke-width="2" opacity=".6"/>`+
  [820,860,910,970].map(y=>`<path d="M0 ${y} H540" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`).join('')+
  `<ellipse cx="270" cy="820" rx="260" ry="40" fill="url(#saf)" opacity=".2"/>`;
// a woman asleep on a carved couch (cloth, jewels, hair on the pillow); never anything more than sleep
function SLEEPER(x,y,s,silk,skin,flip){ s=s||1; skin=skin||'#c98a6a'; silk=silk||'#8a1a3a';
  const woman=`<path d="M-94 -20 C-88 -48 -52 -50 -42 -28 C-34 -10 -62 -6 -94 -10Z" fill="#150a10"/><circle cx="-60" cy="-34" r="14" fill="${skin}"/>`+
    `<path d="M-52 -37 q4 3 8 0" stroke="#140a06" stroke-width="1.6" fill="none"/><path d="M-50 -27 q3 2 6 0" stroke="#a8282e" stroke-width="1.6" fill="none"/><path d="M-46 -34 l3 4 l-4 0" stroke="#7a4a30" stroke-width="1" fill="none"/><circle cx="-52" cy="-45" r="1.5" fill="#c8202a"/>`+
    `<path d="M-76 -36 C-74 -52 -48 -54 -44 -40 C-54 -47 -66 -46 -76 -36Z" fill="#150a10"/><circle cx="-69" cy="-27" r="2.4" fill="#ffd25e"/><path d="M-66 -44 C-60 -48 -54 -47 -50 -44" stroke="#ffd25e" stroke-width="1.6" fill="none"/>`+
    `<path d="M-44 -16 C-36 -40 -4 -42 22 -33 C48 -27 72 -25 90 -14 V-4 H-44Z" fill="${silk}"/><path d="M-44 -16 C-36 -40 -4 -42 22 -33 C48 -27 72 -25 90 -14" stroke="url(#gold)" stroke-width="3" fill="none"/>`+
    `<path d="M-12 -35 C-8 -22 -10 -10 -14 -4 M28 -31 C30 -20 28 -10 26 -4 M60 -25 C61 -17 60 -10 58 -4" stroke="#000" stroke-opacity=".25" stroke-width="2" fill="none"/>`+
    `<path d="M-42 -22 C-32 -29 -22 -29 -12 -24" stroke="${skin}" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M-22 -29 v7 M-18 -29 v7 M-14 -28 v7" stroke="#ffd25e" stroke-width="2.4"/>`+
    `<path d="M88 -15 q10 1 12 8 l-12 1Z" fill="${skin}"/><path d="M90 -9 h8" stroke="#ffd25e" stroke-width="2"/>`+
    A('flick:3',`<circle cx="-69" cy="-27" r="7" fill="#ffd25e" opacity=".3"/>`);
  return `<g transform="translate(${x} ${y}) scale(${(flip?-1:1)*s} ${s})">`+
    `<rect x="-88" y="14" width="9" height="30" rx="3" fill="#3a1a0e"/><rect x="79" y="14" width="9" height="30" rx="3" fill="#3a1a0e"/>`+
    `<path d="M-102 18 V-42 Q-102 -56 -88 -56 H-80 V18Z" fill="#6a2c18" stroke="#d9a73a" stroke-width="2"/><circle cx="-91" cy="-49" r="3.6" fill="url(#gold)"/>`+
    `<rect x="-96" y="0" width="192" height="16" rx="6" fill="#6a2c18" stroke="#d9a73a" stroke-width="2"/><rect x="-90" y="-12" width="180" height="14" rx="7" fill="#efdfbe"/>`+
    `<ellipse cx="-62" cy="-20" rx="28" ry="12" fill="#f6ead0" stroke="#d9c49a" stroke-width="1.4"/><path d="M-92 -20 l-5 6 M-32 -20 l5 6" stroke="#ffd25e" stroke-width="2"/>`+
    A('bob:1.2:.38',woman)+`</g>`; }

/* the "dark tide": a black shape with ten crown-like spikes slides in from the right and covers the picture (the assault is never drawn) */
function DARKTIDE(delay,dur){ let d='M700 -100 L0 -100'; for(let i=0;i<=20;i++){ d+=` L${i%2?-62:0} ${-100+i*58}`; } d+=' L0 1100 L700 1100Z';
  return A(`slide:-720:0:${dur||1.5}:${delay}`,`<g transform="translate(620 0)"><path d="${d}" fill="#04020a" opacity=".96"/><path d="M0 -100 L0 1100" stroke="#8a1a1a" stroke-width="2" opacity=".5"/></g>`); }

/* Brahma's curse: a big glowing open hand with rings of light */
function CURSEHAND(x,y,s,d){ return A(`pop:${d}`,`<g transform="translate(${x} ${y}) scale(${s})"><circle r="190" fill="url(#gw)" opacity=".95"/>`+A('ripple:2:0:0',`<circle r="130" fill="none" stroke="#fff3c4" stroke-width="5"/>`)+
  `<g fill="#fff7dc" stroke="#ffd27a" stroke-width="4" style="filter:drop-shadow(0 0 16px #ffd27a)"><rect x="-38" y="-20" width="76" height="90" rx="28"/><rect x="-40" y="-96" width="17" height="90" rx="8.5"/><rect x="-19" y="-114" width="17" height="106" rx="8.5"/><rect x="2" y="-108" width="17" height="100" rx="8.5"/><rect x="23" y="-90" width="16" height="84" rx="8"/><rect x="-66" y="-6" width="16" height="66" rx="8" transform="rotate(-38 -58 30)"/></g></g>`); }

/* Ravan's head cracks (stylised, light only): glowing cracks draw in, pieces of the head fly apart */
function CRACK(x,y,s,t){ const P=['M0 -34 L-6 -20 L4 -10 L-8 2 L2 14 L-4 30','M-6 -20 L-22 -14 L-30 -2','M4 -10 L20 -16 L30 -28','M-8 2 L-24 10 L-28 24','M2 14 L18 8 L28 18'];
  return `<g transform="translate(${x} ${y}) scale(${s})" style="filter:drop-shadow(0 0 5px #ffe9a8)">`+P.map((d,i)=>A(`draw:${(t+i*.1).toFixed(2)}:.35`,`<path d="${d}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" fill="none" stroke="#fff6d0" stroke-width="2.2" stroke-linecap="round"/>`)).join('')+`</g>`; }
function SHARDS(x,y,t){ return [[-60,-50],[55,-60],[-70,30],[62,42],[0,-90],[8,70],[-34,-80],[36,-86]].map(([dx,dy],i)=>
  A(`pop:${(t+.5).toFixed(2)}`,A(`slide:${dx*1.8}:${dy*1.8+50}:1.3:${(t+.5).toFixed(2)}`,A(`fadeout:${(t+1.3).toFixed(2)}:.6`,`<path transform="translate(${x} ${y}) rotate(${i*47})" d="M0 -10 L9 8 L-8 7Z" fill="#6a3a2c" stroke="#ffe9a8" stroke-width="1.6"/>`)))).join(''); }
const FLASH = (t,col,op)=>A(`pop:${t}`,A(`fadeout:${(t+.05).toFixed(2)}:.55`,`<rect x="-900" y="-900" width="2400" height="3000" fill="${col||'#fff'}" opacity="${op||.9}"/>`));

/* hanging veil of the apsara, drifting down (silhouette-only scene) */
const VEIL = (x,y,delay)=>A(`slide:-70:380:4:${delay}`,A('rock:14:.6:'+x+':'+y,`<path d="M${x} ${y} C${x+30} ${y-30} ${x+60} ${y+20} ${x+100} ${y-10} C${x+90} ${y+40} ${x+110} ${y+80} ${x+84} ${y+130} C${x+60} ${y+90} ${x+30} ${y+100} ${x+8} ${y+140} C${x+22} ${y+90} ${x-6} ${y+50} ${x} ${y}Z" fill="#e6b0ff" opacity=".78"/><path d="M${x+14} ${y+6} C${x+40} ${y+30} ${x+60} ${y+50} ${x+70} ${y+100}" stroke="#fff" stroke-width="1.5" fill="none" opacity=".6"/>`));

/* palm-leaf manuscript card with a scripture name (used before each verse) */
const SCRIPTURE = (bg,name,loc)=>({ sky:bg,
  mid:()=>fire(110,820,1.1)+fire(430,820,1.1),
  art:()=>A('rise:40:1:0.3',pothi(270,680,1.25)),
  title:{text:name, y:200, size:62, delay:.3},
  front:()=>big(270,290,32,'#f6ecd2',loc,1.3) });

VIDEO({
  title:'रावण और माँ सीता का सच', format:'short', target:75,
  music:'scenes',
  handheld:0.7,
  keywords:['रावण','सीता','हनुमान','ब्रह्मा','शाप','वाल्मीकि','पुंजिकस्थला','बलपूर्वक','जबरदस्ती','भय','सौ','टुकड़े'],
  shots:[
    /* 1a — opening (no hook text): ten crowned heads as one black silhouette against a huge dark moon over Lanka's sea; crane down */
    { line:'क्या रावण ने कभी माँ सीता को नहीं छुआ?', scene:'ravan-night', mood:'anger', fx:'embers', capTop:790,
      cam:{from:[270,330,1.45],to:[270,570,1.0]},
      sky:()=>NIGHT_RED()+BIGMOON(270,430,160)+CLOUDS_DARK(330)+BATS(250), far:()=>LANKA(790,'#12060c')+SEA(790), mid:()=>LANKAWALL(870,'#0c0408')+TORCH(70,780,1.3)+TORCH(470,780,1.3), art:()=>LANKA_GND(900),
      cast:[{c:RAVAN_KING, with:SIL(), x:270, y:905, s:1.12, expr:'calm', acts:[[0,'stand'],[1.6,'hold',1.0]]}] },

    /* 1b — face of Ravan lit by torchlight, the claim */
    { line:'क्या रावण सच में बुरा नहीं था? खैर, सच्चाई कुछ और ही है!', scene:'ravan-night', mood:'anger', fx:'embers', tr:'flash', capTop:130,
      cam:{keys:[[0,270,600,1.2],[1.6,330,590,1.5],[3.4,330,590,2.5]]},
      far:()=>palaceBack(810,'#2a0e1a')+HANGLAMP(100,200,0)+HANGLAMP(440,240,.4), mid:()=>palaceMid(810)+TORCH(60,700,1.3)+TORCH(480,700,1.3), art:()=>palaceFloor(810),
      cast:[{c:RAVAN_G, x:330, y:880, s:1.15, flip:true, expr:'calm', props:{front:'khadga'}, acts:[[0,'stand'],[2.2,'explain',.8]], talk:true}] },

    /* 2a — Hanuman on Lanka's rampart at night, searching */
    { line:'जब हनुमान जी लंका में रावण के महल में गए,', scene:'hanuman-lanka', mood:'calm', fx:'dust', tr:'dip', capTop:210,
      cam:{from:[170,560,1.1],to:[330,540,1.25]},
      sky:()=>NIGHT_RED()+moon(110,190,34)+CLOUDS_DARK(300), far:()=>LANKA(740,'#1a0a14')+SEA(790), mid:()=>LANKAWALL(850,'#12060c')+TORCH(80,720,1.2)+TORCH(450,720,1.2), art:()=>LANKA_GND(880),
      cast:[{...HANU_G, props:{front:'gada'}, x:230, y:890, s:.78, expr:'calm', walk:{from:-220,dur:2.4}, acts:[[0,'shoulder'],[2.5,{a:[24,128],lean:12,head:-6,b:[-6,8]},.8]]}] },

    /* 2b — Hanuman peeps round the doorway: close-up of his wondering face, lit by the lamps of the chamber */
    { line:'तो उन्होंने ऐसे कक्ष देखे', scene:'ravan-chamber', mood:'sad', fx:'dust', tr:'iris', trAt:[130,610], capTop:120,
      cam:{keys:[[0,260,640,1.3],[1.8,190,615,2.4]]},
      sky:CH_SKY, far:CH_FAR, mid:CH_MID, art:()=>CH_FLOOR(),
      cast:[{c:HANUMAN, x:158, y:935, s:1.2, expr:'surprise', acts:[[0,{lean:14,head:-4,a:[10,30],b:[-6,8]}],[1.0,{lean:20,head:-8,a:[14,34],b:[-6,8]},1.0]]}],
      near:()=>`<path d="M-40 -40 H104 V1000 H-40Z" fill="#05020a"/><path d="M104 -40 V1000" stroke="#d9a73a" stroke-width="3" opacity=".7"/><rect x="94" y="-40" width="14" height="1040" fill="#d9a73a" opacity=".14"/>` },

    /* 2c — the chamber seen: rows of women asleep on couches (jewels, silks, lamps, moonlit jaali) */
    { line:'जो महिलाओं से भरे हुए थे।', scene:'ravan-chamber', mood:'sad', fx:'dust', tr:'dissolve', capTop:120,
      cam:{keys:[[0,170,590,1.12],[3.0,370,590,1.12]]},
      sky:CH_SKY, far:CH_FAR, mid:CH_MID,
      art:()=>CH_FLOOR()+SLEEPER(92,775,.78,'#8a1a3a','#b98060')+SLEEPER(270,775,.78,'#2a5a7a','#c98a6a')+SLEEPER(448,775,.78,'#6a2a7a','#b98060',true)+
              SLEEPER(215,895,1.08,'#a02a3a','#c98a6a')+SLEEPER(455,895,1.08,'#2a6a5a','#b98060',true),
      cast:[{c:HANUMAN, x:48, y:950, s:.9, expr:'sad', acts:[[0,{lean:12,head:-6,a:[10,30],b:[-6,8]}]]}] },

    /* 3 — the source card: Sundarkand */
    { line:'वाल्मीकि रामायण (सुंदरकांड, सर्ग 9, श्लोक 69) में इसका स्पष्ट उल्लेख है:', scene:'verse-source', mood:'divine', fx:'embers', tr:'iris', trAt:[270,680],
      cam:{from:[270,500,1.0],to:[270,470,1.2]},
      ...SCRIPTURE(()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="700" r="320" fill="url(#saf)" opacity=".4"/>`,'वाल्मीकि रामायण','सुंदरकांड · सर्ग 9 · श्लोक 69') },

    /* 4 — the verse in calligraphy */
    { line:'"युद्धकामेन ताः सर्वा रावणेन हृताः स्त्रियः"', nocap:true, chant:1.3, scene:'verse-source', mood:'divine', fx:'embers', tr:'zoom',
      cam:{from:[270,480,1.0],to:[270,470,1.1]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="470" r="330" fill="url(#saf)" opacity=".35"/>`,
      mid:()=>fire(80,860,1)+fire(460,860,1),
      calli:{lines:['युद्धकामेन ताः सर्वा','रावणेन हृताः स्त्रियः'], source:'सुंदरकांड 9 · श्लोक 69', y:400, size:40, col:'#ffe9a8', delay:.8, gap:1.6, write:1.3, glow:true, scrim:true} },

    /* 5 — meaning: women taken by force in his conquests (a line of grieving women led by a black Ravan silhouette) */
    { line:'(अर्थात: रावण ने अपने विजयन अभियानों के दौरान इन सभी महिलाओं को बलपूर्वक बंदी बनाया था।)', scene:'ravan-conquest', mood:'anger', fx:'embers', tr:'whip', capTop:150,
      cam:{from:[200,560,1.05],to:[350,560,1.15]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+BIGMOON(430,260,70)+`<circle cx="120" cy="650" r="260" fill="url(#gr)" opacity=".25"/>`+CLOUDS_DARK(200),
      far:()=>LANKA(780,'#12060c')+A('flick:5',`<rect x="0" y="560" width="540" height="240" fill="#ff3a1c" opacity=".08"/>`)+SEA(790), art:()=>LANKA_GND(820),
      cast:[{c:RAVAN_KING, with:SIL(), x:90, y:885, s:1.0, expr:'angry', props:{front:'khadga'}, acts:[[0,'carry']], walk:{from:-120,dur:3}},
            {...WOMAN('#4a2438','#5a2a3a','#6a3048'), x:220, y:865, s:.74, expr:'sad', acts:[[0,'lookDown']], walk:{from:-120,dur:3}},
            {...WOMAN('#2a3a5a','#2a3a68','#3a4a78'), x:300, y:870, s:.74, expr:'sad', acts:[[0,'grief']], walk:{from:-120,dur:3}},
            {...WOMAN('#3a5a3a','#2a5a46','#4a6a4a'), x:380, y:866, s:.74, expr:'sad', acts:[[0,'lookDown']], walk:{from:-120,dur:3}},
            {...WOMAN('#5a3a1a','#7a4a1a','#8a5a2a'), x:460, y:872, s:.74, expr:'sad', acts:[[0,'weep']], walk:{from:-120,dur:3}}] },

    /* 6 — the dark deeds go on: Ravan's face, a turn to the camera */
    { line:'लेकिन रावण के काले कारनामों की दास्तान यहीं खत्म नहीं होती।', scene:'ravan-night', mood:'anger', fx:'embers', tr:'dip', capTop:140,
      cam:{keys:[[0,270,620,1.1],[2.2,230,590,2.0],[3.8,230,590,2.3]]},
      sky:()=>NIGHT_RED()+BIGMOON(420,260,90)+CLOUDS_DARK(300), far:()=>LANKA(800,'#10060c'), mid:()=>TORCH(80,720,1.4)+TORCH(480,740,1.2), art:()=>LANKA_GND(820),
      cast:[{c:RAVAN_G, x:230, y:890, s:1.15, expr:'angry', props:{front:'khadga'}, acts:[[0,'stand'],[1.6,'accuse',.6]], talk:true}] },

    /* 7a — Punjikasthala: the apsara in her moonlit blossom garden; the dark tide approaches */
    { line:'उसने पुंजिकस्थला नाम की एक अप्सरा के साथ दुराचार किया था,', scene:'punjikasthala', mood:'calm', fx:'petals', tr:'fade', capTop:150,
      cam:{from:[270,580,1.1],to:[270,550,1.3]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(80,560)+moon(400,200,46)+`<circle cx="270" cy="640" r="260" fill="url(#gw)" opacity=".25"/>`,
      far:()=>hills(780,40,'#16163a',130)+BLOSSOM(70,800,.9)+BLOSSOM(470,800,1.0)+BLOSSOM(380,790,.7), mid:()=>BLOSSOM(500,860,1.15)+BLOSSOM(30,860,1.1), art:()=>VATIKA_GND(840),
      cast:[{c:PUNJIKASTHALA, x:240, y:890, s:1.05, expr:'serene', acts:[[0,'stand'],[0.6,'lookUp',1.0]]}],
      front:()=>DARKTIDE(3.2,1.8) },

    /* 7b — cut away: only the drifting veil and darkness (nothing is shown) */
    { line:'उसके वस्त्र उतारे और उस पर जबरदस्ती की थी।', scene:'punjikasthala-dark', mood:'shock', fx:'dust', tr:'dip', capTop:700, shake:[0.4,0.6,5],
      cam:{from:[270,500,1.0],to:[270,560,1.2]},
      sky:()=>`<rect width="540" height="960" fill="#05020a"/>`+stars(40,500)+`<circle cx="270" cy="330" r="150" fill="url(#gr)" opacity=".3"/>`+moon(270,330,50)+A('fadein:0.5:1.2',`<rect width="540" height="960" fill="#05020a" opacity=".78"/>`),
      front:()=>VEIL(190,300,.4) },

    /* 8a — Brahma learns of it: a figure of gold-white light */
    { line:'जब ब्रह्मा जी को इस कुकृत्य का पता चला,', scene:'brahma-light', mood:'divine', fx:'sparks', tr:'glow', capTop:130,
      cam:{from:[270,560,1.25],to:[270,520,1.0]},
      sky:()=>DIVINE_BG(270,470), far:()=>`<circle cx="270" cy="560" r="260" fill="url(#gw)" opacity=".6"/>`, art:()=>`<path d="M-20 900 Q270 860 560 900 L560 1000 L-20 1000Z" fill="#20122a"/>`,
      cast:[{c:BRAHMA, x:270, y:900, s:1.0, expr:'serene', acts:[[0,'stand'],[1.6,'think',.8]]}] },

    /* 8b — the curse: a glowing hand rises, Ravan recoils */
    { line:'तो उन्होंने रावण को शाप दिया —', scene:'brahma-curse', mood:'divine', fx:'sparks', tr:'flash', capTop:120,
      cam:{from:[270,560,1.0],to:[300,540,1.25]}, shake:[0.7,0.7,8],
      sky:()=>DIVINE_BG(270,480), art:()=>`<path d="M-20 900 Q270 860 560 900 L560 1000 L-20 1000Z" fill="#20122a"/>`,
      cast:[{c:BRAHMA, x:120, y:900, s:.9, expr:'angry', acts:[[0,'stand'],[0.5,'accuse',.5]]},
            {c:RAVAN_G, x:420, y:900, s:.85, flip:true, expr:'surprise', acts:[[0,'stand'],[1.0,'recoil',.35]]}],
      front:()=>CURSEHAND(270,470,1.35,.5),
      focus:{at:.6, sound:'shimmer', dur:2.4, duck:.35} },

    /* 8c — "your head will break into a hundred pieces": the head cracks (stylised, light only) */
    { line:'यदि उसने भविष्य में कभी भी किसी भी स्त्री के साथ जबरदस्ती की, तो उसके सिर के सौ टुकड़े हो जाएंगे!', scene:'brahma-curse', mood:'shock', fx:'sparks', tr:'whip', capTop:130,
      cam:{keys:[[0,240,620,1.15],[4.0,225,590,1.9],[4.5,222,578,2.6,'snap'],[7,222,578,2.6]]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="560" r="300" fill="url(#gw)" opacity=".4"/>`, art:()=>`<path d="M-20 920 Q270 880 560 920 L560 1000 L-20 1000Z" fill="#20122a"/>`,
      cast:[{c:RAVAN_G, x:270, y:930, s:1.2, expr:'surprise', acts:[[0,'stand'],[0.8,'recoil',.4],[4.4,'shock',.3]]}],
      front:()=>CRACK(270,590,1.5,4.4)+SHARDS(270,590,4.4)+FLASH(4.45,'#fff3c4',.85),
      shake:[4.4,0.9,11], focus:{at:4.4, sound:'slay', dur:2.6, duck:.22} },

    /* 9 — the popular claim: Sita in Panchavati, calm and dignified */
    { line:'और अब उस लोकप्रिय दावे की सच्चाई जानिए कि "उसने कभी माँ सीता को नहीं छुआ"...', scene:'sita-panchavati', mood:'sad', fx:'petals', tr:'dip', capTop:140,
      cam:{from:[270,580,1.1],to:[250,550,1.3]},
      sky:()=>PANCH_SKY(), far:()=>PANCH_FAR(790), mid:()=>ashramHut(430,810,1.0)+fire(330,860,.6), art:()=>PANCH_GND(830),
      cast:[{c:SITA, x:200, y:890, s:1.05, expr:'sad', acts:[[0,'stand'],[1.8,'lookAway',.8]]}] },

    /* 10 — source card: Aranyakand */
    { line:'वाल्मीकि रामायण (अरण्यकांड, सर्ग 49, श्लोक 17) के अनुसार:', scene:'verse-source', mood:'divine', fx:'embers', tr:'iris', trAt:[270,680],
      cam:{from:[270,500,1.0],to:[270,470,1.2]},
      ...SCRIPTURE(()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="700" r="320" fill="url(#saf)" opacity=".4"/>`,'वाल्मीकि रामायण','अरण्यकांड · सर्ग 49 · श्लोक 17') },

    /* 11 — the verse in calligraphy */
    { line:'"ततस्तु परगृह्याशु रावणः क्रोधमूर्च्छितः। वामेन परिजग्राह मूर्ढ़जेषु करेण सः॥ ऊरुमध्ये च करेण दक्षिणेन..."', nocap:true, chant:1.3, scene:'verse-source', mood:'divine', fx:'embers', tr:'zoom',
      cam:{from:[270,480,1.0],to:[270,470,1.1]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="470" r="330" fill="url(#saf)" opacity=".35"/>`,
      mid:()=>fire(80,860,1)+fire(460,860,1),
      calli:{lines:['ततस्तु परगृह्याशु','रावणः क्रोधमूर्च्छितः।','वामेन परिजग्राह','मूर्ढ़जेषु करेण सः॥','ऊरुमध्ये च करेण दक्षिणेन...'], source:'अरण्यकांड 49 · श्लोक 17', y:310, size:36, col:'#ffe9a8', delay:.8, gap:1.5, write:1.2, glow:true, scrim:true} },

    /* 12a — Panchavati: Ravan's shadow-figure strides in towards Sita (nothing more is shown) */
    { line:'(अर्थात: अपहरण के समय क्रोधातुर् रावण ने एक हाथ से माँ सीता के बाल', scene:'sita-abduction', mood:'anger', fx:'dust', tr:'dip', capTop:140,
      cam:{from:[200,560,1.1],to:[300,550,1.2]},
      sky:()=>PANCH_SKY()+`<rect width="540" height="960" fill="#1a0408" opacity=".25"/>`, far:()=>PANCH_FAR(790), mid:()=>ashramHut(110,810,.9), art:()=>PANCH_GND(830),
      cast:[{c:SITA, x:190, y:890, s:1.05, expr:'surprise', acts:[[0,'stand'],[1.6,'recoil',.4]]},
            {c:RAVAN_KING, with:SIL(), x:420, y:895, s:1.15, flip:true, expr:'angry', acts:[[0,'carry'],[2.0,'rage',.4]], walk:{from:240,dur:2.6}}] },

    /* 12b — cut to Sita's face; the dark tide closes over the picture */
    { line:'और दूसरे हाथ से उनकी जांघों को पकड़ा था।)', scene:'sita-abduction', mood:'sad', fx:'dust', tr:'whip', capTop:130,
      cam:{keys:[[0,270,610,1.2],[1.4,265,590,2.4,'snap'],[4,265,590,2.7]]},
      sky:()=>PANCH_SKY(), far:()=>PANCH_FAR(790), art:()=>PANCH_GND(830),
      cast:[{c:SITA, x:270, y:935, s:1.4, expr:'sad', tears:true, acts:[[0,'stand'],[0.8,'grief',.8]]}],
      front:()=>DARKTIDE(1.9,1.6), shake:[1.9,1.2,6] },

    /* 13a — Lanka court: Ravan himself admits it (Yuddhakand) */
    { line:'और तो और, युद्धकांड में रावण खुद स्वीकार करता है', scene:'ravan-admits', mood:'anger', fx:'embers', tr:'dip', capTop:140,
      cam:{from:[280,570,1.1],to:[310,550,1.3]},
      far:()=>palaceBack(810,'#2a0e1a')+HANGLAMP(120,210,0)+HANGLAMP(420,250,.5), mid:()=>palaceMid(810)+TORCH(60,700,1.3)+TORCH(480,700,1.3), art:()=>palaceFloor(810),
      cast:[{c:RAVAN_G, x:320, y:885, s:1.1, flip:true, expr:'calm', talk:true, props:{front:'khadga'}, acts:[[0,'stand'],[1.8,'explain',.8]]}] },

    /* 13b — Ashoka Vatika: Sita, far from his bed, dignified */
    { line:'कि वह माँ सीता को अपनी शैया पर इसलिए नहीं ला सका', scene:'ashoka-vatika', mood:'sad', fx:'flies', tr:'dissolve', capTop:140,
      cam:{from:[300,580,1.1],to:[300,550,1.15]},
      sky:()=>ASHOKA_SKY()+moon(420,170,36), far:()=>ASHOKA_FAR(800), mid:()=>ASHOKA(70,840,1.05)+ASHOKA(500,850,.9), art:()=>VATIKA_GND(840),
      cast:[{...SITA_G, x:150, y:890, s:.95, expr:'sad', acts:[[0,'kneel'],[1.6,'kneel+lookAway',.8]]},
            {c:RAVAN_G, x:430, y:890, s:.98, flip:true, expr:'angry', acts:[[0,'stand'],[1.2,'accuse',.5]]}] },

    /* 13c — THE moment: Ravan's fear of Brahma's curse (face, with the golden hand behind him) */
    { line:'क्योंकि उसे ब्रह्मा जी के शाप का भय था —', scene:'ravan-fear', mood:'shock', fx:'sparks', tr:'flash', capTop:700, shake:[0.3,0.8,8],
      cam:{keys:[[0,240,610,1.3],[1.0,185,610,2.2,'snap'],[4,185,610,2.5]]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="400" cy="420" r="260" fill="url(#gw)" opacity=".45"/>`, art:()=>`<path d="M-20 920 Q270 880 560 920 L560 1000 L-20 1000Z" fill="#20122a"/>`,
      cast:[{c:RAVAN_G, x:250, y:935, s:1.2, expr:'surprise', acts:[[0,'stand'],[0.6,'recoil',.35]]}],
      front:()=>A('fadein:.3:.6',CURSEHAND(250,500,.5,0)),
      focus:{at:.5, sound:'kaal', dur:3.0, duck:.25} },

    /* 13d — closing: not respect for Sita but fear for his own life; Sita stays dignified, Ravan shrinks away */
    { line:'सीता जी के प्रति सम्मान की वजह से नहीं, बल्कि सिर्फ अपने प्राणों और शाप के डर से!', scene:'sita-sorrow', mood:'sad', fx:'flies', tr:'dissolve', capTop:140,
      cam:{from:[270,580,1.15],to:[250,550,1.45]},
      sky:()=>ASHOKA_SKY()+moon(400,170,40), far:()=>ASHOKA_FAR(800), mid:()=>ASHOKA(460,840,1.1), art:()=>VATIKA_GND(840),
      cast:[{...SITA_G, x:230, y:895, s:1.12, expr:'serene', acts:[[0,'stand'],[2.4,'lookUp',1.2]], aura:'gg'},
            {c:RAVAN_KING, with:SIL(), x:450, y:885, s:.6, flip:true, expr:'sad', acts:[[0,'stand'],[1.0,'lookDown',.8]], exit:{at:4.5,fade:1.2}}] }
  ]
});
