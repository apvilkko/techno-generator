const DEBUG = true;
const debugEl = document.getElementById('debug');

export const withDebug = fn => state => {
  fn(state);
  if (DEBUG) {
    debugEl.innerHTML = JSON.stringify(state, null, 2);
  }
};

export const debugMessage = message => fn => {
  console.log(message); // eslint-disable-line
  return fn();
};
