/* हनुमान जी और श्री राम का मिलन — Short, about 85 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js hanuman-ram-milan-short-form
   Look: Rishyamuk mountain + forest path near Kishkindha. Soft morning mist (sage-teal + pale cream) that warms shot by shot into gold,
         ending in one huge white-gold glow. Front-facing rig; facing:'side' only for the two walking shots.
   Story beat: a disguise, not a fight. Hanuman (as a Brahmin) sees Ram's loving face, understands it is Narayan, and bows.
   Safety: Vali is only a distant stern silhouette on a far cliff (never fighting). No battle, no blood.
   No hook text, no intro, no end card: the picture just ends on the glow. Music: the owner's track. */

/* ---------- own pieces (new for this video) ---------- */
const MIST_SKY = ()=>skyBand([[0,'#86b4b2'],[.4,'#bcd8c4'],[.72,'#efe8bc'],[1,'#fbeec0']])+
  `<circle cx="360" cy="470" r="240" fill="url(#gw)" opacity=".5"/><circle cx="360" cy="470" r="48" fill="#fff6d2" opacity=".9"/><circle cx="360" cy="470" r="70" fill="#fff6d2" opacity=".25"/>`;
const MORN_SKY = ()=>skyBand([[0,'#9cc4b4'],[.38,'#d8e2b0'],[.7,'#f8dfa0'],[1,'#ffe8b0']])+
  `<circle cx="300" cy="520" r="260" fill="url(#gw)" opacity=".65"/><circle cx="300" cy="520" r="54" fill="#fff4c8"/>`;
const GOLD_SKY = ()=>skyBand([[0,'#f0b868'],[.4,'#f9d68a'],[.75,'#ffeaa8'],[1,'#fff6d2']])+
  `<circle cx="270" cy="560" r="330" fill="url(#gw)" opacity=".8"/><circle cx="270" cy="560" r="64" fill="#fffbe6"/>`;

/* small birds crossing the sky */
const FLOCK = (y,n)=>{ let o=''; for(let i=0;i<(n||4);i++) o+=A(`drift:${380+i*26}:${-30+i*10}:${6+i}`,`<path transform="translate(${30+i*58} ${y+(i%2)*26})" d="M-9 0 Q-4.5 -7 0 0 Q4.5 -7 9 0" stroke="#4a5a52" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`); return o; };

/* wide rolling mist bands (three layers drift at different speeds) */
const FOG = (y,op,col)=>{ const c=col||'#f4f1dc';
  return A('drift:130:0:19',`<ellipse cx="80" cy="${y}" rx="230" ry="30" fill="${c}" opacity="${op}"/><ellipse cx="420" cy="${y+22}" rx="260" ry="26" fill="${c}" opacity="${op*.85}"/>`)+
         A('drift:-90:0:15',`<ellipse cx="250" cy="${y-30}" rx="250" ry="22" fill="${c}" opacity="${op*.7}"/><ellipse cx="520" cy="${y-10}" rx="180" ry="20" fill="${c}" opacity="${op*.6}"/>`); };

/* a round-canopy tree; rows of them make a forest */
function TREE(x,y,s,col,dk){ return `<path d="M${r1(x-7*s)} ${y} Q${r1(x-4*s)} ${r1(y-90*s)} ${r1(x-3*s)} ${r1(y-150*s)} L${r1(x+3*s)} ${r1(y-150*s)} Q${r1(x+5*s)} ${r1(y-90*s)} ${r1(x+8*s)} ${y}Z" fill="${dk}"/>`+
  [[0,-196,54],[-38,-160,42],[36,-162,44],[0,-240,40],[-14,-120,36],[20,-124,34]].map(([dx,dy,r])=>`<circle cx="${r1(x+dx*s)}" cy="${r1(y+dy*s)}" r="${r1(r*s)}" fill="${col}"/>`).join(''); }
function FOREST(y,col,dk,n,sc,off){ let s=''; for(let i=0;i<n;i++){ const x=(off||0)+i*(560/(n-1))-10, k=sc*(0.82+((i*7)%4)*.12); s+=TREE(r1(x),y+((i*5)%3)*8,k,col,dk); } return s; }

/* Rishyamuk: a rocky peak with a sunlit right face, ridge lines and a few boulders */
function PEAK(cx,top,base,w,col,hi){ const h=base-top;
  const p=`M${cx-w} ${base} L${cx-w*.58} ${top+h*.46} L${cx-w*.3} ${top+h*.3} L${cx-w*.12} ${top+h*.12} L${cx} ${top} L${cx+w*.22} ${top+h*.2} L${cx+w*.4} ${top+h*.34} L${cx+w*.68} ${top+h*.55} L${cx+w} ${base}Z`;
  return `<path d="${p}" fill="${col}"/>`+
    `<path d="M${cx} ${top} L${cx+w*.22} ${top+h*.2} L${cx+w*.4} ${top+h*.34} L${cx+w*.68} ${top+h*.55} L${cx+w} ${base} L${cx+w*.2} ${base} L${cx+w*.1} ${top+h*.5}Z" fill="${hi}" opacity=".55"/>`+
    `<path d="M${cx-w*.12} ${top+h*.12} L${cx-w*.2} ${top+h*.5} M${cx+w*.05} ${top+h*.3} L${cx-w*.02} ${top+h*.7} M${cx-w*.4} ${top+h*.5} L${cx-w*.46} ${top+h*.85}" stroke="#2a4038" stroke-width="3" opacity=".35" fill="none" stroke-linecap="round"/>`+
    `<path d="M${cx-w*.12} ${top+h*.12} L${cx} ${top} L${cx+w*.22} ${top+h*.2}" stroke="#fff4c8" stroke-width="3" fill="none" opacity=".8"/>`; }

/* forest floor with a dusty path (ground line at y) */
const FLOOR = (y,tone)=>{ const g=tone||'#6b9556';
  return `<path d="M-20 ${y} Q270 ${y-26} 560 ${y-8} L560 1000 L-20 1000Z" fill="${g}"/><path d="M-20 ${y+40} Q270 ${y+10} 560 ${y+30} L560 1000 L-20 1000Z" fill="#fff" opacity=".07"/>`+
  `<path d="M205 ${y-14} Q270 ${y-18} 338 ${y-12} L640 1000 L-110 1000Z" fill="#d2b078"/><path d="M205 ${y-14} L-110 1000 M338 ${y-12} L640 1000" stroke="#8a6a3a" stroke-width="3" opacity=".4"/>`+
  `<path d="M240 ${y+30} L120 1000 M300 ${y+30} L380 1000" stroke="#b8905a" stroke-width="2" opacity=".35"/>`; };

/* big boulders in front of someone hiding / peeking (x0..x1 = how wide the pile is) */
function CRAG(top,x0,x1,col,hi){ const w=x1-x0; let s=`<path d="M${x0-40} 1000 L${x0-40} ${top+60} Q${x0+w*.12} ${top-8} ${x0+w*.3} ${top+12} Q${x0+w*.5} ${top-26} ${x0+w*.7} ${top+6} Q${x0+w*.9} ${top-14} ${x1+40} ${top+50} L${x1+40} 1000Z" fill="${col}"/>`;
  s+=`<path d="M${x0+w*.1} ${top+4} Q${x0+w*.3} ${top-10} ${x0+w*.5} ${top-20}" stroke="${hi}" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/><path d="M${x0+w*.55} ${top-14} Q${x0+w*.8} ${top-8} ${x1} ${top+34}" stroke="${hi}" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>`;
  s+=`<path d="M${x0} ${top+90} L${x0+w*.2} ${top+170} M${x0+w*.55} ${top+60} L${x0+w*.45} ${top+160} M${x1-30} ${top+80} L${x1-60} ${top+190}" stroke="#000" stroke-width="3" opacity=".22" fill="none"/>`;
  return s; }

/* a far cliff ledge (Vali's silhouette stands on it) */
const CLIFF = (x,y,w)=>`<path d="M${x-w} 1000 L${x-w} ${y+90} L${x-w*.6} ${y+40} L${x-w*.35} ${y+8} L${x-w*.1} ${y} L${x+w*.45} ${y} L${x+w*.7} ${y+30} L${x+w} ${y+80} L${x+w} 1000Z" fill="#33403a"/>`+
  `<path d="M${x-w*.35} ${y+8} L${x-w*.1} ${y} L${x+w*.45} ${y}" stroke="#ffe7a0" stroke-width="3" fill="none" opacity=".8"/><path d="M${x-w*.5} ${y+120} L${x-w*.46} ${y+300} M${x+w*.2} ${y+60} L${x+w*.3} ${y+260}" stroke="#000" stroke-width="3" opacity=".25"/>`;

/* tall near trunks + light shafts for the forest close-ups */
const TRUNKS = (col)=>[[24,60],[140,34],[430,44],[512,70]].map(([x,w])=>`<rect x="${x-w/2}" y="-20" width="${w}" height="1100" fill="${col||'#3f5a40'}"/><rect x="${x-w/2}" y="-20" width="${w*.28}" height="1100" fill="#fff" opacity=".06"/>`).join('');
const SHAFTS = (op)=>A('pulse:7',`<path d="M250 -20 L110 1000 L190 1000 L330 -20Z M380 -20 L330 1000 L430 1000 L470 -20Z" fill="#fff6c4" opacity="${op||.2}"/>`);

/* recognition: golden rings that keep growing from the heart */
const RINGS = (x,y,col,n)=>{ let o=''; for(let i=0;i<(n||3);i++) o+=A(`ripple:${3+i*.6}:${x}:${y}`,`<circle cx="${x}" cy="${y}" r="${150+i*30}" fill="none" stroke="${col||'#ffe6a0'}" stroke-width="${4-i}" opacity=".85"/>`); return o; };

/* disguise change: a golden whirl of sparks round the figure that closes in and opens out again */
const WHIRL = (x,y)=>{ let o=`<circle cx="${x}" cy="${y}" r="190" fill="url(#gw)" opacity=".8"/>`;
  for(let i=0;i<14;i++){ const a=i/14*Math.PI*2, rr=70+(i%3)*26; o+=A(`spin:${2.2+i%3*.5}:${x}:${y}`,`<circle cx="${r1(x+Math.cos(a)*rr)}" cy="${r1(y+Math.sin(a)*rr*1.5)}" r="${3+i%3*1.4}" fill="#fff0b0"/>`); }
  return A('spin:6:'+x+':'+y,`<ellipse cx="${x}" cy="${y}" rx="96" ry="170" fill="none" stroke="#ffe08a" stroke-width="3" stroke-dasharray="16 22" opacity=".9"/>`)+o; };

/* the last shot: a huge glow with slow turning rays and pulsing rings (the form behind it is NOT shown) */
const BURST = (x,y,n,len,col,op)=>{ let s=''; for(let i=0;i<n;i++){ const a=(i/n)*Math.PI*2, a2=a+.09; s+=`<path d="M${x} ${y} L${r1(x+Math.cos(a)*len)} ${r1(y+Math.sin(a)*len)} L${r1(x+Math.cos(a2)*len)} ${r1(y+Math.sin(a2)*len)}Z" fill="${col||'#fff6c4'}" opacity="${op||.4}"/>`; } return A('spin:70:'+x+':'+y,s); };
const HUGE_GLOW = (x,y)=>skyBand([[0,'#f6c36a'],[.5,'#fde29a'],[1,'#fff8dc']])+
  BURST(x,y,16,900,'#fff6c4',.38)+
  A('pulse:4',`<circle cx="${x}" cy="${y}" r="420" fill="url(#gw)" opacity=".95"/><circle cx="${x}" cy="${y}" r="260" fill="#fff3bc" opacity=".6"/>`)+
  `<circle cx="${x}" cy="${y}" r="150" fill="#fffbe8" opacity=".9"/>`+
  RINGS(x,y,'#fffbe0',3);

/* silhouette costumes */
const SIL_V = {skin:'#0d0a16', top:'#0d0a16', bottom:'#0d0a16', shin:'#0d0a16', foot:'#0d0a16', face:'#0d0a16', furDark:'#0d0a16', crownCol:'#0d0a16', belt:'#0d0a16', pads:'#0d0a16', earring:false, aura:null};
const SIL_B = {skin:'#0b0912', top:'#0b0912', bottom:'#0b0912', shin:'#0b0912', foot:'#0b0912', sash:'#0b0912', rudra:false, tilak:false, aura:null};

/* ---------- cast helpers ---------- */
const WALKPOSE = [[0,{a:[40,40],b:[-30,40],lean:8}],[0.55,{a:[-30,40],b:[40,40],lean:8}],[1.1,{a:[40,40],b:[-30,40],lean:8}],[1.65,{a:[-30,40],b:[40,40],lean:8}],[2.2,{a:[40,40],b:[-30,40],lean:8}],[2.75,{a:[-30,40],b:[40,40],lean:8}],[3.3,{a:[40,40],b:[-30,40],lean:8}],[3.85,{a:[-30,40],b:[40,40],lean:8}],[4.4,{a:[40,40],b:[-30,40],lean:8}]];
const HANU_PLAIN = {c:HANUMAN, with:{holds:{}}};

/* gentle weight-shift loop so nobody ever freezes: alternates a small lean + drop on top of a base pose (arms from `base`) */
const SW = (base,from,to,step)=>{ const o=[]; let k=0; for(let t=from;t<to;t+=step){ o.push([t,Object.assign({},base,{lean:(k%2?-2.4:2.4),drop:(k%2?0:1.6)}),step*.9]); k++; } return o; };
const B_STAND = {}, B_BOW = {rArmOut:16, rElbow:62};
/* golden ground-glints that keep drifting up (extra life for the quiet shots) */
const GLINTS = (n,col)=>{ let o=''; for(let i=0;i<(n||10);i++) o+=A(`drift:${-60-i*12}:${-260-i*20}:${4+i%5}`,`<circle cx="${(i*97)%540}" cy="${700+(i*53)%260}" r="${2+i%3}" fill="${col||'#fff3b8'}" opacity=".8"/>`); return o; };
const LEAFFALL = (n)=>{ let o=''; for(let i=0;i<(n||8);i++) o+=A(`drift:${-90-i*9}:${240+i*14}:${3.6+i%4}`,`<path transform="translate(${30+(i*67)%480} ${-20-(i%3)*30}) rotate(${i*40})" d="M0 0 Q7 -6 14 0 Q7 6 0 0Z" fill="${i%2?'#9ab45a':'#d6b45a'}" opacity=".85"/>`); return o; };

VIDEO({
  title:'हनुमान जी और श्री राम का मिलन', format:'short', target:85,
  handheld:0.9,
  keywords:['हनुमान','राम','लक्ष्मण','सीता','किष्किंधा','सुग्रीव','बाली','ब्राह्मण','नारायण','कमेंट','सब्सक्राइब'],
  shots:[
    /* 1 — HOOK: the sacred meeting shown first (no text): tight on Ram's glowing halo, a spring pull-back reveals Hanuman kneeling, rays turning, rings, petals */
    { line:'भक्त हनुमान और भगवान राम का मिलन रामायण का सबसे पवित्र क्षण माना जाता है।', mood:'divine', fx:'petals', capTop:130, focus:{at:1.0, sound:'arrive', dur:2.2, duck:.3},
      cam:{keys:[[0,350,610,2.6],[0.9,350,610,2.6],[2.3,290,690,1.05,'spring'],[6.7,300,650,1.3]]},
      sky:()=>GOLD_SKY()+BURST(350,600,16,900,'#fff6c4',.4)+RINGS(350,600,'#fff0b8',3), far:()=>FOREST(780,'#9ab87a','#6f8a58',7,.8,0)+FOG(760,.3,'#fff0c0'), art:()=>FLOOR(905,'#7da35a')+GLINTS(12), near:()=>LEAFFALL(5),
      cast:[
        {c:RAMA, with:{halo:[0,-282,64]}, aura:'gw', x:350, y:930, s:1.08, expr:'smile', props:{front:'bow'}, acts:[[0,B_BOW],[1.4,'bless',.7],[4.2,B_BOW,.7]]},
        {c:HANUMAN, with:{holds:{}}, x:140, y:945, s:1.0, expr:'serene', enter:{fade:.5,rise:50,delay:1.0}, acts:[[0,'kneel+namaste'],[3.0,{drop:46,lean:14,lKnee:30,rKnee:30,lHand:'namaste',rHand:'namaste',lElbow:138,rElbow:138,lArmOut:2,rArmOut:2},.9]]}] },

    /* 2a — rewind: Rishyamuk in the mist, Hanuman on a ledge; parallax crane */
    { line:'लेकिन क्या आप जानते हैं कि जब हनुमान जी पहली बार मिले थे,', mood:'calm', fx:'petals', tr:'whip', capTop:130,
      cam:{keys:[[0,150,520,1.2],[2.0,270,640,1.1],[4.4,300,640,1.5]]},
      sky:()=>MIST_SKY()+FLOCK(250,5), far:()=>hills(600,40,'#9bbdb2',90)+FOG(660,.4), mid:()=>PEAK(120,260,860,300,'#5d7f74','#f6e6a8')+FOREST(870,'#4f7a58','#3a5440',6,.9,0), art:()=>FOG(840,.35)+`<path d="M-20 905 Q270 880 560 900 L560 1000 L-20 1000Z" fill="#6d8a72"/>`, near:()=>FOG(930,.4)+LEAFFALL(5),
      cast:[{...HANU_PLAIN, x:270, y:915, s:1.05, expr:'calm', acts:[[0,'stand'],[1.4,'explain',.8],[3.0,'think',.8]]}] },

    /* 2b — close-up: he cannot place them */
    { line:'तो वे श्री राम को तुरंत पहचान नहीं पाए थे।', mood:'calm', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,660,1.5],[1.5,250,630,1.8],[3.6,290,625,2.1]]},
      sky:MIST_SKY, far:()=>hills(600,40,'#9bbdb2',90)+FOG(660,.4), mid:()=>PEAK(120,260,860,300,'#5d7f74','#f6e6a8'), art:()=>FOG(840,.35)+`<path d="M-20 905 Q270 880 560 900 L560 1000 L-20 1000Z" fill="#6d8a72"/>`, near:()=>FOG(900,.4),
      cast:[{...HANU_PLAIN, x:270, y:915, s:1.05, expr:'calm', exprKeys:[[0,'calm'],[1.2,'surprise'],[2.6,'calm']], acts:[[0,'think'],[1.0,'lookL',.5],[2.0,'lookR',.5],[3.0,'stand',.5]]}] },

    /* 3 — Ram and Lakshman walk, grieving; camera tracks with parallax and lifts */
    { line:'कथा के अनुसार, जब राम और लक्ष्मण सीता जी को खोजते हुए किष्किंधा के पास पहुँचे,', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,120,640,1.15],[3.5,260,620,1.15],[7,380,600,1.25]]},
      sky:MORN_SKY, far:()=>FOREST(720,'#7da38a','#5d806c',7,.7,0)+FOG(700,.4)+FLOCK(260,4), mid:()=>FOREST(790,'#5f8c63','#3f6048',6,1.0,40), art:()=>FLOOR(850), near:()=>FOG(930,.3)+SHAFTS(.12)+LEAFFALL(7),
      cast:[
        {c:LAKSHMAN, facing:'side', x:250, y:915, s:.86, expr:'sad', props:{front:'bow'}, walk:{from:-380, dur:5.5}, acts:WALKPOSE},
        {c:RAMA, facing:'side', x:370, y:925, s:.9, expr:'sad', props:{front:'bow'}, walk:{from:-380, dur:5.5}, acts:WALKPOSE}] },

    /* 4 — Sugriv peeks, afraid: fast push, darting eyes */
    { line:'तो सुग्रीव डर गए कि', mood:'calm', fx:'dust', tr:'whip', capTop:130,
      cam:{keys:[[0,270,700,1.0],[1.2,270,650,1.45],[2.4,270,640,1.8]]},
      sky:MORN_SKY, far:()=>hills(640,40,'#9bbdb2',90)+FOREST(740,'#7da38a','#5d806c',7,.7,10), mid:()=>PEAK(430,300,860,260,'#6a7f6a','#f6e6a8'),
      art:()=>FOG(780,.4), near:()=>LEAFFALL(4),
      cast:[{c:SUGRIV, x:270, y:985, s:1.15, expr:'surprise', enter:{fade:.2,rise:90,delay:.1}, acts:[[0,'stand'],[0.7,'lookL',.3],[1.4,'lookR',.3],[2.0,'lookL',.3]]}],
      front:()=>CRAG(780,-20,560,'#7c6c58','#e8cf98') },

    /* 5 — Vali's stern silhouette far away; camera whips from Sugriv to the cliff, then creeps in */
    { line:'कहीं बाली ने उन्हें मारने के लिए किसी को न भेजा हो।', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,170,720,1.3],[1.4,340,590,1.2,'spring'],[5,350,560,1.55]]},
      sky:()=>MORN_SKY()+`<circle cx="400" cy="480" r="230" fill="url(#gw)" opacity=".7"/>`+A('pulse:4',`<circle cx="400" cy="520" r="120" fill="#fff0b8" opacity=".25"/>`), far:()=>hills(660,36,'#9bbdb2',90)+FOG(660,.35),
      art:()=>CLIFF(410,600,190)+FOG(700,.25), near:()=>LEAFFALL(4),
      cast:[{c:VALI, with:SIL_V, x:410, y:604, s:.66, expr:'angry', acts:[[0,'stand'],[2.0,{lean:3,drop:1},.8],[3.6,{lean:-2},.8]]},
            {c:SUGRIV, x:130, y:1000, s:1.1, expr:'surprise', acts:[[0,'stand'],[0.4,'lookR',.4],[2.5,'lookL',.4]]}],
      front:()=>CRAG(800,-60,250,'#7c6c58','#e8cf98') },

    /* 6 — Sugriv thinks, then points */
    { line:'यह पता लगाने के लिए कि वे कौन हैं,', mood:'calm', fx:'dust', tr:'whip', capTop:130,
      cam:{keys:[[0,200,700,1.2],[1.8,270,670,1.4],[3.4,360,650,1.5]]},
      sky:MORN_SKY, far:()=>hills(640,40,'#9bbdb2',90)+FOREST(740,'#7da38a','#5d806c',7,.7,10), mid:()=>PEAK(100,330,880,260,'#6a7f6a','#f6e6a8'), art:()=>FOG(830,.3)+`<path d="M-20 915 Q270 888 560 910 L560 1000 L-20 1000Z" fill="#7a8a62"/>`, near:()=>LEAFFALL(5),
      cast:[{c:SUGRIV, x:250, y:925, s:1.1, expr:'calm', talk:true, acts:[[0,'explain'],[1.2,'think',.6],[2.3,'point',.5]]}] },

    /* 7 — he sends Hanuman, who bows and strides off */
    { line:'सुग्रीव ने अपने सबसे बुद्धिमान मंत्री यानी हनुमान जी को भेजा।', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,140,690,1.2],[2.6,150,690,1.15],[3.6,380,660,1.3],[5.5,430,650,1.45]]},
      sky:MORN_SKY, far:()=>hills(640,40,'#9bbdb2',90)+FOREST(740,'#7da38a','#5d806c',7,.7,10), mid:()=>PEAK(100,330,880,260,'#6a7f6a','#f6e6a8'), art:()=>FOG(830,.3)+`<path d="M-20 915 Q270 888 560 910 L560 1000 L-20 1000Z" fill="#7a8a62"/>`, near:()=>LEAFFALL(5),
      cast:[{c:SUGRIV, x:140, y:925, s:1.05, expr:'calm', talk:true, acts:[[0,'point'],[1.8,'explain',.6]]},
            {...HANU_PLAIN, x:390, y:935, s:1.0, expr:'serene', acts:[[0,'stand'],[3.0,'namaste',.5],[4.4,'stand',.5]]}] },

    /* 8 — the change: a golden whirl, spinning sparks, camera pushes in and shakes at the flash */
    { line:'हनुमान जी एक ब्राह्मण का वेश बदलकर', mood:'divine', fx:'sparks', tr:'glow', capTop:130, shake:[1.5,.6,3],
      cam:{keys:[[0,270,720,1.0],[1.5,270,690,1.5],[2.0,270,670,1.25,'spring'],[3.4,270,650,1.35]]},
      sky:MORN_SKY, far:()=>hills(640,40,'#9bbdb2',90)+FOREST(740,'#7da38a','#5d806c',7,.7,10), art:()=>FOG(830,.3)+FLOOR(880,'#6b9556')+GLINTS(10),
      cast:[{...HANU_PLAIN, x:270, y:925, s:1.05, expr:'calm', exit:{at:1.7,fade:.7}, acts:[[0,'stand'],[0.6,'fist',.5]]},
            {c:HANUMAN_BRAHMIN, x:270, y:925, s:1.05, expr:'calm', enter:{fade:.8,delay:1.4}, acts:[[0,'stand'],[2.6,'namaste',.5]]}],
      front:()=>A('fadein:.3:.5',A('fadeout:2.4:.9',WHIRL(270,700)+WHIRL(270,700))) },

    /* 9 — as a Brahmin he walks up (profile walk), camera drifts with him */
    { line:'उनके पास आए और उनकी परीक्षा लेने लगे।', mood:'calm', fx:'dust', tr:'whip', capTop:130,
      cam:{keys:[[0,150,650,1.2],[2.8,270,640,1.15],[3.6,330,640,1.3]]},
      sky:MORN_SKY, far:()=>FOREST(720,'#7da38a','#5d806c',7,.7,0)+FOG(700,.35), mid:()=>FOREST(790,'#5f8c63','#3f6048',6,1.0,40), art:()=>FLOOR(850), near:()=>FOG(930,.25)+SHAFTS(.1)+LEAFFALL(6),
      cast:[
        {c:LAKSHMAN, x:455, y:890, s:.8, expr:'calm', props:{front:'bow'}, acts:[[0,B_BOW],...SW(B_BOW,.8,3.6,1.2)]},
        {c:RAMA, x:370, y:925, s:.9, expr:'sad', props:{front:'bow'}, acts:[[0,B_BOW],[2.2,'lookL',.6]]},
        {c:HANUMAN_BRAHMIN, facing:'side', x:150, y:925, s:1.0, expr:'calm', walk:{from:-300, dur:2.8}, acts:[[0,{a:[40,40],b:[-30,40],lean:6}],[0.6,{a:[-30,40],b:[40,40],lean:6}],[1.2,{a:[40,40],b:[-30,40],lean:6}],[1.8,{a:[-30,40],b:[40,40],lean:6}],[2.4,'stand'],[3.2,'namaste',.5]]}] },

    /* 10 — he studies them */
    { line:'वे यह समझ नहीं पा रहे थे कि इतने बलशाली और दिव्य प्रतीत होने वाले दो राजकुमार', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,150,700,1.1],[2.5,300,690,1.2],[5.2,230,650,1.55],[7,230,640,1.7]]},
      sky:MORN_SKY, far:()=>FOREST(740,'#7da38a','#5d806c',7,.7,0)+FOG(720,.35), mid:()=>FOREST(810,'#5f8c63','#3f6048',6,1.0,40), art:()=>FLOOR(870)+GLINTS(8), near:()=>SHAFTS(.12)+LEAFFALL(5),
      cast:[
        {c:LAKSHMAN, x:470, y:850, s:.58, expr:'calm', aura:'gw', props:{front:'bow'}, acts:[[0,B_BOW],...SW(B_BOW,1,7,1.4)]},
        {c:RAMA, x:395, y:865, s:.62, expr:'serene', aura:'gw', props:{front:'bow'}, acts:[[0,B_BOW],...SW(B_BOW,1.6,7,1.5)]},
        {c:HANUMAN_BRAHMIN, x:170, y:945, s:1.12, expr:'calm', acts:[[0,'stand'],[0.8,'think',.7],[2.6,'lookR',.7],[4.2,'explain',.7],[5.6,'lookR',.5]]}] },

    /* 11 — Ram's quiet sorrow */
    { line:'जंगलों में साधारण मनुष्यों की तरह क्यों भटक रहे हैं और क्यों रो रहे हैं।', mood:'sad', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,420,700,1.1],[2.2,300,680,1.25],[4.4,240,660,1.5],[6.6,235,640,1.75]]},
      sky:MORN_SKY, far:()=>FOREST(760,'#6f9a7c','#4f7260',7,.8,0)+FOG(740,.3), mid:()=>TRUNKS('#35523a'), art:()=>FLOOR(880,'#5e8650')+GLINTS(6,'#e8e0c0'), near:()=>SHAFTS(.16)+LEAFFALL(6),
      cast:[
        {c:LAKSHMAN, x:395, y:890, s:.98, expr:'calm', props:{front:'bow'}, acts:[[0,B_BOW],...SW(B_BOW,1,7,1.6)]},
        {c:RAMA, x:225, y:935, s:1.15, expr:'sad', tears:true, props:{front:'bow'}, acts:[[0,B_BOW],[1.0,{rArmOut:14,rElbow:80,lean:5},.9],[3.6,B_BOW,.9],[5.2,{rArmOut:14,rElbow:80,lean:6},.9]]}] },

    /* 12 — Ram speaks with love; the light turns golden, push-in */
    { line:'लेकिन जैसे ही श्री राम ने प्रेम और करुणा के साथ संवाद किया,', mood:'hope', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,720,1.0],[1.6,270,670,1.3],[3.4,270,640,1.55],[5.2,270,620,1.8]]},
      sky:GOLD_SKY, far:()=>FOREST(760,'#9ab87a','#6f8a58',7,.8,0)+FOG(740,.3,'#fff0c0'), mid:()=>TRUNKS('#4e6a3e'), art:()=>FLOOR(890,'#7da35a')+GLINTS(10), near:()=>SHAFTS(.22)+LEAFFALL(5),
      cast:[{c:RAMA, x:270, y:940, s:1.2, expr:'smile', talk:true, acts:[[0,'stand'],[0.8,'offer',.7],[2.4,'explain',.7],[3.8,'bless',.7]]}] },

    /* 13 — recognition close-up, rings, a little shake */
    { line:'हनुमान जी समझ गए कि', mood:'divine', fx:'petals', tr:'glow', capTop:130, shake:[1.0,.5,2.5],
      cam:{keys:[[0,270,740,1.3],[0.8,270,680,1.9],[2.4,270,650,2.3]]},
      sky:GOLD_SKY, far:()=>FOREST(760,'#9ab87a','#6f8a58',7,.8,0)+FOG(740,.3,'#fff0c0'), art:()=>FLOOR(900,'#7da35a')+RINGS(270,640,'#ffe6a0',3)+GLINTS(10),
      cast:[{c:HANUMAN_BRAHMIN, x:270, y:945, s:1.2, expr:'surprise', exprKeys:[[0,'surprise'],[1.5,'serene']], acts:[[0,'recoil'],[0.9,'stand',.6]]}] },

    /* 14 — he bows: Narayan. Camera swings from Hanuman to Ram's halo */
    { line:'ये कोई साधारण मनुष्य नहीं बल्कि स्वयं भगवान नारायण हैं।', mood:'divine', fx:'petals', tr:'dissolve', capTop:130, focus:{at:1.2, sound:'arrive', dur:2.4, duck:.3},
      cam:{keys:[[0,150,700,1.4],[1.8,230,690,1.1],[3.4,330,650,1.25,'spring'],[5,340,620,1.5]]},
      sky:()=>GOLD_SKY()+BURST(340,600,14,900,'#fff6c4',.3), far:()=>FOREST(760,'#9ab87a','#6f8a58',7,.8,0)+FOG(740,.3,'#fff0c0'), art:()=>FLOOR(900,'#7da35a')+RINGS(350,600,'#fff0b8',3)+GLINTS(10), near:()=>SHAFTS(.2)+LEAFFALL(5),
      cast:[
        {c:LAKSHMAN, x:462, y:890, s:.84, expr:'calm', props:{front:'bow'}, acts:[[0,B_BOW],...SW(B_BOW,1,5,1.5)]},
        {c:RAMA, with:{halo:[0,-282,60]}, aura:'gw', x:340, y:925, s:1.05, expr:'smile', props:{front:'bow'}, acts:[[0,B_BOW],[1.4,'bless',.8]]},
        {c:HANUMAN_BRAHMIN, x:140, y:935, s:1.0, expr:'serene', acts:[[0,'stand'],[0.5,'namaste',.5],[1.6,'pranam',1.0]]}] },

    /* 15 — the question: he rises, a glow grows, camera pulls back */
    { line:'क्या आप जानते हैं कि इसके बाद हनुमान जी ने अपना कौन सा रूप दिखाया था?', mood:'divine', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.6],[2.5,270,660,1.25],[6,270,600,1.0]]},
      sky:GOLD_SKY, far:()=>FOREST(760,'#9ab87a','#6f8a58',7,.8,0)+FOG(740,.3,'#fff0c0'), art:()=>FLOOR(900,'#7da35a')+GLINTS(10)+A('fadein:1.2:3',A('pulse:3',`<circle cx="270" cy="660" r="300" fill="url(#gw)" opacity=".9"/><circle cx="270" cy="660" r="140" fill="#fff6d0" opacity=".55"/>`))+A('fadein:2.5:3',BURST(270,660,14,800,'#fff6c4',.3)),
      cast:[
        {c:LAKSHMAN, x:80, y:900, s:.68, expr:'calm', props:{front:'bow'}, acts:[[0,B_BOW],...SW(B_BOW,1,6,1.6)]},
        {c:RAMA, x:465, y:905, s:.74, expr:'smile', props:{front:'bow'}, with:{halo:[0,-282,60]}, acts:[[0,B_BOW],...SW(B_BOW,1.2,6,1.6)]},
        {c:HANUMAN_BRAHMIN, x:270, y:945, s:1.1, expr:'serene', acts:[[0,'kneel+namaste'],[1.4,'stand',.9],[3.2,'lookUp',.8],[4.6,{lArmOut:40,rArmOut:40,lElbow:20,rElbow:20,lean:-3},1.0]]}] },

    /* 16 — last shot: silhouette against a huge glow; slow pull-back, rays turning, rings pulsing */
    { line:'कमेंट में बताएँ और ऐसे ही अनसुने रहस्यों के लिए सब्सक्राइब करें।', mood:'divine', fx:'sparks', tr:'glow', capTop:130,
      cam:{keys:[[0,270,780,1.5],[3,270,700,1.15],[5.8,270,640,1.0]]},
      sky:()=>HUGE_GLOW(270,610), art:()=>`<path d="M-20 935 Q270 915 560 932 L560 1000 L-20 1000Z" fill="#241c14"/>`+GLINTS(10,'#ffffff'),
      cast:[{c:HANUMAN_BRAHMIN, with:SIL_B, x:270, y:945, s:1.0, expr:'calm', acts:[[0,'stand'],[1.6,{lArmOut:30,rArmOut:30,lElbow:20,rElbow:20},1.4],[4.0,{lArmOut:62,rArmOut:62,lElbow:10,rElbow:10},1.4]]}] },
  ],
});
