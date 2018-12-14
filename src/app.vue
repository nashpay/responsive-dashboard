<template lang="pug">
#app
  app-header
  template(v-if="$route.matched.length")
    .app-sidebar
    .app-container
      transition(name="na-page-change")
        router-view
  app-footer
  app-overlay
  app-popup
  app-modal
</template>
<style lang="less">
@import (reference, less) url("./theme/core.less");

#app {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}

.app-container {
  background-color: @clr-gray-0;
  margin-top: @app-header-height * 2.8%;
  height: 96% - @app-header-height - @app-footer-height;
  overflow: hidden;
}

.clr-red-1 {
  color: @clr-red;
}
.clr-green-1 {
  color: @clr-green;
}
.app-align-bottom {
  width: 100%;
  position: fixed; 
  left: 0;
  top: 90%;
}
.app-align-bottom-footer {
  width: 100%;
  position: fixed; 
  left: 0;
  top: 80%;
}

</style>
<script>

import ApiStore from './nashcli/store';
import { Header , Footer, Overlay, Popup, Modal } from './navigation';
import NavStore from './navigation/store';
import RateStore from './rates/store';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-overlay': Overlay,
    'app-popup': Popup,
    'app-modal': Modal,
  },
  mounted() {
    this.$nextTick(this.loaded);
    ApiStore.dispatch('updateRootAccountBalance', { slave: 'default' });
    ApiStore.dispatch('updateRootAccountTransactions', { slave: 'default' });
    setInterval(() => {
      RateStore.dispatch('pollPrices');
      ApiStore.dispatch('updateRootAccountBalance', { slave: 'default' });
      ApiStore.dispatch('updateRootAccountTransactions', { slave: 'default' });
    }, 3000); // Poll every 3 seconds..
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
        NavStore.dispatch('updateActiveTab', routeObj.name);
      } else {
        this.routePath = 'N/A';
      }
    },
  },
};
</script>
