<template lang="pug">
.app-transfer-recipient-add
  .app-form
    .field.is-horizontal.app-field
      .field-label.is-normal
        label.label Amount
      .field-body
        .field.has-addons
          .control
            input.input(type="text", placeholder="0.000")
          .control
            a.button BTC
        .field.exchange-icon-wrapper
          i.fa.fa-exchange.exchange-icon(aria-hidden="true")
        .field.has-addons
          .control
            input.input(type="text", placeholder="0.000")
          .control
            a.button USD
    .field.is-horizontal.app-field
      .field-label.is-normal
        label.label Address
      .field-body
        .field
          .control
            input.input(type="text", placeholder="2Mn..")
    //
    nav.level.is-mobile
     .level-item
     .level-right
       .level-item
         component-button(
           bicon='none',
           btext='Confirm',
           blabel="btn-recipient-add",
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
    }
  },
};
</script>
