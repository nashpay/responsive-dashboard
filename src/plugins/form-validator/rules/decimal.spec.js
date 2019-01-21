import { assert } from 'chai';
import sinon from 'sinon';

import rule from './decimal';

describe('Decimal Ruleset', () => {
  describe('Number Rule', () => {
    it('not return true if not a number', () => {
      const res = rule()('abc');
      assert.notEqual(res, true);
      assert.equal(res.length, 1);
      assert.equal(res[0]('amount'), 'amount is not a number'); 
    });
    it('not return true if undefined', () => {
      const res = rule()();
      assert.notEqual(res, true);
      assert.equal(res.length, 2);
    });
  });
  describe('Minimum Rule', () => {
    it('return true for numbers > min', () => {
      const validator = rule({
        ruleset: { min: { places: 4, value: '0' } },
      });
      const r1 = validator('-1');
      const r2 = validator('0');
      const r3 = validator('1');
    });
  });
});
