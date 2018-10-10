<template lang="pug">
.dashboard-tx-flow-time.na-bg
  .fiat-revenue.padding-side
    .columns.is-mobile
      .column
        p.subtitle.is-6 Asset
        p.title.is-3 BTC
      .column.text-align-right
        p.subtitle.is-6 Price
        p.title.is-3 6,700 USD
        p.subtitle.is-5.na-gain +1.00 %
  .fiat-revenue.padding-side
    .columns.is-mobile
      .column
        p.subtitle.is-6 Available
        p.title.is-3 10.00 
      .column.text-align-right
        p.subtitle.is-6 Pending
        p.title.is-3 1.00
  .tabs.is-centered
    ul
      li.is-active
        a 24H
      li
        a Week
      li
        a Month
  .balance-chart.padding-side
    canvas#na-balance-chart
  .crypto-flow.padding-crypto-flow
    .columns.is-mobile
      .column
        .columns.is-mobile
          .column.is-3
            i.fa.fa-arrow-circle-o-down.na-flow-deposit
          .column.is-9
            p.subtitle.is-5.na-gain 100.00 BTC
      .column
        .columns.is-mobile
          .column.is-3
            i.fa.fa-arrow-circle-o-up.na-flow-withdraw
          .column.is-9
            p.subtitle.is-5.na-loss 100.00 BTC
  .fiat-revenue.padding-crypto-flow-level
    .columns.is-mobile
      .column
        p.title.is-3 ETH
        p.subtitle.is-6 ~ 240.00 USD
      .column.text-align-right
        p.title.is-3 15.00
        p.subtitle.is-6 ~ 24,000.00 USD


</template>
<style lang="less">
@import (reference, less) url("../theme.less");

.text-align-right {
  text-align: right;
}

.padding-side {
  padding-left: 1rem;
  padding-right: 1rem;
}

.padding-crypto-flow {
  padding: 1rem;
  border-top: 1px @light-gray solid;
}

.padding-crypto-flow-level {
  padding: 1rem;
  border-top: 1px @medium-gray solid;
}

.na-gain {
  color: @theme-green;
}

.na-loss {
  color: @theme-red;
}

.na-bg {
  background-color: @secondary-color;
}

.na-flow-deposit {
  color: @theme-green;
  font-size: 1.7rem;
}


.na-flow-withdraw {
  color: @theme-red;
  font-size: 1.7rem;
}

#na-balance-chart {
  height: 3rem;
}

@media only screen and (min-width: 1024px) {
  #na-balance-chart {
    height: 10rem;
  }
}
</style>
<script>
import { AppStore as store } from '../store/';

export default {
  data() {
    return {
      // Data Here.
      na_balance_chart_ctx: {},
    };
  },
  computed: {
  },
  components: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  mixins: [],
  watch: {
    $route(to, from) {
    },
  },
  methods: {
    loaded() {
      console.log('What is this?');
      console.log(this);
      const ctx = this.$el.ownerDocument.getElementById('na-balance-chart');
      this.na_balance_chart_ctx = ctx;
      this.drawNashBalanceChart();
      //
    },
    drawNashBalanceChart() {
      const nashBalanceChart = new Chart(this.na_balance_chart_ctx, {
        type: 'bar',
        data: {
          labels: [
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
          ],
          datasets: [{
            label: 'BTC',
            data: [7.00, 8.00, 9.00, 9.10, 9.20, 9.30, 9.40, 9.50]
          }]
        }
      });
    },
  },
};
</script>
