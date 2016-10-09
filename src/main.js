import {
  init,
  start,
  setScene,
  createMixer,
  createInsertEffect,
  createWaveshaper,
  addInsert,
  getContext,
  setNodeGain,
  getInsert,
  setCurveAmount,
  play,
  pause,
  isPlaying,
} from './stateful-web-audio';
import {init as initEvents} from './events';
import {createScene} from './scene';
import tracks from './tracks';

const newScene = ctx => {
  const scene = createScene();
  setScene(ctx, scene);
  setCurveAmount(getInsert(ctx, 'master', 0), scene.master.distortionAmount);
};

const createMasterEffects = ctx => {
  const context = getContext(ctx);
  const masterDistortion = createInsertEffect({context,
    effect: createWaveshaper({
      context, amount: 40
    })
  });
  addInsert(ctx, 'master', masterDistortion);
  setNodeGain(masterDistortion.wet, 0.4);
  setNodeGain(masterDistortion.dry, 0.7);
};

const toggle = ctx => {
  const playing = isPlaying(ctx);
  if (playing) {
    pause(ctx);
  } else {
    play(ctx);
  }
  return !playing;
};

const ctx = init();
createMixer(ctx, {
  [tracks.BD]: {gain: 0.7},
  [tracks.CL]: {gain: 0.5},
  [tracks.SN]: {gain: 0.4},
  [tracks.ST]: {gain: 0.3},
  [tracks.BS]: {gain: 0.4},
  [tracks.RD]: {gain: 0.2},
});
createMasterEffects(ctx);
newScene(ctx);
start(ctx);

const actions = {
  newScene: () => newScene(ctx),
  toggle: () => toggle(ctx),
};
initEvents(document, actions);
