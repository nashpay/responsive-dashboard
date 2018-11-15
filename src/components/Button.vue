<template lang="pug">
.app-button
  p.buttons
    a.button
      span.icon(v-if="bicon !== false")
        i.fa.fa-arrow-circle-o-down(v-if="bicoin === 'arrow-circle-o-down'", aria-hidden="true")
        i.fa.fa-arrow-circle-o-up(v-if="bicoin === 'arrow-circle-o-up'", aria-hidden="true")
      span {{ btext }}

</template>
 <style lang="less">
@import (reference, less) url("../theme/core.less");


</style>
<script>
export default {
  data() {
    return {
    };
  },
  props: {
    bicoin: {
      type: String,
      default: '',
    },
    btext: {
      type: String,
      required: true,
    },
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
