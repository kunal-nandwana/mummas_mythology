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

## Cheap workflow (follow it)
1. For a new script, store it verbatim, then build `story.js`, then `node tools/build.js <topic>`.
2. Check frames once: use a Playwright `browser_run_code_unsafe` script that loads `index.html` via `setContent`, sets `?render=1`, calls `__ENGINE.seek(t)`, takes screenshots, and puts them on ONE contact sheet. Read only the contact sheet, not every frame. Scripts must live in `.kiro/artifacts/screenshots/`. Never print huge tool output.
3. Fix only real problems, rebuild, commit, push, open the PR, and send a short summary.
4. When editing an existing video, change only the shots the user names, and don't recapture shots that didn't change.

## Animation pack (done, see README "Animation pack")
Depth layers + parallax, keyframed camera / face close-ups, head turns + secondary motion + gestures, mood per emotion, cinematic transitions, hook text, intro sting (`intro`) and end card (`outro`). Use them in new stories (options are listed in `engine/API.md`). `chandra-27-wives-short-form/` is the reference.

## Planned next work
- Voice clean-up is DONE in `render.js` (on by default; `--raw` skips it; `--denoise N`). User records with a Boya BY-M1. Background music is DONE too: `tools/make-music.js` makes original loops (`music/calm|dark|bright.wav`, git-ignored, made on demand); choose with `music:` in story.js; render.js loops, fades and ducks it. Still to do: sync shots to the real voice using pauses; background music from `music/` with ducking; automatic SFX; voice-driven mouth.
