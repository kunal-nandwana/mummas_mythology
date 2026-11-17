/* node .kiro/artifacts/screenshots/thumb3.js <topic>/thumbnail <out.png> <en|hi> [t] -> 1280x720 thumbnail v3 */
const path=require('path'),fs=require('fs');const {chromium}=require('/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core');
(async()=>{const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});const p=await b.newPage({viewport:{width:960,height:540},deviceScaleFactor:4/3});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(process.argv[2],'index.html')+'?render=1');await p.waitForFunction(()=>window.__ENGINE);await p.evaluate(()=>window.__ENGINE.ready);await p.waitForTimeout(300);
await p.evaluate(t=>window.__ENGINE.seek(t),+(process.argv[5]||1.2));await p.waitForTimeout(200);
const lang=process.argv[4]||'en';
await p.addStyleTag({content:'.rimfx{filter:drop-shadow(3px 0 0 #100304) drop-shadow(-3px 0 0 #100304) drop-shadow(0 3px 0 #100304) drop-shadow(0 -3px 0 #100304) drop-shadow(0 0 20px rgba(255,170,60,.55))}'});
await p.evaluate(lang=>{ const d=document.createElement('div'); d.style.cssText='position:fixed;left:0;right:0;top:0;bottom:0;z-index:99;pointer-events:none';
 const S='-webkit-text-stroke:%spx #100304;paint-order:stroke fill;text-shadow:0 6px 0 #100304,0 0 36px rgba(0,0,0,.65);';
 const T=(t,fs,fill,rot)=>`<div style="font:900 ${fs}px ${lang==='hi'?'Mukta':'Impact,Anton,Arial Black'},sans-serif;color:${fill};text-align:center;${S.replace('%s',fs*.2)}line-height:1.02;white-space:nowrap;transform:rotate(${rot||0}deg);letter-spacing:${lang==='hi'?0:1}px">${t}</div>`;
 const box=(inner)=>`<div style="position:absolute;left:395px;width:545px;top:${lang==='hi'?44:14}px">${inner}</div>`;
 const bolt=(pts,w)=>`<polyline points="${pts}" fill="none" stroke="#fff6d0" stroke-width="${w}" stroke-linejoin="miter" style="filter:drop-shadow(0 0 6px #ffc860) drop-shadow(0 0 16px #ff7a20)"/>`;
 const fx=`<svg viewBox="0 0 960 540" style="position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:normal">`+
  bolt('560,-10 520,90 548,100 500,210 530,218 470,330',5)+bolt('500,210 440,250 452,262 405,330',3)+bolt('905,230 880,300 900,306 868,390',3)+bolt('40,-10 62,70 40,78 70,170',3)+`</svg>`;
 const glow=`<div style="position:absolute;inset:0;background:radial-gradient(ellipse 30% 45% at 78% 82%,rgba(255,90,20,.55),rgba(255,90,20,0) 70%),radial-gradient(ellipse 28% 45% at 22% 55%,rgba(255,170,50,.4),rgba(255,170,50,0) 70%);mix-blend-mode:screen"></div>`;
 const vig=`<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,rgba(0,0,0,0) 55%,rgba(0,0,0,.55) 100%)"></div>`;
 d.innerHTML=glow+fx+vig+(lang==='hi'
  ? box(T('परशुराम जी ने रावण को',34,'#fff')+T('क्यों नहीं',76,'#ffd21f')+T('मारा?',104,'#ff3b2a'))
  : box(T("WHY DIDN'T",50,'#fff',-3)+T('PARSHURAM',78,'#ffd21f',-3)+T('KILL RAVAN?',60,'#ff4a2a',-3)));
 [...document.body.children].forEach(c=>{c.style.filter='saturate(1.45) contrast(1.15) brightness(1.18)'}); document.body.appendChild(d); },lang);
await p.waitForTimeout(150);
await p.screenshot({path:process.argv[3]});console.log('ok',errs.join('|'));await b.close()})();
