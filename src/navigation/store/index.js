import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import * as getters from './getters';
import * as actions from './actions';

// Store State

const store = {
  // popupScreen: types.popupEnum.LARGE,
  // layoverScreen: types.layoverEnum.SHOW,
  popupScreen: types.popupEnum.HIDE,
  layoverScreen: types.layoverEnum.HIDE,
  popupHeader: '',
  popupPage: '',
  activeTab: 'dashboardHome',
  formFocusCurrent: false,
  formFocusNext: false,
  formFocusPrev: false,
  formFocusIndex: 0,
  formFocusTotal: 0,
};

Vue.use(Vuex);

const mutations = {
  [types.popupScreen](state, val) {
    state.popupScreen = val;
  },
  [types.layoverScreen](state, val) {
    state.layoverScreen = val;
  },
  [types.popupHeader](state, val) {
    state.popupHeader = val;
  },
  [types.popupPage](state, val) {
    state.popupPage = val;
  },
  [types.activeTab](state, val) {
    state.activeTab = val;
  },
  [types.formFocus](state, {
    focusCurrent,
    focusNext,
    focusPrev,
    focusIndex,
    focusTotal,
  }) {
    const mutation = {
      formFocusCurrent: focusCurrent,
      formFocusNext: focusNext,
      formFocusPrev: focusPrev,
      formFocusIndex: focusIndex,
      formFocusTotal: focusTotal,
    };
    Object.assign(state, mutation);
  },
};

export default new Vuex.Store({
  actions,
  getters,
  state: store,
  mutations,
});
