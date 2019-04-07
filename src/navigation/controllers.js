// Middleware to be run on every route change
import { cryptonumber } from '../components/helpers';

const pageRefreshHook = (storeAuth) => {
  const CN = cryptonumber('BTC');
  return ({
    refreshAllBalances () {
      const accounts = storeAuth.getters.getAllAccounts;
      const accountIds = Object.keys(accounts);
      accountIds.forEach((accountId) => {
        accounts[accountId].dispatch('queryBalance');
      });
    },
    getAllAccountBalance () {
      let totalPending = CN('0');
      let totalAvailable = CN('0');
      const accounts = storeAuth.getters.getAllAccounts;
      if (accounts !== false) {
        const accountIds = Object.keys(accounts);
        accountIds.forEach((accountId) => {
          const account = accounts[accountId];
          const stateAvailable = account.state.accountBalanceAvailable;
          const statePending = account.state.accountBalancePending;
          if (stateAvailable !== 'STORE_DEFAULT' && statePending !== 'STORE_DEFAULT') {
            totalPending = totalPending.add(CN(account.state.accountBalancePending));
            totalAvailable = totalAvailable.add(CN(account.state.accountBalanceAvailable));
          }
        });
      }
      return { totalPending, totalAvailable };
    },
    getTransferById (transferId, accountId = '0') {
      const account = storeAuth.getters.getAccountById(accountId);
      account.dispatch('getTransferById', { transferId });
    },
    renderTransferById (accountId = '0') {
      const account = storeAuth.getters.getAccountById(accountId);
      return account.state.transferSingle;
    }
  });
}
export default pageRefreshHook;
