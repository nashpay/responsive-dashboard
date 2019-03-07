import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { storeFactory } from './store-factory';

Vue.use(Vuex);

const tsymReducer = fsym => (acc, tsym) => acc.concat(`rate${fsym}-${tsym}`);

const cryptoPairs = ['BTC'];
const fiatPairs = ['USD', 'EUR'];
const tsyms = fiatPairs.join(',');
const fsyms = cryptoPairs.join(',');
const schema = fsyms.map(fsym => tsyms.reduce(tsymReducer(fsym), []))
  .reduce((acc, rates) => acc.concat([...rates]), []);
console.log(schema);

const storeArgs = storeFactory(schema);
const storeActions = { actions: { ...storeArgs.actions } };
const store = new Vuex.Store({ ...storeArgs, ...storeActions });

export default store;
