<template lang="pug">
.web-settings.na-background
  .is-mobile.columns.na-level
    .column.is-6-mobile.na-left
      p.na-padding-text Placeholder Setting
    .column.is-6-mobile.na-right
      p.na-padding-text Some Setting
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
      store.dispatch('setTitle', { title: 'Settings' });
      store.dispatch('setActiveTab', { tabName: 'settings' });
      store.dispatch('setHeaderBackLink', { backLink: false });
      store.dispatch('setHeaderActionIcon', { iconName: false });
      store.dispatch('setHeaderActionLink', { actionLink:false });
    },
  },
};
</script>
