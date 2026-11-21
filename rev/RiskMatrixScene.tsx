import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Captions, FONT, P, SceneBg, SceneTitle, at, card, endAt, pop, prog} from './theme';
import {
  CalendarIcon,
  CholesterolIcon,
  FamilyIcon,
  HeartIcon,
  PcosIcon,
  PregnantIcon,
  ScaleIcon,
  SofaIcon,
} from './Icons';
import type {SceneInfo} from '../timing';

type Factor = {t: string; s: string; c: string; bg: string; icon: React.ReactNode};

const FACTORS: ReadonlyArray<Factor> = [
  {t: 'Getting older', s: 'Risk rises with age', c: P.purple, bg: P.purpleL, icon: <CalendarIcon size={96} color={P.purple} />},
  {t: 'Family history', s: 'A parent, brother or sister with diabetes', c: P.teal, bg: P.tealL, icon: <FamilyIcon size={96} />},
  {t: 'Extra weight', s: 'Overweight or obesity', c: P.sun, bg: P.sunL, icon: <ScaleIcon size={96} />},
  {t: 'Not very active', s: 'Little regular exercise', c: P.coral, bg: P.coralL, icon: <SofaIcon size={96} />},
  {t: 'High blood pressure', s: 'Or taking medicine for it', c: P.coral, bg: P.coralL, icon: <HeartIcon size={96} />},
  {t: 'Diabetes in pregnancy', s: 'In a past pregnancy', c: P.purple, bg: P.purpleL, icon: <PregnantIcon size={96} />},
  {t: 'Unhealthy cholesterol', s: 'Low "good" or high "bad" fats', c: P.sun, bg: P.sunL, icon: <CholesterolIcon size={96} />},
  {t: 'PCOS', s: 'Polycystic ovary syndrome', c: P.teal, bg: P.tealL, icon: <PcosIcon size={96} />},
];

const CW = 400;
const CH = 250;
const GAP = 40;

export const RiskMatrixScene: React.FC<{scene: SceneInfo}> = ({scene}) => {
  const frame = useCurrentFrame();
  const s0 = at(scene, 0);
  const s1 = at(scene, 1);
  const e1 = endAt(scene, 1);
  const s2 = at(scene, 2);
  const e2 = endAt(scene, 2);
  const s3 = at(scene, 3);

  const startOf = (i: number): number =>
    i < 4 ? s1 + (i * (e1 - s1)) / 4.2 : s2 + ((i - 4) * (e2 - s2)) / 4.2;
  const shown = FACTORS.reduce((n, _, i) => (frame >= startOf(i) ? n + 1 : n), 0);
  const counter = pop(frame, s0 + 8, 22);
  const banner = pop(frame, s3, 24);

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneBg tint={P.purpleL} tint2={P.coralL} />
      <SceneTitle kicker="WHAT RAISES YOUR SCORE" title="Things that make diabetes more likely" color={P.purple} />

      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 78,
          background: P.ink,
          color: '#fff',
          fontSize: 34,
          fontWeight: 900,
          padding: '12px 30px',
          borderRadius: 36,
          opacity: counter,
          transform: `scale(${0.8 + 0.2 * counter})`,
        }}
      >
        Risk factors: {shown} of 8
      </div>

      {FACTORS.map((f, i) => {
        const a = pop(frame, startOf(i), 24);
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <div
            key={f.t}
            style={{
              ...card,
              position: 'absolute',
              left: 100 + col * (CW + GAP),
              top: 245 + row * (CH + GAP),
              width: CW,
              height: CH,
              padding: 26,
              opacity: a,
              transform: `translateY(${(1 - a) * 60}px) scale(${0.9 + 0.1 * a})`,
              borderTop: `10px solid ${f.c}`,
            }}
          >
            <div style={{width: 124, height: 124, borderRadius: 62, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {f.icon}
            </div>
            <div style={{position: 'absolute', left: 168, top: 34, width: 200}}>
              <div style={{color: P.ink, fontSize: 31, fontWeight: 900, lineHeight: 1.12}}>{f.t}</div>
            </div>
            <div style={{color: P.mute, fontSize: 25, fontWeight: 700, lineHeight: 1.25, marginTop: 14}}>{f.s}</div>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          top: 812,
          height: 72,
          borderRadius: 36,
          background: P.coral,
          color: '#fff',
          fontSize: 38,
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: banner,
          transform: `translateY(${(1 - banner) * 30}px)`,
        }}
      >
        The more that apply, the higher your score
      </div>
      <Captions scene={scene} />
    </AbsoluteFill>
  );
};
