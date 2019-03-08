import ruleEngine from './base';
    

export default (userOpts = {}) => {
  const defaultConfig = {
  };
  const defaultRuleSet = {
    required: true,
    noSpecialChars: true,
  };
  const opts = {
    config: { ...defaultConfig, ...userOpts.config },
    ruleList: { ...defaultRuleSet, ...userOpts.rules },
  };
  return ruleEngine(opts);
};
