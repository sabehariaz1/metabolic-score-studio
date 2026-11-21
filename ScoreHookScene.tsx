import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, prog} from './theme';

const R = 200;
const CIRC = 2 * Math.PI * R;

const LINES: ReadonlyArray<{t: string; c: string}> = [
  {t: 'If your score is', c: C.white},
  {t: '5 or higher,', c: C.coral},
  {t: 'you are at high risk of', c: C.white},
  {t: 'developing prediabetes.', c: C.amber},
];

export const ScoreHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [8, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const n = Math.round(5 * p);
  const pulse = frame > 95 ? ((frame - 95) % 70) / 70 : 0;
  const labelA = prog(frame, 4, 20);

  return (
    <AbsoluteFill
      style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 110, fontFamily: FONT}}
    >
      <div style={{position: 'relative', width: 520, height: 520}}>
        <svg width={520} height={520} viewBox="0 0 520 520">
          <circle cx={260} cy={260} r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={30} />
          <circle
            cx={260}
            cy={260}
            r={R}
            fill="none"
            stroke="rgba(239,71,111,0.22)"
            strokeWidth={62}
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - p)}
            transform="rotate(-90 260 260)"
          />
          <circle
            cx={260}
            cy={260}
            r={R}
            fill="none"
            stroke={C.coral}
            strokeWidth={30}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - p)}
            transform="rotate(-90 260 260)"
          />
          {frame > 95 ? (
            <circle
              cx={260}
              cy={260}
              r={R + 24 + pulse * 56}
              fill="none"
              stroke={C.coral}
              strokeWidth={4}
              opacity={(1 - pulse) * 0.55}
            />
          ) : null}
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
          <div style={{color: C.muted, fontSize: 28, fontWeight: 700, letterSpacing: 3, opacity: labelA}}>
            YOUR RISK SCORE
          </div>
          <div style={{color: C.white, fontSize: 190, fontWeight: 700, lineHeight: 1.05}}>
            {p >= 0.999 ? '5+' : String(n)}
          </div>
        </div>
      </div>

      <div>
        {LINES.map((l, i) => {
          const a = prog(frame, 8 + i * 10, 20);
          return (
            <div
              key={l.t}
              style={{
                color: l.c,
                fontSize: 68,
                fontWeight: 700,
                lineHeight: 1.18,
                opacity: a,
                transform: `translateX(${(1 - a) * 50}px)`,
              }}
            >
              {l.t}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
