<template lang="pug">
.app-popup(:class="popupClass")
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-popup-active {
  z-index: 4;
  background-color: @clr-gray-0;
  width: 100vw;
  position: absolute;
  left: 0;
  bottom: 0;
  
  animation-duration: 0.5s;
  animation-timing-function: linear;
}
.app-popup-small {
  height: 30vh;
  animation-name: popup-small;
}
.app-popup-medium {
  height: 50vh;
  animation-name: popup-medium;
}
.app-popup-large {
  height: 70vh;
  animation-name: popup-large;
}

// Enter Animation
@keyframes popup-small {
  0% { height: 0vh; }
  50% { height: 15vh; }
  100% { height: 30vh; }
}
@keyframes popup-medium {
  0% { height: 0vh; }
  50% { height: 25vh; }
  100% { height: 50vh; }
}
@keyframes popup-large {
  0% { height: 0vh; }
  50% { height: 35vh; }
  100% { height: 70vh; }
}


</style>
<script>
import store from './store';
import * as types from './store/mutation-types';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
    popupClass () {
      const popupState = store.getters.popupScreen;
      console.log(popupState);
      if (popupState === types.popupEnum.HIDE) {
        //
        console.log('Remove popup');
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
