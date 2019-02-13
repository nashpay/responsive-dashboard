<template>
  <napp-form 
    v-bind:formFields="formFields"
    v-bind:formConfig="formConfig"
    v-on:btnOk="formBtnOk"
    v-on:btnCancel="formBtnCancel"
  />
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
@import (less, reference) url("../theme/form.less");
</style>
<script>
import FormMixin from '../components/forms/mixin';

const formData = {
  formFields: [{
    label: 'Seed Phrase',
    category: 'text',
    name: 'seedPhrase',
  }],
  formConfig: {
    'btnOKLabel': 'Sign',
    'btnCancelLabel': '',
  },
  formHooks: {
    btnOk ({ seedPhrase }) {
      this.$emit('authValue', { method: 'seedPhrase', value: seedPhrase });
    },
    btnCancel () {
    },
  },
};
export default FormMixin({ ...formData, ...otherConfig });
</script>
