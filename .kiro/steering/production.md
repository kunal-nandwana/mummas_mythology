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
- Shlokas/verses: always put them in their own shot with `calli` (that makes the voice sync treat them as chanting and makes the calligraphy follow the chanting). Do NOT add `chant:` or `dur:` to verse shots by default: the chant speed is learned from the recording (`alignWithChant` in voicesync.js; Parshuram Nov 2026: fixed 1.7x was wrong, he chants ~1.3x, and every cut after the first shloka was 1-2 shots late). A fixed `chant:N` turns the learning off for that shot (only for an older video already tuned that way).
- **Speech clock (DONE, Nov 2026, engine default):** story.js times inside a shot (acts, cam keys, pop/draw delays, chainW/avatarMontage steps, sfx, focus.at) are planned seconds; with a recording `speechClock` (timing.js) maps them onto his real speech, so a reveal lands on its word. If he says "picture lags inside a scene" (diagram/actions late, cut itself fine), this is the mechanism: check the shot's step/delay against the word positions at the plan pace, and that nothing is timed past the planned shot length. Don't "fix" it by shortening delays per video.
- Sanity check for verse timing: chanting leaves a dense cluster of short pauses (one every ~1 s). The verse shot should sit on that cluster in the report's pause list.
- Voice sync is **sentence-aligned** (DONE, Nov 2026, `tools/voicesync.js` alignSentences): every pause is matched to a sentence/clause end in the script or treated as a breath, picking the steadiest pace; cuts without their own pause are placed by that pace. This fixed the Mahakal drift (shots 4-14 early) with zero `rec:` pins. Don't add `rec:` pins pre-emptively; they are tied to one recording and break if he re-records.
- Voice sync issue? Ask for `<topic>/voice-report.md` and solve it in ONE pass, offline: rebuild the report's pause list in a script, run planSync with `words`, check the pace per shot. Fix the cause in the tool (engine default) if it is general; only use `rec:'m:ss.s'` for a single genuinely odd shot. After any voicesync change run `node tools/test-voicesync.js` (real Mahakal + Parshuram regression cases) and `node tools/voicesync.js`. Check that the report's long pauses (0.4 s+) land on sentence ends: a long pause called a breath next to a sentence end is the sign of drift. Don't re-render or screenshot to debug sync.

- **Sync complaint = tap sync, not another guessing round (Nov 2026).** Pause/syllable estimates are only ±1 s and the owner hears ~1 s lags; three Parshuram rounds of rec: pins did not satisfy him. Tell him to double-click `tap-sync.command` (free, his ears set every cut, saved to `<topic>/voice-taps.json`, used by render automatically). Only pin `rec:` yourself if he names one exact shot and time. If voice-taps.json is committed, read it before touching timing.
- **Owner uploads his recording to the repo first (from Nov 2026).** When the audio file is in the repo, check sync against the real voice, not only the report: the sandbox has no ffmpeg and no internet (no Whisper), but Chromium decodes MP3 (`AudioContext.decodeAudioData` in a Playwright page, 16 kHz mono). Count syllable peaks (speech-band energy, smoothed ±50 ms, peaks ≥2 dB prominent) and compare with the script's syllables between two pauses everyone agrees on: each pause then lands on a word, which settles "which pause is this sentence end". Peaks per syllable drift slowly through a recording (Parshuram 0.66 → 0.81), so only compare inside one 40-80 s stretch. Parshuram Nov 2026: this found shots 55-56 and 79-84 1.2-2.4 s late (picture behind voice), fixed with `rec:` pins measured this way. A global syllable term inside voicesync was tried and was NOT reliable yet; don't re-add it without a regression case.
- **Chapter names** in long videos: never a separate chapter screen. Use `chapterTag` on the chapter's first shot (see API.md). Characters PARSHURAM / BRAHMA / VISHNU were redesigned (Nov 2026): reuse them, don't redraw them per video.

- **New videos run the front-facing rig by default (owner request, Nov 2026).** `VIDEO({rig:'front'})` is implied; every older story.js carries `rig:'side'` (never remove it, it keeps those videos unchanged). Use `facing:'side'` on a cast entry only for a shot that really needs profile action (bow draw, profile walk). The front rig (`engine/frontrig.js`, owner-approved look: bare chest + sash, dhoti, gold jewellery, tiered crowns, extra arms/heads, hand props) maps the common pose names to face-on versions. Reuse the costume presets, don't redraw them per video. Details in `engine/API.md`. Feet stand at `y`.

## Credit saving (important)
- One new chat session per video. Long sessions resend all history and cost much more.
- Rendering, preview and voice report all run free on the Mac (`make-video.command`, `preview.command`). Never ask for screenshots the owner can see himself in `preview.command`.
- Read `engine/API.md` + the topic's `story.js` only. Don't open engine source unless changing the engine.

## Cheap workflow (follow it)
1. For a new script, store it verbatim, then build `story.js`, then `node tools/build.js <topic>`, then **`node tools/check.js <topic>`** (free: finds unknown poses/characters, broken art, words that differ from `my-script.md`, bad timing). Fix every ✗ before showing the user anything.
   If the user fills in `tools/story-brief-template.md`, follow it. The user can make a one-picture review sheet on the Mac with `node tools/contact-sheet.js <topic>` (writes `<topic>/preview/contact-sheet.png`).
2. Check frames once: use a Playwright `browser_run_code_unsafe` script that loads `index.html` via `setContent`, sets `?render=1`, calls `__ENGINE.seek(t)`, takes screenshots, and puts them on ONE contact sheet. Read only the contact sheet, not every frame. Scripts must live in `.kiro/artifacts/screenshots/`. Never print huge tool output.
3. Fix only real problems, rebuild, commit, push, open the PR, and send a short summary.
4. When editing an existing video, change only the shots the user names, and don't recapture shots that didn't change.

## Animation pack (done, see README "Animation pack")
Depth layers + parallax, keyframed camera / face close-ups, head turns + secondary motion + gestures, mood per emotion, cinematic transitions, hook text. **No intro sting or end card: the owner removed them, so never set `intro` or `outro`.** Use them in new stories (options are listed in `engine/API.md`). `chandra-27-wives-short-form/` is the reference.

## Planned next work
- Voice clean-up is DONE in `render.js` (on by default; `--raw` skips it; `--denoise N`). User records with a Boya BY-M1. Background music is DONE too: `tools/make-music.js` makes original loops (`music/calm|dark|bright.wav`, git-ignored, made on demand); choose with `music:` in story.js; render.js loops, fades and ducks it. Also DONE: calligraphy verses (`calli`), quiet automatic SFX (`tools/sfx.js`), voice-pace sync (`tools/voicesync.js`: best-fit of shot changes to real pauses, captions follow real speech; `tools/voice-report.js` writes `<topic>/voice-report.md`; fix a wrong shot with `rec:'m:ss.s'`), mood-driven music level. **Owner dislikes any intro: never use `opening`, `intro`, `outro` or `hook` (no big slam-in title text; the story starts at once).** Music/SFX must stay soft and soothing, never horror-like. Still to do: automatic SFX; voice-driven mouth.
