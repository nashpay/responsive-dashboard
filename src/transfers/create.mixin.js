import { Decimal } from '../plugins/form-validator';

const CreateMixin = {
  data() {
    return {
      feeSelection: 'fastest',
      customSatPerByte: 50,
    };
  },
  watch: {
    customSatPerByte(to, from) {
      // Validate.
      const validator = Decimal({
        rules: { min: { precision: 4, value: '1' } },
      });
      if (this.feeSelection === 'custom') {
        const check = validator.validate(to);
        if (check === true) {
          this.satPerByte = to;
        }
      }
    },
    feeSelection(to, from) {
      if (to === 'fastest') {
        this.satPerByte = this.feeFastest.fee;
      }
      if (to === 'medium') {
        this.satPerByte = this.feeMedium.fee;
      }
      if (to === 'slow') {
        this.satPerByte = this.feeSlow.fee;
      }
      if (to === 'custom') {
        this.satPerByte = this.customSatPerByte;
      }
    },
  },
};

export default CreateMixin;
