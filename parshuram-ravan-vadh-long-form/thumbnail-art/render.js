/* node parshuram-ravan-vadh-long-form/thumbnail-art/render.js [out.png]  -> 1280x720 thumbnail (hand-drawn SVG, see art.js) */
const path=require('path'),fs=require('fs');
const {chromium}=require('/inner_container/opt/toolchains/.nvm/versions/node/v22.23.4/lib/node_modules/@playwright/mcp/node_modules/playwright-core');
(async()=>{
  const exe=fs.readdirSync('/inner_container/opt/playwright').filter(n=>/^chromium_headless_shell-/.test(n)).map(n=>`/inner_container/opt/playwright/${n}/chrome-headless-shell-linux64/chrome-headless-shell`)[0];
  const font=path.resolve(__dirname,'../../engine/fonts/TiroDevanagariHindi-Regular.ttf');
  const svg=require('./art.js')();
  fs.writeFileSync(path.join(__dirname,'thumbnail.svg'),svg);
  const html=`<style>@font-face{font-family:TiroTitle;src:url(file://${font})}html,body{margin:0;background:#000}</style>${svg}`;
  const b=await chromium.launch({executablePath:exe,args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:1280,height:720}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  fs.writeFileSync(path.join(__dirname,'_t.html'),html);
  await p.goto('file://'+path.join(__dirname,'_t.html'));
  await p.evaluate(()=>document.fonts.load("100px TiroTitle","Why Didn’t Parshuram Kill Ravan?"));
  await p.waitForTimeout(400);
  const out=process.argv[2]||path.join(__dirname,'../thumbnail.png');
  await p.screenshot({path:out});
  fs.unlinkSync(path.join(__dirname,'_t.html'));
  console.log('ok',out,errs.join('|'));await b.close();
})();
