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
     <tr slot="table-row" v-for="pageItem in pageView">
       <td> {{ pageItem.id }} </td>
       <td> {{ pageItem.created_at }} </td>
       <td> {{ pageItem.address }} </td>
       <td> {{ pageItem.amount }} </td>
       <td> {{ pageItem.state }} </td>
     </tr>
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
}
</style>
<script>
// import ListStore from './list.store';
import ResourceView from '../components/resource-view/index.vue';

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
