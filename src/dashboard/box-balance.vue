<template lang="pug">
.box-balance
  h1.title.is-2 0.0001 BTC
  h2.subtitle.is-5 6.40 USD
</template>
<style lang="less">

</style>
<script>
export default {
  data() {
    return {
    };
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
