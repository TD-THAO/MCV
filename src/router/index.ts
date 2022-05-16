import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ErrorPage from '@/components/ErrorPage.vue';
import UnAuthRoutes from './unauth';
import AdminRoutes from './admin/index';
import UserRoutes from './user/index';
import Index from '@/views/index.vue';
import Home from '@/views/home.vue';
import Jobs from '@/views/jobs.vue';

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
    name: 'Index',
    component: Index,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: Jobs,
      },
      {
        path: '',
        redirect: {
          name: 'Home'
        },
      },
    ]
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
