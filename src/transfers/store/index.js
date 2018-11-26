import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import * as getters from './getters';
import * as actions from './actions';

// Store State

const store = {
  transferStep: types.stepEnum.ACCOUNT,
  subAccountId: -1,
  recipientList: [],
  transferDetails: {},
  transferRequestStatus: types.transferRequestEnum.NIL,
  transferResponse: {},
  recipientAddBtn: types.recipientAddBtnEnum.SHOW,
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
    console.log('Saving Transfer Response');
    console.log(val);
    state.transferResponse = val;
    console.log('New State...');
    console.log(state.transferResponse);
  },
  [types.recipientAddBtn](state, val) {
    state.recipientAddBtn = val;
  },
};

export default new Vuex.Store({
  actions,
  getters,
  state: store,
  mutations,
});
