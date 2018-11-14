<template lang="pug">
#app
  app-header
  template(v-if="$route.matched.length")
    .app-sidebar
    .app-container
      transition(name="na-page-change")
        router-view
  app-footer
</template>
<style lang="less">
@import (reference, less) url("./theme/core.less");

.app-container {
  background-color: @clr-gray;
}

</style>
<script>

import { Header , Footer } from './navigation';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
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
      const that = this;
      if (this.$route.matched.length > 0) {
        const routeObj = this.$route.matched[0];
        this.routePath = routeObj.path;
      } else {
        this.routePath = 'N/A';
      }
    },
  },
};
</script>
