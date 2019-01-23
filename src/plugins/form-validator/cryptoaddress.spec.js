import { assert } from 'chai';

import CryptoAddress from './cryptoaddress';

describe('CryptoAddress', () => {
  describe('Testnet Bitcoin Address', () => {
    it('return true for valid testnet address', () => {
      const validator = CryptoAddress({
        rules: {
          cryptoAddress: { tag: 'btc-testnet' },
        },
      });
      const r1 = validator('2MvXCpYTCpYLD7bdKxmG5JAbY9vt5eqPD27');
      const r2 = validator('2MvXCpYTCpYLD7bdKxmG5JAbY9vt5eqPD');
      const r3 = validator('n1EyyAjgiFN7iQqcTX7kJi4oXLZx4KNPnj');
      const r4 = validator('mgrCYKXkmgWLqZkLv6dhdkLHY2f1Y4qK1t');
      const r5 = validator('31w3iWUN5EMJMW2YRCc5m4RFqm3zN61xK2');
      const r6 = validator('1GXkHjRFMHHZ34DoXdzQziEiJ9RP1zbzt8');
      assert.equal(r1, true);
      assert.notEqual(r2, true);
      assert.equal(r3, true);
      assert.equal(r4, true);
      assert.notEqual(r5, true);
      assert.notEqual(r6, true);
    });
  });
  describe('Live Bitcoin Address', () => {
    it('return true for valid live address', () => {
      const validator = CryptoAddress({
        rules: {
          cryptoAddress: { tag: 'btc-live' },
        },
      });
      const r1 = validator('2MvXCpYTCpYLD7bdKxmG5JAbY9vt5eqPD27');
      const r2 = validator('2MvXCpYTCpYLD7bdKxmG5JAbY9vt5eqPD');
      const r3 = validator('n1EyyAjgiFN7iQqcTX7kJi4oXLZx4KNPnj');
      const r4 = validator('mgrCYKXkmgWLqZkLv6dhdkLHY2f1Y4qK1t');
      const r5 = validator('31w3iWUN5EMJMW2YRCc5m4RFqm3zN61xK2');
      const r6 = validator('1GXkHjRFMHHZ34DoXdzQziEiJ9RP1zbzt8');
      assert.notEqual(r1, true);
      assert.notEqual(r2, true);
      assert.notEqual(r3, true);
      assert.notEqual(r4, true);
      assert.equal(r5, true);
      assert.equal(r6, true);
    });
  });
});
