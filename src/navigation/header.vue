<template>
<div class="app-header">
  <div class="app-header-wrap">
    <nav class="level is-mobile">
      <div class="level-left">
        <i class="fa fa-bars" @click="toggleSidebar"/>
      </div>
      <div class="level-right">
        <div class="level-item">
          <i class="fa fa-bell-o" />
        </div>
        <div class="level-item logout-btn">
          <p> Logout </p>
        </div>
      </div>
    </nav>
  </div>
</div>
  
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.app-header {
  /* background-color: @primary-color; */
  /* background-color: #fafafa; */
  background-color: #fff;
  /* border-bottom: solid 1px @primary-color; */
  .app-header-wrap {
    padding: 1.50rem 1rem 1.50rem 1rem;
    .logout-btn {
      p {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.25;
        margin-bottom: -0.2rem;
        display: block;
        word-break: break-word;
        text-align: left;
      }
    }
  }
}
</style>
<script>
import NavStore from './store';

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
    toggleSidebar() {
      const currentSidebarStatus = NavStore.getters.sidebarStatus;
      if (currentSidebarStatus === 0) {
        NavStore.dispatch('saveSidebarStatus', 1);
      } else {
        NavStore.dispatch('saveSidebarStatus', 0);
      };
    },
  }
};
</script>
