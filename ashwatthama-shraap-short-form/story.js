/* अश्वत्थामा का श्राप — Short, about 60 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js ashwatthama-shraap-short-form
   Look: moonlit desert (ink-teal sky, cream moon, rose-grey dunes) -> Pandava camp at night (indigo + amber lamps going dark)
         -> lonely banyan forest at dusk (green-teal, fireflies) -> a violet starry sky with a gold timeline.
   The ONLY warm accent on Ashwatthama is the soft red-gold glow of the gem-shaped wound on his forehead (no blood, nothing scary).
   Story beat: an explainer-puzzle told calmly: the curse had an end date (3138 BCE + 3,000 = 138 BCE); "immortal" comes from a later shloka.
   Safety: the night attack is NEVER shown: only a camp whose lamps go dark one by one and a far silhouette.
   No hook text, no intro, no end card. Music: scene library (music:'scenes'), scenes named ash-*. */

/* ---------- own pieces (new for this video) ---------- */
const NIGHT_SKY = ()=>skyBand([[0,'#070f20'],[.42,'#142a44'],[.74,'#3d5068'],[1,'#a08a86']]);
const DAWN_SKY  = ()=>skyBand([[0,'#2a2a4e'],[.4,'#6a5a7e'],[.7,'#e0a07a'],[1,'#f6d8a0']]);
const DUSK_SKY  = ()=>skyBand([[0,'#10243a'],[.45,'#24475a'],[.78,'#6a7a6a'],[1,'#c8a872']]);
const TIME_SKY  = ()=>skyBand([[0,'#0a0620'],[.5,'#1f1450'],[.85,'#3a2468'],[1,'#4a2c6a']])+
  `<ellipse cx="270" cy="470" rx="420" ry="90" fill="#7a5ac8" opacity=".14" transform="rotate(-24 270 470)"/><ellipse cx="270" cy="470" rx="300" ry="40" fill="#b8a0ff" opacity=".1" transform="rotate(-24 270 470)"/>`;
const CAMP_SKY  = ()=>skyBand([[0,'#04061a'],[.5,'#0e1438'],[.82,'#231c44'],[1,'#3a2a48']]);
const GREY_DAWN = ()=>skyBand([[0,'#3a3e66'],[.45,'#7c7a98'],[.75,'#d8b290'],[1,'#f2d9a8']]);

/* a full pale moon (not the crescent of the engine) with a soft halo and a few craters */
const BIGMOON = (x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r*2.4}" fill="url(#gw)" opacity=".34"/><circle cx="${x}" cy="${y}" r="${r*1.45}" fill="url(#gw)" opacity=".3"/>`+
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#f4ecd2"/><circle cx="${r1(x-r*.3)}" cy="${r1(y-r*.2)}" r="${r1(r*.2)}" fill="#e2d8b8" opacity=".7"/><circle cx="${r1(x+r*.34)}" cy="${r1(y+r*.22)}" r="${r1(r*.28)}" fill="#e6dcbe" opacity=".65"/><circle cx="${r1(x+r*.05)}" cy="${r1(y-r*.5)}" r="${r1(r*.12)}" fill="#e2d8b8" opacity=".6"/>`;

/* rolling dunes: a soft ridge line with a lit edge */
function DUNES(y,amp,col,hi,ph){ let d=`M-20 1000 L-20 ${y}`, e='';
  for(let x=-20;x<=560;x+=20){ const yy=r1(y-amp*(Math.sin(x*.011+ph)*.62+Math.sin(x*.029+ph*2.1)*.38)); d+=` L${x} ${yy}`; e+=(e?' L':'M')+`${x} ${yy}`; }
  return `<path d="${d} L560 1000Z" fill="${col}"/>`+(hi?`<path d="${e}" stroke="${hi}" stroke-width="2.4" fill="none" opacity=".75"/>`:''); }

/* faint sand streaks that drift across the dunes (wind) */
const WIND = (y,n,col)=>{ let o=''; for(let i=0;i<n;i++) o+=A(`drift:${220+i*20}:${-6}:${5+i%4}`,`<path d="M${(i*83)%520-40} ${y+(i*37)%140} q40 -6 90 0" stroke="${col||'#e8d8c0'}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>`); return o; };

/* footprints trailing behind the wanderer */
const PRINTS = (x0,x1,y,n)=>{ let o=''; for(let i=0;i<n;i++){ const x=x0+(x1-x0)*i/(n-1); o+=`<ellipse cx="${r1(x)}" cy="${r1(y+(i%2?5:-3))}" rx="5.5" ry="2.1" fill="#2a2430" opacity="${r1(.55-.4*i/n)}"/>`; } return o; };

/* a lone leafless tree on a dune */
const DEADTREE = (x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s})" stroke="${col||'#161a28'}" stroke-linecap="round" fill="none"><path d="M0 0 L-3 -70 L2 -130" stroke-width="7"/><path d="M-3 -70 L-36 -104 L-52 -150 M-3 -70 L24 -108 L30 -156 M2 -130 L-14 -172 M2 -130 L22 -176 M-36 -104 L-62 -112" stroke-width="3.6"/></g>`;

/* the star sky turns slowly (time passing): short arcs around a far pole */
const STARTRAILS = (cx,cy,n)=>{ let s=''; for(let i=0;i<(n||60);i++){ const R=70+((i*61)%760), a=((i*97)%360)*Math.PI/180, L=(0.015+((i*13)%9)*.004), b=a+L,
    x1=r1(cx+Math.cos(a)*R), y1=r1(cy+Math.sin(a)*R), x2=r1(cx+Math.cos(b)*R), y2=r1(cy+Math.sin(b)*R);
    s+=`<path d="M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2}" stroke="#f4ecd4" stroke-width="${i%7?1.1:2}" fill="none" stroke-linecap="round" opacity="${r1(.35+((i*7)%6)*.1)}"/>`; }
  return A(`spin:70:${cx}:${cy}`,s); };

/* soft shooting star (a thin streak that fades) */
const SHOOT = (x,y,delay)=>A(`fadein:${delay}:.3`,A(`fadeout:${delay+.5}:.8`,A(`slide:-160:80:1.1:${delay}`,`<path d="M${x} ${y} L${x+70} ${y-35}" stroke="#fff6d8" stroke-width="2.2" stroke-linecap="round" opacity=".85"/><circle cx="${x}" cy="${y}" r="3" fill="#fffbe8"/>`)));

/* fireflies: slow drifting golden-green dots */
const FIREFLIES = (n,col)=>{ let o=''; for(let i=0;i<n;i++) o+=A(`flick:${1.2+(i%4)*.5}`,A(`drift:${30-i*7}:${-70-(i%3)*20}:${5+i%5}`,`<circle cx="${(i*131)%520+10}" cy="${430+(i*89)%460}" r="${2+i%3*.7}" fill="${col||'#e8f2a0'}" opacity=".9"/><circle cx="${(i*131)%520+10}" cy="${430+(i*89)%460}" r="7" fill="${col||'#e8f2a0'}" opacity=".18"/>`)); return o; };

/* banyan tree: wide trunk, hanging aerial roots, heavy dark crown (new design for this video) */
function BANYAN(x,y,s,trunk,leaf){ const k=s; let o=`<path d="M${r1(x-26*k)} ${y} C${r1(x-20*k)} ${r1(y-120*k)} ${r1(x-16*k)} ${r1(y-210*k)} ${r1(x-22*k)} ${r1(y-300*k)} L${r1(x+22*k)} ${r1(y-300*k)} C${r1(x+14*k)} ${r1(y-210*k)} ${r1(x+20*k)} ${r1(y-120*k)} ${r1(x+30*k)} ${y}Z" fill="${trunk}"/>`;
  [[-70,.8],[-46,1],[44,1],[72,.7],[-16,.6],[18,.55]].forEach(([dx,q],i)=>{ o+=`<path d="M${r1(x+dx*k)} ${r1(y-250*k)} C${r1(x+(dx+(i%2?6:-6))*k)} ${r1(y-170*k)} ${r1(x+dx*k)} ${r1(y-90*k)} ${r1(x+dx*k*1.04)} ${y}" stroke="${trunk}" stroke-width="${r1(5*k*q)}" fill="none" stroke-linecap="round"/>`; });
  [[0,-330,92],[-80,-300,62],[82,-300,64],[-40,-360,56],[44,-364,58],[-124,-262,40],[126,-262,42]].forEach(([dx,dy,r])=>{ o+=`<circle cx="${r1(x+dx*k)}" cy="${r1(y+dy*k)}" r="${r1(r*k)}" fill="${leaf}"/>`; });
  return o; }

/* Pandava camp: tents with a warm lamp inside; every lamp goes dark at its own time (lamps[i] = planned second) */
function CAMPTENT(x,y,s,col,lampAt){ const L=lampAt!==undefined&&lampAt!==null;
  return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${r1(s)})"><path d="M-46 0 L0 -64 L46 0Z" fill="${col}"/><path d="M0 -64 L10 0 L-10 0Z" fill="#05071a" opacity=".55"/><path d="M-46 0 L0 -64" stroke="#e8c88a" stroke-width="1.6" opacity=".25" fill="none"/>`+
   `<path d="M0 -64 L0 -84" stroke="#30284a" stroke-width="2.4"/><path d="M0 -84 L18 -78 L0 -72Z" fill="#9a3a2a"/>`+
   (L? A(`fadeout:${lampAt}:.9`,`<ellipse cx="0" cy="-14" rx="46" ry="30" fill="url(#saf)" opacity=".9"/><path d="M-8 0 L0 -26 L8 0Z" fill="#ffd27a"/>`):`<path d="M-8 0 L0 -26 L8 0Z" fill="#0a0c24"/>`)+`</g>`; }
const CAMPROW = (y,s,xs,cols,lamps)=>xs.map((x,i)=>CAMPTENT(x,y+(i%2)*10*s,s*(1+((i*3)%4)*.06),cols[i%cols.length],lamps?lamps[i%lamps.length]:null)).join('');

/* a village lane: small mud huts with closed doors and a single dim window */
function HUT(x,y,s,wall){ return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-44" y="-62" width="88" height="62" fill="${wall||'#6a5a50'}"/><path d="M-58 -60 L0 -112 L58 -60Z" fill="#3a2e28"/><rect x="-10" y="-40" width="20" height="40" fill="#2a2018"/><rect x="-10" y="-40" width="20" height="40" fill="none" stroke="#1a120c" stroke-width="2"/><rect x="22" y="-48" width="12" height="12" fill="#e0a860" opacity=".5"/></g>`; }

/* open book (pothi-style) resting at the bottom, light rising out of it */
function OPENBOOK(x,y,s){ let lines=''; for(let i=0;i<6;i++){ lines+=`<path d="M${-150+i*2} ${-26+i*14} Q${-84} ${-34+i*14} ${-18} ${-22+i*14}" stroke="#9a7a48" stroke-width="2" fill="none" opacity=".55"/><path d="M${18} ${-22+i*14} Q${84} ${-34+i*14} ${150-i*2} ${-26+i*14}" stroke="#9a7a48" stroke-width="2" fill="none" opacity=".55"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">`+A('pulse:2.4',`<ellipse cx="0" cy="-30" rx="230" ry="120" fill="url(#gw)" opacity=".9"/>`)+
    `<path d="M-168 20 Q-84 -4 0 18 Q84 -4 168 20 L168 40 Q84 20 0 40 Q-84 20 -168 40Z" fill="#4a2a18"/>`+
    `<path d="M-160 14 Q-84 -14 0 8 L0 34 Q-84 12 -160 36Z" fill="#c9a86a"/><path d="M160 14 Q84 -14 0 8 L0 34 Q84 12 160 36Z" fill="#d6b87a"/>`+
    `<path d="M-156 8 Q-84 -22 0 0 L0 26 Q-84 4 -156 28Z" fill="#f0e0b0"/><path d="M156 8 Q84 -22 0 0 L0 26 Q84 4 156 28Z" fill="#f6e8be"/>`+
    `<path d="M-156 8 Q-84 -22 0 0 L0 26 Q-84 4 -156 28Z" fill="none" stroke="#b08a48" stroke-width="2"/><path d="M156 8 Q84 -22 0 0 L0 26 Q84 4 156 28Z" fill="none" stroke="#b08a48" stroke-width="2"/>`+
    `<g transform="translate(0 6) scale(1 .62)">${lines}</g><path d="M0 0 L0 28" stroke="#8a6a38" stroke-width="2.4"/></g>`; }
/* gold motes rising from the book */
const MOTES = (x,y,n)=>{ let o=''; for(let i=0;i<n;i++) o+=A(`drift:${(i%5-2)*14}:${-190-i*14}:${3.4+i%4}`,`<circle cx="${x+(i*37)%160-80}" cy="${y-(i*13)%30}" r="${2+i%3}" fill="#ffe9a8" opacity=".9"/>`); return o; };

/* the seven lights (Chiranjeevi): each rises, glows and keeps breathing. First one is warm red-gold (Ashwatthama's gem colour). */
const SEVEN_COLS = ['#ff9a6a','#ffe08a','#ffc46a','#fff3d0','#bfe0ff','#ffb8c8','#c8f0b8'];
const SEVEN_XY   = [[90,430],[160,360],[225,318],[270,300],[315,318],[380,360],[450,430]];
function SEVEN(delay,step,k){ k=k||1; let o=''; SEVEN_XY.forEach(([x,y],i)=>{ const c=SEVEN_COLS[i], d=(delay+i*step).toFixed(2);
  o+=A(`pop:${d}`,A(`bob:6:${(1.3+i*.17).toFixed(2)}`,A(`pulse:${(1.6+i*.2).toFixed(2)}`,`<circle cx="${x}" cy="${y}" r="${46*k}" fill="${c}" opacity=".22"/><circle cx="${x}" cy="${y}" r="${24*k}" fill="${c}" opacity=".5"/>`)+`<circle cx="${x}" cy="${y}" r="${9*k}" fill="#fffdf2"/><circle cx="${x}" cy="${y}" r="${5*k}" fill="${c}"/>`)); });
  return o; }
const SEVEN_SFX = (first,step)=>SEVEN_XY.map((_,i)=>[+(first+i*step).toFixed(2),'bell',.5]);

/* curse thread: a red-gold arc beside the timeline that is drawn, then dissolves into sparks when the curse ends */
const CURSE_ARC = (x,y1,y2,drawAt,endAt)=>A(`fadeout:${endAt}:1.2`,
  A(`draw:${drawAt}:1.6`,`<path d="M${x} ${y1} C${x+46} ${y1+90} ${x+46} ${y2-90} ${x} ${y2}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" fill="none" stroke="#ff9a5a" stroke-width="5" stroke-linecap="round"/>`)+
  A(`fadein:${drawAt+1.2}:.5`,`<text transform="translate(${x+20} ${(y1+y2)/2}) rotate(90)" text-anchor="middle" font-size="26" fill="#ffc58a" stroke="#120a06" stroke-width="5" stroke-linejoin="round" paint-order="stroke" style="font-weight:800">+3,000 साल</text>`));
const CURSE_SPARKS = (x,y,at)=>{ let o=''; for(let i=0;i<12;i++){ const a=i/12*Math.PI*2; o+=A(`fadein:${at}:.1`,A(`fadeout:${at+.6}:.9`,A(`slide:${r1(Math.cos(a)*70)}:${r1(Math.sin(a)*70)}:1.1:${at}`,`<circle cx="${x}" cy="${y}" r="${3+i%3}" fill="${i%2?'#ffd88a':'#ff9a5a'}"/>`))); } return o; };

/* small label on the timeline line, e.g. "36 साल" between two dates */
const GAPTAG = (x,y,text,at)=>A(`pop:${at}`,`<rect x="${x-62}" y="${y-19}" width="124" height="38" rx="19" fill="#1a1030" stroke="#c8a85a" stroke-width="2"/><text x="${x}" y="${y+8}" text-anchor="middle" font-size="22" fill="#ffe9b8" style="font-weight:800">${text}</text>`);

/* two light-orbs for the final choice (left = curse, right = shloka) */
const ORB = (x,y,col,r,speed)=>A(`pulse:${speed}`,`<circle cx="${x}" cy="${y}" r="${r*1.8}" fill="${col}" opacity=".2"/><circle cx="${x}" cy="${y}" r="${r}" fill="${col}" opacity=".45"/>`)+`<circle cx="${x}" cy="${y}" r="${r*.34}" fill="#fffdf0"/>`;

/* silhouette costumes (the gem keeps glowing: its colour is drawn on top) */
const SIL_A = {skin:'#080b16', top:'#080b16', bottom:'#080b16', shin:'#080b16', foot:'#080b16', sash:'#080b16', cape:'#080b16', beard:'black', hair:'long', earring:false};
const SIL_V = {skin:'#0c0a12', top:'#0c0a12', bottom:'#0c0a12', shin:'#0c0a12', foot:'#0c0a12', turban:'#0c0a12', jewel:false};

/* a slow, tired walk in profile (arms hang and swing a little) */
const WALK = (n,per,lean)=>{ const o=[]; for(let i=0;i<n;i++) o.push([i*per, i%2?{a:[-22,26],b:[26,26],lean:lean||6}:{a:[26,26],b:[-22,26],lean:lean||6}]); return o; };
/* gentle weight-shift so a standing figure never freezes */
const SW = (base,from,to,step)=>{ const o=[]; let k=0; for(let t=from;t<to;t+=step){ o.push([t,Object.assign({},base,{lean:(k%2?-2:2),drop:(k%2?0:1.4)}),step*.9]); k++; } return o; };
const GLINTS = (n,col)=>{ let o=''; for(let i=0;i<(n||10);i++) o+=A(`drift:${-40-i*10}:${-220-i*18}:${4+i%5}`,`<circle cx="${(i*97)%540}" cy="${720+(i*53)%240}" r="${2+i%3}" fill="${col||'#f0e8c8'}" opacity=".7"/>`); return o; };

VIDEO({
  title:'अश्वत्थामा का श्राप', format:'short', target:64,
  handheld:0.7, music:'scenes',
  keywords:['श्रीकृष्ण','अश्वत्थामा','3,000','2,000','श्राप','श्लोक','सात','अमर','3102','3138','138','BCE','कमेंट्स'],
  shots:[
    /* 1 — a lone silhouette walks a moonlit dune under a huge moon; the camera pushes in low. Only the gem glows. */
    { line:'भगवान श्रीकृष्ण ने अश्वत्थामा को 3,000 साल तक भटकने का श्राप दिया था,', scene:'ash-wander-moon', mood:'calm', fx:'dust', capTop:130,
      cam:{keys:[[0,270,700,1.0],[3.7,300,690,1.45,'spring']]},
      sky:()=>NIGHT_SKY()+stars(70,520)+BIGMOON(330,400,122), far:()=>DUNES(700,50,'#34455e','#a8b2c0',.4)+WIND(660,5), mid:()=>DUNES(790,44,'#242f46','#8a96a8',2.1),
      art:()=>DUNES(865,30,'#161c30','#6a7488',3.3)+PRINTS(20,200,886,8), near:()=>WIND(900,4,'#c8c0b8'),
      cast:[{c:ASHWATTHAMA, with:SIL_A, facing:'side', x:290, y:872, s:1.18, expr:'sad', walk:{from:-240, dur:3.7}, acts:WALK(7,.62,7)}] },

    /* 2 — time passes: the stars wheel over the same wanderer, tiny on a vast desert; the camera pulls back */
    { line:'और पुरानी तारीखों के हिसाब से वे 3,000 साल आज से 2,000 साल पहले ही पूरे हो चुके हैं।', scene:'ash-wander-moon', mood:'calm', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,300,700,1.7],[4.8,270,560,1.0]]},
      sky:()=>NIGHT_SKY()+STARTRAILS(270,-140,70)+SHOOT(120,200,2.6), far:()=>DUNES(690,40,'#34455e','#a8b2c0',1.2)+WIND(650,5), mid:()=>DUNES(780,36,'#242f46','#8a96a8',.3)+DEADTREE(430,780,.9),
      art:()=>DUNES(870,28,'#161c30','#6a7488',2.4)+PRINTS(0,260,894,12), near:()=>WIND(910,4,'#c8c0b8'),
      cast:[{c:ASHWATTHAMA, with:SIL_A, facing:'side', x:330, y:880, s:.62, expr:'sad', walk:{from:-300, dur:4.8}, acts:WALK(9,.66,6)}] },

    /* 3 — close-up: his tired face; the gem glows softly */
    { line:'हम सबने यही सुना है कि अश्वत्थामा आज भी ज़िंदा हैं', scene:'ash-forehead', mood:'sad', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,660,1.6],[3,270,625,2.15]]},
      sky:()=>DUSK_SKY()+BIGMOON(110,300,60), far:()=>DUNES(740,40,'#3a4a60','#98a4b2',.8), art:()=>DUNES(860,30,'#202838','#7a8498',1.7)+FIREFLIES(8,'#ffd8a0'),
      cast:[{c:ASHWATTHAMA, x:270, y:925, s:1.18, expr:'sad', acts:[[0,'stand'],[1.2,{head:-3,lean:2},1.0]]}] },

    /* 4 — the wound: extreme close-up of the gem, then a slow pull back to the lonely man in the forest */
    { line:'और अपने माथे के कभी न भरने वाले ज़ख्म के साथ धरती पर भटक रहे हैं।', scene:'ash-forehead', mood:'sad', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,545,3.6],[1.5,270,560,3.2],[3.8,270,700,1.25,'spring']]},
      sky:()=>DUSK_SKY(), far:()=>BANYAN(90,800,.55,'#18332e','#1d423a')+BANYAN(440,800,.6,'#18332e','#1d423a')+BANYAN(270,790,.5,'#18332e','#214a40'), mid:()=>BANYAN(-10,900,.9,'#102620','#14322a')+BANYAN(540,900,.95,'#102620','#14322a'),
      art:()=>`<path d="M-20 880 Q270 850 560 878 L560 1000 L-20 1000Z" fill="#172a28"/>`+FIREFLIES(12), near:()=>FIREFLIES(5,'#fff0b0'),
      cast:[{c:ASHWATTHAMA, x:270, y:925, s:1.18, expr:'sad', acts:[[0,'stand'],[2.4,{head:2,lean:3,drop:2},1.2]]}] },

    /* 5 — Krishna, calm and stern: a dotted arc of time over him, a light bead travelling along it (a fixed span) */
    { line:'लेकिन महाभारत में दिए गए इस श्राप के साथ एक तय समय भी जुड़ा है।', scene:'ash-krishna', mood:'divine', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.1],[3.8,270,640,1.35]]},
      sky:()=>skyBand([[0,'#0a1030'],[.5,'#1a2a62'],[.85,'#46508a'],[1,'#b8a0b0']])+stars(60,560)+`<circle cx="270" cy="610" r="300" fill="url(#gw)" opacity=".22"/>`,
      far:()=>DUNES(790,30,'#2a3866','#8a98c8',2.2),
      art:()=>`<path d="M-20 900 Q270 878 560 898 L560 1000 L-20 1000Z" fill="#1a2248"/>`+
        A('draw:.4:2.2',`<path d="M60 420 C130 150 410 150 480 420" pathLength="1" stroke-dasharray=".012 .018" stroke-dashoffset="1" fill="none" stroke="#f0d79a" stroke-width="4" stroke-linecap="round"/>`)+
        A('orbit:210:150:270:300:7',`<circle cx="270" cy="300" r="16" fill="url(#gw)"/><circle cx="270" cy="300" r="6" fill="#fff8d8"/>`),
      cast:[{c:KRISHNA, with:{aura:'gw'}, x:270, y:925, s:1.12, expr:'serene', acts:[[0,'stand'],[1.2,'explain',.7],[3.0,'stand',.7]]}] },

    /* 6 — the Pandava camp at night: lamps go dark one by one; far at the edge a tall silhouette with a faint glow, walking away. Nothing violent. */
    { line:'पांडवों के सोते हुए शिविर पर रात में हमला करने के बाद,', scene:'ash-camp-dark', mood:'sad', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,150,640,1.25],[3.3,400,660,1.25]]},
      sky:()=>CAMP_SKY()+stars(90,560)+`<circle cx="120" cy="190" r="26" fill="#f2ead0" opacity=".9"/><circle cx="132" cy="182" r="24" fill="#0c1230"/>`,
      far:()=>DUNES(700,26,'#161c3e','#4a5486',1.1)+CAMPROW(742,.62,[40,120,200,290,380,470,540],['#222a52','#2a2450'],[.5,.9,1.2,1.5,1.8,2.1,2.4]),
      mid:()=>CAMPROW(836,1.1,[70,230,400,520],['#262e5a','#2e2858'],[.7,1.1,1.6,2.0])+`<path d="M-20 842 Q270 826 560 842 L560 1000 L-20 1000Z" fill="#0e1230"/>`,
      art:()=>`<path d="M-20 902 Q270 888 560 902 L560 1000 L-20 1000Z" fill="#0a0d26"/>`+FIREFLIES(0),
      near:()=>A('drift:60:0:14',`<ellipse cx="100" cy="900" rx="260" ry="26" fill="#8a90c8" opacity=".12"/><ellipse cx="460" cy="920" rx="240" ry="22" fill="#8a90c8" opacity=".1"/>`),
      cast:[{c:ASHWATTHAMA, with:SIL_A, facing:'side', x:520, y:760, s:.5, expr:'sad', walk:{from:-60, dur:3.3}, acts:WALK(6,.66,6)}] },

    /* 7 — pre-dawn: Krishna speaks to Ashwatthama, who bows his head */
    { line:'महाभारत के सौप्तिक पर्व में श्रीकृष्ण अश्वत्थामा से कहते हैं', scene:'ash-krishna', mood:'divine', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.1],[1.3,150,660,1.5],[3.5,380,660,1.5]]},
      sky:GREY_DAWN, far:()=>DUNES(740,30,'#6a6a8c','#f0d0a8',.5)+CAMPROW(780,.5,[60,150,430,500],['#4a4a74','#54487a'],null), art:()=>DUNES(880,24,'#3a3a5a','#e8c8a0',2)+GLINTS(8),
      cast:[
        {c:ASHWATTHAMA, x:150, y:925, s:1.12, expr:'sad', acts:[[0,'bowHead']]},
        {c:KRISHNA, with:{aura:'gw'}, x:400, y:925, s:1.12, flip:true, expr:'serene', talk:true, acts:[[0,'stand'],[.8,'explain',.7],[2.4,'point',.5]]}] },

    /* 8 — he drifts alone between huge banyan trunks, hunched and ill; the camera tracks and trunks slide past in front (hiding) */
    { line:'कि वह 3,000 साल तक अकेले, बीमार और सबसे छिपकर भटकता रहेगा,', scene:'ash-lonely', mood:'sad', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,150,700,1.2],[3.4,400,690,1.2]]},
      sky:DUSK_SKY, far:()=>BANYAN(60,810,.5,'#1a3a34','#204a42')+BANYAN(250,800,.5,'#1a3a34','#204a42')+BANYAN(470,810,.5,'#1a3a34','#204a42'),
      mid:()=>BANYAN(120,880,.85,'#10281f','#14352a')+BANYAN(430,890,.9,'#10281f','#14352a'),
      art:()=>`<path d="M-20 890 Q270 866 560 888 L560 1000 L-20 1000Z" fill="#142824"/>`+FIREFLIES(14),
      near:()=>`<rect x="-30" y="-20" width="110" height="1100" fill="#08130f"/><rect x="470" y="-20" width="120" height="1100" fill="#08130f"/>`+FIREFLIES(6,'#fff0b0'),
      cast:[{c:ASHWATTHAMA, facing:'side', x:290, y:915, s:1.12, expr:'sad', walk:{from:-260, dur:3.4}, acts:WALK(6,.72,13)}] },

    /* 9 — a village lane: people turn away and walk off; he stands apart. No one speaks to him. */
    { line:'और कोई उससे बात नहीं करेगा।', scene:'ash-lonely', mood:'sad', fx:'dust', tr:'dissolve', capTop:130,
      cam:{keys:[[0,300,700,1.15],[2.4,330,700,1.35]]},
      sky:DUSK_SKY, far:()=>HUT(70,820,.8,'#5a5a56')+HUT(250,830,.85,'#625a52')+HUT(440,820,.8,'#5a5a56'), art:()=>`<path d="M-20 880 Q270 862 560 880 L560 1000 L-20 1000Z" fill="#2a3030"/>`+GLINTS(6),
      cast:[
        {c:VILLAGER, with:SIL_V, facing:'side', flip:true, x:90, y:905, s:.78, walk:{from:150, dur:2.0}, exit:{at:1.5, fade:.6}, acts:WALK(6,.6,4)},
        {c:VILLAGER, with:SIL_V, facing:'side', flip:true, x:200, y:915, s:.86, walk:{from:150, dur:2.0}, exit:{at:1.7, fade:.6}, acts:WALK(6,.6,4)},
        {c:ASHWATTHAMA, x:420, y:925, s:1.05, flip:true, expr:'sad', acts:[[0,'stand'],[.8,'lookDown',.8]]}] },

    /* 10 — "now understand the time": tilt up from the dunes into a wide starry sky; a thin shooting star */
    { line:'अब समय का हिसाब समझिए।', scene:'ash-time-sky', mood:'hope', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,770,1.45],[2.2,270,380,1.45]]},
      sky:()=>TIME_SKY()+stars(110,900)+SHOOT(330,250,.9), far:()=>DUNES(860,24,'#241a46','#8a74d0',1.5), art:()=>DUNES(930,18,'#130d2c','#6a58b0',.6),
      cast:[{c:ASHWATTHAMA, with:SIL_A, x:150, y:975, s:.62, expr:'calm', acts:[[0,'lookUp']]}] },

    /* 11 — timeline part 1: 3102 BCE (Kali Yuga) named first, then the war date above it */
    { line:'मान्यताओं के अनुसार, महाभारत युद्ध के 36 साल बाद 3102 BCE (ईसा से 3,102 साल पहले) कलियुग शुरू हुआ था—यानी युद्ध करीब 3138 BCE में हुआ था।', scene:'ash-timeline', mood:'hope', fx:'stars', tr:'dissolve', capTop:110, cam:{keys:[[0,270,480,1.0],[7.6,270,500,1.07]]},
      art:()=>TIME_SKY()+stars(70,900)+
        timeline(270,230,[{t:'3138 BCE',d:'महाभारत युद्ध',at:5.6},{t:'3102 BCE',d:'कलियुग शुरू',hi:true,at:3.0}],{gap:210,delay:.3,step:1.0})+GAPTAG(270,335,'36 साल',3.9) },

    /* 12 — timeline part 2: add 3,000 years: the curse thread runs from 3138 to 138 BCE and dissolves; "today" appears below */
    { line:'अगर इसमें 3,000 साल जोड़ दें, तो यह श्राप करीब 138 BCE में ही खत्म हो चुका है।', scene:'ash-timeline', mood:'hope', fx:'stars', tr:'cut', capTop:110, cam:'fit',
      focus:{at:2.8, sound:'revive', dur:3.4, duck:.35},
      art:()=>TIME_SKY()+stars(70,900)+
        timeline(270,230,[{t:'3138 BCE',d:'महाभारत युद्ध',at:.1},{t:'3102 BCE',d:'कलियुग शुरू',at:.1},{t:'138 BCE',d:'श्राप खत्म',hi:true,at:2.8},{t:'आज',d:'2,000 साल बाद',at:3.9}],{gap:210,delay:.05,step:.12})+
        CURSE_ARC(478,230,650,.5,3.2)+CURSE_SPARKS(270,650,2.8) },

    /* 13 — back to him: a quiet question, he looks up at the stars */
    { line:'तो फिर उनके हमेशा ज़िंदा रहने की बात कहाँ से आई?', scene:'ash-how', mood:'calm', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.1],[3,270,640,1.4]]},
      sky:()=>NIGHT_SKY()+stars(90,560)+BIGMOON(420,260,52), far:()=>DUNES(740,40,'#34455e','#a8b2c0',.9), art:()=>DUNES(870,26,'#161c30','#6a7488',2.8)+GLINTS(6),
      cast:[{c:ASHWATTHAMA, x:230, y:925, s:1.1, expr:'calm', acts:[[0,'stand'],[.9,'lookUp',.8],[2.2,'think',.7]]}] },

    /* 14 — the shloka: an open book glows; the verse is written above it (calligraphy, shown while the narrator speaks normally) */
    { line:'यह बात श्रीकृष्ण के श्राप से नहीं, बल्कि बाद के एक श्लोक से आती है,', scene:'ash-shloka', mood:'divine', fx:'sparks', tr:'dissolve', nocap:true,
      cam:{keys:[[0,270,520,1.0],[4,270,560,1.15]]},
      sky:()=>skyBand([[0,'#0a0618'],[.55,'#1a1038'],[1,'#2e1c40']])+stars(60,700)+`<circle cx="270" cy="760" r="320" fill="url(#gw)" opacity=".28"/>`,
      art:()=>OPENBOOK(270,780,1.3)+MOTES(270,740,12),
      calli:{lines:['अश्वत्थामा बलिर्व्यासो','हनूमांश्च विभीषणः।','कृपः परशुरामश्च','सप्तैते चिरजीविनः॥'], source:'चिरंजीवी श्लोक', y:190, size:38, col:'#ffe9a8', delay:.3, gap:.7, write:.7, glow:true, scrim:true, silent:true} },

    /* 15 — seven lights rise: the seven immortals, a soft chime for each */
    { line:'जिसमें उन सात अमर लोगों के नाम हैं जो कभी नहीं मरते।', scene:'ash-seven', mood:'divine', fx:'stars', tr:'dissolve', capTop:130,
      sfx:SEVEN_SFX(.3,.28),
      cam:{keys:[[0,270,560,1.0],[3.2,270,470,1.2]]},
      sky:()=>skyBand([[0,'#070a22'],[.5,'#16214a'],[.85,'#2c2f5c'],[1,'#4a3a58']])+stars(100,700),
      far:()=>DUNES(830,26,'#1c2044','#6a74b0',.4), art:()=>DUNES(905,20,'#0e1030','#505a98',1.9)+SEVEN(.3,.28)+A('fadein:2.2:1.0',A('pulse:3',`<ellipse cx="270" cy="400" rx="250" ry="140" fill="url(#gw)" opacity=".28"/>`)),
      cast:[] },

    /* 16 — the choice: curse (left, Krishna) or shloka (right, book); he looks at each in turn */
    { line:'तो आप किस पर यकीन करते हैं—महाभारत के उस श्राप पर, या उस श्लोक पर?', scene:'ash-choice', mood:'calm', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.0],[3.9,270,660,1.12]]},
      sky:()=>skyBand([[0,'#0a1030'],[.5,'#1a2658'],[.85,'#3a3a70'],[1,'#7a6a88']])+stars(90,600), far:()=>DUNES(800,30,'#242a5a','#7a86c0',1.1),
      art:()=>DUNES(905,18,'#12163a','#5a66a8',2.3)+ORB(90,640,'#ffc58a',44,2.2)+A('fadein:2.5:.7',OPENBOOK(440,720,.5))+A('fadein:2.5:.7',ORB(440,640,'#ffe9a8',40,2.6)),
      cast:[
        {c:KRISHNA, x:92, y:880, s:.66, expr:'serene', acts:[[0,'stand'],[1.4,'bless',.7]]},
        {c:ASHWATTHAMA, x:270, y:930, s:1.0, expr:'calm', acts:[[0,'stand'],[1.2,'lookL',.5],[2.6,'lookR',.5]]}] },

    /* 17 — he walks on across the dune under the seven faint lights; slow natural ending */
    { line:'कमेंट्स में ज़रूर बताएं!', scene:'ash-farewell', mood:'calm', fx:'stars', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,700,1.1],[5,270,660,1.0]]},
      sky:()=>NIGHT_SKY()+stars(100,560)+BIGMOON(340,330,100), far:()=>DUNES(740,40,'#34455e','#a8b2c0',.4), mid:()=>DUNES(810,34,'#242f46','#8a96a8',2.1),
      art:()=>DUNES(885,26,'#161c30','#6a7488',3.3)+PRINTS(10,250,904,8)+A('fadein:.4:1.4',SEVEN(0,.1,.55)),
      cast:[{c:ASHWATTHAMA, with:SIL_A, facing:'side', x:310, y:896, s:.9, expr:'sad', walk:{from:-200, dur:5}, acts:WALK(8,.66,6)}] },
  ],
});
