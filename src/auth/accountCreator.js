import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import co from 'co';
import { storeFactory } from '../plugins/store-factory';
import storeAuth from './store';
// Import External Store

Vue.use(Vuex);


const accountCreator = ({ subAccountId = '0' }) => {
  const schema = ['accountBalancePending', 'accountBalanceAvailable', 'subAccountId'];

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
