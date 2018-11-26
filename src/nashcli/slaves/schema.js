export default {
  list: joi => joi.object().keys({}),
  create: joi => joi.object().keys({
    name: joi.string().alphanum(),
  }),
};
