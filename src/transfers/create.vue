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
      <p>Account Balance {{ accountBalance }} </p>
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
import AuthStore from '../auth/store';

// TODO: Add support for multi-account
const defaultAccount = AuthStore.getters.getDefaultAccount;

const formData = {
  formFields: [{
    label: 'Amount',
    category: 'currency',
    name: 'amount',
    rules: { max: { precision: 4, value: '1.0000' } },
  }, {
    label: 'SatPerByte',
    category: 'integer',
    name: 'satPerByte',
    rules: { },
  }, {
    label: 'Address',
    category: 'cryptoaddress',
    rules: { cryptoAddress: { tag: 'btc-live' } }, // TODO Remove hardcode for network
    name: 'address',
  }],
  formConfig: {
    'btnOKLabel': 'Create',
    'btnCancelLabel': 'Cancel',
  },
  formHooks: {
    btnOk ({ amount, address, satPerByte }) {
      console.log('btnOK Pressed');
      console.log(amount);
      console.log(address);
      console.log(satPerByte);
      this.$router.push({
        name: 'transfer-create-check-request',
        query: { address, value: amount, satPerByte },
      });
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
const computedFns = {
  defaultAccount () {
    return AuthStore.getters.getDefaultAccount;
  },
  accountBalance () {
    if (this.defaultAccount !== false) {
      const avail = this.defaultAccount.state.accountBalanceAvailable;
      if (avail !== 'STORE_DEFAULT' && typeof avail !== 'undefined') {
        this.formFields[0].rules = { max: { precision: 4, value: avail } };
        return avail;
      }
    }
    return '0.0000';
  }
};
export default FormMixin({ ...formData, ...otherConfig, computedFns });

</script>
