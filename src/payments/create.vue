<template>
  <div class="container-subrouter">
    <nav class="breadcrumb" aria-label="breadcrumb">
      <ul>
        <li>
          <router-link :to="pageRoute">
            Home
          </router-link>
        </li>
        <li class="is-active">
            <a>Create</a>
        </li>
      </ul>
    </nav> 
    <div class="field">

    </div>
  </div>
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

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
        // Update NavStore
      } else {
        // 404
      } 
    },
  }
};
</script>
