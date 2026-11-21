#!/usr/bin/env python3
"""
Creates public/voiceover.mp3 and public/ambient-bed.mp3 so the Remotion render never fails on missing audio.

 * If you already put your own files in public/, they are KEPT (set FORCE_AUDIO=1 to regenerate).
 * Voiceover: natural neural voice (edge-tts) per scene, placed on the timeline using src/timing.json,
   each clip speed-fitted to its scene. Fallbacks: gTTS, then silence for that scene.
 * Ambient bed: original, royalty-free, synthesised here (soft pad + plucks), seamless, ~2 min+.
Requires: python3, numpy, ffmpeg, edge-tts (pip install numpy edge-tts gTTS)
"""
import asyncio
import json
import os
import subprocess
import sys
import time
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
WORK = ROOT / ".audio_work"
PUBLIC.mkdir(exist_ok=True)
WORK.mkdir(exist_ok=True)
SR = 44100
FORCE = os.environ.get("FORCE_AUDIO") == "1"
DRY = os.environ.get("DRY_RUN") == "1"
RATE = os.environ.get("TTS_RATE", "+0%")
VOICES = os.environ.get(
    "TTS_VOICE",
    "en-US-AvaMultilingualNeural,en-US-AndrewMultilingualNeural,en-US-EmmaMultilingualNeural,"
    "en-US-AvaNeural,en-US-AndrewNeural,en-GB-SoniaNeural").split(",")
LEAD = 0.8     # seconds after scene start before speech begins (scene is fading in)
TAIL = 1.0     # seconds kept free at the end of a scene (scene is fading out)

timing = json.loads((ROOT / "src" / "timing.json").read_text(encoding="utf-8"))
FPS, TRANS, SCENES = timing["fps"], timing["transition"], timing["scenes"]
TOTAL_FRAMES = sum(s["frames"] for s in SCENES) - (len(SCENES) - 1) * TRANS
TOTAL = TOTAL_FRAMES / FPS


def write_wav(path, data, channels=1):
    pcm = (np.clip(data, -1, 1) * 32767).astype("<i2")
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(pcm.tobytes())


def to_mp3(wav, mp3):
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(wav), "-codec:a", "libmp3lame",
                    "-q:a", "2", str(mp3)], check=True)


def decode(path, tempo=1.0):
    af = ["-filter:a", f"atempo={tempo:.4f}"] if abs(tempo - 1) > 0.01 else []
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path)] + af +
                         ["-f", "s16le", "-ac", "1", "-ar", str(SR), "-"],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768


async def _edge(text, voice, path):
    import edge_tts
    await edge_tts.Communicate(text, voice, rate=RATE).save(str(path))


def synth(scene):
    """Returns path to a speech file or None."""
    if DRY:
        return None
    out = WORK / f"{scene['id']}.mp3"
    for _ in range(3):
        for v in VOICES:
            try:
                if out.exists():
                    out.unlink()
                asyncio.run(_edge(scene["text"], v.strip(), out))
                if out.exists() and out.stat().st_size > 2000:
                    print(f"  voice {v.strip()} ok")
                    return out
            except Exception as e:
                print(f"  voice {v.strip()} failed: {e}")
        time.sleep(2)
    try:
        from gtts import gTTS
        gTTS(scene["text"], lang="en", tld="co.uk").save(str(out))
        if out.exists() and out.stat().st_size > 2000:
            print("  fallback voice (gTTS) ok")
            return out
    except Exception as e:
        print(f"  gTTS failed: {e}")
    print(f"::warning::No voice for scene {scene['id']}; that scene will be silent.")
    return None


def build_voiceover():
    target = PUBLIC / "voiceover.mp3"
    if target.exists() and not FORCE:
        print("voiceover.mp3 already exists - keeping it (FORCE_AUDIO=1 to regenerate)")
        return
    n = int((TOTAL + 1) * SR)
    track = np.zeros(n, np.float32)
    start = 0.0
    for i, s in enumerate(SCENES):
        dur = s["frames"] / FPS
        slot = dur - LEAD - (0.5 if i == len(SCENES) - 1 else TAIL)
        print(f"scene {s['id']} (slot {slot:.1f}s)")
        f = synth(s)
        if f is not None:
            a = decode(f)
            if len(a) / SR > slot:  # too long for its scene: speed up a little (max x1.25)
                tempo = min(1.25, (len(a) / SR) / slot)
                a = decode(f, tempo)
                print(f"  fitted with tempo x{tempo:.2f}")
            if len(a) / SR > slot:  # still too long: trim with fade
                a = a[: int(slot * SR)].copy()
                fade = int(0.4 * SR)
                a[-fade:] *= np.linspace(1, 0, fade)
                print("::warning::Narration for scene %s was trimmed; shorten its text in src/timing.json." % s["id"])
            rms = float(np.sqrt(np.mean(a ** 2))) + 1e-9
            a = np.tanh(a * (0.10 / rms) * 1.2) / 1.2
            p = int((start + LEAD) * SR)
            track[p:p + len(a)] += a[: max(0, n - p)]
        start += dur - TRANS / FPS
    wav = WORK / "voice.wav"
    write_wav(wav, track)
    to_mp3(wav, target)
    print(f"wrote {target}")


def make_music(total):
    n = int((total + 1) * SR)
    beat = 60 / 92
    bar = 4 * beat
    f = lambda m: 440 * 2 ** ((m - 69) / 12)
    chords = [[60, 64, 67, 72], [55, 59, 62, 67], [57, 60, 64, 69], [53, 57, 60, 65]]
    music = np.zeros(n, np.float32)
    for b in range(int(total / bar) + 2):
        ch = chords[b % 4]
        s = int(b * bar * SR)
        m = min(n - s, int((bar + 0.9) * SR))
        if m <= 0:
            break
        tt = np.arange(m) / SR
        env = np.clip(tt / 0.7, 0, 1) * np.clip((bar + 0.9 - tt) / 0.9, 0, 1)
        pad = np.zeros(m, np.float32)
        for note in ch[:3]:
            for det in (0.997, 1.0, 1.003):
                pad += np.sin(2 * np.pi * f(note) * det * tt).astype(np.float32) * 0.045
        bass = (np.sin(2 * np.pi * f(ch[0] - 24) * tt) * 0.16).astype(np.float32)
        music[s:s + m] += (pad + bass) * env.astype(np.float32)
        build = 0.55 + 0.45 * min(1, (b * bar) / max(total, 1))
        for k, idx in enumerate([0, 1, 2, 3, 2, 1, 2, 3]):
            ps = s + int(k * beat / 2 * SR)
            pl = min(n - ps, int(1.1 * SR))
            if pl <= 0:
                continue
            pt = np.arange(pl) / SR
            fr = f(ch[idx] + 12)
            pluck = (np.sin(2 * np.pi * fr * pt) + 0.3 * np.sin(2 * np.pi * 2 * fr * pt)) * np.exp(-pt * 5.5)
            pluck *= np.clip(pt / 0.004, 0, 1)
            music[ps:ps + pl] += (pluck * 0.07 * build).astype(np.float32)
    rng = np.random.default_rng(7)
    irn = int(1.6 * SR)
    ir = rng.normal(0, 1, irn) * np.exp(-np.arange(irn) / SR / 0.45)
    ir /= np.sqrt((ir ** 2).sum())
    nfft = 1 << int(np.ceil(np.log2(n + irn)))
    wet = np.fft.irfft(np.fft.rfft(music, nfft) * np.fft.rfft(ir, nfft), nfft)[:n].astype(np.float32)
    music = music * 0.7 + wet * 0.45
    music *= np.clip(np.arange(n) / SR / 2.0, 0, 1)
    music *= np.clip((n - np.arange(n)) / SR / 3.0, 0, 1)
    return music / (np.abs(music).max() + 1e-9) * 0.9


def build_ambient():
    target = PUBLIC / "ambient-bed.mp3"
    if target.exists() and not FORCE:
        print("ambient-bed.mp3 already exists - keeping it")
        return
    wav = WORK / "ambient.wav"
    write_wav(wav, make_music(TOTAL + 2))
    to_mp3(wav, target)
    print(f"wrote {target}")


if __name__ == "__main__":
    try:
        build_ambient()
        build_voiceover()
    except Exception as e:  # last-resort: never leave the render without audio files
        print(f"::warning::Audio generation error ({e}); writing silent placeholders.")
        for name in ("voiceover.mp3", "ambient-bed.mp3"):
            p = PUBLIC / name
            if not p.exists():
                write_wav(WORK / "silence.wav", np.zeros(int((TOTAL + 2) * SR), np.float32))
                to_mp3(WORK / "silence.wav", p)
    for name in ("voiceover.mp3", "ambient-bed.mp3"):
        if not (PUBLIC / name).exists():
            sys.exit(f"{name} missing")
