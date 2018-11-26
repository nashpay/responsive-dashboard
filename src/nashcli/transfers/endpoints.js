export default {
  list: {
    method: 'GET',
    uri: '/api/v1/transfers',
  },
  makeRequest: {
    method: 'POST',
    uri: '/api/v1/transfers',
  },
  makeAndSignRequest: {
    method: 'POST',
    uri: '/api/v1/transfers/sign',
  },
};
