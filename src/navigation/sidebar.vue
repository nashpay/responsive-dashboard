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
      routeFilter="payment-"
      v-bind:pageRoute="paymentIndex"
      v-bind:sidebarStatus="sidebarStatus"
    >
      <template slot="fa-icon">
        <i class="fa fa-envelope-o" />
      </template>
    </sidebar-item>
    <sidebar-item
      pageName="Transfers"
      routeFilter="transfer-"
      v-bind:pageRoute="transferIndex"
      v-bind:sidebarStatus="sidebarStatus"
    >
      <template slot="fa-icon">
        <i class="fa fa-paper-plane" />
      </template>
    </sidebar-item>
    <sidebar-item
      pageName="API"
      routeFilter="api-"
      v-bind:pageRoute="dashboardIndex"
      v-bind:sidebarStatus="sidebarStatus"
    >
      <template slot="fa-icon">
        <i class="fa fa-hdd-o" />
      </template>
    </sidebar-item>
    <sidebar-item
      pageName="Settings"
      routeFilter="setting-"
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
  height: 100vh;
  padding: 0;
  color: @secondary-color;
  /* background-color: #fafafa; */
  /* background-color: #e5e5e5; */
  background-color: @pri-red;
  @media @desktop {
    width: 25%;
  }
  @media @tablet {
    width: 25%;
  }
}
.app-sidebar.app-sidebar-show {
  z-index: 10;
  height: 100vh;
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
    max-width: 12rem;
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
import storeAuth from '../auth/store'; // Access to List of Accounts
import AccountControllers from './controllers';

export default {
  data() { 
    return {
      dashboardIndex: { name: 'dashboard-index' },
      paymentIndex: { name: 'payment-list' },
      transferIndex: { name: 'transfer-list' },
      // Classes
      baseClass: ['column', 'app-sidebar'],
      accController: 'notloaded',
    };
  },
  mounted() {
    const accController = AccountControllers(storeAuth);
    this.accController = accController;
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
        if (this.accController !== 'notloaded') {
	  this.accController.refreshAllBalances();
        }
      } else {
        // 404
      } 
    },
  }
};
</script>
