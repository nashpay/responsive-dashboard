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
      <!-- <p>Account Balance {{ accountBalance }} </p> -->
      <p>Maximum Transfer Amount</p>
      <p class="title is-3"> {{ accountMaxBalance }}</p>
      <p class="subtitle is-5"> {{ accountMaxFiatBalance }} {{ accountFiat }}</p>
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
import { Decimal } from 'decimal.js';

import FormMixin from '../components/forms/mixin';
import AuthStore from '../auth/store';
import FeeStore from '../streaming/feeStore';
import RateStore from '../streaming/rateStore';
import { cryptonumber } from '../components/helpers';

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
    if (this.defaultAccount !== false) {
      const avail = this.defaultAccount.state.accountBalanceAvailable;
      if (avail !== 'STORE_DEFAULT' && typeof avail !== 'undefined') {
        // this.formFields[0].rules = { max: { precision: 4, value: avail } };
        return avail;
      }
    }
    return '0.0000';
  },
  accountMaxBalance () {
    if (this.defaultAccount !== false) {
      const availMax = this.defaultAccount.state.accountMaxBalanceAmt;
      if (availMax !== 'STORE_DEFAULT' && typeof availMax !== 'undefined') {
        this.formFields[0].rules = { max: { precision: 4, value: availMax } };
        return availMax;
      }
    }
    return '0.0000';
  },
  feeFastest () {
    return FeeStore.getters.getFastest;
  },
  feeMedium () {
    return FeeStore.getters.getMedium;
  },
  feeSlow () {
    return FeeStore.getters.getSlow;
  },
  // Fiat Max Balance
  accountFiat() {
    return RateStore.getters.getActiveFiat;
  },
  accountMaxFiatBalance () {
    // TODO Support multi currency , add BCH
    // const coin = cryptonumber('BTC');
    const savedRate = RateStore.getters.getRate('BTC');
    if (savedRate !== false) {
      //
      // const availMax = this.defaultAccount.getters.getAccountMaxBalanceAmt;
      const availMax = this.accountMaxBalance;
      if (availMax !== '0.0000') {
        const availMaxDec = new Decimal(availMax);
        const savedRateDec = new Decimal(savedRate);
        const fiatBalance = availMaxDec.mul(savedRateDec);
        return fiatBalance.toFixed(2);
      }
      return '0.00';
    }
    return '0.00';
  },
  // Fiat Transfer Balance
};

const watchFns = {
  satPerByte (to, from) {
    // Trigger the max withdrawal amount
    if (this.defaultAccount !== false) {
      this.defaultAccount.dispatch('getMaxBalance', { satPerByte: to });
    }
  },
};

const loadHandler = (that) => {
  //
  if (that.defaultAccount !== false) {
    that.defaultAccount.dispatch('getMaxBalance', { satPerByte: that.satPerByte });
  }
};
export default FormMixin({ ...formData, ...otherConfig, computedFns, watchFns, loadHandler });

</script>
