import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { storeFactory } from '../plugins/store-factory';

const schema = [
  'values',
  'errors',
];

const storeArgs = storeFactory(schema);

const getters = {
  // default sidebarStatus is 0, Hide
  // sidebarStatus: state => (state.sidebarStatus === 'STORE_DEFAULT' ? 0 : state.sidebarStatus),
  isValid: (state) => {
    const errorNum = Object.keys(state.errors)
      .reduce((acc, label) => acc.concat(state.errors[label]), [])
      .filter(x => x !== false);
    if(errorNum.length > 0) {
      return false;
    }
    return true;
  },
};

const store = new Vuex.Store({ ...storeArgs, getters });


export default store;
