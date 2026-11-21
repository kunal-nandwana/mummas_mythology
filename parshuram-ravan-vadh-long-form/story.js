/* =====================================================================
   परशुराम और रावण: परशुराम जी ने रावण का वध क्यों नहीं किया?  (16:9 long video, 5 chapters, about 8.5 minutes)
   Lines are the owner's exact words from my-script.md (split between shots only at spaces).
   Helpers only call engine pieces INSIDE functions (the build tool runs this file without the drawing engine).
   ===================================================================== */
const lay = mk => ({ sky:()=>mk().sky(), far:()=>mk().far(), mid:()=>mk().mid(), near:()=>mk().near() });   // layered scene, built lazily
const FY = 432;                                                                                           // feet line for standing characters
const SIL = {skin:'#1c1226', top:'#1c1226', bottom:'#1c1226', shin:'#1c1226', foot:'#1c1226', sash:'#1c1226', ash:false, rudra:false, tilak:false};   // pure silhouette
const PR = o => Object.assign({c:PARSHURAM, y:FY, s:.78, props:{front:'parashu'}, expr:'calm', acts:[[0,'stand']]}, o);
const RV = o => Object.assign({c:RAVAN, y:FY, s:.7, expr:'calm', acts:[[0,'stand']]}, o);
const MAH = o => lay(()=>mahendra(o));
const SCROLL = (a,b,glow,s) => ()=>wsky([[0,a],[1,b]])+wglow(480,270,430,glow,.35)+wmandala(480,270,300,glow,24,160)+wglow(480,250,230,'#ffd98a',.35)+A('bob:5:.2',pothi(480,250,s||1.55))+wsparks(60,900,100,480,22,'#ffe7a8');
/* small round badge with a label (devata / gandharva ...) */
const BADGE = (x,y,label,col,delay) => A(`pop:${delay}`,`<g transform="translate(${x} ${y})">${A('pulse:2.4',wglow(0,0,70,col,.55))}<circle r="36" fill="#241446" stroke="${col}" stroke-width="3"/><circle r="26" fill="${col}" opacity=".35"/><text y="62" text-anchor="middle" font-size="25" fill="#fff0cc" style="font-family:'Tiro','Mukta',serif;font-weight:400">${label}</text></g>`);
const TAG = (x,y,w,text,delay,strikeAt) => A(`pop:${delay}`,`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="-30" width="${w}" height="60" rx="14" fill="#2a1650" stroke="#f1c04e" stroke-width="2.4"/><text y="11" text-anchor="middle" font-size="30" fill="#ffe7a8" style="font-family:'Tiro','Mukta',serif;font-weight:400">${text}</text>`+
  A(`draw:${strikeAt}:.6`,`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M${-w/2+10} 6 L${w/2-10} -4" stroke="#ff9a7a" stroke-width="4" stroke-linecap="round" fill="none"/>`)+`</g>`);
const LEAN_AXE = (x,y) => `<g transform="translate(${x} ${y}) rotate(14)"><line x1="0" y1="0" x2="0" y2="-150" stroke="#6a3a1a" stroke-width="8" stroke-linecap="round"/><path d="M0 -150 C34 -164 60 -128 50 -90 C38 -112 18 -116 0 -112Z" fill="#c9ced6" stroke="#f1f4f8" stroke-width="2"/>${A('pulse:2',wglow(30,-130,50,'#ffd27a',.5))}</g>`;
const VISION = (x,y,r) => `<g transform="translate(${x} ${y})">${A('pulse:2.2',wglow(0,0,r*1.7,'#ffd98a',.5))}<circle r="${r}" fill="#2a1a52" stroke="url(#gold)" stroke-width="4"/><g clip-path="inset(0)">`+
  `<path d="M${-r*.78} ${r*.45} H${r*.78}" stroke="#ffb45a" stroke-width="3"/>`+[[-.45,.5,.26],[0,.9,.34],[.45,.5,.26]].map(([dx,h,w])=>`<g transform="translate(${dx*r} ${r*.45})"><rect x="${-w*r/2}" y="${-h*r*.8}" width="${w*r}" height="${h*r*.8}" fill="#f3b45a"/><path d="M${-w*r/2-3} ${-h*r*.8} Q0 ${-h*r*.8-w*r*1.1} ${w*r/2+3} ${-h*r*.8}Z" fill="#ffd27a"/></g>`).join('')+`</g></g>`;

/* background for a shloka shot: dark sky, slow mandala, glowing light, drifting sparks (the verse is written on top by `calli`) */
const SHLOKA = (a,b,glow) => ({ art:()=>wsky([[0,a],[1,b]])+wglow(480,270,460,glow,.3)+wmandala(480,270,330,'#f1c04e',28,200)+wmandala(480,270,210,glow,16,-140)+wsparks(40,920,100,500,26,'#ffe7a8') });

/* ---- v2 helpers: new locations, close-up camera, ambient life ---- */
const TAP = o => lay(()=>tapovan(o));
const LNK = o => lay(()=>lanka(o));
const WAR = o => lay(()=>warfield(o));
const HC = (hold,z,x,y) => ({keys:[[0,480,270,1],[hold,480,270,1],[hold+7,x||490,y||262,z||1.1]]});     // holds a full 1.0 frame while a lower-third / diagram is read, then pushes in slowly
const FACE = (x,s,y) => [x+6*s/.8, (y||FY)-262*s];                                                     // face-centre of a standing PARSHURAM/RAVAN at (x,y) scale s, for close-up camera keys
const RING = (hi) => A('spin:90:480:270',`<g transform="translate(480 270)">`+[0,1,2,3].map(i=>`<g transform="rotate(${i*90}) translate(0 -205)"><g transform="scale(.9)"><circle r="46" fill="#241446" stroke="url(#gold)" stroke-width="3"/><g transform="scale(.62)">${_emblem(i)}</g></g></g>`).join('')+`</g>`);
/* split one long script line into several shots (cuts only at spaces after the given phrases), each part with its own picture */
const SPLIT = (text, cuts, parts) => { const bits=[]; let rest=text; cuts.forEach(c=>{ const i=rest.indexOf(c); if(i<0) throw new Error('SPLIT cut not found: '+c); bits.push(rest.slice(0,i+c.length).trim()); rest=rest.slice(i+c.length).trim(); }); bits.push(rest); return parts.map((p,k)=>Object.assign({line:bits[k]},p)); };
const LOCK = at => A(`fadeout:${at}:.8`,`<g transform="translate(480 130)"><path d="M-26 0 V-26 a26 26 0 0 1 52 0 V0" fill="none" stroke="#ffd98a" stroke-width="9"/><rect x="-42" y="0" width="84" height="64" rx="10" fill="#8a5a1c" stroke="#ffe7a8" stroke-width="3"/><circle cy="28" r="9" fill="#2a1608"/></g>`);
const BARRIER = x => A('pulse:2.2',`<rect x="${x-8}" y="60" width="16" height="380" rx="8" fill="#ffe7a8" opacity=".5" filter="url(#b4)"/><rect x="${x-2}" y="60" width="4" height="380" fill="#fff3c4"/>`)+wsparks(x-60,x+60,80,430,16,'#fff3c4');
const ORBS3 = () => [[300,'#8cd0ff'],[480,'#ffd98a'],[660,'#c49aff']].map(([x,c],i)=>A(`pop:${.4+i*.5}`,A(`bob:4:${.2+i*.05}`,`<g transform="translate(${x} 90)">${wglow(0,0,80,c,.5)}<circle r="30" fill="#241446" stroke="${c}" stroke-width="3"/><circle r="18" fill="${c}" opacity=".5"/></g>`))).join('');
const ORBPASS = (x1,x2,y,delay) => A(`fadein:${delay}:.4`,`<g>${A(`slide:${x2-x1}:0:2.4:${delay}`,A('pulse:1.4',wglow(x1,y,70,'#ffe7a8',.9)+`<circle cx="${x1}" cy="${y}" r="16" fill="#fff3c4"/>`))}</g>`);

VIDEO({
  title: 'परशुराम जी ने रावण का वध क्यों नहीं किया?',
  format: 'long', target: 495,
  keywords: ['परशुराम','रावण','श्रीराम','सहस्त्रबाहु','विष्णु','ब्रह्मा','तपस्या','अवतार','मर्यादा','वाल्मीकि'],
  music: 'scenes', sfx: true, ending: 3.6, handheld: .6, captionChars: 42, minShot: 2.4, pace: 13,
  look: {rim:1, bokeh:.9, motes:1, warm:.1, vig:.12},
  shots: [

  /* ================= CHAPTER 1 ================= */

  /* hero reveal: face close-up (long thick beard) pulls back to a wide mountain-top shot */
  { chapterTag:{no:1, name:'एक अनसुलझा सवाल'}, line:`भगवान परशुराम स्वयं श्री हरि विष्णु के अवतार थे।`, scene:'ch1-sawal', mood:'hope', tr:'dissolve', fx:'dust',
    ...MAH({sunX:620, sunY:250, sun:1.3}), front:()=>A('drift:-260:0:12',wmist(300,110,'#ffe9d0',.35)),
    cast:[PR({x:400, s:.86, expr:'serene', acts:[[0,'stand'],[3.2,'hold'],[5.6,'armUp'],[8,'stand']]})],
    cam:{keys:[[0,412,178,2.7],[2.8,412,178,2.5],[5.4,520,272,1.05]]} },

  ...SPLIT(`वे अजेय थे, चिरंजीवी थे, और उन्होंने अपने फरसे से पूरी पृथ्वी के अत्याचारी राजाओं का अंत किया था।`, ['चिरंजीवी थे,'], [
    { scene:'ch1-sawal', mood:'divine', tr:'fade', fx:'embers',
      ...MAH({sunX:300, sunY:330, tone:'dusk'}),
      cast:[PR({x:560, y:500, s:1.0, aura:'saf', expr:'serene', acts:[[0,'stand'],[2.2,'hold']]})],
      cam:{keys:[[0,560,420,1.1],[4.4,560,230,1.3]]} },
    { scene:'ch1-sawal', mood:'hope', tr:'whip',
      ...WAR({sunX:300}), front:()=>crownsRise(120,860,400,9)+wsparks(0,960,200,520,10,'#ffb060'),
      cast:[PR({x:380, s:.82, expr:'angry', walk:{from:-380,dur:2.8,delay:0}, acts:[[0,'stand'],[3,'armUp'],[5,'rage'],[7,'stand']]})],
      cam:{keys:[[0,260,300,1.0],[4,400,255,1.3],[8,560,262,1.08]]} } ]),

  ...SPLIT(`दूसरी तरफ, रावण को ब्रह्मा जी से जो वरदान मिला था, उसमें मनुष्यों से सुरक्षा नहीं थी।`, ['नहीं थी।'].slice(0,0).concat(['वरदान मिला था,']), [
    { scene:'vardan-boon', mood:'shock', tr:'glow',
      ...lay(()=>vardanSky({gx:600,gy:250})), art:()=>lotusPlatform(480,442,1.3),
      front:()=>A('ripple:3.5:330:300',`<circle cx="330" cy="300" r="150" fill="none" stroke="#ffe7a8" stroke-width="3" stroke-dasharray="6 8"/>`),
      cast:[{c:RAVAN,x:300,y:436,s:.62,acts:[[0,'kneelPray'],[4.5,'kneelBow']],expr:'serene'}, {c:BRAHMA,x:600,y:436,s:.72,flip:true,walk:{from:260,dur:2.4,delay:0},acts:[[0,'stand'],[2.6,'bless']],expr:'serene'}],
      cam:{keys:[[0,560,290,1.25],[5,420,285,1.3]]} },
    { scene:'vardan-boon', mood:'shock', tr:'fade',
      ...lay(()=>vardanSky({gx:480,gy:280})),
      front:()=>A('pulse:2.6',`<path d="M300 330 A190 190 0 1 1 660 330" fill="none" stroke="#ffe7a8" stroke-width="5" opacity=".7"/>`)+wglow(480,250,230,'#ffd98a',.25)+A('pop:1.6',A('pulse:2',wglow(480,430,70,'#fff0c0',.7))),
      cast:[RV({x:480, s:.74, props:{front:'khadga'}, acts:[[0,'stand'],[2,'fist']]}), {c:VILLAGER,x:480,y:446,s:.26,acts:[[0,'stand']],aura:'gw',enter:{fade:1.2,delay:1.6}}],
      cam:{keys:[[0,480,270,1.0],[6,480,330,1.7]]} } ]),

  { line:`परशुराम जी भी धरती पर मनुष्य रूप में ही थे।`, scene:'ch1-sawal', mood:'hope', tr:'fade', fx:'petals',
    ...TAP({tone:'dawn'}), cast:[PR({x:470, s:.9, expr:'serene', walk:{from:-330,dur:3,delay:0}, acts:[[0,'stand'],[3.4,'relax'],[4.4,'lookAway']]})],
    cam:{keys:[[0,300,290,1.05],[3,470,262,1.2],[5.2,478,206,1.95]]} },

  ...SPLIT(`तो फिर सवाल यह है कि जब परशुराम जी धरती पर पहले से मौजूद थे, तो उन्होंने ही रावण का वध क्यों नहीं कर दिया?`, ['सवाल यह है कि','मौजूद थे,'], [
    { scene:'ch1-sawal', mood:'hope', tr:'iris', trAt:[480,230],
      ...lay(()=>cosmos()), front:()=>wriddle('both',480,235,1.5), cam:{keys:[[0,480,270,1.0],[3,480,250,1.25]]} },
    { scene:'ch1-sawal', mood:'hope', tr:'wipe',
      ...MAH({sunX:700, sunY:300, tone:'dawn'}), front:()=>A('bob:6:.2',earth(780,110,50)+wglow(780,110,120,'#bfe0ff',.4)),
      cast:[PR({x:400, s:.84, acts:[[0,'stand'],[1.6,'lookUp'],[4,'stand']]})], cam:{keys:[[0,400,300,1.5],[5,520,250,1.1]]} },
    { scene:'ch1-sawal', mood:'hope', tr:'fade',
      ...lay(()=>cosmos()), front:()=>wriddle('crown',480,150,.8),
      cast:[PR({x:250, s:.76, walk:{from:-300,dur:2.4,delay:0}, acts:[[0,'stand'],[3,'lookAway'],[5.4,'think']]}), RV({x:730, s:.72, flip:true, walk:{from:300,dur:2.4,delay:0}, props:{front:'khadga'}, acts:[[0,'stand'],[3.5,'lookAway']]})],
      cam:{keys:[[0,330,260,1.3],[3.4,640,260,1.3],[7,480,255,1.05]]} } ]),

  { line:`भगवान विष्णु को श्रीराम के रूप में दोबारा जन्म लेने की आवश्यकता क्यों पड़ी?`, scene:'vishnu-kshir', mood:'divine', tr:'glow',
    ...lay(()=>kshir()), front:()=>wriddle('chakra',480,110,.62,'#fff0b8'),
    cast:[{c:VISHNU,x:330,y:436,s:.74,acts:[[0,'stand'],[1.2,'bless'],[5,'explain']],expr:'serene'}, {c:RAMA,x:670,y:436,s:.64,flip:true,props:{front:'bow'},enter:{fade:1.6,delay:2.2,rise:30},acts:[[0,'stand'],[5,'namaste']],expr:'serene',aura:'gw'}],
    cam:{keys:[[0,330,290,1.4],[4,480,275,1.15],[8,640,280,1.3]]} },

  ...SPLIT(`आज हम किसी सुनी-सुनाई कहानी पर नहीं, बल्कि वाल्मीकि रामायण, भागवत पुराण और अध्यात्म रामायण के प्रमाणों के आधार पर इस रहस्य की तह तक जाएंगे।`, ['कहानी पर नहीं,','आधार पर'], [
    { scene:'ch1-sawal', mood:'calm', tr:'fade',
      ...lay(()=>ayodhya({tone:'dusk'})),
      front:()=>A('pop:.8',`<g transform="translate(250 190)"><path d="M-70 -34 h140 a12 12 0 0 1 12 12 v36 a12 12 0 0 1 -12 12 h-70 l-20 22 v-22 h-50 a12 12 0 0 1 -12 -12 v-36 a12 12 0 0 1 12 -12Z" fill="#fff3d8" opacity=".92"/><g transform="translate(0 2) scale(.42)">${_emblem(2)}</g></g>`)+A('pop:1.8',`<g transform="translate(690 180)"><path d="M-70 -34 h140 a12 12 0 0 1 12 12 v36 a12 12 0 0 1 -12 12 h-30 v22 l-20 -22 h-90 a12 12 0 0 1 -12 -12 v-36 a12 12 0 0 1 12 -12Z" fill="#fff3d8" opacity=".92"/><g transform="translate(0 2) scale(.42)">${_emblem(3)}</g></g>`),
      cast:[{c:VILLAGER,x:300,y:FY,s:.62,acts:[[0,'stand'],[1,'explain'],[3,'lookAway']]}, {c:DEVOTEE_F,x:640,y:FY,s:.62,flip:true,acts:[[0,'stand'],[2,'plead'],[4,'explain']]}],
      cam:{keys:[[0,480,300,1.2],[5,500,285,1.0]]} },
    { scene:'ch1-sawal', mood:'calm', tr:'fade',
      art:()=>wsky([[0,'#2a1608'],[1,'#5a3418']])+wglow(480,260,460,'#ffb45a',.4)+wmandala(480,260,330,'#f1c04e',28,200)+wmandala(480,260,200,'#ffe7a8',14,-120)+
        [[175,'वाल्मीकि रामायण',1.2],[480,'भागवत पुराण',3.2],[785,'अध्यात्म रामायण',5.2]].map(([x,t,d],i)=>A(`pop:${d-.6}`,A(`bob:${3+i}:.25`,pothi(x,235,.78)+wglow(x,235,120,'#ffe7a8',.35)))+A(`pop:${d}`,`<text x="${x}" y="320" text-anchor="middle" font-size="33" fill="#ffe7a8" style="font-family:'Tiro','Mukta',serif;font-weight:400">${t}</text>`)).join('')+wsparks(60,900,100,480,28,'#ffe7a8')+wbirds(70,4,16,'#6a4a2a'),
      cam:'fit' },
    { scene:'vishnu-kshir', mood:'divine', tr:'dissolve',
      ...lay(()=>kshir()), front:()=>A('drift:0:140:6',A('bob:3:.3',pothi(480,170,1.0)+wglow(480,170,150,'#ffe7a8',.5)))+[0,1,2,3,4,5,6].map(i=>A(`drift:${(i%3-1)*20}:-150:${4+i*.6}`,`<circle cx="${300+i*60}" cy="${420+(i%2)*30}" r="${3+i%3*2}" fill="none" stroke="#e8ffff" stroke-width="2"/>`)).join(''),
      cam:{keys:[[0,480,200,1.3],[4,480,330,1.15]]} } ]),

  /* ================= CHAPTER 2 ================= */

  { chapterTag:{no:2, name:'रावण का वरदान और सहस्त्रबाहु का प्रसंग'}, line:`सबसे पहले इस भ्रम को दूर करते हैं कि परशुराम जी रावण को मार ही नहीं सकते थे।`, scene:'ch2-vardan-court', mood:'calm', tr:'dissolve', fx:'dust',
    ...TAP({tone:'dusk', fireX:760, hutX:150}), front:()=>A('drift:-300:0:14',wmist(250,150,'#ffe9d0',.4)),
    cast:[PR({x:430, s:.82, acts:[[0,'stand'],[2.5,'explain'],[5,'accuse'],[7,'explain']], talk:false})],
    cam:{keys:[[0,520,290,1.0],[4,450,262,1.3],[8,455,214,1.5]]} },

  ...SPLIT(`वाल्मीकि रामायण के बालकांड के पंद्रहवें सर्ग (श्लोक 14) में ब्रह्मा जी स्वयं बताते हैं:`, ['(श्लोक 14) में'], [
    { scene:'ch2-vardan-court', mood:'divine', tr:'glow',
      art:SCROLL('#3a1a2a','#7a3a4a','#ffb0c8',1.5), front:()=>wlower('वाल्मीकि रामायण','बालकांड · सर्ग 15 · श्लोक 14',{at:.4,hold:3.6}), cam:'fit' },
    { scene:'ch2-vardan-court', mood:'shock', tr:'fade',
      ...lay(()=>vardanSky({gx:560,gy:250})), art:()=>lotusPlatform(480,442,1.25),
      cast:[{c:BRAHMA,x:520,y:440,s:.86,flip:true,acts:[[0,'stand'],[1.2,'explain']],talk:false,expr:'serene'}],
      cam:{keys:[[0,420,290,1.1],[4,510,250,1.9]]} } ]),

  /* the shloka, written in calligraphy while the owner chants it */
  { line:`नाकीर्तयदवज्ञानात्तद्रक्षो मानुषांस्तदा । तस्मात् स मानुषाद्वध्यो मृत्युर्नान्योऽस्य विद्यते ॥`, nocap:true, scene:'shloka-chant', mood:'divine', tr:'glow', fx:'embers',
    ...SHLOKA('#2a0f26','#5a2440','#ffb0c8'),
    calli:{lines:['नाकीर्तयदवज्ञानात्तद्रक्षो मानुषांस्तदा ।','तस्मात् स मानुषाद्वध्यो मृत्युर्नान्योऽस्य विद्यते ॥'], source:'वाल्मीकि रामायण · बालकांड · सर्ग 15 · श्लोक 14', y:215, size:38, col:'#ffe9a8', delay:.8, gap:2, write:1.8, glow:true, scrim:true}, cam:'fit' },

  { line:`अर्थात, रावण ने देवताओं, गंधर्वों, यक्षों और असुरों से अमरता का वरदान माँगा था,`, scene:'vardan-boon', mood:'shock', tr:'wipe',
      ...lay(()=>vardanSky({gx:560,gy:250})), art:()=>lotusPlatform(480,442,1.25),
      front:()=>BADGE(250,120,'देवता','#ffd25e',1.6)+BADGE(430,120,'गंधर्व','#7fd6ff',2.6)+BADGE(610,120,'यक्ष','#8cf0b0',3.6)+BADGE(790,120,'असुर','#c49aff',4.6),
      cast:[{c:BRAHMA,x:640,y:440,s:.72,flip:true,acts:[[0,'stand'],[1.2,'bless']],expr:'serene'}, {c:RAVAN,x:300,y:440,s:.64,acts:[[0,'kneelPray'],[6,'kneelBow']],expr:'serene'}],
      cam:{keys:[[0,480,300,1.0],[8,420,300,1.15]]} },

  { line:`लेकिन मनुष्यों को तुच्छ समझकर छोड़ दिया था।`, scene:'ch2-vardan-court', mood:'hope', tr:'fade',
    ...LNK({sunX:660}), front:()=>A('pulse:2',wglow(150,380,110,'#fff0c0',.5)),
    cast:[RV({x:600, s:.78, flip:true, expr:'smile', props:{front:'khadga'}, acts:[[0,'stand'],[2,'relax'],[4,'lookAway']]}), {c:VILLAGER,x:170,y:440,s:.34,acts:[[0,'stand']],expr:'calm',aura:'gw'}],
    cam:{keys:[[0,640,300,1.4],[5,500,285,1.1]]} },

  ...SPLIT(`इस श्लोक में कहीं भी यह नहीं लिखा है कि रावण को केवल कोई क्षत्रिय ही मार सकता है या कोई ब्राह्मण उसका वध नहीं कर सकता।`, ['लिखा है कि','मार सकता है'], [
    { scene:'ch2-vardan-court', mood:'calm', tr:'fade',
      art:()=>wsky([[0,'#150d36'],[1,'#37204e']])+wglow(480,260,430,'#ffb060',.3)+wmandala(480,270,300,'#f1c04e',24,160)+A('bob:4:.22',pothi(480,262,1.5)+A('glint:1.2:2.6:-230:230',`<g transform="translate(480 262)"><rect x="-26" y="-70" width="52" height="140" fill="#fff" opacity=".4" filter="url(#b10)" transform="skewX(-14)"/></g>`))+wglow(480,90,70,'#ffe7a8',.4)+wsparks(60,900,100,480,26,'#ffe7a8'),
      cam:'fit' },
    { scene:'ch2-vardan-court', mood:'calm', tr:'fade',
      ...LNK({sunX:260, sunY:320}), front:()=>TAG(480,90,380,'केवल क्षत्रिय ही',.5,3.0),
      cast:[RV({x:660, s:.74, flip:true, props:{front:'khadga'}, acts:[[0,'stand'],[2,'fist']]}), {c:SOLDIER,x:260,y:FY,s:.6,props:{front:'staff'},walk:{from:-240,dur:2.4,delay:0},acts:[[0,'stand']]}],
      cam:{keys:[[0,480,290,1.1],[5,480,270,1.05]]} },
    { scene:'ch2-vardan-court', mood:'calm', tr:'wipe',
      ...TAP({tone:'dusk', fireX:200, hutX:800}), front:()=>TAG(480,90,420,'ब्राह्मण नहीं मार सकता',.5,3.2),
      cast:[{c:BRAHMIN,x:640,y:FY,s:.72,flip:true,acts:[[0,'stand'],[2,'explain']]}, RV({x:300, s:.7, props:{front:'khadga'}, acts:[[0,'stand'],[3,'lookAway']]})],
      cam:{keys:[[0,480,290,1.1],[5,520,270,1.05]]} } ]),

  ...SPLIT(`इसलिए यह कहना कि परशुराम जी ब्राह्मण होने के कारण रावण को नहीं मार सकते थे, शास्त्रीय रूप से सही नहीं है।`, ['कारण'], [
    { scene:'ch2-vardan-court', mood:'hope', tr:'fade', fx:'dust',
      ...MAH({sunX:260, sunY:285, tone:'dusk'}), cast:[PR({x:620, s:.9, flip:true, acts:[[0,'stand'],[1.5,'explain']]})],
      cam:{keys:[[0,560,290,1.3],[3,556,208,2.1],[5.6,556,208,2.3]]} },
    { scene:'ch2-vardan-court', mood:'hope', tr:'fade', fx:'dust',
      ...MAH({sunX:700, sunY:300, tone:'dawn'}), front:()=>A('drift:-300:0:12',wmist(310,100,'#ffe9d0',.3)),
      cast:[PR({x:300, s:.84, acts:[[0,'stand'],[1.4,'armUp'],[4,'bless'],[6.5,'stand']]})],
      cam:{keys:[[0,420,290,1.0],[6,330,262,1.35]]} } ]),

  ...SPLIT(`इतना ही नहीं, श्रीमद्भागवत पुराण के अनुसार, महिष्मती के राजा कार्तवीर्य अर्जुन—जिन्हें हम सहस्त्रबाहु के नाम से जानते हैं—उन्होंने एक बार`, ['के अनुसार,'], [
    { scene:'ch2-vardan-court', mood:'joy', tr:'fade',
      art:SCROLL('#3a1a08','#7a4a1c','#ffd25e',1.5), front:()=>wlower('श्रीमद्भागवत पुराण','महिष्मती · कार्तवीर्य अर्जुन',{at:.4,hold:3.6}), cam:'fit' },
    { scene:'sahastrabahu-court', mood:'joy', tr:'iris', trAt:[700,250],
      ...lay(()=>court({tx:700})), title:{text:'महिष्मती', y:112, size:44, delay:.4},
      cast:[{c:SAHASTRABAHU,x:700,y:392,s:.64,flip:true,acts:[[0,'stand'],[3,'explain']],expr:'smile'}, {c:SOLDIER,x:120,y:436,s:.5,props:{front:'staff'},acts:[[0,'stand']]}, {c:SOLDIER,x:850,y:436,s:.5,flip:true,props:{front:'staff'},acts:[[0,'stand']]}],
      cam:{keys:[[0,480,270,1.0],[4,640,262,1.25],[9,690,250,1.4]]} } ]),

  { line:`युद्ध में रावण को हराकर बंदी बना लिया था।`, scene:'sahastrabahu-court', mood:'calm', tr:'fade',
    ...lay(()=>court({tx:700})), front:()=>A('pulse:2.4',wglow(430,330,150,'#ffe0a0',.3)),
    cast:[{c:SAHASTRABAHU,x:700,y:392,s:.64,flip:true,acts:[[0,'stand'],[2,'point']],expr:'smile'}, {c:SOLDIER,x:230,y:436,s:.5,props:{front:'staff'},walk:{from:-300,dur:3,delay:0},acts:[[0,'stand']]}, {c:RAVAN,x:380,y:436,s:.64,walk:{from:-300,dur:3,delay:0},acts:[[0,'lookDown']],expr:'sad'}],
    cam:{keys:[[0,380,290,1.3],[5,520,270,1.15]]} },

  { line:`और उस शक्तिशाली सहस्त्रबाहु का वध स्वयं भगवान परशुराम ने किया था।`, scene:'sahastrabahu-court', mood:'divine', tr:'glow', fx:'sparks',
    ...lay(()=>court({tx:700})),
    front:()=>A('fadein:4.1:.2',A('fadeout:5.2:1.4',A('ripple:1.8:700:300',`<circle cx="700" cy="300" r="160" fill="none" stroke="#fff3c4" stroke-width="5"/>`)+wglow(700,300,260,'#fff0c0',.8)))+A('fadein:4.2:.4',wsparks(560,840,200,420,26,'#ffe7a8')),
    cast:[{c:SAHASTRABAHU,x:700,y:392,s:.64,flip:true,acts:[[0,'stand']],expr:'surprise',exit:{at:4.4,fade:.9}}, PR({x:330, s:.76, walk:{from:-300,dur:2.6,delay:0}, acts:[[0,'stand'],[3.2,'armUp'],[5.4,'stand']]})],
    sfx:[[4.3,'shimmer',.7]], cam:{keys:[[0,420,280,1],[4,520,280,1.15],[7,560,285,1.3]]} },

  ...SPLIT(`तो जब परशुराम जी उस योद्धा का अंत कर सकते थे जिसने रावण को बंदी बनाया था, तो उन्होंने सीधे रावण को चुनौती क्यों नहीं दी?`, ['बनाया था,'], [
    { scene:'ch2-vardan-court', mood:'calm', tr:'fade',
      ...MAH({sunX:760, sunY:330, tone:'dusk'}),
      front:()=>`<g transform="translate(790 392)" opacity=".85">${wglow(0,-30,120,'#ffb060',.5)}<path d="M-60 0 V-40 L-44 -52 L-28 -40 V-70 L-12 -86 L4 -70 V-40 L22 -54 L40 -40 V0Z" fill="#2a1a3a"/></g>`,
      cast:[PR({x:290, s:.82, acts:[[0,'stand'],[2.2,'think'],[5,'lookAway']]})], cam:'panR' },
    { scene:'ch2-vardan-court', mood:'calm', tr:'wipe',
      ...LNK({sunX:760, sunY:300}), front:()=>wriddle('crown',560,140,.5)+wbirds(90,4,16,'#1a0a1a'),
      cast:[PR({x:250, s:.8, acts:[[0,'stand'],[2.2,'point'],[5,'stand']]})], cam:{keys:[[0,320,290,1.25],[6,520,275,1.05]]} } ]),

  /* ================= CHAPTER 3 ================= */

  { chapterTag:{no:3, name:'प्रचलित मान्यताएँ और उनका सच'}, line:`इस प्रश्न के उत्तर में दो तर्क सबसे ज़्यादा दिए जाते हैं।`, scene:'ch3-do-tark', mood:'hope', tr:'dissolve',
    art:()=>wsky([[0,'#0e0a2a'],[1,'#2a1850']])+wglow(480,270,480,'#ffb060',.25)+wmandala(480,270,340,'#f1c04e',28,220)+splitArgs({hi:-1,delay:.4})+wsparks(0,960,60,500,22,'#ffe7a8'), cam:'fit' },

  { line:`पहला तर्क है पृथ्वी का दान और तपस्या।`, scene:'ch3-do-tark', mood:'hope', tr:'fade',
    art:()=>wsky([[0,'#0e0a2a'],[1,'#2a1850']])+wglow(250,270,380,'#ff9a50',.3)+wmandala(480,270,340,'#f1c04e',28,220)+splitArgs({hi:0,delay:0})+wsparks(0,960,60,500,22,'#ffe7a8'), cam:'fit' },

  ...SPLIT(`वाल्मीकि रामायण के बालकांड में परशुराम जी स्वयं श्रीराम को बताते हैं कि क्षत्रियों से पृथ्वी जीतने के बाद उन्होंने पूरी धरती ऋषि कश्यप को दान कर दी थी।`, ['बताते हैं कि','जीतने के बाद'], [
    { scene:'ch3-do-tark', mood:'divine', tr:'fade',
      ...MAH({sunX:480, sunY:310, tone:'dawn'}), front:()=>wlower('वाल्मीकि रामायण','बालकांड',{at:.4,hold:3.8}),
      cast:[PR({x:330, s:.78, acts:[[0,'stand'],[1.6,'explain']]}), {c:RAMA,x:650,y:FY,s:.7,flip:true,props:{front:'bow'},acts:[[0,'stand'],[2,'namaste']],expr:'serene'}],
      cam:'fit' },
    { scene:'ch3-do-tark', mood:'hope', tr:'whip',
      ...WAR({sunX:640}), front:()=>crownsRise(160,800,400,7),
      cast:[PR({x:480, s:.84, acts:[[0,'stand'],[1.4,'armUp'],[3.4,'stand']]})], cam:{keys:[[0,480,300,1.5],[4,480,262,1.1]]} },
    { scene:'ch3-do-tark', mood:'divine', tr:'fade',
      ...TAP({tone:'dawn', fireX:830, hutX:120}), front:()=>A('bob:5:.3',earth(480,196,46)+wglow(480,196,120,'#bfe0ff',.45)),
      cast:[PR({x:310, s:.78, acts:[[0,'stand'],[2,'give'],[6,'stand']]}), {c:KASHYAP,x:650,y:FY,s:.74,flip:true,acts:[[0,'stand'],[3,'bless'],[7,'stand']],expr:'serene'}],
      cam:{keys:[[0,480,280,1.0],[8,480,262,1.2]]} } ]),

  { line:`ऋषि कश्यप ने उनसे कहा था कि अब वे इस दान की गई भूमि पर रात्रि विश्राम न करें।`, scene:'ch3-do-tark', mood:'calm', tr:'fade',
    ...TAP({tone:'dusk', fireX:260, hutX:820}), front:()=>`<circle cx="790" cy="100" r="30" fill="#f3ecd2"/>${wglow(790,100,110,'#e8f0ff',.45)}`,
    cast:[{c:KASHYAP,x:600,y:FY,s:.78,flip:true,acts:[[0,'stand'],[1,'explain'],[5,'plead']],expr:'serene'}, PR({x:340, s:.74, acts:[[0,'stand'],[2.5,'pranam'],[6,'stand']]})],
    cam:{keys:[[0,640,300,1.5],[4,500,280,1.15],[8,380,262,1.35]]} },

  { line:`इसके बाद परशुराम जी महेंद्र पर्वत पर तपस्या करने चले गए।`, scene:'ch3-do-tark', mood:'hope', tr:'fade', fx:'dust',
    ...MAH({sunX:700, sunY:300, tone:'dawn'}), title:{text:'महेंद्र पर्वत', y:92, size:42, color:'#fff0cc', delay:1.2},
    cast:[PR({x:640, s:.74, walk:{from:-640,dur:5.2,delay:0}, acts:[[0,'stand'],[5.6,'kneelPray']]})],
    cam:{keys:[[0,260,285,1.15],[6,600,275,1.3],[8,640,230,1.55]]} },

  ...SPLIT(`कई लोग मानते हैं कि इस वचन के कारण वे धरती पर लौटकर रावण से युद्ध नहीं कर सकते थे।`, ['इस वचन के कारण'], [
    { scene:'ch3-do-tark', mood:'calm', tr:'fade',
      ...MAH({tone:'night', ledge:432}), front:()=>wsparks(280,780,100,430,24,'#cfe0ff'),
      cast:[PR({x:300, s:.8, props:{}, acts:[[0,'kneelPray']], eyes:'closed', expr:'serene'})], cam:{keys:[[0,300,282,1.9],[4,360,280,1.4]]} },
    { scene:'ch3-do-tark', mood:'calm', tr:'wipe',
      ...MAH({tone:'night', ledge:432, sunX:760}), front:()=>BARRIER(560)+A('pulse:3',wglow(840,360,150,'#ff6a3a',.35)),
      cast:[PR({x:380, s:.8, acts:[[0,'stand'],[2,'lookUp'],[4,'lookDown']]})], cam:{keys:[[0,420,290,1.2],[5,520,265,1.05]]} } ]),

  ...SPLIT(`लेकिन जिस समय परशुराम जी यह बात श्रीराम को बता रहे थे, उस समय वे स्वयं मिथिला से लौटते हुए श्रीराम के सामने खड़े थे।`, ['बता रहे थे,'], [
    { scene:'ch3-do-tark', mood:'joy', tr:'fade', fx:'petals',
      ...MAH({sunX:300, sunY:290, tone:'dusk'}), cast:[PR({x:520, s:.88, flip:true, acts:[[0,'stand'],[1.2,'explain'],[4,'stand']]})],
      cam:{keys:[[0,520,290,1.2],[3,526,206,1.9],[5.6,526,206,2.0]]} },
    { scene:'ch3-do-tark', mood:'joy', tr:'wipe', fx:'petals',
      ...lay(()=>mithilaRoad()), front:()=>wlower('वाल्मीकि रामायण','बालकांड',{at:.4,hold:4.2}),
      cast:[PR({x:330, s:.8, walk:{from:-260,dur:3,delay:0}, acts:[[0,'stand'],[3.2,'explain']]}), {c:RAMA,x:650,y:FY,s:.7,flip:true,props:{front:'bow'},acts:[[0,'stand'],[3,'namaste']],expr:'serene'}],
      cam:HC(5,1.15,490,262) } ]),

  { line:`इसका अर्थ यह है कि उन पर धरती पर आने का कोई पूर्ण प्रतिबंध नहीं था;`, scene:'ch3-do-tark', mood:'hope', tr:'fade',
    ...lay(()=>mithilaRoad()), front:()=>A('fadeout:1.2:2.4',`<rect x="205" y="70" width="14" height="370" rx="7" fill="#ffe7a8" opacity=".6" filter="url(#b4)"/>`)+A('fadein:1.2:.2',A('fadeout:1.3:3',wsparks(150,280,120,430,30,'#fff3c4'))),
    cast:[PR({x:360, s:.86, acts:[[0,'stand'],[2.6,'explain'],[5,'lookAway']]}), {c:RAMA,x:700,y:FY,s:.76,flip:true,props:{front:'bow'},acts:[[0,'stand'],[4,'namaste']],expr:'serene'}],
    cam:{keys:[[0,366,200,2.0],[3.0,420,230,1.7],[3.8,690,206,1.8,'snap'],[7,660,206,2.0]]} },

  ...SPLIT(`हाँ, यह ज़रूर था कि वे अपने विजय अभियानों से संन्यास लेकर तपस्या में लीन हो चुके थे।`, ['संन्यास लेकर'], [
    { scene:'ch3-do-tark', mood:'calm', tr:'fade', fx:'petals',
      ...TAP({tone:'dawn', fireX:300, hutX:820}), art:()=>LEAN_AXE(640,440),
      cast:[PR({x:480, s:.86, props:{}, acts:[[0,'stand'],[2,'namaste']], expr:'serene'})], cam:{keys:[[0,480,290,1.0],[5,490,262,1.35]]} },
    { scene:'ch3-do-tark', mood:'calm', tr:'dissolve',
      ...MAH({sunX:480, sunY:300, tone:'dawn'}), art:()=>LEAN_AXE(660,440),
      cast:[PR({x:440, s:.86, props:{}, acts:[[0,'kneelPray']], eyes:'closed', expr:'serene'})], cam:{keys:[[0,480,270,1.1],[3,444,236,1.9]]} } ]),

  { line:`दूसरा तर्क है 'विष्णु तत्व' का श्रीराम में समाहित होना।`, scene:'ch3-do-tark', mood:'divine', tr:'fade',
    art:()=>wsky([[0,'#0a0c30'],[1,'#1c1e56']])+wglow(710,270,380,'#7fa8ff',.3)+wmandala(480,270,340,'#f1c04e',28,220)+splitArgs({hi:1,delay:0})+wsparks(0,960,60,500,22,'#cfe0ff'), cam:'fit' },

  { line:`अध्यात्म रामायण के बालकांड के सातवें सर्ग (श्लोक 27) में एक बड़ा ही अद्भुत प्रसंग आता है।`, scene:'ch3-do-tark', mood:'divine', tr:'fade',
    art:SCROLL('#06203a','#124a58','#7fe8ff'), front:()=>wlower('अध्यात्म रामायण','बालकांड · सर्ग 7 · श्लोक 27',{at:.6,hold:5}), cam:'fit' },

  ...SPLIT(`परशुराम जी याद करते हैं कि भगवान विष्णु ने उन्हें वचन दिया था:`, ['याद करते हैं कि'], [
    { scene:'ch3-do-tark', mood:'divine', tr:'iris', trAt:[660,230],
      ...MAH({sunX:260, sunY:300, tone:'dusk'}),
      cast:[PR({x:300, s:.8, acts:[[0,'stand'],[2,'think'],[5,'lookUp']]})], cam:{keys:[[0,300,260,1.5],[6,380,262,1.15]]} },
    { scene:'vishnu-kshir', mood:'divine', tr:'glow',
      ...lay(()=>kshir()), front:()=>A('ripple:3.4:480:250',`<circle cx="480" cy="250" r="190" fill="none" stroke="#ffe7a8" stroke-width="3" stroke-dasharray="3 9"/>`),
      cast:[{c:VISHNU,x:480,y:436,s:.84,acts:[[0,'stand'],[2,'bless']],expr:'serene'}], cam:{keys:[[0,480,290,1.0],[3.4,480,250,1.4]]} } ]),

  { line:`उत्पत्स्ये परया शक्त्या तदा द्रक्ष्यसि मां ततः । मत्तेजः पुनरादास्ये त्वयि दत्तं मया पुरा ॥`, nocap:true, scene:'shloka-chant', mood:'divine', tr:'glow', fx:'embers',
    ...SHLOKA('#06203a','#124a58','#7fe8ff'),
    calli:{lines:['उत्पत्स्ये परया शक्त्या तदा द्रक्ष्यसि मां ततः ।','मत्तेजः पुनरादास्ये त्वयि दत्तं मया पुरा ॥'], source:'अध्यात्म रामायण · बालकांड · सर्ग 7 · श्लोक 27', y:215, size:38, col:'#e6fbff', delay:.8, gap:2, write:1.8, glow:true, scrim:true}, cam:'fit' },

  ...SPLIT(`अर्थात, जब वे पूर्ण रूप में पुनः अवतार लेंगे, तो अपनी वैष्णवी शक्ति वापस ले लेंगे।`, ['अवतार लेंगे,'], [
    { scene:'ch3-do-tark', mood:'divine', tr:'glow',
      ...lay(()=>cosmos()), front:()=>wriddle('chakra',480,150,.9,'#fff0b8'), cam:{keys:[[0,480,270,1.0],[5,480,230,1.25]]} },
    { scene:'ch3-do-tark', mood:'divine', tr:'wipe',
      ...MAH({sunX:480, sunY:300, tone:'dusk'}), front:()=>ORBPASS(330,630,250,1.0),
      cast:[PR({x:260, s:.78, acts:[[0,'stand'],[0.8,'offer'],[4,'namaste']]}), {c:VISHNU,x:700,y:410,s:.7,flip:true,enter:{fade:1.2,delay:.4,rise:24},acts:[[0,'stand'],[3,'bless']],expr:'serene'}],
      cam:{keys:[[0,480,270,1.0],[5,470,262,1.2]]} } ]),

  { line:`परंतु यहाँ समय को समझना ज़रूरी है।`, scene:'ch3-do-tark', mood:'calm', tr:'fade',
    art:()=>wsky([[0,'#0a0820'],[1,'#241448']])+wmandala(480,250,190,'#f1c04e',24,40)+wmandala(480,250,260,'#ffe7a8',16,-80)+A('spin:6:480:250',`<line x1="480" y1="250" x2="480" y2="130" stroke="#ffe7a8" stroke-width="5" stroke-linecap="round"/>`)+A('spin:72:480:250',`<line x1="480" y1="250" x2="560" y2="250" stroke="#f1c04e" stroke-width="7" stroke-linecap="round"/>`)+`<circle cx="480" cy="250" r="9" fill="#ffe7a8"/>`+A('draw:.5:2.4',`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M60 430 L900 430" stroke="#f1c04e" stroke-width="3" fill="none"/>`)+wsparks(60,900,100,480,22,'#ffe7a8'), cam:'fit' },

  ...SPLIT(`परशुराम जी ने अपनी दिव्य शक्ति श्रीराम को तब लौटाई, जब श्रीराम का जन्म हो चुका था, वे शिव धनुष तोड़ चुके थे और माता सीता से उनका विवाह हो चुका था।`, ['लौटाई,'], [
    { scene:'ch3-do-tark', mood:'hope', tr:'fade',
      ...TAP({tone:'dawn', fireX:800, hutX:130}), front:()=>ORBPASS(330,630,250,1.2),
      cast:[PR({x:300, s:.8, acts:[[0,'stand'],[1,'offer'],[4,'namaste']]}), {c:RAMA,x:660,y:FY,s:.7,flip:true,props:{front:'bow'},acts:[[0,'stand'],[4,'namaste']],expr:'serene',aura:'gw'}],
      cam:{keys:[[0,480,290,1.2],[5,480,262,1.05]]} },
    { scene:'ch3-do-tark', mood:'hope', tr:'fade',
      art:()=>wsky([[0,'#0a0820'],[1,'#241448']])+wglow(480,270,420,'#ffb060',.22)+wmandala(480,270,330,'#f1c04e',28,200)+chainW([{n:'श्रीराम का जन्म'},{n:'शिव धनुष भंग'},{n:'सीता से विवाह'},{n:'शक्ति वापसी',sub:'परशुराम → श्रीराम'}],{y:215,delay:.6,step:2.9,hi:3})+wsparks(60,900,100,480,20,'#ffe7a8'), cam:'fit' } ]),

  ...SPLIT(`तो प्रश्न अब भी वही है—श्रीराम के जन्म से पहले, जब परशुराम जी के पास वह संपूर्ण दिव्य शक्ति थी, तब उन्होंने रावण का वध क्यों नहीं किया?`, ['जन्म से पहले,','शक्ति थी,'], [
    { rec:'3:47.9', scene:'ch3-do-tark', mood:'hope', tr:'fade',
      ...lay(()=>cosmos()), front:()=>wriddle('both',480,235,1.6), cam:{keys:[[0,480,270,1.0],[2.4,480,250,1.2]]} },
    { rec:'3:52.4', scene:'ch3-do-tark', mood:'hope', tr:'fade',
      art:()=>wsky([[0,'#0a0820'],[1,'#241448']])+wglow(300,400,320,'#ffb060',.3)+wmandala(480,270,330,'#f1c04e',28,200)+chainW([{n:'श्रीराम का जन्म'},{n:'शिव धनुष भंग'},{n:'सीता से विवाह'},{n:'शक्ति वापसी'}],{y:215,delay:.1,step:.2,hi:-1,before:true})+wsparks(60,900,100,480,20,'#ffe7a8'), cam:'fit' },
    { scene:'ch3-do-tark', mood:'hope', tr:'wipe',
      ...MAH({tone:'night', ledge:432, sunX:780}), front:()=>A('pulse:3',wglow(860,330,200,'#ff6a3a',.4))+wriddle('diya',640,150,.55),
      cast:[PR({x:300, s:.82, with:{aura:'gw'}, acts:[[0,'stand'],[2,'lookAway'],[5,'think']]})], cam:{keys:[[0,400,290,1.3],[6,520,262,1.1]]} } ]),

  /* ================= CHAPTER 4 ================= */

  ...SPLIT(`इस प्रश्न का सबसे सटीक उत्तर किसी गुप्त नियम में नहीं, बल्कि सृष्टि के विधान और अवतारों के उद्देश्य में छिपा है।`, ['नियम में नहीं,'], [
    { chapterTag:{no:4, name:'अवतार का निश्चित उद्देश्य'}, scene:'ch4-avatar-uddeshya', mood:'divine', tr:'dissolve',
      ...lay(()=>cosmos()), front:()=>A('bob:4:.25',pothi(480,260,1.5)+wglow(480,260,200,'#ffe7a8',.4))+LOCK(3.0), cam:{keys:[[0,480,270,1.0],[5,480,262,1.1]]} },
    { scene:'ch4-avatar-uddeshya', mood:'divine', tr:'glow',
      ...lay(()=>cosmos({col:'#7fe0ff'})), front:()=>RING(), cam:{keys:[[0,480,270,1.0],[6,480,270,1.1]]} } ]),

  { line:`भगवान विष्णु का हर अवतार एक विशेष कार्य और एक निश्चित मर्यादा के साथ प्रकट होता है।`, scene:'ch4-avatar-uddeshya', mood:'divine', tr:'fade',
    ...lay(()=>cosmos({col:'#7fe0ff'})), front:()=>avatarMontage({hi:-1,delay:.8,step:1.1}), cam:'fit' },

  { line:`जैसे नृसिंह अवतार केवल हिरण्यकशिपु का वध करने और भक्त प्रह्लाद की रक्षा के लिए हुआ था।`, scene:'ch4-avatar-uddeshya', mood:'hope', tr:'fade', fx:'sparks',
    art:()=>wsky([[0,'#2a1208'],[.6,'#6a3414'],[1,'#c07a30']])+wglow(400,250,420,'#ffd27a',.55)+lightShafts(400,120,'#fff0c0',9,700,.12)+
      `<g transform="translate(400 0)"><rect x="-70" y="40" width="140" height="400" fill="#5a3418"/><rect x="-80" y="30" width="160" height="26" fill="url(#gold)"/><rect x="-80" y="424" width="160" height="26" fill="url(#gold)"/><path d="M-50 70 V420 M50 70 V420" stroke="#e8b83a" stroke-opacity=".5" stroke-width="3"/>${A('pulse:2.2',`<rect x="-6" y="40" width="12" height="400" fill="#fff3c4" filter="url(#b4)"/>`)}</g>`+
      A('pop:1.4',A('bob:4:.25',`<g transform="translate(400 235) scale(2.1)">${wglow(0,0,70,'#fff0c0',.6)}${_emblem(1)}</g>`))+wsparks(0,960,100,500,22,'#ffd27a'),
    cast:[{c:NANDI,x:720,y:438,s:.62,acts:[[0,'kneelPray']],expr:'serene'}], cam:{keys:[[0,480,270,1],[8,430,250,1.2]]} },

  { line:`मत्स्य अवतार का उद्देश्य प्रलय काल में सृष्टि के बीजों और वेदों की रक्षा करना था।`, scene:'ch4-avatar-uddeshya', mood:'calm', tr:'fade',
    art:()=>wsky([[0,'#0a2a4a'],[.55,'#1f6a8a'],[1,'#9fe0d8']])+wstars(40,200)+wglow(480,200,400,'#bfffff',.35)+
      [0,1,2,3,4].map(i=>A(`drift:${i%2?120:-120}:0:${10+i*2}`,`<path d="M-100 ${330+i*32} q60 -18 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0" stroke="#d8ffff" stroke-opacity="${.6-i*.08}" stroke-width="3.4" fill="none"/>`)).join('')+
      A('bob:8:.18',`<g transform="translate(480 330) scale(2.3)">${_emblem(0)}</g>`)+A('bob:6:.22',`<g transform="translate(610 262)"><path d="M-40 10 Q0 30 40 10 L30 -6 H-30Z" fill="#8a5a2a"/><rect x="-2" y="-70" width="4" height="64" fill="#6a4218"/><path d="M2 -66 L36 -48 L2 -30Z" fill="#fff0c0"/>${A('pulse:2',wglow(-14,-18,44,'#ffe7a8',.9))}<circle cx="-14" cy="-18" r="9" fill="#fff3c4"/><rect x="8" y="-14" width="22" height="9" rx="3" fill="#f1dfae"/></g>`)+wsparks(60,900,100,480,22,'#e8ffff'),
    cam:{keys:[[0,480,270,1],[8,520,290,1.2]]} },

  ...SPLIT(`ठीक इसी प्रकार, परशुराम अवतार का मुख्य उद्देश्य सहस्त्रबाहु और उन अहंकारी राजाओं का अंत करना था, जो धर्म की मर्यादा लांघ चुके थे।`, ['मुख्य उद्देश्य','अंत करना था,'], [
    { scene:'ch4-avatar-uddeshya', mood:'hope', tr:'fade',
      ...lay(()=>cosmos({col:'#ff9a50'})), front:()=>avatarMontage({hi:2,delay:0,step:.15}), cam:'fit' },
    { scene:'ch4-avatar-uddeshya', mood:'hope', tr:'whip',
      ...WAR({sunX:700}), front:()=>crownsRise(160,800,400,8),
      cast:[PR({x:300, s:.82, expr:'angry', acts:[[0,'stand'],[1.4,'armUp'],[3.6,'rage'],[5.6,'stand']]})], cam:{keys:[[0,300,290,1.0],[6,520,262,1.2]]} },
    { scene:'sahastrabahu-court', mood:'calm', tr:'fade',
      ...lay(()=>court({tx:700})), front:()=>A('draw:.4:1.4',`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M480 250 L480 440" stroke="#ffd98a" stroke-width="6" fill="none"/>`)+A('pulse:2',wglow(480,350,60,'#fff0c0',.5)),
      cast:[{c:SAHASTRABAHU,x:330,y:392,s:.6,acts:[[0,'stand'],[2,'point']],expr:'smile',walk:{from:-120,dur:2.6,delay:.2}}, {c:SOLDIER,x:210,y:436,s:.5,props:{front:'staff'},acts:[[0,'stand']]}, {c:SOLDIER,x:130,y:436,s:.5,props:{front:'staff'},acts:[[0,'stand']]}],
      cam:{keys:[[0,420,290,1.2],[6,500,270,1.05]]} } ]),

  ...SPLIT(`पृथ्वी का भार हल्का करने और ऋषि कश्यप को भूमि दान करने के साथ ही परशुराम अवतार का मुख्य प्रयोजन पूर्ण हो चुका था।`, ['दान करने के साथ ही'], [
    { scene:'ch4-avatar-uddeshya', mood:'divine', tr:'fade',
      ...TAP({tone:'dawn', fireX:720, hutX:150}), front:()=>A('rise:-26:5:.3',earth(480,185,58)+wglow(480,185,150,'#bfe0ff',.4)),
      cast:[PR({x:260, s:.76, acts:[[0,'stand'],[3,'namaste']], props:{}}), {c:KASHYAP,x:700,y:FY,s:.72,flip:true,acts:[[0,'stand'],[2,'bless']],expr:'serene'}], cam:{keys:[[0,480,270,1],[7,480,262,1.12]]} },
    { scene:'ch4-avatar-uddeshya', mood:'divine', tr:'glow',
      ...MAH({sunX:480, sunY:310, tone:'dawn'}), front:()=>wbloom(480,150,.9)+A('draw:.8:1.8',`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M480 60 A80 80 0 1 1 479.9 60" stroke="#ffd98a" stroke-width="5" fill="none"/>`),
      cast:[PR({x:480, s:.84, acts:[[0,'stand'],[2,'namaste']], props:{}, expr:'serene'})], cam:{keys:[[0,480,290,1.3],[6,480,250,1.0]]} } ]),

  ...SPLIT(`वहीं दूसरी ओर, वाल्मीकि रामायण के बालकांड में जब रावण के अत्याचार तीनों लोकों में बढ़ गए, तब सभी देवता ब्रह्मा जी के साथ भगवान विष्णु की शरण में गए।`, ['बालकांड में','बढ़ गए,'], [
    { scene:'ch4-avatar-uddeshya', mood:'sad', tr:'fade',
      art:SCROLL('#2a0a1a','#5a1a2a','#ff9a8a',1.5), front:()=>wlower('वाल्मीकि रामायण','बालकांड',{at:.4,hold:3.2}), cam:'fit' },
    { scene:'ch4-avatar-uddeshya', mood:'anger', tr:'fade',
      ...lay(()=>cosmos({col:'#ff5a3a'})), front:()=>ORBS3()+A('drift:0:-20:5',wmist(300,160,'#2a0a14',.55)),
      cast:[RV({x:480, y:600, s:1.5, with:SIL, props:{front:'khadga'}, acts:[[0,'stand'],[2.5,'rage']]})],
      cam:{keys:[[0,480,200,1.0],[6,480,250,1.2]]} },
    { scene:'vishnu-kshir', mood:'calm', tr:'wipe',
      ...lay(()=>kshir()), front:()=>A('drift:260:0:16',wmist(190,140,'#9a8ab8',.5)),
      cast:[{c:DEVA,x:200,y:FY,s:.6,walk:{from:-300,dur:5,delay:.2},acts:[[0,'stand']]}, {c:INDRA,x:310,y:FY,s:.64,walk:{from:-300,dur:5,delay:.1},acts:[[0,'stand']]}, {c:BRAHMA,x:440,y:FY,s:.7,walk:{from:-300,dur:5,delay:0},acts:[[0,'stand']],expr:'serene'}, {c:VISHNU,x:760,y:FY,s:.74,flip:true,acts:[[0,'stand'],[5,'bless']],expr:'serene'}],
      cam:{keys:[[0,330,290,1.0],[8,560,270,1.15]]} } ]),

  ...SPLIT(`देवताओं ने उनसे विशेष प्रार्थना की कि वे राजा दशरथ के घर पुत्र रूप में जन्म लें और रावण का संहार करें।`, ['प्रार्थना की कि'], [
    { scene:'vishnu-kshir', mood:'hope', tr:'fade',
      ...lay(()=>kshir()),
      cast:[{c:DEVA,x:180,y:FY,s:.58,acts:[[0,'kneelPray']]}, {c:INDRA,x:290,y:FY,s:.62,acts:[[0,'kneelPray']]}, {c:BRAHMA,x:410,y:FY,s:.66,acts:[[0,'kneelPray']],expr:'serene'}, {c:VISHNU,x:700,y:FY,s:.74,flip:true,acts:[[0,'stand'],[2.5,'bless']],expr:'serene'}],
      cam:{keys:[[0,300,300,1.5],[4,480,270,1.1]]} },
    { scene:'ch4-avatar-uddeshya', mood:'joy', tr:'glow',
      ...lay(()=>ayodhya({tone:'dawn'})), front:()=>VISION(690,130,70)+A('fadein:2:.8',A('pulse:2',wglow(480,260,120,'#fff0c0',.5))),
      cast:[{c:VISHNU,x:330,y:FY,s:.8,acts:[[0,'stand'],[1.6,'bless']],expr:'serene'}], cam:{keys:[[0,420,300,1.3],[7,520,262,1.0]]} } ]),

  { line:`अर्थात, रावण का वध केवल एक शक्तिशाली योद्धा को मारने की घटना नहीं थी।`, scene:'ch4-avatar-uddeshya', mood:'calm', tr:'fade',
    ...LNK({sunX:240, sunY:310}), front:()=>wbirds(110,5,18,'#1a0a1a'),
    cast:[RV({x:600, s:.8, flip:true, props:{front:'khadga'}, acts:[[0,'stand'],[3,'explain'],[6,'rage']], talk:false})], cam:{keys:[[0,380,300,1.0],[5,560,250,1.45],[8,580,200,1.9]]} },

  ...SPLIT(`इसके लिए 'मर्यादा पुरुषोत्तम' के रूप में एक आदर्श जीवन जीने, धर्म की स्थापना करने और समाज को एक आदर्श चरित्र देने की आवश्यकता थी—जो श्रीराम अवतार का निर्धारित उद्देश्य था।`, ['जीने,','चरित्र'], [
    { scene:'ch4-avatar-uddeshya', mood:'joy', tr:'glow', fx:'petals',
      ...lay(()=>ayodhya({tone:'dusk'})), front:()=>wmandala(480,130,70,'#fff0b8',16,30)+A('pulse:2.2',wglow(480,130,110,'#ffe7a8',.6)),
      cast:[{c:RAMA,x:480,y:FY,s:.8,props:{front:'bow'},acts:[[0,'stand'],[4,'namaste']],expr:'serene',aura:'gw'}], cam:{keys:[[0,480,330,1.05],[6,480,250,1.4]]} },
    { scene:'ch4-avatar-uddeshya', mood:'joy', tr:'wipe', fx:'petals',
      ...lay(()=>ayodhya({tone:'dawn'})), front:()=>wmandala(480,120,80,'#fff0b8',24,40)+A('pulse:2.2',wglow(480,120,120,'#ffe7a8',.5)),
      cast:[{c:RAMA,x:480,y:FY,s:.74,props:{front:'bow'},acts:[[0,'stand']],expr:'serene',aura:'gw'}, {c:VILLAGER,x:250,y:FY,s:.5,walk:{from:-200,dur:3,delay:0},acts:[[0,'namaste']]}, {c:DEVOTEE_F,x:330,y:FY,s:.5,walk:{from:-200,dur:3.4,delay:0},acts:[[0,'namaste']]}, {c:VILLAGER,x:700,y:FY,s:.5,flip:true,walk:{from:200,dur:3,delay:0},acts:[[0,'namaste']]}, {c:DEVOTEE_F,x:790,y:FY,s:.5,flip:true,walk:{from:200,dur:3.4,delay:0},acts:[[0,'namaste']]}],
      cam:{keys:[[0,480,330,1.05],[6,480,250,1.2]]} },
    { scene:'ch4-avatar-uddeshya', mood:'divine', tr:'fade',
      ...lay(()=>cosmos({col:'#ffd98a'})), front:()=>avatarMontage({hi:3,delay:0,step:.12}), cam:'fit' } ]),

  ...SPLIT(`हालाँकि ब्रह्मांड पुराण में परशुराम जी द्वारा दैत्यों से युद्ध करने का उल्लेख मिलता है,`, ['पुराण में'], [
    { scene:'ch4-avatar-uddeshya', mood:'calm', tr:'fade',
      art:SCROLL('#1a0a3a','#3a1a6a','#c49aff',1.4), front:()=>wlower('ब्रह्मांड पुराण','परशुराम · दैत्यों से युद्ध',{at:.3,hold:2.4}), cam:'fit' },
    { scene:'ch4-avatar-uddeshya', mood:'calm', tr:'wipe',
      ...WAR({sunX:260}), front:()=>wsparks(0,960,200,520,12,'#ffa050'),
      cast:[PR({x:300, s:.82, expr:'angry', acts:[[0,'stand'],[1.8,'armUp'],[4,'rage'],[6.4,'stand']]}), {c:DUSHAN,x:700,y:FY,s:.7,flip:true,props:{front:'axe'},walk:{from:240,dur:2.4,delay:0},acts:[[0,'stand'],[3,'recoil']]}],
      cam:{keys:[[0,480,290,1.0],[6,420,262,1.25]]} } ]),

  ...SPLIT(`और महाकवि भवभूति के नाटक 'महावीरचरित' में राक्षसों के संहार का दायित्व श्रीराम को सौंपे जाने का काव्यात्मक वर्णन है,`, ['में'], [
    { rec:'5:34.8', scene:'ch4-avatar-uddeshya', mood:'joy', tr:'fade',
      art:()=>wsky([[0,'#3a0c1c'],[1,'#7a2a30']])+wglow(480,240,420,'#ffcf90',.45)+`<path d="M-40 -20 Q70 140 40 560 L-40 560Z" fill="#8a1a2a" stroke="url(#gold)" stroke-width="4"/><path d="M1000 -20 Q890 140 920 560 L1000 560Z" fill="#8a1a2a" stroke="url(#gold)" stroke-width="4"/>`+lightShafts(480,0,'#fff0c0',7,620,.1)+`<rect x="-40" y="${FY}" width="1040" height="130" fill="#3a1218"/><path d="M-40 ${FY} H1000" stroke="url(#gold)" stroke-width="3"/>`+wsparks(100,860,120,430,22,'#ffe7a8'),
      front:()=>wlower('महावीरचरित','महाकवि भवभूति · नाटक',{at:.4,hold:3}),
      cast:[{c:RISHI,x:320,y:FY,s:.7,acts:[[0,'stand']],expr:'serene'}, {c:RAMA,x:650,y:FY,s:.7,flip:true,acts:[[0,'stand']],expr:'serene',aura:'gw'}], cam:'fit' },
    { scene:'ch4-avatar-uddeshya', mood:'joy', tr:'fade',
      art:()=>wsky([[0,'#3a0c1c'],[1,'#7a2a30']])+wglow(480,240,420,'#ffcf90',.45)+`<path d="M-40 -20 Q70 140 40 560 L-40 560Z" fill="#8a1a2a" stroke="url(#gold)" stroke-width="4"/><path d="M1000 -20 Q890 140 920 560 L1000 560Z" fill="#8a1a2a" stroke="url(#gold)" stroke-width="4"/>`+lightShafts(480,0,'#fff0c0',7,620,.1)+`<rect x="-40" y="${FY}" width="1040" height="130" fill="#3a1218"/><path d="M-40 ${FY} H1000" stroke="url(#gold)" stroke-width="3"/>`+wsparks(100,860,120,430,22,'#ffe7a8'),
      cast:[{c:RISHI,x:320,y:FY,s:.78,acts:[[0,'stand'],[1.5,'offer']],props:{front:'bow'},expr:'serene'}, {c:RAMA,x:650,y:FY,s:.78,flip:true,acts:[[0,'stand'],[3,'namaste']],expr:'serene',aura:'gw'}], cam:{keys:[[0,480,300,1.2],[6,480,250,1.6]]} } ]),

  { rec:'5:43.2', line:`लेकिन मूल वाल्मीकि रामायण अवतारों के इसी अलग-अलग प्रयोजन को दर्शाता है।`, scene:'ch4-avatar-uddeshya', mood:'divine', tr:'glow',
    ...lay(()=>cosmos()), front:()=>avatarMontage({hi:-1,delay:.4,step:.4})+wlower('वाल्मीकि रामायण','अवतारों के अलग-अलग प्रयोजन',{at:1.2,hold:4,y:30}), cam:'fit' },

  /* ================= CHAPTER 5 ================= */

  ...SPLIT(`संक्षेप में कहें तो—शास्त्रों में ऐसा कहीं नहीं लिखा कि परशुराम जी रावण को मारने में असमर्थ थे या उन्हें ऐसा करने से रोका गया था।`, ['नहीं लिखा कि','असमर्थ थे'], [
    { rec:'5:49.7', chapterTag:{no:5, name:'निष्कर्ष'}, scene:'ch5-shanti', mood:'hope', tr:'dissolve', fx:'dust',
      ...TAP({tone:'dawn', fireX:760, hutX:140}), front:()=>A('bob:4:.22',pothi(580,180,.7)+wglow(580,180,140,'#ffe7a8',.45)),
      cast:[PR({x:330, s:.84, expr:'serene', acts:[[0,'stand'],[3,'explain']]})], cam:{keys:[[0,420,290,1],[6,400,250,1.25]]} },
    { rec:'5:54.1', scene:'ch5-shanti', mood:'hope', tr:'fade',
      ...MAH({sunX:520, sunY:300, tone:'dawn'}), front:()=>wsparks(300,700,100,400,16,'#fff0c0'),
      cast:[PR({x:480, s:.9, expr:'serene', acts:[[0,'stand'],[1.4,'armUp'],[3.6,'hold']]})], cam:{keys:[[0,480,300,1.2],[4,486,206,2.0]]} },
    { rec:'5:58.3', scene:'ch5-shanti', mood:'hope', tr:'wipe', fx:'petals',
      ...lay(()=>mithilaRoad()),
      cast:[PR({x:600, s:.8, walk:{from:-560,dur:5.4,delay:0}, acts:[[0,'stand']]})], cam:{keys:[[0,320,290,1.2],[6,620,275,1.2]]} } ]),

  ...SPLIT(`बात केवल इतनी थी कि परशुराम जी का अवतार कार्य पूर्ण हो चुका था और वे तपस्या में लीन थे,`, ['हो चुका था'], [
    { scene:'ch5-shanti', mood:'divine', tr:'fade', fx:'petals',
      ...MAH({sunX:250, sunY:292, tone:'dusk'}), art:()=>LEAN_AXE(640,440), front:()=>wriddle('diya',480,110,.55,'#ffe7a8'),
      cast:[PR({x:420, s:.84, props:{}, acts:[[0,'stand'],[2,'namaste']], expr:'serene'})], cam:{keys:[[0,420,290,1.3],[5,460,262,1.05]]} },
    { scene:'ch5-shanti', mood:'divine', tr:'fade', fx:'petals',
      ...MAH({sunX:250, sunY:292, tone:'dawn'}),
      art:()=>`<g transform="translate(740 410)">${Array.from({length:5},(_,i)=>`<g transform="translate(${-110+i*55} 0)"><rect x="-15" y="-${46+(i%3)*14}" width="30" height="${46+(i%3)*14}" fill="#3a2250"/><path d="M-18 -${46+(i%3)*14} Q0 -${80+(i%3)*14} 18 -${46+(i%3)*14}Z" fill="#6a3a78"/></g>`).join('')}</g>`+
        A('fadein:1.6:1.6',wglow(730,250,230,'#ffd98a',.7)+A('ripple:3.2:730:300',`<circle cx="730" cy="300" r="120" fill="none" stroke="#ffe7a8" stroke-width="3"/>`)+infantRam(730,340,.8)+
          A('draw:2.4:2.8',`<path pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M715 270 C620 160 450 160 300 235" stroke="#ffe7a8" stroke-width="3" fill="none" opacity=".9"/>`)),
      cast:[PR({x:260, s:.86, props:{}, acts:[[0,'kneelPray']], eyes:'closed', expr:'serene'})],
      focus:{at:2.4, sound:'revive', dur:4.2, duck:.28},
      cam:{keys:[[0,262,238,2.1],[2.2,320,270,1.4],[5.5,480,268,1.0]]} } ]),

  ...SPLIT(`जबकि रावण के अंत और धर्म की मर्यादा स्थापित करने का कार्य स्वयं भगवान विष्णु ने अपने श्रीराम अवतार के लिए चुना था।`, ['कार्य'], [
    { scene:'ch5-shanti', mood:'divine', tr:'glow',
      ...LNK({sunX:480, sunY:250}), front:()=>A('fadein:1:2.5',wglow(480,250,420,'#fff0c0',.55)+lightShafts(480,250,'#fff3c4',9,700,.14)),
      cast:[RV({x:480, s:.7, with:SIL, props:{front:'khadga'}, acts:[[0,'stand']]})], cam:{keys:[[0,480,300,1.4],[5,480,270,1.0]]} },
    { scene:'ch5-shanti', mood:'divine', tr:'glow', fx:'petals',
      ...lay(()=>ayodhya({tone:'dawn'})),
      art:()=>infantRam(660,430,1.25)+whisperTrail(310,230,650,320,.5,18),
      cast:[{c:VISHNU,x:250,y:FY,s:.82,acts:[[0,'stand'],[2,'bless']],expr:'serene'}],
      cam:{keys:[[0,420,290,1.05],[7,500,265,1.0],[10,480,262,.98]]} } ]),

  ]
});
