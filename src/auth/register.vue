<template>
  <div class="container-subrouter">
   <h1 class="title is-4"> Registration</h1>
   <h1 class="subtitle is-5">Live Network</h1>
   <register-generate />
   <register-form />
  </div>
</template>
<script>
import RegisterGenerate from './register-generate.vue';
import RegisterForm from './register-form.vue';

export default {
  data() { 
    return {
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  components: {
    'register-form': RegisterForm,
    'register-generate': RegisterGenerate,
  },
  computed: {
    pubKeyOne () { return RegisterStore.getters.pubKeyOne },
    pubKeyTwo () { return RegisterStore.getters.pubKeyTwo },
    certPub () { return RegisterStore.getters.certPub },
    certKey () { return RegisterStore.getters.certKey },
  },
  props: [
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      if(this.$route.matched.length > 0) {
        // Update NavStore
      } else {
        // 404
      } 
    },
    generatePhrase() {

    },
  }
};




</script>
