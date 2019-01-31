<template>
  <div class="container-inner">
    <h1> Transfers </h1>
    <router-view />
  </div>
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.container-inner {
  padding: 1rem 0rem 0.75 1.0rem;
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>
<script>

export default {
  data() { 
    return {};
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
