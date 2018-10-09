<template lang="pug">
.web-dashboard.na-background
  .is-mobile.columns.na-level
    .column.is-6-mobile.na-left
      p.na-padding-text Placeholder
    .column.is-6-mobile.na-right
      p.na-padding-text Some Value
</template>
<style lang="less">
@import (reference, less) url("../../theme.less");
</style>

<script>
import co from 'co';
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
      this.loaded();
    },
  },
  methods: {
    loaded() {
      // Load Page Title
      store.dispatch('setTitle', { title: 'Home' });
      store.dispatch('setActiveTab', { tabName: 'home' });
      store.dispatch('setHeaderBackLink', { backLink: false });
      store.dispatch('setHeaderActionIcon', { iconName: false });
      store.dispatch('setHeaderActionLink', { actionLink:false });
    },
  },
};
</script>
