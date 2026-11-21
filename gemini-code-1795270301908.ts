import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

interface LabCard {
  test: string;
  normal: string;
  prediabetes: string;
  delay: number;
}

const LABS: LabCard[] = [
  {
    test: 'HbA1c (2–3 mo avg)',
    normal: 'Below 5.7%',
    prediabetes: '5.7% – 6.4%',
    delay: 0,
  },
  {
    test: 'Fasting Blood Glucose',
    normal: 'Below 100 mg/dL',
    prediabetes: '100 – 125 mg/dL',
    delay: 16,
  },
  {
    test: '2-Hr Oral Glucose Tolerance',
    normal: 'Below 140 mg/dL',
    prediabetes: '140 – 199 mg/dL',
    delay: 32,
  },
];

export const DiagnosticsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F3F8FB',
        padding: '64px 80px',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{fontSize: 22, fontWeight: 700, color: '#0D7377', letterSpacing: 1}}>
          CLINICAL CONFIRMATION
        </div>
        <h2 style={{margin: '8px 0 0', fontSize: 52, color: '#0F2C44'}}>
          How Doctors Confirm Prediabetes
        </h2>
      </div>

      <div style={{display: 'flex', gap: 36, marginBottom: 48}}>
        {LABS.map((lab) => {
          const anim = spring({
            frame: Math.max(0, frame - lab.delay),
            fps,
            config: {damping: 170},
          });

          return (
            <div
              key={lab.test}
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                padding: 36,
                boxShadow: '0 12px 30px rgba(15, 44, 68, 0.08)',
                opacity: anim,
                transform: `translateY(${interpolate(anim, [0, 1], [26, 0])}px)`,
              }}
            >
              <div style={{fontSize: 28, fontWeight: 700, color: '#0F2C44', marginBottom: 20}}>
                {lab.test}
              </div>
              <div style={{fontSize: 23, color: '#0D7377', fontWeight: 600, marginBottom: 12}}>
                Normal: {lab.normal}
              </div>
              <div
                style={{
                  fontSize: 25,
                  color: '#9A6209',
                  fontWeight: 700,
                  backgroundColor: '#FFF5E4',
                  padding: '12px 16px',
                  borderRadius: 12,
                }}
              >
                Prediabetes: {lab.prediabetes}
              </div>
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
        Healthcare providers use HbA1c, fasting glucose, or oral glucose tolerance testing to confirm.
      </div>
    </AbsoluteFill>
  );
};