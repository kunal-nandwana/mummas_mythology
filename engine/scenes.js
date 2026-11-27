/* =====================================================================
   SCENES LIBRARY: shared gradients/filters (DEFS) + environment pieces.
   All pieces return SVG strings in a 540x960 (9:16) design space.
   A(spec, svg) wraps a group that the engine animates every frame:
     flick:speed | pulse:speed | bob:amp:speed | spin:period:cx:cy
     rock:deg:speed:cx:cy | pop:delay | rise:dy:dur:delay
     slide:dx:dy:dur:delay | walk:dx:dur:delay | fadeout:at:dur
     orbit:rx:ry:cx:cy:period | reveal/glint (used by calligraphy())
     drift:dx:dy:period (loops: slide + fade in/out: clouds, smoke, embers, lamps) | ripple:period:cx:cy (ring grows + fades, loops)
   ===================================================================== */
const r1=n=>Math.round(n*10)/10;
let seed=11; const rnd=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
const A=(spec,inner)=>`<g data-a="${spec}">${inner}</g>`;   // animated wrapper

const DEFS = `<defs>
 <linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060920"/><stop offset=".55" stop-color="#151f4a"/><stop offset=".85" stop-color="#352a4e"/><stop offset="1" stop-color="#4e2f40"/></linearGradient>
 <linearGradient id="skyW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0608"/><stop offset=".45" stop-color="#5e1a14"/><stop offset=".75" stop-color="#b9522a"/><stop offset="1" stop-color="#e08a3a"/></linearGradient>
 <linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c0a24"/><stop offset=".5" stop-color="#3a1c3a"/><stop offset=".8" stop-color="#8a3a2a"/><stop offset="1" stop-color="#c0602a"/></linearGradient>
 <linearGradient id="skyDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14183e"/><stop offset=".45" stop-color="#6a3a5a"/><stop offset=".75" stop-color="#e0805a"/><stop offset="1" stop-color="#f6c070"/></linearGradient>
 <linearGradient id="skyDiv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0714"/><stop offset="1" stop-color="#241228"/></linearGradient>
 <linearGradient id="skyRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#160508"/><stop offset="1" stop-color="#4a1418"/></linearGradient>
 <radialGradient id="heartG"><stop offset="0" stop-color="#ffe6b0" stop-opacity=".95"/><stop offset=".35" stop-color="#ff9aa8" stop-opacity=".45"/><stop offset="1" stop-color="#ff7a9a" stop-opacity="0"/></radialGradient>
 <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7da7e"/><stop offset="1" stop-color="#b98428"/></linearGradient>
 <linearGradient id="limbSh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".32"/><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient>
 <linearGradient id="limbShR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
 <linearGradient id="gnd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2236"/><stop offset="1" stop-color="#100d18"/></linearGradient>
 <linearGradient id="gndW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a1810"/><stop offset="1" stop-color="#140806"/></linearGradient>
 <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa0d0" stop-opacity="0"/><stop offset=".5" stop-color="#9aa0d0" stop-opacity=".2"/><stop offset="1" stop-color="#9aa0d0" stop-opacity="0"/></linearGradient>
 <linearGradient id="fogW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb070" stop-opacity="0"/><stop offset=".5" stop-color="#ffb070" stop-opacity=".28"/><stop offset="1" stop-color="#ffb070" stop-opacity="0"/></linearGradient>
 <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1610"/><stop offset="1" stop-color="#120806"/></linearGradient>
 <radialGradient id="saf"><stop offset="0" stop-color="#ffc56a" stop-opacity=".95"/><stop offset=".4" stop-color="#ff9a3c" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient>
 <radialGradient id="gw"><stop offset="0" stop-color="#fff2c8" stop-opacity=".95"/><stop offset=".45" stop-color="#ffd27a" stop-opacity=".35"/><stop offset="1" stop-color="#ffc060" stop-opacity="0"/></radialGradient>
 <radialGradient id="gr"><stop offset="0" stop-color="#ff7a5a" stop-opacity=".9"/><stop offset="1" stop-color="#ff3a2a" stop-opacity="0"/></radialGradient>
 <radialGradient id="gg"><stop offset="0" stop-color="#8affb0" stop-opacity=".85"/><stop offset="1" stop-color="#3aff8a" stop-opacity="0"/></radialGradient>
 <radialGradient id="gb"><stop offset="0" stop-color="#9fbcff" stop-opacity=".6"/><stop offset="1" stop-color="#5f7cff" stop-opacity="0"/></radialGradient>
 <radialGradient id="moonG"><stop offset="0" stop-color="#fff6dc" stop-opacity=".9"/><stop offset="1" stop-color="#bcc8ff" stop-opacity="0"/></radialGradient>
 <radialGradient id="vg" cx="50%" cy="45%" r="75%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
 <filter id="b4"><feGaussianBlur stdDeviation="4"/></filter>
 <filter id="b10"><feGaussianBlur stdDeviation="10"/></filter>
 <filter id="b24"><feGaussianBlur stdDeviation="24"/></filter>
 <filter id="sil"><feColorMatrix type="matrix" values="0 0 0 0 .05  0 0 0 0 .03  0 0 0 0 .05  0 0 0 1 0"/></filter>
 <filter id="paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="4"/><feColorMatrix type="matrix" values="0 0 0 0 .62  0 0 0 0 .52  0 0 0 0 .38  0 0 0 .55 -.12"/></filter>
 <filter id="blotch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .009" numOctaves="2" seed="9"/><feColorMatrix type="matrix" values="0 0 0 0 .1  0 0 0 0 .08  0 0 0 0 .14  0 0 0 .9 -.35"/></filter>
</defs>`;

/* ---------- environment pieces ---------- */
function stars(n,h){ let s=''; for(let i=0;i<n;i++){ s+=A('flick:'+(1+rnd()*2).toFixed(2), `<circle cx="${r1(rnd()*540)}" cy="${r1(rnd()*h)}" r="${rnd()<.15?1.6:.9}" fill="#f4ecd4"/>`); } return s; }
function moon(x,y,r){ return `<circle cx="${x}" cy="${y}" r="${r*4}" fill="url(#moonG)" opacity=".45"/><circle cx="${x}" cy="${y}" r="${r}" fill="#f3ecd2"/><circle cx="${r1(x+r*.42)}" cy="${r1(y-r*.18)}" r="${r1(r*.92)}" fill="#111a40"/>`; }
function clouds(col,line){ let s=''; [[38,30,0,col||'#1b2150'],[14,22,14,'#141940']].forEach(([y,r,off,c])=>{ s+=`<g fill="${c}">`; for(let x=-r+off;x<540+r;x+=r*1.25) s+=`<circle cx="${r1(x)}" cy="${r1(y+Math.sin(x*.05)*r*.25)}" r="${r}"/>`; s+=`<rect width="540" height="${y}"/></g>`; for(let x=-r+off;x<540+r;x+=r*1.25){ const yy=y+Math.sin(x*.05)*r*.25+r*.35; s+=`<path d="M${r1(x-r*.8)} ${r1(yy)} A${r} ${r} 0 0 1 ${r1(x+r*.8)} ${r1(yy)}" fill="none" stroke="${line||'#3b4278'}" stroke-width="1.4" opacity=".7"/>`; } }); return s; }
function hills(y,amp,col,step){ let d=`M0 ${y}`; for(let x=0;x<=540+step;x+=step){ d+=` Q${r1(x+step/2)} ${r1(y-amp*(0.4+rnd()*0.8))} ${r1(x+step)} ${y}`; } return `<path d="${d} L700 1200 L0 1200Z" fill="${col}"/>`; }
function ground(y,fill,line){ return `<path d="M0 ${y} Q270 ${y-30} 540 ${y-6} L540 1000 L0 1000Z" fill="${fill||'url(#gnd)'}"/><path d="M0 ${y} Q270 ${y-30} 540 ${y-6}" stroke="${line||'#4a3e5a'}" stroke-width="2" fill="none" opacity=".7"/>`; }
function tufts(y,col,n){ let s=''; for(let i=0;i<n;i++){ const x=rnd()*540, yy=y+rnd()*60, h=6+rnd()*10; s+=`<path d="M${r1(x)} ${r1(yy)} l-3 -${r1(h)} M${r1(x)} ${r1(yy)} l0 -${r1(h*1.2)} M${r1(x)} ${r1(yy)} l3 -${r1(h)}" stroke="${col}" stroke-width="1.4" fill="none"/>`; } return s; }
function flowers(y,n){ let s=''; for(let i=0;i<n;i++){ const x=rnd()*540, yy=y+rnd()*60; s+=`<path d="M${r1(x)} ${r1(yy)} l0 -10" stroke="#2d3a2a" stroke-width="1.2"/><circle cx="${r1(x)}" cy="${r1(yy-11)}" r="2.2" fill="${rnd()<.5?'#c96b4a':'#d8c27a'}" opacity=".7"/>`; } return s; }
function fg(){ return `<path d="M-20 975 Q160 905 330 935 T560 915 L560 1000 L-20 1000Z" fill="#07060c"/>`+tufts(918,'#121018',40); }
function chhatri(x,y,s,c){ return `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><rect x="-14" y="-30" width="28" height="30"/><path d="M-18 -30 Q0 -58 18 -30Z"/><rect x="-1.5" y="-66" width="3" height="10"/><circle cx="0" cy="-56" r="3"/></g>`; }
function fort(x,y,s){ const c='#272a52',c2='#1d1f40'; let w='',cr=''; for(let i=0;i<7;i++) w+=A('flick:'+(2+rnd()*2).toFixed(2),`<rect x="${-150+i*48}" y="-38" width="5" height="8" fill="#ffb85c"/>`); for(let i=-180;i<180;i+=14) cr+=`<rect x="${i}" y="-62" width="8" height="8"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><rect x="-180" y="-56" width="360" height="56"/>${cr}<rect x="-200" y="-96" width="40" height="96" fill="${c2}"/><path d="M-206 -96 Q-180 -140 -154 -96Z" fill="${c2}"/><rect x="160" y="-96" width="40" height="96" fill="${c2}"/><path d="M154 -96 Q180 -140 206 -96Z" fill="${c2}"/><rect x="-40" y="-110" width="80" height="54"/><path d="M-52 -110 Q0 -176 52 -110Z"/><rect x="-2" y="-196" width="4" height="26"/><path d="M2 -196 L22 -190 L2 -184Z" fill="#a8432a"/>${chhatri(-80,-56,1,c)}${chhatri(80,-56,1,c)}<path d="M-18 0 L-18 -26 Q0 -46 18 -26 L18 0Z" fill="#0f1030"/>${w}</g>`; }
function tent(x,y,s,c){ return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${r1(s)})"><path d="M-22 0 L0 -28 L22 0Z" fill="${c}"/><path d="M0 -28 L4 0 L-4 0Z" fill="#0b0a18" opacity=".6"/><line x1="0" y1="-28" x2="0" y2="-40" stroke="${c}" stroke-width="1.5"/><path d="M0 -40 L9 -37 L0 -34Z" fill="#a8432a"/></g>`; }
function fire(x,y,s){ return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${r1(s)})">${A('flick:'+(5+rnd()*4).toFixed(2),'<circle r="34" fill="url(#saf)"/>')}${A('flick:'+(7+rnd()*4).toFixed(2),'<path d="M0 2 Q-6 -6 0 -16 Q6 -6 0 2Z" fill="#ffd27a"/>')}</g>`; }
function camps(y,sc){ let s=''; for(let x=0;x<560;x+=38+rnd()*30){ const yy=y+rnd()*18, k=sc*(0.7+rnd()*.5); s+=tent(x,yy,k,rnd()<.5?'#2c2848':'#352a44'); if(rnd()<.45) s+=fire(x+18*k,yy-2,k*.8); } return s; }
function leaf(x,y,rot,sc,col){ return `<path transform="translate(${r1(x)} ${r1(y)}) rotate(${rot|0}) scale(${sc})" d="M0 -12 Q11 -3 0 14 Q-11 -3 0 -12Z" fill="${col}"/>`; }
function peepal(x,y,s){ let lv=''; const cols=['#14261c','#1a3224','#203c2b','#172b20'];
  for(let i=0;i<300;i++){ const a=i*2.399, r=Math.sqrt(i)*11.5; lv+=leaf(Math.cos(a)*r*1.25,-330+Math.sin(a)*r*.75,(i*53)%360,.75,cols[i%4]); }
  let rim=''; for(let i=0;i<46;i++){ const a=-Math.PI*.12-i*0.065, r=196+rnd()*14; rim+=leaf(Math.cos(a)*r*1.05+30,-330+Math.sin(a)*r*.72,rnd()*360,.7,'#3e6650'); }
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-26 0 C-20 -60 -34 -120 -60 -170 L-40 -176 C-18 -140 -6 -110 -2 -90 C4 -120 20 -150 52 -186 L66 -176 C34 -140 22 -80 24 0Z" fill="#1a1222"/><path d="M-2 -90 C-6 -150 -10 -220 -6 -290" stroke="#1a1222" stroke-width="16" fill="none"/><path d="M-40 -176 C-80 -220 -120 -250 -150 -260 M52 -186 C90 -230 130 -250 170 -262" stroke="#1a1222" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="-330" rx="235" ry="150" fill="#0e1d15"/>${lv}<g opacity=".5">${rim}</g></g>`; }
function sol(x,y,s,c,flip){ return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${flip?-s:s} ${s})" fill="${c}"><circle cx="0" cy="-34" r="6"/><path d="M-7 -28 L7 -28 L9 0 L-9 0Z"/><path d="M-6 -42 L0 -50 L6 -42Z"/><line x1="12" y1="2" x2="14" y2="-62" stroke="${c}" stroke-width="2"/><path d="M11 -62 L14 -72 L17 -62Z"/><ellipse cx="-8" cy="-18" rx="6" ry="9"/></g>`; }
function banner(x,y,h,col,flip){ return `<g><line x1="${x}" y1="${y}" x2="${x}" y2="${y-h}" stroke="#140808" stroke-width="3"/>${A('rock:7:1.6:'+x+':'+(y-h),`<path d="M${x} ${y-h} L${x+(flip?-46:46)} ${y-h+10} L${x} ${y-h+24}Z" fill="${col}"/>`)}</g>`; }
function armies(y,colL,colR,scale){ let s=''; scale=scale||1; for(let r=0;r<4;r++){ const yy=y+r*28, sc=(1+r*.25)*scale; for(let i=0;i<8;i++){ s+=sol(14+i*28+r*6,yy,sc,'#120607',false); s+=sol(526-i*28-r*6,yy,sc,'#120607',true); } } s+=banner(60,y+10,110,colL)+banner(170,y+20,90,colL)+banner(480,y+10,110,colR,true)+banner(370,y+20,90,colR,true); return s; }
function warSky(sunY,sunR){ return `<rect width="540" height="960" fill="url(#skyW)"/><circle cx="270" cy="${sunY}" r="${sunR*2.2}" fill="url(#saf)" opacity=".85" filter="url(#b24)"/><circle cx="270" cy="${sunY}" r="${sunR}" fill="#ffd98a"/>`+clouds('#3a1410','#7a3a24'); }
function divine(cx,cy,col,ray){ let rays=''; for(let i=0;i<18;i++) rays+=`<path d="M${cx} ${cy} L${cx+14} ${cy-460} L${cx-14} ${cy-460}Z" transform="rotate(${i*20} ${cx} ${cy})" fill="${ray||'#fff0b8'}" opacity=".12"/>`;
  return `<rect width="540" height="960" fill="url(#skyDiv)"/><circle cx="${cx}" cy="${cy}" r="300" fill="url(#${col||'gw'})" opacity=".75" filter="url(#b24)"/>`+A(`spin:60:${cx}:${cy}`,rays)+
    `<circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#f0d79a" stroke-opacity=".45" stroke-width="1.5"/>`+A(`spin:40:${cx}:${cy}`,`<circle cx="${cx}" cy="${cy}" r="215" fill="none" stroke="#f0d79a" stroke-opacity=".25" stroke-width="1.5" stroke-dasharray="4 10"/><circle cx="${cx}" cy="${cy-215}" r="4" fill="#ffe9a8"/>`); }
function nightBase(o){ o=Object.assign({moon:[420,170,36],fort:null,camps:null,gy:740,hillsY:610},o||{});
  return `<rect width="540" height="960" fill="url(#skyN)"/>`+stars(70,560)+(o.moon?moon(...o.moon):'')+clouds()+hills(o.hillsY,40,'#1d1d40',140)+(o.fort?fort(...o.fort):'')+
   `<rect y="${o.hillsY-30}" width="540" height="70" fill="url(#fog)"/>`+(o.camps?hills(o.camps-18,16,'#231f3c',90)+camps(o.camps,1.1)+`<rect y="${o.camps-10}" width="540" height="60" fill="url(#fog)" opacity=".8"/>`:'')+
   ground(o.gy)+tufts(o.gy-10,'#3a3a4a',60)+flowers(o.gy,24); }


/* ---------- props & special pieces ---------- */
function headOnly(x,y,s,eye){ // Barbarik's head (respectful, crowned), chin at y
  return `<g transform="translate(${x} ${y}) scale(${s})"><g transform="translate(-6 260)">
   <path d="M-12 -272 C-26 -270 -28 -254 -22 -244 L-8 -244 C-12 -252 -12 -262 -8 -270Z" fill="#0d0a10"/>
   <path d="M-14 -262 C-16 -286 0 -294 14 -288 C22 -284 24 -276 24 -270 L32 -260 L24 -258 C24 -252 22 -248 16 -246 L-6 -244Z" fill="#8c6248"/>
   <path d="M-16 -268 C-20 -292 0 -300 18 -290 L14 -280 C2 -284 -8 -282 -12 -262Z" fill="#0d0a10"/>
   <path d="M-16 -286 L-12 -318 L-4 -300 L2 -326 L8 -300 L16 -316 L18 -286Z" fill="url(#gold)"/><circle cx="2" cy="-296" r="3" fill="#d63a2a"/>
   ${eye==='closed'?'<path d="M9 -269 q5 3 10 0" stroke="#1a0f08" stroke-width="2.2" fill="none"/>':'<circle cx="14" cy="-270" r="2.2" fill="#1a0f08"/>'}<path d="M9 -276 l10 -2" stroke="#0d0a10" stroke-width="2.4"/>
   <path d="M17 -251 q4 0 7 -1" stroke="#3a1a10" stroke-width="2" fill="none"/><circle cx="-4" cy="-256" r="4" fill="none" stroke="#e8b83a" stroke-width="2"/></g></g>`;
}
function pedestal(x,y,s){ let mg=''; for(let i=0;i<14;i++){ const a=Math.PI*(i/13); mg+=`<circle cx="${r1(Math.cos(a)*44)}" cy="${r1(-Math.sin(a)*10+6)}" r="5" fill="${i%2?'#ff9d2a':'#ffd23a'}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-46 0 L46 0 L38 30 L-38 30Z" fill="#8a3a22"/><path d="M-40 14 L40 14" stroke="#e8b83a" stroke-width="2"/><path d="M-56 30 L56 30 L56 44 L-56 44Z" fill="#5a2a1a"/><path d="M-56 30 L56 30" stroke="#e8b83a" stroke-width="2"/><path d="M-46 0 L46 0" stroke="#d9c9a3" stroke-width="2"/>${mg}</g>`; }
function field(mode){ let s='';
  for(let r=0;r<3;r++) for(let i=0;i<11;i++){
    const x=24+i*48+(r%2)*24, yy=660+r*58, sc=1+r*.28, marked=((i*7+r*3)%3)!==0, hy=yy-34*sc;
    const one=sol(x,yy,sc,'#0d0910',i%2===0);
    if(mode==='erase' && marked) s+=A('fadeout:'+(0.6+(i+r*2)*.1).toFixed(2)+':1.2', one+`<circle cx="${x}" cy="${r1(hy)}" r="${r1(20*sc)}" fill="url(#gw)"/>`);
    else s+=one;
    if(mode==='mark' && marked) s+=A('pop:'+(0.5+(i+r)*.07).toFixed(2), A('pulse:3',`<circle cx="${x}" cy="${r1(hy)}" r="${r1(15*sc)}" fill="none" stroke="#ff4a3c" stroke-width="2.6"/><path d="M${r1(x-9*sc)} ${r1(hy)} h${r1(18*sc)} M${x} ${r1(hy-9*sc)} v${r1(18*sc)}" stroke="#ff4a3c" stroke-width="1.8"/>`));
    if(mode==='save' && !marked) s+=A('pop:'+(0.5+(i+r)*.08).toFixed(2), A('pulse:2.5',`<circle cx="${x}" cy="${r1(yy-24*sc)}" r="${r1(34*sc)}" fill="url(#gg)" opacity=".7"/><circle cx="${x}" cy="${r1(yy-24*sc)}" r="${r1(26*sc)}" fill="none" stroke="#5cff9a" stroke-width="2.4"/>`));
  } return s; }
function flyArrow(col,glow){ return A('slide:-560:60:1.1:0.2',`<g transform="translate(70 300) rotate(-6)"><line x1="-200" y1="0" x2="360" y2="0" stroke="${col}" stroke-width="16" opacity=".25" filter="url(#b10)"/><line x1="0" y1="0" x2="360" y2="0" stroke="${col}" stroke-width="4" stroke-linecap="round"/><polygon points="360,-11 390,0 360,11" fill="${col}"/><polygon points="0,0 -20,-11 -9,0 -20,11" fill="${col}"/><circle cx="380" cy="0" r="50" fill="url(#${glow})"/></g>`); }
const big=(x,y,size,col,str,delay)=>A('pop:'+(delay||0.4),`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${col}" style="filter:drop-shadow(0 0 12px ${col})">${str}</text>`);

/* ---------- sky, moon & palace pieces (reusable) ---------- */
let _pmN=0;
// Moon with phases. mode: 'full' | 'wane' (full -> crescent over dur) | 'wax' (crescent -> full) | number = fixed shadow offset in radii
function phaseMoon(x,y,r,mode,dur,delay){
  const id='pm'+(_pmN++), D=dur||3, dl=delay===undefined?0.3:delay, sr=r1(r*1.06), dark='#0b1030';
  let crater=''; [[-.3,-.25,.18],[.25,.1,.22],[-.05,.4,.12],[.42,-.38,.1]].forEach(([a,b,c])=>crater+=`<circle cx="${r1(x+a*r)}" cy="${r1(y+b*r)}" r="${r1(c*r)}" fill="#c9bfa0" opacity=".35"/>`);
  let sh='';
  if(mode==='wane') sh=A(`slide:${r1(r*1.75)}:0:${D}:${dl}`,`<circle cx="${r1(x+r*.45)}" cy="${y}" r="${sr}" fill="${dark}" opacity=".94"/>`);
  else if(mode==='wax') sh=A(`slide:${r1(r*1.75)}:0:${D}:0`,`<circle cx="${r1(x-r*2.35)}" cy="${y}" r="${sr}" fill="${dark}" opacity=".94"/>`);
  else if(typeof mode==='number') sh=`<circle cx="${r1(x+mode*r)}" cy="${y}" r="${sr}" fill="${dark}" opacity=".94"/>`;
  const halo = mode==='wane' ? A(`fadeout:${dl}:${D*1.2}`,`<circle cx="${x}" cy="${y}" r="${r*3.4}" fill="url(#moonG)" opacity=".55"/>`)
             : mode==='wax' ? A(`fadein:${D*0.5}:${D}`,`<circle cx="${x}" cy="${y}" r="${r*3.4}" fill="url(#moonG)" opacity=".55"/>`)
             : `<circle cx="${x}" cy="${y}" r="${r*3.4}" fill="url(#moonG)" opacity=".5"/>`;
  return `<circle cx="${x}" cy="${y}" r="${r*2}" fill="url(#moonG)" opacity=".3"/>${halo}<clipPath id="${id}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath>`+
    `<g clip-path="url(#${id})"><circle cx="${x}" cy="${y}" r="${r}" fill="#f3ecd2"/>${crater}${sh}</g><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#f3ecd2" stroke-opacity=".25" stroke-width="1.5"/>`;
}
// 8 phases in a row: waning (कृष्ण पक्ष) on the left, waxing (शुक्ल पक्ष) on the right
function moonRow(y,r){ const offs=['f',1.35,.85,.4,0,-.4,-.85,-1.35]; let s=''; const gap=540/8;
  offs.forEach((o,i)=>{ const x=r1(gap/2+i*gap); s+=A(`pop:${(0.3+i*0.18).toFixed(2)}`, o==='f'?phaseMoon(x,y,r,'full'):phaseMoon(x,y,r,o)); }); return s; }
// a sparkle star
function sparkle(x,y,s,col){ col=col||'#fff3c4'; return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})"><circle r="9" fill="${col}" opacity=".18"/><path d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2Z" fill="${col}"/></g>`; }
// the 27 nakshatras on a ring (ellipse); stars twinkle and appear one by one when stagger>0
function nakshatras(cx,cy,rx,ry,stagger,col){ let s=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#f0d79a" stroke-opacity=".22" stroke-width="1.5" stroke-dasharray="3 8"/>`;
  for(let i=0;i<27;i++){ const a=-Math.PI/2+i*2*Math.PI/27, x=cx+rx*Math.cos(a), y=cy+ry*Math.sin(a);
    const st=sparkle(x,y,0.8+(i%3)*0.2,col); s+= stagger ? A(`pop:${(0.2+i*stagger).toFixed(2)}`, A('flick:'+(2+rnd()*3).toFixed(2), st)) : A('flick:'+(2+rnd()*3).toFixed(2), st); }
  return s; }
// a small Earth
function earth(x,y,r){ return `<circle cx="${x}" cy="${y}" r="${r*1.5}" fill="#4a8ad8" opacity=".15"/><circle cx="${x}" cy="${y}" r="${r}" fill="#2d6ab0"/>`+
  `<path d="M${x-r*.6} ${y-r*.3} q${r*.3} ${-r*.4} ${r*.6} ${-r*.1} q${r*.1} ${r*.4} ${-r*.2} ${r*.6} q${-r*.4} ${r*.1} ${-r*.4} ${-r*.5}Z M${x+r*.2} ${y+r*.2} q${r*.4} ${-r*.1} ${r*.5} ${r*.3} q${-r*.2} ${r*.4} ${-r*.5} ${r*.2}Z" fill="#4e9a5a"/>`+
  `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#bfe0ff" stroke-opacity=".5" stroke-width="2"/>`; }
// moon going round a centre once every `period` seconds (radius r)
function orbitMoon(cx,cy,r,period,mr){ return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#f3ecd2" stroke-opacity=".35" stroke-width="2"/>`+A(`spin:${period}:${cx}:${cy}`, phaseMoon(cx+r,cy,mr||16,'full')); }
// royal palace interior (warm), pillars + arches + hanging lamps; floor at y.
// For parallax the palace comes in three depth layers: palaceBack (wall, glow, arches), palaceMid (pillars, cornice, lamps), palaceFloor.
function palaceBack(y,tone){ const w=tone||'#3a1a2c'; let s=`<rect x="-60" y="-60" width="660" height="1080" fill="${w}"/><circle cx="270" cy="${y-240}" r="360" fill="url(#saf)" opacity=".35"/>`;
  for(let i=-1;i<5;i++){ const x=-20+i*190; s+=`<path d="M${x+20} ${y-90} L${x+20} ${y-420} Q${x+95} ${y-560} ${x+170} ${y-420} L${x+170} ${y-90}Z" fill="#24101c" opacity=".75"/>`; }
  return s; }
function palaceMid(y){ const p='#58283e', g='url(#gold)'; let s='';
  for(let i=-1;i<6;i++){ const x=-10+i*137; s+=`<rect x="${x-14}" y="${y-470}" width="28" height="${470}" fill="${p}"/><rect x="${x-20}" y="${y-480}" width="40" height="14" fill="${g}"/><rect x="${x-20}" y="${y-14}" width="40" height="14" fill="${g}"/><rect x="${x-14}" y="${y-470}" width="8" height="456" fill="#000" opacity=".18"/>`; }
  s+=`<rect x="-60" y="${y-500}" width="660" height="22" fill="${g}" opacity=".85"/>`;
  [135,405].forEach(x=>{ s+=`<line x1="${x}" y1="${y-478}" x2="${x}" y2="${y-400}" stroke="#c99a3a" stroke-width="1.5"/>`+A('flick:'+(4+rnd()*3).toFixed(2),`<circle cx="${x}" cy="${y-392}" r="34" fill="url(#saf)"/>`)+`<path d="M${x-10} ${y-400} L${x+10} ${y-400} L${x} ${y-386}Z" fill="${g}"/>`; });
  return s; }
function palaceFloor(y){ const g='url(#gold)'; let s=`<path d="M-60 ${y} L600 ${y} L600 1020 L-60 1020Z" fill="#1e0c16"/>`;
  for(let i=-2;i<10;i++) s+=`<line x1="${270+(i-3.5)*40}" y1="${y}" x2="${270+(i-3.5)*160}" y2="1020" stroke="#3a1a2a" stroke-width="2"/>`;
  return s+`<rect x="-60" y="${y}" width="660" height="6" fill="${g}" opacity=".6"/>`; }
function palace(y,tone){ return palaceBack(y,tone)+palaceMid(y)+palaceFloor(y); }
// palm-leaf manuscript (pothi), centred at x,y
function pothi(x,y,s){ let l=''; for(let i=0;i<6;i++) l+=`<line x1="${-150}" y1="${-22+i*9}" x2="${150}" y2="${-22+i*9}" stroke="#7a5228" stroke-width="1.6" opacity=".55" stroke-dasharray="${8+i*3} 5"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-176" y="-44" width="352" height="88" rx="10" fill="#4a2c18"/><rect x="-168" y="-38" width="336" height="76" rx="8" fill="#e8cf96"/><rect x="-168" y="-38" width="336" height="76" rx="8" fill="url(#paper)" opacity=".2"/>${l}`+
    `<circle cx="-110" cy="0" r="5" fill="#4a2c18"/><circle cx="110" cy="0" r="5" fill="#4a2c18"/><path d="M-110 0 C-140 60 -100 90 -60 70" stroke="#b8202a" stroke-width="2.5" fill="none"/></g>`; }
// parchment panel for verses: returns svg; put text lines with verse()
function parchment(x,y,w,h){ return A('rise:30:0.8:0.2',`<g><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="14" fill="#ead6a4"/><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="14" fill="none" stroke="#a8742c" stroke-width="3"/>`+
  `<rect x="${x-w/2+10}" y="${y-h/2+10}" width="${w-20}" height="${h-20}" rx="10" fill="none" stroke="#a8742c" stroke-width="1.2" stroke-dasharray="2 5"/><rect x="${x-w/2-8}" y="${y-h/2-12}" width="${w+16}" height="20" rx="10" fill="#8a5a28"/><rect x="${x-w/2-8}" y="${y+h/2-8}" width="${w+16}" height="20" rx="10" fill="#8a5a28"/></g>`); }
// verse lines (Tiro font), each line fades in after the previous
function verse(x,y,lines,size,col,delay,gap){ return lines.map((t,i)=>A(`pop:${((delay||0.8)+i*(gap||1.4)).toFixed(2)}`,`<text x="${x}" y="${y+i*size*1.55}" text-anchor="middle" font-size="${size}" fill="${col||'#5a2a0a'}" style="font-family:'Tiro',serif;font-weight:400">${t}</text>`)).join(''); }

/* Calligraphy: verse lines that are "written" left to right with a glowing pen-edge, a gold underline and a source credit.
   Use as shot field:  calli:{lines:['..','..'], source:'— महाभारत', y:300, size:34, delay:.6, gap:1.5, write:1.2, hold:0}
   (hold>0 = fade the verse out that many seconds after the last line is written). Or call calligraphy(lines,opts) inside art/front. */
let _cgN=0;
function calligraphy(lines,o){ o=Object.assign({y:300,size:34,delay:0.6,gap:1.5,write:1.2,col:'#ffe7a8',source:'',hold:0,scrim:true,glow:true,cx:270,sw:540},o||{});   // cx/sw = centre x and width of the picture (core.js passes 480/960 for 16:9)
  const CX=o.cx, SW=o.sw;
  const n=_cgN++, S=o.size, lh=S*1.6; let out=`<defs><linearGradient id="cgS${n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05030c" stop-opacity="0"/><stop offset=".22" stop-color="#05030c" stop-opacity=".62"/><stop offset=".78" stop-color="#05030c" stop-opacity=".62"/><stop offset="1" stop-color="#05030c" stop-opacity="0"/></linearGradient></defs>`;
  const H=lines.length*lh+(o.source?lh*1.3:lh*.6)+S, top=o.y-S*2;
  if(o.scrim) out+=A(`fadein:${Math.max(0,o.delay-.3).toFixed(2)}:.6`,`<rect x="0" y="${r1(top)}" width="${SW}" height="${r1(H)}" fill="url(#cgS${n})"/>`);
  lines.forEach((ln,i)=>{ const t0=o.delay+i*o.gap, ly=o.y+i*lh, w=Math.min(SW-40,Array.from(ln).length*S*0.52+36), x0=r1(CX-w/2), x1=r1(CX+w/2);
    out+=`<clipPath id="cg${n}_${i}"><rect data-a="reveal:${t0.toFixed(2)}:${o.write}:${x0}:${x1}" x="${x0}" y="${r1(ly-S*1.25)}" width="0" height="${r1(S*1.9)}"/></clipPath>`+
      `<g clip-path="url(#cg${n}_${i})"><text x="${CX}" y="${r1(ly)}" text-anchor="middle" font-size="${S}" fill="${o.col}" style="font-family:'Tiro','Mukta',serif;font-weight:400;${o.glow?'filter:drop-shadow(0 0 8px rgba(255,190,90,.75)) drop-shadow(0 2px 0 #2a1204)':''}">${ln}</text></g>`+
      `<rect data-a="glint:${t0.toFixed(2)}:${o.write}:${x0}:${x1}" x="-3" y="${r1(ly-S*1.1)}" width="6" height="${r1(S*1.45)}" rx="3" fill="#fff3c4" filter="url(#b4)" opacity="0"/>`; });
  const tEnd=o.delay+lines.length*o.gap;
  if(o.source) out+=A(`pop:${(tEnd-.2).toFixed(2)}`,`<path d="M${CX-100} ${r1(o.y+lines.length*lh-S*.6)} L${CX+100} ${r1(o.y+lines.length*lh-S*.6)}" stroke="#f1c04e" stroke-width="1.6" opacity=".8"/><path d="M${CX-6} ${r1(o.y+lines.length*lh-S*.6)} l6 -5 l6 5 l-6 5Z" fill="#f1c04e"/>`+
    `<text x="${CX}" y="${r1(o.y+lines.length*lh+S*.5)}" text-anchor="middle" font-size="${r1(S*.58)}" fill="#e6c98a" style="font-weight:700">${o.source}</text>`);
  return o.hold>0 ? A(`fadeout:${(tEnd+o.hold).toFixed(2)}:.7`,out) : out; }

/* =====================================================================
   EXPLAINER TEMPLATES (gold-on-dark, same look as the rest). All return SVG, put them in art/mid/front.
   Lines draw themselves in, medallions and labels pop in one by one.  Text is Hindi (Mukta).
   ===================================================================== */
const _exLabel=(x,y,t,size,col)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${col||'#ffe9b8'}" stroke="#120a06" stroke-width="${(size*.22).toFixed(1)}" stroke-linejoin="round" paint-order="stroke" style="font-weight:800">${t}</text>`;
const _exDraw=(d,delay,dur,col,w,dash)=>A(`draw:${delay.toFixed(2)}:${dur.toFixed(2)}`,`<path d="${d}" pathLength="1" stroke-dasharray="${dash||1}" stroke-dashoffset="1" fill="none" stroke="${col||'#f0d79a'}" stroke-width="${w||2.6}" stroke-linecap="round" opacity=".9"/>`);
// medallion: dark disc, gold ring, first letter (or o.mark) inside; hi:true = bigger, glowing
function _exNode(x,y,n,o){ o=o||{}; const r=o.r||32, hi=o.hi, mark=o.mark||String(n).charAt(0), col=o.col||'#f0d79a';
  return `<g transform="translate(${x} ${y})">`+(hi?A('pulse:1.6',`<circle r="${r*1.9}" fill="url(#gw)" opacity=".9"/>`):'')+
    `<circle r="${r+5}" fill="${col}" opacity=".16"/><circle r="${r}" fill="#24140c" stroke="${col}" stroke-width="${hi?3.6:2.4}"/><circle r="${r-6}" fill="none" stroke="${col}" stroke-opacity=".35" stroke-width="1"/>`+
    `<text y="${r*.36}" text-anchor="middle" font-size="${(r*1.05).toFixed(0)}" fill="${col}" style="font-family:'Tiro',serif">${mark}</text></g>`; }
/* famTree(cx, top, tree, opts): tree={n:'दशरथ', sub:'अयोध्या के राजा', hi:true, kids:[...]}. Siblings spread automatically.
   opts: gapY 150, leafW 118, r 30, delay .3, step .55 (seconds between generations) */
function famTree(cx,top,tree,o){ o=Object.assign({gapY:190,leafW:128,r:40,delay:.3,step:.55},o||{});
  const wOf=t=>t._w=(t.kids&&t.kids.length)?Math.max(o.leafW,t.kids.reduce((a,k)=>a+wOf(k),0)):o.leafW;
  wOf(tree); let lines='', nodes='';
  (function place(t,x,y,d){ t._x=x; t._y=y;
    if(t.kids&&t.kids.length){ let left=x-t._w/2; t.kids.forEach(k=>{ place(k,left+k._w/2,y+o.gapY,d+1); left+=k._w; }); }
    t._d=d; })(tree,cx,top,0);
  (function walk(t){ const dl=o.delay+t._d*o.step;
    nodes+=A(`pop:${(dl+.25).toFixed(2)}`,_exNode(t._x,t._y,t.n,{r:o.r,hi:t.hi,mark:t.mark,col:t.col})+_exLabel(t._x,t._y+o.r+32,t.n,28)+(t.sub?_exLabel(t._x,t._y+o.r+58,t.sub,18,'#d8c496'):''));
    (t.kids||[]).forEach(k=>{ const y1=t._y+o.r+(t.sub?68:42), y2=k._y-o.r-6, ym=(y1+y2)/2;
      lines+=_exDraw(`M${t._x} ${y1} L${t._x} ${ym} L${k._x} ${ym} L${k._x} ${y2}`,dl+.15,o.step*.9); walk(k); }); })(tree);
  return `<g>${lines}${nodes}</g>`; }
/* timeline(cx, top, items, opts): vertical gold line with dots; items=[{t:'सतयुग', d:'धर्म चारों पैरों पर', hi:true}] alternate left/right.
   opts: gap 130, delay .3, step .7 */
function timeline(cx,top,items,o){ o=Object.assign({gap:150,delay:.3,step:.7},o||{});
  const bot=top+o.gap*(items.length-1)+20; let s=_exDraw(`M${cx} ${top-20} L${cx} ${bot}`,o.delay,o.step*items.length*.9,'#f0d79a',3);
  items.forEach((it,i)=>{ const y=top+i*o.gap, side=i%2?1:-1, dl=it.at!==undefined?it.at:o.delay+i*o.step*.9+.2, tx=cx+side*40;
    s+=A(`pop:${dl.toFixed(2)}`,(it.hi?A('pulse:1.6',`<circle cx="${cx}" cy="${y}" r="26" fill="url(#gw)"/>`):'')+`<circle cx="${cx}" cy="${y}" r="${it.hi?14:10}" fill="#24140c" stroke="#ffd25e" stroke-width="3.4"/>`+
      `<path d="M${cx+side*11} ${y} L${tx} ${y}" stroke="#f0d79a" stroke-width="2"/>`+
      `<text x="${tx+side*8}" y="${y-2}" text-anchor="${side>0?'start':'end'}" font-size="34" fill="${it.hi?'#ffd25e':'#ffe9b8'}" stroke="#120a06" stroke-width="5" stroke-linejoin="round" paint-order="stroke" style="font-weight:800">${it.t}</text>`+
      (it.d?`<text x="${tx+side*8}" y="${y+26}" text-anchor="${side>0?'start':'end'}" font-size="21" fill="#d8c496" stroke="#120a06" stroke-width="4" stroke-linejoin="round" paint-order="stroke" style="font-weight:700">${it.d}</text>`:'')); });
  return `<g>${s}</g>`; }
/* mapRoute(points, opts): a dotted gold journey between places. points=[{x,y,n:'अयोध्या'}, ...]; the last place glows.
   opts: delay .3, step .9 (seconds per leg), wiggle 26 (how curvy the legs are), label:'below'|'side' */
function mapRoute(pts,o){ o=Object.assign({delay:.3,step:.9,wiggle:26},o||{}); let s='', marks='';
  pts.forEach((p,i)=>{ const dl=o.delay+i*o.step;
    if(i>0){ const q=pts[i-1], mx=(q.x+p.x)/2+(i%2?1:-1)*o.wiggle, my=(q.y+p.y)/2;
      s+=_exDraw(`M${q.x} ${q.y} Q${mx} ${my} ${p.x} ${p.y}`,dl-o.step*.85,o.step*.8,'#ffd25e',3,'0.012 0.016'); }
    const last=i===pts.length-1, side=p.x>270?-1:1;
    marks+=A(`pop:${dl.toFixed(2)}`,(last?A('ripple:2.4:'+p.x+':'+p.y,`<circle cx="${p.x}" cy="${p.y}" r="40" fill="none" stroke="#ffd25e" stroke-width="2"/>`)+A('pulse:1.6',`<circle cx="${p.x}" cy="${p.y}" r="34" fill="url(#gw)"/>`):'')+
      `<circle cx="${p.x}" cy="${p.y}" r="${last?14:10}" fill="#24140c" stroke="#ffd25e" stroke-width="3.4"/><circle cx="${p.x}" cy="${p.y}" r="${last?5.5:4}" fill="#ffd25e"/>`+
      (o.label==='side'? `<text x="${p.x+side*20}" y="${p.y+7}" text-anchor="${side>0?'start':'end'}" font-size="28" fill="#ffe9b8" stroke="#120a06" stroke-width="6" stroke-linejoin="round" paint-order="stroke" style="font-weight:800">${p.n}</text>` : _exLabel(p.x,p.y+40,p.n,28))); });
  return `<g>${s}${marks}</g>`; }


/* =====================================================================
   SHIV TEMPLE + NANDI PIECES (Nandi story). Ground is at y; faces right unless flip:true.
   Own gradients get a fresh id each call (Chrome only paints a gradient whose FIRST id in the page is visible).
   ===================================================================== */
let _ndN=0;
function _lg(x2,y2,stops){ const id='nd'+(_ndN++); return {id, def:`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}"${a===undefined?'':` stop-opacity="${a}"`}/>`).join('')}</linearGradient>`}; }
function skyBand(stops){ const g=_lg(0,1,stops); return `<defs>${g.def}</defs><rect width="540" height="960" fill="url(#${g.id})"/>`; }

/* Shivling on its base (yoni peetham), centre x, base at y. Black stone, three white ash lines, marigold ring, one bilva leaf. */
function shivling(x,y,s){ s=s||1;
  const m=[...Array(9)].map((_,i)=>{ const a=Math.PI*(i/8); return `<circle cx="${r1(Math.cos(a)*40)}" cy="${r1(-Math.sin(a)*9-2)}" r="5.5" fill="${i%2?'#ff9d2a':'#ffc83a'}"/>`; }).join('');
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="62" ry="10" fill="#000" opacity=".35"/>
   <path d="M-56 0 L-46 -20 L46 -20 L56 0Z" fill="#6a5560"/><path d="M-46 -20 L46 -20 L40 -28 L-40 -28Z" fill="#8a7078"/><path d="M-44 -22 L-62 -17 L-62 -11 L-44 -16Z" fill="#6a5560"/>
   <path d="M-34 -28 L-30 -92 C-28 -112 28 -112 30 -92 L34 -28Z" fill="#2c2a34"/><path d="M-22 -34 L-20 -92 C-19 -104 -10 -108 -8 -108 C-14 -96 -14 -60 -12 -34Z" fill="#4a4858" opacity=".7"/>
   <g fill="none" stroke="#f1ead6" stroke-width="3" stroke-linecap="round" opacity=".92"><path d="M-27 -80 Q0 -68 27 -80"/><path d="M-28 -66 Q0 -54 28 -66"/><path d="M-29 -52 Q0 -40 29 -52"/></g>
   <g transform="translate(0 -28)">${m}</g><path d="M-6 -111 l6 -12 l6 12 q-6 6 -12 0Z" fill="#3f8a46"/><circle cx="14" cy="-108" r="4.5" fill="#fff3d0"/></g>`; }

/* A hanging row of diyas along y, from x1 to x2 (n lamps). Flames flicker, each with a warm glow. */
function diyaRow(x1,x2,y,n,s){ s=s||1; let o=''; for(let i=0;i<n;i++){ const x=r1(x1+(x2-x1)*(n<2?0:i/(n-1)));
  o+=`<g transform="translate(${x} ${y}) scale(${s})">${A('flick:'+(5+rnd()*4).toFixed(2),'<circle cy="-10" r="26" fill="url(#saf)"/>')}<path d="M-9 0 Q0 9 9 0 L7 -4 L-7 -4Z" fill="#b2562a"/><path d="M-9 0 L9 0" stroke="#e8b83a" stroke-width="1.2"/>${A('flick:'+(7+rnd()*4).toFixed(2),'<path d="M0 -4 Q-4 -10 0 -18 Q4 -10 0 -4Z" fill="#ffd27a"/><path d="M0 -4 Q-1.6 -8 0 -12 Q1.6 -8 0 -4Z" fill="#fff3c4"/>')}</g>`; } return o; }

/* A drooping marigold garland between two points. */
function marigoldString(x1,y1,x2,y2,sag,n){ n=n||16; let o=`<path d="M${x1} ${y1} Q${r1((x1+x2)/2)} ${r1((y1+y2)/2+(sag||30)*2)} ${x2} ${y2}" fill="none" stroke="#6a3c1a" stroke-width="1.6"/>`;
  for(let i=0;i<=n;i++){ const t=i/n, x=(1-t)*(1-t)*x1+2*t*(1-t)*((x1+x2)/2)+t*t*x2, y=(1-t)*(1-t)*y1+2*t*(1-t)*((y1+y2)/2+(sag||30)*2)+t*t*y2; o+=`<circle cx="${r1(x)}" cy="${r1(y+5)}" r="${i%2?5.2:4.4}" fill="${i%3===0?'#ff8a1a':'#ffc83a'}"/>`; } return o; }

/* A temple tower (shikhara) in stepped tiers with a golden kalash on top; base centre x, bottom y, width w. */
function shikhara(x,y,w,h,col,lit){ let o=''; const tiers=7, c2='#00000022';
  for(let i=0;i<tiers;i++){ const tw=w*(1-i*.12), th=h/tiers; o+=`<path d="M${r1(x-tw/2)} ${r1(y-i*th)} L${r1(x-tw/2+6)} ${r1(y-(i+1)*th)} L${r1(x+tw/2-6)} ${r1(y-(i+1)*th)} L${r1(x+tw/2)} ${r1(y-i*th)}Z" fill="${col}"/><rect x="${r1(x-tw/2)}" y="${r1(y-i*th-3)}" width="${r1(tw)}" height="3" fill="${lit||'#e0a04a'}" opacity=".5"/>`; }
  return o+`<path d="M${x-w*.2} ${r1(y-h)} Q${x} ${r1(y-h-w*.5)} ${x+w*.2} ${r1(y-h)}Z" fill="${col}"/><rect x="${x-1.5}" y="${r1(y-h-w*.5-14)}" width="3" height="16" fill="#e8b83a"/><circle cx="${x}" cy="${r1(y-h-w*.5-16)}" r="4" fill="#ffd25e"/>`; }

/* The sanctum doorway (garbhagriha): carved stone frame, warm inner glow, Shivling and lamps inside. x = centre, y = floor, s = scale. */
function sanctum(x,y,s){ s=s||1; const w=150, h=250;
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="${-w-34}" y="${-h-30}" width="${(w+34)*2}" height="${h+30}" fill="#3a2630"/>
   <path d="M${-w} 0 L${-w} ${-h+60} Q${-w} ${-h} 0 ${-h-6} Q${w} ${-h} ${w} ${-h+60} L${w} 0Z" fill="#1a0c0e"/>
   <ellipse cx="0" cy="-80" rx="${w*.95}" ry="170" fill="url(#saf)" opacity=".85"/>
   <path d="M${-w} 0 L${-w} ${-h+60} Q${-w} ${-h} 0 ${-h-6} Q${w} ${-h} ${w} ${-h+60} L${w} 0Z" fill="none" stroke="#e0a04a" stroke-width="5"/>
   <path d="M${-w+14} 0 L${-w+14} ${-h+66} Q${-w+14} ${-h+16} 0 ${-h+10} Q${w-14} ${-h+16} ${w-14} ${-h+66} L${w-14} 0" fill="none" stroke="#e0a04a" stroke-width="1.6" opacity=".6"/>
   ${shivling(0,-6,1.45)}${A('rock:5:1.1:0:'+(-h+14),'<path d="M-9 '+(-h+14)+' h18 l4 16 h-26Z" fill="#e8b83a"/><circle cx="0" cy="'+(-h+32)+'" r="3" fill="#a8741c"/>')}
   ${diyaRow(-w+40,-w+40,-30,1,1.2)}${diyaRow(w-40,w-40,-30,1,1.2)}
   <rect x="${-w-34}" y="-12" width="${(w+34)*2}" height="12" fill="#2a1a22"/><rect x="${-w-20}" y="-30" width="${(w+20)*2}" height="18" fill="#4a3038"/>
   ${[-1,1].map(k=>`<rect x="${k*(w+10)-9}" y="${-h-20}" width="18" height="${h+20}" fill="#4a3038"/><rect x="${k*(w+10)-13}" y="${-h-24}" width="26" height="10" fill="#e0a04a" opacity=".85"/>`).join('')}</g>`; }

/* The white bull NANDI, seated (front legs folded) and looking right toward the Shivling; flip:true looks left.
   o = {flip, eyes:'closed', garland:true, calm:true}. Ground at y, s = scale (1 = about 300 px long). Big ear for the whisper close-up
   (the ear tip is at about (x+78*s, y-146*s) when facing right). Bells on the neck and the tail sway by themselves. */
function nandiBull(x,y,s,o){ o=Object.assign({flip:false,eyes:null,garland:true},o||{}); s=s||1;
  const cream='#f6f1e6', shade='#dcd2c0', deep='#c4b8a4', pink='#e8a8a0', gold='url(#gold)';
  const eye = o.eyes==='closed' ? `<path d="M116 -128 q7 5 14 0" stroke="#2a1a14" stroke-width="2.4" fill="none" stroke-linecap="round"/>` :
    `<ellipse cx="123" cy="-128" rx="6.5" ry="5" fill="#2a1a14"/><circle cx="125" cy="-130" r="1.8" fill="#fff"/><path d="M115 -134 q8 -5 17 -1" stroke="#b8a890" stroke-width="2.2" fill="none"/><path d="M116 -127 q7 5 14 0" stroke="#d8c8b0" stroke-width="1.2" fill="none" opacity=".7"/>`;
  const gar = o.garland ? `<path d="M70 -130 Q60 -88 96 -62" fill="none" stroke="#6a3c1a" stroke-width="1.4"/>`+[...Array(9)].map((_,i)=>{ const t=i/8, px=(1-t)*(1-t)*70+2*t*(1-t)*58+t*t*96, py=(1-t)*(1-t)*-130+2*t*(1-t)*-84+t*t*-62; return `<circle cx="${r1(px)}" cy="${r1(py)}" r="${i%2?6.4:5.6}" fill="${i%3===0?'#ff8a1a':'#ffc83a'}"/>`; }).join('') : '';
  const bells=[[84,-104],[92,-92],[100,-78]].map(([bx,by],i)=>A(`rock:14:${(2+i*.4).toFixed(1)}:${bx}:${by-6}`,`<line x1="${bx}" y1="${by-6}" x2="${bx}" y2="${by}" stroke="#a8741c" stroke-width="1.5"/><path d="M${bx-5} ${by+8} Q${bx} ${by-3} ${bx+5} ${by+8}Z" fill="#e8b83a"/><circle cx="${bx}" cy="${by+9}" r="1.7" fill="#7a4a10"/>`)).join('');
  return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${o.flip?-s:s} ${s})">
   <ellipse cx="0" cy="2" rx="150" ry="11" fill="#000" opacity=".28"/>
   ${A('rock:9:1.1:-122:-56',`<path d="M-122 -56 C-150 -48 -158 -20 -150 -4" fill="none" stroke="${cream}" stroke-width="7" stroke-linecap="round"/><path d="M-152 -10 q-8 6 -2 16 q10 -2 6 -16Z" fill="#a89a84"/>`)}
   <path d="M-128 0 C-146 -44 -128 -96 -84 -112 C-54 -122 -34 -156 4 -156 C36 -156 48 -128 74 -118 L104 -92 L108 0Z" fill="${cream}"/>
   <path d="M-128 0 C-140 -30 -134 -60 -120 -80 C-100 -40 -60 -20 -20 -14 L-20 0Z" fill="${shade}" opacity=".7"/>
   <ellipse cx="-70" cy="-24" rx="52" ry="24" fill="${shade}"/><ellipse cx="-70" cy="-24" rx="52" ry="24" fill="none" stroke="${deep}" stroke-width="1.4"/><path d="M-118 -10 q-10 10 -2 12 h16" fill="#a89a84"/>
   <path d="M-82 -118 C-62 -128 -40 -150 -8 -152 L-6 -112 C-30 -104 -56 -100 -82 -96Z" fill="#b8202a"/><path d="M-82 -118 C-62 -128 -40 -150 -8 -152 M-82 -96 C-56 -100 -30 -104 -6 -112" fill="none" stroke="${gold}" stroke-width="3"/>
   ${[-70,-50,-30].map(a=>`<circle cx="${a}" cy="-120" r="3.2" fill="#ffd25e"/>`).join('')}
   <path d="M20 -2 C46 -34 118 -34 168 -10 L170 0 L20 0Z" fill="${cream}"/><path d="M20 -2 C46 -34 118 -34 168 -10" fill="none" stroke="${deep}" stroke-width="1.6"/><path d="M168 -10 L172 0 L156 0Z" fill="#8a7a64"/>
   <path d="M76 -142 C96 -158 128 -150 142 -128 C154 -110 166 -98 164 -86 C160 -72 142 -74 130 -80 C114 -86 98 -98 86 -112Z" fill="${cream}"/>
   <path d="M130 -80 C142 -74 160 -72 164 -86 C168 -96 156 -104 150 -112 C148 -94 140 -84 130 -80Z" fill="#ecd2c4"/><ellipse cx="156" cy="-92" rx="2.8" ry="2" fill="#7a5a4c"/>
   <path d="M102 -148 C94 -184 124 -200 144 -178 C128 -184 116 -172 118 -146Z" fill="#efe2bc"/><path d="M144 -178 C148 -184 146 -190 142 -192 C138 -186 138 -182 144 -178Z" fill="#c8b480"/>
   <circle cx="116" cy="-146" r="3.4" fill="#c0202a"/>
   ${A('rock:5:1.4:80:-134',`<path d="M82 -136 C56 -150 40 -146 36 -130 C44 -118 66 -122 84 -126Z" fill="${cream}"/><path d="M78 -134 C60 -142 48 -140 46 -131 C52 -125 66 -127 80 -129Z" fill="${pink}"/><path d="M82 -136 C56 -150 40 -146 36 -130" fill="none" stroke="${deep}" stroke-width="1.4"/>`)}
   ${eye}${gar}
   <path d="M86 -100 C84 -78 92 -54 102 -40" fill="none" stroke="${shade}" stroke-width="12" stroke-linecap="round" opacity=".7"/>
   <path d="M84 -108 L100 -78" stroke="#b8202a" stroke-width="5" stroke-linecap="round"/>${bells}</g>`; }

/* Whisper trail: soft golden motes drift from point 1 (the ear) to point 2 (the Shivling), as a stream, with a glowing thread that draws itself.
   delay = secs into the shot when it begins. A sound-less, light-only effect for "the whisper reaches Mahadev". */
function whisperTrail(x1,y1,x2,y2,delay,n){ n=n||14; delay=delay||0; const dx=x2-x1, dy=y2-y1, mx=(x1+x2)/2, my=Math.min(y1,y2)-70;
  let o=A(`fadein:${delay.toFixed(2)}:1.2`,`<path d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" fill="none" stroke="#ffe7a8" stroke-width="7" opacity=".28" filter="url(#b4)"/><path d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" fill="none" stroke="#fff3c4" stroke-width="1.6" stroke-dasharray="2 7" stroke-linecap="round" opacity=".8"/>`);
  for(let i=0;i<n;i++){ const k=i/n, ox=Math.sin(i*2.1)*7, oy=Math.cos(i*1.7)*6; o+=A(`fadein:${(delay+k*1.2).toFixed(2)}:.6`, A(`drift:${r1(dx)}:${r1(dy)}:${(3.2+k*1.2).toFixed(2)}`,`<g transform="translate(${r1(x1+ox)} ${r1(y1+oy)})"><circle r="${r1(10+k*5)}" fill="url(#gw)"/><circle r="${r1(2+k*2)}" fill="#fff6d8"/></g>`)); }
  return o+A(`pop:${(delay+1.4).toFixed(2)}`,A('pulse:1.8',`<circle cx="${x2}" cy="${y2}" r="46" fill="url(#gw)" opacity=".9"/>`)); }

/* Forest river bank at dawn (soft teal + green + gold). Layers: riverSky() / riverFar() / riverBank(y). */
function riverSky(){ return skyBand([[0,'#2a5a6e'],[.45,'#7ab5a8'],[.75,'#f4d796'],[1,'#fbe6b0']])+`<circle cx="360" cy="560" r="170" fill="url(#gw)" opacity=".85"/><circle cx="360" cy="560" r="38" fill="#fff6d8"/>`; }
function riverFar(){ let o=hills(600,50,'#5c9a8a',120)+`<rect y="570" width="540" height="90" fill="url(#fogW)" opacity=".7"/>`; for(let i=0;i<9;i++){ const x=-10+i*66+rnd()*20, h=170+rnd()*90; o+=`<rect x="${r1(x)}" y="${r1(640-h)}" width="9" height="${r1(h)}" fill="#2e5a4c"/><ellipse cx="${r1(x+4)}" cy="${r1(640-h)}" rx="46" ry="34" fill="#3e7a62"/><ellipse cx="${r1(x+16)}" cy="${r1(640-h+16)}" rx="34" ry="24" fill="#4a8a6e"/>`; } return o; }
function riverBank(y){ let rip=''; for(let i=0;i<12;i++){ const rx=rnd()*500+20, ry=y-170+rnd()*130; rip+=A('flick:'+(1.5+rnd()*2).toFixed(2),`<path d="M${r1(rx)} ${r1(ry)} q14 -5 28 0" stroke="#f6f0d0" stroke-width="2" fill="none" opacity=".75"/>`); }
  return `<path d="M0 ${y-210} L540 ${y-210} L540 ${y-40} Q270 ${y-70} 0 ${y-30}Z" fill="#5aa6a0"/><path d="M0 ${y-210} L540 ${y-210} L540 ${y-150} L0 ${y-150}Z" fill="#9ad2c0" opacity=".6"/>`+
   `<ellipse cx="360" cy="${y-180}" rx="140" ry="9" fill="#fff0c0" opacity=".55"/><ellipse cx="360" cy="${y-150}" rx="80" ry="6" fill="#fff0c0" opacity=".4"/>`+rip+
   `<path d="M0 ${y} Q130 ${y-34} 280 ${y-22} T540 ${y-30} L540 1000 L0 1000Z" fill="#6a5a3c"/><path d="M0 ${y} Q130 ${y-34} 280 ${y-22} T540 ${y-30}" stroke="#a89060" stroke-width="3" fill="none"/>`+tufts(y-10,'#3e7a3a',40)+flowers(y,12); }

/* Hermitage (ashram) hut: thatched roof, mud walls, door glow, tulsi plant and a small havan fire. */
function ashramHut(x,y,s){ s=s||1; return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-100" width="180" height="100" fill="#b8825a"/><rect x="-90" y="-100" width="180" height="100" fill="#000" opacity=".08"/>
  <path d="M-124 -92 L0 -190 L124 -92Z" fill="#8a6a2a"/><path d="M-124 -92 L0 -190 L124 -92" fill="none" stroke="#5a4418" stroke-width="3"/>${[-90,-60,-30,0,30,60,90].map(k=>`<path d="M${k} -${100+ (190-100)*(1-Math.abs(k)/124)*0 } l${k*.3} -${(1-Math.abs(k)/124)*85}" stroke="#a88a40" stroke-width="2" opacity=".6"/>`).join('')}
  <path d="M-26 0 L-26 -62 Q0 -86 26 -62 L26 0Z" fill="#2a1408"/><ellipse cx="0" cy="-28" rx="30" ry="40" fill="url(#saf)" opacity=".8"/><rect x="-92" y="-6" width="184" height="8" fill="#8a6a44"/>
  <g transform="translate(-130 0)"><rect x="-10" y="-12" width="20" height="12" fill="#a8603a"/><path d="M0 -12 q-14 -14 -4 -28 q4 12 4 14 q0 -16 10 -22 q-2 18 -6 36Z" fill="#3e8a3a"/></g></g>`; }

/* Nandi seen from BEHIND (seated, facing away toward the sanctum): round white back, red-and-gold cloth, two ears and curved horns, tail. Ground at y. */
function nandiBack(x,y,s){ s=s||1; const cream='#f6f1e6', shade='#dcd2c0', deep='#c4b8a4';
  return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})"><ellipse cx="0" cy="2" rx="120" ry="12" fill="#000" opacity=".3"/>
   <ellipse cx="-62" cy="-18" rx="46" ry="20" fill="${shade}"/><ellipse cx="62" cy="-18" rx="46" ry="20" fill="${shade}"/>
   <path d="M-104 -4 C-118 -60 -92 -128 -40 -142 C-14 -148 14 -148 40 -142 C92 -128 118 -60 104 -4Z" fill="${cream}"/>
   <path d="M-104 -4 C-112 -40 -104 -80 -84 -108 C-70 -60 -60 -30 -50 -4Z" fill="${shade}" opacity=".7"/>
   <path d="M-46 -142 C-30 -170 30 -170 46 -142 C30 -134 -30 -134 -46 -142Z" fill="${cream}"/>
   <path d="M-84 -112 C-50 -128 50 -128 84 -112 L92 -50 C50 -38 -50 -38 -92 -50Z" fill="#b8202a"/><path d="M-84 -112 C-50 -128 50 -128 84 -112 M-92 -50 C-50 -38 50 -38 92 -50" fill="none" stroke="url(#gold)" stroke-width="4"/>
   ${[-60,-30,0,30,60].map(a=>`<circle cx="${a}" cy="-82" r="3.6" fill="#ffd25e"/>`).join('')}<path d="M-14 -96 L0 -66 L14 -96Z" fill="#ffd25e" opacity=".85"/>
   <ellipse cx="0" cy="-172" rx="30" ry="34" fill="${cream}"/>
   <ellipse cx="-44" cy="-178" rx="22" ry="9" transform="rotate(-18 -44 -178)" fill="${cream}"/><ellipse cx="44" cy="-178" rx="22" ry="9" transform="rotate(18 44 -178)" fill="${cream}"/>
   <ellipse cx="-42" cy="-178" rx="12" ry="4.5" transform="rotate(-18 -42 -178)" fill="#e8a8a0"/><ellipse cx="42" cy="-178" rx="12" ry="4.5" transform="rotate(18 42 -178)" fill="#e8a8a0"/>
   <path d="M-24 -192 C-48 -214 -50 -240 -30 -250 C-40 -232 -34 -214 -18 -200Z" fill="#efe2bc"/><path d="M24 -192 C48 -214 50 -240 30 -250 C40 -232 34 -214 18 -200Z" fill="#efe2bc"/>
   <path d="M-34 -150 Q0 -128 34 -150" fill="none" stroke="#ffc83a" stroke-width="9" stroke-linecap="round" stroke-dasharray="1 9"/>
   ${A('rock:6:1.2:0:-60','<path d="M0 -60 C6 -40 6 -18 0 -4" fill="none" stroke="'+cream+'" stroke-width="7" stroke-linecap="round"/><path d="M-5 -8 q5 12 10 0Z" fill="#a89a84"/>')}</g>`; }

/* ---- Meghnad video: Garuda piece (new) ----
   garuda(x,y,s,{flap:1, glow:true}) = huge golden-red eagle seen from the front with outspread wings, white head, gold crown, hooked beak,
   fanned tail and talons. (x,y) = centre of the body; s=1 is about 560 wide x 520 tall. Wings beat slowly by themselves (flap:0 = still). */
function garuda(x,y,s,o){ o=o||{}; const fl=o.flap===undefined?1:o.flap;
  const wing=(sg)=>{ let f=''; for(let i=0;i<9;i++){ const tx=sg*(80+i*27), ty=-200+i*30+(i>6?(i-6)*14:0), w=15+i*.5;
      f+=`<path d="M${sg*16} ${-46+i*3} Q${sg*(tx*.5)} ${ty*.55-20} ${tx} ${ty} Q${sg*(tx*.55)} ${ty*.55+w} ${sg*30} ${-26+i*5}Z" fill="${i%2?'#e8a21e':'#d0521c'}" stroke="#7a2412" stroke-width="1.2"/>`; }
    let c=''; for(let i=0;i<5;i++) c+=`<path d="M${sg*(24+i*10)} ${-70+i*14} q${sg*(40+i*8)} ${-60+i*6} ${sg*(90+i*20)} ${-46+i*18} q${sg*-40} 36 ${sg*(-66-i*20)} ${50-i*4}Z" fill="${i%2?'#ffd25e':'#f0b030'}" stroke="#a8561a" stroke-width="1"/>`;
    return f+c; };
  const wl=wing(-1), wr=wing(1);
  const rock=(deg,inner,sg)=>fl?A(`rock:${deg}:1.1:${sg*20}:-46`,inner):inner;
  let tail=''; for(let i=-3;i<=3;i++) tail+=`<path d="M0 90 Q${i*14} 140 ${i*26} 190 Q${i*26+9} 150 ${i*8+8} 92Z" fill="${i%2?'#e8a21e':'#c8321e'}" stroke="#7a2412" stroke-width="1"/>`;
  return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${r1(s)})">`+
    (o.glow===false?'':`<circle r="320" cy="-40" fill="url(#gw)" opacity=".75"/>`)+
    rock(5,wl,-1)+rock(-5,wr,1)+tail+
    `<path d="M-34 -50 Q-44 40 -20 100 Q0 116 20 100 Q44 40 34 -50 Q0 -70 -34 -50Z" fill="#d0521c" stroke="#7a2412" stroke-width="1.5"/>`+
    `<path d="M-22 -40 Q-28 30 -12 86 Q0 94 12 86 Q28 30 22 -40Z" fill="#ffc83c"/>`+
    [0,1,2,3,4].map(i=>`<path d="M-18 ${-26+i*22} q18 12 36 0" stroke="#c8761a" stroke-width="2" fill="none"/>`).join('')+
    `<path d="M-14 98 L-22 140 M-6 100 L-8 146 M10 100 L14 146 M18 98 L28 140" stroke="#f0b030" stroke-width="5" stroke-linecap="round"/>`+
    `<circle cy="-96" r="34" fill="#fbf7ee" stroke="#d8d0c0" stroke-width="1.4"/>`+
    `<path d="M-30 -80 Q0 -60 30 -80 L24 -56 Q0 -44 -24 -56Z" fill="#fffdf6"/>`+
    `<path d="M-8 -98 Q0 -80 8 -98 Q10 -64 0 -50 Q-10 -64 -8 -98Z" fill="#f0a020" stroke="#a8561a" stroke-width="1.2"/>`+
    `<circle cx="-15" cy="-104" r="6.5" fill="#fff"/><circle cx="15" cy="-104" r="6.5" fill="#fff"/><circle cx="-15" cy="-103" r="3.6" fill="#a8180c"/><circle cx="15" cy="-103" r="3.6" fill="#a8180c"/>`+
    `<path d="M-24 -112 L-6 -106 M24 -112 L6 -106" stroke="#b8821a" stroke-width="3" stroke-linecap="round"/>`+
    `<path d="M-24 -122 L-22 -156 L-12 -138 L0 -168 L12 -138 L22 -156 L24 -122Z" fill="url(#gold)" stroke="#a8741a" stroke-width="1.2"/><circle cy="-134" r="5" fill="#d63a2a" stroke="#ffd25e"/></g>`;
}

/* ---------- Marut pieces (marut-49-short-form, Nov 2026) ----------
   windSwirl(x,y,s,{face:'sleep'|'smile'|'cry'|null, col, hi, spin, glow}) = one tiny wind-baby: a pale-blue/silver swirl of three
     turning arms round a soft cloud-and-light puff (no gradients, safe on any shot). s=1 is about 90 px wide. With `face` it gets
     a tiny glowing face (sleep = closed arcs, smile = open eyes + smile, cry = squeezed eyes + open mouth); without it, a plain wind.
   windField(cx,cy,r,s,{layout:'rings'|'grid', n:49, delay, step, face, squash, col, spin}) = n swirls (49 = 1+8+16+24 rings, or a 7x7 grid) that
     appear one by one (`step` s apart from `delay`). r = radius of the outer ring (or half-width of the grid), squash = y/x ratio. */
function windSwirl(x,y,s,o){ o=o||{}; const c=o.col||'#bfe0ff', w=o.hi||'#ffffff', f=o.face||null, g=o.glow===undefined?1:o.glow,
  sp=o.spin||(3+(((x*7+y*3)|0)%11)/6);
  const arm=(rot,sw,op)=>`<path transform="rotate(${rot})" d="M2 -2 C14 -10 30 -4 32 12 C34 30 12 40 -8 36 C-34 30 -42 4 -32 -16 C-20 -40 14 -48 40 -32" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" opacity="${op}"/>`;
  let face='';
  if(f==='sleep') face=`<path d="M-8 -2 q3 3 6 0 M2 -2 q3 3 6 0" stroke="#5a6a8a" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M-3 6 q3 2 6 0" stroke="#d98a8a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  else if(f==='smile') face=`<circle cx="-6" cy="-2" r="2.4" fill="#33466a"/><circle cx="6" cy="-2" r="2.4" fill="#33466a"/><circle cx="-5.4" cy="-2.8" r=".8" fill="#fff"/><circle cx="6.6" cy="-2.8" r=".8" fill="#fff"/><path d="M-5 5 q5 5 10 0" stroke="#d96a7a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  else if(f==='cry') face=`<path d="M-9 -3 l5 2 M9 -3 l-5 2" stroke="#5a6a8a" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="0" cy="6" rx="3.4" ry="4" fill="#9a4a60"/>`;
  const puff=f?`<circle r="17" fill="#eef7ff"/><circle cx="-11" cy="6" r="9" fill="#e4f1ff"/><circle cx="11" cy="6" r="9" fill="#e4f1ff"/><circle cx="-8" cy="-9" r="7" fill="#fff" opacity=".8"/>`+
    `<circle cx="-9" cy="3" r="3" fill="#ffb3c0" opacity=".45"/><circle cx="9" cy="3" r="3" fill="#ffb3c0" opacity=".45"/>`+face
    :`<circle r="5" fill="${w}" opacity=".9"/>`;
  return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${r1(s)})">`+
    (g?`<circle r="52" fill="${c}" opacity=".10"/><circle r="36" fill="${w}" opacity=".14"/>`:'')+
    A(`spin:${sp.toFixed(2)}:0:0`, arm(0,6,.9)+arm(120,5,.75)+arm(240,4,.6))+puff+`</g>`; }
function windField(cx,cy,r,s,o){ o=Object.assign({layout:'rings',n:49,delay:0,step:.05,squash:1},o||{}); const pts=[];
  if(o.layout==='grid'){ const gap=(2*r)/6; for(let j=0;j<7;j++) for(let i=0;i<7;i++) pts.push([cx-r+i*gap, cy-r*o.squash+j*gap*o.squash]); }
  else { pts.push([cx,cy]); [[8,.34],[16,.67],[24,1]].forEach(([k,f])=>{ for(let i=0;i<k;i++){ const a=i/k*Math.PI*2+(k===16?.2:0); pts.push([cx+Math.cos(a)*r*f, cy+Math.sin(a)*r*f*o.squash]); } }); }
  return pts.slice(0,o.n).map((p,i)=>A(`fadein:${(o.delay+i*o.step).toFixed(2)}:.35`, o.dot?windDot(p[0],p[1],s,o.dot):windSwirl(p[0],p[1],s,{face:o.face,col:o.col,spin:o.spin?o.spin+(i%5)*.3:undefined}))).join(''); }
/* windDot(x,y,s,col) = one tiny glowing light (the 49 lights before they turn into babies); windField(..., {dot:'#ffe9a0'}) draws dots instead of swirls */
function windDot(x,y,s,col){ col=col||'#ffe9a0'; return `<g transform="translate(${r1(x)} ${r1(y)}) scale(${r1(s)})"><circle r="30" fill="${col}" opacity=".14"/><circle r="17" fill="${col}" opacity=".3"/><circle r="8" fill="${col}" opacity=".85"/><circle r="3.4" fill="#fff"/></g>`; }
