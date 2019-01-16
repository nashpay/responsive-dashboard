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
    <table class="app-horizontal-table">
      <tbody>
        <tr>
          <td>Reference</td><td>d94c10df-0508-41a9-af8f-11dd588caf46</td>
        </tr>
        <tr>
          <td>Address</td><td>2NEYd7YghfKaHDa18Kf1z3KovsfzbkNh7pB</td>
        </tr>
        <tr>
          <td>Amount</td><td>0.0001</td>
        </tr>
        <tr>
          <td>Status</td><td><button class="button"> Confirmed </button></td>
        </tr>
        <tr>
          <td>Currency</td><td>BTC</td>
        </tr>
        <tr>
          <td>Network</td><td>Testnet</td>
        </tr>
        <tr>
          <td>Created</td><td>1 January 2019 13:40</td>
        </tr>
        <tr>
          <td>Expiry</td><td>1 January 2019 16:40</td>
        </tr>
      </tbody>
    </table> <!-- End of Horizontal Table -->
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

export default {
  data() { 
    return {
      pageRoute: { name: 'payment-list' },
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      //
      if(this.$route.matched.length > 0) {
      } else {
        // 404
      } 
    },
  }
};
</script>
