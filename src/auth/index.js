import Login from './login.vue';
import Logout from './logout.vue';
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
    path: 'login',
    name: 'auth-login',
    component: Login,
  }, {
    path: 'logout',
    name: 'auth-logout',
    component: Logout,
  }],
}];

export {
  Routes,
};
