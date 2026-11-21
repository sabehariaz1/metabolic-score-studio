import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Captions, FONT, P, SceneBg, SceneTitle, at, card, endAt, pop, prog} from './theme';
import {AppleIcon, BookIcon, ScaleIcon, StethoscopeIcon, WalkerIcon} from './Icons';
import type {SceneInfo} from '../timing';

const RING_R = 175;
const RING_C = 2 * Math.PI * RING_R;

type Action = {big: string; t: string; c: string; bg: string; icon: React.ReactNode};
const ACTIONS: ReadonlyArray<Action> = [
  {big: '7%', t: 'of your weight lost (about 7 kg for every 100 kg)', c: P.sun, bg: P.sunL, icon: <ScaleIcon size={110} />},
  {big: '150 min', t: 'of brisk walking a week: half an hour, 5 days', c: P.green, bg: P.greenL, icon: <WalkerIcon size={110} />},
  {big: 'Eat smart', t: 'more vegetables and whole grains, fewer sugary drinks', c: P.coral, bg: P.coralL, icon: <AppleIcon size={110} />},
  {big: 'Ask your doctor', t: 'for a blood test if your score is 5 or higher', c: P.purple, bg: P.purpleL, icon: <StethoscopeIcon size={110} />},
];

const REFS: ReadonlyArray<string> = [
  'CDC. Prediabetes Risk Test. cdc.gov/prediabetes/risktest',
  'CDC. National Diabetes Prevention Program. cdc.gov/diabetes/prevention-type-2',
  'Diabetes Prevention Program Research Group. Description of lifestyle intervention. Diabetes Care 2002;25(12):2165–2171 (NIH/PMC1282458).',
  'Knowler WC, et al. Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin. N Engl J Med 2002;346:393–403.',
  'American Diabetes Association. Standards of Care in Diabetes, Section 2: Diagnosis and Classification of Diabetes. Diabetes Care.',
  'Mayo Clinic. Prediabetes: Symptoms and causes. mayoclinic.org',
];

export const PreventionAndRefsScene: React.FC<{scene: SceneInfo}> = ({scene}) => {
  const frame = useCurrentFrame();
  const s0 = at(scene, 0);
  const s1 = at(scene, 1);
  const e1 = endAt(scene, 1);
  const s6 = at(scene, 6);

  const partA = 1 - prog(frame, s6 - 22, 18);
  const partB = prog(frame, s6 - 8, 24);
  const ringP = interpolate(frame, [s1, e1], [0, 0.58], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const pct = Math.round((ringP / 0.58) * 58);
  const ringCard = pop(frame, s0 + 6, 26);
  const cta = pop(frame, s6 + 90, 24);

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneBg tint={P.greenL} tint2={P.sunL} />

      <div style={{opacity: partA}}>
        <SceneTitle kicker="THE GOOD NEWS" title="You can turn this around" color={P.green} />
        <div style={{...card, position: 'absolute', left: 110, top: 245, width: 540, height: 610, opacity: ringCard, transform: `translateY(${(1 - ringCard) * 50}px)`}}>
          <div style={{position: 'absolute', left: 85, top: 40, width: 370, height: 370}}>
            <svg width={370} height={370} viewBox="0 0 370 370">
              <circle cx={185} cy={185} r={RING_R} fill="none" stroke="rgba(18,38,63,0.07)" strokeWidth={34} />
              <circle
                cx={185}
                cy={185}
                r={RING_R}
                fill="none"
                stroke={P.green}
                strokeWidth={34}
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C * (1 - ringP)}
                transform="rotate(-90 185 185)"
              />
            </svg>
            <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{color: P.ink, fontSize: 108, fontWeight: 900, lineHeight: 1}}>{pct}%</div>
              <div style={{color: P.green, fontSize: 30, fontWeight: 900}}>lower chance</div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 430, textAlign: 'center', color: P.ink, fontSize: 31, fontWeight: 900, lineHeight: 1.2}}>
            of getting type 2 diabetes with lifestyle changes
          </div>
          <div style={{position: 'absolute', left: 30, right: 30, top: 540, textAlign: 'center', color: P.mute, fontSize: 23, fontWeight: 700}}>
            Diabetes Prevention Program, a large study
          </div>
        </div>

        {ACTIONS.map((a, i) => {
          const s = at(scene, i + 2);
          const p = pop(frame, s, 24);
          return (
            <div
              key={a.big}
              style={{
                ...card,
                position: 'absolute',
                left: 690 + (i % 2) * 570,
                top: 245 + Math.floor(i / 2) * 325,
                width: 530,
                height: 285,
                opacity: p,
                transform: `translateY(${(1 - p) * 60}px) scale(${0.92 + 0.08 * p})`,
                borderTop: `10px solid ${a.c}`,
                padding: 26,
              }}
            >
              <div style={{width: 128, height: 128, borderRadius: 64, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {a.icon}
              </div>
              <div style={{position: 'absolute', left: 170, top: 34, width: 330, color: P.ink, fontSize: i === 3 ? 38 : 46, fontWeight: 900, lineHeight: 1.05}}>{a.big}</div>
              <div style={{color: P.mute, fontSize: 28, fontWeight: 700, lineHeight: 1.25, marginTop: 20}}>{a.t}</div>
            </div>
          );
        })}
      </div>

      <div style={{opacity: partB}}>
        <SceneTitle kicker="SOURCES" title="References" color={P.teal} />
        <div style={{...card, position: 'absolute', left: 110, top: 230, width: 1700, height: 500, padding: '28px 40px'}}>
          {REFS.map((r, i) => {
            const a = prog(frame, s6 + i * 14, 20);
            return (
              <div key={r} style={{display: 'flex', gap: 18, marginBottom: 14, opacity: a, transform: `translateY(${(1 - a) * 16}px)`}}>
                <div style={{color: P.teal, fontSize: 28, fontWeight: 900, minWidth: 34}}>{i + 1}</div>
                <div style={{color: P.ink, fontSize: 27, fontWeight: 700, lineHeight: 1.25}}>{r}</div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 110,
            top: 756,
            width: 1700,
            height: 110,
            borderRadius: 30,
            background: P.ink,
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            padding: '0 36px',
            boxSizing: 'border-box',
            opacity: cta,
            transform: `translateY(${(1 - cta) * 30}px)`,
          }}
        >
          <BookIcon size={70} color={P.sun} />
          <div style={{color: '#fff', fontSize: 36, fontWeight: 900}}>
            Try the interactive tools on our web page: check your numbers and test yourself.
          </div>
        </div>
      </div>
      <Captions scene={scene} />
    </AbsoluteFill>
  );
};
