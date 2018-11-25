<template lang="pug">
input.app-slider(type="range", :value="curVal", :max="maxVal", :min="minVal")
</template>
 <style lang="less">
@import (reference, less) url("../theme/core.less");
.app-slider {
  -webkit-appearance: none;
  margin: 1rem 0;
  width: 100%;
  outline: none;
}
.app-slider:focus {
  border: 0;
  outline: none;
}
.app-slider:active {
  border: 0;
  outline: none;
}
.app-slider::-moz-focus-outer {
  border: 0;
  outline: none;
}
.app-slider::-moz-range-thumb {
  border: 2px solid @clr-red;
  height: 1.0em;
  width: 0.9rem;
  border-radius: 1.2rem;
  background-color: #fff;
  cursor: pointer;
}
.app-slider::-moz-range-thumb:hover {
  height: 1.2rem;
  width: 1.1rem;
  border-radius: 1.3rem;
}
.app-slider::-moz-range-progress {
  background-color: @clr-red;
}
.app-slider::-ms-fill-lower {
  background-color: @clr-red;
}

</style>
<script>
export default {
  data() {
    return {
    };
  },
  props: {
    'curVal': {
      type: Number,
      default: 0.0,
      required: true,
    },
    'minVal': {
      type: Number,
      default: 0.0,
      required: true,
    },
    'maxVal': {
      type: Number,
      default: 10.0,
      required: true,
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
