// For Browser CLI
// import chalk from 'chalk';
// import ursa from 'ursa';
import crypto from 'crypto-js';
import Bluebird from 'bluebird';
import request from 'request';
import stringify from 'json-stable-stringify';
import Joi from 'joi';
import bip32 from 'bip32';
import bitcoinlib from 'bitcoinjs-lib';
import api from './index';
import store from './store';

Bluebird.promisifyAll(request);
//
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
      console.log(JSON.stringify(resp.toJSON(), null, 2));
      return resp.toJSON();
    }
    if (endpointInfo.method === 'POST') {
      // Need to Stringify and Sign
      const payloadStr = stringify(endpointData);
      const signature = signPayload(payloadStr, process.env.API_SECRET).toString('base64');
      Object.assign(reqOpts, {
        body: endpointData,
      });
      Object.assign(reqOpts.headers, {
        'X-API-Signature': signature,
      });
      const uri = `${creds.API_SERVER_URL}${endpointInfo.uri}`;
      console.log('Sending req...');
      console.log(JSON.stringify(reqOpts, null, 2));
      const resp = yield request.postAsync(uri, reqOpts);
      console.log(JSON.stringify(resp.toJSON(), null, 2));
      return resp.toJSON();
    }
  } catch (err) {
    if (err) {
      console.error(err);
      return false;
    }
  }
};
//
const execRequest = function* execRequest(resource, endpoint, rawPayload, creds) {
  //
  console.log('execRequest called...');
  console.log(resource);
  /*
  const schema = resource.schema[endpoint](Joi);
  console.log('schema...');
  console.log(schema);
  const sanitized = sanitizeInputs(schema, rawPayload);
  const { error: vError, value: vRes } = Joi.validate(sanitized, schema);
  if (vError !== null) {
    throw Error(vError);
  }
  */
  const { payload, headers } = yield resource.hooks[endpoint].preReq(rawPayload, {});
  console.log('runRequest...');
  const res = yield runRequest(resource.endpoints[endpoint], payload, headers, creds);
  return { res, payload };
};
//
const query = function* query(resource, endpoint, payload, creds) {
  console.log('query...');
  const result = yield execRequest(api[resource], endpoint, payload, creds);
  return result;
};


export {
  query,
};
