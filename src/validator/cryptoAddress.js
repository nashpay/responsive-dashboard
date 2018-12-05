import bitcoinlib from 'bitcoinjs-lib';
import Validator from './base';
import { NETWORK } from '../constants';

const ErrorMsg = {
  INVALID_ADDRESS: x => 'Invalid Address',
};

class ValidateCryptoAddress extends Validator {
  constructor(ruleset) {
    const defaultRuleSet = {
      'bitcoin-live': false,
      'bitcoin-testnet': false,
    };
    const rulesetList = Object.keys(defaultRuleSet);
    let i = 0;
    while (i < rulesetList.length) {
      const ruleName = rulesetList[i];
      if (Object.hasOwnProperty.call(ruleset, rulesetList[i]) === true) {
        defaultRuleSet[ruleName] = ruleset[ruleName];
      }
      i += 1;
    }
    super(defaultRuleSet);
    this.fnMap = {
      'bitcoin-live': this.checkBitcoinLive,
      'bitcoin-testnet': this.checkBitcoinTestnet,
    };
  }

  inlineCheck(inputData) {
    let output = false;
    let stop = false;
    if (inputData === '') {
      stop = true;
    }
    if (stop !== true) {
      const checks = Object.keys(this.ruleset).filter(k => this.ruleset[k] !== false && k !== 'meta');
      const res = checks.map(k => this.fnMap[k].apply(this, [inputData]));
      res.some((row) => {
        if (row.success !== true) {
          output = row.err;
          return false;
        }
        return true;
      });
    }
    return output;
  }

  preCheck(inputVal) {
    return this;
  }
  // Validation Check
  checkBitcoinLive(inputData) {
    try {
      //
      bitcoinlib.address.toOutput(inputData, NETWORK['btc-live']);
      return { success: true, err: false };
    } catch (err) {
      return { success: false, err: ErrorMsg.INVALID_ADDRESS };
    }
  }

  checkBitcoinTestnet(inputData) {
    try {
      //
      bitcoinlib.address.toOutput(inputData, NETWORK['btc-testnet']);
      return { success: true, err: false };
    } catch (err) {
      return { success: false, err: ErrorMsg.INVALID_ADDRESS };
    }
  }
}

export default ValidateCryptoAddress;
