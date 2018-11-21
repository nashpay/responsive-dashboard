<template lang="pug">
.app-divider
  h2.divider.line.one-line {{ divtext }}
    
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.app-divider {
  .divider {
	display: flex;
	&:before,
	&:after {
	  content: "";
	  flex: 1;
	}
    opacity: 0.6;
    color: @clr-gray-3;
  }
  .line {
    align-items: center;
    margin: 1em -1em;
	&:before,
	&:after {
      height: 0.1rem;
	  margin: 0 1rem;
	}
  }
  .one-line {
	&:before,
	&:after {
      background-color: @clr-gray-3;
	}

  }
}

</style>
<script>

export default {
  data() {
    return {
      routePath: '',
    };
  },
  computed: {
  },
  components: {
  },
  props: {
    divtext: {
      type: String,
      required: true,
    }
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
