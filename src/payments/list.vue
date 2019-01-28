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
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          Showing
        </div>
        <div class="level-item">
          <div class="select">
            <select>
              <option> 20 </option>
            </select>
          </div>
        </div>
        <div class="level-item">
          Entries
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link class="button app-form-create" :to="createRoute"> Create </router-link>
        </div>
      </div>
    </nav>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th> ID </th>
          <th> Date </th>
          <th> Address </th>
          <th> Amount </th>
          <th> Status </th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th> ID </th>
          <th> Date </th>
          <th> Address </th>
          <th> Amount </th>
          <th> Status </th>
        </tr>
      </tfoot>
     <tbody>
       <tr v-for="pageItem in pageView">
         <td> {{ pageItem.id }} </td>
         <td> {{ pageItem.created_at }} </td>
         <td> {{ pageItem.address }} </td>
         <td> {{ pageItem.amount }} </td>
         <td> {{ pageItem.state }} </td>
       </tr>
       <!--
       <tr @click="paymentDetail(1)">
        <td> 1 </td><td> 1 Jan 2019 22:59 </td><td> 2MuDYfKAKp3XL4EYa5xPBGccqDCBLgBXuJW </td> <td>0.00001</td><td> 2 Confirmations </td>
       </tr>
       <tr>
        <td> 1 </td><td> 1 Jan 2019 22:59 </td><td> 2MuDYfKAKp3XL4EYa5xPBGccqDCBLgBXuJW </td> <td>0.00001</td><td> 2 Confirmations </td>
       </tr>
       <tr>
        <td> 1 </td><td> 1 Jan 2019 22:59 </td><td> 2MuDYfKAKp3XL4EYa5xPBGccqDCBLgBXuJW </td> <td>0.00001</td><td> 2 Confirmations </td>
       </tr>
       <tr>
        <td> 1 </td><td> 1 Jan 2019 22:59 </td><td> 2MuDYfKAKp3XL4EYa5xPBGccqDCBLgBXuJW </td> <td>0.00001</td><td> 2 Confirmations </td>
       </tr>
       <tr>
        <td> 1 </td><td> 1 Jan 2019 22:59 </td><td> 2MuDYfKAKp3XL4EYa5xPBGccqDCBLgBXuJW </td> <td>0.00001</td><td> 2 Confirmations </td>
       </tr>
       <tr>
        <td> 1 </td><td> 1 Jan 2019 22:59 </td><td> 2MuDYfKAKp3XL4EYa5xPBGccqDCBLgBXuJW </td> <td>0.00001</td><td> 2 Confirmations </td>
       </tr>
       -->
     </tbody>
    </table>
    <nav class="level">
      <div class="level-left">
        <router-link
          v-if="typeof beforeIdPrev !== 'undefined'"
          :to="{ name: 'payment-list', query: { beforeId: beforeIdPrev }}"
        >
          <div class="button">Prev</div>
        </router-link>
      </div>
      <div class="level-right">
        <router-link
          v-if="beforeIdNext !== false"
          :to="{ name: 'payment-list', query: { beforeId: beforeIdNext, beforeIdPrev: beforeId }}"
        >
          <div class="button">Next</div>
        </router-link>
        <!--
        <div class="level-item pagination-wrapper">
          <nav class="pagination is-centered" role="navigation" aria-label="navigation">
            <a class="pagination-previous"> &lt; </a>
            <a class="pagination-next"> &gt; </a>
            <ul class="pagination-list">
              <li><a class="pagination-link" aria-label="Page 1"> 1 </a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Page 3"> 3 </a></li>
              <li><a class="pagination-link is-current" aria-label="Page 4"> 4 </a></li>
              <li><a class="pagination-link" aria-label="Page 5"> 4 </a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Page 20"> 20 </a></li>
            </ul>

          </nav>
        </div>
        -->
      </div>
    </nav>
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
import ListStore from './list.store';

export default {
  data() { 
    return {
      pageRoute: { name: 'payment-list' },
      createRoute: { name: 'payment-create' },
    }
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
    'beforeId',
    'beforeIdPrev',
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    },
    beforeIdHighest(to, from) {
	  this.$router.push({ name: 'payment-list', query: { beforeId: to } });
    },
  },
  computed: {
    pageView() {
      return ListStore.getters.pageView;
    },
    beforeIdHighest() {
      return ListStore.getters.beforeIdHighest;
    },
    beforeIdNext() {
      return ListStore.getters.beforeIdNext;
    }
  },
  methods: {
    loaded() {
     // Reload and get payments
     if (ListStore.getters.beforeIdHighest === null) {
	   ListStore.dispatch('loadPayments');
     }
     if (this.beforeId !== null && typeof this.beforeId !== 'undefined') {
       if (this.beforeId <= this.beforeIdHighest) {
         ListStore.dispatch('getPayments', { beforeId: this.beforeId });
       } else if (this.beforeId > this.beforeIdHighest) {
         ListStore.dispatch('getPayments', { beforeId: this.beforeIdHighest });
       }
     } else {
       ListStore.dispatch('getPayments', { beforeId: this.beforeIdHighest });
     }
     if (this.beforeIdPrev !== null && typeof this.beforeIdPrev !== 'undefined') {
       console.log(ListStore.actions);
       ListStore.dispatch('saveBeforeIdPrev', this.beforeIdPrev);
     }
    },
    paymentDetail(id) {
      this.$router.push({ name: 'payment-detail', params: { id }});
    }
  }
};
</script>
