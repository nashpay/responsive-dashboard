<template lang="pug">
.app-modal-wrapper(@click="hideAll")
  .app-modal(:class="modalClass")
    component-card(cardColor="transparent", cardNoVertPadding="yes", cardNoHoriPadding="yes", cardFullHeight="yes")
      template(slot="card-content")
        component-card(v-if="modalElement === 'success'")
          template(slot="card-content")
            h1
              span SUCCESS &nbsp;
              span
                i.fa.fa-check
        component-card(v-if="modalElement === 'fail'")
          template(slot="card-content")
            h1
              span FAIL &nbsp;
              span
                i.fa.fa-check
        component-card(v-if="modalElement === 'saved'")
          template(slot="card-content")
            h1
              span SAVED &nbsp;
              span
                i.fa.fa-check
        component-card(v-if="modalElement === 'pending'")
          template(slot="card-content")
            h1
              span PENDING &nbsp;
              span
                i.fa.fa-check
         
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-modal-hide {
  display: none;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-name: app-modal-hide;
}
.app-modal-active {
  z-index: 5;
  /* background-color: @clr-gray-0; */
  width: 100vw;
  overflow: hidden;
  
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-name: app-modal;
}
.app-modal {
  position: fixed;
  left: 0;
  top: 45%;
  /* height: 130%; */
  height: 20%;
  /* overflow: hidden; */
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 17px;
  box-sizing: content-box;
}

.app-modal h1 {
  font-size: 1.2rem;
  text-align: center;
  font-weight: 800;
  padding: 0;
}

@keyframes app-modal {
  0% { visibility: 0%; }
  50% { visibility: 50%; }
  100% { visibility: 100%; }
}

@keyframes app-modal-hide {
  0% { visibility: 100%; }
  50% { visibility: 50%; }
  100% { visibility: 0%; }
}


</style>
<script>
import { Card, Button  } from '../components';
import store from './store';
import * as types from './store/mutation-types';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
    modalElement () {
      return store.getters.modalElement;
    },
    modalClass () {
      const modalScreen = store.getters.modalScreen;
      if (modalScreen === types.modalEnum.HIDE) {
        //
        return {
          'app-modal-hide': true,
          'app-modal-active': false,
        };
      } else if (modalScreen === types.modalEnum.SHOW) {
        return {
          'app-modal-hide': false,
          'app-modal-active': true,
        };
      }

    }
  },
  components: {
    'component-card': Card,
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
    hideAll() {
      store.dispatch('updateModalElement', types.modalEnum.HIDE);
      store.dispatch('updateLayover', types.layoverEnum.HIDE);
    },
  },
};
</script>
