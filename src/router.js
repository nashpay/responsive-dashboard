import VueRouter from 'vue-router';

import { Routes as DashboardRoutes } from './dashboard';
import { Routes as PaymentRoutes } from './payments';

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    ...DashboardRoutes,
    ...PaymentRoutes,
  ],
});

export default router;
