import {init as initSequencer, tick, start} from './sequencer';
import {init as initLoader} from './loader';
import {init as initPlayer, loadPlayer} from './player';
import {init as initEvents} from './events';
import {init as initScene, createScene} from './scene';
import {startTick} from './worker';

const context = new (window.AudioContext || window.webkitAudioContext)();

const state = {
  context,
  scene: initScene(),
  sequencer: initSequencer(context),
  player: initPlayer(context),
  loader: initLoader(),
};

startTick(state, tick);
initEvents(document, state);
createScene(state);
loadPlayer(state);
start(state);
