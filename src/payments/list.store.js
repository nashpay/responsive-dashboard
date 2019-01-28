import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import co from 'co';
import { storeFactory } from '../plugins/store-factory';
import storeAuth from '../auth/store';
// Import External Store

Vue.use(Vuex);


const schema = ['pageView', 'beforeIdCurrent', 'beforeIdNext', 'beforeIdPrev', 'beforeIdHighest', 'pageLimit'];

const storeArgs = storeFactory(schema);

//
const defaultReducer = state => k => defaultVal => (state[k] === 'STORE_DEFAULT' ? defaultVal : state[k]);

const getters = {
  pageLimit: state => defaultReducer(state)('pageLimit')(20),
  beforeIdHighest: state => defaultReducer(state)('beforeIdHighest')(null),
  beforeIdCurrent: state => defaultReducer(state)('beforeIdCurrent')(null),
  beforeIdNext: state => defaultReducer(state)('beforeIdNext')(false),
  beforeIdPrev: state => defaultReducer(state)('beforeIdPrev')(null),
  pageView: state => defaultReducer(state)('pageView')([]),
};

const actions = {
  loadPayments({ commit, state }) {
    co(storeAuth.state.connector.getPayments({
      queryString: {
        limit: 1,
      },
    })).then(({ statusCode, success, body }) => {
      console.log('Loaded payments.');
      if (statusCode === 200 && success === true && Object.hasOwnProperty.call(body, 'err') === false) {
        console.log(body);
        if (body.length > 0) {
          const firstRow =  body[0];
          console.log('Highest ID');
          console.log(firstRow.id);
          commit('BEFORE_ID_HIGHEST', firstRow.id);
        } else {
          commit('BEFORE_ID_HIGHEST', -1); // No entries yet.
        }
      }
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  getPayments({ commit, state }, { beforeId }) {
    co(storeAuth.state.connector.getPayments({
      queryString: {
        before_id: beforeId,
        limit: getters.pageLimit(state),
      },
    })).then(({ statusCode, success, body }) => {
      console.log('Got payments.');
      const pageLimit = getters.pageLimit(state);
      if (statusCode === 200 && success === true && Object.hasOwnProperty.call(body, 'err') === false) {
        commit('PAGE_VIEW', body);
        const firstRow = body[0];
        commit('BEFORE_ID_CURRENT', firstRow.id);
        const lastRow = body[(body.length - 1)];
        if (body.length === pageLimit) {
          commit('BEFORE_ID_NEXT', lastRow.id);
        } else {
          commit('BEFORE_ID_NEXT', false);
        }
        
      }
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  },
};

console.log(storeArgs.actions);
const storeActions = { actions: { ...storeArgs.actions, ...actions } };
console.log(storeActions);
const store = new Vuex.Store({ ...storeArgs, getters, ...storeActions });


export default store;
