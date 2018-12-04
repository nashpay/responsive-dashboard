import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { BigNumber } from 'bignumber.js';

Vue.use(Vuex);
// Form Schema
const formSchema = {
  cryptoAmount: {
    name: 'Amount',
    type: 'Decimal',
    required: true,
    min: BigNumber('0.00'),
    meta: {
      network: 'btc-testnet',
    },
    errorMsg: false,
    isValid: false,
    value: '',
    displayValue: '',
  },
  recipientAddress: {
    name: 'Address',
    type: 'CryptoAddress',
    required: true,
    meta: {
      network: 'btc-testnet',
    },
    errorMsg: false,
    isValid: false,
    value: '',
    displayValue: '',
  },
};

// Form Store
// Mutation Types
const validCryptoAmount = 'VALIDATE_CRYPTO_AMOUNT';
const storeState = {
  validCryptoAmount: true,
};
const mutations = {
  [validCryptoAmount](state, val) {
    state.validCryptoAmount = val;
  },
};

const getters = {
  validCryptoAmount: state => state.validCryptoAmount,
};

const actions = {
  validateCryptoAmount: ({ commit }, val) => {

  },
};

const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state: storeState,
});

// Export as Mixin
export default {

};
