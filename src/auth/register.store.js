import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

import { storeFactory } from '../plugins/store-factory';

Vue.use(Vuex);

const schema = [
  'phraseOne',
  'phraseTwo',
  'pubKeyOne',
  'pubKeyTwo',
  'certPub',
  'certKey',
];

const storeArgs = storeFactory(schema);

const getterFactory = (storeKey, defaultVal) => (state) => {
  return state[storeKey] === 'STORE_DEFAULT' ? defaultVal : state[storeKey];
};

const getters = {
  phraseOne: getterFactory('phraseOne', ''),
  phraseTwo: getterFactory('phraseTwo', ''),
  pubKeyOne: getterFactory('pubKeyOne', ''),
  pubKeyTwo: getterFactory('pubKeyTwo', ''),
  certPub: getterFactory('certPub', ''),
  certKey: getterFactory('certKey', ''),
};

const store = new Vuex.Store({ ...storeArgs, getters });


export default store;
