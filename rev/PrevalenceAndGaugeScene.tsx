import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Captions, FONT, P, SceneBg, SceneTitle, at, card, endAt, pop, prog} from './theme';
import {PersonIcon} from './Icons';
import {Gauge} from './Gauge';
import type {SceneInfo} from '../timing';

const CARD_Y = 250;
const CARD_H = 590;
const CARD_W = 540;

export const PrevalenceAndGaugeScene: React.FC<{scene: SceneInfo}> = ({scene}) => {
  const frame = useCurrentFrame();
  const s0 = at(scene, 0);
  const s1 = at(scene, 1);
  const e1 = endAt(scene, 1);
  const s2 = at(scene, 2);
  const e2 = endAt(scene, 2);
  const s3 = at(scene, 3);
  const e3 = endAt(scene, 3);

  const aA = pop(frame, s0 + 10, 24);
  const aB = pop(frame, s2, 24);
  const aC = pop(frame, s3, 24);
  const count = prog(frame, s1, Math.max(20, e1 - s1));
  const needle = interpolate(frame, [s3 + 10, e3], [0, 0.57], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <SceneBg tint={P.skyL} tint2={P.purpleL} />
      <SceneTitle kicker="HOW COMMON IS IT?" title="You are not alone" color={P.purple} />

      {/* Card A: 1 in 3 */}
      <div style={{...card, position: 'absolute', left: 110, top: CARD_Y, width: CARD_W, height: CARD_H, opacity: aA, transform: `translateY(${(1 - aA) * 50}px)`}}>
        <div style={{textAlign: 'center', marginTop: 24, color: P.coral, fontSize: 104, fontWeight: 900, lineHeight: 1}}>1 in 3</div>
        <div style={{textAlign: 'center', color: P.mute, fontSize: 28, fontWeight: 700, marginTop: 4}}>adults have prediabetes</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 118px)', justifyContent: 'center', gap: 6, marginTop: 20}}>
          {Array.from({length: 9}, (_, i) => {
            const hot = i < 3;
            const t = prog(frame, s1 + (i * (e1 - s1)) / 6, 14);
            return (
              <div key={i} style={{display: 'flex', justifyContent: 'center', transform: `scale(${hot ? 1 + 0.12 * t : 1})`}}>
                <PersonIcon size={104} color={hot && t > 0.3 ? P.coral : '#C9D6E4'} />
              </div>
            );
          })}
        </div>
        <div style={{textAlign: 'center', color: P.ink, fontSize: 34, fontWeight: 900, marginTop: 10}}>
          About {Math.round(98 * count)} million in the U.S.
        </div>
      </div>

      {/* Card B: 8 in 10 don't know */}
      <div style={{...card, position: 'absolute', left: 110 + CARD_W + 40, top: CARD_Y, width: CARD_W, height: CARD_H, opacity: aB, transform: `translateY(${(1 - aB) * 50}px)`}}>
        <div style={{textAlign: 'center', marginTop: 24, color: P.sun, fontSize: 104, fontWeight: 900, lineHeight: 1}}>8 in 10</div>
        <div style={{textAlign: 'center', color: P.mute, fontSize: 28, fontWeight: 700, marginTop: 4}}>don't know they have it</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 96px)', justifyContent: 'center', gap: 6, marginTop: 38}}>
          {Array.from({length: 10}, (_, i) => {
            const unaware = i < 8;
            const t = prog(frame, s2 + (i * (e2 - s2)) / 9, 12);
            return (
              <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                <PersonIcon size={92} color={unaware && t > 0.3 ? P.sun : '#C9D6E4'} q={unaware && t > 0.6} />
              </div>
            );
          })}
        </div>
        <div style={{textAlign: 'center', color: P.mute, fontSize: 24, marginTop: 28}}>Source: CDC</div>
      </div>

      {/* Card C: the score */}
      <div style={{...card, position: 'absolute', left: 110 + 2 * (CARD_W + 40), top: CARD_Y, width: CARD_W, height: CARD_H, opacity: aC, transform: `translateY(${(1 - aC) * 50}px)`}}>
        <div style={{textAlign: 'center', marginTop: 24, color: P.ink, fontSize: 46, fontWeight: 900, lineHeight: 1.1}}>Your risk score</div>
        <div style={{textAlign: 'center', color: P.mute, fontSize: 28, fontWeight: 700, marginTop: 4}}>from 0 to 10</div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
          <Gauge width={470} drawA={prog(frame, s3 + 4, 26)} drawB={prog(frame, s3 + 22, 26)} needle={needle} />
        </div>
        <div style={{textAlign: 'center', color: P.coral, fontSize: 54, fontWeight: 900, marginTop: 6}}>5 or higher</div>
        <div style={{textAlign: 'center', color: P.ink, fontSize: 30, fontWeight: 700}}>= high-risk zone</div>
      </div>
      <Captions scene={scene} />
    </AbsoluteFill>
  );
};
