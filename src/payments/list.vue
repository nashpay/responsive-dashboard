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
       <tr>
        <td> 1 </td><td> 1 Jan 2019 22:59 </td><td> 2MuDYfKAKp3XL4EYa5xPBGccqDCBLgBXuJW </td> <td>0.00001</td><td> 2 Confirmations </td>
       </tr>
     </tbody>
    </table>
    <nav class="level">
      <div class="level-item"><p>&nbsp;</p></div>
      <div class="level-right">
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

export default {
  data() { 
    return {
      pageRoute: { name: 'payment-list' },
    }
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
        // Update NavStore
      } else {
        // 404
      } 
    },
  }
};
</script>
