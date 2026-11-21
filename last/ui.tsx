import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const C = {
  bg: '#F4FAFF', bg2: '#EAF4FA', card: '#FFFFFF', border: '#D7EAF5',
  coral: '#E05244', teal: '#0E7C7B', amber: '#F09D24', green: '#2E9E5B',
  ink: '#17324D', sub: '#4F6B82',
} as const;
export const FONT = '"Trebuchet MS", "Segoe UI", Verdana, sans-serif';

export const useSpring = (delay = 0, damping = 11): number => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping, stiffness: 120}});
};

export const useFloat = (amp = 8, speed = 24, phase = 0): number => Math.sin(useCurrentFrame() / speed + phase) * amp;

type From = 'pop' | 'left' | 'right' | 'up';
export const useIn = (delay = 0, from: From = 'pop'): React.CSSProperties => {
  const s = useSpring(delay);
  const x = from === 'left' ? (1 - s) * -170 : from === 'right' ? (1 - s) * 170 : 0;
  const y = from === 'up' ? (1 - s) * 90 : 0;
  const sc = from === 'pop' ? 0.7 + 0.3 * s : 1;
  return {opacity: Math.min(1, Math.max(0, s * 2)), transform: `translate(${x}px, ${y}px) scale(${sc})`};
};

// Safe layout: content box ends 210px above the bottom; caption bar sits in the strip below it.
export const Scene: React.FC<{caption: string; children: React.ReactNode}> = ({caption, children}) => {
  const cap = useIn(12, 'up');
  return (
    <AbsoluteFill style={{background: `linear-gradient(160deg, ${C.bg}, ${C.bg2})`, fontFamily: FONT, color: C.ink}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, boxSizing: 'border-box', padding: '64px 110px 210px', display: 'flex', flexDirection: 'column', gap: 32}}>
        {children}
      </div>
      <div style={{position: 'absolute', left: 110, right: 110, bottom: 56, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.card, border: `2px solid ${C.border}`, borderRadius: 45, fontSize: 36, fontWeight: 600, color: C.sub, ...cap}}>
        {caption}
      </div>
    </AbsoluteFill>
  );
};

export const Heading: React.FC<{children: React.ReactNode; size?: number; delay?: number}> = ({children, size = 60, delay = 0}) => (
  <div style={{fontSize: size, fontWeight: 800, lineHeight: 1.12, flexShrink: 0, ...useIn(delay, 'left')}}>{children}</div>
);

export const Card: React.FC<{children: React.ReactNode; delay?: number; from?: From; style?: React.CSSProperties}> = ({children, delay = 0, from = 'pop', style}) => (
  <div style={{background: C.card, border: `2px solid ${C.border}`, borderRadius: 28, padding: 28, boxSizing: 'border-box', minHeight: 0, ...useIn(delay, from), ...style}}>{children}</div>
);

export const Words: React.FC<{text: string; size: number; delay?: number}> = ({text, size, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{fontSize: size, fontWeight: 800, lineHeight: 1.15, display: 'flex', flexWrap: 'wrap', columnGap: size * 0.28}}>
      {text.split(' ').map((w, i) => {
        const s = spring({frame: frame - delay - i * 3, fps, config: {damping: 12}});
        return (
          <span key={i} style={{display: 'inline-block', opacity: Math.min(1, s * 2), transform: `translateY(${(1 - s) * 40}px) scale(${0.85 + 0.15 * s})`}}>{w}</span>
        );
      })}
    </div>
  );
};
