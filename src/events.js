import {debugMessage} from './debug';

export const init = (document, newFn) => {
  document.getElementById('new').addEventListener('click',
    () => debugMessage('new scene')(newFn));
};
