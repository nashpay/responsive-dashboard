import { assert } from 'chai';

import Text from './text';

describe('Text', () => {
  describe('noSpecialChars', () => {
    it('check for no special chars', () => {
      const validator = Text({
        rules: {
        },
      });
      const r1 = validator('abc-1234');
      const r2 = validator('abc 1234');
      const r3 = validator('abc 1234!');
      const r4 = validator('abc 1234?');
      const r5 = validator('abc 1234#');
      assert.equal(r1, true);
      assert.equal(r2, true);
      assert.notEqual(r3, true);
      assert.notEqual(r4, true);
      assert.notEqual(r5, true);
    });
  });
});
