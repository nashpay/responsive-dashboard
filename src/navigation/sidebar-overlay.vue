<template>
  <div :class="clsSidebar" @click="hideSidebar">
  </div>
  
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.app-sidebar-overlay {
  padding: 0;
  height: 100%;
  width: 52%;
  /* background-color: #fafafa; */
  background-color: transparent;
}
.app-sidebar-overlay.app-sidebar-show {
  z-index: 10;
  /* position: absolute; */
  position: fixed;
  left: 48%;
  @media @desktop {
    display: none;
	z-index: 0;
	/* position: relative; */
	position: static;
  }
  @media @tablet {
    display: none;
	z-index: 0;
    /* position: relative; */
    position: static;
  }
}
.app-sidebar-overlay.app-sidebar-hide {
  display: none;
}
</style>
<script>
import NavStore from './store';

export default {
  data() { 
    return {
      // Classes
      baseClass: ['column', 'app-sidebar-overlay'],
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  components: {
  },
  computed: {
    sidebarStatus () {
      return NavStore.getters.sidebarStatus;
    },
    clsSidebar() {
      // 0 - Hide, 1 - Show
      const toggleClass = this.sidebarStatus === 0 ? 'app-sidebar-hide' : 'app-sidebar-show'; 
      return [ ...this.baseClass, toggleClass ];
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
    hideSidebar() {
	  NavStore.dispatch('saveSidebarStatus', 0);
    },
  }
};
</script>
