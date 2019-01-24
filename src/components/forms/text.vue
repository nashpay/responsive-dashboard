<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <textarea
        class="textarea is-danger"
        v-on:input="updateVal"
        v-bind:value="fieldValue"
        rows="5"
      />
      <p class="help is-danger" v-if="fieldError !== false"> {{ fieldError }}</p>
    </div>
  </div>
</template>
<style lang="less">
@import (reference, less) url("../../theme/core.less");
@import (less, reference) url("../../theme/form.less");
</style>
<script>
import { Text } from '../../plugins/form-validator/';
import factory from './factory';

const validator = Text({});

export default factory(validator);
</script>
