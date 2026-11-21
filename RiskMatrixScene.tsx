import React from 'react';
import {C, Card, Heading, Scene} from './ui';

const FACTORS = ['Age 45 or older', 'Extra body weight', 'Family history of diabetes', 'Little exercise', 'High blood pressure', 'Diabetes during pregnancy'];
const COLORS = [C.coral, C.amber, C.teal, C.coral, C.amber, C.teal];

export const RiskMatrixScene: React.FC = () => (
  <Scene caption="Each one can add points to your score">
    <Heading>What raises your score?</Heading>
    <div style={{flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 32, minHeight: 0}}>
      {FACTORS.map((f, i) => (
        <Card key={f} delay={8 + i * 6} style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <svg width="84" height="84" viewBox="0 0 84 84" style={{flexShrink: 0}}>
            <circle cx="42" cy="42" r="40" fill={COLORS[i] ?? C.teal} />
            <path d="M42 24 V60 M24 42 H60" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
          </svg>
          <div style={{fontSize: 40, fontWeight: 700, lineHeight: 1.2}}>{f}</div>
        </Card>
      ))}
    </div>
  </Scene>
);
