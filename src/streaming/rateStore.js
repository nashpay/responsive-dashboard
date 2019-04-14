import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { storeFactory } from '../plugins/store-factory';

Vue.use(Vuex);


const schema = ['data', 'activeFiat'];
const storeArgs = storeFactory(schema);

const getRateByCoin = (state, coin, fiat) => {
  const { data, activeFiat } = state;
  const rateKey = `${coin}-${activeFiat}`;
  return data[rateKey] ? data[rateKey] : false;
};

const getters = {
  getRate: state => coin => (
    state.data === 'STORE_DEFAULT' ? false : getRateByCoin(state, coin)
  ),
  getActiveFiat: state => (state.activeFiat === 'STORE_DEFAULT' ? 'USD' : state.activeFiat),
};

const store = new Vuex.Store({ ...storeArgs, getters });
export default store;
