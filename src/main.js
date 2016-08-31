import {init as initSequencer, tick, start} from './sequencer';
import {init as initLoader} from './loader';
import {init as initPlayer, loadPlayer} from './player';
import {withDebug} from './debug';

const context = new (window.AudioContext || window.webkitAudioContext)();

const state = {
  context,
  sequencer: initSequencer(context),
  player: initPlayer(context),
  loader: initLoader(),
};

const worker = new Worker('/worker.js');
worker.postMessage('start');
worker.onmessage = () => withDebug(tick)(state);

loadPlayer(state);
start(state);
