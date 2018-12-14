import co from 'co';
import * as types from './mutation-types';
import providerCryptoCompare from '../cryptocompare';

export const pollPrices = ({ state, commit }) => {
  if (state.apiProvider === 'cryptocompare.com') {
    co(providerCryptoCompare(state.apiKey)).then((res) => {
      commit(types.updatePrice, res);
    }).catch(err => console.error(err));
  }
};

export const updateAPIKey = ({ commit }, apiKey) => {
  commit(types.updateAPIKey, apiKey);
};

export const updateAPIProvider = ({ commit }, apiProvider) => {
  commit(types.updateAPIProvider, apiProvider);
};
