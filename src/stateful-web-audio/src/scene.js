import {commit} from './state';
import {loadSample} from './loader';

export const initialState = ({
  parts: {},
  master: {},
  shufflePercentage: 0,
  tempo: 120,
});

const loadSamples = ctx => {
  const {state: {scene: {parts}}} = ctx;
  Object.keys(parts).forEach(part => {
    loadSample(ctx, parts[part].sample);
  });
};

export const setScene = (ctx, scene) => {
  commit(ctx, 'scene', scene);
  loadSamples(ctx);
};
