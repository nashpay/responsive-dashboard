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
const engine = (opts = {}) => {
  const { ruleList, config } = opts;
  return ({
    ruleList,
    config,
    updateRules(newRules) {
      this.ruleList = { ...this.ruleList, ...newRules };
    },
    validate(y) {
      const fieldReducer = label => (acc, x, idx) => {
        if (x === label) {
          const checkEnabled = this.ruleList[x] !== false && typeof this.ruleList[x] !== 'undefined';
          const checkRequired = ruleMap[x]({ ...config, ...this.ruleList[x] })(y);
          if (checkEnabled !== false) {
            if (checkRequired !== true) {
              return [x];
            }
            return acc;
          }
          return acc;
        }
        if (idx > 0 && acc.length === 1 && acc[0] === label) {
          return acc;
        } else if (idx > 0) {
          const res = Array.concat(acc, [x]);
          return res;
        }
        return [x];
      };
      // required, notNumber must be executed first if present
      const execRuleSet = Object.keys(ruleMap)
        .reduce(fieldReducer('required'), [])
        .reduce(fieldReducer('notNumber'), [])
        .filter(x => this.ruleList[x] !== false && typeof this.ruleList[x] !== 'undefined')
        // .reduce((acc, x) => acc.concat(ruleMap[x]({ ...this.config, ...this.ruleList[x] })), [])
        .reduce((acc, x) => {
          const validatorFn = ruleMap[x]({ ...this.config, ...this.ruleList[x] });
          const res = acc.concat(validatorFn);
          return res;
        }, [])
        // .reduce((acc, x) => acc.concat(x(y)), [])
        .reduce((acc, x) => {
          const res = x(y);
          return acc.concat(res);
        }, [])
        .filter(x => x !== true);
      const output = execRuleSet.length > 0 ? execRuleSet : true;
      console.log(`Validation Output: ${output}`);
      return output;
    },
  });
};

export default engine;
