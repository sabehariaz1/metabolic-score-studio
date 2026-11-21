import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT, SceneTitle, lerp, prog} from './theme';

const GATES = [130, 270, 410, 550, 690];
const PANEL_W = 760;

type Dot = {x: number; y: number; o: number};

const dotPos = (j: number, frame: number, resistant: boolean): Dot => {
  const g = GATES[j % GATES.length];
  const period = resistant ? 130 : 105;
  const u = ((frame + j * 19) % period) / period;
  const startX = 40 + ((j * 53) % 60);
  const bandY = 150 + Math.sin((frame + j * 21) / 13) * 16;
  const edge = Math.min(1, u * 10, (1 - u) * 10);

  if (u < 0.45) {
    const k = u / 0.45;
    return {x: lerp(startX, g, k), y: bandY, o: edge};
  }
  if (!resistant) {
    const k = (u - 0.45) / 0.55;
    const e = k * k * (3 - 2 * k);
    return {x: g, y: lerp(bandY, 420, e), o: k > 0.8 ? 1 - (k - 0.8) / 0.2 : 1};
  }
  // insulin resistance: sugar bumps against the closed gate and bounces back
  if (u < 0.65) {
    const k = (u - 0.45) / 0.2;
    return {x: g, y: lerp(bandY, 280, k), o: 1};
  }
  if (u < 0.85) {
    const k = (u - 0.65) / 0.2;
    return {x: g, y: lerp(280, bandY, k), o: 1};
  }
  return {x: g, y: bandY, o: edge};
};

const Panel: React.FC<{
  x: number;
  start: number;
  resistant: boolean;
  title: string;
  sub: string;
  accent: string;
  chip: string;
}> = ({x, start, resistant, title, sub, accent, chip}) => {
  const frame = useCurrentFrame();
  const a = prog(frame, start, 26);
  const nDots = resistant ? 16 : 8;
  const dots = Array.from({length: nDots}, (_, j) => dotPos(j, frame, resistant));
  const keyCount = resistant ? 10 : 5;
  const keys = Array.from({length: keyCount}, (_, k) => {
    const g = GATES[k % GATES.length];
    const side = resistant ? (k < 5 ? -26 : 26) : 0;
    return {x: g + side, y: 258 + Math.sin((frame + k * 11) / 9) * 5};
  });

  // membrane segments between gates
  const gapOf = (i: number): number =>
    resistant ? 6 : 30 + 22 * (0.5 + 0.5 * Math.sin(frame / 11 + i));
  const bounds: Array<[number, number]> = [];
  let left = 20;
  GATES.forEach((g, i) => {
    bounds.push([left, g - gapOf(i) / 2]);
    left = g + gapOf(i) / 2;
  });
  bounds.push([left, PANEL_W - 20]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: 214,
        width: PANEL_W,
        opacity: a,
        transform: `translateY(${(1 - a) * 36}px)`,
      }}
    >
      <div style={{color: accent, fontSize: 40, fontWeight: 700}}>{title}</div>
      <div style={{color: C.muted, fontSize: 26, marginTop: 4, marginBottom: 10}}>{sub}</div>
      <svg width={PANEL_W} height={500} viewBox={`0 0 ${PANEL_W} 500`}>
        <rect x={20} y={70} width={PANEL_W - 40} height={150} rx={26} fill="rgba(239,71,111,0.10)" />
        <text x={44} y={104} fill={C.muted} fontSize={22} fontWeight={700} fontFamily={FONT}>
          BLOODSTREAM
        </text>
        <rect x={20} y={318} width={PANEL_W - 40} height={170} rx={26} fill="rgba(46,196,182,0.10)" />
        <text x={44} y={470} fill={C.muted} fontSize={22} fontWeight={700} fontFamily={FONT}>
          CELL
        </text>
        {bounds.map(([l, r], i) =>
          r > l ? <rect key={i} x={l} y={296} width={r - l} height={22} rx={8} fill={accent} opacity={0.9} /> : null,
        )}
        {keys.map((k, i) => (
          <rect
            key={i}
            x={-9}
            y={-9}
            width={18}
            height={18}
            transform={`translate(${k.x} ${k.y}) rotate(45)`}
            fill={C.teal}
          />
        ))}
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={12} fill={C.amber} opacity={Math.max(0, d.o)} />
        ))}
      </svg>
      <div
        style={{
          marginTop: 4,
          display: 'inline-block',
          background: 'rgba(255,255,255,0.09)',
          borderRadius: 28,
          padding: '10px 26px',
          color: C.white,
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        {chip}
      </div>
    </div>
  );
};

export const InsulinMechanismScene: React.FC = () => {
  const frame = useCurrentFrame();
  const keyA = prog(frame, 40, 20);
  const resultA = prog(frame, 400, 26);
  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneTitle kicker="INSIDE THE BODY" title="From insulin resistance to prediabetes" />
      <Panel
        x={120}
        start={30}
        resistant={false}
        title="Healthy response"
        sub="Insulin unlocks the cell"
        accent={C.green}
        chip="Sugar moves into the cells"
      />
      <Panel
        x={1040}
        start={230}
        resistant
        title="Insulin resistance"
        sub="Cells ignore insulin, so the pancreas makes more"
        accent={C.coral}
        chip="Sugar builds up in the blood"
      />
      <div style={{position: 'absolute', left: 120, top: 1000, color: C.muted, fontSize: 26, opacity: keyA}}>
        <span style={{color: C.amber}}>●</span> sugar (glucose) &nbsp;&nbsp;
        <span style={{color: C.teal}}>◆</span> insulin
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1000,
          textAlign: 'center',
          color: C.white,
          fontSize: 38,
          fontWeight: 700,
          opacity: resultA,
        }}
      >
        Result: higher blood sugar than normal. That is prediabetes.
      </div>
    </AbsoluteFill>
  );
};
