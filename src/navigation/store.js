// Store Layout
// 1. Mutations
// 2. Getters
// 3. State
// 4. Actions
import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { storeFactory } from '../plugins/store-factory';

const schema = ['sidebarStatus'];

const storeArgs = storeFactory(schema);

const getters = {
  // default sidebarStatus is 0, Hide
  // sidebarStatus: state => (state.sidebarStatus === 'STORE_DEFAULT' ? 0 : state.sidebarStatus),
  sidebarStatus: (state) => {
    const sstat = (state.sidebarStatus === 'STORE_DEFAULT' ? 0 : state.sidebarStatus);
    return sstat;
  },
};

const store = new Vuex.Store({ ...storeArgs, getters });


export default store;
