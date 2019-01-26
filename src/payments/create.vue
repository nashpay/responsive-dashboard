<template>
  <div class="container-subrouter">
    <div class="napp-form-wrapper">
      <nav class="breadcrumb" aria-label="breadcrumb">
        <ul>
          <li>
            <router-link :to="pageRoute">
              Home
            </router-link>
          </li>
          <li class="is-active">
              <a>Create</a>
          </li>
        </ul>
      </nav> 
     <napp-form 
       v-bind:formFields="formFields"
       v-bind:formConfig="formConfig"
       v-on:btnOk="formBtnOk"
     />
    </div>
  </div>
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
@import (less, reference) url("../theme/form.less");
</style>
<script>
import FormMixin from '../components/forms/mixin';
import storeAuth from '../auth/store';

const formData = {
  formFields: [{
    label: 'Amount',
    category: 'currency',
    name: 'amount',
  }, {
    label: 'Reference',
    category: 'text',
    name: 'customerReference',
  }],
  formConfig: {
    'btnOKLabel': 'Create',
    'btnCancelLabel': 'Cancel',
  },
  formHooks: {
    btnOK ({ amount, customerReference }) {
      // @TODO Remove hardcoded values.
      const defaultParams = {
        currency: 'BTC',
        fiatCurrency: 'USD',
        fiatAmount: '10.00',
        timestamp: '1580181343',
        network: 'testnet',
      };
      /*
      (async () => {
        const result = await storeAuth.state.connector.createPayment({ ...defaultParams, amount, customerReference });
        console.log(result); 
      })();
      */
    },
    btnCancel () {

    },
  },
};

export default FormMixin(formData);
</script>
