<template lang="pug">
.app-transfer-recipient-add
  .app-form
    .field.is-horizontal.app-field(:class="section1")
      .field-label.is-normal
        label.label Available
      .field-body
        // h1.title.is-4.box-transfer-balance {{ recipientAvailable }} BTC
        // h1.title.is-4.box-transfer-balance {{ accountBalance }} BTC
        h1.title.is-4.box-transfer-balance {{ initAvailable }} BTC
        progress.progress.is-danger.remaining-balance(:value="remainingPct", max="100")
   
    .field.is-horizontal.app-field(:class="section2")
      .field-label.is-normal
        label.label Amount
      .field-body
        p.help.is-danger(v-if="cryptoAmountError !== false") {{ cryptoAmountError }}
        .field.has-addons
          .control
            input.input(
              type="number", 
              v-on:input="validate($event, 'cryptoAmount')",
              v-on:focusin="focusIn('section-2')",
              v-on:focusout="focusOut('section-2')",
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
        
    .field.is-horizontal.app-field(:class="section3")
      .field-label.is-normal
        label.label Address
      .field-body
        p.help.is-danger(v-if="cryptoAddressError !== false") {{ cryptoAddressError }}
        .field
          .control
            textarea.textarea.crypto-address(
              type="text", 
              v-on:input="validate($event, 'cryptoAddress')",
              v-on:focusin="focusIn('section-3')",
              v-on:focusout="focusOut('section-3')",
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
        blabel="btn-recipient-add",
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
.app-transfer-recipient-add {
  /* height: 90% - 7rem; */
  /*
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 17px;
  box-sizing: content-box;
  */
  .app-transfer-add-buffer {
    height: 2%;
    padding: 1rem;
  }
  h1.box-transfer-balance {
    text-align: right;
    margin-bottom: 0;
    padding-bottom: 0.3rem;
  }
  progress.remaining-balance {
    transform: rotate(180deg);
    height: 0.3rem;
  }
  textarea.textarea {
    resize: none;
  }
  textarea.textarea.crypto-address:focus {
    padding-bottom: -20rem;
  }
  .out-of-focus {
    display: none !important;
  }
  input:disabled {
    color: #000;
    font-weight: 600;
  }
}
</style>
<script>
import { storeActions } from '../utils/objectStore';
import store from './store';
import * as types from './store/mutation-types';
import { Card, Divider, Checkbox, Button  } from '../components';
import ApiStore from '../nashcli/store';
import { BigNumber } from 'bignumber.js';
import { Decimal } from 'decimal.js';
import NavStore from '../navigation/store';
import RateStore from '../rates/store';

import RecipientAddMixin from './recipient-add-form';

export default {
  data() {
    return {
      initAvailable: '0',
      focused: false,
      // TODO MOve this to store,
      formFocusBusy: false,
    };
  },
  computed: {
    remainingPct () {
      if (this.initAvailable !== '0'
        && isNaN(this.recipientAvailable) === false
      ) {
        const a = BigNumber(this.initAvailable);
        const b = BigNumber(this.recipientAvailable);
        const c  = b.div(a).multipliedBy(100);
        return c.toNumber();
      }
      return 0;
    },
    childAccountList () {
      return []
    },
    accountBalance () {
       const { available: balanceAvailable } = ApiStore.getters.rootAccountBalance;
       return balanceAvailable;
    },
    recipientAvailable () {
      const recipientSpent = this.recipientList.reduce((acc, row) => {
        const safeVal = BigNumber(String(row.amount));
        return acc.plus(safeVal);
      }, BigNumber('0.00'));
      const serverBalance = BigNumber(String(this.accountBalance));
      const currentSpend = BigNumber(String(this.cryptoAmount));
      return serverBalance.minus(recipientSpent).minus(currentSpend).toString();
    },
    recipientList () {
      return store.getters.recipientList; 
    },
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
    RecipientAddMixin,
  ],
  watch: {
    $route(to, from) {
      this.loaded();
    },
  },
  methods: {
    loaded() {
      /*
      const schemaList = Object.keys(this.formSchema);
      schemaList.forEach((schemaKey) => {
        const schema = this.formSchema[schemaKey];
        this.formValidator[schemaKey] = new validateTypes[schema.type](schema);
      });
      */
      this.initAvailable = String(this.recipientAvailable);
      this.validatorSetup(this.initAvailable);
    },
    /*
    validate (evt, schema, validator) {
      validate(evt, schema, validator);
    },
    */
    /*
    scrollTo (evt) {
      // this.focused = 'field3';
      const offset  = evt.target.offsetParent.offsetTop + evt.target.offsetParent.offsetHeight + 150;
      window.scroll({
        top: offset,
        left: 0,
        behaviour: 'smooth',
      });
      // window.location.hash = 'textar';
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
        this.fstore.dispatch('validateCryptoAmount', { input: '0', validator: this.validators['cryptoAmount'] });
        this.fstore.dispatch('validateCryptoAddress', { input: '', validator: this.validators['cryptoAddress'] });
        this.initAvailable = String(this.recipientAvailable);
      }
    }
  },
};
</script>
