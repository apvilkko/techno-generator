import {loadSample} from './loader';
import {commit} from './state';

const createVCA = (context, gain = 0.5, destination) => {
  const node = context.createGain();
  node.gain.value = gain;
  node.connect(destination || context.destination);
  return node;
};


export const init = context => {
  const masterGain = createVCA(context, 0.5);
  return {
    mixer: {
      master: {gain: masterGain},
      BD: {gain: createVCA(context, 0.8, masterGain)},
      SN: {gain: createVCA(context, 0.8, masterGain)},
    },
    samples: {}
  };
};

const loadSound = (state, key, sound) => {
  loadSample(state, sound);
  commit(state, ['player', 'samples', key], sound);
};

export const loadPlayer = state => {
  loadSound(state, 'BD', 'bd1');
  loadSound(state, 'SN', 'cl1');
};

const getRateFromPitch = (pitch) => Math.pow(2, (pitch * 100) / 1200);

export const play = (state, key, note) => {
  const {player: {mixer, samples}, context, loader: {buffers}} = state;
  const buffer = buffers[samples[key]];
  if (buffer) {
    const bufferSource = context.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(mixer[key].gain);
    bufferSource.start(0);
    if (note.pitch !== null && note.pitch !== 0) {
      bufferSource.playbackRate.value = getRateFromPitch(note.pitch);
    }
    //trigger(this.name + '_AEnvelope_gateOn', note.velocity);
  }
};
