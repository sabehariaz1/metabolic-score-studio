import React from 'react';
import {Composition} from 'remotion';
import {MetabolicShowcase, SCENE_DURATIONS, TRANSITION_FRAMES} from './MetabolicShowcase';

// Sum of scenes minus one overlap per transition: 1530 - 5 * 15 = 1455 frames (48.5 s).
export const TOTAL_DURATION_IN_FRAMES =
  SCENE_DURATIONS.reduce((a, b) => a + b, 0) - TRANSITION_FRAMES * (SCENE_DURATIONS.length - 1);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="MetabolicMaster"
    component={MetabolicShowcase}
    durationInFrames={TOTAL_DURATION_IN_FRAMES}
    fps={30}
    width={1920}
    height={1080}
  />
);
