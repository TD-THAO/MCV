import Login from '@/views/auth/login/login.vue';
import Register from '@/views/auth/register.vue';

const guestMeata = {
  // guest: true,
  // authorize: [],
};

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: guestMeata,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: guestMeata,
  },
];
