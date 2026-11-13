# Background music

Put a calm music track in this folder (mp3 or m4a). Every video uses it automatically, quietly under your voice.
Files in this folder stay on your Mac only; they are not uploaded to GitHub.

## Where to get safe music (free, no copyright strikes)

1. Open **YouTube Studio** → **Audio library** (left menu).
2. Filter: **Mood** = Calm or Inspirational, **Genre** = Ambient or Cinematic. Searching "India", "flute" or "meditation" also works well.
3. Pick tracks with **"No attribution required"** (otherwise copy the credit line into your video description).
4. Download, and drop the file in this `music/` folder.

## Scene music (no download needed)

Set `music:'scenes'` in a story and every scene gets its own generated music from `scene-library/library.json` (this one file is saved in GitHub; the `.wav` listening copies are not).
Hear all of them: `node tools/scene-audio.js preview` → files appear in `music/scene-library/`.

## Several tracks

- The **first** file (alphabetical order) is the default for every video.
- To choose one for a video, tell Kiro e.g. "use the flute track for Chandra". Kiro adds `music:'flute'` to that story
  (any part of the file name works).
- `music:false` = no music for that video.

Loudness: the music dips gently while you speak and swells a little with each scene's mood. To change it, run
`node tools/render.js <video> --musicvol 0.8` (louder) or `--musicvol 0.3` (softer).
