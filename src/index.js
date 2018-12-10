// index.js
import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router';
// Components
import App from './app.vue';
import Dashboard from './dashboard';
import { Landing as TxLanding } from './transactions';
import ApiStore from './nashcli/store';
import Hardcodes from './hardcoded';

// Register Routes with Vue-Router
Vue.use(VueRouter);

const router = new VueRouter({
  // Routes go here.
  mode: 'history',
  base: '/',
  routes: [
    // Production Paths
    { name: 'dashboardHome', path: '/', component: Dashboard.Landing },
    { name: 'transactionHome', path: '/transaction', component: TxLanding },
  ],
});
function makeApp() {
  ApiStore.dispatch('updateCreds', Hardcodes);
  const app = new Vue({
    el: '#app',
    router,
    render: h => h(App),
  });
  return app;
}

makeApp();
