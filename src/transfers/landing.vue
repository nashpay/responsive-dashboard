<template lang="pug">
.app-transfer-landing
  ul.steps.is-horizontal.has-content-centered(v-if="formFocusCurrent === false")
    li.steps-segment(:class="accountStepClass")
      a.has-text-dark(href='#')
        span.steps-marker
        .steps-content
          p.heading Account
    li.steps-segment(:class="recipientStepClass")
      a.has-text-dark(href='#')
        span.steps-marker
        .steps-content
          p.heading Recipients
    li.steps-segment(:class="reviewStepClass")
      a.has-text-dark(href='#')
        span.steps-marker
        .steps-content
          p.heading Review
    li.steps-segment(:class="completeStepClass")
      a.has-text-dark(href='#')
        span.steps-marker
        .steps-content
          p.heading Complete
  template(v-if="transferStep === 0")
    account-selection 
  template(v-if="transferStep === 1")
    transfer-recipient
  template(v-if="transferStep === 2")
    transfer-review
  template(v-if="transferStep === 3")
    transfer-complete
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-transfer-landing {
  height: 100% - 7rem;
  ul.steps {
    padding-top: 1rem;
  }
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
import TransferRecipient from './recipient.vue';
import TransferReview from './review.vue';
import TransferComplete from './complete.vue';
import NavStore from '../navigation/store';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
    transferStep () {
      return store.getters.transferStep;
    },
    accountStepClass () {
      if (this.transferStep === types.stepEnum.ACCOUNT) {
        return { 'is-active': true };
      }
      return { 'is-active': false };
    },
    recipientStepClass () {
      if (this.transferStep === types.stepEnum.RECIPIENT) {
        return { 'is-active': true };
      }
      return { 'is-active': false };
    },
    reviewStepClass () {
      if (this.transferStep === types.stepEnum.REVIEW) {
        return { 'is-active': true };
      }
      return { 'is-active': false };
    },
    completeStepClass () {
      if (this.transferStep === types.stepEnum.COMPLETE) {
        return { 'is-active': true };
      }
      return { 'is-active': false };
    },
    // Form Focus Store
    formFocusCurrent () { return NavStore.getters.formFocusCurrent; },
    formFocusNext () { return NavStore.getters.formFocusNext; },
    formFocusPrev () { return NavStore.getters.formFocusPrev; },
    formFocusIndex () { return NavStore.getters.formFocusIndex; },
    formFocusTotal () { return NavStore.getters.formFocusTotal; },
  },
  components: {
    'account-selection': AccountSelection,
    'transfer-recipient': TransferRecipient,
    'transfer-review': TransferReview,
    'transfer-complete': TransferComplete,
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
