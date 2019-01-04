import Decimal from './decimal';
import CryptoAddress from './cryptoAddress';
import SimpleText from './simpleText';

const validateTypes = {
  Decimal,
  CryptoAddress,
  SimpleText,
};
const clone = function clone(x) {
  return JSON.parse(JSON.stringify(x));
};
/*
const validate = function validate(evt, schema) {
  const inputData = clone(evt.target.value);
  const validator = new validatorMap[schema.type](schema);
  validator.inlineCheck(inputData, schema);
};
*/
/*
const validate = function validate(evt, schema, validator) {
  const inputData = clone(evt.target.value);
  validator.inlineCheck(inputData, schema);
};
*/

export {
  // validate,
  validateTypes,
};
