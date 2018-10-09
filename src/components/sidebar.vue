<template lang="pug">
.web-sidebar
  h1 sidebar

</template>

<script>

export default {
  data() {
    return {
      // Data Here.
    };
  },
  computed: {
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
