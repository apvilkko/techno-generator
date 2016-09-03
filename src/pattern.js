import {randRange, rand} from './util';
import tracks from './tracks';
import {
  FOURBYFOUR, TWOANDFOUR, BROKEN, RANDBUSY, OFFBEATS, RANDSPARSE
} from './styles';

const createNote = (velocity = 0, pitch = null) => ({velocity, pitch});

const iteratePattern = ({patternLength, pitch}, iterator) =>
  Array.from({length: patternLength}).map((_, index) => iterator(index, pitch));

const prefs = {
  [tracks.BD]: {
    patternLength: () => (rand(50) ? 8 : 16)
  },
  [tracks.CL]: {
    patternLength: () => (rand(50) ? 8 : 16)
  },
  [tracks.HC]: {
    patternLength: () => (rand(50) ? 8 : 16)
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
  const pitch = randRange(-2, 2);
  const patternLength = prefs[track].patternLength();
  return iteratePattern({patternLength, pitch}, styleIterator[style]);
};
