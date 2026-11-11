/* =====================================================================
   SCENES LIBRARY: shared gradients/filters (DEFS) + environment pieces.
   All pieces return SVG strings in a 540x960 (9:16) design space.
   A(spec, svg) wraps a group that the engine animates every frame:
     flick:speed | pulse:speed | bob:amp:speed | spin:period:cx:cy
     rock:deg:speed:cx:cy | pop:delay | rise:dy:dur:delay
     slide:dx:dy:dur:delay | walk:dx:dur:delay | fadeout:at:dur
     orbit:rx:ry:cx:cy:period
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
 <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7da7e"/><stop offset="1" stop-color="#b98428"/></linearGradient>
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
// royal palace interior (warm), pillars + arches + hanging lamps; floor at y
function palace(y,tone){ const w=tone||'#3a1a2c', p='#58283e', g='url(#gold)'; let s=`<rect width="540" height="960" fill="${w}"/><circle cx="270" cy="${y-240}" r="360" fill="url(#saf)" opacity=".35"/>`;
  for(let i=0;i<4;i++){ const x=-20+i*190; s+=`<path d="M${x+20} ${y-90} L${x+20} ${y-420} Q${x+95} ${y-560} ${x+170} ${y-420} L${x+170} ${y-90}Z" fill="#24101c" opacity=".75"/>`; }
  for(let i=0;i<5;i++){ const x=-10+i*137; s+=`<rect x="${x-14}" y="${y-470}" width="28" height="${470}" fill="${p}"/><rect x="${x-20}" y="${y-480}" width="40" height="14" fill="${g}"/><rect x="${x-20}" y="${y-14}" width="40" height="14" fill="${g}"/><rect x="${x-14}" y="${y-470}" width="8" height="456" fill="#000" opacity=".18"/>`; }
  s+=`<rect y="${y-500}" width="540" height="22" fill="${g}" opacity=".85"/>`;
  [135,405].forEach(x=>{ s+=`<line x1="${x}" y1="${y-478}" x2="${x}" y2="${y-400}" stroke="#c99a3a" stroke-width="1.5"/>`+A('flick:'+(4+rnd()*3).toFixed(2),`<circle cx="${x}" cy="${y-392}" r="34" fill="url(#saf)"/>`)+`<path d="M${x-10} ${y-400} L${x+10} ${y-400} L${x} ${y-386}Z" fill="${g}"/>`; });
  s+=`<path d="M0 ${y} L540 ${y} L540 960 L0 960Z" fill="#1e0c16"/>`;
  for(let i=0;i<8;i++) s+=`<line x1="${270+(i-3.5)*40}" y1="${y}" x2="${270+(i-3.5)*160}" y2="960" stroke="#3a1a2a" stroke-width="2"/>`;
  return s+`<rect y="${y}" width="540" height="6" fill="${g}" opacity=".6"/>`; }
// palm-leaf manuscript (pothi), centred at x,y
function pothi(x,y,s){ let l=''; for(let i=0;i<6;i++) l+=`<line x1="${-150}" y1="${-22+i*9}" x2="${150}" y2="${-22+i*9}" stroke="#7a5228" stroke-width="1.6" opacity=".55" stroke-dasharray="${8+i*3} 5"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-176" y="-44" width="352" height="88" rx="10" fill="#4a2c18"/><rect x="-168" y="-38" width="336" height="76" rx="8" fill="#e8cf96"/><rect x="-168" y="-38" width="336" height="76" rx="8" fill="url(#paper)" opacity=".2"/>${l}`+
    `<circle cx="-110" cy="0" r="5" fill="#4a2c18"/><circle cx="110" cy="0" r="5" fill="#4a2c18"/><path d="M-110 0 C-140 60 -100 90 -60 70" stroke="#b8202a" stroke-width="2.5" fill="none"/></g>`; }
// parchment panel for verses: returns svg; put text lines with verse()
function parchment(x,y,w,h){ return A('rise:30:0.8:0.2',`<g><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="14" fill="#ead6a4"/><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="14" fill="none" stroke="#a8742c" stroke-width="3"/>`+
  `<rect x="${x-w/2+10}" y="${y-h/2+10}" width="${w-20}" height="${h-20}" rx="10" fill="none" stroke="#a8742c" stroke-width="1.2" stroke-dasharray="2 5"/><rect x="${x-w/2-8}" y="${y-h/2-12}" width="${w+16}" height="20" rx="10" fill="#8a5a28"/><rect x="${x-w/2-8}" y="${y+h/2-8}" width="${w+16}" height="20" rx="10" fill="#8a5a28"/></g>`); }
// verse lines (Tiro font), each line fades in after the previous
function verse(x,y,lines,size,col,delay,gap){ return lines.map((t,i)=>A(`pop:${((delay||0.8)+i*(gap||1.4)).toFixed(2)}`,`<text x="${x}" y="${y+i*size*1.55}" text-anchor="middle" font-size="${size}" fill="${col||'#5a2a0a'}" style="font-family:'Tiro',serif;font-weight:400">${t}</text>`)).join(''); }
