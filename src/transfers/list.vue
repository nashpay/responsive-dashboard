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
     endpoint="getTransfers"
     paginationRoute="transfer-list"
     :createRoute="createRoute"
     :beforeId="beforeId"
     v-on:pageViewChange="updatePageView"
   >
     <!-- Table Column Header Slot -->
     <tr slot="table-column-header">
       <th> ID </th>
       <th> Date </th>
       <th> Address </th>
       <th> Amount </th>
       <th> Status </th>
     </tr>
     <!-- End Of Table Column Header Slot -->
     <!-- Table Row Slot -->
     <template v-if="pageView.length > 0">
       <tr slot="table-row" v-for="pageItem in pageView" v-on:click="getDetail(pageItem.id)">
         <td> {{ pageItem.id }} </td>
         <td> {{ pageItem.createdAt | friendly-datetime }} </td>
         <td v-if="pageItem.outputs" > {{ pageItem | get-dest-address }} </td>
         <td v-if="pageItem.outputs" > {{ pageItem | get-dest-amt }} </td>
         <td>
           <span class="tag is-light" v-if="pageItem.state === '1201'">Created | {{ pageItem.confirmations }}</span>
           <span class="tag is-info" v-if="pageItem.state === '1202'">Pending | {{ pageItem.confirmations }}</span>
           <span class="tag is-success" v-if="pageItem.state === '1203'">Confirmed | {{ pageItem.confirmations }}</span>
           <span class="tag is-danger" v-if="pageItem.state === '1205'">Failed</span>
         </td>
       </tr>
       <div slot="card-row">
         <div class="card tx-card" v-for="pageItem in pageView">
           <div class="card-content">
             <p v-if="pageItem.outputs" class="card-tx-row"> {{ pageItem.outputs[0].address | shorten-address }} </p>
             <p class="card-tx-row">
               <span class="tag is-light" v-if="pageItem.state === '1201'">Created</span>
               <span class="tag is-info" v-if="pageItem.state === '1202'">Pending</span>
               <span class="tag is-success" v-if="pageItem.state === '1203'">Confirmed</span>
               <span class="tag is-danger" v-if="pageItem.state === '1205'">Failed</span>
             </p>
             <p class="card-tx-row">
               <i class="fa fa-plus" />
               <span v-if="pageItem.outputs" > {{ pageItem.outputs[0].amt }} </span>
             </p>
           </div>
         </div>
       </div>
     </template>
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
      pageRoute: { name: 'transfer-list' },
      createRoute: { name: 'transfer-create' },
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
    'get-dest-address' (val) {
      if (typeof val !== 'undefined' && val !== null) {
        const { outputs } = val;
        if (typeof outputs !== 'undefined' && val !== null) {
          const userOut = outputs.filter(output => output.recipient === 'user')[0];
          const { address } = userOut;
          return address;
        }
        return 'xxx';
      }
      return 'xxx';
    },
    'get-dest-amt' (val) {
      if (typeof val !== 'undefined' && val !== null) {
        const { outputs } = val;
        if (typeof outputs !== 'undefined' && val !== null) {
          const userOut = outputs.filter(output => output.recipient === 'user')[0];
          const { amt } = userOut;
          return amt;
        }
        return '0.0000';
      }
      return '0.0000';
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
    getDetail(transferId) {
      this.$router.push({ name: 'transfer-detail', query: { transferId } });
    },
    updatePageView(x) {
      this.pageView = x.reduce((acc, y) => {
        acc.unshift(y);
        return acc;
      }, []);
    },
  }
};
</script>
