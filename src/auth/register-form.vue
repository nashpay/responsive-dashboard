<template>
  <napp-form 
    v-bind:formFields="formFields"
    v-bind:formConfig="formConfig"
    v-on:btnOk="formBtnOk"
  />
</template>
<script>
import co from 'co';
import FormMixin from '../components/forms/mixin';
import storeAuth from './store';
import NashAPI from '../plugins/nash-api/';
import { postAuth } from './actions';
import RegisterStore from './register.store';

// @TODO Remove Defaults

const prodEnv = {
  apiHost: 'https://livenet.nashpay.io',
  tag: 'btc-live', // We hardcode this as the first account always.
}

const registerAuth = function* registerAuth(body) {
  const connector = NashAPI({ apiKey: 'abc', apiSecret: 'xxx', host: prodEnv.apiHost });
  const res = yield connector.createAccount({ body });
  console.log(res);
}

const formData = {
  formFields: [
  {
    label: 'Username',
    category: 'text-input',
    name: 'username',
    defaultValue: '',
  }],
  formConfig: {
    'btnOKLabel': 'Register',
  },
  formHooks: {
    // btnOk ({ apiKey, apiSecret, apiHost }) {
    btnOk ({ username }) {
      const body = {
        pubKeyOne: RegisterStore.getters.pubKeyOne,
        pubKeyTwo: RegisterStore.getters.pubKeyTwo,
        certPem: RegisterStore.getters.certPub,
        tag: prodEnv.tag,
        username,
      };
      co(registerAuth(body)).then((res) => {

      }).catch((err) => console.log(err));
    },
  },
};

export default FormMixin(formData);
</script>
