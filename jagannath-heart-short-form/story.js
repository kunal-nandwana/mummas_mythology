/* Jagannath's heart (Brahma Padartha) — Short, ~85 s. Words come exactly from my-script.md (long lines split over shots).
   Build: node tools/build.js jagannath-heart-short-form

   Difference plan (approved): opens on a closed wooden idol face in indigo dark with one tiny pulse inside (object close-up);
   threat = the unseen / darkness, nothing scary; climax = blindfolded priests in total darkness, the light beating in their
   cloth-wrapped hands (blessing with light only); place = Puri shore at night + temple in darkness, deep indigo with ONE warm
   colour, golden-pink, used only for the heart. Signature visual: the small golden-pink heart-light that beats (lub-dub).
   Music: scene library; no drums anywhere except a very soft heartbeat in the last three shots.
   No intro, hook text or end card. */

(() => {   // private scope: helper names here never clash with engine globals
const DEFS = `<defs>
<linearGradient id="jgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03041a"/><stop offset=".62" stop-color="#0d1442"/><stop offset="1" stop-color="#05040f"/></linearGradient>
<linearGradient id="jgSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16295c"/><stop offset="1" stop-color="#040a1c"/></linearGradient>
<linearGradient id="jgSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c2442"/><stop offset="1" stop-color="#141020"/></linearGradient>
<linearGradient id="jgWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e2716"/><stop offset="1" stop-color="#1c120a"/></linearGradient>
<linearGradient id="jgFJ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#261c2a"/><stop offset="1" stop-color="#0e0a12"/></linearGradient>
<linearGradient id="jgFB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf6ea"/><stop offset="1" stop-color="#d9cfbd"/></linearGradient>
<linearGradient id="jgFS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2c25a"/><stop offset="1" stop-color="#c8902c"/></linearGradient>
<linearGradient id="jgCrown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a1c2c"/><stop offset="1" stop-color="#5a0e1a"/></linearGradient>
<radialGradient id="jgHalo"><stop offset="0" stop-color="#ffa096" stop-opacity=".36"/><stop offset=".35" stop-color="#ff6e8c" stop-opacity=".13"/><stop offset="1" stop-color="#ff5a82" stop-opacity="0"/></radialGradient>
<radialGradient id="jgCore"><stop offset="0" stop-color="#fffcef"/><stop offset=".3" stop-color="#ffdc96" stop-opacity=".92"/><stop offset=".65" stop-color="#ff8ca5" stop-opacity=".45"/><stop offset="1" stop-color="#ff7896" stop-opacity="0"/></radialGradient>
<radialGradient id="jgLight"><stop offset="0" stop-color="#eef4ff" stop-opacity=".9"/><stop offset=".5" stop-color="#9cc0ff" stop-opacity=".42"/><stop offset="1" stop-color="#6a9cff" stop-opacity="0"/></radialGradient>
<linearGradient id="jgFlame" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffc65a" stop-opacity=".85"/><stop offset=".55" stop-color="#ff7a32" stop-opacity=".42"/><stop offset="1" stop-color="#ff5028" stop-opacity="0"/></linearGradient>
<radialGradient id="jgWarm"><stop offset="0" stop-color="#ff9a78" stop-opacity=".32"/><stop offset="1" stop-color="#ff8a78" stop-opacity="0"/></radialGradient>
<radialGradient id="jgWin"><stop offset="0" stop-color="#ffc06e" stop-opacity=".5"/><stop offset="1" stop-color="#ffb060" stop-opacity="0"/></radialGradient>
</defs>`;
const f1 = v => +(+v).toFixed(1);
const SKY = (n = 70, h = 620) => DEFS + `<rect width="540" height="960" fill="url(#jgSky)"/>` + stars(n, h);
const DARK = { base: 'sad', bri: .62, sat: .82, vig: .6 };                 // the night of Nabakalebara
const SEED = s => { let r = s; return () => (r = (r * 9301 + 49297) % 233280) / 233280; };

/* THE signature visual: a small golden-pink light that beats like a heart (engine anim 'beat') */
const HEART = (x, y, r, k = 1) => `<g opacity="${k}">` + A(`beat:${x}:${y}:.22`, `<circle cx="${x}" cy="${y}" r="${f1(r * 7)}" fill="url(#jgHalo)"/><circle cx="${x}" cy="${y}" r="${f1(r * 1.8)}" fill="url(#jgCore)"/>`) + `</g>`;

/* Wooden idols — Jagannath, Balabhadra, Subhadra — drawn as idols, with respect (big round eyes, crown, carved trunk) */
const IDOLT = { jag: { f: 'jgFJ', w: 620, h: 540, arms: 1, eye: 1, band: '#8a6a18' }, bal: { f: 'jgFB', w: 600, h: 540, arms: 1, eye: .92, band: '#1d4d3a' }, sub: { f: 'jgFS', w: 440, h: 410, arms: 0, eye: .9, band: '#7d1a2a' } };
function IDOL(type, cx, cy, s, op = 1) {
  const T = IDOLT[type], w = T.w, h = T.h, bw = w * .74, by = h * .4; let g = '';
  g += `<rect x="${f1(-bw / 2)}" y="${f1(by)}" width="${f1(bw)}" height="760" rx="60" fill="url(#jgWood)"/>`;
  for (let i = 0; i < 9; i++) { const x = f1(-bw / 2 + 30 + i * (bw - 60) / 8); g += `<path d="M${x} ${f1(by + 40)} C${x + 10} ${f1(by + 250)} ${x - 12} ${f1(by + 480)} ${x + 6} ${f1(by + 740)}" stroke="#7a502a" stroke-opacity=".38" stroke-width="3" fill="none"/>`; }
  g += `<rect x="${f1(-bw / 2)}" y="${f1(by + 120)}" width="${f1(bw)}" height="70" fill="${T.band}" stroke="#d8b25a" stroke-width="6"/>`;
  if (T.arms) g += `<rect x="${f1(-w * .64)}" y="${f1(by + 20)}" width="${f1(w * .3)}" height="96" rx="48" fill="#3e2716"/><rect x="${f1(w * .34)}" y="${f1(by + 20)}" width="${f1(w * .3)}" height="96" rx="48" fill="#3e2716"/>`;
  g += `<path d="M${f1(-w * .44)} ${f1(-h * .46)} L${f1(-w * .34)} ${f1(-h * .8)} Q0 ${f1(-h * .98)} ${f1(w * .34)} ${f1(-h * .8)} L${f1(w * .44)} ${f1(-h * .46)}Z" fill="url(#jgCrown)"/>`;
  for (let i = -3; i <= 3; i++) g += `<circle cx="${f1(i * w * .1)}" cy="${f1(-h * .8 - Math.cos(i / 3.5) * h * .06)}" r="${f1(w * .035)}" fill="#e2b955"/>`;
  g += `<path d="M${f1(-w * .43)} ${f1(-h * .5)} H${f1(w * .43)}" stroke="#e2b955" stroke-width="8"/><circle cy="${f1(-h * .66)}" r="${f1(w * .04)}" fill="#3fa36b"/>`;
  g += `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${f1(w * .26)}" fill="url(#${T.f})" stroke="#c9a24c" stroke-width="7"/>`;
  g += `<path d="M${f1(-w * .07)} ${f1(-h * .47)} L0 ${f1(-h * .02)} L${f1(w * .07)} ${f1(-h * .47)} L${f1(w * .035)} ${f1(-h * .47)} L0 ${f1(-h * .14)} L${f1(-w * .035)} ${f1(-h * .47)}Z" fill="#f4efe2"/><path d="M${f1(-w * .012)} ${f1(-h * .46)} L0 ${f1(-h * .2)} L${f1(w * .012)} ${f1(-h * .46)}Z" fill="#d0263c"/>`;
  const er = w * .17 * T.eye, ey = f1(-h * .06);
  for (const sx of [-1, 1]) { const ex = f1(sx * w * .245); g += `<circle cx="${ex}" cy="${ey}" r="${f1(er)}" fill="#c8263a"/><circle cx="${ex}" cy="${ey}" r="${f1(er * .84)}" fill="#f6f1e4"/><circle cx="${ex}" cy="${ey}" r="${f1(er * .36)}" fill="#0a0a0c"/><circle cx="${f1(ex - er * .12)}" cy="${f1(ey - er * .14)}" r="${f1(er * .08)}" fill="#fff" opacity=".85"/>`; }
  g += `<path d="M${f1(-w * .31)} ${f1(h * .17)} Q0 ${f1(h * .52)} ${f1(w * .31)} ${f1(h * .17)} Q0 ${f1(h * .36)} ${f1(-w * .31)} ${f1(h * .17)}Z" fill="#c8263a"/>`;
  return `<g transform="translate(${cx} ${cy}) scale(${s})" opacity="${op}">${g}</g>`;
}
const CHEST = (type, cy, s) => f1(cy + (IDOLT[type].h * .4 + 300) * s);

/* Krishna as a gentle reclining shape of light (never wounded) */
const LIGHTBODY = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">` + [[-210, -6, 52, 56], [-80, 0, 130, 58], [90, 6, 120, 46], [230, 12, 80, 30]].map(([a, b, rx, ry]) =>
  `<ellipse cx="${a}" cy="${b}" rx="${f1(rx * 1.6)}" ry="${f1(ry * 1.6)}" fill="url(#jgLight)" opacity=".6"/><ellipse cx="${a}" cy="${b}" rx="${f1(rx * .8)}" ry="${f1(ry * .7)}" fill="#eaf2ff" opacity=".5"/>`).join('') + `</g>`;
const MOTES = (x0, x1, y, n, col, seed = 1, rise = 160) => { const R = SEED(seed); let o = '';
  for (let i = 0; i < n; i++) { const x = f1(x0 + R() * (x1 - x0)), yy = f1(y + (R() - .5) * 40); o += A(`drift:${f1(R() * 30 - 15)}:${f1(-(rise * (.6 + R() * .8)))}:${f1(2.5 + R() * 3)}`, `<circle cx="${x}" cy="${yy}" r="${f1(1.2 + R() * 2.4)}" fill="${col}"/>`); } return o; };
const PYRE = (cx, y) => { let o = ''; for (let r = 0; r < 4; r++) for (let i = 0; i < 5 - (r % 2); i++) { const x = cx - 135 + i * 55 + (r % 2) * 27, yy = y + r * 22;
  o += `<rect x="${x}" y="${yy}" width="64" height="20" rx="9" fill="${r % 2 ? '#3a2416' : '#2e1c10'}"/><ellipse cx="${x + 57}" cy="${yy + 10}" rx="6" ry="9" fill="#5a3a22"/>`; } return o; };
const FLAMES = (x0, x1, y, h) => { let o = `<ellipse cx="${(x0 + x1) / 2}" cy="${y}" rx="${f1((x1 - x0) * .8)}" ry="${f1(h * 1.4)}" fill="url(#jgWarm)"/>`;
  for (let i = 0; i < 14; i++) { const x = x0 + (i + .5) * (x1 - x0) / 14, hh = h * (.55 + .45 * Math.abs(Math.sin(i * 2.1))) * (1 - Math.abs(i - 6.5) / 14);
    o += A(`flick:${f1(6 + (i % 4) * 1.7)}`, `<path d="M${f1(x - 12)} ${y} Q${f1(x - 9)} ${f1(y - hh * .5)} ${f1(x + (i % 3 - 1) * 5)} ${f1(y - hh)} Q${f1(x + 9)} ${f1(y - hh * .5)} ${f1(x + 12)} ${y}Z" fill="url(#jgFlame)"/>`); } return o; };
const NIGHTGROUND = y => `<rect y="${y}" width="540" height="${960 - y}" fill="#0b0a16"/><path d="M0 ${y} Q270 ${y - 14} 540 ${y}" stroke="#2a2440" stroke-width="2" fill="none"/>`;

/* sea, moon path, shore */
const SEA = (hz, bot, rows = 12) => { let o = `<rect y="${hz}" width="540" height="${bot - hz}" fill="url(#jgSea)"/>`;
  for (let r = 0; r <= rows; r++) { const p = r / rows, y = hz + Math.pow(p, 1.6) * (bot - hz), am = 2 + p * 12, k = .03 - p * .018; let d = `M-10 ${f1(y)}`;
    for (let x = 0; x <= 555; x += 15) d += ` L${x} ${f1(y + am * Math.sin(x * k + r * 1.7))}`;
    o += A(`bob:${f1(1 + p * 3)}:${(.15 + p * .1).toFixed(2)}`, `<path d="${d}" stroke="#8caaeb" stroke-opacity="${(.12 + .25 * p).toFixed(2)}" stroke-width="${f1(1 + p * 2)}" fill="none"/>`); } return o; };
const MOONPATH = (x, y0, y1) => { let o = ''; for (let i = 0; i < 40; i++) { const p = i / 40, y = y0 + (y1 - y0) * p * p, w = 6 + p * 60, xx = x + Math.sin(i * 2.7) * (14 + p * 90);
  o += A(`flick:${2 + (i % 5)}`, `<rect x="${f1(xx - w / 2)}" y="${f1(y)}" width="${f1(w)}" height="${f1(1 + p * 2)}" fill="#e6e6ff" opacity=".35"/>`); } return o; };
const SHORE = y => `<path d="M0 ${y} Q135 ${y - 10} 270 ${y} T540 ${y} V960 H0Z" fill="url(#jgSand)"/>` + A('bob:2:.25', `<path d="M0 ${y} Q135 ${y - 10} 270 ${y} T540 ${y}" stroke="#e6ebff" stroke-opacity=".5" stroke-width="3" fill="none"/>`);
const GLOWREF = (x, y) => `<ellipse cx="${x}" cy="${y + 34}" rx="26" ry="70" fill="url(#jgHalo)"/>`;

/* Puri: the temple (rekha deula) and the town whose lights go off one by one */
const TEMPLE = (cx, by, s, fill) => `<g transform="translate(${cx} ${by}) scale(${s})" fill="${fill}"><rect x="-300" y="-120" width="600" height="120"/><rect x="-250" y="-170" width="500" height="60"/>` +
  `<path d="M-200 -170 C-215 -520 -150 -780 -70 -900 L70 -900 C150 -780 215 -520 200 -170Z"/><ellipse cy="-915" rx="95" ry="32"/><path d="M-34 -940 Q0 -1010 34 -940Z"/><rect x="-4" y="-1110" width="8" height="110"/>` +
  `<circle cy="-1030" r="34" fill="none" stroke="${fill}" stroke-width="8"/><path d="M-34 -1030 H34 M0 -1064 V-996 M-24 -1054 L24 -1006 M24 -1054 L-24 -1006" stroke="${fill}" stroke-width="6"/><path d="M4 -1110 L70 -1092 L4 -1074Z" fill="#7a1a2a"/></g>`;
const CITY = (t0, t1) => { const R = SEED(7), houses = [], lights = [];
  for (let row = 0; row < 2; row++) { let x = -10; const base = 840 + row * 70; while (x < 550) { const w = 45 + R() * 55, h = 60 + R() * 70 - row * 8; houses.push({ x, y: base - h, w, h, row }); x += w + 4; } }
  houses.forEach(h => { const n = 1 + Math.floor(R() * 2); for (let i = 0; i < n; i++) lights.push({ x: h.x + 10 + R() * (h.w - 26), y: h.y + 14 + R() * (h.h - 40), k: 'win' }); });
  for (let i = 0; i < 5; i++) lights.push({ x: 50 + i * 110, y: 900, k: 'lamp' });
  lights.forEach(l => l.d = Math.abs(l.x - 270) + R() * 40); lights.sort((a, b) => b.d - a.d);
  let o = '';
  houses.forEach(h => { o += `<rect x="${f1(h.x)}" y="${f1(h.y)}" width="${f1(h.w)}" height="${f1(h.h + 200)}" fill="${h.row ? '#07070f' : '#0d0e20'}"/><path d="M${f1(h.x - 4)} ${f1(h.y)} L${f1(h.x + h.w / 2)} ${f1(h.y - 22)} L${f1(h.x + h.w + 4)} ${f1(h.y)}Z" fill="${h.row ? '#07070f' : '#0d0e20'}"/>`; });
  lights.forEach((l, i) => { const at = f1(t0 + i * (t1 - t0) / lights.length);
    if (l.k === 'win') o += `<rect x="${f1(l.x)}" y="${f1(l.y)}" width="11" height="15" fill="#1a1622"/>` + A(`fadeout:${at}:.25`, `<circle cx="${f1(l.x + 5)}" cy="${f1(l.y + 7)}" r="26" fill="url(#jgWin)"/><rect x="${f1(l.x)}" y="${f1(l.y)}" width="11" height="15" fill="#ffd27a"/>`);
    else o += `<path d="M${l.x} 960 V${l.y}" stroke="#05050c" stroke-width="4"/>` + A(`fadeout:${at}:.25`, `<circle cx="${l.x}" cy="${l.y}" r="34" fill="url(#jgWin)"/><circle cx="${l.x}" cy="${l.y}" r="4" fill="#ffe2a0"/>`); });
  return o; };
const TEMPLELAMPS = at => { let o = ''; for (let i = 0; i < 7; i++) { const x = 270 + (i - 3) * 30, y = 742; o += A(`fadeout:${at}:.4`, `<circle cx="${x}" cy="${y}" r="16" fill="url(#jgWin)"/><circle cx="${x}" cy="${y}" r="2.5" fill="#ffe2a0"/>`); } return o; };
const RINGS = (x, y) => [0, 1, 2].map(i => A(`ripple:1:${x}:${y}`, `<ellipse cx="${x}" cy="${y}" rx="${150 + i * 60}" ry="${110 + i * 44}" fill="none" stroke="#ffbea8" stroke-opacity=".35" stroke-width="2"/>`)).join('');
const PRIEST = (x, y, s, prop, extra = {}) => Object.assign({ c: PUJARI, with: { blindfold: true }, x, y, s, expr: 'serene', gesture: false, acts: [[0, 'offer']], props: { front: prop } }, extra);

/* Chrome only paints a gradient whose FIRST definition is visible, and hidden shots are display:none, so every shot gets its own ids (jg -> jg<shot>_). */
const withDefs = list => list.map((s, i) => { ['sky', 'far', 'mid', 'art', 'near', 'front'].forEach(k => { const fn = s[k]; if (typeof fn === 'function') s[k] = () => { let v = fn(); if (!v.includes('url(#jg')) return v; if (!v.includes('id="jgSky"')) v = DEFS + v; return v.replace(/(id="|url\(#)jg/g, `$1jg${i}_`); }; }); return s; });

VIDEO({
  title: 'जगन्नाथ जी का धड़कता हृदय', format: 'short', target: 85,
  music: 'scenes',  // scene sound library; no drums except the soft heartbeat cues at the end
  handheld: .4,
  keywords: ['जगन्नाथ', 'रहस्य', 'हृदय', 'श्री कृष्ण', 'पुरी', 'इंद्रद्युम्न', 'विश्वकर्मा', 'ब्रह्म पदार्थ', 'नवकलेवर', 'अंधेरा', 'धड़कता'],
  shots: withDefs([
    /* 1 — opening: closed wooden idol face in indigo dark, one tiny pulse inside */
    { line: 'भगवान जगन्नाथ की लकड़ी की मूर्ति के भीतर एक ऐसा गहरा रहस्य छिपा है,', scene: 'jagannath-secret', mood: 'calm', capTop: 90, fx: 'dust',
      cam: { from: [270, 470, 1.0], to: [270, 500, 1.1] },
      sky: () => SKY(50, 500), art: () => IDOL('jag', 270, 470, .52, .82) + HEART(270, CHEST('jag', 470, .52), 8, .8) },
    /* 2 — never seen: slow push toward the glow (never a close view of the secret) */
    { line: 'जिसे आज तक किसी भी इंसान ने अपनी आँखों से नहीं देखा है।', scene: 'jagannath-secret', mood: DARK, capTop: 90, tr: 'fade',
      cam: { from: [270, 560, 1.12], to: [270, 650, 1.35] },
      sky: () => SKY(40, 500), art: () => IDOL('jag', 270, 470, .52, .62) + HEART(270, CHEST('jag', 470, .52), 7, .85) },
    /* 3 — Krishna, serene, the heart beating on his chest */
    { line: 'भक्तों की मान्यता है कि यह स्वयं भगवान श्री कृष्ण का धड़कता हुआ हृदय है।', scene: 'krishna-heart', mood: 'divine', tr: 'glow', fx: 'stars',
      cam: { from: [270, 600, 1.05], to: [270, 620, 1.18] },
      sky: () => SKY(80, 700) + `<circle cx="270" cy="560" r="230" fill="url(#saf)" opacity=".28"/>`, art: () => NIGHTGROUND(880),
      cast: [{ c: KRISHNA, x: 270, y: 900, s: 1.08, expr: 'serene', acts: [[0, 'stand'], [1.2, 'bless', .9]] }],
      front: () => HEART(268, 720, 8, .95) },
    /* 4 — the departure, told gently: Krishna fades into light under the peepal (no hunter, no wound) */
    { line: 'कथा के अनुसार, जब एक शिकारी के तीर से घायल होने के बाद श्री कृष्ण ने इस संसार से प्रस्थान किया,', scene: 'krishna-departs', mood: 'sad', tr: 'fade', fx: 'stars',
      cam: { from: [270, 560, 1.12], to: [270, 520, 1.0] },
      sky: () => SKY(90, 700), far: () => peepal(400, 880, 1.1), art: () => NIGHTGROUND(880),
      cast: [{ c: KRISHNA, x: 250, y: 890, s: 1.0, expr: 'serene', eyes: 'closed', acts: [[0, 'namaste']], exit: { at: 2.6, fade: 2.4 } }],
      front: () => A('fadein:2.2:1.6', `<ellipse cx="250" cy="760" rx="90" ry="170" fill="url(#jgLight)" opacity=".7"/>` + MOTES(170, 330, 760, 40, '#cfe0ff', 3, 260)) },
    /* 5 — the last rites: a body of light above the pyre; the fire stays low, never on him */
    { line: 'तो उनके पार्थिव शरीर का अंतिम संस्कार किया गया।', scene: 'body-to-light', mood: 'sad', tr: 'fade', fx: 'embers', capTop: 330,
      cam: { from: [270, 640, 1.0], to: [270, 660, 1.12] },
      sky: () => SKY(80, 600), art: () => NIGHTGROUND(860) + PYRE(270, 800) + FLAMES(150, 390, 800, 46) + LIGHTBODY(270, 690, .45) },
    /* 6 — the body melts into light (pancha-tattva), only the heart stays */
    { line: 'अग्नि में उनका संपूर्ण शरीर पंचतत्व में विलीन हो गया,', scene: 'body-to-light', mood: 'sad', fx: 'embers', capTop: 330,
      cam: { from: [270, 660, 1.12], to: [270, 680, 1.2] },
      sky: () => SKY(80, 600), art: () => NIGHTGROUND(860) + PYRE(270, 800) + FLAMES(150, 390, 800, 52) + A('fadeout:.5:3.2', LIGHTBODY(270, 690, .45)) + MOTES(160, 400, 690, 70, '#d4e2ff', 5, 300) + HEART(245, 690, 8, .9) },
    /* 7 — the heart does not burn: it glows in the fire */
    { line: 'लेकिन केवल उनका हृदय नहीं जला—वह किसी दिव्य प्रकाश की तरह चमकता रहा, मानो उसमें आज भी प्राण हों।', scene: 'heart-in-fire', mood: 'divine', tr: 'glow', fx: 'embers', capTop: 300,
      cam: { from: [270, 720, 1.1], to: [270, 740, 1.45] }, focus: { at: 1.2, sound: 'shimmer', dur: 3, duck: .45 },
      sky: () => SKY(70, 600), art: () => NIGHTGROUND(860) + PYRE(270, 800) + FLAMES(140, 400, 800, 120) + HEART(270, 748, 13, 1) },
    /* 8 — given to the sea; the heart floats on the moonlit waves */
    { line: 'इसके बाद उस दिव्य हृदय को समुद्र में प्रवाहित कर दिया गया,', scene: 'heart-on-sea', mood: 'calm', tr: 'dip', capTop: 120,
      cam: { from: [270, 520, 1.0], to: [270, 560, 1.08] },
      sky: () => SKY(90, 420) + moon(400, 200, 34), art: () => SEA(430, 960, 14) + MOONPATH(400, 432, 820) + A('bob:4:.35', A('slide:150:-170:4.4:0', GLOWREF(220, 650) + HEART(220, 650, 9))) },
    /* 9 — the waves carry it to the shore of Puri */
    { line: 'और समुद्र की लहरें उसे बहाकर पुरी के तट तक ले आईं।', scene: 'heart-on-sea', mood: 'calm', capTop: 120,
      cam: { from: [270, 560, 1.05], to: [250, 650, 1.18] },
      sky: () => SKY(90, 380) + moon(420, 170, 30), art: () => SEA(390, 820, 12) + MOONPATH(420, 392, 760) + SHORE(820) + A('bob:3:.3', A('slide:90:-240:3.8:0', GLOWREF(250, 806) + HEART(250, 806, 11))) },
    /* 10 — King Indradyumna, told in a dream, waits at the shore with folded hands */
    { line: 'वहाँ राजा इंद्रद्युम्न, जिन्हें पहले ही स्वप्न में इसका संकेत मिल चुका था, उसकी प्रतीक्षा कर रहे थे।', scene: 'king-waits', mood: 'hope', tr: 'fade',
      cam: { from: [300, 560, 1.0], to: [280, 580, 1.1] },
      sky: () => SKY(80, 400) + moon(110, 170, 30), far: () => SEA(420, 700, 10) + MOONPATH(110, 422, 690), art: () => SHORE(700) + GLOWREF(130, 712) + HEART(130, 712, 11),
      cast: [{ c: INDRADYUMNA, x: 390, y: 880, s: 1.05, flip: true, expr: 'serene', acts: [[0, 'namaste']] }],
      front: () => A('fadeout:2.4:1.6', HEART(392, 500, 5, .5)) },
    /* 11 — Vishwakarma carves the wood */
    { line: 'देवताओं के शिल्पी विश्वकर्मा ने भगवान जगन्नाथ, बलभद्र और सुभद्रा की मूर्तियों का निर्माण किया,', scene: 'vishwakarma-carves', mood: 'hope', tr: 'wipe', fx: 'dust',
      cam: { from: [300, 600, 1.12], to: [320, 600, 1.0] },
      sky: () => DEFS + `<rect width="540" height="960" fill="url(#jgSky)"/><circle cx="140" cy="900" r="330" fill="url(#saf)" opacity=".22"/>`,
      art: () => NIGHTGROUND(880) + `<rect x="300" y="430" width="170" height="460" rx="24" fill="url(#jgWood)"/>` + A('fadein:.4:3.4', IDOL('jag', 385, 545, .26, .9)) + MOTES(290, 330, 600, 24, '#c99a5e', 9, 120),
      cast: [{ c: VISHWAKARMA, x: 190, y: 885, s: 1.0, expr: 'calm', gesture: false, props: { front: 'mallet' }, acts: [[0, 'offer'], [.5, 'armUp', .25], [.85, 'offer', .15], [1.5, 'armUp', .25], [1.85, 'offer', .15], [2.5, 'armUp', .25], [2.85, 'offer', .15], [3.5, 'armUp', .25], [3.85, 'offer', .15]] }] },
    /* 12 — the three idols; the holy heart placed within Jagannath (light only) */
    { line: 'और उस पवित्र हृदय को भगवान जगन्नाथ की मूर्ति के भीतर स्थापित किया गया।', scene: 'heart-placed', mood: 'divine', tr: 'glow', capTop: 120,
      cam: { from: [270, 560, 1.0], to: [270, 580, 1.06] }, focus: { at: 2.6, sound: 'revive', dur: 3, duck: .45 },
      sky: () => SKY(60, 400), art: () => `<rect y="770" width="540" height="190" fill="#120d1c"/><path d="M0 770 H540" stroke="#c9a24c" stroke-width="2"/>` +
        IDOL('bal', 95, 470, .26) + IDOL('sub', 270, 515, .26) + IDOL('jag', 445, 470, .26) + A('slide:-175:-250:2.6:.2', HEART(445, CHEST('jag', 470, .26), 8, .95)) },
    /* 13 — Brahma Padartha, the essence of the soul */
    { line: "भक्त इस रहस्यमयी तत्व को 'ब्रह्म पदार्थ' यानी आत्मा का सार कहते हैं।", scene: 'brahma-padarth', mood: 'divine', tr: 'iris', trAt: [270, 470], capTop: 640, fx: 'stars',
      cam: { from: [270, 470, 1.0], to: [270, 470, 1.1] },
      sky: () => SKY(110, 960), art: () => A('ripple:3:270:470', `<circle cx="270" cy="470" r="170" fill="none" stroke="#ffcfb8" stroke-opacity=".3" stroke-width="2"/>`) + HEART(270, 470, 24, 1) + big(270, 250, 40, '#ffe2a8', 'ब्रह्म पदार्थ', .8) },
    /* 14 — Nabakalebara: every 12 to 19 years (glowing text + the new timeline template) */
    { line: 'हर 12 से 19 वर्षों के अंतराल पर (नवकलेवर उत्सव के दौरान) पुरानी मूर्तियों के स्थान पर नई लकड़ी की मूर्तियाँ स्थापित की जाती हैं।', scene: 'nabakalebara-cycle', mood: 'calm', tr: 'fade', capTop: 120, fx: 'stars',
      cam: 'up',
      sky: () => SKY(80, 960), art: () => big(270, 285, 54, '#ffd9a8', '12 से 19 वर्ष', .3) + `<circle cx="270" cy="270" r="160" fill="url(#jgHalo)"/>` +
        timeline(270, 380, [{ t: 'नवकलेवर', d: 'पुरानी मूर्तियाँ' }, { t: '12 से 19 वर्ष', d: 'अंतराल', hi: true }, { t: 'नवकलेवर', d: 'नई लकड़ी की मूर्तियाँ' }], { gap: 165, delay: 1.2, step: .9 }) },
    /* 15 — the lights of Puri go off, one by one, the temple lamps last */
    { line: 'उस विशेष रात को पूरे पुरी शहर की बिजली बंद कर दी जाती है', scene: 'puri-lights-off', mood: 'calm', tr: 'fade', capTop: 120,
      cam: { from: [270, 560, 1.0], to: [270, 600, 1.08] },
      sky: () => SKY(90, 700), far: () => TEMPLE(270, 820, .5, '#0a0b1c') + TEMPLELAMPS(4.0), art: () => CITY(.5, 3.8) },
    /* 16 — total darkness */
    { line: 'और चारों ओर घना अंधेरा कर दिया जाता है।', scene: 'puri-lights-off', mood: DARK, capTop: 640,
      cam: { from: [270, 600, 1.08], to: [270, 560, 1.16] },
      sky: () => SKY(120, 760) + `<rect width="540" height="960" fill="#000" opacity=".45"/>`, far: () => TEMPLE(270, 820, .5, '#06060f'), art: () => CITY(-5, -4) },
    /* 17 — the chief priest's eyes are blindfolded (face close-up in the dark) */
    { line: 'मुख्य पुजारियों की आँखों पर पट्टी बाँधी जाती है', scene: 'priests-darkness', mood: DARK, tr: 'dip', capTop: 120,
      cam: { from: [270, 560, 1.4], to: [270, 600, 1.8] },
      sky: () => DEFS + `<rect width="540" height="960" fill="#04040a"/><circle cx="270" cy="640" r="300" fill="url(#jgWarm)" opacity=".5"/>`,
      cast: [{ c: PUJARI, with: { blindfold: true }, x: 270, y: 930, s: 1.25, expr: 'serene', gesture: false, acts: [[0, 'stand'], [.6, 'lookDown', 1.2]] }] },
    /* 18 — thick cloth wrapped on the hands, so they can neither see nor touch */
    { line: 'और हाथों में मोटा कपड़ा लपेटा जाता है, ताकि वे इसे न देख सकें और न ही सीधे स्पर्श कर सकें,', scene: 'priests-darkness', mood: DARK, capTop: 120,
      cam: { from: [270, 600, 1.12], to: [270, 640, 1.22] },
      sky: () => DEFS + `<rect width="540" height="960" fill="#04040a"/><circle cx="270" cy="700" r="320" fill="url(#jgWarm)" opacity=".4"/>`,
      cast: [PRIEST(120, 880, .9, 'cloth'), PRIEST(400, 880, .9, 'cloth'), PRIEST(260, 905, 1.0, 'cloth')] },
    /* 19 — carried in darkness from the old idol to the new one */
    { line: 'और इसी अवस्था में वे ब्रह्म पदार्थ को पुरानी मूर्ति से निकालकर नई मूर्ति में स्थानांतरित करते हैं।', scene: 'priests-darkness', mood: DARK, tr: 'fade', capTop: 120,
      cam: { from: [220, 600, 1.1], to: [330, 600, 1.1] },
      sky: () => DEFS + `<rect width="540" height="960" fill="#03030a"/>`, art: () => IDOL('jag', 75, 520, .2, .35) + IDOL('jag', 470, 520, .2, .7),
      cast: [PRIEST(300, 885, .95, 'heartCloth', { walk: { from: -180, dur: 4.2 } })] },
    /* 20 — every priest who did it says the same thing — the heartbeat begins */
    { line: 'जिन पुजारियों ने इस प्रक्रिया को संपन्न किया है,', scene: 'heartbeat-hands', mood: DARK, tr: 'dip', capTop: 120,
      cam: { from: [270, 620, 1.2], to: [270, 650, 1.4] },
      sky: () => DEFS + `<rect width="540" height="960" fill="#020206"/>`,
      cast: [PRIEST(130, 870, .85, 'cloth'), PRIEST(410, 870, .85, 'cloth'), PRIEST(270, 920, 1.15, 'heartCloth')], front: () => HEART(389, 700, 11, .85) },
    /* 21 — CLIMAX: in total darkness, the light beats in their cloth-wrapped hands like a living heart */
    { line: 'उनका बस एक ही अनुभव होता है—कि हाथों में वह तत्व किसी जीवित हृदय की तरह धड़कता हुआ महसूस होता है।', scene: 'heartbeat-hands', mood: DARK, capTop: 120, dur: 7.5,
      cam: { keys: [[0, 320, 660, 1.4], [4.0, 360, 685, 1.85], [7.5, 365, 690, 1.95]] },
      sky: () => DEFS + `<rect width="540" height="960" fill="#010104"/>`,
      cast: [PRIEST(270, 920, 1.15, 'heartCloth')], front: () => RINGS(389, 700) + HEART(389, 700, 15, 1) },
    /* 22 — ending: the heartbeat glowing softly inside the idol */
    { line: 'जय जगन्नाथ!', scene: 'jagannath-heartbeat', mood: 'divine', tr: 'glow', capTop: 90, dur: 3.2,
      cam: { from: [270, 520, 1.1], to: [270, 500, 1.0] },
      sky: () => SKY(50, 500), art: () => IDOL('jag', 270, 450, .55, .85) + HEART(270, CHEST('jag', 450, .55), 9, .7) +
        `<g transform="translate(270 905)"><path d="M-22 0 Q0 16 22 0 L16 -8 L-16 -8Z" fill="#a8582a"/>${A('flick:7', '<circle cy="-22" r="40" fill="url(#saf)"/>')}<path d="M5 -8 Q10 -24 2 -34 Q-3 -21 5 -8Z" fill="#ffd27a"/></g>` }
  ])
});
})();
