import {randRange, rand} from './util';

const createNote = (velocity = 0, pitch = null) => ({velocity, pitch});

const iteratePattern = (patternLength, iterator) =>
  Array.from({length: patternLength}).map((_, index) => iterator(index));

const createBD = () => {
  const pitch = randRange(-2, 2);
  const patternLength = rand(50) ? 8 : 16;
  return iteratePattern(patternLength, i => {
    if (i % 4 === 0) {
      return createNote(127, pitch);
    } else if (rand(5)) {
      return createNote(randRange(10, 110), pitch);
    }
    return createNote();
  });
};

const createSN = () => {
  const pitch = randRange(-2, 2);
  const patternLength = rand(50) ? 8 : 16;
  return iteratePattern(patternLength, i => {
    if ((i + 4) % 8 === 0) {
      return createNote(127, pitch);
    } else if (rand(10) && (i % 4 !== 0)) {
      return createNote(randRange(10, 90), pitch);
    }
    return createNote();
  });
};

export const createPattern = () => ({
  BD: createBD(),
  SN: createSN(),
});
