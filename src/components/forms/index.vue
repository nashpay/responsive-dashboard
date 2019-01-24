<template>
  <div class="napp-form-wrapper">
    <template v-for="field in formFields">
      <input-currency
        v-if="field.category === 'currency'"
        v-bind:label="field.label"
        v-on:formOutput="formOutput"
      />
      <input-text
        v-if="field.category === 'text'"
        v-bind:label="field.label"
        v-on:formOutput="formOutput"
      />
    </template>
    <nav class="level is-mobile">
      <div class="level-left">
       <div class="level-item">
         <button class="button" @click="this.$emit('btnOK')">{{ formConfig.btnOKLabel }}</button>
       </div>
      </div>
      <div class="level-right">
       <div class="level-item">
         <button class="button is-text" @click="this.$emit('btnCancel')">{{ formConfig.btnCancelLabel }}</button>
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

export default {
  data() { 
    return {
    };
  },
  components: {
    'input-currency': InputCurrency,
    'input-text': InputText,
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  computed: {
  },
  props: [
    'formFields',
    'formStore',
    'formConfig',
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      //
      console.log(this.formFields);
    },
    formOutput({ values, errors }) {
      // Update the Store
      const newValues = { ...this.formStore.values, ...values };
      this.formStore.dispatch('saveValues', newValues);
      const newErrors = { ...this.formStore.errors, ...errors };
      this.formStore.dispatch('saveErrors', newErrors);
    },
  }
};
</script>
