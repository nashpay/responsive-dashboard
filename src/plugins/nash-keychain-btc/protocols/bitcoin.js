import bitcoinJS from 'bitcoinjs-lib';

const Networks = {
  main: {
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
  testnet3: {
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

const getRedeemScript = network => (pubKeys) => {
  const redeemCondition = bitcoinJS.payments.p2ms({ m: 2, pubkeys: pubKeys, network });
  const p2sh = bitcoinJS.payments.p2sh({
    redeem: redeemCondition,
    network,
  });
  return p2sh.redeem.output;
};

const ecPairFromPrivateKey = (key, encoding, { network = Networks.main }) => {
  const wallet = bitcoinJS.ECPair.fromPrivateKey(Buffer.from(key, encoding), { network });
  return wallet;
};

const txInputSignatureReducer = (acc, signature) => {
  if (signature !== 0) {
    return acc + 1;
  }
  return acc;
};

const txInputReducer = (acc, { signatures }) => {
  const numSigned = signatures.reduce(txInputSignatureReducer, 0);
  const fullySigned = numSigned >= 2;
  return acc.concat(fullySigned);
};

const checkSignatures = inputs => [].every.call(inputs.reduce(txInputReducer, []), x => x === true);

const Transaction = ({
  networkName,
  pubKeys,
  inputs,
  outputs,
  script,
  data = null,
  cache = {},
}) => {
  let txBuilder = {};
  let txData = {};
  let txCache = { ...cache };
  let isFullySigned = false;
  let txHex = '';
  let redeemScript = '';
  const network = Networks[networkName];
  if (data !== null) {
    redeemScript = Buffer.from(script, 'hex');
    txData = bitcoinJS.Transaction.fromBuffer(Buffer.from(data, 'hex'));
    txBuilder = bitcoinJS.TransactionBuilder.fromTransaction(txData, network);
    const { __inputs: txInputs } = txBuilder;
    isFullySigned = checkSignatures(txInputs);
    if (isFullySigned === false) {
      txHex = txBuilder.buildIncomplete().toHex();
    } else {
      txHex = txBuilder.build().toHex();
    }
    txData = bitcoinJS.Transaction.fromBuffer(Buffer.from(txHex, 'hex'));
  } else {
    redeemScript = getRedeemScript(network)(pubKeys);
    txBuilder = new bitcoinJS.TransactionBuilder(network);
    inputs.forEach(input => txBuilder.addInput(input.txHash, input.vout));
    outputs.forEach(output => txBuilder.addOutput(output.address, output.value));
    txCache = { inputs, outputs };
    txHex = txBuilder.buildIncomplete().toHex();
    txData = bitcoinJS.Transaction.fromBuffer(Buffer.from(txHex, 'hex'));
  }
  return ({
    txData,
    txBuilder,
    txCache,
    txHex,
    isFullySigned,
    network,
    redeemScript,
    clone() {
      return bitcoinJS.TransactionBuilder.fromTransaction(this.txData, this.network);
    },
    signWithPrivKey(key, opts) {
      const privOpts = (typeof opts !== 'undefined' && opts !== null) ? opts : { encoding: 'hex' };
      const txBuilderCopy = this.clone();
      const ecPair = ecPairFromPrivateKey(key, privOpts.encoding, { network: this.network });
      this.txCache.inputs.forEach((input, idx) => {
        txBuilderCopy.sign(idx, ecPair, this.redeemScript);
      });
      const updatedData = txBuilderCopy.buildIncomplete().toHex();
      return Transaction({
        networkName,
        data: updatedData,
        script: this.redeemScript.toString('hex'),
        cache: this.txCache,
      });
    },
    submitSignedTransaction(hexData) {

    },
    getRedeemScript() {
      return this.redeemScript.toString('hex');
    },
    toHex() {
      return this.txHex;
    },
  });
};

export {
  Transaction,
  Networks,
};
