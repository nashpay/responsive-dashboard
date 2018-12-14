// index.js
import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router';
// Components
import App from './app.vue';
import ApiStore from './nashcli/store';
import RateStore from './rates/store';
import Hardcodes from './hardcoded';
import Dashboard from './dashboard';
import { Landing as TxLanding } from './transactions';
import { Landing as SettingLanding } from './settings';

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
    { name: 'settingHome', path: '/setting', component: SettingLanding },
  ],
});
function makeApp() {
  ApiStore.dispatch('updateCreds', Hardcodes);
  RateStore.dispatch('updateAPIKey', Hardcodes.CRYPTO_COMPARE_API_KEY);
  RateStore.dispatch('updateAPIProvider', 'cryptocompare.com');
  RateStore.dispatch('pollPrices');
  const app = new Vue({
    el: '#app',
    router,
    render: h => h(App),
  });
  return app;
}

makeApp();
