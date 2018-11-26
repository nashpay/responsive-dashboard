const validTags = [
  'btc-live',
  'btc-testnet',
];

export default {
  list: joi => joi.object().keys({
    slave: joi.string(),
  }),
  makeRequest: joi => joi.object().keys({
    slave: joi.string(),
    tag: joi.string().valid(validTags).required(),
    addresses: joi.array().items(
      joi.object().keys({
        address: joi.string().alphanum().required(),
        value: joi.number().required(),
      }),
    ).required(),
  }),
  makeAndSignRequest: joi => joi.object().keys({
    slave: joi.string(),
  }),
};
