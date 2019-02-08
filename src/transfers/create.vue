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
              <a>Create Transfer</a>
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
  </div>
</template>
<style lang="less">
</style>
<script>
import FormMixin from '../components/forms/mixin';
const formData = {
  formFields: [{
    label: 'Amount',
    category: 'currency',
    name: 'amount',
  }, {
    label: 'Address',
    category: 'cryptoaddress',
    rules: { cryptoAddress: { tag: 'btc-testnet' } },
    name: 'address',
  }],
  formConfig: {
    'btnOKLabel': 'Create',
    'btnCancelLabel': 'Cancel',
  },
  formHooks: {
    btnOk ({ amount, address }) {
      console.log('btnOK Pressed');
      console.log(amount);
      console.log(address);
    },
    btnCancel () {
	  this.$router.push({
		name: 'transfer-list',
	  });
    },
  },
};
const otherConfig = {
  pageRoute: { name: 'transfer-list' },
};
export default FormMixin({ ...formData, ...otherConfig });

</script>
