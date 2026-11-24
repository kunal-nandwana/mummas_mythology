/* कर्ण महादानी — Short. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js karna-mahadani-short-form
   Look: a bright village between two green hills. A calm afternoon sky warms through honey to a rose-gold sunset (never dark).
   Opening: aerial fly-over, the camera drops through the clouds onto the village. Nothing scary anywhere: the only pressure is the sun sinking towards the horizon.
   Story beat: Arjuna digs and digs but the mountain never shrinks. Karna just says "these are all yours" and walks away, back to camera.
   Signature art (new): twin hills that turn to gold (maya sweep), dug pits that fill back with gold, a dotted sun-path with the sinking sun,
   Karna seen from behind (KARNA_BACK), the gold-light wave that rolls over the village.
   No hook text, no intro, no end card. Music: the owner's own track (default). */

/* ---------- skies, sun, clouds ---------- */
const SKIES = {
  morn:  ()=>skyBand([[0,'#8ccaf0'],[.45,'#d4ecf4'],[.75,'#fff0cc'],[1,'#ffe4b0']]),
  noon:  ()=>skyBand([[0,'#6ab6ea'],[.5,'#bfe2f4'],[.78,'#fdf0cc'],[1,'#fde6b4']]),
  honey: ()=>skyBand([[0,'#7fbbe4'],[.42,'#dbe0c8'],[.7,'#fbd48a'],[1,'#fbc070']]),
  sunset:()=>skyBand([[0,'#6f74b4'],[.3,'#cf86a2'],[.58,'#f6a070'],[.8,'#ffca7c'],[1,'#ffe3a4']])
};
const SUN = (x,y,r,warm)=>`<circle cx="${x}" cy="${y}" r="${r*4.2}" fill="url(#gw)" opacity="${warm?.85:.55}"/><circle cx="${x}" cy="${y}" r="${r*1.6}" fill="${warm?'#ffe3a0':'#fff6d0'}" opacity=".5"/><circle cx="${x}" cy="${y}" r="${r}" fill="${warm?'#ffe08a':'#fffbe8'}"/><circle cx="${x}" cy="${y}" r="${r*.6}" fill="#fff8da" opacity="${warm?.9:0}"/>`;
const PUFF = (x,y,s,c,op)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${c||'#fff'}" opacity="${op||.9}"><ellipse cx="0" cy="0" rx="62" ry="18"/><ellipse cx="-26" cy="-12" rx="30" ry="20"/><ellipse cx="14" cy="-18" rx="34" ry="24"/><ellipse cx="44" cy="-6" rx="26" ry="16"/></g>`;
const SKYCLOUDS = (tint)=>A('drift:90:0:60',PUFF(60,210,1.1,tint))+A('drift:-80:0:70',PUFF(430,320,1.3,tint,.8))+A('drift:70:0:80',PUFF(250,140,.9,tint,.7));
/* big cloud banks for the fly-over (they part and fade as the camera drops through) */
const CLOUDBANK = ()=>A('fadeout:1.1:1.7',PUFF(120,320,3.2,'#ffffff',.96)+PUFF(430,260,3.6,'#ffffff',.96)+PUFF(270,440,3.4,'#f6fbff',.95)+PUFF(40,560,3,'#ffffff',.92)+PUFF(500,600,3,'#ffffff',.92));
/* dotted path of the sun across the sky (the sunset deadline) */
const ARC = ()=>`<path d="M30 690 Q270 -40 510 690" fill="none" stroke="#fff6d0" stroke-width="3" stroke-dasharray="3 12" stroke-linecap="round" opacity=".6"/>`;

/* ---------- the two hills ---------- */
function HILL(cx,top,w,base,gold){
  const hw=w/2, h=base-top;
  const R=`C${cx+hw*.45} ${top} ${cx+hw*.92} ${top+h*.32} ${cx+hw} ${base}`, L=`C${cx-hw*.92} ${top+h*.32} ${cx-hw*.45} ${top} ${cx} ${top}`;
  const body=`M${cx-hw} ${base} ${L} ${R}Z`;
  const shade=`M${cx} ${top} ${R} L${cx+hw*.2} ${base} C${cx+hw*.3} ${top+h*.45} ${cx+hw*.12} ${top+h*.1} ${cx} ${top}Z`;
  const lite=`M${cx} ${top} C${cx-hw*.45} ${top} ${cx-hw*.92} ${top+h*.32} ${cx-hw} ${base} L${cx-hw*.62} ${base} C${cx-hw*.7} ${top+h*.4} ${cx-hw*.35} ${top+h*.06} ${cx} ${top}Z`;
  let o='';
  if(gold){
    o+=`<path d="${body}" fill="url(#gold)"/><path d="${shade}" fill="#b4781a" opacity=".5"/><path d="${lite}" fill="#fff2b0" opacity=".5"/>`;
    o+=`<path d="M${cx} ${top} Q${cx-hw*.25} ${top+h*.5} ${cx-hw*.45} ${base-4} M${cx} ${top} Q${cx+hw*.2} ${top+h*.5} ${cx+hw*.4} ${base-4}" stroke="#a8741a" stroke-width="2" fill="none" opacity=".5"/>`;
    for(let i=0;i<16;i++){ const f=.16+.74*((i*37)%100)/100, sp=hw*.62*f, x=cx+(((i*53)%100)/100*2-1)*sp, y=top+h*f;
      o+=A(`flick:${(2+i%4).toFixed(1)}`,sparkle(r1(x),r1(y),.5+(i%3)*.22,i%2?'#fff6c8':'#ffe08a')); }
  } else {
    o+=`<path d="${body}" fill="#7ea34e"/><path d="${shade}" fill="#4f7634" opacity=".55"/><path d="${lite}" fill="#a9cc6c" opacity=".55"/>`;
    [[-.35,.7,16],[.2,.55,14],[-.1,.38,11],[.38,.78,18],[-.5,.86,13],[.05,.82,15]].forEach(([fx,fy,r])=>{ o+=`<circle cx="${r1(cx+fx*hw)}" cy="${r1(top+fy*h)}" r="${r}" fill="#5a8a36" opacity=".75"/><circle cx="${r1(cx+fx*hw-4)}" cy="${r1(top+fy*h-4)}" r="${r*.6}" fill="#8cba52" opacity=".6"/>`; });
  }
  return o; }
const HILL_L = (gold)=>HILL(30,370,360,744,gold);
const HILL_R = (gold)=>HILL(510,410,340,744,gold);
const GOLDHILLS = ()=>A('pulse:2.2',`<ellipse cx="90" cy="560" rx="230" ry="260" fill="url(#gw)" opacity=".4"/><ellipse cx="452" cy="590" rx="220" ry="220" fill="url(#gw)" opacity=".4"/>`)+HILL_L(true)+HILL_R(true);
const GREENHILLS = ()=>HILL_L(false)+HILL_R(false);
/* state: 'green' | 'gold' | 'morph' (green -> gold at `at` over `dur`, with a shimmer streak) | 'unmorph' (gold -> green) */
function TWINS(state,at,dur){
  if(state==='gold') return GOLDHILLS();
  if(state==='morph') return GREENHILLS()+A(`fadein:${at}:${dur}`,GOLDHILLS())+A(`glint:${at}:${dur}:-260:620`,`<path d="M-40 780 L20 780 L140 300 L80 300Z" fill="#fff8d0" opacity=".55"/>`);
  if(state==='unmorph') return GREENHILLS()+A(`fadeout:${at}:${dur}`,GOLDHILLS());
  return GREENHILLS(); }
/* pits Arjuna has dug in the left hill: they fill back up with gold (the mountain never shrinks) */
const PITS = (at,dur)=>[[120,600,22],[168,640,18],[84,660,20]].map(([x,y,w],i)=>A(`fadeout:${at+i*.25}:${dur}`,`<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w*.42}" fill="#7a4a0e" opacity=".85"/><ellipse cx="${x}" cy="${y-3}" rx="${w*.8}" ry="${w*.3}" fill="#3a2008" opacity=".5"/>`)+A(`fadein:${at+i*.25}:${dur}`,sparkle(x,y-4,1.2,'#fff6c8'))).join('');
const RIDGE = (col)=>`<path d="M-20 724 Q40 650 110 694 Q170 640 240 704 Q320 652 400 698 Q470 656 560 708 L560 1000 L-20 1000Z" fill="${col||'#a9c4d2'}" opacity=".75"/>`;

/* ---------- village ---------- */
const HUT = (x,y,s,lit)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="3" rx="54" ry="7" fill="#000" opacity=".16"/><rect x="-36" y="-46" width="72" height="46" fill="#cf9d62"/><rect x="-36" y="-12" width="72" height="12" fill="#b8854c"/><path d="M-52 -44 L0 -98 L52 -44Z" fill="#8f6a2c"/><path d="M-40 -50 L0 -90 M-24 -48 L4 -80 M-8 -46 L10 -66 M10 -46 L20 -58" stroke="#6a4c1c" stroke-width="2" opacity=".6" fill="none"/><rect x="-10" y="-32" width="20" height="32" rx="10" fill="#4a2e18"/>${lit?A('flick:5','<rect x="-6" y="-26" width="12" height="26" rx="6" fill="#ffc060" opacity=".75"/>'):''}<rect x="16" y="-36" width="14" height="14" rx="2" fill="#5a3a20"/></g>`;
const TREE = (x,y,s,c1,c2)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="3" rx="36" ry="6" fill="#000" opacity=".14"/><rect x="-6" y="-74" width="12" height="74" fill="#6a4a2a"/><circle cx="0" cy="-100" r="38" fill="${c1||'#5f9a3a'}"/><circle cx="-28" cy="-78" r="27" fill="${c2||'#4e8a30'}"/><circle cx="30" cy="-80" r="29" fill="${c2||'#4e8a30'}"/><circle cx="-8" cy="-112" r="22" fill="#7ab24a" opacity=".6"/></g>`;
const VILLAGE = (lit)=>TREE(26,790,.9)+HUT(78,784,.8,lit)+HUT(168,794,.58,lit)+TREE(212,790,.5,'#6aa23e')+HUT(396,792,.62,lit)+TREE(444,786,.82)+HUT(494,782,.82,lit)+
  A('drift:10:-60:6',`<ellipse cx="500" cy="680" rx="14" ry="9" fill="#e8e0d0" opacity=".5"/>`);
const GROUND = (c1,c2)=>`<path d="M-20 738 Q270 722 560 740 L560 1000 L-20 1000Z" fill="${c1||'#a8c25c'}"/><path d="M-20 796 Q270 776 560 798 L560 1000 L-20 1000Z" fill="${c2||'#dcbd7e'}"/><path d="M262 742 L278 742 L420 1000 L120 1000Z" fill="#ecd29a" opacity=".85"/>`+tufts(752,'#7a9a40',46);
/* one background in one call: sky + sun + hills + village + ground. o:{sky,sun:[x,y,r],hills,at,dur,pits,lit,arc,ground:[c1,c2],ridge} */
function BG(o){ o=o||{}; const sk=o.sky||'noon';
  return {
    sky:()=>SKIES[sk]()+(o.clouds===false?'':SKYCLOUDS(sk==='sunset'?'#ffd9c0':'#ffffff')),
    far:()=>(o.arc?ARC():'')+(o.sun?SUN(o.sun[0],o.sun[1],o.sun[2],sk==='sunset'||sk==='honey'):'')+(o.sunSlide?A(`slide:${o.sunSlide[0]}:${o.sunSlide[1]}:${o.sunSlide[2]}:0`,SUN(o.sun[0],o.sun[1],o.sun[2],true)):'')+RIDGE(o.ridge)+TWINS(o.hills||'green',o.at,o.dur)+(o.pits?PITS(o.pits[0],o.pits[1]):''),
    mid:()=>VILLAGE(o.lit),
    art:()=>GROUND(o.ground&&o.ground[0],o.ground&&o.ground[1]) }; }
const WARM = (op)=>`<rect width="540" height="960" fill="#ff8a2a" opacity="${op}"/>`;

/* ---------- gold light: wave over the ground, gold dust, piles ---------- */
const GOLDWAVE = (cx,cy,w)=>A('ripple:3:'+cx+':'+cy,`<ellipse cx="${cx}" cy="${cy}" rx="${w}" ry="${w*.2}" fill="url(#gw)" opacity=".55"/>`)+A('ripple:3.4:'+cx+':'+cy,`<ellipse cx="${cx}" cy="${cy}" rx="${w*.8}" ry="${w*.16}" fill="url(#gw)" opacity=".5"/>`);
const GOLDMOTES = (x1,y1,x2,y2,n)=>{ let o=''; for(let i=0;i<n;i++) o+=A(`drift:${r1(x2-x1+((i*29)%40-20))}:${r1(y2-y1)}:${(3+(i%4)*.6).toFixed(1)}`,`<circle cx="${r1(x1+(i*41)%90-45)}" cy="${r1(y1+(i*17)%30)}" r="${2.2+(i%3)*.8}" fill="${i%2?'#ffe08a':'#fff6c8'}"/>`); return o; };
const GOLDPILE = (x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="50" ry="9" fill="#6a420c" opacity=".3"/><path d="M-46 0 Q-32 -34 -8 -40 Q20 -50 46 0Z" fill="url(#gold)" stroke="#a8741a" stroke-width="1.4"/>${[[-20,-12],[6,-22],[24,-10],[-4,-6],[-32,-4]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="6" fill="#ffdc78" stroke="#b8861f" stroke-width="1"/>`).join('')}${A('flick:3.1',sparkle(-6,-34,.9,'#fff6c8'))}${A('flick:4.3',sparkle(24,-18,.7,'#fff6c8'))}</g>`;
const SUNRAYS = (x,y,n,len,col,op)=>{ let s=''; for(let i=0;i<n;i++){ const a=(i/n)*Math.PI*2, a2=a+.08; s+=`<path d="M${x} ${y} L${r1(x+Math.cos(a)*len)} ${r1(y+Math.sin(a)*len)} L${r1(x+Math.cos(a2)*len)} ${r1(y+Math.sin(a2)*len)}Z" fill="${col}" opacity="${op}"/>`; }
  return A(`spin:120:${x}:${y}`,s); };

/* ---------- Arjuna's kudal (hoe) ---------- */
/* swinging in his hands: pivot (x,y) = his hands; rest = resting angle, amp = swing (degrees, total), freq = speed */
const KUDAL_SWING = (x,y,s,rest,amp,freq,flip)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})">${A(`rock:${amp}:${freq}:0:0`,`<g transform="rotate(${rest})"><line x1="-34" y1="0" x2="128" y2="0" stroke="#6b4424" stroke-width="7" stroke-linecap="round"/><rect x="116" y="-9" width="16" height="18" rx="3" fill="#5a606a"/><path d="M124 6 L148 8 L144 52 L120 46Z" fill="#9aa2ae" stroke="#4a505a" stroke-width="1.6"/><path d="M130 12 L140 14" stroke="#fff" stroke-width="2" opacity=".6"/></g>`)}</g>`;
/* lying on the ground, unused */
const KUDAL_LYING = (x,y,s,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot||-6}) scale(${s})"><ellipse cx="50" cy="8" rx="100" ry="8" fill="#000" opacity=".18"/><line x1="-34" y1="0" x2="128" y2="0" stroke="#6b4424" stroke-width="7" stroke-linecap="round"/><rect x="116" y="-9" width="16" height="18" rx="3" fill="#5a606a"/><path d="M124 6 L150 8 L146 22 L120 20Z" fill="#9aa2ae" stroke="#4a505a" stroke-width="1.6"/></g>`;

/* ---------- Karna seen from behind (back to camera, golden kavach, kundal glints, saffron cloth) ---------- */
function KARNA_BACK(x,y,s,o){ o=o||{}; const sk='#a9744c', skd='#8a5a38';
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="3" rx="54" ry="9" fill="#000" opacity=".22"/>`+
  A('pulse:2.4',`<ellipse cx="0" cy="-190" rx="125" ry="175" fill="url(#saf)" opacity=".5"/>`)+
  A('bob:2.6:1.5',
    `<rect x="-24" y="-150" width="22" height="148" rx="10" fill="#f0e2bc"/><rect x="2" y="-150" width="22" height="142" rx="10" fill="#e4d4a4"/>`+
    `<ellipse cx="-13" cy="-2" rx="14" ry="6" fill="#6a4426"/><ellipse cx="14" cy="-5" rx="14" ry="6" fill="#5a3a20"/>`+
    A('rock:3:1.2:0:-150',`<path d="M-34 -162 L34 -162 L42 -64 Q0 -48 -42 -64Z" fill="#f6ebc8"/><path d="M-42 -64 Q0 -48 42 -64 L43 -55 Q0 -39 -43 -55Z" fill="url(#gold)"/><path d="M-12 -160 Q-8 -110 -14 -66 M12 -160 Q10 -110 14 -64" stroke="#d8c690" stroke-width="2" fill="none"/>`)+
    `<path d="M-37 -252 Q0 -266 37 -252 L31 -156 L-31 -156Z" fill="url(#gold)" stroke="#7a5010" stroke-width="1.6"/><path d="M0 -258 V-158 M-24 -236 Q-12 -214 -3 -204 M24 -236 Q12 -214 3 -204 M-27 -208 Q-12 -194 -3 -184 M27 -208 Q12 -194 3 -184" stroke="#7a5010" stroke-width="1.8" fill="none"/>`+
    `<ellipse cx="-42" cy="-246" rx="15" ry="13" fill="url(#gold)" stroke="#7a5010" stroke-width="1.4"/><ellipse cx="42" cy="-246" rx="15" ry="13" fill="url(#gold)" stroke="#7a5010" stroke-width="1.4"/>`+
    `<rect x="-56" y="-240" width="16" height="92" rx="8" fill="${sk}"/><rect x="40" y="-240" width="16" height="92" rx="8" fill="${skd}"/><rect x="-57" y="-190" width="18" height="22" rx="5" fill="url(#gold)" stroke="#7a5010" stroke-width="1.2"/><rect x="39" y="-190" width="18" height="22" rx="5" fill="url(#gold)" stroke="#7a5010" stroke-width="1.2"/>`+
    A('rock:7:1.6:0:-250',`<path d="M-34 -250 L-20 -250 L22 -160 L10 -150Z" fill="#c8501e"/><path d="M-30 -248 L-22 -248 L18 -166" stroke="#ffcf7a" stroke-width="2" fill="none" opacity=".7"/><path d="M12 -156 Q30 -120 14 -76 Q4 -100 -2 -126Z" fill="#c8501e" opacity=".92"/>`)+
    `<rect x="-9" y="-270" width="18" height="20" rx="6" fill="${sk}"/>`+
    `<ellipse cx="-27" cy="-286" rx="6" ry="9" fill="${skd}"/><ellipse cx="27" cy="-286" rx="6" ry="9" fill="${skd}"/>`+
    `<ellipse cx="0" cy="-290" rx="25" ry="28" fill="#1a0f0c"/><circle cx="0" cy="-322" r="10" fill="#1a0f0c"/><path d="M-18 -312 Q0 -322 18 -312" stroke="#4a3228" stroke-width="2" fill="none" opacity=".7"/>`+
    A('flick:3.3',`<circle cx="-28" cy="-266" r="7" fill="url(#gold)" stroke="#8a5a14" stroke-width="1.2"/><circle cx="-28" cy="-266" r="2.4" fill="#d63a2a"/>`)+A('flick:2.7',`<circle cx="28" cy="-266" r="7" fill="url(#gold)" stroke="#8a5a14" stroke-width="1.2"/><circle cx="28" cy="-266" r="2.4" fill="#d63a2a"/>`)+
    A('flick:4.2',sparkle(-30,-262,.7,'#fff6c8'))+A('flick:3.8',sparkle(30,-262,.7,'#fff6c8')))+
  `</g>`; }

/* ---------- small helpers ---------- */
const THINKB = (x,y,s,inner,delay)=>A(`pop:${delay||.3}`,A('bob:5:3.2',`<g transform="translate(${x} ${y}) scale(${s})"><circle r="78" fill="#fff4d8" opacity=".18"/><circle r="74" fill="none" stroke="#ffe9a8" stroke-width="2.4" opacity=".7"/>${inner}<circle cx="-70" cy="96" r="11" fill="#fff4d8" opacity=".4"/><circle cx="-96" cy="132" r="7" fill="#fff4d8" opacity=".4"/><circle cx="-112" cy="158" r="4" fill="#fff4d8" opacity=".4"/></g>`));
const VIS_SUN = ()=>`<circle r="52" fill="url(#gw)" opacity=".9"/>`+SUNRAYS(0,0,12,60,'#ffe08a',.35)+`<circle r="26" fill="#ffd36a"/><path d="M-12 8 Q0 20 12 8" stroke="#a8741a" stroke-width="3" fill="none"/>`+`<circle cx="-30" cy="22" r="7" fill="url(#gold)" stroke="#8a5a14" stroke-width="1.2"/><circle cx="30" cy="22" r="7" fill="url(#gold)" stroke="#8a5a14" stroke-width="1.2"/>`;
const VIS_COINS = ()=>[[-30,24],[0,28],[30,24],[-16,2],[14,4],[0,-20]].map(([a,b],i)=>A(`pulse:${2+i*.4}`,`<ellipse cx="${a}" cy="${b}" rx="19" ry="8" fill="url(#gold)" stroke="#a8741a" stroke-width="1.4"/><ellipse cx="${a}" cy="${b-3}" rx="13" ry="4" fill="#fff0b0" opacity=".6"/>`)).join('')+A('flick:3',sparkle(0,-40,1.3,'#fff6c8'));

const VT=[['#c8641e','#ff8a1a'],['#2a7a6a','#f2f2e6'],['#8a3a5a','#ffb23a'],['#3a5aa0','#ff8a1a'],['#b89020','#e8e0cc'],['#a03a2a','#f0e8d0']];
const WT=[['#b8202a','#e05a2a'],['#2a6aa8','#e8c04a'],['#3a8a4a','#f2d870'],['#8a2a8a','#f0a0d0']];
const SK=['#8a5a3c','#9a6a46','#7a4e34','#a37450'];
const VM = (i,x,y,s,o)=>Object.assign({c:VILLAGER, with:{top:VT[i%6][0],turban:VT[i%6][1],skin:SK[i%4]}, x,y,s}, o||{});
const VW = (i,x,y,s,o)=>Object.assign({c:DEVOTEE_F, with:{top:WT[i%4][0],bottom:WT[i%4][0],veil:WT[i%4][1],skin:SK[(i+1)%4]}, x,y,s}, o||{});
const VK = (i,x,y,o)=>Object.assign({c:VILLAGER, with:{top:VT[(i+2)%6][0],skin:SK[i%4],head:'none',hair:'bun'}, x,y,s:.4}, o||{});

const PROUD = {a:[18,96], b:[-6,8], lean:-6, head:12};
const TIRED = {a:[10,12], b:[12,60], lean:22, head:-26};
const DIG   = {a:[34,40], b:[28,44], lean:22, head:-8};

VIDEO({ rig:'side',
  title:'कर्ण महादानी', format:'short', target:120,
  handheld:0.7,
  keywords:['अर्जुन','कृष्ण','कर्ण','सोने','पहाड़','पहाड़ों','महादानी','दानी','अहंकार','घमंड','दान','माधव','पार्थ','सूर्यास्त','कुदाल','दाता','कर्ता','मोह'],
  shots:[
    /* 1 — aerial fly-over: the camera drops out of the clouds onto the green village; Arjuna stands proud with villagers bowing */
    { line:'जब अर्जुन को अपने दानी होने पर अहंकार हुआ,', mood:'calm', fx:'dust', capTop:130,
      cam:{keys:[[0,270,330,2.3],[3.4,270,560,1.05]]},
      ...BG({sky:'morn', sun:[420,170,34], hills:'green'}), near:()=>CLOUDBANK(),
      cast:[{c:ARJUNA, x:270, y:880, s:.98, expr:'smile', acts:[[0,PROUD]]},
            VM(0,110,830,.62,{expr:'smile',acts:[[0,'namaste']]}), VW(1,175,845,.66,{expr:'smile',acts:[[0,'namaste']]}),
            VM(3,400,835,.62,{flip:true,expr:'smile',acts:[[0,'namaste']]}), VW(2,462,830,.6,{flip:true,expr:'smile',acts:[[0,'namaste']]})] },

    /* 2 — the teaser: two gold hills, Krishna's calm smile, Arjuna looking up in awe */
    { line:'तो भगवान श्री कृष्ण ने सिर्फ़ दो सोने के पहाड़ों से अर्जुन का घमंड मिट्टी में मिला दिया।', mood:'divine', fx:'sparks', tr:'glow', capTop:130,
      cam:{from:[270,640,1.05],to:[270,600,1.25]},
      ...BG({sky:'noon', sun:[420,170,34], hills:'gold'}), front:()=>GOLDMOTES(270,640,270,860,10),
      cast:[{c:KRISHNA, x:200, y:880, s:1.0, expr:'smile', talk:true, acts:[[0,'stand'],[1.2,'bless',.8]]},
            {c:ARJUNA, x:385, y:880, s:.92, flip:true, expr:'surprise', acts:[[0,'stand'],[0.6,'lookUp',.8]]}] },

    /* 3 — "let's find out how": the gold fades back to green, morning light */
    { line:'आइए जानते हैं कैसे।', mood:'calm', fx:'petals', tr:'glow', capTop:130,
      cam:{from:[270,620,1.3],to:[270,600,1.0]},
      ...BG({sky:'morn', sun:[420,170,34], hills:'unmorph', at:.2, dur:1.8}),
      cast:[{c:KRISHNA, x:270, y:880, s:1.05, expr:'smile', talk:true, acts:[[0,'give',.8]]}] },

    /* 4 — one day Arjuna asks Krishna (under a big tree at the edge of the village) */
    { line:'एक दिन अर्जुन ने कृष्ण से पूछा,', mood:'calm', fx:'dust', tr:'fade', capTop:130,
      cam:{from:[190,600,1.3],to:[330,600,1.3]},
      ...BG({sky:'noon', sun:[420,190,34], hills:'green'}), mid:()=>VILLAGE()+TREE(270,800,1.7,'#5f9a3a','#4e8a30'),
      cast:[{c:ARJUNA, x:165, y:880, s:.95, expr:'calm', acts:[[0,'stand'],[1.2,'plead',.8]]},
            {c:KRISHNA, x:385, y:880, s:.98, flip:true, expr:'smile', acts:[[0,'stand'],[0.8,'hold',.6]]}] },

    /* 5 — close-up: Arjuna speaks */
    { line:'"हे माधव, मैं भी इतना दान करता हूँ,', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,222,700,1.5],[2.4,214,640,2.5]]},
      ...BG({sky:'noon', sun:[420,190,34], hills:'green', clouds:false}),
      cast:[{c:ARJUNA, x:200, y:880, s:1.02, expr:'calm', talk:true, acts:[[0,'explain'],[1.6,'plead',.7]]}] },

    /* 6 — his question: a thought of a golden sun (Karna, son of Surya) */
    { line:'फिर भी दुनिया सिर्फ़ कर्ण को ही महादानी क्यों कहती है?"', mood:'calm', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{from:[250,620,1.5],to:[300,620,1.15]},
      ...BG({sky:'noon', sun:[420,190,34], hills:'green'}), front:()=>THINKB(390,520,1.1,VIS_SUN(),.5),
      cast:[{c:ARJUNA, x:200, y:880, s:1.0, expr:'calm', talk:true, acts:[[0,'plead'],[2.0,'lookUp',.8]]}] },

    /* 7 — Krishna answers, gently */
    { line:'कृष्ण ने कहा, "पार्थ, समय आने पर तुम्हें इसका उत्तर मिल जाएगा।"', mood:'hope', fx:'petals', tr:'glow', capTop:130,
      cam:{keys:[[0,250,700,1.4],[3.2,262,640,2.4]]},
      ...BG({sky:'noon', sun:[420,190,34], hills:'green', clouds:false}),
      cast:[{c:KRISHNA, x:250, y:880, s:1.02, expr:'serene', talk:true, acts:[[0,'stand'],[1.0,'bless',.8]]}] },

    /* 8 — next morning: Krishna raises his hand, a faint shimmer gathers */
    { line:'अगले ही दिन श्री कृष्ण ने अपनी माया से', mood:'divine', fx:'sparks', tr:'iris', trAt:[270,700], capTop:130,
      cam:{keys:[[0,270,780,1.25],[2.6,270,620,1.05]]},
      ...BG({sky:'morn', sun:[420,170,34], hills:'green'}), front:()=>A('pulse:2.2',`<ellipse cx="150" cy="680" rx="150" ry="150" fill="url(#gw)" opacity=".45"/>`)+GOLDMOTES(130,640,200,420,8),
      cast:[{c:KRISHNA, x:140, y:880, s:1.05, expr:'serene', acts:[[0,'stand'],[0.8,'armUp',1.0]]}] },

    /* 9 — THE maya: both hills turn into shining gold */
    { line:'पास की दो पहाड़ियों को शुद्ध सोने में बदल दिया।', mood:'divine', fx:'sparks', tr:'glow', capTop:130,
      cam:{keys:[[0,270,700,1.0],[4.2,270,600,1.12]]}, sfx:[[0.5,'shimmer',.5],[2.4,'bell',.35]],
      ...BG({sky:'morn', sun:[420,170,34], hills:'morph', at:.5, dur:2.0}),
      front:()=>A('fadein:1:2',GOLDWAVE(270,760,300))+A('fadein:1.2:1.6',GOLDMOTES(200,560,270,800,12)),
      cast:[{c:KRISHNA, x:110, y:890, s:.85, expr:'serene', acts:[[0,'armUp']]}] },

    /* 10 — he calls Arjuna, who walks in staring up at the gold */
    { line:'उन्होंने अर्जुन को बुलाया और कहा,', mood:'divine', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{from:[240,640,1.2],to:[300,630,1.2]},
      ...BG({sky:'noon', sun:[420,190,34], hills:'gold'}), front:()=>GOLDMOTES(100,560,100,820,6),
      cast:[{c:KRISHNA, x:360, y:880, s:1.02, flip:true, expr:'smile', talk:true, acts:[[0,'stand'],[0.6,'give',.8]]},
            {c:ARJUNA, x:150, y:880, s:.95, expr:'surprise', walk:{from:-240,dur:2.0}, acts:[[0,'stand'],[2.2,'lookUp',.8]]}] },

    /* 11 — the deadline: Krishna points at the hills; the sun's dotted path shows how little time there is */
    { line:'"अर्जुन, इन दोनों सोने के पहाड़ों को आज सूर्यास्त से पहले', mood:'divine', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.0],[3.6,270,640,1.2]]},
      ...BG({sky:'honey', sun:[300,300,34], hills:'gold', arc:true}),
      cast:[{c:KRISHNA, x:150, y:880, s:1.02, expr:'serene', talk:true, acts:[[0,'stand'],[0.6,'point',.7]]},
            {c:ARJUNA, x:350, y:880, s:.95, flip:true, expr:'calm', acts:[[0,'stand'],[0.9,'lookUp',.8]]}] },

    /* 12 — share it equally among the villagers (the village looks on) */
    { line:'इस गाँव के लोगों में बराबर-बराबर बाँट दो।"', mood:'hope', fx:'dust', tr:'dissolve', capTop:130,
      cam:{from:[340,650,1.15],to:[220,650,1.15]},
      ...BG({sky:'honey', sun:[360,330,34], hills:'gold', lit:false}),
      cast:[{c:KRISHNA, x:90, y:880, s:.98, expr:'smile', talk:true, acts:[[0,'stand'],[0.5,'offer',.8]]},
            VM(0,250,830,.6,{flip:true,expr:'calm',acts:[[0,'lookUp']]}), VW(1,310,845,.64,{flip:true,expr:'smile',acts:[[0,'stand']]}),
            VM(2,375,832,.6,{flip:true,expr:'smile',acts:[[0,'lookUp']]}), VK(1,430,860,{flip:true,expr:'smile',acts:[[0,'lookUp']]}), VW(3,480,835,.62,{flip:true,expr:'calm',acts:[[0,'stand']]})] },

    /* 13 — Arjuna is delighted and calls everyone; villagers stream in from both sides */
    { line:'अर्जुन खुश हो गए। उन्होंने तुरंत पूरे गाँव को इकट्ठा किया।', mood:'joy', fx:'dust', tr:'dissolve', capTop:130,
      cam:{from:[270,680,1.0],to:[270,640,1.2]},
      ...BG({sky:'honey', sun:[360,330,34], hills:'gold'}),
      cast:[{c:ARJUNA, x:270, y:885, s:1.0, expr:'smile', talk:true, acts:[[0,'stand'],[0.5,'armUp',.8],[2.6,'bless',.7]]},
            VM(0,110,845,.62,{expr:'smile',walk:{from:-220,dur:2.4,delay:.3}}), VW(1,175,830,.58,{expr:'smile',walk:{from:-240,dur:2.6,delay:.5}}), VK(0,60,870,{expr:'smile',walk:{from:-200,dur:2.2}}),
            VM(3,440,845,.62,{flip:true,expr:'smile',walk:{from:240,dur:2.4,delay:.3}}), VW(2,380,830,.58,{flip:true,expr:'smile',walk:{from:240,dur:2.6,delay:.6}}), VK(2,490,872,{flip:true,expr:'smile',walk:{from:200,dur:2.2}})] },

    /* 14 — he climbs the gold hill with the kudal (the camera tilts up with him) */
    { line:'वो खुद पहाड़ पर चढ़ गए और कुदाल लेकर', mood:'hope', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,180,780,1.4],[3.4,150,560,1.3]]},
      ...BG({sky:'honey', sun:[360,330,34], hills:'gold'}),
      cast:[{c:ARJUNA, x:170, y:700, s:.55, expr:'smile', props:{front:'kudal'}, walk:{from:-130,dur:3.0}, acts:[[0,'stand'],[0.4,{a:[20,40],b:[-14,30],lean:10}]]},
            VM(0,300,850,.62,{flip:true,expr:'smile',acts:[[0,'lookUp']]}), VW(1,370,862,.66,{flip:true,expr:'smile',acts:[[0,'lookUp']]}), VM(2,450,848,.6,{flip:true,expr:'smile',acts:[[0,'lookUp']]})] },

    /* 15 — he digs and digs, handing gold to the villagers below */
    { line:'सोना खोद-खोद कर ग्रामीणों को देने लगे।', mood:'joy', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,230,640,1.5],[3.2,250,680,1.3]]},
      ...BG({sky:'honey', sun:[360,330,34], hills:'gold'}),
      front:()=>KUDAL_SWING(244,626,.55,-10,80,1.5,false)+GOLDMOTES(250,640,330,740,10),
      cast:[{c:ARJUNA, x:170, y:700, s:.6, expr:'smile', acts:[[0,DIG]]},
            VM(0,310,770,.5,{flip:true,expr:'smile',acts:[[0,'give']]}), VW(1,370,790,.54,{flip:true,expr:'smile',acts:[[0,'give']]}), VM(3,430,770,.5,{flip:true,expr:'smile',acts:[[0,'give']]}), VK(1,480,800,{flip:true,expr:'smile',acts:[[0,'give']]})] },

    /* 16 — afternoon turns to evening: the sun slides down the sky, the sky warms */
    { line:'दोपहर से शाम हो गई।', mood:'hope', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,560,1.05],[3.0,270,600,1.0]]},
      sky:()=>SKIES.sunset()+A('fadeout:.4:2.4',SKIES.honey())+SKYCLOUDS('#ffd9c0'),
      far:()=>ARC()+A('slide:60:-330:3:0',SUN(320,560,38,true))+RIDGE('#c8b0b8')+TWINS('gold')+PITS(9,1),
      mid:()=>VILLAGE(true), art:()=>GROUND('#b8b860','#e0b472'),
      front:()=>A('fadein:.6:2.4',WARM(.14)),
      cast:[{c:ARJUNA, x:160, y:700, s:.5, expr:'sad', acts:[[0,DIG]]},
            VM(0,340,860,.58,{flip:true,expr:'smile',acts:[[0,'stand']]}), VW(2,420,845,.56,{flip:true,expr:'smile',acts:[[0,'stand']]})],
      },

    /* 17 — Arjuna is worn out (close-up, sweat), leaning on the kudal */
    { line:'अर्जुन थक कर चूर हो गए,', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,740,1.3],[2.6,262,660,2.1]]},
      ...BG({sky:'sunset', sun:[310,560,38], hills:'gold', ridge:'#c8b0b8'}), front:()=>WARM(.12)+A('drift:6:46:1.6',`<path d="M222 598 q-5 10 0 16 q5 -6 0 -16Z" fill="#cfeaff" opacity=".9"/>`)+A('drift:-4:50:2',`<path d="M250 590 q-5 10 0 16 q5 -6 0 -16Z" fill="#cfeaff" opacity=".9"/>`),
      cast:[{c:ARJUNA, x:270, y:900, s:1.1, expr:'sad', props:{front:'kudal'}, acts:[[0,'stand'],[0.5,TIRED]]}] },

    /* 18 — pull-back: the pits fill up again, the mountain is exactly as tall as before */
    { line:'लेकिन सोने का पहाड़ ज़रा भी कम नहीं हुआ।', mood:'divine', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,150,620,2.1],[4.0,270,540,1.0]]},
      ...BG({sky:'sunset', sun:[310,590,38], hills:'gold', ridge:'#c8b0b8', pits:[.4,2.0]}), front:()=>WARM(.1),
      cast:[{c:ARJUNA, x:150, y:690, s:.5, expr:'sad', acts:[[0,TIRED]]},
            VM(0,300,850,.6,{flip:true,expr:'calm',acts:[[0,'lookUp']]}), VW(1,370,865,.64,{flip:true,expr:'calm',acts:[[0,'lookUp']]})],
      sfx:[[1.4,'shimmer',.4]] },

    /* 19 — he gives up the dig: "Madhav, I am tired" */
    { line:'थक-हार कर अर्जुन बोले, "माधव, मैं थक गया हूँ।', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{from:[190,650,1.3],to:[300,650,1.3]},
      ...BG({sky:'sunset', sun:[300,610,38], hills:'gold', ridge:'#c8b0b8'}), front:()=>WARM(.12),
      cast:[{c:ARJUNA, x:160, y:885, s:.98, expr:'sad', talk:true, props:{front:'kudal'}, acts:[[0,TIRED]]},
            {c:KRISHNA, x:390, y:880, s:.98, flip:true, expr:'serene', acts:[[0,'stand']]}] },

    /* 20 — the sun touches the horizon between the two hills: the deadline */
    { line:'सूर्यास्त होने वाली है, लेकिन यह काम असंभव है।"', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,230,760,1.25],[3.8,270,680,1.6]]}, sfx:[[2.6,'bell',.3]],
      ...BG({sky:'sunset', sun:[270,694,38], sunSlide:[0,-60,3.4], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.14),
      cast:[{c:ARJUNA, x:130, y:900, s:1.05, expr:'sad', props:{front:'kudal'}, acts:[[0,TIRED],[1.4,{a:[10,12],b:[12,60],lean:10,head:6}]]}] },

    /* 21 — Krishna calls Karna, who walks in from the right in golden kavach */
    { line:'अब श्री कृष्ण ने कर्ण को बुलाया।', mood:'hope', fx:'sparks', tr:'glow', capTop:130,
      cam:{from:[240,650,1.2],to:[300,650,1.2]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.12),
      cast:[{c:KRISHNA, x:150, y:880, s:1.02, expr:'smile', talk:true, acts:[[0,'stand'],[0.4,'give',.8]]},
            {c:KARNA, x:380, y:885, s:1.02, flip:true, expr:'serene', walk:{from:260,dur:2.4}, acts:[[0,'stand']]}] },

    /* 22 — he tells Karna the same thing */
    { line:'उन्होंने कर्ण से भी वही बात कही,', mood:'hope', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{from:[270,680,1.35],to:[270,650,1.6]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.12),
      cast:[{c:KRISHNA, x:170, y:880, s:1.05, expr:'smile', talk:true, acts:[[0,'explain']]},
            {c:KARNA, x:360, y:880, s:1.05, flip:true, expr:'serene', acts:[[0,'namaste']]}] },

    /* 23 — close-up on Karna listening: calm face, kundal swinging */
    { line:'"कर्ण, इन दो सोने के पहाड़ों को ग्रामीणों में बाँट दो।"', mood:'divine', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,330,720,1.5],[3.0,338,640,2.6]]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0', clouds:false}), front:()=>WARM(.1),
      cast:[{c:KARNA, x:340, y:885, s:1.08, flip:true, expr:'serene', acts:[[0,'namaste'],[2.4,{a:[28,112],b:[22,118],hand:'namaste',handB:'namaste',head:-8,lean:6}]]}] },

    /* 24 — Karna does not pick up the kudal (it lies on the ground) */
    { line:'कर्ण ने ना तो कुदाल उठाई', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,230,860,1.9],[2.8,300,700,1.2]]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.12),
      art:()=>GROUND('#b8b860','#e0b472')+KUDAL_LYING(120,892,1.1,-4),
      cast:[{c:KARNA, x:340, y:885, s:1.0, flip:true, expr:'serene', acts:[[0,'lookDown',.5],[1.6,'stand',.8]]}] },

    /* 25 — and does not line the villagers up: they just stand about, waiting */
    { line:'और ना ही ग्रामीणों की लाइन लगवाई।', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{from:[170,680,1.15],to:[330,680,1.15]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.12),
      cast:[VM(0,70,840,.62,{expr:'calm',acts:[[0,'lookUp']]}), VW(1,150,872,.7,{expr:'calm',acts:[[0,'stand']]}), VM(3,225,830,.58,{expr:'calm',acts:[[0,'lookUp']]}),
            VK(1,290,876,{expr:'calm',acts:[[0,'lookUp']]}), VW(2,350,838,.6,{flip:true,expr:'calm',acts:[[0,'stand']]}), VM(4,425,866,.7,{flip:true,expr:'calm',acts:[[0,'lookUp']]}),
            {c:KARNA, x:490, y:885, s:1.0, flip:true, expr:'serene', acts:[[0,'stand']]}] },

    /* 26 — Karna looks kindly at the villagers */
    { line:'उन्होंने गाँव वालों को देखा और कहा,', mood:'hope', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,300,700,1.2],[3.0,320,660,1.55]]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.12),
      cast:[VM(0,90,850,.62,{expr:'smile',acts:[[0,'lookUp']]}), VW(1,170,868,.68,{expr:'smile',acts:[[0,'stand']]}), VK(2,235,880,{expr:'smile',acts:[[0,'lookUp']]}),
            {c:KARNA, x:370, y:885, s:1.05, flip:true, expr:'smile', acts:[[0,'lookAway'],[0.8,'stand',.7]]}] },

    /* 27 — THE moment: "these two golden mountains are all yours" */
    { line:'"गाँववासियों, ये दोनों सोने के पहाड़ आप सबके हैं।', mood:'divine', fx:'sparks', tr:'glow', capTop:130,
      cam:{keys:[[0,300,720,1.15],[4.0,290,650,1.45]]}, sfx:[[0.6,'shimmer',.4]],
      sky:()=>SKIES.sunset()+SUNRAYS(270,694,16,900,'#fff0c0',.12), far:BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}).far, mid:()=>VILLAGE(true), art:()=>GROUND('#b8b860','#e0b472'),
      front:()=>WARM(.1)+GOLDMOTES(270,640,270,840,10),
      cast:[VM(0,70,860,.7,{expr:'calm',acts:[[0,'lookUp']]}), VW(1,140,878,.74,{expr:'smile',acts:[[0,'lookUp']]}), VM(3,205,850,.66,{expr:'calm',acts:[[0,'stand']]}),
            {c:KARNA, x:360, y:885, s:1.1, flip:true, expr:'serene', talk:true, aura:'saf', acts:[[0,'stand'],[0.8,'offer',1.0]]}] },

    /* 28 — "take what you need": the villagers rush for the gold; a wave of gold light rolls over the village */
    { line:'जिसे जितना चाहिए, आकर ले जाओ।"', mood:'joy', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{from:[270,700,1.1],to:[270,650,1.0]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}),
      front:()=>WARM(.1)+GOLDWAVE(270,800,320)+GOLDMOTES(120,640,90,860,8)+GOLDMOTES(440,640,450,860,8),
      cast:[VM(0,95,850,.66,{flip:true,expr:'smile',walk:{from:150,dur:1.6,delay:.7},acts:[[0,'armUp']]}), VW(1,50,876,.7,{flip:true,expr:'smile',walk:{from:200,dur:1.8,delay:.8},acts:[[0,'armUp']]}),
            VM(2,455,850,.66,{expr:'smile',walk:{from:-170,dur:1.6,delay:.7},acts:[[0,'armUp']]}), VW(3,505,876,.7,{expr:'smile',walk:{from:-210,dur:1.8,delay:.9},acts:[[0,'armUp']]}),
            VK(1,215,892,{flip:true,expr:'smile',walk:{from:120,dur:1.4,delay:.9}}), VK(3,330,892,{expr:'smile',walk:{from:-110,dur:1.4,delay:1}}),
            {c:KARNA, x:270, y:900, s:1.1, flip:true, expr:'serene', acts:[[0,'give',.8]]}] },

    /* 29 — THE shot: Karna walks away, back to camera, towards the sunset; villagers run past him to the gold */
    { line:'इतना कहकर कर्ण वहाँ से बिना पीछे मुड़े चल दिए।', mood:'divine', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.45],[5.0,270,650,1.0]]}, sfx:[[0.4,'bell',.3]],
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}),
      front:()=>WARM(.1)+GOLDMOTES(120,640,100,880,8)+GOLDMOTES(440,640,450,880,8),
      cast:[VM(0,100,880,.82,{flip:true,expr:'smile',walk:{from:180,dur:2.2},acts:[[0,'armUp']]}), VW(1,40,900,.9,{flip:true,expr:'smile',walk:{from:240,dur:2.4,delay:.2},acts:[[0,'armUp']]}),
            VM(3,440,880,.82,{expr:'smile',walk:{from:-180,dur:2.2},acts:[[0,'armUp']]}), VW(2,500,900,.9,{expr:'smile',walk:{from:-240,dur:2.4,delay:.2},acts:[[0,'armUp']]})],
      art:()=>GROUND('#b8b860','#e0b472')+A('slide:0:110:5.4:0.2',KARNA_BACK(270,800,.95)) },

    /* 30 — he does not care who got more or less: tiny Karna keeps walking into the sun while everyone gathers gold */
    { line:'उन्हें इस बात से कोई फ़र्क नहीं पड़ा कि किसे ज़्यादा मिला या किसे कम।', mood:'hope', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,150,700,1.1],[5.0,390,700,1.1]]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}),
      front:()=>WARM(.1),
      art:()=>GROUND('#b8b860','#e0b472')+A('slide:0:30:6:0',KARNA_BACK(270,758,.3))+GOLDPILE(90,880,1.1)+GOLDPILE(300,900,.6)+GOLDPILE(450,872,.9),
      cast:[VM(0,60,850,.66,{expr:'smile',acts:[[0,'give']]}), VW(1,150,872,.7,{expr:'smile',acts:[[0,'bless']]}), VM(3,225,845,.6,{expr:'smile',acts:[[0,'give']]}), VK(2,390,892,{flip:true,expr:'smile',acts:[[0,'bless']]}),
            VW(2,360,850,.6,{flip:true,expr:'smile',acts:[[0,'namaste']]}), VM(4,495,866,.7,{flip:true,expr:'smile',acts:[[0,'give']]})] },

    /* 31 — Arjuna, stunned, the kudal still in his hand (slow push-in to his face) */
    { line:'अर्जुन ने यह देखकर स्तब्ध रह गए।', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.15],[3.8,262,626,2.5]]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.1)+GOLDMOTES(270,640,260,840,10),
      cast:[{c:ARJUNA, x:262, y:900, s:1.1, expr:'surprise', props:{front:'kudal'}, acts:[[0,'stand'],[0.8,{a:[10,12],b:[-4,10],lean:-4,head:4}]]}] },

    /* 32 — Krishna puts his hand on Arjuna's shoulder (Arjuna first, so the hand is drawn over his shoulder) */
    { line:'तब श्री कृष्ण ने अर्जुन के कंधे पर हाथ रखा और कहा,', mood:'hope', fx:'petals', tr:'glow', capTop:130,
      cam:{keys:[[0,300,720,1.2],[3.6,330,660,1.75]]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.1),
      cast:[{c:ARJUNA, x:360, y:895, s:1.0, expr:'sad', props:{front:'kudal'}, acts:[[0,'stand'],[0.6,'lookDown',.8]]},
            {c:KRISHNA, x:262, y:895, s:1.0, expr:'smile', talk:true, acts:[[0,'stand'],[0.8,{a:[88,8],b:[-6,8],head:2,hand:'open'},.8]]}] },

    /* 33 — "you thought of yourself as the giver" */
    { line:'"पार्थ, तुम सोना बाँटते समय खुद को दाता, दान देने वाला समझ रहे थे।', mood:'hope', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,320,700,1.5],[4.4,300,640,2.0]]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0', clouds:false}), front:()=>WARM(.1),
      cast:[{c:ARJUNA, x:360, y:895, s:1.0, expr:'sad', props:{front:'kudal'}, acts:[[0,'lookDown']]},
            {c:KRISHNA, x:262, y:895, s:1.0, expr:'smile', talk:true, acts:[[0,{a:[88,8],b:[-6,8],head:2,hand:'open'}]]}] },

    /* 34 — "your focus was how much you were giving" (a picture of counted gold above his head) */
    { line:'तुम्हारा ध्यान इस बात पर था कि तुम कितना दे रहे हो।', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{from:[310,660,1.3],to:[320,640,1.15]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.1)+THINKB(372,470,1.0,VIS_COINS(),.4),
      cast:[{c:ARJUNA, x:360, y:895, s:1.0, expr:'sad', props:{front:'kudal'}, acts:[[0,'lookDown']]},
            {c:KRISHNA, x:262, y:895, s:1.0, expr:'smile', talk:true, acts:[[0,{a:[88,8],b:[-6,8],head:2,hand:'open'}]]}] },

    /* 35 — "but Karna had no attachment to the gold": Karna far away on the road, tiny, glowing, in the last light */
    { line:'लेकिन कर्ण को सोने से कोई मोह नहीं था।', mood:'divine', fx:'sparks', tr:'glow', capTop:130,
      cam:{keys:[[0,270,740,1.5],[4.0,270,690,1.15]]},
      sky:()=>SKIES.sunset()+SUNRAYS(270,700,16,900,'#fff0c0',.12), far:BG({sky:'sunset', sun:[270,704,40], hills:'gold', ridge:'#d8aab0'}).far, mid:()=>VILLAGE(true), art:()=>GROUND('#b8b860','#e0b472')+A('slide:0:20:5:0',KARNA_BACK(270,762,.34)),
      front:()=>WARM(.1)+GOLDMOTES(270,700,270,820,8) },

    /* 36 — "he gave everything to the community": happy villagers with gold in their hands */
    { line:'उसने खुद को कर्ता नहीं माना, बल्कि सब कुछ समाज को सौंप दिया।', mood:'joy', fx:'petals', tr:'dissolve', capTop:130,
      cam:{from:[200,700,1.2],to:[360,690,1.2]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.1)+GOLDMOTES(100,760,120,880,6)+GOLDMOTES(420,760,440,880,6),
      art:()=>GROUND('#b8b860','#e0b472')+GOLDPILE(110,905,.9)+GOLDPILE(430,900,.8),
      cast:[VW(1,60,880,.82,{expr:'smile',acts:[[0,'namaste']]}), VM(0,140,860,.75,{expr:'smile',acts:[[0,'bless']]}), VK(1,200,892,{expr:'smile',acts:[[0,'armUp']]}),
            VW(2,300,850,.66,{flip:true,expr:'smile',acts:[[0,'namaste']]}), VM(3,375,870,.78,{flip:true,expr:'smile',acts:[[0,'bless']]}), VK(3,440,894,{flip:true,expr:'smile',acts:[[0,'armUp']]}), VM(4,495,858,.7,{flip:true,expr:'smile',acts:[[0,'namaste']]})] },

    /* 37 — "that is the difference between a donor and a mahadani": Arjuna folds his hands, the kudal lies at his feet */
    { line:'यही फ़र्क है एक दानी और महादानी में।', mood:'hope', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.2],[3.2,270,660,1.5]]},
      ...BG({sky:'sunset', sun:[270,694,38], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.1),
      art:()=>GROUND('#b8b860','#e0b472')+KUDAL_LYING(120,905,1.0,-4),
      cast:[{c:ARJUNA, x:300, y:895, s:1.0, expr:'calm', acts:[[0,'lookDown'],[1.6,'pranam',.9]]},
            {c:KRISHNA, x:200, y:895, s:1.0, expr:'smile', talk:true, acts:[[0,{a:[88,8],b:[-6,8],head:2,hand:'open'}]]}] },

    /* 38 — the last line: warm sunset over the village, Arjuna and Krishna side by side, the sun sinking behind the golden hills */
    { line:'सच्चा दान वो है, जिसमें देने का अहंकार ना हो।"', mood:'hope', fx:'petals', tr:'glow', capTop:130,
      cam:{keys:[[0,270,660,1.5],[6.0,270,600,1.0]]},
      ...BG({sky:'sunset', sun:[270,704,40], hills:'gold', ridge:'#d8aab0'}), front:()=>WARM(.12)+GOLDMOTES(120,640,100,860,8)+GOLDMOTES(440,640,450,860,8),
      cast:[{c:KRISHNA, x:200, y:885, s:1.0, expr:'smile', talk:true, acts:[[0,'stand'],[1.4,'bless',.9]]},
            {c:ARJUNA, x:340, y:885, s:.98, flip:true, expr:'serene', acts:[[0,'pranam'],[2.6,'namaste',.9]]}] }
  ]
});
