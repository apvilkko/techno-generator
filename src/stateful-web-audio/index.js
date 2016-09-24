const initialState = {
  instances: {},
  sequencer: {},
};

const reinitInstances = state => {
  // TODO
  return state;
};

const addInstance = (state, id, name) => ({
  ...state,
  instances: {
    ...state.instances,
    [id]: {id, name}
  }
});

const reinit = (oldState, instances) => {
  const state = oldState || initialState;
  if (state.instances) {
    return reinitInstances(state);
  }
  const id = 'context';
  instances[id] = new (window.AudioContext || window.webkitAudioContext)();
  return addInstance(state, id, 'AudioContext');
};

export const init = (oldState = null) => {
  const instances = {};
  const state = reinit(oldState, instances);
  return {state, instances};
};

export const start = state => {

};
