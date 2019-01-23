import ruleEngine from './base';

export default (userOpts = {}) => {
  const defaultConfig = {
    precision: 2,
    rounded: false,
  };
  const defaultRuleSet = {
    max: false,
    min: false,
    notNumber: true,
    required: true,
  };
  /*
  const defaultRuleSet = [{
    label: 'required', value: true,
  }, {
    label: 'notNumber', value: true,
  }, {
    label: 'max', value: false,
  }, {
    label: 'min', value: false,
  }];
  */
  const opts = {
    config: { ...defaultConfig, ...userOpts.config },
    ruleList: { ...defaultRuleSet, ...userOpts.rules },
  };
  return ruleEngine(opts);
};
