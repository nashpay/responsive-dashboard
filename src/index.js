// index.js

import 'babel-polyfill';

import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router';
// Components
import App from './app.vue';
import { Dashboard, Settings, Accounts} from './pages';

// Register Routes with Vue-Router
Vue.use(VueRouter);

const router = new VueRouter({
  // Routes go here.
  mode: 'history',
  base: '/',
  routes: [
    // Production Paths
    { path: '/', component: Dashboard.ListView },
    { name: 'settingsHome', path: '/settings', component: Settings.ListView },
    { name: 'accountsHome', path: '/accounts', component: Accounts.ListView },
  ],
});
const stub = new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
