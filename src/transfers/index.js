import Index from './index.vue';
// import Detail from './detail.vue';
import List from './list.vue';
// import DetailDelete from './detail-delete.vue';
import Create from './create.vue';
// import CreateFail from './create-fail.vue';
// import CreateSuccess from './create-success.vue';

const Routes = [{
  path: '/transfers',
  // name: 'payment-index',
  component: Index,
  children: [
  /*
  {
    path: 'detail/:id',
    name: 'transfer-detail',
    component: Detail,
  }, {
  */
    {
      path: '',
      name: 'transfer-list',
      component: List,
      props: route => ({ ...route.query }),
    }, {
      path: 'create/',
      name: 'transfer-create',
      component: Create,
    },
  /*
  }, {
    path: 'detail/:id/delete',
    name: 'transfer-detail-delete',
    component: DetailDelete,
  }, {
    path: 'create/success',
    name: 'transfer-create-success',
    component: CreateSuccess,
    props: route => ({ ...route.query }),
  }, {
    path: 'create/fail',
    name: 'transfer-create-fail',
    component: CreateFail,
  */
  ],
}];

export {
  Index,
  Routes,
};
