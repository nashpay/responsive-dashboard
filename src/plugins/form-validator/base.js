import decimalRuleMap from './rules/decimal';
import textRuleMap from './rules/text';


const ERROR_MSG = {
  REQUIRED: x => `${x} is required`,
};

const ruleRequired = (opts = {}) => (x) => {
  if (x === null || typeof x === 'undefined' || x === '') {
    return ERROR_MSG.REQUIRED;
  }
  return true;
};

const ruleMap = {
  required: ruleRequired,
  ...decimalRuleMap,
  ...textRuleMap,
};
//
const engine = (opts = {}) => (y) => {
  const { ruleList, config } = opts;
  const fieldReducer = label => (acc, x, idx) => {
    if (x === label) {
      const checkRequired = ruleMap[x]({ ...config, ...ruleList[x] })(y);
      if (checkRequired !== true) {
        return [x];
      }
    }
    if (idx > 0 && acc.length === 1 && acc[0] === label) {
      return acc;
    }
    return acc.concat(x);
  };
  // required, notNumber must be executed first if present
  const execRuleSet = Object.keys(opts.ruleList)
    .reduce(fieldReducer('required'), [])
    .reduce(fieldReducer('notNumber'), [])
    .filter(x => ruleList[x] !== false)
    .reduce((acc, x) => acc.concat(ruleMap[x]({ ...config, ...ruleList[x] })), [])
    .reduce((acc, x) => acc.concat(x(y)), [])
    .filter(x => x !== true);
  const output = execRuleSet.length > 0 ? execRuleSet : true;
  return output;
};

export default engine;
