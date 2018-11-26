<template lang="pug">
.box-balance-level.level.is-mobile
  .level-left
    .level-item
      //
      .box-balance.text-left
        p Pending
        h1.title.is-5 BTC {{ pending }}
        p 6.40 USD
  .level-left
    .level-item
      //
      .box-balance
        p Available
        h1.title.is-5 {{ available }} BTC
        p 6.40 USD
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
export default {
  data() {
    return {
    };
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
