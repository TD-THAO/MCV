import Admin from '@/views/admin/index.vue';
import ManagerAccountRoutes from './manager-account/index';
import ManagerApplication from './manager-application/index';
// import Dashboard from '@/views/admin/dashboard.vue';
// import Categories from '@/views/admin/category/list.vue';
// import Products from '@/views/admin/product/list.vue';

const authMeta = {
  // guest: true,
  // authorize: [],
};

export default [
  {
    path: '/admin',
    component: Admin,
    meta: authMeta,
    children: [
      ...ManagerAccountRoutes,
      ...ManagerApplication,
      // {
      //   path: '',
      //   name: 'dashboard',
      //   component: Dashboard,
      // },
      // {
      //   path: 'categories',
      //   name: 'categories',
      //   component: Categories,
      // },
      // {
      //   path: 'products',
      //   name: 'products',
      //   component: Products,
      // },
    ],
  },
];
