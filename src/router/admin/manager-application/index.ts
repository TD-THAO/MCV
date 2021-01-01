import ManagerApplicationInfo from '@/views/admin/manager-application/infomation/steps.vue';
import ManagerApplicationInfoStep1 from '@/views/admin/manager-application/infomation/step1.vue';
import ManagerApplicationInfoStep2 from '@/views/admin/manager-application/infomation/step2.vue';
import ManagerApplicationInfoStep3 from '@/views/admin/manager-application/infomation/step3.vue';
import ManagerApplicationInfoStep4 from '@/views/admin/manager-application/infomation/step4.vue';
import ManagerApplicationInfoStep5 from '@/views/admin/manager-application/infomation/step5.vue';

const authMeta = {
  // guest: true,
  // authorize: [],
};

export default [
  {
    path: 'complete-profile',
    component: ManagerApplicationInfo,
    children: [
      {
        path: 'step1',
        name: 'CompleteProfileStep1',
        component: ManagerApplicationInfoStep1,
      },
      {
        path: 'step2',
        name: 'CompleteProfileStep2',
        component: ManagerApplicationInfoStep2,
      },
      {
        path: 'step3',
        name: 'CompleteProfileStep3',
        component: ManagerApplicationInfoStep3,
      },
      {
        path: 'step4',
        name: 'CompleteProfileStep4',
        component: ManagerApplicationInfoStep4,
      },
      {
        path: 'step5',
        name: 'CompleteProfileStep5',
        component: ManagerApplicationInfoStep5,
      },
      {
        path: '',
        redirect: { name: 'CompleteProfileStep1' },
      },
    ],
  },
];
