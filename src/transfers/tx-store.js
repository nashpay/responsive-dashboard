import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { storeFactory } from '../plugins/store-factory';

Vue.use(Vuex);

const schema = ['accountId', 'txInputs', 'txOutputs', 'txCoin', 'txNetwork'];
const storeArgs = storeFactory(schema);
const storeActions = { actions: { ...storeArgs.actions } };
const store = new Vuex.Store({ ...storeArgs, ...storeActions });

export default store;
