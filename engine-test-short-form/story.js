/* Engine test: one shot per rig feature. Build: node tools/build.js engine-test-short-form */
VIDEO({
  title:'Engine test — rig & captions', format:'short',
  keywords:['बर्बरीक','कृष्ण','देवी','बाण','भीम','अर्जुन','महादेव','माँ'],
  shots:[
    { line:'मिलिए बर्बरीक से — तीन बाणों का धनुर्धर।', cam:'in', fx:'flies',
      art:()=> nightBase({moon:[420,170,36],gy:760})+peepal(410,800,1.0),
      cast:[{c:BARBARIK, x:250, y:845, s:.95, walk:{from:-260, dur:2.4}, acts:[[0,'stand'],[2.6,'bowReady']], props:{front:'bow'}}],
      front:()=>fg(), title:{text:'बर्बरीक', y:150, size:66} },

    { line:'एक बाण... और पूरी सेना का अंत!', cam:{from:[270,520,1.0],to:[300,500,1.14]}, fx:'embers', shake:[2.2,0.6,6],
      art:()=> warSky(470,120)+hills(620,30,'#3a120e',120)+ground(700,'url(#gndW)','#6a2a1a')+armies(690,'#1f3e8a','#a8241f',.8),
      cast:[{c:BARBARIK, x:200, y:880, s:1.15, expr:'angry', acts:[[0,'bowReady'],[0.6,'bowDraw',0.9]], props:{front:'bow'}}] },

    { line:'कृष्ण मुस्कुराए और बोले — "तथास्तु!"', cam:'in', fx:'sparks', tr:'flash',
      art:()=> divine(270,380,'gw'),
      cast:[{c:KRISHNA, x:270, y:870, s:1.2, expr:'serene', talk:true, aura:'gw', acts:[[0,'stand'],[0.5,'bless',0.7]]}] },

    { line:'ब्राह्मण ने दान में कुछ अनोखा मांगा।', cam:'panR', fx:'embers',
      art:()=> nightBase({moon:[90,150,30],fort:[110,580,.75],camps:628,gy:720,hillsY:575}),
      cast:[{c:BRAHMIN, x:150, y:850, s:.9, talk:true, acts:[[0,'stand'],[0.4,'point'],[2.2,'offer']], props:{back:'staff'}},
            {c:BARBARIK, x:400, y:855, s:.9, flip:true, acts:[[0,'stand'],[1.2,'kneelPray',0.8]]}],
      front:()=>fg() },

    { line:'पांडव — भीम, अर्जुन और युधिष्ठिर।', cam:'out', fx:'dust',
      art:()=> `<rect width="540" height="960" fill="url(#skyDawn)"/>`+stars(20,300)+hills(640,30,'#3a2a3a',110)+ground(760),
      cast:[{c:BHIMA, x:110, y:850, s:.85, acts:[[0,'shoulder']], props:{front:'mace'}},
            {c:ARJUNA, x:270, y:860, s:.85, acts:[[0,'stand'],[1,'bowReady']], props:{front:'bow'}},
            {c:YUDHISHTHIRA, x:420, y:850, s:.85, expr:'smile', acts:[[0,'stand'],[0.8,'namaste']]}],
      front:()=>fg() },

    { line:'देवी ने उसे तीन अचूक बाण दिए।', cam:'in', fx:'sparks',
      art:()=> divine(190,420,'gr','#ffd0b0')+`<path d="M0 800 Q270 770 540 800 L540 960 L0 960Z" fill="#1a0a10"/>`,
      cast:[{c:DEVI, x:190, y:850, s:1.0, expr:'serene', acts:[[0,'stand'],[0.6,'give',0.8]], props:{front:'arrows3'}},
            {c:BARBARIK, x:410, y:860, s:.85, flip:true, acts:[[0,'kneelPray'],[1.6,'kneelOffer']]}] },

    { line:'माँ को वचन दिया — "हारने वाले का साथ दूंगा।"', cam:'up', fx:'flies',
      art:()=> nightBase({moon:[440,160,32],gy:770}),
      cast:[{c:MOTHER, x:380, y:850, s:.95, flip:true, talk:true, expr:'sad', acts:[[0,'stand'],[0.5,'bless']]},
            {c:BARBARIK, x:170, y:855, s:.95, acts:[[0,'stand'],[1.0,'pranam',0.9]]}],
      front:()=>fg() },

    { line:'हर हर महादेव!', cam:'in', fx:'stars', tr:'dip', dur:3.4,
      art:()=> `<rect width="540" height="960" fill="url(#skyN)"/>`+stars(80,700)+moon(270,170,30)+hills(700,40,'#1d1d40',140)+ground(800),
      cast:[{c:SHIVA, x:270, y:880, s:1.15, eyes:'closed', aura:'gb', acts:[[0,'bless']], props:{back:'trishul'}}],
      title:{text:'हर हर महादेव', y:300, size:58, delay:0.6} }
  ]
});
