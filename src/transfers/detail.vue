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
    <template v-if="transferDetail !== null">
      <table class="app-horizontal-table">
	<tbody>
	  <tr>
	    <td>Created</td><td>{{ transferDetail.createdAt | friendly-datetime }}</td>
	  </tr>
	  <tr>
	    <td>Status</td>
            <td>
              <span class="tag is-light" v-if="transferDetail.state === '1201'">Created</span>
              <span class="tag is-info" v-if="transferDetail.state === '1202'">Pending | {{ transferDetail.confirmations }} </span>
              <span class="tag is-success" v-if="transferDetail.state === '1203'">Confirmed | {{ transferDetail.confirmations }}</span>
              <span class="tag is-danger" v-if="transferDetail.state === '1205'">Failed</span>
            </td>
	  </tr>
	  <tr>
	    <td>Transaction ID</td><td>{{ transferDetail.changeTxId }}</td>
	  </tr>
	  <tr>
	    <td>Withdrawal Address</td><td>{{ transferDest.address }}</td>
	  </tr>
	  <tr>
	    <td>Withdrawal Amount</td><td>{{ transferDest.amt }}</td>
	  </tr>
	  <tr>
	    <td>Change Address</td><td>{{ transferDetail.changeAddress }}</td>
	  </tr>
	  <tr>
	    <td>Change Amount</td><td>{{ transferDetail.changeAmount }}</td>
	  </tr>
	  <tr>
	    <td>Gateway Fee</td><td>{{ gatewayFee }}</td>
	  </tr>
	</tbody>
      </table> <!-- End of Horizontal Table -->
    </template>
    <div class="field is-grouped">
      <div class="control">
        <router-link :to="pageRoute">
          <button class="button">Back</button>
        </router-link>
      </div>
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
      pageRoute: { name: 'transfer-list' },
      accController: 'notloaded',
    };
  },
  computed: {
    transferDetail() {
      if (this.accController !== 'notloaded') {
        const transferDetail = this.accController.renderTransferById();
        return transferDetail;
      }
      return null;
    },
    gatewayFee() {
      if (this.accController !== 'notloaded') {
        const transferDetail = this.accController.renderTransferById();
        if (transferDetail !== null) {
          const { outputs } = transferDetail;
          const gatewayDetail = outputs.filter(row => row.recipient === 'gateway')[0];
          const { amt } = gatewayDetail;
          return amt;
        }
        return null;
      }
      return null;
    },
    transferDest() {
      if (this.accController !== 'notloaded') {
        const transferDetail = this.accController.renderTransferById();
        if (transferDetail !== null) {
          const { outputs } = transferDetail;
          // TODO Allow multiple destinations
          const dest = outputs.filter(row => row.recipient !== 'gateway')[0];
          return dest;
        }
        return null;
      }
      return null;
    },
  },
  mounted() {
    const accController = AccountControllers(AuthStore);
    this.accController = accController;
    this.$nextTick(this.loaded);
  },
  props: [
    'transferId',
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
        this.accController.getTransferById(this.transferId);
      }
    },
  }
};
</script>
