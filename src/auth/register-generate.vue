<template>
  <div class="auth-register-wrap">
    <div class="field">
      <!-- <label class="label">Mnemonic Phrase One</label> -->
      <label class="label">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">Mnemonic Phrase One</div>
              <div class="button is-danger" v-on:click="copyValToClipboard(phraseOne)">Copy</div>
          </div>
          <div class="level-right">
            <div class="level-item">
            </div>
          </div>
        </nav>
      </label>
      <div class="control">
        <textarea
          class="textarea is-danger"
          v-bind:value="phraseOne"
          rows="3"
          disabled
        />
      </div>
    </div>
    <!-- End of Mnemonic Phrase One -->
    <div class="field">
      <label class="label">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">Mnemonic Phrase Two</div>
              <div class="button is-danger" v-on:click="copyValToClipboard(phraseTwo)">Copy</div>
          </div>
          <div class="level-right">
            <div class="level-item">
            </div>
          </div>
        </nav>
      </label>
      <div class="control">
        <textarea
          class="textarea is-danger"
          v-bind:value="phraseTwo"
          rows="3"
          disabled
        />
      </div>
    </div>
    <!-- End of Mnemonic Phrase Two -->
    <div class="field">
      <label class="label">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">API Key</div>
              <div class="button is-danger" v-on:click="copyValToClipboard(apiKey)">Copy</div>
          </div>
          <div class="level-right">
            <div class="level-item">
            </div>
          </div>
        </nav>
      </label>
      <div class="control">
        <input
          type="text"
          class="input is-danger"
          v-bind:value="apiKey"
          disabled
        />
      </div>
    </div>
    <!-- End of API Key -->
    <div class="field">
      <label class="label">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">API Secret</div>
              <div class="button is-danger" v-on:click="copyValToClipboard(certKey)">Copy</div>
          </div>
          <div class="level-right">
            <div class="level-item">
            </div>
          </div>
        </nav>
      </label>
      <div class="control">
        <textarea
          class="textarea is-danger"
          v-bind:value="certKey"
          rows="3"
          disabled
        />
      </div>
    </div>
    <!-- End of Mnemonic Phrase Two -->
  </div>
</template>
<script>
import RegisterStore from './register.store.js';
import bip39 from 'bip39';
import bip32 from 'bip32';
import forge from 'node-forge';
import crypto from 'crypto';
import { Buffer } from 'buffer/';
import co from 'co';

const rsa = forge.pki.rsa;

const pki = forge.pki;

const Networks = {
  'btc-live': {
    wif: 0x80,
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    units: 100000000,
  },
  'btc-testnet': {
    wif: 0xef,
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    units: 100000000,
  },
};

export default {
  data() { 
    return {
    };
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  computed: {
    phraseOne () { return RegisterStore.getters.phraseOne },
    phraseTwo () { return RegisterStore.getters.phraseTwo },
    certPub () { return RegisterStore.getters.certPub },
    certKey () { return RegisterStore.getters.certKey },
    apiKey () { return this.pubToAPIKey(RegisterStore.getters.certPub); },
  },
  props: [
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    } 
  },
  filters : {
    'certpub-to-apikey' (certPub) {
      if (certPub) {
		const hash = crypto.createHash('sha256');
		hash.update(certPub);
		const rawDigest = hash.digest();
		return rawDigest.toString('hex');
      }
    },
  },
  methods: {
    loaded() {
      this.generateCreds();
    },
    pubToAPIKey (certPub) {
	  if (certPub) {
		const hash = crypto.createHash('sha256');
		hash.update(certPub);
		const rawDigest = hash.digest();
		return rawDigest.toString('hex');
	  }
    },
    phraseToPubKey (phrase) {
      const tag = 'btc-live';
      const seed = bip39.mnemonicToSeed(phrase);
      const network = Networks[tag];
      const root = bip32.fromSeed(seed, network);
      const accountPath = `m/44'/0'/10000'/3/1`;
      const pubKey = root.derivePath(accountPath).neutered.toBase58(); // New Production Setting
      return pubKey;
    },
    copyValToClipboard(str) {
	  const el = document.createElement('textarea');  // Create a <textarea> element
	  el.value = str;                                 // Set its value to the string that you want copied
	  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
	  el.style.position = 'absolute';                 
	  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
	  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
	  const selected =            
		document.getSelection().rangeCount > 0        // Check if there is any content selected previously
		  ? document.getSelection().getRangeAt(0)     // Store selection if found
		  : false;                                    // Mark as false to know no selection existed before
	  el.select();                                    // Select the <textarea> content
	  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
	  document.body.removeChild(el);                  // Remove the <textarea> element
	  if (selected) {                                 // If a selection existed before copying
		document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
		document.getSelection().addRange(selected);   // Restore the original selection
	  }
    },
    generateKeyPair() {
      return new Promise((resolve, reject) => {
        console.log('Generating key pair...');
        rsa.generateKeyPair({
          bits: 2048,
        }, (err, keyPair) => {
          if (err) reject(err);
          resolve(keyPair);
        });
      });
    },
    toBase64(x) {
      if(btoa) {
        return btoa(x);
      }
    },
    generateCreds() {
      //
      const phraseOne = bip39.generateMnemonic();
      const phraseTwo = bip39.generateMnemonic();
      const pubKeyOne = this.phraseToPubKey(phraseOne);
      const pubKeyTwo = this.phraseToPubKey(phraseTwo);
      RegisterStore.dispatch('savePhraseOne', phraseOne);
      RegisterStore.dispatch('savePhraseTwo', phraseTwo);
      RegisterStore.dispatch('savePubKeyOne', pubKeyOne);
      RegisterStore.dispatch('savePubKeyTwo', pubKeyTwo);
      // Generate Key Pair 
      co(this.generateKeyPair).then((res) => {
        const certPubRaw = pki.publicKeyToPem(res.publicKey);
        const certPub = this.toBase64(certPubRaw);
        RegisterStore.dispatch('saveCertPub', certPub);
        const certKeyRaw = pki.privateKeyToPem(res.privateKey);
        const certKey = this.toBase64(certKeyRaw);
        RegisterStore.dispatch('saveCertKey', certKey);
      }).catch((err) => console.log(err));
      
    },
  }
};

</script>
