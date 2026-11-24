/* Barbarik, cinematic style test (~16 s Short). Words come exactly from my-script.md (placeholder test lines).
   Build: node tools/build.js barbarik-cinematic-test-short-form

   STYLE TEST: only the look is being judged. Look borrowed from a "Dawn of the Empire" style sunset film:
   purple-to-orange sky, painterly flat cloud strips with a lit underside, big sun with soft rings, dark silhouette
   spires and mountains fading into haze, a plaza lit by the sun with long rows of tiny soldiers in perspective,
   orange rim light on the hero. No content copied: spires are temple towers, the army is the Kurukshetra army.
   No intro, hook text or end card. */
(() => {   // private scope: helper names here never clash with engine globals
const rg = seed => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const n1 = v => Math.round(v * 10) / 10;
const HZ = 612;   // horizon line

/* ---- sky: gradient, sun with rings, painterly cloud strips ---- */
function cloudStrip(x, y, w, h, seed, tone) {
  const r = rg(seed), N = 9; let top = '', bot = '';
  for (let k = 0; k <= N; k++) { const u = k / N, px = x + u * w, hh = h * Math.sin(Math.PI * Math.min(.98, u + .01)) * (.55 + .45 * r());
    top += `${k ? 'L' : 'M'}${n1(px)} ${n1(y - hh * .6)} `; }
  for (let k = N; k >= 0; k--) { const u = k / N, px = x + u * w, hh = h * Math.sin(Math.PI * Math.min(.98, u + .01));
    bot += `L${n1(px)} ${n1(y + hh * .3)} `; }
  let s = `<path d="${top}${bot}Z" fill="${tone.dark}" opacity=".9"/>`;                       // dark purple body
  let lit = '', lw = w * (.7 + r() * .25), lx = x + (w - lw) * r();                           // lit strip with ragged ends
  lit += `<rect x="${n1(lx)}" y="${n1(y + h * .05)}" width="${n1(lw)}" height="${n1(h * .34)}" rx="${n1(h * .17)}" fill="${tone.lit}"/>`;
  for (let k = 0; k < 7; k++) { const bw = lw * (.15 + r() * .35), bx = lx + r() * (lw - bw); lit += `<rect x="${n1(bx)}" y="${n1(y + h * (.07 + r() * .26))}" width="${n1(bw)}" height="2" fill="${tone.hi}" opacity=".7"/>`; }
  for (let k = 0; k < 5; k++) { lit += `<rect x="${n1(lx - 10 - r() * 40)}" y="${n1(y + h * (.1 + r() * .2))}" width="${n1(8 + r() * 26)}" height="${n1(2 + r() * 3)}" fill="${tone.lit}" opacity="${n1(.5 + r() * .4)}"/>`;
    lit += `<rect x="${n1(lx + lw + 4 + r() * 30)}" y="${n1(y + h * (.1 + r() * .2))}" width="${n1(8 + r() * 26)}" height="${n1(2 + r() * 3)}" fill="${tone.lit}" opacity="${n1(.5 + r() * .4)}"/>`; }
  return s + lit;
}
function skyLayer(i, sunX, sunY, sunR) {
  const P = `cn${i}_`, r = rg(40 + i);
  let st = ''; for (let k = 0; k < 40; k++) st += `<circle cx="${n1(r() * 540)}" cy="${n1(r() * 260)}" r="${n1(.5 + r() * .9)}" fill="#f4e6d0" opacity="${n1(.25 + r() * .5)}"/>`;
  const dark = { dark: '#3a1a58', lit: '#f6c46a', hi: '#ffe7ae' }, mid = { dark: '#5a2462', lit: '#ee9a52', hi: '#ffd08a' }, low = { dark: '#7a2a58', lit: '#f6b25c', hi: '#ffe0a0' };
  const clouds = A('slide:26:0:7:0', cloudStrip(-30, 150, 330, 38, 3 + i, dark) + cloudStrip(310, 205, 300, 34, 9 + i, dark))
    + A('slide:-34:0:7:0', cloudStrip(40, 330, 380, 42, 21 + i, mid) + cloudStrip(330, 400, 260, 30, 5 + i, mid))
    + A('slide:20:0:7:0', cloudStrip(-60, 500, 360, 30, 12 + i, low) + cloudStrip(300, 548, 300, 24, 17 + i, low));
  return `<defs>
<linearGradient id="${P}sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${HZ}"><stop offset="0" stop-color="#150b38"/><stop offset=".3" stop-color="#3f1c66"/><stop offset=".52" stop-color="#8e3470"/><stop offset=".72" stop-color="#e0583f"/><stop offset=".88" stop-color="#f69a48"/><stop offset="1" stop-color="#fbd083"/></linearGradient>
<radialGradient id="${P}sun"><stop offset="0" stop-color="#fff6cc" stop-opacity="1"/><stop offset=".2" stop-color="#ffd884" stop-opacity=".7"/><stop offset=".55" stop-color="#ff9a44" stop-opacity=".22"/><stop offset="1" stop-color="#ff7a30" stop-opacity="0"/></radialGradient>
<linearGradient id="${P}haze" gradientUnits="userSpaceOnUse" x1="0" y1="${HZ - 150}" x2="0" y2="${HZ}"><stop offset="0" stop-color="#f69a48" stop-opacity="0"/><stop offset="1" stop-color="#fbd083" stop-opacity=".75"/></linearGradient>
<linearGradient id="${P}gnd" gradientUnits="userSpaceOnUse" x1="0" y1="${HZ}" x2="0" y2="960"><stop offset="0" stop-color="#6a2c52"/><stop offset=".25" stop-color="#3a1a40"/><stop offset="1" stop-color="#150a22"/></linearGradient>
</defs>
<rect width="540" height="${HZ + 4}" fill="url(#${P}sky)"/>${st}
<circle cx="${sunX}" cy="${sunY}" r="${sunR * 7}" fill="url(#${P}sun)"/>
<circle cx="${sunX}" cy="${sunY}" r="${sunR * 2.6}" fill="#ffe29a" opacity=".16"/><circle cx="${sunX}" cy="${sunY}" r="${sunR * 1.8}" fill="#ffe29a" opacity=".2"/>
<circle cx="${sunX}" cy="${sunY}" r="${sunR}" fill="#fff4c4"/>
${clouds}`;
}

/* ---- far: mountains, temple-tower silhouettes, haze ---- */
function tower(x, base, h, w, col, rim) {
  // shikhara: plinth, curved tapering body with stepped tiers, amalaka disc, kalash and flag
  const hw = w / 2, tiers = 5; let L = '', R = '';
  for (let k = 0; k <= tiers; k++) {
    const t = k / tiers, y = base - h * .08 - h * .68 * t, half = hw * (1 - .62 * Math.pow(t, 1.25));
    const notch = k < tiers ? half * .14 : 0;
    L += ` L${n1(x - half - notch)} ${n1(y)} L${n1(x - half)} ${n1(y - h * .02)}`;
    R = ` L${n1(x + half)} ${n1(y - h * .02)} L${n1(x + half + notch)} ${n1(y)}` + R;
  }
  const topY = base - h * .76, am = hw * .34, kal = base - h * .86;
  const body = `M${n1(x - hw * 1.25)} ${base} L${n1(x - hw * 1.25)} ${n1(base - h * .05)} L${n1(x - hw)} ${n1(base - h * .05)}${L} L${n1(x - am * .5)} ${n1(topY)} L${n1(x + am * .5)} ${n1(topY)}${R} L${n1(x + hw)} ${n1(base - h * .05)} L${n1(x + hw * 1.25)} ${n1(base - h * .05)} L${n1(x + hw * 1.25)} ${base}Z`;
  return `<path d="${body}" fill="${col}"/>`
    + `<ellipse cx="${x}" cy="${n1(topY)}" rx="${n1(am)}" ry="${n1(am * .3)}" fill="${col}"/>`
    + `<path d="M${n1(x - am * .45)} ${n1(topY)} Q${x} ${n1(kal - 10)} ${n1(x + am * .45)} ${n1(topY)}Z" fill="${col}"/>`
    + `<line x1="${x}" y1="${n1(kal - 4)}" x2="${x}" y2="${n1(kal - 26)}" stroke="${col}" stroke-width="2"/>`
    + `<path d="M${x} ${n1(kal - 26)} l14 4 l-14 4Z" fill="${rim}" opacity=".8"/>`
    + `<path d="M${n1(x + hw * 1.25)} ${base} L${n1(x + hw * 1.25)} ${n1(base - h * .05)} L${n1(x + hw)} ${n1(base - h * .05)} L${n1(x + hw * .62)} ${n1(base - h * .3)} L${n1(x + hw * .3)} ${n1(base - h * .55)} L${n1(x + am * .5)} ${n1(topY)}" fill="none" stroke="${rim}" stroke-width="1.6" opacity=".55"/>`;
}
function ridge(seed, y, amp, step, fill) { const r = rg(seed); let d = `M-20 ${HZ + 4} L-20 ${y}`; for (let x = -20; x <= 580; x += step) d += ` L${n1(x + step * .5)} ${n1(y - amp * (.3 + r() * .7))} L${n1(x + step)} ${n1(y - amp * .1 * r())}`; return `<path d="${d} L580 ${HZ + 4}Z" fill="${fill}"/>`; }
function farLayer(i) {
  const P = `cn${i}_`;
  let t = '';
  [[24, 300, 64, '#4a2250'], [92, 220, 54, '#4a2250'], [446, 260, 58, '#4a2250'], [500, 320, 66, '#4a2250'], [372, 170, 46, '#4a2250']].forEach(a => t += tower(a[0], HZ, a[1], a[2], a[3], '#f6a04a'));
  return ridge(7, HZ - 6, 46, 70, '#7a3560') + ridge(11, HZ, 30, 46, '#5a2552') + t + `<rect y="${HZ - 150}" width="540" height="154" fill="url(#${P}haze)"/>`;
}

/* ---- mid: plaza in perspective, sun path, banners, army rows ---- */
function midLayer(i, sunX) {
  const P = `cn${i}_`, r = rg(90 + i);
  let g = `<path d="M-40 ${HZ} L580 ${HZ} L580 960 L-40 960Z" fill="url(#${P}gnd)"/>`;
  g += `<path d="M${sunX - 14} ${HZ} L${sunX + 14} ${HZ} L${sunX + 260} 960 L${sunX - 260} 960Z" fill="#ffb45a" opacity=".2"/>`;     // sun path on the floor
  for (let x = -900; x <= 1440; x += 110) g += `<line x1="270" y1="${HZ}" x2="${x}" y2="960" stroke="#f6a04a" stroke-width="1" opacity=".1"/>`;
  for (let j = 1; j <= 10; j++) { const y = HZ + 348 * Math.pow(j / 10, 2); g += `<line x1="0" y1="${n1(y)}" x2="540" y2="${n1(y)}" stroke="#f6a04a" stroke-width="1" opacity=".09"/>`; }
  g += `<defs><g id="${P}sol"><circle cy="-34" r="6"/><path d="M-7 -28 L7 -28 L9 0 L-9 0Z"/><path d="M-6 -41 L0 -52 L6 -41Z"/><line x1="12" y1="2" x2="14" y2="-64" stroke-width="2"/></g></defs>`;
  const R = 13, blocks = [-250, -135, 0, 135, 250], far = [52, 20, 60], near = [18, 8, 28];
  for (let k = 0; k < R; k++) {
    const d = Math.pow((k + 1) / R, 1.7), y = HZ + 6 + d * 176, s = .075 + d * .62, f = 1 - d;
    const col = `rgb(${Math.round(far[0] * f + near[0] * (1 - f))},${Math.round(far[1] * f + near[1] * (1 - f))},${Math.round(far[2] * f + near[2] * (1 - f))})`;
    const spread = .4 + .6 * d, sp = 24 * s + 1.2;
    let row = '';
    blocks.forEach((b, bi) => {
      const cols = 5, cx = 270 + b * spread;
      for (let c = 0; c < cols; c++) { const x = cx + (c - (cols - 1) / 2) * sp + (r() - .5) * s * 3; if (x < -30 || x > 570) continue;
        row += `<use href="#${P}sol" transform="translate(${n1(x)} ${n1(y + (r() - .5) * s * 2)}) scale(${n1(s * 100) / 100})"/>`; }
    });
    g += A(`bob:${n1(.5 + d * 2.2)}:${n1(1.1 + k * .13)}`, `<g fill="${col}" stroke="${col}">${row}</g>`);
    // long soft shadows toward the viewer, away from the sun
    if (k > 3) g += `<path d="M0 ${n1(y + 2)} L540 ${n1(y + 2)} L540 ${n1(y + 6 + s * 10)} L0 ${n1(y + 6 + s * 10)}Z" fill="#1a0c28" opacity=".22"/>`;
  }
  for (let k = 0; k < 4; k++) g += A(`drift:${k % 2 ? -90 : 90}:0:${5 + k}`, `<ellipse cx="${120 + k * 110}" cy="${HZ + 40 + k * 38}" rx="${70 + k * 20}" ry="${5 + k * 2}" fill="#ffc878" opacity=".16"/>`);
  const bn = (x, y, s, c, fl) => `<g transform="translate(${x} ${y}) scale(${s})">${banner(0, 0, 110, c, fl)}</g>`;
  g += bn(60, HZ + 70, .55, '#e4572e') + bn(210, HZ + 52, .4, '#e4572e') + bn(330, HZ + 52, .4, '#d9a05b', true) + bn(480, HZ + 70, .55, '#d9a05b', true);
  return g;
}

/* ---- art: the stone terrace the hero stands on; near: parapet in front ---- */
function artLayer(i) {
  const P = `cn${i}_`;
  let g = `<path d="M-60 812 L600 812 L600 1000 L-60 1000Z" fill="#150a22"/><path d="M-60 812 L600 812" stroke="#f08a3c" stroke-width="2.4" opacity=".85"/>`;
  g += `<path d="M-60 816 L600 816 L600 840 L-60 840Z" fill="#f08a3c" opacity=".12"/>`;
  for (let x = -300; x <= 840; x += 90) g += `<line x1="${x * .5 + 135}" y1="812" x2="${x}" y2="1000" stroke="#f08a3c" stroke-width="1" opacity=".16"/>`;
  [850, 900, 960].forEach(y => g += `<line x1="0" y1="${y}" x2="540" y2="${y}" stroke="#f08a3c" stroke-width="1" opacity=".13"/>`);
  return g;
}
function nearLayer(i) {
  let g = `<rect x="-20" y="930" width="580" height="14" fill="#0d0616"/><path d="M-20 930 L560 930" stroke="#f08a3c" stroke-width="2" opacity=".8"/>`;
  for (let x = 6; x < 540; x += 34) g += `<path d="M${x} 944 q-7 -4 -3 -14 h12 q4 10 -3 14 q4 10 -2 16 h-6 q-6 -6 2 -16Z" fill="#0d0616"/>`;
  return g + `<rect x="-20" y="958" width="580" height="30" fill="#0d0616"/>`;
}

/* ---- the four shots ---- */
const SK = (i, sx = 270, sy = 560, sr = 30) => ({ sky: () => skyLayer(i, sx, sy, sr), far: () => farLayer(i), mid: () => midLayer(i, sx), art: () => artLayer(i), near: () => nearLayer(i) });
const HERO = (extra = {}) => Object.assign({ c: BARBARIK, x: 150, y: 892, s: 1.2, expr: 'serene' }, extra);

VIDEO({
  title: 'बर्बरीक: cinematic style test', format: 'short', target: 16,
  music: false, handheld: 0.5, keywords: ['कुरुक्षेत्र', 'महाभारत', 'बर्बरीक', 'तीन तीर'],
  shots: [
    /* 1: wide, sunset over the Kurukshetra field, slow push-in */
    { line: 'कुरुक्षेत्र में महाभारत का युद्ध शुरू होने वाला था।', capTop: 120, mood: 'calm', fx: 'dust',
      cam: { from: [270, 470, 1.0], to: [270, 560, 1.32] }, ...SK(0, 270, 548, 30),
      cast: [{ c: BARBARIK, x: 640, y: 862, s: .5, expr: 'calm', with: { skin: '#2a1630', top: '#2a1630', bottom: '#2a1630', cape: '#4a2040' }, walk: { from: -800, dur: 4.6 }, acts: [[0, 'stand']] }] },
    /* 2: Barbarik on the terrace looking over the army, camera drifts right to reveal it */
    { line: 'दोनों तरफ़ लाखों सैनिक खड़े थे।', dur: 4, capTop: 120, mood: 'hope', fx: 'embers', tr: 'fade',
      cam: { keys: [[0, 120, 610, 1.3], [1.9, 200, 600, 1.3], [4, 335, 590, 1.3]] }, ...SK(1, 380, 540, 30),
      cast: [HERO({ x: 150, walk: { from: -270, dur: 1.9 }, acts: [[0, 'stand'], [1.9, { lean: 5, head: -6, drop: 4 }, .5], [2.7, { lean: -3, head: 9 }, .9]] }),
        { c: KRISHNA, x: 455, y: 892, s: 1.15, expr: 'calm', acts: [[0, 'stand'], [2.4, 'lookBack', .6]] }] },
    /* 3: close-up of his face against the blurred sunset */
    { line: 'तभी वहाँ एक वीर योद्धा पहुँचा, बर्बरीक।', capTop: 120, mood: 'hope', fx: 'embers', tr: 'glow',
      cam: { keys: [[0, 215, 600, 1.55], [3.4, 188, 562, 2.35, 'spring']] }, ...SK(2, 400, 470, 36),
      cast: [HERO({ x: 130, exprKeys: [[0, 'serene'], [2.4, 'angry']], acts: [[0, 'lookUp', .01], [1.2, 'stand', .9], [2.5, 'fist', .5]] })] },
    /* 4: three arrows, drawn bow, pull back to wide */
    { line: 'उसके पास सिर्फ़ तीन तीर थे, पर वही काफ़ी थे।', capTop: 120, mood: 'divine', fx: 'sparks', tr: 'whip',
      cam: { keys: [[0, 215, 610, 1.3], [1.0, 205, 595, 1.4], [3.0, 200, 590, 1.5], [3.6, 335, 570, 1.15, 'spring']] }, ...SK(3, 330, 520, 32),
      shake: [3.0, .35, 3], sfx: [[3.0, 'bowshot', .6]],
      front: () => `<g transform="translate(330 640)">${A('sscale:3.0:.5', sparkle(0, 0, 3.2, '#fff3c4'))}</g>` + A('slide:-440:0:.4:3.0', A('fadeout:3.5:.4', `<g transform="translate(570 640)"><line x1="-70" y1="0" x2="0" y2="0" stroke="#ffe29a" stroke-width="7" opacity=".35"/><line x1="-70" y1="0" x2="0" y2="0" stroke="#fff4c4" stroke-width="3" stroke-linecap="round"/><polygon points="0,-6 18,0 0,6" fill="#fff4c4"/></g>`)),
      cast: [HERO({ x: 150, s: 1.05, props: { front: 'bow' }, acts: [[0, 'bowReady', .4], [1.0, 'bowDraw', 1.2], [3.0, { a: [78, 0], b: [18, 40], lean: -5, head: 5 }, .1], [3.5, 'bowReady', .7]] }),
        { c: SOLDIER, x: 405, y: 806, s: .6, flip: true, expr: 'calm', acts: [[0, 'stand'], [3.2, 'recoil', .25]] },
        { c: SOLDIER, x: 478, y: 814, s: .66, flip: true, expr: 'surprise', acts: [[0, 'stand'], [3.4, 'recoil', .25]] }] }
  ]
});
})();
