import React from 'react';
import {interpolate, staticFile, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {ScoreHookScene} from './components/ScoreHookScene';
import {PrevalenceAndGaugeScene} from './components/PrevalenceAndGaugeScene';
import {InsulinMechanismScene} from './components/InsulinMechanismScene';
import {RiskMatrixScene} from './components/RiskMatrixScene';
import {DiagnosticsScene} from './components/DiagnosticsScene';
import {PreventionAndRefsScene} from './components/PreventionAndRefsScene';

export const SCENE_DURATIONS: readonly number[] = [210, 240, 270, 240, 240, 330];
export const TRANSITION_FRAMES = 15;
const SCENES: ReadonlyArray<React.FC> = [ScoreHookScene, PrevalenceAndGaugeScene, InsulinMechanismScene, RiskMatrixScene, DiagnosticsScene, PreventionAndRefsScene];

export const MetabolicShowcase: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  const items = SCENES.flatMap((Comp, i) => {
    const seq = (
      <TransitionSeries.Sequence key={`s${i}`} durationInFrames={SCENE_DURATIONS[i] ?? 0}>
        <Comp />
      </TransitionSeries.Sequence>
    );
    return i < SCENES.length - 1
      ? [seq, <TransitionSeries.Transition key={`t${i}`} presentation={fade()} timing={linearTiming({durationInFrames: TRANSITION_FRAMES})} />]
      : [seq];
  });
  return (
    <>
      <TransitionSeries>{items}</TransitionSeries>
      <Audio src={staticFile('voiceover.mp3')} volume={1} />
      <Audio
        src={staticFile('ambient-bed.mp3')}
        loop
        volume={(f) =>
          interpolate(f, [0, 30, durationInFrames - 30, durationInFrames], [0, 0.11, 0.11, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
        }
      />
    </>
  );
};
