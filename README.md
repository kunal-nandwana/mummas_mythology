# Mumma's Mythology

Animated Hindi mythology videos for YouTube. Every frame is drawn in code (HTML/SVG/JS). We don't use other creators' artwork.

## Folder naming

One folder per topic, named `<topic>-short-form` (9:16 Shorts) or `<topic>-long-form` (16:9 videos).

```
barbarik-short-form/         2-minute Barbarik / Khatu Shyam Short (miniature style)
  index.html                 open in Chrome: plays with Hindi captions
  barbarik-v2.webm           preview recording (540×960, no text/audio)
  preview/                   one frame per shot (25 shots)
  old-version/               first flat-style version
style-test-short-form/       style test, 9:16
style-test-long-form/        style test, 16:9
```

## Viewing

- Open any `index.html` in Chrome. Add `?shot=N` to jump to one shot, `?notext=1` to hide captions, or `?clean=1` to hide the controls.
- `.webm` files play in Chrome or VLC, not QuickTime.

## The engine (how new videos are made)

```
engine/            shared code for every video
  rig.js           jointed characters: poses, walking, blinking, talking mouth, props
  characters.js    costumes: BARBARIK, KRISHNA, ARJUNA, BHIMA, DEVI, SHIVA, RAMA, SITA, ...
  scenes.js        backgrounds: night sky, war field, hills, armies, divine light, ...
  timing.js        splits the video into shots from the Hindi text length
  core.js          player: camera moves, transitions, effects, word-by-word Hindi captions, prompter
  fonts/           Mukta + Tiro Devanagari Hindi (SIL Open Font License)
tools/build.js     turns <topic>/story.js into <topic>/index.html + <topic>/script.md
tools/check.js     instant checker for story.js (poses, characters, art, exact Hindi words, timing)
tools/contact-sheet.js  one picture with every shot, for a single review round
tools/story-brief-template.md  fill this in before starting a new story
```

Each video is one short file, `<topic>-short-form/story.js`. It lists the shots: the Hindi line, the background, the characters and their poses, and the camera. See `engine-test-short-form/story.js` for an example.

### Making one video, step by step

1. **Story.** Start a new Kiro session (fill in `tools/story-brief-template.md` first: it saves credits). Say: "Make `<topic>-short-form`, about N seconds, story: ...". Kiro writes `story.js` with a Hindi line for every shot.
2. **Build.** Run `node tools/build.js <topic>-short-form`. This writes `index.html` (the video) and `script.md` (your recording script).
3. **Check.** Run `node tools/check.js <topic>` (instant: finds typos, unknown poses, words that differ from your script) and `node tools/contact-sheet.js <topic>` (one picture of every shot, saved in `<topic>/preview/`). Then open `index.html` in Chrome. If something is wrong, send all the fixes in **one** message, using shot numbers (for example: "shot 4: Krishna should smile; shot 6 needs 1 more second").
4. **Record your voice.** Open `index.html?prompter=1`. Start your phone or Mac recorder, press **Start**, and after the 3-2-1 count read each line as it appears. `script.md` has the same lines with their timings.
5. **Render the MP4.** Save your recording as `voice.m4a` in the topic folder, then double-click `make-video.command`. It produces a 1080×1920 MP4 with your voice, and the silence before your first word is cut automatically.
6. **Upload** to YouTube.

### Animation pack (optional story.js features)

Old stories keep working. New options, shown in `chandra-27-wives-short-form/story.js`:

- **Depth layers:** give a shot `sky`, `far`, `mid`, `art`, `near` instead of one `art`. They move at different speeds when the camera moves (parallax), and soften when the camera zooms in close.
- **Camera keys and face close-ups:** `cam:{keys:[[t,x,y,zoom],[t,x,y,zoom,'snap']]}`. The head is at about `(x, y-268*s)` for a character at `x,y` with scale `s`. Use `capTop` to move captions clear of the face.
- **Acting:** poses `lookAway`, `lookBack` (head turns), `explain`, `plead`, `accuse`, `rage`, `recoil`, `weep`, `grief`, `hold`; `tears:true`. Earrings, pendants, garlands, veils, sashes, skirts, hair and capes swing by themselves, and talking characters nod and gesture.
- **Mood:** `mood:'calm'|'joy'|'hope'|'anger'|'sad'|'shock'|'divine'` sets the lighting, colour and rim light. Moods cross-fade between shots.
- **Transitions into a shot:** `tr:'fade'|'glow'|'whip'|'zoom'|'iris'|'wipe'|'flash'|'dip'|'cut'` (`trAt:[x,y]` sets the iris centre).
- **Look polish (on by default; `look:false` turns it off):** adds a rim light on characters, soft bokeh, floating motes and a warm diya glow (details in `engine/API.md`).
- **Hook text:** `hook:{at,hold,words:[{text,size,y,delay,count:[from,to]}]}` slams in during the first 2 seconds.
- **Channel sting and end card:** switched off on purpose (no "Mumma's Mythology" intro or end card). Videos start straight with the story.

URL options: `?shot=N` (jump to a shot), `?notext=1` (hide captions), `?clean=1` (hide buttons), `?prompter=1` (recording mode).

## On your Mac

**One-time setup (about 10 minutes):**
1. Open Terminal and run `git clone https://github.com/kunal-nandwana/mummas_mythology.git` (this makes a `mummas_mythology` folder in your home folder).
2. In Finder, open that folder and double-click **`setup-mac.command`**. If macOS blocks it, right-click it → **Open** → **Open**. It installs Node.js, ffmpeg and the renderer.

**To watch a video instantly** (no rendering): double-click **`preview.command`**. It can also open the recording prompter.

**Background music:** put a calm track from YouTube Studio's Audio library in the `music/` folder (see `music/README.md`). It is used for every video.

**For every video:** double-click **`make-video.command`**. It gets the latest videos from GitHub, asks which video, and makes the MP4 (about 3–6 minutes on an M1).

**Your voice is cleaned automatically** (made for the Boya M1): rumble and hiss removed, mouth clicks removed, warmer and clearer tone, harsh "s" softened, even volume, and loudness set to YouTube's level (-14 LUFS). To skip it add `--raw`; for a noisy room add `--denoise 18`.

**Scene music (new, `music:'scenes'`):** every scene has its own music from the **scene sound library** (`music/scene-library/library.json`, saved in GitHub). A new scene name gets its sound created and saved automatically, and the same scene type always sounds the same. Scenes cross-fade smoothly, there is a soft beep / two-note tune at every scene change (no whoosh), and key moments (`focus:` in a shot) get a dominant sound while the music steps back. Your voice stays on top: the music sits about 10-12 dB below it and dips further while you speak. Listen to the library: `node tools/scene-audio.js preview`.

**Background music:** your own track from the `music/` folder (see `music/README.md`). It fades in, dips gently while you speak, swells a little with each scene's mood and fades out at the end. Change it with `--music <part of file name>`, `--nomusic`, or `--musicvol 0.8` (louder) / `0.3` (softer). Generated tracks (`music:'calm'`, `'dark'`, `'bright'`) still exist but are not the default.

**Your pace, your pauses:** the renderer measures your recording, finds your pauses, and puts every picture change on the pause that fits the script best; the caption words follow your speech and wait while you pause (`--nosync` to turn off). After each video it writes **`<video>/voice-report.md`** (it opens by itself) showing where each shot starts in your recording; paste it into the Kiro chat if something is off. You can also make it alone: `node tools/voice-report.js <video>`. Tip: leave a short pause (about half a second) at the end of every line. Any recording works: m4a, mp3, wav, and Voice Memos `.qta`; `make-video.command` even finds a recent recording in Downloads/Desktop/Voice Memos for you. The music gets louder or softer with each scene's mood (`--flatmusic` = constant). Music is now gentle (v2: pentatonic bansuri + tanpura, no scary tones) and clearly audible under your voice (`--musicvol 0.5` default; 0.8 = louder, 0.3 = softer). Sound effects are quiet and soft (`--sfxvol 0.35`).

**More polish, all automatic:** Sanskrit verses written in calligraphy (`calli:` in a shot), and original sound effects (whoosh, boom, bell, shimmer, riser) at transitions and the hook. Turn the effects off with `--nosfx`, or change their loudness with `--sfxvol 0.5`. To hear each effect: `node tools/sfx.js` (it makes `music/sfx-preview/`).

Manual commands, if you prefer: `node tools/build.js <topic>` and `node tools/render.js <topic> [--voice file.m4a] [--offset 0.3]`.

**Scene-by-scene music (`music:'score'`):** instead of one looping track, `tools/make-score.js` composes original music that changes with every scene's mood (calm flute, joyful plucks, hopeful harp, divine bells, sad strings, a soft drum hit for shock, driving drums for anger), cross-fades between scenes and sets a different volume per scene. Add `music:'score'` to `story.js` (Chandra uses it). Per-scene volume override: `music:0.6` on a shot. Overall level: `--musicvol`.
