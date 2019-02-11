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
  </div> <!-- End of Container Sub Router -->
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.container-subrouter {
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
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
    'address',
    'value',
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      console.log(this.address);
      console.log(this.value);
      co(queryTransferRequestSingleOutput({
        address: this.address,
        value: this.value,
        connector: storeAuth.state.connector,
      }))
        .then((res) => console.log('done request'))
        .catch((err) => console.log(err));
    },
  }
};
</script>
