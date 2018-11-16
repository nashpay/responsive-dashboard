<template lang="pug">
.app-card
  .card(:class="cardOuter")
    .card-content(:class="cardContent")
      <slot name="card-content"></slot>
</template>
 <style lang="less">
@import (reference, less) url("../theme/core.less");

.app-card {
  padding: 0.5rem 1rem 0.5rem 1rem;
  .card-white {
    background-color: @clr-white;
    border-radius: 0.5rem;
    .card-content {
      text-align: right; 
    }
  }
  .card.card-transparent {
    background-color: transparent;
    box-shadow: none;
    border: 0;
  }
  .card-no-vert-padding {
    padding-top: 0;
    padding-bottom: 0;
  }
}

</style>
<script>
export default {
  data() {
    return {
      cardOuter: {
        'card-white': false,
        'card-transparent': false,
      },
      cardContent: {
        'card-no-vert-padding': false,
      },
    };
  },
  props: {
    'cardColor': {
      type: String,
      default: 'white',
    },
    'cardNoVertPadding': {
      type: String,
      default: 'no',
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
      if (this.cardColor === 'white') {
        this.cardOuter['card-white'] = true;
      } else if (this.cardColor === 'transparent') {
        this.cardOuter['card-transparent'] = true;
      }
      console.log(this.cardNoVertPadding);
      if (this.cardNoVertPadding === 'yes') {
        this.cardContent['card-no-vert-padding'] = true;
      }
    },
  },
};
</script>
