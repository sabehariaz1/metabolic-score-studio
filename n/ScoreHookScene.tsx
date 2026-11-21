import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, Scene, useIn} from './ui';

export const ScoreHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = interpolate(frame, [20, 70], [-40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const text = useIn(0);
  const art = useIn(8);
  return (
    <Scene caption="Take the 1-minute risk test">
      <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 70}}>
        <div style={{flex: 1.25, fontSize: 78, fontWeight: 800, lineHeight: 1.15, ...text}}>
          If your score is 5 or higher, you are at high risk of developing prediabetes.
        </div>
        <div style={{flex: 1, height: 620, ...art}}>
          <svg viewBox="0 0 520 520" width="100%" height="100%">
            <circle cx="260" cy="260" r="240" fill={C.bg2} />
            <g transform="translate(0 0)">
              <rect x="320" y="150" width="170" height="290" rx="34" fill="#fff" stroke={C.teal} strokeWidth="6" />
              <rect x="342" y="180" width="126" height="90" rx="14" fill="#E3F5F4" />
              <text x="405" y="244" fontSize="54" fontWeight="800" fill={C.teal} textAnchor="middle">5+</text>
              <rect x="372" y="100" width="66" height="60" rx="8" fill="#fff" stroke={C.border} strokeWidth="4" />
              <circle cx="405" cy="360" r="26" fill={C.coral} />
            </g>
            <g transform="rotate(-35 140 340)">
              <rect x="30" y="310" width="200" height="62" rx="31" fill="#F6C6A5" />
            </g>
            <path transform={`translate(0 ${drop})`} d="M262 225 C262 225 228 268 228 290 a34 34 0 0 0 68 0 C296 268 262 225 262 225 Z" fill={C.coral} />
          </svg>
        </div>
      </div>
    </Scene>
  );
};
