// Renders the .html files in this folder to .png with Playwright's Chromium.
// Run: node channel-art/spiritual-story/render.js   (set CHROME_PATH to use a specific Chrome)
const path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require('playwright-core')); }
const SIZES = { profile: [800, 800], banner: [2560, 1440], watermark: [150, 150] };
(async () => {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  for (const [n, [w, h]] of Object.entries(SIZES)) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto('file://' + path.join(__dirname, n + '.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(__dirname, n + '.png'), omitBackground: n === 'watermark' });
    await page.close();
    console.log('wrote', n + '.png');
  }
  await browser.close();
})();
