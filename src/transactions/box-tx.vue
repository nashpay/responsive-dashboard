<template lang="pug">
.app-box-tx
  .card
    .card-content
      nav.level.is-mobile
        .level-left
          .level-item
            .level-inner.has-text-left
              p.title.is-5.tx-address {{ info.address | shorten-address }} ({{ info.billed }})
              .tx-tag-wrap
                span.tag.is-light(v-if="info.stat === 1001") Created
                span.tag.is-success(v-if="info.stat === 1003") Confirmed
                span.tag.is-link(v-if="info.stat === 1002") {{ info.confirmations }} Confirmations
                span.tag.is-danger(v-if="info.stat === 1005") Failed
                span.tag.is-danger(v-if="info.stat === 1006") Cancelled
                span.tag.is-light(v-if="info.stat === 1201") Created
                span.tag.is-link(v-if="info.stat === 1202") {{ info.confirmations }} Confirmations
                span.tag.is-success(v-if="info.stat === 1203") Confirmed
        .level-right
          .level-item
            .level-inner.has-text-right
              p.title.is-5(v-if="info.category === 'deposit'")
                i.fa.fa-plus.clr-green-1.tx-icon-cat
                span {{ info.amount }} BTC
              p.title.is-5(v-if="info.category === 'transfer'")
                i.fa.fa-minus.clr-red-1.tx-icon-cat
                span {{ info.amount }} BTC
              p.heading.tx-fiat-heading {{ info.amountFiat }} {{ info.currencyFiat }}

</template>
 <style lang="less">
@import (reference, less) url("../theme/core.less");

.app-box-tx {
  padding: 0.5rem 1rem 0.5rem 1rem;
  .tx-address {
    padding-top: 0.4rem;
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
