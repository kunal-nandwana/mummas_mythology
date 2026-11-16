/* नंदी के कान में मन्नत — Short, about 120 s. Words come exactly from my-script.md (long lines are split over several shots).
   Build: node tools/build.js nandi-kaan-mannat-short-form
   No intro, no hook text, no end card. Music: scene sound library.
   Story places: Shiv temple at dusk -> ashram -> forest river bank at dawn -> back to the temple.
   New this video: NANDI boy preset, nandiBull / nandiBack / whisperTrail / shivling / sanctum / river + ashram pieces (engine/scenes.js). */

/* ---------- temple (dusk, saffron + marigold) ---------- */
const TSKY = () => `<rect width="540" height="960" fill="url(#skyDusk)"/>` + stars(34, 380) + `<circle cx="430" cy="470" r="300" fill="url(#saf)" opacity=".28"/>`;
const TFAR = () => shikhara(430, 650, 200, 330, '#2e1a28', '#d08a3a') + shikhara(70, 700, 120, 190, '#26162a', '#a8683a') + `<rect y="640" width="540" height="140" fill="#25131f"/><rect y="600" width="540" height="60" fill="url(#fogW)" opacity=".7"/>`;
const TMID = () => sanctum(430, 800, .82) + marigoldString(260, 600, 540, 580, 12, 14) + marigoldString(0, 590, 220, 612, 14, 11) + diyaRow(250, 380, 806, 3, 1.1);
const TFLOOR = () => `<path d="M0 800 L540 800 L540 1000 L0 1000Z" fill="#33222a"/><rect y="798" width="540" height="6" fill="#d9a04a" opacity=".6"/>` +
  [...Array(7)].map((_, i) => `<line x1="${270 + (i - 3) * 30}" y1="804" x2="${270 + (i - 3) * 150}" y2="1000" stroke="#4a3038" stroke-width="2"/>`).join('') + `<ellipse cx="300" cy="860" rx="260" ry="60" fill="url(#saf)" opacity=".2"/>`;
const NANDI_AT = (x, s, o) => nandiBull(x, 800, s || .82, o);
const TNEAR = () => diyaRow(30, 130, 930, 2, 1.8) + diyaRow(410, 510, 940, 2, 1.7);
const TEMPLE = (o) => { o = o || {}; return { sky: o.sky || TSKY, far: o.far || TFAR, mid: () => (o.pillars ? PILLARS() : '') + TMID() + (o.crowd ? CROWD() : ''), art: () => TFLOOR() + (o.nandi === false ? '' : NANDI_AT(o.nx || 170, o.ns || .82, o.bull)) + (o.extra ? o.extra() : ''), near: o.near === false ? undefined : TNEAR }; };

/* variants so the temple never looks the same twice: moonlit night, golden morning, lamp-lit inside; small far-away devotees; stone pillars */
const FIG = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><circle cx="0" cy="-96" r="11"/><path d="M-16 0 L-12 -80 Q0 -90 12 -80 L16 0Z"/></g>`;
const CROWD = () => FIG(30, 796, 1.0, '#1b0f19') + FIG(64, 800, .9, '#241420') + FIG(330, 796, .95, '#1b0f19') + FIG(352, 799, .85, '#241420');
const PILLARS = () => [8, 532].map(x => `<rect x="${x - 20}" y="520" width="40" height="290" fill="#2a1a24"/><rect x="${x - 28}" y="508" width="56" height="18" fill="#3a2430"/><rect x="${x - 26}" y="800" width="52" height="12" fill="#3a2430"/>`).join('');
const MOONSKY = () => skyBand([[0, '#0b0f2e'], [.55, '#2e2a5a'], [1, '#c9826a']]) + stars(50, 380) + moon(110, 190, 34);
const EVESKY = () => skyBand([[0, '#2a1830'], [.6, '#9a4a3a'], [1, '#f0a050']]);
const MORNSKY = () => `<rect width="540" height="960" fill="url(#skyDawn)"/><circle cx="90" cy="600" r="260" fill="url(#gw)" opacity=".6"/>`;
const MORNFAR = () => shikhara(430, 650, 200, 330, '#b07a4a', '#ffd890') + shikhara(70, 700, 120, 190, '#9a6a4a', '#f0c070') + `<rect y="640" width="540" height="140" fill="#6a4a3a"/><rect y="600" width="540" height="60" fill="url(#fogW)" opacity=".8"/>`;
const INTSKY = () => `<rect width="540" height="960" fill="#2a1626"/><circle cx="430" cy="700" r="320" fill="url(#saf)" opacity=".3"/>`;
const INTFAR = () => [0, 1, 2, 3].map(i => `<path d="M${i * 150 - 20} 800 V540 Q${i * 150 + 55} 440 ${i * 150 + 130} 540 V800Z" fill="#3d2434"/>`).join('');
const COMMON = { c: VILLAGER, with: { top: '#e9e2cf', bottom: '#efe9da', turban: '#9a3a1e', sash: '#9a3a1e' } };   // an ordinary village man (replaces the lady devotee)

/* ---------- ashram (golden afternoon) ---------- */
const ASH_SKY = () => `<rect width="540" height="960" fill="url(#skyDawn)"/><circle cx="400" cy="520" r="200" fill="url(#gw)" opacity=".6"/>`;
const ASH_FAR = () => hills(640, 46, '#7a5a4a', 120) + [...Array(8)].map((_, i) => `<rect x="${i * 74 + 8}" y="560" width="8" height="120" fill="#4a3a2a"/><ellipse cx="${i * 74 + 12}" cy="552" rx="42" ry="32" fill="#5a7a3a"/>`).join('') + `<rect y="600" width="540" height="70" fill="url(#fogW)"/>`;
const ASH_MID = () => ashramHut(150, 800, 1.2) + `<g transform="translate(420 800)"><rect x="-4" y="-150" width="8" height="150" fill="#5a3a22"/><ellipse cx="0" cy="-160" rx="54" ry="46" fill="#4a8a3a"/><ellipse cx="20" cy="-176" rx="40" ry="30" fill="#5a9a44"/></g>`;
const ASH_GND = () => ground(800, '#7a5a34', '#c8a060') + tufts(790, '#4a7a30', 40) + flowers(800, 10);

/* ---------- Himalaya (calm, blue-white with a golden glow) ---------- */
const HIM_SKY = () => skyBand([[0, '#101a3a'], [.5, '#3a4a7a'], [.85, '#b89aa8'], [1, '#f2c89a']]) + stars(40, 320);
const HIM_FAR = () => `<path d="M-20 700 L90 420 L170 560 L260 360 L370 560 L440 470 L560 700Z" fill="#8a9cc8"/><path d="M90 420 L60 480 L100 470 L120 500 L140 470 L170 560 L130 520 L90 440Z M260 360 L225 430 L262 420 L290 450 L322 420 L370 560 L300 450Z" fill="#f4f6ff" opacity=".9"/><rect y="640" width="540" height="90" fill="url(#fog)"/>`;
const HIM_GND = () => `<path d="M0 800 Q270 770 540 800 L540 1000 L0 1000Z" fill="#dfe6f6"/><path d="M0 800 Q270 770 540 800" fill="none" stroke="#fff" stroke-width="3"/><ellipse cx="270" cy="830" rx="150" ry="14" fill="#8a5a2a"/><ellipse cx="270" cy="826" rx="130" ry="9" fill="#d09a3a"/>`;

/* ---------- forest river bank, dawn ---------- */
const RIV_SKY = () => riverSky();
const RIV_FAR = () => riverFar();
const RIV_GND = () => riverBank(800);
const LIGHTSHAFTS = () => [...Array(5)].map((_, i) => A('pulse:' + (.3 + i * .08).toFixed(2), `<path d="M${60 + i * 100} 0 L${150 + i * 100} 0 L${40 + i * 100} 800 L${-30 + i * 100} 800Z" fill="#fff6d0" opacity=".1"/>`)).join('');

/* ---------- characters ---------- */
const SHILAD = { c: RISHI, with: { top: '#e6b050', bottom: '#e6b050', garland: '#6a3c1a', sash: '#f6f1e4' } };
const MITRA = { c: RISHI, with: { top: '#efe9da', bottom: '#efe9da', big: true, skin: '#9a6a4a', garland: '#f0e6d0', sash: '#c98a2e' } };
const VARUN = { c: RISHI, with: { top: '#a8461e', bottom: '#a8461e', beard: 'black', skin: '#7a4e34', head: 'turban', turban: '#efe9da', sash: '#e5b324' } };
const PETAL = (x, y, d) => A('drift:30:200:5.5', `<path transform="translate(${x} ${y}) rotate(25)" d="M0 -8 Q7 -2 0 9 Q-7 -2 0 -8Z" fill="#ffd2d8"/><circle cx="${x}" cy="${y}" r="16" fill="url(#gw)" opacity=".5"/>`);

VIDEO({
  title: 'नंदी के कान में मन्नत', format: 'short', target: 135,
  music: 'scenes',
  handheld: .4,
  keywords: ['नंदी', 'शिव मंदिर', 'महादेव', 'शिलाद', 'मित्र', 'वरुण', 'शिव पुराण', 'वरदान', 'गणाध्यक्ष', 'द्वारपाल', 'शिवलिंग', 'मन्नत', 'कान', 'हर हर महादेव'],
  shots: [
    /* 1 — a child's-eye start: low among the diyas, the camera rises and pulls back; a devotee whispers to Nandi */
    { line: 'क्या आपने कभी शिव मंदिर में किसी भक्त को नंदी के पास झुककर उनके कान में धीरे से कुछ फुसफुसाते हुए देखा है?', scene: 'temple-dusk', mood: 'calm', fx: 'dust', capTop: 330,
      cam: { keys: [[0, 270, 720, 1.2], [3, 270, 660, 1.1], [5.7, 270, 640, 1.0]] },
      ...TEMPLE({ nx: 200, ns: .8, crowd: true, pillars: true }),
      cast: [{ ...COMMON, x: 215, y: 812, s: .72, expr: 'serene', acts: [[0, 'stand'], [1.0, 'pranam', .9]] }] },

    /* 2 — the whisper close-up (must-have): the devotee at Nandi's ear */
    { line: 'वह अपनी मनोकामना महादेव तक पहुँचाना चाहता है,', scene: 'whisper-closeup', mood: 'calm', fx: 'dust', capTop: 150, tr: 'fade',
      cam: { keys: [[0, 270, 690, 1.15], [2.5, 285, 680, 1.25]] },
      ...TEMPLE({ nx: 220, ns: .9, sky: MOONSKY, crowd: true }),
      cast: [{ ...COMMON, x: 240, y: 830, s: .72, expr: 'serene', talk: true, eyes: 'closed', acts: [[0, 'pranam']] }] },

    /* 3 — Nandi stares ahead at the Shivling (the whisper goes in; he does not move) */
    { line: 'और नंदी—जिनके कान में वह अपनी बात कह रहा है—चुपचाप सामने स्थित शिवलिंग की ओर एकटक देख रहे होते हैं।', scene: 'nandi-gaze', mood: 'calm', fx: 'dust', capTop: 170, tr: 'fade',
      cam: { keys: [[0, 230, 700, 1.15], [3, 270, 700, 1.08], [5.2, 330, 700, 1.0]] },
      ...TEMPLE({ nx: 190, ns: .85, pillars: true }),
      cast: [{ ...COMMON, x: 210, y: 830, s: .72, expr: 'serene', eyes: 'closed', acts: [[0, 'pranam'], [3.4, 'namaste', .8]] }],
      front: () => A('fadein:3:3', `<ellipse cx="430" cy="690" rx="90" ry="120" fill="url(#gw)" opacity=".35"/>`) },

    /* 4 — why? */
    { line: 'आखिर ऐसा क्यों होता है?', scene: 'temple-dusk', mood: 'calm', fx: 'embers', capTop: 130, tr: 'zoom',
      cam: { from: [270, 600, 1.15], to: [270, 700, 1.0] },
      sky: MOONSKY, far: () => shikhara(270, 780, 320, 600, '#2e1a28', '#d08a3a') + shikhara(60, 760, 110, 220, '#26162a', '#a8683a') + shikhara(490, 760, 110, 220, '#26162a', '#a8683a') + `<rect y="700" width="540" height="100" fill="url(#fogW)" opacity=".7"/>`,
      mid: () => marigoldString(0, 640, 540, 620, 26, 16), art: () => TFLOOR() + diyaRow(60, 480, 860, 7, 1.4) },

    /* 5 — begin the legend: soft glow, pull to the past */
    { line: 'इसे समझने के लिए नंदी के बचपन की इस पौराणिक कथा को सुनिए।', scene: 'legend-begins', mood: 'divine', fx: 'petals', capTop: 120, tr: 'glow',
      cam: { from: [270, 600, 1.05], to: [270, 540, 1.0] },
      sky: () => divine(270, 520, 'saf', '#ffd890'), far: () => hills(700, 40, '#4a2a3a', 130), art: () => ground(800, '#4a2a2a', '#c8903a') + diyaRow(120, 420, 830, 5, 1.4),
      mid: () => A('rise:30:1.6:.3', pothi(270, 560, 1.15)) },

    /* 6 — Shilad's severe tapasya in the forest, with a small fire */
    { line: 'शिव पुराण के अनुसार, महर्षि शिलाद ने संतान प्राप्ति के लिए वर्षों तक भगवान शिव की कठोर तपस्या की।', scene: 'shilad-tapasya', mood: 'calm', fx: 'dust', capTop: 330, tr: 'fade',
      cam: { from: [270, 600, 1.0], to: [260, 620, 1.08] },
      sky: ASH_SKY, far: ASH_FAR, mid: () => `<ellipse cx="270" cy="830" rx="150" ry="16" fill="#3a2410" opacity=".4"/>` + fire(380, 826, 1.6), art: ASH_GND,
      cast: [{ ...SHILAD, x: 210, y: 850, s: .85, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray']] }] },

    /* 7 — Mahadev blesses him with a son: boon of light only */
    { line: 'उनकी भक्ति से प्रसन्न होकर महादेव ने उन्हें एक पुत्र का वरदान दिया, जिनका नाम नंदी रखा गया।', scene: 'shiv-boon', mood: 'divine', fx: 'petals', capTop: 120, tr: 'glow',
      cam: { from: [300, 640, 1.0], to: [285, 620, 1.05] }, focus: { at: 1.4, sound: 'shimmer', dur: 2.4, duck: .45 },
      sky: () => divine(330, 560, 'gw'), far: () => hills(700, 40, '#4a3a5a', 130), art: ASH_GND,
      cast: [{ ...SHILAD, x: 130, y: 850, s: .85, expr: 'smile', acts: [[0, 'kneelPray']] },
             { c: SHIVA, x: 360, y: 860, s: .95, flip: true, expr: 'serene', acts: [[0, 'stand'], [1.2, 'bless', .8]], enter: { fade: 1.4, delay: .4 } },
             { c: NANDI, x: 250, y: 880, s: .45, expr: 'smile', acts: [[0, 'namaste']], enter: { fade: 1.6, delay: 2.4, rise: 20 } }] },

    /* 8 — the two rishis arrive when Nandi is seven */
    { line: 'जब नंदी सात वर्ष के हुए, तब मित्र और वरुण नामक दो ऋषि महर्षि शिलाद के आश्रम में पधारे।', scene: 'ashram-warm', mood: 'joy', fx: 'dust', capTop: 330, tr: 'wipe',
      cam: { from: [250, 620, 1.0], to: [270, 630, 1.03] },
      sky: ASH_SKY, far: ASH_FAR, mid: ASH_MID, art: ASH_GND,
      cast: [{ ...SHILAD, x: 190, y: 870, s: .82, flip: false, expr: 'smile', acts: [[0, 'stand'], [3, 'namaste', .8]] },
             { c: NANDI, x: 120, y: 880, s: .55, expr: 'smile', acts: [[0, 'stand']] },
             { ...MITRA, x: 360, y: 880, s: .84, flip: true, expr: 'serene', walk: { from: 240, dur: 3 }, acts: [[0, 'stand'], [3.2, 'namaste', .8]] },
             { ...VARUN, x: 470, y: 880, s: .78, flip: true, expr: 'serene', walk: { from: 250, dur: 3.2 }, acts: [[0, 'stand'], [3.4, 'namaste', .8]] }] },

    /* 9 — they bless everyone but Nandi (soft, no fear) */
    { line: 'जाते समय ऋषियों ने सभी को आशीर्वाद दिया, लेकिन नंदी को आशीर्वाद नहीं दिया।', scene: 'ashram-warm', mood: 'calm', fx: 'dust', capTop: 330, tr: 'fade',
      cam: { from: [300, 640, 1.0], to: [270, 640, 1.02] },
      sky: ASH_SKY, far: ASH_FAR, mid: ASH_MID, art: ASH_GND,
      cast: [{ ...MITRA, x: 340, y: 880, s: .84, flip: true, expr: 'serene', acts: [[0, 'bless']] },
             { ...VARUN, x: 450, y: 880, s: .78, flip: true, expr: 'serene', acts: [[0, 'stand'], [1, 'lookAway'], [2, 'stand']] },
             { ...SHILAD, x: 215, y: 870, s: .82, expr: 'smile', acts: [[0, 'namaste']] },
             { c: NANDI, x: 110, y: 880, s: .55, expr: 'calm', acts: [[0, 'stand'], [2.2, 'lookDown', .8]] }] },

    /* 10 — Shilad asks; the rishis answer with kind faces */
    { line: 'जब शिलाद ने इसका कारण पूछा, तो ऋषियों ने बताया कि नंदी की आयु बहुत कम है और उनके जीवन का केवल एक वर्ष ही शेष बचा है।', scene: 'prophecy-soft', mood: { base: 'calm', bri: .95, vig: .15 }, fx: 'dust', capTop: 330, tr: 'fade',
      cam: { from: [260, 630, 1.0], to: [300, 620, 1.1] },
      sky: EVESKY, far: ASH_FAR, mid: () => ASH_MID() + fire(40, 830, 1.0), art: ASH_GND,
      cast: [{ ...SHILAD, x: 190, y: 870, s: .84, expr: 'sad', acts: [[0, 'plead'], [4, 'grief', .8]] },
             { ...MITRA, x: 360, y: 880, s: .84, flip: true, expr: 'calm', talk: true, acts: [[0, 'explain']] },
             { ...VARUN, x: 470, y: 880, s: .78, flip: true, expr: 'sad', acts: [[0, 'stand'], [3, 'namaste', .8]] }],
      front: () => PETAL(300, 300) + PETAL(420, 380) },

    /* 11 — Shilad weeps (warm lamplight, one petal) */
    { line: 'यह सुनकर महर्षि शिलाद फूट-फूट कर रोने लगे।', scene: 'prophecy-soft', mood: { base: 'calm', bri: .95, vig: .15 }, capTop: 330, tr: 'fade',
      cam: { keys: [[0, 270, 650, 1.05], [4, 255, 630, 1.2]] },
      sky: MOONSKY, far: ASH_FAR, mid: ASH_MID, art: ASH_GND,
      cast: [{ ...SHILAD, x: 260, y: 880, s: .88, expr: 'sad', tears: true, acts: [[0, 'weep']] }],
      front: () => PETAL(150, 200) + PETAL(360, 260) },

    /* 12 — Nandi sees his father crying */
    { line: 'नंदी ने जब अपने पिता को रोते देखा तो कारण पूछा।', scene: 'ashram-soft', mood: { base: 'calm', bri: .95, vig: .15 }, capTop: 330, tr: 'fade',
      cam: { from: [270, 640, 1.0], to: [260, 650, 1.12] },
      sky: EVESKY, far: ASH_FAR, mid: () => ASH_MID() + fire(480, 830, .9), art: ASH_GND,
      cast: [{ c: NANDI, x: 150, y: 880, s: .7, expr: 'sad', talk: true, acts: [[0, 'stand'], [.6, 'lookUp', .6], [2.4, 'plead', .8]] },
             { ...SHILAD, x: 330, y: 880, s: .86, flip: true, expr: 'sad', tears: true, acts: [[0, 'weep']] }] },

    /* 13 — Nandi decides: "to Mahadev's refuge" */
    { line: 'सारी बात जानने के बाद बालक नंदी ने दृढ़ता से कहा कि जिस महादेव की कृपा से मुझे यह जीवन मिला है, मैं उन्हीं की शरण में जाऊँगा।', scene: 'nandi-resolve', mood: 'hope', fx: 'dust', capTop: 150, tr: 'fade',
      cam: { keys: [[0, 270, 620, 1.05], [3.5, 270, 600, 1.15], [6.7, 270, 590, 1.2]] },
      sky: ASH_SKY, far: ASH_FAR, mid: () => `<circle cx="270" cy="620" r="230" fill="url(#gw)" opacity=".5"/>` + peepal(40, 830, .6) + peepal(500, 830, .55), art: ASH_GND,
      cast: [{ c: NANDI, x: 270, y: 880, s: .85, expr: 'serene', talk: true, acts: [[0, 'stand'], [1, 'lookUp', .7], [4, 'namaste', .8]] }] },

    /* 14 — he walks to the forest */
    { line: 'यह कहकर वे वन की ओर चल पड़े।', scene: 'nandi-walks', mood: 'hope', fx: 'dust', capTop: 300, tr: 'wipe',
      cam: { from: [180, 660, 1.0], to: [330, 660, 1.0] },
      sky: ASH_SKY, far: ASH_FAR, mid: ASH_MID, art: ASH_GND,
      cast: [{ c: NANDI, x: 400, y: 870, s: .75, expr: 'serene', walk: { from: -250, dur: 3.2 }, acts: [[0, 'stand']] }] },

    /* 15 — tapasya on the river bank */
    { line: 'वहाँ एक नदी के किनारे आसन लगाकर नंदी ने अपना पूरा मन भगवान शिव की तपस्या में लीन कर दिया।', scene: 'river-tapasya', mood: 'calm', fx: 'dust', capTop: 300, tr: 'fade',
      cam: { from: [250, 680, 1.0], to: [265, 690, 1.08] },
      sky: RIV_SKY, far: RIV_FAR, art: RIV_GND, near: LIGHTSHAFTS,
      cast: [{ c: NANDI_SADHAK, x: 270, y: 900, s: .8, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray']], aura: 'gw' }] },

    /* 16 — THE moment: Shiv appears and hugs Nandi (light only) */
    { line: 'नंदी की अटूट तपस्या से प्रसन्न होकर महादेव स्वयं प्रकट हुए और उन्हें उठाकर अपने गले से लगा लिया।', scene: 'shiv-hug', mood: 'divine', fx: 'petals', capTop: 120, tr: 'glow',
      cam: { keys: [[0, 270, 650, 1.0], [2.6, 285, 655, 1.08], [5.1, 300, 650, 1.15]] }, focus: { at: 2.8, sound: 'shimmer', dur: 2.8, duck: .3 },
      sky: () => divine(300, 600, 'gw'), far: RIV_FAR, art: RIV_GND,
      front: () => A('fadein:2.6:1.6', `<circle cx="300" cy="660" r="240" fill="url(#gw)" opacity=".7"/>`) + A('ripple:3:300:640', `<circle cx="300" cy="640" r="150" fill="none" stroke="#fff3c4" stroke-width="3"/>`),
      cast: [{ c: NANDI_SADHAK, x: 250, y: 900, s: .8, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray'], [2.4, 'stand', .5], [3.0, { a: [60, 20], b: [60, 20], lean: -4, head: 6 }, .8]], aura: 'gw', walk: undefined },
             { c: SHIVA, x: 330, y: 900, s: 1.1, flip: true, expr: 'smile', acts: [[0, 'stand'], [2.4, { a: [48, 40], b: [52, 46], lean: 10 }, .9]], enter: { fade: 1.2, delay: 1.0 } }] },

    /* 17 — amar + gana-adhyaksha */
    { line: 'शिव ने नंदी को अमरत्व का वरदान दिया, उन्हें अपने गणों का प्रमुख (गणाध्यक्ष) बनाया', scene: 'shiv-boon', mood: 'divine', fx: 'petals', capTop: 120, tr: 'dip',
      cam: { from: [270, 650, 1.0], to: [270, 630, 1.12] },
      sky: () => divine(270, 580, 'gw'), far: RIV_FAR, art: RIV_GND,
      cast: [{ c: NANDI_SADHAK, x: 190, y: 900, s: .8, expr: 'smile', acts: [[0, 'kneelBow'], [2, 'kneelPray', .8]], aura: 'gw' },
             { c: SHIVA, x: 350, y: 900, s: 1.1, flip: true, expr: 'smile', acts: [[0, 'bless']] }] },

    /* 18 — "where Nandi lives, Mahadev lives" */
    { line: 'और यह वचन दिया कि जहाँ भी नंदी का वास होगा, वहाँ स्वयं महादेव भी विराजमान रहेंगे।', scene: 'shiv-boon', mood: 'divine', fx: 'sparks', capTop: 120, tr: 'fade',
      cam: { from: [270, 600, 1.1], to: [270, 560, 1.0] },
      sky: () => divine(270, 520, 'gw'), far: () => hills(700, 40, '#4a3a5a', 130), art: () => ground(800, '#5a4a38', '#c8a060') + marigoldString(60, 640, 480, 640, 24, 18),
      mid: () => nandiBull(150, 800, .8) + A('pulse:1.8', `<circle cx="400" cy="680" r="80" fill="url(#gw)" opacity=".6"/>`),
      cast: [{ c: SHIVA, x: 390, y: 810, s: .95, flip: true, expr: 'smile', acts: [[0, 'stand'], [1.6, 'bless', .8]], enter: { fade: 1.6, delay: 1.2 } }] },

    /* 19 — hence Nandi outside every Shiv temple */
    { line: 'यही कारण है कि हर शिव मंदिर के बाहर नंदी की स्थापना की जाती है।', scene: 'temple-dusk', mood: 'calm', fx: 'embers', capTop: 130, tr: 'dip',
      cam: { from: [270, 650, 1.0], to: [230, 650, 1.06] },
      ...TEMPLE({ nx: 170, ns: .72, sky: MORNSKY, far: MORNFAR, crowd: true }) },

    /* 20 — Nandi as dwarpal at the sanctum door, eyes on the Shivling (must-have) */
    { line: 'चूँकि नंदी शिव के वाहन और प्रमुख द्वारपाल हैं, इसलिए उनका स्थान गर्भगृह के द्वार पर होता है और उनकी दृष्टि सदैव भीतर विराजमान शिवलिंग पर टिकी रहती है।', scene: 'nandi-gaze', mood: 'calm', fx: 'dust', capTop: 150, tr: 'fade',
      cam: { keys: [[0, 230, 700, 1.0], [4, 280, 705, 1.05], [7.8, 320, 710, 1.12]] },
      ...TEMPLE({ nx: 200, ns: .9, sky: INTSKY, far: INTFAR, pillars: true }),
      front: () => A('fadein:4:3', `<ellipse cx="420" cy="700" rx="100" ry="140" fill="url(#gw)" opacity=".3"/>`) },

    /* 21 — secret of whispering: Shiva in deep samadhi */
    { line: 'अब जानते हैं नंदी के कान में मन्नत मांगने का रहस्य।', scene: 'shiv-samadhi', mood: 'calm', fx: 'stars', capTop: 120, tr: 'glow',
      cam: { from: [270, 700, 1.0], to: [270, 670, 1.05] },
      sky: HIM_SKY, far: HIM_FAR, art: HIM_GND,
      cast: [{ c: SHIVA, x: 270, y: 820, s: .8, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray']], aura: 'gb' }] },

    /* 22 — Shiva stays in samadhi; no one disturbs his tapasya */
    { line: 'ऐसी मान्यता है कि भगवान शिव अधिकांश समय गहरी समाधि और तपस्या में लीन रहते हैं, और उनकी साधना में विघ्न डालना उचित नहीं माना जाता।', scene: 'shiv-samadhi', mood: 'calm', fx: 'stars', capTop: 120, tr: 'fade',
      cam: { from: [270, 560, 1.0], to: [270, 640, 1.1] },
      sky: () => HIM_SKY() + moon(420, 180, 34), far: HIM_FAR, art: HIM_GND,
      cast: [{ c: SHIVA, x: 270, y: 820, s: .85, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray']], aura: 'gb' }],
      front: () => A('pulse:2.5', `<circle cx="270" cy="600" r="110" fill="url(#gb)" opacity=".5"/>`) },

    /* 23 — so devotees whisper softly, a quiet voice */
    { line: 'इसलिए भक्त ज़ोर से बोलने के बजाय नंदी के कान में धीरे से अपनी प्रार्थना कहते हैं।', scene: 'whisper-closeup', mood: 'calm', fx: 'dust', capTop: 150, tr: 'fade',
      cam: { keys: [[0, 275, 690, 1.05], [4.4, 285, 685, 1.18]] },
      ...TEMPLE({ nx: 220, ns: .9, sky: MORNSKY, far: MORNFAR, pillars: true }),
      cast: [{ ...COMMON, x: 240, y: 830, s: .72, expr: 'serene', talk: true, eyes: 'closed', acts: [[0, 'pranam']] }] },

    /* 24 — CLIMAX: whatever is whispered in Nandi's ear reaches Shiv (light only) */
    { line: 'यह अटूट विश्वास है कि स्वयं महादेव ने नंदी को यह वरदान दिया है कि उनके कान में कही गई हर सच्ची इच्छा सीधे शिव तक पहुँचेगी।', scene: 'whisper-reaches', mood: 'divine', fx: 'sparks', capTop: 130, tr: 'glow',
      cam: { keys: [[0, 250, 700, 1.15], [2.8, 270, 695, 1.08], [5.4, 300, 700, 1.0], [6.6, 300, 700, 1.0]] }, focus: { at: 3.0, sound: 'shimmer', dur: 3.4, duck: .3 },
      ...TEMPLE({ nx: 190, ns: .9, sky: MOONSKY, crowd: true }),
      front: () => whisperTrail(236, 690, 428, 700, 2.8, 14),
      cast: [{ ...COMMON, x: 210, y: 830, s: .72, expr: 'serene', eyes: 'closed', acts: [[0, 'pranam'], [5, 'namaste', .8]] }] },

    /* 25 — lesson */
    { line: 'इस कथा में जीवन की एक गहरी सीख भी छिपी है।', scene: 'lesson-calm', mood: 'calm', fx: 'dust', capTop: 150, tr: 'fade',
      cam: { from: [270, 620, 1.05], to: [270, 580, 1.0] },
      sky: () => divine(270, 560, 'saf', '#ffd890'), far: () => hills(700, 40, '#4a2a3a', 130), art: () => ground(800, '#4a2a2a', '#c8903a') + diyaRow(70, 470, 850, 6, 1.3),
      mid: () => A('pulse:2.2', `<circle cx="270" cy="680" r="170" fill="url(#gw)" opacity=".45"/>`) + nandiBull(270, 800, .8) },

    /* 26 — the bull as a symbol of anger and wild desire, then calm Nandi */
    { line: 'साधारणतः बैल को क्रोध और अनियंत्रित इच्छाओं का प्रतीक माना जाता है,', scene: 'lesson-calm', mood: 'calm', fx: 'sparks', capTop: 150, tr: 'fade',
      cam: { from: [250, 640, 1.0], to: [230, 640, 1.15] },
      sky: () => skyBand([[0, '#2a1830'], [.6, '#8a3a2a'], [1, '#e0803a']]), far: () => hills(700, 40, '#3a1a22', 130), art: () => ground(800, '#3a2018', '#c8803a'),
      mid: () => A('rock:2:2.5:270:800', nandiBull(270, 800, .75)) + [...Array(3)].map((_, i) => A('drift:0:-120:' + (3 + i * .8), `<circle cx="${190 + i * 70}" cy="640" r="${14 + i * 4}" fill="url(#gr)" opacity=".5"/>`)).join('') },

    { line: 'लेकिन महादेव के सामने शांत और स्थिर बैठे नंदी यह संदेश देते हैं कि जो मनुष्य अपनी इंद्रियों पर नियंत्रण रखकर अपना संपूर्ण ध्यान ईश्वर में लगा देता है, वह स्वयं पूजनीय बन जाता है।', scene: 'nandi-gaze', mood: 'calm', fx: 'dust', capTop: 150, tr: 'glow',
      cam: { keys: [[0, 230, 690, 1.08], [4.5, 260, 700, 1.0], [9.3, 300, 700, 1.05]] },
      ...TEMPLE({ nx: 200, ns: .85, bull: { eyes: 'closed' }, sky: MOONSKY, pillars: true }),
      front: () => A('fadein:5:3', `<ellipse cx="205" cy="680" rx="140" ry="160" fill="url(#gw)" opacity=".28"/>`) },

    /* 28 — next time: a devotee pauses beside Nandi; seen from behind, all eyes on the Shivling */
    { line: 'अगली बार जब आप किसी शिव मंदिर जाएं, तो नंदी के पास एक पल ज़रूर ठहरिए—भक्ति का वास्तविक मार्ग यही है कि बिना किसी भटकाव के केवल अपने आराध्य की ओर देखा जाए।', scene: 'temple-return', mood: 'hope', fx: 'petals', capTop: 130, tr: 'fade',
      cam: { keys: [[0, 270, 760, 1.0], [4, 270, 720, 1.05], [8.1, 290, 650, 1.15]] },
      sky: TSKY, far: TFAR, mid: () => sanctum(270, 800, 1.0) + marigoldString(10, 560, 530, 560, 14, 16) + diyaRow(70, 470, 812, 6, 1.1),
      art: () => TFLOOR() + nandiBack(300, 960, 1.1),
      cast: [{ ...COMMON, x: 150, y: 930, s: .7, expr: 'smile', walk: { from: -220, dur: 3.5 }, acts: [[0, 'stand'], [3.6, 'namaste', .8]] }] },

    /* 30 — final: wonder (Har Har Mahadev) */
    { line: 'हर हर महादेव!', scene: 'har-har', mood: 'divine', fx: 'petals', capTop: 120, tr: 'glow',
      cam: { from: [270, 700, 1.1], to: [270, 650, 1.2] }, focus: { at: .6, sound: 'gong', dur: 3, duck: .35 },
      sky: TSKY, far: TFAR,
      mid: () => sanctum(270, 800, 1.0) + marigoldString(10, 560, 530, 560, 14, 16) + diyaRow(70, 470, 812, 6, 1.1) + A('pulse:2', `<circle cx="270" cy="680" r="160" fill="url(#gw)" opacity=".5"/>`),
      art: () => TFLOOR() + nandiBack(270, 960, 1.1),
      front: () => [...Array(6)].map((_, i) => sparkle(80 + i * 76, 300 + (i % 3) * 60, 1.1)).join('') }
  ]
});
