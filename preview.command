#!/bin/bash
# Double-click to WATCH a video instantly in Chrome (no rendering, no Kiro credits). Also opens the recording prompter.
cd "$(dirname "$0")"
[ -x /opt/homebrew/bin/brew ] && eval "$(/opt/homebrew/bin/brew shellenv)"
echo "=== Mumma's Mythology: preview ==="
git pull --quiet 2>/dev/null && echo "✓ Got the latest videos from GitHub"
topics=( $(ls -d *-short-form *-long-form 2>/dev/null | grep -v style-test) )
echo ""
for i in "${!topics[@]}"; do echo "  $((i+1)). ${topics[$i]}"; done
echo ""
read -p "Which video? Type the number and press Enter: " n
t="${topics[$((n-1))]}"
[ -z "$t" ] && { echo "Not a valid number."; read -n 1 -s; exit 1; }
node tools/build.js "$t" || { read -n 1 -s; exit 1; }
echo ""
echo "  1. Watch the video"
echo "  2. Record my voice with the prompter (shows each line as you read)"
read -p "Type 1 or 2 and press Enter: " m
f="$PWD/$t/index.html"; [ "$m" = "2" ] && f="$f?prompter=1"
if [ -d "/Applications/Google Chrome.app" ]; then open -a "Google Chrome" "file://$f"; else open "file://$f"; fi
echo "✓ Opened in your browser. (The preview has no voice or music; make-video.command adds them.)"
read -n 1 -s -r -p "Press any key to close."
