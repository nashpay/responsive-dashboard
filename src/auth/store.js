import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { storeFactory } from '../plugins/store-factory';

const schema = ['connector', 'authenticated', 'accounts'];

const storeArgs = storeFactory(schema);

const getters = {
  isAuth: (state) => {
    return state.authenticated === 'STORE_DEFAULT' ? false : state.authenticated;
  },
  getDefaultAccount: (state) => {
    return state.accounts === 'STORE_DEFAULT' ? false : state.accounts['0'];
  },
  getAccountById: state => (id) => {
    return state.accounts[id];
  },
  getAllAccounts: (state) => {
    return state.accounts === 'STORE_DEFAULT' ? false : state.accounts;
  },
};

const store = new Vuex.Store({ ...storeArgs, getters });


export default store;
