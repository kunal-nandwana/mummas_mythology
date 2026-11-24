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

VIDEO({
  title:'हनुमान जी और श्री राम का मिलन', format:'short', target:85,
  handheld:0.6,
  keywords:['हनुमान','राम','लक्ष्मण','सीता','किष्किंधा','सुग्रीव','बाली','ब्राह्मण','नारायण','कमेंट','सब्सक्राइब'],
  shots:[
    /* 1 — opening: crane-down through the morning mist, Rishyamuk mountain catching the first light */
    { line:'भक्त हनुमान और भगवान राम का मिलन रामायण का सबसे पवित्र क्षण माना जाता है।', mood:'calm', fx:'petals', capTop:640,
      cam:{keys:[[0,270,400,1.45],[5.5,270,480,1.0]]},
      sky:()=>MIST_SKY()+FLOCK(250,5),
      far:()=>hills(560,40,'#9bbdb2',90)+hills(610,34,'#82a898',80)+FOG(600,.5),
      mid:()=>PEAK(300,150,780,270,'#5d7f74','#f6e6a8')+FOREST(790,'#4f7a58','#3a5440',6,.9,0),
      art:()=>FOG(760,.55)+FLOOR(900,'#6b9556'),
      near:()=>FOG(900,.45)+FOG(640,.25) },

    /* 2a — Hanuman, the real vanara, thoughtful on a ledge */
    { line:'लेकिन क्या आप जानते हैं कि जब हनुमान जी पहली बार मिले थे,', mood:'calm', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,660,1.1],[4,270,640,1.4]]},
      sky:MIST_SKY, far:()=>hills(600,40,'#9bbdb2',90)+FOG(660,.4), mid:()=>PEAK(120,260,860,300,'#5d7f74','#f6e6a8'), art:()=>FOG(840,.35)+`<path d="M-20 905 Q270 880 560 900 L560 1000 L-20 1000Z" fill="#6d8a72"/>`,
      cast:[{...HANU_PLAIN, x:270, y:915, s:1.05, expr:'calm', acts:[[0,'stand'],[1.4,'think',.8]]}] },

    /* 2b — close-up: he looks, puzzled, and does not know them */
    { line:'तो वे श्री राम को तुरंत पहचान नहीं पाए थे।', mood:'calm', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,640,1.5],[3.6,270,625,1.95]]},
      sky:MIST_SKY, far:()=>hills(600,40,'#9bbdb2',90)+FOG(660,.4), mid:()=>PEAK(120,260,860,300,'#5d7f74','#f6e6a8'), art:()=>FOG(840,.35)+`<path d="M-20 905 Q270 880 560 900 L560 1000 L-20 1000Z" fill="#6d8a72"/>`,
      cast:[{...HANU_PLAIN, x:270, y:915, s:1.05, expr:'calm', exprKeys:[[0,'calm'],[1.2,'surprise'],[2.6,'calm']], acts:[[0,'think'],[1.0,'lookL',.5],[2.0,'lookR',.5]]}] },

    /* 3 — Ram and Lakshman walk the forest path, grieving (profile walk) */
    { line:'कथा के अनुसार, जब राम और लक्ष्मण सीता जी को खोजते हुए किष्किंधा के पास पहुँचे,', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{from:[190,620,1.05],to:[340,610,1.12]},
      sky:MORN_SKY, far:()=>FOREST(720,'#7da38a','#5d806c',7,.7,0)+FOG(700,.4), mid:()=>FOREST(790,'#5f8c63','#3f6048',6,1.0,40), art:()=>FLOOR(850), near:()=>FOG(930,.3)+SHAFTS(.12),
      cast:[
        {c:LAKSHMAN, facing:'side', x:230, y:915, s:.86, expr:'sad', props:{front:'bow'}, walk:{from:-380, dur:5.5}, acts:WALKPOSE.map(([t,p])=>[t,p])},
        {c:RAMA, facing:'side', x:350, y:925, s:.9, expr:'sad', props:{front:'bow'}, walk:{from:-380, dur:5.5}, acts:WALKPOSE.map(([t,p])=>[t,p])}] },

    /* 4 — Sugriv peeks from the rocky hill, afraid */
    { line:'तो सुग्रीव डर गए कि', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,660,1.0],[3.2,270,640,1.55]]},
      sky:MORN_SKY, far:()=>hills(640,40,'#9bbdb2',90)+FOREST(740,'#7da38a','#5d806c',7,.7,10), mid:()=>PEAK(430,300,860,260,'#6a7f6a','#f6e6a8'),
      art:()=>FOG(780,.4),
      cast:[{c:SUGRIV, x:270, y:985, s:1.15, expr:'surprise', enter:{fade:.3,rise:70,delay:.2}, acts:[[0,'stand'],[1.0,'lookL',.5],[2.0,'lookR',.5]]}],
      front:()=>CRAG(780,-20,560,'#7c6c58','#e8cf98') },

    /* 5 — Vali, only a stern silhouette on a far cliff; Sugriv watches him from behind the rocks */
    { line:'कहीं बाली ने उन्हें मारने के लिए किसी को न भेजा हो।', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,190,700,1.15],[2.6,340,590,1.25],[5,350,570,1.35]]},
      sky:()=>MORN_SKY()+`<circle cx="400" cy="480" r="230" fill="url(#gw)" opacity=".7"/>`, far:()=>hills(660,36,'#9bbdb2',90)+FOG(660,.35),
      art:()=>CLIFF(410,600,190),
      cast:[{c:VALI, with:SIL_V, x:410, y:604, s:.66, expr:'angry', acts:[[0,'stand']]},
            {c:SUGRIV, x:130, y:1000, s:1.1, expr:'surprise', acts:[[0,'stand'],[0.6,'lookR',.5]]}],
      front:()=>CRAG(800,-60,250,'#7c6c58','#e8cf98') },

    /* 6 — Sugriv decides to find out who they are */
    { line:'यह पता लगाने के लिए कि वे कौन हैं,', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.1],[3.4,300,660,1.45]]},
      sky:MORN_SKY, far:()=>hills(640,40,'#9bbdb2',90)+FOREST(740,'#7da38a','#5d806c',7,.7,10), mid:()=>PEAK(100,330,880,260,'#6a7f6a','#f6e6a8'), art:()=>FOG(830,.3)+`<path d="M-20 915 Q270 888 560 910 L560 1000 L-20 1000Z" fill="#7a8a62"/>`,
      cast:[{c:SUGRIV, x:260, y:925, s:1.1, expr:'calm', acts:[[0,'stand'],[0.8,'think',.7],[2.2,'point',.7]]}] },

    /* 7 — he sends his wisest minister, Hanuman, who bows and goes */
    { line:'सुग्रीव ने अपने सबसे बुद्धिमान मंत्री यानी हनुमान जी को भेजा।', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,150,680,1.1],[3.4,160,690,1.1],[4.6,380,650,1.25]]},
      sky:MORN_SKY, far:()=>hills(640,40,'#9bbdb2',90)+FOREST(740,'#7da38a','#5d806c',7,.7,10), mid:()=>PEAK(100,330,880,260,'#6a7f6a','#f6e6a8'), art:()=>FOG(830,.3)+`<path d="M-20 915 Q270 888 560 910 L560 1000 L-20 1000Z" fill="#7a8a62"/>`,
      cast:[{c:SUGRIV, x:140, y:925, s:1.05, expr:'calm', acts:[[0,'point'],[2.0,'stand',.6]]},
            {...HANU_PLAIN, x:390, y:935, s:1.0, expr:'serene', acts:[[0,'stand'],[3.6,'namaste',.6],[5.0,'bowHead',.6]]}] },

    /* 8 — Hanuman changes into a Brahmin: a golden whirl, one figure fades out, the other in */
    { line:'हनुमान जी एक ब्राह्मण का वेश बदलकर', mood:'divine', fx:'sparks', tr:'glow', capTop:130,
      cam:{keys:[[0,270,700,1.05],[3.2,270,660,1.3]]},
      sky:MORN_SKY, far:()=>hills(640,40,'#9bbdb2',90)+FOREST(740,'#7da38a','#5d806c',7,.7,10), art:()=>FOG(830,.3)+FLOOR(880,'#6b9556'),
      cast:[{...HANU_PLAIN, x:270, y:925, s:1.05, expr:'calm', exit:{at:1.7,fade:.7}, acts:[[0,'stand']]},
            {c:HANUMAN_BRAHMIN, x:270, y:925, s:1.05, expr:'calm', enter:{fade:.8,delay:1.4}, acts:[[0,'stand'],[2.6,'namaste',.5]]}],
      front:()=>A('fadein:.5:.6',A('fadeout:2.4:.9',WHIRL(270,700))) },

    /* 9 — as a Brahmin he walks up to Ram and Lakshman (profile walk) */
    { line:'उनके पास आए और उनकी परीक्षा लेने लगे।', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{from:[240,640,1.05],to:[320,640,1.15]},
      sky:MORN_SKY, far:()=>FOREST(720,'#7da38a','#5d806c',7,.7,0)+FOG(700,.35), mid:()=>FOREST(790,'#5f8c63','#3f6048',6,1.0,40), art:()=>FLOOR(850), near:()=>FOG(930,.25)+SHAFTS(.1),
      cast:[
        {c:LAKSHMAN, x:455, y:890, s:.8, expr:'calm', props:{front:'bow'}, acts:[[0,'stand']]},
        {c:RAMA, x:370, y:925, s:.9, expr:'sad', props:{front:'bow'}, acts:[[0,'stand'],[2.4,'lookL',.6]]},
        {c:HANUMAN_BRAHMIN, facing:'side', x:150, y:925, s:1.0, expr:'calm', walk:{from:-300, dur:2.8}, acts:[[0,{a:[40,40],b:[-30,40],lean:6}],[0.6,{a:[-30,40],b:[40,40],lean:6}],[1.2,{a:[40,40],b:[-30,40],lean:6}],[1.8,{a:[-30,40],b:[40,40],lean:6}],[2.4,'stand'],[3.2,'namaste',.5]]}] },

    /* 10 — he studies them: so strong, so divine... */
    { line:'वे यह समझ नहीं पा रहे थे कि इतने बलशाली और दिव्य प्रतीत होने वाले दो राजकुमार', mood:'calm', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,250,700,1.05],[5.5,230,650,1.5]]},
      sky:MORN_SKY, far:()=>FOREST(740,'#7da38a','#5d806c',7,.7,0)+FOG(720,.35), mid:()=>FOREST(810,'#5f8c63','#3f6048',6,1.0,40), art:()=>FLOOR(870), near:()=>SHAFTS(.12),
      cast:[
        {c:LAKSHMAN, x:470, y:850, s:.58, expr:'calm', aura:'gw', props:{front:'bow'}, acts:[[0,'stand']]},
        {c:RAMA, x:395, y:865, s:.62, expr:'serene', aura:'gw', props:{front:'bow'}, acts:[[0,'stand']]},
        {c:HANUMAN_BRAHMIN, x:170, y:945, s:1.12, expr:'calm', acts:[[0,'stand'],[0.8,'think',.7],[2.6,'lookR',.7],[4.6,'lookL',.5],[5.4,'lookR',.5]]}] },

    /* 11 — Ram's quiet sorrow: why do two such princes wander and weep in the forest? */
    { line:'जंगलों में साधारण मनुष्यों की तरह क्यों भटक रहे हैं और क्यों रो रहे हैं।', mood:'sad', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.0],[3.2,250,660,1.35],[6.2,240,640,1.65]]},
      sky:MORN_SKY, far:()=>FOREST(760,'#6f9a7c','#4f7260',7,.8,0)+FOG(740,.3), mid:()=>TRUNKS('#35523a'), art:()=>FLOOR(880,'#5e8650'), near:()=>SHAFTS(.16),
      cast:[
        {c:LAKSHMAN, x:395, y:890, s:.98, expr:'calm', props:{front:'bow'}, acts:[[0,'stand'],[1.4,'lookL',.6]]},
        {c:RAMA, x:225, y:935, s:1.15, expr:'sad', tears:true, props:{front:'bow'}, acts:[[0,'stand'],[0.8,'bowHead',.8],[3.6,'lookDown',.8]]}] },

    /* 12 — Ram speaks with love and compassion: the light turns golden */
    { line:'लेकिन जैसे ही श्री राम ने प्रेम और करुणा के साथ संवाद किया,', mood:'hope', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,680,1.1],[4.8,270,625,1.75]]},
      sky:GOLD_SKY, far:()=>FOREST(760,'#9ab87a','#6f8a58',7,.8,0)+FOG(740,.3,'#fff0c0'), mid:()=>TRUNKS('#4e6a3e'), art:()=>FLOOR(890,'#7da35a'), near:()=>SHAFTS(.22),
      cast:[{c:RAMA, x:270, y:940, s:1.2, expr:'smile', talk:true, acts:[[0,'stand'],[0.9,'offer',.7],[3.2,'bless',.7]]}] },

    /* 13 — recognition, close-up: Hanuman, still in disguise, sees Ram's loving face */
    { line:'हनुमान जी समझ गए कि', mood:'divine', fx:'petals', tr:'glow', capTop:130,
      cam:{keys:[[0,270,700,1.5],[3.0,270,640,2.25]]},
      sky:GOLD_SKY, far:()=>FOREST(760,'#9ab87a','#6f8a58',7,.8,0)+FOG(740,.3,'#fff0c0'), art:()=>FLOOR(900,'#7da35a')+RINGS(270,640,'#ffe6a0',3),
      cast:[{c:HANUMAN_BRAHMIN, x:270, y:945, s:1.2, expr:'surprise', exprKeys:[[0,'surprise'],[1.6,'serene']], acts:[[0,'stand'],[0.5,'lookL',.4],[1.5,'stand',.5]]}],
      },

    /* 14 — ...that this is Narayan himself. The disguised Hanuman bows. Ram shines with a halo. */
    { line:'ये कोई साधारण मनुष्य नहीं बल्कि स्वयं भगवान नारायण हैं।', mood:'divine', fx:'petals', tr:'dissolve', capTop:130, focus:{at:1.2, sound:'arrive', dur:2.4, duck:.3},
      cam:{keys:[[0,270,680,1.05],[3.0,300,660,1.05],[6.5,330,630,1.3]]},
      sky:GOLD_SKY, far:()=>FOREST(760,'#9ab87a','#6f8a58',7,.8,0)+FOG(740,.3,'#fff0c0'), art:()=>FLOOR(900,'#7da35a')+RINGS(350,600,'#fff0b8',3), near:()=>SHAFTS(.2),
      cast:[
        {c:LAKSHMAN, x:462, y:890, s:.84, expr:'calm', props:{front:'bow'}, acts:[[0,'stand']]},
        {c:RAMA, with:{halo:[0,-282,60]}, aura:'gw', x:340, y:925, s:1.05, expr:'smile', props:{front:'bow'}, acts:[[0,'stand'],[1.2,'bless',.8]]},
        {c:HANUMAN_BRAHMIN, x:140, y:935, s:1.0, expr:'serene', acts:[[0,'stand'],[0.6,'namaste',.5],[1.8,'pranam',1.0]]}] },

    /* 15 — the question: Hanuman rises, a glow begins behind him */
    { line:'क्या आप जानते हैं कि इसके बाद हनुमान जी ने अपना कौन सा रूप दिखाया था?', mood:'divine', fx:'sparks', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,640,1.5],[5.5,270,600,1.0]]},
      sky:GOLD_SKY, far:()=>FOREST(760,'#9ab87a','#6f8a58',7,.8,0)+FOG(740,.3,'#fff0c0'), art:()=>FLOOR(900,'#7da35a')+A('fadein:1.5:3',A('pulse:3',`<circle cx="270" cy="660" r="300" fill="url(#gw)" opacity=".9"/><circle cx="270" cy="660" r="140" fill="#fff6d0" opacity=".55"/>`)),
      cast:[
        {c:LAKSHMAN, x:80, y:900, s:.68, expr:'calm', props:{front:'bow'}, acts:[[0,'stand']]},
        {c:RAMA, x:465, y:905, s:.74, expr:'smile', props:{front:'bow'}, with:{halo:[0,-282,60]}, acts:[[0,'stand']]},
        {c:HANUMAN_BRAHMIN, x:270, y:945, s:1.1, expr:'serene', acts:[[0,'kneel+namaste'],[1.6,'stand',.9],[3.2,'lookUp',.8]]}] },

    /* 16 — last shot: his silhouette against a huge glow. Which form? The answer is for the comments. */
    { line:'कमेंट में बताएँ और ऐसे ही अनसुने रहस्यों के लिए सब्सक्राइब करें।', mood:'divine', fx:'sparks', tr:'glow', capTop:130,
      cam:{keys:[[0,270,760,1.35],[5.5,270,640,1.0]]},
      sky:()=>HUGE_GLOW(270,610), art:()=>`<path d="M-20 935 Q270 915 560 932 L560 1000 L-20 1000Z" fill="#241c14"/>`,
      cast:[{c:HANUMAN_BRAHMIN, with:SIL_B, x:270, y:945, s:1.0, expr:'calm', acts:[[0,'stand'],[2.0,'heroic',1.2]]}] },
  ],
});
