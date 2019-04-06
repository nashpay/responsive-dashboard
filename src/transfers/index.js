import Index from './index.vue';
// import Detail from './detail.vue';
import List from './list.vue';
// import DetailDelete from './detail-delete.vue';
import Create from './create.vue';
import CheckRequest from './create-check-request.vue';
import SignRequest from './create-sign-request.vue';
import CreateSuccess from './create-sign-success.vue';
import Detail from './detail.vue';
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
      path: 'detail/',
      name: 'transfer-detail',
      component: Detail,
      props: route => ({ ...route.query }),
    }, {
      path: 'create/',
      name: 'transfer-create',
      component: Create,
    }, {
      path: 'create/check-request',
      name: 'transfer-create-check-request',
      component: CheckRequest,
      props: route => ({ ...route.query }),
    }, {
      path: 'create/sign-request',
      name: 'transfer-create-sign-request',
      component: SignRequest,
      props: route => ({ ...route.query }),
    }, {
      path: 'create/success',
      name: 'transfer-create-success',
      component: CreateSuccess,
      props: route => ({ ...route.query }),
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
