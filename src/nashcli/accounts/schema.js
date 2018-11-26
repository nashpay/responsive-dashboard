export default {
  balance: joi => joi.object().keys({
    slave: joi.string(),
  }),
};
