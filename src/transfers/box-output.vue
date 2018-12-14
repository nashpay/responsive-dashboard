<template lang="pug">
.app-box-tx-output
  .card
    .card-content
      nav.level.is-mobile
        .level-left
          .level-item
            .level-inner.has-text-left
              p.title.is-6.tx-address {{ info.address | shorten-address }}
              p.heading.tx-fiat-heading &nbsp;
        .level-right
          .level-item
            .level-inner.has-text-right
              p.title.is-6
                span {{ info.amount }} BTC
              p.heading.tx-fiat-heading {{ amountFiat }} {{ baseFiat }}

</template>
 <style lang="less">
@import (reference, less) url("../theme/core.less");

.app-box-tx-output {
  padding: 0.5rem 1rem 0.5rem 1rem;
  .tx-address {
    padding-top: 0.0rem;
  }
  .tx-fiat-heading {
    font-size: 0.8rem;
  } 
  .tx-icon-cat {
    font-size: 0.8rem;
    vertical-align: middle;
    padding-right: 0.3rem;
  }
  .tx-tag-wrap {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
  .tx-cat-icon {
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
  }
  .card {
    background-color: @clr-white;
    border-radius: 0.5rem;
    height: 4.8rem;
  }
  .card-content {
    padding: 0.7rem 1rem 0.8rem 1rem;
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
  props: {
    info: {
      type: Object,
    }
  },
  filters: {
    'shorten-address' (val) {
      const first = val.substr(0, 6);
      const last = val.substr(-6);
      return `${first}...${last}`;
    }
  },
  computed: {
    // Price Box Computed Properties
    baseFiat () {
      return RateStore.getters.getBaseCurrency;
    },
    amountFiat () {
      //
      const providerFiatPrice = RateStore.getters.getFiatPrice;
      const cryptoAmount = JSON.parse(JSON.stringify(this.info.amount));
      if (
        typeof cryptoAmount !== 'undefined'
        && typeof providerFiatPrice !== 'undefined'
        && isNaN(cryptoAmount) === false
        && isNaN(providerFiatPrice) === false
      ) {
        const amountDec = new Decimal(String(cryptoAmount));
        const fiatDec = new Decimal(providerFiatPrice);
        return amountDec.mul(fiatDec).toFixed(2);
      }
      return '0.00';
    }

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
