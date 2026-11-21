import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, Card, Heading, Scene, useFloat, useIn, useSpring} from './ui';

const TESTS: Array<[string, string]> = [
  ['Fasting blood sugar', '100 to 125 mg/dL'],
  ['A1C (3-month average)', '5.7% to 6.4%'],
  ['2-hour sugar test', '140 to 199 mg/dL'],
];

export const DiagnosticsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const art = useIn(6, 'left');
  const float = useFloat(8, 22);
  const liquid = interpolate(frame, [15, 65], [0, 158], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const check = interpolate(frame, [70, 95], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const badge = useSpring(65, 9);
  return (
    <Scene caption="Ask your doctor for a simple blood test">
      <Heading>A blood test gives a clear answer.</Heading>
      <div style={{flex: 1, minHeight: 0, display: 'flex', gap: 44}}>
        <div style={{flex: 0.9, minHeight: 0, ...art}}>
          <svg viewBox="0 0 520 480" width="100%" height="100%" style={{transform: `translateY(${float}px)`}}>
            <circle cx="260" cy="240" r="225" fill={C.bg2} />
            <rect x="70" y="100" width="130" height="36" rx="10" fill={C.teal} />
            <rect x="80" y="130" width="110" height="290" rx="40" fill="#fff" stroke={C.teal} strokeWidth="6" />
            <rect x="92" y={408 - liquid} width="86" height={liquid} rx="32" fill={C.coral} opacity="0.85" />
            <rect x="260" y="110" width="210" height="310" rx="24" fill="#fff" stroke={C.border} strokeWidth="6" />
            <rect x="320" y="90" width="90" height="40" rx="12" fill={C.amber} />
            <rect x="290" y="160" width="150" height="14" rx="7" fill={C.border} />
            <rect x="290" y="190" width="110" height="14" rx="7" fill={C.border} />
            <g transform={`translate(365 320) scale(${Math.max(0, badge)})`}>
              <circle r="54" fill={C.green} />
              <path d="M-27 0 L-7 22 L29 -22" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - check} stroke="#fff" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
        <div style={{flex: 1.3, display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center', minHeight: 0}}>
          {TESTS.map(([name, range], i) => (
            <Card key={name} delay={12 + i * 8} from="right" style={{padding: 22}}>
              <div style={{fontSize: 32, color: C.sub, fontWeight: 600}}>{name}</div>
              <div style={{fontSize: 48, fontWeight: 800, color: C.amber}}>{range}</div>
            </Card>
          ))}
        </div>
      </div>
    </Scene>
  );
};
