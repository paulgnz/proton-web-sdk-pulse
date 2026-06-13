#!/usr/bin/env bash
# Serve the Pulse Edition demo over http (the pulsevm:// callback needs a real origin).
# Build the SDK first:  (cd ../.. && pnpm build)
set -e
cd "$(dirname "$0")"
echo "▶ http://localhost:8088   (Ctrl-C to stop)"
python3 -m http.server 8088
