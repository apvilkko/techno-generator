import {commit} from './state';

export const init = () => ({
  buffers: {}
});

const doRequest = (name, url) => fetch(url).then(response => response.arrayBuffer());

export const loadSample = (state, name) => {
  const {loader: {buffers}} = state;
  return new Promise(resolve => {
    if (buffers[name]) {
      resolve();
      return;
    }
    const url = `samples/${name}.ogg`;
    doRequest(name, url).then(rawBuffer => {
      state.context.decodeAudioData(rawBuffer, buffer => {
        commit(state, ['loader', 'buffers', name], buffer);
        resolve();
      }, () => {});
    });
  });
};
