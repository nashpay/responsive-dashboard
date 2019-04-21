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
    <h1 class="subtitle is-5"> Transaction Inputs </h1>
    <table class="table is-fullwidth napp-resource-table">
      <thead>
        <tr>
          <th>Transaction Hash</th>
          <th>Vout</th>
          <th>Value</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Transaction Hash</th>
          <th>Vout</th>
          <th>Value</th>
        </tr>
      </tfoot>
     <tbody>
       <tr v-for="txinput in txInputs">
         <td>{{ txinput.txHash }}</td>
         <td>{{ txinput.vout }}</td>
         <td>{{ txinput.value }}</td>
       </tr>
     </tbody>
    </table>
    <h1 class="subtitle is-5"> Transaction Outputs </h1>
    <table class="table is-fullwidth napp-resource-table">
      <thead>
        <tr>
          <th>Address</th>
          <th>Value</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Address</th>
          <th>Value</th>
        </tr>
      </tfoot>
     <tbody>
       <tr v-for="txoutput in txOutputs">
         <td>
          {{ txoutput.address }}
           <template v-if="txoutput.hasOwnProperty('addressId')">(change)</template>
         </td>
         <td>{{ txoutput.value }}</td>
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
