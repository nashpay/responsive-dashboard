const endpoints = {
  getTransfers: queryFn => function getTransfers({ queryString }) {
    return queryFn({
      resourceUri: '/api/v1/transfers',
      method: 'GET',
      queryString,
    });
  },
  getTransferById: queryFn => function getTransfers({ transferId, queryString }) {
    return queryFn({
      resourceUri: `/api/v1/transfers/${transferId}`,
      method: 'GET',
      queryString,
    });
  },
  getBalance: queryFn => function getBalance({ queryString, queryHeaders }) {
    return queryFn({
      resourceUri: '/api/v1/transfers/balance',
      method: 'GET',
      queryString,
      queryHeaders,
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
