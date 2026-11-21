#!/bin/bash
# Double-click to SET THE TIMING WITH YOUR EARS (free, no Kiro credits): your recording plays with the script on screen,
# press SPACE each time you hear the next line begin. Then run make-video.command: the video follows your taps.
cd "$(dirname "$0")"
[ -x /opt/homebrew/bin/brew ] && eval "$(/opt/homebrew/bin/brew shellenv)"
echo "=== Mumma's Mythology: tap sync ==="
git pull --quiet 2>/dev/null && echo "✓ Got the latest videos from GitHub"
topics=( $(ls -d *-short-form *-long-form 2>/dev/null | grep -v style-test) )
echo ""
for i in "${!topics[@]}"; do echo "  $((i+1)). ${topics[$i]}"; done
echo ""
read -p "Which video? Type the number and press Enter: " n
t="${topics[$((n-1))]}"
[ -z "$t" ] && { echo "Not a valid number."; read -n 1 -s; exit 1; }
echo "Chrome opens now. SPACE = next line starts · BACKSPACE = undo · P = pause."
echo "When you are done, close the Chrome tab and press Ctrl+C here (your taps are already saved)."
node tools/tap-sync.js "$t"
