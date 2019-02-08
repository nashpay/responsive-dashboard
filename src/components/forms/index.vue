<template>
  <div class="napp-form-wrapper">
    <template v-for="field in formFields">
      <input-currency
        v-if="field.category === 'currency'"
        v-bind:label="field.label"
        v-bind:name="field.name"
        v-bind:rules="field.rules"
        v-bind:defaultValue="field.defaultValue"
        v-on:formOutput="formOutput"
      />
      <input-text
        v-if="field.category === 'text'"
        v-bind:label="field.label"
        v-bind:name="field.name"
        v-bind:rules="field.rules"
        v-bind:defaultValue="field.defaultValue"
        v-on:formOutput="formOutput"
      />
      <input-cryptoaddress
        v-if="field.category === 'cryptoaddress'"
        v-bind:label="field.label"
        v-bind:name="field.name"
        v-bind:rules="field.rules"
        v-bind:defaultValue="field.defaultValue"
        v-on:formOutput="formOutput"
      />
    </template>
    <nav class="level is-mobile">
      <div class="level-left">
       <div class="level-item">
         <button class="button" @click="btnOkAction">{{ formConfig.btnOKLabel }}</button>
       </div>
      </div>
      <div class="level-right">
       <div class="level-item">
         <button class="button is-text" @click="btnCancelAction">{{ formConfig.btnCancelLabel }}</button>
       </div>
      </div>
    </nav>
  </div>
</template>
<style lang="less">
@import (reference, less) url("../../theme/core.less");
@import (less, reference) url("../../theme/form.less");
/* TODO Export this later */
.napp-form-wrapper {
  .field {
    .control {
      input.input {
        max-width: 10rem;
      }
      select {
        width: 10rem;
      }
      textarea {
        max-width: 15rem;
        min-width: 15rem;
        width: 15rem;
      }
    }
  }
}
</style>
<script>
import InputCurrency from './currency.vue';
import InputText from './text.vue';
import InputCryptoAddress from './cryptoaddress.vue';
import formStore from './store';

export default {
  data() { 
    return {
      formStore,
    };
  },
  components: {
    'input-currency': InputCurrency,
    'input-text': InputText,
    'input-cryptoaddress': InputCryptoAddress,
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  computed: {
  },
  props: [
    'formFields',
    'formConfig',
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      // Apply Defaults
      
    },
    formOutput({ values, errors }) {
      // Update the Store
      const newValues = { ...this.formStore.getters.formValues, ...values };
      this.formStore.dispatch('saveValues', newValues);
      const newErrors = { ...this.formStore.getters.formErrors, ...errors };
      this.formStore.dispatch('saveErrors', newErrors);
    },
    btnOkAction() {
      if (this.formStore.getters.isValid === true) {
        this.$emit('btnOk', this.formStore.getters.formValues);
      }
    },
    btnCancelAction() {
      this.$emit('btnCancel');
    },
  }
};
</script>
