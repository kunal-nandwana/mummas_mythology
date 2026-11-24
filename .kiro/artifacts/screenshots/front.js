/* node .kiro/artifacts/screenshots/front.js <topic> <out.png> <shot:t,shot:t,..> : 9:16 frames on one sheet (4 per row) */
const path=require('path'),fs=require('fs');
const PW='/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core';
const {chromium}=require(PW);
const [topic,out,arg,scaleArg='1']=process.argv.slice(2);
const ROOT=path.resolve(__dirname,'../../..');
(async()=>{
 const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
 const browser=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:540,height:960},deviceScaleFactor:+scaleArg});
 const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto('file://'+path.join(ROOT,topic,'index.html')+'?render=1&notext=1');
 await page.waitForFunction(()=>window.__ENGINE);await page.evaluate(()=>window.__ENGINE.ready);await page.waitForTimeout(300);
 const fr=[];
 for(const it of arg.split(',')){ const [sh,t]=it.split(':'); const st=await page.evaluate(sh=>{const E=window.__ENGINE; return E.shotStart?E.shotStart(+sh):null;},sh); 
   await page.evaluate(([sh,t])=>{const E=window.__ENGINE; const s=E.shots?E.shots[+sh].start:0; E.seek(s+ +t);},[sh,t]);
   fr.push((await page.screenshot({type:'jpeg',quality:90})).toString('base64')); }
 const w=Math.round(540*+scaleArg),h=Math.round(960*+scaleArg),cols=Math.min(4,fr.length),rows=Math.ceil(fr.length/cols);
 const sh=await browser.newPage({viewport:{width:cols*(w+4),height:rows*(h+4)}});
 await sh.setContent(`<body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:4px">`+fr.map(b=>`<img width="${w}" height="${h}" src="data:image/jpeg;base64,${b}">`).join(''));
 await sh.waitForTimeout(300);await sh.screenshot({path:out});
 console.log('ok',fr.length,errs.length?'ERRORS '+errs.slice(0,3).join('|'):'no errors');await browser.close();
})();
