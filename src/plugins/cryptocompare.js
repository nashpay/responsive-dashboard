import co from 'co';
import Bluebird from 'bluebird';
import request from 'request';

Bluebird.promisifyAll(request);

export default (apiStore, apiKey) => () => co(function* q() {
  const uri = 'https://min-api.cryptocompare.com/data/price';
  // TODO Remove hardcode for fsym and tsym
  const cryptoPairs = ['BTC'];
  const fiatPairs = ['USD', 'EUR'];
  const tsyms = fiatPairs.join(',');
  const fsyms = cryptoPairs.join(',');

  const qs = { fsyms, api_key: apiKey, tsyms };
  const res = yield request.getAsync({ uri, qs });
  const body = JSON.parse(res.toJSON().body);
  
});
