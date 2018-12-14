import co from 'co';
import Bluebird from 'bluebird';
import request from 'request';
import * as types from './store/mutation-types';

Bluebird.promisifyAll(request);

export default apiKey => co(function* q() {
  // const uri = 'https://min-api.cryptocompare.com/data/price?fsym=BTC';
  const uri = 'https://min-api.cryptocompare.com/data/price';
  // TODO Remove Hardcode for BTC
  const qs = { fsym: 'BTC', api_key: apiKey };
  const tsyms = Object.keys(types.fiatEnum).join(',');
  Object.assign(qs, { tsyms });
  const res = yield request.getAsync({
    uri,
    qs,
  });
  const resObj = JSON.parse(res.toJSON().body);
  const pxMap = Object.keys(resObj).reduce((acc, currency) => {
    const rawPx = resObj[currency];
    const pxKey = types.fiatEnum[currency];
    acc[pxKey] = String(rawPx);
    return acc;
  }, {});
  return pxMap;
});
