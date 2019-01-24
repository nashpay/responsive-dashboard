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
        <p class="help is-danger" v-if="fieldError !== false"> {{ fieldError }}</p>
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
import factory from './factory';

const validator = Decimal({ 
  config: {
    precision: 9,
    rounding: 4,
  },
  rules: {
    min: { value: '0' },
  },
});

export default factory(validator);
</script>
