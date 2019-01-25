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
      /*
      const nockListPayment = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
        },
      }).get('/api/v1/payments')
        .reply(200, []);
      */

      co(api.listPayments({}))
        .then(({ success, body }) => {
          // nockListPayment.done();
          assert.equal(success, true);
          done();
        }).catch(done);
    });
  });
  describe('Create Payments', () => {
    it('should call list payments endpoints with no arguments', (done) => {
      /*
      const nockListPayment = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
        },
      }).get('/api/v1/payments')
        .reply(200, []);
      */
      const params = {
        customerRef: 'abc1',
        currency: 'BTC',
        amount: '0.00001',
        fiatCurrency: 'USD',
        fiatAmount: '0.006',
        timestamp: '1535181343',
        network: 'testnet',
      };
      co(api.createPayment({
        body: params,
      }))
        .then(({ success, body }) => {
          assert.equal(success, true);
          console.log(body);
          done();
        }).catch(done);
    });
  });
});
