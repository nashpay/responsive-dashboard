<template lang="pug">
.app-deposit-result
  figure.image.is-128x128.qr-image
    img(src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F5%2F5b%2FQrcode_wikipedia.jpg&f=1")
  .deposit-address-wrapper.has-text-centered
    .columns.is-mobile
      .column 2NDh
      .column zMt2
      .column D9Zx
    .columns.is-mobile
      .column Xapb
      .column uq56
      .column 7WGe
    .columns.is-mobile
      .column WP7N
      .column uDN1
      .column 81cg 
  component-button.app-align-bottom(
    bicon='none',
    btext='Done',
    bsize="medium",
    blabel="btn-account-detail-next",
    bcat="primary",
    v-on:btn-clicked="onBtnClicked",
  )
    
  
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-deposit-result {
  .qr-image {
    .auto-center();
  }
  .deposit-address-wrapper {
    padding: 1rem; 
    .auto-center();
  }
  .column {
    font-size: 1.3rem;
    font-weight: bold;
  }
}
</style>
<script>
import store from './store';
import * as types from './store/mutation-types';
import { Card, Divider, Checkbox, Button  } from '../components';
import NavStore from '../navigation/store';
import * as NavTypes from '../navigation/store/mutation-types';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
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
      NavStore.dispatch('updatePopup', NavTypes.popupEnum.HIDE);
      NavStore.dispatch('updateLayover', NavTypes.layoverEnum.HIDE);
      NavStore.dispatch('updatePopupHeader', '');
      NavStore.dispatch('updatePopupPage', '');
      store.dispatch('updateDepositStep', types.stepEnum.ACCOUNT);

    }
  },
};
</script>
