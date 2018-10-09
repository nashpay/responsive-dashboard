<template lang="pug">
.web-accounts.pa2.na-background
  .is-mobile.columns.na-level
    .column.is-6-mobile.na-left
      p.na-padding-text Placeholder ACC
    .column.is-6-mobile.na-right
      p.na-padding-text Some ACC
</template>
<style lang="less">
@import (reference, less) url("../../theme.less");

</style>

<script>
import { AppStore as store } from '../../store';



export default {
  data() {
    return {
      // Data Here.
    };
  },
  computed: {
  },
  components: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  mixins: [],
  watch: {
    $route(to, from) {
      console.log('Route changed.');
      this.loaded();
    },
  },
  methods: {
    loaded() {
      // Load Page Title
      store.dispatch('setTitle', { title: 'Accounts' });
      store.dispatch('setActiveTab', { tabName: 'accounts' });
      store.dispatch('setHeaderBackLink', { backLink: false });
      store.dispatch('setHeaderActionIcon', { iconName: false });
      store.dispatch('setHeaderActionLink', { actionLink:false });
    },
  },
};
</script>
