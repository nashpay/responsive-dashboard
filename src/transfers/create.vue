<template>
</template>
<style lang="less">
</style>
<script>

export default {
  data() { 
    return {
    }
  },
  components: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
  ], 
  filters: {
  },
  watch: {
    $route(to, from) {
      this.loaded();
    },
  },
  computed: {
  },
  methods: {
    loaded() {
  
    },
  }
};
</script>
