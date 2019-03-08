<template>
  <section class="hero is-danger is-fullheight">
    <div class="hero-body">
      <div class="container">
        <router-view />
      </div>
    </div>
  </section>
</template>
<style lang="less">
</style>
<script>

export default {
  data() { 
    return {};
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  computed: {
  },
  components: {
  },
  methods: {
    loaded() {
      //
      if(this.$route.matched.length > 0) {
        // Update NavStore
      } else {
        // 404
      } 
    },
  }
};
</script>
