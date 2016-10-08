import {commit} from './state';
import {getContext, connect, disconnect} from './util';
import {
  createCompressor,
  createVCA,
} from './components';

export const initialState = ({
  tracks: {}
});

export const createInsertEffect = ({context, effect}) => {
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

const createTrack = ({gain}) => ({gain, inserts: []});

export const setNodeGain = (node, value) => {
  node.gain.value = value; // eslint-disable-line
};

export const setTrackGain = (mixer, track, value) => {
  setNodeGain(mixer[track].gain, value);
};

export const getInsert = (ctx, key, index) =>
  ctx.state.mixer.tracks[key].inserts[index].effect;

export const addInsert = (ctx, key, insertEffect) => {
  const {state: {mixer: {tracks}}} = ctx;
  const inserts = tracks[key].inserts;
  if (key !== 'master') {
    if (inserts.length > 0) {
      inserts[inserts.length - 1].disconnect(tracks.master.gain);
    }
    if (inserts.length === 0) {
      disconnect(tracks[key].gain, tracks.master.gain);
      connect(tracks[key].gain, insertEffect);
    }
    connect(insertEffect, tracks.master.gain);
  }
  commit(ctx, ['mixer', 'tracks', key, 'inserts'], inserts.concat(insertEffect));
};

export const createMixer = (ctx, trackSpec) => {
  const context = getContext(ctx);
  const masterLimiter = createCompressor({
    context, destination: context.destination
  });
  const masterGain = createVCA({
    context, gain: 0.5, destination: masterLimiter
  });
  const tracks = {
    master: createTrack({gain: masterGain}),
  };
  Object.keys(trackSpec).forEach(track => {
    tracks[track] = createTrack({
      gain: createVCA({
        context,
        gain: trackSpec[track].gain || 0.6,
        destination: masterGain
      })
    });
  });

  commit(ctx, 'mixer.tracks', tracks);
};
