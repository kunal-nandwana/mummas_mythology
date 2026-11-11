#!/bin/bash
# One-time setup for making videos on your Mac. Double-click this file.
cd "$(dirname "$0")"
echo "=== Mumma's Mythology: one-time setup ==="
if ! command -v brew >/dev/null 2>&1; then
  echo "Installing Homebrew (it will ask for your Mac password)..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/opt/homebrew/bin/brew shellenv)"
  echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
fi
echo "Installing Node.js and ffmpeg..."
brew install node ffmpeg
echo "Installing the video renderer (Playwright + Chromium)..."
npm install && npx playwright install chromium
echo ""
echo "✓ Setup finished. From now on, double-click make-video.command to make an MP4."
read -n 1 -s -r -p "Press any key to close."
