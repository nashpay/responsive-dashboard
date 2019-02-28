<template>
  <div class="wrapp">
    <h1> Ledger API </h1>
    <button class="button" @click="btnConnect">Connect</button>
  </div>
</template>
<script>
import co from 'co';
import Transport from '@ledgerhq/hw-transport-u2f';
import LedgerAppBTC from '@ledgerhq/hw-app-btc';

const ledgerInit = function* ledgerInit() {
  console.log('Is USB Supported?');
  console.log(typeof navigator.usb);
  /*
  const deviceInfo = yield navigator.usb.requestDevice({ filters: [{ usbProductId: 0x0001, vendorId: 0x2c97 }] });
  console.log(deviceInfo);
  yield deviceInfo.open();
  */
  console.log('Make transport');
  const transport = Transport.create();
  console.log('Transport made');
  const appBTC = new LedgerAppBTC(transport);
  const res = yield appBTC.getWalletPublicKey('44\'/0\'/0\'/0/0');
  console.log(res);
}

export default {
  data () {
    return {}
  },
  mounted() {
    this.$nextTick(this.loaded);    
  },
  props: [],
  computed: {},
  components: {},
  watch: {},
  methods: {
    loaded() {},
    btnConnect() {
      co(ledgerInit).then((res) => {

      }).catch((err) => {
        if (err) console.log(err);
      });
    },
  },
};
</script>

