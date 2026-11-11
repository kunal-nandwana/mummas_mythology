#!/bin/bash
# Double-click to make an MP4: gets the latest videos from GitHub, asks which one, renders it with your voice.
cd "$(dirname "$0")"
[ -x /opt/homebrew/bin/brew ] && eval "$(/opt/homebrew/bin/brew shellenv)"
echo "=== Mumma's Mythology: make a video ==="
git pull --quiet 2>/dev/null && echo "✓ Got the latest videos from GitHub"
topics=( $(ls -d *-short-form *-long-form 2>/dev/null | grep -v style-test) )
echo ""
for i in "${!topics[@]}"; do echo "  $((i+1)). ${topics[$i]}"; done
echo ""
read -p "Which video? Type the number and press Enter: " n
t="${topics[$((n-1))]}"
[ -z "$t" ] && { echo "Not a valid number."; read -n 1 -s; exit 1; }
echo ""
echo "Put your voice recording in the folder:  $t/   (name it voice.m4a)"
read -p "Press Enter when ready..."
node tools/build.js "$t" && node tools/render.js "$t"
echo ""
open "$t"
read -n 1 -s -r -p "Done. The MP4 is in the folder that just opened. Press any key to close."
