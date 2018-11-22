<template lang="pug">
.app-deposit-landing
  ul.steps.is-horizontal.has-content-centered
    li.steps-segment(:class="accountStepClass")
      a.has-text-dark(href='#')
        span.steps-marker
        .steps-content
          p.heading Account
    li.steps-segment(:class="detailStepClass")
      a.has-text-dark(href='#')
        span.steps-marker
        .steps-content
          p.heading Details
    li.steps-segment(:class="resultStepClass")
      a.has-text-dark(href='#')
        span.steps-marker
        .steps-content
          p.heading Payment
  template(v-if="depositStep === 0")
    account-selection 
  template(v-if="depositStep === 1")
    deposit-detail
  template(v-if="depositStep === 2")
    deposit-result
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-deposit-landing {
  .steps:not(.is-hollow) {
    .steps-marker:not(.is-hollow) {
      background-color: @clr-red;
    }
    .steps-segment.is-active {
      .steps-marker:not(.is-hollow) {
        background-color: @clr-red;
      }
    }
    .steps-segment::after {
      background-color: @clr-red;
    }
    .steps-segment.is-active::after {
      background-color: @clr-gray-1;
    }
    .steps-segment.is-active ~ .steps-segment::after {
      background-color: @clr-gray-1;
    }
  }
}
</style>
<script>
import store from './store';
import * as types from './store/mutation-types';
import AccountSelection from './account-selection.vue';
import DepositDetail from './detail.vue';
import DepositResult from './result.vue';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
    depositStep () {
      return store.getters.depositStep;
    },
    accountStepClass () {
      if (this.depositStep === types.stepEnum.ACCOUNT) {
        return { 'is-active': true };
      }
      return { 'is-active': false };
    },
    detailStepClass () {
      if (this.depositStep === types.stepEnum.DETAILS) {
        return { 'is-active': true };
      }
      return { 'is-active': false };
    },
    resultStepClass () {
      if (this.depositStep === types.stepEnum.RESULT) {
        return { 'is-active': true };
      }
      return { 'is-active': false };
    }
  },
  components: {
    'account-selection': AccountSelection,
    'deposit-detail': DepositDetail,
    'deposit-result': DepositResult,
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
