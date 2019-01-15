<template>
<div class="column is-3 app-sidebar">
  <sidebar-header pageName="NASHPAY" v-bind:pageRoute="dashboardIndex">
    <template slot="fa-icon">
      <img src="http://127.0.0.1:8080/assets/nash_logo.svg" height="64px" width="64px" />
    </template>
  </sidebar-header>
  <sidebar-item pageName="Dashboard" v-bind:pageRoute="dashboardIndex">
    <template slot="fa-icon">
      <i class="fa fa-tachometer" />
    </template>
  </sidebar-item>
  <sidebar-item pageName="Payments" v-bind:pageRoute="paymentIndex">
    <template slot="fa-icon">
      <i class="fa fa-envelope-o" />
    </template>
  </sidebar-item>
  <sidebar-item pageName="Transfers" v-bind:pageRoute="dashboardIndex">
    <template slot="fa-icon">
      <i class="fa fa-paper-plane" />
    </template>
  </sidebar-item>
  <sidebar-item pageName="API" v-bind:pageRoute="dashboardIndex">
    <template slot="fa-icon">
      <i class="fa fa-hdd-o" />
    </template>
  </sidebar-item>
  <sidebar-item pageName="Settings" v-bind:pageRoute="dashboardIndex">
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
  display: none;
  background-color: #fff;
  height: 100% - 0.75rem;
  color: @secondary-color;
  @media @desktop {
    display: block;
    max-width: 13rem;
  }
  @media @tablet {
    display: block;
    max-width: 13rem;
  }
}
</style>
<script>
import { SidebarHeader, SidebarItem } from '../components';

export default {
  data() { 
    return {
      dashboardIndex: { name: 'dashboard-index' },
      paymentIndex: { name: 'payment-index' },
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
