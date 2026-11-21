import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Captions, FONT, P, SceneBg, SceneTitle, at, card, endAt, lerp, pop, prog} from './theme';
import {KeyIcon, PadlockIcon, SugarIcon} from './Icons';
import type {SceneInfo} from '../timing';

const GATES = [130, 310, 490, 670];
const W = 830;

type Pt = {x: number; y: number; o: number};

const sugarPos = (j: number, frame: number, resistant: boolean): Pt => {
  const g = GATES[j % GATES.length];
  const period = resistant ? 140 : 110;
  const u = ((frame + j * 23) % period) / period;
  const x0 = 60 + ((j * 71) % 90);
  const by = 150 + Math.sin((frame + j * 17) / 14) * 20;
  const edge = Math.min(1, u * 10, (1 - u) * 10);
  if (u < 0.45) return {x: lerp(x0, g, u / 0.45), y: by, o: edge};
  if (!resistant) {
    const k = (u - 0.45) / 0.55;
    const e = k * k * (3 - 2 * k);
    return {x: g, y: lerp(by, 470, e), o: k > 0.8 ? 1 - (k - 0.8) / 0.2 : 1};
  }
  if (u < 0.65) return {x: g, y: lerp(by, 262, (u - 0.45) / 0.2), o: 1};
  if (u < 0.85) return {x: g, y: lerp(262, by, (u - 0.65) / 0.2), o: 1};
  return {x: g, y: by, o: edge};
};

const Panel: React.FC<{
  x: number;
  appear: number;
  resistant: boolean;
  title: string;
  color: string;
  sugarCount: number;
  keyCount: number;
}> = ({x, appear, resistant, title, color, sugarCount, keyCount}) => {
  const frame = useCurrentFrame();
  const a = pop(frame, appear, 26);
  const sugars = Array.from({length: Math.round(sugarCount)}, (_, j) => sugarPos(j, frame, resistant));
  const keys = Array.from({length: Math.round(keyCount)}, (_, k) => {
    const g = GATES[k % GATES.length];
    return {
      x: g - 30 + (resistant ? (Math.floor(k / GATES.length) % 3) * 26 - 20 : 0),
      y: 172 + Math.sin((frame + k * 13) / 8) * (resistant ? 9 : 4),
    };
  });
  const gap = (i: number): number => (resistant ? 6 : 34 + 24 * (0.5 + 0.5 * Math.sin(frame / 12 + i)));
  const segs: Array<[number, number]> = [];
  let left = 30;
  GATES.forEach((g, i) => {
    segs.push([left, g - gap(i) / 2]);
    left = g + gap(i) / 2;
  });
  segs.push([left, W - 30]);
  const happy = !resistant;

  return (
    <div style={{...card, position: 'absolute', left: x, top: 240, width: W, height: 600, opacity: a, transform: `translateY(${(1 - a) * 50}px) scale(${0.96 + 0.04 * a})`}}>
      <svg width={W} height={600} viewBox={`0 0 ${W} 600`}>
        <text x={40} y={56} fontSize={38} fontWeight={900} fill={color} fontFamily="Lato, sans-serif">
          {title}
        </text>
        {/* blood vessel */}
        <rect x={30} y={78} width={W - 60} height={160} rx={80} fill={P.coralL} stroke={P.coral} strokeWidth={4} />
        <text x={70} y={112} fontSize={22} fontWeight={900} fill={P.coral} fontFamily="Lato, sans-serif">
          YOUR BLOOD
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={(100 + i * 160 + frame * 1.2) % 740 + 40} cy={205 + Math.sin(i * 2 + frame / 20) * 6} rx={16} ry={9} fill={P.coral} opacity={0.35} />
        ))}
        {/* padlocks on the cell doors */}
        {GATES.map((g, i) => (
          <g key={i} transform={`translate(${g - 24} 238)`}>
            <PadlockIcon size={48} color={resistant ? P.coral : P.green} open={!resistant} />
          </g>
        ))}
        {/* cell wall with doors */}
        {segs.map(([l, r], i) => (r > l ? <rect key={i} x={l} y={296} width={r - l} height={22} rx={9} fill={color} /> : null))}
        {/* the cell */}
        <rect x={30} y={318} width={W - 60} height={256} rx={44} fill={P.greenL} />
        <text x={70} y={364} fontSize={22} fontWeight={900} fill={P.green} fontFamily="Lato, sans-serif">
          YOUR CELL
        </text>
        <g stroke={P.ink} strokeLinecap="round" fill="none">
          <circle cx={385} cy={440} r={11} fill={P.ink} />
          <circle cx={445} cy={440} r={11} fill={P.ink} />
          <path d={happy ? 'M 380 482 Q 415 520 450 482' : 'M 380 512 Q 415 476 450 512'} strokeWidth={7} />
        </g>
        {happy ? (
          <polygon points="548,430 586,430 566,462 596,462 546,520 560,480 534,480" fill={P.sun} opacity={0.5 + 0.5 * Math.sin(frame / 8) ** 2} />
        ) : (
          <text x={540} y={470} fontSize={30} fontWeight={900} fill={P.coral} fontFamily="Lato, sans-serif">
            so hungry...
          </text>
        )}
        {/* insulin keys and sugar */}
        {keys.map((k, i) => (
          <g key={`k${i}`} transform={`translate(${k.x} ${k.y})`}>
            <KeyIcon size={60} color={P.teal} />
          </g>
        ))}
        {sugars.map((s, i) => (
          <g key={`s${i}`} transform={`translate(${s.x - 17} ${s.y - 17})`} opacity={Math.max(0, s.o)}>
            <SugarIcon size={34} />
          </g>
        ))}
      </svg>
    </div>
  );
};

export const InsulinMechanismScene: React.FC<{scene: SceneInfo}> = ({scene}) => {
  const frame = useCurrentFrame();
  const s0 = at(scene, 0);
  const s1 = at(scene, 1);
  const s2 = at(scene, 2);
  const s3 = at(scene, 3);
  const e3 = endAt(scene, 3);
  const s4 = at(scene, 4);
  const e4 = endAt(scene, 4);
  const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

  const extraKeys = interpolate(frame, [s3, e3], [4, 12], clamp);
  const pile = interpolate(frame, [s4, e4], [6, 20], clamp);
  const badge = pop(frame, s4 + 20, 24);
  const legend = prog(frame, s1, 20);

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneBg tint={P.greenL} tint2={P.skyL} />
      <SceneTitle kicker="WHAT HAPPENS INSIDE" title="How sugar gets stuck in your blood" color={P.green} />
      <Panel x={100} appear={s0 + 10} resistant={false} title="Healthy: the key fits" color={P.green} sugarCount={7} keyCount={4} />
      <Panel x={990} appear={s2} resistant title="Insulin resistance: stuck locks" color={P.coral} sugarCount={frame < s4 ? 6 : pile} keyCount={frame < s3 ? 4 : extraKeys} />
      <div style={{position: 'absolute', left: 110, top: 852, color: P.mute, fontSize: 24, fontWeight: 700, opacity: legend}}>
        Yellow cubes = sugar. Teal keys = insulin.
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1330,
          top: 205,
          background: P.coral,
          color: '#fff',
          fontSize: 38,
          fontWeight: 900,
          padding: '12px 34px',
          borderRadius: 40,
          opacity: badge,
          transform: `scale(${0.7 + 0.3 * badge}) rotate(-3deg)`,
          boxShadow: '0 10px 26px rgba(242,92,120,0.45)',
        }}
      >
        = PREDIABETES
      </div>
      <Captions scene={scene} />
    </AbsoluteFill>
  );
};
