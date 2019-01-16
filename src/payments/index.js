import Index from './index.vue';
import Detail from './detail.vue';
import List from './list.vue';
import DetailDelete from './detail-delete.vue';
import Create from './create.vue';
import CreateFail from './create-fail.vue';
import CreateSuccess from './create-success.vue';

const Routes = [{
  path: '/payments',
  name: 'payment-index',
  component: Index,
  children: [{
    path: ':id',
    name: 'payment-detail',
    component: Detail,
  }, {
    path: '',
    name: 'payment-list',
    component: List,
  }, {
    path: ':id/delete',
    name: 'payment-detail-delete',
    component: DetailDelete,
  }, {
    path: 'create',
    name: 'payment-create',
    component: Create,
  }, {
    path: 'create/success',
    name: 'payment-create-success',
    component: CreateSuccess,
  }, {
    path: 'create/fail',
    name: 'payment-create-fail',
    component: CreateFail,
  }],
}];

export {
  Index,
  Routes,
};
