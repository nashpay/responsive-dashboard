import bitcoinlib from 'bitcoinjs-lib';
import bip39 from 'bip39';

const regexNoSpecialChars = new RegExp('[^a-zA-Z0-9 -]', 'gm');
const regexAlphaNumeric = new RegExp('[^a-zA-Z0-9]', 'gm');

const NETWORK = {
  'btc-live': {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
  },
  'btc-testnet': {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  },
};

const ERROR_MSG = {
  ALPHA_NUMERIC: x => `${x} is not alphanumeric`,
  NO_SPECIAL_CHARS: x => `${x} has special characters`,
  INVALID_ADDRESS: x => `${x} is an invalid address`,
  BIP39_SHORT_PHRASE: x => 'Mnemonic phrase needs minimum of 12 words',
  BIP39_BAD_PHRASE: x => 'Mnemonic phrase is invalid',
};

const ruleNoSpecialChars = (opts = {}) => (x) => {
  const res = regexNoSpecialChars.test(x);
  if (res === true || x.indexOf('?') > -1) {
    return ERROR_MSG.NO_SPECIAL_CHARS;
  }
  return true;
};
const ruleAlphaNumeric = (opts = {}) => (x) => {
  if (regexAlphaNumeric.exec(x) !== null) {
    return ERROR_MSG.ALPHA_NUMERIC;
  }
  return true;
};

const ruleCryptoAddress = (opts = {}) => (x) => {
  const { tag } = opts;
  const coin = tag.split('-')[0];
  if (coin === 'btc') {
    try {
      bitcoinlib.address.toOutputScript(x, NETWORK[tag]);
      return true;
    } catch (e) {
      return ERROR_MSG.INVALID_ADDRESS;
    }
  }
  return null;
};

const ruleIsBIP39 = (opts = {}) => (x) => {
  const phraseLength = x.trim().split(/\s+/g).length
  if (phraseLength < 12) {
    return ERROR_MSG.BIP39_SHORT_PHRASE;
  }
  const res = bip39.validateMnemonic(x);
  if (res === true) {
    return true;
  } else {
    return ERROR_MSG.BIP39_BAD_PHRASE;
  }
};


const ruleMap = {
  noSpecialChars: ruleNoSpecialChars,
  alphaNumeric: ruleAlphaNumeric,
  cryptoAddress: ruleCryptoAddress,
  isBIP39: ruleIsBIP39,
};

export default ruleMap;
