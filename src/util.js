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

export const maybe = (prob, opt1, opt2) => {
  if (typeof prob === 'number') {
    return rand(prob) ? opt1 : opt2;
  }
  let sum = 0;
  let chosen = null;
  const sorted = Object.keys(prob).sort((a, b) => {
    if (a === 'rest') {
      return 1;
    } else if (b === 'rest') {
      return -1;
    }
    return a - b;
  });
  sorted.forEach(key => {
    sum += (key === 'rest' ? (100 - sum) : Number(key));
    if (!chosen && rand(sum)) {
      chosen = prob[key];
    }
  });
  return chosen;
};

export const sample = arr =>
  (arr.length > 0 ? arr[randRange(0, arr.length - 1)] : undefined);
