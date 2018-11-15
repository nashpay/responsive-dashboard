<template lang="pug">
.app-card
  .card
    .card-content
      <slot name="card-content"></slot>
</template>
 <style lang="less">
@import (reference, less) url("../theme/core.less");

.app-card {
  padding: 1rem;
  .card {
    background-color: @clr-white;
    border-radius: 0.5rem;
    .card-content {
      text-align: right; 
    }
  }
}

</style>
<script>
export default {
  data() {
    return {
    };
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
