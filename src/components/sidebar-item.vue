<template>
<div class="app-sidebar-item">
  <router-link :to="pageRoute">
    <div class="app-sidebar-wrap">
      <nav class="level">
        <div class="level-left">
          <div class="level-item sidebar-icon">
            <slot name="fa-icon" />
          </div>
        </div>
        <div class="level-item sidebar-name">
          <p> {{ pageName }} </p>
        </div>
      </nav>
    </div>
  </router-link>
</div>
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.app-sidebar-item {
  width: 15rem;
  background-color: #fff;
  a {
    color: @gray; 
    .app-sidebar-wrap {
      padding: 0.5rem 1rem 0 1rem;
      .sidebar-icon {
        padding: 0.75rem 0.75rem 0.40rem 0.75rem;
      }
      .level-item.sidebar-name {
        justify-content: left;
      }
      .sidebar-name {
        padding: 0.75rem 0.75rem 0.40rem 0;
        p {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.25;
          margin-bottom: -0.2rem;
          display: block;
          word-break: break-word;
          text-align: left;
        }
      }
    }
  }
  a.active {
    color: @primary-color;
  }
  a:hover {
    color: @primary-color;
  }
}
.app-sidebar-item:first-child {
  padding: 0.5rem 0rem 0rem 0rem;
}
.app-sidebar-item:last-child {
  padding: 0rem 0rem 1.5rem 0rem;
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
