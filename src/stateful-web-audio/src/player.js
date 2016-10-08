import {getContext} from './util';
import {playSample, triggerEnvelope} from './components';

/*import {loadSample} from './loader';
import {commit} from './state';
import {createVCA} from './components/vca';
import {createCompressor} from './components/compressor';
import {createWaveshaper} from './components/waveshaper';
import {createReverb} from './components/reverb';
import {connect, disconnect, randRange} from './util';
import tracks from './tracks';

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

*/

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


const getDestination = track => (track ? track.gain : null);

export const play = (ctx, key, note) => {
  const {state: {mixer: {tracks}, scene: {parts}}} = ctx;
  const buffer = ctx.runtime.buffers[parts[key].sample];
  const destination = getDestination(tracks[key]);
  if (buffer && destination) {
    gateOn(getContext(ctx), destination, buffer, note);
  }
};
