/* Shiva killed Yamraj - short form. Narration lines are the owner's exact words (see my-script.md). */

/* ---- local art helpers ---- */
const lingam=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="0" cy="6" rx="92" ry="20" fill="#6d6a68"/>
  <rect x="-80" y="-26" width="160" height="32" rx="10" fill="#8c8884"/>
  <ellipse cx="0" cy="-26" rx="80" ry="16" fill="#a29e99"/>
  <path d="M-34 -26 L-34 -118 Q0 -148 34 -118 L34 -26 Z" fill="#2b2a31"/>
  <ellipse cx="0" cy="-26" rx="34" ry="8" fill="#1d1c22"/>
  <path d="M-30 -92 H30 M-30 -104 H30 M-30 -116 H30" stroke="#e8e0d0" stroke-width="3" opacity=".85"/>
  </g>`;
const pasha=(x1,y1,x2,y2,col='#a3171d')=>`<g fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round">
  <path d="M${x1} ${y1} Q${(x1+x2)/2} ${Math.min(y1,y2)-70} ${x2} ${y2}"/>
  <ellipse cx="${x2}" cy="${y2}" rx="24" ry="14"/></g>`;
const templeNight=()=>nightBase({moon:[430,170,46],gy:760,hillsY:640})+peepal(100,700,1.2);
const templeDay=()=>`<rect width="540" height="960" fill="url(#skyW)"/>`+clouds()+hills(660,40,'#7a8f5a',40)+ground(760)+peepal(110,700,1.2)+flowers();
const YAMRAJ={skin:'#3d4f6e',top:'#6b0f14',bottom:'#3a0a0d',head:'crown',cape:'#240608',garland:'#e6a817'};
const BOY={tilak:true,head:'none',hair:'long'};

VIDEO({
  title:'महादेव ने यमराज का वध क्यों किया',
  format:'short',
  target:70,
  keywords:['महादेव','यमराज','मार्कंडेय','16','शिवलिंग','काल-पाश','चिरयुवा','कालान्तक'],
  sfx:true,
  music:'flute',
  ending:3.2,
  handheld:.6, captionTop:400, captionChars:24, minShot:2.4, pace:13,
  shots:[
    /* 1 */
    {line:'महादेव ने एक बार यमराज का वध कर दिया था... पर क्यों? सिर्फ़ अपने 16 वर्षीय भक्त को बचाने के लिए!',
     mood:'anger', cam:{keys:[[0,270,520,1],[4,270,470,1.35]]}, fx:'embers',
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,420,'#ff9a3c',1),
     mid:()=>ground(780),
     cast:[
       {c:SHIVA,x:340,y:760,s:1.05,flip:true,expr:'angry',talk:true,acts:[[0,'rage']],props:{front:'trishul'},aura:true},
       {c:DEVA,x:150,y:770,s:.95,expr:'surprise',acts:[[0,'recoil']],with:YAMRAJ}
     ]},
    /* 2 */
    {line:'उस भक्त का नाम था मार्कंडेय। उनके पिता ऋषि मृकंडु को महादेव से यह वरदान मिला था कि उन्हें एक बुद्धिमान और गुणी पुत्र प्राप्त होगा, लेकिन उसकी आयु केवल 16 वर्ष की होगी।',
     mood:'hope', cam:'in', tr:'fade',
     art:templeDay,
     cast:[
       {c:RISHI,x:190,y:770,s:1,expr:'calm',talk:true,acts:[[0,'explain'],[3,'bless']]},
       {c:BRAHMIN,x:370,y:775,s:.62,flip:true,expr:'smile',with:BOY,acts:[[0,'namaste']],enter:{fade:.6,delay:3.5}}
     ]},
    /* 3 */
    {line:'समय के साथ मार्कंडेय महादेव के परम भक्त बन गए।',
     mood:'calm', cam:'in', tr:'fade',
     art:()=>templeDay()+lingam(270,780,1.2),
     cast:[
       {c:BRAHMIN,x:270,y:830,s:.8,expr:'serene',with:BOY,acts:[[0,'kneelPray']],eyes:'closed',aura:true}
     ]},
    /* 4 */
    {line:'और जब वे 16 वर्ष के हुए, तो स्वयं मृत्यु के देवता यमराज उनके प्राण लेने आ पहुँचे।',
     mood:'shock', cam:{keys:[[0,270,560,1],[4,330,520,1.3]]}, tr:'dip', fx:'dust',
     art:()=>templeNight()+lingam(200,790,1.1),
     cast:[
       {c:BRAHMIN,x:200,y:850,s:.75,expr:'sad',with:BOY,acts:[[0,'kneelPray']]},
       {c:DEVA,x:400,y:790,s:1.15,flip:true,expr:'angry',talk:true,with:YAMRAJ,acts:[[0,'point']],walk:{from:140,dur:2.4,delay:.2}}
     ]},
    /* 5 */
    {line:'भयभीत होकर मार्कंडेय शिवलिंग से लिपट गए और महादेव की प्रार्थना करने लगे।',
     mood:'sad', cam:{keys:[[0,270,600,1],[4,270,640,1.7]]}, tr:'cut',
     art:()=>templeNight()+lingam(270,800,1.5),
     cast:[
       {c:BRAHMIN,x:270,y:830,s:.8,expr:'sad',with:BOY,acts:[[0,'kneelBow']],tears:true,eyes:'closed'}
     ]},
    /* 6 */
    {line:'तभी यमराज ने मार्कंडेय के गले में अपना काल-पाश फेंका, जो मार्कंडेय के साथ-साथ शिवलिंग से भी जा लिपटा।',
     mood:'shock', cam:{keys:[[0,300,640,1.1],[2,280,640,1.5,'snap']]}, tr:'whip',
     art:()=>templeNight()+lingam(250,800,1.4),
     cast:[
       {c:BRAHMIN,x:250,y:830,s:.8,expr:'sad',with:BOY,acts:[[0,'kneelBow']],tears:true},
       {c:DEVA,x:450,y:790,s:1.05,flip:true,expr:'angry',with:YAMRAJ,acts:[[0,'point'],[1.2,'accuse']]}
     ],
     front:()=>A('slide:-160:0:0.5:1.2',pasha(440,640,270,680)),
     shake:[1.7,.5,6], sfx:[[1.7,'hit',.5]]},
    /* 7 */
    {line:'यह देखकर महादेव इतने क्रोधित हुए कि वे स्वयं शिवलिंग से प्रकट हुए और यमराज का वध कर दिया।',
     mood:'anger', cam:{keys:[[0,270,620,1],[1.5,270,560,1.3],[5,300,520,1.5]]}, tr:'flash', fx:'sparks',
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,640,'#ff7a1c',1),
     mid:()=>ground(790)+lingam(140,800,.9),
     cast:[
       {c:SHIVA,x:290,y:780,s:1.15,flip:true,expr:'angry',talk:true,acts:[[0,'rage']],props:{front:'trishul'},enter:{fade:.5,delay:.3,rise:60},aura:true},
       {c:DEVA,x:450,y:790,s:1.05,flip:true,expr:'surprise',with:YAMRAJ,acts:[[0,'point'],[2.5,'recoil']],exit:{at:4.5,fade:.8}}
     ],
     shake:[1.6,.6,8], sfx:[[1.6,'boom',.7]]},
    /* 8 */
    {line:'लेकिन यमराज के बिना सृष्टि में मृत्यु का संचालन कौन करता? इसलिए सभी देवताओं ने महादेव से प्रार्थना की।',
     mood:'sad', cam:'out', tr:'dip',
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,300,'#ffd27a',1),
     mid:()=>ground(790),
     cast:[
       {c:SHIVA,x:270,y:780,s:1.05,expr:'calm',acts:[[0,'stand']],props:{front:'trishul'}},
       {c:INDRA,x:110,y:800,s:.8,expr:'sad',talk:true,acts:[[0,'plead'],[3,'kneelPray']]},
       {c:DEVA,x:440,y:805,s:.75,flip:true,expr:'sad',acts:[[0,'kneelPray']]}
     ]},
    /* 9 */
    {line:'तब महादेव ने यमराज को पुनः जीवित कर दिया और अपने भक्त मार्कंडेय को चिरयुवा, यानी अमर यौवन का आशीर्वाद दिया।',
     mood:'divine', cam:'in', tr:'glow', fx:'petals',
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,420,'#ffe9a8',1),
     mid:()=>ground(790)+lingam(80,800,.7),
     cast:[
       {c:SHIVA,x:290,y:780,s:1.1,flip:true,expr:'smile',acts:[[0,'bless']],aura:true},
       {c:DEVA,x:120,y:790,s:.95,expr:'calm',with:YAMRAJ,acts:[[0,'namaste']],enter:{fade:.8,delay:.4,rise:40}},
       {c:BRAHMIN,x:430,y:800,s:.75,flip:true,expr:'smile',with:BOY,acts:[[0,'kneelPray'],[3,'namaste']],aura:true,enter:{fade:.6,delay:3}}
     ]},
    /* 10 */
    {line:'ब्रह्म पुराण के अध्याय 35, श्लोक 11 में महादेव की इसी रूप में स्तुति की गई है: "नमः कालान्तकायाथ नमो मन्दरवासिने। हिरण्यकवचायैव नमः केयूरधारिणे॥"',
     mood:'divine', cam:'still', tr:'fade', capTop:640,
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,300,'#ffd27a',1),
     calli:{lines:['नमः कालान्तकायाथ','नमो मन्दरवासिने।','हिरण्यकवचायैव','नमः केयूरधारिणे॥'],source:'ब्रह्म पुराण 35.11',y:230,size:42,col:'#ffe9a8',delay:.4,gap:70,write:6,hold:3,glow:true,scrim:true}},
    /* 11 */
    {line:"यहाँ 'कालान्तक' का अर्थ है—स्वयं काल यानी मृत्यु का विनाश करने वाले! -",
     mood:'divine', cam:{keys:[[0,270,520,1],[5,270,470,1.4]]}, tr:'glow',
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,420,'#ffb347',1),
     mid:()=>ground(790),
     title:{text:'कालान्तक',y:210,size:92,color:'#ffe9a8',delay:.3},
     cast:[
       {c:SHIVA,x:270,y:790,s:1.2,expr:'serene',talk:true,acts:[[0,'stand']],props:{front:'trishul'},aura:true}
     ]}
  ]
});
