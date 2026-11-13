/* Mahakal origin (Ujjain) - short form. Narration lines are the owner's exact words (see my-script.md; long paragraphs split over shots).
   Build: node tools/build.js mahakal-origin-short-form
   Characters: Shiva, Vedpriya (+ sons), the giant demon Dushan. */

/* ---- local art helpers ---- */
const flameDiya=(x,y)=>`<g transform="translate(${x} ${y})">${A('flick:7','<circle cy="-14" r="40" fill="url(#saf)"/>')}<path d="M-12 0 Q0 11 12 0 L9 -6 L-9 -6Z" fill="#a8582a"/>${A('flick:9','<path d="M3 -6 Q8 -18 2 -26 Q-2 -16 3 -6Z" fill="#ffd27a"/>')}</g>`;
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
/* small clay (parthiv) lingam, brown */
const clayLingam=(x,y,s=1,glow)=>`<g transform="translate(${x},${y}) scale(${s})">
  ${glow?A('pulse:2.4',`<circle cx="0" cy="-40" r="90" fill="url(#${glow})" opacity=".7"/>`):''}
  <ellipse cx="0" cy="4" rx="46" ry="11" fill="#7a5a3a"/><rect x="-40" y="-14" width="80" height="18" rx="6" fill="#8a6a46"/>
  <path d="M-18 -14 L-18 -62 Q0 -80 18 -62 L18 -14Z" fill="#6a4a30"/><path d="M-16 -46 H16 M-16 -54 H16" stroke="#e8e0d0" stroke-width="2" opacity=".8"/></g>`;
const temple=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${col||'#1e1a46'}"><rect x="-130" y="-56" width="260" height="56"/><rect x="-98" y="-132" width="196" height="78"/><path d="M-86 -132 Q-64 -204 -42 -256 Q0 -340 42 -256 Q64 -204 86 -132Z"/><path d="M-64 -204 H64 M-76 -168 H76" stroke="#3a3470" stroke-width="3" fill="none"/><rect x="-2" y="-372" width="4" height="40"/><path d="M2 -372 L24 -366 L2 -358Z" fill="#a8432a"/><path d="M-28 0 L-28 -48 Q0 -82 28 -48 L28 0Z" fill="#0b0818"/>${A('flick:4','<circle cx="0" cy="-26" r="22" fill="url(#saf)"/>')}</g>`;
const smallTemple=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${col||'#2a2458'}"><rect x="-70" y="-40" width="140" height="40"/><path d="M-56 -40 Q-40 -110 0 -170 Q40 -110 56 -40Z"/><rect x="-2" y="-210" width="3" height="42"/><path d="M1 -210 L18 -205 L1 -198Z" fill="#a8432a"/></g>`;
const mist=(y,op)=>[0,1,2,3].map(i=>A(`orbit:${70+i*25}:${6+i*3}:${60+i*150}:${y+i*12}:${18+i*5}`,`<circle r="${100+i*10}" fill="#aab0e0" opacity="${op||.09}" filter="url(#b24)"/>`)).join('');
const godRays=(x)=>A('pulse:.9',[0,1,2,3,4].map(i=>`<path d="M${x+i*26} -20 L${x+i*26+90+i*40} 800 L${x+i*26+40+i*40} 800Z" fill="#ffe9a8" opacity=".09"/>`).join(''));
const redEyes=(x,y,s,flip)=>A('pulse:3',`<circle cx="${x+(flip?-1:1)*17*s}" cy="${y-270*s}" r="${14*s}" fill="url(#gr)"/>`);
/* giant demon shadow looming on the wall */
const bigShadow=(x,y,s,flip)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})" opacity=".92">
  <path d="M-110 0 L-84 -250 Q-70 -330 -26 -346 L-30 -372 Q-58 -380 -66 -420 Q-70 -470 -44 -520 Q-44 -460 -22 -430 L22 -430 Q44 -460 44 -520 Q70 -470 66 -420 Q58 -380 30 -372 L26 -346 Q70 -330 84 -250 L110 0Z" fill="#04020a"/>
  <path d="M84 -250 L170 -330 L176 -300 L100 -200Z" fill="#04020a"/>
  ${A('pulse:2.5',`<circle cx="-12" cy="-396" r="11" fill="url(#gr)"/><circle cx="14" cy="-396" r="11" fill="url(#gr)"/>`)}
  <circle cx="-12" cy="-396" r="3.5" fill="#ff4a3a"/><circle cx="14" cy="-396" r="3.5" fill="#ff4a3a"/></g>`;
const bolt=(x,y,s,sp)=>A('flick:'+sp,`<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 L-18 70 L2 66 L-26 150 L30 52 L8 56 L26 0Z" fill="#f4f0ff" opacity=".9" style="filter:drop-shadow(0 0 10px #b8a8ff)"/>`);
const stormFlash=()=>A('flick:13',`<rect width="540" height="960" fill="#c8b8ff" opacity=".07"/>`);
/* fire glow on a burning city */
const burning=(x,y,s)=>fire(x,y,s)+A('pulse:3',`<circle cx="${x}" cy="${y-40*s}" r="${90*s}" fill="url(#gr)" opacity=".35"/>`);
/* the chasm that opens in the earth (crack with firelight) */
const chasm=(x,y,t0)=>A(`pop:${t0}`,`<g transform="translate(${x} ${y})">
  <ellipse rx="170" ry="46" fill="url(#gr)" opacity=".8"/><ellipse rx="120" ry="30" fill="#ff7a1c"/><ellipse rx="96" ry="22" fill="#ffd27a"/>
  <path d="M-170 0 L-120 -10 L-150 -22 M170 0 L124 -12 L158 -24 M-60 24 L-80 44 M70 26 L96 46" stroke="#1a0608" stroke-width="5" fill="none"/></g>`)
  +A(`pop:${t0}`,A('pulse:3',`<path d="M${x-40} ${y} L${x-90} -40 L${x+90} -40 L${x+40} ${y}Z" fill="#ffd27a" opacity=".22"/>`));
/* killing-blow effects (same geometry as the proven Shiva strike in shiva-killed-yamraj) */
const thrustTrishul=(t0,x,y,dx)=>{ const body=`<g transform="rotate(-90) scale(1.1)"><line x1="0" y1="-190" x2="0" y2="150" stroke="#d9d2c0" stroke-width="11"/><path d="M-22 -200 Q-22 -170 0 -168 Q22 -170 22 -200 M0 -168 L0 -232" stroke="#fff6dc" stroke-width="10" fill="none"/><path d="M-26 -198 l4 -16 l4 16Z M22 -198 l4 -16 l4 16Z M-4 -230 l4 -18 l4 18Z" fill="#f3ecd6"/></g>`;
  return A(`fadeout:${t0}:.05`,`<g transform="translate(${x+dx} ${y})">${body}</g>`)+
         A(`fadeout:3.6:.8`,A(`slide:${dx}:0:.16:${t0}`,`<g transform="translate(${x} ${y})"><circle cx="-190" r="70" fill="url(#gw)"/>${body}</g>`)); };
const impact=(t0,x,y)=>{ let r=''; for(let i=0;i<14;i++) r+=`<path d="M${x} ${y} L${x+24} ${y-300} L${x-24} ${y-300}Z" transform="rotate(${i*25.7} ${x} ${y})" fill="#ffe2a0" opacity=".25"/>`;
  return A(`pop:${t0}`,A(`fadeout:${t0+.5}:.9`,`<circle cx="${x}" cy="${y}" r="190" fill="url(#gw)"/>${r}<circle cx="${x}" cy="${y}" r="42" fill="#fff"/>`))+
    [70,120,180,250].map((rr,i)=>A(`pop:${(t0+i*.12).toFixed(2)}`,A(`fadeout:${(t0+.5+i*.12).toFixed(2)}:.8`,`<circle cx="${x}" cy="${y}" r="${rr}" fill="none" stroke="#ffd27a" stroke-width="${5-i}"/>`))).join(''); };
/* wheel of Time (Kaal) that shatters before Mahakal */
const kaalChakra=(cx,cy,r)=>{ let t=''; for(let i=0;i<12;i++) t+=`<rect x="-3" y="${-r+6}" width="6" height="${i%3?12:22}" transform="rotate(${i*30})" fill="#d9a73a"/>`;
  return A('fadeout:3.2:.5',A(`spin:30:${cx}:${cy}`,`<g transform="translate(${cx} ${cy})"><circle r="${r+30}" fill="url(#gr)" opacity=".5"/><circle r="${r}" fill="#160a18" stroke="#a8742a" stroke-width="5"/><circle r="${r-18}" fill="none" stroke="#6a3a2a" stroke-width="2"/>${t}<path d="M0 0 L0 ${-r+40}" stroke="#d9a73a" stroke-width="5" stroke-linecap="round"/><path d="M0 0 L${r*.5} 0" stroke="#d9a73a" stroke-width="7" stroke-linecap="round"/><circle r="9" fill="#d9a73a"/><path d="M${-r*.6} ${-r*.5} L-8 -6 L${r*.3} ${r*.7}" stroke="#ff6a3a" stroke-width="3" fill="none"/></g>`))
   +A('pop:3.2',A('fadeout:4.2:.9',`<circle cx="${cx}" cy="${cy}" r="${r+90}" fill="url(#gw)"/>`)); };
/* ring of 12 jyotirlingas, the Mahakaleshwar one glows brightest */
const ring12=(cx,cy,r)=>[...Array(12)].map((_,i)=>{ const a=(i/12)*Math.PI*2-Math.PI/2, x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
  return A('pop:'+(0.3+i*.12).toFixed(2),`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="${i===0?46:30}" fill="url(#${i===0?'saf':'gw'})" opacity="${i===0?.9:.5}"/><path d="M-12 12 L-12 -6 Q0 -26 12 -6 L12 12Z" fill="#2b2a31"/><ellipse cy="12" rx="20" ry="5" fill="#8c8884"/></g>`); }).join('');
const jyotiGlow=(cx,cy)=>A('pulse:2',`<circle cx="${cx}" cy="${cy}" r="${190}" fill="url(#gw)" opacity=".45"/>`);

/* ---- characters ---- */
const BOY={tilak:true,head:'none',hair:'long'};
const ELDER={tilak:true};                                  // Vedpriya
/* Dushan: huge, dark red-black skin, blood-red/iron armour, crown, red aura, mace */
const DUSHAN={skin:'#4a1620',top:'#2a0a10',bottom:'#12060a',head:'big',beard:'black',mus:true,big:true,cape:'#12040a',garland:'#d4a017',aura:'gr',sleeve:'#3a0a10',trim:'#a8432a'};
const ASURA={skin:'#3a2a44',top:'#1e0a12',bottom:'#12060a',head:'band',aura:'gr'};   // his army

/* town street (used for several night scenes) */
const townFar=(col)=>smallTemple(60,640,.9,col)+smallTemple(210,650,.7,col)+smallTemple(470,640,1,col);

VIDEO({
  title:'महाकाल कहलाने की कथा',
  format:'short',
  target:84,
  keywords:['शिव','महाकाल','उज्जैन','अवंती','वेदप्रिय','दूषण','पार्थिव शिवलिंग','शिव पुराण','काल','ज्योतिर्लिंग','महाकालेश्वर','दक्षिणमुखी','12'],
  sfx:true,
  music:'scenes',
  ending:3.2,
  handheld:.9, captionTop:400, captionChars:24, minShot:2.4, pace:13,
  shots:[
    /* 1: the question */
    {line:'क्या आप जानते हैं कि भगवान शिव को महाकाल क्यों कहा जाता है?',
     scene:'mahakal-question', mood:'divine', fx:'embers', cam:{keys:[[0,270,620,1.0],[3.5,270,560,1.25]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+stars(80,500)+divine(270,470,'#ffb347',1),
     far:()=>kaalChakra(270,470,170),
     mid:()=>ground(800,'url(#gnd)','#9a8aba')+mist(780,.1),
     cast:[{c:SHIVA,x:270,y:800,s:1.2,expr:'serene',talk:true,acts:[[0,'stand'],[2,'bless']],aura:'gw'}]},
    /* 2: ancient Ujjain / Avanti */
    {line:'यह कथा प्राचीन उज्जैन की है, जिसे उस समय अवंती नगरी के नाम से जाना जाता था।',
     scene:'avanti-city', mood:'calm', tr:'fade', fx:'petals', cam:{keys:[[0,150,640,1.15],[5.5,390,620,1.15]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDawn)"/>`+A('orbit:260:230:270:520:9',`<circle r="52" fill="url(#gw)"/><circle r="26" fill="#ffd98a"/>`),
     far:()=>hills(660,40,'#6a7f4a',40)+godRays(20)+temple(130,720,.9,'#8a6a56')+temple(420,730,1.05,'#7a5a4a'),
     mid:()=>ground(780,'url(#gnd)','#7a8f5a')+peepal(280,730,1.0),
     art:()=>flowers(790,16),
     capTop:640},
    /* 3: Vedpriya and his sons make the clay Shivling */
    {line:'वहाँ वेदप्रिय नाम के एक ब्राह्मण अपने पुत्रों के साथ रहते थे, जो प्रतिदिन मिट्टी का पार्थिव शिवलिंग बनाकर भगवान शिव की भक्ति भाव से पूजा किया करते थे।',
     scene:'vedpriya-puja', mood:'hope', tr:'fade', fx:'petals', cam:{keys:[[0,270,700,1.1],[5,330,720,1.3],[10,300,720,1.15]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDawn)"/>`+A('pulse:1.4',`<circle cx="270" cy="360" r="230" fill="url(#gw)" opacity=".45"/>`),
     far:()=>hills(660,40,'#6a7f4a',40)+godRays(300)+temple(440,720,.8,'#8a6a56'),
     mid:()=>ground(775,'url(#gnd)','#7a8f5a')+peepal(60,720,1.1),
     art:()=>flowers(790,14)+clayLingam(330,810,1.5,'gw')+flameDiya(460,830)+flameDiya(200,845),
     cast:[
       {c:RISHI,x:120,y:830,s:.88,expr:'serene',with:ELDER,acts:[[0,'kneelOffer'],[4,'kneelPray'],[8,'kneelBow']],talk:true,aura:'gw'},
       {c:BRAHMIN,x:215,y:845,s:.72,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[5,'kneelBow']],aura:'gw'},
       {c:BRAHMIN,x:455,y:845,s:.68,flip:true,expr:'serene',with:BOY,acts:[[0,'kneelOffer'],[4.5,'kneelPray']],aura:'gw'}
     ]},
    /* 4: Dushan the giant demon attacks Avanti */
    {line:'एक बार दूषण नाम के एक अहंकारी और क्रूर असुर ने अवंती पर आक्रमण कर दिया। उसका मुख्य उद्देश्य शिव भक्तों की पूजा को बंद करवाना था।',
     scene:'dushan-attacks', mood:'shock', tr:'dip', fx:'embers', capTop:120, shake:[1.2,.8,7],
     cam:{keys:[[0,270,700,1.0],[2.4,300,560,1.1,'snap'],[6.5,300,520,1.2],[9,300,540,1.1]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+divine(300,520,'#ff5a1c',1)+stormFlash(),
     far:()=>townFar('#2a0f1c')+burning(60,720,1.2)+burning(480,720,1.3)+bolt(100,40,1.4,6)+bolt(470,60,1.2,8)+mist(760,.12),
     mid:()=>ground(790,'url(#gndW)','#a8432a'),
     art:()=>A('fadein:.4:1.5',bigShadow(300,800,2.3,false)),
     cast:[
       {c:SOLDIER,x:90,y:800,s:.7,expr:'angry',with:ASURA,acts:[[0,'carry']],walk:{from:-200,dur:2,delay:.2}},
       {c:SOLDIER,x:470,y:805,s:.7,flip:true,expr:'angry',with:ASURA,acts:[[0,'carry']],walk:{from:200,dur:2,delay:.4}},
       {c:DEVA,x:300,y:810,s:1.9,expr:'angry',talk:true,with:DUSHAN,props:{front:'mace'},acts:[[0,'carry'],[2.2,'armUp'],[5,'rage'],[8,'accuse']],walk:{from:-60,dur:2.4,delay:0}}
     ],
     front:()=>A('fadein:2.2:.5',redEyes(300,810,1.9,false)),
     focus:{at:2.0,sound:'arrive',dur:2.4,duck:.3}},
    /* 5: terror in the city; people run */
    {line:'उसके आतंक से पूरे नगर में भय फैल गया और लोग अपनी जान बचाने के लिए भागने लगे।',
     scene:'city-panic', mood:'sad', tr:'whip', fx:'dust', cam:{keys:[[0,400,640,1.1],[5.5,150,640,1.2]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+stormFlash(),
     far:()=>townFar('#2a0f1c')+burning(90,720,1.1)+burning(300,730,.9)+mist(760,.12),
     mid:()=>ground(790,'url(#gnd)','#6a4a3a'),
     art:()=>A('rise:30:3:.2',bigShadow(520,820,2.0,true)),
     cast:[
       {c:VILLAGER,x:110,y:820,s:.8,flip:true,expr:'surprise',acts:[[0,'recoil'],[.6,'carry']],walk:{from:300,dur:4,delay:0}},
       {c:DEVOTEE_F,x:200,y:825,s:.78,flip:true,expr:'sad',tears:true,acts:[[0,'recoil'],[.6,'carry']],walk:{from:330,dur:4.2,delay:.2}},
       {c:VILLAGER,x:290,y:830,s:.72,flip:true,expr:'surprise',acts:[[0,'recoil'],[.6,'carry']],walk:{from:300,dur:4,delay:.5}},
       {c:RISHI,x:380,y:830,s:.8,flip:true,expr:'sad',acts:[[0,'recoil'],[.6,'carry']],walk:{from:260,dur:4.4,delay:.3}}
     ]},
    /* 6: the army marches on, the sons do not flee */
    {line:'लेकिन चारों तरफ डर का माहौल होने और दूषण की विशाल सेना के आगे बढ़ने के बावजूद, वेदप्रिय के पुत्र वहाँ से भागे नहीं।',
     scene:'sons-stay', mood:'shock', tr:'cut', fx:'dust', cam:{keys:[[0,150,640,1.0],[4,300,700,1.3],[7.5,330,720,1.5]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(60,500)+stormFlash(),
     far:()=>hills(640,40,'#1d1d40',140)+townFar('#1e1a46')+bolt(120,30,1.3,7)+mist(740,.1),
     mid:()=>ground(790,'url(#gnd)','#4a3e5a')+
        A('walk:200:6:0',[0,1,2,3].map(i=>`<g fill="#06030a" transform="translate(${-260-i*60} 770)"><rect x="-8" y="-100" width="16" height="100"/><circle cy="-114" r="14"/><path d="M12 -110 V-30" stroke="#06030a" stroke-width="4"/></g>`).join('')),
     art:()=>clayLingam(430,812,1.4,'gw'),
     cast:[
       {c:DEVA,x:110,y:800,s:1.7,expr:'angry',with:DUSHAN,props:{front:'mace'},acts:[[0,'carry'],[4,'accuse']],walk:{from:-300,dur:5,delay:0}},
       {c:BRAHMIN,x:310,y:835,s:.75,expr:'serene',with:BOY,acts:[[0,'kneelPray']],eyes:'closed',aura:'gw'},
       {c:BRAHMIN,x:240,y:840,s:.7,expr:'serene',with:BOY,acts:[[0,'kneelPray']],eyes:'closed',aura:'gw'}
     ],
     front:()=>redEyes(110,800,1.7,false)},
    /* 7: fearless, absorbed in worship */
    {line:'वे निडर होकर शिवलिंग के सामने बैठे रहे और महादेव की आराधना में लीन रहे।',
     scene:'fearless-prayer', mood:'hope', tr:'fade', fx:'petals', cam:{keys:[[0,320,720,1.4],[5,330,740,1.9]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(60,500)+A('pulse:1.6',`<circle cx="420" cy="700" r="260" fill="url(#gw)" opacity=".35"/>`),
     far:()=>hills(640,40,'#1d1d40',140)+townFar('#1e1a46')+mist(740,.1),
     mid:()=>ground(790,'url(#gnd)','#4a3e5a'),
     art:()=>clayLingam(430,812,1.5,'gw')+flameDiya(520,835),
     cast:[
       {c:BRAHMIN,x:300,y:835,s:.8,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3,'kneelBow'],[4.5,'kneelPray']],eyes:'closed',aura:'gw'},
       {c:BRAHMIN,x:220,y:840,s:.74,expr:'serene',with:BOY,acts:[[0,'kneelPray']],eyes:'closed',aura:'gw'},
       {c:BRAHMIN,x:150,y:846,s:.68,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3.5,'kneelBow']],eyes:'closed',aura:'gw'}
     ]},
    /* 8: Dushan strikes; the earth splits; Shiva emerges in his fiercest form */
    {line:'शिव पुराण के अनुसार, जैसे ही असुर ने उन पर प्रहार करना चाहा, उसी स्थान पर धरती में एक गहरा गड्ढा प्रकट हुआ और उसमें से स्वयं भगवान शिव अपने अत्यंत प्रचंड रूप में प्रकट हुए।',
     scene:'shiva-emerges', mood:'anger', tr:'flash', fx:'sparks', capTop:120,
     cam:{keys:[[0,300,700,1.2],[2.2,260,740,1.1],[3.4,270,640,1.0],[5.2,300,580,1.25],[8.5,300,560,1.3]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+divine(260,640,'#ff6a1c',1)+stormFlash(),
     far:()=>hills(640,40,'#2a0f1c',140)+townFar('#2a0f1c'),
     mid:()=>ground(790,'url(#gndW)','#a8432a')+chasm(250,800,2.4),
     art:()=>clayLingam(470,815,1.2,'gw'),
     cast:[
       {c:BRAHMIN,x:400,y:840,s:.62,expr:'serene',with:BOY,acts:[[0,'kneelPray']],eyes:'closed',aura:'gw'},
       {c:DEVA,x:75,y:800,s:1.7,expr:'angry',with:DUSHAN,props:{front:'mace'},acts:[[0,'carry'],[1.2,'armUp'],[2.2,{a:[20,70],b:[40,80],lean:-14,head:10,hand:'open'}],[3.6,'recoil']]},
       {c:SHIVA,x:250,y:800,s:1.4,flip:true,expr:'angry',talk:true,acts:[[0,'rage'],[5.5,'rage']],enter:{fade:.6,delay:3.1,rise:170},aura:'gr'}
     ],
     front:()=>redEyes(75,800,1.7,false),
     shake:[2.4,1.2,12], focus:[{at:2.4,sound:'emerge',dur:2.4,duck:.28}]},
    /* 9: the instant Dushan dies */
    {line:'महादेव ने पल भर में असुर दूषण का वध कर दिया।',
     scene:'shiva-slays-dushan', mood:'anger', tr:'cut', fx:'embers', capTop:120,
     cam:{keys:[[0,300,640,1.0],[1.0,320,560,1.15],[1.55,260,550,1.3,'snap'],[2.1,240,550,1.42],[3.2,250,590,1.2],[4.5,300,590,1.1]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+divine(270,430,'#ff5a1c',1)+stormFlash(),
     far:()=>hills(640,40,'#2a0f1c',140)+bolt(70,60,1.4,6)+bolt(450,90,1.1,8)+mist(760,.12),
     mid:()=>ground(790,'url(#gndW)','#a8432a'),
     art:()=>A('fadeout:1.7:.3',bigShadow(110,800,2.2,false))+impact(1.65,190,520),
     cast:[
       {c:SHIVA,x:395,y:780,s:1.35,flip:true,expr:'angry',talk:true,acts:[[0,'rage'],[1.2,{a:[96,6],b:[60,90],lean:16,head:6,hand:'fist'}],[1.5,{a:[100,0],b:[-30,40],lean:20,hand:'fist',head:4}],[3.2,'rage']],aura:'gr'},
       {c:DEVA,x:150,y:785,s:1.8,expr:'angry',with:DUSHAN,props:{front:'mace'},acts:[[0,'carry'],[0.9,'armUp'],[1.7,{a:[20,70],b:[40,80],lean:-30,head:22,hand:'open'}],[2.6,{a:[10,60],b:[-20,50],lean:-42,drop:34,head:26,hand:'open'}]],exit:{at:3.3,fade:1.1}}
     ],
     front:()=>A('fadeout:1.7:.2',redEyes(150,785,1.8,false))+thrustTrishul(1.45,445,520,95),
     shake:[1.65,1.0,13], focus:{at:1.65,sound:'slay',dur:2.6,duck:.22}},
    /* 10: Time itself is powerless before this form: Mahakal */
    {line:"भगवान शिव के इस स्वरूप के आगे स्वयं 'काल' (समय और मृत्यु) भी शक्तिहीन था, इसलिए वे यहाँ महाकाल कहलाए।",
     scene:'mahakal-glory', mood:'divine', tr:'glow', fx:'embers', focus:{at:3.0,sound:'kaal',dur:2.4,duck:.4},
     cam:{keys:[[0,270,560,1.0],[3,270,520,1.2],[6.5,270,470,1.4]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,520,'#ffb347',1),
     far:()=>kaalChakra(270,520,200),
     mid:()=>ground(790,'url(#gnd)','#9a8aba'),
     title:{text:'महाकाल',y:190,size:100,color:'#ffe9a8',delay:3.4},
     cast:[{c:SHIVA,x:270,y:790,s:1.25,expr:'serene',talk:true,acts:[[0,'stand'],[3.5,'bless']],props:{front:'trishul'},aura:'gw'}]},
    /* 11: devotees ask Mahadev to stay forever */
    {line:'असुर के अंत के बाद, भक्तों ने महादेव से प्रार्थना की कि वे हमेशा के लिए इसी स्थान पर विराजमान हो जाएं।',
     scene:'devotees-plead', mood:'hope', tr:'fade', fx:'petals', cam:{keys:[[0,270,700,1.25],[6,270,660,1.05]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDawn)"/>`+A('pulse:1.6',`<circle cx="270" cy="420" r="240" fill="url(#gw)" opacity=".4"/>`),
     far:()=>hills(660,40,'#6a7f4a',40)+godRays(180)+temple(440,720,.85,'#8a6a56'),
     mid:()=>ground(775,'url(#gnd)','#7a8f5a')+peepal(60,720,1.1),
     art:()=>flowers(790,14),
     cast:[
       {c:SHIVA,x:300,y:790,s:1.2,expr:'smile',acts:[[0,'stand'],[3,'bless']],aura:'gw'},
       {c:RISHI,x:110,y:830,s:.85,expr:'sad',with:ELDER,acts:[[0,'kneelPray'],[3,'kneelBow']],aura:'gw'},
       {c:BRAHMIN,x:185,y:840,s:.72,expr:'serene',with:BOY,acts:[[0,'kneelPray']],aura:'gw'},
       {c:VILLAGER,x:455,y:835,s:.78,flip:true,expr:'sad',acts:[[0,'kneelPray']],aura:'gw'},
       {c:DEVOTEE_F,x:510,y:838,s:.72,flip:true,expr:'sad',acts:[[0,'kneelPray']],aura:'gw'}
     ]},
    /* 12: Mahadev accepts and becomes the Jyotirlinga of Ujjain */
    {line:'महादेव ने उनकी प्रार्थना स्वीकार की और ज्योतिर्लिंग रूप में वहीं स्थापित हो गए—जिसे आज हम उज्जैन के श्री महाकालेश्वर ज्योतिर्लिंग के रूप में जानते हैं।',
     scene:'jyotirlinga-established', mood:'divine', tr:'glow', fx:'petals', focus:{at:3.0,sound:'revive',dur:3.0,duck:.4},
     cam:{keys:[[0,270,620,1.0],[4,270,640,1.25],[9,270,600,1.4]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,520,'#ffe9a8',1)+stars(70,480),
     far:()=>temple(270,760,1.3,'#3a3470')+godRays(200),
     mid:()=>ground(800,'url(#gnd)','#9a8aba')+mist(780,.08),
     art:()=>A('pop:3.4',A('rise:30:2:3.4',lingam(270,810,1.7,'saf')))+[[110,640],[430,620],[150,500],[400,470]].map(([x,y],i)=>A('flick:'+(2+i*.5),sparkle(x,y,1.3))).join(''),
     cast:[
       {c:SHIVA,x:270,y:790,s:1.25,expr:'smile',acts:[[0,'bless'],[2.5,'namaste']],aura:'gw',exit:{at:3.6,fade:1.2}},
       {c:RISHI,x:90,y:835,s:.8,expr:'serene',with:ELDER,acts:[[0,'kneelPray']],aura:'gw'},
       {c:BRAHMIN,x:455,y:840,s:.72,flip:true,expr:'serene',with:BOY,acts:[[0,'kneelPray']],aura:'gw'}
     ]},
    /* 13: one of the 12, the only south-facing */
    {line:'12 ज्योतिर्लिंगों में से एक, महाकालेश्वर एकमात्र दक्षिणमुखी ज्योतिर्लिंग है।',
     scene:'twelve-jyotirlinga', mood:'divine', tr:'iris', trAt:[270,480], fx:'stars', capTop:150,
     cam:{keys:[[0,270,500,1.0],[5.5,270,470,1.18]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+stars(90,560)+divine(270,480,'#ffd27a',1),
     far:()=>jyotiGlow(270,480)+ring12(270,480,190),
     mid:()=>ground(850,'url(#gnd)','#9a8aba')+mist(820,.08),
     art:()=>A('pop:1.8',lingam(270,640,1.3,'saf')),
     title:{text:'12',y:300,size:96,color:'#ffe9a8',delay:.3}},
    /* 14: the King of Ujjain is Baba Mahakal */
    {line:'यही कारण है कि उज्जैन में यह मान्यता प्रचलित है कि यहाँ का राजा कोई इंसान नहीं, बल्कि स्वयं बाबा महाकाल हैं।',
     scene:'raja-mahakal', mood:'divine', tr:'glow', fx:'petals', cam:{keys:[[0,270,620,1.0],[5,270,560,1.25],[8,270,520,1.4]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+stars(70,480)+divine(270,470,'#ffb347',1),
     far:()=>temple(150,740,1.0,'#3a3470')+temple(400,745,1.1,'#3a3470')+godRays(260),
     mid:()=>ground(800,'url(#gnd)','#9a8aba')+flameDiya(60,880)+flameDiya(480,880)+mist(780,.08),
     art:()=>flowers(830,16),
     cast:[
       {c:SHIVA,x:270,y:790,s:1.3,expr:'serene',talk:true,acts:[[0,'stand'],[3,'bless']],props:{front:'trishul'},aura:'gw'},
       {c:RISHI,x:90,y:845,s:.7,expr:'serene',with:ELDER,acts:[[0,'kneelPray'],[3.5,'kneelBow']],aura:'gw'},
       {c:VILLAGER,x:170,y:850,s:.66,expr:'serene',acts:[[0,'kneelPray'],[3.5,'kneelBow']],aura:'gw'},
       {c:DEVOTEE_F,x:400,y:850,s:.66,flip:true,expr:'serene',acts:[[0,'kneelPray'],[3.5,'kneelBow']],aura:'gw'},
       {c:BRAHMIN,x:470,y:846,s:.7,flip:true,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3.5,'kneelBow']],aura:'gw'}
     ]}
  ]
});
