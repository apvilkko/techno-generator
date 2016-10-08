import {assert} from 'chai';
import {commit} from '../src/stateful-web-audio/src/state';

describe('state', () => {
  it('can be committed to', () => {
    const state = {
      path: {
        to: {
          data: 5
        }
      }
    };
    const ctx = {state};
    commit(ctx, 'path.to.data', 6);
    assert.strictEqual(ctx.state.path.to.data, 6);
  });

  it('can be committed to with array path', () => {
    const state = {
      path: {
        to: {
          data: 5
        }
      }
    };
    const ctx = {state};
    commit(ctx, ['path', 'to', 'data'], 6);
    assert.strictEqual(ctx.state.path.to.data, 6);
  });
});
