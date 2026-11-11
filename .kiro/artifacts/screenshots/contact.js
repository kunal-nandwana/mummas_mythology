/* Contact-sheet helper (sandbox check, not part of the engine).
   node .kiro/artifacts/screenshots/contact.js <topic> <out.png> "<t1,t2,...>|auto" [cols] [thumbW]
   Loads <topic>/index.html?render=1, seeks to each time, screenshots, and lays all frames on ONE sheet. */
const path = require('path'), fs = require('fs');
const PW = '/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core';
const { chromium } = require(PW);
const [topic, out, timesArg = 'auto', colsArg = '6', thumbArg = '240'] = process.argv.slice(2);
const ROOT = path.resolve(__dirname, '../../..');
(async () => {
  const exe = fs.readdirSync('/inner_container/opt/playwright').filter(n => /^chromium_headless_shell-/.test(n)).map(n => `/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 1 });
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto('file://' + path.join(ROOT, topic, 'index.html') + '?render=1');
  await page.waitForFunction(() => window.__ENGINE); await page.evaluate(() => window.__ENGINE.ready); await page.waitForTimeout(300);
  const info = await page.evaluate(() => ({ d: window.__ENGINE.duration, shots: window.__ENGINE.shots, intro: window.__ENGINE.intro, narrEnd: window.__ENGINE.narrEnd }));
  let times;
  if (timesArg === 'auto') times = info.shots.map(s => +(s.start + Math.min(s.end - s.start, 3.6) * 0.7).toFixed(2));
  else times = timesArg.split(',').map(Number);
  const frames = [];
  for (const t of times) { await page.evaluate(t => window.__ENGINE.seek(t), t); frames.push((await page.screenshot({ type: 'png' })).toString('base64')); }
  const cols = +colsArg, tw = +thumbArg, th = Math.round(tw * 960 / 540), rows = Math.ceil(frames.length / cols);
  const sheet = await browser.newPage({ viewport: { width: cols * (tw + 6) + 6, height: rows * (th + 6) + 6 } });
  await sheet.setContent(`<body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},${tw}px);gap:6px;padding:6px">` +
    frames.map((b, i) => `<div style="position:relative"><img width="${tw}" height="${th}" src="data:image/png;base64,${b}"><b style="position:absolute;left:0;top:0;background:#c22;color:#fff;font:11px sans-serif;padding:1px 4px">${times[i]}s</b></div>`).join(''));
  await sheet.waitForTimeout(300);
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  await sheet.screenshot({ path: out });
  console.log('sheet', out, 'frames', frames.length, 'duration', info.d.toFixed(1), errs.length ? 'ERRORS: ' + errs.slice(0, 3).join(' | ') : 'no page errors');
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
