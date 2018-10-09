<template lang="pug">
#app
  web-header
  template(v-if="$route.matched.length")
    .web-sidebar
    .web-container
      transition(name="na-page-change")
        router-view
  web-footer
</template>
<style lang="less">
@import (reference, less) url("./theme.less");

.columns.na-level {
  margin: 0;
}

.na-level {
  border: 1px @medium-gray solid;
  background-color: #fff;
  padding: 1rem;
}

.na-background {
  background-color: @light-gray;
  height: 90%;
}

.na-page-change-enter-active {
  animation-duration: 1.2s;
  animation-name: slidein;
};

.na-page-change-leave-active {
  animation-duration: 1.2s;
  animation-name: slideout;
};

@keyframes slidein {
  from {
    left: 100%;
    width: 100%;
    border-left: 1px @medium-gray solid;
    position: absolute;
    z-index: 2;
  }

  to {
    left: 0%;
    width: 100%;
    border-left: 1px @medium-gray solid;
    position: absolute;
    z-index: 0;
  }
};

@keyframes slideout {
  from {
    margin-right: 0%;
    width: 100%;
    position: absolute;
    z-index: 0;
  }

  to {
    margin-right: 100%;
    width: 100%;
    position: absolute;
    z-index: 0;
  }
};


</style>
<script>

import { Header , Footer } from './components';

// import { Core as store } from './store';

export default {
  data() {
    return {
      routePath: '',
    };
  },
  components: {
    'web-header': Header,
    'web-footer': Footer,
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
      const that = this;
      if (this.$route.matched.length > 0) {
        const routeObj = this.$route.matched[0];
        this.routePath = routeObj.path;
      } else {
        this.routePath = 'N/A';
      }
    },
  },
};
</script>
