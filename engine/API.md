# Engine cheat sheet (read this, NOT the engine source)

Design space 540x960. Build: `node tools/build.js <topic>`. Style reference: `chandra-27-wives-short-form/story.js`.

## story.js
```js
VIDEO({ title, format:'short', target:72 /*sec*/, keywords:['..'],   // keywords = highlighted caption words
  intro:1.0, outro:3.6,            // brand sting before shot 1 / end card after last (not in target)
  hook:{at:.6, hold:1.5, words:[{text,size,y,delay,count:[1,27],glow,rot,shake,ring}]},  // slam-in text, first 2s
  handheld:.6, captionTop:400, captionChars:24, minShot:2.4, pace:13, audio:'file',
  shots:[ SHOT, ... ] })
```
**SHOT**: `line` (exact user words), `dur` (fix length), `nocap`, `capTop` (use 640 if no characters), `cast:[CAST]`,
`art` (flat scene) **or** layers `sky`/`far`/`mid`/`art`/`near` (parallax .3/.6/.85/1/1.4), `front` (drawn over actors),
`title:{text,y,size,color,delay}`, `cam`, `fx`, `tr`, `trAt:[x,y]` (iris centre), `mood`, `shake:[start,dur,amp]`.
All scene fields are functions: `art:()=>svg`.

**CAST**: `{c:CHAR, x, y, s, flip, expr, talk:true, acts:[[t,'pose',dur?]...], props:{front,back}, walk:{from,dur,delay}, enter:{fade,delay,rise}, exit:{at,fade}, eyes:'closed', look:'up', tears:true, aura, gesture:false, with:{costume overrides}}`
- Feet at (x,y); head ≈ `(x, y-268*s)`. Faces right; `flip:true` faces left. Poses chain with `+`: `'kneel+namaste'`.
- `expr`: calm, smile, serene, sad, angry, surprise.

## Characters (engine/characters.js)
BARBARIK KRISHNA BRAHMIN ARJUNA BHIMA YUDHISHTHIRA NAKULA SAHADEVA GHATOTKACH MOTHER DEVI SITA RAMA SHIVA RISHI SOLDIER VILLAGER DEVOTEE_F CHANDRA DAKSHA ROHINI NAKSHATRA (recolour: `{c:NAKSHATRA, with:{top,bottom,veil}}`) INDRA DEVA.
Costume keys for `with`: skin top bottom shin foot sleeve skirt trim hair(long|bun|none) head(crown|feather|turban|band|big|jata|none) beard mus cape quiver garland sash veil turban tilak earring big aura(gw|saf|gr|gb|gg) jewel crescent.

## Poses
stand relax point armUp bless offer give namaste think fist shock bowReady bowDraw carry shoulder pranam lookUp lookDown
**Acting:** lookAway lookBack (head turn) explain plead accuse rage recoil weep grief hold
**Kneel:** kneel kneelPray kneelOffer kneelBow
Custom: pass an object `{a:[shoulder,elbow], b:[..], f:[hip,knee], k:[..], head, lean, drop, turn, hand:'fist|open|namaste'}`.
Talking characters nod/gesture automatically; capes, veils, hair, garlands sway by themselves.

## Props (`props:{front:'bow'}`)
bow (+arrow with bowDraw) mace staff lantern diya lotus trishul sword arrows3 orb chakra flute

## Scenes (engine/scenes.js; all return SVG)
- Base: `nightBase({moon:[x,y,r],fort:[x,y,s],camps:y,gy,hillsY})`, `warSky(sunY,r)`, `divine(cx,cy,col,ray)` (rays; skyDiv bg), `palace(y,tone)` / `palaceBack`+`palaceMid`+`palaceFloor`, `field('erase'|'mark'|'save')` (army)
- Pieces: `stars(n,h) moon(x,y,r) clouds() hills(y,amp,col,step) ground(y) tufts flowers fg() chhatri fort tent fire(x,y,s) camps peepal(x,y,s) sol(x,y,s,col,flip) banner armies(y) sparkle(x,y,s,col) flyArrow(col,glow) headOnly(x,y,s) pedestal(x,y,s)`
- Moon/space: `phaseMoon(x,y,r,'full'|'wane'|'wax'|num,dur,delay)`, `moonRow(y,r)`, `nakshatras(cx,cy,rx,ry,stagger)`, `earth(x,y,r)`, `orbitMoon(cx,cy,r,period,mr)`
- Text: `big(x,y,size,col,text,delay)`, `parchment(x,y,w,h)`, `verse(x,y,[lines],size,col,delay,gap)`, `pothi(x,y,s)`
- Gradients: `url(#skyN|skyW|skyDiv|gnd|fog|saf|gw|gg|gold|moonG)`.
- Animate any group: `A('spec', svg)`: flick:spd pulse:spd bob:amp:spd spin:period:cx:cy rock:deg:spd:cx:cy pop:delay rise:dy:dur:delay slide:dx:dy:dur:delay walk:dx:dur:delay fadeout:at:dur fadein:at:dur orbit:rx:ry:cx:cy:period

## Camera `cam`
- Presets: `'in' 'out' 'panL' 'panR' 'up' 'down' 'still'`
- Blend: `{from:[x,y,zoom], to:[x,y,zoom]}` (x,y = centre point)
- **Keyframed (new):** `{keys:[[t,x,y,zoom],[t,x,y,zoom,'snap']]}` (push-ins, whip to a face; zoom ≥1.5 = face close-up, background blurs)

## fx
dust embers sparks stars flies petals

## tr (transition INTO the shot)
cut fade glow whip zoom iris (+`trAt`) wipe flash dip

## mood (new; lighting + colour grade, cross-fades)
calm joy hope anger sad shock divine. Object form: `{base:'sad', vig:.3, ...}`

## Animation upgrades (new, all optional)
parallax layers · keyframed camera/close-ups · head turns, gestures, secondary motion · `tears` · mood · cinematic `tr` · `hook` · `intro`/`outro` · handheld camera.

## URL options
`?shot=N` `?t=12.5` `?notext=1` `?clean=1` `?prompter=1` `?render=1` (`__ENGINE.seek(t)`)
