<template>
<div id="app">
  <div class="columns is-mobile">
    <app-sidebar v-if="isAuth"/>
    <app-sidebar-overlay v-if="isAuth"/>
    <div class="app-container column">
      <app-header v-if="isAuth"/>
      <router-view />
      <app-footer v-if="isAuth"/>
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
      padding: 0.75rem;
    }
    .app-container.column:nth-last-child(1) {
      padding: 0.75rem 1.50rem 0.75rem 1.50rem;
      @media @tablet {
        width: 75%;
        padding: 0.75rem 1.50rem 0.75rem 0.75rem;
      }
      @media @desktop {
        width: 75%;
        padding: 0.75rem 1.50rem 0.75rem 0.75rem;
      }
    }
    .app-container.column:nth-last-child(2) {
      padding: 0.75rem 1.50rem 0.75rem 0.75rem;
      @media @tablet {
        padding: 0.75rem 1.50rem 0.75rem 0.75rem;
      }
      @media @desktop {
        padding: 0.75rem 1.50rem 0.75rem 0.75rem;
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
import storeAuth from './auth/store';

export default {
  data() { 
    return {};
  },
  computed: {
    isAuth () {
      return storeAuth.getters.isAuth;
    },
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
        const currentView = this.$route.matched[0];
        const { name: pathName } = currentView;
        const isAuth = storeAuth.state.authenticated;
        if (pathName !== 'auth' && isAuth === false || isAuth === 'STORE_DEFAULT') {
          //
          this.$router.push({ name: 'auth-login' });
        }
      } else {
        // 404
        console.log('No Route Matched...');
      } 
      
    },
  }
};
</script>
