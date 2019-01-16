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
          <router-link :to="createRoute">
            Create
          </router-link>
        </li>
        <li class="is-active">
            <a>Fail</a>
        </li>
      </ul>
    </nav> 
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title"> Uh oh</h1>
          <h2 class="subtitle">Something went wrong</h2>
        </div>
      </div>
    </section>
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
      createRoute: { name: 'payment-create' },
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
