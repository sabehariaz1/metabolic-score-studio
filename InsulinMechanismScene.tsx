import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, Card, Heading, Scene} from './ui';

const Panel: React.FC<{ok: boolean}> = ({ok}) => {
  const frame = useCurrentFrame();
  const col = ok ? C.teal : C.coral;
  const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
  const keyY = ok ? interpolate(frame, [20, 60], [0, 62], clamp) : 14 * Math.sin(frame / 6) ** 2;
  const dots = [90, 170, 350, 430];
  return (
    <svg viewBox="0 0 520 340" width="100%" height="330">
      <rect x="50" y="200" width="420" height="120" rx="40" fill={ok ? '#E3F5F4' : '#FDE8E5'} stroke={col} strokeWidth="5" />
      <rect x="225" y="190" width="70" height="40" rx="10" fill={col} />
      <circle cx="260" cy="210" r="8" fill="#fff" />
      <g transform={`translate(0 ${keyY})`}>
        <circle cx="260" cy="70" r="24" fill={C.amber} />
        <rect x="254" y="92" width="12" height="52" rx="4" fill={C.amber} />
        <rect x="266" y="116" width="14" height="8" fill={C.amber} />
      </g>
      {dots.map((x, i) => {
        const y = ok ? interpolate(frame, [60 + i * 8, 100 + i * 8], [60, 262], clamp) : 50 + (i % 2) * 40 + 4 * Math.sin(frame / 8 + i);
        return <circle key={x} cx={x} cy={y} r="14" fill={C.coral} opacity="0.85" />;
      })}
    </svg>
  );
};

export const InsulinMechanismScene: React.FC = () => (
  <Scene caption="Insulin is the key. Sugar is the fuel.">
    <Heading>Insulin lets sugar into your cells.</Heading>
    <div style={{flex: 1, display: 'flex', gap: 40, minHeight: 0}}>
      <Card delay={10} style={{flex: 1}}>
        <div style={{fontSize: 40, fontWeight: 800, color: C.teal}}>Key fits: sugar gets in</div>
        <Panel ok />
      </Card>
      <Card delay={20} style={{flex: 1}}>
        <div style={{fontSize: 40, fontWeight: 800, color: C.coral}}>Lock sticks: sugar stays in blood</div>
        <Panel ok={false} />
      </Card>
    </div>
  </Scene>
);
