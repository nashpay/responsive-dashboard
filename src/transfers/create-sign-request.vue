<template>
  <div class="container-subrouter">
    <h1 class="subtitle is-5"> Signing Method</h1>
    <div class="select">
      <select v-model="signingAuth">
       <option value="privateKeyAuth">Private Key</option>
       <option value="seedPhraseAuth">Seed Phrase</option>
       <option value="offlineAuth">Offline Signing</option>
      </select>
    </div>
    <p>&nbsp;</p>
    <template v-if="signingAuth === 'offlineAuth'" >
      <h1 class="subtitle is-5"> Transaction Data</h1>
      <textarea
        class="textarea has-fixed-size tx-hex"
        rows="4"
        readonly
      >
        {{ txHex.trim() }}
      </textarea>
    </template>
    <template v-if="signingAuth === 'seedPhraseAuth'">
      <!-- -->
     <section-seed-phrase />
    </template> 
    <nav class="level is-mobile">
      <div class="level-left">
       <div class="level-item">
         &nbsp;
       </div>
      </div>
      <div class="level-right">
       <div class="level-item">
         <router-link :to="createRoute">
           <button class="button is-text">Cancel</button>
         </router-link>
       </div>
      </div>
    </nav>
  </div> <!-- End of Container Sub Router -->
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
.container-subrouter {
  textarea.tx-hex {
    max-width: 32rem;
    min-width: 24rem;
  }
  .card.app-payment-card {
    margin-left: auto;
    margin-right: auto;
    width: 14rem;
    .media-content {
      justify-content: center;
      p.title {
        text-align: center;
      }
      p.subtitle {
        text-align: center;
      }
    }
  }
}
</style>
<script>
import co from 'co';
import storeAuth from '../auth/store';
import { makeTXFromStore } from './check-request.actions';
import SectionSeedPhrase from './form-signature-seed-phrase.vue';
export default {
  data() { 
    return {
      signingAuth: 'seedPhraseAuth',
      pageRoute: { name: 'transfer-list' },
      createRoute: { name: 'transfer-create' },
      tx: '',
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  props: [
    'address',
    'value',
  ], 
  computed: {
    txHex () {
      if (this.tx !== '') {
        return this.tx.toHex();
      }
      return '';
    },
  },
  components: {
    'section-seed-phrase': SectionSeedPhrase,
  },
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  methods: {
    loaded() {
      this.tx = makeTXFromStore();
    },
  }
};
</script>
