import {commit} from './state';

export const init = () => ({
  buffers: {}
});

const doRequest = (name, url) => fetch(url).then(response => response.arrayBuffer());

export const loadSample = (state, name) => {
  const {loader: {buffers}} = state;
  if (!buffers[name]) {
    const url = `samples/${name}.ogg`;
    return doRequest(name, url).then(rawBuffer => {
      state.context.decodeAudioData(rawBuffer, buffer => {
        commit(state, ['loader', 'buffers', name], buffer);
      }, () => {});
    });
  }
  return Promise.resolve();
};
