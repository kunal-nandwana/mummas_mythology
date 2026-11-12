// Makes profile.svg (800x800) and banner.svg (2560x1440) in the same style as the videos.
// Run: node channel-art/make.js   (then render to PNG, see README.md in this folder)
const fs = require('fs'), path = require('path');
const out = (f, s) => fs.writeFileSync(path.join(__dirname, f), s);

let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

const FONT = `@font-face{font-family:'Tiro';src:url('../engine/fonts/TiroDevanagariHindi-Regular.ttf')}
@font-face{font-family:'Mukta';font-weight:800;src:url('../engine/fonts/Mukta-ExtraBold.ttf')}
@font-face{font-family:'Mukta';font-weight:700;src:url('../engine/fonts/Mukta-Bold.ttf')}`;

const star4 = (x, y, r, o = 1, c = "#f6ecd2") => { x = +x; y = +y; r = +r; return `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z" fill="${c}" opacity="${o}"/>`; };
const dot = (x, y, r, o) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f6ecd2" opacity="${o}"/>`;

const defs = (w, h) => `
<defs><style>${FONT}</style>
<radialGradient id="bg" cx="50%" cy="46%" r="75%"><stop offset="0" stop-color="#262a63"/><stop offset=".55" stop-color="#121538"/><stop offset="1" stop-color="#07081a"/></radialGradient>
<radialGradient id="haze" cx="50%" cy="100%" r="80%"><stop offset="0" stop-color="#7a3a6a" stop-opacity=".55"/><stop offset="1" stop-color="#7a3a6a" stop-opacity="0"/></radialGradient>
<radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd98a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>
<linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3a0"/><stop offset=".55" stop-color="#f0b84e"/><stop offset="1" stop-color="#c9822c"/></linearGradient>
<linearGradient id="bamboo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8dc8e"/><stop offset=".5" stop-color="#e0a53c"/><stop offset="1" stop-color="#a8671f"/></linearGradient>
<linearGradient id="feather" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#0f5a4a"/><stop offset=".6" stop-color="#1f9a72"/><stop offset="1" stop-color="#58c58a"/></linearGradient>
<linearGradient id="moon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6dc"/><stop offset="1" stop-color="#f1d79a"/></linearGradient>
</defs>`;

// crescent centred at (cx,cy), outer radius r, opens to upper right like the video logo
// Krishna's bansuri (bamboo flute) with a peacock feather and a red tassel. s=1 is profile size.
const bansuri = (cx, cy, s) => `
<circle cx="${cx}" cy="${cy}" r="${230 * s}" fill="url(#glow)"/>
<g transform="translate(${cx} ${cy}) scale(${s})">
 <g transform="translate(-5 18) rotate(-20)">
  <path d="M0 0Q10 -85 0 -178" fill="none" stroke="#d9b46a" stroke-width="4" stroke-linecap="round"/>
  <path d="M0 -70C-52 -115 -48 -190 0 -232C48 -190 52 -115 0 -70Z" fill="url(#feather)"/>
  <path d="M0 -70C-30 -105 -30 -160 0 -200" fill="none" stroke="#9fe0b8" stroke-width="2" opacity=".5"/>
  <ellipse cx="0" cy="-172" rx="30" ry="40" fill="#e8b84a"/>
  <ellipse cx="0" cy="-172" rx="22" ry="31" fill="#1b4fa0"/>
  <ellipse cx="0" cy="-172" rx="12" ry="18" fill="#12a58a"/>
  <ellipse cx="0" cy="-174" rx="5" ry="8" fill="#0b2a55"/>
 </g>
 <g transform="rotate(-35)">
  <rect x="-172" y="-15" width="344" height="30" rx="15" fill="url(#bamboo)"/>
  <rect x="-172" y="-15" width="344" height="9" rx="5" fill="#fff6dc" opacity=".35"/>
  <g fill="#8a4d14"><rect x="-166" y="-15" width="10" height="30" rx="3"/><rect x="-96" y="-15" width="7" height="30"/><rect x="148" y="-15" width="10" height="30" rx="3"/><rect x="-6" y="-15" width="6" height="30"/></g>
  <ellipse cx="-130" cy="0" rx="9" ry="6" fill="#4a2208"/>
  <g fill="#4a2208"><circle cx="-40" cy="0" r="6"/><circle cx="-8" cy="0" r="0"/><circle cx="24" cy="0" r="6"/><circle cx="54" cy="0" r="6"/><circle cx="84" cy="0" r="6"/><circle cx="114" cy="0" r="6"/><circle cx="-62" cy="0" r="6"/></g>
  <path d="M168 4Q196 30 190 66" fill="none" stroke="#e0453a" stroke-width="4" stroke-linecap="round"/>
  <path d="M162 6Q184 38 176 74" fill="none" stroke="#f0b84e" stroke-width="3" stroke-linecap="round"/>
  <circle cx="190" cy="72" r="9" fill="#e0453a"/><circle cx="176" cy="80" r="8" fill="#f0b84e"/>
 </g>
</g>
${star4(cx + 150 * s, cy - 120 * s, 20 * s, 1)}`;

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

// ---------- profile 800x800 (YouTube crops to a circle, keep everything inside r≈340) ----------
out('profile.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">${defs()}
<rect width="800" height="800" fill="url(#bg)"/><rect width="800" height="800" fill="url(#haze)"/>
${scatter(800, 800, 70, (x, y) => Math.hypot(x - 400, y - 400) > 395 || (y > 425 && y < 690 && x > 60 && x < 740))}
${ring(400, 290, 215, 28, 11)}
${bansuri(400, 300, 0.95)}
<text x="400" y="545" text-anchor="middle" font-family="Tiro,serif" font-size="136" fill="url(#gold)" stroke="#3a1a05" stroke-width="1.5" paint-order="stroke">Mumma’s</text>
<text x="400" y="617" text-anchor="middle" font-family="Mukta,sans-serif" font-weight="800" font-size="40" letter-spacing="15" fill="#f0b84e">MYTHOLOGY</text>
<g stroke="#f0b84e" stroke-width="2" opacity=".75"><path d="M285 662H375M425 662H515"/></g>
<circle cx="400" cy="662" r="5" fill="#f0b84e"/>
</svg>`);

// ---------- banner 2560x1440 (safe area for all devices: 1546x423 centred = x507..2053, y508..931) ----------
const W = 2560, H = 1440;
const hills = `<path d="M0 1440V1215Q330 1135 650 1190T1300 1170T1950 1195T2560 1150V1440Z" fill="#0b0c26"/>
<path d="M0 1440V1300Q420 1245 820 1285T1600 1270T2560 1280V1440Z" fill="#06071a"/>`;
// small lit lamps (diyas) on the far edges, outside the safe area
const diya = (x, y) => `<circle cx="${x}" cy="${y - 18}" r="46" fill="url(#glow)"/><path d="M${x - 24} ${y}Q${x} ${y + 20} ${x + 24} ${y}Z" fill="#c9822c"/><path d="M${x} ${y - 4}Q${x - 9} ${y - 22} ${x} ${y - 38}Q${x + 9} ${y - 22} ${x} ${y - 4}Z" fill="#ffd25e"/>`;
out('banner.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defs()}
<rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#haze)"/>
${scatter(W, H, 260, (x, y) => x > 460 && x < 2100 && y > 470 && y < 960)}
${hills}
${diya(230, 1262)}${diya(330, 1290)}${diya(2230, 1262)}${diya(2330, 1290)}
<!-- safe-area content: moon left of the name -->
${bansuri(690, 735, 1.05)}
<text x="1365" y="775" text-anchor="middle" font-family="Tiro,serif" font-size="215" fill="url(#gold)" stroke="#3a1a05" stroke-width="2" paint-order="stroke">Mumma’s</text>
<text x="1365" y="858" text-anchor="middle" font-family="Mukta,sans-serif" font-weight="800" font-size="60" letter-spacing="26" fill="#f0b84e">MYTHOLOGY</text>
<g stroke="#f0b84e" stroke-width="3" opacity=".75"><path d="M1045 905H1295M1435 905H1685"/></g><circle cx="1365" cy="905" r="8" fill="#f0b84e"/>
<text x="1365" y="560" text-anchor="middle" font-family="Mukta,sans-serif" font-weight="700" font-size="46" letter-spacing="4" fill="#f6ecd2" opacity=".9">हिंदी में पौराणिक कथाएँ</text>
</svg>`);
console.log('wrote profile.svg, banner.svg');
// HTML wrappers (inline SVG) so fonts load reliably when rendering to PNG
for (const n of ['profile', 'banner']) {
  const svg = fs.readFileSync(path.join(__dirname, n + '.svg'), 'utf8');
  out(n + '.html', `<!doctype html><meta charset=utf-8><style>html,body{margin:0;background:#000}svg{display:block}</style>${svg}`);
}
