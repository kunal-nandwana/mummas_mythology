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
```

Each video is one short file, `<topic>-short-form/story.js`. It lists the shots: the Hindi line, the background, the characters and their poses, and the camera. See `engine-test-short-form/story.js` for an example.

### Making one video, step by step

1. **Story.** Start a new Kiro session. Say: "Make `<topic>-short-form`, about N seconds, story: ...". Kiro writes `story.js` with a Hindi line for every shot.
2. **Build.** Run `node tools/build.js <topic>-short-form`. This writes `index.html` (the video) and `script.md` (your recording script).
3. **Check.** Open `index.html` in Chrome. If something is wrong, send all the fixes in **one** message, using shot numbers (for example: "shot 4: Krishna should smile; shot 6 needs 1 more second").
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
- **Hook text:** `hook:{at,hold,words:[{text,size,y,delay,count:[from,to]}]}` slams in during the first 2 seconds.
- **Channel sting and end card:** `intro:1.0` and `outro:3.6`. The intro makes every shot start 1 s later; the renderer lines your voice up for you.

URL options: `?shot=N` (jump to a shot), `?notext=1` (hide captions), `?clean=1` (hide buttons), `?prompter=1` (recording mode).

## On your Mac

**One-time setup (about 10 minutes):**
1. Open Terminal and run `git clone https://github.com/kunal-nandwana/mummas_mythology.git` (this makes a `mummas_mythology` folder in your home folder).
2. In Finder, open that folder and double-click **`setup-mac.command`**. If macOS blocks it, right-click it → **Open** → **Open**. It installs Node.js, ffmpeg and the renderer.

**For every video:** double-click **`make-video.command`**. It gets the latest videos from GitHub, asks which video, and makes the MP4 (about 3–6 minutes on an M1).

Manual commands, if you prefer: `node tools/build.js <topic>` and `node tools/render.js <topic> [--voice file.m4a] [--offset 0.3]`.
