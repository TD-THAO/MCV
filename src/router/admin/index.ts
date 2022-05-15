import Admin from '@/views/admin/index.vue';
import Applications from '@/views/admin/applications.vue';
import Jobs from '@/views/admin/jobs.vue';
import Users from '@/views/admin/users.vue';
import AdminProfile from '@/views/admin/profile.vue';

export default [
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: 'applications',
        name: 'Applications',
        component: Applications,
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: Jobs,
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
      },
      {
        path: '',
        name: 'AdminProfile',
        component: AdminProfile,
      },
    ],
  },
];
