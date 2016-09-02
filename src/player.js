import {loadSample} from './loader';
import {commit} from './state';
import {createVCA} from './vca';
import {playSample} from './sampler';
import {createReverb} from './reverb';
import {connect, disconnect} from './util';

const createTrack = ({gain}) => ({gain, inserts: []});

export const init = context => {
  const masterGain = createVCA({context, gain: 0.5, destination: context.destination});
  const snGain = createVCA({context, gain: 0.8, destination: masterGain});
  return {
    mixer: {
      master: createTrack({gain: masterGain}),
      BD: createTrack({gain: createVCA({context, gain: 0.8, destination: masterGain})}),
      SN: createTrack({gain: snGain}),
    },
    samples: {}
  };
};

const loadSound = (state, key, sound) => {
  loadSample(state, sound);
  commit(state, ['player', 'samples', key], sound);
};

const addInsert = (state, key, insertEffect) => {
  const {player: {mixer}} = state;
  const inserts = mixer[key].inserts;
  if (inserts.length > 0) {
    inserts[inserts.length - 1].disconnect(mixer.master.gain);
  }
  if (inserts.length === 0) {
    disconnect(mixer[key].gain, mixer.master.gain);
    connect(mixer[key].gain, insertEffect);
  }
  connect(insertEffect, mixer.master.gain);
  commit(state, ['player', 'mixer', key, 'inserts'], inserts.concat(insertEffect));
};

const createInsertEffect = ({context, effect}) => {
  const dry = createVCA({context, gain: 0.8});
  const wet = createVCA({context, gain: 0.5});
  const input = createVCA({context, gain: 1});
  const output = createVCA({context, gain: 1});
  connect(input, dry);
  connect(input, effect);
  connect(effect, wet);
  connect(wet, output);
  connect(dry, output);
  return {dry, wet, effect, input, output};
};

export const loadPlayer = state => {
  loadSound(state, 'BD', 'bd1');
  loadSound(state, 'SN', 'cl1');
  const {context} = state;
  loadSample(state, 'impulse1').then(() => {
    const reverb = createInsertEffect({context,
      effect: createReverb({context, buffer: state.loader.buffers.impulse1})
    });
    addInsert(state, 'BD', reverb);
  });
};

const getDestination = track => track.gain;

export const play = (state, key, note) => {
  const {player: {mixer, samples}, context, loader: {buffers}} = state;
  const buffer = buffers[samples[key]];
  if (buffer) {
    playSample({
      context,
      destination: getDestination(mixer[key]),
      buffer,
      pitch: note.pitch
    });
  }
};
