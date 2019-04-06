<template>
<div class="app-header">
  <div class="app-header-wrap">
    <nav class="level is-mobile">
      <div class="level-left">
        <i class="fa fa-bars" v-on:click="toggleSidebar"/>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="balance-section">
            <p class="balance-label">Available</p>
            <p class="balance-value"> {{ totalAvailable }} BTC</p>
          </div>
          <div class="balance-section">
            <p class="balance-label">Pending</p>
            <p class="balance-value"> {{ totalPending }} BTC</p>
          </div>
        </div>
        <div class="level-item">
          <i class="fa fa-bell-o" />
        </div>
        <div class="level-item auth-btn">
          <router-link :to="{ name: 'auth-login' }" v-if="isAuth === false">
            <div class="button"> Login </div>
          </router-link>
          <router-link :to="{ name: 'auth-logout' }" v-else="">
            <div class="button"> Logout </div>
          </router-link>
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
    .balance-section {
      display: block;
      .balance-label {
        font-size: 0.8rem;
        font-weight: 700;
        display: block;
        padding: 0 0.5rem 0 0.5rem;
      }
      .balance-value {
        font-size: 1.0rem;
        display: block;
        padding: 0 0.5rem 0 0.5rem;
      }
    }
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
import AuthStore from '../auth/store';
import AccountControllers from '../navigation/controllers';

export default {
  data() { 
    return {
      accController: 'notloaded',
    };
  },
  mounted() {
    const accController = AccountControllers(AuthStore);
    this.accController = accController;
    this.$nextTick(this.loaded);
  },
  computed: {
    isAuth() {
      return AuthStore.getters.isAuth;
    },
    totalAvailable() {
      if (this.accController !== 'notloaded') {
        const { totalAvailable } = this.accController.getAllAccountBalance();
        return totalAvailable.toString();
      }
      return '0.0000';
    },
    totalPending() {
      if (this.accController !== 'notloaded') {
        const { totalPending } = this.accController.getAllAccountBalance();
        return totalPending.toString();
      }
      return '0.0000';
    },
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
