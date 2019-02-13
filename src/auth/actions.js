import accountCreator from './accountCreator';

const postAuth = function* postAuth({ connector, storeAuth, router }) {
  const accountReply = yield connector.getSubAccounts({});
  // const subAccList = accountReply.body.reduce((acc, x) => acc.concat(x.id.toString()), []);
  // const accountList = ['0', ...subAccList];
  const subAccList = accountReply.body.reduce((acc, x) => acc.concat({
    id: x.id.toString(),
    accountNumber: x.accountNum.toString(),
  }), []);
  const accountList = [{ id: '0', accountNumber: '10000' }, ...subAccList];
  const accountStores = {};
  accountList.forEach((row) => {
    const account = accountCreator({ subAccountId: row.id, accountNumber: row.accountNumber });
    account.dispatch('queryBalance');
    accountStores[row.id] = account;
  });
  storeAuth.dispatch('saveAccounts', accountStores);
  router.push({ name: 'payment-list' });
};

export {
  postAuth,
};
