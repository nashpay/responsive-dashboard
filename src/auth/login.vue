<template>
  <div class="container-subrouter">
    <napp-form 
      v-bind:formFields="formFields"
      v-bind:formConfig="formConfig"
      v-on:btnOk="formBtnOk"
    />
  </div>
</template>
<script>
import FormMixin from '../components/forms/mixin';
import storeAuth from './store';
import NashAPI from '../plugins/nash-api/';

const formData = {
  formFields: [{
    label: 'API Host',
    category: 'text',
    name: 'apiHost',
  }, {
    label: 'API Key',
    category: 'text',
    name: 'apiKey',
  }, {
    label: 'API Secret',
    category: 'text',
    name: 'apiSecret',
  }],
  formConfig: {
    'btnOKLabel': 'Login',
  },
  formHooks: {
    btnOk ({ apiKey, apiSecret, apiHost }) {
      // Todo Verify that API keys are correct before saving.
      const connector = NashAPI({ apiKey, apiSecret, host: apiHost });
      storeAuth.dispatch('saveConnector', connector);
      storeAuth.dispatch('saveAuthenticated', true);
      this.$router.push({ name: 'payment-list' });
    },
  },
};

export default FormMixin(formData);
</script>
