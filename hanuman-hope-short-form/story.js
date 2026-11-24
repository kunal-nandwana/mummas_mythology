/* हनुमान जी और आशा — Short, about 80 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js hanuman-hope-short-form
   Look: Lanka rooftops at golden dusk (plum + amber, a low golden sun, NO red moon) -> dark slate-blue shore (starlight, silver glints)
         -> first light of dawn (lilac + peach, sun rising out of the sea) -> Ashoka Vatika in warm gold-green morning light.
   Story beat: Hanuman's despair and the answer were one step apart. He stops, breathes (a soft ring of light), and in the very next shot he sees Ashoka Vatika.
   Safety: no self-harm is ever drawn. Only grief, the dark sea, and a small UNLIT pile of wood far away (a faint glow sits on the horizon, not on the pile).
   No hook text, no intro, no end card. Music: scene library (flute + tanpura, soft). */

/* ---------- own pieces (new for this video) ---------- */
const DUSK_SKY = ()=>skyBand([[0,'#2b2554'],[.36,'#6f4c7c'],[.62,'#e0935c'],[.84,'#f8c47c'],[1,'#fde2a4']])+
  `<circle cx="372" cy="640" r="240" fill="url(#gw)" opacity=".55"/><circle cx="372" cy="640" r="74" fill="#fff0c4"/><circle cx="372" cy="640" r="96" fill="#fff0c4" opacity=".25"/>`+
  A('drift:120:0:60',`<ellipse cx="110" cy="330" rx="150" ry="16" fill="#7a5088" opacity=".55"/><ellipse cx="430" cy="410" rx="170" ry="14" fill="#8a5a90" opacity=".5"/>`);
const TWILIGHT_SKY = ()=>skyBand([[0,'#1c1b48'],[.45,'#4a3868'],[.78,'#a8607a'],[1,'#d89a78']])+stars(26,300);

/* Lanka skyline: stepped terraces, gold domes with finials, little lit windows (plum silhouette, gold rim where the sun hits) */
function ROOFS(y,col,gold){ const c=col||'#33224c'; let s='';
  [[-10,86,64],[58,150,52],[116,104,70],[196,176,46],[250,120,66],[322,168,50],[378,100,62],[444,146,56],[500,92,50]].forEach(([x,h,w],i)=>{
    s+=`<rect x="${x}" y="${y-h}" width="${w}" height="${h+300}" fill="${c}"/><rect x="${x-4}" y="${y-h}" width="${w+8}" height="6" fill="${c}"/>`;
    s+=`<path d="M${x+4} ${y-h} Q${x+w/2} ${y-h-w*.8} ${x+w-4} ${y-h}Z" fill="${c}"/><rect x="${x+w/2-1}" y="${y-h-w*.8-14}" width="2" height="16" fill="${c}"/><circle cx="${x+w/2}" cy="${y-h-w*.8-16}" r="2.6" fill="${gold||'#f2c05a'}"/>`;
    s+=`<path d="M${x+4} ${y-h} Q${x+w/2} ${y-h-w*.8} ${x+w-4} ${y-h}" fill="none" stroke="${gold||'#f2c05a'}" stroke-width="1.8" opacity=".7"/>`;
    for(let k=0;k<3;k++) s+=A(`flick:${(3+((i+k)%4)).toFixed(1)}`,`<path d="M${r1(x+9+k*(w/3.3))} ${y-h+26+k*22} v-9 q3 -5 6 0 v9Z" fill="#ffc060"/>`); });
  return s; }
/* the terrace Hanuman stands on (low wall at the back, warm stone floor) */
function TERRACE(y,col,top){ let s=`<rect x="-20" y="${y-46}" width="580" height="${1000-y+46}" fill="${col||'#4a3254'}"/><path d="M-20 ${y-46} H560" stroke="${top||'#f0b872'}" stroke-width="3" opacity=".75"/>`;
  for(let x=-10;x<550;x+=44) s+=`<rect x="${x}" y="${y-70}" width="26" height="26" rx="4" fill="${col||'#4a3254'}"/><path d="M${x} ${y-70} H${x+26}" stroke="${top||'#f0b872'}" stroke-width="2" opacity=".6"/>`;
  return s+`<path d="M-20 ${y+30} Q270 ${y+10} 560 ${y+34}" stroke="${top||'#f0b872'}" stroke-width="2" fill="none" opacity=".25"/>`; }

/* palace colonnade seen straight on: pillars and hanging lamps shrink towards a glowing far arch */
const HALL_SKY = ()=>skyBand([[0,'#2a1830'],[.55,'#7a4a44'],[1,'#d29a5a']])+`<circle cx="270" cy="560" r="230" fill="url(#gw)" opacity=".7"/>`+
  `<path d="M226 640 V520 Q270 440 314 520 V640Z" fill="#fff0c4" opacity=".85"/><path d="M226 640 V520 Q270 440 314 520 V640" fill="none" stroke="#f2c05a" stroke-width="3"/>`;
function HALL_COLS(){ let s='';
  for(let i=0;i<6;i++){ const t=i/6, w=64*(1-t*.72), top=70+t*330, bot=980-t*300, xl=14+t*200, xr=540-14-t*200-w;
    [xl,xr].forEach(x=>{ s+=`<rect x="${r1(x)}" y="${r1(top)}" width="${r1(w)}" height="${r1(bot-top)}" fill="#b98852"/><rect x="${r1(x)}" y="${r1(top)}" width="${r1(w*.28)}" height="${r1(bot-top)}" fill="#e2b676" opacity=".7"/><rect x="${r1(x-4)}" y="${r1(top)}" width="${r1(w+8)}" height="${r1(w*.28)}" fill="#7a5530"/><rect x="${r1(x-4)}" y="${r1(bot-w*.3)}" width="${r1(w+8)}" height="${r1(w*.3)}" fill="#7a5530"/><rect x="${r1(x)}" y="${r1(top+(bot-top)*.5)}" width="${r1(w)}" height="${r1(w*.12)}" fill="#f2c05a"/>`; });
    s+=A(`bob:${(3+i%3)}:${(1.4+i*.2).toFixed(1)}`,`<path d="M270 -10 V${r1(110+t*150)}" stroke="#6a4a2a" stroke-width="2"/><circle cx="${i%2?236+t*20:304-t*20}" cy="${r1(130+t*150)}" r="${r1(9*(1-t*.5))}" fill="#ffd27a"/>`); }
  return s; }
const HALL_FLOOR = ()=>`<path d="M-20 1000 L560 1000 L330 650 L210 650Z" fill="#5e3430"/><path d="M130 1000 L410 1000 L312 650 L228 650Z" fill="#8a2c2c"/><path d="M130 1000 L228 650 M410 1000 L312 650" stroke="#f2c05a" stroke-width="3"/>`;

/* the lanes of Lanka: tall houses on both sides, lit doorways, empty road */
const LANE_SKY = ()=>skyBand([[0,'#231f4e'],[.5,'#5a3d6c'],[1,'#d0865c']])+`<circle cx="270" cy="620" r="150" fill="url(#gw)" opacity=".4"/>`;
function LANE(side){ let s=''; const L=side<0;
  for(let i=0;i<4;i++){ const w=130-i*22, x=L?(-20+i*70):(430-i*70), top=140+i*120, h=900-top-i*40;
    s+=`<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${['#3a2650','#46305a','#563a62','#664668'][i]}"/><path d="M${x} ${top} H${x+w}" stroke="#f0b872" stroke-width="2" opacity=".5"/>`;
    s+=A(`flick:${3+i}`,`<rect x="${x+w*.28}" y="${top+h*.32}" width="${w*.3}" height="${h*.2}" rx="${w*.15}" fill="#ffc060" opacity=".85"/>`); }
  return s; }
const LANE_ROAD = ()=>`<path d="M-20 1000 L560 1000 L330 700 L210 700Z" fill="#6a4258"/><path d="M-20 1000 L210 700 M560 1000 L330 700" stroke="#f0b872" stroke-width="2" opacity=".5"/>`;

/* night shore (dark slate-blue, starlight, silver glints; no red, no moon) */
const SHORE_SKY = ()=>skyBand([[0,'#060a1e'],[.55,'#0f1838'],[.8,'#1b2a52'],[1,'#26386a']])+stars(80,560);
function SEA_NIGHT(y,glints){ let s=`<rect x="-10" y="${y}" width="560" height="${1000-y}" fill="#0a1230"/>`;
  for(let i=0;i<(glints||14);i++) s+=A(`flick:${(2+i%4).toFixed(1)}`,`<path d="M${(i*61)%500+10} ${y+8+i*10} h${30+(i%3)*16}" stroke="#a8c0f0" stroke-width="2" opacity="${.12+(i%3)*.06}"/>`);
  return s; }
function ROCKS(y,col){ const c=col||'#141a34'; return `<path d="M-20 ${y} Q60 ${y-34} 150 ${y-10} Q230 ${y-40} 330 ${y-6} Q430 ${y-30} 560 ${y-8} L560 1000 L-20 1000Z" fill="${c}"/><path d="M-20 ${y} Q60 ${y-34} 150 ${y-10} Q230 ${y-40} 330 ${y-6} Q430 ${y-30} 560 ${y-8}" fill="none" stroke="#3a4a7a" stroke-width="2" opacity=".6"/>`; }
/* a faint, distant glow low on the horizon (far from the woodpile, never fire) */
const FAINT_GLOW = (x,y)=>A('pulse:4',`<ellipse cx="${x}" cy="${y}" rx="120" ry="26" fill="#ffb060" opacity=".16"/><ellipse cx="${x}" cy="${y}" rx="48" ry="9" fill="#ffd89a" opacity=".16"/>`);
/* a small stack of logs: dark, cold, UNLIT. Seen only far away */
function WOODPILE(x,y,s){ let l=''; [[-26,0,0],[-8,0,0],[10,0,0],[28,0,0],[-17,-12,0],[1,-12,0],[19,-12,0],[-8,-24,0],[10,-24,0]].forEach(([dx,dy])=>{ l+=`<rect x="${dx-17}" y="${dy-8}" width="34" height="11" rx="5.5" fill="#2e1c16"/><ellipse cx="${dx+16}" cy="${dy-2.5}" rx="3" ry="5" fill="#4a2e22"/>`; });
  return `<g transform="translate(${x} ${y}) scale(${s})">${l}</g>`; }

/* first light of dawn: lilac + peach sky, the sun rising out of the sea, slow rays */
function RAYS(x,y,n,len,col,op){ let s=''; for(let i=0;i<n;i++){ const a=(i/n)*Math.PI*2, a2=a+.07; s+=`<path d="M${x} ${y} L${r1(x+Math.cos(a)*len)} ${r1(y+Math.sin(a)*len)} L${r1(x+Math.cos(a2)*len)} ${r1(y+Math.sin(a2)*len)}Z" fill="${col}" opacity="${op}"/>`; }
  return A(`spin:90:${x}:${y}`,s); }
const DAWN_SKY = (k)=>skyBand([[0,'#34336e'],[.36,'#8a72a8'],[.62,'#f0a88c'],[.8,'#ffd49a'],[1,'#fff0c0']])+
  `<circle cx="300" cy="700" r="${280*(k||1)}" fill="url(#gw)" opacity=".7"/>`+RAYS(300,700,14,700,'#fff0c4',.12)+`<circle cx="300" cy="704" r="60" fill="#fff4d0"/>`;
const DAWN_SEA = ()=>`<rect x="-10" y="705" width="560" height="300" fill="#6a6aa0"/><rect x="-10" y="705" width="560" height="40" fill="#f6c898" opacity=".55"/>`+
  [0,1,2,3,4,5,6,7].map(i=>A(`flick:${(2+i%3).toFixed(1)}`,`<path d="M${200+((i*37)%190)} ${712+i*14} h${28+i*5}" stroke="#fff0c4" stroke-width="3" opacity=".6"/>`)).join('');

/* Ashoka Vatika, warm gold-green morning (NOT the cold teal of the other story) */
const GARDEN_SKY = ()=>skyBand([[0,'#b9dc8a'],[.5,'#f4e8a0'],[1,'#ffe9b0']])+`<circle cx="400" cy="250" r="230" fill="url(#gw)" opacity=".8"/><circle cx="400" cy="250" r="44" fill="#fffbe0"/>`;
function ATREE(x,y,s,dark){ let b=''; [[-40,-150,46],[8,-178,54],[46,-142,44],[-4,-120,48],[-54,-110,36]].forEach(([dx,dy,r],i)=>{ b+=`<circle cx="${dx}" cy="${dy}" r="${r}" fill="${(i%2)?(dark?'#3a6a22':'#5a8a2c'):(dark?'#2e5a1c':'#6a9a34')}"/>`; });
  for(let i=0;i<16;i++){ b+=`<circle cx="${r1(-84+((i*37)%160))}" cy="${r1(-216+((i*53)%130))}" r="3.8" fill="${i%3?'#ff8a30':'#ffb860'}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-9 0 Q-6 -70 -2 -120 L8 -120 Q10 -70 12 0Z" fill="#4a3220"/>${b}</g>`; }
const GARDEN_FAR = (y)=>hills(y-60,30,'#8ab24a',90)+hills(y-20,24,'#6a9a38',70)+[40,170,300,450].map((x,i)=>ATREE(x,y+10,.7+i%2*.12,true)).join('');
const GARDEN_GND = (y)=>`<path d="M-20 ${y} Q270 ${y-34} 560 ${y-8} L560 1000 L-20 1000Z" fill="#7da83a"/><path d="M-20 ${y+60} Q200 ${y+20} 560 ${y+50} L560 1000 L-20 1000Z" fill="#94b844"/><path d="M180 1000 Q250 ${y+80} 300 ${y+10} L330 ${y+10} Q300 ${y+90} 400 1000Z" fill="#d9c07a" opacity=".6"/>`+
  [[30,880],[480,900],[120,960],[420,950]].map(([x,yy])=>`<path d="M${x} ${yy} q-4 -18 0 -30 q6 14 0 30 M${x+10} ${yy} q-2 -14 4 -24" stroke="#4a7a22" stroke-width="3" fill="none"/>`).join('');
const SHAFTS = (col,op)=>A('pulse:6',`<path d="M300 -20 L180 1000 L260 1000 L360 -20Z M400 -20 L380 1000 L470 1000 L450 -20Z" fill="${col||'#fff4c0'}" opacity="${op||.14}"/>`);

/* the breath: a soft ring of golden light that leaves Hanuman's chest and slowly grows */
const BREATH = (x,y)=>A('ripple:3.2:'+x+':'+y,`<circle cx="${x}" cy="${y}" r="46" fill="none" stroke="#ffe8a8" stroke-width="3" opacity=".8"/>`)+A('ripple:3.2:'+x+':'+y,`<circle cx="${x}" cy="${y}" r="90" fill="#ffe8a8" opacity=".07"/>`);

/* source card: a palm-leaf manuscript with a diya, soft and still (no fires on both sides) */
const SOURCE = (sky,name,loc)=>({ sky:sky,
  mid:()=>fire(270,860,1.2),
  art:()=>A('rise:30:1.2:0.3',pothi(270,690,1.2)),
  title:{text:name, y:210, size:60, delay:.3},
  front:()=>big(270,300,32,'#f6ecd2',loc,1.3) });
const CARD_SKY = ()=>skyBand([[0,'#1a1c46'],[.6,'#3a3468'],[1,'#7a5a7a']])+`<circle cx="270" cy="700" r="300" fill="url(#saf)" opacity=".35"/>`+stars(40,380);
const CARD_SKY2 = ()=>skyBand([[0,'#34336e'],[.55,'#8a72a8'],[1,'#f0b890']])+`<circle cx="270" cy="700" r="320" fill="url(#saf)" opacity=".4"/>`;

const HANU = {c:HANUMAN, with:{holds:{}}};   // gada is left off for the grief and searching shots (props:{front:'gada'} only when he stands tall)


/* ---------- motion helpers (v2: the scenes now move) ---------- */
const WAVES = (y,n,col,spd)=>{ let o=''; for(let i=0;i<(n||7);i++){ const yy=y+i*13, x0=(i*83)%300;
  o+=A(`drift:${i%2?-60:60}:0:${(spd||4)+i%3}`,`<path d="M${x0-40} ${yy} q25 -9 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="${col||'#a8c0f0'}" stroke-width="${2+i*.25}" opacity="${.18+i*.03}"/>`); } return o; };
const BIRDS = (y,n,col)=>{ let o=''; for(let i=0;i<(n||4);i++) o+=A(`drift:${420+i*30}:${-40+i*12}:${5+i}`,`<path transform="translate(${40+i*60} ${y+i*26})" d="M0 0 q-10 -9 -20 0 q10 -3 20 4 q10 -7 20 -4 q-10 -9 -20 0Z" fill="${col||'#2a1a3a'}"/>`); return o; };
const MIST = (y,col,op)=>A('drift:140:0:16',`<ellipse cx="90" cy="${y}" rx="220" ry="30" fill="${col||'#b8a8e0'}" opacity="${op||.16}"/><ellipse cx="440" cy="${y+60}" rx="240" ry="26" fill="${col||'#b8a8e0'}" opacity="${(op||.16)*.8}"/>`);
const LEAVES = (n,col)=>{ let o=''; for(let i=0;i<(n||8);i++) o+=A(`drift:${-120-i*8}:${200+i*14}:${3.5+i%4}`,`<path transform="translate(${(i*71)%540} ${(i*53)%300}) rotate(${i*40})" d="M0 0 q8 -8 16 0 q-8 8 -16 0Z" fill="${col||'#c07a3a'}" opacity=".8"/>`); return o; };
/* a thought bubble: a drifting orb over his head with a small vision inside (a thought only: he never goes near it) */
const THOUGHT = (x,y,s,inner,delay)=>A(`pop:${delay||.3}`,A('bob:5:3.2',`<g transform="translate(${x} ${y}) scale(${s})"><circle r="78" fill="#fff4d8" opacity=".12"/><circle r="74" fill="none" stroke="#ffe9a8" stroke-width="2.4" opacity=".6"/>${inner}<circle cx="-70" cy="96" r="11" fill="#fff4d8" opacity=".3"/><circle cx="-96" cy="132" r="7" fill="#fff4d8" opacity=".3"/><circle cx="-112" cy="158" r="4" fill="#fff4d8" opacity=".3"/></g>`));
const VIS_PYRE = ()=>`<ellipse cx="0" cy="-6" rx="56" ry="40" fill="#ff9a3a" opacity=".22"/>`+A('flick:5',`<path d="M-14 22 Q-26 -10 -4 -34 Q-2 -10 10 -22 Q24 0 14 22Z" fill="#ffb450" opacity=".85"/><path d="M-6 22 Q-10 4 0 -12 Q8 4 6 22Z" fill="#ffe9a8"/>`)+WOODPILE(0,44,.95);
const VIS_SEA = ()=>`<circle r="62" fill="#0a1230" opacity=".7"/>`+[0,1,2,3].map(i=>A(`drift:${i%2?-30:30}:0:${3+i}`,`<path d="M-62 ${-30+i*20} q15 -9 31 0 t31 0 t31 0 t31 0" fill="none" stroke="#a8c0f0" stroke-width="3" opacity=".7"/>`)).join('');

VIDEO({ rig:'side',
  title:'हनुमान जी और आशा', format:'short', target:80,
  music:'scenes',
  handheld:0.9,
  keywords:['हनुमान','प्राण','लंका','सीता','रावण','राम','चिता','श्लोक','जीवित','कल्याण','अशोक','वाटिका'],
  shots:[
    /* 1 — dusk grief, close-up pulling back, birds cross the sun */
    { line:'एक बार हनुमान जी ने अपने प्राण त्यागने का विचार कर लिया था।', scene:'hanu-dusk-grief', mood:'sad', fx:'dust', capTop:130,
      cam:{keys:[[0,270,700,2.4],[2,270,670,1.9],[4.4,300,620,1.25]]},
      sky:()=>DUSK_SKY()+BIRDS(300,4), far:()=>ROOFS(760,'#33224c'), mid:()=>ROOFS(830,'#241638','#e2a64a'), art:()=>TERRACE(900,'#4a3254'), near:()=>MIST(930,'#e0a878',.14),
      cast:[{...HANU, x:270, y:915, s:.95, expr:'sad', acts:[[0,'kneel+grief'],[2.2,'kneel+lookAway',1.0]]}] },

    /* 2a — he arrives, leaping in over the rooftops */
    { line:'जब हनुमान जी लंका पहुँचे,', scene:'hanu-dusk-search', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,150,600,1.05],[2.4,380,580,1.3]]},
      sky:()=>DUSK_SKY()+BIRDS(260,3), far:()=>ROOFS(740,'#3a2656'), mid:()=>ROOFS(820,'#241638','#e2a64a'), art:()=>TERRACE(900,'#4a3254'),
      cast:[{...HANU, x:290, y:915, s:.8, expr:'calm', walk:{from:-330,dur:1.8}, acts:[[0,{a:[40,40],b:[-30,40],lean:16}],[0.9,{a:[-30,40],b:[40,40],lean:16}],[1.8,'stand'],[2.2,'lookUp',.6]]}] },

    /* 2b — searching the lanes for Sita, he runs along fast */
    { line:'तो उन्होंने माता सीता की खोज में', scene:'hanu-dusk-search', mood:'calm', fx:'dust', tr:'whip', capTop:130,
      cam:{from:[430,620,1.1],to:[130,620,1.15]},
      sky:LANE_SKY, far:()=>ROOFS(720,'#3a2656'), mid:()=>LANE(-1)+LANE(1), art:LANE_ROAD, near:()=>LEAVES(6),
      cast:[{...HANU, x:380, y:960, s:.8, flip:true, expr:'sad', walk:{from:300,dur:2.0}, acts:[[0,{a:[40,40],b:[-30,40],lean:16}],[0.5,{a:[-30,40],b:[40,40],lean:16}],[1.0,{a:[40,40],b:[-30,40],lean:16}],[1.5,{a:[-30,40],b:[40,40],lean:16}]]}] },

    /* 2c — Ravan's palace hall: he rushes in, looking left and right */
    { line:'रावण का महल', scene:'hanu-dusk-search', mood:'calm', fx:'dust', tr:'iris', trAt:[270,540], capTop:130,
      cam:{keys:[[0,270,600,1.0],[2.4,270,520,1.45]]},
      sky:HALL_SKY, mid:HALL_COLS, art:HALL_FLOOR,
      cast:[{...HANU, x:270, y:960, s:.7, expr:'surprise', walk:{from:-200,dur:1.2}, acts:[[0,'stand'],[0.9,'lookAway',.5],[1.5,'lookBack',.5],[2.1,'lookAway',.5]]}] },

    /* 2d — and the whole city: over the rooftops, fast, with parallax */
    { line:'और पूरी लंका नगरी छान मारी।', scene:'hanu-dusk-search', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{from:[120,620,1.1],to:[420,600,1.1]},
      sky:()=>DUSK_SKY()+BIRDS(280,3), far:()=>ROOFS(740,'#3a2656'), mid:()=>ROOFS(830,'#241638','#e2a64a'), art:()=>TERRACE(900,'#4a3254'),
      cast:[{...HANU, x:330, y:915, s:.8, expr:'sad', walk:{from:-300,dur:2.2}, acts:[[0,{a:[40,40],b:[-30,40],lean:16}],[0.5,{a:[-30,40],b:[40,40],lean:16}],[1.0,{a:[40,40],b:[-30,40],lean:16}],[1.5,{a:[-30,40],b:[40,40],lean:16}],[2.2,'lookAway',.4]]}] },

    /* 3 — nowhere: an empty road, dust and leaves blowing, the light going */
    { line:'लेकिन उन्हें माता सीता कहीं नहीं मिलीं।', scene:'hanu-lost', mood:'sad', fx:'dust', tr:'dip', capTop:130,
      cam:{keys:[[0,270,660,1.0],[1.5,270,640,1.2],[3.1,270,600,1.5]]},
      sky:TWILIGHT_SKY, far:()=>ROOFS(760,'#241a40'), mid:()=>LANE(-1)+LANE(1), art:LANE_ROAD, near:()=>LEAVES(9,'#a86a4a')+MIST(900,'#8a78b0',.18),
      cast:[{...HANU, x:270, y:950, s:.78, expr:'sad', acts:[[0,'stand'],[0.6,'lookAway',.7],[1.6,'lookBack',.7],[2.6,'lookDown',.8]]}] },

    /* 4 — the fear: close-up, slow push, breath of wind */
    { line:'उन्हें भय हुआ कि कहीं रावण ने उनका वध न कर दिया हो।', scene:'hanu-lost', mood:'sad', fx:'stars', tr:'dissolve', capTop:700,
      cam:{keys:[[0,270,700,1.6],[2,270,660,2.2],[4.1,270,640,2.8]]},
      sky:TWILIGHT_SKY, far:()=>ROOFS(780,'#1c1436'), art:()=>TERRACE(900,'#2e2046','#a07860'), near:()=>MIST(900,'#8a78b0',.2),
      cast:[{...HANU, x:270, y:930, s:1.15, expr:'surprise', acts:[[0,{lean:6,head:-8,a:[30,70],b:[24,76]}],[1.6,'lookAway',.6],[2.6,{lean:8,head:-12,a:[34,100],b:[26,104]},1]]}] },

    /* 5a — on the dark shore, looking across the sea towards Rama */
    { line:'और यदि वे माता सीता के बिना वापस लौटे,', scene:'hanu-sea', mood:'sad', fx:'stars', tr:'dip', capTop:130,
      cam:{keys:[[0,380,650,1.0],[3.1,200,650,1.35]]},
      sky:SHORE_SKY, far:()=>SEA_NIGHT(720)+WAVES(740,6), art:()=>ROCKS(900), near:()=>MIST(930,'#7a8ac0',.12),
      cast:[{...HANU, x:160, y:925, s:.8, expr:'sad', acts:[[0,'stand'],[1.0,'lookAway',.8],[2.2,'lookDown',.8]]}] },

    /* 5b — Rama alone by the sea, grief (the only Rama shot), slow push */
    { line:'तो श्री राम इस वियोग और शोक में अपने प्राण त्याग देंगे।', scene:'hanu-sea', mood:'sad', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,300,620,1.0],[2,300,680,1.3],[4.3,300,720,1.9]]},
      sky:SHORE_SKY, far:()=>SEA_NIGHT(700,18)+WAVES(720,7), art:()=>ROCKS(880,'#101630'), near:()=>MIST(930,'#7a8ac0',.12),
      cast:[{c:RAMA, x:300, y:915, s:.9, expr:'sad', tears:true, acts:[[0,'kneel+grief'],[3.2,'kneel+lookDown',1]]}] },

    /* 6a — Hanuman's grief: kneeling, head in his hands, shaking with sobs */
    { line:'हनुमान जी इतने व्याकुल और व्यथित हो गए', scene:'hanu-sea', mood:'sad', fx:'stars', tr:'dip', capTop:130, shake:[0.4,3,2.5],
      cam:{keys:[[0,270,760,2.2],[2.2,270,740,1.9],[3.6,270,700,1.4]]},
      sky:SHORE_SKY, far:()=>SEA_NIGHT(730)+WAVES(750,6), art:()=>ROCKS(910),
      cast:[{...HANU, x:270, y:930, s:.95, expr:'sad', tears:true, acts:[[0,'kneel+grief']]}] },

    /* 6b — the thought: a small vision of the unlit pyre and of the sea drifts over him; he stays where he is */
    { line:'कि उन्होंने अपने जीवन को समाप्त करने की सोच ली।', scene:'hanu-sea', mood:'sad', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.3],[3,270,640,1.05]]},
      sky:SHORE_SKY, far:()=>SEA_NIGHT(730)+WAVES(750,6), art:()=>ROCKS(910),
      front:()=>THOUGHT(380,420,1.0,VIS_PYRE(),.6)+THOUGHT(160,330,.62,VIS_SEA(),1.8),
      cast:[{...HANU, x:270, y:930, s:.95, expr:'sad', tears:true, acts:[[0,'kneel+grief'],[2.6,'kneel+lookUp',1]]}] },

    /* 7 — source card (Sundarkand 13.42) */
    { line:'वाल्मीकि रामायण के सुंदरकांड, सर्ग 13, श्लोक 42 में कहा गया है:', scene:'shloka-intro', mood:'divine', fx:'embers', tr:'iris', trAt:[270,680], capTop:780,
      cam:{from:[270,520,1.0],to:[270,450,1.25]},
      ...SOURCE(CARD_SKY,'वाल्मीकि रामायण','सुंदरकांड · सर्ग 13 · श्लोक 42') },

    /* 8 — shloka 1 in calligraphy: far faint glow, small UNLIT pile of wood; the sea moves */
    { line:'"चितां कृत्वा प्रवेक्ष्यामि समिद्धमरणीसुतम्"', nocap:true, chant:2, scene:'shloka-chant', mood:'divine', fx:'stars', tr:'zoom',
      cam:{from:[270,520,1.0],to:[320,560,1.2]},
      sky:SHORE_SKY, far:()=>FAINT_GLOW(430,712)+SEA_NIGHT(722,10)+WAVES(740,6), mid:()=>WOODPILE(448,872,.5), art:()=>ROCKS(930),
      calli:{lines:['चितां कृत्वा प्रवेक्ष्यामि','समिद्धमरणीसुतम्'], source:'सुंदरकांड 13 · श्लोक 42', y:300, size:40, col:'#ffe9a8', delay:.8, gap:1.6, write:1.3, glow:true, scrim:true} },

    /* 9a — he walks along the shore towards the far wood (preparing the thought; the camera follows him) */
    { line:'अर्थात, मैं चिता तैयार कर', scene:'hanu-sea', mood:'sad', fx:'stars', tr:'dissolve', capTop:130,
      cam:{from:[120,680,1.15],to:[330,690,1.2]},
      sky:SHORE_SKY, far:()=>FAINT_GLOW(440,712)+SEA_NIGHT(722,12)+WAVES(745,6), mid:()=>WOODPILE(452,874,.45), art:()=>ROCKS(915),
      cast:[{...HANU, x:290, y:935, s:.85, expr:'sad', walk:{from:-230,dur:2.4}, acts:[[0,{a:[10,30],b:[-6,8],lean:10,head:-8}],[1.2,{a:[-6,8],b:[10,30],lean:10,head:-8}],[2.4,'lookDown',.5]]}] },

    /* 9b — he stands still, a vision of the pyre burning glows above him; he does not go near it */
    { line:'प्रज्वलित अग्नि में प्रवेश कर जाऊँगा।', scene:'hanu-sea', mood:'sad', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,300,700,1.2],[2.3,300,620,1.0]]},
      sky:SHORE_SKY, far:()=>FAINT_GLOW(440,712)+SEA_NIGHT(722,12)+WAVES(745,6), mid:()=>WOODPILE(452,874,.45), art:()=>ROCKS(915),
      front:()=>THOUGHT(380,430,1.15,VIS_PYRE(),.2),
      cast:[{...HANU, x:200, y:935, s:.85, expr:'sad', acts:[[0,'stand'],[0.8,'lookAway',.8],[1.8,'lookDown',.6]]}] },

    /* 10a — the sea surges at the foot of the rocks; he stands high above it, small */
    { line:'यहाँ तक कि उन्होंने समुद्र में डूबकर', scene:'hanu-sea', mood:'sad', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,300,640,1.0],[2.5,220,780,1.35]]},
      sky:SHORE_SKY, far:()=>SEA_NIGHT(690,20)+WAVES(700,9,'#c8d8ff',3), art:()=>ROCKS(900), near:()=>MIST(940,'#7a8ac0',.14),
      cast:[{...HANU, x:140, y:925, s:.85, expr:'sad', acts:[[0,'stand'],[0.8,'lookAway',.8],[1.8,'lookDown',.8]]}] },

    /* 10b — the vision of dark waves above his bowed head; he turns away from it */
    { line:'प्राण त्यागने का भी विचार किया।', scene:'hanu-sea', mood:'sad', fx:'stars', tr:'dissolve', capTop:130,
      cam:{from:[300,720,1.4],to:[260,680,1.1]},
      sky:SHORE_SKY, far:()=>SEA_NIGHT(690,20)+WAVES(700,9,'#c8d8ff',3), art:()=>ROCKS(900),
      front:()=>THOUGHT(370,430,1.15,VIS_SEA(),.2),
      cast:[{...HANU, x:170, y:925, s:.9, expr:'sad', tears:true, acts:[[0,'kneel+grief'],[2.0,'kneel+lookAway',.8]]}] },

    /* 11 — THE MOMENT: he stops. A soft ring of light leaves his chest, the first pale light touches the horizon */
    { line:'लेकिन तभी उन्हें एहसास हुआ', scene:'hanu-breath', mood:'calm', fx:'dust', tr:'glow', capTop:700,
      cam:{keys:[[0,270,700,1.3],[1.2,270,680,1.5],[2.6,270,640,2.2]]},
      sky:()=>skyBand([[0,'#1c2052'],[.5,'#3a3a78'],[.8,'#8a6a98'],[1,'#d8a090']])+stars(24,300), far:()=>`<rect x="-10" y="740" width="560" height="260" fill="#3a3c78"/><rect x="-10" y="740" width="560" height="14" fill="#f4c898" opacity=".55"/>`+WAVES(760,5,'#f4d8b0',4), art:()=>ROCKS(915,'#1c2244'),
      front:()=>BREATH(270,820),
      cast:[{...HANU, x:270, y:940, s:1.05, expr:'serene', eyes:'closed', acts:[[0,'kneel+grief'],[0.8,'stand',1.4]]}],
      focus:{at:1.0, sound:'revive', dur:2.6, duck:.3} },

    /* 12a — he opens his eyes and lifts his head; the dark thoughts melt into light */
    { line:'कि जीवन समाप्त कर लेने से', scene:'hanu-breath', mood:'hope', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.4],[2.4,270,640,1.05]]},
      sky:()=>DAWN_SKY(.8)+BIRDS(300,3,'#4a3a6a'), far:()=>DAWN_SEA()+WAVES(790,5,'#fff0c4',4), art:()=>ROCKS(920,'#2a2a56'), front:()=>BREATH(210,810),
      cast:[{...HANU, x:210, y:940, s:.95, expr:'calm', acts:[[0,'stand'],[0.6,'lookDown',.4],[1.2,'lookUp',1.0]]}] },

    /* 12b — he stands tall, shakes off the grief and turns towards the sun */
    { line:'किसी भी समस्या का समाधान नहीं होगा।', scene:'hanu-breath', mood:'hope', fx:'dust', tr:'dissolve', capTop:130,
      cam:{from:[240,700,1.2],to:[300,600,1.0]},
      sky:()=>DAWN_SKY(.9)+BIRDS(300,3,'#4a3a6a'), far:()=>DAWN_SEA()+WAVES(790,5,'#fff0c4',4), art:()=>ROCKS(920,'#2a2a56'),
      cast:[{...HANU, x:210, y:940, s:.9, expr:'calm', walk:{from:-60,dur:2}, acts:[[0,'stand'],[1.2,{a:[26,70],b:[20,90],lean:-4,head:12},1.0]]}] },

    /* 13 — source card (Sundarkand 13.47), dawn colours */
    { line:'श्लोक 47 कहता है:', scene:'shloka-intro', mood:'divine', fx:'embers', tr:'iris', trAt:[270,680], capTop:780,
      cam:{from:[270,520,1.0],to:[270,450,1.25]},
      ...SOURCE(CARD_SKY2,'वाल्मीकि रामायण','सुंदरकांड · सर्ग 13 · श्लोक 47') },

    /* 14 — shloka 2 in calligraphy over the rising sun */
    { line:'"विनाशे बहवो दोषा जीवन् भद्राणि पश्यति"', nocap:true, chant:2, scene:'shloka-chant', mood:'divine', fx:'sparks', tr:'zoom',
      cam:{keys:[[0,270,560,1.0],[3,270,500,1.2]]},
      sky:()=>DAWN_SKY(1)+BIRDS(520,5,'#5a3a6a'), far:()=>DAWN_SEA()+WAVES(790,5,'#fff0c4',4), art:()=>ROCKS(950,'#2a2a56'),
      calli:{lines:['विनाशे बहवो दोषा','जीवन् भद्राणि पश्यति'], source:'सुंदरकांड 13 · श्लोक 47', y:300, size:40, col:'#fff0c4', delay:.8, gap:1.6, write:1.3, glow:true, scrim:true} },

    /* 15 — death only brings loss: the sun climbs, he stands with his head bowed */
    { line:'अर्थात, मृत्यु केवल हानियाँ लाती है,', scene:'hanu-dawn', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.25],[2.8,300,620,1.1]]},
      sky:()=>DAWN_SKY(1), far:()=>DAWN_SEA()+WAVES(790,5,'#fff0c4',4), art:()=>ROCKS(915,'#2a2a56'),
      cast:[{...HANU, x:230, y:935, s:.85, expr:'sad', acts:[[0,'stand'],[0.8,'lookDown',1.0],[2.0,'lookUp',.7]]}] },

    /* 16a — but while one lives: he looks up, light pours over him, birds fly past the sun */
    { line:'लेकिन जब तक व्यक्ति जीवित रहता है,', scene:'hanu-dawn', mood:'hope', fx:'sparks', tr:'glow', capTop:130,
      cam:{keys:[[0,270,800,1.3],[3.2,270,600,1.0]]},
      sky:()=>DAWN_SKY(1.2)+BIRDS(480,6,'#5a3a6a'), far:()=>DAWN_SEA()+WAVES(790,5,'#fff0c4',4), art:()=>ROCKS(925,'#2a2a56'), front:()=>SHAFTS('#fff4c0',.12),
      cast:[{...HANU, x:240, y:945, s:.9, expr:'smile', acts:[[0,'stand'],[0.8,'lookUp',1.0],[2.2,{a:[26,70],b:[20,90],lean:-4,head:16},1.0]]}] },

    /* 16b — hope grows: he strides towards the sun, the camera rises over the sea */
    { line:'कल्याण और शुभ परिणाम की संभावना हमेशा बनी रहती है।', scene:'hanu-dawn', mood:'hope', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,150,740,1.2],[3.4,330,560,1.0]]},
      sky:()=>DAWN_SKY(1.3)+BIRDS(520,6,'#5a3a6a'), far:()=>DAWN_SEA()+WAVES(790,5,'#fff0c4',4), art:()=>ROCKS(925,'#2a2a56'), front:()=>SHAFTS('#fff4c0',.14),
      cast:[{...HANU, x:340, y:945, s:.85, expr:'smile', walk:{from:-240,dur:3.0}, acts:[[0,{a:[40,40],b:[-30,40],lean:8,head:6}],[0.6,{a:[-30,40],b:[40,40],lean:8,head:6}],[1.2,{a:[40,40],b:[-30,40],lean:8,head:6}],[1.8,{a:[-30,40],b:[40,40],lean:8,head:6}],[2.4,{a:[40,40],b:[-30,40],lean:8,head:6}],[3.2,'lookUp',.8]]}] },

    /* 17a — he rises into the morning sky and flies over the garden walls */
    { line:'और कुछ ही देर बाद उन्हें', scene:'hanu-vatika', mood:'hope', fx:'petals', tr:'glow', capTop:130,
      cam:{keys:[[0,150,700,1.1],[2.2,380,560,1.1]]},
      sky:GARDEN_SKY, far:()=>GARDEN_FAR(700), mid:()=>ATREE(100,860,1.1,true)+ATREE(430,880,1.2,true), art:()=>GARDEN_GND(880), front:()=>SHAFTS('#fffbd0',.16)+LEAVES(6,'#ffb860'),
      cast:[{...HANU, x:300, y:900, s:.7, expr:'smile', walk:{from:-280,dur:2.2}, acts:[[0,{a:[40,40],b:[-30,40],lean:12}],[0.8,{a:[-30,40],b:[40,40],lean:12}],[1.6,{a:[40,40],b:[-30,40],lean:12}],[2.2,'stand']]}] },

    /* 17b — the garden appears: the moment Hanuman sees it */
    { line:'अशोक वाटिका दिखाई दी,', scene:'hanu-vatika', mood:'hope', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,400,640,1.5],[1.8,300,600,1.05]]},
      sky:GARDEN_SKY, far:()=>GARDEN_FAR(700), mid:()=>ATREE(100,860,1.1,true)+ATREE(430,880,1.2,true), art:()=>GARDEN_GND(880), front:()=>SHAFTS('#fffbd0',.18),
      cast:[{...HANU, x:90, y:920, s:.7, expr:'surprise', acts:[[0,'stand'],[0.4,{a:[24,70],lean:10,head:-6,b:[-6,8]},.8]]}],
      focus:{at:.3, sound:'arrive', dur:2.6, duck:.3} },

    /* 18 — Sita, waiting, calm and seated in warm morning light */
    { line:'जहाँ माता सीता प्रतीक्षा कर रही थीं।', scene:'hanu-vatika', mood:'hope', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.0],[3,270,640,1.3]]},
      sky:GARDEN_SKY, far:()=>GARDEN_FAR(700), mid:()=>ATREE(90,880,1.25,false)+ATREE(450,890,1.3,false), art:()=>GARDEN_GND(880), front:()=>SHAFTS('#fffbd0',.18)+LEAVES(5,'#ffb860'),
      cast:[{c:SITA, with:{top:'#c47a2a', bottom:'#e0b050', pallu:'#f2dc90', veil:'#f2dc90'}, x:270, y:930, s:1.1, expr:'serene', aura:'gg', acts:[[0,'kneel'],[2.0,'kneel+lookUp',1.2]]}] }
  ]
});
