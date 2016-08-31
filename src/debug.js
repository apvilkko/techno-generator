const DEBUG = true;
const debugEl = document.getElementById('debug');

export const withDebug = fn => state => {
  fn(state);
  if (DEBUG) {
    debugEl.innerHTML = JSON.stringify(state, null, 2);
  }
};
