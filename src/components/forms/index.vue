<template>
  <div class="napp-form-wrapper">
    <template v-for="field in formFields">
      <input-currency
        v-if="field.category === 'currency'"
        v-bind:label="field.label"
        v-on:formOutput="formOutput"
      />
    </template>
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
    }
  }
}
</style>
<script>
import InputCurrency from './currency.vue';

export default {
  data() { 
    return {
    };
  },
  components: {
    'input-currency': InputCurrency,
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  computed: {
  },
  props: [
    'formFields',
    'formStore',
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
