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

#app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.app-container {
  background-color: @clr-gray-0;
  margin-top: @app-header-height * 2;
  height: 100vh - @app-header-height - @app-footer-height;
}

.clr-red-1 {
  color: @clr-red;
}
.clr-green-1 {
  color: @clr-green;
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
