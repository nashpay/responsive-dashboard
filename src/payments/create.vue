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
       v-on:btnCancel="formBtnCancel"
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
import co from 'co';

const formData = {
  formFields: [{
    label: 'Amount',
    category: 'currency',
    name: 'amount',
  }, {
    label: 'Reference',
    category: 'text',
    name: 'customerRef',
  }],
  formConfig: {
    'btnOKLabel': 'Create',
    'btnCancelLabel': 'Cancel',
  },
  formHooks: {
    btnOk ({ amount, customerRef }) {
      // @TODO Remove hardcoded values.
      const defaultParams = {
        currency: 'BTC',
        fiatCurrency: 'USD',
        fiatAmount: '10.00',
        timestamp: '1580181343',
        network: 'live',
      };
      const body = { ...defaultParams, amount, customerRef };

      co(storeAuth.state.connector.createPayment({ body }))
        .then(({ statusCode, success: httpSuccess, body: httpBody }) => {
          if (Object.hasOwnProperty.call(httpBody, 'err') === false) {
            // Request Success!
            // Redirect to Payment Create Success Page
            this.$router.push({
              name: 'payment-create-success',
              query: {
                amount: body.amount,
                currency: body.currency,
                address: httpBody.address,
                qr: httpBody.qrLink.split('.com/')[1],
                expiry: httpBody.expiry,
              },
            });
          } else {

          }
        }).catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    },
    btnCancel () {
	  this.$router.push({
		name: 'payment-list',
	  });
    },
  },
};
const otherConfig = {
  pageRoute: { name: 'payment-list' },
};
export default FormMixin({ ...formData, ...otherConfig });
</script>
