<template lang="pug">
.app-header
  .columns.is-mobile
    .column.is-3 L
    .column.is-6 C
    .column.is-3 R
</template>
 <style lang="less">
@import (reference, less) url("../theme/core.less");

.app-header {
  .columns {
    padding: 1rem;
    background-color: @clr-red;
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
