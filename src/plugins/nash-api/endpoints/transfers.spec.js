import co from 'co';
import { assert } from 'chai';
import nock from 'nock';

import Api from '../index';
import { API_KEY, API_SECRET } from '../stubs';
import { createTransferReply, signTransferPostBody } from './transfers.stubs';

describe('NASH API v1 Transfers', () => {
  let api = {};
  const host = 'http://18.136.149.71:31447';
  before(() => {
    api = Api({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      host,
    });
  });
  describe('Get Transferss', () => {
    it('should call list transfers endpoints with no arguments', (done) => {
      const nockListTransfer = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
        },
      }).get('/api/v1/transfers')
        .reply(200, { results: [], nextId: false, prevId: false });

      co(api.getTransfers({}))
        .then(({ success, body }) => {
          nockListTransfer.done();
          assert.equal(success, true);
          done();
        }).catch(done);
    });
    it('should call list transfers endpoints with before_id and limit arguments', (done) => {
      const nockListTransfer = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
        },
      }).get('/api/v1/transfers?limit=30&before_id=1')
        .reply(200, { results: [], nextId: false, prevId: false });

      co(api.getTransfers({ queryString: { limit: 30, before_id: 1 } }))
        .then(({ success, body }) => {
          nockListTransfer.done();
          assert.equal(success, true);
          done();
        }).catch(done);
    });
  });
  describe('Create Transfers', () => {
    it('should call create transfer request endpoint with arguments', (done) => {
      const params = {
        addresses: [{
          address: '2N2H79oYtZi446FYi1oNxSoCTQVBYG4Vz3m',
          value: '0.0001',
        }],
      };
      const headerSignature = 'sOAehle/xYPmSj3zZoVpvHH50h2/7tsoDoi3PoMFsWLCpgXPTtYoHqIO4aKn7GTpZbHW2rIhlMXH1Bqg1PWAOlBIxKkNa70vHW0bO5XS/Y5yTz5Pwop72qvbje2HcI0/tk67jN+0T0F/PMis3p1mezk92vJeSSF2CdP7Pf9AqEqitQ4yGXVGLtLBPN1ztAU48+Sia4Xf0XkOoz5TQxstGVq7HGghIHLGtm9xJ65oC2Dvk7asqwdv7HiDutmkLUtLA+crIs6g10U9n8VVLT9UgA5hMDJGqgIstDsHG8d9D7Cbz3/S0r+lByu7DMa3Tnq2AvASnk6ksOpw9Adb9gkaNA==';
      const nockCreateTransfer = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
          'x-api-signature': headerSignature,
        },
      }).post('/api/v1/transfers', params)
        .reply(200, createTransferReply);
      co(api.postTransferRequest({
        body: params,
      }))
        .then(({ success, body }) => {
          nockCreateTransfer.done();
          assert.equal(success, true);
          done();
        }).catch(done);
    });
    it('should call sign transfer request endpoint with arguments', (done) => {
      const reply = {
        result: 'eee3db92a66f4779370a1689e8312f624feb972afe856c2cb2d1ca02e8a566f2',
        error: null,
        id: 'feb86676-6723-4e9d-9b73-5f58c528eb86',
        statusCode: 200,
        currency: 'BTC',
        network: 'testnet',
      };
      const headerSignature = 'Cnf2Z7EJTexRiTjojVZlmOfNypy6A/BT4K4LUR0B0bxSlmL0kHku6/J0rXvqddA8oY8nMkwzzv7/5vnCRhcOBkUg5FWZWT0vQ+2nXYFfU63pqIlh6NhioS9Lvyf+K1lSWvsowtJ3KXLTldlJMv6WyfZeb7GoYI50KaEF2NxudywxItvmkP9B2QGK3+Q6840uzXTvn6/+1PZlpDfhVHH6QpOzz0vBsreDvuE8YhBSZRARI7TpcQ7ehXBuo6dFpkpi6Zi+caR5E9f5+byJHDnxIE+rzFoeBwiQcVEp0EijlrRBIpDIpACqD9NklvWdbYAquo+tt1eUeEEyy63HXnoL1g==';
      const nockCreateTransfer = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
          'x-api-signature': headerSignature,
        },
      }).post('/api/v1/transfers/sign', signTransferPostBody)
        .reply(200, reply);
      co(api.postTransferSign({
        body: signTransferPostBody,
      }))
        .then(({ success, body }) => {
          nockCreateTransfer.done();
          assert.equal(success, true);
          done();
        }).catch(done);
    });
  });
});
