import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import * as getters from './getters.js';
import * as actions from './actions.js';

// Store State

const store = {
  depositStep: types.stepEnum.ACCOUNT,
  subAccountId: -1,
  depositDetails: {},
  depositRequestStatus: types.depositRequestEnum.NIL,
  depositResponse: {},
};

Vue.use(Vuex);

const mutations = {
  [types.depositStep](state, val) {
    state.depositStep = val;
  },
  [types.subAccountId](state, val) {
    state.subAccountId = val;
  },
  [types.depositDetails](state, val) {
    state.depositDetails = val;
  },
  [types.depositRequestStatus](state, val) {
    state.depositRequestStatus = val;
  },
  [types.depositResponse](state, val) {
    state.depositReponse = val;
  },
};

export default new Vuex.Store({
  actions,
  getters,
  state: store,
  mutations,
});
