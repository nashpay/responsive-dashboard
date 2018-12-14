import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import * as getters from './getters';
import * as actions from './actions';

// Store State

const store = {
  prices: {}, // { fiatEnum: String }
  apiKey: '', // API KEY
  apiProvider: '',
  baseCurrency: types.fiatEnum.USD, // USD By Default
};

Vue.use(Vuex);

const mutations = {
  [types.updatePrice](state, px) {
    Object.assign(state, { prices: px });
  },
  [types.updateAPIKey](state, apiKey) {
    Object.assign(state, { apiKey });
  },
  [types.updateAPIProvider](state, apiProvider) {
    Object.assign(state, { apiProvider });
  },
  [types.updateBaseCurrency](state, baseCurrency) {
    Object.assign(state, { baseCurrency });
  },
};

export default new Vuex.Store({
  actions,
  getters,
  state: store,
  mutations,
});
