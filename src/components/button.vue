<template lang="pug">
.app-button
  p.buttons
    a.button(:class="buttonClass", @click="clicked")
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
      buttonClass: {
        'is-medium': false,
        'is-large': false,
      },
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
    bsize: {
      type: String,
      default: 'normal',
    },
    blabel: {
      type: String,
      default: 'normal',
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
      if (this.bsize === 'medium') {
        this.buttonClass['is-medium'] = true;
      }
    },
    clicked() {
      const label = this.blabel;
      this.$emit('btn-clicked', { label });

    },
  },
};
</script>
