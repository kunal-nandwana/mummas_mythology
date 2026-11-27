/* मरुत: 49 हवा के देवता — Short, about 85 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js marut-49-short-form
   Look: Indra's vajra close-up (result first) -> "rewind" to the family tree -> forest ashram at dawn (peach + green) -> Indralok (cool blue + silver cloud)
         -> one year of seasons round Diti -> dusk, a lamp goes out -> golden womb-light, 7 -> 49 lights -> 49 sleeping wind-babies wake
         -> night Lanka (deep teal sky, amber fire, NOT red) and 49 winds.
   Story beat: a trick / disguise, never a fight. Indra is anxious, then ashamed and tender (never a villain). Nothing of the baby's body is ever drawn:
         only a golden light, a thin line of lightning, lights splitting 7 -> 49, then tiny wind-swirl babies.
   No hook text, no intro, no end card, no "?" mark, no red moon, no blood. Front rig; facing:'side' only for the servant Indra's walk-in. */

/* ---------- small helpers (own, new for this video) ---------- */
const SOFT = (x,y,r,col,op)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" opacity="${r1(op*.3)}"/><circle cx="${x}" cy="${y}" r="${r1(r*.68)}" fill="${col}" opacity="${r1(op*.5)}"/><circle cx="${x}" cy="${y}" r="${r1(r*.38)}" fill="${col}" opacity="${op}"/>`;
const HEX7 = (cx,cy,r)=>[[cx,cy]].concat([0,1,2,3,4,5].map(i=>{ const a=Math.PI/3*i+Math.PI/6; return [cx+Math.cos(a)*r, cy+Math.sin(a)*r]; }));
const HEX49 = (cx,cy,R,r)=>HEX7(cx,cy,R).reduce((a,p)=>a.concat(HEX7(p[0],p[1],r)),[]);

/* the vajra: a gold rod with four curved prongs closing to a point at each end; `glow` adds a soft pulsing halo */
const VAJRA = (x,y,s,rot,glow)=>{
  const prong=(d,w)=>`<path d="${d}" fill="none" stroke="#d9a21f" stroke-width="${w+4}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#f6d870" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff6c8" stroke-width="2" stroke-linecap="round" opacity=".8" transform="translate(-1.5 0)"/>`;
  const half = prong('M-20 -44 C-62 -86 -46 -138 0 -172',9)+prong('M20 -44 C62 -86 46 -138 0 -172',9)+prong('M-8 -44 C-28 -86 -18 -128 0 -172',7)+prong('M8 -44 C28 -86 18 -128 0 -172',7)+`<path d="M-9 -44 L0 -176 L9 -44Z" fill="#f6d870" stroke="#d9a21f" stroke-width="3"/>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot||0}) scale(${s})">`+(glow?A('pulse:2.4',SOFT(0,0,200,'#ffe9a0',.6)):'')+
    half+`<g transform="scale(1 -1)">${half}</g>`+
    `<rect x="-26" y="-34" width="52" height="68" rx="12" fill="#e8b830" stroke="#b9831a" stroke-width="3"/><rect x="-30" y="-16" width="60" height="9" rx="4" fill="#f6d870" stroke="#b9831a" stroke-width="2"/><rect x="-30" y="7" width="60" height="9" rx="4" fill="#f6d870" stroke="#b9831a" stroke-width="2"/><circle r="9" fill="#8fd8ff" stroke="#fff" stroke-width="2"/></g>`; };

/* a thin, jagged line of light (never a bolt strike): from (x1,y1) to (x2,y2) */
const THREAD = (x1,y1,x2,y2,w,col)=>{ const n=9, off=[0,10,-12,9,-11,12,-9,7,-4,0]; let d=`M${x1} ${y1}`;
  for(let i=1;i<=n;i++){ const t=i/n, px=-(y2-y1), py=(x2-x1), L=Math.hypot(px,py)||1; d+=` L${r1(x1+(x2-x1)*t+px/L*off[i]*(w||1))} ${r1(y1+(y2-y1)*t+py/L*off[i]*(w||1))}`; }
  return `<path d="${d}" fill="none" stroke="${col||'#9fd0ff'}" stroke-width="${7*(w||1)}" stroke-linecap="round" stroke-linejoin="round" opacity=".35"/><path d="${d}" fill="none" stroke="#fff" stroke-width="${2.4*(w||1)}" stroke-linecap="round" stroke-linejoin="round"/>`; };

/* cool, bright Indralok: cloud floor, silver spires, pillars, a gold throne */
const CLOUDS_ROW = (y,col,op,n,sc)=>{ let o=''; for(let i=0;i<n;i++){ const x=-20+i*(580/(n-1)), k=sc*(.8+((i*5)%4)*.14); o+=`<g opacity="${op}" fill="${col}"><ellipse cx="${r1(x)}" cy="${y}" rx="${r1(70*k)}" ry="${r1(26*k)}"/><ellipse cx="${r1(x-34*k)}" cy="${r1(y+8*k)}" rx="${r1(46*k)}" ry="${r1(20*k)}"/><ellipse cx="${r1(x+36*k)}" cy="${r1(y+6*k)}" rx="${r1(50*k)}" ry="${r1(22*k)}"/></g>`; } return o; };
const SPIRE = (x,y,w,h,col,hi)=>`<path d="M${x-w/2} ${y} L${x-w/2} ${y-h*.62} Q${x-w*.62} ${y-h*.78} ${x} ${y-h} Q${x+w*.62} ${y-h*.78} ${x+w/2} ${y-h*.62} L${x+w/2} ${y}Z" fill="${col}"/><path d="M${x} ${y-h} Q${x+w*.62} ${y-h*.78} ${x+w/2} ${y-h*.62} L${x+w/2} ${y} L${x+w*.1} ${y}Z" fill="${hi}" opacity=".5"/><path d="M${x} ${y-h} L${x} ${y-h-26}" stroke="#e8c04a" stroke-width="3"/><circle cx="${x}" cy="${y-h-28}" r="4" fill="#ffe9a0"/>`;
const PILLAR = (x,y0,w,col)=>`<rect x="${x-w/2}" y="${y0}" width="${w}" height="${1000-y0}" fill="${col}"/><rect x="${r1(x-w/2)}" y="${y0}" width="${r1(w*.22)}" height="${1000-y0}" fill="#fff" opacity=".4"/><rect x="${r1(x-w*.72)}" y="${y0-16}" width="${r1(w*1.44)}" height="18" rx="4" fill="${col}"/><rect x="${r1(x-w*.72)}" y="${y0-16}" width="${r1(w*1.44)}" height="5" fill="#fff" opacity=".45"/>`;
const THRONE = (x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-84 0 L-84 -250 Q-84 -330 0 -350 Q84 -330 84 -250 L84 0Z" fill="#e8b83a" stroke="#a8741a" stroke-width="4"/><path d="M-62 -10 L-62 -246 Q-62 -306 0 -322 Q62 -306 62 -246 L62 -10Z" fill="#3a63b0"/><path d="M-62 -246 Q-62 -306 0 -322 Q62 -306 62 -246" fill="none" stroke="#ffe9a0" stroke-width="3"/><circle cy="-286" r="14" fill="#8fd8ff" stroke="#fff6c8" stroke-width="3"/><rect x="-96" y="-8" width="192" height="40" rx="8" fill="#f2c94a" stroke="#a8741a" stroke-width="4"/><rect x="-110" y="26" width="220" height="26" rx="6" fill="#d9a21f"/></g>`;
const DEEP_SKY = ()=>skyBand([[0,'#0e1a46'],[.5,'#243e82'],[1,'#4e72b4']]);
const INDRA_SKY = ()=>skyBand([[0,'#3f6bb8'],[.32,'#86aee4'],[.66,'#cddff5'],[1,'#f1f5fb']]);

/* dawn in the forest (peach + green), slender ashoka-like trees, grassy floor */
const DAWN_SKY = ()=>skyBand([[0,'#f6c4a0'],[.3,'#fbdcb4'],[.62,'#e4ebb8'],[1,'#a7d09a']])+`<circle cx="380" cy="470" r="230" fill="#fff0c4" opacity=".4"/><circle cx="380" cy="470" r="60" fill="#fff6d6" opacity=".9"/>`;
const TREEA = (x,y,s,col,dk)=>`<path d="M${r1(x-6*s)} ${y} Q${r1(x-4*s)} ${r1(y-120*s)} ${r1(x-2*s)} ${r1(y-190*s)} L${r1(x+3*s)} ${r1(y-190*s)} Q${r1(x+5*s)} ${r1(y-120*s)} ${r1(x+7*s)} ${y}Z" fill="${dk}"/>`+
  [[0,-232,52,34],[-34,-190,40,26],[36,-198,42,28],[2,-280,34,24],[-8,-150,34,22]].map(([dx,dy,rx,ry])=>`<ellipse cx="${r1(x+dx*s)}" cy="${r1(y+dy*s)}" rx="${r1(rx*s)}" ry="${r1(ry*s)}" fill="${col}"/>`).join('');
const GROVE = (y,n,sc,col,dk,off)=>{ let o=''; for(let i=0;i<n;i++){ o+=TREEA(r1((off||0)+i*(570/(n-1))-15), y+((i*7)%3)*10, sc*(.8+((i*5)%4)*.13), col, dk); } return o; };
const GRASS = (y,c1,c2)=>`<path d="M-20 ${y} Q270 ${y-30} 560 ${y-6} L560 1000 L-20 1000Z" fill="${c1}"/><path d="M-20 ${y+44} Q270 ${y+14} 560 ${y+34} L560 1000 L-20 1000Z" fill="${c2}" opacity=".5"/>`;
const SUNSHAFTS = (op)=>A('pulse:6',`<path d="M300 -20 L120 1000 L210 1000 L400 -20Z M420 -20 L360 1000 L460 1000 L520 -20Z" fill="#fff4c4" opacity="${op||.16}"/>`);

/* a year in three seasons (monsoon, winter, spring) as full skies + falling things */
const SEASON_SKY = (k)=>[[[0,'#46586e'],[.5,'#6a7f94'],[1,'#98ae9e']],[[0,'#a4b6d6'],[.5,'#d4deef'],[1,'#f0f3f8']],[[0,'#ffd4c0'],[.5,'#fbeccc'],[1,'#bfe0a0']]].map(st=>skyBand(st))[k];
const RAIN = (op)=>{ let o=''; for(let i=0;i<28;i++){ const x=(i*47)%580-20, y=(i*131)%860; o+=A(`drift:-40:300:${(.8+(i%4)*.14).toFixed(2)}`,`<path d="M${x} ${y} l-6 28" stroke="#e2eef8" stroke-width="2" opacity="${op}" stroke-linecap="round"/>`); } return o; };
const FLAKES = (op)=>{ let o=''; for(let i=0;i<26;i++){ const x=(i*61)%560, y=(i*113)%820; o+=A(`drift:${(i%2?18:-18)}:260:${(5+(i%5)).toFixed(1)}`,`<circle cx="${x}" cy="${y}" r="${(2+(i%3)*.8).toFixed(1)}" fill="#fff" opacity="${op}"/>`); } return o; };
const BLOSSOMS = (op)=>{ let o=''; for(let i=0;i<22;i++){ const x=(i*53)%560, y=(i*97)%800; o+=A(`drift:${-50+(i%3)*14}:280:${(4.5+(i%4)*.7).toFixed(1)}`,`<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#ffb3c6" opacity="${op}" transform="rotate(${(i*37)%90} ${x} ${y})"/>`); } return o; };

/* the "year ring": a thin ring that draws itself round (about 94% closed) */
const YEAR_RING = (cx,cy,r,delay,dur,col)=>{ const a0=-Math.PI/2, a1=a0+Math.PI*2*.94; return A(`draw:${delay}:${dur}`,`<path d="M${r1(cx+Math.cos(a0)*r)} ${r1(cy+Math.sin(a0)*r)} A${r} ${r} 0 1 1 ${r1(cx+Math.cos(a1)*r)} ${r1(cy+Math.sin(a1)*r)}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" fill="none" stroke="${col||'#ffe9a0'}" stroke-width="5" stroke-linecap="round"/>`); };

/* dusk close-up pieces: bare feet (a little dusty: not washed) and a tilted lamp that flickers, then goes out */
const FOOT = (x,y,s,flip)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})"><ellipse cx="0" cy="0" rx="40" ry="104" fill="#c18a62" stroke="#8a5a3c" stroke-width="3"/><ellipse cx="-6" cy="-24" rx="18" ry="52" fill="#d3a07a" opacity=".6"/>`+
  [[-30,-98,11],[-14,-116,10],[4,-120,10],[22,-114,9],[36,-100,8]].map(([dx,dy,r])=>`<circle cx="${dx}" cy="${dy}" r="${r}" fill="#c9946e" stroke="#8a5a3c" stroke-width="2"/>`).join('')+
  [[-20,60,8],[14,72,10],[-4,20,6],[22,34,7],[-26,-20,5],[10,-52,6],[0,92,9]].map(([dx,dy,r])=>`<ellipse cx="${dx}" cy="${dy}" rx="${r}" ry="${r*.6}" fill="#6e4e32" opacity=".5"/>`).join('')+`</g>`;
const LAMP = (x,y,s,outAt)=>`<g transform="translate(${x} ${y}) rotate(-24) scale(${s})"><ellipse cx="0" cy="36" rx="58" ry="12" fill="#000" opacity=".25"/><path d="M-52 0 Q-48 44 0 46 Q48 44 52 0Z" fill="#c4802e" stroke="#7a4a14" stroke-width="3"/><ellipse cx="0" cy="0" rx="52" ry="12" fill="#e0a04a" stroke="#7a4a14" stroke-width="3"/><ellipse cx="0" cy="2" rx="40" ry="7" fill="#3a2410"/>`+
  A(`fadeout:${outAt}:.5`, A('pulse:7',SOFT(0,-44,90,'#ffb84a',.5))+A('flick:9',`<path d="M0 -4 Q-18 -30 0 -76 Q18 -30 0 -4Z" fill="#ff9a2e"/><path d="M0 -6 Q-9 -28 0 -58 Q9 -28 0 -6Z" fill="#ffd36a"/><path d="M0 -8 Q-4 -24 0 -40 Q4 -24 0 -8Z" fill="#fff4c8"/>`))+
  A(`fadein:${outAt+.2}:.5`, A('drift:10:-120:2.6',`<path d="M0 -10 Q-14 -40 4 -66 Q18 -92 0 -122" fill="none" stroke="#c8c0b8" stroke-width="6" stroke-linecap="round" opacity=".6"/>`))+`</g>`;

/* golden womb-light: only light, nothing else (a soft pulsing oval + slow rings) */
const WOMB = (x,y,s,glow)=>`<g transform="translate(${x} ${y}) scale(${s})">`+A('beat:0:0:.05:46',SOFT(0,0,170,'#ffcf5a',glow||.7)+`<ellipse cx="0" cy="0" rx="62" ry="84" fill="#ffe08a" opacity=".85"/><ellipse cx="0" cy="-10" rx="36" ry="52" fill="#fff6cc" opacity=".9"/>`)+
  A('ripple:3.4:0:0',`<ellipse cx="0" cy="0" rx="110" ry="140" fill="none" stroke="#ffe9a0" stroke-width="3"/>`)+A('ripple:3.4:0:0',`<ellipse cx="0" cy="0" rx="160" ry="200" fill="none" stroke="#fff3c4" stroke-width="2"/>`)+`</g>`;
const COUNTER = (x,y,txt,delay,size,col)=>A(`pop:${delay}`,`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size||110}" fill="${col||'#fff3c4'}" stroke="#2a1a08" stroke-width="${r1((size||110)*.1)}" stroke-linejoin="round" paint-order="stroke" style="font-weight:800">${txt}</text>`);

/* night Lanka: deep teal sky, dark rooftops, amber fire (not red) */
const LANKA_SKY = ()=>skyBand([[0,'#021820'],[.45,'#06404a'],[.8,'#0f625e'],[1,'#2f8468']])+`<ellipse cx="270" cy="900" rx="420" ry="260" fill="#ff9a2e" opacity=".22"/>`;
const ROOFS = (y,col,seed,lit)=>{ let o='', x=-30, i=seed; while(x<580){ const w=46+((i*37)%5)*14, h=56+((i*53)%6)*20, kind=i%3;
    o+=`<rect x="${x}" y="${y-h}" width="${w}" height="${h+400}" fill="${col}"/>`;
    if(kind===0) o+=`<path d="M${x-4} ${y-h} Q${x+w/2} ${y-h-w*.8} ${x+w+4} ${y-h}Z" fill="${col}"/><rect x="${x+w/2-1.5}" y="${y-h-w*.8-14}" width="3" height="16" fill="${col}"/>`;
    else if(kind===1) o+=`<path d="M${x-2} ${y-h} L${x+w/2} ${y-h-w*1.1} L${x+w+2} ${y-h}Z" fill="${col}"/>`;
    else o+=`<rect x="${x-3}" y="${y-h-10}" width="${w+6}" height="12" fill="${col}"/>`;
    if(lit) for(let k=0;k<3;k++) o+=`<rect x="${x+8+k*((w-24)/2)}" y="${y-h+14+((i+k)%3)*18}" width="8" height="11" rx="2" fill="#ffb84a" opacity=".8"/>`;
    x+=w-3; i++; } return `<rect x="-20" y="${y-30}" width="600" height="1000" fill="${col}"/>`+o; };
const FLAME = (x,y,s,sp)=>`<g transform="translate(${x} ${y}) scale(${s})">`+A('pulse:'+(2+((x*3)%3)/2).toFixed(1),SOFT(0,-40,90,'#ff9a2e',.5))+A('flick:'+(sp||8),`<path d="M-26 0 Q-40 -50 -10 -90 Q-14 -60 4 -78 Q-2 -120 22 -150 Q18 -100 40 -64 Q52 -30 26 0Z" fill="#ff8a1e"/><path d="M-14 0 Q-22 -34 0 -62 Q-2 -40 10 -50 Q8 -86 22 -100 Q18 -60 28 -40 Q32 -16 14 0Z" fill="#ffc24a"/><path d="M-6 0 Q-8 -20 2 -36 Q8 -18 6 0Z" fill="#fff0b0"/>`)+`</g>`;
const SMOKE = (x,y,s)=>A('drift:30:-230:7',`<ellipse cx="${x}" cy="${y}" rx="${r1(70*s)}" ry="${r1(30*s)}" fill="#0b2a30" opacity=".6"/>`)+A('drift:-20:-260:9',`<ellipse cx="${x+40}" cy="${y-30}" rx="${r1(60*s)}" ry="${r1(26*s)}" fill="#12383e" opacity=".55"/>`);
const BURNING_TAIL = (x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">`+FLAME(0,0,1.0,9)+FLAME(-34,-86,.8,10)+FLAME(-58,-176,.7,11)+FLAME(-56,-262,.6,12)+`</g>`;

/* time-jump clouds that sweep across (cloud wipe) */
const WIPE_CLOUDS = (d)=>A(`slide:700:0:.9:${d||0}`,`<g transform="translate(-720 0)">`+CLOUDS_ROW(240,'#e8f0f8',.95,5,1.8)+CLOUDS_ROW(520,'#d8e4f2',.95,5,2.0)+CLOUDS_ROW(800,'#e8f0f8',.95,5,1.8)+`</g>`);

/* costume tweaks */
const SERVANT = {head:'none', hair:'bun', garland:null, mus:false, aura:null, jewel:false, trim:null, top:'#c9bd9a', bottom:'#d9d1bf', sash:'#b0966a', bare:true};
const CHILD_GLOW = {aura:'gw'};

/* ---------- the story ---------- */
VIDEO({
  title:'मरुत: 49 हवा के देवता', format:'short', target:85,
  keywords:['इंद्र','49','दिति','कश्यप','मरुत','वज्र','हनुमान','लंका','तुलसीदास'],
  music:'scenes', sfx:true,
  shots:[
    /* 1 — the result first: vajra close-up glows, a crack of light, 49 tiny lights scatter, pull back to calm Indra holding the vajra above a glowing circle */
    { line:'देवराज इंद्र ने अपनी मौसी के गर्भ में पल रहे भाई को 49 हिस्सों में बांट दिया,', scene:'marut-vajra', mood:'shock', fx:'sparks', capTop:130,
      focus:{at:.3, sound:'brahma', dur:3.6, duck:.3},
      cam:{keys:[[0,320,520,2.7],[1.3,320,520,2.7],[4.4,270,560,1.0]]},
      sky:()=>skyBand([[0,'#0e1a42'],[.5,'#27508e'],[1,'#7aa4d4']]),
      far:()=>CLOUDS_ROW(700,'#dce8f6',.5,6,1.3)+SPIRE(90,720,60,200,'#9fb8dc','#e8f2ff')+SPIRE(450,730,70,240,'#9fb8dc','#e8f2ff'),
      art:()=>CLOUDS_ROW(930,'#eaf2fb',.9,6,1.7)+A('pulse:3',`<ellipse cx="270" cy="915" rx="190" ry="26" fill="none" stroke="#ffe9a0" stroke-width="5" opacity=".9"/><ellipse cx="270" cy="915" rx="150" ry="18" fill="#ffe9a0" opacity=".35"/>`),
      front:()=>VAJRA(330,560,.62,0,true)+A('fadein:.7:.1',A('fadeout:.9:.5',THREAD(250,440,420,700,1.6)+`<circle cx="330" cy="560" r="90" fill="#fff" opacity=".6"/>`))+
        A('rise:-30:3:.6',windField(330,560,260,.5,{dot:'#ffe9a0',delay:1.0,step:.02,squash:1.1})),
      cast:[{c:INDRA, x:200, y:905, s:.92, expr:'calm', acts:[[0,'stand'],[2.4,'armUp',.8]]}] },

    /* 2 — the 49 lights hold and glow warmly; at the end a ring of light spins BACKWARDS (the "rewind") */
    { line:'लेकिन उनमें से किसी की भी जान नहीं गई।', scene:'marut-vajra-hold', mood:'hope', capTop:640, tr:'cut',
      cam:{keys:[[0,270,470,1.0],[3,270,470,1.18]]},
      sky:()=>skyBand([[0,'#0b1437'],[.55,'#1a2f66'],[1,'#3a5a96']]),
      art:()=>A('pulse:3',SOFT(270,470,300,'#ffd878',.55))+windField(270,470,205,.9,{dot:'#ffe9a0',delay:0,step:.01,squash:1.15})+
        A('fadein:1.2:.5',A('spin:-1.3:270:470',`<circle cx="270" cy="470" r="262" fill="none" stroke="#ffe9a0" stroke-width="4" stroke-dasharray="26 18" opacity=".9"/>`)+A('spin:-2.2:270:470',`<circle cx="270" cy="470" r="318" fill="none" stroke="#fff6d2" stroke-width="2.5" stroke-dasharray="10 24" opacity=".7"/>`)) },

    /* 3 — family tree: Kashyap on top, two branches (Aditi -> devta, Diti -> daitya) = step-brothers */
    { line:'असल में देवता और दैत्य आपस में सौतेले भाई थे,', scene:'marut-tree', mood:'calm', capTop:120, tr:'glow', cam:'fit',
      art:()=>skyBand([[0,'#102a30'],[.6,'#1c4640'],[1,'#2e5e48']])+`<circle cx="270" cy="470" r="330" fill="url(#saf)" opacity=".14"/>`+
        famTree(270,250,{n:'कश्यप',sub:'ऋषि',hi:true,kids:[{n:'अदिति',sub:'देव माता',kids:[{n:'देवता',sub:'अदिति के पुत्र',hi:true,col:'#8fd8ff'}]},{n:'दिति',sub:'दैत्य माता',kids:[{n:'दैत्य',sub:'दिति के पुत्र',col:'#ffb86a'}]}]},{gapY:230,leafW:190,r:36,delay:.2,step:.45})+
        _exDraw('M185 905 L185 925 L355 925 L355 905',1.7,.6,'#ffd25e',3)+A('pop:2.2',_exLabel(270,968,'सौतेले भाई',32,'#ffd25e')) },

    /* 4 — Kashyap close-up, then Aditi and Diti side by side (sisters) */
    { line:'जिनके पिता ऋषि कश्यप थे और माताएं दो सगी बहनें अदिति और दिति थीं।', scene:'marut-ashram', mood:'calm', fx:'petals', tr:'iris',
      cam:{keys:[[0,270,640,1.45],[1.9,270,650,1.6],[3.7,270,660,1.0]]},
      sky:DAWN_SKY, far:()=>GROVE(800,6,.7,'#8fb78a','#6a7a5a',0), mid:()=>ashramHut(430,840,.8)+GROVE(880,5,1.0,'#6fa56e','#4a5a3a',20), art:()=>GRASS(880,'#7fb56a','#a8d08a')+SUNSHAFTS(.18),
      cast:[
        {c:KASHYAP, x:270, y:910, s:1.1, expr:'calm', talk:true, acts:[[0,'stand'],[1.2,'explain',.6]], exit:{at:1.9, fade:.4}},
        {c:ADITI, x:150, y:915, s:1.0, expr:'smile', enter:{fade:.4, delay:2.1}, acts:[[0,'stand']]},
        {c:DITI, x:390, y:915, s:1.0, expr:'calm', enter:{fade:.4, delay:2.4}, acts:[[0,'stand']]}] },

    /* 5 — Indralok in cool blue: crane up through clouds; Indra calm on his throne with devas */
    { line:'स्वर्ग पर अदिति के पुत्रों का शासन था,', scene:'marut-indralok', mood:'calm', tr:'glow', capTop:120,
      cam:{keys:[[0,270,900,1.35],[2.3,270,590,1.0]]},
      sky:INDRA_SKY, far:()=>CLOUDS_ROW(560,'#ffffff',.7,6,1.5)+SPIRE(70,700,70,260,'#b4c8e8','#ffffff')+SPIRE(470,700,70,260,'#b4c8e8','#ffffff')+SPIRE(270,640,90,330,'#c4d4ee','#ffffff'),
      mid:()=>PILLAR(36,380,50,'#cfdcf2')+PILLAR(504,380,50,'#cfdcf2')+PILLAR(150,520,34,'#dbe6f6')+PILLAR(390,520,34,'#dbe6f6'),
      art:()=>CLOUDS_ROW(930,'#f6faff',.95,6,1.8)+THRONE(270,900,1.0), near:()=>A('drift:90:0:14',CLOUDS_ROW(990,'#ffffff',.6,4,1.8)),
      cast:[
        {c:INDRA, x:270, y:880, s:.95, expr:'calm', acts:[[0,'stand'],[1.3,'bless',.7]]},
        {c:DEVA, x:90, y:905, s:.72, expr:'calm', acts:[[0,'stand'],[1.4,'namaste',.5]]},
        {c:DEVA, x:450, y:905, s:.72, flip:true, expr:'calm', acts:[[0,'stand'],[1.5,'namaste',.5]]}] },

    /* 6 — Diti's two sons: two small lights fade out above her cupped hands (no violence) + two empty little seats */
    { line:'जबकि दिति के दोनों बेटों की बारी-बारी से मृत्यु हो गई थी।', scene:'marut-grief', mood:'calm', fx:'petals', tr:'wipe',
      cam:{keys:[[0,270,700,1.1],[3.3,270,740,1.5]]},
      sky:DAWN_SKY, far:()=>GROVE(800,6,.7,'#8aa882','#667455',0), art:()=>GRASS(880,'#7ba868','#9cc682')+ashramHut(90,830,.7)+
        `<ellipse cx="410" cy="904" rx="38" ry="11" fill="#c9a470"/><ellipse cx="480" cy="900" rx="30" ry="9" fill="#c9a470"/>`+A('fadeout:1.4:1.0',windDot(210,610,1.1,'#ffe9a0'))+A('fadeout:2.0:1.0',windDot(330,590,1.1,'#ffe9a0')),
      cast:[{c:DITI, x:270, y:915, s:1.12, expr:'sad', acts:[[0,'stand'],[.6,'offer',.8]]}] },

    /* 7 — Diti alone at dawn, weeping, petals falling */
    { line:'अपने बेटों को खोने के गम में डूबी दिति ने ऋषि कश्यप से', scene:'marut-grief', mood:'calm', fx:'petals', tr:'dissolve',
      cam:{keys:[[0,270,610,1.65],[3.2,270,660,1.25]]},
      sky:DAWN_SKY, far:()=>GROVE(800,6,.7,'#8aa882','#667455',0), mid:()=>ashramHut(430,860,.8), art:()=>GRASS(890,'#7ba868','#9cc682')+SUNSHAFTS(.14),
      cast:[{c:DITI, x:230, y:920, s:1.15, expr:'sad', tears:true, acts:[[0,'weep',.9],[2.0,'grief',.8]]}] },

    /* 8 — she folds her hands to Kashyap; a golden thought-cloud shows a shining child facing Indra */
    { line:'केवल यही वरदान मांगा कि उन्हें इंद्र को हराने वाला पुत्र मिले।', scene:'marut-wish', mood:'hope', fx:'sparks', tr:'iris', capTop:100,
      cam:{keys:[[0,270,620,1.1],[3.6,270,610,1.1]]},
      sky:DAWN_SKY, far:()=>GROVE(800,6,.7,'#8fb78a','#6a7a5a',0), mid:()=>ashramHut(270,840,.75), art:()=>GRASS(890,'#7fb56a','#a8d08a')+
        A('fadein:.8:.8',`<g>`+SOFT(270,520,190,'#ffd878',.5)+`<ellipse cx="270" cy="520" rx="170" ry="96" fill="#fff6d6" opacity=".92"/><ellipse cx="180" cy="520" rx="70" ry="60" fill="#fff6d6" opacity=".92"/><ellipse cx="360" cy="520" rx="70" ry="60" fill="#fff6d6" opacity=".92"/><circle cx="170" cy="676" r="12" fill="#fff6d6" opacity=".9"/><circle cx="150" cy="720" r="7" fill="#fff6d6" opacity=".8"/></g>`),
      front:()=>'',
      cast:[
        {c:DITI, x:120, y:925, s:1.05, expr:'sad', acts:[[0,'stand'],[.5,'namaste',.8]]},
        {c:KASHYAP, x:420, y:925, s:1.05, flip:true, expr:'calm', talk:true, acts:[[0,'stand']]},
        {c:NANDI, with:CHILD_GLOW, x:190, y:575, s:.42, expr:'serene', enter:{fade:.5, delay:1.2}, acts:[[0,'stand'],[.6,'hip']]},
        {c:INDRA, x:350, y:575, s:.42, flip:true, expr:'calm', enter:{fade:.5, delay:1.0}, acts:[[0,'stand']]}] },

    /* 9 — Kashyap nods and blesses her */
    { line:'ऋषि कश्यप ने यह बात मान ली,', scene:'marut-ashram', mood:'calm', fx:'petals', tr:'dissolve',
      cam:{keys:[[0,300,640,1.5],[2.3,300,650,1.25]]},
      sky:DAWN_SKY, far:()=>GROVE(800,6,.7,'#8fb78a','#6a7a5a',0), mid:()=>ashramHut(110,850,.8), art:()=>GRASS(890,'#7fb56a','#a8d08a')+SUNSHAFTS(.16),
      cast:[
        {c:KASHYAP, x:330, y:920, s:1.15, flip:true, expr:'calm', acts:[[0,'stand'],[.6,{head:5,drop:3},.4],[1.1,'bless',.7]]},
        {c:DITI, x:150, y:925, s:1.0, expr:'sad', acts:[[0,'kneelPray']]}] },

    /* 10 — three glowing rings (तन, मन, वाणी) round Diti in tapasya */
    { line:'लेकिन शर्त रखी कि दिति को पूरे एक साल तक तन, मन और वाणी से पूरी तरह शुद्ध रहकर कठिन व्रत करना होगा।', scene:'marut-vrat', mood:'divine', fx:'sparks', tr:'glow', capTop:120,
      cam:{keys:[[0,270,640,1.1],[5.6,270,620,1.1]]},
      sky:()=>skyBand([[0,'#2a3e5a'],[.5,'#6a7da0'],[1,'#e2c8a0']]), far:()=>GROVE(820,6,.7,'#5a7a6a','#3a4a40',0), art:()=>GRASS(900,'#6a9a62','#8ac07e')+
        A('fadein:2.6:.8',A('pulse:4',`<ellipse cx="270" cy="700" rx="150" ry="260" fill="none" stroke="#ffb84a" stroke-width="5"/>`)+_exLabel(270,420,'तन',40,'#ffcf7a'))+
        A('fadein:3.3:.8',A('pulse:4.6',`<ellipse cx="270" cy="690" rx="200" ry="330" fill="none" stroke="#9fd0ff" stroke-width="5"/>`)+_exLabel(100,470,'मन',40,'#bfe0ff'))+
        A('fadein:4.0:.8',A('pulse:5.2',`<ellipse cx="270" cy="680" rx="250" ry="400" fill="none" stroke="#fff6d2" stroke-width="5"/>`)+_exLabel(445,520,'वाणी',40,'#fff6d2')),
      cast:[{c:DITI, x:270, y:915, s:1.1, expr:'serene', eyes:'closed', acts:[[0,'kneelPray']]}] },

    /* 11 — the boon-light flickers over her, one hair-thin crack */
    { line:'जरा सी भी गलती होने पर यह वरदान बेकार हो जाता,', scene:'marut-vrat', mood:'shock', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,620,1.75],[2.8,270,700,1.3]]},
      sky:()=>skyBand([[0,'#2a3e5a'],[.5,'#6a7da0'],[1,'#e2c8a0']]), far:()=>GROVE(820,6,.7,'#5a7a6a','#3a4a40',0), art:()=>GRASS(900,'#6a9a62','#8ac07e')+
        A('flick:3.2',SOFT(270,520,150,'#ffd070',.65))+`<circle cx="270" cy="520" r="62" fill="#fff0b0" opacity=".9"/>`+A('fadein:1.7:.2',`<path d="M252 462 L268 490 L258 512 L274 540 L266 570" fill="none" stroke="#6a4a2a" stroke-width="2" stroke-linecap="round"/>`),
      cast:[{c:DITI, x:270, y:925, s:1.2, expr:'serene', eyes:'closed', acts:[[0,'kneelPray']]}] },

    /* 12 — Indra's worried face (close-up) shifts into a humble servant in plain cloth carrying water */
    { line:'इसलिए खबर मिलते ही इंद्र रूप बदलकर', scene:'marut-disguise', mood:'calm', tr:'cut',
      cam:{keys:[[0,270,540,2.1],[1.2,270,540,2.2],[2.3,270,640,1.0]]},
      sky:INDRA_SKY, far:()=>CLOUDS_ROW(650,'#ffffff',.7,6,1.4), art:()=>CLOUDS_ROW(930,'#f6faff',.95,6,1.8)+
        A('fadein:.9:.2',A('fadeout:1.6:.5',`<circle cx="270" cy="640" r="190" fill="url(#gw)" opacity=".8"/>`)),
      cast:[
        {c:INDRA, x:270, y:900, s:1.1, expr:'sad', exit:{at:1.3, fade:.4}, acts:[[0,'stand'],[.6,'lookDown',.5]]},
        {c:INDRA, with:SERVANT, x:270, y:900, s:1.0, expr:'calm', enter:{fade:.5, delay:1.8}, acts:[[0,'stand']], props:{front:'kamandalu'}}] },

    /* 13 — servant Indra walks in (side view) and serves Diti; his eyes follow her feet; a year of seasons passes behind */
    { line:'अपनी मौसी की सेवा में लग गए और उनकी एक चूक का इंतजार करने लगे।', scene:'marut-year', mood:'calm', tr:'dissolve',
      cam:{keys:[[0,270,700,1.1],[3.7,270,690,1.25]]},
      sky:()=>SEASON_SKY(0)+A('fadein:1.2:.7',SEASON_SKY(1))+A('fadein:2.4:.7',SEASON_SKY(2)),
      far:()=>GROVE(800,6,.7,'#6a8a72','#4a5a48',0), art:()=>GRASS(890,'#6f9d62','#96bf84')+ashramHut(450,850,.7),
      near:()=>A('fadeout:1.3:.5',RAIN(.55))+A('fadein:1.3:.5',A('fadeout:2.5:.5',FLAKES(.8)))+A('fadein:2.5:.5',BLOSSOMS(.9)),
      cast:[
        {c:DITI, x:330, y:925, s:1.05, expr:'serene', acts:[[0,'kneelPray']]},
        {c:INDRA, with:SERVANT, facing:'side', x:130, y:920, s:.98, expr:'calm', walk:{from:-200, dur:1.5}, acts:[[0,'stand'],[1.6,'kneelOffer',.5]], props:{front:'kamandalu'}}] },

    /* 14 — the last petals of the year, the sun low, the year-ring almost closed */
    { line:'जब व्रत पूरा होने में बस कुछ ही समय बचा था,', scene:'marut-year', mood:'hope', fx:'petals', tr:'dip',
      cam:{keys:[[0,270,640,1.1],[2.6,270,620,1.1]]},
      sky:()=>skyBand([[0,'#e0907a'],[.4,'#f6b98a'],[.75,'#fbd8a0'],[1,'#fff0c4']])+`<circle cx="270" cy="600" r="250" fill="#fff0c4" opacity=".4"/><circle cx="270" cy="600" r="64" fill="#fff6d6"/>`,
      far:()=>GROVE(820,6,.7,'#9a8a6a','#6a5a40',0), art:()=>GRASS(900,'#8aa862','#a8c684')+YEAR_RING(270,600,170,.2,2.0,'#fff0b0')+BLOSSOMS(.8),
      cast:[{c:DITI, x:270, y:925, s:.9, expr:'serene', acts:[[0,'kneelPray']]}] },

    /* 15 — dusk, slow orbit round sleeping Diti; then ONE quiet close-up of her unwashed feet and a tilted lamp that flickers */
    { line:'तब एक शाम थकान की वजह से दिति बिना पैर धोए ही सो गईं', scene:'marut-dusk', mood:'calm', tr:'dissolve', capTop:130,
      cam:{keys:[[0,110,760,1.5],[1.7,360,770,1.3]]},
      sky:()=>skyBand([[0,'#3a2f5e'],[.4,'#8a5a74'],[.75,'#e69a62'],[1,'#f6c27a']]), far:()=>GROVE(830,6,.7,'#5a4a5a','#3a2e3a',0)+ashramHut(440,850,.8),
      art:()=>GRASS(900,'#54624a','#6e7a5a')+`<ellipse cx="270" cy="896" rx="250" ry="24" fill="#c9a470"/>`+A('flick:7',SOFT(470,790,120,'#ffb04a',.4)),
      front:()=>A('fadein:1.7:.5',`<rect x="-200" y="-200" width="940" height="1400" fill="#2a1e36"/>`+SOFT(270,520,420,'#e69a62',.18)+FOOT(190,640,1.25)+FOOT(350,650,1.25,true)+LAMP(430,830,1.25,2.9)),
      cast:[{c:DITI, x:120, y:905, s:.95, expr:'serene', lie:{deg:86, at:.1, dur:.5}, eyes:'closed', acts:[[0,'stand']]}] },

    /* 16 — Indra's eyes open wide in the dark, the vajra glints (anxious, not scary). Short, silent beat. */
    { line:'और इंद्र को मौका मिल गया।', scene:'marut-dusk', mood:'shock', tr:'cut', capTop:130,
      cam:{keys:[[0,270,610,2.0],[2.4,270,600,2.35]]},
      sky:()=>skyBand([[0,'#0a0a1c'],[.6,'#1a1630'],[1,'#2e2238']]), art:()=>A('drift:10:-90:3',`<path d="M450 540 Q440 500 456 470 Q470 440 452 410" fill="none" stroke="#9a948e" stroke-width="5" opacity=".4" stroke-linecap="round"/>`)+
        A('pulse:1.5',sparkle(190,540,2.2,'#ffe9a0'))+A('pulse:2.1',sparkle(360,760,1.2,'#fff6d6')),
      cast:[{c:INDRA, with:SERVANT, x:270, y:910, s:1.2, expr:'surprise', acts:[[0,'stand']]}] },

    /* 17 — Indra shrinks into a small spark and flies into a warm golden glow (womb-light only) */
    { line:'इंद्र छोटा रूप लेकर गर्भ के अंदर गए', scene:'marut-light', mood:'divine', tr:'iris', capTop:130,
      cam:{keys:[[0,200,760,1.2],[2.3,300,540,1.5]]},
      sky:()=>skyBand([[0,'#1a1226'],[.55,'#3a2236'],[1,'#6a4030']]),
      art:()=>WOMB(340,520,1.0,.6)+A('fadein:.6:.3',A('slide:170:-270:1.2:.7',windDot(170,790,1.2,'#fff3c4')))+whisperTrail(170,790,340,520,.8,14)+A('fadein:1.9:.3',A('pulse:2',`<circle cx="340" cy="520" r="120" fill="#fff6d2" opacity=".5"/>`)),
      cast:[{c:INDRA, with:SERVANT, x:170, y:915, s:.85, expr:'calm', exit:{at:.9, fade:.5}, acts:[[0,'stand']]}] },

    /* 18 — the vajra's thin line of lightning, and the light splits into 7 (counter 7) */
    { line:'और अपने वज्र से बच्चे को सात हिस्सों में बांट दिया,', scene:'marut-light', mood:'divine', tr:'dissolve', capTop:130,
      cam:{keys:[[0,270,520,1.15],[3,270,520,1.0]]},
      sky:()=>skyBand([[0,'#1a1226'],[.55,'#3a2236'],[1,'#6a4030']]),
      art:()=>WOMB(270,500,.9,.5)+A('fadeout:1.0:.5',VAJRA(430,200,.34,28,true)+THREAD(412,262,282,470,1.2))+
        HEX7(270,500,118).map((p,i)=>`<g transform="translate(${r1(p[0])} ${r1(p[1])})">${A(`sscale:${(1.0+i*.1).toFixed(2)}:.6`,windDot(0,0,1.15,'#ffe9a0'))}</g>`).join('')+COUNTER(270,810,'7',1.8,130) },

    /* 19 — each of the 7 splits into 7 (7 x 7 = 49); the babies' crying is only soft wind-chimes */
    { line:'फिर उनके रोने पर हर हिस्से के दोबारा सात-सात टुकड़े कर दिए।', scene:'marut-light', mood:'divine', tr:'cut', capTop:130,
      sfx:[[.8,'chimes',.45],[3.0,'chimes',.4]],
      cam:{keys:[[0,270,520,1.1],[3.4,270,520,1.1]]},
      sky:()=>skyBand([[0,'#1a1226'],[.55,'#3a2236'],[1,'#6a4030']]),
      art:()=>WOMB(270,500,.9,.35)+HEX49(270,500,118,40).map((p,i)=>`<g transform="translate(${r1(p[0])} ${r1(p[1])})">${A(`sscale:${(i%7===0?.1:(.7+Math.floor(i/7)*.08+(i%7)*.05)).toFixed(2)}:.6`,windDot(0,0,i%7===0?1.0:.62,'#ffe9a0'))}</g>`).join('')+
        COUNTER(270,810,'7 × 7 = 49',2.2,84) },

    /* 20 — BIG MOMENT: Diti's vrat-light wraps all 49; the lights turn into tiny sleeping babies, then wake and smile */
    { line:'लेकिन व्रत लगभग पूरा हो चुका था, इसलिए उसके असर से वे सभी 49 बच्चे जिंदा बच गए।', scene:'marut-awake', mood:'hope', fx:'sparks', tr:'flash', capTop:130,
      focus:{at:2.5, sound:'revive', dur:3.6, duck:.3},
      cam:{keys:[[0,270,520,1.0],[2.6,270,520,1.1],[4.5,270,500,1.7,'spring']]},
      sky:DEEP_SKY,
      art:()=>A('fadein:.1:.6',A('ripple:3.2:270:500',`<circle cx="270" cy="500" r="230" fill="none" stroke="#fff3c4" stroke-width="5"/>`)+A('ripple:3.2:270:500',`<circle cx="270" cy="500" r="300" fill="none" stroke="#ffe9a0" stroke-width="3"/>`)+A('pulse:3',SOFT(270,500,260,'#fff0b0',.5)))+
        A('fadeout:1.0:.8',HEX49(270,500,118,40).map(p=>windDot(p[0],p[1],.62,'#ffe9a0')).join(''))+
        A('fadein:.9:.8',A('fadeout:2.6:.6',HEX49(270,500,118,40).map(p=>windSwirl(p[0],p[1],.36,{face:'sleep',spin:5})).join('')))+
        A('fadein:2.4:.7',HEX49(270,500,118,40).map((p,i)=>windSwirl(p[0],p[1],i===0?.5:.36,{face:'smile'})).join('')) },

    /* 21 — Indra, ashamed and tender, hand raised gently; one enlarged baby near him stops crying and smiles ("मा रुदः") */
    { line:'यह देखकर इंद्र को दया आ गई और उन्होंने बच्चों को रोने से मना किया,', scene:'marut-awake', mood:'calm', tr:'dissolve', capTop:130,
      sfx:[[.2,'chimes',.3]],
      calli:{lines:['मा रुदः'], silent:true, y:560, size:56, delay:1.6, write:1.2, hold:3, glow:true},
      cam:{keys:[[0,270,630,1.7],[3.9,270,640,1.45]]},
      sky:DEEP_SKY, far:()=>CLOUDS_ROW(600,'#cfdcf2',.5,6,1.4), art:()=>CLOUDS_ROW(930,'#d6e2f4',.9,6,1.8)+
        A('fadeout:2.4:.5',A('bob:6:1.6',windSwirl(370,620,1.3,{face:'cry'})))+A('fadein:2.5:.6',A('bob:6:1.6',windSwirl(370,620,1.3,{face:'smile'}))),
      cast:[{c:INDRA, x:200, y:905, s:1.12, expr:'sad', talk:true, acts:[[0,'stand'],[.8,'lookDown',.6],[1.8,'bless',.8]]}] },

    /* 22 — the babies rise as 49 wind-swirls round Indra in a circle; the name "मरुत" is written in calligraphy */
    { line:'जिससे हवा के इन 49 देवताओं का नाम \'मरुत\' पड़ा।', scene:'marut-awake', mood:'calm', fx:'stars', tr:'zoom', capTop:130,
      calli:{lines:['मरुत'], silent:true, y:250, size:88, delay:.9, write:1.2, hold:3, glow:true},
      cam:{keys:[[0,270,560,1.3],[2.6,270,540,1.0]]},
      sky:DEEP_SKY, far:()=>CLOUDS_ROW(560,'#cfdcf2',.5,6,1.5), art:()=>CLOUDS_ROW(930,'#d6e2f4',.9,6,1.8)+
        A('rise:-50:3.2:0',windField(270,560,205,.5,{layout:'rings',n:49,delay:0,step:.03,face:'smile',squash:.72,spin:4}))+windSwirl(270,560,.9,{face:'smile'}),
      cast:[{c:INDRA, x:270, y:915, s:.95, expr:'calm', acts:[[0,'stand'],[1.0,'bless',.8]]}] },

    /* 23 — time jump (cloud wipe): night Lanka, huge Hanuman, his tail on fire */
    { line:'सदियों बाद जब हनुमान जी ने लंका में आग लगाई,', scene:'marut-lanka', mood:'calm', tr:'wipe', fx:'embers', capTop:130,
      cam:{keys:[[0,270,700,1.1],[2.6,270,640,1.0]]},
      sky:()=>LANKA_SKY()+stars(60,380), far:()=>ROOFS(760,'#0b2d33',3,true)+FLAME(80,640,.8,9)+FLAME(430,620,.9,10)+SMOKE(120,520,1.4), mid:()=>ROOFS(850,'#06222a',8,true)+FLAME(250,700,1.1,8)+FLAME(500,760,.8,11),
      art:()=>`<path d="M-20 930 Q270 900 560 930 L560 1000 L-20 1000Z" fill="#041a20"/>`, front:()=>BURNING_TAIL(366,640,.8)+WIPE_CLOUDS(0),
      cast:[{c:HANUMAN, x:230, y:935, s:1.2, expr:'calm', acts:[[0,'stand'],[1.4,'shoulder',.8]]}] },

    /* 24 — Tulsidas's line, written in calligraphy over Lanka (the narrator reads normally) */
    { line:'तब तुलसीदास जी ने भी इन 49 मरुतों के चलने का जिक्र किया है।', scene:'marut-lanka', mood:'calm', tr:'glow', fx:'embers', capTop:130,
      calli:{lines:['हरि प्रेरित तेहि अवसर','चले मरुत उनचास'], source:'रामचरितमानस · सुंदरकांड', silent:true, y:560, size:60, delay:.6, gap:1.1, write:1.0, hold:3, glow:true, scrim:true},
      cam:{keys:[[0,270,520,1.05],[3.5,270,520,1.0]]},
      sky:()=>LANKA_SKY()+stars(70,420), far:()=>ROOFS(780,'#0b2d33',5,true)+FLAME(140,670,.8,9)+FLAME(420,650,.9,10), mid:()=>ROOFS(870,'#06222a',2,true)+FLAME(300,730,1.0,8),
      art:()=>A('drift:540:20:8',windSwirl(0,300,.5,{}))+A('drift:540:-30:10',windSwirl(0,430,.45,{spin:3}))+A('drift:540:10:7',windSwirl(0,700,.55,{spin:2.6})) },

    /* 25 — the same 49 winds sweep over the rooftops, the flames leap, and the camera pulls back to a whole sky of winds */
    { line:'यानी जिन भाइयों का जन्म इंद्र को खत्म करने के लिए हुआ था, आखिरकार उन्हीं ने लंका की आग को तेज हवा दी।', scene:'marut-lanka', mood:'hope', tr:'dissolve', fx:'embers', capTop:130,
      focus:{at:.6, sound:'wind', dur:5.0, duck:.3},
      cam:{keys:[[0,270,760,1.7],[1.6,270,740,1.5],[5.7,270,470,1.0]]},
      sky:()=>LANKA_SKY()+stars(80,460)+A('fadein:3.2:2.2',windField(270,300,260,.6,{layout:'rings',n:49,delay:0,step:.05,squash:1.5,spin:3.4,col:'#cfe9ff'})),
      far:()=>ROOFS(800,'#0b2d33',4,true)+FLAME(70,700,.6,9)+FLAME(260,650,.7,10)+FLAME(450,690,.6,8), mid:()=>ROOFS(880,'#06222a',9,true)+A('pulse:.9',FLAME(150,770,.9,12)+FLAME(380,760,1.0,13)+FLAME(520,790,.75,11)),
      art:()=>[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>A(`drift:620:${i%2?-30:20}:${(2.6+(i%5)*.5).toFixed(1)}`,windSwirl(-40,690+i*18,.5+(i%3)*.12,{spin:2.4+i*.2}))).join('')+
        A('fadein:1.4:.6',[0,1,2,3,4,5,6,7].map(i=>A(`drift:620:${i%2?20:-26}:${(3+(i%4)*.6).toFixed(1)}`,windSwirl(-40,560+i*30,.42,{spin:3+i*.15}))).join('')),
      cast:[{c:HANUMAN, x:455, y:870, s:.42, flip:true, expr:'calm', acts:[[0,'stand']]}] },
  ],
});
