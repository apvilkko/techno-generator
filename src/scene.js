import {randRange, maybe, sample, rand} from './util';
import {commit} from './state';
import tracks from './tracks';
import {createPattern} from './pattern';
import styles, {
  FOURBYFOUR, BROKEN, OFFBEATS, RANDBUSY, TWOANDFOUR, RANDSPARSE, OCCASIONAL
} from './styles';
import catalog from './catalog';
import {setCurveAmount} from './waveshaper';
import {loadSound} from './player';

const getInitialState = () => ({
  parts: {},
  master: {},
  styles,
});

export const init = getInitialState;

const randomizeStyle = (styles, track) => {
  switch (track) {
    case tracks.BD:
      return maybe(75, FOURBYFOUR, BROKEN);
    case tracks.CL:
      return maybe(33, TWOANDFOUR,
               maybe(33, FOURBYFOUR,
                 sample(styles)));
    case tracks.HO:
      return maybe(75, OFFBEATS,
               maybe(50, FOURBYFOUR,
                 sample(styles)));
    case tracks.RD:
      return maybe(50, OFFBEATS,
               maybe(75, FOURBYFOUR,
                 sample(styles)));
    case tracks.HC:
      return maybe(75, RANDBUSY,
               sample([BROKEN, TWOANDFOUR, RANDSPARSE, FOURBYFOUR, OFFBEATS]));
    case tracks.ST:
      return sample([BROKEN, TWOANDFOUR, RANDSPARSE, RANDBUSY, OCCASIONAL]);
    default:
      return sample(styles);
  }
};

const randomizeSample = track => {
  let key = track.toLowerCase();
  if ((key === 'hc' || key === 'ho') && rand(50)) {
    // Use "wrong" hihat samples sometimes
    key = sample(['ho', 'hc']);
  }
  const numChoices = catalog[key];
  return `${key}${randRange(1, numChoices)}`;
};

const createPart = (state, styles, track) => {
  const style = randomizeStyle(styles, track);
  const sample = randomizeSample(track);
  loadSound(state, track, sample);
  return {
    style,
    sample,
    pattern: createPattern(track, style),
  };
};

export const createScene = state => {
  const newScene = {
    ...getInitialState(),
    master: {
      distortionAmount: randRange(0, 40)
    },
    tempo: randRange(118, 130),
    shufflePercentage: maybe(50, 0, randRange(1, 30)),
    parts: {}
  };
  const {scene: {styles}} = state;
  [
    tracks.BD,
    tracks.CL,
    tracks.ST,
    tracks.PR,
    tracks.BS
  ].forEach(track => {
    newScene.parts[track] = createPart(state, styles, track);
  });
  if (rand(33)) {
    newScene.parts[tracks.HC] = createPart(state, styles, tracks.HC);
  } else if (rand(33)) {
    newScene.parts[tracks.HO] = createPart(state, styles, tracks.HO);
  } else {
    newScene.parts[tracks.HO] = createPart(state, styles, tracks.HO);
    newScene.parts[tracks.HC] = createPart(state, styles, tracks.HC);
  }
  if (rand(70)) {
    newScene.parts[tracks.RD] = createPart(state, styles, tracks.RD);
  }
  if (rand(50)) {
    newScene.parts[tracks.SN] = createPart(state, styles, tracks.SN);
  }
  commit(state, 'scene', newScene);
  setCurveAmount(
    state.player.mixer.master.inserts[0].effect,
    newScene.master.distortionAmount
  );
};
