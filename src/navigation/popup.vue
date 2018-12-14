<template lang="pug">
.app-popup-wrapper
  .app-popup(:class="popupClass")
    component-card(cardColor="transparent", cardNoVertPadding="yes", cardNoHoriPadding="yes", cardFullHeight="yes")
      template(slot="card-content")
        // h1.popup-header(v-if="formFocusCurrent === false") {{ popupHeader }}
        template(v-if="popupPage === 'deposit-landing'")
          deposit-landing
        template(v-if="popupPage === 'transfer-landing'")
          transfer-landing
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-popup-wrapper {
  overflow: hidden;
}
.app-popup {
}
.popup-header {
  padding: 1rem 0rem 1rem 0rem;
  text-align: center;
  width: 100%;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
  height: 4rem;
}
.app-popup-hide {
  display: none;
}
.app-popup-active {
  z-index: 4;
  background-color: @clr-gray-0;
  width: 100vw;
  overflow: hidden;
  
  animation-duration: 0.3s;
  animation-timing-function: linear;
}
.app-popup-small {
  position: absolute;
  left: 0;
  top: 50%%;
  height: 50%;
  animation-name: popup-small;
}
.app-popup-medium {
  position: absolute;
  left: 0;
  top: 30%%;
  height: 70%;
  animation-name: popup-medium;
}
.app-popup-large {
  position: fixed;
  left: 0;
  top: 10%;
  /* height: 130%; */
  height: 90%;
  animation-name: popup-large;
  /* overflow: hidden; */
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 17px;
  box-sizing: content-box;
}

// Enter Animation
@keyframes popup-small {
  0% { height: 0%; }
  50% { height: 25%; }
  100% { height: 50%; }
}
@keyframes popup-medium {
  0% { height: 0%; }
  50% { height: 35%; }
  100% { height: 70%; }
}
@keyframes popup-large {
  0% { top: 90%; }
  50% { top: 45%; }
  100% { top: 10%; }
}


</style>
<script>
import { Card, Button  } from '../components';
import store from './store';
import * as types from './store/mutation-types';
import { Landing as DepositLanding } from '../deposits';
import { Landing as TransferLanding } from '../transfers';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
    popupHeader () {
      return store.getters.popupHeader;
    },
    popupPage () {
      return store.getters.popupPage;
    },
    popupClass () {
      const popupState = store.getters.popupScreen;
      if (popupState === types.popupEnum.HIDE) {
        //
        return {
          'app-popup-hide': true,
          'app-popup-active': false,
          'app-popup-small': false,
          'app-popup-medium': false,
          'app-popup-large': false,
        };

      } else if (popupState === types.popupEnum.SMALL) {
        return {
          'app-popup-hide': false,
          'app-popup-active': true,
          'app-popup-small': true,
          'app-popup-medium': false,
          'app-popup-large': false,
        };
      } else if (popupState === types.popupEnum.MEDIUM) {
        return {
          'app-popup-hide': false,
          'app-popup-active': true,
          'app-popup-small': false,
          'app-popup-medium': true,
          'app-popup-large': false,
        };
      } else if (popupState === types.popupEnum.LARGE) {
        return {
          'app-popup-hide': false,
          'app-popup-active': true,
          'app-popup-small': false,
          'app-popup-medium': false,
          'app-popup-large': true,
        };
      }
    },
    formFocusCurrent () {
      return store.getters.formFocusCurrent;
    },
  },
  components: {
    'component-card': Card,
    'deposit-landing': DepositLanding,
    'transfer-landing': TransferLanding,
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
  },
};
</script>
