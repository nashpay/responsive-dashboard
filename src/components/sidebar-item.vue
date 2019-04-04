<template>
<div :class="clsSidebarItem">
  <router-link :to="pageRoute">
    <div class="app-sidebar-wrap">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item sidebar-icon">
            <slot name="fa-icon" />
          </div>
        </div>
        <div :class="clsSidebarItemName">
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
  width: 12rem;
  /* background-color: #b3b3b3; */
  /* background-color: #ccc; */
  background-color: @pri-red;
  a {
    background-color: @pri-red;
    color: #fff;
    .app-sidebar-wrap {
      padding: 1rem 1rem 0 1rem;
      .sidebar-icon {
        padding: 0.75rem 0rem 0.40rem 0.75rem;
      }
      .level-item.sidebar-name {
        justify-content: left;
      }
      .level-item.sidebar-name.sidebar-name-hide {
        display: none;
        @media @desktop {
          display: block;
        }
        @media @tablet {
          display: none;
        }
      }
      .sidebar-name {
        padding: 0.75rem 0.75rem 0.40rem 0;
        p {
          font-size: 0.8rem;
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: -0.2rem;
          display: block;
          word-break: break-word;
          text-align: left;
        }
      }
    }
  }
  a.router-link-active {
    background-color: #212529;
  }
  a:hover {
    background-color: #212529;
  }
}
.app-sidebar-item:first-child {
  padding: 0.5rem 0rem 0rem 0rem;
}
.app-sidebar-item:last-child {
  padding: 0rem 0rem 1.5rem 0rem;
}
.app-sidebar-item.app-sidebar-item-hide {
  width: 0rem;
  @media @desktop {
    width: 12rem;
  }
  @media @tablet {
    width: 6rem;
  }
  a {
    .app-sidebar-wrap {
      .sidebar-icon {
        @media @tablet {
          margin-left: 0.80rem;
        }
      }
    }
  }
}
.app-sidebar-item.active {
  background-color: #212529;
}
</style>
<script>

export default {
  data() { 
    return {
      baseClassSidebarItem: ['level-item', 'sidebar-name'],
      baseClassSidebar: ['app-sidebar-item'],
    };
  },
  computed: {
    clsSidebarItemName () {
      const toggleClass = this.sidebarStatus === 0 ? 'sidebar-name-hide': null;
      return [...this.baseClassSidebarItem, toggleClass];
    },
    clsSidebarItem () {
      const toggleClass = this.sidebarStatus === 0 ? 'app-sidebar-item-hide': null;
      return [...this.baseClassSidebar, toggleClass];
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
      console.log('route changed');
      console.log(to);
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
