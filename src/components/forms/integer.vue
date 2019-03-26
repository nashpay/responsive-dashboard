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
  </div> <!-- End of Grouped Field -->
</template>
<style lang="less">
@import (reference, less) url("../../theme/core.less");
@import (less, reference) url("../../theme/form.less");
</style>
<script>
import { Integer } from '../../plugins/form-validator/';
import factory from './factory';

/*
const validator = Decimal({ 
  config: {
    precision: 9,
    rounding: 4,
  },
  rules: {
    min: { value: '0' },
  },
});
*/

const defaultConfig = { precision: 0, rounding: 4 };
const defaultRules = { min: { value: '0' } };

export default factory(Integer, defaultRules, defaultConfig);
</script>
