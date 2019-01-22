import { Decimal } from 'decimal.js';

const ERROR_MSG = {
  NOT_A_NUMBER: x => `${x} is not a number`,
  MIN: y => x => `${x} is lesser than ${y}`,
  MAX: y => x => `${x} is greater than ${y}`,
};

const ruleMin = (opts = {}) => (x) => {
  const n = new Decimal(opts.value.toString(), { precision: opts.places });
  const y = new Decimal(x.toString(), { precision: opts.places });
  if (y.lessThan(n)) {
    return ERROR_MSG.MIN(n);
  }
  return true;
};

const ruleMax = (opts = {}) => (x) => {
  const n = new Decimal(opts.value.toString(), { precision: opts.places });
  const y = new Decimal(x.toString(), { precision: opts.places });
  if (y.greaterThan(n)) {
    return ERROR_MSG.MAX(n);
  }
  return true;
};

const ruleNotNumber = (opts = {}) => (x) => {
  if (isNaN(x)) {
    return ERROR_MSG.NOT_A_NUMBER;
  }
  return true;
};

const ruleMap = {
  notNumber: ruleNotNumber,
  min: ruleMin,
  max: ruleMax,
};

export default ruleMap;
/*
export default (opts = {}) => (y) => {
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
    .reduce((acc, x) => acc.concat(ruleMap[x]({ ...config, ...ruleList[x] })), [])
    .reduce((acc, x) => acc.concat(x(y)), [])
    .filter(x => x !== true);
  const output = execRuleSet.length > 0 ? execRuleSet : true;
  return output;
};
*/
