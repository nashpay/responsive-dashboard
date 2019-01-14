import 'babel-polyfill';

import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router';

import router from './router';
import App from './App.vue';

Vue.use(VueRouter);

function main() {
  console.log('Running main...');
  const app = new Vue({
    el: '#app',
    router,
    render: h => h(App),
  });
  return app;
}

main();
