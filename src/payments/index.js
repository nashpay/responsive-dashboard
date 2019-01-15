import Index from './index.vue';
import Detail from './detail.vue';
import List from './list.vue';
import DetailDelete from './detail-delete.vue';
import DetailCreate from './create.vue';

const Routes = [{
  path: '/payments/',
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
    component: DetailCreate,
  }],
}];

export {
  Index,
  Routes,
};
