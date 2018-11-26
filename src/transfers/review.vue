<template lang="pug">
.app-transfer-review
  //
  component-card(cardColor="transparent", cardNoVertPadding="yes", cardNoHoriPadding="yes")
    template(slot="card-content")
      nav.level.is-mobile
        .level-left
          .level-item
            span.tag.is-danger {{ txInputs.length }}
            .transfer-input-title Inputs
        .level-right
          .level-item
      nav.level.is-mobile
        .level-left
          .level-item
            span.tag.is-danger {{ txOutputs.length }}
            .transfer-output-title Recipients
        .level-right
          .level-item
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
.app-transfer-review {
  .transfer-input-title {
	padding: 0rem 1rem 0rem 1rem;
  }
  .transfer-output-title {
	padding: 0rem 1rem 0rem 1rem;
  }
}
</style>
<script>
import store from './store';
import * as types from './store/mutation-types';
import { Card, Slider, Checkbox, Button  } from '../components';

export default {
  data() {
    return {
    };
  },
  computed: {
    childAccountList () {
      return []
    },
    txInputs () {
      return [{
        txId: 'f022f4bdb6c8ef3eff8b70eef5ec3cc31e728701e9e537851c9e996a9839f919',
        vout: '1',
        value: '100000',
      }];
    },
    txOutputs () {
      return [{
        address: '3JSgBF1Ta7P5sZB7AMNvEtLvagJXKGxWkW',
        value: '50000',
      }];
    }
  },
  components: {
    'component-card': Card,
    'component-checkbox': Checkbox,
    'component-button': Button,
    'component-slider': Slider,
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
      store.dispatch('updateTransferStep', types.stepEnum.COMPLETE);
    }
  },
};
</script>
