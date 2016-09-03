import {randRange, maybe, sample} from './util';
import {commit} from './state';
import tracks from './tracks';
import {createPattern} from './pattern';
import styles, {
  FOURBYFOUR, BROKEN, OFFBEATS, RANDBUSY, TWOANDFOUR
} from './styles';

const getInitialState = () => ({
  parts: {},
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
    case tracks.HC:
      return maybe(50, OFFBEATS,
               maybe(50, RANDBUSY,
                 sample(styles)));
    default:
      return sample(styles);
  }
};

const createPart = (styles, track) => {
  const style = randomizeStyle(styles, track);
  return {
    style,
    pattern: createPattern(track, style),
  };
};

export const createScene = state => {
  const newScene = {
    ...getInitialState(),
    tempo: randRange(118, 130),
    shufflePercentage: maybe(50, 0, randRange(1, 30)),
    parts: {}
  };
  const {scene: {styles}} = state;
  [tracks.BD, tracks.CL, tracks.HC].forEach(track => {
    newScene.parts[track] = createPart(styles, track);
  });
  commit(state, 'scene', newScene);
};
