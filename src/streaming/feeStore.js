import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { storeFactory } from '../plugins/store-factory';

Vue.use(Vuex);


const schema = ['data'];
const storeArgs = storeFactory(schema);

const getters = {
  getFastest: state => (state.data === 'STORE_DEFAULT' ? false : state.data.fastest),
  getMedium: state => (state.data === 'STORE_DEFAULT' ? false : state.data.medium),
  getSlow: state => (state.data === 'STORE_DEFAULT' ? false : state.data.longest),
};

const store = new Vuex.Store({ ...storeArgs, getters });
export default store;
