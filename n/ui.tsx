import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const C = {
  bg: '#F4FAFF', bg2: '#EAF4FA', card: '#FFFFFF', border: '#D7EAF5',
  coral: '#E05244', teal: '#0E7C7B', amber: '#F09D24', green: '#2E9E5B',
  ink: '#17324D', sub: '#4F6B82',
} as const;
export const FONT = '"Trebuchet MS", "Segoe UI", Verdana, sans-serif';

export const useIn = (delay = 0): React.CSSProperties => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 200}});
  return {opacity: s, transform: `translateY(${(1 - s) * 26}px)`};
};

export const Scene: React.FC<{caption: string; children: React.ReactNode}> = ({caption, children}) => {
  const cap = useIn(12);
  return (
    <AbsoluteFill style={{background: `linear-gradient(160deg, ${C.bg}, ${C.bg2})`, fontFamily: FONT, color: C.ink}}>
      <div style={{position: 'absolute', inset: 0, boxSizing: 'border-box', padding: '72px 110px 210px', display: 'flex', flexDirection: 'column', gap: 36}}>
        {children}
      </div>
      <div style={{position: 'absolute', left: 110, right: 110, bottom: 56, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.card, border: `2px solid ${C.border}`, borderRadius: 45, fontSize: 36, fontWeight: 600, color: C.sub, ...cap}}>
        {caption}
      </div>
    </AbsoluteFill>
  );
};

export const Heading: React.FC<{children: React.ReactNode; size?: number; delay?: number}> = ({children, size = 64, delay = 0}) => (
  <div style={{fontSize: size, fontWeight: 800, lineHeight: 1.12, color: C.ink, ...useIn(delay)}}>{children}</div>
);

export const Card: React.FC<{children: React.ReactNode; delay?: number; style?: React.CSSProperties}> = ({children, delay = 0, style}) => (
  <div style={{background: C.card, border: `2px solid ${C.border}`, borderRadius: 28, padding: 32, boxSizing: 'border-box', ...useIn(delay), ...style}}>{children}</div>
);
