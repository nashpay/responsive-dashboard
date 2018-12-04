import { BigNumber } from 'bignumber.js';
import Validator from './base';

const ErrorMsg = {
  NOT_A_NUMBER: x => `${x} is not a number`,
  LOWER_THAN_MIN: (x, y) => `${x} is lower than the minimum value of ${y}`,
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
    };
  }

  inlineCheck(inputData, schema) {
    const { name } = schema;
    schema.errorMsg = false;
    // Check that it can be a Number
    let stop = false;
    if (Math.isNaN(inputData) === true) {
      schema.errorMsg = ErrorMsg.NOT_A_NUMBER(name);
      schema.displayValue = inputData;
      stop = true;
    }
    if (inputData === '') {
      stop = true;
    }
    if (stop !== true) {
      const checks = Object.keys(this.ruleset).filter(k => this.ruleset[k] !== false && k !== 'meta');
      const res = checks.map(k => this.fnMap[k](inputData, this.ruleset[k]));
      res.some((row) => {
        if (row.success !== true) {
          schema.errorMsg = row.err;
          schema.displayValue = inputData;
          return true;
        }
        return false;
      });
    }
  }

  preCheck(inputVal) {
    return this;
  }

  checkMin(inputData, ruleVal) {
    // Convert to Number
    const raw = BigNumber(inputData);
    if (raw.isGreaterThanOrEqualTo(ruleVal) === true) {
      // Pass
      return { success: true, err: '' };
    }
    return { success: false, err: ErrorMsg.LOWER_THAN_MIN(inputData, ruleVal) };
  }
}

export default ValidateDecimal;
