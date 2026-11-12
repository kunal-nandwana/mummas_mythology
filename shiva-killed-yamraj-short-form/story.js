/* Shiva killed Yamraj - short form (v2: scarier Yamraj, living scenes, real hug). Narration lines are the owner's exact words (see my-script.md). */

/* ---- local art helpers ---- */
const lingam=(x,y,s=1,glow)=>`<g transform="translate(${x},${y}) scale(${s})">
  ${glow?A('pulse:2.2',`<circle cx="0" cy="-80" r="170" fill="url(#${glow})"/>`):''}
  <ellipse cx="0" cy="6" rx="92" ry="20" fill="#6d6a68"/>
  <rect x="-80" y="-26" width="160" height="32" rx="10" fill="#8c8884"/>
  <ellipse cx="0" cy="-26" rx="80" ry="16" fill="#a29e99"/>
  <path d="M-34 -26 L-34 -118 Q0 -148 34 -118 L34 -26 Z" fill="#2b2a31"/>
  <path d="M-34 -26 L-34 -118 Q-20 -130 -14 -126 L-14 -26Z" fill="#fff" opacity=".07"/>
  <ellipse cx="0" cy="-26" rx="34" ry="8" fill="#1d1c22"/>
  <path d="M-30 -92 H30 M-30 -104 H30 M-30 -116 H30" stroke="#e8e0d0" stroke-width="3" opacity=".85"/>
  <path d="M-78 -26 Q-40 -8 0 -6 Q40 -8 78 -26" stroke="#ff9a2a" stroke-width="5" fill="none" stroke-dasharray="1 7" stroke-linecap="round"/>
  </g>`;
const flameDiya=(x,y)=>`<g transform="translate(${x} ${y})">${A('flick:7','<circle cy="-14" r="40" fill="url(#saf)"/>')}<path d="M-12 0 Q0 11 12 0 L9 -6 L-9 -6Z" fill="#a8582a"/>${A('flick:9','<path d="M3 -6 Q8 -18 2 -26 Q-2 -16 3 -6Z" fill="#ffd27a"/>')}</g>`;
const pasha=(x1,y1,x2,y2,col='#a3171d')=>`<g fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round">
  <path d="M${x1} ${y1} Q${(x1+x2)/2} ${Math.min(y1,y2)-70} ${x2} ${y2}"/>
  <ellipse cx="${x2}" cy="${y2}" rx="24" ry="14"/></g>`;
const templeNight=()=>nightBase({moon:[430,170,46],gy:760,hillsY:640})+peepal(100,700,1.2);
const templeDay=()=>`<rect width="540" height="960" fill="url(#skyW)"/>`+clouds()+hills(660,40,'#7a8f5a',40)+ground(760)+peepal(110,700,1.2)+flowers();

/* Yamraj: huge, near-black blue skin, blood-red robes, crown, red aura, mace in hand */
const YAMRAJ={skin:'#222a44',top:'#4a0a10',bottom:'#16080c',head:'big',beard:'black',mus:true,big:true,cape:'#12040a',garland:'#d4a017',aura:'gr',sleeve:'#5a0d14'};
const YAM_CALM={aura:'gw',skin:'#3d4f6e'};
const BOY={tilak:true,head:'none',hair:'long'};
/* Markandeya hugging the lingam: kneels, leans in, both arms wrapped forward round the shaft */
const HUG={f:[88,92],k:[2,92],drop:72,kt:160,lean:30,head:-6,a:[122,34],b:[116,40],hand:'fist',handB:'fist'};
const HUG2={f:[88,92],k:[2,92],drop:72,kt:160,lean:34,head:-14,a:[128,28],b:[120,34],hand:'fist',handB:'fist'};

/* glowing red eyes over a character's head (x,y,s as in cast; flip = faces left) */
const redEyes=(x,y,s,flip)=>A('pulse:3',`<circle cx="${x+(flip?-1:1)*17*s}" cy="${y-270*s}" r="${14*s}" fill="url(#gr)"/>`);
/* giant Yamraj shadow looming on the wall */
const bigShadow=(x,y,s,flip)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})" opacity=".92">
  <path d="M-110 0 L-84 -250 Q-70 -330 -26 -346 L-30 -372 Q-58 -380 -66 -420 Q-70 -470 -44 -520 Q-44 -460 -22 -430 L22 -430 Q44 -460 44 -520 Q70 -470 66 -420 Q58 -380 30 -372 L26 -346 Q70 -330 84 -250 L110 0Z" fill="#04020a"/>
  <path d="M84 -250 L170 -330 L176 -300 L100 -200Z" fill="#04020a"/>
  ${A('pulse:2.5',`<circle cx="-12" cy="-396" r="11" fill="url(#gr)"/><circle cx="14" cy="-396" r="11" fill="url(#gr)"/>`)}
  <circle cx="-12" cy="-396" r="3.5" fill="#ff4a3a"/><circle cx="14" cy="-396" r="3.5" fill="#ff4a3a"/></g>`;
/* Yamraj's buffalo (Mahisha) silhouette with burning eyes */
const buffalo=(x,y,s,flip)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})" fill="#06030a">
  <ellipse cx="0" cy="-92" rx="112" ry="58"/><rect x="-92" y="-62" width="22" height="64"/><rect x="-52" y="-62" width="22" height="64"/><rect x="48" y="-62" width="22" height="64"/><rect x="86" y="-62" width="22" height="64"/>
  <path d="M90 -128 Q150 -160 176 -92 Q182 -46 152 -38 L120 -52 Q100 -70 90 -72Z"/>
  <path d="M118 -142 Q92 -196 140 -204 Q120 -172 142 -140Z"/><path d="M152 -134 Q184 -192 222 -170 Q188 -166 170 -128Z"/>
  <path d="M-108 -110 Q-150 -90 -140 -30" stroke="#06030a" stroke-width="7" fill="none"/>
  ${A('pulse:3.4',`<circle cx="152" cy="-100" r="22" fill="url(#gr)"/>`)}<circle cx="152" cy="-100" r="4.5" fill="#ff4a3a"/></g>`;
const bolt=(x,y,s,sp)=>A('flick:'+sp,`<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 L-18 70 L2 66 L-26 150 L30 52 L8 56 L26 0Z" fill="#f4f0ff" opacity=".9" style="filter:drop-shadow(0 0 10px #b8a8ff)"/>`);
const stormFlash=()=>A('flick:13',`<rect width="540" height="960" fill="#c8b8ff" opacity=".07"/>`);
/* Kailash peaks */
const kailash=(y,col1,col2)=>`<path d="M-20 ${y} L90 ${y-210} L150 ${y-140} L250 ${y-330} L350 ${y-170} L420 ${y-250} L560 ${y}Z" fill="${col1||'#26224a'}"/>`+
  `<path d="M250 ${y-330} L214 ${y-262} L240 ${y-276} L258 ${y-250} L284 ${y-282} L310 ${y-250}Z M90 ${y-210} L60 ${y-150} L90 ${y-166} L116 ${y-144}Z M420 ${y-250} L392 ${y-190} L420 ${y-204} L448 ${y-182}Z" fill="${col2||'#e8e4ff'}" opacity=".75"/>`;
const hut=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-70" y="-90" width="140" height="90" fill="#6a4426"/><rect x="-18" y="-60" width="36" height="60" fill="#1e1008"/><path d="M-92 -86 L0 -176 L92 -86Z" fill="#a8803a"/><path d="M-92 -86 L0 -176 L0 -86Z" fill="#000" opacity=".15"/>${flameDiya(-48,-16)}</g>`;
const cloudPuff=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="#f6e6d0" opacity=".9"><circle cx="-40" cy="0" r="28"/><circle cx="0" cy="-12" r="36"/><circle cx="42" cy="2" r="26"/><circle cx="8" cy="10" r="30"/></g>`;
/* souls circling the Earth, waiting */
const souls=(cx,cy)=>earth(cx,cy,46)+[0,1,2,3,4,5].map(i=>A(`orbit:${80+i*12}:${22+i*5}:${cx}:${cy}:${5+i*1.3}`,`<circle r="6" fill="#bff0ff"/><circle r="16" fill="url(#gw)" opacity=".6"/>`)).join('');
const flyTrishul=(t0,x,y,dx)=>A(`fadeout:5.0:.7`,A(`slide:${dx}:0:.4:${t0}`,`<g transform="translate(${x} ${y}) rotate(90) scale(.8)"><line x1="0" y1="-190" x2="0" y2="150" stroke="#cfc8b4" stroke-width="7"/><path d="M-22 -200 Q-22 -170 0 -168 Q22 -170 22 -200 M0 -168 L0 -232" stroke="#ece6d2" stroke-width="7" fill="none"/><circle cy="-100" r="60" fill="url(#gw)"/></g>`));
/* wheel of Time (Kaal) that shatters when Shiva is shown as Kaalaantak */
const kaalChakra=(cx,cy,r)=>{ let t=''; for(let i=0;i<12;i++) t+=`<rect x="-3" y="${-r+6}" width="6" height="${i%3?12:22}" transform="rotate(${i*30})" fill="#d9a73a"/>`;
  return A('fadeout:2.6:.5',A(`spin:30:${cx}:${cy}`,`<g transform="translate(${cx} ${cy})"><circle r="${r+30}" fill="url(#gr)" opacity=".5"/><circle r="${r}" fill="#160a18" stroke="#a8742a" stroke-width="5"/><circle r="${r-18}" fill="none" stroke="#6a3a2a" stroke-width="2"/>${t}<path d="M0 0 L0 ${-r+40}" stroke="#d9a73a" stroke-width="5" stroke-linecap="round"/><path d="M0 0 L${r*.5} 0" stroke="#d9a73a" stroke-width="7" stroke-linecap="round"/><circle r="9" fill="#d9a73a"/><path d="M${-r*.6} ${-r*.5} L-8 -6 L${r*.3} ${r*.7}" stroke="#ff6a3a" stroke-width="3" fill="none"/></g>`))
   +A('pop:2.6',A('fadeout:3.5:.9',`<circle cx="${cx}" cy="${cy}" r="${r+90}" fill="url(#gw)"/>`)); };


/* ---- v3 helpers: atmosphere + the killing blow + shloka frame ---- */
const temple=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${col||'#1e1a46'}"><rect x="-130" y="-56" width="260" height="56"/><rect x="-98" y="-132" width="196" height="78"/><path d="M-86 -132 Q-64 -204 -42 -256 Q0 -340 42 -256 Q64 -204 86 -132Z"/><path d="M-64 -204 H64 M-76 -168 H76" stroke="#3a3470" stroke-width="3" fill="none"/><rect x="-2" y="-372" width="4" height="40"/><path d="M2 -372 L24 -366 L2 -358Z" fill="#a8432a"/><path d="M-28 0 L-28 -48 Q0 -82 28 -48 L28 0Z" fill="#0b0818"/>${A('flick:4','<circle cx="0" cy="-26" r="22" fill="url(#saf)"/>')}${A('rock:14:1.5:0:-96','<path d="M-8 -96 h16 l-2 16 h-12Z" fill="#d9a73a"/>')}</g>`;
const mist=(y,op)=>[0,1,2,3].map(i=>A(`orbit:${70+i*25}:${6+i*3}:${60+i*150}:${y+i*12}:${18+i*5}`,`<circle r="${100+i*10}" fill="#aab0e0" opacity="${op||.09}" filter="url(#b24)"/>`)).join('');
const godRays=(x)=>A('pulse:.9',[0,1,2,3,4].map(i=>`<path d="M${x+i*26} -20 L${x+i*26+90+i*40} 800 L${x+i*26+40+i*40} 800Z" fill="#ffe9a8" opacity=".09"/>`).join(''));
/* the killing blow: trishul cocked, then thrust through Yamraj; shock rings, rays, soul-light rising */
const thrustTrishul=(t0,x,y,dx)=>{ const body=`<g transform="rotate(-90) scale(1.1)"><line x1="0" y1="-190" x2="0" y2="150" stroke="#d9d2c0" stroke-width="11"/><path d="M-22 -200 Q-22 -170 0 -168 Q22 -170 22 -200 M0 -168 L0 -232" stroke="#fff6dc" stroke-width="10" fill="none"/><path d="M-26 -198 l4 -16 l4 16Z M22 -198 l4 -16 l4 16Z M-4 -230 l4 -18 l4 18Z" fill="#f3ecd6"/></g>`;
  return A(`fadeout:${t0}:.05`,`<g transform="translate(${x+dx} ${y})">${body}</g>`)+
         A(`fadeout:3.6:.8`,A(`slide:${dx}:0:.16:${t0}`,`<g transform="translate(${x} ${y})"><circle cx="-190" r="70" fill="url(#gw)"/>${body}</g>`)); };
const impact=(t0,x,y)=>{ let r=''; for(let i=0;i<14;i++) r+=`<path d="M${x} ${y} L${x+24} ${y-300} L${x-24} ${y-300}Z" transform="rotate(${i*25.7} ${x} ${y})" fill="#ffe2a0" opacity=".25"/>`;
  return A(`pop:${t0}`,A(`fadeout:${t0+.5}:.9`,`<circle cx="${x}" cy="${y}" r="190" fill="url(#gw)"/>${r}<circle cx="${x}" cy="${y}" r="42" fill="#fff"/>`))+
    [70,120,180,250].map((rr,i)=>A(`pop:${(t0+i*.12).toFixed(2)}`,A(`fadeout:${(t0+.5+i*.12).toFixed(2)}:.8`,`<circle cx="${x}" cy="${y}" r="${rr}" fill="none" stroke="#ffd27a" stroke-width="${5-i}"/>`))).join('')+
    [0,1,2,3,4,5,6].map(i=>A(`rise:${220+i*20}:2.4:${(t0+.3).toFixed(2)}`,A(`fadeout:${(t0+2.4).toFixed(2)}:.8`,`<circle cx="${x-60+i*20}" cy="${y-120-(i%3)*50}" r="${5+(i%3)*2}" fill="#d8f4ff"/><circle cx="${x-60+i*20}" cy="${y-120-(i%3)*50}" r="20" fill="url(#gw)" opacity=".6"/>`))).join(''); };
/* ornate golden frame for the shloka */
const shlokaFrame=(x,y,w,h)=>{ const lotus=(cx,cy)=>`<g transform="translate(${cx} ${cy})">${[-60,-30,0,30,60].map(r=>`<ellipse rx="5" ry="15" transform="rotate(${r}) translate(0 -14)" fill="url(#gold)"/>`).join('')}<circle r="5" fill="#d63a2a"/></g>`;
  return A('fadein:0:.8',`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="22" fill="#14081c" opacity=".55"/><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="22" fill="none" stroke="url(#gold)" stroke-width="4"/><rect x="${x-w/2+10}" y="${y-h/2+10}" width="${w-20}" height="${h-20}" rx="16" fill="none" stroke="#e8b83a" stroke-width="1.5" stroke-dasharray="3 6"/>`+lotus(x-w/2,y-h/2)+lotus(x+w/2,y-h/2)+lotus(x-w/2,y+h/2)+lotus(x+w/2,y+h/2)+lotus(x,y-h/2)+lotus(x,y+h/2)); };

VIDEO({
  title:'महादेव ने यमराज का वध क्यों किया',
  format:'short',
  target:70,
  keywords:['महादेव','यमराज','मार्कंडेय','16','शिवलिंग','काल-पाश','चिरयुवा','कालान्तक'],
  sfx:true,
  music:'flute',
  ending:3.2,
  handheld:.9, captionTop:400, captionChars:24, minShot:2.4, pace:13,
  shots:[
    /* 1: the killing blow. Yamraj raises his mace, Shiva hurls the trishul through him */
    {line:'महादेव ने एक बार यमराज का वध कर दिया था... पर क्यों? सिर्फ़ अपने 16 वर्षीय भक्त को बचाने के लिए!',
     mood:'anger', fx:'embers', cam:{keys:[[0,300,640,1.0],[1.0,320,560,1.15],[1.55,260,550,1.3,'snap'],[2.1,240,550,1.42],[3.2,250,590,1.2],[5,320,580,1.12],[6.3,330,570,1.05]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+divine(270,430,'#ff5a1c',1)+stormFlash(),
     far:()=>kailash(780,'#2a0f1c','#ff9a7a')+bolt(70,60,1.4,6)+bolt(450,90,1.1,8)+mist(760,.12),
     mid:()=>ground(780,'url(#gndW)','#a8432a')+buffalo(40,780,.9,false),
     art:()=>A('fadeout:1.7:.3',bigShadow(110,800,1.9,false))+impact(1.65,190,520),
     cast:[
       {c:SHIVA,x:395,y:770,s:1.3,flip:true,expr:'angry',talk:true,acts:[[0,'rage'],[1.2,{a:[96,6],b:[60,90],lean:16,head:6,hand:'fist'}],[1.5,{a:[100,0],b:[-30,40],lean:20,hand:'fist',head:4}],[3.2,'rage']],aura:'gr'},
       {c:DEVA,x:150,y:775,s:1.35,expr:'angry',with:YAMRAJ,props:{front:'mace'},acts:[[0,'carry'],[0.9,'armUp'],[1.7,{a:[20,70],b:[40,80],lean:-30,head:22,hand:'open'}],[2.6,{a:[10,60],b:[-20,50],lean:-42,drop:34,head:26,hand:'open'}]],exit:{at:3.3,fade:1.1}}
     ],
     front:()=>A('fadeout:1.7:.2',redEyes(150,775,1.35,false))+thrustTrishul(1.45,445,520,95),
     shake:[1.65,1.0,13], sfx:[[1.65,'boom',.8],[1.7,'hit',.6]]},
    /* 2: Mrikandu's tapasya; Shiva appears and grants the boon (16 years) */
    {line:'उस भक्त का नाम था मार्कंडेय। उनके पिता ऋषि मृकंडु को महादेव से यह वरदान मिला था कि उन्हें एक बुद्धिमान और गुणी पुत्र प्राप्त होगा, लेकिन उसकी आयु केवल 16 वर्ष की होगी।',
     mood:'hope', tr:'fade', fx:'petals', cam:{keys:[[0,200,700,1.25],[4,300,600,1.1],[7,360,640,1.25],[10.8,300,700,1.05]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyW)"/>`+clouds()+A('pulse:1.2',`<circle cx="400" cy="400" r="190" fill="url(#gw)" opacity=".5"/>`),
     far:()=>hills(660,40,'#6a7f4a',40),
     mid:()=>ground(770,'url(#gnd)','#7a8f5a')+peepal(70,720,1.1)+hut(450,770,1.0),
     art:()=>A('bob:6:.25',cloudPuff(390,560,1.1))+flowers(780,16),
     cast:[
       {c:RISHI,x:200,y:785,s:.95,expr:'serene',talk:true,acts:[[0,'kneelPray'],[6,'kneelOffer'],[8,'explain']],eyes:'closed'},
       {c:SHIVA,x:395,y:560,s:.62,flip:true,expr:'smile',acts:[[0,'bless']],enter:{fade:1.2,delay:1.4,rise:30},exit:{at:6.4,fade:1},aura:'gw'},
       {c:BRAHMIN,x:380,y:790,s:.55,flip:true,expr:'smile',with:BOY,acts:[[0,'namaste']],enter:{fade:.8,delay:7.6,rise:20},aura:'gw'}
     ],
     title:{text:'16',y:230,size:96,color:'#ffe9a8',delay:8.4}},
    /* 3: years pass; the boy grows into a deep devotee (sun crosses, offerings) */
    {line:'समय के साथ मार्कंडेय महादेव के परम भक्त बन गए।',
     mood:'calm', tr:'fade', fx:'petals', cam:{keys:[[0,200,760,1.35],[3.3,330,720,1.1]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDawn)"/>`+A('orbit:260:230:270:500:7',`<circle r="52" fill="url(#gw)"/><circle r="26" fill="#ffd98a"/>`),
     far:()=>hills(660,40,'#6a7f4a',40)+godRays(20)+temple(430,700,.8,'#7a5a4a'),
     mid:()=>ground(770,'url(#gnd)','#7a8f5a')+peepal(70,720,1.1)+mist(740,.07),
     art:()=>flowers(780,14)+lingam(380,800,1.25,'gw')+flameDiya(270,812)+flameDiya(490,812),
     cast:[
       {c:BRAHMIN,x:210,y:830,s:.8,expr:'serene',with:BOY,acts:[[0,'kneelOffer'],[1.4,'kneelPray'],[2.6,'kneelBow']],aura:'gw'}
     ]},
    /* 4: night; Yamraj thunders in with his buffalo and a giant shadow */
    {line:'और जब वे 16 वर्ष के हुए, तो स्वयं मृत्यु के देवता यमराज उनके प्राण लेने आ पहुँचे।',
     mood:'shock', tr:'dip', fx:'dust', cam:{keys:[[0,200,650,1.15],[2.2,300,640,1.0],[4,430,470,1.45,'snap'],[5.5,430,470,1.6]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(60,500)+stormFlash(),
     far:()=>hills(640,40,'#1d1d40',140)+temple(110,690,1.0)+bolt(120,40,1.5,7)+bolt(470,20,1.2,5)+mist(740,.1),
     mid:()=>ground(790,'url(#gnd)','#4a3e5a')+A('walk:200:2.6:.2',buffalo(520,790,.9,true)),
     art:()=>A('fadein:1.2:1.5',bigShadow(190,800,1.7,false))+lingam(290,795,1.15,'gw'),
     cast:[
       {c:BRAHMIN,x:140,y:830,s:.78,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3.3,'kneelPray+recoil']],eyes:'closed',aura:'gw'},
       {c:DEVA,x:450,y:795,s:1.5,flip:true,expr:'angry',with:YAMRAJ,props:{front:'mace'},acts:[[0,'carry'],[3.2,'accuse']],walk:{from:200,dur:2.6,delay:.2}}
     ],
     front:()=>A('fadein:2.8:.5',redEyes(450,795,1.5,true)), shake:[2.7,.6,6], sfx:[[2.8,'boom',.5]]},
    /* 5: terrified, Markandeya clings to the Shivling (a real hug) */
    {line:'भयभीत होकर मार्कंडेय शिवलिंग से लिपट गए और महादेव की प्रार्थना करने लगे।',
     mood:'sad', tr:'cut', cam:{keys:[[0,420,640,1.1],[1.2,300,690,1.4,'snap'],[4.8,300,700,1.9]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(60,500)+stormFlash(),
     far:()=>hills(640,40,'#1d1d40',140)+temple(120,690,1.0)+bolt(60,30,1.3,7)+mist(740,.1),
     mid:()=>ground(790,'url(#gnd)','#4a3e5a'),
     art:()=>A('rise:40:1.5:.2',bigShadow(500,820,1.9,true))+lingam(330,800,1.15,'gw'),
     cast:[
       {c:BRAHMIN,x:232,y:828,s:.8,expr:'sad',with:BOY,acts:[[0,'kneelBow'],[1.1,HUG],[3.4,HUG2]],tears:true,aura:'gw'}
     ]},
    /* 6: Yamraj throws the Kaal-Pasha; it loops round both boy and Shivling */
    {line:'तभी यमराज ने मार्कंडेय के गले में अपना काल-पाश फेंका, जो मार्कंडेय के साथ-साथ शिवलिंग से भी जा लिपटा।',
     mood:'shock', tr:'whip', fx:'dust', cam:{keys:[[0,420,620,1.0],[1.4,460,640,1.4],[2.2,320,690,1.6,'snap'],[6.5,320,690,1.9]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(60,500)+stormFlash(),
     far:()=>hills(640,40,'#1d1d40',140)+temple(120,690,1.0)+bolt(80,30,1.3,6)+mist(740,.1),
     mid:()=>ground(790,'url(#gnd)','#4a3e5a')+buffalo(540,790,.8,true),
     art:()=>lingam(330,800,1.15,'gr'),
     cast:[
       {c:BRAHMIN,x:232,y:828,s:.8,expr:'sad',with:BOY,acts:[[0,HUG2],[2.2,'kneelBow']],tears:true,aura:'gw'},
       {c:DEVA,x:480,y:795,s:1.35,flip:true,expr:'angry',with:YAMRAJ,acts:[[0,'carry'],[1.0,'accuse'],[1.6,{a:[150,10],b:[-10,30],lean:14,hand:'open'}],[2.8,'accuse']]}
     ],
     front:()=>redEyes(480,795,1.35,true)+
       A('slide:-190:0:.35:1.5',`<path d="M420 640 Q360 600 300 650" stroke="#c0141c" stroke-width="7" fill="none" stroke-linecap="round" style="filter:drop-shadow(0 0 6px #ff2a2a)"/>`)+
       A('pop:1.85',A('pulse:5',`<g fill="none" stroke="#d01822" stroke-width="9" style="filter:drop-shadow(0 0 8px #ff3a2a)"><ellipse cx="318" cy="680" rx="104" ry="52" transform="rotate(-12 318 680)"/><ellipse cx="318" cy="690" rx="98" ry="46" transform="rotate(-12 318 690)" stroke-width="4"/></g>`)),
     shake:[1.8,.6,8], sfx:[[1.9,'hit',.5]]},
    /* 7: the Shivling bursts open, Mahadev emerges and strikes Yamraj down */
    {line:'यह देखकर महादेव इतने क्रोधित हुए कि वे स्वयं शिवलिंग से प्रकट हुए और यमराज का वध कर दिया।',
     mood:'anger', tr:'flash', fx:'sparks', cam:{keys:[[0,320,700,1.3],[1.6,310,620,1.0],[3.4,340,600,1.05],[4.2,400,620,1.25,'snap'],[6,370,600,1.1]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+divine(320,640,'#ff6a1c',1)+stormFlash(),
     far:()=>hills(640,40,'#2a0f1c',140),
     mid:()=>ground(790,'url(#gndW)','#a8432a'),
     art:()=>lingam(320,800,1.15,'saf')+A('pop:.2',A('fadeout:1.4:1.4',`<circle cx="320" cy="680" r="240" fill="url(#gw)"/>`))+A('pulse:6',`<path d="M320 660 L320 140" stroke="#ffe9a8" stroke-width="10" opacity=".25" filter="url(#b10)"/>`),
     cast:[
       {c:BRAHMIN,x:130,y:830,s:.7,expr:'sad',with:BOY,acts:[[0,'kneelPray'],[2,'kneelBow']],tears:true,aura:'gw'},
       {c:SHIVA,x:300,y:775,s:1.3,expr:'angry',talk:true,acts:[[0,'stand'],[1.2,'rage'],[3.0,{a:[100,0],b:[-30,40],lean:10,hand:'open',head:6}],[4,'rage']],enter:{fade:.7,delay:.3,rise:160},aura:'gr'},
       {c:DEVA,x:465,y:795,s:1.3,flip:true,expr:'surprise',with:YAMRAJ,acts:[[0,'carry'],[2.2,'recoil'],[3.8,{a:[10,60],b:[-20,50],lean:-30,head:20,hand:'open'}]],exit:{at:4.4,fade:.8}}
     ],
     front:()=>flyTrishul(3.1,430,620,-300)+
       A('pop:3.7',A('fadeout:4.2:.8',`<circle cx="430" cy="640" r="150" fill="url(#gw)"/><circle cx="430" cy="640" r="30" fill="#fff"/>`)),
     shake:[3.7,.9,12], sfx:[[.4,'boom',.7],[3.7,'hit',.7]]},
    /* 8: who will run death? Souls wait around Earth; devas beg Mahadev */
    {line:'लेकिन यमराज के बिना सृष्टि में मृत्यु का संचालन कौन करता? इसलिए सभी देवताओं ने महादेव से प्रार्थना की।',
     mood:'sad', tr:'dip', cam:{keys:[[0,270,260,1.6],[2.6,270,330,1.4],[3.6,270,560,1.0],[6.6,270,580,1.12]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+stars(70,480)+divine(270,520,'#ffd27a',1),
     far:()=>A('bob:5:.15',souls(270,240))+kailash(790,'#15122e','#9a96c0'),
     mid:()=>ground(790,'url(#gnd)','#6a5e8a')+mist(770,.1),
     cast:[
       {c:SHIVA,x:290,y:780,s:1.15,expr:'calm',acts:[[0,'lookAway'],[5,'relax']],props:{front:'trishul'},aura:'gb'},
       {c:INDRA,x:110,y:800,s:.82,expr:'sad',talk:true,acts:[[0,'stand'],[3.2,'plead'],[4.6,'kneelPray']],enter:{fade:.7,delay:3.2,rise:20}},
       {c:DEVA,x:45,y:810,s:.7,expr:'sad',acts:[[0,'kneelPray']],with:{top:'#2a7a5a'},enter:{fade:.7,delay:3.8}},
       {c:DEVA,x:470,y:805,s:.8,flip:true,expr:'sad',acts:[[0,'kneelPray']],enter:{fade:.7,delay:4.0}},
       {c:DEVA,x:420,y:815,s:.68,flip:true,expr:'sad',acts:[[0,'kneelBow']],with:{top:'#8a2a6a'},enter:{fade:.7,delay:4.4}}
     ]},
    /* 9: Yamraj revived, Markandeya blessed with eternal youth */
    {line:'तब महादेव ने यमराज को पुनः जीवित कर दिया और अपने भक्त मार्कंडेय को चिरयुवा, यानी अमर यौवन का आशीर्वाद दिया।',
     mood:'divine', tr:'glow', fx:'petals', cam:{keys:[[0,270,560,1.0],[2,170,640,1.25],[4.2,330,600,1.1],[5.5,430,640,1.55],[7,430,640,1.7]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(280,420,'#ffe9a8',1),
     far:()=>kailash(790,'#2c2656','#fff2d0')+godRays(300),
     mid:()=>ground(790,'url(#gnd)','#9a8aba')+lingam(60,800,.7,'gw')+mist(770,.08),
     art:()=>[[110,700],[180,640],[430,720],[470,660],[390,600]].map(([x,y],i)=>A('flick:'+(2+i*.4),sparkle(x,y,1.2+i*.1))).join('')+
        A('pop:5',A('pulse:2',`<circle cx="430" cy="640" r="130" fill="url(#gw)" opacity=".7"/>`)),
     cast:[
       {c:SHIVA,x:290,y:780,s:1.15,expr:'smile',acts:[[0,'bless'],[4,'give'],[5.2,'bless']],aura:'gw'},
       {c:DEVA,x:120,y:790,s:1.1,expr:'calm',with:Object.assign({},YAMRAJ,YAM_CALM),acts:[[0,'kneel'],[1.6,'stand'],[3,'pranam']],enter:{fade:1.4,delay:.2,rise:90},aura:'gw'},
       {c:BRAHMIN,x:440,y:805,s:.8,flip:true,expr:'smile',with:BOY,acts:[[0,'kneelPray'],[4.4,'namaste']],aura:'gw'}
     ]},
    /* 10a: the source: Brahma Purana manuscript */
    {line:'ब्रह्म पुराण के अध्याय 35, श्लोक 11 में महादेव की इसी रूप में स्तुति की गई है:',
     mood:'divine', tr:'fade', capTop:660, fx:'petals', cam:{keys:[[0,270,560,1.0],[4,270,520,1.18]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+stars(80,500)+divine(270,470,'#ffd27a',1),
     far:()=>kailash(800,'#2c2656','#fff2d0')+mist(780,.1),
     mid:()=>ground(850,'url(#gnd)','#9a8aba')+flameDiya(120,900)+flameDiya(420,900),
     art:()=>big(270,230,72,'#ffe9a8','ब्रह्म पुराण',0.3)+big(270,300,38,'#f1c04e','अध्याय 35  ·  श्लोक 11',1.0)+
        A('bob:6:.25',A('pulse:1.4','<circle cx="270" cy="500" r="190" fill="url(#gw)" opacity=".6"/>')+A('rise:60:1.2:.2',pothi(270,500,1.45)))+
        [[90,420],[450,440],[110,610],[440,600]].map(([x,y],k)=>A('flick:'+(2+k*.5),sparkle(x,y,1.3))).join('')},
    /* 10b: the shloka itself, written line by line inside a golden frame */
    {line:'"नमः कालान्तकायाथ नमो मन्दरवासिने। हिरण्यकवचायैव नमः केयूरधारिणे॥"',
     mood:'divine', tr:'glow', nocap:true, fx:'petals', dur:9, cam:{keys:[[0,270,470,1.0],[8,270,500,1.1]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+stars(80,500)+divine(270,330,'#ffd27a',1),
     far:()=>kailash(820,'#2c2656','#fff2d0')+mist(790,.1),
     mid:()=>ground(850,'url(#gnd)','#9a8aba')+flameDiya(70,905)+flameDiya(470,905)+godRays(120),
     art:()=>shlokaFrame(270,330,480,420),
     cast:[
       {c:SHIVA,x:270,y:930,s:.95,expr:'serene',eyes:'closed',acts:[[0,'namaste']],aura:'gw'}
     ],
     calli:{lines:['नमः कालान्तकायाथ','नमो मन्दरवासिने।','हिरण्यकवचायैव','नमः केयूरधारिणे॥'],source:'ब्रह्म पुराण 35.11',y:230,size:42,col:'#ffe9a8',delay:.6,gap:1.6,write:1.3,hold:0,glow:true,scrim:false}},
    /* 11: Kaalaantak: Shiva stands before the wheel of Time as it shatters */
    {line:"यहाँ 'कालान्तक' का अर्थ है—स्वयं काल यानी मृत्यु का विनाश करने वाले! -",
     mood:'divine', tr:'glow', cam:{keys:[[0,270,560,1.0],[2.4,270,520,1.2],[4.4,270,470,1.4]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,520,'#ffb347',1),
     far:()=>kaalChakra(270,520,200),
     mid:()=>ground(790,'url(#gnd)','#9a8aba'),
     title:{text:'कालान्तक',y:210,size:92,color:'#ffe9a8',delay:.3},
     cast:[
       {c:SHIVA,x:270,y:790,s:1.2,expr:'serene',talk:true,acts:[[0,'stand'],[2.6,'bless']],props:{front:'trishul'},aura:'gw'}
     ]}
  ]
});
