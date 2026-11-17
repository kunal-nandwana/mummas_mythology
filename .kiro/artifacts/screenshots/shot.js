/* node .kiro/artifacts/screenshots/shot.js <topic> <out.png> <t1,t2,..> [scale]  : full-size frames of a 16:9 video, stacked in a grid of 2 columns */
const path=require('path'),fs=require('fs');
const PW='/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core';
const {chromium}=require(PW);
const [topic,out,timesArg,scaleArg='1']=process.argv.slice(2);
const ROOT=path.resolve(__dirname,'../../..');
(async()=>{
 const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
 const browser=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:960,height:540},deviceScaleFactor:+scaleArg});
 const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto('file://'+path.join(ROOT,topic,'index.html')+'?render=1');
 await page.waitForFunction(()=>window.__ENGINE);await page.evaluate(()=>window.__ENGINE.ready);await page.waitForTimeout(300);
 const times=timesArg.split(',').map(Number),fr=[];
 for(const t of times){await page.evaluate(t=>window.__ENGINE.seek(t),t);fr.push((await page.screenshot({type:'jpeg',quality:88})).toString('base64'));}
 const w=Math.round(960*+scaleArg),h=Math.round(540*+scaleArg),cols=Math.min(2,fr.length),rows=Math.ceil(fr.length/cols);
 const sh=await browser.newPage({viewport:{width:cols*(w+4),height:rows*(h+4)}});
 await sh.setContent(`<body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:4px">`+fr.map(b=>`<img width="${w}" height="${h}" src="data:image/jpeg;base64,${b}">`).join(''));
 await sh.waitForTimeout(300);fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});await sh.screenshot({path:out});
 console.log('ok',fr.length,errs.length?'ERRORS '+errs.slice(0,3).join('|'):'no errors');await browser.close();
})();
