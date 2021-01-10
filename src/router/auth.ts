import Login from '@/views/auth/login/login.vue';
import Register from '@/views/auth/register.vue';

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
];
