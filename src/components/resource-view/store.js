import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import co from 'co';
import { storeFactory } from '../../plugins/store-factory';
import storeAuth from '../../auth/store';
// Import External Store

Vue.use(Vuex);


const schema = ['pageView', 'beforeIdNext', 'beforeIdPrev', 'pageLimit'];

const storeArgs = storeFactory(schema);

//
const defaultReducer = state => k => defaultVal => (state[k] === 'STORE_DEFAULT' ? defaultVal : state[k]);

const getters = {
  pageLimit: state => defaultReducer(state)('pageLimit')(20),
  beforeIdNext: state => defaultReducer(state)('beforeIdNext')(false),
  beforeIdPrev: state => defaultReducer(state)('beforeIdPrev')(false),
  pageView: state => defaultReducer(state)('pageView')([]),
};

export default (endpoint) => {
  const actions = {
    getResource({ commit, state }, { beforeId }) {
      const pageLimit = getters.pageLimit(state);
      co(storeAuth.state.connector[endpoint]({
        queryString: {
          before_id: beforeId,
          limit: pageLimit,
        },
      })).then(({ statusCode, success, body }) => {
        if (statusCode === 200 && success === true && Object.hasOwnProperty.call(body, 'err') === false) {
          const { results, nextId, prevId } = body;
          commit('PAGE_VIEW', results);
          commit('BEFORE_ID_NEXT', nextId);
          commit('BEFORE_ID_PREV', prevId);
        }
      }).catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    },
  };

  const storeActions = { actions: { ...storeArgs.actions, ...actions } };
  const store = new Vuex.Store({ ...storeArgs, getters, ...storeActions });
  return store;
};
