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
const bolt=(x,y,s,sp)=>A('flick:'+sp,`<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 L-18 70 L2 66 L-26 150 L30 52 L8 56 L26 0Z" fill="#f4f0ff" opacity=".9" style="filter:drop-shadow(0 0 10px #b8a8ff)"/>`);
const stormFlash=()=>A('flick:13',`<rect width="540" height="960" fill="#c8b8ff" opacity=".07"/>`);
/* fire glow on a burning city */
const burning=(x,y,s)=>fire(x,y,s)+A('pulse:3',`<circle cx="${x}" cy="${y-40*s}" r="${90*s}" fill="url(#gr)" opacity=".35"/>`);
/* the chasm that opens in the earth (crack with firelight) */
const chasm=(x,y,t0)=>A(`pop:${t0}`,`<g transform="translate(${x} ${y})">
  <ellipse rx="170" ry="46" fill="url(#gr)" opacity=".8"/><ellipse rx="120" ry="30" fill="#ff7a1c"/><ellipse rx="96" ry="22" fill="#ffd27a"/>
  <path d="M-170 0 L-120 -10 L-150 -22 M170 0 L124 -12 L158 -24 M-60 24 L-80 44 M70 26 L96 46" stroke="#1a0608" stroke-width="5" fill="none"/></g>`)
  +A(`pop:${t0}`,A('pulse:3',`<path d="M${x-40} ${y} L${x-90} -40 L${x+90} -40 L${x+40} ${y}Z" fill="#ffd27a" opacity=".22"/>`));
/* ring of 12 jyotirlingas, the Mahakaleshwar one glows brightest */
const ring12=(cx,cy,r)=>[...Array(12)].map((_,i)=>{ const a=(i/12)*Math.PI*2-Math.PI/2, x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
  return A('pop:'+(0.3+i*.12).toFixed(2),`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="${i===0?46:30}" fill="url(#${i===0?'saf':'gw'})" opacity="${i===0?.9:.5}"/><path d="M-12 12 L-12 -6 Q0 -26 12 -6 L12 12Z" fill="#2b2a31"/><ellipse cy="12" rx="20" ry="5" fill="#8c8884"/></g>`); }).join('');
const jyotiGlow=(cx,cy)=>A('pulse:2',`<circle cx="${cx}" cy="${cy}" r="${190}" fill="url(#gw)" opacity=".45"/>`);


/* ---- new art for Mahakal (nothing here is shared with the Yamraj video) ---- */
/* Wheel of Time (Kaal chakra). per = seconds per turn; fade = when it vanishes (99 = never); cracks glow red */
const kaalChakra=(cx,cy,r,per=30,fade=99)=>{ let t=''; for(let i=0;i<12;i++) t+=`<rect x="-3" y="${-r+6}" width="6" height="${i%3?12:22}" transform="rotate(${i*30})" fill="#d9a73a"/>`;
  const wheel=A(`spin:${per}:${cx}:${cy}`,`<g transform="translate(${cx} ${cy})"><circle r="${r+30}" fill="url(#gr)" opacity=".5"/><circle r="${r}" fill="#160a18" stroke="#a8742a" stroke-width="5"/><circle r="${r-18}" fill="none" stroke="#6a3a2a" stroke-width="2"/>${t}<path d="M0 0 L0 ${-r+40}" stroke="#d9a73a" stroke-width="5" stroke-linecap="round"/><path d="M0 0 L${r*.5} 0" stroke="#d9a73a" stroke-width="7" stroke-linecap="round"/><circle r="9" fill="#d9a73a"/><path d="M${-r*.6} ${-r*.5} L-8 -6 L${r*.3} ${r*.7}" stroke="#ff6a3a" stroke-width="3" fill="none"/></g>`);
  return fade<50 ? A(`fadeout:${fade}:.5`,wheel)+A(`pop:${fade}`,A(`fadeout:${fade+1}:.9`,`<circle cx="${cx}" cy="${cy}" r="${r+90}" fill="url(#gw)"/>`)) : wheel; };
/* glass shards / sand flying outwards (end at their drawn spot, start at the centre) */
const shards=(t0,cx,cy,col)=>[...Array(18)].map((_,i)=>{ const a=i/18*6.283, d=140+(i%3)*80, ex=cx+Math.cos(a)*d, ey=cy+Math.sin(a)*d;
  return A(`slide:${(-Math.cos(a)*d).toFixed(0)}:${(-Math.sin(a)*d).toFixed(0)}:1.3:${t0}`,A(`fadeout:${t0+1.2}:.9`,`<path transform="translate(${ex.toFixed(0)} ${ey.toFixed(0)}) rotate(${i*40})" d="M0 -16 L13 7 L-11 11Z" fill="${col||'#d9a73a'}"/>`)); }).join('');
/* the hourglass of Time: it cracks and bursts when Mahakal appears */
const hourglass=(cx,cy,s,t0)=>A(`fadeout:${t0}:.3`,`<g transform="translate(${cx} ${cy}) scale(${s})"><circle r="200" fill="url(#gr)" opacity=".4"/><rect x="-92" y="-176" width="184" height="16" rx="6" fill="#a8742a"/><rect x="-92" y="160" width="184" height="16" rx="6" fill="#a8742a"/><path d="M-72 -160 L72 -160 Q72 -64 8 0 Q72 64 72 160 L-72 160 Q-72 64 -8 0 Q-72 -64 -72 -160Z" fill="#cfe8ff" opacity=".22" stroke="#e8d9a8" stroke-width="4"/><path d="M-58 -156 L58 -156 Q52 -84 6 -8 L-6 -8 Q-52 -84 -58 -156Z" fill="#e8c46a" opacity=".85"/>${A('flick:3','<rect x="-2" y="0" width="4" height="150" fill="#e8c46a"/>')}<path d="M-64 156 Q0 84 64 156Z" fill="#e8c46a"/><path d="M-20 -150 L10 -90 L-8 -40 L16 10" stroke="#ff6a3a" stroke-width="3" fill="none"/></g>`)
  +A(`pop:${t0}`,A(`fadeout:${t0+1}:.8`,`<circle cx="${cx}" cy="${cy}" r="280" fill="url(#gw)"/>`))+shards(t0,cx,cy,'#cfe8ff')+shards(t0+.1,cx,cy+40,'#e8c46a');
/* birds crossing the dawn sky */
const birds=(y,n,dir,sp)=>[...Array(n)].map((_,i)=>A(`slide:${dir*-640}:${-30-i*5}:${sp+i*1.4}:${(i*.3).toFixed(2)}`,`<g transform="translate(${dir>0?330+i*34:200-i*34} ${y+(i%3)*26})">${A('bob:5:'+(.9+i%3*.2).toFixed(1),`<path d="M-17 0 Q-8 -13 0 0 Q8 -13 17 0" stroke="#12081a" stroke-width="3.4" fill="none" stroke-linecap="round"/>`)}</g>`)).join('');
/* horned asura horde (silhouettes with spears) */
const horde=(y,n,col,s)=>[...Array(n)].map((_,i)=>{ const x=-40+i*70, h=(80+(i*37)%40)*s;
  return A(`bob:3:${(.5+(i%4)*.12).toFixed(2)}`,`<g fill="${col}" transform="translate(${x} ${y})"><rect x="-9" y="${-h}" width="18" height="${h}"/><circle cy="${-h-12}" r="12"/><path d="M-10 ${-h-18} l-12 -22 l18 14Z M10 ${-h-18} l12 -22 l-18 14Z"/><path d="M17 ${-h+10} V${-h-80}" stroke="${col}" stroke-width="3"/><path d="M17 ${-h-80} l-6 -15 l12 0Z"/></g>`); }).join('');
/* black sun with a fiery corona behind the demon */
const darkSun=(x,y,r)=>A('pulse:2',`<circle cx="${x}" cy="${y}" r="${r*2.6}" fill="url(#gr)"/>`)+[...Array(16)].map((_,i)=>`<path d="M${x} ${y} L${x+22} ${y-r*2.2} L${x-22} ${y-r*2.2}Z" transform="rotate(${i*22.5} ${x} ${y})" fill="#ff5a1c" opacity=".14"/>`).join('')+`<circle cx="${x}" cy="${y}" r="${r}" fill="#050204"/><circle cx="${x}" cy="${y}" r="${r+3}" fill="none" stroke="#ff8a3a" stroke-width="4" opacity=".8"/>`;
const smoke=(x,y,h,op)=>A('bob:7:.12',`<path d="M${x-26} ${y} Q${x-70} ${y-h*.4} ${x-34} ${y-h*.7} Q${x} ${y-h} ${x+44} ${y-h*.8} Q${x+12} ${y-h*.5} ${x+32} ${y}Z" fill="#1a0c10" opacity="${op}" filter="url(#b10)"/>`);
/* fire column that erupts from the chasm when Mahakal rises */
const geyser=(x,y,t0)=>A(`pop:${t0}`,A('pulse:4',`<path d="M${x-130} ${y} Q${x-80} ${y-260} ${x-34} ${y-640} Q${x} ${y-720} ${x+34} ${y-640} Q${x+80} ${y-260} ${x+130} ${y}Z" fill="#ff6a1c" opacity=".55"/><path d="M${x-74} ${y} Q${x-44} ${y-260} ${x-12} ${y-560} Q${x} ${y-620} ${x+12} ${y-560} Q${x+44} ${y-260} ${x+74} ${y}Z" fill="#ffd27a" opacity=".6"/>`))
  +A(`pop:${t0}`,A('flick:7',`<circle cx="${x}" cy="${y-120}" r="170" fill="url(#gr)" opacity=".5"/>`));
/* HUNKAR: the roar of Mahakal travels as shock-waves of sound (end at their drawn spot, start at his mouth) */
const roarWaves=(t0,x,y)=>[0,1,2,3,4].map(i=>{ const t=(t0+i*.13).toFixed(2);
  return A(`slide:260:0:.9:${t}`,A(`fadeout:${(+t+.5).toFixed(2)}:.5`,`<path d="M${x-260} ${y-60-i*16} Q${x-260-40-i*10} ${y} ${x-260} ${y+60+i*16}" stroke="#ffb347" stroke-width="${8-i}" fill="none" stroke-linecap="round" style="filter:drop-shadow(0 0 8px #ff6a1c)"/>`)); }).join('');
/* the demon turns to ASH: grey flakes and a few embers drift away */
const ashBurst=(t0,x,y)=>[...Array(40)].map((_,i)=>{ const ox=((i*47)%120)-60, oy=((i*71)%320)-170, ddx=-50+((i*29)%140)-20, ddy=-70-((i*37)%220), r=2+(i%4), t=(t0+(i%5)*.05).toFixed(2);
  return A(`slide:${-ddx}:${-ddy}:${(2.2+(i%4)*.3).toFixed(1)}:${t}`,A(`fadeout:${(+t+1.6).toFixed(2)}:1.3`,`<circle cx="${x+ox+ddx}" cy="${y+oy+ddy}" r="${r}" fill="${i%4?'#d6cfc6':'#ff9a4a'}"/>`)); }).join('')
  +[0,1,2].map(i=>A(`slide:0:0:2.4:${t0}`,A(`fadeout:${t0+1.2}:1.8`,`<circle cx="${x-40+i*50}" cy="${y-60-i*70}" r="${70+i*14}" fill="#9a9288" opacity=".38" filter="url(#b10)"/>`))).join('');
const whiteFlash=(t0,x,y,rx,ry)=>A(`pop:${t0}`,A(`fadeout:${(t0+.12).toFixed(2)}:.45`,`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".95" filter="url(#b10)"/>`));
const fireRing=(t0,x,y)=>[90,150,220,300].map((rr,i)=>A(`pop:${(t0+i*.1).toFixed(2)}`,A(`fadeout:${(t0+.5+i*.1).toFixed(2)}:.8`,`<circle cx="${x}" cy="${y}" r="${rr}" fill="none" stroke="#ff7a1c" stroke-width="${9-i*2}" opacity=".9"/>`))).join('');

/* ---- characters (Mahadev, Dushan and his Asuras live in engine/characters.js) ---- */
const BOY={tilak:true,head:'none',hair:'long'};
const ELDER={tilak:true};                                  // Vedpriya

/* ---- v3 living-world helpers (all loop forever, built on engine A() types drift / ripple / rock / orbit / spin) ---- */
/* clouds sliding slowly across the sky */
const cloudBand=(y,n,col,op,per)=>[...Array(n)].map((_,i)=>A(`drift:240:0:${per+i*7}`,`<g transform="translate(${-80+i*(640/n)} ${y+(i%3)*34})" fill="${col}" opacity="${op}"><ellipse rx="90" ry="20"/><ellipse cx="-50" cy="8" rx="60" ry="16"/><ellipse cx="60" cy="10" rx="64" ry="15"/></g>`)).join('');
/* sparks / embers floating up (x0..x1 across, from y up by h) */
const risingEmbers=(x0,x1,y,n,h,per,col)=>[...Array(n)].map((_,i)=>A(`drift:${((i%5)-2)*16}:${-h}:${(per+(i%4)*.9).toFixed(1)}`,`<circle cx="${x0+((i*67)%(x1-x0))}" cy="${y-(i*29)%40}" r="${1.5+(i%3)}" fill="${col||'#ff9a4a'}" style="filter:drop-shadow(0 0 4px ${col||'#ff6a1c'})"/>`)).join('');
/* soft smoke column curling up */
const risingSmoke=(x,y,n,h,col,op)=>[...Array(n)].map((_,i)=>A(`drift:${20+i*6}:${-h}:${(7+i*1.3).toFixed(1)}`,`<circle cx="${x+(i%3-1)*10}" cy="${y}" r="${16+i*3}" fill="${col}" opacity="${op}" filter="url(#b10)"/>`)).join('');
/* blades of grass swaying in the wind (foreground) */
const grassNear=(y,n,col)=>[...Array(n)].map((_,i)=>{ const x=-20+i*(580/n)+(i%2)*9, h=40+(i*13)%38;
  return A(`rock:${6+i%3*2}:${(1.1+(i%4)*.25).toFixed(2)}:${x}:${y}`,`<path d="M${x-7} ${y} Q${x-3} ${y-h*.6} ${x+2} ${y-h} Q${x+4} ${y-h*.5} ${x+8} ${y}Z" fill="${col}"/>`); }).join('');
/* a flag fluttering on a pole */
const flagWave=(x,y,col,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-1.5" y="-40" width="3" height="46" fill="#3a2418"/>`+A('rock:14:2.4:0:-36',`<path d="M1 -38 Q16 -44 30 -38 Q40 -32 52 -38 L44 -26 Q30 -20 18 -26 Q8 -22 1 -26Z" fill="${col}"/>`)+`</g>`;
/* rings of light / shock-waves that keep growing and fading */
const holyRipple=(cx,cy,r,col,per,n)=>[...Array(n||3)].map((_,i)=>A(`ripple:${(per*(1+i*.23)).toFixed(2)}:${cx}:${cy}`,`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="${4-i*.7}"/>`)).join('');
/* fireflies drifting in loops */
const fireflies=(n,x0,x1,y0,y1)=>[...Array(n)].map((_,i)=>A(`orbit:${16+i%4*8}:${10+i%3*6}:${x0+((i*83)%(x1-x0))}:${y0+((i*59)%(y1-y0))}:${6+i%5*1.7}`,A(`flick:${2+i%3}`,`<circle r="2.6" fill="#fff3a0" style="filter:drop-shadow(0 0 6px #ffe36a)"/>`))).join('');
/* butterflies fluttering over flowers */
const butterflies=(n,x0,x1,y0,y1)=>[...Array(n)].map((_,i)=>A(`orbit:${40+i*18}:${16+i*6}:${x0+((i*97)%(x1-x0))}:${y0+((i*41)%(y1-y0))}:${8+i*2.3}`,A(`flick:${16+i*3}`,`<path d="M0 0 Q-9 -10 -12 -2 Q-8 5 0 1 Q8 5 12 -2 Q9 -10 0 0Z" fill="${['#ffb347','#ff7ab0','#fff0a0'][i%3]}"/>`))).join('');
/* sacred syllable OM floating up from the lingam */
const omRise=(x,y,n,h)=>[...Array(n)].map((_,i)=>A(`drift:${i%2?18:-18}:${-h}:${(5+i*1.1).toFixed(1)}`,`<text x="${x+(i-n/2)*26}" y="${y}" font-family="Tiro,serif" font-size="${26+i%3*8}" fill="#ffe9a8" text-anchor="middle" style="filter:drop-shadow(0 0 8px #ffb347)">ॐ</text>`)).join('');
/* tiny pilgrims walking far away along the road */
const pilgrims=(y,n,col,s)=>[...Array(n)].map((_,i)=>A(`drift:${i%2?-190:190}:0:${14+i*3}`,`<g transform="translate(${i%2?420:60} ${y+(i%3)*5}) scale(${s})" fill="${col}"><circle cy="-30" r="4.5"/><path d="M-5 -24 H5 L7 0 H-7Z"/>${A('bob:1.5:2.2','<rect x="-5" y="0" width="3" height="9"/><rect x="2" y="0" width="3" height="9"/>')}</g>`)).join('');
/* slowly turning sun rays / mandala */
const sunRays=(cx,cy,r,col,per)=>A(`spin:${per}:${cx}:${cy}`,[...Array(12)].map((_,i)=>`<path d="M${cx} ${cy} L${cx+14} ${cy-r} L${cx-14} ${cy-r}Z" transform="rotate(${i*30} ${cx} ${cy})" fill="${col}" opacity=".13"/>`).join(''));
const mandala=(cx,cy,r,per,col)=>A(`spin:${per}:${cx}:${cy}`,`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="2" stroke-dasharray="3 9" opacity=".7"/>`+[...Array(8)].map((_,i)=>`<ellipse cx="${cx}" cy="${cy-r*.7}" rx="${r*.09}" ry="${r*.3}" transform="rotate(${i*45} ${cx} ${cy})" fill="${col}" opacity=".22"/>`).join(''));
/* dust kicked up along the ground by people running */
const dustTrail=(y,n,dir)=>[...Array(n)].map((_,i)=>A(`drift:${dir*70}:-18:${(1.4+i*.2).toFixed(2)}`,`<circle cx="${30+i*(500/n)}" cy="${y-(i%3)*6}" r="${14+i%4*4}" fill="#c9a98a" opacity=".5" filter="url(#b10)"/>`)).join('');
/* rocks thrown up when the earth splits */
const debris=(x,y,t0,n)=>[...Array(n)].map((_,i)=>{ const a=-1.57+((i/(n-1))-.5)*2.2, d=120+(i*47)%160;
  return A(`slide:${(-Math.cos(a)*d).toFixed(0)}:${(-Math.sin(a)*d).toFixed(0)}:1.1:${t0}`,A(`fadeout:${(t0+.9).toFixed(2)}:.7`,`<path transform="translate(${(x+Math.cos(a)*d).toFixed(0)} ${(y+Math.sin(a)*d).toFixed(0)}) rotate(${i*53})" d="M-9 -6 L8 -9 L11 5 L-6 9Z" fill="#3a1a1a"/>`)); }).join('');
/* glowing cracks running out along the ground */
const groundCracks=(x,y,t0)=>A(`pop:${t0}`,[...Array(7)].map((_,i)=>{ const dx=Math.cos(Math.PI*i/6)*(150+(i%3)*50);
  return `<path d="M${x} ${y} l${(dx*.4).toFixed(0)} 4 l${(dx*.3).toFixed(0)} -6 l${(dx*.3).toFixed(0)} 6" stroke="#ff7a1c" stroke-width="3" fill="none" style="filter:drop-shadow(0 0 5px #ff5a1c)"/>`; }).join(''));
/* spear tips swaying in the foreground (a looming army) */
const spearsNear=(y,n)=>[...Array(n)].map((_,i)=>{ const x=20+i*(520/n), top=y-120-(i%3)*30;
  return A(`rock:3:${(.9+i%3*.2).toFixed(1)}:${x}:${y+60}`,`<path d="M${x} ${y+60} V${top}" stroke="#05020a" stroke-width="5"/><path d="M${x} ${top} l-8 -22 h16Z" fill="#05020a"/>`); }).join('');
/* floating sky-lamps rising into the night */
const skyLamps=(n)=>[...Array(n)].map((_,i)=>A(`drift:${(i%2?1:-1)*30}:-420:${(9+i*1.2).toFixed(1)}`,`<g transform="translate(${50+(i*71)%440} ${760-(i*37)%80})"><circle r="26" fill="url(#saf)"/><path d="M-7 0 Q0 7 7 0 L5 -4 L-5 -4Z" fill="#a8582a"/><path d="M1 -4 Q4 -12 0 -17 Q-2 -10 1 -4Z" fill="#ffd27a"/></g>`)).join('');

/* town street (used for several night scenes) */
const townFar=(col)=>smallTemple(60,640,.9,col)+smallTemple(210,650,.7,col)+smallTemple(470,640,1,col);

VIDEO({ look:'mumma',
  title:'महाकाल कहलाने की कथा',
  format:'short',
  target:84,
  keywords:['शिव','महाकाल','उज्जैन','अवंती','वेदप्रिय','दूषण','पार्थिव शिवलिंग','शिव पुराण','काल','ज्योतिर्लिंग','महाकालेश्वर','दक्षिणमुखी','12'],
  sfx:true,
  music:'scenes',
  ending:3.2,
  handheld:.9, captionTop:400, captionChars:24, minShot:2.4, pace:13,
  shots:[
    /* 1: OPENING. Black screen, a third eye snaps open in close-up, we whip back to Mahakal against the cracking wheel of Time */
    {line:'क्या आप जानते हैं कि भगवान शिव को महाकाल क्यों कहा जाता है?',
     scene:'mahakal-question', mood:'anger', fx:'embers', capTop:120, shake:[.5,.9,10],
     cam:{keys:[[0,294,404,3.9],[.45,294,404,4.1],[.62,294,404,3.5,'snap'],[1.7,290,430,2.6],[3.4,270,540,1.2],[5,270,560,1.05]]},
     sky:()=>`<rect width="540" height="960" fill="#05030a"/><rect width="540" height="960" fill="url(#skyDiv)" opacity=".8"/>`+stars(70,520)+stormFlash(),
     far:()=>bolt(70,40,1.5,6)+bolt(470,30,1.3,8)+kaalChakra(270,470,200,9)+A('pulse:1.4',`<circle cx="270" cy="470" r="260" fill="url(#gr)" opacity=".35"/>`)+holyRipple(270,470,200,'#ff5a2a',3.2,3),
     mid:()=>ground(830,'url(#gndW)','#a8432a')+mist(800,.1)+groundCracks(270,835,.7)+risingSmoke(120,830,3,200,'#2a0f1c',.4)+risingSmoke(430,830,3,220,'#2a0f1c',.4),
     near:()=>risingEmbers(20,520,980,16,560,5)+A('drift:140:0:9',`<ellipse cx="60" cy="880" rx="240" ry="44" fill="#ff3a1c" opacity=".12" filter="url(#b24)"/>`),
     cast:[{c:MAHAKAL,x:270,y:830,s:1.5,expr:'angry',thirdAt:.55,acts:[[0,'stand'],[1.6,{a:[40,100],b:[150,10],hand:'fist',handB:'fist',head:12,lean:-4}]],props:{back:'trishul'}}],
     front:()=>A('fadeout:0:.8',`<rect x="-900" y="-900" width="2400" height="3000" fill="#000"/>`)+A('pop:.55',A('fadeout:.6:.7',`<rect x="-900" y="-900" width="2400" height="3000" fill="#ff5a2a" opacity=".45"/>`))+A('flick:12',`<rect x="-900" y="-900" width="2400" height="3000" fill="#ff3a1c" opacity=".05"/>`),
     focus:{at:.55,sound:'kaal',dur:2.6,duck:.35}},
    /* 2: ancient Ujjain / Avanti: a golden sunrise crane-down over the temple city */
    {line:'यह कथा प्राचीन उज्जैन की है, जिसे उस समय अवंती नगरी के नाम से जाना जाता था।',
     scene:'avanti-city', mood:'joy', tr:'glow', fx:'sparks', sfx:[[.3,'bell',.5]], capTop:640,
     cam:{keys:[[0,270,330,1.5],[2.4,290,480,1.25],[5.8,330,640,1.1]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDawn)"/>`+A('pulse:2.4',`<circle cx="270" cy="540" r="300" fill="url(#gw)" opacity=".9"/>`)+sunRays(270,560,720,'#fff0c0',90)+`<circle cx="270" cy="560" r="70" fill="#fff6d0"/>`+cloudBand(170,4,'#f6b890',.4,38)+cloudBand(300,3,'#ffd8b0',.3,52)+birds(250,8,1,11)+birds(330,6,-1,14),
     far:()=>hills(700,14,'#6a4a52',60)+[40,150,235,330,410,500].map((x,i)=>smallTemple(x,735+(i%2)*8,.7+(i%3)*.18,i%2?'#3a2234':'#4a2c3c')).join('')+temple(95,745,.95,'#2e1a2c')+temple(455,750,1.05,'#2e1a2c')+godRays(40)+godRays(300)+risingSmoke(210,742,4,170,'#d8c0b0',.3)+risingSmoke(385,748,4,190,'#d8c0b0',.3),
     mid:()=>`<path d="M0 760 Q270 740 540 764 L540 860 L0 860Z" fill="#e0805a" opacity=".65"/>`+[0,1,2,3,4,5].map(i=>A('flick:'+(1.5+i*.3),`<rect x="${120+i*55}" y="${770+i*10}" width="${60-i*5}" height="4" rx="2" fill="#fff0c0" opacity=".7"/>`)).join('')+pilgrims(815,5,'#2a1822',1.2)+ground(850,'url(#gnd)','#5a4a3a'),
     art:()=>flowers(880,14)+butterflies(3,60,480,780,860),
     near:()=>grassNear(940,18,'#2a3a1c')+risingEmbers(20,520,960,8,300,7,'#ffd27a')},
    /* 3: Vedpriya and his sons make the clay Shivling */
    {line:'वहाँ वेदप्रिय नाम के एक ब्राह्मण अपने पुत्रों के साथ रहते थे, जो प्रतिदिन मिट्टी का पार्थिव शिवलिंग बनाकर भगवान शिव की भक्ति भाव से पूजा किया करते थे।',
     scene:'vedpriya-puja', mood:'hope', tr:'fade', fx:'petals', cam:{keys:[[0,270,700,1.1],[5,330,720,1.3],[10,300,720,1.15]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDawn)"/>`+A('pulse:1.4',`<circle cx="270" cy="360" r="230" fill="url(#gw)" opacity=".45"/>`)+sunRays(270,340,560,'#fff0c0',110)+cloudBand(150,3,'#f0c6a0',.35,46)+birds(280,5,1,12),
     far:()=>hills(660,40,'#6a7f4a',40)+godRays(300)+temple(440,720,.8,'#8a6a56')+risingSmoke(442,700,3,150,'#d8c0b0',.3),
     mid:()=>ground(775,'url(#gnd)','#7a8f5a')+A('rock:5:.8:60:720',peepal(60,720,1.1)),
     art:()=>flowers(790,14)+clayLingam(330,810,1.5,'gw')+holyRipple(330,760,70,'#ffd27a',3.4,2)+omRise(330,760,4,220)+flameDiya(460,830)+flameDiya(200,845)+butterflies(3,120,470,760,840),
     near:()=>grassNear(950,20,'#4a5a28')+fireflies(10,30,510,600,900),
     cast:[
       {c:RISHI,x:120,y:830,s:.88,expr:'serene',with:ELDER,acts:[[0,'kneelOffer'],[2.2,'kneelPray'],[4,'kneelOffer'],[6,'kneelPray'],[8,'kneelBow'],[9.6,'kneelPray']],talk:true,aura:'gw'},
       {c:BRAHMIN,x:215,y:845,s:.72,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[2.5,'kneelOffer'],[5,'kneelBow'],[7,'kneelPray']],aura:'gw'},
       {c:BRAHMIN,x:455,y:845,s:.68,flip:true,expr:'serene',with:BOY,acts:[[0,'kneelOffer'],[2,'kneelPray'],[4.5,'kneelBow'],[6.5,'kneelPray'],[8.5,'kneelOffer']],aura:'gw'}
     ]},
    /* 4: Dushan, horned giant under a black sun, leads his horde into Avanti */
    {line:'एक बार दूषण नाम के एक अहंकारी और क्रूर असुर ने अवंती पर आक्रमण कर दिया। उसका मुख्य उद्देश्य शिव भक्तों की पूजा को बंद करवाना था।',
     scene:'dushan-attacks', mood:'shock', tr:'dip', fx:'embers', capTop:120, shake:[1.3,.7,7],
     cam:{keys:[[0,300,860,1.7],[1.4,300,800,1.5,'snap'],[3.2,300,560,1.15],[6.5,300,540,1.1],[9,300,520,1.2]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyW)"/>`+darkSun(300,360,70)+cloudBand(180,4,'#3a140c',.6,30)+risingEmbers(0,540,500,14,220,6),
     far:()=>townFar('#1a0a14')+burning(60,720,1.2)+burning(480,720,1.3)+risingSmoke(60,700,5,360,'#1a0c10',.5)+risingSmoke(480,700,5,420,'#1a0c10',.5)+horde(740,9,'#12060c',.9),
     mid:()=>ground(790,'url(#gndW)','#a8432a')+dustTrail(788,6,-1)+A('walk:-220:4:0',horde(800,6,'#0a0408',1.1)),
     art:()=>A('pop:1.4',holyRipple(300,812,170,'#ff5a1c',1.8,2)),
     near:()=>spearsNear(960,7)+risingEmbers(20,520,980,12,420,4),
     cast:[
       {c:ASURA,x:90,y:805,s:.85,expr:'angry',props:{front:'sword'},acts:[[0,'carry'],[3.4,'armUp'],[5,'carry']],walk:{from:-200,dur:2,delay:.2}},
       {c:ASURA,x:480,y:810,s:.85,flip:true,expr:'angry',props:{front:'sword'},acts:[[0,'carry'],[4,'armUp'],[5.6,'carry']],walk:{from:200,dur:2,delay:.4}},
       {c:DUSHAN,x:300,y:815,s:1.9,expr:'angry',talk:true,props:{front:'axe'},acts:[[0,'carry'],[2.2,'armUp'],[3.6,'explain'],[5,'rage'],[6.6,'armUp'],[7.6,'accuse']],walk:{from:-60,dur:2.4,delay:0}}
     ],
     focus:{at:1.4,sound:'arrive',dur:2.4,duck:.3}},
    /* 5: terror in the city; people run with the horde behind them */
    {line:'उसके आतंक से पूरे नगर में भय फैल गया और लोग अपनी जान बचाने के लिए भागने लगे।',
     scene:'city-panic', mood:'anger', tr:'whip', fx:'dust', cam:{keys:[[0,400,640,1.1],[5.5,150,640,1.2]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyW)"/>`+stormFlash()+cloudBand(200,4,'#3a140c',.55,26)+birds(300,8,-1,6)+birds(220,6,-1,8),
     far:()=>divine(150,700,'#ff5a1c',1)+townFar('#2a0f1c')+burning(90,720,1.4)+burning(300,730,1.2)+burning(500,720,1.3)+risingSmoke(200,720,5,380,'#1a0c10',.45)+risingEmbers(0,540,720,16,340,4.5),
     mid:()=>ground(790,'url(#gndW)','#a8432a')+dustTrail(808,9,-1)+A('walk:-320:5:0',horde(800,8,'#0a0408',1.15)),
     near:()=>risingEmbers(20,520,990,14,500,4)+A('drift:-260:0:3',`<ellipse cx="500" cy="850" rx="200" ry="36" fill="#c9a98a" opacity=".3" filter="url(#b24)"/>`),
     cast:[
       {c:VILLAGER,x:110,y:820,s:.8,flip:true,expr:'surprise',acts:[[0,'recoil'],[.6,'carry'],[2.4,'lookBack'],[3.4,'carry']],walk:{from:300,dur:4,delay:0}},
       {c:DEVOTEE_F,x:200,y:825,s:.78,flip:true,expr:'sad',tears:true,acts:[[0,'recoil'],[.6,'carry'],[2.8,'weep'],[3.8,'carry']],walk:{from:330,dur:4.2,delay:.2}},
       {c:VILLAGER,x:290,y:830,s:.72,flip:true,expr:'surprise',acts:[[0,'recoil'],[.6,'carry'],[1.8,'lookBack'],[3,'carry']],walk:{from:300,dur:4,delay:.5}},
       {c:RISHI,x:380,y:830,s:.8,flip:true,expr:'sad',acts:[[0,'recoil'],[.6,'carry'],[3,'lookBack'],[4,'carry']],walk:{from:260,dur:4.4,delay:.3}}
     ]},
    /* 6: the army marches on, the sons do not flee */
    {line:'लेकिन चारों तरफ डर का माहौल होने और दूषण की विशाल सेना के आगे बढ़ने के बावजूद, वेदप्रिय के पुत्र वहाँ से भागे नहीं।',
     scene:'sons-stay', mood:'shock', tr:'cut', fx:'dust', cam:{keys:[[0,150,640,1.0],[4,300,700,1.3],[7.5,330,720,1.5]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(60,500)+stormFlash(),
     far:()=>hills(640,40,'#1d1d40',140)+townFar('#1e1a46')+bolt(120,30,1.3,7)+mist(740,.1)+cloudBand(200,3,'#10102a',.6,34)+risingSmoke(60,700,4,300,'#120a18',.4),
     mid:()=>ground(790,'url(#gnd)','#4a3e5a')+A('walk:-260:6:0',horde(790,7,'#06030a',1.0))+flagWave(80,770,'#5a1a3a',1.4)+flagWave(210,775,'#5a1a3a',1.2),
     art:()=>clayLingam(430,812,1.4,'gw')+holyRipple(430,780,60,'#ffd27a',3,2),
     near:()=>spearsNear(960,5)+risingEmbers(20,520,990,10,420,5),
     cast:[
       {c:DUSHAN,x:110,y:805,s:1.75,expr:'angry',props:{front:'axe'},acts:[[0,'carry'],[4,'accuse']],walk:{from:-300,dur:5,delay:0}},
       {c:BRAHMIN,x:310,y:835,s:.75,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3,'kneelBow'],[4.6,'kneelPray']],eyes:'closed',aura:'gw'},
       {c:BRAHMIN,x:240,y:840,s:.7,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3.6,'kneelBow'],[5,'kneelPray']],eyes:'closed',aura:'gw'}
     ]},
    /* 7: fearless, absorbed in worship */
    {line:'वे निडर होकर शिवलिंग के सामने बैठे रहे और महादेव की आराधना में लीन रहे।',
     scene:'fearless-prayer', mood:'hope', tr:'fade', fx:'petals', cam:{keys:[[0,320,720,1.4],[5,330,740,1.9]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyN)"/>`+stars(60,500)+A('pulse:1.6',`<circle cx="420" cy="700" r="260" fill="url(#gw)" opacity=".35"/>`),
     far:()=>hills(640,40,'#1d1d40',140)+townFar('#1e1a46')+mist(740,.1)+cloudBand(220,3,'#232a58',.45,40),
     mid:()=>ground(790,'url(#gnd)','#4a3e5a')+fireflies(8,40,500,680,800),
     art:()=>clayLingam(430,812,1.5,'gw')+holyRipple(430,770,80,'#ffd27a',3.2,3)+omRise(430,760,5,260)+flameDiya(520,835),
     near:()=>grassNear(950,18,'#10162a')+fireflies(10,20,520,560,900),
     cast:[
       {c:BRAHMIN,x:300,y:835,s:.8,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3,'kneelBow'],[4.5,'kneelPray'],[7,'kneelOffer'],[8.5,'kneelPray']],eyes:'closed',aura:'gw'},
       {c:BRAHMIN,x:220,y:840,s:.74,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[4,'kneelBow'],[5.5,'kneelPray']],eyes:'closed',aura:'gw'},
       {c:BRAHMIN,x:150,y:846,s:.68,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3.5,'kneelBow'],[5,'kneelPray'],[7.5,'kneelBow']],eyes:'closed',aura:'gw'}
     ]},
    /* 8: Dushan swings his axe; the earth splits; a column of fire; Mahakal rises from the pit */
    {line:'शिव पुराण के अनुसार, जैसे ही असुर ने उन पर प्रहार करना चाहा, उसी स्थान पर धरती में एक गहरा गड्ढा प्रकट हुआ और उसमें से स्वयं भगवान शिव अपने अत्यंत प्रचंड रूप में प्रकट हुए।',
     scene:'shiva-emerges', mood:'anger', tr:'flash', fx:'sparks', capTop:120,
     cam:{keys:[[0,200,700,1.15],[2.2,160,640,1.25],[2.9,270,800,1.2,'snap'],[4.4,280,620,1.1],[8.5,290,500,1.35]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+divine(290,640,'#ff6a1c',1)+stormFlash(),
     far:()=>hills(640,40,'#2a0f1c',140)+townFar('#2a0f1c')+cloudBand(210,3,'#3a140c',.5,28)+risingEmbers(0,540,720,12,300,5),
     mid:()=>ground(790,'url(#gndW)','#a8432a')+groundCracks(290,806,2.2)+chasm(290,800,2.4)+geyser(290,800,2.6)+A('pop:2.6',risingEmbers(150,430,790,22,640,3.4,'#ffd27a'))+A('pop:2.6',holyRipple(290,800,190,'#ff7a1c',1.5,3)),
     art:()=>clayLingam(480,815,1.2,'gw')+debris(290,780,2.6,12),
     near:()=>A('pop:2.6',risingEmbers(20,520,990,18,700,3))+risingEmbers(20,520,990,8,420,5),
     cast:[
       {c:BRAHMIN,x:430,y:842,s:.62,expr:'serene',with:BOY,acts:[[0,'kneelPray']],eyes:'closed',aura:'gw'},
       {c:DUSHAN,x:90,y:805,s:1.85,expr:'angry',props:{front:'axe'},acts:[[0,'carry'],[1.0,'armUp'],[2.0,{a:[20,70],b:[40,80],lean:-16,head:10,hand:'open'}],[3.5,{a:[10,60],b:[-20,50],lean:-30,drop:18,head:22,hand:'open'}]]},
       {c:MAHAKAL,x:290,y:805,s:1.55,flip:true,expr:'angry',props:{front:'trishul'},acts:[[0,'carry'],[4.6,{a:[150,10],b:[100,40],hand:'fist',handB:'fist',head:12,lean:-4}]],enter:{fade:.7,delay:3.0,rise:280}}
     ],
     shake:[2.4,1.4,12], focus:[{at:2.6,sound:'emerge',dur:2.6,duck:.28}]},
    /* 9: the HUNKAR. Third eye blazes, the roar hits Dushan and he crumbles into ash */
    {line:'महादेव ने पल भर में असुर दूषण का वध कर दिया।',
     scene:'shiva-slays-dushan', mood:'anger', tr:'cut', fx:'embers', capTop:120,
     dur:3.8,
     cam:{keys:[[0,260,620,1.05],[.6,385,430,1.7],[1.0,376,396,2.5,'snap'],[1.7,300,540,1.2,'snap'],[2.4,200,560,1.1],[3.8,230,580,1.05]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyRed)"/>`+divine(270,480,'#ff5a1c',1)+stormFlash(),
     far:()=>hills(640,40,'#2a0f1c',140)+townFar('#2a0f1c')+risingSmoke(70,720,5,360,'#1a0c10',.45)+mist(760,.12)+risingEmbers(0,540,720,14,320,4.5),
     mid:()=>ground(790,'url(#gndW)','#a8432a')+dustTrail(800,7,1),
     art:()=>fireRing(1.85,130,500)+A('pop:1.8',holyRipple(135,790,170,'#fff0d0',1.2,3))+debris(135,790,1.85,10),
     near:()=>risingEmbers(20,520,990,12,500,4),
     cast:[
       {c:MAHAKAL,x:400,y:800,s:1.5,flip:true,expr:'angry',talk:true,props:{front:'trishul'},acts:[[0,'carry'],[1.0,{a:[150,14],b:[120,24],hand:'fist',handB:'fist',head:14,lean:-8}],[3.2,'carry']]},
       {c:DUSHAN,x:120,y:800,s:1.9,expr:'angry',props:{front:'axe'},acts:[[0,'carry'],[.5,'armUp'],[1.5,{a:[20,70],b:[40,80],lean:-14,head:10,hand:'open'}]],exit:{at:1.8,fade:.2}}
     ],
     front:()=>roarWaves(.95,366,414)+whiteFlash(1.8,135,500,170,330)+ashBurst(1.8,135,500),
     shake:[1.8,1.1,13], focus:{at:1.0,sound:'slay',dur:2.8,duck:.22}},
    /* 10: Time itself (the hourglass) bursts before this form: Mahakal */
    {line:"भगवान शिव के इस स्वरूप के आगे स्वयं 'काल' (समय और मृत्यु) भी शक्तिहीन था, इसलिए वे यहाँ महाकाल कहलाए।",
     scene:'mahakal-glory', mood:'divine', tr:'glow', fx:'embers', focus:{at:3.0,sound:'kaal',dur:2.4,duck:.4},
     cam:{keys:[[0,270,720,1.0],[3,270,660,1.15],[6.5,270,560,1.35]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+stars(90,560)+divine(270,500,'#ff9a3c',1),
     far:()=>A('fadeout:3.0:.6',kaalChakra(270,400,280,40))+hourglass(270,400,1.5,3.0)+A('pop:3.0',sunRays(270,400,560,'#ffe9a8',50)+holyRipple(270,400,240,'#ffd27a',2.4,3)),
     mid:()=>ground(800,'url(#gnd)','#9a8aba')+mist(780,.1)+A('pop:3.0',risingEmbers(60,480,800,18,520,4.5,'#ffd27a')),
     near:()=>cloudBand(900,3,'#b8a8d8',.18,30)+risingEmbers(20,520,990,8,420,6,'#ffb347'),
     title:{text:'महाकाल',y:190,size:100,color:'#ffe9a8',delay:3.4},
     cast:[{c:MAHAKAL,x:270,y:800,s:1.5,expr:'angry',props:{front:'trishul'},acts:[[0,'carry'],[1.2,{a:[150,10],hand:'fist',head:12}],[4.2,'carry']],aura:'gr'}]},
    /* 11: devotees ask Mahadev to stay forever */
    {line:'असुर के अंत के बाद, भक्तों ने महादेव से प्रार्थना की कि वे हमेशा के लिए इसी स्थान पर विराजमान हो जाएं।',
     scene:'devotees-plead', mood:'hope', tr:'fade', fx:'petals', cam:{keys:[[0,270,700,1.25],[6,270,660,1.05]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDawn)"/>`+A('pulse:1.6',`<circle cx="270" cy="420" r="240" fill="url(#gw)" opacity=".4"/>`),
     far:()=>hills(660,40,'#6a7f4a',40)+godRays(180)+temple(440,720,.85,'#8a6a56')+risingSmoke(442,700,3,150,'#d8c0b0',.3),
     mid:()=>ground(775,'url(#gnd)','#7a8f5a')+A('rock:5:.8:60:720',peepal(60,720,1.1)),
     art:()=>flowers(790,14)+butterflies(3,100,480,700,820)+holyRipple(300,640,160,'#ffd27a',3.6,2),
     near:()=>grassNear(950,20,'#4a5a28')+risingEmbers(20,520,960,8,300,7,'#ffd27a'),
     cast:[
       {c:SHIVA,x:300,y:790,s:1.3,expr:'smile',acts:[[0,'stand'],[3,'bless'],[5.5,'stand'],[7,'bless']],aura:'gw'},
       {c:RISHI,x:110,y:830,s:.85,expr:'sad',with:ELDER,acts:[[0,'kneelPray'],[2,'kneelOffer'],[3,'kneelBow'],[5,'kneelPray']],aura:'gw'},
       {c:BRAHMIN,x:185,y:840,s:.72,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3.6,'kneelBow'],[5.2,'kneelPray']],aura:'gw'},
       {c:VILLAGER,x:455,y:835,s:.78,flip:true,expr:'sad',acts:[[0,'kneelPray'],[2.6,'kneelBow'],[4.4,'kneelPray']],aura:'gw'},
       {c:DEVOTEE_F,x:510,y:838,s:.72,flip:true,expr:'sad',tears:true,acts:[[0,'kneelPray'],[3.2,'kneelOffer'],[4.8,'kneelPray']],aura:'gw'}
     ]},
    /* 12: Mahadev accepts and becomes the Jyotirlinga of Ujjain */
    {line:'महादेव ने उनकी प्रार्थना स्वीकार की और ज्योतिर्लिंग रूप में वहीं स्थापित हो गए—जिसे आज हम उज्जैन के श्री महाकालेश्वर ज्योतिर्लिंग के रूप में जानते हैं।',
     scene:'jyotirlinga-established', mood:'divine', tr:'glow', fx:'petals', focus:{at:3.0,sound:'revive',dur:3.0,duck:.4},
     cam:{keys:[[0,270,620,1.0],[4,270,640,1.25],[9,270,600,1.4]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+divine(270,520,'#ffe9a8',1)+stars(70,480),
     far:()=>temple(270,760,1.3,'#3a3470')+godRays(200)+A('pop:3.2',mandala(270,560,250,70,'#ffd27a')+mandala(270,560,170,-50,'#fff0c0')),
     mid:()=>ground(800,'url(#gnd)','#9a8aba')+mist(780,.08)+A('pop:3.4',risingEmbers(100,440,800,20,600,4.5,'#ffe9a8')),
     near:()=>A('pop:3.4',holyRipple(270,700,230,'#ffd27a',2.6,3))+risingEmbers(20,520,990,8,420,6,'#ffe9a8'),
     art:()=>A('pop:3.4',A('rise:30:2:3.4',lingam(270,810,1.7,'saf')))+[[110,640],[430,620],[150,500],[400,470]].map(([x,y],i)=>A('flick:'+(2+i*.5),sparkle(x,y,1.3))).join(''),
     cast:[
       {c:SHIVA,x:270,y:790,s:1.3,expr:'smile',acts:[[0,'bless'],[2.5,'namaste']],aura:'gw',exit:{at:3.6,fade:1.2}},
       {c:RISHI,x:90,y:835,s:.8,expr:'serene',with:ELDER,acts:[[0,'kneelPray']],aura:'gw'},
       {c:BRAHMIN,x:455,y:840,s:.72,flip:true,expr:'serene',with:BOY,acts:[[0,'kneelPray']],aura:'gw'}
     ]},
    /* 13: one of the 12, the only south-facing */
    {line:'12 ज्योतिर्लिंगों में से एक, महाकालेश्वर एकमात्र दक्षिणमुखी ज्योतिर्लिंग है।',
     scene:'twelve-jyotirlinga', mood:'divine', tr:'iris', trAt:[270,480], fx:'stars', capTop:150,
     cam:{keys:[[0,270,500,1.0],[5.5,270,470,1.18]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+stars(90,560)+divine(270,480,'#ffd27a',1),
     far:()=>jyotiGlow(270,480)+mandala(270,480,250,90,'#ffd27a')+mandala(270,480,120,-60,'#fff0c0')+ring12(270,480,190)+holyRipple(270,480,215,'#ffd27a',4,3),
     mid:()=>ground(850,'url(#gnd)','#9a8aba')+mist(820,.08)+risingEmbers(40,500,850,14,500,5,'#ffe9a8'),
     art:()=>A('pop:1.8',lingam(270,640,1.3,'saf')),
     title:{text:'12',y:300,size:96,color:'#ffe9a8',delay:.3}},
    /* 14: the King of Ujjain is Baba Mahakal */
    {line:'यही कारण है कि उज्जैन में यह मान्यता प्रचलित है कि यहाँ का राजा कोई इंसान नहीं, बल्कि स्वयं बाबा महाकाल हैं।',
     scene:'raja-mahakal', mood:'divine', tr:'glow', fx:'petals', cam:{keys:[[0,270,620,1.0],[5,270,560,1.25],[8,270,520,1.4]]},
     sky:()=>`<rect width="540" height="960" fill="url(#skyDiv)"/>`+stars(70,480)+divine(270,470,'#ffb347',1),
     far:()=>temple(150,740,1.0,'#3a3470')+temple(400,745,1.1,'#3a3470')+godRays(260)+skyLamps(7),
     mid:()=>ground(800,'url(#gnd)','#9a8aba')+flameDiya(60,880)+flameDiya(480,880)+mist(780,.08),
     art:()=>flowers(830,16)+holyRipple(270,640,170,'#ffd27a',3.4,3)+butterflies(2,100,440,720,830),
     near:()=>grassNear(950,20,'#2a2a5a')+risingEmbers(20,520,960,10,320,6,'#ffd27a'),
     cast:[
       {c:SHIVA,x:270,y:790,s:1.35,expr:'serene',acts:[[0,'stand'],[3,'bless']],props:{front:'trishul'},aura:'gw'},
       {c:RISHI,x:90,y:845,s:.7,expr:'serene',with:ELDER,acts:[[0,'kneelPray'],[3.5,'kneelBow']],aura:'gw'},
       {c:VILLAGER,x:170,y:850,s:.66,expr:'serene',acts:[[0,'kneelPray'],[3.5,'kneelBow']],aura:'gw'},
       {c:DEVOTEE_F,x:400,y:850,s:.66,flip:true,expr:'serene',acts:[[0,'kneelPray'],[3.5,'kneelBow']],aura:'gw'},
       {c:BRAHMIN,x:470,y:846,s:.7,flip:true,expr:'serene',with:BOY,acts:[[0,'kneelPray'],[3.5,'kneelBow']],aura:'gw'}
     ]}
  ]
});
