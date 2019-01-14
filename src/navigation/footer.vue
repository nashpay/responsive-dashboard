<template>
<div class="app-footer">
  <h1> Footer </h1>
</div>
  
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.app-footer {

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
