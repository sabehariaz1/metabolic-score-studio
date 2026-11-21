import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface ColumnSpec {
  title: string;
  accent: string;
  items: string[];
  delay: number;
}

const COLUMNS: ColumnSpec[] = [
  {
    title: 'Non-Modifiable',
    accent: '#3B6E8C',
    items: ['Age ≥ 45 years', 'Family history of Type 2', 'Certain ethnic backgrounds'],
    delay: 0,
  },
  {
    title: 'Daily Habits',
    accent: '#0D7377',
    items: ['Low physical activity', 'High refined sugar / ultra-processed intake', 'Excess weight around waist'],
    delay: 18,
  },
  {
    title: 'Clinical Factors',
    accent: '#D97706',
    items: ['History of gestational diabetes', 'Polycystic ovary syndrome (PCOS)', 'Elevated blood pressure or lipids'],
    delay: 36,
  },
];

export const RiskMatrixScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#EAF3F8',
        padding: '64px 80px',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{fontSize: 22, fontWeight: 700, color: '#0D7377', letterSpacing: 1}}>
          RISK FACTORS
        </div>
        <h2 style={{margin: '8px 0 0', fontSize: 52, color: '#0F2C44'}}>
          What Raises Your Risk Score?
        </h2>
      </div>

      <div style={{display: 'flex', gap: 36, marginBottom: 48}}>
        {COLUMNS.map((col) => {
          const anim = spring({
            frame: Math.max(0, frame - col.delay),
            fps,
            config: {damping: 170},
          });

          return (
            <div
              key={col.title}
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                padding: 34,
                borderTop: `6px solid ${col.accent}`,
                opacity: anim,
                transform: `translateY(${interpolate(anim, [0, 1], [26, 0])}px)`,
              }}
            >
              <div style={{fontSize: 28, fontWeight: 700, color: col.accent, marginBottom: 20}}>
                {col.title}
              </div>
              <ul style={{margin: 0, paddingLeft: 24, fontSize: 24, color: '#1F3D57', lineHeight: 1.65}}>
                {col.items.map((item) => (
                  <li key={item} style={{marginBottom: 10}}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div
        style={{
          alignSelf: 'center',
          backgroundColor: 'rgba(15, 44, 68, 0.90)',
          color: '#FFFFFF',
          padding: '16px 34px',
          borderRadius: 999,
          fontSize: 25,
          textAlign: 'center',
        }}
      >
        A score of 5 or higher flags elevated risk—a clinician can confirm with simple blood tests.
      </div>
    </AbsoluteFill>
  );
};
