<template>
  <div class="container-subrouter">
    <div class="napp-form-wrapper">
	  <nav class="breadcrumb" aria-label="breadcrumb">
		<ul>
		  <li>
			<router-link :to="pageRoute">
			  Home
			</router-link>
		  </li>
		  <li class="is-active">
			  <a>Create</a>
		  </li>
		</ul>
	  </nav> 
     <napp-form v-bind:formFields="formFields" />
      <!--
	  <div class="field">
		<label class="label">Account</label>
		<div class="control">
		  <div class="select">
			<select>
			  <option>Default</option>
			  <option>Account 1</option>
			</select>
		  </div>
		</div>
	  </div>
	  
	  <div class="field">
		<label class="label">Reference</label>
		<div class="control">
		  <input class="input"></input>
		</div>
	  </div>
	  <div class="field is-grouped">
		<div class="field">
		  <label class="label">Amount</label>
		  <div class="control">
			<input class="input is-danger" type="number"></input>
			<p class="help is-danger">Amount must be a valid number</p>
		  </div>
		</div>
		<div class="control">
		  <label class="label">&nbsp;</label>
		  <div class="button">
			1000.00 USD
		  </div>
		</div>
	  </div>
	  <div class="field is-grouped">
		<div class="control">
		  <button class="button" @click="createPayment">Create</button>
		</div>
		<div class="control">
		  <router-link :to="pageRoute">
			<button class="button is-text">Cancel</button>
		  </router-link>
		</div>
	  </div>
    -->
	</div>
  </div>
</template>
<style lang="less">
@import (reference, less) url("../theme/core.less");
@import (less, reference) url("../theme/form.less");
</style>
<script>
import Form from '../components/forms/index.vue';

const formFields = [{
  label: 'Amount',
  category: 'currency',
}];

console.log(formFields);

export default {
  data() { 
    return {
      pageRoute: { name: 'payment-list' },
      formFields,
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
    createPayment() {
      this.$router.push({ name: 'payment-create-success' });
    },
  }
};
</script>
