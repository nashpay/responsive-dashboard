<template>
  <napp-form 
    v-bind:formFields="formFields"
    v-bind:formConfig="formConfig"
    v-on:btnOk="formBtnOk"
    v-on:btnCancel="formBtnCancel"
  />
</template>
<script>
import co from 'co';
import FormMixin from '../components/forms/mixin';
import storeAuth from './store';
import NashAPI from '../plugins/nash-api/';
import { postAuth } from './actions';

// @TODO Remove Defaults

const prodEnv = {
  apiHost: 'https://livenet.nashpay.io',
}


const formData = {
  formFields: [
  {
    label: 'API Key',
    category: 'text-input',
    name: 'apiKey',
    defaultValue: '',
  }, {
    label: 'API Secret',
    category: 'text',
    name: 'apiSecret',
    defaultValue: '',
    rules: {
      noSpecialChars: false,
    },
  }],
  formConfig: {
    'btnOKLabel': 'Login',
    'btnCancelLabel': 'Register',
  },
  formHooks: {
    // btnOk ({ apiKey, apiSecret, apiHost }) {
    btnCancel () {
      this.$router.push({ name: 'auth-register' });
    },
    btnOk ({ apiKey, apiSecret }) {
      // TODO HardCode API Host
      const { apiHost } = prodEnv; // testEnv means testnet backend
      const connector = NashAPI({ apiKey, apiSecret, host: apiHost });
      storeAuth.dispatch('saveConnector', connector);
      storeAuth.dispatch('saveAuthenticated', true);
       
      // Fetch SubAccounts
      const that = this;
      co(postAuth({ connector, storeAuth, router: this.$router }))
        .then(() => {
        })
        .catch((err) => console.log(err));
    },
  },
};

export default FormMixin(formData);
</script>
