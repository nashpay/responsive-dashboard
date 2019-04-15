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
      <nav class="panel">
        <p class="panel-heading">Network Fees</p>
        <div class="panel-block" v-if="feeFastest !== false">
          <div class="control">
            <label class="radio">
             <input type="radio" name="satPerByte" v-model="satPerByte" v-bind:value="feeFastest.fee">
             (Fastest {{ feeFastest.delay }} blocks) {{ feeFastest.fee }}
            </label>
          </div>
        </div> <!-- End of Fastest -->
        <div class="panel-block" v-if="feeMedium !== false">
          <div class="control">
            <label class="radio">
             <input type="radio" name="satPerByte" v-model="satPerByte" v-bind:value="feeMedium.fee">
             (Medium {{ feeMedium.delay }} blocks) {{ feeMedium.fee }}
            </label>
          </div>
        </div> <!-- End of Medium -->
        <div class="panel-block" v-if="feeMedium !== false">
          <div class="control">
            <label class="radio">
             <input type="radio" name="satPerByte" v-model="satPerByte" v-bind:value="feeSlow.fee">
             (Slow {{ feeSlow.delay }} blocks) {{ feeSlow.fee }}
            </label>
          </div>
        </div> <!-- End of Slowest -->
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
import AuthStore from '../auth/store';
import FeeStore from '../streaming/feeStore';

// TODO: Add support for multi-account
const defaultAccount = AuthStore.getters.getDefaultAccount;

const formData = {
  formFields: [{
    label: 'Amount',
    category: 'currency',
    name: 'amount',
    rules: { max: { precision: 4, value: '1.0000' } },
  /*
  }, {
    label: 'SatPerByte',
    category: 'integer',
    name: 'satPerByte',
    rules: { },
  */
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
    // btnOk ({ amount, address, satPerByte }) {
    btnOk ({ amount, address }) {
      console.log('btnOK Pressed');
      console.log(amount);
      console.log(address);
      console.log(this.satPerByte);
      this.$router.push({
        name: 'transfer-create-check-request',
        query: { address, value: amount, satPerByte: this.satPerByte },
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
  satPerByte: 50,
};
const computedFns = {
  defaultAccount () {
    return AuthStore.getters.getDefaultAccount;
  },
  accountBalance () {
    console.log('accountBalance');
    if (this.defaultAccount !== false) {
      const avail = this.defaultAccount.state.accountBalanceAvailable;
      console.log('avail');
      console.log(avail);
      if (avail !== 'STORE_DEFAULT' && typeof avail !== 'undefined') {
        console.log(avail);
        this.formFields[0].rules = { max: { precision: 4, value: avail } };
        return avail;
      }
    }
    return '0.0000';
  },
  accountMaxBalance () {
    console.log('accountMaxBalance');
    if (this.defaultAccount !== false) {
      const availMax = this.defaultAccount.state.accountMaxBalanceAmt;
      if (avail !== 'STORE_DEFAULT' && typeof avail !== 'undefined') {
        this.formFields[0].rules = { max: { precision: 4, value: availMax } };
        return availMax;
      }
    }
    return '0.0000';
  },
  feeFastest () {
    console.log(FeeStore.getters.getFastest);
    console.log(FeeStore.getters.getFastest.fee);
    console.log(FeeStore.getters.getFastest.delay);
    return FeeStore.getters.getFastest;
  },
  feeMedium () {
    console.log(FeeStore.getters.getMedium.fee);
    console.log(FeeStore.getters.getMedium.delay);
    return FeeStore.getters.getMedium;
  },
  feeSlow () {
    console.log(FeeStore.getters.getSlow.fee);
    console.log(FeeStore.getters.getSlow.delay);
    return FeeStore.getters.getSlow;
  },
};

const watchFns = {
  satPerByte (to, from) {
    // Trigger the max withdrawal amount
    console.log('satPerByte changed...');
    if (this.defaultAccount !== false) {
      this.defaultAccount.dispatch('getMaxBalance', { satPerByte });
    }
  },
};
console.log(watchFns);
console.log('export formMixin');
export default FormMixin({ ...formData, ...otherConfig, computedFns, watchFns });

</script>
