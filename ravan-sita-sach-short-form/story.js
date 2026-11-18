/* रावण और माँ सीता का सच — Short, about 75 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js ravan-sita-sach-short-form
   Look: Lanka at night in torchlight (maroon + amber), Ashoka Vatika (cold teal), Panchavati at dusk (violet + ember), Brahma's gold-white light.
   The assault scenes are never shown: only silhouettes, a dark tide that slides over the picture, a drifting veil, camera cuts and close-ups of faces.
   The big hook text in the first 2 seconds was asked for by the owner for THIS video (normally hooks are off). */

/* ---------- shared pieces (drawn new for this video) ---------- */
const SIL = (extra)=>Object.assign({skin:'#0b0610', top:'#0b0610', bottom:'#0b0610', shin:'#0b0610', foot:'#0b0610', cape:'#0b0610',
  ash:false, rudra:false, garland:null, sash:null, jewel:false, tilak:false, earring:false}, extra||{});          // pure silhouette costume (rim light still shows the outline)
const RAVAN_G = Object.assign({}, RAVAN, {top:'#c99a2e', bottom:'#4a0c1c', shin:'#4a0c1c', cape:'#16060c', sash:'#e8c04a', garland:'#ffd25e'});   // gold armour, dark cape
const SITA_G  = {c:SITA, with:{top:'#2c7a4a', bottom:'#2c7a4a', veil:'#8fd0a0'}};                                                        // calm green saree
const WOMAN_S = (veil)=>({c:NAKSHATRA, with:SIL({veil:veil||'#2a1830', skirt:true})});                                                    // veiled woman silhouette

const NIGHT_RED = ()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+stars(60,520);
const BIGMOON   = (x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r*1.7}" fill="url(#gr)" opacity=".55"/><circle cx="${x}" cy="${y}" r="${r}" fill="#e9a070"/><circle cx="${x-r*.3}" cy="${y-r*.2}" r="${r*.78}" fill="#f2b88a" opacity=".5"/>`;
// Lanka: tall towers with domes, spires and lit windows (tops catch a little gold)
function LANKA(y,col){ const c=col||'#1a0a14'; let s='';
  [[14,96,58],[88,160,44],[150,118,56],[228,200,50],[300,126,64],[378,170,46],[436,104,58],[500,150,48]].forEach(([x,h,w],i)=>{
    s+=`<rect x="${x}" y="${y-h}" width="${w}" height="${h}" fill="${c}"/><path d="M${x-4} ${y-h} Q${x+w/2} ${y-h-w*.95} ${x+w+4} ${y-h}Z" fill="${c}"/><rect x="${x+w/2-1}" y="${y-h-w*.95-14}" width="2" height="16" fill="${c}"/><path d="M${x-4} ${y-h} Q${x+w/2} ${y-h-w*.95} ${x+w+4} ${y-h}" fill="none" stroke="#d9a73a" stroke-width="1.6" opacity=".55"/>`;
    for(let k=0;k<3;k++) s+=A(`flick:${(3+((i+k)%4)).toFixed(1)}`,`<rect x="${r1(x+8+k*(w/3.2))}" y="${y-h+18+k*20}" width="6" height="9" fill="#ffb44a"/>`); });
  return s; }
function TORCH(x,y,s){ s=s||1; return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3" y="0" width="6" height="58" fill="#3a2410"/><path d="M-9 4 L9 4 L6 -6 L-6 -6Z" fill="#7a5a28"/></g>`+fire(x,y-18*s,1.15*s); }
function ASHOKA(x,y,s){ let b=''; [[-38,-150,46],[8,-176,52],[44,-140,44],[-4,-120,48],[-52,-112,36]].forEach(([dx,dy,r],i)=>{ b+=`<circle cx="${dx}" cy="${dy}" r="${r}" fill="${i%2?'#0d2e2c':'#0a2624'}"/>`; });
  for(let i=0;i<12;i++){ b+=`<circle cx="${r1(-70+((i*37)%140))}" cy="${r1(-205+((i*53)%120))}" r="3.4" fill="${i%3?'#ff7a3a':'#ffb060'}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-9 0 Q-6 -70 -2 -120 L8 -120 Q10 -70 12 0Z" fill="#14100e"/>${b}</g>`; }
function TRUNK(x,y,w,h,col){ return `<path d="M${x-w/2} ${y} Q${x-w*.3} ${y-h/2} ${x-w*.2} ${y-h} L${x+w*.25} ${y-h} Q${x+w*.35} ${y-h/2} ${x+w/2} ${y}Z" fill="${col||'#0e0a14'}"/>`; }
const PANCH_SKY = ()=>skyBand([[0,'#120c2a'],[.45,'#3a2250'],[.75,'#a8583a'],[1,'#e09a50']]);
const ASHOKA_SKY = ()=>skyBand([[0,'#020c14'],[.5,'#0a2a30'],[1,'#17463e']])+stars(50,400);
function PANCH_FAR(y){ let s=hills(y-80,34,'#241636',120); [40,150,260,380,490].forEach((x,i)=>{ s+=TRUNK(x,y-40,34+i%3*8,380+i%2*80,'#150c1e'); }); return s; }
function ASHOKA_FAR(y){ let s=hills(y-60,30,'#0a2226',110); [60,230,410,520].forEach((x,i)=>{ s+=ASHOKA(x,y-20,.8+i%2*.3); }); return s; }
function VATIKA_GND(y){ return ground(y,'#0a1c1c','#1d5a52')+tufts(y-8,'#1b5a48',50)+flowers(y,16); }
function PANCH_GND(y){ return ground(y,'#1d1020','#5a3a4a')+tufts(y-8,'#3a2a3a',40); }
function LANKA_GND(y){ return ground(y,'url(#gndW)','#6a2a1a')+tufts(y-10,'#4a2418',30); }
const DIVINE_BG = (cx,cy)=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(cx,cy,'gw')+A('spin:60:'+cx+':'+cy,`<circle cx="${cx}" cy="${cy}" r="240" fill="none" stroke="#fff3c4" stroke-width="2" stroke-dasharray="4 14" opacity=".5"/><circle cx="${cx}" cy="${cy}" r="170" fill="none" stroke="#ffe08a" stroke-width="1.5" stroke-dasharray="2 10" opacity=".5"/>`);

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
  hook:{at:.3, hold:1.35, words:[
    {text:'रावण',        size:150, y:350, delay:0,   shake:10},
    {text:'सच में बुरा', size:96,  y:490, delay:.35, shake:8},
    {text:'नहीं था?',    size:112, y:630, delay:.7,  shake:14, ring:true} ]},
  shots:[
    /* 1a — hook: ten heads as one black silhouette against a huge dark moon; crane down */
    { line:'क्या रावण ने कभी माँ सीता को नहीं छुआ?', scene:'ravan-night', mood:'anger', fx:'embers', capTop:790,
      cam:{from:[270,340,1.35],to:[270,560,1.0]},
      sky:()=>NIGHT_RED()+BIGMOON(270,430,150), far:()=>LANKA(790,'#12060c'), art:()=>LANKA_GND(800),
      cast:[{c:RAVAN, with:SIL(), x:270, y:905, s:1.1, expr:'calm', acts:[[0,'stand'],[1.6,'hold',1.0]]}] },

    /* 1b — face of Ravan lit by torchlight, the claim */
    { line:'क्या रावण सच में बुरा नहीं था? खैर, सच्चाई कुछ और ही है!', scene:'ravan-night', mood:'anger', fx:'embers', tr:'flash', capTop:130,
      cam:{keys:[[0,270,600,1.2],[1.6,330,590,1.5],[3.4,330,590,2.5]]},
      far:()=>palaceBack(810,'#2a0e1a'), mid:()=>palaceMid(810)+TORCH(60,700,1.3)+TORCH(480,700,1.3), art:()=>palaceFloor(810),
      cast:[{c:RAVAN_G, x:330, y:880, s:1.15, flip:true, expr:'calm', props:{front:'khadga'}, acts:[[0,'stand'],[2.2,'explain',.8]], talk:true}] },

    /* 2a — Hanuman on Lanka's rampart at night, searching */
    { line:'जब हनुमान जी लंका में रावण के महल में गए,', scene:'hanuman-lanka', mood:'calm', fx:'dust', tr:'dip', capTop:210,
      cam:{from:[170,540,1.1],to:[330,520,1.25]},
      sky:()=>NIGHT_RED()+moon(110,190,34), far:()=>LANKA(740,'#1a0a14'), mid:()=>TORCH(80,700,1.2)+TORCH(450,700,1.2), art:()=>LANKA_GND(800),
      cast:[{c:HANUMAN, x:230, y:860, s:.7, expr:'calm', walk:{from:-220,dur:2.4}, acts:[[0,'stand'],[2.5,{lean:12,head:-6,a:[30,70],b:[-6,8]},.8]]}] },

    /* 2b — Hanuman peeps round the wall into the chamber: rows of veiled women, only as silhouettes */
    { line:'तो उन्होंने ऐसे कक्ष देखे जो महिलाओं से भरे हुए थे।', scene:'hanuman-lanka', mood:'sad', fx:'dust', tr:'iris', trAt:[270,620], capTop:120,
      cam:{from:[270,560,1.0],to:[250,600,1.22]},
      sky:()=>`<rect width="540" height="960" fill="#2a0c16"/><circle cx="270" cy="560" r="340" fill="url(#saf)" opacity=".5"/>`,
      mid:()=>fire(130,640,1)+fire(410,640,1)+TORCH(120,700,1)+TORCH(420,700,1),
      art:()=>`<path d="M-20 850 L560 850 L560 1000 L-20 1000Z" fill="#14060e"/>`,
      cast:[{...WOMAN_S('#3a2038'), x:190, y:800, s:.5, flip:true, expr:'sad', acts:[[0,'lookDown']]},
            {...WOMAN_S('#3a2038'), x:270, y:830, s:.58, expr:'sad', acts:[[0,'grief']]},
            {...WOMAN_S('#3a2038'), x:350, y:800, s:.5, flip:true, expr:'sad', acts:[[0,'weep']]},
            {...WOMAN_S('#3a2038'), x:430, y:835, s:.58, expr:'sad', acts:[[0,'lookDown']]},
            {...WOMAN_S('#3a2038'), x:230, y:880, s:.66, flip:true, expr:'sad', acts:[[0,'lookDown+lookAway']]},
            {c:HANUMAN, x:96, y:905, s:.85, expr:'surprise', acts:[[0,{lean:16,head:-4,a:[10,30],b:[-6,8]}],[1.6,{lean:20,head:-6,a:[14,34],b:[-6,8]},1.2]]}],
      near:()=>`<path fill-rule="evenodd" d="M-40 -40 H580 V1000 H-40Z M62 900 V430 Q270 230 478 430 V900Z" fill="#05020a"/><path d="M62 900 V430 Q270 230 478 430 V900" fill="none" stroke="#d9a73a" stroke-width="3" opacity=".6"/>` },

    /* 3 — the source card: Sundarkand */
    { line:'वाल्मीकि रामायण (सुंदरकांड, सर्ग 9, श्लोक 69) में इसका स्पष्ट उल्लेख है:', scene:'verse-source', mood:'divine', fx:'embers', tr:'iris', trAt:[270,680],
      cam:{from:[270,500,1.0],to:[270,470,1.2]},
      ...SCRIPTURE(()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="700" r="320" fill="url(#saf)" opacity=".4"/>`,'वाल्मीकि रामायण','सुंदरकांड · सर्ग 9 · श्लोक 69') },

    /* 4 — the verse in calligraphy */
    { line:'"युद्धकामेन ताः सर्वा रावणेन हृताः स्त्रियः"', nocap:true, chant:2, scene:'verse-source', mood:'divine', fx:'embers', tr:'zoom',
      cam:{from:[270,480,1.0],to:[270,470,1.1]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="470" r="330" fill="url(#saf)" opacity=".35"/>`,
      mid:()=>fire(80,860,1)+fire(460,860,1),
      calli:{lines:['युद्धकामेन ताः सर्वा','रावणेन हृताः स्त्रियः'], source:'सुंदरकांड 9 · श्लोक 69', y:400, size:40, col:'#ffe9a8', delay:.8, gap:1.6, write:1.3, glow:true, scrim:true} },

    /* 5 — meaning: women taken by force in his conquests (a line of veiled silhouettes, roped) */
    { line:'(अर्थात: रावण ने अपने विजयन अभियानों के दौरान इन सभी महिलाओं को बलपूर्वक बंदी बनाया था।)', scene:'ravan-conquest', mood:'anger', fx:'embers', tr:'whip', capTop:150,
      cam:{from:[200,540,1.05],to:[350,540,1.15]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+BIGMOON(430,260,70)+`<circle cx="120" cy="650" r="260" fill="url(#gr)" opacity=".25"/>`,
      far:()=>LANKA(780,'#12060c')+A('flick:5',`<rect x="0" y="560" width="540" height="240" fill="#ff3a1c" opacity=".08"/>`), art:()=>LANKA_GND(810),
      cast:[{c:RAVAN, with:SIL(), x:90, y:880, s:1.0, expr:'angry', props:{front:'khadga'}, acts:[[0,'carry']], walk:{from:-120,dur:3}},
            {...WOMAN_S('#3a2038'), x:220, y:860, s:.72, expr:'sad', acts:[[0,'lookDown']], walk:{from:-120,dur:3}},
            {...WOMAN_S('#3a2038'), x:300, y:866, s:.72, expr:'sad', acts:[[0,'grief']], walk:{from:-120,dur:3}},
            {...WOMAN_S('#3a2038'), x:380, y:862, s:.72, expr:'sad', acts:[[0,'lookDown']], walk:{from:-120,dur:3}},
            {...WOMAN_S('#3a2038'), x:460, y:868, s:.72, expr:'sad', acts:[[0,'weep']], walk:{from:-120,dur:3}}] },

    /* 6 — the dark deeds go on: Ravan's face, a turn to the camera */
    { line:'लेकिन रावण के काले कारनामों की दास्तान यहीं खत्म नहीं होती।', scene:'ravan-night', mood:'anger', fx:'embers', tr:'dip', capTop:140,
      cam:{keys:[[0,270,620,1.1],[2.2,230,590,2.0],[3.8,230,590,2.3]]},
      sky:()=>NIGHT_RED()+BIGMOON(420,260,90), far:()=>LANKA(800,'#10060c'), mid:()=>TORCH(80,720,1.4), art:()=>LANKA_GND(810),
      cast:[{c:RAVAN_G, x:230, y:890, s:1.15, expr:'angry', props:{front:'khadga'}, acts:[[0,'stand'],[1.6,'accuse',.6]], talk:true}] },

    /* 7a — Punjikasthala: a veiled silhouette in the moonlit forest; the dark tide approaches */
    { line:'उसने पुंजिकस्थला नाम की एक अप्सरा के साथ दुराचार किया था,', scene:'punjikasthala', mood:'calm', fx:'petals', tr:'fade', capTop:150,
      cam:{from:[270,560,1.1],to:[270,540,1.28]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(80,560)+moon(400,200,46), far:()=>hills(780,40,'#16163a',130), art:()=>VATIKA_GND(830),
      cast:[{c:NAKSHATRA, with:SIL({veil:'#e6b0ff', skirt:true}), x:230, y:870, s:1.0, expr:'serene', acts:[[0,'stand'],[0.6,'lookUp',1.0]]}],
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
      cam:{from:[270,560,1.1],to:[250,540,1.3]},
      sky:()=>PANCH_SKY(), far:()=>PANCH_FAR(790), mid:()=>ashramHut(430,800,1.0), art:()=>PANCH_GND(820),
      cast:[{...SITA_G, x:200, y:880, s:1.0, expr:'sad', acts:[[0,'stand'],[1.8,'lookAway',.8]]}] },

    /* 10 — source card: Aranyakand */
    { line:'वाल्मीकि रामायण (अरण्यकांड, सर्ग 49, श्लोक 17) के अनुसार:', scene:'verse-source', mood:'divine', fx:'embers', tr:'iris', trAt:[270,680],
      cam:{from:[270,500,1.0],to:[270,470,1.2]},
      ...SCRIPTURE(()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="700" r="320" fill="url(#saf)" opacity=".4"/>`,'वाल्मीकि रामायण','अरण्यकांड · सर्ग 49 · श्लोक 17') },

    /* 11 — the verse in calligraphy */
    { line:'"ततस्तु परगृह्याशु रावणः क्रोधमूर्च्छितः। वामेन परिजग्राह मूर्ढ़जेषु करेण सः॥ ऊरुमध्ये च करेण दक्षिणेन..."', nocap:true, chant:2, scene:'verse-source', mood:'divine', fx:'embers', tr:'zoom',
      cam:{from:[270,480,1.0],to:[270,470,1.1]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="470" r="330" fill="url(#saf)" opacity=".35"/>`,
      mid:()=>fire(80,860,1)+fire(460,860,1),
      calli:{lines:['ततस्तु परगृह्याशु','रावणः क्रोधमूर्च्छितः।','वामेन परिजग्राह','मूर्ढ़जेषु करेण सः॥','ऊरुमध्ये च करेण दक्षिणेन...'], source:'अरण्यकांड 49 · श्लोक 17', y:310, size:36, col:'#ffe9a8', delay:.8, gap:1.5, write:1.2, glow:true, scrim:true} },

    /* 12a — Panchavati: Ravan's shadow-figure strides in towards Sita (nothing more is shown) */
    { line:'(अर्थात: अपहरण के समय क्रोधातुर् रावण ने एक हाथ से माँ सीता के बाल', scene:'sita-abduction', mood:'anger', fx:'dust', tr:'dip', capTop:140,
      cam:{from:[200,540,1.1],to:[300,540,1.2]},
      sky:()=>PANCH_SKY()+`<rect width="540" height="960" fill="#1a0408" opacity=".25"/>`, far:()=>PANCH_FAR(790), mid:()=>ashramHut(110,800,.9), art:()=>PANCH_GND(820),
      cast:[{...SITA_G, x:190, y:880, s:1.0, expr:'surprise', acts:[[0,'stand'],[1.6,'recoil',.4]]},
            {c:RAVAN, with:SIL(), x:420, y:890, s:1.15, flip:true, expr:'angry', acts:[[0,'carry'],[2.0,'rage',.4]], walk:{from:240,dur:2.6}}] },

    /* 12b — cut to Sita's face; the dark tide closes over the picture */
    { line:'और दूसरे हाथ से उनकी जांघों को पकड़ा था।)', scene:'sita-abduction', mood:'sad', fx:'dust', tr:'whip', capTop:130,
      cam:{keys:[[0,270,600,1.2],[1.4,270,590,2.4,'snap'],[4,270,590,2.7]]},
      sky:()=>PANCH_SKY(), far:()=>PANCH_FAR(790), art:()=>PANCH_GND(820),
      cast:[{...SITA_G, x:270, y:930, s:1.4, expr:'sad', tears:true, acts:[[0,'stand'],[0.8,'grief',.8]]}],
      front:()=>DARKTIDE(1.9,1.6), shake:[1.9,1.2,6] },

    /* 13a — Lanka court: Ravan himself admits it (Yuddhakand) */
    { line:'और तो और, युद्धकांड में रावण खुद स्वीकार करता है', scene:'ravan-admits', mood:'anger', fx:'embers', tr:'dip', capTop:140,
      cam:{from:[280,560,1.1],to:[310,540,1.3]},
      far:()=>palaceBack(810,'#2a0e1a'), mid:()=>palaceMid(810)+TORCH(60,700,1.3)+TORCH(480,700,1.3), art:()=>palaceFloor(810),
      cast:[{c:RAVAN_G, x:320, y:880, s:1.05, flip:true, expr:'calm', talk:true, props:{front:'khadga'}, acts:[[0,'stand'],[1.8,'explain',.8]]}] },

    /* 13b — Ashoka Vatika: Sita, far from his bed, dignified */
    { line:'कि वह माँ सीता को अपनी शैया पर इसलिए नहीं ला सका', scene:'ashoka-vatika', mood:'sad', fx:'petals', tr:'dissolve', capTop:140,
      cam:{from:[300,560,1.1],to:[300,540,1.15]},
      sky:()=>ASHOKA_SKY()+moon(420,170,36), far:()=>ASHOKA_FAR(800), mid:()=>ASHOKA(70,830,1.0), art:()=>VATIKA_GND(830),
      cast:[{...SITA_G, x:150, y:880, s:.9, expr:'sad', acts:[[0,'kneel'],[1.6,'kneel+lookAway',.8]]},
            {c:RAVAN_G, x:430, y:885, s:.95, flip:true, expr:'angry', acts:[[0,'stand'],[1.2,'accuse',.5]]}] },

    /* 13c — THE moment: Ravan's fear of Brahma's curse (face, with the golden hand behind him) */
    { line:'क्योंकि उसे ब्रह्मा जी के शाप का भय था —', scene:'ravan-fear', mood:'shock', fx:'sparks', tr:'flash', capTop:700, shake:[0.3,0.8,8],
      cam:{keys:[[0,240,600,1.3],[1.0,185,600,2.2,'snap'],[4,185,600,2.5]]},
      sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="400" cy="420" r="260" fill="url(#gw)" opacity=".45"/>`, art:()=>`<path d="M-20 920 Q270 880 560 920 L560 1000 L-20 1000Z" fill="#20122a"/>`,
      cast:[{c:RAVAN_G, x:250, y:930, s:1.2, expr:'surprise', acts:[[0,'stand'],[0.6,'recoil',.35]]}],
      front:()=>A('fadein:.3:.6',CURSEHAND(250,500,.5,0)),
      focus:{at:.5, sound:'kaal', dur:3.0, duck:.25} },

    /* 13d — closing: not respect for Sita but fear for his own life; Sita stays dignified, Ravan shrinks away */
    { line:'सीता जी के प्रति सम्मान की वजह से नहीं, बल्कि सिर्फ अपने प्राणों और शाप के डर से!', scene:'sita-sorrow', mood:'sad', fx:'petals', tr:'dissolve', capTop:140,
      cam:{from:[270,560,1.15],to:[250,540,1.45]},
      sky:()=>ASHOKA_SKY()+moon(400,170,40), far:()=>ASHOKA_FAR(800), mid:()=>ASHOKA(460,830,1.1), art:()=>VATIKA_GND(830),
      cast:[{...SITA_G, x:230, y:890, s:1.1, expr:'serene', acts:[[0,'stand'],[2.4,'lookUp',1.2]], aura:'gg'},
            {c:RAVAN, with:SIL(), x:450, y:880, s:.6, flip:true, expr:'sad', acts:[[0,'stand'],[1.0,'lookDown',.8]], exit:{at:4.5,fade:1.2}}] }
  ]
});
