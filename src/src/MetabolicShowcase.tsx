import React from 'react';
import {Composition} from 'remotion';
import {MetabolicShowcase} from './MetabolicShowcase';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_DURATION_IN_FRAMES = 4100;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MetabolicMaster"
        component={MetabolicShowcase}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          voiceoverSrc: 'voiceover.mp3',
          ambientSrc: 'ambient-bed.mp3',
        }}
      />
    </>
  );
};
