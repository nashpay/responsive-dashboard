import co from 'co';
import * as types from './mutation-types';
import providerCryptoCompare from '../cryptocompare';
import NaviStore from '../../navigation/store';
import { modalEnum, layoverEnum } from '../../navigation/store/mutation-types';

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

export const updateBaseCurrency = ({ commit }, baseCurrency) => {
  commit(types.updateBaseCurrency, baseCurrency);
  NaviStore.dispatch('updateModalScreen', modalEnum.SHOW);
  NaviStore.dispatch('updateModalElement', 'saved');
  NaviStore.dispatch('updateLayover', layoverEnum.SHOW);
};
