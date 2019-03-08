import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { storeFactory } from '../../plugins/store-factory';

Vue.use(Vuex);

const schema = [
  'values',
  'errors',
];

const storeArgs = storeFactory(schema);

const stateReducer = state => (k) => {
  const keyList = Object.keys(state[k]);
  const poj = keyList.reduce((acc, key) => ({ ...acc, [key]: state[k][key] }), {});
  return poj;
  // Object.keys(state[k]).reduce((acc, x) => ({ ...acc, [x]: state[k][x] }), {});
};
const defaultReducer = state => k => defaultVal => (state[k] === 'STORE_DEFAULT' ? defaultVal : stateReducer(state)(k));

const getters = {
  // default sidebarStatus is 0, Hide
  // sidebarStatus: state => (state.sidebarStatus === 'STORE_DEFAULT' ? 0 : state.sidebarStatus),
  isValid: (state) => {
    const errorNum = Object.keys(state.errors)
      .reduce((acc, label) => acc.concat(state.errors[label]), [])
      .filter(x => x !== false);
    console.log(`isValid: Found ${errorNum.length} errors`);
    if (errorNum.length > 0) {
      return false;
    }
    return true;
  },
  formValues: state => defaultReducer(state)('values')({}),
  formErrors: state => defaultReducer(state)('errors')({}),
};

const store = new Vuex.Store({ ...storeArgs, getters });


export default store;
