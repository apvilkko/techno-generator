import {randRange, maybe, sample, rand} from './util';
import tracks from './tracks';
import {createPattern} from './pattern';
import styles, {
  FOURBYFOUR, BROKEN, OFFBEATS, RANDBUSY, TWOANDFOUR, RANDSPARSE, OCCASIONAL
} from './styles';
import catalog from './catalog';

const randomizeStyle = track => {
  switch (track) {
    case tracks.BD:
      return maybe(75, FOURBYFOUR, BROKEN);
    case tracks.CL:
      return maybe({33: TWOANDFOUR, 20: FOURBYFOUR, rest: sample(styles)});
    case tracks.HO:
      return maybe({75: OFFBEATS, 13: FOURBYFOUR, rest: sample(styles)});
    case tracks.RD:
      return maybe({50: OFFBEATS, 32: FOURBYFOUR, rest: sample(styles)});
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

const urlify = sample => `samples/${sample}.ogg`;

const createPart = track => {
  const style = randomizeStyle(track);
  const sample = randomizeSample(track);
  return {
    style,
    sample: urlify(sample),
    pattern: createPattern(track, style),
  };
};

export const createScene = () => {
  const newScene = {
    master: {
      distortionAmount: randRange(0, 40)
    },
    tempo: randRange(118, 130),
    shufflePercentage: maybe(50, 0, randRange(1, 30)),
    parts: {}
  };
  [
    tracks.BD,
    tracks.CL,
    tracks.ST,
    tracks.PR,
    tracks.BS
  ].forEach(track => {
    newScene.parts[track] = createPart(track);
  });
  if (rand(33)) {
    newScene.parts[tracks.HC] = createPart(tracks.HC);
  } else if (rand(33)) {
    newScene.parts[tracks.HO] = createPart(tracks.HO);
  } else {
    newScene.parts[tracks.HO] = createPart(tracks.HO);
    newScene.parts[tracks.HC] = createPart(tracks.HC);
  }
  if (rand(70)) {
    newScene.parts[tracks.RD] = createPart(tracks.RD);
  }
  if (rand(50)) {
    newScene.parts[tracks.SN] = createPart(tracks.SN);
  }
  return newScene;
};
