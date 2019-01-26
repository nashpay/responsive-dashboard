import co from 'co';
import { assert } from 'chai';
import nock from 'nock';

import Api from '../index';
import { API_KEY, API_SECRET } from '../stubs';

describe('NASH API v1 Payments', () => {
  let api = {};
  const host = 'http://18.136.149.71:31447';
  before(() => {
    api = Api({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      host,
    });
  });
  describe('List Payments', () => {
    it('should call list payments endpoints with no arguments', (done) => {
      const nockListPayment = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
        },
      }).get('/api/v1/payments')
        .reply(200, []);

      co(api.listPayments({}))
        .then(({ success, body }) => {
          nockListPayment.done();
          assert.equal(success, true);
          done();
        }).catch(done);
    });
  });
  describe('Create Payments', () => {
    it('should call list payments endpoints with no arguments', (done) => {
      const params = {
        customerRef: 'abc1',
        currency: 'BTC',
        amount: '0.00001',
        fiatCurrency: 'USD',
        fiatAmount: '0.006',
        timestamp: '1535181343',
        network: 'testnet',
      };
      const headerSignature = 'KoZLe04WUoVQOQN62H5bxhucchXv9kkKmt+5sO+DhS/Jhrkm8h+V2LEXogibZitoUAdkMDY4KcydLlwA7FUHVk6uOL9++cK8ArP5I8grwkJGt6GYWpg4LgdK/4rZC/BTeXWP+m6j2l7wYcPkC/jdVT5d7TjnfqfwyCSSGbhoUk4eEKVIkc46kmPMrb51oYt87xasmcxH3fPS4CDkDDLL3NFXfZKR2zUTr8pi8GgmebRIbTS0bIZpAPbr4Mk4P5CtkvZenC8O2EA5YZi8MOpxRwLxxNwSaV420RadlLofht1x+7uNnFyNKSBulGjTklft5PzwjydssDtnHmyvivE7Mg==';
      const nockCreatePayment = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
          'x-api-signature': headerSignature,
        },
      }).post('/api/v1/payments', params)
        .reply(200, []);
      co(api.createPayment({
        body: params,
      }))
        .then(({ success, body }) => {
          nockCreatePayment.done();
          assert.equal(success, true);
          done();
        }).catch(done);
    });
  });
});
