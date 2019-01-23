import bitcoinlib from 'bitcoinjs-lib';

const regexNoSpecialSymbols = new RegExp('[^a-zA-Z0-9 -]*', 'g');
const regexAlphaNumeric = new RegExp('[^a-zA-Z0-9]*', 'g');

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
};

const ruleNoSpecialChars = (opts = {}) => (x) => {
  if (regexNoSpecialSymbols.exec(x) === null) {
    return ERROR_MSG.NO_SPECIAL_CHARS;
  }
  return true;
};
const ruleAlphaNumeric = (opts = {}) => (x) => {
  if (regexAlphaNumeric.exec(x) === null) {
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


const ruleMap = {
  noSpecialChars: ruleNoSpecialChars,
  alphaNumeric: ruleAlphaNumeric,
  cryptoAddress: ruleCryptoAddress,
};

export default ruleMap;
