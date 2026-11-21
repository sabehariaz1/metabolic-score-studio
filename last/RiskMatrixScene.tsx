import React from 'react';
import {C, Card, Heading, Scene, useSpring} from './ui';

const FACTORS = ['Age 45 or older', 'Extra body weight', 'Family history of diabetes', 'Little exercise', 'High blood pressure', 'Diabetes during pregnancy'];
const COLORS = [C.coral, C.amber, C.teal, C.coral, C.amber, C.teal];

const Tile: React.FC<{label: string; color: string; i: number}> = ({label, color, i}) => {
  const s = useSpring(14 + i * 6, 9);
  return (
    <Card delay={8 + i * 6} from={i % 2 === 0 ? 'left' : 'right'} style={{display: 'flex', alignItems: 'center', gap: 22}}>
      <svg width="80" height="80" viewBox="0 0 84 84" style={{flexShrink: 0, transform: `rotate(${(1 - s) * -270}deg) scale(${Math.max(0, s)})`}}>
        <circle cx="42" cy="42" r="40" fill={color} />
        <path d="M42 24 V60 M24 42 H60" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
      </svg>
      <div style={{fontSize: 38, fontWeight: 700, lineHeight: 1.2}}>{label}</div>
    </Card>
  );
};

export const RiskMatrixScene: React.FC = () => (
  <Scene caption="Each one can add points to your score">
    <Heading>What raises your score?</Heading>
    <div style={{flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 28}}>
      {FACTORS.map((f, i) => (
        <Tile key={f} label={f} color={COLORS[i] ?? C.teal} i={i} />
      ))}
    </div>
  </Scene>
);
