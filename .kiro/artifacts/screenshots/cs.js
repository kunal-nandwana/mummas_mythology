/* node cs.js <topic> <out.png> [cols] [thumbW] : mid-shot frame of every shot on one sheet */
const path=require('path'),fs=require('fs');
const PW='/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core';
const {chromium}=require(PW);
const [topic,out,colsArg='4',thumbArg='300',only]=process.argv.slice(2);
const ROOT=path.resolve(__dirname,'../../..');
(async()=>{
 const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
 const browser=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:540,height:960},deviceScaleFactor:1});
 const errs=[];page.on('pageerror',e=>errs.push(e.message));page.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
 await page.goto('file://'+path.join(ROOT,topic,'index.html')+'?render=1&notext=1');
 await page.waitForFunction(()=>window.__ENGINE);await page.evaluate(()=>window.__ENGINE.ready);await page.waitForTimeout(300);
 const info=await page.evaluate(()=>window.__ENGINE.shots.map(s=>({s:s.start,e:s.end})));
 let idx=info.map((_,i)=>i); if(only) idx=only.split(',').map(Number).map(n=>n-1);
 const frames=[];const labels=[];
 for(const i of idx){const sh=info[i];const t=sh.s+Math.min(sh.e-sh.s,3.6)*0.8;await page.evaluate(t=>window.__ENGINE.seek(t),t);frames.push((await page.screenshot({type:'png'})).toString('base64'));labels.push(i+1);}
 const cols=+colsArg,tw=+thumbArg,th=Math.round(tw*960/540),rows=Math.ceil(frames.length/cols);
 const sheet=await browser.newPage({viewport:{width:cols*(tw+6)+6,height:rows*(th+6)+6}});
 await sheet.setContent(`<body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(${cols},${tw}px);gap:6px;padding:6px">`+frames.map((b,i)=>`<div style="position:relative"><img width="${tw}" height="${th}" src="data:image/png;base64,${b}"><b style="position:absolute;left:0;top:0;background:#c22;color:#fff;font:12px sans-serif;padding:1px 5px">${labels[i]}</b></div>`).join(''));
 await sheet.waitForTimeout(300);
 fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});
 await sheet.screenshot({path:out});
 console.log('sheet',out,frames.length,errs.length?'ERRORS: '+errs.slice(0,4).join(' | '):'no page errors');
 await browser.close();
})();
