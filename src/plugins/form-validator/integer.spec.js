import { assert } from 'chai';

import Integer from './integer';

describe('Integer', () => {
  describe('Minimum and Maximum Rule', () => {
    it('return true for numbers < max', () => {
      const validator = Integer({
        rules: {
          max: { places: 0, value: '100' },
          min: { places: 0, value: '0' },
        },
      });
      const r1 = validator('2.133');
      const r2 = validator('99.99999');
      const r3 = validator('99.5');
      const r4 = validator('99.45');
      console.log(`r1 ${r1} r2  ${r2} r3 ${r3} r4 r${4}`);
      assert.equal(r1, true);
      assert.notEqual(r2, true);
      assert.notEqual(r3, false);
      assert.equal(r4, true);
    });
  });
});
