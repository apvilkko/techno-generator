import {assert} from 'chai';
import {maybe} from '../src/util';

describe('util', () => {
  describe('maybe', () => {
    it('always takes first option with 100', () => {
      for (let i = 0; i < 100; ++i) {
        assert.strictEqual(maybe(100, 1, 0), 1);
      }
    });

    it('always takes second option with 0', () => {
      for (let i = 0; i < 100; ++i) {
        assert.strictEqual(maybe(0, 1, 0), 0);
      }
    });
  });
});
