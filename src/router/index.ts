import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ErrorPage from '@/components/ErrorPage.vue';
import UnAuthRoutes from './unauth';
import AdminRoutes from './admin/index';
import UserRoutes from './user/index';
import Home from '@/views/index.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  ...UnAuthRoutes,
  ...AdminRoutes,
  ...UserRoutes,
  {
    path: '/404',
    name: 'PageNotFound',
    component: ErrorPage,
  },
  {
    path: '',
    name: 'Home',
    component: Home,
  },
  {
    path: '*',
    redirect: { name: 'PageNotFound' },
  },
];

const routers = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default routers;
