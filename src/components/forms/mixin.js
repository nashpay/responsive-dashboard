import Form from './index.vue';

export default (formData) => {
  let mixinAdd = [];
  const { mixins } = formData;
  if (typeof mixins !== 'undefined') {
    mixinAdd = mixins;
  }
  return ({
    data() {
      return {
        ...formData,
      };
    },
    mixins: mixinAdd,
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
        const { loadHandler, mixins } = formData;
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
};

