<template>
<div class="app-header">
  <h1> Header </h1>
</div>
  
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.app-header {
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
  components: {
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
