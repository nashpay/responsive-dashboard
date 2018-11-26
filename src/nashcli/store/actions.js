import * as types from './mutation-types';
import { query } from '../export';
import co from 'co';
import Bluebird from 'bluebird';

export const updateCreds = ({ commit }, val) => {
  commit(types.setCreds, val);
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
  co(Bluebird.map([
    query('payments', 'list', payload, state.creds),
    query('transfers', 'list', payload, state.creds),
  ])).then((res) => {
    console.log('Returned Res');
    console.log(res);
    // commit(types.setRootAccountTransactions, res.res.body);
  });
};
