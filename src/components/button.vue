<template lang="pug">
.app-button.level
  a.button.level-item.has-text-centered(:class="buttonClass", @click="clicked")
    template(v-if="bicon !== 'none'")
      span.icon
        i.fa.fa-arrow-circle-o-down(v-if="bicon === 'arrow-circle-o-down'", aria-hidden="true")
        i.fa.fa-arrow-circle-o-up(v-if="bicon === 'arrow-circle-o-up'", aria-hidden="true")
    template(v-else="")
      span
    span {{ btext }}

</template>
 <style lang="less">
@import (reference, less) url("../theme/core.less");

.app-button {
  .nprimary {
    background-color: @clr-red;
    color: #fff;
  }
}

</style>
<script>
export default {
  data() {
    return {
      buttonClass: {
        'is-medium': false,
        'is-large': false,
        'nprimary': false,
      },
    };
  },
  props: {
    bicon: {
      type: String,
      default: 'none',
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
    bcat: {
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
      if (this.bcat === 'primary') {
        this.buttonClass['nprimary'] = true;
      }
    },
    clicked() {
      const label = this.blabel;
      this.$emit('btn-clicked', { label });
    },
  },
};
</script>
