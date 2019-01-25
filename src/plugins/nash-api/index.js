import Cred from './creds';
import Payments from './endpoints/payments';
import Query from './utils';

export default ({
  apiKey,
  apiSecret,
  host,
}) => {
  // SetUp and Verify Credentials
  const creds = Cred({ API_KEY: apiKey, API_SECRET: apiSecret });
  const queryAPI = Query({ opts: { host }, creds });
  const endpoints = {
    ...Payments,
  };
  const api = Object.keys(endpoints)
    .reduce((acc, name) => ({ ...acc, [name]: endpoints[name](queryAPI) }), {});
  return api;
};
