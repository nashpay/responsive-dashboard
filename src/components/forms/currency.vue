<template>
  <div class="field is-grouped">
    <div class="field">
      <label class="label">{{ label }}</label>
      <div class="control">
        <input
          class="input is-danger"
          v-on:input="updateVal"
          v-bind:value="fieldValue"
        />
        <p class="help is-danger" v-if="fieldError !== null"> {{ fieldError }}</p>
      </div>
    </div>
    <div class="control">
      <label class="label">&nbsp;</label>
      <div class="button">
        1000.00 USD
      </div>
    </div> <!-- End of Control -->
  </div> <!-- End of Grouped Field -->
</template>
<style lang="less">
@import (reference, less) url("../../theme/core.less");
@import (less, reference) url("../../theme/form.less");
</style>
<script>
import { Decimal } from '../../plugins/form-validator/';

const validator = Decimal({ 
  config: {
    precision: 9,
    rounding: 4,
  },
  rules: {
    min: { value: '0' },
  },
});

export default {
  data() { 
    return {
       fieldValue: 0,
       fieldError: null,
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
    'label',
    'errorMsg',
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      //
      if(this.$route.matched.length > 0) {
        // Update NavStore
      } else {
        // 404
      } 
    },
    updateVal(evt) {
      const val = JSON.parse(JSON.stringify(evt.target.value));
      this.fieldValue = val;
      setTimeout(() => this.validate(val), 10);
    },
    validate(y) {
      const res = validator(y);
      // this.fieldError = res ? null: res.reduce((acc, row) => `${acc}\n${row(y)}`, '');
      if (res !== true) {
        const errorMsg = res.reduce((acc, row) => `${acc}\n${row(this.label)}`, '');
        this.fieldError = errorMsg;
      } else {
        this.fieldError = null;
      }
    },
  }
};
</script>
