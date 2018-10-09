import Vue from 'vue/dist/vue';

import Vuex from 'vuex';

import * as types from './mutation-types';

import * as actions from './actions';

import * as getters from './getters';

// State
const stateStore = {
  siderbarOn: false,
  headerTitle: '',
  headerBackLink: false,
  headerActionIcon: false,
  headerActionLink: false,
  activeTab: '',
  // Settings Provider Data
  providerList: [],
};

const mutations = {
  [types.sidebarSwitch](state, val) {
    state.sidebarOn = val;
  },
  [types.titleSet](state, val) {
    state.headerTitle = val;
  },
  [types.tabActive](state, val) {
    state.activeTab = val;
  },
  [types.headerBackLinkSet](state, val) {
    state.headerBackLink = val;
  },
  [types.headerActionIconSet](state, val) {
    state.headerActionIcon = val;
  },
  [types.headerActionLinkSet](state, val) {
    state.headerActionLink = val;
  },
};

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  state: stateStore,
  mutations,
});
