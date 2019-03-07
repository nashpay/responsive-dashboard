<template>
  <section class="hero is-danger is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="title is-4"> Nashpay</div>
        <div class="subtitle is-5"> Registration</div>
        <div class="card">
          <div class="card-content">
            <div class="content">
                <register-generate />
                <register-form />
            </div>
          </div> <!-- End of Card Content -->
        </div>
      </div>
    </div>
  </section>
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
