/* महाप्रस्थान: युधिष्ठिर और श्वान — Short, about 70 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js mahaprasthan-short-form
   Look: result first (Indra at the gate of heaven, Yudhishthira with the dog) -> Vyas at a lilac dawn ashram -> sunlit court (Parikshit crowned)
         -> Himalayan snow path at dawn (pink + gold), five quick falls in ONE locked framing, each ends in a soft light rising and going out
         -> golden clouds (Indra) -> the dog turns into golden Dharma -> bright heaven + Duryodhan on a throne -> dim misty hell (voices as soft lights, no fire)
         -> the vision lifts -> the opening picture again, so the video loops.
   Never shown: gore, bodies, scary hell, fire in hell. Hell is grey mist, slate rock and five soft lights.
   No hook text, no intro, no end card. Front rig. New engine pieces: DRAUPADI, DURYODHAN, DHARMA (characters.js), shwan() the dog (scenes.js). */

/* ---------- small helpers (own, new for this video) ---------- */
const GL=(x,y,r,col,op)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" opacity="${r1(op*.28)}"/><circle cx="${x}" cy="${y}" r="${r1(r*.66)}" fill="${col}" opacity="${r1(op*.5)}"/><circle cx="${x}" cy="${y}" r="${r1(r*.34)}" fill="${col}" opacity="${op}"/>`;
const PUFF=(x,y,s,col,op)=>`<g opacity="${op}" fill="${col}"><circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(34*s)}"/><circle cx="${r1(x-31*s)}" cy="${r1(y+9*s)}" r="${r1(26*s)}"/><circle cx="${r1(x+33*s)}" cy="${r1(y+8*s)}" r="${r1(28*s)}"/><circle cx="${r1(x+8*s)}" cy="${r1(y-17*s)}" r="${r1(25*s)}"/><rect x="${r1(x-58*s)}" y="${r1(y+6*s)}" width="${r1(116*s)}" height="${r1(24*s)}" rx="${r1(12*s)}"/></g>`;
const BANK=(y,n,col,op,sc,off)=>{ let o=''; for(let i=0;i<n;i++){ o+=PUFF((off||0)+i*(600/(n-1))-30, y+((i*37)%5)*7, sc*(.8+((i*3)%4)*.17), col, op); } return o; };

/* --- heaven (gold clouds, sun rays, the gate) --- */
const HEAVEN_SKY=()=>skyBand([[0,'#5e4ea0'],[.2,'#c89ac0'],[.46,'#ffd29c'],[.76,'#ffeabc'],[1,'#fff5dc']]);
const SUNRAYS=(cx,cy,op)=>A(`spin:90:${cx}:${cy}`,[...Array(12)].map((_,i)=>`<path d="M${cx} ${cy} L${r1(cx+Math.cos(i*.5236)*900)} ${r1(cy+Math.sin(i*.5236)*900)} L${r1(cx+Math.cos(i*.5236+.14)*900)} ${r1(cy+Math.sin(i*.5236+.14)*900)}Z" fill="#fff6d0" opacity="${op}"/>`).join(''));
const GOLDCLOUDS=(far)=>A('drift:60:0:22',BANK(far?560:700,6,'#ffe3a8',far?.7:.85,1.5,0))+A('drift:-50:0:28',BANK(far?640:780,6,'#fff3d0',.85,1.7,40));
/* the gate of heaven: two fluted gold pillars, a lotus-crowned arch, a glowing doorway with five faint lights inside (the waiting family) */
const PILLAR=(x,h)=>`<rect x="${x-24}" y="${-h}" width="48" height="${h}" fill="#f0cc70" stroke="#b98428" stroke-width="3"/><rect x="${x-24}" y="${-h}" width="12" height="${h}" fill="#fff4c0" opacity=".6"/>`+[-8,4,16].map(d=>`<path d="M${x+d} ${-h+24} L${x+d} -30" stroke="#b98428" stroke-width="1.6" opacity=".5"/>`).join('')+
  `<path d="M${x-38} ${-h+6} Q${x} ${-h-34} ${x+38} ${-h+6} L${x+30} ${-h+26} L${x-30} ${-h+26}Z" fill="#f6d878" stroke="#b98428" stroke-width="3"/><rect x="${x-36}" y="-34" width="72" height="34" rx="6" fill="#f6d878" stroke="#b98428" stroke-width="3"/>`;
const GATE=(cx,y,s)=>`<g transform="translate(${cx} ${y}) scale(${s})">`+
  `<ellipse cx="0" cy="-270" rx="200" ry="340" fill="url(#gw)" opacity=".95"/>`+
  `<path d="M-150 0 L-150 -470 Q0 -600 150 -470 L150 0Z" fill="#fffbe6" opacity=".92"/>`+
  A('pulse:4',[[-70,-300,9],[-30,-380,7],[10,-330,10],[48,-410,7],[84,-300,8]].map(([lx,ly,r])=>GL(lx,ly,r*2.2,'#ffe9a0',.8)).join(''))+
  PILLAR(-172,520)+PILLAR(172,520)+
  `<path d="M-240 -500 Q0 -700 240 -500 L240 -540 Q0 -750 -240 -540Z" fill="#f6d878" stroke="#b98428" stroke-width="4"/><path d="M-240 -520 Q0 -720 240 -520" fill="none" stroke="#fff4c0" stroke-width="3" opacity=".8"/>`+
  `<path d="M0 -690 L-16 -720 Q0 -760 16 -720Z" fill="#ffe9a0" stroke="#b98428" stroke-width="3"/>`+
  `<rect x="-230" y="-6" width="460" height="16" fill="#f0cc70" stroke="#b98428" stroke-width="3"/><rect x="-262" y="10" width="524" height="18" fill="#f6d878" stroke="#b98428" stroke-width="3"/></g>`;

/* --- lilac dawn ashram + sunlit court (Vyas, Parikshit) --- */
const LILAC_SKY=()=>skyBand([[0,'#7c78b8'],[.3,'#c6a8cc'],[.58,'#f6c8b4'],[.82,'#ffe6c0'],[1,'#f4f0dc']])+GL(300,640,200,'#fff0c8',.7);
const TREE=(x,y,s,c1,c2)=>`<path d="M${r1(x-7*s)} ${y} Q${r1(x-3*s)} ${r1(y-120*s)} ${r1(x-4*s)} ${r1(y-210*s)} L${r1(x+5*s)} ${r1(y-210*s)} Q${r1(x+6*s)} ${r1(y-120*s)} ${r1(x+9*s)} ${y}Z" fill="#5a4636"/>`+
  [[0,-250,64,44,c1],[-46,-206,48,34,c2],[48,-214,50,36,c2],[4,-300,40,30,c1],[-18,-170,40,26,c2]].map(([dx,dy,rx,ry,c])=>`<ellipse cx="${r1(x+dx*s)}" cy="${r1(y+dy*s)}" rx="${r1(rx*s)}" ry="${r1(ry*s)}" fill="${c}"/>`).join('');
const RIVER=(y)=>`<path d="M-20 ${y} Q270 ${y-18} 560 ${y} L560 ${y+120} Q270 ${y+96} -20 ${y+120}Z" fill="#b8c8e4"/>`+A('pulse:5',`<path d="M40 ${y+40} Q140 ${y+30} 240 ${y+42} M300 ${y+70} Q400 ${y+58} 500 ${y+72}" stroke="#fff6e0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>`);
const MEADOW=(y)=>`<path d="M-20 ${y} Q270 ${y-24} 560 ${y-4} L560 1000 L-20 1000Z" fill="#9cbb84"/><path d="M-20 ${y+50} Q270 ${y+22} 560 ${y+40} L560 1000 L-20 1000Z" fill="#82a46e" opacity=".7"/>`;
const SUNHILLS=()=>`<path d="M-20 650 Q80 560 190 620 Q300 540 420 616 Q500 574 560 620 L560 1000 L-20 1000Z" fill="#b4a4c8"/><path d="M-20 700 Q120 640 260 690 Q400 650 560 696 L560 1000 L-20 1000Z" fill="#9db4a0"/>`;
const COURT_SKY=()=>skyBand([[0,'#ffe0b0'],[.5,'#fff0cc'],[1,'#fff8e6']]);
const ARCHES=(y)=>{ let o=`<rect x="-20" y="${y-380}" width="580" height="${380+400}" fill="#ecd29a"/>`; for(let i=0;i<4;i++){ const x=18+i*140; o+=`<path d="M${x} ${y} L${x} ${y-250} Q${x+52} ${y-340} ${x+104} ${y-250} L${x+104} ${y}Z" fill="#ffe9b8"/><path d="M${x} ${y-250} Q${x+52} ${y-340} ${x+104} ${y-250}" fill="none" stroke="#c89a3a" stroke-width="5"/>`; o+=`<rect x="${x+104}" y="${y-300}" width="36" height="${300}" fill="#d8b46a"/><rect x="${x+104}" y="${y-300}" width="9" height="300" fill="#fff0c0" opacity=".6"/>`; } return o; };
const DAIS=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-170" y="0" width="340" height="26" rx="6" fill="#e0b050" stroke="#a8741a" stroke-width="3"/><rect x="-136" y="-26" width="272" height="26" rx="6" fill="#f0c860" stroke="#a8741a" stroke-width="3"/><rect x="-100" y="-52" width="200" height="26" rx="6" fill="#ffdc78" stroke="#a8741a" stroke-width="3"/><rect x="-84" y="-48" width="168" height="18" rx="4" fill="#b8202a" opacity=".85"/></g>`;
const COURTFLOOR=(y)=>`<path d="M-20 ${y} L560 ${y} L560 1000 L-20 1000Z" fill="#f4dca8"/><path d="M-20 ${y} L560 ${y}" stroke="#c89a3a" stroke-width="4"/>`+[0,1,2,3].map(i=>`<path d="M${i*180-40} ${y+4} L${i*180-140+i*20} 1000" stroke="#d8b46a" stroke-width="2" opacity=".6"/>`).join('');
const BANNER=(x,y,col)=>A('rock:5:1.6:'+x+':'+y,`<path d="M${x} ${y} L${x} ${y+190}" stroke="#a8741a" stroke-width="4"/><path d="M${x} ${y+6} L${x+70} ${y+30} L${x} ${y+64}Z" fill="${col}" stroke="#a8741a" stroke-width="2"/>`);

/* --- Himalayan snow path at dawn (pink + gold). Layers return a shot's sky/far/mid/art/near --- */
const PEAK=(x,yb,w,h,shade,lit,snow)=>`<path d="M${r1(x-w/2)} ${yb} L${r1(x-w*.14)} ${r1(yb-h*.78)} L${x} ${r1(yb-h)} L${x} ${yb}Z" fill="${shade}"/><path d="M${x} ${r1(yb-h)} L${r1(x+w*.1)} ${r1(yb-h*.7)} L${r1(x+w/2)} ${yb} L${x} ${yb}Z" fill="${lit}"/>`+
  `<path d="M${r1(x-w*.2)} ${r1(yb-h*.72)} L${r1(x-w*.05)} ${r1(yb-h*.8)} L${x} ${r1(yb-h)} L${r1(x+w*.07)} ${r1(yb-h*.74)} L${r1(x+w*.15)} ${r1(yb-h*.6)} L${r1(x+w*.03)} ${r1(yb-h*.66)} L${r1(x-w*.06)} ${r1(yb-h*.58)}Z" fill="${snow}" opacity=".95"/>`;
const SNOW_SKY=()=>skyBand([[0,'#5a6cae'],[.26,'#b08cb8'],[.5,'#f2b4a0'],[.72,'#ffdcae'],[1,'#fff0d2']])+GL(360,560,230,'#fff0c0',.75)+`<circle cx="360" cy="580" r="54" fill="#fffae0" opacity=".95"/>`+A('pulse:6',GL(360,580,110,'#ffe6a8',.4));
const SNOW_FAR=()=>PEAK(80,720,300,330,'#8c98cc','#f4c4c0','#ffffff')+PEAK(250,730,380,470,'#7e8cc4','#f6bfb4','#ffffff')+PEAK(450,720,320,360,'#8c98cc','#f4c4c0','#ffffff')+`<rect x="-20" y="700" width="580" height="320" fill="#a6b0da"/><path d="M-20 700 L560 700 L560 740 L-20 740Z" fill="#fff0e0" opacity=".5"/>`;
const SNOW_MID=()=>`<path d="M-20 770 Q90 690 210 750 Q330 690 460 746 Q520 720 560 740 L560 1000 L-20 1000Z" fill="#d6def2"/><path d="M-20 770 Q90 690 210 750 Q330 690 460 746 Q520 720 560 740" fill="none" stroke="#ffd6c0" stroke-width="5" opacity=".8"/><path d="M60 800 Q150 760 260 800 Q360 770 500 810 L500 1000 L60 1000Z" fill="#c8d2ec" opacity=".7"/>`;
const SNOW_FLOOR=()=>`<path d="M-20 806 Q140 770 300 800 Q440 780 560 790 L560 1000 L-20 1000Z" fill="#eef2fc"/><path d="M-20 830 Q160 800 330 836 Q450 820 560 830 L560 1000 L-20 1000Z" fill="#dfe6f6"/><path d="M-20 950 Q200 920 560 960 L560 1000 L-20 1000Z" fill="#c8d2ec"/>`+
  `<path d="M-10 905 Q140 880 270 900 Q400 868 560 842" fill="none" stroke="#b4bede" stroke-width="16" stroke-linecap="round" opacity=".55"/>`+[[40,902],[110,890],[190,896],[260,895]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="13" ry="5" fill="#a8b4d8" opacity=".6"/>`).join('');
const FLAKES=(op)=>{ let o=''; for(let i=0;i<24;i++){ const x=(i*67)%560, y=(i*113)%760; o+=A(`drift:${(i%2?20:-20)}:240:${(5+(i%5)).toFixed(1)}`,`<circle cx="${x}" cy="${y}" r="${(2+(i%3)*.9).toFixed(1)}" fill="#fff" opacity="${op}"/>`); } return o; };
const MISTLINE=(y,op)=>A('drift:70:0:16',`<ellipse cx="120" cy="${y}" rx="190" ry="26" fill="#fff4ee" opacity="${op}"/><ellipse cx="400" cy="${y+30}" rx="210" ry="30" fill="#fff4ee" opacity="${op*.85}"/>`);
const SNOW=()=>({sky:SNOW_SKY, far:SNOW_FAR, mid:SNOW_MID, art:SNOW_FLOOR, near:()=>FLAKES(.75)+MISTLINE(930,.35)});
/* a soft light leaves a fallen traveller, rises and goes out (nothing else is shown) */
const LIGHTOUT=(x,y,d,col)=>A(`fadein:${d}:.3`,A(`slide:0:-210:2.6:${d}`,A(`fadeout:${d+1.0}:1.6`,GL(x,y,30,col||'#fff0b8',.9)+`<circle cx="${x}" cy="${y}" r="6" fill="#fff"/>`)));

/* --- clouds + golden light for Indra's offer --- */
const GOLDSKY=()=>skyBand([[0,'#7a5ab0'],[.24,'#e4a4b8'],[.5,'#ffc888'],[.8,'#ffe6aa'],[1,'#fff0c4']]);

/* --- the dog turning into Dharma: light only --- */
const BURST=(cx,cy,delay)=>A(`pop:${delay}`,A('pulse:3',GL(cx,cy,190,'#fff0b0',.8))+SUNRAYS(cx,cy,.16));

/* --- heaven throne for Duryodhan: backrest in `art`, seat front in `front` so he looks seated --- */
const THRONE_BACK=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M-170 0 L-170 -430 Q-170 -540 0 -580 Q170 -540 170 -430 L170 0Z" fill="#f0c860" stroke="#a8741a" stroke-width="5"/>`+
  `<path d="M-140 0 L-140 -420 Q-140 -508 0 -540 Q140 -508 140 -420 L140 0Z" fill="#8a1424"/><path d="M-140 -420 Q-140 -508 0 -540 Q140 -508 140 -420" fill="none" stroke="#ffe9a0" stroke-width="4"/>`+
  [[-90,-300],[0,-330],[90,-300]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="22" fill="#ffd25e" stroke="#a8741a" stroke-width="3"/>`).join('')+
  `<path d="M0 -580 L-14 -616 Q0 -650 14 -616Z" fill="#fff0b0" stroke="#a8741a" stroke-width="3"/></g>`;
const THRONE_FRONT=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-196" y="-150" width="392" height="150" rx="12" fill="#f6d070" stroke="#a8741a" stroke-width="5"/><rect x="-170" y="-124" width="340" height="98" rx="8" fill="#b01c2c" opacity=".9"/><path d="M-170 -124 L170 -124" stroke="#ffe9a0" stroke-width="4"/>`+
  `<rect x="-230" y="-196" width="62" height="196" rx="14" fill="#f0c860" stroke="#a8741a" stroke-width="5"/><rect x="168" y="-196" width="62" height="196" rx="14" fill="#f0c860" stroke="#a8741a" stroke-width="5"/>`+
  `<rect x="-250" y="0" width="500" height="26" rx="6" fill="#ffdc78" stroke="#a8741a" stroke-width="4"/></g>`;

/* --- hell: dim slate mist, rock walls, five soft voice-lights (no fire, nothing scary) --- */
const HELL_SKY=()=>skyBand([[0,'#0a0c18'],[.5,'#1c1c30'],[1,'#30283c']])+A('pulse:7',GL(270,470,260,'#6a6a98',.18));
const ROCKWALL=()=>`<path d="M-20 -20 L120 -20 Q70 180 130 360 Q60 520 110 700 Q60 880 90 1000 L-20 1000Z" fill="#06060e"/><path d="M560 -20 L420 -20 Q480 160 410 340 Q490 520 430 700 Q480 880 450 1000 L560 1000Z" fill="#06060e"/><path d="M120 -20 Q170 120 270 40 Q380 130 420 -20Z" fill="#080810"/>`;
const HELLFLOOR=(y)=>`<path d="M-20 ${y} Q270 ${y-26} 560 ${y-4} L560 1000 L-20 1000Z" fill="#14121e"/><path d="M-20 ${y+60} Q270 ${y+30} 560 ${y+50} L560 1000 L-20 1000Z" fill="#0c0b14"/>`;
const MISTBANK=(y,op,per)=>A(`drift:80:0:${per}`,`<ellipse cx="90" cy="${y}" rx="230" ry="38" fill="#8c90b4" opacity="${op}"/><ellipse cx="430" cy="${y+36}" rx="250" ry="42" fill="#8c90b4" opacity="${op*.9}"/>`);
const VOICE=(x,y,d)=>A(`fadein:${d}:.7`,A('pulse:'+(2.2+(x%5)*.2).toFixed(1),GL(x,y,46,'#ffe3a0',.7))+A('ripple:3.2:'+x+':'+y,`<circle cx="${x}" cy="${y}" r="70" fill="none" stroke="#ffe3a0" stroke-width="2.5"/>`));

/* --- costume tweaks --- */
const VYAS_W={head:'jata2', hair:'none', beard:'white', beardLen:1, top:'#e8a43a', bottom:'#e8a43a', sash:'#f4e8c8', mala:['#7a4a22','#a8743c','#7a4a22'], rudra:'#7a4a22', ash:true, aura:'gw', skin:'#8a5a3c', jewel:false, trim:null};
const YUDH_FREE={head:'none', hair:'bun'};     // Yudhishthira after giving the crown away
const PARIKSHIT={head:'crown', hair:'none', aura:'gw', bottom:'#e5b324', sash:'#c8442a', garland:'#fff3c4', tilak:true};
const CHILD={s:.62};

/* the same framing for every fall: tiny gentle push, travellers walk uphill to the right, the fallen person lies toward the left */
const FALLX=332, FALLY=888, FALLS=.9;
const FALLSHOT=(o)=>Object.assign({ line:o.line, dur:o.dur||3.0,  scene:'mp-fall', mood:'sad', tr:'cut', fx:'dust',
  cam:{keys:[[0,270,520,1.0],[o.dur||3.0,270,505,1.07]]}, capTop:130, ...SNOW(),
  front:()=>LIGHTOUT(FALLX-70,FALLY-140,(o.at||.8)+.5,o.light),
  cast:[
    {c:YUDHISHTHIRA, with:YUDH_FREE, x:420, y:842, s:.74, expr:'sad', acts:[[0,'stand']]},
    {c:o.who, with:o.with, x:FALLX, y:FALLY, s:FALLS, expr:o.expr||'sad', acts:[[0,o.pose||'stand']], lie:{deg:-86, at:o.at||.8, dur:.7, from:0}, exit:{at:(o.at||.8)+1.2, fade:.7}}],
  }, o.extra||{});

const SIL={skin:'#10101c', top:'#10101c', bottom:'#10101c', shin:'#10101c', foot:'#10101c', sash:'#10101c', cape:'#10101c', pads:'#10101c', belt:'#10101c', garland:null, mala:null, pallu:'#10101c', hair:'long', trim:null, jewel:false, earring:false, bangles:[], aura:null, bindi:false, nose:false};

/* ---------- the story ---------- */
VIDEO({
  title:'महाप्रस्थान: युधिष्ठिर और श्वान', format:'short', target:72,
  keywords:['युधिष्ठिर','श्वान','धर्म','द्रौपदी','सहदेव','नकुल','अर्जुन','भीम','इंद्र','दुर्योधन','नरक','स्वर्ग','परीक्षा','परीक्षित','वेद','व्यास'],
  music:'scenes', sfx:true, minShot:1.6, ending:2.4,
  shots:[
    /* 1 — the picture everything leads to: Indra at the gate of heaven, Yudhishthira and the dog (spoken first line only; no hook text) */
    { line:'श्री कृष्ण के देहांत के बाद,', scene:'mp-gate', mood:'divine', fx:'sparks', capTop:130,
      cam:{keys:[[0,270,560,1.0],[1.6,270,548,1.07]]},
      sky:HEAVEN_SKY, far:()=>SUNRAYS(270,360,.12)+GOLDCLOUDS(true), mid:()=>GATE(270,830,.92), art:()=>BANK(930,6,'#fff3d0',.95,1.9,0), near:()=>A('drift:90:0:16',BANK(1000,4,'#ffffff',.55,2.0,0)),
      cast:[
        {c:INDRA, x:150, y:870, s:.94, expr:'calm', acts:[[0,'stand'],[.5,'offer',.6]]},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:350, y:884, s:.98, expr:'serene', acts:[[0,'stand'],[.8,'namaste',.5]]}],
      front:()=>shwan(458,892,.82,{flip:true,up:true}) },

    /* 2 — Arjuna reaches Vyas at a lilac dawn ashram */
    { line:'अर्जुन वेद व्यास के पास गए।', scene:'mp-ashram', mood:'calm', tr:'glow', capTop:130,
      cam:{keys:[[0,270,620,1.12],[1.6,270,640,1.02]]},
      sky:LILAC_SKY, far:SUNHILLS, mid:()=>TREE(70,800,1.0,'#8fa878','#a8bc8a')+TREE(480,790,.9,'#8fa878','#a8bc8a')+ashramHut(420,812,.7)+RIVER(790), art:()=>MEADOW(850),
      cast:[
        {c:ARJUNA, x:150, y:900, s:1.02, expr:'sad', acts:[[0,'stand'],[.8,'namaste+bowHead',.5]], walk:{from:-150,dur:.9}},
        {c:RISHI, with:VYAS_W, x:380, y:892, s:1.02, flip:true, expr:'serene', acts:[[0,'stand'],[.6,'bless',.5]]}] },

    /* 3 — Vyas speaks (close-up), then Arjuna's face as he hears it */
    { line:'उन्होंने अर्जुन से कहा कि पृथ्वी पर पांडवों का कार्य पूरा हो चुका है', scene:'mp-ashram', mood:'calm', capTop:130, tr:'cut',
      cam:{keys:[[0,378,598,1.9],[1.8,386,594,2.1],[1.9,168,624,1.9,'snap'],[3.3,168,618,2.05]]},
      sky:LILAC_SKY, far:SUNHILLS, mid:()=>TREE(70,800,1.0,'#8fa878','#a8bc8a')+TREE(480,790,.9,'#8fa878','#a8bc8a')+RIVER(790), art:()=>MEADOW(850),
      cast:[
        {c:ARJUNA, x:150, y:900, s:1.02, expr:'sad', acts:[[0,'namaste+bowHead'],[2.3,'lookUp',.5]]},
        {c:RISHI, with:VYAS_W, x:380, y:892, s:1.02, flip:true, expr:'serene', talk:true, acts:[[0,'explain',.5],[1.4,'bless',.5]]}] },

    /* 4 — "time to depart": Arjuna alone, sad; a sunrise glow grows behind him */
    { line:'और अब प्रस्थान करने का समय आ गया है।', scene:'mp-ashram', mood:'sad', capTop:130, tr:'dip', fx:'dust',
      cam:{keys:[[0,270,610,1.9],[1.9,270,600,1.55]]},
      sky:LILAC_SKY, far:()=>A('fadein:0:2',GL(300,640,360,'#fff0c0',.55))+SUNHILLS(), mid:()=>TREE(60,800,1.0,'#8fa878','#a8bc8a')+RIVER(790), art:()=>MEADOW(850),
      cast:[{c:ARJUNA, x:270, y:900, s:1.08, expr:'sad', acts:[[0,'lookDown'],[.8,'stand',.5],[1.3,'lookUp',.5]]}] },

    /* 5 — the crown passes: Yudhishthira in the sunlit court gives the crown to little Parikshit (one shot, two pictures) */
    { line:'इसलिए युधिष्ठिर ने अर्जुन के पौत्र परीक्षित को हस्तिनापुर का राजा बना दिया।', scene:'mp-court', mood:'hope', tr:'iris', fx:'sparks', capTop:130,
      cam:{keys:[[0,270,610,1.75],[1.7,270,590,1.9],[1.85,300,760,1.3,'snap'],[3.5,300,730,1.05]]},
      sky:COURT_SKY, far:()=>ARCHES(800), mid:()=>BANNER(60,380,'#c8442a')+BANNER(480,380,'#e5b324'), art:()=>COURTFLOOR(800)+DAIS(330,880,1.0),
      cast:[
        {c:YUDHISHTHIRA, x:200, y:880, s:1.12, expr:'serene', acts:[[0,'stand'],[.7,'offer',.6]], exit:{at:1.5, fade:.3}},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:190, y:884, s:1.0, expr:'serene', enter:{fade:.3, delay:1.5}, acts:[[0,'stand'],[2.4,'bless',.6]]},
        {c:NANDI, with:PARIKSHIT, x:330, y:830, s:.7, expr:'smile', enter:{fade:.5, delay:1.8}, acts:[[0,'stand'],[2.8,'namaste',.5]]}] },

    /* 6 — five brothers + Draupadi leave: a six-figure line walking out of the sunlit court into the dawn */
    { line:'पाँचों भाई और द्रौपदी सब कुछ पीछे छोड़कर निकल पड़े,', scene:'mp-march', mood:'calm', tr:'wipe', fx:'dust', capTop:130,
      cam:{keys:[[0,270,560,1.0],[2.5,270,540,1.12]]},
      sky:LILAC_SKY, far:SUNHILLS, mid:()=>TREE(40,820,.9,'#8fa878','#a8bc8a')+TREE(500,812,.8,'#8fa878','#a8bc8a'), art:()=>MEADOW(840)+`<path d="M-20 900 Q270 860 560 880" stroke="#d8c8a0" stroke-width="22" fill="none" opacity=".6"/>`,
      cast:[
        {c:DRAUPADI, x:60, y:900, s:.5, expr:'sad', walk:{from:-120,dur:1.5}, acts:[[0,'stand']]},
        {c:SAHADEVA, x:150, y:900, s:.5, expr:'calm', walk:{from:-120,dur:1.5,delay:.1}, acts:[[0,'stand']]},
        {c:NAKULA, x:240, y:900, s:.5, expr:'calm', walk:{from:-120,dur:1.5,delay:.2}, acts:[[0,'stand']]},
        {c:ARJUNA, x:330, y:900, s:.5, expr:'calm', walk:{from:-120,dur:1.5,delay:.3}, acts:[[0,'stand']]},
        {c:BHIMA, x:420, y:900, s:.52, expr:'calm', walk:{from:-120,dur:1.5,delay:.4}, acts:[[0,'stand']]},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:500, y:900, s:.54, expr:'serene', walk:{from:-120,dur:1.5,delay:.5}, acts:[[0,'stand']]}] },

    /* 7 — a dog starts to follow Yudhishthira up the snow path (the first snow shot) */
    { line:'और एक श्वान उनके पीछे-पीछे चलने लगा।', scene:'mp-climb', mood:'calm', tr:'dissolve', fx:'dust', capTop:130, ...SNOW(),
      cam:{keys:[[0,150,820,1.9],[1.0,200,800,1.7],[1.8,270,540,1.05]]},
      front:()=>A('walk:230:1.7:0',shwan(40,918,.95,{walk:true})),
      cast:[
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:360, y:880, s:.98, expr:'calm', acts:[[0,'stand']]},
        {c:BHIMA, x:470, y:858, s:.74, expr:'calm', acts:[[0,'stand']]}] },

    /* 8 — wide: the line of travellers tiny against the great peaks, dawn sun */
    { line:'पर्वतों को पार करते समय', scene:'mp-climb', mood:'calm', tr:'glow', fx:'dust', capTop:130, ...SNOW(),
      cam:{keys:[[0,270,500,1.0],[1.6,300,460,1.2]]},
      cast:[
        {c:DRAUPADI, x:90, y:860, s:.34, walk:{from:-60,dur:1.2}, acts:[[0,'stand']]},
        {c:SAHADEVA, x:150, y:850, s:.34, walk:{from:-60,dur:1.2}, acts:[[0,'stand']]},
        {c:NAKULA, x:210, y:842, s:.34, walk:{from:-60,dur:1.2}, acts:[[0,'stand']]},
        {c:ARJUNA, x:270, y:834, s:.34, walk:{from:-60,dur:1.2}, acts:[[0,'stand']]},
        {c:BHIMA, x:330, y:826, s:.36, walk:{from:-60,dur:1.2}, acts:[[0,'stand']]},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:395, y:818, s:.36, walk:{from:-60,dur:1.2}, acts:[[0,'stand']]}],
      front:()=>shwan(430,822,.3,{walk:true}) },

    /* 9 — FALL 1: Draupadi */
    FALLSHOT({ line:'सबसे पहले द्रौपदी गिर पड़ीं।', who:DRAUPADI, light:'#bcd4ff', at:1.2 }),

    /* 10 — Bhima turns and asks; cut to Yudhishthira's calm answer */
    { line:'भीम के कारण पूछने पर युधिष्ठिर ने बताया कि', scene:'mp-climb', mood:'sad', tr:'cut', fx:'dust', capTop:130, ...SNOW(),
      cam:{keys:[[0,250,640,1.9],[1.1,250,634,2.0],[1.2,380,640,1.9,'snap'],[2.2,380,634,2.05]]},
      cast:[
        {c:BHIMA, x:240, y:884, s:1.05, expr:'surprise', talk:true, acts:[[0,'lookBack'],[.7,'plead',.4]]},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:420, y:884, s:1.0, flip:true, expr:'sad', talk:true, acts:[[0,'stand'],[1.4,'explain',.5]]}] },

    /* 11 — the reason: Draupadi's soft blue light and a gold light for Arjuna drawn together over the snow */
    { line:'वह अपने अन्य पतियों की तुलना में अर्जुन से अधिक प्रेम करती थीं।', scene:'mp-climb', mood:'sad', tr:'dissolve', capTop:130, ...SNOW(),
      cam:{keys:[[0,380,630,1.8],[1.4,380,626,1.9],[1.5,270,520,1.2,'spring'],[3.1,270,500,1.35]]},
      front:()=>A('fadein:1.5:.6',GL(190,610,70,'#bcd4ff',.8)+GL(350,610,56,'#ffe3a0',.7))+A('fadein:2.0:.6',`<path d="M190 610 Q270 540 350 610" fill="none" stroke="#ffe9c0" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round" opacity=".9"/>`),
      cast:[{c:YUDHISHTHIRA, with:YUDH_FREE, x:380, y:884, s:1.0, flip:true, expr:'sad', talk:true, acts:[[0,'explain'],[1.4,'lookDown',.5]]}] },

    /* 12 — FALL 2: Sahadeva (pride in his wisdom; the line starts while he still stands, proud) */
    FALLSHOT({ line:'इसके बाद स्वयं को सबसे बुद्धिमान समझने के कारण सहदेव गिर पड़े,', who:SAHADEVA, light:'#e0c8ff', expr:'calm', pose:'hip', dur:4.4, at:2.9 }),

    /* 13 — FALL 3: Nakula */
    FALLSHOT({ line:'स्वयं को सबसे सुंदर मानने के कारण नकुल,', who:NAKULA, light:'#c8ffd8', expr:'calm', pose:'hip', at:1.5 }),

    /* 14 — Arjuna's pride: a proud close-up, the bow he is known for, a single gold arrow of light */
    { line:'और एक ही दिन में हर शत्रु को हराने का घमंड करने के कारण', scene:'mp-climb', mood:'sad', tr:'cut', capTop:130, ...SNOW(),
      cam:{keys:[[0,300,640,1.7],[1.8,300,632,2.0],[2.3,270,540,1.1,'spring'],[2.8,270,520,1.15]]},
      cast:[
        {c:ARJUNA, x:300, y:884, s:1.05, expr:'calm', talk:true, acts:[[0,'heroic'],[1.8,'lookDown',.5]], props:{front:'bow'}},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:470, y:850, s:.6, expr:'sad', acts:[[0,'stand']]}] },

    /* 15 — FALL 4: Arjuna */
    FALLSHOT({ line:'अर्जुन भी गिर पड़े।', who:ARJUNA, light:'#ffe3a0', expr:'sad', at:.8 }),

    /* 16 — Bhima's pride and hunger: proud, big, a plate of light (a bowl) he loves */
    { line:'अंत में अपने अभिमान और भोजन के प्रति अत्यधिक लगाव के कारण', scene:'mp-climb', mood:'sad', tr:'cut', capTop:130, ...SNOW(),
      cam:{keys:[[0,280,640,1.7],[1.8,280,632,1.95],[2.3,270,540,1.1,'spring'],[2.8,270,520,1.15]]},
      cast:[
        {c:BHIMA, x:280, y:884, s:1.1, expr:'calm', talk:true, acts:[[0,'heroic'],[1.8,'lookDown',.5]], props:{front:'gada'}},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:470, y:850, s:.6, expr:'sad', acts:[[0,'stand']]}] },

    /* 17 — FALL 5: Bhima */
    FALLSHOT({ line:'भीम भी गिर पड़े,', who:BHIMA, light:'#ffd0a0', expr:'sad', at:.8 }),

    /* 18 — alone: Yudhishthira and the dog on the snow, camera pulls back; lonely and calm */
    { line:'और केवल युधिष्ठिर व वह श्वान ही बचे रहे।', scene:'mp-climb', mood:'sad', tr:'dissolve', fx:'dust', capTop:130, ...SNOW(),
      cam:{keys:[[0,270,640,1.7],[1.2,270,560,1.2],[2.0,270,500,1.0]]},
      front:()=>shwan(150,904,.95,{up:true}),
      cast:[{c:YUDHISHTHIRA, with:YUDH_FREE, x:270, y:884, s:1.02, expr:'sad', acts:[[0,'stand'],[1.4,'lookDown',.5]]}] },

    /* 19 — Indra descends on golden clouds with a hand held out */
    { line:'इंद्र ने युधिष्ठिर को स्वर्ग ले जाने का प्रस्ताव दिया,', scene:'mp-clouds', mood:'divine', tr:'glow', fx:'sparks', capTop:130,
      cam:{keys:[[0,270,880,1.3],[2.6,270,560,1.0]]},
      sky:GOLDSKY, far:()=>SUNRAYS(270,300,.14)+GOLDCLOUDS(true), mid:()=>GOLDCLOUDS(false), art:()=>BANK(940,6,'#fff6dc',.95,2.0,0), near:()=>A('drift:80:0:15',BANK(1000,4,'#ffffff',.6,2.0,10)),
      cast:[
        {c:INDRA, x:160, y:900, s:1.0, expr:'smile', talk:true, enter:{fade:.4, delay:.1, rise:-80}, acts:[[0,'bless'],[1.2,'offer',.6]]},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:390, y:910, s:.95, flip:true, expr:'serene', acts:[[0,'stand']]}],
      front:()=>shwan(480,918,.76,{flip:true,up:true}) },

    /* 20 — FACE close-up: Yudhishthira refuses to leave the dog */
    { line:'लेकिन उन्होंने उस श्वान को छोड़ने से', dur:2.4, scene:'mp-dog', mood:'calm', tr:'cut', capTop:130,
      cam:{keys:[[0,260,598,2.0],[1.2,262,596,2.35],[2.4,262,596,2.5]]},
      sky:GOLDSKY, far:()=>GOLDCLOUDS(true), art:()=>BANK(950,6,'#fff6dc',.95,2.0,0),
      cast:[{c:YUDHISHTHIRA, with:YUDH_FREE, x:260, y:880, s:1.1, expr:'serene', talk:true, acts:[[0,'stand'],[.7,'plead',.5],[1.7,'lookDown',.5]]}],
      front:()=>shwan(370,930,.7,{flip:true,up:true}) },

    /* 21 — he says no: Indra's hand opens beside him, Yudhishthira steps to the dog, the dog starts to shine */
    { line:'इनकार कर दिया—जो वास्तव में', dur:2.0, scene:'mp-dog', mood:'divine', tr:'cut', capTop:130, fx:'sparks',
      cam:{keys:[[0,270,700,1.45],[2.0,300,780,1.25]]},
      sky:GOLDSKY, far:()=>GOLDCLOUDS(true), art:()=>BANK(950,6,'#fff6dc',.95,2.0,0),
      cast:[
        {c:INDRA, x:110, y:900, s:.9, expr:'surprise', acts:[[0,'offer'],[.8,'shock',.4]]},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:340, y:900, s:1.0, flip:true, expr:'serene', acts:[[0,'stand'],[.7,'hold',.4]]}],
      front:()=>shwan(450,914,.82,{flip:true,up:true})+A('fadein:.7:1.2',shwan(450,914,.82,{flip:true,up:true,gold:true,glow:.7})) },

    /* 22 — THE moment: the dog turns into golden Dharma, his father; Yudhishthira bows */
    { line:'स्वयं धर्म, यानी उनके पिता थे।', dur:3.2, scene:'mp-dharma', mood:'divine', tr:'flash', fx:'sparks', capTop:130,
      focus:{at:.1, sound:'revive', dur:3.6, duck:.25},
      cam:{keys:[[0,380,700,1.5],[1.0,300,610,1.3,'spring'],[3.2,300,590,1.0]]},
      sky:GOLDSKY, far:()=>SUNRAYS(380,640,.2), art:()=>BANK(950,6,'#fff6dc',.95,2.0,0),
      mid:()=>A('fadeout:.4:.7',shwan(400,914,.9,{flip:true,gold:true,glow:1})),
      cast:[
        {c:DHARMA, x:400, y:914, s:1.14, expr:'serene', enter:{fade:.7, delay:.4, rise:40}, acts:[[0,'bless']]},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:170, y:900, s:1.0, expr:'smile', acts:[[0,'stand'],[1.4,'pranam',.6]]}],
      front:()=>BURST(400,700,0) },

    /* 23 — bright heaven: Yudhishthira walks in and looks for his brothers */
    { line:'स्वर्ग पहुँचने पर उन्हें अपने भाई नहीं बल्कि', scene:'mp-heaven', mood:'hope', tr:'glow', fx:'sparks', capTop:130,
      cam:{keys:[[0,270,560,1.0],[2.2,270,600,1.12]]},
      sky:HEAVEN_SKY, far:()=>SUNRAYS(270,380,.12)+GOLDCLOUDS(true), mid:()=>GOLDCLOUDS(false), art:()=>BANK(930,6,'#fff3d0',.95,1.9,0),
      cast:[{c:YUDHISHTHIRA, with:YUDH_FREE, x:270, y:890, s:1.02, expr:'surprise', walk:{from:-170,dur:1.0}, acts:[[0,'stand'],[1.1,'lookL',.4],[1.7,'lookR',.4]]}] },

    /* 24 — Duryodhan on a heaven throne, proud */
    { line:'दुर्योधन मिला।', dur:2.2, scene:'mp-throne', mood:'shock', tr:'whip', capTop:130,
      cam:{keys:[[0,270,700,1.0],[2.2,270,650,1.3]]},
      sky:HEAVEN_SKY, far:()=>SUNRAYS(270,300,.12)+GOLDCLOUDS(true), mid:()=>THRONE_BACK(270,880), art:()=>BANK(950,6,'#fff3d0',.95,1.9,0),
      cast:[{c:DURYODHAN, x:270, y:900, s:1.08, expr:'angry', acts:[[0,'heroic'],[1.2,'hip',.5]], props:{front:'gada'}}],
      front:()=>THRONE_FRONT(270,930) },

    /* 25 — he searches: walking through golden clouds, calling; the light dims at the edges */
    { line:'अपने भाइयों को खोजने पर', scene:'mp-heaven', mood:'calm', tr:'cut', capTop:130,
      cam:{keys:[[0,270,610,1.35],[1.6,270,590,1.0]]},
      sky:HEAVEN_SKY, far:()=>SUNRAYS(270,380,.1)+GOLDCLOUDS(true), mid:()=>GOLDCLOUDS(false), art:()=>BANK(930,6,'#fff3d0',.95,1.9,0),
      cast:[{c:YUDHISHTHIRA, with:YUDH_FREE, x:270, y:890, s:1.05, expr:'sad', acts:[[0,'lookL'],[.6,'lookR',.4],[1.1,'lookUp',.4]]}] },

    /* 26 — HELL: dim, misty, shadowy. Five soft voice-lights call from the dark (no fire, nothing scary) */
    { line:'उन्हें नरक से उनकी आवाज़ें सुनाई दीं,', scene:'mp-hell', mood:'shock', tr:'dip', capTop:130,
      cam:{keys:[[0,270,640,1.0],[1.9,270,620,1.12]]},
      sky:HELL_SKY, far:()=>ROCKWALL()+MISTBANK(520,.18,18), art:()=>HELLFLOOR(850),
      cast:[
        {c:DRAUPADI, with:SIL, x:70, y:830, s:.62, enter:{fade:.6, delay:.2}, acts:[[0,'stand']]},
        {c:ARJUNA, with:SIL, x:150, y:850, s:.7, enter:{fade:.6, delay:.4}, acts:[[0,'stand']]},
        {c:BHIMA, with:SIL, x:410, y:850, s:.7, enter:{fade:.6, delay:.6}, acts:[[0,'stand']]},
        {c:NAKULA, with:SIL, x:480, y:830, s:.62, enter:{fade:.6, delay:.8}, acts:[[0,'stand']]},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:270, y:900, s:1.05, expr:'surprise', acts:[[0,'stand'],[.4,'lookL',.4],[1.1,'lookR',.4]]}],
      front:()=>MISTBANK(760,.34,14)+VOICE(70,590,.2)+VOICE(150,570,.4)+VOICE(410,570,.6)+VOICE(480,590,.8)+VOICE(270,430,1.0)+MISTBANK(930,.4,20) },

    /* 27 — he decides to stay: close-up, steady and resolved */
    { line:'और उन्होंने वहीं रुकने का निर्णय लिया।', scene:'mp-hell', mood:'sad', tr:'cut', capTop:130,
      cam:{keys:[[0,270,610,1.7],[1.9,270,602,2.15]]},
      sky:HELL_SKY, far:()=>ROCKWALL()+MISTBANK(520,.18,18), art:()=>HELLFLOOR(850),
      front:()=>MISTBANK(930,.4,20)+VOICE(60,560,.2)+VOICE(480,560,.4),
      cast:[{c:YUDHISHTHIRA, with:YUDH_FREE, x:270, y:900, s:1.1, expr:'serene', acts:[[0,'lookL'],[.6,'stand',.5],[1.3,'namaste',.5]]}] },

    /* 28 — the vision lifts: a wave of golden light sweeps the mist away */
    { line:'तभी वह दृश्य गायब हो गया—यह', dur:2.2, scene:'mp-test', mood:'divine', tr:'flash', fx:'sparks', capTop:130,
      sfx:[[.1,'shimmer',.5]],
      cam:{keys:[[0,270,610,1.5],[2.2,270,600,1.12]]},
      sky:HELL_SKY, far:()=>ROCKWALL(), art:()=>HELLFLOOR(850)+A('fadein:.1:1.0',`<rect x="-20" y="-20" width="600" height="1040" fill="#fff0c8"/>`),
      front:()=>A('fadeout:.3:1.0',MISTBANK(760,.45,12))+A('fadein:.4:1.0',SUNRAYS(270,520,.2)+GL(270,520,260,'#fff6d0',.6)),
      cast:[{c:YUDHISHTHIRA, with:YUDH_FREE, x:270, y:900, s:1.05, expr:'surprise', acts:[[0,'namaste'],[1.1,'lookUp',.6]]}] },

    /* 29 — "a test": face close-up, the smile of understanding */
    { line:'एक और परीक्षा थी,', dur:2.2, scene:'mp-test', mood:'hope', tr:'cut', capTop:130, fx:'sparks',
      cam:{keys:[[0,270,596,2.2],[2.2,270,590,2.55]]},
      sky:HEAVEN_SKY, far:()=>SUNRAYS(270,380,.16)+GOLDCLOUDS(true), art:()=>BANK(950,6,'#fff3d0',.95,2.0,0),
      cast:[{c:YUDHISHTHIRA, with:YUDH_FREE, x:270, y:880, s:1.1, expr:'smile', acts:[[0,'lookUp'],[1.0,'stand',.6]]}] },

    /* 30 — the first picture again (same framing, same people), so the video loops */
    { line:'और उनका पूरा परिवार स्वर्ग में ही था।', scene:'mp-gate', mood:'divine', tr:'glow', fx:'sparks', capTop:130,
      cam:{keys:[[0,270,548,1.07],[1.9,270,560,1.0]]},
      sky:HEAVEN_SKY, far:()=>SUNRAYS(270,360,.12)+GOLDCLOUDS(true), mid:()=>GATE(270,830,.92), art:()=>BANK(930,6,'#fff3d0',.95,1.9,0), near:()=>A('drift:90:0:16',BANK(1000,4,'#ffffff',.55,2.0,0)),
      cast:[
        {c:INDRA, x:150, y:870, s:.94, expr:'calm', acts:[[0,'offer']]},
        {c:YUDHISHTHIRA, with:YUDH_FREE, x:350, y:884, s:.98, expr:'serene', acts:[[0,'namaste']]}],
      front:()=>shwan(458,892,.82,{flip:true,up:true}) }
  ]
});
