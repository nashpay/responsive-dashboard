<template>
  <div class="container-subrouter">
  </div>
</template>
<script>
import storeAuth from './store';

export default {
  data() { 
    return {};
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  components: {
  },
  watch: {
  },
  methods: {
    loaded() {
      //
      storeAuth.dispatch('saveConnector', null);
      storeAuth.dispatch('saveAuthenticated', false);
      this.$router.push({ name: 'auth-login' });    
    },
  }
};

</script>
