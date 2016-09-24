import {init as initSequencer, tick, start} from './sequencer';
import {init as initLoader} from './loader';
import {init as initPlayer, initMixer, loadPlayer} from './player';
import {init as initEvents} from './events';
import {init as initScene, createScene} from './scene';
import {startTick} from './worker';
import {init} from './stateful-web-audio';

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
initMixer(state);
createScene(state);
loadPlayer(state);
start(state);

const {state2, instances} = init();
//start(state2);
