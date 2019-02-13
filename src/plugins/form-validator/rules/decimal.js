import { Decimal } from 'decimal.js';


const ERROR_MSG = {
  NOT_A_NUMBER: x => `${x} is not a number`,
  MIN: y => x => `${x} is lesser than ${y}`,
  MAX: y => x => `${x} is greater than ${y}`,
};

const ruleMin = (opts = {}) => (x) => {
  const {
    value,
    eqs,
    rounded,
    ...decOpts
  } = opts;
  const n = new Decimal(value.toString(), decOpts);
  const y = new Decimal(x.toString(), decOpts);
  const cmp = y.lessThan(n);
  if (cmp) {
    return ERROR_MSG.MIN(n);
  }
  return true;
};

const ruleMax = (opts = {}) => (x) => {
  const { value, eqs = true, ...decOpts } = opts;
  const n = new Decimal(value.toString(), decOpts); // Value is the upper bound
  const y = new Decimal(x.toString(), decOpts);
  const res = eqs ? y.greaterThan(n) : y.greaterThanOrEqualTo(n);
  if (res) {
    return ERROR_MSG.MAX(n);
  }
  return true;
};

const ruleNotNumber = (opts = {}) => (x) => {
  const res = isNaN(x);
  if (res) {
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
