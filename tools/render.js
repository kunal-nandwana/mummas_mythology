#!/usr/bin/env node
/* =====================================================================
   RENDER: turns <topic>/index.html (+ your voice recording) into a
   YouTube-ready MP4 (1080x1920 for Shorts, 30 fps, H.264 + AAC).

   Usage:  node tools/render.js <topic-folder> [--voice file] [--offset sec] [--fps 30] [--notext]
   Voice:  if --voice is not given, the first voice.* / *.m4a / *.mp3 / *.wav found in the topic folder is used.
   Sync:   the silence at the start of your recording (recorder start + 3-2-1 count) is detected
           and cut automatically, so your first word lands on shot 1. Use --offset to nudge
           (+0.3 = voice 0.3 s later, -0.3 = earlier).
   Output: <topic-folder>/<topic-folder>.mp4
   ===================================================================== */
const fs=require('fs'), path=require('path'), {spawn, spawnSync}=require('child_process');
const ROOT=path.join(__dirname,'..');
const args=process.argv.slice(2), topic=(args.find(a=>!a.startsWith('--'))||'').replace(/\/$/,'');
const opt=k=>{ const i=args.indexOf('--'+k); return i>=0 ? (args[i+1]&&!args[i+1].startsWith('--')?args[i+1]:true) : null; };
if(!topic){ console.log('Usage: node tools/render.js <topic-folder> [--voice file] [--offset sec]'); process.exit(1); }
const DIR=path.join(ROOT,topic), HTML=path.join(DIR,'index.html');
if(!fs.existsSync(HTML)){ console.error(`✗ ${topic}/index.html not found. Run: node tools/build.js ${topic}`); process.exit(1); }
if(spawnSync('ffmpeg',['-version']).status!==0){ console.error('✗ ffmpeg is not installed. Run: brew install ffmpeg'); process.exit(1); }
let chromium; try{ ({chromium}=require('playwright')); }catch(e){ console.error('✗ Playwright missing. Run: npm install && npx playwright install chromium'); process.exit(1); }

const FPS=+opt('fps')||30, SCALE=2;
// ---- find the voice file ----
let voice=opt('voice'); if(voice===true) voice=null;
if(!voice){ const f=fs.readdirSync(DIR).filter(n=>/\.(m4a|mp3|wav|aac|ogg|webm)$/i.test(n) && !/\.mp4$/i.test(n)).sort((a,b)=>(/^voice/i.test(b)?1:0)-(/^voice/i.test(a)?1:0)); if(f.length) voice=path.join(DIR,f[0]); }
else if(!path.isAbsolute(voice)) voice=fs.existsSync(voice)?path.resolve(voice):path.join(DIR,voice);

// ---- where does speech start? (skip recorder start + countdown) ----
function leadSilence(file){ const r=spawnSync('ffmpeg',['-hide_banner','-i',file,'-af','silencedetect=noise=-38dB:d=0.35','-f','null','-'],{encoding:'utf8'});
  const m=/silence_start: (-?[\d.]+)[\s\S]*?silence_end: ([\d.]+)/.exec(r.stderr||''); return (m && +m[1]<=0.05) ? +m[2] : 0; }

(async()=>{
  const browser=await chromium.launch();
  const page=await browser.newPage({viewport:{width:540,height:960}, deviceScaleFactor:SCALE});
  const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.goto('file://'+HTML+'?render=1'+(opt('notext')?'&notext=1':''));
  await page.waitForFunction(()=>window.__ENGINE); await page.evaluate(()=>window.__ENGINE.ready); await page.waitForTimeout(400);
  if(errs.length){ console.error('✗ Page error:', errs[0]); process.exit(1); }
  const {duration, shots}=await page.evaluate(()=>({duration:window.__ENGINE.duration, shots:window.__ENGINE.shots}));
  const N=Math.ceil(duration*FPS), out=path.join(DIR,topic+'.mp4');

  let shift=0, audioArgs=[];
  if(voice && fs.existsSync(voice)){
    const lead=leadSilence(voice), off=+(opt('offset')||0);
    const first = shots.length ? shots[0].start : 0;   // intro sting length: the voice starts when shot 1 starts
    shift = lead - 0.15 - first - off;      // seconds to cut from the start of the recording (negative = add delay)
    console.log(`♪ voice: ${path.basename(voice)}  (speech starts at ${lead.toFixed(2)}s → aligned to shot 1${first?`, after the ${first.toFixed(1)}s intro`:''}${off?`, offset ${off}s`:''})`);
    audioArgs = shift>=0 ? ['-ss',shift.toFixed(3),'-i',voice] : ['-i',voice];
  } else console.log('♪ no voice file found: rendering a silent video (put voice.m4a in the topic folder to add it)');

  const ff=spawn('ffmpeg',['-y','-hide_banner','-loglevel','error',
    '-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-', ...audioArgs,
    ...(audioArgs.length? (shift<0?['-af',`adelay=${Math.round(-shift*1000)}:all=1,apad`]:['-af','apad']) : []),
    '-map','0:v', ...(audioArgs.length?['-map','1:a','-c:a','aac','-b:a','192k']:[]),
    '-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-r',String(FPS),'-t',duration.toFixed(3),'-movflags','+faststart', out],{stdio:['pipe','inherit','inherit']});
  const ffDone=new Promise(r=>ff.on('close',code=>r(code)));
  const t0=Date.now();
  for(let i=0;i<N;i++){
    await page.evaluate(t=>window.__ENGINE.seek(t), i/FPS);
    const buf=await page.screenshot({type:'jpeg', quality:92});
    if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
    if(i%FPS===0||i===N-1){ const p=(i+1)/N, el=(Date.now()-t0)/1000; process.stdout.write(`\r▶ frame ${i+1}/${N}  ${(p*100).toFixed(0)}%  ~${Math.max(0,el/p-el).toFixed(0)}s left   `); }
  }
  ff.stdin.end(); await browser.close();
  const code=await ffDone;
  if(code){ console.error(`\n✗ ffmpeg failed (code ${code}). Check that the voice file plays, or try again without it.`); process.exit(1); }
  console.log(`\n✓ ${path.relative(ROOT,out)}  (${(duration).toFixed(1)}s, ${shots.length} shots, ${540*SCALE}x${960*SCALE})`);
})().catch(e=>{ console.error('✗',e.message); process.exit(1); });
