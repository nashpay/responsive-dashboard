<template>
<div class="column is-3 app-sidebar">
  <h1> Sidebar </h1>
</div>
  
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.app-sidebar {
  display: none;
  background-color: #fafafa;
  color: @secondary-color;
  @media @desktop {
    display: inline-flex;
    max-width: 16rem;
  }
  @media @tablet {
    display: inline-flex;
    max-width: 16rem;
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
