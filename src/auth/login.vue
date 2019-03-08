<template>
  <div class="hero-center-card">
    <div class="title is-4"> Nashpay</div>
    <div class="subtitle is-5">Login</div>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="notification is-success" v-if="register">
            <button class="delete"></button>
            Registration Successful
          </div>
          <login-form />
        </div>
      </div> <!-- End of Card Content -->
    </div>
  </div>
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");

.hero-center-card {
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
<script>
import LoginForm from './login-form.vue';

export default {
  data() { 
    return {
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  components: {
    'login-form': LoginForm,
  },
  computed: {
  },
  props: [
    'register',
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
    },
  }
};
</script>
