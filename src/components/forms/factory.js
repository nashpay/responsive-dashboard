export default (validator) => ({
  data() { 
    return {
       fieldValue: '',
       fieldError: false,
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
    'label',
    'errorMsg',
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
    updateVal(evt) {
      const val = JSON.parse(JSON.stringify(evt.target.value));
      this.fieldValue = val;
      setTimeout(() => this.validate(val), 10);
    },
    validate(y) {
      const res = validator(y);
      // this.fieldError = res ? null: res.reduce((acc, row) => `${acc}\n${row(y)}`, '');
      if (res !== true) {
        const errorMsg = res.reduce((acc, row) => `${acc}\n${row(this.label)}`, '');
        this.fieldError = errorMsg;
      } else {
        this.fieldError = false;
      }
      this.$emit('formOutput', {
        values: {
          [this.label]: this.fieldValue,
        },
        errors: {
          [this.label]: this.fieldError,
        },
      });
    },
  }
}); 
