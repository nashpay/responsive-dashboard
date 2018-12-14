<template lang="pug">
.app-transfer-complete
  h1.has-text-centered SUCCESS
  p TXID: {{ transferResponse.result }}
  component-button.app-align-bottom(
    bicon='none',
    btext='Done',
    bsize="medium",
    blabel="btn-account-selection-next",
    bcat="primary",
    v-on:btn-clicked="onBtnClicked",
  )
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
</style>
<script>
import store from './store';
import * as types from './store/mutation-types';
import { Card, Divider, Checkbox, Button  } from '../components';
import NavStore from '../navigation/store';
import * as NavTypes from '../navigation/store/mutation-types';
import { storeActions } from '../utils/objectStore';

export default {
  data() {
    return {
    };
  },
  computed: {
    childAccountList () {
      return []
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
  computed: {
    transferResponse () {
      //
 
      const resp = store.getters.transferResponse;
      return resp;
    }
  },
  watch: {
    $route(to, from) {
      this.loaded();
    },
  },
  methods: {
    loaded() {
    },
    onBtnClicked (label) {
      // Clear Store for Transfers
      store.dispatch('updateRecipientList', {
        data: {},
        action: storeActions.CLEAR,
      });

      // Update Navigation
      NavStore.dispatch('updatePopup', NavTypes.popupEnum.HIDE);
      NavStore.dispatch('updateLayover', NavTypes.layoverEnum.HIDE);
      NavStore.dispatch('updatePopupHeader', '');
      NavStore.dispatch('updatePopupPage', '');
      store.dispatch('updateTransferStep', types.stepEnum.ACCOUNT);
    }
  },
};
</script>
