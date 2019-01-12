import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

const types = {
  stepEnum: {
    ACCOUNT: 0,
    DETAILS: 1,
    RESULT: 2,
  },
  depositStep: 'DEPOSIT_STEP',
  subAccountId: 'SUB_ACCOUNT_ID',
  depositDetails: 'DEPOSIT_DETAILS',
  depositRequestStatus: 'DEPOSIT_REQUEST_STATUS',
  depositRequestEnum: {
    NIL: 0,
    SENT: 1,
    RECEIVED: 2,
    TIME_OUT: 3,
  },
  depositResponse: 'DEPOSIT_RESPONSE',
};
// Actions
const actions = {
  updateDepositStep: ({ commit }, val) => {
    commit(types.depositStep, val);
  },
  updateSubAccountId: ({ commit }, val) => {
    commit(types.subAccountId, val);
  },
  updateDepositDetails: ({ commit }, val) => {
    commit(types.depositDetails, val);
  },
  updateDepositRequestStatus: ({ commit }, val) => {
    commit(types.depositRequestStatus, val);
  },
  updateDepositResponse: ({ commit }, val) => {
    commit(types.depositResponse, val);
  },
};
//
const getters = {
  depositStep: state => state.depositStep,
  subAccountId: state => state.subAccountId,
  depositDetails: state => state.depositDetails,
  depositRequestStatus: state => state.depositRequestStatus,
  depositResponse: state => state.depositResponse,
};

const state = {
  depositStep: types.stepEnum.ACCOUNT,
  subAccountId: -1,
  depositDetails: {},
  depositRequestStatus: types.depositRequestEnum.NIL,
  depositResponse: {},
};

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

const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
});

export {
  types,
  store,
};
