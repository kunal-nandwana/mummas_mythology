/* node .kiro/artifacts/screenshots/wide.js <topic> <out.png> "<t1,t2,..>|auto" [cols] [thumbW]  (16:9 version of contact.js) */
const path=require('path'),fs=require('fs');
const PW='/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core';
const {chromium}=require(PW);
const [topic,out,timesArg='auto',colsArg='3',thumbArg='640']=process.argv.slice(2);
const ROOT=path.resolve(__dirname,'../../..');
(async()=>{
 const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
 const browser=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:960,height:540}});
 const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto('file://'+path.join(ROOT,topic,'index.html')+'?render=1');
 await page.waitForFunction(()=>window.__ENGINE);await page.evaluate(()=>window.__ENGINE.ready);await page.waitForTimeout(300);
 const info=await page.evaluate(()=>({d:window.__ENGINE.duration,shots:window.__ENGINE.shots}));
 let times; if(timesArg.startsWith('auto')){ const [,a,b]=timesArg.split(':'); times=info.shots.slice(a?+a:0,b?+b:undefined).map(s=>+(s.start+Math.min(s.end-s.start,6)*.7).toFixed(2)); } else times=timesArg.split(',').map(Number);
 const fr=[];for(const t of times){await page.evaluate(t=>window.__ENGINE.seek(t),t);fr.push((await page.screenshot({type:'jpeg',quality:82})).toString('base64'));}
 const cols=+colsArg,tw=+thumbArg,th=Math.round(tw*540/960),rows=Math.ceil(fr.length/cols);
 const sh=await browser.newPage({viewport:{width:cols*(tw+6)+6,height:rows*(th+6)+6}});
 await sh.setContent(`<body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},${tw}px);gap:6px;padding:6px">`+fr.map((b,i)=>`<div style="position:relative"><img width="${tw}" height="${th}" src="data:image/jpeg;base64,${b}"><b style="position:absolute;left:0;top:0;background:#c22;color:#fff;font:12px sans-serif;padding:1px 4px">${i+1} · ${times[i]}s</b></div>`).join(''));
 await sh.waitForTimeout(300);fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});await sh.screenshot({path:out});
 console.log('sheet',out,fr.length,'frames',errs.length?'ERRORS '+errs.slice(0,3).join('|'):'no page errors');await browser.close();
})();
