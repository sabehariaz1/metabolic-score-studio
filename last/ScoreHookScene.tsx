import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, Scene, Words, useFloat, useIn, useSpring} from './ui';

export const ScoreHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const art = useIn(8, 'right');
  const float = useFloat(10);
  const drop = useSpring(25);
  const pop = useSpring(75, 9);
  const ring = interpolate(frame, [75, 110], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Scene caption="Take the 1-minute risk test">
      <div style={{flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', gap: 60}}>
        <div style={{flex: 1.3}}>
          <Words text="If your score is 5 or higher, you are at high risk of developing prediabetes." size={74} />
        </div>
        <div style={{flex: 1, height: 560, ...art}}>
          <svg viewBox="0 0 520 520" width="100%" height="100%" style={{transform: `translateY(${float}px)`}}>
            <circle cx="260" cy="260" r="240" fill={C.bg2} />
            <rect x="320" y="150" width="170" height="290" rx="34" fill="#fff" stroke={C.teal} strokeWidth="6" />
            <rect x="342" y="180" width="126" height="90" rx="14" fill="#E3F5F4" />
            <text x="405" y="248" fontSize={54 * Math.max(0.01, pop)} fontWeight="800" fill={C.teal} textAnchor="middle">{frame < 75 ? '' : '5+'}</text>
            <circle cx="405" cy="225" r={20 + ring * 90} fill="none" stroke={C.teal} strokeWidth="6" opacity={1 - ring} />
            <rect x="372" y="100" width="66" height="60" rx="8" fill="#fff" stroke={C.border} strokeWidth="4" />
            <circle cx="405" cy="360" r="26" fill={C.coral} />
            <g transform="rotate(-35 140 340)"><rect x="30" y="310" width="200" height="62" rx="31" fill="#F6C6A5" /></g>
            <g transform={`translate(262 300) scale(${drop})`}>
              <path d="M0 -75 C0 -75 -34 -32 -34 -10 a34 34 0 0 0 68 0 C34 -32 0 -75 0 -75 Z" fill={C.coral} />
            </g>
          </svg>
        </div>
      </div>
    </Scene>
  );
};
