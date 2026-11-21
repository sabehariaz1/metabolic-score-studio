import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

export const C = {
  bg1: '#07152B',
  bg2: '#0B3550',
  teal: '#2EC4B6',
  green: '#06D6A0',
  amber: '#FFB703',
  coral: '#EF476F',
  white: '#FFFFFF',
  ink: '#07152B',
  muted: '#9DB4CC',
  card: 'rgba(255,255,255,0.07)',
  line: 'rgba(255,255,255,0.12)',
};

export const FONT = "'DejaVu Sans', 'Helvetica Neue', Arial, sans-serif";

/** 0 -> 1 progress with ease-out, starting at `start` and lasting `dur` frames. */
export const prog = (frame: number, start: number, dur = 20): number =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `linear-gradient(135deg, ${C.bg1} 0%, ${C.bg2} 100%)`}}>
      <div
        style={{
          position: 'absolute',
          width: 1200,
          height: 1200,
          left: 1000 + Math.sin(frame / 150) * 70,
          top: -520 + Math.cos(frame / 180) * 50,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46,196,182,0.22) 0%, rgba(46,196,182,0) 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1100,
          height: 1100,
          left: -450 + Math.cos(frame / 170) * 60,
          top: 560 + Math.sin(frame / 140) * 50,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(110,90,220,0.20) 0%, rgba(110,90,220,0) 65%)',
        }}
      />
    </AbsoluteFill>
  );
};

export const SceneTitle: React.FC<{kicker: string; title: string}> = ({kicker, title}) => {
  const frame = useCurrentFrame();
  const a = prog(frame, 6, 24);
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 64,
        opacity: a,
        transform: `translateY(${(1 - a) * 26}px)`,
      }}
    >
      <div style={{color: C.teal, fontSize: 26, fontWeight: 700, letterSpacing: 4}}>{kicker}</div>
      <div style={{color: C.white, fontSize: 64, fontWeight: 700, marginTop: 8}}>{title}</div>
    </div>
  );
};
