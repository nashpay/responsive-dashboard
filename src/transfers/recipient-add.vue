<template lang="pug">
.app-transfer-recipient-add
  .app-form
    .field.is-horizontal.app-field(:class="field1")
      .field-label.is-normal
        label.label Available
      .field-body
        // h1.title.is-4.box-transfer-balance {{ recipientAvailable }} BTC
        // h1.title.is-4.box-transfer-balance {{ accountBalance }} BTC
        h1.title.is-4.box-transfer-balance {{ initAvailable }} BTC
        progress.progress.is-danger.remaining-balance(:value="remainingPct", max="100")
   
    .field.is-horizontal.app-field(:class="field2")
      .field-label.is-normal
        label.label Amount
      .field-body
        p.help.is-danger(v-if="cryptoAmountError !== false") {{ cryptoAmountError }}
        .field.has-addons
          .control
            input.input(
              type="text", 
              v-on:input="validate($event, 'cryptoAmount')",
              :value="cryptoAmount",
            )
          .control
            a.button BTC
        .field.exchange-icon-wrapper
          i.fa.fa-exchange.exchange-icon(aria-hidden="true")
        .field.has-addons
          .control
            input.input(type="text", placeholder="0.000")
          .control
            a.button USD
        
    .field.is-horizontal.app-field
      .field-label.is-normal
        label.label Address
      .field-body
        p.help.is-danger(v-if="cryptoAddressError !== false") {{ cryptoAddressError }}
        .field
          .control
            textarea.textarea.crypto-address(
              type="text", 
              v-on:input="validate($event, 'cryptoAddress')",
              v-on:focusin="scrollTo($event)",
              :value="cryptoAddress",
            )
            a#textar

    //
  //
    nav.level.is-mobile
     .level-item
     .level-right
       .level-item
         component-button(
           bicon='none',
           btext='Confirm',
           blabel="btn-recipient-add",
           v-on:btn-clicked="onBtnClicked",
         )
  component-button.app-align-bottom(
    v-if="cryptoAmountError === false && cryptoAddressError === false",
    bicon='none',
    btext='Confirm',
    bsize="medium",
    bcat="primary", 
    blabel="btn-recipient-add",
    v-on:btn-clicked="onBtnClicked",
  )
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-transfer-recipient-add {
  height: 90% - 7rem;
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
}
</style>
<script>
import { storeActions } from '../utils/objectStore';
import store from './store';
import * as types from './store/mutation-types';
import { Card, Divider, Checkbox, Button  } from '../components';
import ApiStore from '../nashcli/store';
import { BigNumber } from 'bignumber.js';

import RecipientAddMixin from './recipient-add-form';

export default {
  data() {
    return {
      initAvailable: '0',
      focused: false,
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
    field1 () {
      if (this.focused === false) {
        return { 'out-of-focus': false };
      }
      if (this.focused === 'field1') {
        return { 'out-of-focus': false };
      }
      return { 'out-of-focus': true };
    },
    field2 () {
      if (this.focused === false) {
        return { 'out-of-focus': false };
      }
      if (this.focused === 'field2') {
        return { 'out-of-focus': false };
      }
      return { 'out-of-focus': true };
    },
    childAccountList () {
      return []
    },
    accountBalance () {
       // TODO: Available Balance should be the sum of selected accounts + root Account 
       // - commited transfers amounts in future.
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
      console.log(`RecipientSpent: ${recipientSpent} Server Balance: ${serverBalance} currentSpend: ${currentSpend}`);
      return serverBalance.minus(recipientSpent).minus(currentSpend).toString();
    },
    recipientList () {
      return store.getters.recipientList; 
    },
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
    scrollTo (evt) {
      // this.focused = 'field3';
      /*
      const offset  = evt.target.offsetParent.offsetTop + evt.target.offsetParent.offsetHeight + 150;
      window.scroll({
        top: offset,
        left: 0,
        behaviour: 'smooth',
      });
      */
      // window.location.hash = 'textar';
    },
    onBtnClicked (val) {
      // @TODO All in check logic
      const { label } = val;
      if (label === 'btn-recipient-add') {
        const sdata = { 
          amount: this.cryptoAmount,
          address: this.cryptoAddress,
          amountFiat: '100', // TODO Remove hardcode
          currencyFiat: 'USD', // TODO Remove hardcode
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
