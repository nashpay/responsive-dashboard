<template>
  <div class="app-sidebar-header">
    <p>&nbsp;</p>
    <router-link :to="pageRoute">
      <div class="app-sidebar-wrap">
        <nav class="level">
          <div class="level-item sidebar-name">
            <slot name="fa-icon" />
          </div>
        </nav>
      </div>
    </router-link>
  </div>
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.app-sidebar-header {
  width: 12.5rem;
  /* background-color: @primary-color; */
  background-color: #fafafa;
  display: block;
  a {
    color: #fff;
    .app-sidebar-wrap {
      padding: 0rem 1.0rem 0.25rem 0.5rem;
      .level-item.sidebar-name {
        justify-content: center;
      }
    }
  }
  a.active {
    color: #fff;
  }
  a:hover {
   color: #fff;
  }
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
  props: [
    'pageName',
    'pageRoute',
  ], 
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
