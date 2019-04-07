<template>
  <div class="container-subrouter">
    <nav class="breadcrumb" aria-label="breadcrumb">
      <ul>
        <li>
          <router-link :to="pageRoute">
            Home
          </router-link>
        </li>
        <li>
            <a>Detail</a>
        </li>
      </ul>
    </nav>  <!-- End of Breadcrumbs -->
    <template v-if="paymentDetail !== null">
      <table class="app-horizontal-table">
        <tbody>
          <tr>
            <td>Created</td><td>{{ paymentDetail.created_at | friendly-datetime }}</td>
          </tr>
          <tr>
            <td>Expiry</td><td>{{ paymentDetail.expiry | friendly-datetime }}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <span class="tag is-light" v-if="paymentDetail.state === '1001'">Created</span>
              <span class="tag is-info" v-if="paymentDetail.state === '1002'">Pending</span>
              <span class="tag is-success" v-if="paymentDetail.state === '1003'">Confirmed</span>
              <span class="tag is-danger" v-if="paymentDetail.state === '1005'">Failed</span>
            </td> 
          </tr>
          <tr>
            <td>Amount</td><td>{{ paymentDetail.amount }}</td>
          </tr>
          <tr>
            <td>Address</td><td>{{ paymentDetail.address }}</td>
          </tr>
          <tr>
            <td>Customer Reference </td><td>{{ paymentDetail.customer_ref }}</td>
          </tr>
        </tbody>
      </table> <!-- End of Horizontal Table -->
      <table class="table is-fullwidth napp-resource-table">
        <thead>
          <tr>
            <th>Transaction ID </th>
            <th>N </th>
            <th>Confirmations </th>
            <th>Amount</th>
          </tr>
        </thead> 
        <tfoot>
          <tr>
            <th>Transaction ID </th>
            <th>N </th>
            <th>Confirmations </th>
            <th>Amount</th>
          </tr>
        </tfoot> 
        <tbody>
          <tr v-for="tx in paymentDetail.txs">
            <td>{{ tx.tx_id }}</td>
            <td>{{ tx.n }}</td>
            <td>{{ tx.confirmations }}</td>
            <td>{{ tx.received }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <div class="field is-grouped">
      <div class="control">
        <router-link :to="pageRoute">
          <button class="button">Back</button>
        </router-link>
      </div>
      <!--
      <div class="control">
        <router-link :to="{ name: 'payment-create-fail' }">
          <button class="button is-text">Cancel</button>
        </router-link>
      </div>
      -->
    </div>
  </div> <!-- End of Sub Router -->
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.container-subrouter {
  table.app-horizontal-table {
    width: 100%;
    margin-bottom: 1rem;
    tr {
      td {
        padding: 0.75rem;
      }
      td:first-child {
        font-weight: 600;
        text-align: left;
      }
      td:last-child {
        text-align: right;
      }
    }
  }
}
</style>
<script>
import AuthStore from '../auth/store';
import AccountControllers from '../navigation/controllers';
import { unixToDateTime } from '../components/helpers';

export default {
  data() { 
    return {
      pageRoute: { name: 'payment-list' },
      accController: 'notloaded',
    };
  },
  mounted() {
    const accController = AccountControllers(AuthStore);
    this.accController = accController;
    this.$nextTick(this.loaded);
  },
  computed: {
    paymentDetail() {
      if (this.accController !== 'notloaded') {
        const paymentDetail = this.accController.renderPaymentById();
        return paymentDetail;
      }
      return null;
    },
  },
  props: [
    'paymentId',
  ], 
  filters: {
    'friendly-datetime' (val) {
      return unixToDateTime(val);
    },
  },
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      //
      if (this.accController !== 'notloaded') {
        this.accController.getPaymentById(this.paymentId);
      }
    },
  }
};
</script>
