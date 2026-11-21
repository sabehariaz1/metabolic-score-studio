import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Audio} from '@remotion/media';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {ScoreHookScene} from './components/ScoreHookScene';
import {PrevalenceAndGaugeScene} from './components/PrevalenceAndGaugeScene';
import {InsulinMechanismScene} from './components/InsulinMechanismScene';
import {RiskMatrixScene} from './components/RiskMatrixScene';
import {DiagnosticsScene} from './components/DiagnosticsScene';
import {PreventionAndRefsScene} from './components/PreventionAndRefsScene';

export interface MetabolicShowcaseProps {
  voiceoverSrc: string;
  ambientSrc: string;
}

export const MetabolicShowcase: React.FC<MetabolicShowcaseProps> = ({
  voiceoverSrc,
  ambientSrc,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  const ambientVolume = interpolate(
    frame,
    [0, fps * 2, durationInFrames - fps * 5, durationInFrames],
    [0, 0.11, 0.11, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  return (
    <AbsoluteFill style={{backgroundColor: '#EAF3F8', fontFamily: 'DejaVu Serif, Georgia, serif'}}>
      <Audio src={staticFile(voiceoverSrc)} volume={1} />
      <Audio src={staticFile(ambientSrc)} volume={ambientVolume} loop />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={240}>
          <ScoreHookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: 30})}
        />

        <TransitionSeries.Sequence durationInFrames={480}>
          <PrevalenceAndGaugeScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({direction: 'from-right'})}
          timing={linearTiming({durationInFrames: 30})}
        />

        <TransitionSeries.Sequence durationInFrames={480}>
          <InsulinMechanismScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: 30})}
        />

        <TransitionSeries.Sequence durationInFrames={570}>
          <RiskMatrixScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({direction: 'from-bottom'})}
          timing={linearTiming({durationInFrames: 30})}
        />

        <TransitionSeries.Sequence durationInFrames={570}>
          <DiagnosticsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: 30})}
        />

        <TransitionSeries.Sequence durationInFrames={1410}>
          <PreventionAndRefsScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};