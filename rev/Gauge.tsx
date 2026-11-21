import React from 'react';
import {P} from './theme';

const CX = 300;
const CY = 300;
const R = 235;

const polar = (f: number, r: number): {x: number; y: number} => {
  const a = Math.PI * (1 - f);
  return {x: CX + r * Math.cos(a), y: CY - r * Math.sin(a)};
};
const arc = (f0: number, f1: number): string => {
  const a = polar(f0, R);
  const b = polar(f1, R);
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
};

/** Semi-circle 0-10 score gauge. drawA/drawB = 0..1 draw progress of each zone, needle = 0..1 position. */
export const Gauge: React.FC<{width: number; drawA: number; drawB: number; needle: number; labels?: boolean}> = ({
  width,
  drawA,
  drawB,
  needle,
  labels = true,
}) => {
  const tip = polar(needle, 195);
  const t1 = polar(0.5, 262);
  const t2 = polar(0.5, 312);
  const l0 = polar(0, R);
  const l10 = polar(1, R);
  return (
    <svg width={width} height={(width * 360) / 600} viewBox="0 0 600 360">
      <path d={arc(0, 1)} fill="none" stroke="rgba(18,38,63,0.07)" strokeWidth={52} />
      <path d={arc(0, 0.5)} fill="none" stroke={P.green} strokeWidth={52} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - drawA} />
      <path d={arc(0.5, 1)} fill="none" stroke={P.coral} strokeWidth={52} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - drawB} />
      <line x1={t1.x} y1={t1.y} x2={t2.x} y2={t2.y} stroke={P.ink} strokeWidth={5} />
      {labels ? (
        <>
          <text x={t2.x} y={t2.y - 10} textAnchor="middle" fontSize={34} fontWeight={900} fill={P.ink} fontFamily="Lato, sans-serif">
            5
          </text>
          <text x={l0.x} y={l0.y + 44} textAnchor="middle" fontSize={28} fontWeight={700} fill={P.mute} fontFamily="Lato, sans-serif">
            0
          </text>
          <text x={l10.x} y={l10.y + 44} textAnchor="middle" fontSize={28} fontWeight={700} fill={P.mute} fontFamily="Lato, sans-serif">
            10
          </text>
        </>
      ) : null}
      <line x1={CX} y1={CY} x2={tip.x} y2={tip.y} stroke={P.ink} strokeWidth={11} strokeLinecap="round" />
      <circle cx={CX} cy={CY} r={24} fill={P.ink} />
      <circle cx={CX} cy={CY} r={9} fill="#fff" />
    </svg>
  );
};
