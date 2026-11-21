#!/usr/bin/env python3
"""
Builds the audio AND the timing for the video, so picture and voice always match.

  1. Each sentence in src/script.json is spoken separately (natural neural voice, slowed down).
  2. Sentence lengths decide how long each scene lasts and when each visual appears:
       -> writes src/audio-timing.json  (read by the Remotion project)
       -> writes web/chapters.json      (read by the web page's chapter buttons)
  3. public/voiceover.mp3 and public/ambient-bed.mp3 are created (never missing, never fails).

Env options: TTS_VOICE (comma list), TTS_RATE (default -12%), PAUSE (seconds between sentences, default 0.45),
             KEEP_VOICEOVER=1 / KEEP_AMBIENT=1 to keep files you supplied, DRY_RUN=1 (offline estimate).
Needs: python3, numpy, ffmpeg, edge-tts, gTTS (optional)
"""
import asyncio, json, math, os, subprocess, sys, time, wave
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
PUBLIC, WORK, WEB = ROOT / "public", ROOT / ".audio_work", ROOT / "web"
for d in (PUBLIC, WORK, WEB):
    d.mkdir(exist_ok=True)
SR, FPS, TRANS = 44100, 30, 30
RATE = os.environ.get("TTS_RATE", "-12%")
PAUSE = float(os.environ.get("PAUSE", "0.45"))
DRY = os.environ.get("DRY_RUN") == "1"
VOICES = os.environ.get(
    "TTS_VOICE",
    "en-US-AvaMultilingualNeural,en-US-AndrewMultilingualNeural,en-US-EmmaMultilingualNeural,"
    "en-US-AvaNeural,en-US-AndrewNeural,en-GB-SoniaNeural").split(",")
LEAD, TAIL, LAST_EXTRA, MIN_SCENE = 0.5, 1.4, 6.0, 7.0   # seconds (TAIL includes the 1 s transition)

scenes = json.loads((ROOT / "src" / "script.json").read_text(encoding="utf-8"))["scenes"]


def write_wav(path, data, ch=1):
    pcm = (np.clip(data, -1, 1) * 32767).astype("<i2")
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(ch); wf.setsampwidth(2); wf.setframerate(SR); wf.writeframes(pcm.tobytes())


def to_mp3(wav, mp3):
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(wav), "-codec:a", "libmp3lame", "-q:a", "2", str(mp3)], check=True)


def decode(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768


async def _edge(text, voice, path):
    import edge_tts
    await edge_tts.Communicate(text, voice, rate=RATE).save(str(path))


def speak(text, name):
    """Returns float32 mono audio at SR, or None if no voice could be produced."""
    if DRY:
        return None
    out = WORK / f"{name}.mp3"
    for _ in range(3):
        for v in VOICES:
            try:
                if out.exists(): out.unlink()
                asyncio.run(_edge(text, v.strip(), out))
                if out.exists() and out.stat().st_size > 1500:
                    return decode(out)
            except Exception as e:
                print(f"  voice {v.strip()} failed: {e}")
        time.sleep(2)
    try:
        from gtts import gTTS
        gTTS(text, lang="en", tld="co.uk").save(str(out))
        if out.exists() and out.stat().st_size > 1500:
            return decode(out)
    except Exception as e:
        print(f"  gTTS failed: {e}")
    return None


def estimate(text):          # reading-pace estimate used when no voice is available
    return np.zeros(int((len(text.split()) * 0.42 + 0.3) * SR), np.float32)


def make_music(total):
    n = int((total + 1) * SR); beat = 60 / 88; bar = 4 * beat
    f = lambda m: 440 * 2 ** ((m - 69) / 12)
    chords = [[60, 64, 67, 72], [55, 59, 62, 67], [57, 60, 64, 69], [53, 57, 60, 65]]
    music = np.zeros(n, np.float32)
    for b in range(int(total / bar) + 2):
        ch = chords[b % 4]; s = int(b * bar * SR); m = min(n - s, int((bar + 0.9) * SR))
        if m <= 0: break
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
            ps = s + int(k * beat / 2 * SR); pl = min(n - ps, int(1.1 * SR))
            if pl <= 0: continue
            pt = np.arange(pl) / SR; fr = f(ch[idx] + 12)
            pl_ = (np.sin(2 * np.pi * fr * pt) + 0.3 * np.sin(2 * np.pi * 2 * fr * pt)) * np.exp(-pt * 5.5)
            pl_ *= np.clip(pt / 0.004, 0, 1)
            music[ps:ps + pl] += (pl_ * 0.07 * build).astype(np.float32)
    rng = np.random.default_rng(7); irn = int(1.6 * SR)
    ir = rng.normal(0, 1, irn) * np.exp(-np.arange(irn) / SR / 0.45); ir /= np.sqrt((ir ** 2).sum())
    nfft = 1 << int(np.ceil(np.log2(n + irn)))
    wet = np.fft.irfft(np.fft.rfft(music, nfft) * np.fft.rfft(ir, nfft), nfft)[:n].astype(np.float32)
    music = music * 0.7 + wet * 0.45
    music *= np.clip(np.arange(n) / SR / 2.0, 0, 1)
    music *= np.clip((n - np.arange(n)) / SR / 3.0, 0, 1)
    return music / (np.abs(music).max() + 1e-9) * 0.9


def main():
    # ---- 1. speak every sentence, measure it
    clips = []   # per scene: list of audio arrays
    for si, sc in enumerate(scenes):
        print(f"scene {sc['id']}")
        row = []
        for k, text in enumerate(sc["sentences"]):
            a = speak(text, f"{sc['id']}_{k}")
            if a is None:
                if not DRY:
                    print(f"::warning::No voice for '{text[:40]}...'; using reading-pace silence.")
                a = estimate(text)
            else:
                rms = float(np.sqrt(np.mean(a ** 2))) + 1e-9
                a = np.tanh(a * (0.10 / rms) * 1.2) / 1.2
            row.append(a)
        clips.append(row)

    # ---- 2. lay out each scene on its own clock
    layout, g = [], 0.0            # g = global start (seconds) of the scene
    for si, (sc, row) in enumerate(zip(scenes, clips)):
        t, starts, ends = LEAD, [], []
        for a in row:
            starts.append(t); t += len(a) / SR; ends.append(t); t += PAUSE
        dur = max(MIN_SCENE, ends[-1] + TAIL + (LAST_EXTRA if si == len(scenes) - 1 else 0))
        frames = int(math.ceil(dur * FPS))
        layout.append({"id": sc["id"], "title": sc["title"], "frames": frames, "global": g,
                       "starts": [int(round(x * FPS)) for x in starts],
                       "ends": [int(round(x * FPS)) for x in ends], "t_starts": starts})
        g += (frames - TRANS) / FPS
    total_frames = sum(l["frames"] for l in layout) - (len(layout) - 1) * TRANS
    total = total_frames / FPS
    print(f"Video length: {total:.1f}s ({int(total // 60)}:{int(total % 60):02d}), {total_frames} frames")

    # ---- 3. write timing files
    (ROOT / "src" / "audio-timing.json").write_text(json.dumps(
        {"fps": FPS, "transition": TRANS, "scenes": [{k: l[k] for k in ("id", "frames", "starts", "ends")} for l in layout]},
        indent=1), encoding="utf-8")
    (WEB / "chapters.json").write_text(json.dumps(
        [{"id": l["id"], "title": l["title"], "start": round(l["global"], 1)} for l in layout], indent=1), encoding="utf-8")

    # ---- 4. audio files
    if DRY:
        return
    if os.environ.get("KEEP_VOICEOVER") != "1" or not (PUBLIC / "voiceover.mp3").exists():
        n = int((total + 1) * SR); track = np.zeros(n, np.float32)
        for l, row in zip(layout, clips):
            for a, s in zip(row, l["t_starts"]):
                p = int((l["global"] + s) * SR)
                track[p:p + len(a)] += a[:max(0, n - p)]
        write_wav(WORK / "voice.wav", track); to_mp3(WORK / "voice.wav", PUBLIC / "voiceover.mp3")
        print("wrote public/voiceover.mp3")
    if os.environ.get("KEEP_AMBIENT") != "1" or not (PUBLIC / "ambient-bed.mp3").exists():
        write_wav(WORK / "amb.wav", make_music(total + 2)); to_mp3(WORK / "amb.wav", PUBLIC / "ambient-bed.mp3")
        print("wrote public/ambient-bed.mp3")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"::warning::Audio step error ({e}); writing silent placeholders.")
        t = json.loads((ROOT / "src" / "audio-timing.json").read_text())
        total = (sum(s["frames"] for s in t["scenes"]) - (len(t["scenes"]) - 1) * TRANS) / FPS if t else 200
        for name in ("voiceover.mp3", "ambient-bed.mp3"):
            if not (PUBLIC / name).exists():
                write_wav(WORK / "sil.wav", np.zeros(int((total + 2) * SR), np.float32)); to_mp3(WORK / "sil.wav", PUBLIC / name)
