/* Front-rig test: proves facing:'front' through the real engine pipeline.
   Build: node tools/build.js front-rig-test-short-form */
VIDEO({
  title:'Front-facing rig test', format:'short',
  keywords:['बर्बरीक','कृष्ण'],
  shots:[
    { line:'सामने से बर्बरीक — प्रणाम करते हुए।',
      art:()=> nightBase({moon:[420,170,36],gy:760}),
      cast:[{c:BARBARIK, x:270, y:860, s:1.1, facing:'front', acts:[[0,'stand'],[1.0,'namaste',.6]]}] },

    { line:'आशीर्वाद — हाथ ऊँचा उठाकर।',
      art:()=> divine(270,380,'gw'),
      cast:[{c:KRISHNA, x:270, y:860, s:1.1, facing:'front', expr:'serene', acts:[[0,'stand'],[0.8,'bless',.6]]}] },

    { line:'क्रोध में — मुट्ठी ऊँची!',
      art:()=> warSky(470,120)+hills(620,30,'#3a120e',120)+ground(700,'url(#gndW)','#6a2a1a'),
      cast:[{c:BARBARIK, x:270, y:860, s:1.1, facing:'front', expr:'angry', acts:[[0,'stand'],[0.8,'fistUp',.5]]}] },

    { line:'चलते हुए सामने से — पास आता हुआ।',
      art:()=> nightBase({moon:[420,170,36],gy:760}),
      cast:[{c:BARBARIK, x:270, y:860, s:1.1, facing:'front', walk:{from:-50, dur:2.4}, acts:[[0,'stand']]}] },

    { line:'सिर घुमाकर देखता हुआ।',
      art:()=> nightBase({moon:[420,170,36],gy:760}),
      cast:[{c:KRISHNA, x:270, y:860, s:1.1, facing:'front', acts:[[0,'stand'],[0.8,'lookL',.6],[2.2,'lookR',.8]]}] },
  ],
});
