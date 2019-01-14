<template lang="pug">
.app-header
  .columns.is-mobile
    .column.is-3 
    .column.is-6.top-nav-middle TEST USER C
    .column.is-3 
</template>
 <style lang="less">
@import (reference, less) url("../theme/core.less");

.app-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;  
  width: 100%;
  height: @app-header-height;
  .columns {
    padding: @app-header-height / 3.3;
    background-color: @clr-red;
    margin: 0;
    .top-nav-middle {
      color: #fff;
      font-weight: bold;
      text-align: center;
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
