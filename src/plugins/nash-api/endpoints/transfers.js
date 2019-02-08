const endpoints = {
  getTransfers: queryFn => function getTransfers({ queryString }) {
    return queryFn({
      resourceUri: '/api/v1/transfers',
      method: 'GET',
      queryString,
    });
  },
  getBalance: queryFn => function getBalance({ queryString }) {
    return queryFn({
      resourceUri: '/api/v1/transfers/balance',
      method: 'GET',
      queryString,
    });
  },
  postTransferRequest: queryFn => function postTransferRequest({ queryString, body }) {
    return queryFn({
      resourceUri: '/api/v1/transfers',
      method: 'POST',
      queryString,
      body,
    });
  },
  postTransferSign: queryFn => function postTransferRequest({ queryString, body }) {
    return queryFn({
      resourceUri: '/api/v1/transfers/sign',
      method: 'POST',
      queryString,
      body,
    });
  },
};

export default endpoints;
