<template>
  <div class="container-subrouter">
    <nav class="breadcrumb" aria-label="breadcrumb">
      <ul>
        <li>
          <router-link :to="pageRoute">
            Home
          </router-link>
        </li>
        <li>&nbsp</li>
      </ul>
    </nav> 
   <resource-view 
     endpoint="getPayments"
     paginationRoute="payment-list"
     :createRoute="createRoute"
     :beforeId="beforeId"
     v-on:pageViewChange="updatePageView"
   >
     <!-- Table Column Header Slot -->
     <tr slot="table-column-header" class="napp-table-header">
       <th> ID </th>
       <th> Date </th>
       <th> Address </th>
       <th> Amount </th>
       <th> Status </th>
     </tr>
     <!-- End Of Table Column Header Slot -->
     <!-- Table Row Slot -->
     <tr slot="table-row" class="napp-table-row" v-for="pageItem in pageView">
       <td> {{ pageItem.id }} </td>
       <td> {{ pageItem.created_at | friendly-datetime }} </td>
       <td> {{ pageItem.address }} </td>
       <td> {{ pageItem.amount }} </td>
       <td>
         <span class="tag is-light" v-if="pageItem.state === '1001'">Created</span>
         <span class="tag is-info" v-if="pageItem.state === '1002'">Pending</span>
         <span class="tag is-success" v-if="pageItem.state === '1003'">Confirmed</span>
         <span class="tag is-danger" v-if="pageItem.state === '1005'">Failed</span>
       </td>
     </tr>
     <div slot="card-row">
       <div class="card tx-card" v-for="pageItem in pageView">
         <div class="card-content">
           <p class="card-tx-row"> {{ pageItem.address | shorten-address }} </p>
           <p class="card-tx-row">
             <span class="tag is-light" v-if="pageItem.state === '1001'">Created</span>
             <span class="tag is-info" v-if="pageItem.state === '1002'">Pending</span>
             <span class="tag is-success" v-if="pageItem.state === '1003'">Confirmed</span>
             <span class="tag is-danger" v-if="pageItem.state === '1005'">Failed</span>
           </p>
           <p class="card-tx-row">
             <i class="fa fa-plus" />
             <span> {{ pageItem.amount }} </span>
           </p>
         </div>
       </div>
     </div>
   </resource-view>
  </div>
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.container-subrouter {
  padding: 1rem 0rem 0.75 0rem;
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  nav.breadcrumb {
    a {
      color: @gray; 
    }
    a.active {
      color: @primary-color;
    }
    a:hover {
      color: @primary-color;
    }
  } 
  .level-item.pagination-wrapper {
    padding-right: 3.25em;
  }
  .card.tx-card {
    font-size: 1.0rem;
    background-color: #fff;
    min-height: 4.8rem;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .card-tx-row {
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
}
</style>
<script>
// import ListStore from './list.store';
import ResourceView from '../components/resource-view/index.vue';
import { unixToDateTime } from '../components/helpers';

export default {
  data() { 
    return {
      pageRoute: { name: 'payment-list' },
      createRoute: { name: 'payment-create' },
      pageView: [],
    }
  },
  components: {
    'resource-view': ResourceView,
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
    'beforeId',
  ], 
  filters: {
    'shorten-address' (val) {
      const first = val.substr(0, 7);
      const last = val.substr(-7);
      return `${first}...${last}`;
    },
    'friendly-datetime' (val) {
      return unixToDateTime(val);
    },
  },
  watch: {
    $route(to, from) {
      this.loaded();
    },
  },
  computed: {
  },
  methods: {
    loaded() {
  
    },
    updatePageView(x) {
      this.pageView = x;
    },
  }
};
</script>
