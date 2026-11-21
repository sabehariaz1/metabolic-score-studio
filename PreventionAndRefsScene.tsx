import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, SceneTitle, prog} from './theme';

const SWITCH_AT = 880;
const RING_R = 190;
const RING_C = 2 * Math.PI * RING_R;

const ACTIONS: ReadonlyArray<{big: string; t: string; c: string}> = [
  {big: '7%', t: 'weight loss goal in the Diabetes Prevention Program', c: C.green},
  {big: '150', t: 'minutes of brisk activity a week', c: C.teal},
  {big: 'Eat', t: 'more vegetables, whole grains and lean protein; fewer sugary drinks', c: C.amber},
  {big: 'Test', t: 'a score of 5 or higher? Ask your doctor for a blood test', c: C.coral},
];

const REFS: ReadonlyArray<string> = [
  'Centers for Disease Control and Prevention. Prediabetes Risk Test. cdc.gov/prediabetes/risktest',
  'Centers for Disease Control and Prevention. National Diabetes Prevention Program. cdc.gov/diabetes/prevention-type-2',
  'Diabetes Prevention Program Research Group. The Diabetes Prevention Program (DPP): description of lifestyle intervention. Diabetes Care 2002;25(12):2165–2171 (NIH/PMC1282458).',
  'Knowler WC, et al. Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin. N Engl J Med 2002;346:393–403.',
  'American Diabetes Association. Standards of Care in Diabetes, Section 2: Diagnosis and Classification of Diabetes. Diabetes Care.',
  'Mayo Clinic. Prediabetes: Symptoms and causes. mayoclinic.org',
];

export const PreventionAndRefsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const partA = 1 - prog(frame, SWITCH_AT - 30, 30);
  const partB = prog(frame, SWITCH_AT, 30);
  const ring = interpolate(frame, [40, 200], [0, 0.58], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const pct = Math.round((ring / 0.58) * 58);

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <div style={{opacity: partA}}>
        <SceneTitle kicker="THE GOOD NEWS" title="Prediabetes can often be reversed" />
        <div style={{position: 'absolute', left: 150, top: 300, width: 460, height: 460}}>
          <svg width={460} height={460} viewBox="0 0 460 460">
            <circle cx={230} cy={230} r={RING_R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={34} />
            <circle
              cx={230}
              cy={230}
              r={RING_R}
              fill="none"
              stroke={C.green}
              strokeWidth={34}
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - ring)}
              transform="rotate(-90 230 230)"
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{color: C.white, fontSize: 118, fontWeight: 700, lineHeight: 1}}>{pct}%</div>
            <div style={{color: C.green, fontSize: 30, fontWeight: 700, marginTop: 8}}>lower risk</div>
          </div>
        </div>
        <div style={{position: 'absolute', left: 110, top: 790, width: 540, textAlign: 'center', color: C.muted, fontSize: 24, lineHeight: 1.35}}>
          of developing type 2 diabetes with intensive lifestyle change (Diabetes Prevention Program, NEJM 2002)
        </div>
        {ACTIONS.map((a, i) => {
          const p = prog(frame, 200 + i * 60, 24);
          return (
            <div
              key={a.big}
              style={{
                position: 'absolute',
                left: 760,
                top: 290 + i * 148,
                width: 1040,
                height: 124,
                boxSizing: 'border-box',
                borderRadius: 26,
                background: C.card,
                border: `2px solid ${C.line}`,
                display: 'flex',
                alignItems: 'center',
                gap: 32,
                padding: '0 34px',
                opacity: p,
                transform: `translateX(${(1 - p) * 60}px)`,
              }}
            >
              <div style={{color: a.c, fontSize: 58, fontWeight: 700, minWidth: 170}}>{a.big}</div>
              <div style={{color: C.white, fontSize: 31, lineHeight: 1.25}}>{a.t}</div>
            </div>
          );
        })}
      </div>

      <div style={{opacity: partB}}>
        <SceneTitle kicker="SOURCES" title="References" />
        <div style={{position: 'absolute', left: 140, top: 250, width: 1640}}>
          {REFS.map((r, i) => {
            const a = prog(frame, SWITCH_AT + 20 + i * 18, 22);
            return (
              <div
                key={r}
                style={{
                  display: 'flex',
                  gap: 22,
                  marginBottom: 22,
                  opacity: a,
                  transform: `translateY(${(1 - a) * 20}px)`,
                }}
              >
                <div style={{color: C.teal, fontSize: 28, fontWeight: 700, minWidth: 40}}>{i + 1}</div>
                <div style={{color: C.white, fontSize: 28, lineHeight: 1.3}}>{r}</div>
              </div>
            );
          })}
        </div>
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
            opacity: prog(frame, SWITCH_AT + 150, 24),
          }}
        >
          Educational content, not a diagnosis. Talk to your doctor about a blood test.
        </div>
      </div>
    </AbsoluteFill>
  );
};
