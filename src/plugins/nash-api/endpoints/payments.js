const endpoints = {
  listPayments: queryFn => function listPayments({ queryString }) {
    console.log('listPayments called.');
    return queryFn({
      resourceUri: '/api/v1/payments',
      method: 'GET',
      queryString,
    });
  },
  createPayment: queryFn => function createPayment({ queryString, body }) {
    return queryFn({
      resourceUri: '/api/v1/payments',
      method: 'POST',
      queryString,
      ...body,
    });
  },
};

export default endpoints;
