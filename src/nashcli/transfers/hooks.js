import base from './index';
import { getArraySchema, clone, signTX, execRequest } from '../utils';
//
const networkMap = {
  'btc-live': {
    wif: 0x80,
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    units: 100000000,
  },
  'btc-testnet': {
    wif: 0xef,
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    units: 100000000,
  },
};

export default {
  list: {
    prePrompt: function* prePrompt(prior, cache) {
      // return yield cache.promptSlave(prior);
    },
    postPrompt: function* postPrompt(pInput, schema) {
      return pInput;
    },
    preReq: function* preReq(rawPayload, cache) {
      const payload = { };
      Object.assign(payload, rawPayload);
      const headers = {};
      if (payload.slave !== 'default') {
        const subAccId = yield cache.getSubAccountIdByName(payload.slave);
        Object.assign(headers, { 'X-SubAccount-Id': subAccId });
      }
      delete payload.slave;
      return { payload, headers };
    },
    postReq: () => {

    },
  },
  makeRequest: {
    prePrompt: function* prePrompt(prior, cache) {
      return yield cache.promptSlave(prior);
    },
    postPrompt: function* postPrompt(pInput, schema) {
      return pInput;
    },
    preReq: function* preReq(rawPayload, cache) {
      const payload = clone(rawPayload);
      const headers = {};
      if (rawPayload.slave !== 'default') {
        const subAccId = yield cache.getSubAccountIdByName(rawPayload.slave);
        Object.assign(headers, { 'X-SubAccount-Id': subAccId });
      }
      delete payload.slave;
      delete payload.tag;
      return { payload, headers };
    },
    postReq: () => {

    },
  },
  makeAndSignRequest: {
    prePrompt: function* prePrompt(prior, cache) {
      return yield cache.promptSlave(prior);
    },
    postPrompt: function* postPrompt(pInput, schema) {
      return pInput;
    },
    preReq: function* preReq(rawPayload, cache) {
      // Call for the makeRequest
      const { res: transferInfo } = yield execRequest(base, 'makeRequest', cache);
      const network = networkMap['btc-testnet'];
      const signed = signTX(transferInfo.txInfo, process.env.PRIV_BTC_TESTNET, network);
      transferInfo.txInfo = signed;
      const payload = clone(transferInfo);
      delete payload.slave;
      delete payload.tag;
      //
      const headers = {};
      if (rawPayload.slave !== 'default') {
        const subAccId = yield cache.getSubAccountIdByName(rawPayload.slave);
        Object.assign(headers, { 'X-SubAccount-Id': subAccId });
      }
      return { payload, headers };
    },
    postReq: () => {

    },
  },
};
