const endpoints = {
  getTransfers: queryFn => function getTransfers({ queryString }) {
    return queryFn({
      resourceUri: '/api/v1/transfers',
      method: 'GET',
      queryString,
    });
  },
  /*
  getTransferRequest: queryFn => function getTransferRequest({ queryString, body }) {
    return queryFn({
      resourceUri: '/api/v1/transfer',
      method: 'POST',
      queryString,
      body,
    });
  },
  */
};

export default endpoints;
