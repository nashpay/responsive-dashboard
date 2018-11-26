<template lang="pug">
.mod-landing
  component-card(cardColor="white")
    <template slot="card-content">
      box-balance(:available="accountBalance.available", :pending="accountBalance.pending")
    </template>
  component-card(cardColor="transparent", cardNoVertPadding="yes")
    <template slot="card-content">
      .nav.level.is-mobile
        .level-left
          .level.item
            component-button(
              bicon="arrow-circle-o-down",
              btext='Deposit',
              bsize="medium",
              blabel="btn-deposit",
              v-on:btn-clicked="onBtnClicked",
            )
        .level-right
          .level.item
            component-button(
              bicon="arrow-circle-o-up",
              btext='Withdraw',
              bsize="medium",
              blabel="btn-withdraw",
              v-on:btn-clicked="onBtnClicked",
            )
    </template>
  component-card(cardColor="transparent", cardNoVertPadding="yes")
    <template slot="card-content">
      h2.title.is-5.has-text-centered Recent Transactions
    </template>
  template(v-for="tx in transactions")
    box-tx(
      :info="tx",
    )
    
    
    
</template>
<style lang="less">

</style>
<script>
import { Card, Button  } from '../components';
import { BoxTX } from '../transactions';
import NavStore from '../navigation/store';
import * as NavTypes from '../navigation/store/mutation-types';
import BoxBalance from './box-balance.vue';

import ApiStore from '../nashcli/store';

export default {
  data() {
    return {
      transactions: [
        {
          category: 'deposit',
          amount: '0.001',
          amountFiat: '63.00',
          currencyFiat: 'USD',
          address: '2N93SdiD5WiJhUfwf8UoNnS7rQEUjNqtvSA',
          stat: 1001,
          confirmations: 0,
        },
        {
          category: 'transfer',
          amount: '0.002',
          amountFiat: '126.00',
          currencyFiat: 'USD',
          address: '2N87YXjCFbhUcFsnhMuQxJyUCDPknRxVW4L',
          stat: 1202,
          confirmations: 2,
        },
        {
          category: 'deposit',
          amount: '0.001',
          amountFiat: '63.00',
          currencyFiat: 'USD',
          address: '2N93SdiD5WiJhUfwf8UoNnS7rQEUjNqtvSA',
          stat: 1003,
          confirmations: 0,
        },
      ],
    };
  },
  components: {
    'component-card': Card,
    'box-balance': BoxBalance,
    'box-tx': BoxTX,
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
  computed: {
    accountBalance() {
      console.log(ApiStore.getters.rootAccountBalance);
      return ApiStore.getters.rootAccountBalance;
    },
  },
  methods: {
    loaded() {
      // Call the Balance endpoint
      console.log('Call Update Root Account Balance');
      ApiStore.dispatch('updateRootAccountBalance', { slave: 'default' });
      ApiStore.dispatch('updateRootAccountTransactions', { slave: 'default' });
    },
    onBtnClicked (val) {
      const { label } = val;
      console.log(label);
      if (label === 'btn-deposit') {
        NavStore.dispatch('updatePopup', NavTypes.popupEnum.LARGE);
        NavStore.dispatch('updateLayover', NavTypes.layoverEnum.SHOW);
        NavStore.dispatch('updatePopupHeader', 'deposit');
        NavStore.dispatch('updatePopupPage', 'deposit-landing');
      }
      if (label === 'btn-withdraw') {
        NavStore.dispatch('updatePopup', NavTypes.popupEnum.LARGE);
        NavStore.dispatch('updateLayover', NavTypes.layoverEnum.SHOW);
        NavStore.dispatch('updatePopupHeader', 'transfer');
        NavStore.dispatch('updatePopupPage', 'transfer-landing');
      }

    },
  },
};
</script>
