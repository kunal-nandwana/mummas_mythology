/* node .kiro/artifacts/screenshots/thumb.js <topic>/thumbnail <out.png> [t]  -> 1280x720 still of the one-shot thumbnail story */
const path=require('path'),fs=require('fs');const {chromium}=require('/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core');
(async()=>{const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});const p=await b.newPage({viewport:{width:960,height:540},deviceScaleFactor:4/3});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(__dirname,'../../..',process.argv[2],'index.html')+'?render=1');await p.waitForFunction(()=>window.__ENGINE);await p.evaluate(()=>window.__ENGINE.ready);await p.waitForTimeout(300);
await p.evaluate(t=>window.__ENGINE.seek(t),+(process.argv[4]||1.2));await p.waitForTimeout(200);
await p.addStyleTag({content:'.rimfx{filter:drop-shadow(3px 0 0 #140503) drop-shadow(-3px 0 0 #140503) drop-shadow(0 3px 0 #140503) drop-shadow(0 -3px 0 #140503) drop-shadow(0 0 18px rgba(255,170,60,.45))}'});
await p.evaluate(()=>{ const d=document.createElement('div'); d.style.cssText='position:fixed;left:0;right:0;top:0;bottom:0;z-index:99;pointer-events:none;display:flex;flex-direction:column;align-items:center;justify-content:center;padding-bottom:6px';
 const T=(t,fs,fill,mt)=>`<div style="font:800 ${fs}px Mukta,sans-serif;color:${fill};text-align:center;margin-top:${mt}px;-webkit-text-stroke:${fs*.2}px #140503;paint-order:stroke fill;text-shadow:0 5px 0 #140503,0 0 30px rgba(0,0,0,.6);line-height:1.12;white-space:nowrap">${t}</div>`;
 d.innerHTML=T('परशुराम जी ने रावण को',33,'#ffffff',0)+T('क्यों नहीं',84,'#ffd21f',2)+T('मारा?',112,'#ffd21f',-6); document.body.appendChild(d); });
await p.waitForTimeout(150);
await p.screenshot({path:process.argv[3]});console.log('ok',errs.join('|'));await b.close()})();
