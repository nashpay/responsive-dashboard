<template lang="pug">
.app-popup(:class="popupClass")
  component-card(cardColor="transparent", cardNoVertPadding="yes", cardNoHoriPadding="yes", cardFullHeight="yes")
    template(slot="card-content")
      h1.popup-header {{ popupHeader }}
      template(v-if="popupPage === 'deposit-landing'")
        deposit-landing
      template(v-if="popupPage === 'transfer-landing'")
        transfer-landing
  
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.popup-header {
  padding: 1rem 0rem 1rem 0rem;
  text-align: center;
  width: 100%;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
}
.app-popup-hide {
  display: none;
}
.app-popup-active {
  z-index: 4;
  background-color: @clr-gray-0;
  width: 100vw;
  position: absolute;
  left: 0;
  bottom: 0;
  
  animation-duration: 0.3s;
  animation-timing-function: linear;
}
.app-popup-small {
  height: 50vh;
  animation-name: popup-small;
}
.app-popup-medium {
  height: 70vh;
  animation-name: popup-medium;
}
.app-popup-large {
  height: 90vh;
  animation-name: popup-large;
}

// Enter Animation
@keyframes popup-small {
  0% { height: 0vh; }
  50% { height: 25vh; }
  100% { height: 50vh; }
}
@keyframes popup-medium {
  0% { height: 0vh; }
  50% { height: 35vh; }
  100% { height: 70vh; }
}
@keyframes popup-large {
  0% { height: 0vh; }
  50% { height: 45vh; }
  100% { height: 90vh; }
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
      console.log(popupState);
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
    }
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
