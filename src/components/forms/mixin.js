import Form from './index.vue';

export default formData => ({
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
    },
    ...formData.watchFns,
  },
  computed: {
    ...formData.computedFns,
  },
  components: {
    'napp-form': Form,
  },
  methods: {
    loaded() {
      // console.log('Form mixin loaded called...');
      const { loadHandler } = formData;
      if (typeof loadHandler !== 'undefined') {
        loadHandler(this);
      }
    },
    formBtnOk(evt) {
      this.formHooks.btnOk.call(this, evt);
    },
    formBtnCancel(evt) {
      this.formHooks.btnCancel.call(this, evt);
    },
  },
});
