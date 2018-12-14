<template lang="pug">
.settings-landing
  component-card()
    template(slot="card-content")
      h2.title.is-5.has-text-centered Settings
      .app-form
        //
        .field.is-horizontal.app-field()
          .field-label.is-normal
            label.label Base Currency
          .field-body
            // .p.help.is-danger(v-if="cryptoAddressError !== false") {{ cryptoAddressError }}
            .field
              .control
                .select.is-danger
                  //
                  select(v-model="currentFiat")
                    option(v-for="fiat in supportedFiat", :value="fiat") {{ fiat }}
  //
  component-button.app-align-bottom-footer(
    bicon='none',
    btext='Save',
    bsize="medium",
    bcat="primary", 
    blabel="btn-setting-save",
    v-on:btn-clicked="onBtnClicked",
  )
</template>
<style lang="less">
</style>
<script>
import { Card, Button } from '../components';
import RateStore from '../rates/store';
import { fiatEnum } from '../rates/store/mutation-types';

export default {
  data() {
    return {
      currentFiat: '',
      supportedFiat: [],
    };
  },
  components: {
    'component-card': Card,
    'component-button': Button,
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
  computed: {
    baseFiat () {
      return RateStore.getters.getBaseCurrency;
    },
  },
  methods: {
    loaded() {
      // Call the Balance endpoint
      this.currentFiat = JSON.parse(JSON.stringify(this.baseFiat));
      this.supportedFiat = Object.keys(fiatEnum);
    },
    onBtnClicked (val) {
      const { label } = val;
      if (label === 'btn-setting-save') {
        RateStore.dispatch('updateBaseCurrency', JSON.parse(JSON.stringify(this.currentFiat)));
      }
    }
  },
};
</script>
