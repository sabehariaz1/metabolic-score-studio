import React from 'react';
import {C, Card, Heading, Scene, useIn} from './ui';

const TESTS: Array<[string, string]> = [
  ['Fasting blood sugar', '100 to 125 mg/dL'],
  ['A1C (3-month average)', '5.7% to 6.4%'],
  ['2-hour sugar test', '140 to 199 mg/dL'],
];

export const DiagnosticsScene: React.FC = () => {
  const art = useIn(6);
  return (
    <Scene caption="Ask your doctor for a simple blood test">
      <Heading>A blood test gives a clear answer.</Heading>
      <div style={{flex: 1, display: 'flex', gap: 50, minHeight: 0}}>
        <div style={{flex: 0.9, ...art}}>
          <svg viewBox="0 0 520 480" width="100%" height="100%">
            <circle cx="260" cy="240" r="225" fill={C.bg2} />
            <rect x="70" y="100" width="130" height="36" rx="10" fill={C.teal} />
            <rect x="80" y="130" width="110" height="290" rx="40" fill="#fff" stroke={C.teal} strokeWidth="6" />
            <rect x="92" y="250" width="86" height="158" rx="32" fill={C.coral} opacity="0.85" />
            <rect x="260" y="110" width="210" height="310" rx="24" fill="#fff" stroke={C.border} strokeWidth="6" />
            <rect x="320" y="90" width="90" height="40" rx="12" fill={C.amber} />
            <rect x="290" y="160" width="150" height="14" rx="7" fill={C.border} />
            <rect x="290" y="190" width="110" height="14" rx="7" fill={C.border} />
            <circle cx="365" cy="320" r="54" fill={C.green} />
            <path d="M338 320 L358 342 L394 298" stroke="#fff" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{flex: 1.3, display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'center'}}>
          {TESTS.map(([name, range], i) => (
            <Card key={name} delay={12 + i * 8}>
              <div style={{fontSize: 34, color: C.sub, fontWeight: 600}}>{name}</div>
              <div style={{fontSize: 52, fontWeight: 800, color: C.amber}}>{range}</div>
            </Card>
          ))}
        </div>
      </div>
    </Scene>
  );
};
