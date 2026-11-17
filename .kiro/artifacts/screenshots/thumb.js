/* node .kiro/artifacts/screenshots/thumb.js <topic>/thumbnail <out.png> [t]  -> 1280x720 still of the one-shot thumbnail story */
const path=require('path'),fs=require('fs');const {chromium}=require('/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core');
(async()=>{const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});const p=await b.newPage({viewport:{width:960,height:540},deviceScaleFactor:4/3});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(__dirname,'../../..',process.argv[2],'index.html')+'?render=1');await p.waitForFunction(()=>window.__ENGINE);await p.evaluate(()=>window.__ENGINE.ready);await p.waitForTimeout(300);
await p.evaluate(t=>window.__ENGINE.seek(t),+(process.argv[4]||1.2));await p.waitForTimeout(200);
await p.evaluate(()=>{ const d=document.createElement('div'); d.style.cssText='position:fixed;left:0;right:0;bottom:0;height:230px;z-index:99;pointer-events:none;background:linear-gradient(transparent,rgba(10,4,16,.93) 62%);';
 const T=(t,fs,c,mt)=>`<div style="font:800 ${fs}px Mukta,sans-serif;color:${c};text-align:center;margin-top:${mt}px;-webkit-text-stroke:${fs*.16}px #1a0a05;paint-order:stroke fill;text-shadow:0 4px 0 #1a0a05,0 0 24px rgba(255,150,40,.55);line-height:1.15">${t}</div>`;
 d.innerHTML=T('परशुराम जी ने रावण को',54,'#ffe9a8',92)+T('क्यों नहीं मारा?',70,'#ffb02a',0); document.body.appendChild(d); });
await p.waitForTimeout(150);
await p.screenshot({path:process.argv[3]});console.log('ok',errs.join('|'));await b.close()})();
