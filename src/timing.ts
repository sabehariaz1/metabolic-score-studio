import data from './timing.json';

export const FPS: number = data.fps;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TRANSITION_FRAMES: number = data.transition;
export const SCENES: ReadonlyArray<{id: string; frames: number; text: string}> = data.scenes;

// Scenes overlap by TRANSITION_FRAMES at every cut:
// total = sum(scene frames) - (scenes - 1) * transition frames
// 270 + 540 + 600 + 690 + 750 + 1400 = 4250;  4250 - 5 * 30 = 4100 frames (136.7 s at 30 fps)
export const TOTAL_DURATION_IN_FRAMES: number =
  SCENES.reduce((sum, s) => sum + s.frames, 0) - (SCENES.length - 1) * TRANSITION_FRAMES;
