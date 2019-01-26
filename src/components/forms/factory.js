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
    'name',
    'errorMsg',
    'defaultValue',
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      if (typeof this.defaultValue !== 'undefined' && this.defaultValue !== null) {
        this.updateVal({ target: { value: this.defaultValue }});
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
          [this.name]: this.fieldValue,
        },
        errors: {
          [this.name]: this.fieldError,
        },
      });
    },
  }
}); 
