/* Chandra's 27 wives — Short. Words come exactly from my-script.md (long lines split over 2 shots).
   Build: node tools/build.js chandra-27-wives-short-form */
const SKY = (moonX,moonY,moonR,mode,dur,delay)=> `<rect width="540" height="960" fill="url(#skyN)"/>`+stars(90,620)+(moonR?phaseMoon(moonX,moonY,moonR,mode||'full',dur,delay):'');
const LAND = (y)=> hills(y-90,36,'#1d1d40',140)+`<rect y="${y-120}" width="540" height="70" fill="url(#fog)"/>`+ground(y)+tufts(y-10,'#3a3a4a',50)+flowers(y,20);
const WIFE = (top,veil)=>({c:NAKSHATRA, with:{top, bottom:top, veil}});
const W1=['#5a3a9a','#8a6ad0'], W2=['#2a7a6a','#5ac0a0'], W3=['#b8602a','#f0a050'], W4=['#2a4a9a','#6a8ae0'];

VIDEO({
  title:'चंद्रदेव की 27 पत्नियाँ', format:'short', target:72,
  keywords:['चंद्र','दक्ष','रोहिणी','27','नक्षत्र','शाप','महाभारत','क्षीण','कृष्ण पक्ष','शुक्ल पक्ष'],
  shots:[
    /* 1 — hook */
    { line:'चंद्रमा की 27 पत्नियाँ हैं,', cam:'in', fx:'stars',
      art:()=> SKY()+nakshatras(270,330,215,175,0.05)+LAND(800),
      cast:[{c:CHANDRA, x:270, y:870, s:1.05, expr:'serene', acts:[[0,'stand'],[0.6,'bless',0.8]]}],
      title:{text:'चंद्रदेव की 27 पत्नियाँ', y:120, size:44, delay:0.3} },

    /* 2 — a different wife each night */
    { line:'और वह हर रात एक अलग पत्नी के साथ समय बिताते हैं।', cam:'panR', fx:'flies',
      art:()=> SKY(430,150,34)+sparkle(380,250,1.4)+sparkle(120,210,1)+sparkle(250,120,1.1)+LAND(800),
      cast:[{c:CHANDRA, x:190, y:860, s:.95, expr:'smile', walk:{from:-220, dur:2.2}, acts:[[0,'stand'],[2.3,'offer',0.7]]},
            {...WIFE(...W1), x:390, y:855, s:.9, flip:true, expr:'smile', acts:[[0,'stand'],[1.6,'namaste',0.7]]}],
      front:()=>fg() },

    /* 3 — the source */
    { line:'और इसका उल्लेख वास्तव में महाभारत के शल्य पर्व, अध्याय 35 में मिलता है:', cam:'in', fx:'embers',
      art:()=> `<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="700" r="320" fill="url(#saf)" opacity=".45"/>`+A('rise:40:1:0.3',pothi(270,720,1.25))+fire(110,800,1.1)+fire(430,800,1.1),
      title:{text:'महाभारत', y:170, size:70, delay:0.3},
      front:()=> big(270,250,34,'#f6ecd2','शल्य पर्व · अध्याय 35',1.4) },

    /* 4 — the shloka (captions off: the verse is on the parchment) */
    { line:'दक्षस्य तनयास्तात प्रादुरासन् विशाम्पते। स सप्तविंशतिं कन्या दक्षः सोमाय वै ददौ॥', nocap:true, cam:'still', fx:'embers',
      art:()=> `<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="270" cy="480" r="340" fill="url(#saf)" opacity=".4"/>`+parchment(270,490,490,330)+
        A('pop:0.5',`<text x="270" y="380" text-anchor="middle" font-size="18" fill="#8a5a28" style="font-weight:700">— महाभारत, शल्य पर्व, अध्याय 35 —</text>`)+
        verse(270,445,['दक्षस्य तनयास्तात','प्रादुरासन् विशाम्पते।','स सप्तविंशतिं कन्या','दक्षः सोमाय वै ददौ॥'],34,'#5a2a0a',0.8,1.3)+fire(90,860,1)+fire(450,860,1) },

    /* 5 — Daksha gives 27 daughters to Chandra */
    { line:'जिसका अर्थ है— दक्ष ने अपनी 27 पुत्रियों का विवाह चंद्रदेव के साथ किया,', cam:'out', fx:'petals',
      art:()=> palace(810),
      cast:[{...WIFE(...W2), x:225, y:812, s:.7, expr:'smile', acts:[[0,'namaste']]},
            {...WIFE(...W3), x:290, y:812, s:.7, expr:'smile', acts:[[0,'namaste']]},
            {...WIFE(...W4), x:355, y:812, s:.7, expr:'smile', acts:[[0,'namaste']]},
            {c:DAKSHA, x:110, y:870, s:.95, talk:true, expr:'calm', acts:[[0,'stand'],[0.8,'give',0.8]]},
            {c:CHANDRA, x:445, y:870, s:.95, flip:true, expr:'smile', acts:[[0,'stand'],[1.4,'namaste',0.7]]}] },

    /* 6 — they are the 27 nakshatras */
    { line:'जो आकाश में 27 नक्षत्रों का प्रतिनिधित्व करती हैं।', cam:'in', fx:'stars', capTop:640,
      art:()=> SKY(270,330,44)+nakshatras(270,330,215,215,0.07)+LAND(860) },

    /* 7 — 27.3 days */
    { line:'और आज भी चंद्रमा को सभी 27 नक्षत्रों की परिक्रमा करने में लगभग 27.3 दिन का समय लगता है।', cam:'still', fx:'stars', capTop:650,
      art:()=> SKY()+nakshatras(270,380,200,200,0)+earth(270,380,30)+orbitMoon(270,380,120,5,15)+LAND(880),
      title:{text:'≈ 27.3 दिन', y:130, size:60, delay:1.2} },

    /* 8 — the twist */
    { line:'लेकिन यहीं पर गड़बड़ हो गई!', cam:'in', fx:'sparks', tr:'dip', shake:[0.4,0.5,5],
      art:()=> SKY(420,150,30)+clouds()+LAND(800),
      cast:[{c:CHANDRA, x:270, y:880, s:1.1, expr:'surprise', acts:[[0,'stand'],[0.3,'shock',0.4]]}] },

    /* 9 — only Rohini */
    { line:'चंद्रदेव केवल अपनी एक पत्नी, रोहिणी, से प्रेम करते थे।', cam:'panL', fx:'petals',
      art:()=> SKY(440,150,32)+sparkle(330,260,1.6,'#ffc0d8')+LAND(800),
      cast:[{...WIFE(...W2), x:55, y:800, s:.62, expr:'sad', acts:[[0,'lookDown']]},
            {...WIFE(...W3), x:105, y:804, s:.62, expr:'sad', acts:[[0,'lookDown']]},
            {c:CHANDRA, x:235, y:865, s:.95, expr:'smile', acts:[[0,'stand'],[0.7,'give',0.7]]},
            {c:ROHINI, x:390, y:860, s:.92, flip:true, expr:'smile', acts:[[0,'stand'],[1.0,'namaste',0.7]]}],
      front:()=>fg() },

    /* 10 — the wives complain to Daksha */
    { line:'जब उनकी बाकी पत्नियों ने दक्ष से शिकायत की,', cam:'panR', fx:'dust',
      art:()=> palace(810),
      cast:[{...WIFE(...W1), x:95, y:860, s:.8, expr:'sad', acts:[[0,'stand'],[0.6,'offer']]},
            {...WIFE(...W4), x:175, y:858, s:.8, expr:'sad', acts:[[0,'lookDown']]},
            {...WIFE(...W2), x:250, y:862, s:.8, expr:'sad', talk:true, acts:[[0,'stand'],[0.4,'point']]},
            {c:DAKSHA, x:430, y:870, s:.98, flip:true, expr:'calm', acts:[[0,'stand'],[1.0,'think']]}] },

    /* 11 — the curse */
    { line:'तो वह अत्यंत क्रोधित हो गए और उन्होंने चंद्रदेव को क्षीण (नष्ट) होने का शाप दे दिया।', cam:'in', fx:'embers', tr:'flash', shake:[1.4,0.7,7],
      art:()=> palace(810,'#4a0e16')+`<rect width="540" height="960" fill="#ff2a10" opacity=".08"/>`,
      cast:[{c:DAKSHA, x:150, y:875, s:1.0, talk:true, expr:'angry', acts:[[0,'fist'],[1.3,'point',0.3]]},
            {c:CHANDRA, x:420, y:870, s:.95, flip:true, expr:'surprise', acts:[[0,'stand'],[1.5,'shock',0.3]]}] },

    /* 12 — the moon fades */
    { line:'जल्द ही, चंद्रमा का प्रकाश कम होने लगा।', cam:'down', fx:'stars',
      art:()=> SKY(270,220,80,'wane',3.2,0.3)+LAND(820),
      cast:[{c:CHANDRA, with:{aura:null}, x:270, y:885, s:.92, expr:'sad', acts:[[0,'stand'],[0.8,'lookDown',1]]}] },

    /* 13 — the gods pray */
    { line:'देवताओं ने दक्ष से शाप वापस लेने की प्रार्थना की,', cam:'out', fx:'sparks',
      art:()=> palace(810,'#2e1a34'),
      cast:[{c:INDRA, x:105, y:868, s:.92, expr:'calm', acts:[[0,'stand'],[0.4,'namaste',0.7]]},
            {c:DEVA, x:215, y:862, s:.85, expr:'calm', acts:[[0,'stand'],[0.7,'namaste',0.7]]},
            {c:DAKSHA, x:435, y:872, s:.98, flip:true, expr:'calm', acts:[[0,'think'],[2.2,'stand']]}] },

    /* 14 — light returns slowly */
    { line:'तब उन्होंने चंद्रदेव को अपनी चमक को क्रमिक रूप से (धीरे-धीरे) पुनः प्राप्त करने की अनुमति दी।', cam:'up', fx:'stars',
      art:()=> SKY(400,200,62,'wax',5)+LAND(810),
      cast:[{c:DAKSHA, x:130, y:870, s:.95, talk:true, expr:'calm', acts:[[0,'stand'],[0.5,'bless',0.7]]},
            {c:CHANDRA, x:400, y:868, s:.95, flip:true, expr:'serene', acts:[[0,'kneelPray'],[3.0,'stand',1.0]]}] },

    /* 15 — waning & waxing */
    { line:'और इसी प्रकार महाभारत में चंद्रमा के घटने और बढ़ने (कृष्ण पक्ष और शुक्ल पक्ष) की व्याख्या की गई है!', cam:'still', fx:'stars', tr:'dip', dur:7.4,
      art:()=> SKY()+moonRow(200,24)+
        A('pop:1.8',`<text x="135" y="268" text-anchor="middle" font-size="26" fill="#c9c4e8">कृष्ण पक्ष</text><path d="M60 284 L210 284" stroke="#c9c4e8" stroke-width="2"/><path d="M60 284 l10 -6 v12Z" fill="#c9c4e8"/>`)+
        A('pop:2.6',`<text x="405" y="268" text-anchor="middle" font-size="26" fill="#ffe7a8">शुक्ल पक्ष</text><path d="M330 284 L480 284" stroke="#ffe7a8" stroke-width="2"/><path d="M480 284 l-10 -6 v12Z" fill="#ffe7a8"/>`)+LAND(810),
      cast:[{c:CHANDRA, x:270, y:880, s:1.05, expr:'serene', acts:[[0,'stand'],[0.6,'bless',0.8]]}] }
  ]
});
