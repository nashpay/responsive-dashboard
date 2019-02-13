import { assert } from 'chai';

import Text from './text';

describe('Text', () => {
  describe('noSpecialChars', () => {
    it('check for no special chars', () => {
      const validator = Text({
        rules: {
        },
      });
      const r1 = validator.validate('abc-1234');
      const r2 = validator.validate('abc 1234');
      const r3 = validator.validate('abc 1234!');
      const r4 = validator.validate('abc 1234?');
      const r5 = validator.validate('abc 1234#');
      assert.equal(r1, true);
      assert.equal(r2, true);
      assert.notEqual(r3, true);
      assert.notEqual(r4, true);
      assert.notEqual(r5, true);
    });
  });
  describe('isBIP39', () => {
    it('fail if phrase is empty', () => {
      const validator = Text({
        rules: {
          isBIP39: {},
        },
      });
      const r1 = validator.validate('');
      assert.equal(r1.length, 1);
      assert.equal(r1[0]('Mnemonic phrase'), 'Mnemonic phrase is required');
    });
    it('fail if phrase is less than 12 words', () => {
      const validator = Text({
        rules: {
          isBIP39: {},
        },
      });
      const r1 = validator.validate('basket actual');
      assert.equal(r1.length, 1);
      assert.equal(r1[0](), 'Mnemonic phrase needs minimum of 12 words');
    });
    it('fail if phrase is less than 12 words', () => {
      const validator = Text({
        rules: {
          isBIP39: {},
        },
      });
      const r1 = validator.validate('basket actual cow dung cow dung cow dung cow dung cow dung cow dungerrr');
      assert.equal(r1.length, 1);
      assert.equal(r1[0](), 'Mnemonic phrase is invalid');
    });
  });
});
