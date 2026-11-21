import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Captions, FONT, P, SceneBg, SceneTitle, at, card, endAt, pop, prog} from './theme';
import {Gauge} from './Gauge';
import type {SceneInfo} from '../timing';

const LINES: ReadonlyArray<{t: string; c: string}> = [
  {t: 'If your score is', c: P.ink},
  {t: '5 or higher,', c: P.coral},
  {t: 'you are at high risk of', c: P.ink},
  {t: 'developing prediabetes.', c: P.teal},
];

export const ScoreHookScene: React.FC<{scene: SceneInfo}> = ({scene}) => {
  const frame = useCurrentFrame();
  const s0 = at(scene, 0);
  const e0 = endAt(scene, 0);
  const s1 = at(scene, 1);
  const s2 = at(scene, 2);

  const needle = interpolate(frame, [s0, e0], [0.02, 0.57], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const big = pop(frame, s0 + Math.round((e0 - s0) * 0.35), 24);
  const chart = prog(frame, s1 + 6, 40);
  const cardA = pop(frame, s1, 22);
  const pill = pop(frame, s2, 22);

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneBg tint={P.coralL} tint2={P.sunL} />
      <SceneTitle kicker="YOUR RISK SCORE" title="What a score of 5 means" color={P.coral} />

      <div style={{position: 'absolute', left: 90, top: 260, opacity: prog(frame, 6, 24)}}>
        <Gauge width={760} drawA={prog(frame, 6, 30)} drawB={prog(frame, 22, 30)} needle={needle} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 90,
          width: 760,
          top: 640,
          textAlign: 'center',
          color: P.coral,
          fontSize: 150,
          fontWeight: 900,
          lineHeight: 1,
          transform: `scale(${big})`,
          opacity: big,
        }}
      >
        5+
      </div>

      <div style={{position: 'absolute', left: 900, top: 255}}>
        {LINES.map((l, i) => {
          const a = prog(frame, s0 + (i * (e0 - s0)) / 4, 16);
          return (
            <div
              key={l.t}
              style={{color: l.c, fontSize: 72, fontWeight: 900, lineHeight: 1.14, opacity: a, transform: `translateX(${(1 - a) * 60}px)`}}
            >
              {l.t}
            </div>
          );
        })}
      </div>

      <div
        style={{
          ...card,
          position: 'absolute',
          left: 900,
          top: 640,
          width: 900,
          height: 200,
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          padding: '0 34px',
          opacity: cardA,
          transform: `translateY(${(1 - cardA) * 40}px)`,
        }}
      >
        <svg width={330} height={150} viewBox="0 0 330 150">
          <polyline points="8,128 60,118 110,122 160,92 215,66 270,38 322,16" fill="none" stroke={P.coral} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - chart} />
          <circle cx={322} cy={16} r={13} fill={P.coral} opacity={chart} />
        </svg>
        <div style={{color: P.ink, fontSize: 40, fontWeight: 900, lineHeight: 1.2}}>
          Your blood sugar may already be creeping up
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 800,
          background: P.ink,
          color: '#fff',
          fontSize: 36,
          fontWeight: 900,
          padding: '14px 36px',
          borderRadius: 40,
          opacity: pill,
          transform: `scale(${0.8 + pill * 0.2})`,
          transformOrigin: 'left center',
        }}
      >
        Let's break it down →
      </div>
      <Captions scene={scene} />
    </AbsoluteFill>
  );
};
