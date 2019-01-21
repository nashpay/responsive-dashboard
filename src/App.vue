<template>
<div id="app">
  <div class="columns is-mobile">
    <app-sidebar />
    <app-sidebar-overlay/>
    <div class="app-container column">
      <app-header />
      <router-view />
      <app-footer />
    </div>
  </div>
</div>
  
</template>
<style lang="less">
@import (reference, less) url("./theme/core.less");
#app {
  font-family: 'Roboto', sans-serif;
  height: 100%;
  .columns {
    .app-container.column {
      padding: 0.75rem 0rem 0.75rem 0rem;
    }
    .app-container.column:last-child {
      padding: 0.75rem 1.50rem 0.75rem 0rem;
      @media @tablet {
        padding: 0.75rem 1.50rem 0.75rem 0rem;
      }
    }
	.column:last-child {
	  margin: 0;
	}
  }
}
</style>
<script>
import { Header, Footer, Sidebar, SidebarOverlay, store as NavStore } from './navigation';

export default {
  data() { 
    return {};
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-sidebar': Sidebar,
    'app-sidebar-overlay': SidebarOverlay,
  },
  watch: {
    $route(to, from) {
      // Always hide sidebar on route change
      NavStore.dispatch('saveSidebarStatus', 0);
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
