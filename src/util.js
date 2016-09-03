import {DEBUG} from './debug';

const log = (from, to, disconnect) => {
  if (!DEBUG) return;
  console.log( // eslint-disable-line
    disconnect ? 'disconnect' : 'connect',
    Object.prototype.toString.call(from),
    '=>',
    Object.prototype.toString.call(to)
  );
};

export const connect = (from, to) => {
  log(from, to);
  (from.output ? from.output : from).connect(to.input ? to.input : to);
};

export const disconnect = (node, from) => {
  if (from) {
    log(node, from, true);
    node.disconnect(from);
    return;
  }
  log(node, null, true);
  node.disconnect();
};

export const randRange = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

export const rand = value => Math.random() < (value / 100.0);

export const maybe = (prob, opt1, opt2) => (rand(prob) ? opt1 : opt2);

export const sample = arr =>
  (arr.length > 0 ? arr[randRange(0, arr.length - 1)] : undefined);
