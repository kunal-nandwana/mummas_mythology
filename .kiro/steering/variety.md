---
inclusion: always
---
# Variety rules: every video must look different from the earlier ones

The owner noticed that new videos can look like old ones (same scenes, same villain look, same effects). Follow these in every new video session. Keep this cheap: do it as a short text plan, before writing any code.

1. **Read `engine/STAGING.md` first** (one small file). It lists the opening, villain, climax, palette and signature art of every finished video.
2. **Write a 6-line "difference plan" in chat before building** (the owner can answer yes/no): opening idea, villain/threat design, climax idea, place + palette, and one new signature visual. Each must differ from the rows in STAGING.md. Prefer the "Options not used yet" list there.
3. **Never copy helper art from another video's story.js** (giant shadow, glowing eyes, trishul thrust, impact rings, clock, buffalo, etc.). If a helper is truly general, move it into `engine/` and make it configurable; otherwise draw something new.
4. **Every new villain or major character gets a new design**: new silhouette (head type, horns / crown / hair), new colour family, new weapon. Never just recolour an old one. Add the preset to `engine/characters.js` and `engine/API.md`.
5. **Different structure of the first 3 seconds** from the last 3 videos (see STAGING.md). The start must be striking without hook text or an intro (owner rule): use a dramatic close-up, a reveal, strong colour and motion.
6. **Different climax staging** (not another weapon strike if the last one was a weapon strike). Use at least one new effect for it.
7. **Different camera language** where possible (e.g. crane-down, low angle, slow orbit, whip), and a different dominant colour palette from the previous video.
8. After the video is approved, **add a row to `engine/STAGING.md`** (same PR).

## Credit saving (owner asked for this)
- One chat per video. Fixes in one message with shot numbers. Plan in text first.
- Do NOT upgrade engine/characters inside a normal video session unless the video needs it; if needed, say so first. Prefer a separate "design" session for new characters.
- Write temp/work files inside the project (e.g. `.kiro/artifacts/`), never `/tmp` (it can be wiped mid-session).
- Don't read engine source or full old story.js files; use `engine/API.md`, `engine/STAGING.md`, and only the shots in question.
- One contact sheet per check, not many screenshot rounds.
