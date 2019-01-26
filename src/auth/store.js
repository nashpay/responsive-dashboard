import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { storeFactory } from '../plugins/store-factory';

const schema = ['connector', 'authenticated'];

const storeArgs = storeFactory(schema);

const getters = {
  isAuth: (state) => {
    return state.authenticated === 'STORE_DEFAULT' ? false : state.authenticated;
  },
};

const store = new Vuex.Store({ ...storeArgs, getters });


export default store;
