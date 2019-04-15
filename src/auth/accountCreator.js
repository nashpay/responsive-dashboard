import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import co from 'co';
import { storeFactory } from '../plugins/store-factory';
import storeAuth from './store';
// Import External Store

Vue.use(Vuex);


const accountCreator = ({ subAccountId = '0', accountNumber = '10000' }) => {
  const schema = [
    'accountBalancePending',
    'accountBalanceAvailable',
    'subAccountId',
    'accountNumber',
    'transferSingle',
    'paymentSingle',
    'accountMaxBalanceAmt',
    'accountAvailableCount',
  ];

  const storeArgs = storeFactory(schema);
  const queryHeaders = {};
  if (subAccountId !== '0') {
    queryHeaders['x-subaccount-id'] = subAccountId;
  }
  const actions = {
    queryBalance({ commit, state }) {
      co(storeAuth.state.connector.getBalance({
        queryString: {},
        queryHeaders,
      })).then(({ statusCode, success, body }) => {
        if (statusCode === 200 && success === true && Object.hasOwnProperty.call(body, 'err') === false) {
          const {
            available,
            pending,
            // currency,
            // network,
          } = body;
          commit('ACCOUNT_BALANCE_PENDING', pending);
          commit('ACCOUNT_BALANCE_AVAILABLE', available);
          commit('ACCOUNT_NUMBER', accountNumber);
        }
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    },
    getMaxBalance({ commit, state }, { satPerByte }) {
      co(storeAuth.state.connector.getMaxBalance({ satPerByte }))
        .then(({ statusCode, success, body }) => {
          if (statusCode === 200 && success === true) {
            const { maxAmt, available, availableCount } = body;
            commit('ACCOUNT_MAX_BALANCE_AMT', maxAmt);
            commit('ACCOUNT_BALANCE_AVAILABLE', available);
            commit('ACCOUNT_AVAILABLE_COUNT', availableCount);
          }
        }).catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    },
    getTransferById({ commit, state }, { transferId }) {
      co(storeAuth.state.connector.getTransferById({
        transferId,
        queryString: {},
      })).then(({ statusCode, success, body }) => {
        //
        // console.log(statusCode);
        // console.log(success);
        // console.log(body);
        if (statusCode === 200 && success === true) {
          const { results } = body;
          commit('TRANSFER_SINGLE', results);
        } else {
          commit('TRANSFER_SINGLE', null);
        }
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    },
    getPaymentById({ commit, state }, { paymentId }) {
      co(storeAuth.state.connector.getPaymentById({
        paymentId,
        queryString: {},
      })).then(({ statusCode, success, body }) => {
        //
        if (statusCode === 200 && success === true) {
          commit('PAYMENT_SINGLE', body);
        } else {
          commit('PAYMENT_SINGLE', null);
        }
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    },
  };

  const storeActions = { actions: { ...storeArgs.actions, ...actions } };
  const store = new Vuex.Store({ ...storeArgs, ...storeActions });
  return store;
};


export default accountCreator;
