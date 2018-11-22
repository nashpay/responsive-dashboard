<template lang="pug">
.app-transfer-recipient
  component-button.app-align-bottom(
    bicon='none',
    btext='Next',
    bsize="medium",
    blabel="btn-account-selection-next",
    bcat="primary",
    v-on:btn-clicked="onBtnClicked",
  )
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
</style>
<script>
import store from './store';
import * as types from './store/mutation-types';
import { Card, Divider, Checkbox, Button  } from '../components';

export default {
  data() {
    return {
    };
  },
  computed: {
    childAccountList () {
      return []
    }
  },
  components: {
    'component-card': Card,
    'component-divider': Divider,
    'component-checkbox': Checkbox,
    'component-button': Button,
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
    onBtnClicked (label) {
      // @TODO All in check logic
      store.dispatch('updateTransferStep', types.stepEnum.REVIEW);
    }
  },
};
</script>
