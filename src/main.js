import {init as initSequencer, tick, start} from './sequencer';

const state = {
  context: new (window.AudioContext || window.webkitAudioContext)(),
};
state.sequencer = initSequencer(state.context);

const worker = new Worker('/worker.js');
worker.postMessage('start');
worker.onmessage = () => tick(state);

start(state);
