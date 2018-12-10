import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { BigNumber } from 'bignumber.js';
import { validateTypes } from '../validator';

Vue.use(Vuex);
// Form Schema

// Form Store
// Mutation Types
const validCryptoAmount = 'VALIDATE_CRYPTO_AMOUNT';
const setCryptoAmount = 'SET_CRYPTO_AMOUNT';
const validCryptoAddress = 'VALIDATE_CRYPTO_ADDRESS';
const setCryptoAddress = 'SET_CRYPTO_ADDRESS';
// Store
const storeState = {
  validCryptoAmount: false,
  formCryptoAmount: '0',
  validCryptoAddress: false,
  formCryptoAddress: '',
};
const mutations = {
  [validCryptoAmount](state, val) {
    state.validCryptoAmount = val;
  },
  [setCryptoAmount](state, val) {
    state.formCryptoAmount = val;
  },
  [validCryptoAddress](state, val) {
    state.validCryptoAddress = val;
  },
  [setCryptoAddress](state, val) {
    state.formCryptoAddress = val;
  },
};

const getters = {
  validCryptoAmount: state => state.validCryptoAmount,
  formCryptoAmount: state => state.formCryptoAmount,
  validCryptoAddress: state => state.validCryptoAddress,
  formCryptoAddress: state => state.formCryptoAddress,
};

const actions = {
  validateCryptoAmount: ({ commit }, { input, validator }) => {
    //
    const errorMsg = validator.inlineCheck(input);
    commit(validCryptoAmount, errorMsg);
    commit(setCryptoAmount, input);
  },
  validateCryptoAddress: ({ commit }, { input, validator }) => {
    //
    const errorMsg = validator.inlineCheck(input);
    commit(validCryptoAddress, errorMsg);
    commit(setCryptoAddress, input);
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
  data() {
    return {
      fstore: store,
      validators: {},
    };
  },
  computed: {
    cryptoAmount() {
      return this.fstore.getters.formCryptoAmount;
    },
    cryptoAmountError() {
      return this.fstore.getters.validCryptoAmount;
    },
    cryptoAddress() {
      return this.fstore.getters.formCryptoAddress;
    },
    cryptoAddressError() {
      return this.fstore.getters.validCryptoAddress;
    },
  },
  methods: {
    //
    validatorSetup(curAmt) {
      const validatorCryptoAmount = new validateTypes.Decimal({
        required: true,
        min: BigNumber('0.00'),
        max: BigNumber(curAmt.toString()),
        meta: {
          network: 'btc-testnet',
        },
      });
      const validatorCryptoAddress = new validateTypes.CryptoAddress({
        required: true,
        'bitcoin-testnet': true,
      });
      this.validators = {
        cryptoAmount: validatorCryptoAmount,
        cryptoAddress: validatorCryptoAddress,
      };
      this.fstore.dispatch('validateCryptoAmount', { input: '', validator: this.validators.cryptoAmount });
      this.fstore.dispatch('validateCryptoAddress', { input: '', validator: this.validators.cryptoAddress });
      //
    },
    validate(evt, formKey) {
      if (formKey === 'cryptoAmount') {
        this.fstore.dispatch('validateCryptoAmount', { input: evt.target.value, validator: this.validators[formKey] });
      }
      if (formKey === 'cryptoAddress') {
        this.fstore.dispatch('validateCryptoAddress', { input: evt.target.value, validator: this.validators[formKey] });
      }
    },
  },
};
