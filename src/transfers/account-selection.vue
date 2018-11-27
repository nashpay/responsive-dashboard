<template lang="pug">
.app-transfer-account-selection
  h1.account-selection-header Select Account
  component-card(cardColor="white", cardSmallPadding="yes")
    template(slot="card-content")
      nav.level.is-mobile
        .level-left
          .level-item
            .level-inner.has-text-left
              p.title.is-5.deposit-account-name Default
              p.heading.deposit-account-value {{ defaultAccountBalance }} BTC
        .level-right
          .level-item
            component-checkbox
  component-divider(divtext="OR")
  template(v-if="childAccountList.length === 0")
    component-card(cardColor="transparent", cardSmallPadding="yes")
      template(slot="card-content")
        h2.title.is-6.has-text-centered.deposit-no-child-account No Child Accounts
  //
  component-button.app-align-bottom(
    bicon='none',
    btext='Next',
    bsize="medium",
    blabel="btn-account-selection-next",
    bcat="primary",
    v-on:btn-clicked="onBtnClicked",
  )
    
  
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-transfer-account-selection {
  .account-selection-header {
    padding: 1rem 0rem 1rem 0rem;
    text-align: center;
    width: 100%;
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: bold;
  }
  .deposit-account-name {
    font-size: 1.1rem;
  }
  .deposit-account-value {
    font-size: 0.9rem;
  }
  .deposit-no-child-account {
    color: @clr-gray-3;
  }
}
</style>
<script>
import store from './store';
import * as types from './store/mutation-types';
import { Card, Divider, Checkbox, Button  } from '../components';
import ApiStore from '../nashcli/store';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
    childAccountList () {
      return []
    },
    defaultAccountBalance () {
      const balanceInfo = ApiStore.getters.rootAccountBalance;
      return balanceInfo.available;
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
  ],
  watch: {
    $route(to, from) {
      this.loaded();
    },
  },
  methods: {
    loaded() {
    },
    onBtnClicked (label) {
      // @TODO All in check logic
      store.dispatch('updateTransferStep', types.stepEnum.RECIPIENT);
    }
  },
};
</script>
