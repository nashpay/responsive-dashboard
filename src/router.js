import VueRouter from 'vue-router';

import { Routes as DashboardRoutes } from './dashboard';
import { Routes as PaymentRoutes } from './payments';
import { Routes as AuthRoutes } from './auth';

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    ...DashboardRoutes,
    ...PaymentRoutes,
    ...AuthRoutes,
  ],
});

export default router;
