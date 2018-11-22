import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import * as getters from './getters.js';
import * as actions from './actions.js';

// Store State

const store = {
  transferStep: types.stepEnum.ACCOUNT,
  subAccountId: -1,
  recipientList: [],
  transferDetails: {},
  transferRequestStatus: types.transferRequestEnum.NIL,
  transferResponse: {},
};

Vue.use(Vuex);

const mutations = {
  [types.transferStep](state, val) {
    state.transferStep = val;
  },
  [types.subAccountId](state, val) {
    state.subAccountId = val;
  },
  [types.recipientList](state, val) {
    state.recipientList = val;
  },
  [types.transferDetails](state, val) {
    state.transferDetails = val;
  },
  [types.transferRequestStatus](state, val) {
    state.transferRequestStatus = val;
  },
  [types.transferResponse](state, val) {
    state.transferReponse = val;
  },
};

export default new Vuex.Store({
  actions,
  getters,
  state: store,
  mutations,
});
