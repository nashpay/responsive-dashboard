import decimalRuleMap from './rules/decimal';


const ERROR_MSG = {
  REQUIRED: x => `${x} is required`,
};

const ruleRequired = (opts = {}) => (x) => {
  if (x === null || typeof x === 'undefined') {
    return ERROR_MSG.REQUIRED;
  }
  return true;
};

const ruleMap = {
  required: ruleRequired,
  ...decimalRuleMap,
};
//
const engine = (opts = {}) => (y) => {
  const { ruleList, config } = opts;
  const execRuleSet = Object.keys(opts.ruleList)
    .filter(x => ruleList[x] !== false)
    .reduce((acc, x) => acc.concat(ruleMap[x]({ ...config, ...ruleList[x] })), [])
    .reduce((acc, x) => acc.concat(x(y)), [])
    .filter(x => x !== true);
  const output = execRuleSet.length > 0 ? execRuleSet : true;
  return output;
};

export default engine;
