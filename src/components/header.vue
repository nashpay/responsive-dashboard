<template lang="pug">
.web-header
  .n-web-header
    .columns.is-mobile
      .column.is-2-mobile
        template(v-if="headerBackLink !== false")
          router-link(:to="headerBackLink")
            i.fas.fa-angle-left.n-header-backlink
      .column.is-8-mobile.web-header-title
        span {{ headerTitle }}
      .column.is-2-mobile
        template(v-if="headerActionIcon !== false && headerActionLink !== false")
          router-link(:to="headerActionLink")
            i.fas.fa-plus.n-header-backlink(v-if="headerActionIcon === 'plus'")
        template(v-else-if="headerActionIcon !== false")
          i.fas.fa-plus.n-header-backlink(v-if="headerActionIcon === 'plus'")
        template(v-else="")
          span &nbsp;

</template>
<style lang="less">
@import (reference, less) url("../theme.less");

.n-web-header {
  background-color: @primary-color;
  height: 3.5rem;
  color: @secondary-color;
  font-family: @logo-font;
  font-size: 1rem;
}

.web-header-title {
  padding: 1.4rem 1rem 1rem 1rem;
  text-align: center;
}

.n-header-backlink {
  padding: 1rem;
  color: @secondary-color;
}

</style>
<script>
console.log('Load Header');

import { AppStore as store }  from '../store/';

export default {
  data() {
    return {
      // Data Here.
    };
  },
  computed: {
    headerTitle () {
      return store.getters.headerTitle;
    },
    headerBackLink () {
      return store.getters.headerBackLink;
    },
    headerActionIcon () {
      return store.getters.headerActionIcon;
    },
    headerActionLink () {
      return store.getters.headerActionLink;
    }
  },
  components: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  mixins: [],
  watch: {
    $route(to, from) {
    },
  },
  methods: {
    loaded() {

    },
  },
};
</script>
