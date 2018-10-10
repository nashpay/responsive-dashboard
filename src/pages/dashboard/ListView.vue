<template lang="pug">
.web-dashboard.na-background
  dash-tx-flow-time
</template>
<style lang="less">
@import (reference, less) url("../../theme.less");
</style>

<script>
import co from 'co';
import { AppStore as store } from '../../store';
import { DashTxFlowTime } from '../../components';

export default {
  data() {
    return {
      // Data Here.
    };
  },
  computed: {

  },
  components: {
    'dash-tx-flow-time': DashTxFlowTime,
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
      store.dispatch('setTitle', { title: 'Nash' });
      store.dispatch('setActiveTab', { tabName: 'dashboard' });
      store.dispatch('setHeaderBackLink', { backLink: false });
      store.dispatch('setHeaderActionIcon', { iconName: false });
      store.dispatch('setHeaderActionLink', { actionLink:false });
    },
  },
};
</script>
