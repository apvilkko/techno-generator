import { commit } from "./state";
import { playNote } from "./player";
import { getContext } from "./util";

const WORKER_TICK_LEN = 0.2;

export const initialState = {
  playing: false,
  noteLength: 0.25
};

export const initialRuntime = runtime => ({
  scheduleAheadTime: 0.1,
  currentNote: 0,
  lastTickTime: runtime.instances.context.currentTime
});

const scheduleNote = (ctx, delta) => {
  const { state, runtime } = ctx;
  const currentNote = runtime.sequencer.currentNote;
  const scene = state.scene;
  Object.keys(scene.parts).forEach(key => {
    const track = scene.parts[key].pattern;
    const note = track[currentNote % track.length];
    if (note.velocity) {
      playNote(ctx, key, note, delta);
    }
  });
};

const seqLength = 256;

const nextNote = ctx => {
  const {
    runtime: {
      sequencer: { currentNote }
    }
  } = ctx;
  const nextNote = currentNote === seqLength - 1 ? -1 : currentNote;
  ctx.runtime.sequencer.currentNote = nextNote + 1;
};

const getNextNoteTime = (ctx, time) => {
  const {
    state: {
      sequencer: { noteLength },
      scene: { shufflePercentage, tempo }
    }
  } = ctx;
  const beatLen = 60.0 / tempo;
  const currentEighth = Math.floor(time / (0.5 * beatLen));
  const currentEighthStartTime = currentEighth * (0.5 * beatLen);
  const shuffleAmount = 1.0 + shufflePercentage / 150.0;
  const second16thStartTime =
    currentEighthStartTime + shuffleAmount * noteLength * beatLen;
  const next8thTime = (currentEighth + 1) * (0.5 * beatLen);
  return time > second16thStartTime ? next8thTime : second16thStartTime;
};

const SAFETY_OFFSET = 0.01;

export const tick = ctx => {
  const { state, runtime } = ctx;
  const rtSeq = runtime.sequencer;
  const stSeq = state.sequencer;
  const currentTime = getContext(ctx).currentTime;
  if (stSeq.playing) {
    let time = rtSeq.lastTickTime;
    const nextNotes = [];
    let nextNoteTime;
    do {
      nextNoteTime = getNextNoteTime(ctx, time);
      if (nextNoteTime < currentTime) {
        nextNotes.push(nextNoteTime);
      }
      time += nextNoteTime - time + 0.005;
    } while (nextNoteTime < currentTime);
    // console.log(nextNotes);

    for (let i = 0; i < nextNotes.length; ++i) {
      const delta = Math.max(
        nextNotes[i] - (currentTime - WORKER_TICK_LEN) + SAFETY_OFFSET,
        0
      );
      // console.log(i, currentTime, nextNotes[i], delta);
      scheduleNote(ctx, delta);
      nextNote(ctx);
    }
  }
  ctx.runtime.sequencer.lastTickTime = currentTime;
};

export const play = ctx => {
  commit(ctx, "sequencer.playing", true);
  ctx.runtime.sequencer.nextNoteTime = getContext(ctx).currentTime;
};

export const pause = ctx => {
  commit(ctx, "sequencer.playing", false);
};

export const isPlaying = ctx => ctx.state.sequencer.playing;
