import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ErrorPage from '@/components/ErrorPage.vue';
import AuthRoutes from './auth';
import AdminRoutes from './admin/index';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  ...AuthRoutes,
  ...AdminRoutes,
  {
    path: '/404',
    name: 'PageNotFound',
    component: ErrorPage,
  },
  {
    path: '*',
    redirect: { name: 'PageNotFound' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
