import Admin from '@/views/admin/index.vue';
import ManagerAccountRoutes from './manager-account/index';
import ManagerApplication from './manager-application/index';

export default [
  {
    path: '/admin',
    component: Admin,
    children: [
      ...ManagerAccountRoutes,
      ...ManagerApplication,
    ],
  },
];
