# Engine cheat sheet (read this, NOT the engine source)

Design space 540x960. Build: `node tools/build.js <topic>`. Style reference: `chandra-27-wives-short-form/story.js`.

## story.js
```js
VIDEO({ title, format:'short', target:72 /*sec*/, keywords:['..'],   // keywords = highlighted caption words
  // intro / outro (brand sting + end card) exist but the owner does NOT want them: leave them out
  // hook (big slam-in title text): the owner does NOT want it, so leave `hook` out
  // hook:{at:.6, hold:1.5, words:[{text,size,y,delay,count:[1,27],glow,rot,shake,ring}]},  // slam-in text, first 2s
  // opening:N (silent montage) exists but the owner does NOT want an intro before the story: do not use it
  sfx:true,                        // sound effects are automatic; false = none
  music:'flute',                   // background music = owner's track in music/ (default: first file; 'flute' = any file whose name has 'flute'); false = none;
                  // 'scenes' = SCENE SOUND LIBRARY (see below): every shot has scene:'name' with its own saved music, smooth cross-fades, key-moment ducking.
                  // 'score' = older mood-only version (tools/make-score.js)
  ending:3.2,                      // natural finish (default): last scene holds + slow push-in, music fades, fade to black; 0 = stop at once
  handheld:.6, captionTop:400, captionChars:24, minShot:2.4, pace:13, audio:'file',
  shots:[ SHOT, ... ] })
```
**SHOT**: `line` (exact user words), `dur` (fix length), `nocap`, `capTop` (use 640 if no characters), `cast:[CAST]`,
`art` (flat scene) **or** layers `sky`/`far`/`mid`/`art`/`near` (parallax .3/.6/.85/1/1.4), `front` (drawn over actors),
`title:{text,y,size,color,delay}`, `calli:{lines:[..],source,y,size,col,delay,gap,write,hold,glow,scrim}` (verse written in calligraphy), `sfx:[[secsIntoShot,'gong',vol]]` (extra sound effect), `rec:'0:31.8'` (pin this shot's start to that time in the owner's recording; use when voice-report.md shows a wrong start), `cam`, `fx`, `tr`, `trAt:[x,y]` (iris centre), `mood`, `shake:[start,dur,amp]`, `scene:'name'` (which saved music this shot uses), `focus:{at,sound,dur,duck}` (dominant sound at the key moment; see "Scene sound library").
All scene fields are functions: `art:()=>svg`.

**CAST**: `{c:CHAR, x, y, s, flip, expr, talk:true, acts:[[t,'pose',dur?]...], props:{front,back}, walk:{from,dur,delay}, enter:{fade,delay,rise}, exit:{at,fade}, eyes:'closed', look:'up', tears:true, aura, gesture:false, with:{costume overrides}}`
- Feet at (x,y); head ≈ `(x, y-268*s)`. Faces right; `flip:true` faces left. Poses chain with `+`: `'kneel+namaste'`.
- `expr`: calm, smile, serene, sad, angry, surprise.

## Characters (engine/characters.js)
BARBARIK KRISHNA BRAHMIN ARJUNA BHIMA YUDHISHTHIRA NAKULA SAHADEVA GHATOTKACH MOTHER DEVI SITA RAMA SHIVA MAHAKAL DUSHAN ASURA RISHI SOLDIER VILLAGER DEVOTEE_F CHANDRA DAKSHA ROHINI NAKSHATRA (recolour: `{c:NAKSHATRA, with:{top,bottom,veil}}`) INDRA DEVA INDRADYUMNA VISHWAKARMA PUJARI NANDI NANDI_SADHAK.
**NANDI** = Nandi as a 7-year-old boy (bare chest, white dhoti, top-knot, tilak, rudraksha; use `s` .6-.8 next to adults). **NANDI_SADHAK** = same boy with a marigold garland (tapasya). The grown white bull is a scene piece, see below.
**INDRADYUMNA** = King of Puri (tall gold crown, maroon + gold, dark cape; use `namaste`). **VISHWAKARMA** = divine craftsman (bare chest, cream dhoti, ochre shoulder cloth, white beard, hair bun; give `props:{front:'mallet'}`). **PUJARI** = Puri temple priest (shaven head, white dhoti, sacred thread); Nabakalebara look: `with:{blindfold:true}` + `props:{front:'heartCloth'}` or `'cloth'`.
**SHIVA** = Mahadev (topknot jata with Ganga + crescent, third eye, ash stripes, Vasuki, tiger skin, rudraksha, broad build). The third eye is a closed mark and opens by itself when `expr:'angry'`; or `thirdAt:secs` opens it at that time. **MAHAKAL** = fierce Shiva (flaming jata, red aura): use for the Mahakal/Rudra scenes. **DUSHAN** = horned, tusked asura with iron armour (give `props:{front:'axe'}`), **ASURA** = smaller demon soldier. They look nothing like YAMRAJ/DEVA.
Costume keys for `with`: head(+mahadev|demon) bare ash snake tiger rudra third tusks spikes eyeCol fireHair blindfold(true|'#colour': cloth band over the eyes, knot + loose ends) skin top bottom shin foot sleeve skirt trim hair(long|bun|none) head(crown|feather|turban|band|big|jata|none) beard mus cape quiver garland sash veil turban tilak earring big aura(gw|saf|gr|gb|gg) jewel crescent.

## Poses
stand relax point armUp bless offer give namaste think fist shock bowReady bowDraw carry shoulder pranam lookUp lookDown
**Acting:** lookAway lookBack (head turn) explain plead accuse rage recoil weep grief hold
**Kneel:** kneel kneelPray kneelOffer kneelBow
Custom: pass an object `{a:[shoulder,elbow], b:[..], f:[hip,knee], k:[..], head, lean, drop, turn, hand:'fist|open|namaste'}`.
Talking characters nod/gesture automatically; capes, veils, hair, garlands sway by themselves.

## Props (`props:{front:'bow'}`)
bow (+arrow with bowDraw) mace axe(double-bladed) staff lantern diya lotus trishul sword arrows3 orb chakra flute mallet(wooden mallet + chisel) cloth(both hands wrapped in thick white cloth) heartCloth(the same, with a golden-pink light beating inside; the object itself is never shown). Use `cloth`/`heartCloth` with pose `offer`.

## Shiv temple + Nandi pieces (scenes.js, all return SVG; used by nandi-kaan-mannat-short-form)
`nandiBull(x,y,s,{flip,eyes:'closed',garland})` seated white bull with garland, bells, red-gold cloth, big ear (faces right) · `nandiBack(x,y,s)` the same seen from behind · `shivling(x,y,s)` · `sanctum(x,y,s)` stone doorway with glow, Shivling and lamps inside · `shikhara(x,y,w,h,col,lit)` temple tower · `diyaRow(x1,x2,y,n,s)` flickering lamps · `marigoldString(x1,y1,x2,y2,sag,n)` · `whisperTrail(x1,y1,x2,y2,delay,n)` golden motes stream from one point to another (light-only "prayer reaches Mahadev") · `riverSky() riverFar() riverBank(y)` forest river at dawn (teal + green + gold) · `ashramHut(x,y,s)` · `skyBand([[offset,col],...])` own vertical sky gradient (unique id per call, safe).

## Scenes (engine/scenes.js; all return SVG)
- Base: `nightBase({moon:[x,y,r],fort:[x,y,s],camps:y,gy,hillsY})`, `warSky(sunY,r)`, `divine(cx,cy,col,ray)` (rays; skyDiv bg), `palace(y,tone)` / `palaceBack`+`palaceMid`+`palaceFloor`, `field('erase'|'mark'|'save')` (army)
- Pieces: `stars(n,h) moon(x,y,r) clouds() hills(y,amp,col,step) ground(y) tufts flowers fg() chhatri fort tent fire(x,y,s) camps peepal(x,y,s) sol(x,y,s,col,flip) banner armies(y) sparkle(x,y,s,col) flyArrow(col,glow) headOnly(x,y,s) pedestal(x,y,s)`
- Moon/space: `phaseMoon(x,y,r,'full'|'wane'|'wax'|num,dur,delay)`, `moonRow(y,r)`, `nakshatras(cx,cy,rx,ry,stagger)`, `earth(x,y,r)`, `orbitMoon(cx,cy,r,period,mr)`
- Text: `big(x,y,size,col,text,delay)`, `parchment(x,y,w,h)`, `verse(x,y,[lines],size,col,delay,gap)`, `pothi(x,y,s)`
- Gradients: `url(#skyN|skyW|skyDiv|gnd|fog|saf|gw|gg|gold|moonG|heartG)` (heartG = golden-pink glow).
- **Own gradients in a story:** Chrome only paints a gradient whose FIRST `id` in the page is visible, and hidden shots are `display:none`. If a story defines its own `<defs>`, give every shot its own ids (see `withDefs` in `jagannath-heart-short-form/story.js`), or the gradient is invisible in all later shots.
- Animate any group: `A('spec', svg)`: flick:spd pulse:spd bob:amp:spd spin:period:cx:cy rock:deg:spd:cx:cy pop:delay rise:dy:dur:delay slide:dx:dy:dur:delay walk:dx:dur:delay fadeout:at:dur fadein:at:dur orbit:rx:ry:cx:cy:period drift:dx:dy:period (looping slide+fade: clouds, smoke, rising embers, floating lamps) ripple:period:cx:cy (looping growing ring/glow: shock-waves, holy light) beat:cx:cy:amp[:bpm] (heartbeat lub-dub, default 60 bpm on whole video seconds: scales around cx,cy by amp and brightens; for a living light / heart)

## Camera `cam`
- Presets: `'in' 'out' 'panL' 'panR' 'up' 'down' 'still'`
- Blend: `{from:[x,y,zoom], to:[x,y,zoom]}` (x,y = centre point)
- **Keyframed (new):** `{keys:[[t,x,y,zoom],[t,x,y,zoom,'snap']]}` (push-ins, whip to a face; zoom ≥1.5 = face close-up, background blurs)

## fx
dust embers sparks stars flies petals

## tr (transition INTO the shot)
cut fade glow whip zoom iris (+`trAt`) wipe flash dip

## mood (new; lighting + colour grade, cross-fades)
calm joy hope anger sad shock divine. The background music also follows the mood (a little louder for hope/anger, a little quieter for sad); override with `music:0.6` on a shot. With `music:'score'` each mood also gets its OWN music (calm flute, joy plucks, hope harp, divine bells, sad bowed strings, shock drum+hush, anger drums) and volume (sad softest, anger loudest). Object form: `{base:'sad', vig:.3, ...}`

## Sound effects (automatic, original)
Scene changes get a soft BEEP / short tune (never a whoosh): `beepUp` (2 rising notes) into calm/joy/hope/divine shots, `beepDown` (2 falling notes) into sad/anger/shock shots, `beep` otherwise; `cfg.transitionSound:'none'` turns them off. Extra: `sfx:[[1.2,'gong']]` on a shot. Names: beep beepUp beepDown boom hit gong bell shimmer whoosh tick riser, and the dominant ones: slay emerge arrive noose revive kaal. Preview: `node tools/sfx.js`.

## Scene sound library (music:'scenes')
`music/scene-library/library.json` = saved music recipes (committed to GitHub). Each shot: `scene:'yamraj-arrives'`. Same name = same tune every time (Shiva's music returns when Shiva strikes again). No `scene:` = default of its `mood` (`mood-calm`, `mood-sad` ...). **A new scene name is created and saved automatically by `node tools/build.js`** (from its mood; edit the recipe in library.json to change it). List: `node tools/scene-audio.js list`; listen: `node tools/scene-audio.js preview`; make one by hand: `node tools/scene-audio.js new <name> <mood>`.
Key moment: `focus:{at:1.65, sound:'slay', dur:2.6, duck:.22}` (also an array) = that dominant sound plays loud at `at` seconds into the shot while the music dips to `duck` (0.3 = 30 %) for `dur` s and swells back. Sounds land exactly on `at`. Use it for the 1-3 big moments of a video only.
Balance (automatic): every scene is levelled to the same loudness, music sits ~10-12 dB under the voice and ducks a further ~6 dB while speaking; `--musicvol 1.3`/`0.7` on render.js to nudge.

## Opening montage
(Owner dislikes it: not used.) `opening:N` + N shots with `art/cast/cam/tr` and NO `line` (0.8s each, or `dur`). Counts inside `target`. Plays with the hook, a riser, then a boom when narration starts. See `chandra-27-wives-short-form/story.js`.

## Look polish (engine default, approved)
Every video now gets, automatically: a thin **rim light along every character's silhouette** (colour and strength follow the shot's `mood`), soft **bokeh lights** tinted by the mood light, tiny floating **motes**, a warm **diya glow** at the bottom and a slightly deeper vignette. Turn it off for one video with `look:false`; tune with `look:{rim:1, bokeh:1, motes:1, warm:.08 /*0=off*/, vig:.1}`. Before/after: `mahakal-origin-short-form/preview/look-before.png` / `look-after.png`.

## Explainer templates (new): reusable Hindi diagrams, gold on dark
Put them in `art`/`mid`/`front`. Lines draw themselves in, nodes and labels appear one by one. Shot lines of 5-10 s suit them; use `capTop:120` so the caption stays above the diagram. Example: `explainer-test-short-form/story.js` (picture: its `preview/explainers.png`).
- `famTree(cx, top, {n:'दशरथ', sub:'अयोध्या के राजा', hi:true, col?, mark?, kids:[{n:'राम',hi:true,col:'#8fb4ff'}, ...]}, {gapY:190, leafW:128, r:40, delay:.3, step:.55})`: family tree; kids spread automatically; `hi:true` glows.
- `timeline(cx, top, [{t:'त्रेता', d:'राम का युग', hi:true}, ...], {gap:150, delay:.3, step:.7})`: vertical timeline, items alternate left/right.
- `mapRoute([{x,y,n:'अयोध्या'}, ...], {step:.9, wiggle:26, label:'below'|'side', delay:.3})`: dotted journey between places; last place glows.
- New animation spec `A('draw:at:dur', svg)` draws paths that have `pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"`.
- Orbit / sky diagram already exists: `earth`, `orbitMoon`, `nakshatras`.

## Animation upgrades (new, all optional)
parallax layers · keyframed camera/close-ups · head turns, gestures, secondary motion · `tears` · mood · cinematic `tr` · handheld camera.

## URL options
`?shot=N` `?t=12.5` `?notext=1` `?clean=1` `?prompter=1` `?render=1` (`__ENGINE.seek(t)`)

## Voice sync (render.js, automatic)
Pauses are found at the level that fits the room; each pause is matched to a sentence/clause end in the script (। ? ! , — and shot ends) or treated as a breath, choosing the steadiest speaking pace; a shot change sits on its own pause if it has one, otherwise it is placed by that pace between the nearest matched pauses (report says "by sentence pace"). Regression test: `node tools/test-voicesync.js`; caption words follow the real speech and wait in pauses. `node tools/voice-report.js <topic>` writes `<topic>/voice-report.md` (also written on every render). When the owner says a shot is off, read the report he pastes and add `rec:'m:ss.s'` to that shot.
Verses: shots with `calli` (or a `॥` line) count as chanted, 1.7x slower than narration (and never shorter than their `dur:`), so the next scene does not cut in mid-shloka. Per shot `chant:2` = slower still, `chant:1` = normal. The calligraphy lines are spread over the real chanting and always finish 0.7 s before the cut (`calli.fit:false` = fixed timings).

## Long videos 16:9 (new: parshuram-ravan-vadh-long-form)
`VIDEO({format:'long', ...})` = 960x540 design space (render.js makes 1920x1080; check.js / contact-sheet.js follow). Captions sit at the bottom (`captionTop` default 446, `captionChars` ~42). Put feet at y 380-450, scale .6-.8. Camera presets and keys use the 960x540 centre (480,270). Wide helpers live in `engine/wide.js` (all return SVG; layered scenes return {sky,far,mid,near}; in story.js wrap them lazily: `const lay=mk=>({sky:()=>mk().sky(),far:()=>mk().far(),mid:()=>mk().mid(),near:()=>mk().near()})` then `...lay(()=>mahendra({...}))`).
- **Chapter name (owner rule, UPDATED Nov 17 2026):** use a chapter card shot `{chapter:{no:2,name:'..'}, dur:6, tr:'dissolve', mood:'divine', scene:'..', sfx:[[1.3,'bell',.5]]}` before the first shot of each chapter, and put `tr:'dissolve'` on that first shot. The card is centred: dark screen, a faint (translucent) mandala + lotus backdrop, "अध्याय" + big Devanagari numeral + gold divider + name drift in over 1.3 s, hold, drift out over 1.3 s, then dark, then the next chapter dissolves in. It is a silent gap for the voice (leave `dur` seconds of silence; the prompter says so). The small top `chapterTag` plate still exists but is NOT used any more.
- **Wide scenes:** `mahendra({sunX,sunY,tone:'dawn|dusk|night',ledge,sun})` mountain dawn, `court({tx,throne})` royal court, `ayodhya({tone:'dusk|dawn'})` palace skyline, `brahmaloka()` pink-gold heaven, `kshir()` milk ocean, `cosmos({col})` star sea + mandala, `mithilaRoad()`.
- **Pieces:** `wsky(stops) wglow(x,y,r,col,op) wmist wridge wstars wclouds wmandala wsparks lightShafts crownsRise lotusPlatform(x,y,s) infantRam(x,y,s) wquestion(x,y,s)` (do not use: the owner dislikes the "?" mark). Use instead: `wriddle(kind,x,y,s,col)` = ring of light round a matching symbol, kind `'axe'|'crown'|'chakra'|'both'|'diya'`; `wbloom(x,y,s)` = lotus bloom for "purpose complete" (use instead of any tick/check mark)..
- **Documentary graphics:** `wlower(title,sub,{at,hold,x,y})` scripture lower-third plate (use in `front`), `splitArgs({hi:0|1|-1})` the "पहला तर्क / दूसरा तर्क" split, `avatarMontage({hi,delay,step})` Matsya / Narasimha / Parshuram / Ram medallions, `chainW([{n,sub}],{y,delay,step,hi,before})` event chain.
- **Characters (new):** PARSHURAM (use `props:{front:'parashu'}`), KASHYAP, BRAHMA (4 faces), RAVAN (10 heads, `props:{front:'khadga'}`), SAHASTRABAHU (8 extra arms), VISHNU (extra arms with chakra + gada). New costume keys: `faces:[[dx,dy,scale],..]` extra heads fanned behind, `arms:N` + `armItems:['sword','lotus','mace','bow','trishul','flag','chakra']` extra arms, head type `jata2` (sage top-knot). New props: `parashu`, `khadga`. Silhouette trick: `with:{skin:'#1c1226',top:..., ash:false, rudra:false}`.
- **Voice (render.js):** long videos get a cinematic voice grade by default (warm chest, clarity, short room tail). `--nocinema` off, `--cinema` on for a Short.
- **v2 additions (Parshuram video fixes):**
  - `cam:'fit'` = exactly zoom 1.0, no crop. Use it (or `{keys:[[0,480,270,1],[hold,480,270,1],[hold+7,x,y,1.1]]}`) on every infographic / lower-third / diagram shot, because any zoom above 1 crops the edges and cuts off text.
  - Costume key `beardLen` (0 = none, 1 = long thick sage beard down the chest, sways; with `beard:'black'|'grey'|'white'`). PARSHURAM now has `beardLen:1`.
  - `faces:[[dx,dy,scale,rot],..]`: optional 4th value rotates that extra head about the neck, so many heads can be fanned in arcs (new RAVAN: crimson-black armour, 4 extra arms, ten heads in two arcs).
  - New wide scenes (layered): `tapovan({tone:'dawn'|'dusk',fireX,hutX})` forest ashram, `lanka({sunX,sunY})` golden city on a rock island at dusk, `warfield({sunX})` smoky tyrant-kings field with torn banners. `mahendra` now has birds and falling leaves.
  - New pieces: `wbirds(y,n,period,col)`, `wleaves(n,cols,y1,y2)`, `wflag(x,y,h,col)`, `wfire(x,y,s)`, `wtree(x,y,s,col,trunk)`.
  - Pacing rule for long videos: keep each picture under about 8 s. Split a long line into several shots (cut only at spaces) and give each part a different scene or camera. `check.js` warns above 9 s. The Parshuram story has a small `SPLIT(text, cuts, parts)` helper for this.


## v3 (Parshuram video fixes, Nov 2026)
- **Full beard:** `beardLen` (0-1+) now covers the whole lower face from ear to nose (mouth hidden, moustache, strands, sways). `beard:'black'|'grey'|'white'`. Mouth line is hidden under it; talking still shows a mouth.
- **Tall jata top-knot** (`head:'jata2'`, PARSHURAM/KASHYAP): rounded tall knot with 3 cords, long hair behind.
- **Crown `head:'kirita'`**: tall gold cone with bands + jewels (VISHNU, BRAHMA, also on Brahma's extra faces). `halo:[x,y,r]` = glowing ring with slowly turning rays behind the head.
- **Costume keys:** `mala:[colours]` bead necklace (rudraksha, or pearls), `studs:'#colour'` studs on the sash, `belt:'#colour'` belt + hanging strap, `pads:'#colour'` gold/brown shoulder pads on every arm, `holds:{front|back:'prop'}` default prop in a hand (cast `props` override it), `tilak:'namam'` (white U with red centre, Vishnu).
- **New props / extra-arm items:** `shankh` (conch), `kamandalu`, `veda` (book), `mala` (bead ring, extra arm only).
- **BRAHMA** now: golden-brown, red dhoti + red cloth, 3-4 faces with kirita + white beards, halo, veda + mala in extra hands, kamandalu. **VISHNU**: kirita + halo, pearl mala, pads, yellow cloth, chakra + shankh up, gada in back hand.
- **Storm sky for Brahma's boon:** `lay(()=>vardanSky({gx,gy}))` = dark violet storm, flashing lightning bolts, golden glow at (gx,gy). Use with `mood:'shock'`. Animation `A('bolt:period:offset', svg)` = double lightning flash once per period; `wbolt(x,y1,y2,period,offset,col)` draws one bolt.
