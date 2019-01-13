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
const validReference = 'VALIDATE_REFERENCE';
const setReference = 'SET_REFERENCE';
// Store
const storeState = {
  validCryptoAmount: false,
  formCryptoAmount: '0',
  validReference: false,
  formReference: '',
};
const mutations = {
  [validCryptoAmount](state, val) {
    state.validCryptoAmount = val;
  },
  [setCryptoAmount](state, val) {
    state.formCryptoAmount = val;
  },
  [validReference](state, val) {
    state.validReference = val;
  },
  [setReference](state, val) {
    state.formReference = val;
  },
};

const getters = {
  validCryptoAmount: state => state.validCryptoAmount,
  formCryptoAmount: state => state.formCryptoAmount,
  validReference: state => state.validReference,
  formReference: state => state.formReference,
};

const actions = {
  validateCryptoAmount: ({ commit }, { input, validator }) => {
    //
    const errorMsg = validator.inlineCheck(input);
    commit(validCryptoAmount, errorMsg);
    commit(setCryptoAmount, input);
  },
  validateReference: ({ commit }, { input, validator }) => {
    //
    const errorMsg = validator.inlineCheck(input);
    commit(validReference, errorMsg);
    commit(setReference, input);
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
    cryptoReference() {
      return this.fstore.getters.formReference;
    },
    cryptoReferenceError() {
      return this.fstore.getters.validReference;
    },
  },
  methods: {
    //
    validatorSetup() {
      const validatorCryptoAmount = new validateTypes.Decimal({
        required: true,
        min: BigNumber('0.00'),
        meta: {
          network: 'btc-testnet',
        },
      });
      const validatorCryptoReference = new validateTypes.SimpleText({
        required: true,
      });
      this.validators = {
        cryptoAmount: validatorCryptoAmount,
        cryptoReference: validatorCryptoReference,
      };
      this.fstore.dispatch('validateCryptoAmount', { input: '', validator: this.validators.cryptoAmount });
      this.fstore.dispatch('validateReference', { input: '', validator: this.validators.cryptoReference });
      //
    },
    validate(evt, formKey) {
      if (formKey === 'cryptoAmount') {
        this.fstore.dispatch('validateCryptoAmount', { input: evt.target.value, validator: this.validators[formKey] });
      }
      if (formKey === 'cryptoReference') {
        this.fstore.dispatch('validateReference', { input: evt.target.value, validator: this.validators[formKey] });
      }
    },
  },
};
