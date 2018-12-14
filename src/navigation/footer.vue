/* eslint react/prop-types: 0 */
<template lang="pug">
.app-footer
  .columns.is-mobile
    .column.is-4-mobile.web-footer-tab(v-bind:class="dashboardTabClass")
      router-link(:to="{ name: 'dashboardHome' }")
        i.fa.fa-home.footer-icon(aria-hidden="true")
    .column.is-4-mobile.web-footer-tab(v-bind:class="transactionTabClass")
      router-link(:to="{ name: 'transactionHome' }")
        i.fa.fa-list.footer-icon(aria-hidden="true")
    .column.is-4-mobile.web-footer-tab(v-bind:class="settingTabClass")
      router-link(:to="{ name: 'settingHome' }")
        i.fa.fa-cog.footer-icon(aria-hidden="true")
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-footer {
  width: 100%;
  position: absolute;
  height: @app-footer-height;
  bottom: 0;
  left: 0;
  z-index: 2;  
  background-color: #fff;
  border-top: solid 1px @clr-gray-2;

  .web-footer-tab {
    font-size: 2rem;
    text-align: center;
  }
  .footer-icon {
    height: 2.8rem;
    padding: 1rem 1rem 1rem 1rem;
    text-align: center;
  }
  .tab-active a {
    color: @clr-red;
  }
  .tab-inactive a {
    color: @clr-gray;
  }
}

</style>
<script>
import NavStore from './store';
export default {
  data() {
    return {
    };
  },
  computed: {
    dashboardTabClass(){
      const isActive = NavStore.getters.activeTab === 'dashboardHome';
      return {
        'tab-active': isActive,
        'tab-inactive': !isActive,
      };
    },
    transactionTabClass() {
      const isActive = NavStore.getters.activeTab === 'transactionHome';
      return {
        'tab-active': isActive,
        'tab-inactive': !isActive,
      };
    },
    settingTabClass() {
      const isActive = NavStore.getters.activeTab === 'settingHome';
      return {
        'tab-active': isActive,
        'tab-inactive': !isActive,
      };
    }
  },
  components: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  mixins: [
  ],
  watch: {
    $route(to, from) {
      this.loaded();
    },
  },
  methods: {
    loaded() {
    },
  },
};
</script>
