<template lang="pug">
.app-transfer-recipient
  recipient-add(v-if="recipientList.length === 0 || showRecipientAdd === true") 
  // Show Recipient List
  template(v-if="recipientList.length > 0 && showRecipientAdd === false") 
    //    
    .app-form
      .field.is-horizontal.app-field
        .field-label.is-normal
          label.label Available
        .field-body
          h1.title.is-4.box-transfer-balance 0.0001 BTC
          progress.progress.is-danger.remaining-balance(value="50", max="100")
    component-card(cardColor="transparent", cardNoVertPadding="yes", cardNoHoriPadding="yes")
      template(slot="card-content")
        nav.level.is-mobile
          .level-left
            //
            .level-item
              span.tag.is-danger {{ recipientList.length }}
              .recipient-list-title Recipients
          .level-right
            .level-item.margin-none
              component-button(
                bicon='plus',
                btext='none',
                blabel="btn-recipient-add-more",
                noMargin="yes",
                v-on:btn-clicked="onBtnClicked",
              )
    box-tx-output(v-for="recipient in recipientList", :info="recipient")
  template(v-if="recipientList.length > 0 && showRecipientAdd === false")
    component-button.app-align-bottom(
      bicon='none',
      btext='Next',
      bsize="medium",
      blabel="btn-recipient-next",
      bcat="primary",
      v-on:btn-clicked="onBtnClicked",
    )
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-transfer-recipient {
  .recipient-list-title {
    padding: 0rem 1rem 0rem 1rem;
  }
  nav.level {
    .margin-none {
      margin-right: 0;
    }
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
}
</style>
<script>
import store from './store';
import * as types from './store/mutation-types';
import RecipientAdd from './recipient-add.vue';
import BoxTxOutput from './box-output.vue';
import { Card, Divider, Checkbox, Button  } from '../components';
import ApiStore from '../nashcli/store';

export default {
  data() {
    return {
    };
  },
  computed: {
    recipientList () {
      return store.getters.recipientList;
    },
    showRecipientAdd () {
      const btnState = store.getters.recipientAddBtn;
      if (btnState === types.recipientAddBtnEnum.HIDE) {
        return false;
      }
      return true;
    }
  },
  components: {
    'component-card': Card,
    'component-divider': Divider,
    'component-checkbox': Checkbox,
    'component-button': Button,
    'recipient-add': RecipientAdd,
    'box-tx-output': BoxTxOutput,
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
  methods: {
    loaded() {
    },
    onBtnClicked (val) {
      // @TODO All in check logic
      const { label } = val;
      if (label === 'btn-recipient-next') {
        const addresses = this.recipientList.reduce((acc, row) => {
          return acc.concat({
            address: row.address.trim(),
            value: row.amount.trim(),
          });
        }, []);
        ApiStore.dispatch('sendTransferRequest', { addresses, slave: 'default', store, types });
        /*
         store.dispatch('updateTransferStep', types.stepEnum.REVIEW);
        */
      }
      if (label === 'btn-recipient-add-more') {
        store.dispatch('updateRecipientAddBtn', types.recipientAddBtnEnum.SHOW);

      }
    }
  },
};
</script>
