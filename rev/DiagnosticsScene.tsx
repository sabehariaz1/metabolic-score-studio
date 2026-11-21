import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Captions, FONT, P, SceneBg, SceneTitle, at, card, endAt, pop, prog} from './theme';
import {CalendarIcon, CupIcon, DropIcon, PlateIcon} from './Icons';
import type {SceneInfo} from '../timing';

type Row = {
  name: string;
  sub: string;
  icon: React.ReactNode;
  vals: [string, string, string];
  alt: [string, string, string];
};

const ROWS: ReadonlyArray<Row> = [
  {
    name: 'Fasting sugar',
    sub: 'after 8 hours without food',
    icon: <PlateIcon size={96} />,
    vals: ['Under 100 mg/dL', '100 to 125 mg/dL', '126 mg/dL or more'],
    alt: ['under 5.6 mmol/L', '5.6 to 6.9 mmol/L', '7.0 mmol/L or more'],
  },
  {
    name: 'A1C',
    sub: 'your average sugar over 3 months',
    icon: <CalendarIcon size={96} color={P.purple} label="3 mo" />,
    vals: ['Under 5.7%', '5.7% to 6.4%', '6.5% or more'],
    alt: ['under 39 mmol/mol', '39 to 47 mmol/mol', '48 mmol/mol or more'],
  },
  {
    name: 'Sugary drink test',
    sub: 'checked 2 hours after the drink',
    icon: <CupIcon size={96} />,
    vals: ['Under 140 mg/dL', '140 to 199 mg/dL', '200 mg/dL or more'],
    alt: ['under 7.8 mmol/L', '7.8 to 11.0 mmol/L', '11.1 mmol/L or more'],
  },
];

const COLORS = [P.green, P.sun, P.coral];
const NAMES = ['NORMAL', 'PREDIABETES', 'DIABETES'];
const TXT = [P.ink, P.ink, '#fff'];

export const DiagnosticsScene: React.FC<{scene: SceneInfo}> = ({scene}) => {
  const frame = useCurrentFrame();
  const s0 = at(scene, 0);
  const s1 = at(scene, 1);
  const intro = pop(frame, s0, 26);
  const introOut = 1 - prog(frame, s1 - 18, 16);

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneBg tint={P.skyL} tint2={P.tealL} />
      <SceneTitle kicker="THE BLOOD TESTS" title="Your numbers, in plain words" color={P.sky} />

      <div
        style={{
          ...card,
          position: 'absolute',
          left: 460,
          top: 290,
          width: 1000,
          height: 430,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          opacity: intro * introOut,
          transform: `scale(${0.9 + 0.1 * intro})`,
        }}
      >
        <DropIcon size={150} />
        <div style={{color: P.ink, fontSize: 62, fontWeight: 900, textAlign: 'center', lineHeight: 1.1}}>
          Only a blood test can tell you for sure
        </div>
        <div style={{color: P.sky, fontSize: 38, fontWeight: 900}}>Doctors check 3 numbers</div>
      </div>

      {ROWS.map((r, i) => {
        const sIdx = i + 1;
        const s = at(scene, sIdx);
        const e = endAt(scene, sIdx);
        const a = pop(frame, s - 4, 22);
        return (
          <div
            key={r.name}
            style={{
              ...card,
              position: 'absolute',
              left: 100,
              top: 232 + i * 218,
              width: 1720,
              height: 200,
              opacity: a,
              transform: `translateY(${(1 - a) * 40}px)`,
            }}
          >
            <div style={{position: 'absolute', left: 28, top: 52}}>{r.icon}</div>
            <div style={{position: 'absolute', left: 160, top: 14, display: 'flex', alignItems: 'baseline', gap: 18}}>
              <span style={{color: P.ink, fontSize: 36, fontWeight: 900}}>{r.name}</span>
              <span style={{color: P.mute, fontSize: 25, fontWeight: 700}}>{r.sub}</span>
            </div>
            <div style={{position: 'absolute', left: 160, top: 62, width: 1530, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14}}>
              {[0, 1, 2].map((j) => {
                const g = prog(frame, s + (j * (e - s)) / 3.3, 22);
                return (
                  <div key={j}>
                    <div
                      style={{
                        height: 50,
                        borderRadius: 14,
                        background: COLORS[j],
                        transform: `scaleX(${g})`,
                        transformOrigin: 'left center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: TXT[j],
                        fontSize: 23,
                        fontWeight: 900,
                        letterSpacing: 2,
                      }}
                    >
                      <span style={{opacity: g > 0.95 ? 1 : 0}}>{NAMES[j]}</span>
                    </div>
                    <div style={{textAlign: 'center', opacity: g, marginTop: 8}}>
                      <div style={{color: P.ink, fontSize: 32, fontWeight: 900, lineHeight: 1.1}}>{r.vals[j]}</div>
                      <div style={{color: P.mute, fontSize: 22, fontWeight: 700}}>{r.alt[j]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <Captions scene={scene} />
    </AbsoluteFill>
  );
};
