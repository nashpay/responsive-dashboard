<template>
  <div class="container-subrouter">
    <nav class="breadcrumb" aria-label="breadcrumb">
      <ul>
        <li>
          <router-link :to="pageRoute">
            Home
          </router-link>
        </li>
      </ul>
    </nav> 
    <h1 class="subtitle is-5">Check Transaction </h1>
    <table class="app-horizontal-table">
      <tbody>
        <template v-for="(dest, idx) in txRecipients">
          <tr>
            <td>Destination #{{ idx + 1 }}</td><td>{{ dest.address }}</td>
          </tr>
          <tr>
            <td>Value #{{ idx + 1 }}</td><td>{{ dest.value }} ({{ dest.value | cryptoToFiat }} {{ accountFiat }})</td>
          </tr>
        </template>
        <tr>
          <td>Change Amount</td><td>{{ txChange }} ({{ txChange | cryptoToFiat }} {{ accountFiat }})</td>
        </tr>
        <tr>
          <td>Nash Fee</td><td>{{ nashFee }} ({{ nashFee | cryptoToFiat}} {{ accountFiat }})</td>
        </tr>
        <tr>
          <td>Network Fee</td><td>{{ networkFee }} ({{ networkFee | cryptoToFiat }} {{ accountFiat }})</td>
        </tr>
      </tbody>
    </table>
    
    <nav class="level is-mobile">
      <div class="level-left">
       <div class="level-item">
         <router-link :to="createRoute">
           <button class="button is-text">Cancel</button>
         </router-link>
       </div>
      </div>
      <div class="level-right">
       <div class="level-item">
         <router-link :to="{ name: 'transfer-create-sign-request' }">
           <button class="button">Sign</button>
         </router-link>
       </div>
      </div>
    </nav>
  </div> <!-- End of Container Sub Router -->
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.container-subrouter {
  textarea.tx-hex {
    max-width: 32rem;
    min-width: 24rem;
  }
  .card.app-payment-card {
    margin-left: auto;
    margin-right: auto;
    width: 14rem;
    .media-content {
      justify-content: center;
      p.title {
        text-align: center;
      }
      p.subtitle {
        text-align: center;
      }
    }
  }
}
</style>
<script>
import co from 'co';
import storeAuth from '../auth/store';
import { queryTransferRequestSingleOutput } from './check-request.actions';

import RateStore from '../streaming/rateStore';
import Decimal from 'decimal.js';
import BigNumber from 'bignumber.js';

export default {
  data() { 
    return {
      pageRoute: { name: 'transfer-list' },
      createRoute: { name: 'transfer-create' },
      tx: '',
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
    'address',
    'value',
    'satPerByte',
  ], 
  filters: {
    cryptoToFiat (n) {
      const cryptoVal = BigNumber(n);
      const savedRate = RateStore.getters.getRate('BTC');
      if (savedRate !== false) {
        //
        // const availMax = this.defaultAccount.getters.getAccountMaxBalanceAmt;
        const savedRateDec = BigNumber(savedRate);
        const fiatRate = cryptoVal.times(savedRateDec);
        return fiatRate.toFixed(2);
      }
      return '0.00';
    },
  },
  computed: {
    txInputs () { 
      if (this.tx !== '') {
        return this.tx.txCache.inputs;
      }
      return [];
    },
    txOutputs () {
      if (this.tx !== '') {
        return this.tx.txCache.outputs;
      }
      return [];
    },
    txHex () {
      if (this.tx !== '') {
        return this.tx.toHex();
      }
      return '';
    },
    // Check Transaction Fields
    txRecipients() {
      //
      const offset = BigNumber('100000000');
      // Raw values in sats, convert to coin values
      if (this.txOutputs.length !== 0) {
        const nOutput = this.txOutputs.filter(output => output.cat !== 'gateway')
          .filter(output => output.cat !== 'change')
          .map(({ address, value }) => {
            //
            const nVal = BigNumber(String(value)).div(offset).toPrecision(5);
            return { address, value: nVal };
          });
        return nOutput;
      }
      return [];
    },
    networkFee() {
      if(this.txOutputs.length !== 0&& this.txInputs.length !== 0) {
        // Sum All 
        const offset = BigNumber('100000000');
        const inValues = this.txInputs.reduce((acc, txIn) => acc.plus(BigNumber(txIn.value)), BigNumber('0'));
        const outValues = this.txOutputs.reduce((acc, txOut) => acc.plus(BigNumber(txOut.value)), BigNumber('0'));
        const aFee = inValues.minus(outValues);
        const bFee = aFee.div(offset);
        return bFee.toPrecision(5);
      }
      return '0.000';
    },
    nashFee() {
      const offset = BigNumber('100000000');
      // Raw values in sats, convert to coin values
      if (this.txOutputs.length !== 0) {
        const nOutput = this.txOutputs.filter(output => output.cat === 'gateway');
        if (nOutput.length !== 0) {
          const [tOutput] = nOutput;
          const nVal = BigNumber(tOutput.value).div(offset).toPrecision(5);
          return nVal;
        }
        return '0.000';
      }
      return '0.000';
    },
    txChange() {
      const offset = BigNumber('100000000');
      // Raw values in sats, convert to coin values
      if (this.txOutputs.length !== 0) {
        const nOutput = this.txOutputs.filter(output => output.cat === 'change');
        if (nOutput.length !== 0) {
          const [tOutput] = nOutput;
          const nVal = BigNumber(tOutput.value).div(offset).toPrecision(5);
          return nVal;
        }
        return '0.000';
      }
      return '0.000';
    },
    accountFiat() {
      return RateStore.getters.getActiveFiat;
    },
  },
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      co(queryTransferRequestSingleOutput({
        address: this.address,
        value: this.value,
        satPerByte: this.satPerByte,
        connector: storeAuth.state.connector,
      }))
        .then((res) => {
          this.tx = res;
        })
        .catch((err) => console.log(err));

    },
  }
};
</script>
