<template lang="pug">
.app-overlay(:class="overlayClass", @click="hideAll")
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.app-overlay {
  z-index: 3;
  background-color: @clr-gray-3;
  opacity: 0.3;
  height: 100%;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  overflow: none;
}
.app-overlay-hide {
  display: none;
}
.app-overlay-show {
  display: block; 
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

// Enter Animation
@keyframes fade-in {
  0% { opacity: 0.1; }
  50% { opacity: 0.2; }
  100% { opacity: 0.3; display: block; }
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
    overlayClass () {
      const overlayState = store.getters.layoverScreen;
      if (overlayState === types.layoverEnum.HIDE) {
        //
        return {
          'app-overlay-hide': true,
          'app-overlay-show': false,
        };

      } else if (overlayState === types.layoverEnum.SHOW) {
        return {
          'app-overlay-hide': false,
          'app-overlay-show': true,
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
    hideAll() {
      store.dispatch('updateModalElement', types.modalEnum.HIDE);
      store.dispatch('updateLayover', types.layoverEnum.HIDE);
    },
  },
};
</script>
