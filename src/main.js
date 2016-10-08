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
  setNodeGain(masterDistortion.wet, 0.3);
  setNodeGain(masterDistortion.dry, 0.7);
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
initEvents(document, () => newScene(ctx));
