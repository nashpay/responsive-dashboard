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
  //
  template(v-for="tx in txInputs")
    box-tx(
      :info="tx",
    )
  component-card(cardColor="transparent", cardNoVertPadding="yes", cardNoHoriPadding="yes")
    template(slot="card-content")
      nav.level.is-mobile
        .level-left
          .level-item
            span.tag.is-danger {{ txOutputs.length }}
            .transfer-output-title Recipients
        .level-right
          .level-item
  template(v-for="tx in txOutputs")
    box-tx(
      :info="tx",
    )
  component-button.app-align-bottom(
    bicon='none',
    btext='Sign',
    bsize="medium",
    blabel="btn-tx-sign",
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
import ApiStore from '../nashcli/store';
import { BoxTX } from '../transactions';

export default {
  data() {
    return {
    };
  },
  computed: {
    recipientList () {
      return store.getters.recipientList;
    },
    childAccountList () {
      return []
    },
    txInputs () {
      const rawResponse = store.getters.transferResponse;
      console.log('rawResponse for txInputs');
      console.log(rawResponse);
      if (rawResponse === {}) {
        return [];
      }
      const inputs = rawResponse.txInputs.reduce((acc, row) => {
        return acc.concat({
          category: 'txinput',
          address: row.txId,
          amount: parseFloat(parseFloat(row.value) / 100000000.0).toFixed(6),
          stat: 1001,
        });
      }, []);
      return inputs;
      /*
      return [{
        txId: 'f022f4bdb6c8ef3eff8b70eef5ec3cc31e728701e9e537851c9e996a9839f919',
        vout: '1',
        value: '100000',
      }];
      */
    },
    txOutputs () {
      /*
      return [{
        address: '3JSgBF1Ta7P5sZB7AMNvEtLvagJXKGxWkW',
        value: '50000',
      }];
      */
      const rawResponse = store.getters.transferResponse;
      if (rawResponse === {}) {
        return [];
      }
      console.log('rawResponse');
      console.log(rawResponse);
      const outputs = rawResponse.txOutputs.reduce((acc, row) => {
        if (Object.hasOwnProperty.call(row, 'addressId') === false) {
          return acc.concat({
            category: 'transfer',
            address: row.address,
            amount: parseFloat(parseFloat(row.value) / 100000000.0).toFixed(6),
            stat: 1001,
          });
        }
        return acc;
      }, []);
      return outputs;
    }
  },
  components: {
    'component-card': Card,
    'component-checkbox': Checkbox,
    'component-button': Button,
    'component-slider': Slider,
    'box-tx': BoxTX,
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
      // store.dispatch('updateTransferStep', types.stepEnum.COMPLETE);
      ApiStore.dispatch('signTransferRequest', { slave: 'default', store, types, networkLabel: 'btc-testnet' });
    }
  },
};
</script>
