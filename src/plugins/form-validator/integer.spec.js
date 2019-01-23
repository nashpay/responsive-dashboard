import { assert } from 'chai';

import Integer from './integer';

describe('Integer', () => {
  describe('Minimum and Maximum Rule', () => {
    it('return true for numbers < max', () => {
      const validator = Integer({
        rules: {
          max: {
            precision: 0,
            rounding: 4,
            value: '100',
            eqs: false,
          },
          min: {
            precision: 0,
            rounding: 4,
            value: '0',
            eqs: true,
          },
        },
      });
      const r1 = validator('2.133');
      const r2 = validator('99.999');
      const r3 = validator('99.5');
      const r4 = validator('99.45');
      assert.equal(r1, true);
      assert.notEqual(r2, true);
      assert.notEqual(r3, false);
      assert.equal(r4, true);
    });
  });
});
