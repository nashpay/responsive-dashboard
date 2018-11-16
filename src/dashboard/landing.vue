<template lang="pug">
.mod-landing
  component-card(cardColor="white")
    <template slot="card-content">
      box-balance
    </template>
  component-card(cardColor="transparent", cardNoVertPadding="yes")
    <template slot="card-content">
      .nav.level.is-mobile
        .level-left
          .level.item
            component-button(bicoin="arrow-circle-o-down", btext='Deposit', bsize="medium")
        .level-right
          .level.item
            component-button(bicoin="arrow-circle-o-up", btext='Withdraw', bsize="medium")
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
import BoxBalance from './box-balance.vue';
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
  methods: {
    loaded() {
    },
  },
};
</script>
