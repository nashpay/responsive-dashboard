import Validator from './base';

const ErrorMsg = {
};

class ValidateCryptoAddress extends Validator {
  constructor(ruleset) {
    const defaultRuleSet = {
    };
    const rulesetList = Object.keys(defaultRuleSet);
    let i = 0;
    while (i < rulesetList.length) {
      const ruleName = rulesetList[i];
      if (Object.hasOwnProperty.call(ruleset, rulesetList[i]) === true) {
        defaultRuleSet[ruleName] = ruleset[ruleName];
      }
      i ++;
    }
    super(defaultRuleSet);
    this.fnMap = {
    };
  }
  inlineCheck (inputData, schema) {
    const { name } = schema;
    schema.errorMsg = false;
  }
  preCheck (inputVal) {

  }
  // Validation Check
}

export default ValidateCryptoAddress;
