import Login from './login.vue';
import Index from './index.vue';

const Routes = [{
  path: '/auth',
  name: 'auth-index',
  component: Index,
  children: [{
    path: '',
    name: 'auth-placeholder',
    component: Index,
  }, {
    path: '',
    name: 'payment-list',
    path: 'login',
    name: 'auth-login',
    component: Login,
  }],
}];

export {
  Routes,
};
