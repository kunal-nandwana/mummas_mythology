/* =====================================================================
   WIDE: 16:9 pieces for long videos (VIDEO({format:'long'}) = 960x540 design space).
   Everything returns SVG strings, like scenes.js. Own gradients get unique ids, so they are safe in every shot.
   Layered scenes return {sky,far,mid,near} (each a function) for the parallax shot fields:  {...mahendra(), cast:[..]}
   ===================================================================== */
let _wgN=0;
const _wgrad=(x1,y1,x2,y2,stops)=>{ const id='wg'+(_wgN++); return {id, def:`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">`+stops.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}"${a!==undefined?` stop-opacity="${a}"`:''}/>`).join('')+`</linearGradient>`}; };
/* full-bleed vertical sky: wsky([[0,'#2b2f6e'],[1,'#ffe3a0']]) */
function wsky(stops){ const g=_wgrad(0,0,0,1,stops); return `<defs>${g.def}</defs><rect x="-160" y="-100" width="1280" height="760" fill="url(#${g.id})"/>`; }
/* soft round light */
function wglow(x,y,r,col,op){ const id='wr'+(_wgN++); return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op===undefined?.9:op}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`; }
/* a band that fades top and bottom (mist, fog) */
function wmist(y,h,col,op){ const g=_wgrad(0,0,0,1,[[0,col,0],[.5,col,op===undefined?.35:op],[1,col,0]]); return `<defs>${g.def}</defs><rect x="-160" y="${y}" width="1280" height="${h}" fill="url(#${g.id})"/>`; }
/* mountain ridge across the whole width */
function wridge(y,amp,col,step,line){ let d=`M-160 ${y+amp+300} L-160 ${y}`, x=-160; while(x<1120){ const w=step*(.7+rnd()*.7), px=x+w/2, py=y-amp*(.4+rnd()*.6); d+=` Q${r1(px)} ${r1(py*1.0-amp*.25)} ${r1(x+w)} ${r1(y-amp*rnd()*.3)}`; x+=w; }
  return `<path d="${d} L1120 ${y+amp+300}Z" fill="${col}"/>`+(line?`<path d="${d.replace(/^M-160 [\d.]+ L-160/,'M-160')}" fill="none" stroke="${line}" stroke-width="2" opacity=".55"/>`:''); }
function wstars(n,h,col){ let s=''; for(let i=0;i<n;i++) s+=A('flick:'+(1+rnd()*2).toFixed(2),`<circle cx="${r1(rnd()*980-10)}" cy="${r1(rnd()*h)}" r="${rnd()<.14?1.7:.9}" fill="${col||'#fff4dc'}"/>`); return s; }
/* soft drifting clouds. wclouds(y, col, n, period) */
function wclouds(y,col,n,period,op){ let s=''; for(let i=0;i<n;i++){ const cy=y+(rnd()-.5)*70, w=120+rnd()*160, cx=-60+i*(1060/n); 
  s+=A(`drift:${(150+rnd()*120).toFixed(0)}:0:${(period||38)+i*3}`,`<g fill="${col}" opacity="${op||.5}"><ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(w)}" ry="${r1(w*.12)}"/><ellipse cx="${r1(cx+w*.3)}" cy="${r1(cy-w*.08)}" rx="${r1(w*.55)}" ry="${r1(w*.12)}"/><ellipse cx="${r1(cx-w*.35)}" cy="${r1(cy+w*.06)}" rx="${r1(w*.5)}" ry="${r1(w*.09)}"/></g>`); } return s; }
/* slow cinematic light shafts from a point; col = light colour */
function lightShafts(x,y,col,n,len,op){ let s=''; n=n||7; for(let i=0;i<n;i++){ const a=-40+i*(80/(n-1)), w=18+((i*37)%24); s+=`<path d="M0 0 L${-w} ${len||700} L${w*1.6} ${len||700}Z" transform="rotate(${a})" fill="${col}" opacity="${((op||.09)*(.6+((i*53)%40)/100)).toFixed(3)}"/>`; }
  return A('rock:6:.35:'+x+':'+y,`<g transform="translate(${x} ${y})" style="mix-blend-mode:screen">${s}</g>`); }
/* rotating mandala */
function wmandala(cx,cy,r,col,petals,period){ petals=petals||12; let p=''; for(let i=0;i<petals;i++){ const a=i*360/petals; p+=`<path d="M0 ${-r*.34} Q${r*.13} ${-r*.66} 0 ${-r} Q${-r*.13} ${-r*.66} 0 ${-r*.34}Z" transform="rotate(${a})" fill="none" stroke="${col}" stroke-width="1.4" opacity=".8"/><circle cy="${-r*1.04}" r="2.2" fill="${col}" transform="rotate(${a})"/>`; }
  return A(`spin:${period||60}:${cx}:${cy}`,`<g transform="translate(${cx} ${cy})"><circle r="${r*.3}" fill="none" stroke="${col}" stroke-width="1.2" opacity=".7"/><circle r="${r*1.1}" fill="none" stroke="${col}" stroke-width="1" opacity=".5" stroke-dasharray="3 7"/>${p}</g>`); }
/* ghost crowns lifting into light (gentle: the kings' rule ending, no violence) */
function crownsRise(x1,x2,y,n){ let s=''; for(let i=0;i<n;i++){ const x=x1+(x2-x1)*(i/(Math.max(1,n-1)))+(rnd()-.5)*30, k=.7+rnd()*.5;
  s+=A(`drift:0:-150:${(5+rnd()*3).toFixed(1)}`,`<g transform="translate(${r1(x)} ${r1(y)}) scale(${k.toFixed(2)})"><path d="M-14 0 L-12 -16 L-5 -8 L0 -20 L5 -8 L12 -16 L14 0Z" fill="url(#gold)" opacity=".85"/><circle cy="-6" r="2" fill="#ff7a6a"/></g>`); } return s; }
function wsparks(x1,x2,y1,y2,n,col){ let s=''; for(let i=0;i<n;i++) s+=A(`drift:${((rnd()-.5)*40).toFixed(0)}:${-(40+rnd()*60).toFixed(0)}:${(4+rnd()*4).toFixed(1)}`,`<circle cx="${r1(x1+rnd()*(x2-x1))}" cy="${r1(y1+rnd()*(y2-y1))}" r="${(1+rnd()*1.8).toFixed(1)}" fill="${col||'#ffe2a0'}"/>`); return s; }
function wtufts(y,col,n){ let s=''; for(let i=0;i<n;i++){ const x=rnd()*1000-20, yy=y+rnd()*60, h=6+rnd()*12; s+=`<path d="M${r1(x)} ${r1(yy)} l-3 -${r1(h)} M${r1(x)} ${r1(yy)} l0 -${r1(h*1.2)} M${r1(x)} ${r1(yy)} l3 -${r1(h)}" stroke="${col}" stroke-width="1.5" fill="none"/>`; } return s; }
const _tiro=`style="font-family:'Tiro','Mukta',serif;font-weight:400"`;

/* ---------- CHAPTER CARD (chapter:{no,name}) : 0.8 s fade in, hold, 0.8 s fade out; the picture behind dissolves via tr:'dissolve' ---------- */
function chapterCard(W,H,ch,dur){ const num=['०','१','२','३','४','५','६','७','८','९'], no=String(ch.no).split('').map(d=>num[+d]).join(''), cx=W/2, out=Math.max(1,dur-.8);
  let name=ch.name, l1=name, l2=''; if(name.length>26){ const mid=name.length/2; let best=-1; for(let i=0;i<name.length;i++) if(name[i]===' ' && (best<0||Math.abs(i-mid)<Math.abs(best-mid))) best=i; if(best>0){ l1=name.slice(0,best); l2=name.slice(best+1); } }
  const g=_wgrad(0,0,0,1,[[0,'#0c0a2a'],[.55,'#2a1650'],[1,'#5a2a42']]);
  const body=`<g transform="translate(${cx} 0)">`+
    `<text y="${H*.27}" text-anchor="middle" font-size="22" fill="#f1c04e" style="font-weight:800">अध्याय</text>`+
    A('rise:16:1.3:.15',`<text y="${H*.5}" text-anchor="middle" font-size="150" fill="url(#gold)" ${_tiro}>${no}</text>`)+
    A('draw:.6:1.0',`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M-210 ${H*.56} L210 ${H*.56}" stroke="#f1c04e" stroke-width="2.4" fill="none"/>`)+
    `<path d="M-6 ${H*.56} L0 ${H*.56-6} L6 ${H*.56} L0 ${H*.56+6}Z" fill="#f1c04e"/>`+
    A('rise:12:1.2:.5',`<text y="${H*(l2?.665:.7)}" text-anchor="middle" font-size="${l2?38:44}" fill="#fff0cc" ${_tiro}>${l1}</text>`+(l2?`<text y="${H*.765}" text-anchor="middle" font-size="38" fill="#fff0cc" ${_tiro}>${l2}</text>`:''))+`</g>`;
  return `<defs>${g.def}</defs><rect width="${W}" height="${H}" fill="url(#${g.id})"/>`+wglow(cx,H*.46,330,'#ffb45a',.38)+wmandala(cx,H*.46,235,'#f1c04e',16,90)+wmandala(cx,H*.46,150,'#ffd98a',10,-60)+wstars(40,H,'#ffe9b8')+wsparks(100,860,260,500,14)+
    A('fadein:0:.8',A('fadeout:'+out.toFixed(2)+':.8',body)); }

/* ---------- SCRIPTURE LOWER-THIRD (top-left plate, glowing palm leaf). Put in `front`. wlower('वाल्मीकि रामायण','बालकांड · सर्ग 15',{at:.8,hold:4.5}) ---------- */
function wlower(title,sub,o){ o=Object.assign({at:.8,hold:4.6,x:34,y:30,w:380},o||{}); const g=_wgrad(0,0,1,0,[[0,'#2a1608',.94],[1,'#4a2c10',.82]]);
  return A(`slide:-460:0:.75:${o.at}`,A(`fadeout:${(o.at+o.hold).toFixed(2)}:.7`,`<g transform="translate(${o.x} ${o.y})"><defs>${g.def}</defs>`+
    `<rect width="${o.w}" height="${sub?78:56}" rx="10" fill="url(#${g.id})" stroke="#e8b83a" stroke-width="2"/><rect x="5" y="5" width="${o.w-10}" height="${(sub?78:56)-10}" rx="7" fill="none" stroke="#e8b83a" stroke-opacity=".35"/>`+
    `<g transform="translate(34 ${sub?39:28})">${A('flick:7','<circle r="24" fill="url(#saf)"/>')}<path d="M-9 8 Q0 17 9 8 L6 3 L-6 3Z" fill="#c8742a"/><path d="M1 3 Q6 -8 0 -16 Q-4 -8 1 3Z" fill="#ffd27a"/></g>`+
    `<text x="66" y="${sub?36:36}" font-size="25" fill="#ffe7a8" ${_tiro}>${title}</text>`+(sub?`<text x="66" y="62" font-size="17" fill="#f1dcb0" style="font-weight:500">${sub}</text>`:'')+`</g>`)); }

/* ---------- avatar montage: Matsya, Narasimha, Parshuram, Ram as glowing medallions ---------- */
function _emblem(k){ switch(k){
  case 0: return `<path d="M-38 6 Q-14 -34 22 -8 Q34 0 40 -14 L40 22 Q34 8 22 14 Q-14 40 -38 6Z" fill="#f2b838" stroke="#fff0b0" stroke-width="2"/><path d="M-22 4 Q-8 -14 8 -4" stroke="#b8741c" stroke-width="2" fill="none"/><path d="M-4 -14 Q4 -34 18 -24" fill="#e89a28"/><circle cx="-26" cy="0" r="3.4" fill="#2a1608"/><path d="M-50 30 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0" stroke="#9fe0ff" stroke-width="2.2" fill="none" opacity=".9"/>`;
  case 1: return `<circle r="40" fill="#e8a52a" stroke="#fff0b0" stroke-width="2"/>`+Array.from({length:14},(_,i)=>`<path d="M0 -38 L5 -56 L-5 -56Z" transform="rotate(${i*360/14})" fill="#ffcf5a"/>`).join('')+`<ellipse cy="4" rx="25" ry="28" fill="#f6c870"/><path d="M-17 -12 L-6 -8 M17 -12 L6 -8" stroke="#3a1a08" stroke-width="3" stroke-linecap="round"/><circle cx="-10" cy="-4" r="3" fill="#3a1a08"/><circle cx="10" cy="-4" r="3" fill="#3a1a08"/><path d="M-5 8 L0 3 L5 8 L0 12Z" fill="#a8501c"/><path d="M-12 18 Q0 28 12 18" stroke="#3a1a08" stroke-width="2.4" fill="none"/>`;
  case 2: return `<line x1="-26" y1="38" x2="14" y2="-36" stroke="#8a4a1c" stroke-width="7" stroke-linecap="round"/><path d="M12 -38 C40 -44 56 -12 44 18 C36 2 22 -2 8 2Z" fill="#dfe3ea" stroke="#fff" stroke-width="1.6"/><rect x="-27" y="26" width="9" height="10" fill="url(#gold)" transform="rotate(28 -22 31)"/>`;
  default: return `<path d="M-14 -50 Q36 0 -14 50" stroke="#f1d27a" stroke-width="6" fill="none" stroke-linecap="round"/><line x1="-14" y1="-50" x2="-14" y2="50" stroke="#fff3c4" stroke-width="1.6"/><line x1="-20" y1="0" x2="46" y2="0" stroke="#fff0b0" stroke-width="3"/><path d="M46 0 l-10 -6 v12Z" fill="#fff0b0"/><circle cx="2" cy="0" r="12" fill="none" stroke="#ffd25e" stroke-width="2.4"/>`; } }
function avatarMontage(o){ o=Object.assign({hi:-1,y:230,delay:.4,step:.8,names:['मत्स्य','नृसिंह','परशुराम','राम'],r:76},o||{}); let s='';
  for(let i=0;i<4;i++){ const x=150+i*220, hi=o.hi===i, dim=o.hi>=0&&!hi, d=(o.delay+i*o.step).toFixed(2), id='av'+(_wgN++);
    s+=A(`pop:${d}`,`<g transform="translate(${x} ${o.y})" opacity="${dim?.55:1}"><defs><radialGradient id="${id}"><stop offset="0" stop-color="${hi?'#4a2a70':'#2a1c4e'}"/><stop offset="1" stop-color="#120c2c"/></radialGradient></defs>`+
      (hi?A('pulse:2.4',`<circle r="${o.r+34}" fill="url(#gw)"/>`):`<circle r="${o.r+16}" fill="url(#gw)" opacity=".25"/>`)+
      `<circle r="${o.r}" fill="url(#${id})" stroke="url(#gold)" stroke-width="${hi?5:3}"/><circle r="${o.r-9}" fill="none" stroke="#f1c04e" stroke-opacity=".5" stroke-width="1.2" stroke-dasharray="2 6"/>`+
      A('bob:3:'+(.2+i*.04).toFixed(2),`<g transform="scale(${(o.r/78).toFixed(2)})">${_emblem(i)}</g>`)+
      `<text y="${o.r+42}" text-anchor="middle" font-size="30" fill="${hi?'#ffe7a8':'#f1dcb0'}" ${_tiro}>${o.names[i]}</text></g>`);
    if(i<3) s+=A(`fadein:${(+d+.4).toFixed(2)}:.6`,`<path d="M${x+o.r+14} ${o.y} L${x+220-o.r-14} ${o.y}" stroke="#f1c04e" stroke-width="2" stroke-dasharray="4 6" opacity=".7"/>`); }
  return s; }

/* ---------- split layout: 'पहला तर्क' | 'दूसरा तर्क'. hi: 0 = left lit, 1 = right lit, -1 = both ---------- */
function splitArgs(o){ o=Object.assign({hi:-1,top:44,h:370,delay:.3,left:'पृथ्वी का दान और तपस्या',right:"'विष्णु तत्व' का श्रीराम में समाहित होना"},o||{});
  const panel=(x,w,n,head,sub,col,lit,icon)=>{ const g=_wgrad(0,0,0,1,[[0,col[0],.95],[1,col[1],.95]]);
    return A(`slide:${n?200:-200}:0:.7:${o.delay+n*.25}`,`<g opacity="${lit?1:.38}"><defs>${g.def}</defs><rect x="${x}" y="${o.top}" width="${w}" height="${o.h}" rx="18" fill="url(#${g.id})" stroke="${lit?'#ffd98a':'#9a7a50'}" stroke-width="${lit?3.5:1.8}"/>`+
      (lit?A('pulse:2.2',`<rect x="${x}" y="${o.top}" width="${w}" height="${o.h}" rx="18" fill="none" stroke="#ffe7a8" stroke-width="2" opacity=".6" filter="url(#b4)"/>`):'')+
      `<text x="${x+w/2}" y="${o.top+62}" text-anchor="middle" font-size="44" fill="#ffe7a8" ${_tiro}>${head}</text><path d="M${x+60} ${o.top+82} L${x+w-60} ${o.top+82}" stroke="#f1c04e" stroke-opacity=".7" stroke-width="1.6"/>`+
      `<g transform="translate(${x+w/2} ${o.top+190})">${icon}</g><text x="${x+w/2}" y="${o.top+o.h-34}" text-anchor="middle" font-size="25" fill="#fff0cc" style="font-weight:500">${sub}</text></g>`); };
  const earthI=`<circle r="62" fill="#2a6ab8"/><path d="M-38 -22 Q-20 -46 4 -34 Q-6 -14 -24 -8 Q-34 2 -44 -4Z M12 6 Q34 -6 46 14 Q40 40 18 38 Q6 24 12 6Z" fill="#4eb86a"/><circle r="62" fill="none" stroke="#9fd0ff" stroke-width="2" opacity=".7"/><path d="M-70 -58 q30 -20 60 -14" stroke="#ffd25e" stroke-width="2" fill="none" opacity=".0"/>`+A('bob:4:.3',`<g transform="translate(78 -52)"><circle r="20" fill="url(#gw)"/><path d="M-12 8 q12 -22 24 0 M-8 8 v-10 M8 8 v-10" stroke="#fff0b0" stroke-width="3" fill="none" stroke-linecap="round"/></g>`);
  const vishnuI=`<circle r="64" fill="url(#gw)"/><circle r="30" fill="#fff3c4"/>`+A('spin:9:0:0',`<g>${Array.from({length:12},(_,i)=>`<path d="M0 -40 L4 -50 L-4 -50Z" transform="rotate(${i*30})" fill="#ffd25e"/>`).join('')}</g>`)+`<g transform="translate(94 4)"><path d="M-14 -34 Q30 0 -14 34" stroke="#e8c078" stroke-width="5" fill="none" stroke-linecap="round"/><line x1="-14" y1="-34" x2="-14" y2="34" stroke="#fff3c4" stroke-width="1.4"/></g><path d="M40 0 L70 0" stroke="#ffe7a8" stroke-width="3" stroke-dasharray="3 6"/>`;
  return panel(40,425,0,'पहला तर्क',o.left,['#5a2c18','#2a1410'],o.hi!==1,earthI)+panel(495,425,1,'दूसरा तर्क',o.right,['#1c2a5a','#0e1430'],o.hi!==0,vishnuI); }

/* ---------- horizontal event chain (Chapter 3 timeline). items:[{n:'श्रीराम का जन्म'},...], hi = index to glow, before:true = "इससे पहले" arrow ---------- */
function chainW(items,o){ o=Object.assign({y:215,delay:.4,step:1.1,hi:-1,before:false},o||{}); const n=items.length, gap=(860-0)/(n-1)||0; let s='';
  items.forEach((it,i)=>{ const x=90+(n>1?i*(780/(n-1)):390), d=(o.delay+i*o.step).toFixed(2), hi=o.hi===i;
    if(i>0) s+=A(`draw:${(+d-.45).toFixed(2)}:.5`,`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M${x-780/(n-1)+46} ${o.y} L${x-46} ${o.y}" stroke="#f1c04e" stroke-width="3" fill="none"/>`);
    s+=A(`pop:${d}`,`<g transform="translate(${x} ${o.y})">`+(hi?A('pulse:2.4','<circle r="76" fill="url(#gw)"/>'):'')+`<circle r="40" fill="#241446" stroke="url(#gold)" stroke-width="${hi?5:3}"/><text y="14" text-anchor="middle" font-size="40" fill="#ffe7a8" ${_tiro}>${['१','२','३','४','५','६'][i]}</text>`+
      `<text y="82" text-anchor="middle" font-size="25" fill="#fff0cc" ${_tiro}>${it.n}</text>`+(it.sub?`<text y="110" text-anchor="middle" font-size="17" fill="#f1dcb0" style="font-weight:500">${it.sub}</text>`:'')+`</g>`); });
  if(o.before) s+=A(`pop:${o.delay}`,`<g transform="translate(40 ${o.y-84})"><path d="M0 0 L190 0" stroke="#7fe0ff" stroke-width="3"/><path d="M0 0 L12 -7 M0 0 L12 7" stroke="#7fe0ff" stroke-width="3" stroke-linecap="round"/><text x="100" y="-12" text-anchor="middle" font-size="22" fill="#a8ecff" style="font-weight:800">इससे पहले</text></g>`);
  return s; }

/* ---------- glowing question mark with orbiting lights ---------- */
function wquestion(x,y,s,col){ col=col||'#ffd98a'; return `<g transform="translate(${x} ${y}) scale(${s||1})">`+A('pulse:2',wglow(0,-20,120,col,.35))+A('bob:6:.25',`<text y="40" text-anchor="middle" font-size="150" fill="${col}" ${_tiro} stroke="#3a1a08" stroke-width="3" paint-order="stroke">?</text>`)+
  [0,1,2].map(i=>A(`orbit:90:34:0:-20:${6+i*2}`,`<circle r="3.4" fill="#fff3c4"/>`)).join('')+`</g>`; }

/* ---------- Brahma-loka lotus platform (characters stand on it) ---------- */
function lotusPlatform(x,y,s){ s=s||1; let p='';
  for(let i=0;i<9;i++){ const a=-80+i*20; p+=`<path d="M0 0 C-26 -30 -20 -78 0 -104 C20 -78 26 -30 0 0Z" transform="rotate(${a}) scale(${i%2?.86:1})" fill="${i%2?'#f6a6c6':'#ffd2e0'}" stroke="#fff0f4" stroke-width="2"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">`+A('pulse:2',wglow(0,-30,230,'#ffc0d8',.45))+`<ellipse cx="0" cy="4" rx="190" ry="20" fill="#d86a9a" opacity=".5"/><g transform="translate(0 6) scale(1.5 .5)">${p}</g>`+A('bob:2:.2','<ellipse cx="0" cy="-2" rx="130" ry="11" fill="#ffd98a" opacity=".6"/>')+`</g>`; }

/* ---------- Mahendra Parvat (layered). o:{sunX,sunY,tone:'dawn'|'dusk'|'night', ledge:y} ---------- */
function mahendra(o){ o=Object.assign({sunX:520,sunY:300,tone:'dawn',ledge:432,peak:250,sun:1},o||{}); const T={
    dawn:{sky:[[0,'#2a2f78'],[.32,'#9a5a9a'],[.58,'#f2886a'],[.82,'#ffc272'],[1,'#ffe7ae']], far:['#7a558c','#9a6a92'], mid:'#3a2a44', glow:'#ffd27a'},
    dusk:{sky:[[0,'#1a1a52'],[.4,'#6a3a7a'],[.7,'#e0705a'],[1,'#ffb068']], far:['#4a3a7a','#6a4a84'], mid:'#2c2038', glow:'#ffb068'},
    night:{sky:[[0,'#050824'],[.6,'#18205a'],[1,'#3a2a5a']], far:['#1c2a5e','#2a3470'], mid:'#161a3a', glow:'#9fb4ff'} }[o.tone];
  const dawn=o.tone!=='night';
  return {
    sky:()=>wsky(T.sky)+(dawn?wglow(o.sunX,o.sunY,330,T.glow,.55)+(o.sun?wglow(o.sunX,o.sunY,150,'#fff0c0',.75)+`<circle cx="${o.sunX}" cy="${o.sunY}" r="${58*o.sun}" fill="#fff8de"/>`:''):wstars(70,330)+`<circle cx="760" cy="110" r="38" fill="#f3ecd2"/><circle cx="774" cy="104" r="34" fill="#18205a"/>`)+
      lightShafts(o.sunX,o.sunY,T.glow,9,760,.1)+wclouds(110,dawn?'#ffd2b0':'#4a5a9a',6,40,.5)+(dawn?wbirds(150,5,24,'#3a2a4a'):'')+wclouds(200,dawn?'#ffb28a':'#3a4a8a',5,52,.45),
    far:()=>wridge(o.sunY+60,90,T.far[0],130)+wmist(o.sunY+30,120,'#ffd9b0',.28)+wridge(o.sunY+110,70,T.far[1],100),
    mid:()=>{ const ly=o.ledge; return wridge(ly-60,150,T.mid,200)+
      `<path d="M-160 ${ly+14} Q200 ${ly-8} 480 ${ly+2} T1120 ${ly-4} L1120 700 L-160 700Z" fill="#241a2e"/><path d="M-160 ${ly+14} Q200 ${ly-8} 480 ${ly+2} T1120 ${ly-4}" stroke="${T.glow}" stroke-width="3" fill="none" opacity=".8"/>`+
      [60,880,1010].map((x,i)=>`<g transform="translate(${x} ${ly+10}) scale(${.9+i*.2})"><path d="M0 0 L0 -120" stroke="#1a1220" stroke-width="7"/>${[-96,-70,-44,-18].map((y,k)=>`<path d="M${-34+k*5} ${y+24} L0 ${y-8} L${34-k*5} ${y+24}Z" fill="#17301f"/>`).join('')}</g>`).join(''); },
    near:()=>`<path d="M-160 ${o.ledge+60} Q100 ${o.ledge+20} 260 ${o.ledge+70} T700 ${o.ledge+60} T1120 ${o.ledge+44} L1120 700 L-160 700Z" fill="#150f1e"/>`+wtufts(o.ledge+66,'#20382a',70)+wsparks(0,960,300,500,12,'#ffe2a0')+(dawn?wleaves(7,['#f2c85a','#e89a4a'],-10,280):'')
  }; }

/* ---------- royal court of Mahishmati (gold + maroon + peacock teal) ---------- */
function court(o){ o=Object.assign({floor:420,throne:true,tx:700},o||{});
  const col=(x,h,w)=>`<g><rect x="${x-w/2}" y="${o.floor-h}" width="${w}" height="${h}" fill="#6a1a34"/><rect x="${x-w/2-6}" y="${o.floor-h-14}" width="${w+12}" height="16" fill="url(#gold)"/><rect x="${x-w/2-8}" y="${o.floor-12}" width="${w+16}" height="16" fill="url(#gold)"/><path d="M${x-w/4} ${o.floor-h+14} V${o.floor-12} M${x+w/4} ${o.floor-h+14} V${o.floor-12}" stroke="#e8b83a" stroke-opacity=".5" stroke-width="2"/></g>`;
  return {
    sky:()=>wsky([[0,'#2a0c24'],[.5,'#5a1830'],[1,'#8a3a3a']])+wglow(480,200,420,'#ffb060',.4)+[170,480,790].map(x=>`<path d="M${x-100} ${o.floor} V190 Q${x} 40 ${x+100} 190 V${o.floor}Z" fill="#1a0a22" stroke="#e8b83a" stroke-width="3"/><path d="M${x-80} ${o.floor} V196 Q${x} 74 ${x+80} 196 V${o.floor}Z" fill="#3a1a4a" opacity=".7"/>`).join('')+
      [160,480,800].map((x,i)=>A('bob:3:'+(.15+i*.03),`<g transform="translate(${x} 70)"><line y1="-80" y2="0" stroke="#e8b83a" stroke-width="2"/><path d="M-16 0 h32 l-6 28 h-20Z" fill="url(#gold)"/>${A('flick:8',wglow(0,16,70,'#ffb45a',.85))}</g>`)).join(''),
    far:()=>wmist(260,140,'#ffcf90',.18)+[90,870].map(x=>col(x,260,40)).join(''),
    mid:()=>col(300,330,50)+col(660,330,50)+`<rect x="-160" y="${o.floor}" width="1280" height="200" fill="#3a1226"/><path d="M-160 ${o.floor} H1120" stroke="url(#gold)" stroke-width="4"/>`+
      `<path d="M300 ${o.floor+6} L660 ${o.floor+6} L760 640 L200 640Z" fill="#7a1a2a" opacity=".9"/><path d="M300 ${o.floor+6} L200 640 M660 ${o.floor+6} L760 640" stroke="url(#gold)" stroke-width="3"/>`+
      (o.throne?`<g transform="translate(${o.tx} ${o.floor})"><rect x="-120" y="-16" width="240" height="16" fill="url(#gold)"/><rect x="-100" y="-34" width="200" height="18" fill="#b8841c"/><path d="M-60 -34 V-150 Q0 -190 60 -150 V-34Z" fill="#7a1a34" stroke="url(#gold)" stroke-width="4"/><path d="M-80 -34 V-190 Q0 -270 80 -190 V-34" fill="none" stroke="url(#gold)" stroke-width="7"/>${A('pulse:2.4',wglow(0,-150,150,'#ffd27a',.5))}<circle cy="-216" r="9" fill="#2ec28a"/></g>`:''),
    near:()=>wsparks(0,960,200,520,16,'#ffd98a')+`<rect x="-30" y="0" width="52" height="540" fill="#12060c" opacity=".92"/><rect x="940" y="0" width="52" height="540" fill="#12060c" opacity=".92"/>` }; }

/* ---------- Ayodhya palace skyline at golden dusk; glow = glowing birth light ---------- */
function ayodhya(o){ o=Object.assign({tone:'dusk',x:480,y:380,s:1,glow:false},o||{});
  const dome=(x,y,w,h,c)=>`<g fill="${c}"><rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}"/><path d="M${x-w/2-4} ${y-h} Q${x} ${y-h-w*.9} ${x+w/2+4} ${y-h}Z"/><rect x="${x-1.5}" y="${y-h-w*.9-16}" width="3" height="18"/></g>`;
  const sk=(c,lit)=>{ let s=''; [[-300,70,120],[-210,50,170],[-120,80,140],[0,110,210],[120,80,140],[215,50,170],[300,70,120]].forEach(([dx,w,h],i)=>{ s+=dome(dx,0,w,h,c)+Array.from({length:3},(_,k)=>`<rect x="${dx-w/2+8+k*(w/3.3)}" y="${-h+28+k*0}" width="7" height="12" rx="3" fill="#ffd27a" opacity="${lit}"/>`).join(''); }); return s; };
  return {
    sky:()=>wsky(o.tone==='dawn'?[[0,'#35418a'],[.5,'#f08a7a'],[1,'#ffe0a0']]:[[0,'#16205a'],[.4,'#6a3a82'],[.72,'#f0785a'],[1,'#ffc070']])+wglow(480,330,400,'#ffc070',.45)+wstars(36,200)+wclouds(130,'#ffb48a',5,44,.4),
    far:()=>`<g transform="translate(${o.x} ${o.y}) scale(${o.s})" opacity=".85">${sk('#4a2a62',.5)}</g>`+wmist(o.y-60,100,'#ffc080',.25),
    mid:()=>`<g transform="translate(${o.x} ${o.y+20}) scale(${o.s*1.12})">${sk('#2a1a40',.9)}</g><rect x="-160" y="${o.y+20}" width="1280" height="300" fill="#1a1024"/>`+`<path d="M-160 ${o.y+20} H1120" stroke="#ffb45a" stroke-width="2" opacity=".6"/>`+
      Array.from({length:14},(_,i)=>A('flick:'+(5+i%4),`<g transform="translate(${30+i*70} ${o.y+34})">${wglow(0,-4,26,'#ffb45a',.9)}<path d="M-6 0 Q0 7 6 0 L4 -3 L-4 -3Z" fill="#c8742a"/><path d="M0 -3 Q4 -11 0 -17 Q-3 -11 0 -3Z" fill="#ffe08a"/></g>`)).join(''),
    near:()=>wsparks(0,960,300,520,14,'#ffd27a') }; }

/* the newborn Shri Ram, shown as pure light: swaddled infant on a lotus, halo, rays (no scary detail) */
function infantRam(x,y,s){ s=s||1; return `<g transform="translate(${x} ${y}) scale(${s})">`+A('ripple:3.2:0:-30',`<circle cy="-30" r="150" fill="none" stroke="#ffe7a8" stroke-width="3"/>`)+A('ripple:3.2:0:-30',`<circle cy="-30" r="120" fill="none" stroke="#fff3c4" stroke-width="2"/>`)+A('pulse:2.2',wglow(0,-30,190,'#ffd98a',.8))+
  Array.from({length:12},(_,i)=>`<path d="M0 -30 L6 -150 L-6 -150Z" transform="rotate(${i*30} 0 -30)" fill="#fff0b8" opacity=".25"/>`).join('')+
  `<g transform="translate(0 6)"><path d="M-60 0 C-46 -26 -20 -40 0 -40 C20 -40 46 -26 60 0 C40 12 -40 12 -60 0Z" fill="#f7a8c4"/>`+[-44,-22,0,22,44].map(r=>`<ellipse rx="9" ry="30" transform="translate(${r*1.1} -4) rotate(${r*.9})" fill="#ffd2e0" opacity=".9"/>`).join('')+
  `<path d="M-34 -6 C-30 -34 -10 -48 6 -44 C26 -40 34 -20 30 -6Z" fill="#f4e9d0"/><path d="M-26 -14 Q0 -4 28 -14" stroke="#e8c078" stroke-width="2" fill="none"/><circle cx="10" cy="-52" r="17" fill="#7ab4e6"/><path d="M0 -62 l6 -10 l5 8 l6 -8 l5 10" fill="#ffd25e"/><path d="M8 -52 q3 2 6 0 M16 -52 q3 2 6 0" stroke="#2a1608" stroke-width="1.4" fill="none"/><path d="M12 -45 q4 3 8 0" stroke="#c4586a" stroke-width="1.4" fill="none"/></g></g>`; }

/* ---------- Brahma-loka (pastel pink-gold heaven above the clouds) ---------- */
function brahmaloka(){ return {
  sky:()=>wsky([[0,'#3c2f8a'],[.35,'#a868b8'],[.65,'#f4a6b8'],[1,'#ffe0b0']])+wstars(40,200,'#fff')+wglow(480,260,420,'#fff0d0',.55)+wmandala(480,240,230,'#fff0c0',16,120)+lightShafts(480,40,'#fff0c0',9,700,.09),
  far:()=>wclouds(330,'#ffffff',7,46,.55)+wclouds(380,'#ffd0e0',6,58,.5),
  mid:()=>wclouds(430,'#fff2f6',6,36,.65)+wmist(380,120,'#ffe6f0',.35),
  near:()=>wsparks(0,960,120,520,22,'#fff3c4')+wclouds(500,'#ffe0ec',5,30,.7) }; }

/* ---------- Kshir-sagar (milky ocean, Vishnu's home): calm teal-white-gold ---------- */
function kshir(){ return {
  sky:()=>wsky([[0,'#0c2a5a'],[.5,'#2a6a9a'],[.85,'#9fe0e0'],[1,'#f4f0d8']])+wstars(46,230)+`<circle cx="190" cy="120" r="46" fill="#fff8e2"/>`+wglow(190,120,170,'#e8f4ff',.5)+wglow(700,300,360,'#ffe9a8',.4),
  far:()=>wclouds(290,'#ffffff',5,50,.4)+`<path d="M-160 330 H1120 V700 H-160Z" fill="#cfeff0"/>`+wmist(320,120,'#ffffff',.35),
  mid:()=>{ let w=''; for(let i=0;i<7;i++){ const y=350+i*26; w+=A(`drift:${i%2?90:-90}:0:${14+i*2}`,`<path d="M-100 ${y} q60 -16 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0" stroke="#ffffff" stroke-opacity="${.55-i*.05}" stroke-width="3" fill="none"/>`); }
    return `<path d="M-160 346 H1120 V700 H-160Z" fill="#a8dce0" opacity=".8"/>`+w+`<g transform="translate(610 360)" opacity=".92">`+Array.from({length:5},(_,i)=>`<path d="M${-120+i*60} 10 q${30} -80 ${60} -4" stroke="#e8f6ff" stroke-width="22" fill="none" stroke-linecap="round" opacity="${.5+i*.08}"/>`).join('')+`</g>`; },
  near:()=>wsparks(0,960,200,520,18,'#fffbe0') }; }

/* ---------- Cosmos (stars + giant slow wheel) ---------- */
function cosmos(o){ o=Object.assign({col:'#f1c04e'},o||{}); return {
  sky:()=>wsky([[0,'#04051a'],[.6,'#150e44'],[1,'#2a1a52']])+wglow(250,160,300,'#6a3aa8',.4)+wglow(760,360,340,'#1f8aa0',.32)+wstars(110,540),
  far:()=>wmandala(480,270,300,o.col,24,150)+wmandala(480,270,200,'#ffe7a8',12,-90),
  mid:()=>wmandala(480,270,110,'#fff3c4',8,50)+A('pulse:2.4',wglow(480,270,110,'#ffd98a',.7)),
  near:()=>wsparks(0,960,100,520,26,'#fff0c0') }; }

/* road to Mithila: soft afternoon gold, trees, banners */
function mithilaRoad(){ const tree=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-70" width="12" height="70" fill="#4a2a1a"/><circle cx="-26" cy="-96" r="34" fill="#4a8a3a"/><circle cx="22" cy="-100" r="38" fill="#5a9a42"/><circle cx="-2" cy="-130" r="34" fill="#68a84a"/></g>`;
  return { sky:()=>wsky([[0,'#5aa0d8'],[.55,'#f6d6a0'],[1,'#ffe8b8']])+wglow(220,150,300,'#fff0c0',.6)+wclouds(100,'#ffffff',6,44,.7),
  far:()=>wridge(330,70,'#8fb88a',150)+wmist(320,80,'#fff0d0',.4)+[120,300,520,740,900].map((x,i)=>tree(x,352,.5)).join(''),
  mid:()=>`<path d="M-160 400 Q300 380 1120 396 V700 H-160Z" fill="#b6935a"/><path d="M-160 400 Q300 380 1120 396" stroke="#e8c070" stroke-width="3" fill="none"/>`+[60,880].map(x=>tree(x,404,1)).join('')+[330,640].map((x,i)=>`<g transform="translate(${x} 404)"><line y1="0" y2="-120" stroke="#6a3a1a" stroke-width="4"/><path d="M0 -120 L56 -108 L0 -92Z" fill="${i?'#e8882a':'#d8403a'}"/></g>`).join(''),
  near:()=>wsparks(0,960,300,520,12,'#fff0c0')+wtufts(470,'#4a7a3a',60) }; }

/* ---------- ambient life pieces ---------- */
/* flock of birds crossing the sky: wbirds(y, n, period, col) */
function wbirds(y,n,period,col){ let s=''; for(let i=0;i<n;i++){ const x=-80+i*60, yy=y+(i%3)*22-(i%2)*14, k=.7+(i%3)*.25;
  s+=A(`drift:1200:${-(20+i*6)}:${((period||18)+i*.9).toFixed(1)}`,A(`bob:4:${(.5+i*.08).toFixed(2)}`,`<g transform="translate(${x} ${yy}) scale(${k})" fill="none" stroke="${col||'#2a1a3a'}" stroke-width="2.4" stroke-linecap="round"><path d="M-12 -3 Q-6 -10 0 0 Q6 -10 12 -3"/></g>`)); } return s; }
/* falling leaves / petals: wleaves(n, colours[], y1, y2) */
function wleaves(n,cols,y1,y2){ cols=cols||['#e8a23a','#c8642a','#8aa83a']; let s=''; for(let i=0;i<n;i++){ const x=rnd()*1000-20, y=(y1===undefined?-10:y1)+rnd()*((y2||300)-(y1===undefined?-10:y1));
  s+=A(`drift:${(60+rnd()*90).toFixed(0)}:${(150+rnd()*100).toFixed(0)}:${(6+rnd()*5).toFixed(1)}`,A(`rock:${(30+rnd()*40).toFixed(0)}:${(.8+rnd()).toFixed(2)}:${r1(x)}:${r1(y)}`,`<path d="M${r1(x)} ${r1(y)} q5 -8 10 0 q-5 8 -10 0Z" fill="${cols[i%cols.length]}" opacity=".9"/>`)); } return s; }
/* a hanging banner / flag that waves: wflag(x,y,h,col) */
function wflag(x,y,h,col){ return `<g transform="translate(${x} ${y})"><line y1="0" y2="${-h}" stroke="#3a2418" stroke-width="4"/>`+A(`rock:5:1.3:0:${-h}`,`<path d="M0 ${-h} Q26 ${-h-8} 50 ${-h+2} Q30 ${-h+12} 52 ${-h+26} Q26 ${-h+18} 0 ${-h+28}Z" fill="${col||'#e8882a'}"/>`)+`</g>`; }
/* a burning fire / yagna: wfire(x,y,s) */
function wfire(x,y,s){ s=s||1; return `<g transform="translate(${x} ${y}) scale(${s})">`+A('pulse:3',wglow(0,-24,90,'#ff9a3a',.7))+`<path d="M-26 0 L26 0 L20 -8 L-20 -8Z" fill="#3a2418"/>`+
  A('flick:7',`<path d="M-16 -8 Q-20 -34 -6 -48 Q-6 -30 2 -38 Q4 -58 14 -66 Q12 -42 20 -34 Q20 -16 14 -8Z" fill="#ff8a2a"/>`)+A('flick:10',`<path d="M-8 -8 Q-10 -26 0 -36 Q4 -22 8 -30 Q12 -18 8 -8Z" fill="#ffd25e"/>`)+A('drift:6:-60:3',`<circle cy="-50" r="2" fill="#ffd98a"/>`)+A('drift:-8:-70:4',`<circle cy="-46" r="1.8" fill="#ffd98a"/>`)+`</g>`; }
/* forest tree, tall trunk + canopy: wtree(x,y,s,col,trunk) */
function wtree(x,y,s,col,trunk){ return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-9 0 L-6 -150 L6 -150 L9 0Z" fill="${trunk||'#3a2418'}"/><circle cx="-34" cy="-170" r="46" fill="${col}"/><circle cx="30" cy="-176" r="50" fill="${col}"/><circle cx="-2" cy="-214" r="48" fill="${col}"/><circle cx="-60" cy="-140" r="30" fill="${col}"/><circle cx="62" cy="-146" r="32" fill="${col}"/></g>`; }

/* ---------- Tapovan: forest ashram (hut, sacred fire, tall trees, light shafts). o:{tone:'dawn'|'dusk', fireX, hutX} ---------- */
function tapovan(o){ o=Object.assign({tone:'dawn',fireX:700,hutX:190,ground:430},o||{}); const D=o.tone==='dawn';
  const sky=D?[[0,'#1f4a5a'],[.4,'#6aa88a'],[.75,'#f2d98a'],[1,'#ffe9b0']]:[[0,'#1a1a4a'],[.45,'#7a4a6a'],[.8,'#f0905a'],[1,'#ffc070']], tc=D?['#3c7a50','#2a5c3c']:['#4a3a5c','#2c2444'], tr=D?'#1f3a2a':'#1a1428';
  return {
  sky:()=>wsky(sky)+wglow(560,210,380,D?'#fff0b0':'#ffb060',.6)+lightShafts(560,-20,D?'#fff4c0':'#ffc890',9,760,.12)+wclouds(90,D?'#fff4d0':'#ffc0a0',4,48,.35)+wbirds(70,6,20,D?'#1f3a2a':'#2a1a3a'),
  far:()=>wridge(300,60,D?'#6a9a7a':'#6a4a7a',120)+[40,150,280,420,560,690,820,930].map((x,i)=>wtree(x,330+(i%2)*14,.42+(i%3)*.05,tc[i%2],tr)).join('')+wmist(280,110,D?'#e8ffd8':'#ffd0b0',.4),
  mid:()=>{ const g=o.ground; return `<path d="M-160 ${g} Q300 ${g-14} 700 ${g-4} T1120 ${g-8} V700 H-160Z" fill="${D?'#2c4a2a':'#2a2036'}"/><path d="M-160 ${g} Q300 ${g-14} 700 ${g-4} T1120 ${g-8}" stroke="${D?'#8ac86a':'#ffb060'}" stroke-width="2.4" fill="none" opacity=".7"/>`+
    /* hut */ `<g transform="translate(${o.hutX} ${g+2})"><rect x="-70" y="-84" width="140" height="84" fill="#7a5230"/><path d="M-92 -80 L0 -168 L92 -80Z" fill="#b8903a"/><path d="M-80 -86 L0 -160 M-50 -84 L0 -140 M50 -84 L0 -140 M80 -86 L0 -160" stroke="#8a6a24" stroke-width="2.4"/><rect x="-18" y="-60" width="36" height="60" rx="4" fill="#2a1a10"/>${A('pulse:3',wglow(0,-30,40,'#ffb45a',.5))}</g>`+
    wfire(o.fireX,g+14,1.2)+`<g transform="translate(${o.fireX-110} ${g+12})"><rect x="-10" y="-14" width="20" height="14" fill="#5a3a22"/><path d="M-10 -14 q10 -18 20 0" fill="#e8b83a"/></g>`+wtree(30,g+20,1.1,D?'#2f6a42':'#3a3050',tr)+wtree(930,g+20,1.2,D?'#2a5c3c':'#322a48',tr); },
  near:()=>wleaves(14,D?['#e8c23a','#9ac84a','#d8883a']:['#e88a3a','#c8503a'],-10,260)+`<path d="M-160 ${o.ground+70} Q100 ${o.ground+40} 300 ${o.ground+76} T800 ${o.ground+64} T1120 ${o.ground+50} V700 H-160Z" fill="${D?'#142a1c':'#120e1c'}"/>`+wtufts(o.ground+78,D?'#3a7a3a':'#4a3a5a',60)+wsparks(0,960,300,500,12,D?'#fff0a0':'#ffd27a') }; }

/* ---------- Lanka at dusk: golden city on a rock island, crimson sky, black sea. o:{sunX} ---------- */
function lanka(o){ o=Object.assign({sunX:700,sunY:300},o||{});
  const tower=(x,y,w,h,c)=>`<g fill="${c}"><rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}"/><path d="M${x-w/2-5} ${y-h} Q${x} ${y-h-w*1.1} ${x+w/2+5} ${y-h}Z"/><rect x="${x-1.5}" y="${y-h-w*1.1-20}" width="3" height="22"/></g>`;
  const city=(c,lit)=>{ let s=''; [[-330,60,130],[-250,46,190],[-170,70,150],[-80,54,230],[0,100,290],[90,54,220],[170,70,160],[250,46,200],[330,60,130]].forEach(([dx,w,h])=>{ s+=tower(dx,0,w,h,c)+[0,1,2,3].map(k=>`<rect x="${dx-w/2+8+k*(w/4.2)}" y="${-h+30+(k%2)*30}" width="6" height="12" rx="3" fill="#ffd27a" opacity="${lit}"/>`).join(''); }); return s; };
  return {
  sky:()=>wsky([[0,'#2a0a2a'],[.35,'#7a1a3a'],[.7,'#e8643a'],[1,'#ffc060']])+wglow(o.sunX,o.sunY,360,'#ffb060',.6)+`<circle cx="${o.sunX}" cy="${o.sunY}" r="62" fill="#ffe8b0"/>`+lightShafts(o.sunX,o.sunY,'#ffc080',8,700,.1)+wclouds(110,'#ff9a7a',5,44,.4)+wbirds(120,5,22,'#2a0a1a'),
  far:()=>`<path d="M-160 420 Q240 300 480 330 T1120 410 V700 H-160Z" fill="#3a1228"/><g transform="translate(480 372)">${city('#6a2a3a',.45)}</g>`+wmist(330,90,'#ffb080',.3),
  mid:()=>`<g transform="translate(480 400) scale(1.1)">${city('#2a0e22',.9)}</g><rect x="-160" y="398" width="1280" height="300" fill="#12081c"/>`+wglow(480,404,320,'#ffb060',.3)+
    [0,1,2,3].map(i=>A(`drift:${i%2?70:-70}:0:${10+i*2}`,`<path d="M-100 ${420+i*22} q60 -12 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0" stroke="#ff9a5a" stroke-opacity="${.5-i*.09}" stroke-width="2.4" fill="none"/>`)).join('')+`<path d="M-160 442 Q200 428 480 444 T1120 432 V700 H-160Z" fill="#14081e"/><path d="M-160 442 Q200 428 480 444 T1120 432" stroke="#ffb060" stroke-width="2.4" fill="none" opacity=".6"/>`,
  near:()=>`<path d="M-160 540 L-160 470 Q60 440 140 500 L200 540Z M760 540 Q820 480 960 466 L1120 470 V540Z" fill="#0a0410"/>`+wsparks(0,960,200,500,18,'#ffb060') }; }

/* ---------- Tyrant kings' battlefield: smoky red sky, broken forts, torn banners (no gore) ---------- */
function warfield(o){ o=Object.assign({sunX:300},o||{});
  return {
  sky:()=>wsky([[0,'#1a0610'],[.4,'#5a1428'],[.75,'#c8402a'],[1,'#f0a050']])+wglow(o.sunX,330,400,'#ff8a3a',.55)+lightShafts(o.sunX,330,'#ffb070',8,720,.1)+A('drift:90:0:30',wmist(120,120,'#2a0a14',.5))+A('drift:-80:0:36',wmist(200,100,'#3a1018',.45)),
  far:()=>wridge(340,70,'#3a1220',140)+`<g transform="translate(700 350)" fill="#26101c"><rect x="-120" y="-120" width="240" height="120"/>${[-110,-60,-10,40,90].map(x=>`<rect x="${x}" y="-140" width="26" height="22"/>`).join('')}<rect x="-30" y="-190" width="60" height="70"/><rect x="-36" y="-206" width="72" height="18"/></g>`+wmist(330,90,'#e87850',.3),
  mid:()=>`<path d="M-160 430 Q300 410 700 424 T1120 418 V700 H-160Z" fill="#1a0a14"/>`+wflag(120,432,150,'#8a1a22')+wflag(840,430,180,'#8a1a22')+wfire(480,440,1.1)+wfire(280,438,.8)+`<g transform="translate(580 430) rotate(-14)"><line y1="0" y2="-90" stroke="#3a2418" stroke-width="5"/><path d="M0 -90 l20 8 l-20 8Z" fill="#4a1018"/></g>`,
  near:()=>`<path d="M-160 500 Q200 470 500 504 T1120 490 V700 H-160Z" fill="#0c0510"/>`+A('drift:60:-120:7',wsparks(0,960,300,520,14,'#ffa050'))+wsparks(0,960,200,520,16,'#ff9a50') }; }

/* ---------- CHAPTER TAG (shot.chapterTag:{no,name}): small gold plate at the top centre, fades in/out over the RUNNING picture (no separate chapter screen). Screen-space, not affected by camera. ---------- */
function chapterTag(W,H,ch){ const num=['०','१','२','३','४','५','६','७','८','९'], no=String(ch.no).split('').map(d=>num[+d]).join(''), w=Math.min(W-60,120+ch.name.length*14), x0=-w/2;
  return `<g transform="translate(${W/2} 24)"><rect x="${x0}" y="-19" width="${w}" height="38" rx="19" fill="#150b2e" fill-opacity=".74" stroke="#f1c04e" stroke-width="2"/>`+
    `<circle cx="${x0+23}" cy="0" r="14.5" fill="url(#gold)"/><text x="${x0+23}" y="8" text-anchor="middle" font-size="21" fill="#2a1608" ${_tiro}>${no}</text>`+
    `<text x="${x0+46+(w-58)/2}" y="8" text-anchor="middle" font-size="21" fill="#fff0cc" ${_tiro}>${ch.name}</text></g>`; }

/* ---------- LIGHTNING + STORM SKY (Brahma's boon to Ravan): dark violet storm, flashing bolts, golden glow where the god stands ---------- */
function wbolt(x,y1,y2,per,off,col){ let d=`M${x} ${y1}`, cx=x; const n=7; for(let i=0;i<n;i++){ cx+=(rnd()-.5)*64; d+=` L${r1(cx)} ${r1(y1+(y2-y1)*(i+1)/n)}`; }
  const br=`M${r1(x+(cx-x)*.4)} ${r1(y1+(y2-y1)*.4)} l${r1((rnd()-.3)*70)} 70 l${r1((rnd()-.5)*40)} 50`;
  return A(`bolt:${per}:${off}`,`<path d="${d} ${br}" stroke="${col||'#c9b8ff'}" stroke-width="12" fill="none" stroke-linejoin="round" opacity=".45" filter="url(#b4)"/><path d="${d}" stroke="#fff" stroke-width="3.4" fill="none" stroke-linejoin="round"/><path d="${br}" stroke="#f1ecff" stroke-width="2" fill="none"/>`); }
function vardanSky(o){ o=Object.assign({gx:480,gy:250},o||{}); return {
  sky:()=>wsky([[0,'#04020c'],[.45,'#150b34'],[.8,'#2c1450'],[1,'#4a2058']])+wstars(18,160,'#d9ccff')+wglow(480,120,520,'#4a2a8a',.28)+
    A('bolt:6.5:0',`<rect x="-160" y="-100" width="1280" height="760" fill="#cbb8ff" opacity=".5"/>`)+A('bolt:9:3.1',`<rect x="-160" y="-100" width="1280" height="760" fill="#e8dcff" opacity=".42"/>`)+
    wbolt(300,-20,300,6.5,0)+wbolt(700,-20,330,9,3.1)+wbolt(520,-20,230,13,7.2,'#ffd98a'),
  far:()=>wclouds(160,'#1b1038',6,60,.9)+wclouds(250,'#1c0f3a',7,48,.9)+wmist(200,160,'#8a6ad0',.08),
  mid:()=>wglow(o.gx,o.gy,300,'#ffcf6a',.3)+A('pulse:2.2',wglow(o.gx,o.gy,200,'#fff0c0',.35))+wclouds(380,'#22143f',6,34,.88)+lightShafts(o.gx,20,'#ffe7a8',7,620,.06),
  near:()=>wclouds(470,'#1c1034',6,26,.9)+wmist(400,140,'#4a2a80',.22)+wsparks(0,960,160,520,26,'#ffe7a8') }; }
