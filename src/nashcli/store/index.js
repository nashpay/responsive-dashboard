import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import * as getters from './getters.js';
import * as actions from './actions.js';

// Store State

const store = {
  creds: {}, // Creds { API_SERVER_URL, API_KEY, API_SECRET, CRED_STORE }
  rootAccountBalance: {}, // { pending: 0, available: 0 }
  rootAccountTransactions: [],
  rootTXFilter: 'deposit',
};

Vue.use(Vuex);

const mutations = {
  [types.setCreds](state, val) {
    state.creds = val;
  },
  [types.setRootAccountBalance](state, val) {
    console.log(`rootAccountBalance; ${val}`);
    state.rootAccountBalance = val;
  },
  [types.setRootAccountTransactions](state, val) {
    console.log(`rootAccountTransactions; ${val}`);
    state.rootAccountTransactions = val;
  },
  [types.setRootTXFilter](state, val) {
    state.rootTXFilter = val;
  },

};

export default new Vuex.Store({
  actions,
  getters,
  state: store,
  mutations,
});
