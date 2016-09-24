import {getContext} from './util';

/*import {loadSample} from './loader';
import {commit} from './state';
import {createVCA} from './components/vca';
import {createCompressor} from './components/compressor';
import {createWaveShaper} from './components/waveshaper';
import {playSample} from './components/sampler';
import {createReverb} from './components/reverb';
import {triggerEnvelope} from './components/envelope';
import {connect, disconnect, randRange} from './util';
import tracks from './tracks';

const createTrack = ({gain}) => ({gain, inserts: []});

const setNodeGain = (node, value) => {
  node.gain.value = value; // eslint-disable-line
};

const setTrackGain = (mixer, track, value) => {
  setNodeGain(mixer[track].gain, value);
};

const addInsert = (state, key, insertEffect) => {
  const {player: {mixer}} = state;
  const inserts = mixer[key].inserts;
  if (key !== 'master') {
    if (inserts.length > 0) {
      inserts[inserts.length - 1].disconnect(mixer.master.gain);
    }
    if (inserts.length === 0) {
      disconnect(mixer[key].gain, mixer.master.gain);
      connect(mixer[key].gain, insertEffect);
    }
    connect(insertEffect, mixer.master.gain);
  }
  commit(state, ['player', 'mixer', key, 'inserts'], inserts.concat(insertEffect));
};

const createInsertEffect = ({context, effect}) => {
  const dry = createVCA({context, gain: 1});
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

export const init = () => ({
  mixer: {},
  samples: {}
});

export const loadSound = (state, key, sound) => {
  loadSample(state, sound);
  commit(state, ['player', 'samples', key], sound);
};

export const initMixer = state => {
  const {context} = state;
  const masterLimiter = createCompressor({
    context, destination: context.destination
  });
  const masterDistortion = createInsertEffect({context,
    effect: createWaveShaper({
      context, amount: 40
    })
  });
  connect(masterDistortion, masterLimiter);
  const masterGain = createVCA({
    context, gain: 0.5, destination: masterDistortion
  });
  const mixer = {
    master: createTrack({gain: masterGain}),
  };
  Object.values(tracks).forEach(track => {
    mixer[track] = createTrack({
      gain: createVCA({context, gain: 0.6, destination: masterGain})
    });
  });
  setTrackGain(mixer, tracks.BD, 0.7);
  setTrackGain(mixer, tracks.CL, 0.5);
  setTrackGain(mixer, tracks.SN, 0.4);
  setTrackGain(mixer, tracks.ST, 0.3);
  setTrackGain(mixer, tracks.BS, 0.4);
  setTrackGain(mixer, tracks.RD, 0.2);
  commit(state, 'player.mixer', mixer);

  addInsert(state, 'master', masterDistortion);
  setNodeGain(masterDistortion.wet, 0.4);
  setNodeGain(masterDistortion.dry, 0.6);
};

export const loadPlayer = state => {
  const {context} = state;
  loadSample(state, 'impulse1').then(() => {
    // TODO: move effect randomization to scene
    const bdReverb = createInsertEffect({context,
      effect: createReverb({context, buffer: state.loader.buffers.impulse1})
    });
    const stabReverb = createInsertEffect({context,
      effect: createReverb({context, buffer: state.loader.buffers.impulse1})
    });
    addInsert(state, tracks.BD, bdReverb);
    setNodeGain(bdReverb.wet, randRange(0.1, 0.5));
    addInsert(state, tracks.ST, stabReverb);
    setNodeGain(stabReverb.wet, randRange(0.1, 0.8));
  });
};

const getDestination = track => track.gain;

const normalizeVelocity = velocity => velocity / 127.0;

const gateOn = (context, destination, buffer, note) => {
  playSample({
    context,
    destination,
    buffer,
    pitch: note.pitch
  });
  triggerEnvelope({
    context,
    param: destination.gain,
    sustain: normalizeVelocity(note.velocity)
  });
};
*/

export const play = (ctx, key, note) => {
  console.log("play", key, note);
  /*const {
    state: {
      player: {mixer, samples},
      loader: {buffers}
    }
  } = ctx;*/
  const context = getContext(ctx);
  /*const buffer = buffers[samples[key]];
  const destination = getDestination(mixer[key]);
  if (buffer) {
    gateOn(context, destination, buffer, note);
  }*/
};
