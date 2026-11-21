import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const PreventionAndRefsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const showReferences = frame >= 660;
  const cardAnim = spring({
    frame: showReferences ? frame - 660 : frame,
    fps,
    config: {damping: 180},
  });

  if (!showReferences) {
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
            PREVENTION &amp; NEXT STEPS
          </div>
          <h2 style={{margin: '8px 0 0', fontSize: 52, color: '#0F2C44'}}>
            Structured Habits Lower Risk
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 48,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 48,
            opacity: cardAnim,
            transform: `scale(${interpolate(cardAnim, [0, 1], [0.97, 1])})`,
          }}
        >
          <div style={{minWidth: 280, textAlign: 'center'}}>
            <div style={{fontSize: 96, fontWeight: 800, color: '#0D7377', lineHeight: 1}}>
              58%
            </div>
            <div style={{fontSize: 23, fontWeight: 700, color: '#0F2C44', marginTop: 10}}>
              Lower risk in lifestyle program evidence
            </div>
          </div>

          <div style={{flex: 1}}>
            <ul style={{margin: 0, paddingLeft: 24, fontSize: 28, color: '#1F3D57', lineHeight: 1.65}}>
              <li>Aim for roughly 150 minutes of moderate physical activity per week</li>
              <li>Target a modest 5%–7% body weight reduction if overweight</li>
              <li>Prioritize fiber-rich foods, lean proteins, and balanced meals</li>
            </ul>
          </div>
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
          Consistent daily changes and timely lab screening help protect long-term health.
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F2C44',
        padding: '64px 88px',
        justifyContent: 'space-between',
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          opacity: cardAnim,
          transform: `translateY(${interpolate(cardAnim, [0, 1], [24, 0])}px)`,
        }}
      >
        <div style={{fontSize: 22, fontWeight: 700, color: '#7CE0D3', letterSpacing: 1.2}}>
          SOURCES &amp; REFERENCES
        </div>
        <h2 style={{margin: '10px 0 28px', fontSize: 48, color: '#FFFFFF'}}>
          Key Clinical &amp; Public Health References
        </h2>

        <div style={{display: 'flex', flexDirection: 'column', gap: 18, fontSize: 24, lineHeight: 1.45}}>
          <div>
            <strong>1. CDC Prediabetes Risk Test:</strong> Score ≥ 5 indicates high risk for prediabetes
            (cdc.gov/diabetes/risk-test).
          </div>
          <div>
            <strong>2. CDC National Diabetes Prevention Program (National DPP):</strong> Structured
            lifestyle guidance (5%–7% weight loss, 150 min/week activity).
          </div>
          <div>
            <strong>3. Diabetes Prevention Program Research Group (NIH / PMC1282458):</strong> Lifestyle
            intervention trial reporting 58% reduced diabetes incidence.
          </div>
          <div>
            <strong>4. Mayo Clinic — Prediabetes Diagnosis &amp; Treatment:</strong> HbA1c (5.7%–6.4%),
            fasting glucose (100–125 mg/dL), and 2-hr OGTT (140–199 mg/dL) ranges.
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: 20,
          fontSize: 22,
          color: '#C8DCE9',
        }}
      >
        Educational content only; not medical advice. Consult a qualified healthcare professional for
        personal testing and care.
      </div>
    </AbsoluteFill>
  );
};
