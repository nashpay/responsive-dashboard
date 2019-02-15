import bitcoinJS from 'bitcoinjs-lib';
import bip39 from 'bip39';
import bip32 from 'bip32';
import base58 from 'bs58';

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

const txInputReducer = threshold => (acc, { signatures }) => {
  if (typeof signatures !== 'undefined') {
    const numSigned = signatures.reduce(txInputSignatureReducer, 0);
    const fullySigned = numSigned >= threshold;
    return acc.concat(fullySigned);
  }
  return acc.concat(false);
};

const checkSignatures = threshold => inputs => [].every.call(inputs.reduce(txInputReducer(threshold), []), x => x === true);

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
  let isPartiallySigned = false;
  let txHex = '';
  const network = Networks[networkName];
  if (data !== null) {
    txData = bitcoinJS.Transaction.fromBuffer(Buffer.from(data, 'hex'));
    txBuilder = bitcoinJS.TransactionBuilder.fromTransaction(txData, network);
    const { __inputs: txInputs } = txBuilder;
    isFullySigned = checkSignatures(2)(txInputs);
    isPartiallySigned = checkSignatures(1)(txInputs);
    if (isFullySigned === false) {
      txHex = txBuilder.buildIncomplete().toHex();
    } else {
      txHex = txBuilder.build().toHex();
    }
    txData = bitcoinJS.Transaction.fromBuffer(Buffer.from(txHex, 'hex'));
  } else {
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
    isPartiallySigned,
    network,
    clone() {
      return bitcoinJS.TransactionBuilder.fromTransaction(this.txData, this.network);
    },
    signWithPrivKey(key, opts) {
      const privOpts = (typeof opts !== 'undefined' && opts !== null) ? opts : { encoding: 'hex' };
      const txBuilderCopy = this.clone();
      const ecPair = ecPairFromPrivateKey(key, privOpts.encoding, { network: this.network });
      this.txCache.inputs.forEach((input, idx) => {
        txBuilderCopy.sign(idx, ecPair, Buffer.from(input.redeemScript, 'hex'));
      });
      const updatedData = txBuilderCopy.buildIncomplete().toHex();
      return Transaction({
        networkName,
        data: updatedData,
        cache: this.txCache,
      });
    },
    signWithHDWallet(wallet) {
      const txBuilderCopy = this.clone();
      this.txCache.inputs.forEach((input, idx) => {
        // For Each Input, derive according to change and index
        const target = wallet.derive(input.change).derive(input.index);
		// const ecPair = ecPairFromPrivateKey(target.getPrivKey(), { network: this.network });
		const ecPair = bitcoinJS.ECPair.fromPrivateKey(target.getPrivKey(), { network });
 
        txBuilderCopy.sign(idx, ecPair, Buffer.from(input.redeemScript, 'hex'));
      });
      const updatedData = txBuilderCopy.buildIncomplete().toHex();
      return Transaction({
        networkName,
        data: updatedData,
        cache: this.txCache,
      });
    },
    submitSignedTransaction(hexData) {

    },
    toHex() {
      return this.txHex;
    },
  });
};

const Wallet = ({ HD }) => {
  return ({
    HD,
    fromSeedphrase(phrase, path, networkName) {
	  const seed = bip39.mnemonicToSeed(phrase);
      const network = Networks[networkName];
      const root = bip32.fromSeed(seed, network);
      const HD = root.derivePath(path);
      return Wallet({ HD });
    },
    derive(child) {
      return Wallet({ HD: this.HD.derive(child) });
    },
    getPrivKey() {
      return this.HD.privateKey;
    },
  });
};

export {
  Transaction,
  Networks,
  Wallet,
};