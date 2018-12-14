import chalk from 'chalk';
import Joi from 'joi';
import crypto from 'crypto';
import request from 'request';
import stringify from 'json-stable-stringify';
import Bluebird from 'bluebird';
import joiErrorFormatter from 'joi-error-formatter';
import bip32 from 'bip32';
import bitcoinlib from 'bitcoinjs-lib';

Bluebird.promisifyAll(request);
//
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
const signTX = function signTX(txInfo, privKey, network) {
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

const checkArg = function checkArg(args, argName, envName, errMsg) {
  if (typeof process.env[envName] === 'undefined') {
    if (Object.hasOwnProperty.call(args, argName) !== true) {
      throw Error(chalk.red(errMsg));
    }
    process.env[envName] = args[argName];
  }
};

const promptResource = function promptResource(api) {
  const choices = Object.keys(api);
  const cmdp = {
    type: 'list',
    name: 'endpoint',
    message: 'Choose an endpoint',
    choices,
  };
  return cmdp;
};

const getArraySchema = function getArraySchema(schema, arrayKey) {
  const nodes = Joi.describe(schema).children;
  const arrRow = nodes[arrayKey];
  const arrSchema = arrRow.items[0].children;
  const params = Object.keys(arrSchema);
  const promptList = [];
  if (params.length > 0) {
    let i = 0;
    while (i < params.length) {
      const nodeKey = params[i];
      const nodeVal = arrSchema[nodeKey];
      if (Object.hasOwnProperty.call(nodeVal, 'valids')) {
        // Use a list
        const pmptRow = {
          //
          type: 'list',
          name: nodeKey,
          message: `Choose a ${nodeKey}`,
          choices: nodeVal.valids,
        };
        promptList.push(pmptRow);
      } else {
        //
        const pmptRow = {
          type: 'input',
          name: nodeKey,
        };
        promptList.push(pmptRow);
      }
      i += 1;
    }
    return promptList;
  }
  return [];
};

const promptEndpoint = function promptEndpoint(schema) {
  const nodes = Joi.describe(schema).children;
  const params = Object.keys(nodes);
  const promptList = [];
  if (params.length > 0) {
    let i = 0;
    while (i < params.length) {
      const nodeKey = params[i];
      const nodeVal = nodes[nodeKey];
      const nodeType = nodeVal.type;
      if (nodeKey !== 'slave') {
        if (Object.hasOwnProperty.call(nodeVal, 'valids')) {
          // Use a list
          const pmptRow = {
            //
            type: 'list',
            name: nodeKey,
            message: `Choose a ${nodeKey}`,
            choices: nodeVal.valids,
          };
          promptList.push(pmptRow);
        } else if (nodeType === 'array') {
          //
          const pmptRow = {
            //
            type: 'input',
            name: nodeKey,
            message: `Number of ${nodeKey}`,
          };
          promptList.push(pmptRow);
        } else {
          //
          const pmptRow = {
            type: 'input',
            name: nodeKey,
          };
          promptList.push(pmptRow);
        }
      }
      i += 1;
    }
    return promptList;
  }
  return [];
};

const sanitizeInputs = function sanitizeInputs(schema, raw) {
  const nodes = Joi.describe(schema).children;
  const params = Object.keys(nodes);
  const cleaned = {};
  if (params.length > 0) {
    let i = 0;
    while (i < params.length) {
      const nodeKey = params[i];
      const nodeVal = nodes[nodeKey];
      if (nodeVal.type === 'number') {
        cleaned[nodeKey] = Number(raw[nodeKey]);
      } else {
        cleaned[nodeKey] = raw[nodeKey];
      }
      i += 1;
    }
    // Add in slave
    if (Object.hasOwnProperty.call(cleaned, 'slave')) {
      cleaned.slave = raw.slave;
    }
    return cleaned;
  }
  return raw;
};
const signPayload = function signPayload(message, privPem) {
  /*
  const priv = ursa.createPrivateKey(privPem, '', 'base64');
  const hash = crypto.createHash('sha256');
  hash.update(message);
  const payload = hash.digest();
  const signer = ursa.createSigner('sha256');
  signer.update(payload);
  const signed = signer.sign(priv);
  return signed;
  */
};

const runRequest = function* runRequest(endpointInfo, endpointData, headers) {
  //
  Object.assign(headers, { 'X-API-KEY': process.env.API_KEY });
  const reqOpts = {
    json: true,
    headers,
    timeout: 300000, // 3 min timeout
  };
  try {
    if (endpointInfo.method === 'GET') {
      //
      const uri = `${process.env.ENDPOINT}${endpointInfo.uri}`;
      const resp = yield request.getAsync(uri, reqOpts);
      return resp.toJSON().body;
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
      const uri = `${process.env.ENDPOINT}${endpointInfo.uri}`;
      const resp = yield request.postAsync(uri, reqOpts);
      return resp.toJSON().body;
    }
  } catch (err) {
    if (err) {
      console.error(err);
      return false;
    }
  }
};


const clone = function clone(x) {
  return JSON.parse(JSON.stringify(x));
};

const execRequest = function* execRequest(apiRes, endpoint, cache) {
  const schema = apiRes.schema[endpoint](Joi);
  const preEndpoint = promptEndpoint(schema);
  const endpointPmt = yield apiRes.hooks[endpoint].prePrompt(preEndpoint, cache);
  // const endpointInput = yield inquirer.prompt(endpointPmt);
  const endpointInput = '';
  const endpointPost = yield apiRes.hooks[endpoint].postPrompt(endpointInput, schema);
  const sanitized = sanitizeInputs(schema, endpointPost);
  const { error: vError, value: vRes } = Joi.validate(sanitized, schema);
  if (vError !== null) {
    const vMsg = joiErrorFormatter(vError);
    throw Error(chalk.red(vMsg));
  }
  const { payload, headers } = yield apiRes.hooks[endpoint].preReq(vRes, cache);
  const res = yield runRequest(apiRes.endpoints[endpoint], payload, headers);
  return { res, payload };
  //
};

export {
  clone,
  checkArg,
  getArraySchema,
  sanitizeInputs,
  promptResource,
  promptEndpoint,
  execRequest,
  runRequest,
  signTX,
};
