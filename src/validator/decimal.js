import { BigNumber } from 'bignumber.js';
import Validator from './base';

const ErrorMsg = {
  NOT_A_NUMBER: x => 'Is not a number',
  REQUIRED: x => 'Required',
  LOWER_THAN_MIN: x => `Min value is ${x}`,
  LARGER_THAN_MAX: x => `Max value is ${x}`,
};

class ValidateDecimal extends Validator {
  constructor(ruleset) {
    const defaultRuleSet = {
      min: false,
      max: false,
      precision: false,
      meta: {},
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
      min: this.checkMin,
      max: this.checkMax,
    };
  }

  inlineCheck(inputData) {
    // Check that it can be a Number
    let output = false;
    let stop = false;
    if (isNaN(inputData) === true) {
      output = ErrorMsg.NOT_A_NUMBER();
      stop = true;
    }
    if (inputData === '') {
      output = ErrorMsg.REQUIRED();
      stop = true;
    }
    if (stop !== true) {
      const checks = Object.keys(this.ruleset).filter(k => this.ruleset[k] !== false && k !== 'meta');
      const res = checks.map(k => this.fnMap[k].apply(this, [inputData]));
      res.some((row) => {
        if (row.success !== true) {
          output = row.err;
          return true;
        }
        return false;
      });
    }
    return output;
  }

  preCheck(inputVal) {
    return this;
  }

  checkMin(inputData) {
    const ruleVal = this.ruleset.min;
    // Convert to Number
    const raw = BigNumber(inputData);
    if (raw.isGreaterThanOrEqualTo(ruleVal) === true) {
      // Pass
      return { success: true, err: '' };
    }
    return { success: false, err: ErrorMsg.LOWER_THAN_MIN(ruleVal) };
  }

  checkMax(inputData) {
    const ruleVal = this.ruleset.max;
    // Convert to Number
    const raw = BigNumber(inputData);
    const check = raw.isLessThanOrEqualTo(ruleVal);
    if (raw.isLessThanOrEqualTo(ruleVal) === true) {
      // Pass
      return { success: true, err: '' };
    }
    return { success: false, err: ErrorMsg.LARGER_THAN_MAX(ruleVal) };
  }
}


export default ValidateDecimal;
