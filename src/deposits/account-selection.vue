<template lang="pug">
.app-deposit-account-selection
  span Account Selection
  component-card(cardColor="white", cardSmallPadding="yes")
    template(slot="card-content")
      nav.level.is-mobile
        .level-left
          .level-item
            .level-inner.has-text-left
              p.title.is-5.deposit-account-name Default
              p.heading.deposit-account-value 0.0001 BTC
        .level-right
          .level-item
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-deposit-account-selection {
  .deposit-account-name {
    font-size: 1.1rem;
  }
  .deposit-account-value {
    font-size: 0.9rem;
  }
}
</style>
<script>
import store from './store';
import * as types from './store/mutation-types';
import { Card, Button  } from '../components';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
  },
  components: {
    'component-card': Card,
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
