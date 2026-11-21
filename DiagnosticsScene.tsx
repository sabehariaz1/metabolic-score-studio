import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT, SceneTitle, prog} from './theme';

type TestRow = {name: string; sub: string; vals: [string, string, string]; mmol: [string, string, string]};

const TESTS: ReadonlyArray<TestRow> = [
  {
    name: 'Fasting glucose',
    sub: 'no food for at least 8 hours',
    vals: ['Below 100 mg/dL', '100–125 mg/dL', '126 mg/dL or higher'],
    mmol: ['below 5.6 mmol/L', '5.6–6.9 mmol/L', '7.0 mmol/L or higher'],
  },
  {
    name: 'A1C',
    sub: 'average blood sugar over about 3 months',
    vals: ['Below 5.7%', '5.7–6.4%', '6.5% or higher'],
    mmol: ['below 39 mmol/mol', '39–47 mmol/mol', '48 mmol/mol or higher'],
  },
  {
    name: '2-hour glucose tolerance test',
    sub: 'after a 75 g glucose drink',
    vals: ['Below 140 mg/dL', '140–199 mg/dL', '200 mg/dL or higher'],
    mmol: ['below 7.8 mmol/L', '7.8–11.0 mmol/L', '11.1 mmol/L or higher'],
  },
];

const COLORS = [C.green, C.amber, C.coral];
const NAMES = ['NORMAL', 'PREDIABETES', 'DIABETES'];
const TEXT = [C.ink, C.ink, C.white];

export const DiagnosticsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const noteA = prog(frame, 560, 24);
  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneTitle kicker="SOURCE: AMERICAN DIABETES ASSOCIATION, STANDARDS OF CARE" title="Three blood tests, three ranges" />
      {TESTS.map((t, i) => {
        const start = 40 + i * 150;
        const head = prog(frame, start, 22);
        return (
          <div key={t.name} style={{position: 'absolute', left: 160, top: 268 + i * 218, width: 1600}}>
            <div style={{opacity: head, display: 'flex', alignItems: 'baseline', gap: 22}}>
              <span style={{color: C.white, fontSize: 38, fontWeight: 700}}>{t.name}</span>
              <span style={{color: C.muted, fontSize: 26}}>{t.sub}</span>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 14}}>
              {[0, 1, 2].map((j) => {
                const g = prog(frame, start + 14 + j * 16, 26);
                const l = prog(frame, start + 34 + j * 16, 22);
                return (
                  <div key={j}>
                    <div
                      style={{
                        height: 56,
                        borderRadius: 16,
                        background: COLORS[j],
                        transform: `scaleX(${g})`,
                        transformOrigin: 'left center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: TEXT[j],
                        fontSize: 25,
                        fontWeight: 700,
                        letterSpacing: 2,
                      }}
                    >
                      <span style={{opacity: g > 0.95 ? 1 : 0}}>{NAMES[j]}</span>
                    </div>
                    <div style={{textAlign: 'center', opacity: l, marginTop: 12}}>
                      <div style={{color: C.white, fontSize: 34, fontWeight: 700}}>{t.vals[j]}</div>
                      <div style={{color: C.muted, fontSize: 25, marginTop: 2}}>{t.mmol[j]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 940,
          textAlign: 'center',
          color: C.amber,
          fontSize: 30,
          fontWeight: 700,
          opacity: noteA,
        }}
      >
        Only a blood test, interpreted by a doctor, can confirm a diagnosis.
      </div>
    </AbsoluteFill>
  );
};
