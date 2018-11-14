<template lang="pug">
h1 Footer
</template>
<style>

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
