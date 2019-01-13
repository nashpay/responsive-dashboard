import Validator from './base';

const ErrorMsg = {
  NO_SPECIAL_SYMBOLS: x => 'No special symbols',
  REQUIRED: x => 'Required',
};

const regExNoSpecialSymbols = new RegExp('^[A-z0-9 ]*$', 'g');

const clone = function clone(x) {
  return JSON.parse(JSON.stringify(x));
};

class ValidateSimpleText extends Validator {
  constructor(ruleset) {
    const defaultRuleSet = {
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
      noSpecialSymbols: this.checkNoSpecialSymbols,
    };
  }

  inlineCheck(inputData) {
    // Check that it can be a Number
    let output = false;
    let stop = false;
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

  checkNoSpecialSymbols(inputData) {
    // No Special Symbols
    const raw = clone(inputData);
    if (regExNoSpecialSymbols.test(raw) === true) {
      // Pass
      return { success: true, err: '' };
    }
    return { success: false, err: ErrorMsg.NO_SPECIAL_SYMBOLS(raw) };
  }
}


export default ValidateSimpleText;
