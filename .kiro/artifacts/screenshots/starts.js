const path=require('path'),fs=require('fs');const {chromium}=require('/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core');
(async()=>{const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});const p=await b.newPage({viewport:{width:960,height:540}});
await p.goto('file://'+path.resolve(__dirname,'../../..',process.argv[2],'index.html')+'?render=1');await p.waitForFunction(()=>window.__ENGINE);await p.evaluate(()=>window.__ENGINE.ready);
console.log(JSON.stringify(await p.evaluate(()=>window.__ENGINE.shots.map((s,i)=>[i+1,+s.start.toFixed(2),+s.end.toFixed(2)]))));await b.close()})();
