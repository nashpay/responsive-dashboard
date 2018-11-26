// index.js
import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router';
// Components
import App from './app.vue';
import Dashboard from './dashboard';
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
  ],
});
function makeApp() {
  const app = new Vue({
    el: '#app',
    router,
    render: h => h(App),
  });
  ApiStore.dispatch('updateCreds', Hardcodes);
  return app;
}

makeApp();
