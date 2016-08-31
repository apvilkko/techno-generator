import {assert} from 'chai';
import {commit} from '../src/state';

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
  });

  it('can be committed to with array path', () => {
    const state = {
      path: {
        to: {
          data: 5
        }
      }
    };
    commit(state, ['path', 'to', 'data'], 6);
    assert.strictEqual(state.path.to.data, 6);
  });
});
