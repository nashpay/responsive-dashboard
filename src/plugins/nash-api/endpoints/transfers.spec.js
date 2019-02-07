import co from 'co';
import { assert } from 'chai';
import nock from 'nock';

import Api from '../index';
import { API_KEY, API_SECRET } from '../stubs';

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
    it('should call list transferss endpoints with no arguments', (done) => {
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
      const mockCreateTransferReply = {
         //
         txInfo: {
           txinc: "02000000010c471fc88aa23e2ddb1d393a39ad467da09f079d4272d624530778a49426b8270000000000ffffffff02102700000000000017a914631441f745d8d419a58c33fc808e0e83fa7d420d87d04d1e000000000017a9145d61fb986d3e2be7918f86c1dd3605ce58a2a0458700000000",
           allInputs: [
             {
               redeem: "5221025626d8f08798da73aba87facd0fc38bc53a78d6dc014e61d9e9419b5a8ff83e22102ded2fdb140ada8bd42951e3ea288a8b9a7f0899156c2b9af110988b73e5f147a2102554f1bb274cd0ff59b09001f5bb6a70aed6551a221f312261b53a140b9ac10a853ae",
               txId: "27b82694a478075324d672429d079fa07d46ad393a391ddb2d3ea28ac81f470c",
               vout: 0,
               change: 0,
               index: 170,
               value: 2000000,
               cfmTxId: 91
             }
           ]
         },
         txInputs: [
           {
             txId: "27b82694a478075324d672429d079fa07d46ad393a391ddb2d3ea28ac81f470c",
             vout: 0,
             change: 0,
             index: 170,
             value: 2000000,
             cfmTxId: 91
           }
         ],
         txOutputs: [
           {
             address: "2N2H79oYtZi446FYi1oNxSoCTQVBYG4Vz3m",
             value: 10000
           },
           {
             address: "2N1kzD64dLPSG1EdEwvbVw6AQtfdZ1FNKHD",
             value: 1986000,
             addressId: 208
           }
         ],
         subAccountId: 1,
         currency: "BTC",
         network: "testnet"
      };
      const params = {
        addresses: [{
          address: '2N2H79oYtZi446FYi1oNxSoCTQVBYG4Vz3m',
          value: '0.0001',
        }]
      };
      const headerSignature = 'sOAehle/xYPmSj3zZoVpvHH50h2/7tsoDoi3PoMFsWLCpgXPTtYoHqIO4aKn7GTpZbHW2rIhlMXH1Bqg1PWAOlBIxKkNa70vHW0bO5XS/Y5yTz5Pwop72qvbje2HcI0/tk67jN+0T0F/PMis3p1mezk92vJeSSF2CdP7Pf9AqEqitQ4yGXVGLtLBPN1ztAU48+Sia4Xf0XkOoz5TQxstGVq7HGghIHLGtm9xJ65oC2Dvk7asqwdv7HiDutmkLUtLA+crIs6g10U9n8VVLT9UgA5hMDJGqgIstDsHG8d9D7Cbz3/S0r+lByu7DMa3Tnq2AvASnk6ksOpw9Adb9gkaNA==';
      const nockCreateTransfer = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
          'x-api-signature': headerSignature,
        },
      }).post('/api/v1/transfers', params)
        .reply(200, mockCreateTransferReply);
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
      const params = {
         //
         txInfo: {
           txinc: "02000000010c471fc88aa23e2ddb1d393a39ad467da09f079d4272d624530778a49426b82700000000b700483045022100b3b1f31a741fe05a8b732dd9c467a99ab7fc493191f1019f817b38c4173b928902201366c35df24130ce0fed33d348c585dcd077b5d2365d2ef37f0e429d0ae4f3f30100004c695221025626d8f08798da73aba87facd0fc38bc53a78d6dc014e61d9e9419b5a8ff83e22102ded2fdb140ada8bd42951e3ea288a8b9a7f0899156c2b9af110988b73e5f147a2102554f1bb274cd0ff59b09001f5bb6a70aed6551a221f312261b53a140b9ac10a853aeffffffff02102700000000000017a914631441f745d8d419a58c33fc808e0e83fa7d420d87d04d1e000000000017a9145d61fb986d3e2be7918f86c1dd3605ce58a2a0458700000000",
           allInputs: [
             {
               redeem: "5221025626d8f08798da73aba87facd0fc38bc53a78d6dc014e61d9e9419b5a8ff83e22102ded2fdb140ada8bd42951e3ea288a8b9a7f0899156c2b9af110988b73e5f147a2102554f1bb274cd0ff59b09001f5bb6a70aed6551a221f312261b53a140b9ac10a853ae",
               txId: "27b82694a478075324d672429d079fa07d46ad393a391ddb2d3ea28ac81f470c",
               vout: 0,
               change: 0,
               index: 170,
               value: 2000000,
               cfmTxId: 91
             }
           ]
         },
         txInputs: [
           {
             txId: "27b82694a478075324d672429d079fa07d46ad393a391ddb2d3ea28ac81f470c",
             vout: 0,
             change: 0,
             index: 170,
             value: 2000000,
             cfmTxId: 91
           }
         ],
         txOutputs: [
           {
             address: "2N2H79oYtZi446FYi1oNxSoCTQVBYG4Vz3m",
             value: 10000
           },
           {
             address: "2N1kzD64dLPSG1EdEwvbVw6AQtfdZ1FNKHD",
             value: 1986000,
             addressId: 208
           }
         ],
         subAccountId: 1,
         currency: "BTC",
         network: "testnet"
      };
      const reply = {
        result: "eee3db92a66f4779370a1689e8312f624feb972afe856c2cb2d1ca02e8a566f2",
        error: null,
        id: "feb86676-6723-4e9d-9b73-5f58c528eb86",
        statusCode: 200,
        currency: "BTC",
        network: "testnet"
      };
      const headerSignature = 'Cnf2Z7EJTexRiTjojVZlmOfNypy6A/BT4K4LUR0B0bxSlmL0kHku6/J0rXvqddA8oY8nMkwzzv7/5vnCRhcOBkUg5FWZWT0vQ+2nXYFfU63pqIlh6NhioS9Lvyf+K1lSWvsowtJ3KXLTldlJMv6WyfZeb7GoYI50KaEF2NxudywxItvmkP9B2QGK3+Q6840uzXTvn6/+1PZlpDfhVHH6QpOzz0vBsreDvuE8YhBSZRARI7TpcQ7ehXBuo6dFpkpi6Zi+caR5E9f5+byJHDnxIE+rzFoeBwiQcVEp0EijlrRBIpDIpACqD9NklvWdbYAquo+tt1eUeEEyy63HXnoL1g==';
      const nockCreateTransfer = nock(host, {
        reqheaders: {
          'x-api-key': API_KEY,
          'x-api-signature': headerSignature,
        },
      }).post('/api/v1/transfers/sign', params)
        .reply(200, reply);
      co(api.postTransferSign({
        body: params,
      }))
        .then(({ success, body }) => {
          nockCreateTransfer.done();
          assert.equal(success, true);
          done();
        }).catch(done);
    });
  });
});
