const endpoints = {
  getSubAccounts: queryFn => function getSubAccounts({ queryString }) {
    return queryFn({
      resourceUri: '/api/v1/slaves',
      method: 'GET',
      queryString,
    });
  },
  createSubAccount: queryFn => function createSubAccount({ queryString, body }) {
    return queryFn({
      resourceUri: '/api/v1/slaves',
      method: 'POST',
      queryString,
      body,
    });
  },
  createAccount: queryFn => function createAccount({ queryString, body }) {
    return queryFn({
      resourceUri: '/api/v1/auth/register',
      method: 'POST',
      queryString,
      body,
    });
  },
};

export default endpoints;
