<template lang="pug">
.app-checkbox
  p.buttons
    a.button.is-small(:class="buttonClass", @click="clicked")
      span.icon.is-small
        i.fa.fa-check
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-checkbox {
  .box-checked {
    background-color: @clr-red; 
    color: #fff;
    border: 0;
  }
  .box-unchecked {
    background-color: @clr-gray-1; 
    color: @clr-gray-1;
    border: 0;
  }
}
</style>
<script>

export default {
  data() {
    return {
      buttonClass: {
        'box-checked': true,
        'box-unchecked': false,
      },
    };
  },
  computed: {
  },
  components: {
  },
  props: {
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
    clicked() {
      const label = this.blabel;
      this.$emit('checkbox-clicked', { label });
    },
  },
};
</script>
