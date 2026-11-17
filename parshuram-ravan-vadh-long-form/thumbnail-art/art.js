/* Hand-drawn (in code) YouTube thumbnail: "Why Didn't Parshuram Kill Ravan?"  1280x720.
   node parshuram-ravan-vadh-long-form/thumbnail-art/render.js   ->  ../thumbnail.png */

const rnd = (()=>{let s=7;return()=>{s=(s*16807)%2147483647;return s/2147483647}})();

/* ---------- one Ravan head (local coords, centre 0,0, ~90 wide) ---------- */
function ravanHead({shout=false, glow=1}={}){
  return `
  <g>
    <!-- hair behind -->
    <path d="M-44,-30 C-58,0 -52,40 -34,62 C-30,30 -34,0 -30,-24 Z" fill="#120708"/>
    <path d="M44,-30 C56,0 52,40 34,62 C30,30 34,0 30,-24 Z" fill="#120708"/>
    <!-- ear + earring -->
    <ellipse cx="-42" cy="4" rx="8" ry="14" fill="url(#ravSkinD)"/>
    <circle cx="-44" cy="24" r="6" fill="url(#gold)" stroke="#5a3200" stroke-width="1.5"/>
    <ellipse cx="42" cy="4" rx="8" ry="14" fill="url(#ravSkinD)"/>
    <!-- face -->
    <path d="M-40,-24 C-42,-56 -20,-68 4,-68 C32,-68 48,-46 46,-14 C45,18 34,44 10,56 C-14,60 -32,42 -38,16 Z" fill="url(#ravSkin)" stroke="#1a0606" stroke-width="2.5"/>
    <!-- cheek highlight -->
    <path d="M-30,-10 C-24,10 -18,30 -4,44" stroke="#a5604a" stroke-width="5" fill="none" opacity=".35" stroke-linecap="round"/>
    <!-- forehead markings -->
    <path d="M-20,-48 Q2,-56 24,-48" stroke="#e9d9c8" stroke-width="3" fill="none" opacity=".85"/>
    <path d="M-18,-40 Q2,-47 22,-40" stroke="#e9d9c8" stroke-width="3" fill="none" opacity=".85"/>
    <!-- brows -->
    <path d="M-34,-28 L-4,-12 L-6,-22 L-32,-38 Z" fill="#0d0405"/>
    <path d="M40,-30 L10,-12 L12,-22 L38,-40 Z" fill="#0d0405"/>
    <!-- eyes -->
    <path d="M-30,-14 Q-18,-24 -6,-10 Q-18,-4 -30,-14 Z" fill="#fff4e0"/>
    <circle cx="-15" cy="-13" r="4.6" fill="#b3120f"/><circle cx="-15" cy="-13" r="2.2" fill="#140303"/>
    <path d="M36,-16 Q24,-26 10,-10 Q24,-4 36,-16 Z" fill="#fff4e0"/>
    <circle cx="21" cy="-14" r="4.6" fill="#b3120f"/><circle cx="21" cy="-14" r="2.2" fill="#140303"/>
    <!-- nose -->
    <path d="M2,-10 C-2,8 -6,16 -10,22 C0,28 12,26 16,20" stroke="#2a0c0a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <!-- moustache -->
    <path d="M-36,28 C-24,16 -8,24 2,26 C12,24 28,16 40,26 C30,40 14,38 2,34 C-10,38 -26,40 -36,28 Z" fill="#0d0405"/>
    <!-- mouth -->
    ${shout?`<path d="M-18,38 Q2,34 22,38 Q18,62 2,64 Q-14,60 -18,38 Z" fill="#4a0508" stroke="#150303" stroke-width="2"/>
      <path d="M-12,39 L-8,48 L-4,39 Z M12,39 L8,48 L4,39 Z" fill="#fff4e0"/>
      <ellipse cx="2" cy="56" rx="9" ry="5" fill="#b3202a"/>`:
     `<path d="M-16,40 Q2,50 20,40 Q2,44 -16,40 Z" fill="#1a0505"/>
      <path d="M-10,41 L-6,48 L-2,42 Z M8,42 L12,48 L16,41 Z" fill="#fff4e0"/>`}
    <!-- beard -->
    <path d="M-30,50 C-20,66 -8,74 2,76 C14,74 26,66 34,50 C20,58 -14,58 -30,50 Z" fill="#0d0405"/>
    <!-- crown -->
    <path d="M-48,-44 L-50,-96 L-32,-70 L-20,-112 L-4,-76 L8,-120 L20,-76 L34,-108 L42,-70 L54,-92 L52,-42 C20,-52 -20,-52 -48,-44 Z" fill="url(#gold)" stroke="#4a2800" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M-48,-44 C-20,-52 20,-52 52,-42 L52,-52 C20,-62 -20,-62 -48,-54 Z" fill="url(#goldDark)" stroke="#4a2800" stroke-width="2"/>
    <circle cx="2" cy="-54" r="6" fill="#e02020" stroke="#4a0000" stroke-width="1.5"/>
    <circle cx="-26" cy="-52" r="4" fill="#20c8b0" stroke="#064a40" stroke-width="1.2"/>
    <circle cx="30" cy="-50" r="4" fill="#20c8b0" stroke="#064a40" stroke-width="1.2"/>
    <circle cx="-12" cy="-90" r="3.4" fill="#20c8b0"/><circle cx="8" cy="-98" r="3.6" fill="#e02020"/><circle cx="26" cy="-88" r="3.4" fill="#20c8b0"/>
    <path d="M-44,-60 L-46,-88 M-18,-76 L-18,-104" stroke="#fff3b0" stroke-width="3" opacity=".6" stroke-linecap="round"/>
  </g>`;
}

/* ---------- defs ---------- */
const defs = `
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1b0206"/><stop offset=".3" stop-color="#5e0710"/>
    <stop offset=".62" stop-color="#b3200f"/><stop offset=".82" stop-color="#e8561a"/><stop offset="1" stop-color="#ffa23a"/>
  </linearGradient>
  <radialGradient id="hot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd27a" stop-opacity=".95"/><stop offset=".45" stop-color="#ff7a24" stop-opacity=".5"/><stop offset="1" stop-color="#ff4a10" stop-opacity="0"/></radialGradient>
  <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".72"/></radialGradient>
  <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a2a14"/><stop offset=".4" stop-color="#3a140c"/><stop offset="1" stop-color="#150605"/></linearGradient>
  <linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3c0a12"/><stop offset="1" stop-color="#7a1a14"/></linearGradient>

  <linearGradient id="skin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a5a34"/><stop offset=".45" stop-color="#e29a62"/><stop offset=".8" stop-color="#c47a46"/><stop offset="1" stop-color="#8a4a28"/></linearGradient>
  <linearGradient id="skinV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0b078"/><stop offset="1" stop-color="#b86c3c"/></linearGradient>
  <linearGradient id="ravSkin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a4a3a"/><stop offset=".5" stop-color="#5e2c26"/><stop offset="1" stop-color="#3a1618"/></linearGradient>
  <linearGradient id="ravSkinD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5e2c26"/><stop offset="1" stop-color="#2a0e10"/></linearGradient>
  <linearGradient id="ravBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a3c30"/><stop offset=".6" stop-color="#4a1e1c"/><stop offset="1" stop-color="#26090d"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a0"/><stop offset=".35" stop-color="#ffc83a"/><stop offset=".75" stop-color="#d98a12"/><stop offset="1" stop-color="#a85a08"/></linearGradient>
  <linearGradient id="goldDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a826"/><stop offset="1" stop-color="#8a4a06"/></linearGradient>
  <linearGradient id="dhoti" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb23a"/><stop offset=".5" stop-color="#f27a12"/><stop offset="1" stop-color="#b8480a"/></linearGradient>
  <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#c9d0dc"/><stop offset=".7" stop-color="#7a8696"/><stop offset="1" stop-color="#454e5e"/></linearGradient>
  <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8743a"/><stop offset=".5" stop-color="#7a4018"/><stop offset="1" stop-color="#4a220c"/></linearGradient>
  <linearGradient id="armor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a5f72"/><stop offset=".5" stop-color="#2a2d3c"/><stop offset="1" stop-color="#10111a"/></linearGradient>
  <linearGradient id="crimson" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e03030"/><stop offset=".6" stop-color="#a0121c"/><stop offset="1" stop-color="#5a060e"/></linearGradient>
  <linearGradient id="titleGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbd0"/><stop offset=".3" stop-color="#ffe45a"/><stop offset=".62" stop-color="#ffb818"/><stop offset="1" stop-color="#e06a08"/></linearGradient>
  <linearGradient id="titleWhite" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#ffe9c8"/><stop offset="1" stop-color="#ffc47a"/></linearGradient>

  <filter id="blur6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="blur14" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="blur30" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="30"/></filter>
  <filter id="rim" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ff9a3a" flood-opacity=".6"/>
    <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity=".6"/>
  </filter>
  <filter id="bolt" x="-100%" y="-30%" width="300%" height="160%">
    <feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="txtGlow" x="-20%" y="-30%" width="140%" height="160%">
    <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#ff8a1a" flood-opacity=".7"/>
  </filter>
</defs>`;

/* ---------- background ---------- */
function background(){
  let s = `<rect width="1280" height="720" fill="url(#sky)"/>`;
  // big hot glow behind the heroes
  s += `<ellipse cx="640" cy="520" rx="640" ry="260" fill="url(#hot)" opacity=".85"/>`;
  s += `<ellipse cx="250" cy="380" rx="260" ry="320" fill="url(#hot)" opacity=".5"/>`;
  // storm clouds
  for(const [x,y,rx,ry,c,o] of [[200,60,300,60,'#12010a',.8],[700,40,380,50,'#1a020a',.75],[1120,90,300,70,'#12010a',.8],[500,170,260,36,'#3a050c',.5],[950,200,300,40,'#3a050c',.5]])
    s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}" opacity="${o}" filter="url(#blur30)"/>`;
  // mountains
  s += `<path d="M0,470 L0,330 L70,290 L130,330 L200,250 L290,350 L360,320 L430,420 L520,470 Z" fill="url(#mtn)" opacity=".95"/>`;
  s += `<path d="M1280,470 L1280,300 L1210,250 L1150,310 L1070,240 L990,340 L930,320 L860,430 L780,470 Z" fill="url(#mtn)" opacity=".95"/>`;
  s += `<path d="M380,480 L470,400 L560,455 L650,410 L760,470 L820,480 Z" fill="#4a0e14" opacity=".7"/>`;
  // lightning (jagged, glowing)
  const bolt = (pts,w,col='#ffe9e0') => `<g filter="url(#bolt)"><polyline points="${pts}" fill="none" stroke="#ff2a2a" stroke-width="${w*2.6}" opacity=".55" stroke-linejoin="round"/><polyline points="${pts}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/></g>`;
  s += bolt('40,0 70,70 40,92 92,176 62,196 120,300',5);
  s += bolt('92,176 140,190 130,214 176,250',3);
  s += bolt('1240,10 1200,90 1228,108 1176,200 1204,214 1150,310',5);
  s += bolt('1176,200 1128,222 1138,240 1092,290',3);
  s += bolt('585,0 560,60 584,70 556,140',3.5,'#ffd8c8');
  // ground
  s += `<path d="M0,600 C200,570 380,590 640,580 C900,590 1080,570 1280,598 L1280,720 L0,720 Z" fill="url(#ground)"/>`;
  s += `<path d="M0,600 C200,570 380,590 640,580 C900,590 1080,570 1280,598" stroke="#ff8a3a" stroke-width="3" fill="none" opacity=".5" filter="url(#blur6)"/>`;
  // ground cracks glow
  s += `<g stroke="#ff7a24" stroke-width="3" fill="none" opacity=".75" filter="url(#blur6)"><path d="M520,700 L600,650 L680,668 L760,630"/><path d="M600,650 L590,610"/></g>`;
  // rocks
  for(const [x,y,w,h] of [[30,690,110,50],[330,705,90,40],[560,712,120,36],[1130,700,130,46],[1210,676,90,50]])
    s += `<path d="M${x},${y} L${x+w*.2},${y-h} L${x+w*.7},${y-h*.8} L${x+w},${y} Z" fill="#26100c" stroke="#5a2a1a" stroke-width="2"/>`;
  return s;
}

function dust(){
  let s='';
  for(const [x,y,rx,ry,o] of [[60,650,200,70,.75],[430,700,170,45,.55],[760,690,200,50,.45],[1150,650,220,80,.7],[980,712,200,40,.5]])
    s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#e89a58" opacity="${o}" filter="url(#blur30)"/>`;
  return s;
}

function embers(){
  let s='';
  for(let i=0;i<110;i++){
    const x=rnd()*1280, y=130+rnd()*560, r=.8+rnd()*2.8;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${rnd()>.5?'#ffb640':'#ff7a2a'}" opacity="${(.4+rnd()*.6).toFixed(2)}"/>`;
  }
  return s;
}

/* ---------- Parshuram ---------- */
function parshuram(){
  return `
  <g filter="url(#rim)">
    <!-- back leg (viewer left) -->
    <path d="M170,520 C138,580 150,610 104,664 L80,694 L118,710 L150,692 C176,664 214,650 226,624 C246,596 258,570 262,540 Z" fill="url(#skin)"/>
    <path d="M70,690 L150,700 L158,716 L60,712 Z" fill="#3a1a0a"/>
    <path d="M150,616 C170,630 196,630 214,612" stroke="#ffd8a8" stroke-width="4" fill="none" opacity=".4"/><path d="M110,664 C128,658 150,656 170,660" stroke="url(#gold)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <!-- front leg (viewer right) -->
    <path d="M312,545 C304,590 330,630 334,696 L398,700 C396,660 416,620 396,570 C392,556 390,548 386,540 Z" fill="url(#skin)"/>
    <path d="M326,690 L408,696 L414,716 L322,714 Z" fill="#3a1a0a"/>
    <path d="M334,668 L396,668" stroke="url(#gold)" stroke-width="7" stroke-linecap="round"/>
    <path d="M330,590 C350,610 372,610 390,590" stroke="#7a3e1c" stroke-width="3.5" fill="none" opacity=".5"/><path d="M345,560 C345,610 352,650 350,690" stroke="#fff0c8" stroke-width="3" opacity=".35" fill="none"/>

    <!-- dhoti -->
    <path d="M196,396 C168,470 146,538 176,598 C200,580 222,586 250,578 C268,596 300,614 330,596 C378,580 396,558 386,524 C378,470 352,430 322,394 Z" fill="url(#dhoti)" stroke="#6a2a06" stroke-width="2.5"/>
    <path d="M232,420 C226,480 214,530 222,576 M278,412 C280,470 272,520 290,596 M326,420 C332,470 346,510 352,560" stroke="#8a3a08" stroke-width="3" fill="none" opacity=".6"/>
    <path d="M206,430 C196,480 184,520 186,560" stroke="#ffe0a0" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/>
    <!-- waist band + knot -->
    <path d="M190,380 L330,376 L328,412 L194,416 Z" fill="url(#gold)" stroke="#6a3a00" stroke-width="2.5"/>
    <path d="M200,390 L322,388" stroke="#fff6c0" stroke-width="3" opacity=".7"/>
    <path d="M300,410 C318,450 344,470 352,512 L326,508 C318,470 296,450 286,414 Z" fill="url(#dhoti)" stroke="#6a2a06" stroke-width="2"/>

    <!-- torso -->
    <path d="M184,278 C174,330 192,372 210,388 L330,384 C350,350 380,316 390,272 C352,226 228,224 184,278 Z" fill="url(#skin)"/>
    <!-- chest + ab shading -->
    <path d="M232,290 C250,322 282,324 296,290" stroke="#7a3e1c" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>
    <path d="M214,300 C230,320 250,324 262,312" stroke="#ffd2a0" stroke-width="3" fill="none" opacity=".45"/>
    <path d="M280,330 L282,380 M256,336 C262,350 262,364 258,380 M302,336 C304,354 306,368 304,382" stroke="#7a3e1c" stroke-width="3" fill="none" opacity=".55"/>
    <path d="M250,346 L316,342 M252,364 L316,360" stroke="#7a3e1c" stroke-width="3" opacity=".45"/>
    <!-- sash across chest -->
    <path d="M200,262 L246,236 L368,372 L326,396 Z" fill="#f4dfa8" stroke="url(#gold)" stroke-width="5" stroke-linejoin="round"/>
    <path d="M214,270 L252,248 L350,362" stroke="#d8a85a" stroke-width="2.5" fill="none" opacity=".7"/>
    <!-- rudraksha mala -->
    <path d="M232,238 C240,300 290,330 332,300" stroke="#2a1008" stroke-width="9" fill="none" stroke-dasharray="1 8.5" stroke-linecap="round"/>
    <path d="M232,238 C240,300 290,330 332,300" stroke="#7a4a2a" stroke-width="4" fill="none" stroke-dasharray="1 12.5" stroke-linecap="round" opacity=".7"/>

    <!-- lower arm (viewer left) -->
    <path d="M206,262 C174,276 164,318 168,352 C170,384 178,404 192,418 L228,404 C222,380 224,352 232,320 C238,296 242,282 240,262 Z" fill="url(#skin)"/>
    <path d="M178,300 C188,296 200,298 214,306" stroke="#ffd8a8" stroke-width="3.5" fill="none" opacity=".5" stroke-linecap="round"/>
    <path d="M168,322 L214,330" stroke="url(#gold)" stroke-width="10" stroke-linecap="round"/>
    <path d="M184,396 C176,408 180,428 198,436 C216,438 230,424 226,404 Z" fill="url(#skin)" stroke="#7a3e1c" stroke-width="2"/>
    <path d="M190,410 L222,410 M192,420 L224,420" stroke="#7a3e1c" stroke-width="2.4" opacity=".7"/>

    <!-- raised arm (viewer right) holding axe: upper arm out, forearm up -->
    <path d="M346,238 C392,222 440,212 474,224 C490,250 480,276 452,288 C412,298 372,300 344,290 Z" fill="url(#skin)"/>
    <path d="M430,244 C424,200 408,150 396,114 L442,106 C456,150 474,200 490,240 C478,272 440,270 430,244 Z" fill="url(#skin)"/>
    <ellipse cx="462" cy="256" rx="30" ry="32" fill="url(#skin)"/>
    <path d="M366,246 C400,232 436,226 462,236" stroke="#ffd8a8" stroke-width="5" fill="none" opacity=".55" stroke-linecap="round"/>
    <path d="M410,150 C420,180 434,206 450,226" stroke="#ffd8a8" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/>
    <path d="M364,288 C400,292 432,288 452,284 M440,262 C452,270 468,268 480,256" stroke="#7a3e1c" stroke-width="3.5" fill="none" opacity=".6"/>
    <path d="M404,224 L412,290" stroke="url(#gold)" stroke-width="13" stroke-linecap="round"/>
    <path d="M410,160 L452,150" stroke="url(#gold)" stroke-width="9" stroke-linecap="round"/>
  </g>

  <!-- axe (drawn above arm for the grip) -->
  <g filter="url(#rim)">
    <path d="M226,168 L548,44" stroke="#2a1006" stroke-width="22" stroke-linecap="round"/>
    <path d="M226,168 L548,44" stroke="url(#wood)" stroke-width="16" stroke-linecap="round"/>
    <path d="M230,160 L544,38" stroke="#e8a468" stroke-width="3" opacity=".6" stroke-linecap="round"/>
    <circle cx="222" cy="170" r="14" fill="url(#gold)" stroke="#4a2800" stroke-width="3"/>
    <path d="M214,148 L196,176 L226,184 Z" fill="url(#steel)" stroke="#2a2a30" stroke-width="2"/>
    <!-- gold bands -->
    <path d="M470,70 L482,100 M498,60 L508,88" stroke="url(#gold)" stroke-width="9" stroke-linecap="round"/>
    <!-- blade -->
    <path d="M508,46 C520,-4 596,-14 640,28 C660,84 626,148 566,176 C580,128 560,92 520,80 Z" fill="url(#steel)" stroke="#16161c" stroke-width="4" stroke-linejoin="round"/>
    <path d="M530,40 C560,8 606,8 628,36" stroke="#fff" stroke-width="5" fill="none" opacity=".9" stroke-linecap="round"/>
    <path d="M628,50 C640,92 616,134 574,158" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>
    <path d="M520,62 C540,70 556,84 562,106" stroke="#445" stroke-width="3" fill="none" opacity=".6"/>
    <path d="M506,56 L534,52 L546,92 L514,98 Z" fill="url(#gold)" stroke="#4a2800" stroke-width="2.5"/>
  </g>
  <!-- gripping fist -->
  <g>
    <path d="M382,98 C392,82 424,76 438,90 C450,104 442,124 424,128 C402,130 380,120 382,98 Z" fill="url(#skin)" stroke="#6a3416" stroke-width="2.5"/>
    <path d="M394,92 L394,118 M406,88 L406,122 M418,90 L418,124" stroke="#6a3416" stroke-width="2.4" opacity=".7"/>
  </g>

  <!-- head -->
  <g filter="url(#rim)">
    <!-- long hair behind -->
    <path d="M238,132 C192,140 164,196 150,290 C148,330 156,360 170,380 C176,330 196,296 222,262 C234,236 238,200 244,170 Z" fill="#0c0a12"/>
    <path d="M210,150 C186,190 176,250 172,322" stroke="#39345a" stroke-width="3" fill="none" opacity=".7"/>
    <path d="M226,160 C204,210 196,260 188,330" stroke="#39345a" stroke-width="2.5" fill="none" opacity=".6"/>
    <!-- neck -->
    <path d="M254,196 L256,240 C268,252 300,252 314,238 L310,196 Z" fill="url(#skin)"/>
    <path d="M256,226 C270,238 296,238 310,226" stroke="#7a3e1c" stroke-width="3" fill="none" opacity=".5"/>
    <!-- top-knot -->
    <ellipse cx="258" cy="100" rx="32" ry="38" fill="#0c0a12" stroke="#000" stroke-width="2"/>
    <path d="M228,86 Q258,74 288,86 M226,104 Q258,92 290,104 M230,122 Q258,112 286,122" stroke="#f08a2a" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M234,70 C244,58 262,54 276,62" stroke="#4a4478" stroke-width="3" fill="none" opacity=".8" stroke-linecap="round"/>
    <!-- ear + earring -->
    <ellipse cx="238" cy="172" rx="9" ry="15" fill="url(#skin)" stroke="#7a3e1c" stroke-width="2"/>
    <circle cx="238" cy="192" r="7" fill="url(#gold)" stroke="#4a2800" stroke-width="2"/>
    <!-- face -->
    <path d="M238,144 C238,124 258,114 280,118 C302,122 314,146 312,172 C310,196 296,218 274,226 C254,226 242,204 238,176 Z" fill="url(#skin)" stroke="#6a3416" stroke-width="2.5"/>
    <path d="M300,140 C308,160 306,186 296,206" stroke="#ffd8a8" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/>
    <!-- forehead ash lines + tilak -->
    <path d="M254,134 Q276,126 300,136 M252,142 Q276,134 302,144" stroke="#f4efe8" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cx="278" cy="132" r="3.6" fill="#c0201a"/>
    <!-- brows -->
    <path d="M254,152 L284,162 L282,154 L252,142 Z" fill="#0c0a12"/>
    <path d="M292,158 L314,148 L312,142 L290,150 Z" fill="#0c0a12"/>
    <!-- eyes (looking right) -->
    <path d="M258,162 Q270,154 282,164 Q270,170 258,162 Z" fill="#fff4e8"/>
    <circle cx="276" cy="163" r="4.4" fill="#2a1408"/><circle cx="277" cy="162" r="1.5" fill="#fff"/>
    <path d="M294,162 Q304,154 314,160 Q304,168 294,162 Z" fill="#fff4e8"/>
    <circle cx="309" cy="161" r="3.8" fill="#2a1408"/>
    <!-- nose -->
    <path d="M288,168 C284,184 282,192 288,198 C296,200 304,198 308,192" stroke="#8a4a24" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- beard + moustache -->
    <path d="M238,186 C232,226 246,274 270,330 C290,300 306,262 312,214 C312,196 308,184 304,176 C300,206 290,226 272,230 C254,226 244,208 238,186 Z" fill="#0c0a12" stroke="#000" stroke-width="2"/>
    <path d="M246,262 C256,250 262,240 266,226 M280,300 C292,276 302,246 304,222" stroke="#39345a" stroke-width="2.4" fill="none" opacity=".8"/>
    <path d="M258,200 C272,190 292,196 310,194 C306,208 290,214 276,210 C268,214 260,210 258,200 Z" fill="#0c0a12"/>
    <path d="M268,214 Q282,222 296,212" stroke="#a02a22" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
  </g>
  `;
}

/* ---------- Ravan ---------- */
function ravan(){
  // fan of nine extra heads behind the main one
  const cx=905, cy=470, R=150;
  const angles=[-92,-70,-48,-26,-4,18,40,62,84];   // degrees, 0 = up? (we use polar below)
  let heads='';
  const spec=[ // [dx,dy,rot,scale]
    [-150,-30,-62,.5],[-120,-92,-42,.56],[-70,-132,-22,.6],[-8,-150,-3,.62],[56,-142,16,.6],[112,-108,34,.58],[150,-56,52,.54],[170,2,68,.5],[-168,30,-76,.46]
  ];
  for(const [dx,dy,rot,sc] of spec.sort((a,b)=>Math.abs(b[2])-Math.abs(a[2])))
    heads += `<g transform="translate(${cx+dx},${cy+dy}) rotate(${rot}) scale(${sc})" style="filter:brightness(.78)">${ravanHead({})}</g>`;
  return `
  <g filter="url(#rim)">
    <!-- far arm propped on ground (viewer right) -->
    <path d="M990,545 C1040,566 1070,610 1076,664 L1032,672 C1024,628 1000,596 962,584 Z" fill="url(#ravBody)"/>
    <path d="M1030,640 L1086,650 L1092,690 L1030,692 Z" fill="url(#ravBody)" stroke="#1a0606" stroke-width="2"/>
    <path d="M1020,600 L1070,622" stroke="url(#gold)" stroke-width="12" stroke-linecap="round"/>

    <!-- legs stretched (toward viewer left), crimson dhoti -->
    <path d="M900,590 C860,616 800,632 740,652 L700,690 L760,704 C820,690 880,676 940,660 Z" fill="url(#crimson)" stroke="#2a0408" stroke-width="3"/>
    <path d="M880,610 C840,630 800,640 760,660" stroke="url(#gold)" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M690,688 L772,690 L778,716 L676,716 Z" fill="url(#gold)" stroke="#3a2000" stroke-width="2.5"/>
    <path d="M940,590 C1000,616 1030,660 1000,690 L920,700 L880,640 Z" fill="url(#crimson)" stroke="#2a0408" stroke-width="3"/>
    <path d="M930,606 C976,626 996,656 976,684" stroke="#ff8a7a" stroke-width="4" fill="none" opacity=".4"/>
  </g>

  <!-- extra heads fan (behind main body) -->
  <g filter="url(#rim)">${heads}</g>

  <g filter="url(#rim)">
    <!-- torso leaning back -->
    <path d="M838,520 C830,470 860,430 910,424 C966,420 1004,452 1008,510 C1010,560 990,596 950,612 L880,606 C850,592 842,556 838,520 Z" fill="url(#ravBody)" stroke="#1a0606" stroke-width="3"/>
    <!-- armour breastplate -->
    <path d="M852,500 C856,456 890,444 912,444 C950,444 984,462 992,500 C990,540 968,572 930,584 C890,582 858,548 852,500 Z" fill="url(#armor)" stroke="#d9a431" stroke-width="4"/>
    <path d="M870,480 C890,470 940,468 976,490" stroke="#8a90a8" stroke-width="3" fill="none" opacity=".7"/>
    <path d="M912,452 L914,580" stroke="#d9a431" stroke-width="3" opacity=".8"/>
    <circle cx="914" cy="512" r="15" fill="url(#gold)" stroke="#4a2800" stroke-width="3"/><circle cx="914" cy="512" r="6" fill="#e02020"/>
    <!-- crimson sash -->
    <path d="M846,470 L890,436 L1002,566 L952,606 Z" fill="url(#crimson)" stroke="url(#gold)" stroke-width="4" opacity=".95"/>
    <path d="M870,476 L896,452 L976,552" stroke="#ff9a8a" stroke-width="3" fill="none" opacity=".55"/>
    <!-- gold belt -->
    <path d="M870,580 L960,596 L956,624 L866,608 Z" fill="url(#gold)" stroke="#4a2800" stroke-width="3"/>
    <!-- pauldrons -->
    <path d="M826,484 C812,452 846,420 886,430 L880,470 Z" fill="url(#gold)" stroke="#4a2800" stroke-width="3"/>
    <path d="M990,450 C1020,430 1060,452 1052,494 L1004,490 Z" fill="url(#gold)" stroke="#4a2800" stroke-width="3"/>
    <!-- near arm: raised, open palm toward Parshuram -->
    <path d="M838,500 C800,500 770,470 752,432 L792,414 C806,444 826,458 850,462 Z" fill="url(#ravBody)" stroke="#1a0606" stroke-width="3"/>
    <path d="M782,440 L822,462" stroke="url(#gold)" stroke-width="14" stroke-linecap="round"/>
    <!-- open hand -->
    <path d="M740,436 C730,414 726,390 730,372 L746,376 L750,406 L758,366 L774,368 L772,404 L784,372 L798,378 L788,414 L806,392 L816,402 L792,436 C780,450 754,452 740,436 Z" fill="url(#ravBody)" stroke="#1a0606" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M744,382 L750,404 M762,376 L766,404 M786,382 L780,410" stroke="#2a0c0a" stroke-width="2" opacity=".7"/>
  </g>

  <!-- main head (in front), shouting -->
  <g filter="url(#rim)">
    <g transform="translate(905,390) rotate(-8) scale(1.08)">${ravanHead({shout:true})}</g>
    <!-- neck link -->
  </g>

  <!-- fallen things: broken sword + crowns on the ground -->
  <g filter="url(#rim)">
    <g transform="translate(620,690) rotate(-8)">
      <path d="M0,0 L130,-14 L140,-4 L130,8 L0,10 Z" fill="url(#steel)" stroke="#16161c" stroke-width="3"/>
      <path d="M0,-6 L128,-14" stroke="#fff" stroke-width="2" opacity=".8"/>
      <path d="M-34,-8 L2,-8 L2,12 L-34,12 Z" fill="url(#gold)" stroke="#4a2800" stroke-width="2.5"/>
    </g>
    <g transform="translate(1110,700) rotate(14) scale(.55)">
      <path d="M-48,-44 L-50,-96 L-32,-70 L-20,-112 L-4,-76 L8,-120 L20,-76 L34,-108 L42,-70 L54,-92 L52,-42 C20,-52 -20,-52 -48,-44 Z" fill="url(#gold)" stroke="#4a2800" stroke-width="4"/>
    </g>
    <g transform="translate(1215,690) rotate(-22) scale(.5)">
      <path d="M-48,-44 L-50,-96 L-32,-70 L-20,-112 L-4,-76 L8,-120 L20,-76 L34,-108 L42,-70 L54,-92 L52,-42 C20,-52 -20,-52 -48,-44 Z" fill="url(#gold)" stroke="#4a2800" stroke-width="4"/>
    </g>
  </g>`;
}

/* ---------- title ---------- */
function title(){
  const f = "font-family:'TiroTitle','Tiro Devanagari Hindi',serif;font-style:italic";
  // fake bold: wide stroke in the fill colour; fake italic through skewX
  const line=(txt,x,y,size,fill,skew=-10,extra=0)=>{
    const t = `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" style="${f}" transform="skewX(${skew})">${txt}</text>`;
    return `<g transform="translate(${-y*Math.tan(skew*Math.PI/180)*-0},0)">
      <g filter="url(#txtGlow)">
        ${[10,9,8,7,6,5,4].map(d=>`<text x="${x+d*.9}" y="${y+d*1.1}" text-anchor="middle" font-size="${size}" style="${f}" transform="skewX(${skew})" fill="#5a1200" stroke="#5a1200" stroke-width="${size*.1+extra}" stroke-linejoin="round">${txt}</text>`).join('')}
        <text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" style="${f}" transform="skewX(${skew})" fill="#1c0300" stroke="#1c0300" stroke-width="${size*.19+extra}" stroke-linejoin="round">${txt}</text>
        <text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" style="${f}" transform="skewX(${skew})" fill="${fill}" stroke="${fill}" stroke-width="${size*.045+extra}" stroke-linejoin="round">${txt}</text>
        <text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" style="${f}" transform="skewX(${skew})" fill="none" stroke="#fff" stroke-width="1.6" opacity=".55">${txt}</text>
      </g></g>`;
  };
  // skewX shifts x by -y*tan(skew); compensate so text stays centred where we ask
  const comp=(y,skew)=> y*Math.tan(skew*Math.PI/180);
  const L=(txt,cx,y,size,fill)=>line(txt,cx+comp(y,-10),y,size,fill);
  const bar = (x1,x2,y)=>`<g filter="url(#blur6)" opacity=".8"><path d="M${x1},${y} L${x2},${y}" stroke="#ff2a1a" stroke-width="7"/></g><path d="M${x1},${y} L${x2},${y}" stroke="#ff4a30" stroke-width="5" stroke-linecap="round"/><path d="M${x1},${y-1} L${x2},${y-1}" stroke="#ffd0b0" stroke-width="1.5" opacity=".7"/>`;
  return `
    ${L("Why Didn’t",900,100,84,'url(#titleWhite)')}
    ${L("Parshuram",908,212,128,'url(#titleGold)')}
    ${L("Kill Ravan?",900,312,100,'url(#titleGold)')}
  `;
}

module.exports = function art(){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  ${defs}
  ${background()}
  ${dust()}
  <g transform="translate(115,82) scale(.88)">${ravan()}</g>
  ${parshuram()}
  <g opacity=".9">${embers()}</g>
  <rect width="1280" height="720" fill="url(#vig)"/>
  ${title()}
  </svg>`;
};
