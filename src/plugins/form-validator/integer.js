import ruleEngine from './base';

export default (userOpts = {}) => {
  const defaultConfig = {
    places: 0,
  };
  const defaultRuleSet = {
    max: false,
    min: false,
    notNumber: true,
    required: true,
  };
  const opts = {
    config: { ...defaultConfig, ...userOpts.config },
    ruleList: { ...defaultRuleSet, ...userOpts.rules },
  };
  return ruleEngine(opts);
};
