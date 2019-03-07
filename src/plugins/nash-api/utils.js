// utils.js
import stringify from 'json-stable-stringify';
import request from 'request';
import Bluebird from 'bluebird';

Bluebird.promisifyAll(request);

const query = ({ opts, creds }) => function* execQuery({
  resourceUri,
  method,
  queryString,
  queryHeaders,
  body,
}) {
  const { host } = opts;
  const reqOpts = {
    json: true,
    headers: {
      'x-api-key': creds.API_KEY,
      ...queryHeaders,
    },
    qs: queryString,
    // timeout: 30,
    ...opts,
  };
  const uri = `${host}${resourceUri}`;
  console.log(uri);
  try {
    if (method === 'GET') {
      const resp = yield request.getAsync(uri, reqOpts);
      const { statusCode, body: replyBody } = resp.toJSON();
      return { success: true, statusCode, body: replyBody };
    }
    if (method === 'POST') {
      let signature = '';
      if (uri.indexOf('auth') === -1) {
        const bodyStr = stringify(body);
        signature = creds.signBody(bodyStr);
      }
      const postOpts = {
        json: true,
        headers: {
          'x-api-signature': signature,
          'x-api-key': creds.API_KEY,
        },
        body,
      };
      const resp = yield request.postAsync(uri, postOpts);
      const { statusCode, body: replyBody } = resp.toJSON();
      return { success: true, statusCode, body: replyBody };
    }
  } catch (err) {
    return { success: false, err };
  }
  return { success: false, err: new Error('Method not supported') };
};

export default query;
