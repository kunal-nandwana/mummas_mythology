# Mumma's Mythology

Animated Hindi mythology videos for YouTube: Shorts (9:16) and long-form (16:9). Every frame is drawn in code (HTML/SVG/JS). We don't use other creators' artwork.

## Structure

```
videos/
  barbarik-v2/        2-minute Barbarik / Khatu Shyam Short, miniature style (current)
    index.html        open in Chrome: plays with Hindi captions
    barbarik-v2.webm  preview recording (540×960, no text/audio)
    preview/          one frame per shot (25 shots)
  barbarik-v1/        first flat-style version (about 100s)
experiments/
  style-test/         miniature + dramatic-glow style test (16:9 and 9:16)
```

## Viewing

- Open any `index.html` in Chrome. Add `?shot=N` to jump to one shot, `?notext=1` to hide captions, or `?clean=1` to hide the controls.
- `.webm` files play in Chrome or VLC, not QuickTime.

## Roadmap

1. **Engine:** reusable `characters/`, `scenes/`, `motion/` libraries (jointed limbs, expressions, blinking, better animation).
2. **Mac renderer:** Playwright + ffmpeg + Whisper → 1080×1920 / 1920×1080 MP4 with Hindi captions timed to the voiceover.
3. **Per video:** a small story file in `videos/<name>/` + `voice.m4a` → `node render.js <name> voice.m4a`.
