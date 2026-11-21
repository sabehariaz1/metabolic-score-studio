import React from 'react';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {Backdrop, FONT} from './components/theme';
import {ScoreHookScene} from './components/ScoreHookScene';
import {PrevalenceAndGaugeScene} from './components/PrevalenceAndGaugeScene';
import {InsulinMechanismScene} from './components/InsulinMechanismScene';
import {RiskMatrixScene} from './components/RiskMatrixScene';
import {DiagnosticsScene} from './components/DiagnosticsScene';
import {PreventionAndRefsScene} from './components/PreventionAndRefsScene';
import {SCENES, TRANSITION_FRAMES} from './timing';

export type MetabolicShowcaseProps = {
  voiceoverSrc: string;
  ambientSrc: string;
};

export const MetabolicShowcase: React.FC<MetabolicShowcaseProps> = ({voiceoverSrc, ambientSrc}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  // Subtle bed: fades in over 2 s, sits at 0.11, fades out over the last 5 s.
  const ambientVolume = interpolate(
    frame,
    [0, fps * 2, durationInFrames - fps * 5, durationInFrames],
    [0, 0.11, 0.11, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const timing = linearTiming({durationInFrames: TRANSITION_FRAMES});

  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <Backdrop />
      <Audio src={staticFile(voiceoverSrc)} volume={1} />
      <Audio loop src={staticFile(ambientSrc)} volume={ambientVolume} />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES[0].frames}>
          <ScoreHookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES[1].frames}>
          <PrevalenceAndGaugeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES[2].frames}>
          <InsulinMechanismScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES[3].frames}>
          <RiskMatrixScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES[4].frames}>
          <DiagnosticsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES[5].frames}>
          <PreventionAndRefsScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
