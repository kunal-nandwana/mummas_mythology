/* =====================================================================
   परशुराम और रावण: परशुराम जी ने रावण का वध क्यों नहीं किया?  (16:9 long video, 5 chapters, about 8.5 minutes)
   Lines are the owner's exact words from my-script.md (split between shots only at spaces).
   Helpers only call engine pieces INSIDE functions (the build tool runs this file without the drawing engine).
   ===================================================================== */
const lay = mk => ({ sky:()=>mk().sky(), far:()=>mk().far(), mid:()=>mk().mid(), near:()=>mk().near() });   // layered scene, built lazily
const FY = 432;                                                                                           // feet line for standing characters
const SIL = {skin:'#1c1226', top:'#1c1226', bottom:'#1c1226', shin:'#1c1226', foot:'#1c1226', sash:'#1c1226', ash:false, rudra:false, tilak:false};   // pure silhouette
const PR = o => Object.assign({c:PARSHURAM, y:FY, s:.68, props:{front:'parashu'}, expr:'calm', acts:[[0,'stand']]}, o);
const RV = o => Object.assign({c:RAVAN, y:FY, s:.6, expr:'calm', acts:[[0,'stand']]}, o);
const MAH = o => lay(()=>mahendra(o));
const SCROLL = (a,b,glow,s) => ()=>wsky([[0,a],[1,b]])+wglow(480,270,430,glow,.35)+wmandala(480,270,300,glow,24,160)+wglow(480,250,230,'#ffd98a',.35)+A('bob:5:.2',pothi(480,250,s||1.55))+wsparks(60,900,100,480,22,'#ffe7a8');
/* small round badge with a label (devata / gandharva ...) */
const BADGE = (x,y,label,col,delay) => A(`pop:${delay}`,`<g transform="translate(${x} ${y})">${A('pulse:2.4',wglow(0,0,70,col,.55))}<circle r="36" fill="#241446" stroke="${col}" stroke-width="3"/><circle r="26" fill="${col}" opacity=".35"/><text y="62" text-anchor="middle" font-size="25" fill="#fff0cc" style="font-family:'Tiro','Mukta',serif;font-weight:400">${label}</text></g>`);
const TAG = (x,y,w,text,delay,strikeAt) => A(`pop:${delay}`,`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="-30" width="${w}" height="60" rx="14" fill="#2a1650" stroke="#f1c04e" stroke-width="2.4"/><text y="11" text-anchor="middle" font-size="30" fill="#ffe7a8" style="font-family:'Tiro','Mukta',serif;font-weight:400">${text}</text>`+
  A(`draw:${strikeAt}:.6`,`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M${-w/2+10} 6 L${w/2-10} -4" stroke="#ff9a7a" stroke-width="4" stroke-linecap="round" fill="none"/>`)+`</g>`);
const LEAN_AXE = (x,y) => `<g transform="translate(${x} ${y}) rotate(14)"><line x1="0" y1="0" x2="0" y2="-150" stroke="#6a3a1a" stroke-width="8" stroke-linecap="round"/><path d="M0 -150 C34 -164 60 -128 50 -90 C38 -112 18 -116 0 -112Z" fill="#c9ced6" stroke="#f1f4f8" stroke-width="2"/>${A('pulse:2',wglow(30,-130,50,'#ffd27a',.5))}</g>`;
const VISION = (x,y,r) => `<g transform="translate(${x} ${y})">${A('pulse:2.2',wglow(0,0,r*1.7,'#ffd98a',.5))}<circle r="${r}" fill="#2a1a52" stroke="url(#gold)" stroke-width="4"/><g clip-path="inset(0)">`+
  `<path d="M${-r*.78} ${r*.45} H${r*.78}" stroke="#ffb45a" stroke-width="3"/>`+[[-.45,.5,.26],[0,.9,.34],[.45,.5,.26]].map(([dx,h,w])=>`<g transform="translate(${dx*r} ${r*.45})"><rect x="${-w*r/2}" y="${-h*r*.8}" width="${w*r}" height="${h*r*.8}" fill="#f3b45a"/><path d="M${-w*r/2-3} ${-h*r*.8} Q0 ${-h*r*.8-w*r*1.1} ${w*r/2+3} ${-h*r*.8}Z" fill="#ffd27a"/></g>`).join('')+`</g></g>`;

VIDEO({
  title: 'परशुराम जी ने रावण का वध क्यों नहीं किया?',
  format: 'long', target: 520,
  keywords: ['परशुराम','रावण','श्रीराम','सहस्त्रबाहु','विष्णु','ब्रह्मा','तपस्या','अवतार','मर्यादा','वाल्मीकि'],
  music: 'scenes', sfx: true, ending: 3.6, handheld: .5, captionChars: 42, minShot: 2.4, pace: 13,
  look: {rim:1, bokeh:.9, motes:1, warm:.1, vig:.12},
  shots: [

  /* ================= CHAPTER 1 ================= */
  { chapter:{no:1, name:'एक अनसुलझा सवाल'}, dur:5, tr:'dissolve', mood:'divine', scene:'ch1-sawal', sfx:[[.15,'bell',.6]] },

  { line:`भगवान परशुराम स्वयं श्री हरि विष्णु के अवतार थे।`, scene:'ch1-sawal', mood:'hope', tr:'dissolve', fx:'dust',
    ...MAH({sunX:480, sunY:238, sun:1.35}), cast:[PR({x:480, s:.74, with:SIL, aura:'saf'})],
    cam:{keys:[[0,480,150,1.55],[7,480,268,1.06]]} },

  { line:`वे अजेय थे, चिरंजीवी थे, और उन्होंने अपने फरसे से पूरी पृथ्वी के अत्याचारी राजाओं का अंत किया था।`, scene:'ch1-sawal', mood:'hope', tr:'dissolve', fx:'petals',
    ...MAH({sunX:700, sunY:300}), front:()=>crownsRise(120,860,360,9), cast:[PR({x:420, s:.74, acts:[[0,'stand'],[4,'hold']]})],
    cam:{keys:[[0,480,290,1],[10,430,250,1.32]]} },

  { line:`दूसरी तरफ, रावण को ब्रह्मा जी से जो वरदान मिला था, उसमें मनुष्यों से सुरक्षा नहीं थी।`, scene:'ch1-sawal', mood:'divine', tr:'glow',
    ...lay(()=>brahmaloka()), art:()=>lotusPlatform(480,440,1.2),
    front:()=>A('ripple:3.5:330:300',`<circle cx="330" cy="300" r="150" fill="none" stroke="#ffe7a8" stroke-width="3" stroke-dasharray="6 8"/>`)+`<g opacity=".95">${wglow(840,430,60,'#ffe7a8',.35)}</g>`,
    cast:[{c:RAVAN,x:320,y:436,s:.62,acts:[[0,'kneelPray']],expr:'serene'}, {c:BRAHMA,x:590,y:436,s:.7,flip:true,acts:[[0,'stand'],[1.5,'bless']],expr:'serene'}, {c:VILLAGER,x:840,y:440,s:.3,acts:[[0,'stand']],expr:'calm',aura:'gw'}],
    cam:{keys:[[0,480,300,1.05],[9,470,262,1.2]]} },

  { line:`परशुराम जी भी धरती पर मनुष्य रूप में ही थे।`, scene:'ch1-sawal', mood:'hope', tr:'fade', fx:'dust',
    ...MAH({sunX:300, sunY:260}), cast:[PR({x:480, y:480, s:.92, expr:'serene', acts:[[0,'relax']]})],
    cam:{keys:[[0,480,300,1.05],[7,486,228,1.85]]} },

  { line:`तो फिर सवाल यह है कि जब परशुराम जी धरती पर पहले से मौजूद थे, तो उन्होंने ही रावण का वध क्यों नहीं कर दिया?`, scene:'ch1-sawal', mood:'hope', tr:'iris', trAt:[480,230],
    ...lay(()=>cosmos()), front:()=>wquestion(480,215,1.05),
    cast:[PR({x:230, s:.72, acts:[[0,'stand'],[3,'lookAway']]}), RV({x:730, s:.64, flip:true, props:{front:'khadga'}, acts:[[0,'stand'],[3.5,'lookAway']]})],
    cam:{keys:[[0,480,270,1],[11,480,255,1.16]]} },

  { line:`भगवान विष्णु को श्रीराम के रूप में दोबारा जन्म लेने की आवश्यकता क्यों पड़ी?`, scene:'ch1-sawal', mood:'divine', tr:'glow',
    ...lay(()=>kshir()), front:()=>wquestion(480,130,.6,'#fff0b8'),
    cast:[{c:VISHNU,x:330,y:436,s:.7,acts:[[0,'stand'],[1.2,'bless']],expr:'serene'}, {c:RAMA,x:660,y:436,s:.62,flip:true,props:{front:'bow'},enter:{fade:1.6,delay:1.5},acts:[[0,'stand']],expr:'serene',aura:'gw'}],
    cam:'in' },

  { line:`आज हम किसी सुनी-सुनाई कहानी पर नहीं, बल्कि वाल्मीकि रामायण, भागवत पुराण और अध्यात्म रामायण के प्रमाणों के आधार पर इस रहस्य की तह तक जाएंगे।`, scene:'ch1-sawal', mood:'calm', tr:'fade',
    art:()=>wsky([[0,'#2a1608'],[1,'#5a3418']])+wglow(480,260,460,'#ffb45a',.4)+wmandala(480,260,330,'#f1c04e',28,200)+
      [[175,'वाल्मीकि रामायण',2.8],[480,'भागवत पुराण',5.0],[785,'अध्यात्म रामायण',6.9]].map(([x,t,d])=>A(`pop:${d-1}`,A('bob:3:.25',pothi(x,235,.78)+wglow(x,235,120,'#ffe7a8',.35)))+A(`pop:${d}`,`<text x="${x}" y="320" text-anchor="middle" font-size="33" fill="#ffe7a8" style="font-family:'Tiro','Mukta',serif;font-weight:400">${t}</text>`)).join('')+wsparks(60,900,100,480,24,'#ffe7a8'),
    cam:'in' },

  /* ================= CHAPTER 2 ================= */
  { chapter:{no:2, name:'रावण का वरदान और सहस्त्रबाहु का प्रसंग'}, dur:5, tr:'dissolve', mood:'divine', scene:'ch2-vardan-court', sfx:[[.15,'bell',.6]] },

  { line:`सबसे पहले इस भ्रम को दूर करते हैं कि परशुराम जी रावण को मार ही नहीं सकते थे।`, scene:'ch2-vardan-court', mood:'calm', tr:'dissolve', fx:'dust',
    ...MAH({sunX:620, sunY:290, tone:'dawn'}), front:()=>A('drift:-300:0:14',wmist(250,170,'#ffe9d0',.55))+A('drift:-260:0:11',wmist(310,150,'#fff0dc',.5)),
    cast:[PR({x:380, s:.8, acts:[[0,'stand'],[2.5,'explain']], talk:false})], cam:{keys:[[0,420,290,1.05],[8,400,262,1.3]]} },

  { line:`वाल्मीकि रामायण के बालकांड के पंद्रहवें सर्ग में ब्रह्मा जी स्वयं बताते हैं कि रावण ने देवताओं, गंधर्वों, यक्षों और असुरों से अमरता का वरदान माँगा था,`, scene:'ch2-vardan-court', mood:'divine', tr:'glow',
    ...lay(()=>brahmaloka()), art:()=>lotusPlatform(480,442,1.25),
    front:()=>wlower('वाल्मीकि रामायण','बालकांड · सर्ग 15',{at:.6,hold:4.8})+BADGE(250,130,'देवता','#ffd25e',5.2)+BADGE(430,130,'गंधर्व','#7fd6ff',6.2)+BADGE(610,130,'यक्ष','#8cf0b0',7.0)+BADGE(790,130,'असुर','#c49aff',7.8),
    cast:[{c:BRAHMA,x:610,y:440,s:.72,flip:true,acts:[[0,'stand'],[1.2,'explain']],talk:false,expr:'serene'}, {c:RAVAN,x:300,y:440,s:.62,acts:[[0,'kneelPray']],expr:'serene'}],
    cam:{keys:[[0,480,280,1],[10,500,285,1.12]]} },

  { line:`लेकिन मनुष्यों को तुच्छ समझकर छोड़ दिया था।`, scene:'ch2-vardan-court', mood:'hope', tr:'fade',
    ...lay(()=>brahmaloka()), art:()=>lotusPlatform(480,442,1.25),
    front:()=>A('pulse:2',wglow(790,420,90,'#fff0c0',.5)),
    cast:[{c:RAVAN,x:330,y:440,s:.68,acts:[[0,'relax'],[1.2,'lookAway']],expr:'smile'}, {c:VILLAGER,x:790,y:444,s:.34,flip:true,acts:[[0,'stand']],expr:'calm',aura:'gw'}],
    cam:{keys:[[0,420,290,1.05],[5,520,300,1.35]]} },

  { line:`इस श्लोक में कहीं भी यह नहीं लिखा है कि रावण को केवल कोई क्षत्रिय ही मार सकता है या कोई ब्राह्मण उसका वध नहीं कर सकता।`, scene:'ch2-vardan-court', mood:'calm', tr:'fade',
    art:()=>wsky([[0,'#150d36'],[1,'#37204e']])+wglow(480,260,430,'#ffb060',.3)+wmandala(480,270,300,'#f1c04e',24,160)+A('bob:4:.22',pothi(480,262,1.5)+A('glint:1.2:2.6:-230:230',`<g transform="translate(480 262)"><rect x="-26" y="-70" width="52" height="140" fill="#fff" opacity=".4" filter="url(#b10)" transform="skewX(-14)"/></g>`))+TAG(280,110,330,'केवल क्षत्रिय ही?',2.6,4.0)+TAG(690,110,330,'ब्राह्मण नहीं मार सकता?',5.2,6.8)+wsparks(60,900,100,480,22,'#ffe7a8'),
    cam:'in' },

  { line:`इसलिए यह कहना कि परशुराम जी ब्राह्मण होने के कारण रावण को नहीं मार सकते थे, शास्त्रीय रूप से सही नहीं है।`, scene:'ch2-vardan-court', mood:'hope', tr:'fade', fx:'dust',
    ...MAH({sunX:300, sunY:285, tone:'dawn'}), cast:[PR({x:600, s:.78, flip:true, acts:[[0,'stand'],[1.5,'explain'],[6,'bless']]})],
    cam:{keys:[[0,520,290,1],[9,560,262,1.28]]} },

  { line:`इतना ही नहीं, श्रीमद्भागवत पुराण के अनुसार, महिष्मती के राजा कार्तवीर्य अर्जुन—जिन्हें हम सहस्त्रबाहु के नाम से जानते हैं—उन्होंने एक बार`, scene:'ch2-vardan-court', mood:'joy', tr:'iris', trAt:[700,250],
    ...lay(()=>court({tx:700})), front:()=>wlower('श्रीमद्भागवत पुराण','महिष्मती · कार्तवीर्य अर्जुन',{at:.8,hold:5}), title:{text:'महिष्मती', y:96, size:44, delay:.4},
    cast:[{c:SAHASTRABAHU,x:700,y:392,s:.6,flip:true,acts:[[0,'stand']],expr:'smile'}, {c:SOLDIER,x:120,y:436,s:.5,props:{front:'staff'},acts:[[0,'stand']]}, {c:SOLDIER,x:850,y:436,s:.5,flip:true,props:{front:'staff'},acts:[[0,'stand']]}],
    cam:{keys:[[0,480,270,1],[10,640,265,1.25]]} },

  { line:`युद्ध में रावण को हराकर बंदी बना लिया था।`, scene:'ch2-vardan-court', mood:'calm', tr:'fade',
    ...lay(()=>court({tx:700})), front:()=>A('pulse:2.4',wglow(430,330,150,'#ffe0a0',.3)),
    cast:[{c:SAHASTRABAHU,x:700,y:392,s:.6,flip:true,acts:[[0,'stand']],expr:'smile'}, {c:RAVAN,x:400,y:436,s:.6,acts:[[0,'lookDown']],expr:'sad'}],
    cam:{keys:[[0,520,270,1.05],[5,480,290,1.3]]} },

  { line:`और उस शक्तिशाली सहस्त्रबाहु का वध स्वयं भगवान परशुराम ने किया था।`, scene:'ch2-vardan-court', mood:'divine', tr:'glow', fx:'sparks',
    ...lay(()=>court({tx:700})),
    front:()=>A('fadein:4.1:.2',A('fadeout:5.2:1.4',A('ripple:1.8:700:300',`<circle cx="700" cy="300" r="160" fill="none" stroke="#fff3c4" stroke-width="5"/>`)+wglow(700,300,260,'#fff0c0',.8)))+A('fadein:4.2:.4',wsparks(560,840,200,420,26,'#ffe7a8')),
    cast:[{c:SAHASTRABAHU,x:700,y:392,s:.62,flip:true,acts:[[0,'stand']],expr:'surprise',exit:{at:4.4,fade:.9}}, PR({x:330, s:.72, walk:{from:-300,dur:2.6,delay:0}, acts:[[0,'stand'],[3.2,'armUp'],[5.4,'stand']]})],
    sfx:[[4.3,'shimmer',.7]], cam:{keys:[[0,420,280,1],[4,520,280,1.1],[8,560,285,1.25]]} },

  { line:`तो जब परशुराम जी उस योद्धा का अंत कर सकते थे जिसने रावण को बंदी बनाया था, तो उन्होंने सीधे रावण को चुनौती क्यों नहीं दी?`, scene:'ch2-vardan-court', mood:'calm', tr:'fade',
    ...MAH({sunX:760, sunY:330, tone:'dusk'}),
    front:()=>`<g transform="translate(790 392)" opacity=".85">${wglow(0,-30,120,'#ffb060',.5)}<path d="M-60 0 V-40 L-44 -52 L-28 -40 V-70 L-12 -86 L4 -70 V-40 L22 -54 L40 -40 V0Z" fill="#2a1a3a"/><path d="M-20 -76 L-12 -92 L-4 -76" fill="#ffd27a"/></g>`+wquestion(560,190,.55),
    cast:[PR({x:290, s:.74, acts:[[0,'stand'],[2.2,'think']]})], cam:'panR' },

  /* ================= CHAPTER 3 ================= */
  { chapter:{no:3, name:'प्रचलित मान्यताएँ और उनका सच'}, dur:5, tr:'dissolve', mood:'divine', scene:'ch3-do-tark', sfx:[[.15,'bell',.6]] },

  { line:`इस प्रश्न के उत्तर में दो तर्क सबसे ज़्यादा दिए जाते हैं।`, scene:'ch3-do-tark', mood:'hope', tr:'dissolve',
    art:()=>wsky([[0,'#0e0a2a'],[1,'#2a1850']])+wglow(480,270,480,'#ffb060',.25)+wmandala(480,270,340,'#f1c04e',28,220)+splitArgs({hi:-1,delay:.4})+wsparks(0,960,60,500,18,'#ffe7a8'), cam:'in' },

  { line:`पहला तर्क है पृथ्वी का दान और तपस्या।`, scene:'ch3-do-tark', mood:'hope', tr:'fade',
    art:()=>wsky([[0,'#0e0a2a'],[1,'#2a1850']])+wglow(250,270,380,'#ff9a50',.3)+wmandala(480,270,340,'#f1c04e',28,220)+splitArgs({hi:0,delay:0})+wsparks(0,960,60,500,18,'#ffe7a8'), cam:{keys:[[0,480,270,1],[5,300,250,1.25]]} },

  { line:`वाल्मीकि रामायण के बालकांड में परशुराम जी स्वयं श्रीराम को बताते हैं कि क्षत्रियों से पृथ्वी जीतने के बाद उन्होंने पूरी धरती ऋषि कश्यप को दान कर दी थी।`, scene:'ch3-do-tark', mood:'divine', tr:'fade',
    ...MAH({sunX:480, sunY:300, tone:'dawn'}), front:()=>wlower('वाल्मीकि रामायण','बालकांड',{at:.6,hold:5})+A('bob:5:.3',earth(480,196,46)+wglow(480,196,120,'#bfe0ff',.45)),
    cast:[PR({x:300, s:.72, acts:[[0,'stand'],[2.5,'give']]}), {c:KASHYAP,x:660,y:FY,s:.7,flip:true,acts:[[0,'stand'],[3.5,'bless']],expr:'serene'}],
    cam:{keys:[[0,480,280,1],[10,480,262,1.18]]} },

  { line:`ऋषि कश्यप ने उनसे कहा था कि अब वे इस दान की गई भूमि पर रात्रि विश्राम न करें।`, scene:'ch3-do-tark', mood:'calm', tr:'fade',
    ...MAH({sunX:480, sunY:330, tone:'dusk', sun:.0}), front:()=>`<circle cx="790" cy="120" r="32" fill="#f3ecd2"/>${wglow(790,120,110,'#e8f0ff',.45)}`,
    cast:[{c:KASHYAP,x:610,y:FY,s:.74,flip:true,acts:[[0,'stand'],[1,'explain']],expr:'serene'}, PR({x:340, s:.7, props:{front:'parashu'}, acts:[[0,'stand'],[2.5,'pranam']]})],
    cam:{keys:[[0,520,290,1.05],[7,470,270,1.3]]} },

  { line:`इसके बाद परशुराम जी महेंद्र पर्वत पर तपस्या करने चले गए।`, scene:'ch3-do-tark', mood:'hope', tr:'fade', fx:'dust',
    ...MAH({sunX:600, sunY:290, tone:'dawn'}), title:{text:'महेंद्र पर्वत', y:92, size:42, color:'#fff0cc', delay:1.2},
    cast:[PR({x:600, s:.72, walk:{from:-520,dur:4.6,delay:0}, props:{front:'parashu'}, acts:[[0,'stand'],[5,'kneelPray']]})],
    cam:{keys:[[0,320,285,1.05],[7,560,275,1.2]]} },

  { line:`कई लोग मानते हैं कि इस वचन के कारण वे धरती पर लौटकर रावण से युद्ध नहीं कर सकते थे।`, scene:'ch3-do-tark', mood:'calm', tr:'fade',
    ...MAH({sunX:760, sunY:320, tone:'dusk'}),
    front:()=>A('pulse:2.2',`<rect x="525" y="70" width="14" height="370" rx="7" fill="#ffe7a8" opacity=".5" filter="url(#b4)"/><rect x="530" y="70" width="4" height="370" fill="#fff3c4"/>`)+wglow(820,360,130,'#ffb060',.5),
    cast:[PR({x:300, s:.74, props:{}, acts:[[0,'kneelPray']], eyes:'closed'})], cam:'panR' },

  { line:`लेकिन जिस समय परशुराम जी यह बात श्रीराम को बता रहे थे, उस समय वे स्वयं मिथिला से लौटते हुए श्रीराम के सामने खड़े थे।`, scene:'ch3-do-tark', mood:'joy', tr:'fade', fx:'petals',
    ...lay(()=>mithilaRoad()), front:()=>wlower('वाल्मीकि रामायण','बालकांड',{at:.6,hold:4.8}),
    cast:[PR({x:330, s:.78, acts:[[0,'stand'],[2,'explain']]}), {c:RAMA,x:650,y:FY,s:.7,flip:true,props:{front:'bow'},acts:[[0,'stand'],[2,'namaste']],expr:'serene'}],
    cam:{keys:[[0,470,280,1],[11,490,262,1.25]]} },

  { line:`इसका अर्थ यह है कि उन पर धरती पर आने का कोई पूर्ण प्रतिबंध नहीं था;`, scene:'ch3-do-tark', mood:'hope', tr:'fade',
    ...lay(()=>mithilaRoad()), front:()=>A('fadeout:1.2:2.4',`<rect x="205" y="70" width="14" height="370" rx="7" fill="#ffe7a8" opacity=".6" filter="url(#b4)"/>`)+A('fadein:1.2:.2',A('fadeout:1.3:3',wsparks(150,280,120,430,30,'#fff3c4'))),
    cast:[PR({x:360, s:.78, walk:{from:-200,dur:3,delay:.6}, acts:[[0,'stand']]}), {c:RAMA,x:690,y:FY,s:.7,flip:true,props:{front:'bow'},acts:[[0,'stand']],expr:'serene'}],
    cam:'in' },

  { line:`हाँ, यह ज़रूर था कि वे अपने विजय अभियानों से संन्यास लेकर तपस्या में लीन हो चुके थे।`, scene:'ch3-do-tark', mood:'calm', tr:'fade', fx:'petals',
    ...MAH({sunX:480, sunY:300, tone:'dawn'}), art:()=>LEAN_AXE(640,440),
    cast:[PR({x:430, s:.8, props:{}, acts:[[0,'stand'],[2.4,'kneelPray']], eyes:'closed', expr:'serene'})],
    cam:{keys:[[0,480,290,1],[8,450,270,1.35]]} },

  { line:`दूसरा तर्क है 'विष्णु तत्व' का श्रीराम में समाहित होना।`, scene:'ch3-do-tark', mood:'divine', tr:'fade',
    art:()=>wsky([[0,'#0a0c30'],[1,'#1c1e56']])+wglow(710,270,380,'#7fa8ff',.3)+wmandala(480,270,340,'#f1c04e',28,220)+splitArgs({hi:1,delay:0})+wsparks(0,960,60,500,18,'#cfe0ff'), cam:{keys:[[0,480,270,1],[5,660,250,1.25]]} },

  { line:`अध्यात्म रामायण के बालकांड के सातवें सर्ग में एक बड़ा ही अद्भुत प्रसंग आता है।`, scene:'ch3-do-tark', mood:'divine', tr:'fade',
    art:SCROLL('#06203a','#124a58','#7fe8ff'), front:()=>wlower('अध्यात्म रामायण','बालकांड · सर्ग 7',{at:.6,hold:5}), cam:'in' },

  { line:`परशुराम जी याद करते हैं कि भगवान विष्णु ने उन्हें वचन दिया था कि जब वे पूर्ण रूप में पुनः अवतार लेंगे, तो अपनी वैष्णवी शक्ति वापस ले लेंगे।`, scene:'ch3-do-tark', mood:'divine', tr:'iris', trAt:[660,230],
    ...MAH({sunX:260, sunY:300, tone:'dawn'}),
    front:()=>A('ripple:3.4:680:250',`<circle cx="680" cy="250" r="190" fill="none" stroke="#ffe7a8" stroke-width="3" stroke-dasharray="3 9"/>`)+A('pulse:2.4',wglow(680,250,210,'#9fc4ff',.4)),
    cast:[PR({x:250, s:.72, acts:[[0,'stand'],[2,'think']]}), {c:VISHNU,x:680,y:410,s:.64,flip:true,enter:{fade:1.8,delay:1.6},acts:[[0,'stand'],[3,'bless']],expr:'serene'}],
    cam:{keys:[[0,380,280,1],[11,470,270,1.15]]} },

  { line:`परंतु यहाँ समय को समझना ज़रूरी है।`, scene:'ch3-do-tark', mood:'calm', tr:'fade',
    art:()=>wsky([[0,'#0a0820'],[1,'#241448']])+wmandala(480,250,190,'#f1c04e',24,40)+A('spin:6:480:250',`<line x1="480" y1="250" x2="480" y2="130" stroke="#ffe7a8" stroke-width="5" stroke-linecap="round"/>`)+A('spin:72:480:250',`<line x1="480" y1="250" x2="560" y2="250" stroke="#f1c04e" stroke-width="7" stroke-linecap="round"/>`)+`<circle cx="480" cy="250" r="9" fill="#ffe7a8"/>`+A('draw:.5:2.4',`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M60 430 L900 430" stroke="#f1c04e" stroke-width="3" fill="none"/>`)+wsparks(60,900,100,480,16,'#ffe7a8'), cam:'in' },

  { line:`परशुराम जी ने अपनी दिव्य शक्ति श्रीराम को तब लौटाई, जब श्रीराम का जन्म हो चुका था, वे शिव धनुष तोड़ चुके थे और माता सीता से उनका विवाह हो चुका था।`, scene:'ch3-do-tark', mood:'hope', tr:'fade',
    art:()=>wsky([[0,'#0a0820'],[1,'#241448']])+wglow(480,270,420,'#ffb060',.22)+chainW([{n:'श्रीराम का जन्म'},{n:'शिव धनुष भंग'},{n:'सीता से विवाह'},{n:'शक्ति वापसी',sub:'परशुराम → श्रीराम'}],{y:215,delay:1.2,step:2.4,hi:3})+wsparks(60,900,100,480,16,'#ffe7a8'), cam:'in' },

  { line:`तो प्रश्न अब भी वही है—श्रीराम के जन्म से पहले, जब परशुराम जी के पास वह संपूर्ण दिव्य शक्ति थी, तब उन्होंने रावण का वध क्यों नहीं किया?`, scene:'ch3-do-tark', mood:'hope', tr:'fade',
    art:()=>wsky([[0,'#0a0820'],[1,'#241448']])+wglow(300,400,320,'#ffb060',.3)+chainW([{n:'श्रीराम का जन्म'},{n:'शिव धनुष भंग'},{n:'सीता से विवाह'},{n:'शक्ति वापसी'}],{y:120,delay:.1,step:.2,hi:-1,before:true})+wquestion(700,340,.6),
    cast:[PR({x:200, s:.68, with:{aura:'gw'}, acts:[[0,'stand'],[3,'lookAway']]})], cam:{keys:[[0,480,270,1],[11,400,300,1.15]]} },

  /* ================= CHAPTER 4 ================= */
  { chapter:{no:4, name:'अवतार का निश्चित उद्देश्य'}, dur:5, tr:'dissolve', mood:'divine', scene:'ch4-avatar-uddeshya', sfx:[[.15,'bell',.6]] },

  { line:`इस प्रश्न का सबसे सटीक उत्तर किसी गुप्त नियम में नहीं, बल्कि सृष्टि के विधान और अवतारों के उद्देश्य में छिपा है।`, scene:'ch4-avatar-uddeshya', mood:'divine', tr:'dissolve',
    ...lay(()=>cosmos()), cam:{keys:[[0,480,270,1],[11,480,270,1.2]]} },

  { line:`भगवान विष्णु का हर अवतार एक विशेष कार्य और एक निश्चित मर्यादा के साथ प्रकट होता है।`, scene:'ch4-avatar-uddeshya', mood:'divine', tr:'fade',
    ...lay(()=>cosmos({col:'#7fe0ff'})), front:()=>avatarMontage({hi:-1,delay:.8,step:1.1}), cam:'in' },

  { line:`जैसे नृसिंह अवतार केवल हिरण्यकशिपु का वध करने और भक्त प्रह्लाद की रक्षा के लिए हुआ था।`, scene:'ch4-avatar-uddeshya', mood:'hope', tr:'fade', fx:'sparks',
    art:()=>wsky([[0,'#2a1208'],[.6,'#6a3414'],[1,'#c07a30']])+wglow(400,250,420,'#ffd27a',.55)+lightShafts(400,120,'#fff0c0',9,700,.12)+
      `<g transform="translate(400 0)"><rect x="-70" y="40" width="140" height="400" fill="#5a3418"/><rect x="-80" y="30" width="160" height="26" fill="url(#gold)"/><rect x="-80" y="424" width="160" height="26" fill="url(#gold)"/><path d="M-50 70 V420 M50 70 V420" stroke="#e8b83a" stroke-opacity=".5" stroke-width="3"/>${A('pulse:2.2',`<rect x="-6" y="40" width="12" height="400" fill="#fff3c4" filter="url(#b4)"/>`)}</g>`+
      A('pop:1.4',A('bob:4:.25',`<g transform="translate(400 235) scale(2.1)">${wglow(0,0,70,'#fff0c0',.6)}${_emblem(1)}</g>`)),
    cast:[{c:NANDI,x:700,y:438,s:.62,acts:[[0,'kneelPray']],expr:'serene'}], cam:{keys:[[0,480,270,1],[8,430,250,1.2]]} },

  { line:`मत्स्य अवतार का उद्देश्य प्रलय काल में सृष्टि के बीजों और वेदों की रक्षा करना था।`, scene:'ch4-avatar-uddeshya', mood:'calm', tr:'fade',
    art:()=>wsky([[0,'#0a2a4a'],[.55,'#1f6a8a'],[1,'#9fe0d8']])+wstars(40,200)+wglow(480,200,400,'#bfffff',.35)+
      [0,1,2,3,4].map(i=>A(`drift:${i%2?120:-120}:0:${10+i*2}`,`<path d="M-100 ${330+i*32} q60 -18 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0" stroke="#d8ffff" stroke-opacity="${.6-i*.08}" stroke-width="3.4" fill="none"/>`)).join('')+
      A('bob:8:.18',`<g transform="translate(480 330) scale(2.3)">${_emblem(0)}</g>`)+A('bob:6:.22',`<g transform="translate(610 262)"><path d="M-40 10 Q0 30 40 10 L30 -6 H-30Z" fill="#8a5a2a"/><rect x="-2" y="-70" width="4" height="64" fill="#6a4218"/><path d="M2 -66 L36 -48 L2 -30Z" fill="#fff0c0"/>${A('pulse:2',wglow(-14,-18,44,'#ffe7a8',.9))}<circle cx="-14" cy="-18" r="9" fill="#fff3c4"/><rect x="8" y="-14" width="22" height="9" rx="3" fill="#f1dfae"/></g>`)+wsparks(60,900,100,480,18,'#e8ffff'),
    cam:{keys:[[0,480,270,1],[8,520,290,1.2]]} },

  { line:`ठीक इसी प्रकार, परशुराम अवतार का मुख्य उद्देश्य सहस्त्रबाहु और उन अहंकारी राजाओं का अंत करना था, जो धर्म की मर्यादा लांघ चुके थे।`, scene:'ch4-avatar-uddeshya', mood:'hope', tr:'fade',
    ...lay(()=>cosmos({col:'#ff9a50'})), front:()=>avatarMontage({hi:2,delay:0,step:.15})+crownsRise(300,820,500,8), cam:{keys:[[0,480,270,1],[12,640,250,1.25]]} },

  { line:`पृथ्वी का भार हल्का करने और ऋषि कश्यप को भूमि दान करने के साथ ही परशुराम अवतार का मुख्य प्रयोजन पूर्ण हो चुका था।`, scene:'ch4-avatar-uddeshya', mood:'divine', tr:'fade',
    ...MAH({sunX:480, sunY:310, tone:'dawn'}),
    front:()=>A('rise:-26:5:.3',earth(480,185,58)+wglow(480,185,150,'#bfe0ff',.4))+A('draw:3.0:1.8',`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M480 105 A80 80 0 1 1 479.9 105" stroke="#ffd98a" stroke-width="5" fill="none"/>`)+A('draw:4.8:.8',`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M446 182 L472 210 L520 150" stroke="#fff3c4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`),
    cast:[PR({x:220, s:.68, acts:[[0,'stand'],[3,'namaste']], props:{}}), {c:KASHYAP,x:760,y:FY,s:.68,flip:true,acts:[[0,'stand'],[2,'bless']],expr:'serene'}], cam:'in' },

  { line:`वहीं दूसरी ओर, वाल्मीकि रामायण के बालकांड में जब रावण के अत्याचार तीनों लोकों में बढ़ गए, तब सभी देवता ब्रह्मा जी के साथ भगवान विष्णु की शरण में गए।`, scene:'ch4-avatar-uddeshya', mood:'calm', tr:'fade',
    ...lay(()=>kshir()), front:()=>wlower('वाल्मीकि रामायण','बालकांड',{at:.6,hold:5})+A('drift:260:0:16',wmist(190,140,'#9a8ab8',.5)),
    cast:[{c:DEVA,x:200,y:FY,s:.6,walk:{from:-300,dur:5,delay:.2},acts:[[0,'stand']]}, {c:INDRA,x:310,y:FY,s:.64,walk:{from:-300,dur:5,delay:.1},acts:[[0,'stand']]}, {c:BRAHMA,x:440,y:FY,s:.7,walk:{from:-300,dur:5,delay:0},acts:[[0,'stand']],expr:'serene'}, {c:VISHNU,x:760,y:FY,s:.74,flip:true,acts:[[0,'stand'],[5,'bless']],expr:'serene'}],
    cam:{keys:[[0,380,280,1],[12,560,270,1.1]]} },

  { line:`देवताओं ने उनसे विशेष प्रार्थना की कि वे राजा दशरथ के घर पुत्र रूप में जन्म लें और रावण का संहार करें।`, scene:'ch4-avatar-uddeshya', mood:'hope', tr:'fade',
    ...lay(()=>kshir()), front:()=>VISION(690,130,70),
    cast:[{c:DEVA,x:180,y:FY,s:.58,acts:[[0,'kneelPray']]}, {c:INDRA,x:290,y:FY,s:.62,acts:[[0,'kneelPray']]}, {c:BRAHMA,x:410,y:FY,s:.66,acts:[[0,'kneelPray']],expr:'serene'}, {c:VISHNU,x:700,y:FY,s:.74,flip:true,acts:[[0,'stand'],[2.5,'bless']],expr:'serene'}],
    cam:{keys:[[0,480,270,1],[9,560,230,1.28]]} },

  { line:`अर्थात, रावण का वध केवल एक शक्तिशाली योद्धा को मारने की घटना नहीं थी।`, scene:'ch4-avatar-uddeshya', mood:'calm', tr:'fade',
    ...lay(()=>cosmos({col:'#46e0a8'})), cast:[RV({x:480, s:.74, props:{front:'khadga'}, acts:[[0,'stand']], talk:false})], cam:{keys:[[0,480,300,1.05],[7,480,262,1.3]]} },

  { line:`इसके लिए 'मर्यादा पुरुषोत्तम' के रूप में एक आदर्श जीवन जीने, धर्म की स्थापना करने और समाज को एक आदर्श चरित्र देने की आवश्यकता थी—जो श्रीराम अवतार का निर्धारित उद्देश्य था।`, scene:'ch4-avatar-uddeshya', mood:'joy', tr:'glow', fx:'petals',
    ...lay(()=>ayodhya({tone:'dusk'})), front:()=>wmandala(480,130,70,'#fff0b8',16,30)+A('pulse:2.2',wglow(480,130,110,'#ffe7a8',.6)),
    cast:[{c:RAMA,x:480,y:FY,s:.76,props:{front:'bow'},acts:[[0,'stand']],expr:'serene',aura:'gw'}, {c:VILLAGER,x:250,y:FY,s:.5,acts:[[0,'namaste']]}, {c:DEVOTEE_F,x:330,y:FY,s:.5,acts:[[0,'namaste']]}, {c:VILLAGER,x:700,y:FY,s:.5,flip:true,acts:[[0,'namaste']]}, {c:DEVOTEE_F,x:790,y:FY,s:.5,flip:true,acts:[[0,'namaste']]}],
    cam:{keys:[[0,480,330,1.05],[13,480,240,1.12]]} },

  { line:`हालाँकि ब्रह्मांड पुराण में परशुराम जी द्वारा दैत्यों से युद्ध करने का उल्लेख मिलता है,`, scene:'ch4-avatar-uddeshya', mood:'calm', tr:'fade',
    art:SCROLL('#1a0a3a','#3a1a6a','#c49aff',1.4), front:()=>wlower('ब्रह्मांड पुराण','परशुराम · दैत्यों से युद्ध',{at:.6,hold:4.5}), cast:[PR({x:130, s:.6, acts:[[0,'stand'],[2,'explain']]})], cam:'in' },

  { line:`और महाकवि भवभूति के नाटक 'महावीरचरित' में राक्षसों के संहार का दायित्व श्रीराम को सौंपे जाने का काव्यात्मक वर्णन है,`, scene:'ch4-avatar-uddeshya', mood:'joy', tr:'fade',
    art:()=>wsky([[0,'#3a0c1c'],[1,'#7a2a30']])+wglow(480,240,420,'#ffcf90',.45)+`<path d="M-40 -20 Q70 140 40 560 L-40 560Z" fill="#8a1a2a" stroke="url(#gold)" stroke-width="4"/><path d="M1000 -20 Q890 140 920 560 L1000 560Z" fill="#8a1a2a" stroke="url(#gold)" stroke-width="4"/>`+lightShafts(480,0,'#fff0c0',7,620,.1)+`<rect x="-40" y="${FY}" width="1040" height="130" fill="#3a1218"/><path d="M-40 ${FY} H1000" stroke="url(#gold)" stroke-width="3"/>`+wsparks(100,860,120,430,18,'#ffe7a8'),
    front:()=>wlower('महावीरचरित','महाकवि भवभूति · नाटक',{at:.6,hold:5}),
    cast:[{c:RISHI,x:320,y:FY,s:.68,acts:[[0,'stand'],[1.5,'offer']],props:{front:'bow'},expr:'serene'}, {c:RAMA,x:650,y:FY,s:.68,flip:true,acts:[[0,'stand'],[3,'namaste']],expr:'serene',aura:'gw'}], cam:'in' },

  { line:`लेकिन मूल वाल्मीकि रामायण अवतारों के इसी अलग-अलग प्रयोजन को दर्शाता है।`, scene:'ch4-avatar-uddeshya', mood:'divine', tr:'glow',
    ...lay(()=>cosmos()), front:()=>avatarMontage({hi:-1,delay:.4,step:.4})+wlower('वाल्मीकि रामायण','अवतारों के अलग-अलग प्रयोजन',{at:1.2,hold:4,y:30}), cam:{keys:[[0,480,270,1],[7,480,250,1.1]]} },

  /* ================= CHAPTER 5 ================= */
  { chapter:{no:5, name:'निष्कर्ष'}, dur:5, tr:'dissolve', mood:'divine', scene:'ch5-shanti', sfx:[[.15,'bell',.6]] },

  { line:`संक्षेप में कहें तो—शास्त्रों में ऐसा कहीं नहीं लिखा कि परशुराम जी रावण को मारने में असमर्थ थे या उन्हें ऐसा करने से रोका गया था।`, scene:'ch5-shanti', mood:'hope', tr:'dissolve', fx:'dust',
    ...MAH({sunX:480, sunY:300, tone:'dawn'}), front:()=>A('bob:4:.22',pothi(650,190,.75)+wglow(650,190,150,'#ffe7a8',.45)),
    cast:[PR({x:290, s:.78, expr:'serene', acts:[[0,'stand'],[3,'explain']]})], cam:{keys:[[0,420,290,1],[11,440,262,1.25]]} },

  { line:`बात केवल इतनी थी कि परशुराम जी का अवतार कार्य पूर्ण हो चुका था और वे तपस्या में लीन थे,`, scene:'ch5-shanti', mood:'divine', tr:'fade', fx:'petals',
    ...MAH({sunX:250, sunY:292, tone:'dawn'}),
    art:()=>`<g transform="translate(740 410)">${Array.from({length:5},(_,i)=>`<g transform="translate(${-110+i*55} 0)"><rect x="-15" y="-${46+(i%3)*14}" width="30" height="${46+(i%3)*14}" fill="#3a2250"/><path d="M-18 -${46+(i%3)*14} Q0 -${80+(i%3)*14} 18 -${46+(i%3)*14}Z" fill="#6a3a78"/></g>`).join('')}</g>`+
      A('fadein:2.2:1.6',wglow(730,250,230,'#ffd98a',.7)+A('ripple:3.2:730:300',`<circle cx="730" cy="300" r="120" fill="none" stroke="#ffe7a8" stroke-width="3"/>`)+infantRam(730,340,.8)+
        A('draw:3.0:2.8',`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M715 270 C620 160 450 160 300 235" stroke="#ffe7a8" stroke-width="3" fill="none" opacity=".9"/>`)+A('drift:-380:-40:6',`<circle cx="790" cy="290" r="4" fill="#fff3c4"/>`)+A('drift:-380:-40:7',`<circle cx="790" cy="290" r="3" fill="#fff3c4"/>`)),
    cast:[PR({x:260, s:.82, props:{}, acts:[[0,'kneelPray']], eyes:'closed', expr:'serene'})],
    focus:{at:3.0, sound:'revive', dur:4.2, duck:.28},
    cam:{keys:[[0,260,300,1.7],[2.6,320,285,1.35],[6.5,480,268,1.0]]} },

  { line:`जबकि रावण के अंत और धर्म की मर्यादा स्थापित करने का कार्य स्वयं भगवान विष्णु ने अपने श्रीराम अवतार के लिए चुना था।`, scene:'ch5-shanti', mood:'divine', tr:'glow', fx:'petals',
    ...lay(()=>ayodhya({tone:'dawn'})),
    art:()=>infantRam(660,430,1.25)+whisperTrail(310,230,650,320,.5,18),
    cast:[{c:VISHNU,x:250,y:FY,s:.8,acts:[[0,'stand'],[2,'bless']],expr:'serene'}],
    cam:{keys:[[0,420,290,1.05],[10,500,265,1.0],[13,480,262,.98]]} },

  ]
});
