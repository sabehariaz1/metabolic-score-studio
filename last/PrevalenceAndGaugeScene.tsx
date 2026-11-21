import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, Card, Heading, Scene, useSpring} from './ui';

const CX = 400;
const CY = 400;
const R = 300;
const pt = (t: number, r: number): [number, number] => [CX + r * Math.cos(Math.PI * (1 - t)), CY - r * Math.sin(Math.PI * (1 - t))];
const arc = (a: number, b: number): string => {
  const [x1, y1] = pt(a, R);
  const [x2, y2] = pt(b, R);
  return `M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2}`;
};

export const PrevalenceAndGaugeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
  const t = 0.08 + 0.47 * useSpring(80, 7);
  const [nx, ny] = pt(t, R - 50);
  const zones: Array<[string, string, string]> = [
    ['Normal', 'under 100 mg/dL', C.teal],
    ['Prediabetes', '100 to 125 mg/dL', C.amber],
    ['Diabetes', '126 mg/dL or more', C.coral],
  ];
  const segs: Array<[number, number, string, number]> = [[0, 0.4, C.teal, 10], [0.4, 0.7, C.amber, 30], [0.7, 1, C.coral, 50]];
  return (
    <Scene caption="Most people with prediabetes do not know it">
      <Heading>Prediabetes is common, and often silent.</Heading>
      <div style={{flex: 1, minHeight: 0, display: 'flex', gap: 36}}>
        <Card delay={6} from="left" style={{flex: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
          <svg viewBox="0 0 800 440" width="100%" height="330">
            {segs.map(([a, b, col, s]) => (
              <path key={col} d={arc(a, b)} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - interpolate(frame, [s, s + 25], [0, 1], clamp)} stroke={col} strokeWidth="56" fill="none" />
            ))}
            <line x1={CX} y1={CY} x2={nx} y2={ny} stroke={C.ink} strokeWidth="12" strokeLinecap="round" />
            <circle cx={CX} cy={CY} r="26" fill={C.ink} />
          </svg>
          <div style={{fontSize: 24, color: C.sub, fontWeight: 600}}>Fasting blood sugar</div>
          <div style={{display: 'flex', gap: 26}}>
            {zones.map(([name, range, col]) => (
              <div key={name} style={{borderLeft: `10px solid ${col}`, paddingLeft: 14, fontSize: 28, fontWeight: 700}}>
                {name}
                <div style={{fontSize: 22, fontWeight: 500, color: C.sub}}>{range}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card delay={20} from="right" style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16}}>
          <div style={{fontSize: 56, fontWeight: 800, color: C.coral, lineHeight: 1.1}}>Early signs are easy to miss.</div>
          <div style={{fontSize: 34, color: C.sub}}>A simple check can catch it early.</div>
        </Card>
      </div>
    </Scene>
  );
};
