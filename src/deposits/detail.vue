<template lang="pug">
.app-deposit-detail
  .app-form
    //
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
        label.label Reference
      .field-body
        .field.has-addons
          .control
            textarea.textarea(placeholder="Notes...")
  
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
.app-form {
  padding: 1rem;
  .app-field {
    .auto-center();
  }
  .exchange-icon-wrapper {
    width: 100%;
    text-align: center;
  }
  .exchange-icon {
    transform: rotate(90deg);
  }
  .field.is-horizontal {
    display: flex;
    .field-label {
      flex-basis: 0;
      flex-grow: 1;
      flex-shrink: 0;
      margin-top: 0.25rem;
      text-align: left;
    }
    .input {
      width: 10rem;
      text-align: right;
    }
    .or-block {
      display: block;
    }
    .textarea {
      width: 13.5rem;
      text-align: left;
    }
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
      store.dispatch('updateDepositStep', types.stepEnum.RESULT);

    }
  },
};
</script>
