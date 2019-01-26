import Form from './index.vue';

export default (formData) => ({
  data() { 
    return {
      ...formData,
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
  computed: {
  },
  components: {
    'napp-form': Form,
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
    formBtnOk(evt) {
      this.formHooks.btnOk.call(this, evt);
    },
    formBtnCancel(evt) {
      this.formHooks.btnCancel.call(this, evt);
    },
  }
});
