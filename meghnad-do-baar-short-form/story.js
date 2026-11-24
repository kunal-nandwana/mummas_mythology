/* मेघनाद ने श्रीराम को दो बार हराया — Short, about 65 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js meghnad-do-baar-short-form
   Look: night battlefield of Lanka (deep purple + crimson sky, bright rim lights, violet magic, one warm light in every shot)
         -> warm gold dawn around the herb mountain. High contrast, big characters, a new picture every 2-3 s.
   Hook: sound first (bowstring + arrow), an arrow flying straight at the camera that splits into snakes. No hook text, no intro, no end card.
   Loop: the last shot ends with a golden arrow of light flying to Rama's bowstring, the same composition as the first shot.
   Safety: no gore, no wounds shown. Pain = faces, fallen bodies, a glowing snake net. Music: scene library. */

/* ---------- own pieces (new for this video) ---------- */
const NIGHT = ()=>skyBand([[0,'#0b0320'],[.28,'#2b0d55'],[.55,'#6b1a70'],[.8,'#c2294f'],[1,'#ff7a3c']])+stars(70,380)+
  A('drift:90:0:50',`<ellipse cx="120" cy="300" rx="190" ry="14" fill="#ff4a6a" opacity=".25"/>`)+A('drift:-80:0:40',`<ellipse cx="420" cy="430" rx="200" ry="12" fill="#b04aff" opacity=".25"/>`);
const DAWN = ()=>skyBand([[0,'#3c1c66'],[.32,'#b2477a'],[.6,'#ff9a58'],[.84,'#ffd27a'],[1,'#fff0b8']])+
  `<circle cx="270" cy="700" r="330" fill="url(#gw)" opacity=".85"/>`+RAYS(270,700,16,760,'#fff0c4',.13)+`<circle cx="270" cy="706" r="64" fill="#fff6d8"/>`;
function RAYS(x,y,n,len,col,op){ let s=''; for(let i=0;i<n;i++){ const a=(i/n)*Math.PI*2, a2=a+.09; s+=`<path d="M${x} ${y} L${r1(x+Math.cos(a)*len)} ${r1(y+Math.sin(a)*len)} L${r1(x+Math.cos(a2)*len)} ${r1(y+Math.sin(a2)*len)}Z" fill="${col}" opacity="${op}"/>`; }
  return A(`spin:80:${x}:${y}`,s); }
/* Lanka far away: spiky dark towers, violet windows, a crimson glow behind */
function FORT(y,k){ k=k||1; let s=`<ellipse cx="270" cy="${y}" rx="340" ry="${70*k}" fill="#ff5a3a" opacity=".38" filter="url(#b24)"/>`;
  for(let i=0;i<11;i++){ const x=-10+i*52, h=(60+((i*37)%90))*k; s+=`<path d="M${x} ${y} L${x} ${y-h} L${x+8} ${y-h-62*k} L${x+16} ${y-h} L${x+46} ${y-h} L${x+46} ${y}Z" fill="#190733"/>`;
    s+=A(`flick:${3+i%4}`,`<rect x="${x+14}" y="${y-h+18}" width="7" height="12" rx="3" fill="#c49bff"/><rect x="${x+28}" y="${y-h+40}" width="7" height="12" rx="3" fill="#ffb060"/>`); }
  return s+`<rect x="-20" y="${y-4}" width="580" height="60" fill="#190733"/>`; }
function GROUND(y){ let s=`<path d="M-20 ${y} Q130 ${y-26} 270 ${y-8} T560 ${y-14} L560 1000 L-20 1000Z" fill="#1d0c33"/><path d="M-20 ${y} Q130 ${y-26} 270 ${y-8} T560 ${y-14}" fill="none" stroke="#ff6a5a" stroke-width="3" opacity=".7"/><path d="M-20 ${y+80} Q270 ${y+36} 560 ${y+74} L560 1000 L-20 1000Z" fill="#12061d"/>`;
  [[40,y+30,18],[150,y+62,12],[330,y+44,20],[470,y+70,14]].forEach(([x,yy,r])=>{ s+=`<ellipse cx="${x}" cy="${yy}" rx="${r*1.6}" ry="${r}" fill="#2b1346"/><path d="M${x-r*1.4} ${yy-r*.4} q${r*1.4} ${-r*.7} ${r*2.8} 0" stroke="#ff7a6a" stroke-width="1.6" fill="none" opacity=".6"/>`; });
  return s; }
const TORCH = (x,y,s)=>`<rect x="${r1(x-3*s)}" y="${r1(y-90*s)}" width="${r1(6*s)}" height="${r1(90*s)}" fill="#2a1424"/>`+A('flick:5',`<circle cx="${x}" cy="${r1(y-96*s)}" r="${r1(70*s)}" fill="url(#saf)"/>`)+fire(x,r1(y-96*s),r1(1.3*s));
const WARM = (x,y,r)=>A('pulse:2.6',`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#saf)" opacity=".85"/>`);
const VIOLET = (x,y,r,op)=>A('pulse:2.1',`<circle cx="${x}" cy="${y}" r="${r}" fill="#8a4aff" opacity="${op||.4}" filter="url(#b24)"/>`);
const SIL = {skin:'#08030f', top:'#08030f', bottom:'#08030f', shin:'#08030f', foot:'#08030f', cape:'#08030f', sash:'#08030f', pads:'#08030f', belt:'#08030f', kundal:false, earring:false};   // Meghnad as a pure silhouette (violet eyes stay)
const VAN = (fur)=>({c:HANUMAN, with:{holds:{}, head:'band', skin:fur, top:fur, shin:fur, bottom:'#c8742a', garland:null, pads:null, belt:null, aura:null}});   // a vanara soldier (reuses the HANUMAN body)

/* swirling dark cloud, optionally with Meghnad's glowing violet eyes */
function CLOUD(x,y,s,eyes){ let b='';
  [[-70,10,58],[-30,-36,64],[26,-40,60],[72,6,56],[44,48,60],[-24,52,62],[0,0,74]].forEach(([dx,dy,r],i)=>{ b+=`<circle cx="${dx}" cy="${dy}" r="${r}" fill="${i%2?'#1b0a33':'#0f0520'}"/><circle cx="${dx}" cy="${dy}" r="${r}" fill="none" stroke="#9a6aff" stroke-width="2" opacity=".35"/>`; });
  let sw=''; for(let i=0;i<4;i++) sw+=`<path d="M${-90+i*8} ${-20+i*14} q60 ${-50+i*10} 140 ${i*6}" stroke="#b58aff" stroke-width="3" fill="none" opacity=".45"/>`;
  return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})"><circle r="150" fill="#6a2aff" opacity=".28" filter="url(#b24)"/>`+A('spin:9:0:0',b+sw)+
    (eyes?A('pulse:2.4',`<ellipse cx="-30" cy="-6" rx="19" ry="8" fill="#8a4aff" filter="url(#b4)" opacity=".9"/><ellipse cx="34" cy="-6" rx="19" ry="8" fill="#8a4aff" filter="url(#b4)" opacity=".9"/><path d="M-46 -6 Q-30 -17 -12 -6 Q-30 3 -46 -6Z M16 -6 Q34 -17 50 -6 Q34 3 16 -6Z" fill="#f1e2ff"/><circle cx="-30" cy="-6" r="4.4" fill="#5a14ff"/><circle cx="34" cy="-6" r="4.4" fill="#5a14ff"/>`):'')+`</g>`; }
/* glowing snake (also usable as a snake-arrow: ar=true adds a fletched tail) */
function SNAKE(x,y,len,ang,col,delay,w,ar){ w=w||7; const n=6, sg=len/n; let d='M0 0'; for(let i=0;i<n;i++) d+=` q${r1(sg/2)} ${(i%2?-1:1)*r1(len*.11)} ${r1(sg)} 0`;
  const head=`<ellipse cx="${r1(len+4)}" cy="0" rx="${r1(w*1.5)}" ry="${r1(w*1.1)}" fill="${col}"/><circle cx="${r1(len+7)}" cy="${r1(-w*.4)}" r="${r1(w*.32)}" fill="#fff"/><path d="M${r1(len+w*2)} 0 l${r1(w*1.6)} ${r1(-w*.45)} M${r1(len+w*2)} 0 l${r1(w*1.6)} ${r1(w*.45)}" stroke="#ff4a6a" stroke-width="1.8"/>`;
  const tail=ar?`<polygon points="0,0 ${-w*3.4},${-w*1.7} ${-w*2.2},0 ${-w*3.4},${w*1.7}" fill="#fff6c0"/>`:'';
  return `<g transform="translate(${r1(x)} ${r1(y)}) rotate(${ang})">`+A('sscale:'+(delay||0)+':.45',`<path d="${d}" fill="none" stroke="${col}" stroke-width="${w*2.4}" opacity=".3" filter="url(#b4)" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff6c0" stroke-width="${r1(w*.28)}" opacity=".75" stroke-linecap="round" stroke-dasharray="6 9"/>${tail}${head}`)+`</g>`; }
const SNAKE_COLS = ['#7dffb0','#d6ff6a','#9a7aff','#7dffb0'];
/* snakes bursting out of one point */
const BURST = (cx,cy,n,len,delay)=>{ let s=''; for(let i=0;i<n;i++){ const a=(i/n)*360+(i%2)*14; s+=SNAKE(cx,cy,len*(.7+(i%3)*.2),a,SNAKE_COLS[i%4],delay+i*.06,6.5); } return s; };
/* an arrow flying straight at the camera: gold head, glow, speed lines */
const ARROW_FRONT = (cx,cy,s,glow,spr)=>{ const body=A('pulse:3',`<circle r="${glow||230}" fill="url(#gw)"/>`)+RAYS(0,0,22,330,'#fff0c0',.14)+
  `<path d="M0 -118 L44 0 L0 128 L-44 0Z" fill="#fff6d8" stroke="#ffd25e" stroke-width="4"/><path d="M0 -118 L0 128 M-44 0 H44" stroke="#c8902a" stroke-width="3" opacity=".6"/><circle r="22" fill="#ffffff"/>`;
  return `<g transform="translate(${cx} ${cy}) scale(${s})">`+(spr?A('sscale:0:.7',body):body)+`</g>`; };   // spr=true: springs in from nothing (the hook arrow)
/* the glowing snake net around the two brothers */
function NET(x,y,w,h,delay){ let s=''; const n=6; for(let i=0;i<n;i++){ const px=x+i*w/(n-1); s+=SNAKE(px,y,h*1.15,60+(i%2)*6,SNAKE_COLS[i%4],delay+i*.1,5.5)+SNAKE(px,y,h*1.15,120-(i%2)*6,SNAKE_COLS[(i+1)%4],delay+.05+i*.1,5.5); }
  return A('pulse:2.2',s); }
/* the Brahmastra: white-gold arrow, huge halo, slow rays */
const BRAHMASTRA = (x,y,s,rot,spr)=>{ const body=A('pulse:2',`<circle r="270" fill="url(#gw)"/>`)+A('ripple:2.2:0:0',`<circle r="210" fill="none" stroke="#fff6d0" stroke-width="5"/>`)+A('ripple:2.2:0:0',`<circle r="270" fill="#fff0b0" opacity=".3"/>`)+RAYS(0,0,18,320,'#fff6d0',.2)+
  `<line x1="-180" y1="0" x2="150" y2="0" stroke="#ffe08a" stroke-width="30" opacity=".5" filter="url(#b10)"/><line x1="-180" y1="0" x2="150" y2="0" stroke="#fffdf0" stroke-width="10" stroke-linecap="round"/><polygon points="150,-28 222,0 150,28" fill="#fffdf0"/><polygon points="-180,0 -218,-26 -198,0 -218,26" fill="#ffe08a"/><polygon points="-150,0 -184,-20 -166,0 -184,20" fill="#fffdf0"/>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot||0}) scale(${s})">`+(spr?A('sscale:0:.8',body):body)+`</g>`; };   // spr=true: springs in from nothing
/* the herb mountain (Sanjeevani): green rock, golden-glowing herbs, huge warm halo */
function MOUNTAIN(x,y,s){ let g=''; [[-110,-10],[-60,-80],[-8,-150],[40,-80],[84,-120],[120,-20],[-30,-30],[20,-10],[70,-50],[-90,-50]].forEach(([dx,dy],i)=>{ g+=A(`flick:${(2+i%4).toFixed(1)}`,`<circle cx="${dx}" cy="${dy}" r="9" fill="#fff0a0" filter="url(#b4)"/>`)+sparkle(dx,dy,1.1,i%2?'#ffe9a0':'#b8ffa0'); });
  return `<g transform="translate(${x} ${y}) scale(${s})">`+A('pulse:2.2',`<circle cy="-90" r="360" fill="url(#gw)"/>`)+`<path d="M-200 50 L-120 -80 L-72 -52 L-10 -200 L52 -108 L92 -150 L200 50 Q0 108 -200 50Z" fill="#3f7a2a" stroke="#ffe08a" stroke-width="3"/><path d="M-200 50 L-120 -80 L-72 -52 L-10 -200 L-30 -40 L-60 60Z" fill="#6cae38" opacity=".8"/><path d="M-170 56 Q0 120 170 56 L120 100 Q0 160 -120 100Z" fill="#4a3220"/>`+g+`</g>`; }
/* golden herb fragrance: soft ribbons + motes drifting down over everyone */
const FRAG = (n)=>{ let s=''; for(let i=0;i<(n||8);i++){ const x=30+(i*67)%480; s+=A(`drift:${i%2?24:-24}:${200+i*10}:${5+i%3}`,`<path d="M${x} 330 q26 -34 0 -68 t0 -68" stroke="#ffe08a" stroke-width="${6+i%3*2}" fill="none" opacity=".6" filter="url(#b4)"/><circle cx="${x+10}" cy="${300+(i*29)%90}" r="${3+i%3}" fill="#fff6c8"/>`); } return s; };
const FLASH = (at,hold)=>A(`fadein:${at}:0.08`,A(`fadeout:${at+(hold||.12)}:.5`,`<rect x="-20" y="-20" width="580" height="1000" fill="#fffdf0"/>`));
/* a thought orb with Meghnad's crowned face in it */
const ORB = (x,y,s)=>A('pop:.4',A('bob:5:.5',`<g transform="translate(${x} ${y}) scale(${s})"><circle r="84" fill="#12061f" opacity=".92"/><circle r="84" fill="none" stroke="#b58aff" stroke-width="3"/><path d="M-26 -12 L-30 -54 L-12 -36 L0 -66 L12 -36 L30 -54 L26 -12Z" fill="#160c28" stroke="#b79cff" stroke-width="2"/><ellipse cx="-14" cy="6" rx="9" ry="4" fill="#d9b8ff"/><ellipse cx="14" cy="6" rx="9" ry="4" fill="#d9b8ff"/><path d="M-12 30 Q0 40 12 30" stroke="#d9b8ff" stroke-width="3" fill="none"/><circle cx="-92" cy="84" r="11" fill="#b58aff" opacity=".6"/><circle cx="-116" cy="112" r="6" fill="#b58aff" opacity=".6"/></g>`));

const LAKS = {c:LAKSHMAN};
const MEG  = {c:MEGHNAD};

VIDEO({ rig:'side',
  title:'मेघनाद ने श्रीराम को दो बार हराया', format:'short', target:65,
  music:'scenes', handheld:0.9, minShot:2.1,
  keywords:['मेघनाद','श्रीराम','लक्ष्मण','गरुड़','ब्रह्मास्त्र','हनुमान','लंका','साँप','बाणों','दो','बार','पहाड़','जड़ी-बूटियों','वाल्मीकि','युद्धकांड','गिरे','आजाद'],
  shots:[
    /* 1 — HOOK: bowstring snap, arrow flies straight at the camera and splits into snakes */
    { line:'मेघनाद ने श्रीराम को', scene:'battle', mood:'anger', fx:'sparks', capTop:130, shake:[.9,1.4,6],
      focus:{at:.05, sound:'bowshot', dur:2.2, duck:.3}, sfx:[[1.0,'hiss',.6]],
      cam:{keys:[[0,270,520,1.0],[1.0,270,500,1.3],[2.2,270,480,1.75]]},
      sky:()=>NIGHT()+VIOLET(270,470,280,.35), far:()=>FORT(640), art:()=>GROUND(890)+ARROW_FRONT(300,470,1.0,230,true)+BURST(300,470,9,170,.95),
      near:()=>TORCH(470,960,1.2)+WARM(470,830,150),
      cast:[{...MEG, x:105, y:945, s:1.35, expr:'angry', props:{front:'bow'}, acts:[[0,'bowDraw'],[.9,'bowReady',.25]]}] },

    /* 2 — Meghnad's glowing eyes in a dark cloud */
    { line:'दो बार हराया था।', scene:'battle', mood:'anger', fx:'embers', tr:'zoom', capTop:130,
      cam:{keys:[[0,270,560,1.15],[2,270,540,1.9]]},
      sky:()=>NIGHT()+VIOLET(270,560,300,.5), far:()=>FORT(760), art:()=>GROUND(930)+
        `<path d="M170 420 L176 360 L204 392 L222 330 L240 392 L268 360 L270 420Z" fill="#160c28" stroke="#b79cff" stroke-width="2" transform="translate(30 20)"/>`+
        `<path d="M232 332 A26 26 0 0 0 292 332 A22 16 0 0 1 232 332Z" fill="#efe4ff" style="filter:drop-shadow(0 0 10px #c8a4ff)"/>`+CLOUD(270,560,2.2,true),
      near:()=>TORCH(60,990,1.5)+TORCH(480,990,1.5) },

    /* 3 — Rama + Lakshman, low angle; Meghnad appears and vanishes into the cloud */
    { line:'पहली लड़ाई में मेघनाद गायब हो गया', scene:'battle', mood:'shock', fx:'embers', tr:'whip', capTop:130,
      cam:{keys:[[0,260,800,1.15],[2.4,270,700,1.5]]},
      sky:()=>NIGHT()+VIOLET(430,520,220,.4), far:()=>FORT(840), art:()=>GROUND(930)+A('fadein:1.2:.5',A('fadeout:2.6:.8',CLOUD(440,640,1.9,true))),
      near:()=>TORCH(40,990,1.4)+WARM(40,860,140),
      cast:[{c:RAMA, x:130, y:960, s:1.3, expr:'calm', props:{front:'bow'}, acts:[[0,'bowReady']]},
            {...LAKS, x:290, y:975, s:1.3, expr:'angry', props:{front:'bow'}, acts:[[0,'bowReady'],[1.6,'recoil',.3]]},
            {...MEG, x:440, y:930, s:1.25, flip:true, expr:'angry', props:{front:'bow'}, acts:[[0,'bowReady'],[1.0,'armUp',.4]], exit:{at:1.5,fade:.5}}] },

    /* 4 — snake-arrows rain down (whip) */
    { line:'और उसने श्रीराम व लक्ष्मण जी पर', scene:'snake-arrows', mood:'anger', fx:'sparks', tr:'whip', capTop:130, shake:[0,2.2,5],
      cam:{keys:[[0,270,700,1.3],[2.2,250,690,1.5]]},
      sky:()=>NIGHT()+CLOUD(450,170,1.6,true), far:()=>FORT(820), art:()=>GROUND(930)+
        [0,1,2,3,4,5,6].map(i=>A(`drift:-230:${420+i*10}:${1.3+i*.15}`,SNAKE(300+i*48,-120,150,68,SNAKE_COLS[i%4],0,6,true))).join(''),
      near:()=>TORCH(500,990,1.3),
      cast:[{c:RAMA, x:150, y:965, s:1.35, expr:'angry', props:{front:'bow'}, acts:[[0,'bowReady'],[1.2,'recoil',.3]]},
            {...LAKS, x:330, y:975, s:1.35, expr:'angry', props:{front:'bow'}, acts:[[0,'bowReady'],[.8,'shock',.3]]}] },

    /* 5 — snake arrows fly at us; Lakshman's alarmed face */
    { line:'साँप वाले बाणों से हमला किया।', scene:'snake-arrows', mood:'shock', fx:'sparks', tr:'zoom', capTop:130, sfx:[[.3,'hiss',.6],[1.4,'hit',.5]],
      cam:{keys:[[0,270,620,1.5],[2.2,262,590,2.3]]},
      sky:()=>NIGHT()+VIOLET(270,500,260,.4), far:()=>FORT(900), art:()=>GROUND(1000)+
        BURST(270,300,7,210,.2)+[0,1,2,3].map(i=>A(`drift:${i%2?90:-90}:260:${1.1+i*.2}`,SNAKE(140+i*80,260,130,80+i*6,SNAKE_COLS[i%4],0,7,true))).join(''),
      near:()=>TORCH(60,1000,1.4)+WARM(60,860,150),
      cast:[{...LAKS, x:270, y:960, s:1.55, expr:'surprise', props:{front:'bow'}, acts:[[0,'bowReady'],[.5,'recoil',.3]]}] },

    /* 6 — citation (scroll), not a shloka */
    { line:'वाल्मीकि रामायण के युद्धकांड, सर्ग 45 के श्लोक 22 में इस बारे में बताया गया है।', scene:'battle', mood:'divine', fx:'dust', tr:'cut', capTop:660,
      cam:{keys:[[0,270,470,1.0],[3,270,480,1.18],[5.2,270,520,1.34]]},
      sky:()=>NIGHT()+VIOLET(270,520,300,.4)+A('pulse:3',`<circle cx="270" cy="520" r="330" fill="url(#saf)" opacity=".5"/>`),
      far:()=>FORT(760), art:()=>GROUND(900)+A('rise:40:1.2:.1',pothi(270,500,1.75))+
        [0,1,2].map(i=>SNAKE(-30+i*30,780-i*30,260,-8+i*4,SNAKE_COLS[i],0,5)).join('')+SNAKE(560,700,200,190,'#9a7aff',0,5),
      title:{text:'वाल्मीकि रामायण', y:320, size:56, delay:.1}, front:()=>big(270,390,44,'#ffe08a','युद्धकांड',.5)+fire(70,880,1.9)+fire(470,880,1.9) },

    /* 7 — Rama falls, Lakshman reaches for him */
    { line:'मेघनाद के बाण लगने से श्रीराम सबसे पहले गिरे।', scene:'snake-arrows', mood:'sad', fx:'embers', tr:'cut', capTop:130, shake:[1.4,.5,7],
      cam:{keys:[[0,300,700,1.2],[1.6,270,740,1.3],[3.2,230,770,1.5]]},
      sky:()=>NIGHT()+VIOLET(450,420,260,.45), far:()=>FORT(840), art:()=>GROUND(930)+
        A('slide:420:-300:.9:.2',SNAKE(250,250,200,36,'#7dffb0',0,7,true))+A('fadein:1.2:.1',A('fadeout:1.3:.6',sparkle(430,640,5,'#fff6c8'))),
      near:()=>TORCH(500,990,1.4),
      cast:[{c:RAMA, x:440, y:900, s:1.2, expr:'surprise', props:{front:'bow'}, acts:[[0,'bowReady'],[1.1,'recoil',.3],[1.9,'grief',.4]], lie:{deg:-84, at:2.0, dur:.9}},
            {...LAKS, x:120, y:930, s:1.3, expr:'sad', props:{front:'bow'}, acts:[[0,'bowReady'],[1.4,'plead',.4],[2.6,'kneel+give',.5]]}] },

    /* 8 — the snake net tightens (close-ups of both faces, no wounds) */
    { line:'दोनों भाई बाणों में जकड़ गए और बहुत घायल हो गए,', scene:'snake-net', mood:'sad', fx:'embers', tr:'flash', capTop:130, sfx:[[.4,'hiss',.5],[2.2,'hiss',.5]],
      cam:{keys:[[0,270,700,1.1],[1.4,200,650,2.1],[2.8,200,650,2.4],[3.0,345,660,2.4,'spring'],[4.4,345,660,2.7]]},
      sky:()=>NIGHT()+VIOLET(270,640,300,.5), far:()=>FORT(860), art:()=>GROUND(960),
      front:()=>NET(60,440,420,480,.2)+WARM(270,950,200),
      cast:[{c:RAMA, x:200, y:960, s:1.45, expr:'sad', acts:[[0,'kneel'],[1.2,'kneel+grief',.5]]},
            {...LAKS, x:350, y:965, s:1.45, flip:true, expr:'sad', acts:[[0,'kneel+lookAway'],[2.4,'kneel+grief',.5]]}] },

    /* 9 — Garuda arrives */
    { line:'जब तक कि गरुड़ जी', scene:'garuda', mood:'divine', fx:'sparks', tr:'flash', capTop:130,
      focus:{at:.3, sound:'wings', dur:3, duck:.25},
      cam:{keys:[[0,270,560,1.0],[2.4,270,470,1.28]]},
      sky:()=>NIGHT()+A('pulse:3',`<circle cx="270" cy="420" r="420" fill="url(#gw)" opacity=".55"/>`), far:()=>FORT(900), art:()=>GROUND(960)+
        [0,1,2,3,4].map(i=>SNAKE(40+i*100,860+(i%2)*40,150,-10+i*8,SNAKE_COLS[i%4],.1*i,6)).join('')+garuda(270,420,1.05),
      cast:[{c:RAMA, x:40, y:880, s:.85, lie:{deg:84, at:0, dur:.01}, expr:'sad', acts:[[0,'stand']]},
            {...LAKS, x:30, y:945, s:.85, lie:{deg:84, at:0, dur:.01}, expr:'sad', acts:[[0,'stand']]}] },

    /* 10 — Garuda's wings sweep the snakes away, then the brothers are free */
    { line:'आकर उन्हें आजाद नहीं कर दिया।', scene:'garuda', mood:'divine', fx:'sparks', tr:'whip', capTop:130,
      cam:{keys:[[0,270,520,1.05],[1.5,270,470,1.25],[1.7,270,640,2.0,'spring'],[3.2,270,630,2.2]]},
      sky:()=>NIGHT()+A('pulse:2.4',`<circle cx="270" cy="330" r="420" fill="url(#gw)" opacity=".45"/>`), far:()=>FORT(900),
      art:()=>GROUND(960)+garuda(270,330,1.2)+[0,1,2,3,4,5].map(i=>A(`drift:${i%2?-300:300}:-${60+i*10}:${1.6+i*.15}`,SNAKE(270,640,130,i%2?170:10,SNAKE_COLS[i%4],0,6))).join(''),
      front:()=>[0,1,2,3,4,5].map(i=>A(`drift:${i%2?20:-20}:-120:${3+i%3}`,sparkle(120+i*60,760,1.6,'#fff0c0'))).join(''),
      cast:[{c:RAMA, x:215, y:980, s:1.35, expr:'smile', acts:[[0,'kneel+grief'],[1.7,'kneel+hold',.5]]},
            {...LAKS, x:340, y:985, s:1.35, flip:true, expr:'smile', acts:[[0,'kneel+grief'],[1.9,'kneel+hold',.5]]}] },

    /* 11 — second battle: Meghnad, low angle */
    { line:'दूसरी लड़ाई में', scene:'battle', mood:'anger', fx:'embers', tr:'zoom', capTop:130,
      cam:{keys:[[0,270,830,1.2],[1.8,285,690,1.7]]},
      sky:()=>NIGHT()+VIOLET(270,560,300,.5)+WARM(270,820,200), far:()=>FORT(960), art:()=>GROUND(1000)+A('drift:80:0:30',CLOUD(100,600,1.5,false)),
      near:()=>TORCH(60,1000,1.5)+TORCH(490,1000,1.5),
      cast:[{...MEG, x:270, y:1000, s:1.6, expr:'angry', props:{front:'bow'}, acts:[[0,'bowReady'],[1.1,'bowDraw',.5]]}] },

    /* 12 — the Brahmastra glows (huge halo, slow push-in) */
    { line:'मेघनाद ने ब्रह्मास्त्र चलाया।', scene:'brahmastra', mood:'shock', fx:'stars', tr:'flash', capTop:130,
      focus:{at:.2, sound:'brahma', dur:3.4, duck:.1},
      cam:{keys:[[0,300,500,1.0],[3.2,330,500,1.6]]},
      sky:()=>NIGHT()+VIOLET(270,500,300,.4), far:()=>FORT(900), art:()=>GROUND(990)+BRAHMASTRA(330,470,1.15,-4,true),
      cast:[{...MEG, with:SIL, x:90, y:1000, s:1.45, expr:'angry', props:{front:'bow'}, acts:[[0,'bowDraw']]}] },

    /* 13 — Rama tells Lakshman (steady two-shot) */
    { line:'इस बार श्रीराम ने लक्ष्मण जी से', scene:'brahmastra', mood:'calm', fx:'embers', tr:'cut', capTop:130,
      cam:{keys:[[0,270,740,1.5],[2.4,255,720,1.62]]},
      sky:()=>NIGHT()+A('pulse:3',`<circle cx="270" cy="330" r="300" fill="url(#gw)" opacity=".55"/>`), far:()=>FORT(900), art:()=>GROUND(990),
      near:()=>TORCH(40,1000,1.3)+TORCH(500,1000,1.3),
      cast:[{c:RAMA, x:170, y:985, s:1.3, expr:'serene', talk:true, props:{front:'bow'}, acts:[[0,'explain']]},
            {...LAKS, x:380, y:990, s:1.3, flip:true, expr:'calm', props:{front:'bow'}, acts:[[0,'stand'],[1.6,'lookDown',.5]]}] },

    /* 14 — close-up on Rama's eyes, then Lakshman accepts */
    { line:'कहा कि वे इस वार को सह लें।', scene:'brahmastra', mood:'calm', fx:'embers', tr:'cut', capTop:130,
      cam:{keys:[[0,185,580,3.0],[1.5,185,580,3.2],[1.6,372,590,2.9,'spring'],[3,372,590,3.1]]},
      sky:()=>NIGHT()+A('pulse:3',`<circle cx="270" cy="400" r="320" fill="url(#gw)" opacity=".5"/>`), far:()=>FORT(900), art:()=>GROUND(990),
      cast:[{c:RAMA, x:170, y:990, s:1.4, expr:'serene', talk:true, acts:[[0,'hold']]},
            {...LAKS, x:380, y:990, s:1.4, flip:true, expr:'serene', acts:[[0,'stand'],[1.8,'hold',.5]]}] },

    /* 15 — Rama knows (thought orb with Meghnad) */
    { line:'श्रीराम जानते थे कि जब मेघनाद उन्हें बेहोश देखेगा,', scene:'brahmastra', mood:'calm', fx:'dust', tr:'cut', capTop:130,
      cam:{keys:[[0,270,620,1.7],[3.6,270,590,2.2]]},
      sky:()=>NIGHT()+VIOLET(270,420,260,.35)+A('pulse:3',`<circle cx="130" cy="330" r="260" fill="url(#gw)" opacity=".5"/>`), far:()=>FORT(900), art:()=>GROUND(1000),
      front:()=>ORB(420,330,1.2)+WARM(130,330,100),
      cast:[{c:RAMA, x:230, y:1000, s:1.5, expr:'serene', acts:[[0,'think'],[2,'lookUp',.6]]}] },

    /* 16 — Meghnad imagines his win */
    { line:'तो वह खुद को जीता हुआ मानकर', scene:'meghnad-win', mood:'anger', fx:'sparks', tr:'whip', capTop:130,
      cam:{keys:[[0,270,560,1.4],[2.2,270,500,1.9]]},
      sky:()=>NIGHT()+VIOLET(270,520,300,.55), far:()=>FORT(900), art:()=>GROUND(1000),
      near:()=>TORCH(60,1000,1.5)+TORCH(480,1000,1.5),
      cast:[{...MEG, x:270, y:1000, s:1.6, expr:'smile', acts:[[0,'stand'],[.8,'armUp',.6]]}] },

    /* 17 — the Brahmastra strikes (flash) */
    { line:'लंका वापस चला जाएगा—और वैसा ही हुआ।', scene:'brahmastra', mood:'shock', fx:'sparks', tr:'zoom', capTop:130, shake:[2.4,.8,8],
      cam:{keys:[[0,270,700,1.3],[2.2,270,740,1.7]]},
      sky:()=>NIGHT(), far:()=>FORT(900), art:()=>GROUND(990)+A('slide:520:-420:1.8:.2',BRAHMASTRA(250,250,.8,38)),
      front:()=>FLASH(2.5,.2),
      cast:[{c:RAMA, x:200, y:985, s:1.35, expr:'serene', acts:[[0,'hold']]},
            {...LAKS, x:360, y:990, s:1.35, flip:true, expr:'calm', acts:[[0,'hold']]}] },

    /* 18 — they fall silently (quiet moment) */
    { line:'दोनों भाई गिर पड़े', scene:'fall-silence', mood:'sad', fx:'embers', tr:'flash', capTop:130,
      focus:{at:.1, sound:'boom', dur:3.4, duck:.08},
      cam:{keys:[[0,270,760,1.15],[3,290,800,1.5]]},
      sky:()=>NIGHT()+VIOLET(270,520,280,.3)+WARM(270,800,260), far:()=>FORT(760), art:()=>GROUND(880)+A('pulse:4',sparkle(300,860,2.4,'#fff0c0')),
      near:()=>TORCH(500,900,1.4)+TORCH(30,930,1.2),
      cast:[{c:RAMA, x:40, y:855, s:1.3, expr:'serene', eyes:'closed', acts:[[0,'hold'],[.2,'stand',.3]], lie:{deg:86, at:.2, dur:1.0}},
            {...LAKS, x:20, y:935, s:1.3, expr:'serene', eyes:'closed', acts:[[0,'hold'],[.4,'stand',.3]], lie:{deg:86, at:.5, dur:1.0}}] },

    /* 19 — Meghnad's silhouette celebrates */
    { line:'और मेघनाद जीत का जश्न मनाते हुए', scene:'meghnad-win', mood:'anger', fx:'sparks', tr:'cut', capTop:130,
      cam:{keys:[[0,320,580,1.25],[3.2,310,520,1.55]]},
      sky:()=>NIGHT()+VIOLET(300,520,320,.6)+WARM(300,500,260), far:()=>FORT(940), art:()=>GROUND(1000),
      near:()=>TORCH(40,1000,1.5),
      cast:[{...MEG, with:SIL, x:330, y:1010, s:1.7, expr:'smile', acts:[[0,'armUp'],[1.2,{a:[170,0],b:[150,10],lean:-6,head:14,hand:'open',handB:'open'},.5]]},
            {c:RAMA, x:30, y:960, s:.7, lie:{deg:86, at:0, dur:.01}, expr:'serene', eyes:'closed', acts:[[0,'stand']]}] },

    /* 20 — he walks away towards Lanka; the brothers and the vanara army lie still */
    { line:'लंका लौट गया।', scene:'meghnad-win', mood:'sad', fx:'embers', tr:'cut', capTop:130,
      cam:{keys:[[0,260,720,1.35],[3,300,740,1.1]]},
      sky:()=>NIGHT()+WARM(470,620,280), far:()=>FORT(700,1.4), art:()=>GROUND(840),
      near:()=>TORCH(500,960,1.3),
      cast:[{...MEG, with:SIL, x:440, y:735, s:.85, expr:'smile', walk:{from:-300, dur:3.0}, acts:[[0,'stand']]},
            {...VAN('#8a6a4a'), x:70, y:790, s:.6, lie:{deg:84, at:0, dur:.01}, eyes:'closed', acts:[[0,'stand']]},
            {...VAN('#6a5a4a'), x:330, y:800, s:.6, lie:{deg:84, at:0, dur:.01}, eyes:'closed', acts:[[0,'stand']]},
            {c:RAMA, x:30, y:860, s:1.0, lie:{deg:86, at:0, dur:.01}, eyes:'closed', expr:'serene', acts:[[0,'stand']]},
            {...LAKS, x:20, y:935, s:1.0, lie:{deg:86, at:0, dur:.01}, eyes:'closed', expr:'serene', acts:[[0,'stand']]}] },

    /* 21 — Hanuman carries the glowing herb mountain across the night sky (crane up) */
    { line:'फिर हनुमान जी दवाई वाली', scene:'hanuman-herb', mood:'hope', fx:'stars', tr:'glow', capTop:130,
      cam:{keys:[[0,270,900,1.25],[3.4,270,500,1.0]]},
      sky:()=>NIGHT()+[0,1,2,3,4].map(i=>A(`drift:-420:0:${2+i*.4}`,`<ellipse cx="${560+i*10}" cy="${230+i*150}" rx="150" ry="12" fill="#e8c8ff" opacity=".35"/>`)).join(''),
      far:()=>FORT(940), art:()=>MOUNTAIN(270,350,1.2),
      cast:[{c:HANUMAN, with:{holds:{}}, x:270, y:900, s:1.25, expr:'smile',
             acts:[[0,{a:[172,0],b:[160,10],f:[40,30],k:[-34,50],lean:20,head:10,hand:'open',handB:'open'}]]}] },

    /* 22 — the mountain arrives; dawn light + golden fragrance, the herb-glow chime */
    { line:'जड़ी-बूटियों का पहाड़ ले आए, जिसकी खुशबू से', scene:'hanuman-herb', mood:'divine', fx:'petals', tr:'glow', capTop:130,
      focus:{at:2.0, sound:'herb', dur:3, duck:.3},
      cam:{keys:[[0,270,560,1.1],[3.8,300,600,1.45]]},
      sky:()=>DAWN(), far:()=>FORT(900), art:()=>GROUND(990)+MOUNTAIN(380,330,1.0), front:()=>FRAG(9),
      cast:[{c:HANUMAN, with:{holds:{}}, x:390, y:980, s:1.35, expr:'smile', acts:[[0,'armUp']]},
            {c:RAMA, x:20, y:890, s:.85, lie:{deg:86, at:0, dur:.01}, eyes:'closed', expr:'serene', acts:[[0,'stand']]},
            {...LAKS, x:10, y:945, s:.85, lie:{deg:86, at:0, dur:.01}, eyes:'closed', expr:'serene', acts:[[0,'stand']]}] },

    /* 23 — Rama's fingers move, he opens his eyes */
    { line:'श्रीराम, लक्ष्मण जी', scene:'revival', mood:'hope', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,330,800,1.6],[2.2,380,800,2.1]]},
      sky:()=>DAWN(), far:()=>FORT(780), art:()=>GROUND(880)+MOUNTAIN(430,420,.8), front:()=>FRAG(8),
      cast:[{c:RAMA, x:30, y:850, s:1.3, lie:{deg:86, at:0, dur:.01}, eyes:'closed', openAt:1.1, expr:'serene', acts:[[0,'stand'],[.7,'relax',.4],[1.3,'give',.5]]},
            {...LAKS, x:10, y:930, s:1.3, lie:{deg:86, at:0, dur:.01}, eyes:'closed', openAt:1.8, expr:'serene', acts:[[0,'stand']]}] },

    /* 24 — Lakshman and the vanaras rise, joyful */
    { line:'और घायल वानर सेना', scene:'revival', mood:'joy', fx:'petals', tr:'glow', capTop:130,
      cam:{keys:[[0,270,780,1.5],[2.6,270,720,1.2]]},
      sky:()=>DAWN(), far:()=>FORT(930), art:()=>GROUND(990)+MOUNTAIN(270,360,.9), front:()=>FRAG(9),
      cast:[{...LAKS, x:150, y:1000, s:1.35, expr:'smile', acts:[[0,'kneel'],[1.0,'stand',.6],[1.9,'armUp',.4]], lie:{from:84, deg:0, at:.2, dur:.9}},
            {...VAN('#8a6a4a'), x:350, y:960, s:.9, expr:'smile', lie:{from:-84, deg:0, at:.6, dur:.9}, acts:[[0,'stand'],[1.6,'armUp',.4]]},
            {...VAN('#6a5a4a'), x:470, y:1010, s:.95, expr:'smile', lie:{from:-84, deg:0, at:1.0, dur:.9}, acts:[[0,'stand'],[1.9,'armUp',.4]]}] },

    /* 25 — bright finish; a golden arrow of light flies to Rama's bowstring (loop back to shot 1) */
    { line:'फिर से ठीक हो गए।', scene:'revival', mood:'joy', fx:'petals', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.1],[1.9,285,560,1.45]]},
      sky:()=>DAWN()+A('pulse:3',`<circle cx="300" cy="470" r="280" fill="url(#gw)" opacity=".55"/>`), far:()=>FORT(930),
      art:()=>GROUND(1000)+MOUNTAIN(430,420,.75)+A('slide:240:-120:1.0:.1',ARROW_FRONT(300,470,.9,260)), front:()=>FRAG(7),
      cast:[{c:RAMA, x:105, y:1000, s:1.4, expr:'smile', props:{front:'bow'}, acts:[[0,'bowReady'],[1.1,'bowDraw',.5]]},
            {...LAKS, x:250, y:1010, s:1.2, expr:'smile', props:{front:'bow'}, acts:[[0,'bowReady']]},
            {c:HANUMAN, with:{holds:{}}, x:480, y:960, s:1.1, flip:true, expr:'smile', acts:[[0,'armUp']]}] }
  ]
});
