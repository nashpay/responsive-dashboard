import * as types from './mutation-types';
import { query } from '../export';
import co from 'co';
import Bluebird from 'bluebird';

export const updateCreds = ({ commit }, val) => {
  commit(types.setCreds, val);
};

export const updateRootTXFilter = ({ commit }, val) => {
  commit(types.setRootTXFilter, val);
};

export const updateRootAccountBalance = ({ commit, state }, payload) => {
  co(query('accounts', 'balance', payload, state.creds)).then((res) => {
    console.log('Returned Res');
    console.log(res);
    commit(types.setRootAccountBalance, res.res.body);
  });
};

export const updateRootAccountTransactions = ({ commit, state }, payload) => {
  console.log('RootAccount TX called...'); 
  co(function* () {
    // TODO: Remove Hardcode
    const paymentList = yield query('payments', 'list', payload, state.creds);
    const transferList = yield query('transfers', 'list', payload, state.creds);
    console.log(paymentList);
    console.log(transferList);
    // Label the paymentList and transferList
    const deposits = paymentList.res.body.reduce((acc, row) => {
      // const newRow = Object.assign(row, { category: 'deposit' });
      const received = row.txs.reduce((aacc, row) => {
        const recv = parseFloat(parseFloat(row.received) / 100000000.0);
        return aacc + recv;
      }, 0);
      const confirmations = row.txs.reduce((aacc, row, i) => {
        const txCfm = row.confirmations;
        if (txCfm < aacc && aacc !== -1) { return txCfm };
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
    console.log(txList);
    commit(types.setRootAccountTransactions, txList); // TODO Remove HardCode

  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
};
