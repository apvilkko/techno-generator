import {randRange, rand, maybe} from './util';
import tracks from './tracks';
import {
  FOURBYFOUR, TWOANDFOUR, BROKEN, RANDBUSY, OFFBEATS, RANDSPARSE, OCCASIONAL
} from './styles';

const createNote = (velocity = 0, pitch = null) => ({velocity, pitch});

const iteratePattern = ({patternLength, pitch}, iterator) =>
  Array.from({length: patternLength}).map((_, index) => iterator(index, pitch));

const prefs = {
  [tracks.BD]: {
    patternLength: () => maybe(50, 8, 16),
    pitch: () => randRange(-2, 2),
  },
  [tracks.BS]: {
    patternLength: () => maybe(50, 8, maybe(50, 4, 16)),
    pitch: () => randRange(-2, 6),
  },
  [tracks.CL]: {
    patternLength: () => maybe(50, 8, 16),
    pitch: () => randRange(-2, 2),
  },
  [tracks.SN]: {
    patternLength: () => maybe(50, 8, 16),
    pitch: () => randRange(-2, 2),
  },
  [tracks.HC]: {
    patternLength: () => maybe(50, 8, 16),
    pitch: () => randRange(-2, 2),
  },
  [tracks.HO]: {
    patternLength: () => maybe(50, 8, 16),
    pitch: () => randRange(-2, 2),
  },
  [tracks.PR]: {
    patternLength: () => maybe(50, 8, 16),
    pitch: () => randRange(-2, 2),
  },
  [tracks.ST]: {
    patternLength: () => maybe(50, 32, maybe(60, 64, 16)),
    pitch: () => randRange(-6, 6),
  },
  [tracks.RD]: {
    patternLength: () => maybe(50, 8, 16),
    pitch: () => randRange(-2, 2),
  }
};

const styleIterator = {
  [FOURBYFOUR]: (i, pitch) => {
    if (i % 4 === 0) {
      return createNote(127, pitch);
    } else if (rand(5)) {
      return createNote(randRange(10, 110), pitch);
    }
    return createNote();
  },
  [OFFBEATS]: (i, pitch) => {
    if ((i + 2) % 4 === 0) {
      return createNote(127, pitch);
    } else if (rand(5)) {
      return createNote(randRange(10, 110), pitch);
    }
    return createNote();
  },
  [RANDBUSY]: (i, pitch) => {
    if (rand(80)) {
      return createNote(randRange(90, 127), pitch);
    }
    return createNote();
  },
  [RANDSPARSE]: (i, pitch) => {
    if (rand(20)) {
      return createNote(randRange(90, 127), pitch);
    }
    return createNote();
  },
  [OCCASIONAL]: (i, pitch) => {
    if (rand(5)) {
      return createNote(randRange(64, 127), pitch);
    }
    return createNote();
  },
  [TWOANDFOUR]: (i, pitch) => {
    if ((i + 4) % 8 === 0) {
      return createNote(127, pitch);
    } else if (rand(10) && (i % 4 !== 0)) {
      return createNote(randRange(10, 90), pitch);
    }
    return createNote();
  },
  [BROKEN]: (i, pitch) => {
    if (i % 8 === 0) {
      return createNote(127, pitch);
    } else if (((i + 2) % 8 === 0) || ((i + 5) % 8 === 0)) {
      return createNote(randRange(110, 127), pitch);
    } else if (rand(5)) {
      return createNote(randRange(10, 90), pitch);
    }
    return createNote();
  },
};

export const createPattern = (track, style) => {
  const pitch = prefs[track].pitch();
  const patternLength = prefs[track].patternLength();
  return iteratePattern({patternLength, pitch}, styleIterator[style]);
};
