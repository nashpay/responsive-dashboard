<template lang="pug">
h1 Landing Home
</template>
<style lang="less">

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
