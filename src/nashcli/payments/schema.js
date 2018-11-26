const validTags = [
  'btc-live',
  'btc-testnet',
];

export default {
  list: joi => joi.object().keys({
    slave: joi.string(),
  }),
  create: joi => joi.object().keys({
    slave: joi.string(),
    tag: joi.string().valid(validTags).required(),
    amount: joi.number().positive().precision(8).required(),
    fiatCurrency: joi.string(),
    fiatAmount: joi.string(),
    customerRef: joi.string().alphanum(),
  }),
};
