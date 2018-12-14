<template lang="pug">
.box-balance-level.level.is-mobile
  .level-left
    .level-item
      //
      .box-balance.text-left
        p Pending
        h1.title.is-5 BTC {{ pending }}
        p {{ pendingFiat }} {{ baseFiat }}
  .level-left
    .level-item
      //
      .box-balance
        p Available
        h1.title.is-5 {{ available }} BTC
        p {{ availableFiat }} {{ baseFiat }}
</template>
<style lang="less">
.box-balance-level {
  height: 5rem;
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
}
</style>
<script>
import { Decimal } from 'decimal.js';
import RateStore from '../rates/store';

export default {
  data() {
    return {
    };
  },
  computed: {
    availableFiat () {
      // Convert all to String first.
      const providerFiatPrice = RateStore.getters.getFiatPrice;
      if (typeof this.available !== 'undefined'
        && isNaN(this.available) === false
        && isNaN(providerFiatPrice) === false
      ) {
        //
        const availableDec = new Decimal(String(this.available));
        const fiatDec = new Decimal(providerFiatPrice);
        return availableDec.mul(fiatDec).toFixed(2);
      }
      return '0.00';
    },
    pendingFiat () {
      const providerFiatPrice = RateStore.getters.getFiatPrice;
      if (typeof this.pending !== 'undefined'
        && isNaN(this.pending) === false
        && isNaN(providerFiatPrice) === false
      ) {
        const pendingDec = new Decimal(String(this.pending));
        const fiatDec = new Decimal(providerFiatPrice);
        return pendingDec.mul(fiatDec).toFixed(2);
      }
      return '0.00';

    },
    baseFiat () {
      return RateStore.getters.getBaseCurrency;
    },
  },
  props: {
    available: {
      type: Number,
      default: 0.000,
    },
    pending: {
      type: Number,
      default: 0.000,
    },
  },
  components: {
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
