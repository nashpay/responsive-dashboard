<template lang="pug">
.app-divider
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
</style>
<script>

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
  },
  components: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  mixins: [
  ],
  watch: {
    $route(to, from) {
      this.loaded();
    },
  },
  methods: {
    loaded() {
    },
  },
};
</script>
