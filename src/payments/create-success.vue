<template>
  <div class="container-subrouter">
    <nav class="breadcrumb" aria-label="breadcrumb">
      <ul>
        <li>
          <router-link :to="pageRoute">
            Home
          </router-link>
        </li>
        <li>
          <router-link :to="createRoute">
            Create
          </router-link>
        </li>
        <li class="is-active">
            <a>Success</a>
        </li>
      </ul>
    </nav> 
    <div class="card app-payment-card">
      <div class="card-image">
        <figure class="image is-square">
          <img src="https://nash-qa-qr.s3.ap-southeast-1.amazonaws.com/qr-2bbab3e4-b259-442a-aa92-64342ab865bf">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">0.0001 BTC</p>
            <p class="subtitle is-6">2NEYd7YghfKaHDa18Kf1z3KovsfzbkNh7pB</p>
          </div>
        </div>
      </div>
    </div>  <!-- End of Payment Card -->
    <div class="field is-grouped">
      <div class="control">
        <router-link :to="pageRoute">
          <button class="button">Done</button>
        </router-link>
      </div>
      <div class="control">
        <router-link :to="createRoute">
          <button class="button is-text">Create</button>
        </router-link>
      </div>
    </div>
  </div> <!-- End of Container Sub Router -->
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.container-subrouter {
  .card.app-payment-card {
    margin-left: auto;
    margin-right: auto;
    width: 14rem;
    .media-content {
      justify-content: center;
      p.title {
        text-align: center;
      }
      p.subtitle {
        text-align: center;
      }
    }
  }
}
</style>
<script>

export default {
  data() { 
    return {
      pageRoute: { name: 'payment-list' },
      createRoute: { name: 'payment-create' },
    };
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
