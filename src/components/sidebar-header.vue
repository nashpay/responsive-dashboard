<template>
  <!-- <div class="app-sidebar-header"> -->
  <div :class="clsSidebarHeader">
    <p>&nbsp;</p>
    <router-link :to="pageRoute">
      <div class="app-sidebar-wrap">
        <nav class="level">
          <div class="level-item sidebar-logo">
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
  width: 12rem;
  /* background-color: @primary-color; */
  /* background-color: #b3b3b3; */
  /* background-color: #ccc */
  background-color: #e5e5e5;
  display: block;
  a {
    color: #fff;
    .app-sidebar-wrap {
      justify-content: center;
      padding: 0rem 0.25rem 0.25rem 0.5rem;
      .level-item.sidebar-logo {
        justify-content: center;
        img {
          height: 64px;
          width: 64px;
        }
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
.app-sidebar-header.app-sidebar-header-hide {
  width: 0rem;
  @media @desktop {
    width: 12rem;
  }
  @media @tablet {
    width: 6rem;
  }
  a {
    .app-sidebar-wrap {
      padding: 0rem 0.25rem 0.25rem 0.5rem;
      .level-item.sidebar-logo {
        justify-content: center;
        img {
          height: 0px;
          width: 0px;
          @media @desktop {
            height: 64px;
            width: 64px;
          }
          @media @tablet {
            height: 28px;
            width: 28px;
          }
        }
      }
    }
  }
}
</style>
<script>

export default {
  data() { 
    return {
      baseClassHeader: ['app-sidebar-header'],
    };
  },
  computed: {
    clsSidebarHeader() {
      const toggleClass = this.sidebarStatus === 0 ? 'app-sidebar-header-hide': null;
      console.log(`toggleClass for sidebar header: ${toggleClass}`);
      return [...this.baseClassHeader, toggleClass];
    },
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
    'pageName',
    'pageRoute',
    'sidebarStatus',
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
