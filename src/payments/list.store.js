import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import co from 'co';
import { storeFactory } from '../plugins/store-factory';
import storeAuth from '../auth/store';
// Import External Store

Vue.use(Vuex);


const schema = ['paymentView', 'lastId', 'beforeId', 'pageLimit'];

const storeArgs = storeFactory(schema);

//
const stateReducer = state => (k) => {
  const keyList = Object.keys(state[k]);
  const poj = keyList.reduce((acc, key) => ({ ...acc, [key]: state[k][key] }), {});
  return poj;
  // Object.keys(state[k]).reduce((acc, x) => ({ ...acc, [x]: state[k][x] }), {});
};
const defaultReducer = state => k => defaultVal => (state[k] === 'STORE_DEFAULT' ? defaultVal : stateReducer(state)(k));

const getters = {
  paginationLimit: state => defaultReducer(state)('limit')(20),
  paginationBeforeId: state => defaultReducer(state)('beforeId')(null),

};

const actions = {
  getPayments({ commit, state }) {
    co(storeAuth.state.connector.getPayments({
      queryString: {
        before_id: state.beforeId,
        limit: state.pageLimit,
      },
    })).then((result) => {
      console.log(result);
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};

const store = new Vuex.Store({ ...storeArgs, getters, actions });


export default store;
