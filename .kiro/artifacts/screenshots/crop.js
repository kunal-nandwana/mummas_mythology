/* node crop.js <topic> <out.png> <shot> <t> <x> <y> <w> <h> [scale] : zoomed crop of a 540x960 frame */
const path=require('path'),fs=require('fs');
const {chromium}=require('/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core');
const [topic,out,shot,t,x,y,w,h,sc='3']=process.argv.slice(2);
(async()=>{
 const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
 const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});const p=await b.newPage({viewport:{width:540,height:960},deviceScaleFactor:+sc});
 await p.goto('file://'+path.resolve(topic,'index.html')+'?render=1&notext=1');
 await p.waitForFunction(()=>window.__ENGINE);await p.evaluate(()=>window.__ENGINE.ready);
 await p.evaluate(([s,t])=>{const E=window.__ENGINE;E.seek(E.shots[+s].start+ +t);},[shot,t]);
 await p.screenshot({path:out,clip:{x:+x,y:+y,width:+w,height:+h}});await b.close();})();
