#!/usr/bin/env node
/* =====================================================================
   CONTACT SHEET: node tools/contact-sheet.js <topic-folder> [--cols 5]
   Makes ONE picture with every shot (number + first words of the line), so you
   can review the whole video at a glance and send all fixes in one message.
   Writes <topic>/preview/contact-sheet.png. Free: runs on your Mac (same
   Playwright as render.js). Run `node tools/build.js <topic>` first.
   ===================================================================== */
const fs=require('fs'), path=require('path'), vm=require('vm');
const ROOT=path.join(__dirname,'..'), ENG=path.join(ROOT,'engine');
const args=process.argv.slice(2), topic=(args.find(a=>!a.startsWith('--'))||'').replace(/\/$/,'');
const colsArg=args.indexOf('--cols'); const COLS=colsArg>=0?+args[colsArg+1]:5;
if(!topic){ console.error('usage: node tools/contact-sheet.js <topic-folder> [--cols 5]'); process.exit(1); }
const dir=path.join(ROOT,topic), HTML=path.join(dir,'index.html');
if(!fs.existsSync(HTML)){ console.error('missing index.html: run  node tools/build.js '+topic+'  first'); process.exit(1); }
let chromium; try{ ({chromium}=require('playwright')); }catch(e){ console.error('✗ Playwright missing. Run: npm install && npx playwright install chromium'); process.exit(1); }

/* shot start times from the story (same code the build uses) */
const read=f=>fs.readFileSync(f,'utf8');
const ctx={console}; vm.createContext(ctx);
vm.runInContext(read(path.join(ENG,'timing.js'))+'\n'+read(path.join(ENG,'characters.js')), ctx);
let CFG=null; ctx.VIDEO=c=>{ CFG=c; };
vm.runInContext(read(path.join(dir,'story.js')), ctx);
const plan=ctx.planTiming(CFG);

(async()=>{
  const W=270, H=480;
  const browser=await chromium.launch();
  const page=await browser.newPage({viewport:{width:540,height:960}});
  await page.goto('file://'+HTML+'?render=1');
  await page.waitForFunction(()=>window.__ENGINE&&window.__ENGINE.seek, null, {timeout:20000});
  const tiles=[];
  for(const s of plan.shots){
    const t=s.start+Math.min(s.dur*0.65, Math.max(0.6, s.dur-0.4));      // late enough that characters have posed
    await page.evaluate(t=>window.__ENGINE.seek(t), t);
    const buf=await page.screenshot({type:'jpeg', quality:80});
    tiles.push({n:s.i+1, t:s.start, img:'data:image/jpeg;base64,'+buf.toString('base64'), line:(s.line||'').split(/\s+/).slice(0,7).join(' ')});
  }
  const sheet=await browser.newPage({viewport:{width:COLS*(W+8)+8, height:100}});
  const esc=x=>x.replace(/[<&>]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));
  await sheet.setContent(`<body style="margin:0;background:#111;font-family:sans-serif;color:#eee;display:flex;flex-wrap:wrap;gap:8px;padding:8px">`+
    tiles.map(k=>`<div style="width:${W}px"><div style="position:relative"><img src="${k.img}" width="${W}" height="${H}" style="display:block">`+
      `<div style="position:absolute;left:0;top:0;background:#000b;padding:2px 8px;font-size:20px;font-weight:700">${k.n}</div></div>`+
      `<div style="font-size:13px;padding:3px 2px;height:34px;overflow:hidden">${Math.floor(k.t/60)}:${(k.t%60).toFixed(1).padStart(4,'0')} · ${esc(k.line)}</div></div>`).join('')+`</body>`);
  await sheet.waitForTimeout(300);
  fs.mkdirSync(path.join(dir,'preview'),{recursive:true});
  const out=path.join(dir,'preview','contact-sheet.png');
  await sheet.screenshot({path:out, fullPage:true});
  await browser.close();
  console.log(`✓ ${tiles.length} shots → ${topic}/preview/contact-sheet.png`);
})().catch(e=>{ console.error('✗ '+e.message); process.exit(1); });
