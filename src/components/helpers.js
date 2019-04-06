import moment from 'moment';
import { Decimal } from 'decimal.js';

const unixToDateTime = (unixTS) => {
  const m = moment.unix(unixTS);
  return m.format('DD MMM YYYY HH:mm');
};

/** cryptonumber: A kind of crypto number
 *  @param {number} decimals - The number of decimals for the crypto number.
 *  @param {string} value - The value to store in the crypto number.
 *  @return {object} - A crypto number object
 */

const CURRENCIES = {
  'BTC': 9,
  'BCH': 9,
};

const ERROR_MSG = {
  NotSupported: x => `${x} is not a number and not a currency in supported currencies!`,
  NotInteger: x => `${x} is not an integer`,
  NotNumber: x => `${x} is not a number`,
};

const cryptonumber = decimals => (value, native = false) => {
  //
  let places = 0;
  if (isNaN(decimals) === true) {
    if (Object.keys(CURRENCIES).indexOf(decimals) === -1) {
      throw Error(ERROR_MSG.NotSupported(decimals));
    }
    places = CURRENCIES[decimals];
  } else {
    if (decimals % 1 !== 0) {
      throw new Error(ERROR_MSG.NotInteger(decimals));
    }
    places = decimals;
  }
  if (isNaN(value) === true) {
    throw new Error(ERROR_MSG.NotNumber(value));
  }
  const offset = new Decimal(`1${'0'.repeat(places - 1)}.0`);
  const ops = [
    'add',
    'div',
    'mul',
    'minus',
  ];

  const opsCmp = [
    'greaterThan',
    'greaterThanOrEqualTo',
    'lessThan',
    'lessThanOrEqualTo',
    'equals',
  ];

  const o = {
    decimals,
    offset,
    toNativeNumber() {
      return this.value.mul(this.offset).toNumber();
    },
    toString(sd = 3) {
      // return this.value.toPrecision(this.decimals);
      return this.value.toPrecision(sd);
    },
  };
  if (native === false) {
    Object.assign(o, { value: new Decimal(value.toString(), { precision: decimals }) });
  } else {
    Object.assign(o, { value: new Decimal(value.toString(), { precision: decimals }).div(offset) });
  }
  const fns = ops
    .map(x => [x, y => cryptonumber(decimals)(o.value[x](y.value).toString())])
    .reduce((acc, [k, fn]) => Object.assign(acc, { [k]: fn }), {});
  const fnsCmp = opsCmp
    .map(x => [x, y => o.value[x](y.value)])
    .reduce((acc, [k, fn]) => Object.assign(acc, { [k]: fn }), {});
  
  return { ...o, ...fns, ...fnsCmp };
};

export {
  unixToDateTime,
  cryptonumber,
  ERROR_MSG,
};
