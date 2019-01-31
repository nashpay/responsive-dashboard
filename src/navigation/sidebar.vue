<template>
  <div :class="clsSidebar">
    <sidebar-header
      pageName="NASHPAY"
      v-bind:pageRoute="dashboardIndex"
      v-bind:sidebarStatus="sidebarStatus"
    >
      <template slot="fa-icon">
        <!-- <img src="http://127.0.0.1:8080/assets/nash_logo.svg" height="64px" width="64px" /> -->
        <img src="http://127.0.0.1:8080/assets/nash_logo.svg"/>
      </template>
    </sidebar-header>
    <sidebar-item
      pageName="Dashboard"
      v-bind:pageRoute="dashboardIndex"
      v-bind:sidebarStatus="sidebarStatus"
    >
      <template slot="fa-icon">
        <i class="fa fa-tachometer"/>
      </template>
    </sidebar-item>
    <sidebar-item 
      pageName="Payments"
      v-bind:pageRoute="paymentIndex"
      v-bind:sidebarStatus="sidebarStatus"
    >
      <template slot="fa-icon">
        <i class="fa fa-envelope-o" />
      </template>
    </sidebar-item>
    <sidebar-item
      pageName="Transfers"
      v-bind:pageRoute="transferIndex"
      v-bind:sidebarStatus="sidebarStatus"
    >
      <template slot="fa-icon">
        <i class="fa fa-paper-plane" />
      </template>
    </sidebar-item>
    <sidebar-item
      pageName="API"
      v-bind:pageRoute="dashboardIndex"
      v-bind:sidebarStatus="sidebarStatus"
    >
      <template slot="fa-icon">
        <i class="fa fa-hdd-o" />
      </template>
    </sidebar-item>
    <sidebar-item
      pageName="Settings"
      v-bind:pageRoute="dashboardIndex"
      v-bind:sidebarStatus="sidebarStatus"
    >
      <template slot="fa-icon">
        <i class="fa fa-cog" />
      </template>
    </sidebar-item>
  </div>
  
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.app-sidebar {
  padding: 0;
  color: @secondary-color;
  height: 100%;
  /* background-color: #fafafa; */
  background-color: #e5e5e5;
  @media @desktop {
    width: 25%;
  }
  @media @tablet {
    width: 25%;
  }
}
.app-sidebar.app-sidebar-show {
  z-index: 10;
  /* position: absolute; */
  position: fixed;
  @media @desktop {
    display: block;
	z-index: 0;
	/* position: relative; */
	position: static;
    max-width: 13rem;
  }
  @media @tablet {
	z-index: 0;
    display: block;
	/* position: relative; */
	position: static;
    max-width: 13rem;
  }
}
.app-sidebar.app-sidebar-hide {
  display: none;
  @media @desktop {
    display: block;
    max-width: 13rem;
  }
  @media @tablet {
    display: block;
    max-width: 6rem;
  }
}
</style>
<script>
import { SidebarHeader, SidebarItem } from '../components';
import NavStore from './store';

export default {
  data() { 
    return {
      dashboardIndex: { name: 'dashboard-index' },
      paymentIndex: { name: 'payment-list' },
      transferIndex: { name: 'transfer-list' },
      // Classes
      baseClass: ['column', 'app-sidebar'],
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
    'sidebar-header': SidebarHeader,
    'sidebar-item': SidebarItem,
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
  }
};
</script>
