import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, SceneTitle, prog} from './theme';

const CX = 350;
const CY = 390;
const RAD = 280;

const polar = (f: number, r: number): {x: number; y: number} => {
  const ang = Math.PI * (1 - f);
  return {x: CX + r * Math.cos(ang), y: CY - r * Math.sin(ang)};
};

const arcPath = (f0: number, f1: number): string => {
  const a = polar(f0, RAD);
  const b = polar(f1, RAD);
  return `M ${a.x} ${a.y} A ${RAD} ${RAD} 0 0 1 ${b.x} ${b.y}`;
};

const StatCard: React.FC<{y: number; start: number; big: string; label: string; color: string}> = ({
  y,
  start,
  big,
  label,
  color,
}) => {
  const frame = useCurrentFrame();
  const a = prog(frame, start, 24);
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: y,
        width: 800,
        height: 250,
        borderRadius: 32,
        background: C.card,
        border: `2px solid ${C.line}`,
        display: 'flex',
        alignItems: 'center',
        gap: 36,
        padding: '0 44px',
        opacity: a,
        transform: `translateY(${(1 - a) * 40}px)`,
        boxSizing: 'border-box',
      }}
    >
      <div style={{color, fontSize: 112, fontWeight: 700, minWidth: 300}}>{big}</div>
      <div style={{color: C.white, fontSize: 36, lineHeight: 1.3}}>{label}</div>
    </div>
  );
};

export const PrevalenceAndGaugeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const c1 = prog(frame, 30, 50);
  const c2 = prog(frame, 120, 50);
  const drawA = prog(frame, 150, 40);
  const drawB = prog(frame, 185, 40);
  const needle = interpolate(frame, [230, 330], [0, 0.57], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.3)),
  });
  const gaugeA = prog(frame, 140, 24);
  const verdictA = prog(frame, 335, 24);
  const tipPt = polar(needle, 235);
  const tickIn = polar(0.5, 252);
  const tickOut = polar(0.5, 322);
  const tickLbl = polar(0.5, 352);
  const left0 = polar(0, RAD);
  const right10 = polar(1, RAD);

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneTitle kicker="HOW COMMON IS IT?" title="Millions have it, most don't know" />

      <StatCard
        y={290}
        start={20}
        big={`${Math.round(98 * c1)}M`}
        label="U.S. adults have prediabetes (more than 1 in 3)"
        color={C.amber}
      />
      <StatCard
        y={580}
        start={110}
        big={`${Math.round(80 * c2)}%+`}
        label="of them don't know they have it"
        color={C.coral}
      />
      <div style={{position: 'absolute', left: 120, top: 862, color: C.muted, fontSize: 24, opacity: prog(frame, 160, 20)}}>
        Source: CDC, Prediabetes Risk Test
      </div>

      <div style={{position: 'absolute', left: 1020, top: 250, width: 700, opacity: gaugeA}}>
        <div style={{color: C.teal, fontSize: 26, fontWeight: 700, letterSpacing: 4, marginBottom: 6}}>
          THE RISK SCORE (0 TO 10)
        </div>
        <svg width={700} height={470} viewBox="0 0 700 470">
          <path
            d={arcPath(0, 0.5)}
            fill="none"
            stroke={C.green}
            strokeWidth={44}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - drawA}
          />
          <path
            d={arcPath(0.5, 1)}
            fill="none"
            stroke={C.coral}
            strokeWidth={44}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - drawB}
          />
          <line x1={tickIn.x} y1={tickIn.y} x2={tickOut.x} y2={tickOut.y} stroke={C.white} strokeWidth={4} />
          <text x={tickLbl.x} y={tickLbl.y} fill={C.white} fontSize={34} fontWeight={700} textAnchor="middle" fontFamily={FONT}>
            5
          </text>
          <text x={left0.x} y={left0.y + 48} fill={C.muted} fontSize={28} textAnchor="middle" fontFamily={FONT}>
            0
          </text>
          <text x={right10.x} y={right10.y + 48} fill={C.muted} fontSize={28} textAnchor="middle" fontFamily={FONT}>
            10
          </text>
          <line
            x1={CX}
            y1={CY}
            x2={tipPt.x}
            y2={tipPt.y}
            stroke={C.white}
            strokeWidth={10}
            strokeLinecap="round"
            opacity={prog(frame, 220, 12)}
          />
          <circle cx={CX} cy={CY} r={22} fill={C.white} />
          <circle cx={CX} cy={CY} r={9} fill={C.bg1} />
        </svg>
        <div
          style={{
            textAlign: 'center',
            color: C.coral,
            fontSize: 44,
            fontWeight: 700,
            opacity: verdictA,
            transform: `translateY(${(1 - verdictA) * 16}px)`,
          }}
        >
          5 or higher = high risk
        </div>
      </div>
    </AbsoluteFill>
  );
};
