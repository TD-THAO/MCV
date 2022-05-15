import Login from '@/views/login.vue';
import Register from '@/views/register.vue';
import ForgotPassword from '@/views/password-forgot.vue';

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
    path: '/password-forgot',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
];
