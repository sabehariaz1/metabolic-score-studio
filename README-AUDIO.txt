Audio files used by the render (both are auto-generated if missing, see scripts/make_audio.py):

  voiceover.mp3     narration, aligned to the scene timeline in src/timing.json
  ambient-bed.mp3   quiet background music (played at volume 0.11)

To use your OWN recording: replace public/voiceover.mp3 with a file of the same name
(any length up to ~137 s, speech should start about 0.8 s into each scene).
Scene start times (seconds): 0, 8, 25, 44, 66, 90 (see src/timing.json: frames minus 30-frame overlaps).
