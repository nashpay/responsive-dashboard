import { Decimal } from 'decimal.js';
import RateStore from '../../streaming/rateStore';

const CurrencyMixin = {
  data() {
    return {
      currencyConvert: '0',
    };
  },
  computed: {
    accountFiat() {
      return RateStore.getters.getActiveFiat;
    },
    currencyFiat() {
      const savedRate = RateStore.getters.getRate('BTC');
      if (savedRate !== false) {
        const availMaxDec = new Decimal(this.currencyConvert);
        const savedRateDec = new Decimal(savedRate);
        const fiatBalance = availMaxDec.mul(savedRateDec);
        return fiatBalance.toFixed(2);
      }
      return '0.00';
    },
  },
  methods: {
    postValidateHook() {
      this.currencyConvert = this.fieldValue;
    },
  },
};

export default CurrencyMixin;
