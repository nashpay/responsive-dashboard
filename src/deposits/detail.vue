<template lang="pug">
.app-deposit-detail
  h1.detail-header Details
  .field.is-horizontal.is-flex-mobile
    .field-body
      .field
        .control
          input.input.is-small(type="text", placeholder="0.0001")
    .field-label.is-small
      label.label BTC
  //
  component-button.app-align-bottom(
    bicon='none',
    btext='Next',
    bsize="medium",
    blabel="btn-account-detail-next",
    bcat="primary",
    v-on:btn-clicked="onBtnClicked",
  )
    
  
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-deposit-detail {
  .detail-header {
    padding: 1rem 0rem 1rem 0rem;
    text-align: center;
    width: 100%;
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: bold;
  }
}
</style>
<script>
import store from './store';
import * as types from './store/mutation-types';
import { Card, Divider, Checkbox, Button  } from '../components';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
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

    }
  },
};
</script>
