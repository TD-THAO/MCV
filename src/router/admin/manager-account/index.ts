import PersonalInfomation from '@/views/admin/manager-account/personal-info.vue';
import ChangePassword from '@/views/admin/manager-account/change-password.vue';

const authMeta = {
  // guest: true,
  // authorize: [],
};

export default [
  {
    path: '',
    component: PersonalInfomation,
  },
  {
    path: 'change-password',
    component: ChangePassword,
  },
];
