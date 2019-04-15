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
      <input-integer
        v-if="field.category === 'integer'"
        v-bind:label="field.label"
        v-bind:name="field.name"
        v-bind:rules="field.rules"
        v-bind:defaultValue="field.defaultValue"
        v-on:formOutput="formOutput"
      />
      <input-textarea
        v-if="field.category === 'text'"
        v-bind:label="field.label"
        v-bind:name="field.name"
        v-bind:rules="field.rules"
        v-bind:defaultValue="field.defaultValue"
        v-on:formOutput="formOutput"
      />
      <input-text
        v-if="field.category === 'text-input'"
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
        /*
        max-width: 10rem;
        */
      }
      select {
        /*
        width: 10rem;
        */
      }
      textarea {
        /* max-width: 15rem;
        min-width: 15rem;
        width: 15rem;
        */
      }
    }
  }
}
</style>
<script>
import InputCurrency from './currency.vue';
import InputTextArea from './text.vue';
import InputText from './text-input.vue';
import InputCryptoAddress from './cryptoaddress.vue';
import InputInteger from './integer.vue';
import formStore from './store';

export default {
  data() { 
    return {
      formStore,
      formKeys: [],
    };
  },
  components: {
    'input-currency': InputCurrency,
    'input-integer': InputInteger,
    'input-text': InputText,
    'input-textarea': InputTextArea,
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
      console.log('Form called...');
      const formKeys = this.formFields.reduce((acc, row) => {
        return acc.concat(row.name);
      }, []);
      this.formKeys = formKeys;
    },
    formOutput({ values, errors }) {
      // Update the Store
      // Need to Prevent Double Saving
      const whitelist = this.formKeys;
      const prevValues = this.formStore.getters.formValues;
      const prevErrors = this.formStore.getters.formErrors;
      const carryOverValues = Object.keys(prevValues).reduce((acc, valKey) => {
        if (whitelist.indexOf(valKey) > -1) {
          acc[valKey] = prevValues[valKey];
        }
        return acc;
      }, {});
      const carryOverErrors = Object.keys(prevErrors).reduce((acc, errKey) => {
        if (whitelist.indexOf(errKey) > -1) {
          acc[errKey] = prevErrors[errKey];
        }
        return acc;
      }, {});
      const newValues = { ...carryOverValues, ...values }; 
      const newErrors = { ...carryOverErrors, ...errors }; 
      this.formStore.dispatch('saveValues', newValues);
      this.formStore.dispatch('saveErrors', newErrors);

      /*
      const newValues = { ...this.formStore.getters.formValues, ...values };
      const newErrors = { ...this.formStore.getters.formErrors, ...errors };
      */
    },
    btnOkAction() {
      console.log('btnOkAction fired...');
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
