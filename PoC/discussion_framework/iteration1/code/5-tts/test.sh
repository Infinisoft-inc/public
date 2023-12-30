#!/bin/sh

# Save the response as a WAV file
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"text":"Im fine what about you? How can I help you today?"}' \
     http://127.0.0.1:5000/tts \
     --output speech.wav
