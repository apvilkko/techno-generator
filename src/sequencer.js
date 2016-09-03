import {commit} from './state';
import {play} from './player';

export const init = context => ({
  playing: false,
  scheduleAheadTime: 0.1,
  currentNote: 0,
  noteLength: 0.25,
  nextNoteTime: context.currentTime,
});

const scheduleNote = state => {
  const {sequencer: {currentNote}, scene} = state;
  Object.keys(scene.parts).forEach(key => {
    const track = scene.parts[key].pattern;
    const note = track[currentNote % track.length];
    if (note.velocity) {
      play(state, key, note);
    }
  });
};

const nextNote = state => {
  const {
    sequencer: {
      currentNote,
      noteLength,
      nextNoteTime,
    },
    scene: {
      shufflePercentage,
      tempo,
    }
  } = state;
  const shuffleAmount = 1.0 - (shufflePercentage / 150.0);
  const noteLen = ((currentNote % 2) ? shuffleAmount : (2.0 - shuffleAmount)) * noteLength;
  const seqLength = 256;
  const nextNote = currentNote === (seqLength - 1) ? -1 : currentNote;
  commit(state, 'sequencer.nextNoteTime', nextNoteTime + (noteLen * (60.0 / tempo)));
  commit(state, 'sequencer.currentNote', nextNote + 1);
};

export const tick = state => {
  const {sequencer, context} = state;
  if (sequencer.playing) {
    if (sequencer.nextNoteTime < context.currentTime + sequencer.scheduleAheadTime) {
      scheduleNote(state);
      nextNote(state);
    }
  }
};

export const start = state => {
  const {sequencer, context} = state;
  sequencer.playing = true;
  sequencer.nextNoteTime = context.currentTime;
};
