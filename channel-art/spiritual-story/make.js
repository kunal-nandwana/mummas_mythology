// Channel art for "The Spiritual Story", same look as the Mumma's Mythology art and the videos:
// night sky, gold Tiro title, glowing halo, diyas on the hills.
// Makes profile.svg (800x800), banner.svg (2560x1440), watermark.svg (150x150) + .html wrappers.
// Run: node channel-art/spiritual-story/make.js && node channel-art/spiritual-story/render.js
const fs = require('fs'), path = require('path');
const out = (f, s) => fs.writeFileSync(path.join(__dirname, f), s);

let seed = 11;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

const FONT = `@font-face{font-family:'Tiro';src:url('../../engine/fonts/TiroDevanagariHindi-Regular.ttf')}
@font-face{font-family:'Mukta';font-weight:800;src:url('../../engine/fonts/Mukta-ExtraBold.ttf')}
@font-face{font-family:'Mukta';font-weight:700;src:url('../../engine/fonts/Mukta-Bold.ttf')}`;

const star4 = (x, y, r, o = 1, c = '#f6ecd2') => { x = +x; y = +y; r = +r; return `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z" fill="${c}" opacity="${o}"/>`; };
const dot = (x, y, r, o) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f6ecd2" opacity="${o}"/>`;

const defs = () => `
<defs><style>${FONT}</style>
<radialGradient id="bg" cx="50%" cy="46%" r="75%"><stop offset="0" stop-color="#262a63"/><stop offset=".55" stop-color="#121538"/><stop offset="1" stop-color="#07081a"/></radialGradient>
<radialGradient id="haze" cx="50%" cy="100%" r="80%"><stop offset="0" stop-color="#7a3a6a" stop-opacity=".55"/><stop offset="1" stop-color="#7a3a6a" stop-opacity="0"/></radialGradient>
<radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd98a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
<linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3a0"/><stop offset=".55" stop-color="#f0b84e"/><stop offset="1" stop-color="#c9822c"/></linearGradient>
<linearGradient id="petal" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#d9608a"/><stop offset=".55" stop-color="#f19ab5"/><stop offset="1" stop-color="#ffe0e8"/></linearGradient>
<linearGradient id="petalBack" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#9c3f6e"/><stop offset="1" stop-color="#e7799b"/></linearGradient>
</defs>`;

// Glowing halo: thin gold rays, dark disc, gold rings, Om in the centre. R = ray tip radius.
const halo = (cx, cy, R, withOm = true) => {
  const N = 36; let rays = '';
  for (let k = 0; k < N; k++) {
    const a = (k / N) * Math.PI * 2, w = Math.PI / N * 0.5;
    const p = (ang, r) => `${(cx + Math.cos(ang) * r).toFixed(1)},${(cy + Math.sin(ang) * r).toFixed(1)}`;
    rays += `<polygon points="${p(a - w, R * 0.82)} ${p(a, k % 2 ? R * 0.94 : R)} ${p(a + w, R * 0.82)}" fill="url(#gold)" opacity=".92"/>`;
  }
  return `<circle cx="${cx}" cy="${cy}" r="${R * 1.4}" fill="url(#glow)"/>${rays}
<circle cx="${cx}" cy="${cy}" r="${R * 0.82}" fill="url(#gold)" opacity=".95"/>
<circle cx="${cx}" cy="${cy}" r="${R * 0.74}" fill="#1a1740"/>
<circle cx="${cx}" cy="${cy}" r="${R * 0.66}" fill="none" stroke="#f0b84e" stroke-width="${R * 0.018}" opacity=".8"/>
${withOm ? `<text x="${cx}" y="${cy + R * 0.3}" text-anchor="middle" font-family="Tiro,serif" font-size="${R * 1.05}" fill="url(#gold)">ॐ</text>` : ''}`;
};

// Lotus with its base at (cx, cy); s=1 is petals about 120 tall.
const lotus = (cx, cy, s) => {
  const petal = (ang, len, w, fill, o = 1) =>
    `<g transform="rotate(${ang})" opacity="${o}"><path d="M0 0C${-w} ${-len * 0.3} ${-w} ${-len * 0.75} 0 ${-len}C${w} ${-len * 0.75} ${w} ${-len * 0.3} 0 0Z" fill="${fill}" stroke="#ffd98a" stroke-width="2"/><path d="M0 ${-len * 0.12}Q0 ${-len * 0.5} 0 ${-len * 0.82}" stroke="#fff3f6" stroke-width="2" opacity=".5" fill="none"/></g>`;
  const back = [-72, -48, 48, 72].map((a) => petal(a, 118, 30, 'url(#petalBack)')).join('');
  const mid = [-36, -12, 12, 36].map((a) => petal(a, 128, 31, 'url(#petal)')).join('');
  const front = petal(0, 134, 32, 'url(#petal)');
  const bowl = `<path d="M-92 -6Q0 38 92 -6Q60 20 0 24Q-60 20 -92 -6Z" fill="url(#gold)" opacity=".95"/>`;
  return `<g transform="translate(${cx} ${cy}) scale(${s})">${back}${mid}${front}${bowl}</g>`;
};

const ring = (cx, cy, R, n, size) => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
    s += i % 2 ? dot(x.toFixed(1), y.toFixed(1), size * 0.35, 0.8) : star4(x.toFixed(1), y.toFixed(1), size, 0.95);
  }
  return s;
};

const scatter = (w, h, n, avoid) => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = rnd() * w, y = rnd() * h * 0.9;
    if (avoid && avoid(x, y)) continue;
    const big = rnd() > 0.88, o = (0.35 + rnd() * 0.6).toFixed(2);
    s += big ? star4(x.toFixed(0), y.toFixed(0), 9 + rnd() * 9, o) : dot(x.toFixed(0), y.toFixed(0), 1.3 + rnd() * 2.2, o);
  }
  return s;
};

// ---------- profile 800x800 (shown as a circle: keep everything inside r≈340) ----------
out('profile.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">${defs()}
<rect width="800" height="800" fill="url(#bg)"/><rect width="800" height="800" fill="url(#haze)"/>
${scatter(800, 800, 70, (x, y) => Math.hypot(x - 400, y - 400) > 395 || (y > 395 && y < 720 && x > 60 && x < 740))}
${ring(400, 215, 205, 28, 10)}
${halo(400, 215, 150)}
${lotus(400, 372, 0.9)}
<text x="400" y="492" text-anchor="middle" font-family="Mukta,sans-serif" font-weight="700" font-size="34" letter-spacing="14" fill="#f6ecd2" opacity=".92">THE</text>
<text x="400" y="590" text-anchor="middle" font-family="Tiro,serif" font-size="124" fill="url(#gold)" stroke="#3a1a05" stroke-width="1.5" paint-order="stroke">Spiritual</text>
<text x="400" y="650" text-anchor="middle" font-family="Mukta,sans-serif" font-weight="800" font-size="40" letter-spacing="22" fill="#f0b84e">STORY</text>
<g stroke="#f0b84e" stroke-width="2" opacity=".75"><path d="M295 692H375M425 692H505"/></g><circle cx="400" cy="692" r="5" fill="#f0b84e"/>
</svg>`);

// ---------- banner 2560x1440 (safe area for all devices: 1546x423 centred = x507..2053, y508..931) ----------
const W = 2560, H = 1440;
const hills = `<path d="M0 1440V1215Q330 1135 650 1190T1300 1170T1950 1195T2560 1150V1440Z" fill="#0b0c26"/>
<path d="M0 1440V1300Q420 1245 820 1285T1600 1270T2560 1280V1440Z" fill="#06071a"/>`;
const diya = (x, y) => `<circle cx="${x}" cy="${y - 18}" r="46" fill="url(#glow)"/><path d="M${x - 24} ${y}Q${x} ${y + 20} ${x + 24} ${y}Z" fill="#c9822c"/><path d="M${x} ${y - 4}Q${x - 9} ${y - 22} ${x} ${y - 38}Q${x + 9} ${y - 22} ${x} ${y - 4}Z" fill="#ffd25e"/>`;
out('banner.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defs()}
<rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#haze)"/>
${scatter(W, H, 260, (x, y) => x > 460 && x < 2100 && y > 470 && y < 960)}
${hills}
${diya(230, 1262)}${diya(330, 1290)}${diya(2230, 1262)}${diya(2330, 1290)}
${halo(655, 690, 190)}
${lotus(655, 880, 1.05)}
<text x="1380" y="578" text-anchor="middle" font-family="Mukta,sans-serif" font-weight="700" font-size="44" letter-spacing="26" fill="#f6ecd2" opacity=".92">THE</text>
<text x="1380" y="765" text-anchor="middle" font-family="Tiro,serif" font-size="200" fill="url(#gold)" stroke="#3a1a05" stroke-width="2" paint-order="stroke">Spiritual</text>
<text x="1380" y="872" text-anchor="middle" font-family="Mukta,sans-serif" font-weight="800" font-size="62" letter-spacing="46" fill="#f0b84e">STORY</text>
<text x="1380" y="922" text-anchor="middle" font-family="Mukta,sans-serif" font-weight="700" font-size="34" letter-spacing="3" fill="#f6ecd2" opacity=".85">हिंदी में आध्यात्मिक कथाएँ</text>
</svg>`);

// ---------- watermark 150x150, transparent: halo + lotus, no text ----------
const noGlow = (t) => t.replace(/<circle[^>]*url\(#glow\)"\/>/g, '');
out('watermark.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width="150" height="150">${defs()}
${noGlow(halo(75, 66, 58))}
${lotus(75, 128, 0.36)}
</svg>`);

for (const n of ['profile', 'banner', 'watermark']) {
  const svg = fs.readFileSync(path.join(__dirname, n + '.svg'), 'utf8');
  out(n + '.html', `<!doctype html><meta charset=utf-8><style>html,body{margin:0;background:transparent}svg{display:block}</style>${svg}`);
}
console.log('wrote profile, banner, watermark (.svg + .html)');
