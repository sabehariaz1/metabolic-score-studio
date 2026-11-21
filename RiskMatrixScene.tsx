import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT, SceneTitle, prog} from './theme';

const FACTORS: ReadonlyArray<{t: string; s: string; c: string}> = [
  {t: 'Age', s: 'Risk rises as you get older', c: C.teal},
  {t: 'Family history', s: 'A parent, brother or sister with diabetes', c: C.green},
  {t: 'Excess weight', s: 'Overweight or obesity', c: C.amber},
  {t: 'Low activity', s: 'Little regular physical activity', c: C.coral},
  {t: 'High blood pressure', s: 'Or taking medicine for it', c: C.teal},
  {t: 'Gestational diabetes', s: 'Diabetes during a past pregnancy', c: C.green},
  {t: 'Abnormal cholesterol', s: 'Low HDL or high triglycerides', c: C.amber},
  {t: 'PCOS', s: 'Polycystic ovary syndrome', c: C.coral},
];

const CARD_W = 390;
const CARD_H = 230;
const GAP = 40;

export const RiskMatrixScene: React.FC = () => {
  const frame = useCurrentFrame();
  const bannerA = prog(frame, 380, 26);
  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneTitle kicker="WHAT RAISES YOUR SCORE" title="Common risk factors" />
      {FACTORS.map((f, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const start = 36 + i * 32;
        const a = prog(frame, start, 24);
        const tick = prog(frame, start + 14, 16);
        return (
          <div
            key={f.t}
            style={{
              position: 'absolute',
              left: 120 + col * (CARD_W + GAP),
              top: 290 + row * (CARD_H + GAP),
              width: CARD_W,
              height: CARD_H,
              boxSizing: 'border-box',
              borderRadius: 28,
              background: C.card,
              border: `2px solid ${C.line}`,
              padding: 28,
              opacity: a,
              transform: `translateY(${(1 - a) * 40}px) scale(${0.95 + a * 0.05})`,
            }}
          >
            <div style={{height: 8, width: 90 * a, borderRadius: 4, background: f.c, marginBottom: 20}} />
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  background: f.c,
                  color: C.ink,
                  fontSize: 26,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${tick})`,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{color: C.white, fontSize: 33, fontWeight: 700, lineHeight: 1.15}}>{f.t}</div>
            </div>
            <div style={{color: C.muted, fontSize: 26, marginTop: 16, lineHeight: 1.3}}>{f.s}</div>
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          top: 850,
          height: 110,
          borderRadius: 55,
          background: C.coral,
          color: C.white,
          fontSize: 42,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: bannerA,
          transform: `translateY(${(1 - bannerA) * 30}px)`,
        }}
      >
        More risk factors = a higher score. 5 or higher = high risk.
      </div>
    </AbsoluteFill>
  );
};
