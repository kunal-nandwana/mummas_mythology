/* Front-rig test: proves facing:'front' through the real engine pipeline.
   Build: node tools/build.js front-rig-test-short-form */
VIDEO({
  title:'Front-facing rig test', format:'short',
  keywords:['राम','विष्णु'],
  shots:[
    { line:'राम — सामने से, प्रणाम करते हुए।',
      art:()=> divine(270,380,'gw'),
      cast:[{c:RAMA, x:270, y:900, s:1.25, facing:'front', expr:'serene', acts:[[0,'stand'],[0.8,'namaste',.6]]}] },

    { line:'परशुराम — हाथ में परशु।',
      art:()=> warSky(470,120)+hills(620,30,'#3a120e',120)+ground(700,'url(#gndW)','#6a2a1a'),
      cast:[{c:PARSHURAM, x:270, y:900, s:1.25, facing:'front', props:{front:'parashu'}, acts:[[0,'carry']]}] },

    { line:'विष्णु — चार भुजाएँ।',
      art:()=> divine(270,380,'gw'),
      cast:[{c:VISHNU, x:270, y:900, s:1.25, facing:'front', expr:'serene', acts:[[0,'stand']]}] },

    { line:'हनुमान — गदा के साथ।',
      art:()=> nightBase({moon:[420,170,36],gy:760}),
      cast:[{c:HANUMAN, x:270, y:900, s:1.25, facing:'front', props:{front:'gada'}, with:{holds:{}}, acts:[[0,'shoulder']]}] },

    { line:'रावण — दस सिर।',
      art:()=> warSky(470,120)+hills(620,30,'#3a120e',120)+ground(700,'url(#gndW)','#6a2a1a'),
      cast:[{c:RAVAN_KING, x:270, y:900, s:1.1, facing:'front', expr:'angry', acts:[[0,'rage']]}] },

    { line:'सीता और कृष्ण।',
      art:()=> divine(270,380,'gw'),
      cast:[{c:SITA, x:150, y:900, s:1.1, facing:'front', expr:'serene', acts:[[0,'namaste']]},
            {c:KRISHNA, x:400, y:900, s:1.1, facing:'front', expr:'smile', acts:[[0,'bless']]}] },

    { line:'बर्बरीक — क्रोध।',
      art:()=> warSky(470,120)+hills(620,30,'#3a120e',120)+ground(700,'url(#gndW)','#6a2a1a'),
      cast:[{c:BARBARIK, x:270, y:900, s:1.25, facing:'front', expr:'angry', acts:[[0,'stand'],[0.8,'fistUp',.5]]}] },

    { line:'चलते हुए।',
      art:()=> nightBase({moon:[420,170,36],gy:760}),
      cast:[{c:LAKSHMAN, x:270, y:900, s:1.25, facing:'front', walk:{from:-50, dur:2.4}, props:{front:'bow'}, acts:[[0,'carry']]}] },
  ],
});
