import accountCreator from './accountCreator';

const postAuth = function* postAuth({ connector, storeAuth, router }) {
  const accountReply = yield connector.getSubAccounts({});
  const subAccList = accountReply.body.reduce((acc, x) => acc.concat(x.id.toString()), []);
  const accountList = ['0', ...subAccList];
  const accountStores = {};
  accountList.forEach((subAccountId) => {
    const account = accountCreator({ subAccountId });
    account.dispatch('queryBalance');
    accountStores[subAccountId] = account;
  });
  storeAuth.dispatch('saveAccounts', accountStores);
  router.push({ name: 'payment-list' });
};

export {
  postAuth,
};
