import React from 'react';
import {Composition} from 'remotion';
import {MetabolicShowcase} from './MetabolicShowcase';
import {FPS, HEIGHT, TOTAL_DURATION_IN_FRAMES, WIDTH} from './timing';

export const Root: React.FC = () => {
  return (
    <Composition
      id="MetabolicMaster"
      component={MetabolicShowcase}
      durationInFrames={TOTAL_DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{voiceoverSrc: 'voiceover.mp3', ambientSrc: 'ambient-bed.mp3'}}
    />
  );
};
