/* नंदी के कान में मन्नत — Short, about 115 s. Words come exactly from my-script.md (long lines are split over several shots).
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


/* ---------- animation style v2 (same language as parshuram-ravan-vadh-long-form) ----------
   short shots, every line gets wide -> medium -> face close-up, dissolve/glow cuts, drifting mist, rising sparks, slow mandalas */
/* split one long script line into several shots (cuts only at spaces after the given phrases), each part with its own picture */
const SPLIT = (text, cuts, parts) => { const bits = []; let rest = text; cuts.forEach(c => { const i = rest.indexOf(c); if (i < 0) throw new Error('SPLIT cut not found: ' + c); bits.push(rest.slice(0, i + c.length).trim()); rest = rest.slice(i + c.length).trim(); }); bits.push(rest); if (bits.length !== parts.length) throw new Error('SPLIT parts mismatch'); return parts.map((p, k) => Object.assign({ line: bits[k] }, p)); };
const MISTD = (y, op, per) => A('drift:-300:0:' + (per || 18), `<rect x="-120" y="${y}" width="780" height="120" fill="url(#fogW)" opacity="${op || .5}"/>`);                       // slow drifting mist band
const EMB = (x1, x2, y, n, col) => [...Array(n)].map((_, i) => A(`drift:${(i % 3 - 1) * 18}:${-90 - (i % 4) * 22}:${(4 + (i % 5) * .8).toFixed(1)}`, `<circle cx="${x1 + ((i * 83) % (x2 - x1))}" cy="${y - (i * 37) % 70}" r="${1.6 + (i % 3)}" fill="${col || '#ffd890'}" opacity=".85"/>`)).join('');   // rising sparks
const MAND = (x, y, r, col, petals, per, op) => A(`spin:${per}:${x}:${y}`, `<g transform="translate(${x} ${y})" opacity="${op || .4}">` + [...Array(petals)].map((_, i) => `<path transform="rotate(${i * 360 / petals})" d="M0 ${-r * .3} Q${r * .13} ${-r * .65} 0 ${-r} Q${-r * .13} ${-r * .65} 0 ${-r * .3}Z" fill="none" stroke="${col}" stroke-width="2"/>`).join('') + `<circle r="${r * 1.02}" fill="none" stroke="${col}" stroke-width="1.5"/><circle r="${r * .3}" fill="none" stroke="${col}" stroke-width="1.5"/></g>`);   // slowly turning mandala
const GLOW = (x, y, r, op, at) => A(`fadein:${at || 0}:1.6`, `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#gw)" opacity="${op}"/>`);
const SHAFT = () => A('pulse:.35', `<path d="M120 0 L250 0 L170 800 L40 800Z M330 0 L430 0 L400 800 L300 800Z" fill="#fff6d0" opacity=".08"/>`);
const DEV = o => ({ ...COMMON, x: 215, y: 812, s: .72, expr: 'serene', acts: [[0, 'pranam']], ...o });         // the whispering devotee
const NS = o => ({ c: NANDI, expr: 'smile', acts: [[0, 'stand']], ...o });                                  // Nandi the boy
const SH = o => ({ ...SHILAD, expr: 'smile', acts: [[0, 'kneelPray']], ...o });                            // Shilad

VIDEO({
  title: 'नंदी के कान में मन्नत', format: 'short', target: 112,
  music: 'scenes', sfx: true, ending: 3.6, handheld: .6, minShot: 2.4, pace: 13,
  look: { rim: 1, bokeh: .9, motes: 1, warm: .1, vig: .12 },
  keywords: ['नंदी', 'शिव मंदिर', 'महादेव', 'शिलाद', 'मित्र', 'वरुण', 'शिव पुराण', 'वरदान', 'शिवलिंग', 'कान', 'हर हर महादेव'],
  shots: [
    /* ===== 1. the question ===== */
    ...SPLIT('क्या आपने कभी शिव मंदिर में किसी भक्त को नंदी के कान में धीरे से कुछ फुसफुसाते हुए देखा है?', ['शिव मंदिर में'], [
      /* crane up from a lamp flame (new opening: macro lamp -> temple reveal) */
      { scene: 'temple-dusk', mood: 'calm', fx: 'dust', capTop: 330,
        cam: { keys: [[0, 70, 930, 2.8], [2.2, 270, 760, 1.2], [3.2, 270, 700, 1.05]] },
        ...TEMPLE({ nx: 200, ns: .8, crowd: true, pillars: true, near: () => TNEAR() + EMB(20, 520, 940, 10) }),
        cast: [DEV({ x: 215, s: .72 })] },
      { scene: 'whisper-closeup', mood: 'calm', fx: 'dust', capTop: 150, tr: 'fade',
        cam: { keys: [[0, 245, 665, 1.6], [3.4, 255, 655, 2.15]] },
        ...TEMPLE({ nx: 220, ns: .9, sky: MOONSKY, pillars: true }),
        cast: [DEV({ x: 240, y: 830, talk: true, eyes: 'closed' })] }
    ]),

    { line: 'वह अपनी मनोकामना महादेव तक पहुँचाना चाहता है,', scene: 'whisper-closeup', mood: 'calm', fx: 'dust', capTop: 150, tr: 'dissolve',
      cam: { keys: [[0, 330, 700, 1.0], [2.8, 270, 690, 1.35]] },
      ...TEMPLE({ nx: 220, ns: .9, sky: MOONSKY, crowd: true, near: () => TNEAR() + EMB(100, 440, 940, 8) }),
      cast: [DEV({ x: 240, y: 830, talk: true, eyes: 'closed' })] },

    /* Nandi's calm eye, then the gaze travels to the Shivling */
    ...SPLIT('और नंदी चुपचाप सामने शिवलिंग की ओर एकटक देख रहे होते हैं।', ['चुपचाप'], [
      { scene: 'nandi-gaze', mood: 'calm', fx: 'dust', capTop: 170, tr: 'dissolve',
        cam: { keys: [[0, 280, 700, 1.4], [3.2, 258, 700, 2.1]] },
        ...TEMPLE({ nx: 190, ns: .85, pillars: true }),
        cast: [DEV({ x: 210, y: 830, eyes: 'closed' })] },
      { scene: 'nandi-gaze', mood: 'calm', fx: 'dust', capTop: 170, tr: 'fade',
        cam: { keys: [[0, 255, 700, 1.4], [3.4, 400, 700, 1.55]] },
        ...TEMPLE({ nx: 190, ns: .85, pillars: true }),
        cast: [DEV({ x: 210, y: 830, eyes: 'closed' })],
        front: () => A('pulse:1.8', `<ellipse cx="430" cy="690" rx="90" ry="120" fill="url(#gw)" opacity=".45"/>`) + EMB(380, 480, 760, 6) }
    ]),

    { line: 'आखिर ऐसा क्यों होता है?', scene: 'temple-dusk', mood: 'calm', fx: 'embers', capTop: 130, tr: 'zoom',
      cam: { keys: [[0, 270, 560, 1.25], [2.2, 270, 700, 1.0]] },
      sky: MOONSKY, far: () => shikhara(270, 780, 320, 600, '#2e1a28', '#d08a3a') + shikhara(60, 760, 110, 220, '#26162a', '#a8683a') + shikhara(490, 760, 110, 220, '#26162a', '#a8683a') + `<rect y="700" width="540" height="100" fill="url(#fogW)" opacity=".7"/>`,
      mid: () => marigoldString(0, 640, 540, 620, 26, 16) + MISTD(690, .5, 14), art: () => TFLOOR() + diyaRow(60, 480, 860, 7, 1.4) },

    { line: 'इसे समझने के लिए नंदी के बचपन की इस कथा को सुनिए।', scene: 'legend-begins', mood: 'divine', fx: 'petals', capTop: 120, tr: 'glow',
      cam: { keys: [[0, 270, 640, 1.0], [3, 270, 560, 1.18]] },
      sky: () => divine(270, 520, 'saf', '#ffd890') + MAND(270, 520, 230, '#ffd98a', 16, 120, .35), far: () => hills(700, 40, '#4a2a3a', 130), art: () => ground(800, '#4a2a2a', '#c8903a') + diyaRow(120, 420, 830, 5, 1.4),
      mid: () => A('rise:30:1.6:.3', pothi(270, 560, 1.15)) + EMB(60, 480, 800, 12) },

    /* ===== 2. Shilad's tapasya: years pass (dusk -> night), then a face close-up ===== */
    ...SPLIT('शिव पुराण के अनुसार, महर्षि शिलाद की कठोर तपस्या से', ['शिलाद की'], [
      { scene: 'shilad-tapasya', mood: 'calm', fx: 'dust', capTop: 330, tr: 'dissolve',
        cam: { keys: [[0, 270, 620, 1.0], [3, 285, 650, 1.12]] },
        sky: ASH_SKY, far: ASH_FAR, mid: () => ASH_MID() + MISTD(740, .5, 16), art: ASH_GND,
        cast: [SH({ x: 320, y: 850, s: .7, expr: 'serene', eyes: 'closed' })] },
      { scene: 'shilad-tapasya', mood: 'calm', fx: 'embers', capTop: 150, tr: 'dissolve',
        cam: { keys: [[0, 235, 650, 1.55], [3.2, 212, 625, 2.1]] },
        sky: MOONSKY, far: ASH_FAR, mid: () => `<ellipse cx="270" cy="830" rx="150" ry="16" fill="#3a2410" opacity=".4"/>` + fire(380, 826, 1.6), art: ASH_GND,
        cast: [SH({ x: 210, y: 850, s: .85, expr: 'serene', eyes: 'closed' })],
        front: () => EMB(150, 420, 860, 10) }
    ]),

    /* ===== 3. the boon ===== */
    ...SPLIT('प्रसन्न होकर महादेव ने उन्हें एक पुत्र का वरदान दिया, जिनका नाम नंदी रखा गया।', ['होकर', 'दिया,'], [
      { scene: 'shiv-boon', mood: 'divine', fx: 'petals', capTop: 150, tr: 'glow',
        cam: { keys: [[0, 215, 650, 1.5], [2.4, 212, 625, 1.9]] },
        sky: () => divine(330, 560, 'gw') + MAND(330, 560, 240, '#fff3c4', 18, 110, .3), far: () => hills(700, 40, '#4a3a5a', 130), art: ASH_GND,
        cast: [SH({ x: 210, y: 850, s: .85, expr: 'smile' })], front: () => GLOW(330, 560, 200, .5, .2) },
      { scene: 'shiv-boon', mood: 'divine', fx: 'petals', capTop: 120, tr: 'dissolve',
        cam: { from: [260, 660, 1.0], to: [300, 640, 1.18] }, focus: { at: 1.2, sound: 'shimmer', dur: 2.4, duck: .45 },
        sky: () => divine(360, 560, 'gw') + MAND(360, 560, 250, '#fff3c4', 20, 100, .35), far: () => hills(700, 40, '#4a3a5a', 130), art: ASH_GND,
        cast: [SH({ x: 130, y: 850, s: .85 }),
               { c: SHIVA, x: 360, y: 860, s: .95, flip: true, expr: 'serene', acts: [[0, 'stand'], [1.0, 'bless', .8]], enter: { fade: 1.2, delay: .3 } }] },
      { scene: 'shiv-boon', mood: 'divine', fx: 'petals', capTop: 120, tr: 'dissolve',
        cam: { keys: [[0, 300, 720, 1.2], [3, 300, 710, 1.65]] },
        sky: () => divine(300, 600, 'gw'), far: () => hills(700, 40, '#4a3a5a', 130), art: ASH_GND,
        cast: [SH({ x: 120, y: 850, s: .8 }),
               { c: SHIVA, x: 440, y: 860, s: .9, flip: true, expr: 'smile', acts: [[0, 'bless']] },
               NS({ x: 300, y: 880, s: .6, acts: [[0, 'namaste']], enter: { fade: 1.2, delay: .3, rise: 20 } })],
        front: () => EMB(200, 400, 860, 10, '#fff3c4') }
    ]),

    /* ===== 4. the two rishis ===== */
    ...SPLIT('जब नंदी सात वर्ष के हुए, तब मित्र और वरुण नामक दो ऋषि आश्रम में पधारे।', ['हुए,'], [
      { scene: 'ashram-warm', mood: 'joy', fx: 'dust', capTop: 330, tr: 'wipe',
        cam: { keys: [[0, 270, 720, 1.15], [3, 285, 745, 1.5]] },
        sky: ASH_SKY, far: ASH_FAR, mid: ASH_MID, art: ASH_GND,
        cast: [SH({ x: 200, y: 870, s: .82, acts: [[0, 'stand']] }), NS({ x: 330, y: 880, s: .6, acts: [[0, 'stand']] })] },
      { scene: 'ashram-warm', mood: 'joy', fx: 'dust', capTop: 330, tr: 'dissolve',
        cam: { from: [250, 640, 1.0], to: [300, 640, 1.1] },
        sky: ASH_SKY, far: ASH_FAR, mid: ASH_MID, art: ASH_GND,
        cast: [SH({ x: 190, y: 870, s: .82, acts: [[0, 'stand'], [3, 'namaste', .8]] }),
               NS({ x: 120, y: 880, s: .55 }),
               { ...MITRA, x: 360, y: 880, s: .84, flip: true, expr: 'serene', walk: { from: 240, dur: 3 }, acts: [[0, 'stand'], [3.2, 'namaste', .8]] },
               { ...VARUN, x: 470, y: 880, s: .78, flip: true, expr: 'serene', walk: { from: 250, dur: 3.2 }, acts: [[0, 'stand'], [3.4, 'namaste', .8]] }] }
    ]),

    ...SPLIT('उन्होंने सभी को आशीर्वाद दिया, लेकिन नंदी को नहीं।', ['दिया,'], [
      { scene: 'ashram-warm', mood: 'calm', fx: 'dust', capTop: 330, tr: 'dissolve',
        cam: { keys: [[0, 330, 660, 1.1], [3, 350, 650, 1.45]] },
        sky: ASH_SKY, far: ASH_FAR, mid: ASH_MID, art: ASH_GND,
        cast: [{ ...MITRA, x: 340, y: 880, s: .84, flip: true, expr: 'serene', acts: [[0, 'bless']] },
               { ...VARUN, x: 450, y: 880, s: .78, flip: true, expr: 'serene', acts: [[0, 'stand'], [1, 'lookAway'], [2, 'stand']] },
               SH({ x: 215, y: 870, s: .82, acts: [[0, 'namaste']] })] },
      { scene: 'ashram-soft', mood: { base: 'calm', bri: .95, vig: .15 }, fx: 'dust', capTop: 150, tr: 'dissolve',
        cam: { keys: [[0, 270, 690, 1.35], [3.2, 270, 655, 2.0]] },
        sky: ASH_SKY, far: ASH_FAR, mid: ASH_MID, art: ASH_GND,
        cast: [NS({ x: 270, y: 880, s: .85, expr: 'calm', acts: [[0, 'stand'], [1.4, 'lookDown', .8]] })] }
    ]),

    ...SPLIT('कारण पूछने पर ऋषियों ने बताया कि नंदी के जीवन का केवल एक वर्ष ही शेष बचा है।', ['बताया'], [
      { scene: 'prophecy-soft', mood: { base: 'calm', bri: .95, vig: .15 }, fx: 'dust', capTop: 330, tr: 'dissolve',
        cam: { from: [260, 640, 1.0], to: [330, 640, 1.25] },
        sky: EVESKY, far: ASH_FAR, mid: () => ASH_MID() + fire(40, 830, 1.0), art: ASH_GND,
        cast: [SH({ x: 170, y: 870, s: .84, expr: 'sad', acts: [[0, 'plead'], [3, 'grief', .8]] }),
               { ...MITRA, x: 360, y: 880, s: .84, flip: true, expr: 'calm', talk: true, acts: [[0, 'explain']] },
               { ...VARUN, x: 470, y: 880, s: .78, flip: true, expr: 'sad', acts: [[0, 'stand'], [2.4, 'namaste', .8]] }] },
      /* one year left: the light dims, camera pulls away from the small boy */
      { scene: 'prophecy-soft', mood: 'sad', fx: 'petals', capTop: 200, tr: 'dissolve',
        cam: { keys: [[0, 270, 700, 1.7], [4.6, 270, 650, 1.0]] },
        sky: EVESKY, far: ASH_FAR, mid: () => ASH_MID() + MISTD(740, .55, 12), art: ASH_GND,
        cast: [NS({ x: 270, y: 880, s: .65, expr: 'calm', acts: [[0, 'stand'], [1, 'lookUp', .8]] })],
        front: () => PETAL(300, 300) + PETAL(200, 420) + PETAL(400, 250) }
    ]),

    { line: 'यह सुनकर महर्षि शिलाद फूट-फूट कर रोने लगे।', scene: 'prophecy-soft', mood: { base: 'calm', bri: .95, vig: .15 }, capTop: 200, tr: 'dissolve',
      cam: { keys: [[0, 260, 680, 1.3], [4, 258, 640, 1.9]] },
      sky: MOONSKY, far: ASH_FAR, mid: ASH_MID, art: ASH_GND,
      cast: [SH({ x: 260, y: 880, s: .88, expr: 'sad', tears: true, acts: [[0, 'weep']] })],
      front: () => PETAL(150, 200) + PETAL(360, 260) },

    /* ===== 5. Nandi decides ===== */
    ...SPLIT('पर बालक नंदी ने दृढ़ता से कहा— जिस महादेव की कृपा से मुझे यह जीवन मिला है, मैं उन्हीं की शरण में जाऊँगा।', ['कहा—', 'मिला है,'], [
      { scene: 'nandi-resolve', mood: 'hope', fx: 'dust', capTop: 150, tr: 'fade',
        cam: { keys: [[0, 270, 700, 1.1], [3, 270, 690, 1.3]] },
        sky: ASH_SKY, far: ASH_FAR, mid: () => peepal(40, 830, .6) + peepal(500, 830, .55), art: ASH_GND,
        cast: [NS({ x: 270, y: 880, s: .8, expr: 'serene', acts: [[0, 'stand'], [1.4, 'lookUp', .7]] })] },
      { scene: 'nandi-resolve', mood: 'hope', fx: 'sparks', capTop: 150, tr: 'dissolve',
        cam: { keys: [[0, 270, 670, 1.5], [3.2, 270, 650, 2.1]] },
        sky: ASH_SKY, far: ASH_FAR, mid: () => `<circle cx="270" cy="640" r="230" fill="url(#gw)" opacity=".55"/>` + MAND(270, 640, 190, '#fff3c4', 16, 90, .3), art: ASH_GND,
        cast: [NS({ x: 270, y: 880, s: .8, expr: 'serene', talk: true, acts: [[0, 'stand'], [.8, 'lookUp', .7]] })] },
      /* low angle hero shot: the camera rises as he folds his hands */
      { scene: 'nandi-resolve', mood: 'hope', fx: 'petals', capTop: 150, tr: 'dissolve',
        cam: { keys: [[0, 270, 760, 1.35], [3.2, 270, 600, 1.05]] },
        sky: ASH_SKY, far: ASH_FAR, mid: () => `<circle cx="270" cy="620" r="230" fill="url(#gw)" opacity=".5"/>` + peepal(40, 830, .6) + peepal(500, 830, .55), art: ASH_GND,
        cast: [NS({ x: 270, y: 880, s: .85, expr: 'serene', talk: true, acts: [[0, 'stand'], [.6, 'namaste', .8]] })] }
    ]),

    { line: 'नंदी वन में', scene: 'nandi-walks', mood: 'hope', fx: 'dust', capTop: 300, tr: 'wipe',
      cam: { keys: [[0, 160, 690, 1.15], [3.2, 340, 690, 1.15]] },
      sky: ASH_SKY, far: ASH_FAR, mid: () => ASH_MID() + MISTD(760, .4, 12), art: ASH_GND,
      cast: [NS({ x: 400, y: 870, s: .75, expr: 'serene', walk: { from: -250, dur: 3.2 } })] },

    /* ===== 6. tapasya by the river ===== */
    ...SPLIT('एक नदी के किनारे जाकर शिव की अखंड तपस्या में लीन हो गए।', ['जाकर'], [
      { scene: 'river-tapasya', mood: 'calm', fx: 'dust', capTop: 300, tr: 'dissolve',
        cam: { keys: [[0, 270, 540, 1.0], [2.6, 270, 690, 1.05]] },
        sky: RIV_SKY, far: RIV_FAR, art: RIV_GND, near: () => LIGHTSHAFTS() + MISTD(780, .5, 14) },
      { scene: 'river-tapasya', mood: 'calm', fx: 'dust', capTop: 150, tr: 'dissolve',
        cam: { keys: [[0, 270, 720, 1.5], [3.4, 270, 690, 2.1]] },
        sky: RIV_SKY, far: RIV_FAR, art: RIV_GND, near: LIGHTSHAFTS,
        cast: [{ c: NANDI_SADHAK, x: 270, y: 900, s: .8, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray']], aura: 'gw' }],
        front: () => EMB(190, 350, 880, 8) }
    ]),

    /* ===== 7. Mahadev appears and embraces Nandi ===== */
    ...SPLIT('उनकी अटूट भक्ति से प्रसन्न होकर महादेव प्रकट हुए और नंदी को गले लगाकर अमरत्व का वरदान दिया।', ['होकर', 'हुए'], [
      { scene: 'shiv-hug', mood: 'divine', fx: 'sparks', capTop: 120, tr: 'glow',
        cam: { keys: [[0, 270, 700, 1.3], [2.4, 270, 680, 1.0]] },
        sky: () => divine(300, 600, 'gw'), far: RIV_FAR, art: RIV_GND,
        cast: [{ c: NANDI_SADHAK, x: 270, y: 900, s: .8, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray']], aura: 'gw' }],
        front: () => GLOW(300, 640, 260, .65, .2) },
      { scene: 'shiv-hug', mood: 'divine', fx: 'petals', capTop: 120, tr: 'flash',
        cam: { keys: [[0, 270, 650, 1.0], [2.4, 300, 640, 1.2]] }, focus: { at: 1.0, sound: 'shimmer', dur: 2.6, duck: .3 },
        sky: () => divine(330, 600, 'gw') + MAND(330, 600, 260, '#fff3c4', 20, 100, .35), far: RIV_FAR, art: RIV_GND,
        cast: [{ c: NANDI_SADHAK, x: 190, y: 900, s: .8, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray']], aura: 'gw' },
               { c: SHIVA, x: 360, y: 900, s: 1.1, flip: true, expr: 'smile', acts: [[0, 'stand'], [1.2, 'bless', .8]], enter: { fade: 1.0, delay: .5 } }],
        front: () => A('ripple:3:330:600', `<circle cx="330" cy="600" r="150" fill="none" stroke="#fff3c4" stroke-width="3"/>`) },
      { scene: 'shiv-hug', mood: 'divine', fx: 'petals', capTop: 120, tr: 'dissolve',
        cam: { keys: [[0, 270, 650, 1.0], [2.6, 285, 655, 1.12], [5.1, 300, 640, 1.3]] },
        sky: () => divine(300, 600, 'gw'), far: RIV_FAR, art: RIV_GND,
        front: () => A('fadein:2.2:1.6', `<circle cx="300" cy="660" r="240" fill="url(#gw)" opacity=".7"/>`) + A('ripple:3:300:640', `<circle cx="300" cy="640" r="150" fill="none" stroke="#fff3c4" stroke-width="3"/>`),
        cast: [{ c: NANDI_SADHAK, x: 250, y: 900, s: .8, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray'], [2.0, 'stand', .5], [2.6, { a: [60, 20], b: [60, 20], lean: -4, head: 6 }, .8]], aura: 'gw' },
               { c: SHIVA, x: 330, y: 900, s: 1.1, flip: true, expr: 'smile', acts: [[0, 'stand'], [2.0, { a: [48, 40], b: [52, 46], lean: 10 }, .9]] }] }
    ]),

    ...SPLIT('शिव ने उन्हें अपने गणों का प्रमुख बनाया', [], [
      { scene: 'shiv-boon', mood: 'divine', fx: 'petals', capTop: 120, tr: 'dip',
        cam: { keys: [[0, 330, 700, 1.0], [3, 345, 640, 1.5]] },
        sky: () => divine(270, 580, 'gw') + MAND(350, 600, 230, '#fff3c4', 18, 110, .3), far: RIV_FAR, art: RIV_GND,
        cast: [{ c: NANDI_SADHAK, x: 190, y: 900, s: .8, expr: 'smile', acts: [[0, 'kneelBow']], aura: 'gw' },
               { c: SHIVA, x: 350, y: 900, s: 1.1, flip: true, expr: 'smile', acts: [[0, 'bless']] }] },
    ]),

    ...SPLIT('और वचन दिया कि जहाँ नंदी का वास होगा, वहाँ स्वयं महादेव भी विराजमान रहेंगे।', ['होगा,'], [
      { scene: 'shiv-boon', mood: 'divine', fx: 'sparks', capTop: 120, tr: 'dissolve',
        cam: { keys: [[0, 200, 700, 1.4], [3, 215, 720, 1.1]] },
        sky: () => divine(270, 520, 'gw'), far: () => hills(700, 40, '#4a3a5a', 130), art: () => ground(800, '#5a4a38', '#c8a060') + marigoldString(60, 640, 480, 640, 24, 18),
        mid: () => nandiBull(150, 800, .8) },
      { scene: 'shiv-boon', mood: 'divine', fx: 'sparks', capTop: 120, tr: 'dissolve',
        cam: { keys: [[0, 270, 700, 1.0], [3.2, 330, 660, 1.3]] },
        sky: () => divine(300, 520, 'gw') + MAND(390, 640, 210, '#fff3c4', 18, 100, .3), far: () => hills(700, 40, '#4a3a5a', 130), art: () => ground(800, '#5a4a38', '#c8a060') + marigoldString(60, 640, 480, 640, 24, 18),
        mid: () => nandiBull(150, 800, .8) + A('pulse:1.8', `<circle cx="400" cy="680" r="80" fill="url(#gw)" opacity=".6"/>`),
        cast: [{ c: SHIVA, x: 390, y: 810, s: .95, flip: true, expr: 'smile', acts: [[0, 'stand'], [1.2, 'bless', .8]], enter: { fade: 1.2, delay: .3 } }] }
    ]),

    ...SPLIT('चूँकि भगवान शिव अधिकांश समय गहरी समाधि में रहते हैं,', ['अधिकांश समय'], [
      { scene: 'shiv-samadhi', mood: 'calm', fx: 'stars', capTop: 120, tr: 'dissolve',
        cam: { keys: [[0, 270, 560, 1.0], [4, 270, 650, 1.12]] },
        sky: () => HIM_SKY() + moon(420, 180, 34), far: HIM_FAR, mid: () => MISTD(690, .5, 14), art: HIM_GND,
        cast: [{ c: SHIVA, x: 270, y: 820, s: .85, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray']], aura: 'gb' }],
        front: () => A('pulse:2.5', `<circle cx="270" cy="600" r="110" fill="url(#gb)" opacity=".5"/>`) },
      { scene: 'shiv-samadhi', mood: 'calm', fx: 'stars', capTop: 150, tr: 'dissolve',
        cam: { keys: [[0, 270, 620, 1.5], [4, 270, 600, 2.0]] },
        sky: () => HIM_SKY() + MAND(270, 600, 200, '#bcd0ff', 16, 100, .3), far: HIM_FAR, art: HIM_GND,
        cast: [{ c: SHIVA, x: 270, y: 820, s: .85, expr: 'serene', eyes: 'closed', acts: [[0, 'kneelPray']], aura: 'gb' }],
        front: () => A('pulse:2.5', `<circle cx="270" cy="600" r="110" fill="url(#gb)" opacity=".5"/>`) }
    ]),

    { line: 'इसलिए भक्त उनकी साधना में विघ्न डाले बिना नंदी के कान में धीरे से अपनी प्रार्थना कहते हैं।', scene: 'whisper-closeup', mood: 'calm', fx: 'dust', capTop: 150, tr: 'dissolve',
      cam: { keys: [[0, 330, 700, 1.0], [2.4, 262, 670, 1.5], [4.6, 258, 655, 2.0]] },
      ...TEMPLE({ nx: 220, ns: .9, sky: MORNSKY, far: MORNFAR, pillars: true }),
      cast: [DEV({ x: 240, y: 830, talk: true, eyes: 'closed' })] },

    /* climax: the wish travels as light */
    ...SPLIT('स्वयं महादेव का वरदान है कि नंदी के कान में कही गई हर सच्ची इच्छा सीधे शिव तक पहुँचेगी।', ['वरदान है कि'], [
      { scene: 'whisper-reaches', mood: 'divine', fx: 'sparks', capTop: 130, tr: 'glow',
        cam: { keys: [[0, 250, 700, 1.0], [3.4, 300, 640, 1.2]] },
        ...TEMPLE({ nx: 190, ns: .9, sky: MOONSKY, crowd: true, near: () => TNEAR() + EMB(20, 520, 940, 8) }),
        front: () => MAND(430, 690, 150, '#fff3c4', 16, 90, .25),
        cast: [DEV({ x: 210, y: 830 })] },
      { scene: 'whisper-reaches', mood: 'divine', fx: 'sparks', capTop: 130, tr: 'dissolve',
        cam: { keys: [[0, 240, 700, 1.5], [2.0, 330, 700, 1.15], [4.4, 330, 700, 1.0]] }, focus: { at: 1.4, sound: 'shimmer', dur: 3.4, duck: .3 },
        ...TEMPLE({ nx: 190, ns: .9, sky: MOONSKY, crowd: true }),
        front: () => whisperTrail(236, 690, 428, 700, 1.2, 14) + A('fadein:3:2', `<ellipse cx="430" cy="690" rx="110" ry="140" fill="url(#gw)" opacity=".5"/>`),
        cast: [DEV({ x: 210, y: 830, acts: [[0, 'pranam'], [4, 'namaste', .8]] })] }
    ]),

    /* ===== 10. next time you visit ===== */
    ...SPLIT('अगली बार जब आप किसी शिव मंदिर जाएं, तो नंदी की तरह बिना किसी भटकाव के केवल अपने आराध्य की ओर देखिए।', ['जाएं,', 'भटकाव के'], [
      { scene: 'temple-return', mood: 'hope', fx: 'petals', capTop: 130, tr: 'dissolve',
        cam: { keys: [[0, 270, 780, 1.0], [3, 270, 740, 1.05]] },
        sky: TSKY, far: TFAR, mid: () => sanctum(270, 800, 1.0) + marigoldString(10, 560, 530, 560, 14, 16) + diyaRow(70, 470, 812, 6, 1.1),
        art: () => TFLOOR() + nandiBack(300, 960, 1.1),
        cast: [{ ...COMMON, x: 150, y: 930, s: .7, expr: 'smile', walk: { from: -220, dur: 3 }, acts: [[0, 'stand']] }] },
      { scene: 'temple-return', mood: 'hope', fx: 'petals', capTop: 130, tr: 'dissolve',
        cam: { keys: [[0, 220, 780, 1.2], [3.6, 200, 740, 1.7]] },
        sky: TSKY, far: TFAR, mid: () => sanctum(270, 800, 1.0) + marigoldString(10, 560, 530, 560, 14, 16) + diyaRow(70, 470, 812, 6, 1.1),
        art: () => TFLOOR() + nandiBack(300, 960, 1.1),
        cast: [{ ...COMMON, x: 180, y: 930, s: .7, expr: 'smile', acts: [[0, 'stand'], [.6, 'namaste', .8]] }] },
      { scene: 'temple-return', mood: 'hope', fx: 'petals', capTop: 130, tr: 'dissolve',
        cam: { keys: [[0, 270, 760, 1.0], [4.4, 270, 650, 1.25]] },
        sky: TSKY, far: TFAR, mid: () => sanctum(270, 800, 1.0) + marigoldString(10, 560, 530, 560, 14, 16) + diyaRow(70, 470, 812, 6, 1.1) + GLOW(270, 680, 170, .45, 1),
        art: () => TFLOOR() + nandiBack(300, 960, 1.1),
        cast: [{ ...COMMON, x: 180, y: 930, s: .7, expr: 'smile', acts: [[0, 'namaste']] }] }
    ]),

    { line: 'हर हर महादेव!', scene: 'har-har', mood: 'divine', fx: 'petals', capTop: 120, tr: 'glow',
      cam: { from: [270, 700, 1.1], to: [270, 650, 1.25] }, focus: { at: .6, sound: 'gong', dur: 3, duck: .35 },
      sky: () => TSKY() + MAND(270, 680, 260, '#ffd98a', 20, 100, .3), far: TFAR,
      mid: () => sanctum(270, 800, 1.0) + marigoldString(10, 560, 530, 560, 14, 16) + diyaRow(70, 470, 812, 6, 1.1) + A('pulse:2', `<circle cx="270" cy="680" r="160" fill="url(#gw)" opacity=".5"/>`),
      art: () => TFLOOR() + nandiBack(270, 960, 1.1),
      front: () => [...Array(6)].map((_, i) => sparkle(80 + i * 76, 300 + (i % 3) * 60, 1.1)).join('') + EMB(40, 500, 900, 14) }
  ]
});
