<template lang="pug">
.web-footer
  .columns.is-mobile.web-footer-col
    .column.is-3-mobile.web-footer-tab
    .column.is-3-mobile.web-footer-tab
    .column.is-3-mobile.web-footer-tab(v-bind:class="{ 'tab-active': tabAccountActive, 'tab-inactive': !tabAccountActive }")
      router-link(:to="{ name: 'accountsHome' }")
        i.fa.fa-user.web-tab-icon
        p Account
    .column.is-3-mobile.web-footer-tab(v-bind:class="{ 'tab-active': tabSettingActive, 'tab-inactive': !tabSettingActive }")
      router-link(:to="{ name: 'settingsHome' }")
        i.fa.fa-cog.web-tab-icon
        p Settings


</template>
<style lang="less">
@import (reference, less) url("../theme.less");
.tab-active a {
  color: @primary-color;
}
.web-footer-col {
  position: relative;
  top: 0.9rem;
}
.web-tab-icon {
  font-size: 1.2rem;
}
.web-footer-tab {
  height: 2.8rem;
  text-align: center;
  padding: 0.2rem 0.1rem 0.1rem 0.1rem;
}

.tab-inactive a {
  color: @dark-gray;
}

.tab-inactive a:hover {
  color: @primary-color;
}

.web-footer {
  height: 3.2rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: solid 1px @medium-gray;
  background-color: @light-gray;
  z-index: 3;
}

</style>
<script>
import { AppStore as store } from '../store/';

export default {
  data() {
    return {
      // Data Here.
    };
  },
  computed: {
    tabAccountActive () {
      const activeTab = store.getters.activeTab;
      const isActive = activeTab === 'accounts';
      console.log(`Accounts isActive: ${isActive}`);
      return isActive;
    },
    tabSettingActive () {
      const activeTab = store.getters.activeTab;
      const isActive = activeTab === 'settings';
      return isActive;
    }
  },
  components: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  mixins: [],
  watch: {
    $route(to, from) {
    },
  },
  methods: {
    loaded() {

    },
  },
};
</script>
