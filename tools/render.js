#!/usr/bin/env node
/* =====================================================================
   RENDER: turns <topic>/index.html (+ your voice recording) into a
   YouTube-ready MP4 (1080x1920 for Shorts, 30 fps, H.264 + AAC).

   Usage:  node tools/render.js <topic-folder> [--voice file] [--offset sec] [--fps 30] [--notext]
   Voice:  if --voice is not given, the first voice.* / *.m4a / *.mp3 / *.wav found in the topic folder is used.
   Sync:   the silence at the start of your recording (recorder start + 3-2-1 count) is detected
           and cut automatically, so your first word lands on shot 1. Use --offset to nudge
           (+0.3 = voice 0.3 s later, -0.3 = earlier).
   Voice clean-up: ON by default (made for a Boya BY-M1 lapel mic): rumble cut, hiss/noise reduction, mouth-click removal,
           warmth + presence EQ, de-esser, compressor, loudness -14 LUFS (YouTube), peak limiter.
           --raw = no clean-up.  --denoise 12 = noise reduction in dB (default 12; try 18 for a noisy room, 0 = off).
   Music:  original background music from music/ (made automatically by tools/make-music.js). Choose per video with
           music:'calm'|'dark'|'bright' (or false) in story.js, or --music dark / --nomusic / --musicvol 0.2.
           It fades in and out and gets quieter whenever you speak.
   SFX:    whoosh / boom / bell sounds are added at transitions and the hook (original, made by tools/sfx.js).
           --nosfx turns them off, --sfxvol 0.8 sets the loudness.
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

// ---- voice clean-up chain (plain ffmpeg filters, nothing extra to install) ----
function voiceChain(){ const dn=opt('denoise')===null?12:+opt('denoise');
  return ['highpass=f=80',                                   // rumble, handling noise, AC hum
    ...(dn>0?[`afftdn=nr=${dn}:nf=-35:tn=1`]:[]),             // steady hiss / room noise
    'adeclick=w=55:o=75',                                    // mouth clicks
    'equalizer=f=250:t=q:w=1:g=-2',                          // lapel mics sound boxy: cut mud
    'equalizer=f=3500:t=q:w=1:g=3',                          // presence: clear words
    'highshelf=f=9000:g=2',                                  // air
    'deesser=i=0.4:m=0.5:f=0.5',                             // soften harsh "s" sounds
    'acompressor=threshold=-20dB:ratio=3:attack=10:release=150:makeup=3'].join(','); }   // even volume
function measureLoud(file,chain){ const r=spawnSync('ffmpeg',['-hide_banner','-i',file,'-af',chain+',loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json','-f','null','-'],{encoding:'utf8'});
  const m=/\{[^{}]*"input_i"[^{}]*\}/.exec(r.stderr||''); try{ return m?JSON.parse(m[0]):null; }catch(e){ return null; } }
function voiceFilter(file){ if(opt('raw')) return null; const chain=voiceChain(), L=measureLoud(file,chain);
  const ln = L ? `loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=${L.input_i}:measured_TP=${L.input_tp}:measured_LRA=${L.input_lra}:measured_thresh=${L.input_thresh}:offset=${L.target_offset}:linear=true`
               : 'loudnorm=I=-14:TP=-1.5:LRA=11';
  console.log(L?`♪ voice clean-up on: loudness ${(+L.input_i).toFixed(1)} → -14 LUFS`:'♪ voice clean-up on (one-pass loudness)');
  return chain+','+ln+',alimiter=limit=0.89,aresample=48000'; }

(async()=>{
  const browser=await chromium.launch();
  const page=await browser.newPage({viewport:{width:540,height:960}, deviceScaleFactor:SCALE});
  const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.goto('file://'+HTML+'?render=1'+(opt('notext')?'&notext=1':''));
  await page.waitForFunction(()=>window.__ENGINE); await page.evaluate(()=>window.__ENGINE.ready); await page.waitForTimeout(400);
  if(errs.length){ console.error('✗ Page error:', errs[0]); process.exit(1); }
  const {duration, shots, music, voiceAt, sfx}=await page.evaluate(()=>({duration:window.__ENGINE.duration, shots:window.__ENGINE.shots, music:window.__ENGINE.music, voiceAt:window.__ENGINE.voiceAt, sfx:window.__ENGINE.sfx}));
  const N=Math.ceil(duration*FPS), out=path.join(DIR,topic+'.mp4');

  let shift=0, audioArgs=[], vf=null;
  if(voice && fs.existsSync(voice)){
    const lead=leadSilence(voice), off=+(opt('offset')||0);
    const first = voiceAt || 0;   // the voice starts when the narration starts (after any opening montage)
    shift = lead - 0.15 - first - off;      // seconds to cut from the start of the recording (negative = add delay)
    console.log(`♪ voice: ${path.basename(voice)}  (speech starts at ${lead.toFixed(2)}s → aligned to shot 1${first?`, after the ${first.toFixed(1)}s opening`:''}${off?`, offset ${off}s`:''})`);
    vf = voiceFilter(voice);
    audioArgs = shift>=0 ? ['-ss',shift.toFixed(3),'-i',voice] : ['-i',voice];
  } else console.log('♪ no voice file found: rendering a silent video (put voice.m4a in the topic folder to add it)');

  // ---- background music (original, made by tools/make-music.js): looped, faded, and ducked under your voice ----
  const wantMusic = opt('nomusic') ? false : (opt('music') && opt('music')!==true ? opt('music') : (music===undefined ? 'calm' : music));
  let musicFile=null;
  if(wantMusic){ musicFile=path.join(ROOT,'music',wantMusic+'.wav');
    if(!fs.existsSync(musicFile)){ try{ require('./make-music').makeTrack(wantMusic); }catch(e){ console.log('♫ could not make music "'+wantMusic+'" (calm | dark | bright): rendering without it'); musicFile=null; } }
    if(musicFile) console.log(`♫ background music: ${wantMusic}${voice&&audioArgs.length?' (ducks under your voice)':''}`); }
  // ---- sound effects (whoosh, boom, gong...): made from the story's transitions/hook by tools/sfx.js ----
  let sfxFile=null;
  if(!opt('nosfx') && sfx && sfx.length){ const S=require('./sfx'); sfxFile=path.join(DIR,'.sfx-temp.wav'); S.writeWav(sfxFile,S.renderSfx(sfx,duration+0.5)); console.log(`♫ sound effects: ${sfx.length} (whoosh / boom / bell ...)`); }
  const hasVoice=audioArgs.length>0, vol=+(opt('musicvol')||0.2), sfxVol=+(opt('sfxvol')||0.8), D=duration.toFixed(2);
  let nIn=hasVoice?2:1; const mIn=musicFile?nIn++:-1, sIn=sfxFile?nIn++:-1;
  const musicArgs = musicFile ? ['-stream_loop','-1','-i',musicFile] : [], sfxArgs = sfxFile ? ['-i',sfxFile] : [];
  const vChain = hasVoice ? [vf, shift<0?`adelay=${Math.round(-shift*1000)}:all=1`:null, 'apad'].filter(Boolean).join(',') : null;
  const fc=[], bed=[];
  if(hasVoice){ fc.push(musicFile?`[1:a]${vChain},asplit=2[v][vs]`:`[1:a]${vChain}[v]`); bed.push('v'); }
  if(musicFile){ fc.push(`[${mIn}:a]volume=${vol},afade=t=in:d=1.5,afade=t=out:st=${Math.max(0,duration-3).toFixed(2)}:d=3[m]`);
    if(hasVoice){ fc.push('[m][vs]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=500[md]'); bed.push('md'); } else bed.push('m'); }
  let bedL=null;
  if(bed.length===2){ fc.push(`[${bed[0]}][${bed[1]}]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[bed]`); bedL='bed'; } else if(bed.length===1) bedL=bed[0];
  if(sfxFile) fc.push(`[${sIn}:a]aresample=48000,volume=${sfxVol}[s]`);
  let audioOut=['-map','0:v'];
  if(bedL && sfxFile){ fc.push(`[${bedL}][s]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.89[a]`); }
  else if(bedL){ fc.push(`[${bedL}]alimiter=limit=0.89[a]`); }
  else if(sfxFile){ fc.push('[s]anull[a]'); }
  if(bedL||sfxFile) audioOut=['-filter_complex',fc.join(';'),'-map','0:v','-map','[a]','-c:a','aac','-b:a','192k'];
  const ff=spawn('ffmpeg',['-y','-hide_banner','-loglevel','error',
    '-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-', ...audioArgs, ...musicArgs, ...sfxArgs, ...audioOut,
    '-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-r',String(FPS),'-t',D,'-movflags','+faststart', out],{stdio:['pipe','inherit','inherit']});
  const ffDone=new Promise(r=>ff.on('close',code=>r(code)));
  const t0=Date.now();
  for(let i=0;i<N;i++){
    await page.evaluate(t=>window.__ENGINE.seek(t), i/FPS);
    const buf=await page.screenshot({type:'jpeg', quality:92});
    if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
    if(i%FPS===0||i===N-1){ const p=(i+1)/N, el=(Date.now()-t0)/1000; process.stdout.write(`\r▶ frame ${i+1}/${N}  ${(p*100).toFixed(0)}%  ~${Math.max(0,el/p-el).toFixed(0)}s left   `); }
  }
  ff.stdin.end(); await browser.close();
  const code=await ffDone; if(sfxFile) try{ fs.unlinkSync(sfxFile); }catch(e){}
  if(code){ console.error(`\n✗ ffmpeg failed (code ${code}). Check that the voice file plays, or try again without it.`); process.exit(1); }
  console.log(`\n✓ ${path.relative(ROOT,out)}  (${(duration).toFixed(1)}s, ${shots.length} shots, ${540*SCALE}x${960*SCALE})`);
})().catch(e=>{ console.error('✗',e.message); process.exit(1); });
