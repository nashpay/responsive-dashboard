import { Decimal } from 'decimal.js';

const ERROR_MSG = {
  REQUIRED: x => `${x} is required`,
  NOT_A_NUMBER: x => `${x} is not a number`,
};

const ruleRequired = (opts = {}) => x => {
  if (x === null || typeof x === 'undefined') {
    return ERROR_MSG.REQUIRED;
  }
  return true;
};

const ruleMin = (opts = {}) => x => {
  const lowerNumber = new Decimal(opts.value.toString(), { precision: opts.places });
  
};

const ruleNotNumber = (opts = {}) => x => {
   if (isNaN(x)) {
     return ERROR_MSG.NOT_A_NUMBER;
   }
   return true;
};

const ruleMap = {
  required: ruleRequired,
  notNumber: ruleNotNumber,
};

export default (opts = {}) => y => {
  const defaultConfig = {
    places: 0,
  };
  const defaultRuleset = {
    max: false,
    min: false,
    notNumber: true,
    required: true,
  };
  const config = { ...defaultConfig, ...opts.config };
  const ruleList = { ...defaultRuleset, ...opts.ruleset };
  const execRuleSet = Object.keys(ruleList)
    .filter(x => ruleList[x] !== false)
    .reduce((acc, x) => acc.concat(ruleMap[x]({ ...defaultConfig, ...ruleList[x]})), [])
    .reduce((acc, x) => acc.concat(x(y)), [])
    .filter(x => x !== true);
  const output = execRuleSet.length > 0 ? execRuleSet: true;
  return output;
};
