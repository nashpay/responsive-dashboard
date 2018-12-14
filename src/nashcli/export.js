// For Browser CLI
// import chalk from 'chalk';
// import ursa from 'ursa';
// import crypto from 'crypto';
import NodeRSA from 'node-rsa';
import Bluebird from 'bluebird';
import request from 'request';
import stringify from 'json-stable-stringify';
import bip32 from 'bip32';
import bitcoinlib from 'bitcoinjs-lib';
import api from './index';

Bluebird.promisifyAll(request);
//
const signPayload = function signPayload(payloadStr, secret) {
  const privKey = new NodeRSA(atob(secret));
  // const encoded = node(secret, Buffer.from(payloadStr));
  const encoded = privKey.encrypt(payloadStr, 'base64');
  return encoded;
};
// TX Signing Stuff
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
const estimateFee = function estimateFee(tx, inputs) {
  const size = tx.virtualSize();
  const outputVal = tx.outs.reduce((acc, x) => acc + x.value, 0);
  const inputVal = inputs.reduce((acc, x) => acc + x.value, 0);
  // In Satoshis
  const currentFee = inputVal - outputVal;
  const currentSatPerByte = parseFloat(currentFee / size).toFixed(2);
  return { currentFee, size, satPerByte: currentSatPerByte };
};
//
const isFullySigned = function isFullySigned(txInc, network) {
  try {
    const rawTX = bitcoinlib.Transaction.fromBuffer(Buffer.from(txInc, 'hex'));
    const txb = bitcoinlib.TransactionBuilder.fromTransaction(rawTX, network);
    const { __inputs: inputs } = txb;
    // check signatures for all inputs.
    const inputCheck = [];
    inputs.forEach((input) => {
      // Either first or second signature not zero is sufficient
      const { signatures } = input;
      const signed = signatures.reduce((acc, x) => {
        if (x !== 0) {
          return acc + 1;
        }
        return acc;
      }, 0);
      if (signed >= 2) {
        return inputCheck.push(true);
      }
      return inputCheck.push(false);
    });
    if ([].every.call(inputCheck, x => x === true)) {
      return true;
    }
    return false;
  } catch (err) {
    if (err) { console.log(err); }
    return false;
  }
};
//
const signTX = function signTX(txInfo, privKey, networkLabel) {
  const network = networkMap[networkLabel];
  //
  const HD = bip32.fromBase58(privKey, network);
  // Need to derive the change and index before converting to ECPair
  const { allInputs: inputs, txinc: txInc } = txInfo;
  const rawTX = bitcoinlib.Transaction.fromBuffer(Buffer.from(txInc, 'hex'));
  const txb = bitcoinlib.TransactionBuilder.fromTransaction(rawTX, network);
  // const buf = Buffer.from(pubkeyStr, 'hex');
  // bitcoinlib.ECPair.fromPublicKey(buf, { network });
  inputs.forEach((x, i) => {
    const childPriv = HD.derive(x.change).derive(x.index).privateKey;
    const keyPair = bitcoinlib.ECPair.fromPrivateKey(childPriv, { network });
    txb.sign(i, keyPair, Buffer.from(x.redeem, 'hex'));
    // Build Incomplete
  });
  const txinc = txb.buildIncomplete();
  const fullySigned = isFullySigned(txinc.toHex(), network);
  if (fullySigned === true) {
    const txStr = txb.build().toHex();
    const txBuf = Buffer.from(txStr, 'hex');
    const tx = bitcoinlib.Transaction.fromBuffer(txBuf);
    const feeInfo = estimateFee(tx, inputs);
    return { tx: txStr, feeInfo };
  }
  return { txinc: txinc.toHex(), allInputs: inputs };
};

const runRequest = function* runRequest(endpointInfo, endpointData, headers, creds) {
  //
  Object.assign(headers, { 'X-API-KEY': creds.API_KEY });
  const reqOpts = {
    json: true,
    headers,
    timeout: 30, // 30 seconds timeout
  };
  try {
    if (endpointInfo.method === 'GET') {
      //
      const uri = `${creds.API_SERVER_URL}${endpointInfo.uri}`;
      const resp = yield request.getAsync(uri, reqOpts);
      return resp.toJSON();
    }
    if (endpointInfo.method === 'POST') {
      // Need to Stringify and Sign
      const payloadStr = stringify(endpointData);
      const signature = signPayload(payloadStr, creds.API_SECRET);
      Object.assign(reqOpts, {
        body: endpointData,
      });
      Object.assign(reqOpts.headers, {
        'X-API-Signature': signature,
      });
      const uri = `${creds.API_SERVER_URL}${endpointInfo.uri}`;
      const resp = yield request.postAsync(uri, reqOpts);
      return resp.toJSON();
    }
  } catch (err) {
    if (err) {
      return false;
    }
  }
  return false;
};
//
const execRequest = function* execRequest(resource, endpoint, rawPayload, creds) {
  const { payload, headers } = yield resource.hooks[endpoint].preReq(rawPayload, {});
  const res = yield runRequest(resource.endpoints[endpoint], payload, headers, creds);
  return { res, payload };
};
//
const query = function* query(resource, endpoint, payload, creds) {
  const result = yield execRequest(api[resource], endpoint, payload, creds);
  return result;
};


export {
  query,
  signTX,
};
