#!/usr/bin/env node
/* =====================================================================
   VARIETY AUDIT: node tools/variety-audit.js <topic-folder> [--last 3]
   Free and instant (no browser). Compares <topic>/story.js with the other videos
   and flags the repeats that .kiro/steering/variety.md forbids:
     - the same helper art copied from another video (same const/function name)
     - the same opening (first shot: mood + transition + fx + camera style)
     - transitions / moods / effects used in nearly the same proportions as the last videos
     - the same dominant colours
     - the same characters (a new villain must be a new design, so reuse is shown for you to judge)
   It never fails the build (exit 0): it prints WARN lines for you (or Kiro) to answer in the difference plan.
   ===================================================================== */
const fs=require('fs'), path=require('path'), vm=require('vm'), {spawnSync}=require('child_process');
const ROOT=path.join(__dirname,'..'), ENG=path.join(ROOT,'engine');
const read=f=>fs.readFileSync(f,'utf8');

/* ---------- pure helpers (also used by the self-test in tools/fixtures) ---------- */
const COUNT=(arr)=>{ const m={}; arr.forEach(k=>{ if(k) m[k]=(m[k]||0)+1; }); return m; };
const SHARE=(m)=>{ const n=Object.values(m).reduce((a,b)=>a+b,0)||1, o={}; for(const k in m) o[k]=m[k]/n; return o; };
/* overlap of two share-tables: 1 = identical mix, 0 = nothing in common */
const OVERLAP=(a,b)=>{ let s=0; for(const k in a) if(b[k]) s+=Math.min(a[k],b[k]); return s; };
const hueBucket=hex=>{ let h=hex.replace('#',''); if(h.length===3) h=h.split('').map(c=>c+c).join(''); const r=parseInt(h.slice(0,2),16)/255,g=parseInt(h.slice(2,4),16)/255,b=parseInt(h.slice(4,6),16)/255;
  const mx=Math.max(r,g,b), mn=Math.min(r,g,b), d=mx-mn, l=(mx+mn)/2; if(d<0.08) return l<0.25?'black':l>0.8?'white':'grey';
  let hh=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4; hh=(hh*60+360)%360;
  const names=['red','orange','yellow','green','teal','blue','violet','pink']; const edges=[15,45,70,160,200,255,300,345];
  for(let i=0;i<edges.length;i++) if(hh<edges[i]) return names[i]; return 'red'; };

function describe(topic){
  const dir=path.join(ROOT,topic), src=read(path.join(dir,'story.js'));
  const ctx={console}; vm.createContext(ctx);
  vm.runInContext(read(path.join(ENG,'timing.js'))+'\n'+read(path.join(ENG,'characters.js')), ctx);
  let CFG=null; ctx.VIDEO=c=>{ CFG=c; };
  vm.runInContext(src, ctx);
  const shots=(CFG&&CFG.shots)||[];
  const charNames=[...read(path.join(ENG,'characters.js')).matchAll(/^const\s+([A-Z_0-9]+)\s*=/gm)].map(m=>m[1]);
  const chars=charNames.filter(n=>new RegExp('\\b'+n+'\\b').test(src));
  /* top-level helper definitions: name -> normalised text (to tell a real copy from a name that merely matches) */
  const marks=[...src.matchAll(/^(?:const|function)\s+([A-Za-z_][A-Za-z_0-9]*)/gm)], helperText={};
  marks.forEach((m,i)=>{ const body=src.slice(m.index, i+1<marks.length?marks[i+1].index:src.indexOf('VIDEO(',m.index)>0?src.indexOf('VIDEO(',m.index):src.length); helperText[m[1]]=body.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ').trim(); });
  const helpers=Object.keys(helperText);
  const moodOf=m=>typeof m==='object'&&m?m.base:m;
  const camKind=c=>{ if(!c) return 'default'; if(typeof c==='string') return c; if(c.keys){ const z0=c.keys[0][3], z1=c.keys[c.keys.length-1][3]; return z1>z0+.15?'push-in':z1<z0-.15?'pull-back':'hold'; } return 'blend'; };
  const first=shots[0]||{};
  const colours=COUNT([...src.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)].map(m=>hueBucket(m[0])));
  return { topic, n:shots.length,
    tr:COUNT(shots.map(s=>s.tr||'cut')), mood:COUNT(shots.map(s=>moodOf(s.mood)||'neutral')), fx:COUNT(shots.map(s=>s.fx)), cam:COUNT(shots.map(s=>camKind(s.cam))),
    scenes:COUNT(shots.map(s=>s.scene)), chars, helpers, helperText, colours,
    opening:{ mood:moodOf(first.mood)||'neutral', tr:first.tr||'cut', fx:first.fx||'none', cam:camKind(first.cam), hook:!!(CFG&&CFG.hook) } };
}
function lastEdited(topic){ const f=path.join(topic,'story.js'); const r=spawnSync('git',['log','-1','--format=%ct','--',f],{cwd:ROOT,encoding:'utf8'});
  const t=+(r.stdout||'').trim(); return t||fs.statSync(path.join(ROOT,f)).mtimeMs/1000; }

function audit(cur,others){
  const out=[], W=m=>out.push('WARN  '+m), I=m=>out.push('      '+m);
  /* 1) copied helper art */
  const sim=(x,y)=>{ if(x===y) return 1; const A=new Set(x.match(/.{1,24}/g)||[]), B=new Set(y.match(/.{1,24}/g)||[]); let c=0; A.forEach(k=>{ if(B.has(k)) c++; }); return c/Math.max(1,Math.min(A.size,B.size)); };
  others.forEach(o=>{ const copies=cur.helpers.filter(h=>o.helperText[h] && o.helperText[h].length>120 && sim(cur.helperText[h],o.helperText[h])>=.8);
    if(copies.length) W(`helper art copied from ${o.topic}: ${copies.join(', ')}  (variety rule 3: draw something new, or move it into engine/ and make it configurable)`);
    const renamed=cur.helpers.filter(h=>!copies.includes(h)).filter(h=>cur.helperText[h].length>200).filter(h=>Object.keys(o.helperText).some(g=>g!==h && o.helperText[g].length>200 && sim(cur.helperText[h].replace(/^\S+\s+\S+/,''),o.helperText[g].replace(/^\S+\s+\S+/,''))>=.8));
    if(renamed.length) W(`helper art copied from ${o.topic} under another name: ${renamed.join(', ')}`); });
  /* 2) opening */
  others.slice(0,3).forEach(o=>{ const a=cur.opening,b=o.opening; const same=['mood','tr','fx','cam'].filter(k=>a[k]===b[k]);
    if(same.length>=4) W(`opening shot is built like ${o.topic} (${same.map(k=>k+':'+a[k]).join(', ')})  (variety rule 5)`); else if(same.length===3) I(`opening shares ${same.map(k=>k+':'+a[k]).join(', ')} with ${o.topic}`); });
  /* 3) overall mix of transitions, moods, fx, camera, colours versus the last videos */
  const TABLES=[['transitions','tr',.8],['moods','mood',.8],['camera moves','cam',.85],['effects','fx',.8],['colour families','colours',.8]];
  TABLES.forEach(([label,k,limit])=>{ others.slice(0,3).forEach(o=>{ const ov=OVERLAP(SHARE(cur[k]),SHARE(o[k])); if(ov>=limit) W(`${label}: ${Math.round(ov*100)}% the same mix as ${o.topic}`); }); });
  /* 4) characters reused (information, not an error) */
  const seen=new Set(others.slice(0,3).flatMap(o=>o.chars)); const reused=cur.chars.filter(c=>seen.has(c)), fresh=cur.chars.filter(c=>!seen.has(c));
  I(`characters: ${fresh.length?'new vs the last videos: '+fresh.join(', '):'none new'}${reused.length?'; reused: '+reused.join(', '):''}`);
  if(!fresh.length) W('no new character design versus the last videos (variety rule 4: every new villain / major character gets a new design)');
  /* 5) proportions, for the difference plan */
  const top=m=>Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([k,v])=>`${k} ${v}`).join(', ');
  I(`transitions: ${top(cur.tr)}`); I(`moods: ${top(cur.mood)}`); I(`camera: ${top(cur.cam)}`); I(`colour families in code: ${top(cur.colours)}`);
  return out; }

module.exports={COUNT,SHARE,OVERLAP,hueBucket,audit,describe};

if(require.main===module){
  const args=process.argv.slice(2), topic=(args.find(a=>!a.startsWith('--'))||'').replace(/\/$/,'');
  const li=args.indexOf('--last'), LAST=li>=0?+args[li+1]||3:3;
  if(!topic){ console.error('usage: node tools/variety-audit.js <topic-folder> [--last 3]'); process.exit(1); }
  if(!fs.existsSync(path.join(ROOT,topic,'story.js'))){ console.error('missing '+topic+'/story.js'); process.exit(1); }
  const cur=describe(topic);
  const others=fs.readdirSync(ROOT).filter(d=>d!==topic && /-(short|long)-form$/.test(d) && fs.existsSync(path.join(ROOT,d,'story.js')) && !/^(style-test|engine-test|explainer-test)/.test(d))
    .map(d=>{ try{ return Object.assign(describe(d),{t:lastEdited(d)}); }catch(e){ return null; } }).filter(Boolean).sort((a,b)=>b.t-a.t).slice(0,Math.max(LAST,3));
  console.log(`variety audit: ${topic} (${cur.n} shots) against ${others.map(o=>o.topic).join(', ')}\n`);
  const res=audit(cur,others), warns=res.filter(l=>l.startsWith('WARN'));
  console.log(res.join('\n')); console.log(`\n${warns.length?warns.length+' warning(s): answer them in the difference plan, or change the story.':'✓ no repeats found.'}`);
}
