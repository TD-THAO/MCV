import Admin from '@/views/admin/index.vue';
import ManagerAccountRoutes from './manager-account/index';
import ManagerApplication from './manager-application/index';

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
    ],
  },
];
