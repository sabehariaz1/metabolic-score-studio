import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import type {SceneInfo} from '../timing';

export const P = {
  ink: '#12263F',
  mute: '#5B6F86',
  white: '#FFFFFF',
  teal: '#0FA3A3',
  tealL: '#D7F3F1',
  coral: '#F25C78',
  coralL: '#FFE1E7',
  sun: '#FFB400',
  sunL: '#FFF0C2',
  green: '#19B67A',
  greenL: '#D8F5E8',
  purple: '#6C5CE7',
  purpleL: '#E7E4FF',
  sky: '#3B9BFF',
  skyL: '#DCEBFF',
};

export const FONT = "'Lato', 'Open Sans', 'DejaVu Sans', Arial, sans-serif";

export const card: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: 32,
  boxShadow: '0 16px 44px rgba(18,38,63,0.13)',
  border: '2px solid rgba(18,38,63,0.05)',
  boxSizing: 'border-box',
};

/** 0 -> 1 with ease-out, starting at `start` for `dur` frames. */
export const prog = (frame: number, start: number, dur = 20): number =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

/** Soft overshoot "pop" 0 -> 1 (for stickers, badges, icons). */
export const pop = (frame: number, start: number, dur = 22): number =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.8)),
  });

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Start frame of sentence k (safe if k is out of range). */
export const at = (s: SceneInfo, k: number): number => s.starts[Math.min(k, s.starts.length - 1)] ?? 0;
export const endAt = (s: SceneInfo, k: number): number => s.ends[Math.min(k, s.ends.length - 1)] ?? 60;

// ------------------------------------------------------------------ background
const SHAPES = Array.from({length: 16}, (_, i) => ({
  x: (i * 337) % 1900,
  y: (i * 211) % 1000,
  r: 10 + (i % 5) * 7,
  sp: 0.15 + (i % 4) * 0.08,
  kind: i % 3,
}));

export const SceneBg: React.FC<{tint: string; tint2: string}> = ({tint, tint2}) => {
  const frame = useCurrentFrame();
  const colors = [tint2, tint, P.sunL];
  return (
    <AbsoluteFill style={{background: `linear-gradient(160deg, #FAFCFF 0%, ${tint} 140%)`}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(18,38,63,0.07) 2px, transparent 2.5px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          left: 1250 + Math.sin(frame / 120) * 60,
          top: -480 + Math.cos(frame / 140) * 40,
          background: `radial-gradient(circle, ${tint2} 0%, rgba(255,255,255,0) 68%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          left: -380 + Math.cos(frame / 130) * 50,
          top: 650 + Math.sin(frame / 110) * 40,
          background: `radial-gradient(circle, ${tint} 0%, rgba(255,255,255,0) 68%)`,
        }}
      />
      {SHAPES.map((s, i) => {
        const x = (s.x + frame * s.sp * 3) % 2000 - 40;
        const y = s.y + Math.sin(frame / 40 + i) * 22;
        const c = colors[i % 3];
        return s.kind === 0 ? (
          <div key={i} style={{position: 'absolute', left: x, top: y, width: s.r * 2, height: s.r * 2, borderRadius: '50%', background: c, opacity: 0.55}} />
        ) : s.kind === 1 ? (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: s.r * 1.6,
              height: s.r * 1.6,
              borderRadius: 8,
              background: c,
              opacity: 0.5,
              transform: `rotate(${frame * s.sp * 2}deg)`,
            }}
          />
        ) : (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: '50%',
              border: `5px solid ${c}`,
              opacity: 0.6,
              boxSizing: 'border-box',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const SceneTitle: React.FC<{kicker: string; title: string; color?: string}> = ({kicker, title, color = P.teal}) => {
  const frame = useCurrentFrame();
  const a = prog(frame, 4, 22);
  return (
    <div style={{position: 'absolute', left: 110, top: 52, opacity: a, transform: `translateY(${(1 - a) * 24}px)`}}>
      <div style={{color, fontSize: 25, fontWeight: 900, letterSpacing: 4}}>{kicker}</div>
      <div style={{color: P.ink, fontSize: 58, fontWeight: 900, marginTop: 4, lineHeight: 1.1}}>{title}</div>
    </div>
  );
};

// ------------------------------------------------------------------ captions (exactly what is being said)
const chunkText = (text: string, max = 74): string[] => {
  const words = text.split(' ');
  const total = text.length;
  const parts = Math.max(1, Math.ceil(total / max));
  const target = total / parts;
  const out: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (cur && next.length > target * 1.15 && out.length < parts - 1) {
      out.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) out.push(cur);
  return out;
};

export const Captions: React.FC<{scene: SceneInfo}> = ({scene}) => {
  const frame = useCurrentFrame();
  let text = '';
  let t0 = 0;
  for (let k = 0; k < scene.sentences.length; k++) {
    const s0 = scene.starts[k];
    const e0 = scene.ends[k] + 6;
    if (frame >= s0 - 2 && frame <= e0) {
      const chunks = chunkText(scene.sentences[k]);
      const len = scene.sentences[k].length;
      let acc = 0;
      for (const c of chunks) {
        const a = s0 + ((e0 - 6 - s0) * acc) / len;
        const b = s0 + ((e0 - 6 - s0) * (acc + c.length)) / len;
        if (frame >= a - 1 && (frame < b || c === chunks[chunks.length - 1])) {
          text = c;
          t0 = a;
          break;
        }
        acc += c.length + 1;
      }
      break;
    }
  }
  if (!text) return null;
  const a = prog(frame, t0 - 1, 6);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'center', opacity: a}}>
      <div
        style={{
          maxWidth: 1560,
          background: 'rgba(18,38,63,0.92)',
          color: '#fff',
          fontSize: 42,
          fontWeight: 700,
          lineHeight: 1.28,
          textAlign: 'center',
          padding: '16px 40px',
          borderRadius: 26,
        }}
      >
        {text}
      </div>
    </div>
  );
};
