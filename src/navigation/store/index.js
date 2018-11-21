import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import * as getters from './getters.js';
import * as actions from './actions.js';

// Store State

const store = {
  // popupScreen: types.popupEnum.LARGE,
  // layoverScreen: types.layoverEnum.SHOW,
  popupScreen: types.popupEnum.HIDE,
  layoverScreen: types.layoverEnum.HIDE,
  popupHeader: '',
  popupPage: '',
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
};

export default new Vuex.Store({
  actions,
  getters,
  state: store,
  mutations,
});
