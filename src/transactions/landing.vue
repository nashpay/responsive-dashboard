/* eslint react/prop-types: 0 */
<template lang="pug">
.mod-tx-landing
  .tabs.is-centered.is-mobile
    ul
      li(:class="tabDeposit", @click="txTab('deposit')")
        a Deposits
      li(:class="tabTransfer", @click="txTab('transfer')")
        a Transfers
  component-card(cardColor="transparent", cardNoVertPadding="yes")
    <template slot="card-content">
      h2.title.is-5.has-text-centered Recent Transactions
    </template>
  .app-tx-list-wrapper
    template(v-for="tx in transactions")
      box-tx(
        :info="tx",
      )
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.mod-tx-landing {
  //
  overflow: hidden;
  .app-tx-list-wrapper {
    height: 68%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 17px;
    box-sizing: content-box;
  }
}

</style>
<script>
import { Card, Button  } from '../components';
import BoxTX from './box-tx.vue';
import ApiStore from '../nashcli/store';
export default {
  data() {
    return {
    };
  },
  computed: {
    tabDeposit () {
      const tabVal = ApiStore.getters.rootTXFilter;
      if (tabVal === 'deposit') {
        return { 'is-active': true };
      }
      return { 'is-active': false };
    },
    tabTransfer () {
      const tabVal = ApiStore.getters.rootTXFilter;
      if (tabVal === 'transfer') {
        return { 'is-active': true };
      }
      return { 'is-active': false };
    },
    transactions () {
      const txFilter = ApiStore.getters.rootTXFilter;
      const txList = ApiStore.getters.rootAccountTransactions.reduce((acc, row) => {
        if (row.category === txFilter) {
          return acc.concat(row);
        }
        return acc;
      }, []); 
      txList.sort((a, b) => b.id - a.id);
      return txList.slice(0,10);
    }
  },
  components: {
    'component-card': Card,
    'box-tx': BoxTX,
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
      const { label } = val;
      if (label === 'btn-deposit') {
        NavStore.dispatch('updatePopup', NavTypes.popupEnum.LARGE);
        NavStore.dispatch('updateLayover', NavTypes.layoverEnum.SHOW);
        NavStore.dispatch('updatePopupHeader', 'deposit');
        NavStore.dispatch('updatePopupPage', 'deposit-landing');
      }
      if (label === 'btn-withdraw') {
        NavStore.dispatch('updatePopup', NavTypes.popupEnum.LARGE);
        NavStore.dispatch('updateLayover', NavTypes.layoverEnum.SHOW);
        NavStore.dispatch('updatePopupHeader', 'transfer');
        NavStore.dispatch('updatePopupPage', 'transfer-landing');
      }

    },
    txTab (val) {
      ApiStore.dispatch('updateRootTXFilter', val);
    },
  },
};
</script>
