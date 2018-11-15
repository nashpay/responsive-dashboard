<template lang="pug">
.mod-landing
  app-card
    <template slot="card-content">
      <box-balance />
    </template>
</template>
<style lang="less">

</style>
<script>
import { Card } from '../components';
import BoxBalance from './box-balance.vue';
export default {
  data() {
    return {
    };
  },
  components: {
    'app-card': Card,
    'box-balance': BoxBalance,
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
