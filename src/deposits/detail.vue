<template lang="pug">
.app-deposit-detail
  .app-form
    //
    .field.is-horizontal.app-field(:class="section1")
      .field-label.is-normal
        label.label Amount
      .field-body
        p.help.is-danger(v-if="cryptoAmountError !== false") {{ cryptoAmountError }}
        .field.has-addons
          .control
            input.input(
              type="number", 
              v-on:input="validate($event, 'cryptoAmount')",
              v-on:focusin="focusIn('section-1')",
              v-on:focusout="focusOut('section-1')",
              :value="cryptoAmount",
            )
          .control
            a.button BTC
        .field.exchange-icon-wrapper
          i.fa.fa-exchange.exchange-icon(aria-hidden="true")
        .field.has-addons
          .control
            input.input(type="text", placeholder="0.000", :value="amountFiat", disabled)
          .control
            a.button {{ baseFiat }}
    //
      .field-body
        .field.has-addons
          .control
            input.input(type="text", placeholder="0.000")
          .control
            a.button BTC
        .field.exchange-icon-wrapper
          i.fa.fa-exchange.exchange-icon(aria-hidden="true")
        .field.has-addons
          .control
            input.input(type="text", placeholder="0.000")
          .control
            a.button USD
    .field.is-horizontal.app-field(:class="section2")
      .field-label.is-normal
        label.label Reference
      .field-body
        p.help.is-danger(v-if="cryptoReferenceError !== false") {{ cryptoReferenceError }}
        .field
          .control
            textarea.textarea.crypto-address(
              type="text", 
              v-on:input="validate($event, 'cryptoReference')",
              v-on:focusin="focusIn('section-2')",
              v-on:focusout="focusOut('section-2')",
              :value="cryptoAddress",
            )
            a#textar
  

    .app-transfer-add-buffer(v-if="formFocusCurrent === false")
      //
      p &nbsp;
      component-button.app-align-bottom(
        v-if="cryptoAmountError === false && cryptoAddressError === false",
        bicon='none',
        btext='Confirm',
        bsize="medium",
        bcat="primary", 
        blabel="btn-account-detail-next",
        v-on:btn-clicked="onBtnClicked",
      )
  nav.level.is-mobile(v-if="formFocusCurrent !== false")
    .level-left
      .level-item
        component-button(
          bicon='none',
          btext='Prev',
          blabel='btn-form-prev',
          v-on:btn-clicked='onBtnClicked',
          v-if='formFocusPrev !== false',
        )
    .level-right
      .level-item
        component-button(
          bicon='none',
          btext='Next',
          blabel='btn-form-next',
          v-on:btn-clicked='onBtnClicked',
          v-if='formFocusNext !== false',
        )
    
  
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-deposit-detail {
  .detail-header {
    padding: 1rem 0rem 1rem 0rem;
    text-align: center;
    width: 100%;
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: bold;
  }
}
.app-form {
  padding: 1rem;
  .app-field {
    .auto-center();
  }
  .exchange-icon-wrapper {
    width: 100%;
    text-align: center;
  }
  .exchange-icon {
    transform: rotate(90deg);
  }
  .field.is-horizontal {
    display: flex;
    .field-label {
      flex-basis: 0;
      flex-grow: 1;
      flex-shrink: 0;
      margin-top: 0.25rem;
      text-align: left;
    }
    .input {
      width: 10rem;
      text-align: right;
    }
    .or-block {
      display: block;
    }
    .textarea {
      width: 13.5rem;
      text-align: left;
    }
  }
}
</style>
<script>
import { store as depositStore, types as dtypes } from './store';
import { Card, Divider, Checkbox, Button  } from '../components';
import { Decimal } from 'decimal.js';
import NavStore from '../navigation/store';
import RateStore from '../rates/store';
import DepositMixin from './detail-form';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
    // Popup Form Fields
    formFocusCurrent () {
      return NavStore.getters.formFocusCurrent;
    },
    formFocusNext () { return NavStore.getters.formFocusNext; },
    formFocusPrev () { return NavStore.getters.formFocusPrev; },
    formFocusIndex () { return NavStore.getters.formFocusIndex; },
    formFocusTotal () { return NavStore.getters.formFocusTotal; },
    // Form Display Sections
    section1() {
      return { 'out-of-focus': this.formFocusCurrent !== false };
    },
    section2() {
      return { 'out-of-focus': (this.formFocusCurrent !== false && this.formFocusCurrent !== 'section-2') };
    },
    section3() {
      return { 'out-of-focus': (this.formFocusCurrent !== false && this.formFocusCurrent !== 'section-3') };
    },
    // Price Box Computed Properties
    baseFiat () {
      return RateStore.getters.getBaseCurrency;
    },
    amountFiat () {
      //
      const providerFiatPrice = RateStore.getters.getFiatPrice;
      const cryptoAmount = JSON.parse(JSON.stringify(this.cryptoAmount));
      if (
        typeof cryptoAmount !== 'undefined'
        && typeof providerFiatPrice !== 'undefined'
        && cryptoAmount !== ''
        && cryptoAmount !== ' '
        && isNaN(cryptoAmount) === false
        && isNaN(providerFiatPrice) === false
      ) {
        //
        const amountDec = new Decimal(String(cryptoAmount));
        const fiatDec = new Decimal(providerFiatPrice);
        return amountDec.mul(fiatDec).toFixed(2);
      }
      return '0.00';
    }
  },
  components: {
    'component-card': Card,
    'component-divider': Divider,
    'component-checkbox': Checkbox,
    'component-button': Button,
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  mixins: [
    DepositMixin,
  ],
  watch: {
    $route(to, from) {
      this.loaded();
    },
  },
  methods: {
    loaded() {
      // Validator Setup
      this.validatorSetup();
    },
    /*
    onBtnClicked (label) {
      // @TODO All in check logic
      depositStore.dispatch('updateDepositStep', dtypes.stepEnum.RESULT);

    },
    */
    focusIn(sectionName) {
      this.formFocusBusy = false;
      let focusIndex = -1;
      let focusNext = false;
      let focusPrev = false;
      const focusTotal = 1;
      const focusCurrent = sectionName;
      if (sectionName === 'section-2') {
        focusIndex = 0;
        focusNext = 1;
      }      
      if (sectionName === 'section-3') {
        focusIndex = 1;
        focusPrev = 0;
      }      
      const payload = {
        focusCurrent,
        focusNext,
        focusPrev,
        focusIndex,
        focusTotal,
      };
      NavStore.dispatch('updateFormFocus', payload);
      window.moveTo(0, 0);
    },
    focusOut(sectionName) {
      setTimeout(() => {
        if (this.formFocusBusy === false) {
          NavStore.dispatch('updateFormFocus', {
            focusCurrent: false,
            focusNext: false,
            focusPrev: false,
            focusIndex: 0,
            focusTotal: 0,
          });
        }
        // TODO Move to Store
        this.formFocusBusy = false;
      }, 150);
    },
    onBtnClicked (val) {
      // @TODO All in check logic
      const { label } = val;
      const mapping = ['section-2', 'section-3'];
      if (label === 'btn-form-next') {
        //
        const newIndex = this.formFocusIndex + 1;
        let focusNext = false;
        const nextIndex = newIndex + 1;
        if (nextIndex < this.formFocusTotal) {
          focusNext = nextIndex;
        }
        NavStore.dispatch('updateFormFocus', {
          focusCurrent: mapping[newIndex],
          focusNext,
          focusPrev: this.formFocusIndex,
          focusIndex: newIndex,
          focusTotal: this.formFocusTotal,
        });
        // TODO Move to Store
        this.formFocusBusy = true;

      }
      if (label === 'btn-form-prev') {
        //
        const newIndex = this.formFocusIndex - 1;
        let focusPrev = false;
        const prevIndex = newIndex - 1;
        if (prevIndex > 0) {
          focusPrev = prevIndex;
        }
        const sectionName = mapping[newIndex];
        NavStore.dispatch('updateFormFocus', {
          focusCurrent: sectionName,
          focusNext: this.formFocusIndex,
          focusPrev,
          focusIndex: newIndex,
          focusTotal: this.formFocusTotal,
        });
        // TODO Move to Store
        this.formFocusBusy = true;
      }
      if (label === 'btn-recipient-add') {
        /*
        const sdata = { 
          amount: this.cryptoAmount,
          address: this.cryptoAddress,
          amountFiat: this.amountFiat,
          currencyFiat: this.baseFiat,
        };
        store.dispatch('updateRecipientList', {
          data: sdata,
          action: storeActions.CREATE,
        });
        store.dispatch('updateRecipientAddBtn', types.recipientAddBtnEnum.HIDE);
        // F
        this.fstore.dispatch('validateCryptoAmount', { input: '0', validator: this.validators['cryptoAmount'] });
        this.fstore.dispatch('validateCryptoAddress', { input: '', validator: this.validators['cryptoAddress'] });
        this.initAvailable = String(this.recipientAvailable);
        */
      }
    }
  },
};
</script>
