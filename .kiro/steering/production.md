---
inclusion: always
---
# Mumma's Mythology: how videos are made (read this first in every session)

Hindi mythology Shorts and long videos, drawn entirely in code. Owner: Kunal (non-technical; Mac M1, 8 GB). Mostly speaks Hinglish, so reply in simple English.
Targets: 30 Shorts + 4 long videos a month, with his own voice. **Credits matter: keep every session lean.**

## Hard rules
- **Never change the user's words.** Save his script verbatim as `<topic>/my-script.md`. `story.js` lines must match it exactly (long lines may be split across shots). Verify by script, not by eye.
- Never use other creators' artwork or copyrighted music.
- Folders: `<topic>-short-form/` or `<topic>-long-form/` at the repo root; old versions go in `<topic>/old-version/`.
- Work on a branch, open a PR to `main` with `gh api` (no `gh pr create`), and give the user the link.

## Where things are
- **For normal video sessions read `engine/API.md` (one-page cheat sheet of every character, pose, scene, prop, camera/fx/transition/mood option and story.js field). Do NOT open the engine source files (`rig.js`, `scenes.js`, `core.js`, `characters.js`, `timing.js`) unless you are changing the engine itself or API.md is missing something. If you add or change an engine feature, update `engine/API.md` in the same PR.**
- `engine/`: `rig.js` (jointed characters, poses, props), `characters.js` (costume presets), `scenes.js` (backgrounds and pieces), `timing.js`, `core.js` (player, captions, prompter, `seek()`), `engine.css`, `fonts/`.
- `tools/build.js <topic>` makes `<topic>/index.html` and `<topic>/script.md` from `<topic>/story.js`.
- `tools/render.js <topic>` runs **on the user's Mac only** (this sandbox has no ffmpeg). It makes a 1080x1920 MP4 and adds `voice.m4a` from the topic folder. The user double-clicks `make-video.command`.
- Reference video: `chandra-27-wives-short-form/` (15 shots, 72 s), the best example of story.js style.

## Story.js essentials
`VIDEO({title, format:'short', target:<sec>, keywords:[...], shots:[{line, art:()=>svg, cast:[{c:CHAR, x, y, s, flip, expr, talk, acts:[[t,'pose',dur]], props, walk, with:{}}], front, title:{text,y,size}, cam, fx, tr, shake, dur, capTop, nocap}]})`.
- Design space is 540x960. Captions default to top 400 px (above heads); use `capTop:640` when there are no characters.

## Owner's standing rules
- When the owner confirms a change works ("good", "ok", "approved"), make it the **engine default** (engine/ + tools/ + `engine/API.md`), not a one-video tweak, so every future video gets it.
- No intro, hook text or end card. Every video ends with the natural `ending` (default on).
- Music = the owner's own track in `music/` by default. Exceptions he asked for: `music:'score'` (Chandra) and **`music:'scenes'` = scene sound library** (`music/scene-library/library.json`, `tools/scene-audio.js`): tag every shot `scene:'name'` (new names are auto-created + saved by build.js; reuse existing names for the same kind of scene), and use `focus:{at,sound,dur,duck}` on the 1-3 key moments so a dominant sound plays and the music steps back. Scene changes get a soft beep/tune, NEVER whoosh/whoop. Voice stays on top. SFX stay soft except `focus` sounds.
- Shlokas/verses: always put them in their own shot with `calli` (that makes the voice sync treat them as slow chanting and makes the calligraphy follow the chanting). If a verse is still cut short, add `chant:2` to that shot. When the report shows "no pause (by pace)" cuts, simulate the fit offline from the report's pauses (tools/voicesync.js planSync) instead of guessing `rec:` times.
- Voice sync issue? Ask for `<topic>/voice-report.md`, then add `rec:'m:ss.s'` to the wrong shot. Don't re-render or screenshot to debug sync.

## Credit saving (important)
- One new chat session per video. Long sessions resend all history and cost much more.
- Rendering, preview and voice report all run free on the Mac (`make-video.command`, `preview.command`). Never ask for screenshots the owner can see himself in `preview.command`.
- Read `engine/API.md` + the topic's `story.js` only. Don't open engine source unless changing the engine.

## Cheap workflow (follow it)
1. For a new script, store it verbatim, then build `story.js`, then `node tools/build.js <topic>`.
2. Check frames once: use a Playwright `browser_run_code_unsafe` script that loads `index.html` via `setContent`, sets `?render=1`, calls `__ENGINE.seek(t)`, takes screenshots, and puts them on ONE contact sheet. Read only the contact sheet, not every frame. Scripts must live in `.kiro/artifacts/screenshots/`. Never print huge tool output.
3. Fix only real problems, rebuild, commit, push, open the PR, and send a short summary.
4. When editing an existing video, change only the shots the user names, and don't recapture shots that didn't change.

## Animation pack (done, see README "Animation pack")
Depth layers + parallax, keyframed camera / face close-ups, head turns + secondary motion + gestures, mood per emotion, cinematic transitions, hook text. **No intro sting or end card: the owner removed them, so never set `intro` or `outro`.** Use them in new stories (options are listed in `engine/API.md`). `chandra-27-wives-short-form/` is the reference.

## Planned next work
- Voice clean-up is DONE in `render.js` (on by default; `--raw` skips it; `--denoise N`). User records with a Boya BY-M1. Background music is DONE too: `tools/make-music.js` makes original loops (`music/calm|dark|bright.wav`, git-ignored, made on demand); choose with `music:` in story.js; render.js loops, fades and ducks it. Also DONE: calligraphy verses (`calli`), quiet automatic SFX (`tools/sfx.js`), voice-pace sync (`tools/voicesync.js`: best-fit of shot changes to real pauses, captions follow real speech; `tools/voice-report.js` writes `<topic>/voice-report.md`; fix a wrong shot with `rec:'m:ss.s'`), mood-driven music level. **Owner dislikes any intro: never use `opening`, `intro`, `outro` or `hook` (no big slam-in title text; the story starts at once).** Music/SFX must stay soft and soothing, never horror-like. Still to do: automatic SFX; voice-driven mouth.
