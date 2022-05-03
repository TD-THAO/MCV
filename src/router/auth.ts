import Login from '@/views/auth/login/login.vue';
import Register from '@/views/auth/register.vue';
import ForgotPassword from '@/views/auth/forgot-password.vue';

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
];
