import {startTick} from './src/worker';
import * as seq from './src/sequencer';
import * as scene from './src/scene';

export const start = ctx => {
  startTick(ctx, seq.tick);
  seq.start(ctx);
};

const initialState = {
  instances: {},
  sequencer: seq.initialState,
  scene: scene.initialState,
};

const reinitInstances = state => {
  // TODO
  return state;
};

const addInstance = (state, id, name) => ({
  ...state,
  instances: {
    ...state.instances,
    [id]: {id, name}
  }
});

const initAudioContext = runtime => {
  runtime.instances.context = new (window.AudioContext || window.webkitAudioContext)();
};

const reinit = oldState => {
  const state = oldState || initialState;
  const id = 'context';
  return reinitInstances(addInstance(state, id, 'AudioContext'));
};

export const init = (oldState = null) => {
  const runtime = {instances: {}};
  initAudioContext(runtime);
  const seqRuntime = seq.initialRuntime(runtime);
  runtime.sequencer = seqRuntime;
  const state = reinit(oldState);
  console.log(runtime, runtime.sequencer, seqRuntime);
  return {state, runtime};
};
