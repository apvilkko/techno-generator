import { getContext } from "./util";
import { playSample, triggerEnvelope } from "./components";

const normalizeVelocity = velocity => velocity / 127.0;

const gateOn = (context, destination, buffer, note, trackGain, delta = 0) => {
  playSample({
    context,
    destination,
    buffer,
    pitch: note.pitch,
    delta
  });
  triggerEnvelope({
    context,
    param: destination.gain,
    sustain: normalizeVelocity(note.velocity) * trackGain,
    delta
  });
};

const getDestination = track => (track ? track.gain : null);

export const playNote = (ctx, key, note, delta = 0) => {
  const {
    state: {
      mixer: { tracks },
      scene: { parts }
    }
  } = ctx;
  const buffer = ctx.runtime.buffers[parts[key].sample];
  const destination = getDestination(tracks[key]);
  if (buffer && destination) {
    gateOn(
      getContext(ctx),
      destination,
      buffer,
      note,
      tracks[key].gainValue,
      delta
    );
  }
};
