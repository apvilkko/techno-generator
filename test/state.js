import {commit} from '../src/state';
import {assert} from 'chai';

describe('state', () => {
  it('can be committed to', () => {
    const state = {
      path: {
        to: {
          data: 5
        }
      }
    };
    commit(state, 'path.to.data', 6);
    assert.strictEqual(state.path.to.data, 6);
  })
});
