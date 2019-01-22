import { assert } from 'chai';

import Decimal from './decimal';

describe('Decimal', () => {
  describe('Number Rule', () => {
    it('not return true if not a number', () => {
      const res = Decimal()('abc');
      assert.notEqual(res, true);
      assert.equal(res.length, 1);
      assert.equal(res[0]('amount'), 'amount is not a number');
    });
    it('not return true if undefined', () => {
      const res = Decimal()();
      assert.notEqual(res, true);
      assert.equal(res.length, 2);
      assert.equal(res[0]('amount'), 'amount is not a number');
      assert.equal(res[1]('amount'), 'amount is required');
    });
    it('calculate to 9.dp', () => {
      const decimal = Decimal({ places: 9 });
      const a1 = decimal('0.00000001234');
      assert.equal(a1, true);
    });
  });
  describe('Minimum Rule', () => {
    it('return true for numbers > min', () => {
      const validator = Decimal({
        rules: { min: { places: 4, value: '0' } },
      });
      const r1 = validator('-1');
      const r2 = validator('0');
      const r3 = validator('1');
      assert.notEqual(r1, true);
      assert.equal(r1[0]('amount'), 'amount is lesser than 0');
      assert.equal(r2, true);
      assert.equal(r3, true);
    });
  });
  describe('Maximum Rule', () => {
    it('return true for numbers < max', () => {
      const validator = Decimal({
        rules: { max: { places: 4, value: '0' } },
      });
      const r1 = validator('-1');
      const r2 = validator('0');
      const r3 = validator('1');
      assert.equal(r1, true);
      assert.equal(r2, true);
      assert.notEqual(r3, true);
      assert.equal(r3[0]('amount'), 'amount is greater than 0');
    });
  });
  describe('Minimum and Maximum Rule', () => {
    it('return true for numbers < max', () => {
      const validator = Decimal({
        rules: {
          max: { places: 4, value: '100' },
          min: { places: 4, value: '0' },
        },
      });
      const r1 = validator('2');
      const r2 = validator('99');
      const r3 = validator('1');
      const r4 = validator('101');
      const r5 = validator('-1');
      assert.equal(r1, true);
      assert.equal(r2, true);
      assert.equal(r3, true);
      assert.notEqual(r4, true);
      assert.notEqual(r5, true);
    });
  });
});
