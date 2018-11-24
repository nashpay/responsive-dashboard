<template lang="pug">
.app-transfer-recipient-add
  .app-form
    .field.is-horizontal.app-field
      .field-label.is-normal
        label.label Balance
      .field-body
        h1.title.is-4.box-transfer-balance 0.0001 BTC
        progress.progress.is-danger.remaining-balance(:value="remainingPct", max="100")
   
    .field.is-horizontal.app-field
      .field-label.is-normal
        label.label Amount
      .field-body
        .field.has-addons
          .control
            input.input(type="text", placeholder="0.000",v-model="cryptoAmount")
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
            input.input(type="text", placeholder="2Mn..",v-model="recipientAddress")
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
.app-transfer-recipient-add {
  h1.box-transfer-balance {
    text-align: right;
    margin-bottom: 0;
    padding-bottom: 0.3rem;
  }
  progress.remaining-balance {
    transform: rotate(180deg);
    height: 0.3rem;
  }
}
</style>
<script>
import { storeActions } from '../utils/objectStore';
import store from './store';
import * as types from './store/mutation-types';
import { Card, Divider, Checkbox, Button  } from '../components';

export default {
  data() {
    return {
      cryptoAmount: '',
      recipientAddress: '',
      remainingPct: 90,
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
    onBtnClicked (val) {
      // @TODO All in check logic
      const { label } = val;
      if (label === 'btn-recipient-add') {
        const sdata = { 
          amount: this.cryptoAmount,
          address: this.recipientAddress,
          amountFiat: '100', // TODO Remove hardcode
          currencyFiat: 'USD', // TODO Remove hardcode
        };
        store.dispatch('updateRecipientList', {
          data: sdata,
          action: storeActions.CREATE,
        });
        store.dispatch('updateRecipientAddBtn', types.recipientAddBtnEnum.HIDE);
        this.cryptoAmount = '';
        this.recipientAddress = '';
      }
    }
  },
};
</script>
