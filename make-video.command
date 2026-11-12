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
# Is there already a voice file in the video folder?
has_voice() { shopt -s nocasematch; for f in "$t"/*; do case "$f" in *.m4a|*.mp3|*.wav|*.aac|*.ogg|*.opus|*.flac|*.aif|*.aiff|*.caf|*.qta|*.mov|*.3gp|*.amr|*.wma) shopt -u nocasematch; return 0;; esac; done; shopt -u nocasematch; return 1; }
if ! has_voice; then
  # look for a recent recording in Downloads / Desktop / Documents / Voice Memos (last 3 days)
  found=(); while IFS= read -r line; do [ -n "$line" ] && found+=("$line"); done < <(find ~/Downloads ~/Desktop ~/Documents "$HOME/Library/Group Containers/group.com.apple.VoiceMemos.shared/Recordings" -maxdepth 2 -type f \( -iname '*.m4a' -o -iname '*.mp3' -o -iname '*.wav' -o -iname '*.qta' -o -iname '*.aac' -o -iname '*.caf' \) -mtime -3 2>/dev/null | head -8)   # (macOS bash 3.2 has no mapfile)
  if [ ${#found[@]} -gt 0 ]; then
    echo "I found these recent recordings on your Mac:"
    for i in "${!found[@]}"; do echo "  $((i+1)). $(basename "${found[$i]}")"; done
    read -p "Type a number to use it, or just press Enter to skip: " v
    if [ -n "$v" ] && [ -n "${found[$((v-1))]}" ]; then ext="${found[$((v-1))]##*.}"; cp "${found[$((v-1))]}" "$t/voice.$ext" && echo "✓ Copied to $t/voice.$ext"; fi
  fi
fi
if ! has_voice; then
  echo ""
  echo "No voice file yet. To use your voice, put it in the folder  $t/  (any m4a, mp3, wav, qta file works)."
  read -p "Press Enter when ready (or just Enter to make the video without voice)..."
fi
node tools/build.js "$t" && node tools/render.js "$t"
echo ""
open "$t"
read -n 1 -s -r -p "Done. The MP4 is in the folder that just opened. Press any key to close."
