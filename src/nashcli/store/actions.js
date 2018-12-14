import co from 'co';
import * as types from './mutation-types';
import { query, signTX } from '../export';

export const updateCreds = ({ commit }, val) => {
  commit(types.setCreds, val);
};

export const updateRootTXFilter = ({ commit }, val) => {
  commit(types.setRootTXFilter, val);
};

export const updateRootAccountBalance = ({ commit, state }, payload) => {
  co(query('accounts', 'balance', payload, state.creds)).then((res) => {
    commit(types.setRootAccountBalance, res.res.body);
  });
};

export const updateRootAccountTransactions = ({ commit, state }, payload) => {
  co(function* () {
    // TODO: Remove Hardcode
    const paymentList = yield query('payments', 'list', payload, state.creds);
    const transferList = yield query('transfers', 'list', payload, state.creds);
    // Label the paymentList and transferList
    const deposits = paymentList.res.body.reduce((acc, row) => {
      // const newRow = Object.assign(row, { category: 'deposit' });
      const received = row.txs.reduce((aacc, roww) => {
        const recv = parseFloat(parseFloat(roww.received) / 100000000.0);
        return aacc + recv;
      }, 0);
      const confirmations = row.txs.reduce((aacc, roww, i) => {
        const txCfm = roww.confirmations;
        if (txCfm < aacc && aacc !== -1) { return txCfm; }
        if (aacc === -1) return txCfm;
        return aacc;
      }, -1);
      const newRow = {
        id: row.id,
        billed: row.amount.toFixed(6),
        category: 'deposit',
        amount: received.toFixed(6),
        amountFiat: '63.00',
        currencyFiat: 'USD',
        address: row.address,
        stat: Number(row.state),
        confirmations,
      };
      return acc.concat(newRow);
    }, []);
    const transfers = transferList.res.body.reduce((acc, row) => {
      // const newRow = Object.assign(row, { category: 'transfer' });
      const newRow = {
        id: row.id,
        category: 'transfer',
        amount: row.outputs[0].amt.toFixed(6),
        amountFiat: '63.00',
        currencyFiat: 'USD',
        address: row.outputs[0].address,
        stat: Number(row.state),
        confirmations: 1,
      };
      return acc.concat(newRow);
    }, []);
    const txList = Array.concat(deposits, transfers);
    commit(types.setRootAccountTransactions, txList); // TODO Remove HardCode
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const sendTransferRequest = ({ commit, state }, payload) => {
  co(function* () {
    // TODO: Remove Hardcode
    const sendTransfer = { addresses: payload.addresses, slave: 'default' };
    const { store: transferStore, types: transferTypes } = payload;
    const transferResp = yield query('transfers', 'makeRequest', sendTransfer, state.creds);
    transferStore.dispatch('updateTransferResponse', transferResp.res.body);
    transferStore.dispatch('updateTransferStep', transferTypes.stepEnum.REVIEW);
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const signTransferRequest = ({ commit, state }, payload) => {
  co(function* () {
    // Sign
    // const sendTransfer = { addresses: payload.addresses, slave: 'default' };
    const { store: transferStore, types: transferTypes, networkLabel } = payload;
    const transferInfo = transferStore.getters.transferResponse;
    const signed = signTX(transferInfo.txInfo, state.creds.CRED_STORE[networkLabel], networkLabel);
    transferInfo.txInfo = signed;
    // TODO: Remove Hardcode
    const transferResp = yield query('transfers', 'makeAndSignRequest', transferInfo, state.creds);
    transferStore.dispatch('updateTransferResponse', transferResp.res.body);
    transferStore.dispatch('updateTransferStep', transferTypes.stepEnum.COMPLETE);
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
};
