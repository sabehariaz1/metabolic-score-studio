import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, Card, Heading, Scene} from './ui';

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
  const {fps} = useVideoConfig();
  const t = 0.1 + 0.45 * spring({frame: frame - 30, fps, config: {damping: 18}});
  const [nx, ny] = pt(t, R - 50);
  const zones: Array<[string, string, string]> = [
    ['Normal', 'under 100', C.teal],
    ['Prediabetes', '100 to 125', C.amber],
    ['Diabetes', '126 or more', C.coral],
  ];
  return (
    <Scene caption="Most people with prediabetes do not know it">
      <Heading>Prediabetes is common, and often silent.</Heading>
      <div style={{flex: 1, display: 'flex', gap: 40, minHeight: 0}}>
        <Card delay={10} style={{flex: 1.4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <svg viewBox="0 0 800 450" width="100%" height="380">
            <path d={arc(0, 0.4)} stroke={C.teal} strokeWidth="56" fill="none" />
            <path d={arc(0.4, 0.7)} stroke={C.amber} strokeWidth="56" fill="none" />
            <path d={arc(0.7, 1)} stroke={C.coral} strokeWidth="56" fill="none" />
            <line x1={CX} y1={CY} x2={nx} y2={ny} stroke={C.ink} strokeWidth="12" strokeLinecap="round" />
            <circle cx={CX} cy={CY} r="26" fill={C.ink} />
            <text x={CX} y={CY + 20} fontSize="30" textAnchor="middle" fill={C.sub} dy="40">Fasting blood sugar (mg/dL)</text>
          </svg>
          <div style={{display: 'flex', gap: 24, marginTop: 4}}>
            {zones.map(([name, range, col]) => (
              <div key={name} style={{borderLeft: `10px solid ${col}`, paddingLeft: 14, fontSize: 28, fontWeight: 700}}>
                {name}
                <div style={{fontSize: 24, fontWeight: 500, color: C.sub}}>{range}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card delay={20} style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16}}>
          <div style={{fontSize: 60, fontWeight: 800, color: C.coral, lineHeight: 1.1}}>Early signs are easy to miss.</div>
          <div style={{fontSize: 36, color: C.sub}}>A simple check can catch it early.</div>
        </Card>
      </div>
    </Scene>
  );
};
