import {createScene} from './scene';
import {debugMessage} from './debug';

export const init = (document, state) => {
  document.getElementById('new').addEventListener('click',
    () => debugMessage('new scene')(() => createScene(state)));
};
